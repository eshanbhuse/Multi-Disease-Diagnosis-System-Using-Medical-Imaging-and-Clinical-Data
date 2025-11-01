import React, { useState } from "react";
import "../index.css"; // make sure this includes your CSS styles

function KidneyForm() {
  const [formData, setFormData] = useState({
    id: "",
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
    classification: "",
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

    const response = await fetch("http://127.0.0.1:5000/predict_kidney", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Kidney Disease Prediction</h2>
        <p>Enter your health details to check your risk level.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          {/* AGE */}
          <input type="number" name="age" placeholder="AGE" value={formData.age} onChange={handleChange} required />

          {/* BP */}
          <input type="number" name="bp" placeholder="BP" value={formData.bp} onChange={handleChange} required />

          {/* SG */}
          <input type="number" step="any" name="sg" placeholder="SG" value={formData.sg} onChange={handleChange} required />

          {/* AL */}
          <input type="number" step="any" name="al" placeholder="AL" value={formData.al} onChange={handleChange} required />

          {/* SU */}
          <input type="number" step="any" name="su" placeholder="SU" value={formData.su} onChange={handleChange} required />

          {/* RBC */}
          <select name="rbc" value={formData.rbc} onChange={handleChange} required>
            <option value="">RBC</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
          </select>

          {/* PC */}
          <select name="pc" value={formData.pc} onChange={handleChange} required>
            <option value="">PC</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
          </select>

          {/* PCC */}
          <select name="pcc" value={formData.pcc} onChange={handleChange} required>
            <option value="">PCC</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* BA */}
          <select name="ba" value={formData.ba} onChange={handleChange} required>
            <option value="">BA</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* BGR */}
          <input type="number" step="any" name="bgr" placeholder="BGR" value={formData.bgr} onChange={handleChange} required />

          {/* BU */}
          <input type="number" step="any" name="bu" placeholder="BU" value={formData.bu} onChange={handleChange} required />

          {/* SC */}
          <input type="number" step="any" name="sc" placeholder="SC" value={formData.sc} onChange={handleChange} required />

          {/* SOD */}
          <input type="number" step="any" name="sod" placeholder="SOD" value={formData.sod} onChange={handleChange} required />

          {/* POT */}
          <input type="number" step="any" name="pot" placeholder="POT" value={formData.pot} onChange={handleChange} required />

          {/* HEMO */}
          <input type="number" step="any" name="hemo" placeholder="HEMO" value={formData.hemo} onChange={handleChange} required />

          {/* PCV */}
          <input type="number" step="any" name="pcv" placeholder="PCV" value={formData.pcv} onChange={handleChange} required />

          {/* WC */}
          <input type="number" step="any" name="wc" placeholder="WC" value={formData.wc} onChange={handleChange} required />

          {/* RC */}
          <input type="number" step="any" name="rc" placeholder="RC" value={formData.rc} onChange={handleChange} required />

          {/* HTN */}
          <select name="htn" value={formData.htn} onChange={handleChange} required>
            <option value="">HTN</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* DM */}
          <select name="dm" value={formData.dm} onChange={handleChange} required>
            <option value="">DM</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* CAD */}
          <select name="cad" value={formData.cad} onChange={handleChange} required>
            <option value="">CAD</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* APPET */}
          <select name="appet" value={formData.appet} onChange={handleChange} required>
            <option value="">APPET</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
          </select>

          {/* PE */}
          <select name="pe" value={formData.pe} onChange={handleChange} required>
            <option value="">PE</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* ANE */}
          <select name="ane" value={formData.ane} onChange={handleChange} required>
            <option value="">ANE</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* CLASSIFICATION */}
          <select name="classification" value={formData.classification} onChange={handleChange} required>
            <option value="">CLASSIFICATION</option>
            <option value="ckd">CKD</option>
            <option value="notckd">Not CKD</option>
          </select>

          {/* Submit Button */}
          <button type="submit" className="predict-btn">
            Predict
          </button>
        </form>

        {result && (
          <div className="result-box">
            <h3>Prediction Result:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KidneyForm;
