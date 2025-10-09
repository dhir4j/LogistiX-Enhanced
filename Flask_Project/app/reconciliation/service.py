
import json
import os
from decimal import Decimal, ROUND_HALF_UP

# --- Load Data ---
def _load_json_data(filename):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, '..', 'Data', filename)
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except (IOError, json.JSONDecodeError):
        return None

DOMESTIC_ZONES = _load_json_data('domestic.json')
DOMESTIC_PRICES = _load_json_data('dom_prices.json')
INTERNATIONAL_PRICES = _load_json_data('pricing.json')

def find_possible_shipment(total_amount_with_tax: float):
    """
    Finds the best possible shipment configuration (domestic or international) for a given total amount.
    """
    if not DOMESTIC_PRICES or not DOMESTIC_ZONES or not INTERNATIONAL_PRICES:
        return {"error": "Pricing data could not be loaded."}
        
    if total_amount_with_tax < 5000:
        return _find_best_domestic_match(total_amount_with_tax)
    else:
        return _find_best_international_match(total_amount_with_tax)

def _find_best_domestic_match(total_amount: float):
    best_match = None
    min_diff = float('inf')
    base_price = Decimal(str(total_amount)) / Decimal('1.18')

    for zone, prices_by_mode in DOMESTIC_PRICES.items():
        destinations = DOMESTIC_ZONES.get(zone, [])
        if not destinations:
            continue
        
        for mode, price_table in prices_by_mode.items():
            # --- Handle 'express' mode (fixed prices, up to 5kg) ---
            if mode == 'express':
                for band_str, price in price_table.items():
                    price = Decimal(str(price))
                    diff = abs(price - base_price)
                    
                    if diff < min_diff:
                        min_diff = diff
                        best_match = {
                            "type": "Domestic",
                            "destinations": [destinations[0]], # Return only the first destination
                            "mode": mode.title(),
                            "weight_suggestion": f"{band_str} kg",
                            "calculated_base_price": float(price),
                            "total_price_with_tax": float(price * Decimal('1.18'))
                        }

            # --- Handle 'air' and 'surface' modes (per kg rates) ---
            elif mode in ['air', 'surface']:
                for band, rate_per_kg in price_table.items():
                    if rate_per_kg > 0:
                        # Estimate weight based on rate
                        potential_weight = float(base_price / Decimal(str(rate_per_kg)))
                        
                        # Weight must be under 10kg for this logic
                        if potential_weight > 10:
                            continue

                        # Check if the calculated weight fits within the current band
                        weight_fits_band = False
                        if band == "<5" and 0 < potential_weight < 5: weight_fits_band = True
                        elif band == "<10" and 5 <= potential_weight < 10: weight_fits_band = True
                        elif band == "<25" and 10 <= potential_weight < 25: weight_fits_band = True # Corrected this logic
                        elif band == "<50" and 25 <= potential_weight < 50: weight_fits_band = True
                        elif band == ">50" and potential_weight >= 50: weight_fits_band = True

                        if weight_fits_band:
                            # For per-kg rates, the calculated base price is very close to the target base price.
                            # We can consider this a perfect match for this band.
                            diff = 0
                            if diff < min_diff:
                                min_diff = diff
                                best_match = {
                                    "type": "Domestic",
                                    "destinations": [destinations[0]],
                                    "mode": mode.title(),
                                    "weight_suggestion": f"{potential_weight:.2f} kg",
                                    "calculated_base_price": float(base_price),
                                    "total_price_with_tax": total_amount
                                }
                                # If we found a perfect match, no need to check other bands in this mode
                                break 
    return best_match

def _find_best_international_match(total_amount: float):
    best_match = None
    min_diff = float('inf')
    base_price = Decimal(str(total_amount)) / Decimal('1.18')

    for country_data in INTERNATIONAL_PRICES:
        country_name = country_data.get("country")
        if not country_name:
            continue

        # Check fixed weight bands (1kg to 10kg)
        for i in range(1, 11): 
            weight_key = str(i)
            if weight_key in country_data and country_data[weight_key]:
                price = Decimal(str(country_data[weight_key]))
                diff = abs(price - base_price)
                if diff < min_diff:
                    min_diff = diff
                    best_match = {
                        "type": "International",
                        "destinations": [country_name],
                        "mode": "Express",
                        "weight_suggestion": f"{i} kg",
                        "calculated_base_price": float(price),
                        "total_price_with_tax": float(price * Decimal('1.18'))
                    }
    return best_match
