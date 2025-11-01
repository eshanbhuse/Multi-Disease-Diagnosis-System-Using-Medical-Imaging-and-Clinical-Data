import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeartForm from "./pages/HeartForm";
import DiabetesForm from "./pages/DiabetesForm";
import ParkinsonForm from "./pages/ParkinsonForm";
import KidneyForm from "./pages/KidneyForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heart" element={<HeartForm />} />
        <Route path="/diabetes" element={<DiabetesForm />} />
        <Route path="/parkinson" element={<ParkinsonForm />} />
        <Route path="/kidney" element={<KidneyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
