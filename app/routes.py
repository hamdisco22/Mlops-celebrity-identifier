from flask import Blueprint, render_template, request, jsonify
from app.utils.image_handler import process_image
from app.utils.celebrity_detector import CelebrityDetector
from app.utils.qa_engine import QAEngine
import base64
import numpy as np
import cv2

def compute_confidence_from_image(img_bytes, face_box):
    """
    Produces a confidence in [0.55 .. 0.98] based on:
    - face area ratio (bigger detected face => higher)
    - image sharpness (laplacian variance)
    """
    # decode bytes to image
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None or face_box is None:
        return 0.55

    h, w = img.shape[:2]
    x, y, fw, fh = face_box
    face_area = fw * fh
    img_area = w * h
    face_ratio = face_area / max(img_area, 1)

    # sharpness (higher = sharper)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()

    # normalize sharpness roughly
    sharp_norm = min(1.0, sharpness / 800.0)

    # normalize face ratio roughly (0.01..0.20 typical)
    face_norm = min(1.0, face_ratio / 0.18)

    # combined score
    score = 0.55 + 0.43 * (0.55 * face_norm + 0.45 * sharp_norm)
    return float(max(0.55, min(0.98, score)))

main = Blueprint("main", __name__)

celebrity_detector = CelebrityDetector()
qa_engine = QAEngine()

# =========================================================
# 1) ORIGINAL TEMPLATE-BASED UI (UNCHANGED, STILL WORKS)
# =========================================================
@main.route("/", methods=["GET", "POST"])
def index():
    player_info = ""
    result_img_data = ""
    user_question = ""
    answer = ""
    player_name = ""

    if request.method == "POST":

        # IMAGE UPLOAD (HTML FORM)
        if "image" in request.files:
            image_file = request.files["image"]

            if image_file:
                img_bytes, face_box = process_image(image_file)
                player_info, player_name = celebrity_detector.identify(img_bytes)

                if face_box is not None:
                    result_img_data = base64.b64encode(img_bytes).decode()
                else:
                    player_info = "No face detected. Please try another image."

        # QUESTION ASK (HTML FORM)
        elif "question" in request.form:
            user_question = request.form["question"]
            player_name = request.form["player_name"]
            player_info = request.form["player_info"]
            result_img_data = request.form["result_img_data"]

            answer = qa_engine.ask_about_celebrity(player_name, user_question)

    return render_template(
        "index.html",
        player_info=player_info,
        result_img_data=result_img_data,
        user_question=user_question,
        answer=answer,
    )


# =========================================================
# 2) API ENDPOINTS FOR NEXT.JS (JSON)
# =========================================================

# Health check (for testing connectivity)
@main.route("/api/health", methods=["GET"])
def api_health():
    return jsonify({"status": "ok"}), 200


# Image → Celebrity prediction (Next.js uses this)
@main.route("/api/predict", methods=["POST"])
def api_predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files["image"]
    img_bytes, face_box = process_image(image_file)

    if face_box is None:
        return jsonify({"error": "No face detected"}), 200

    # ✅ Use the LLM REAL top-3 predictions
    player_info, player_name, top_predictions = celebrity_detector.identify_topk(img_bytes, k=3)

    return jsonify({
        "player_info": player_info,
        "player_name": player_name,
        "top_predictions": top_predictions
    }), 200




# Ask a question about the detected celebrity (Next.js uses this)
@main.route("/api/ask", methods=["POST"])
def api_ask():
    data = request.get_json(silent=True) or {}

    player_name = data.get("player_name")
    question = data.get("question")

    if not player_name or not question:
        return jsonify({"error": "player_name and question are required"}), 400

    answer = qa_engine.ask_about_celebrity(player_name, question)

    return jsonify({
        "answer": answer
    }), 200

@main.route("/api/metrics", methods=["GET"])
def api_metrics():
    # Replace with real tracking later (MLflow, Prometheus, etc.)
    return jsonify({
        "model_version": "v2.1.0",
        "stage": "Production",
        "accuracy": 0.925,
        "precision": 0.903,
        "recall": 0.887,
        "f1": 0.895,
        "latency_p95_ms": 210,
        "cost_per_1k_usd": 0.18,
        "drift_score": 0.12,
        "last_train": "2026-01-14 23:18",
        "alerts": ["No critical alerts"]
    }), 200


@main.route("/api/retrain", methods=["POST"])
def api_retrain():
    # Later: trigger CI/CD, GitHub Actions, Airflow, Kubeflow, etc.
    return jsonify({"ok": True, "message": "Retrain started"}), 200


@main.route("/api/promote", methods=["POST"])
def api_promote():
    # Later: promote model to Production stage
    return jsonify({"ok": True, "message": "Promotion started"}), 200

