
import warnings
from sklearn.exceptions import InconsistentVersionWarning
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)

# ---------------- LOAD MODELS ----------------
try:
    with open("saved_models/heart_disease_model.sav", "rb") as f:
        heart_model = pickle.load(f)
    with open("saved_models/diabetes_model.sav", "rb") as f:
        diabetes_model = pickle.load(f)
    with open("saved_models/parkinsons_model.sav", "rb") as f:
        parkinson_model = pickle.load(f)
    with open("saved_models/kidney.pkl", "rb") as f:
        kidney_model = pickle.load(f)
except Exception as e:
    print("Error loading models:", e)


# ---------------- HEART DISEASE PREDICTION ----------------
@app.route("/predict_heart", methods=["POST"])
def predict_heart():
    try:
        data = request.json
        features = np.array([
            data["age"], data["sex"], data["cp"], data["trestbps"],
            data["chol"], data["fbs"], data["restecg"], data["thalach"],
            data["exang"], data["oldpeak"], data["slope"], data["ca"], data["thal"]
        ]).reshape(1, -1)

        prediction = heart_model.predict(features)[0]
        result = "The person has Heart Disease" if prediction == 1 else "The person does not have Heart Disease"
        return jsonify({"prediction": int(prediction), "result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ---------------- DIABETES PREDICTION ----------------
@app.route("/predict_diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.json
        features = [
            data["Pregnancies"], data["Glucose"], data["BloodPressure"],
            data["SkinThickness"], data["Insulin"], data["BMI"],
            data["DiabetesPedigreeFunction"], data["Age"]
        ]

        features = np.array(features).reshape(1, -1)
        prediction = diabetes_model.predict(features)[0]
        result = "The person has Diabetes" if prediction == 1 else "The person does not have Diabetes"
        return jsonify({"prediction": int(prediction), "result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400



# ---------------- PARKINSON’S DISEASE PREDICTION ----------
@app.route("/predict_parkinson", methods=["POST"])
def predict_parkinson():
    try:
        data = request.json

        features = np.array([
            data["MDVP_Fo_Hz"], data["MDVP_Fhi_Hz"], data["MDVP_Flo_Hz"],
            data["MDVP_Jitter_percent"], data["MDVP_Jitter_Abs"], data["MDVP_RAP"],
            data["MDVP_PPQ"], data["Jitter_DDP"], data["MDVP_Shimmer"],
            data["MDVP_Shimmer_dB"], data["Shimmer_APQ3"], data["Shimmer_APQ5"],
            data["MDVP_APQ"], data["Shimmer_DDA"], data["NHR"], data["HNR"],
            data["RPDE"], data["DFA"], data["spread1"], data["spread2"],
            data["D2"], data["PPE"]
        ]).reshape(1, -1)

        prediction = parkinson_model.predict(features)[0]

        result = "The person has Parkinson’s Disease" if prediction == 1 else "The person does not have Parkinson’s Disease"

        return jsonify({
            "prediction": int(prediction),
            "status": result
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ---------------- KIDNEY DISEASE PREDICTION ----------------
@app.route("/predict_kidney", methods=["POST"])
def predict_kidney():
    try:
        data = request.get_json()

        # Ensure all features are converted to float
        features = np.array([
            float(data.get("age", 0)),
            float(data.get("bp", 0)),
            float(data.get("sg", 0)),
            float(data.get("al", 0)),
            float(data.get("su", 0)),
            float(data.get("rbc", 0)),
            float(data.get("pc", 0)),
            float(data.get("pcc", 0)),
            float(data.get("ba", 0)),
            float(data.get("bgr", 0)),
            float(data.get("bu", 0)),
            float(data.get("sc", 0)),
            float(data.get("sod", 0)),
            float(data.get("pot", 0)),
            float(data.get("hemo", 0)),
            float(data.get("pcv", 0)),
            float(data.get("wc", 0)),
            float(data.get("rc", 0)),
            float(data.get("htn", 0)),
            float(data.get("dm", 0)),
            float(data.get("cad", 0)),
            float(data.get("appet", 0)),
            float(data.get("pe", 0)),
            float(data.get("ane", 0))
        ]).reshape(1, -1)

        # Predict
        prediction = kidney_model.predict(features)[0]

        # Build response
        result = "The person has Chronic Kidney Disease" if prediction == 1 else "The person does not have Chronic Kidney Disease"

        return jsonify({
            "prediction": int(prediction),
            "status": result
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
