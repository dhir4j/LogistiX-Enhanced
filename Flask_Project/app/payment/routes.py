import hashlib
import binascii
import uuid
import os
from datetime import datetime
from decimal import Decimal

from flask import Blueprint, request, jsonify, redirect
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

from app.extensions import db
from app.models import User, WalletTransaction, Shipment

payment_bp = Blueprint("payment", __name__, url_prefix="/api/payment")

MERCHANT_ID  = os.environ.get("KOTAK_MERCHANT_ID", "")
ACCESS_CODE  = os.environ.get("KOTAK_ACCESS_CODE", "")
WORKING_KEY  = os.environ.get("KOTAK_WORKING_KEY", "")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "https://www.hkspeedcouriers.com")
BACKEND_URL  = os.environ.get("BACKEND_URL", "https://www.server.hkspeedcouriers.com")
CCAVENUE_URL = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"


# ── AES-128-CBC helpers ────────────────────────────────────────────────────────

def _aes_key(working_key: str) -> bytes:
    return hashlib.md5(working_key.encode("utf-8")).digest()

def _encrypt(plain: str, working_key: str) -> str:
    key    = _aes_key(working_key)
    iv     = b"\x00" * 16
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return binascii.hexlify(cipher.encrypt(pad(plain.encode("utf-8"), 16))).decode("utf-8")

def _decrypt(enc_hex: str, working_key: str) -> str:
    key    = _aes_key(working_key)
    iv     = b"\x00" * 16
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(binascii.unhexlify(enc_hex)), 16).decode("utf-8")

def _parse_kv(s: str) -> dict:
    result = {}
    for pair in s.split("&"):
        if "=" in pair:
            k, _, v = pair.partition("=")
            result[k.strip()] = v.strip()
    return result


# ── Routes ─────────────────────────────────────────────────────────────────────

@payment_bp.route("/balance", methods=["GET"])
def get_balance():
    email = request.args.get("email", "").strip()
    if not email:
        return jsonify({"error": "email required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    transactions = (
        WalletTransaction.query
        .filter_by(user_id=user.id)
        .order_by(WalletTransaction.created_at.desc())
        .limit(20)
        .all()
    )

    return jsonify({
        "balance": float(user.balance),
        "transactions": [
            {
                "id": t.id,
                "order_id": t.order_id,
                "amount": float(t.amount),
                "status": t.status,
                "payment_mode": t.payment_mode,
                "created_at": t.created_at.isoformat(),
            }
            for t in transactions
        ],
    }), 200


@payment_bp.route("/initiate", methods=["POST"])
def initiate_payment():
    """
    Accepts:
      - user_email (required)
      - amount     (required)
      - name       (optional)
      - phone      (optional)
      - shipment_id_str (optional) — if present, payment is for a shipment
    """
    data           = request.get_json(force=True)
    user_email     = data.get("user_email", "").strip()
    amount         = data.get("amount")
    name           = data.get("name", "Customer").strip()
    phone          = data.get("phone", "9999999999").strip()
    shipment_id_str = data.get("shipment_id_str", "").strip()

    if not user_email or not amount:
        return jsonify({"error": "user_email and amount are required"}), 400

    try:
        amount_decimal = round(Decimal(str(amount)), 2)
        if amount_decimal < Decimal("1.00"):
            return jsonify({"error": "Minimum payment amount is ₹1"}), 400
    except Exception:
        return jsonify({"error": "Invalid amount"}), 400

    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    order_id = f"LGX-{uuid.uuid4().hex[:12].upper()}"

    # Track this transaction — link to shipment if provided
    txn = WalletTransaction(
        user_id=user.id,
        order_id=order_id,
        amount=amount_decimal,
        status="Pending",
        # store shipment_id_str in payment_mode field temporarily as identifier
        payment_mode=f"shipment:{shipment_id_str}" if shipment_id_str else None,
    )
    db.session.add(txn)
    db.session.commit()

    redirect_url = f"{BACKEND_URL}/api/payment/response"
    cancel_url   = (
        f"{FRONTEND_URL}/track/{shipment_id_str}"
        if shipment_id_str else
        f"{FRONTEND_URL}/payments"
    )

    params = (
        f"merchant_id={MERCHANT_ID}"
        f"&order_id={order_id}"
        f"&currency=INR"
        f"&amount={amount_decimal}"
        f"&redirect_url={redirect_url}"
        f"&cancel_url={cancel_url}"
        f"&language=EN"
        f"&billing_name={name}"
        f"&billing_email={user_email}"
        f"&billing_tel={phone}"
        f"&merchant_param1={user_email}"
        f"&merchant_param2={shipment_id_str}"
    )

    enc_request = _encrypt(params, WORKING_KEY)

    return jsonify({
        "enc_request": enc_request,
        "access_code": ACCESS_CODE,
        "payment_url": CCAVENUE_URL,
    }), 200


@payment_bp.route("/response", methods=["POST"])
def payment_response():
    enc_resp = request.form.get("encResp", "")
    if not enc_resp:
        return redirect(f"{FRONTEND_URL}/payment/response?status=failure&reason=no_response")

    try:
        decrypted = _decrypt(enc_resp, WORKING_KEY)
        params    = _parse_kv(decrypted)
    except Exception:
        return redirect(f"{FRONTEND_URL}/payment/response?status=failure&reason=decrypt_error")

    order_id        = params.get("order_id", "")
    order_status    = params.get("order_status", "")
    reference_no    = params.get("tracking_id", "")
    payment_mode    = params.get("payment_mode", "")
    shipment_id_str = params.get("merchant_param2", "").strip()

    txn = WalletTransaction.query.filter_by(order_id=order_id).first()
    if not txn:
        return redirect(f"{FRONTEND_URL}/payment/response?status=failure&reason=order_not_found")

    txn.ccavenue_reference_no = reference_no
    txn.updated_at            = datetime.utcnow()

    if order_status == "Success":
        txn.status       = "Success"
        txn.payment_mode = payment_mode

        if shipment_id_str:
            # Update the linked shipment status to Booked
            shipment = Shipment.query.filter_by(shipment_id_str=shipment_id_str).first()
            if shipment and shipment.status == "Pending Payment":
                shipment.status = "Booked"
                shipment.tracking_history = (shipment.tracking_history or []) + [{
                    "stage": "Booked",
                    "date": datetime.utcnow().isoformat(),
                    "location": shipment.sender_address_city,
                    "activity": "Payment confirmed via Kotak gateway. Shipment booked."
                }]
            db.session.commit()
            return redirect(
                f"{FRONTEND_URL}/track/{shipment_id_str}"
                f"?payment=success"
            )
        else:
            # Wallet top-up
            user = User.query.get(txn.user_id)
            if user:
                user.balance += txn.amount
            db.session.commit()
            return redirect(
                f"{FRONTEND_URL}/payment/response"
                f"?status=success&amount={float(txn.amount)}&order_id={order_id}"
            )
    else:
        txn.status       = "Failed"
        txn.payment_mode = payment_mode
        db.session.commit()

        if shipment_id_str:
            return redirect(
                f"{FRONTEND_URL}/track/{shipment_id_str}"
                f"?payment=failure&reason={order_status}"
            )
        return redirect(
            f"{FRONTEND_URL}/payment/response"
            f"?status=failure&reason={order_status}&order_id={order_id}"
        )
