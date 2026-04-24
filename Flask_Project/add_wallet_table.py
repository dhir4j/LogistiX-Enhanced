"""Run this once to add the wallet_transactions table without dropping existing data."""
from dotenv import load_dotenv
load_dotenv()

import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.extensions import db
from app.models import WalletTransaction

app = create_app()

with app.app_context():
    db.create_all()
    print("wallet_transactions table created (or already exists). Done.")
