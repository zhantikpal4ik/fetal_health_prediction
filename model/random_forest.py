import numpy as np
from model.decision_tree import DecisionTree

class RandomForest:
    def __init__(self, n_trees=100, max_depth=10, min_samples_split=2):
        self.n_trees           = n_trees
        self.max_depth         = max_depth
        self.min_samples_split = min_samples_split
        self.trees             = []

    def _bootstrap(self, X, y):
        n_samples = X.shape[0]
        indices   = np.random.choice(n_samples, size=n_samples, replace=True)
        return X[indices], y[indices]

    def fit(self, X, y):
        self.trees = []
        n_features = int(np.sqrt(X.shape[1]))  

        for i in range(self.n_trees):
            X_boot, y_boot = self._bootstrap(X, y)
            tree = DecisionTree(
                max_depth=self.max_depth,
                min_samples_split=self.min_samples_split,
                n_features=n_features
            )
            tree.fit(X_boot, y_boot)
            self.trees.append(tree)

            if (i + 1) % 20 == 0:
                print(f"  Trees trained: {i + 1}/{self.n_trees}")

        return self

    def predict(self, X):
        all_preds = np.array([tree.predict(X) for tree in self.trees])

        final_preds = []
        for sample_preds in all_preds.T:
            values, counts = np.unique(sample_preds, return_counts=True)
            final_preds.append(values[np.argmax(counts)])

        return np.array(final_preds)

    def predict_proba(self, X):
        all_preds = np.array([tree.predict(X) for tree in self.trees])
        classes   = np.array([1, 2, 3])
        proba     = np.zeros((X.shape[0], len(classes)))

        for i, sample_preds in enumerate(all_preds.T):
            for j, cls in enumerate(classes):
                proba[i, j] = np.sum(sample_preds == cls) / self.n_trees

        return proba
