import hashlib
import binascii
import uuid
import os
from datetime import datetime
from decimal import Decimal
from dotenv import load_dotenv

from flask import Blueprint, request, jsonify, redirect
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

from app.extensions import db
from app.models import User, WalletTransaction, Shipment

_ENV_PATH = os.path.join(os.path.dirname(__file__), '..', '..', '.env')

payment_bp = Blueprint("payment", __name__, url_prefix="/api/payment")

CCAVENUE_URL = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"


def _creds():
    load_dotenv(_ENV_PATH, override=False)
    return {
        "merchant_id":  os.environ.get("KOTAK_MERCHANT_ID", ""),
        "access_code":  os.environ.get("KOTAK_ACCESS_CODE", ""),
        "working_key":  os.environ.get("KOTAK_WORKING_KEY", ""),
        "frontend_url": os.environ.get("FRONTEND_URL", "https://www.hkspeedcouriers.com"),
        "backend_url":  os.environ.get("BACKEND_URL",  "https://www.server.hkspeedcouriers.com"),
    }


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
    data            = request.get_json(force=True)
    user_email      = data.get("user_email", "").strip()
    amount          = data.get("amount")
    name            = data.get("name", "Customer").strip()
    phone           = data.get("phone", "9999999999").strip()
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

    c        = _creds()
    order_id = "LGX-" + uuid.uuid4().hex[:12].upper()

    txn = WalletTransaction(
        user_id=user.id,
        order_id=order_id,
        amount=amount_decimal,
        status="Pending",
        payment_mode=("shipment:" + shipment_id_str) if shipment_id_str else None,
    )
    db.session.add(txn)
    db.session.commit()

    redirect_url = c["backend_url"] + "/api/payment/response"
    cancel_url   = (
        c["frontend_url"] + "/track/" + shipment_id_str
        if shipment_id_str else
        c["frontend_url"] + "/payments"
    )

    params = (
        "merchant_id=" + c["merchant_id"] +
        "&order_id=" + order_id +
        "&currency=INR" +
        "&amount=" + str(amount_decimal) +
        "&redirect_url=" + redirect_url +
        "&cancel_url=" + cancel_url +
        "&language=EN" +
        "&billing_name=" + name +
        "&billing_email=" + user_email +
        "&billing_tel=" + phone +
        "&merchant_param1=" + user_email +
        "&merchant_param2=" + shipment_id_str
    )

    enc_request = _encrypt(params, c["working_key"])

    return jsonify({
        "enc_request": enc_request,
        "access_code": c["access_code"],
        "payment_url": CCAVENUE_URL,
    }), 200


@payment_bp.route("/response", methods=["POST"])
def payment_response():
    c        = _creds()
    enc_resp = request.form.get("encResp", "")

    if not enc_resp:
        return redirect(c["frontend_url"] + "/payment/response?status=failure&reason=no_response")

    try:
        decrypted = _decrypt(enc_resp, c["working_key"])
        params    = _parse_kv(decrypted)
    except Exception:
        return redirect(c["frontend_url"] + "/payment/response?status=failure&reason=decrypt_error")

    order_id        = params.get("order_id", "")
    order_status    = params.get("order_status", "")
    reference_no    = params.get("tracking_id", "")
    payment_mode    = params.get("payment_mode", "")
    shipment_id_str = params.get("merchant_param2", "").strip()

    txn = WalletTransaction.query.filter_by(order_id=order_id).first()
    if not txn:
        return redirect(c["frontend_url"] + "/payment/response?status=failure&reason=order_not_found")

    txn.ccavenue_reference_no = reference_no
    txn.updated_at            = datetime.utcnow()

    if order_status == "Success":
        txn.status       = "Success"
        txn.payment_mode = payment_mode

        if shipment_id_str:
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
            return redirect(c["frontend_url"] + "/track/" + shipment_id_str + "?payment=success")
        else:
            user = User.query.get(txn.user_id)
            if user:
                user.balance += txn.amount
            db.session.commit()
            return redirect(
                c["frontend_url"] + "/payment/response?status=success&amount=" +
                str(float(txn.amount)) + "&order_id=" + order_id
            )
    else:
        txn.status       = "Failed"
        txn.payment_mode = payment_mode
        db.session.commit()

        if shipment_id_str:
            return redirect(c["frontend_url"] + "/track/" + shipment_id_str + "?payment=failure&reason=" + order_status)
        return redirect(c["frontend_url"] + "/payment/response?status=failure&reason=" + order_status + "&order_id=" + order_id)
