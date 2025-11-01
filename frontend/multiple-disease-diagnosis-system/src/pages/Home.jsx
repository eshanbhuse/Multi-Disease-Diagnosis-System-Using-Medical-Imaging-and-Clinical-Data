import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = () => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selectedDisease) {
      navigate(`/${selectedDisease}`);
    } else {
      alert("Please select a disease to continue.");
    }
  };

  return (
    <div className="home-container">

      <div className="home-content">
        <h1 className="home-heading">Multi-Disease Diagnosis System</h1>
        <p className="home-subheading">
          Quickly assess your health risks using our disease prediction system.
          Select a disease below to begin your assessment.
        </p>

        <div className="dropdown-container">
          <select
            className="disease-select"
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
          >
            <option value="">Select a Disease</option>
            <option value="heart">Heart Disease</option>
            <option value="diabetes">Diabetes</option>
            <option value="parkinson">Parkinson's Disease</option>
            <option value="kidney">Kidney Disease</option>
          </select>
        </div>

        <button className="start-btn" onClick={handleNavigate}>
          Start Diagnosis
        </button>
      </div>
    </div>
  );
};

export default Home;
