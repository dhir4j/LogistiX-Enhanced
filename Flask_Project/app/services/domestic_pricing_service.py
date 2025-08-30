import json
import math
import os

# --- Load Data ---
def _load_json_data(filename):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, '..', 'Data', filename)
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except (IOError, json.JSONDecodeError):
        # In a real app, you'd log this error
        return None

DOMESTIC_ZONES = _load_json_data('domestic.json')
DOMESTIC_PRICES = _load_json_data('dom_prices.json')

def calculate_domestic_price(state_name: str, mode: str, weight_kg: float):
    """
    Calculates domestic shipping price based on state, mode, and weight.
    """
    if not DOMESTIC_ZONES or not DOMESTIC_PRICES:
        return {"error": "Pricing data could not be loaded."}

    # 1. FIND COLUMN NUMBER (ZONE)
    selected_column = None
    state_name_lower = state_name.lower()
    for column, states in DOMESTIC_ZONES.items():
        if any(s.lower() == state_name_lower for s in states):
            selected_column = column
            break
            
    if not selected_column:
        return {"error": f"The state '{state_name}' is not currently serviced."}

    # 2. SELECT PRICING RULES
    rules = DOMESTIC_PRICES.get(selected_column)
    if not rules or mode not in rules:
        return {"error": f"The '{mode}' service is not available for '{state_name}'."}

    pricing_table = rules[mode]
    original_weight = weight_kg

    # 3. NORMALIZE WEIGHT
    if mode == "air" and weight_kg < 3:
        weight_kg = 3
    elif mode == "surface" and weight_kg < 5:
        weight_kg = 5
    
    # 4. DETERMINE PRICING BAND
    band = None
    if mode == "express":
        rounded_weight = math.ceil(weight_kg)
        if rounded_weight <= 1: band = "1"
        elif rounded_weight <= 2: band = "2"
        elif rounded_weight <= 3: band = "3"
        elif rounded_weight <= 4: band = "4"
        else: band = "5"
    elif mode in ["air", "surface"]:
        # For air/surface, weight is already normalized
        rounded_weight = weight_kg 
        if rounded_weight < 5: band = "<5"
        elif rounded_weight < 10: band = "<10"
        elif rounded_weight < 25: band = "<25"
        elif rounded_weight < 50: band = "<50"
        else: band = ">50"
    
    if not band:
        return {"error": "Could not determine pricing band."}

    # 5. LOOKUP PRICE
    price = pricing_table.get(band)

    if price is None:
        return {"error": f"Pricing not available for the calculated weight band in {state_name}."}

    # 6. RETURN PRICE
    return {
        "price": price,
        "zone": selected_column,
        "rounded_weight": rounded_weight if mode in ["air", "surface"] else math.ceil(original_weight)
    }
