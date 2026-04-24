import os

class Config:
    SECRET_KEY = "thisisahighsecret"

    # Kotak / CCAvenue credentials — set these in environment or .env
    KOTAK_MERCHANT_ID = os.environ.get("KOTAK_MERCHANT_ID", "")
    KOTAK_ACCESS_CODE = os.environ.get("KOTAK_ACCESS_CODE", "")
    KOTAK_WORKING_KEY = os.environ.get("KOTAK_WORKING_KEY", "")
    FRONTEND_URL      = os.environ.get("FRONTEND_URL", "https://www.hkspeedcouriers.com")
    BACKEND_URL       = os.environ.get("BACKEND_URL", "https://www.server.hkspeedcouriers.com")
    DEBUG_MODE = True  # Corresponds to FLASK_DEBUG=1

    # Database connection details
    db_user = "dhir4j"
    db_password = "m4dc0d3r"
    db_host = "simple4j-4739.postgres.pythonanywhere-services.com"
    db_port = "14739"
    db_name = "LogistiX"

    # SQLAlchemy Configuration
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{db_user}:{db_password}"
        f"@{db_host}:{db_port}/{db_name}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS Configuration
    CORS_ORIGINS = [
        "https://www.hkspeedcouriers.com",
        "https://www.server.hkspeedcouriers.com",
        "https://6000-firebase-hk-courier-1753367614212.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev",
        "http://localhost:9002"
    ]


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    # Set to True based on user request (FLASK_DEBUG=1) for debugging in production
    DEBUG = True


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
