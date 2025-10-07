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

def find_possible_shipments(total_amount_with_tax: float, tolerance: float = 0.01):
    """
    Finds possible shipment configurations (domestic or international) for a given total amount.
    """
    if total_amount_with_tax < 5000:
        return _find_domestic_matches(total_amount_with_tax, tolerance)
    else:
        return _find_international_matches(total_amount_with_tax, tolerance)

def _find_domestic_matches(total_amount: float, tolerance: float):
    if not DOMESTIC_PRICES or not DOMESTIC_ZONES:
        return []

    matches = []
    # Reverse the GST to find the base price
    base_price = Decimal(str(total_amount)) / Decimal('1.18')

    # Iterate through all zones, modes, and bands
    for zone, prices_by_mode in DOMESTIC_PRICES.items():
        destinations = DOMESTIC_ZONES.get(zone, [])
        for mode, price_table in prices_by_mode.items():
            # --- Handle 'express' mode (fixed prices) ---
            if mode == 'express':
                for band, price in price_table.items():
                    if abs(Decimal(str(price)) - base_price) <= Decimal(str(tolerance)):
                        matches.append({
                            "type": "Domestic",
                            "destinations": destinations,
                            "mode": mode.title(),
                            "weight_suggestion": f"Approx. {band} kg",
                            "calculated_base_price": float(price),
                            "total_price_with_tax": float(Decimal(str(price)) * Decimal('1.18'))
                        })
            
            # --- Handle 'air' and 'surface' modes (per kg rates) ---
            elif mode in ['air', 'surface']:
                for band, rate_per_kg in price_table.items():
                    if rate_per_kg > 0:
                        # Calculate the potential weight
                        potential_weight = float(base_price / Decimal(str(rate_per_kg)))
                        
                        # Validate if the calculated weight fits in the current band
                        weight_fits_band = False
                        if band == "<5" and 0 < potential_weight < 5: weight_fits_band = True
                        elif band == "<10" and 5 <= potential_weight < 10: weight_fits_band = True
                        elif band == "<25" and 10 <= potential_weight < 25: weight_fits_band = True
                        elif band == "<50" and 25 <= potential_weight < 50: weight_fits_band = True
                        elif band == ">50" and potential_weight >= 50: weight_fits_band = True

                        if weight_fits_band:
                             matches.append({
                                "type": "Domestic",
                                "destinations": destinations,
                                "mode": mode.title(),
                                "weight_suggestion": f"{potential_weight:.2f} kg",
                                "calculated_base_price": float(base_price),
                                "total_price_with_tax": total_amount
                            })
    return matches

def _find_international_matches(total_amount: float, tolerance: float):
    if not INTERNATIONAL_PRICES:
        return []

    matches = []
    base_price = Decimal(str(total_amount)) / Decimal('1.18')

    for country_data in INTERNATIONAL_PRICES:
        country_name = country_data.get("country")
        if not country_name:
            continue

        # Check fixed weight bands (1kg to 11kg)
        for i in range(1, 12):
            weight_key = str(i)
            if weight_key in country_data and country_data[weight_key]:
                price = Decimal(str(country_data[weight_key]))
                if abs(price - base_price) <= Decimal(str(tolerance)):
                    matches.append({
                        "type": "International",
                        "destinations": [country_name],
                        "mode": "Express",
                        "weight_suggestion": f"Approx. {i} kg",
                        "calculated_base_price": float(price),
                        "total_price_with_tax": float(price * Decimal('1.18'))
                    })

        # Check variable weight (> 11kg)
        price_at_11kg = Decimal(str(country_data.get("11", 0)))
        rate_per_extra_kg = Decimal(str(country_data.get("per_kg", 0)))

        if base_price > price_at_11kg and rate_per_extra_kg > 0:
            extra_cost = base_price - price_at_11kg
            extra_kgs = (extra_cost / rate_per_extra_kg).to_integral_value(rounding=ROUND_HALF_UP)
            total_weight = 11 + int(extra_kgs)
            
            # Recalculate price to check if it's a match
            recalculated_price = price_at_11kg + extra_kgs * rate_per_extra_kg
            if abs(recalculated_price - base_price) <= Decimal(str(tolerance)):
                matches.append({
                    "type": "International",
                    "destinations": [country_name],
                    "mode": "Express",
                    "weight_suggestion": f"Approx. {total_weight} kg",
                    "calculated_base_price": float(recalculated_price),
                    "total_price_with_tax": float(recalculated_price * Decimal('1.18'))
                })

    return matches
