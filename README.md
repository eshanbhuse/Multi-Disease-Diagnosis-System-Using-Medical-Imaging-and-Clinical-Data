# 🧠 Multi-Disease Diagnosis System using Medical Imaging and Clinical Data

A web-based system that predicts multiple diseases such as **Diabetes**, **Heart Disease**, **Kidney Disease** and **Parkinson's Disease** using **Machine Learning**.  
The project combines a **Flask backend** (for model prediction) and a **React frontend** (for user interaction) to provide accurate and real-time medical insights.

---

## 🚀 Features

- Predicts multiple diseases from user health data.
- Interactive and responsive React-based frontend.
- Flask backend integrated with pre-trained ML models.
- REST API communication between frontend and backend.
- Deployed using **Vercel (frontend & backend)**.

---

## 🧩 Machine Learning Models

Each disease prediction model is trained on publicly available medical datasets:

| Disease | Model Used | Accuracy | File |
|----------|-------------|----------|------|
| Diabetes | Logistic Regression | ~97% | `diabetes_model.sav` |
| Heart Disease | Random Forest | ~94% | `heart_model.sav` |
| Kidney Disease | Support Vector Machine (SVM) | ~96% | `kidney.pkl` | 
| Parkinson's Disease  | Logistic Regression  | ~96%  | `parkinsons_model.sav` |

The models are saved as `.sav` files and loaded by Flask for fast, real-time inference.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- HTML, CSS, JavaScript  
- Axios for API requests  

### Backend
- Flask (Python)  
- Scikit-learn, Pandas, NumPy  
- Pickle for model serialization  

### Deployment
- **Frontend:** Vercel  
- **Backend:** Vercel  

