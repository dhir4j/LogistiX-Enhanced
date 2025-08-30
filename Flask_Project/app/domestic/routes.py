
from flask import Blueprint, request, jsonify
from app.services.domestic_pricing_service import calculate_domestic_price

domestic_bp = Blueprint("domestic", __name__, url_prefix="/api/domestic")

@domestic_bp.route("/price", methods=["POST"])
def price_calculator():
    try:
        data = request.get_json()
        state = data.get("state")
        # The frontend sends 'By Road', 'By Air', 'By Train', so we map them
        mode_map = {
            "By Road": "surface",
            "By Air": "air",
            "By Train": "express"
        }
        frontend_mode = data.get("mode")
        mode = mode_map.get(frontend_mode)
        
        weight = float(data.get("weight", 0))

        if not all([state, mode, weight > 0]):
            return jsonify({"error": "state, mode, and positive weight are required"}), 400

        result = calculate_domestic_price(state, mode, weight)
        
        if "error" in result:
             return jsonify(result), 400

        # Apply 18% GST
        final_price_with_tax = round(result["price"] * 1.18, 2)

        return jsonify({
            "destination_state": state.title(),
            "mode": frontend_mode.title(),
            "weight_kg": weight,
            "rounded_weight": result["rounded_weight"],
            "total_price": final_price_with_tax,
            "zone": result["zone"]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
