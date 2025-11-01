import React from "react";

function DiseaseDropdown({ onSelect }) {
  const diseases = ["Heart Disease", "Diabetes", "Parkinson's Disease"];

  return (
    <div style={styles.container}>
      <label style={styles.label}>Select Disease</label>
      <select
        style={styles.dropdown}
        defaultValue=""
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled>
          Choose a disease
        </option>
        {diseases.map((disease) => (
          <option key={disease} value={disease}>
            {disease}
          </option>
        ))}
      </select>
    </div>
  );
}


export default DiseaseDropdown;
