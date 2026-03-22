# FetalGuard

FetalGuard is an AI-assisted fetal health triage and decision support prototype built for a healthcare hackathon. It combines a clinician-facing dashboard with a machine learning model that predicts fetal health status from cardiotocography (CTG) features.

---

## Overview

Cardiotocography (CTG) data can be complex and time-sensitive to interpret in clinical settings. FetalGuard helps streamline this process by:

- Aggregating key CTG features
- Running real-time ML predictions
- Highlighting high-risk cases
- Supporting faster clinical decision-making

The system classifies fetal health into:
- Normal
- Suspect
- Pathological

---

## Features

- Clinical dashboard with patient overview
- Patient chart view with medical details
- CTG feature summary page
- One-click ML prediction
- Class probability visualization
- Clinical recommendation output
- High-priority alert system
- Assessment history tracking

---

## Machine Learning

The model predicts fetal health from 21 CTG-derived features.

### Input Features
- baseline value  
- accelerations  
- fetal_movement  
- uterine_contractions  
- light_decelerations  
- severe_decelerations  
- prolongued_decelerations  
- abnormal_short_term_variability  
- mean_value_of_short_term_variability  
- percentage_of_time_with_abnormal_long_term_variability  
- mean_value_of_long_term_variability  
- histogram_width  
- histogram_min  
- histogram_max  
- histogram_number_of_peaks  
- histogram_number_of_zeroes  
- histogram_mode  
- histogram_mean  
- histogram_median  
- histogram_variance  
- histogram_tendency  

### Output Classes
- 1 = Normal  
- 2 = Suspect  
- 3 = Pathological  

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Replit UI framework
- Tailwind-style components

### Backend
- Python
- Flask
- Flask-CORS
- NumPy
- Joblib

### Model
- Random Forest classifier
- Trained on fetal health dataset

### Demo Infrastructure
- Replit (frontend hosting)
- ngrok (API tunneling)

---

## Repository Structure

```text
Fetal-Health-Dashboard/
├── data/
├── model/
├── model_api/
├── UI/
│   └── artifacts/fetalguard/
├── train.py
├── requirements.txt
└── README.md


---

## How It Works

1. A clinician opens the patient chart and CTG summary  
2. The frontend gathers CTG feature values  
3. These values are sent to the Flask API  
4. The model returns:
   - predicted class  
   - class probabilities  
   - recommendation  
5. The frontend displays results in the Risk Prediction page  

---

## Running the Project

### 1. Clone the repository
git clone https://github.com/zhantikpal4ik/fetal_health_prediction.git
cd Fetal-Health-Dashboard

### 2. Install backend dependencies
pip install flask flask-cors joblib numpy pandas scikit-learn

### 3. Run Flask API
py model_api/app.py

API runs at:
http://127.0.0.1:8000

Health Check:
http://127.0.0.1:8000/healthz


### 4. Run frontend
cd UI/artifacts/fetalguard
pnpm install
pnpm dev

### 5. Run ngrok
ngrok http 8000

Then update the frontend API URL to the ngrok link.

---

## Demo Workflow

1. Open Dashboard  
2. Go to Patient Chart  
3. Open CTG Summary  
4. Click **Run Prediction**  
5. View Risk Prediction results  

---

## Current Limitations

- Prototype uses predefined patient data  
- No dynamic multi-patient prediction yet  
- Feature importance is simplified  
- Requires local Flask + ngrok for demo  

---

## Future Improvements

- Dynamic patient-based predictions  
- Cloud deployment (remove ngrok dependency)  
- Advanced explainability (e.g., SHAP)  
- CTG waveform/time-series analysis  
- EMR system integration  
- Authentication system  

---

## Team

- Shania Poon  
- Zhantore Borangali
- Tanya Sahota

---

## Acknowledgments

- Fetal Health dataset (Kaggle) (URL: https://www.kaggle.com/datasets/andrewmvd/fetal-health-classification)
- Clinical CTG research literature (Ayres de Campos et al. (2000) SisPorto 2.0 A Program for Automated Analysis of Cardiotocograms. J Matern Fetal Med 5:311-318) 
- Replit for rapid prototyping  











