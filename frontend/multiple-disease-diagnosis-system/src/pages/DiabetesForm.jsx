import React, { useState } from "react";
import "../index.css";

const DiabetesForm = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    AGE: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/predict_diabetes","https://multi-disease-diagnosis-system-usin-two.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(
          Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
        )
      ),
    });

    const data = await response.json();
    setResult(data.result || data.error);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Diabetes Risk Prediction</h2>
        <p>
          Enter your health details to check your risk level.


        </p>

        <form className="form-grid" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="number"
              step="any"
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit" className="predict-btn">
            Predict
          </button>
        </form>

        {result && (
          <div className="result-box">
            <h3>{result}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiabetesForm;
