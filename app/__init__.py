from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    template_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "templates")
    )

    app = Flask(__name__, template_folder=template_path)

    # ✅ allow frontend (localhost:3000) to call backend (localhost:5000)
    CORS(app)

    app.secret_key = os.getenv("SECRET_KEY", "default_secret")

    from app.routes import main
    app.register_blueprint(main)

    return app
