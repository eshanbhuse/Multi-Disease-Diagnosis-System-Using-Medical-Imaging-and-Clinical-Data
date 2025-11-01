import React, { useState } from "react";
import "../index.css";

const ParkinsonForm = () => {
  const [formData, setFormData] = useState({
    MDVP_Fo_Hz: "",
    MDVP_Fhi_Hz: "",
    MDVP_Flo_Hz: "",
    MDVP_Jitter_percent: "",
    MDVP_Jitter_Abs: "",
    MDVP_RAP: "",
    MDVP_PPQ: "",
    Jitter_DDP: "",
    MDVP_Shimmer: "",
    MDVP_Shimmer_dB: "",
    Shimmer_APQ3: "",
    Shimmer_APQ5: "",
    MDVP_APQ: "",
    Shimmer_DDA: "",
    NHR: "",
    HNR: "",
    RPDE: "",
    DFA: "",
    spread1: "",
    spread2: "",
    D2: "",
    PPE: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/predict_parkinson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, Number(v)]))
      ),
    });

    const data = await response.json();
    setResult(data.result || data.error);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Parkinson’s Disease Prediction</h2>
        <p>Enter your health details to check your risk level.
</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="number"
              name={key}
              placeholder={key.replace(/_/g, " ")}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          ))}

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

export default ParkinsonForm;
