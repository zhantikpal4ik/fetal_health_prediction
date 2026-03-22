# FetalGuard

FetalGuard is an AI-assisted fetal health triage and decision support prototype built for a healthcare and wellbeing hackathon. It combines a clinician-facing EMR-style dashboard with a machine learning model that predicts fetal health status from cardiotocography (CTG) features.

## Overview

Cardiotocography data can be difficult and time-sensitive to interpret in clinical settings. FetalGuard helps streamline this process by presenting patient information, CTG summary features, and an integrated prediction workflow that classifies fetal health into:

- Normal
- Suspect
- Pathological

The goal is to support faster triage, reduce cognitive load, and highlight higher-risk cases for timely review.

## Features

- EMR-style clinical dashboard
- Patient chart view
- CTG feature summary page
- ML-powered fetal health prediction
- Prediction probabilities by class
- Clinical recommendation display
- High-priority alert workflow
- Assessment history and settings pages

## Machine Learning

The model predicts fetal health class from 21 CTG-derived input features.

### Input features
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

### Output classes
- 1 = Normal
- 2 = Suspect
- 3 = Pathological

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind-style UI generated in Replit
- Wouter
- Framer Motion

### Backend
- Python
- Flask
- Flask-CORS
- NumPy
- Joblib

### Model
- Custom Random Forest implementation
- Trained on fetal health classification data

### Dev / Demo Infrastructure
- Replit for frontend prototyping
- ngrok for exposing the local Flask API during demo

## Repository Structure

```text
Fetal-Health-Dashboard/
├── data/                       # Dataset files
├── model/                      # ML model code and saved model
├── model_api/                  # Flask API for inference
├── UI/                         # Frontend workspace
│   └── artifacts/
│       └── fetalguard/         # Main React app
├── train.py                    # Model training script
├── requirements.txt
└── README.md