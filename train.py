import numpy as np
import joblib
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, classification_report, confusion_matrix
from model.random_forest import RandomForest

DATA_PATH = os.path.join('data', 'fetal_health.csv')
MODEL_PATH = os.path.join('model', 'rf_model.joblib')



if __name__ == '__main__':
    #load the data
    df = pd.read_csv(DATA_PATH)

    X = df.drop(columns=["fetal_health"])
    y = df["fetal_health"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    X_train = X_train.to_numpy()
    X_test = X_test.to_numpy()
    y_train = y_train.to_numpy().astype(int)
    y_test = y_test.to_numpy().astype(int)


    print(f"  Train : {X_train.shape[0]} samples")
    print(f"  Test  : {X_test.shape[0]} samples")

    # Training the model
    model = RandomForest(
        n_trees=100,
        max_depth=10,
        min_samples_split=2
    )
    model.fit(X_train, y_train)

    joblib.dump({'model': model, 'X_test': X_test, 'y_test': y_test}, MODEL_PATH)
    print(f"\n  Model saved → {MODEL_PATH}")

    y_pred = model.predict(X_test)

    print("\nAccuracy:", accuracy_score(y_test, y_pred))
    print("Macro F1:", f1_score(y_test, y_pred, average="macro"))

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))