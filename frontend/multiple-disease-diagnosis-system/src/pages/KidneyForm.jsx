import React, { useState } from "react";
import "../index.css";

function KidneyForm() {
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    al: "",
    su: "",
    rbc: "",
    pc: "",
    pcc: "",
    ba: "",
    bgr: "",
    bu: "",
    sc: "",
    sod: "",
    pot: "",
    hemo: "",
    pcv: "",
    wc: "",
    rc: "",
    htn: "",
    dm: "",
    cad: "",
    appet: "",
    pe: "",
    ane: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Label encoding (must match your model)
    const mapping = {
      normal: 0,
      abnormal: 1,
      present: 0,
      notpresent: 1,
      yes: 0,
      no: 1,
      good: 0,
      poor: 1,
    };

    // Convert formData to numeric version
    const numericData = {};
    for (const key in formData) {
      const value = formData[key];
      if (mapping.hasOwnProperty(value.toLowerCase())) {
        numericData[key] = mapping[value.toLowerCase()];
      } else if (value === "") {
        numericData[key] = 0;
      } else {
        numericData[key] = parseFloat(value);
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_kidney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numericData),
      });

      const data = await response.json();
      setResult(data.prediction || "Error occurred");
    } catch (error) {
      setResult("Error connecting to server");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Kidney Disease Prediction</h2>
        <p>Enter your health details to check your risk level.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          {/* Numeric Inputs */}
          <input type="number" name="age" placeholder="AGE" value={formData.age} onChange={handleChange} />
          <input type="number" name="bp" placeholder="BP" value={formData.bp} onChange={handleChange} />
          <input type="number" step="any" name="sg" placeholder="SG" value={formData.sg} onChange={handleChange} />
          <input type="number" step="any" name="al" placeholder="AL" value={formData.al} onChange={handleChange} />
          <input type="number" step="any" name="su" placeholder="SU" value={formData.su} onChange={handleChange} />

          {/* Select Inputs */}
          <select name="rbc" value={formData.rbc} onChange={handleChange}>
            <option value="">RBC</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
          </select>

          <select name="pc" value={formData.pc} onChange={handleChange}>
            <option value="">PC</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
          </select>

          <select name="pcc" value={formData.pcc} onChange={handleChange}>
            <option value="">PCC</option>
            <option value="present">Present</option>
            <option value="notpresent">Not Present</option>
          </select>

          <select name="ba" value={formData.ba} onChange={handleChange}>
            <option value="">BA</option>
            <option value="present">Present</option>
            <option value="notpresent">Not Present</option>
          </select>

          <input type="number" step="any" name="bgr" placeholder="BGR" value={formData.bgr} onChange={handleChange} />
          <input type="number" step="any" name="bu" placeholder="BU" value={formData.bu} onChange={handleChange} />
          <input type="number" step="any" name="sc" placeholder="SC" value={formData.sc} onChange={handleChange} />
          <input type="number" step="any" name="sod" placeholder="SOD" value={formData.sod} onChange={handleChange} />
          <input type="number" step="any" name="pot" placeholder="POT" value={formData.pot} onChange={handleChange} />
          <input type="number" step="any" name="hemo" placeholder="HEMO" value={formData.hemo} onChange={handleChange} />
          <input type="number" step="any" name="pcv" placeholder="PCV" value={formData.pcv} onChange={handleChange} />
          <input type="number" step="any" name="wc" placeholder="WC" value={formData.wc} onChange={handleChange} />
          <input type="number" step="any" name="rc" placeholder="RC" value={formData.rc} onChange={handleChange} />

          <select name="htn" value={formData.htn} onChange={handleChange}>
            <option value="">HTN</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select name="dm" value={formData.dm} onChange={handleChange}>
            <option value="">DM</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select name="cad" value={formData.cad} onChange={handleChange}>
            <option value="">CAD</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select name="appet" value={formData.appet} onChange={handleChange}>
            <option value="">APPET</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
          </select>

          <select name="pe" value={formData.pe} onChange={handleChange}>
            <option value="">PE</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select name="ane" value={formData.ane} onChange={handleChange}>
            <option value="">ANE</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

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
}

export default KidneyForm;
