import React, { useState } from "react";
import "../index.css";

const HeartForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert dropdown "sex" value (male/female) to 1/0
    const sexValue = formData.sex === "male" ? 1 : 0;

    const response = await fetch("http://127.0.0.1:5000/predict_heart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: Number(formData.age),
        sex: sexValue,
        cp: Number(formData.cp),
        trestbps: Number(formData.trestbps),
        chol: Number(formData.chol),
        fbs: Number(formData.fbs),
        restecg: Number(formData.restecg),
        thalach: Number(formData.thalach),
        exang: Number(formData.exang),
        oldpeak: Number(formData.oldpeak),
        slope: Number(formData.slope),
        ca: Number(formData.ca),
        thal: Number(formData.thal),
      }),
    });

    const data = await response.json();
    setResult(data.result || data.error);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Heart Disease Prediction</h2>
        <p>Enter your health details to check your risk level.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) =>
            key === "sex" ? (
              <select
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <input
                key={key}
                type="number"
                name={key}
                placeholder={key.toUpperCase()}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )
          )}

          <button type="submit" className="predict-btn">Predict</button>
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

export default HeartForm;
