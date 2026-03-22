import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

FEATURE_ORDER = [
    "baseline value",
    "accelerations",
    "fetal_movement",
    "uterine_contractions",
    "light_decelerations",
    "severe_decelerations",
    "prolongued_decelerations",
    "abnormal_short_term_variability",
    "mean_value_of_short_term_variability",
    "percentage_of_time_with_abnormal_long_term_variability",
    "mean_value_of_long_term_variability",
    "histogram_width",
    "histogram_min",
    "histogram_max",
    "histogram_number_of_peaks",
    "histogram_number_of_zeroes",
    "histogram_mode",
    "histogram_mean",
    "histogram_median",
    "histogram_variance",
    "histogram_tendency",
]

LABEL_MAP = {
    1: "Normal",
    2: "Suspect",
    3: "Pathological",
}

RECOMMENDATION_MAP = {
    "Normal": "Continue routine monitoring.",
    "Suspect": "Repeat assessment and increase observation.",
    "Pathological": "Urgent senior obstetric review recommended.",
}

#BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "rf_model.joblib")
MODEL_PATH = os.path.join(PROJECT_ROOT, "model", "rf_model.joblib")


checkpoint = joblib.load(MODEL_PATH)
rf = checkpoint["model"]

@app.get("/healthz")
def healthz():
    return jsonify({"status": "ok"})

@app.post("/predict")
def predict():
    try:
        payload = request.get_json()
        if not payload or "features" not in payload:
            return jsonify({"error": "Missing 'features' in request body"}), 400

        features = payload["features"]

        row = []
        for feature_name in FEATURE_ORDER:
            if feature_name not in features:
                return jsonify({"error": f"Missing feature: {feature_name}"}), 400
            row.append(float(features[feature_name]))

        X = np.array([row], dtype=float)

        pred = int(rf.predict(X)[0])
        probs = rf.predict_proba(X)[0]

        response = {
            "prediction": pred,
            "label": LABEL_MAP[pred],
            "recommendation": RECOMMENDATION_MAP[LABEL_MAP[pred]],
            "probabilities": {
                "Normal": round(float(probs[0]) * 100, 2),
                "Suspect": round(float(probs[1]) * 100, 2),
                "Pathological": round(float(probs[2]) * 100, 2),
            },
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)