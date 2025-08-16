import random
import string

def generate_shipment_id_str():
    """Generates a random shipment ID like SBC1A2B3C4D5E6."""
    return "SBC" + "".join(random.choices(string.ascii_uppercase + string.digits, k=12))
