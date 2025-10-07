from flask import Blueprint, request, jsonify
from .service import find_possible_shipments

reconciliation_bp = Blueprint("reconciliation", __name__, url_prefix="/api/reconciliation")

@reconciliation_bp.route("/find-destinations", methods=["POST"])
def find_destinations():
    data = request.get_json()
    amount = data.get("amount")

    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"error": "A valid, positive amount is required."}), 400

    try:
        matches = find_possible_shipments(float(amount))
        if not matches:
            return jsonify({"message": "No potential shipment matches found for this amount.", "matches": []}), 200
        
        return jsonify({"matches": matches}), 200
    except Exception as e:
        # In a real app, you'd log the error.
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
