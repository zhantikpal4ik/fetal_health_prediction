import numpy as np

class Node:
    def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
        self.feature = feature    
        self.threshold = threshold  
        self.left = left      
        self.right = right      
        self.value = value      

    def is_leaf(self):
        return self.value is not None

class DecisionTree: 
    def __init__(self, max_depth=10, min_samples_split=2, n_features=None):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.n_features = n_features 
        self.root = None
    
    def _gini(self, y):
        classes, counts = np.unique(y, return_counts=True)
        probs = counts / len(y)
        return 1.0 - np.sum(probs ** 2)

    def _split_gini(self, y_left, y_right):
        n = len(y_left) + len(y_right)
        w_left = len(y_left)  / n
        w_right = len(y_right) / n
        return w_left * self._gini(y_left) + w_right * self._gini(y_right)
    
    def _best_split(self, X, y):
        n_samples, n_cols = X.shape
        best_gini      = float('inf')
        best_feature   = None
        best_threshold = None

        feature_indices = np.random.choice(
            n_cols,
            size=self.n_features or n_cols,
            replace=False
        )

        for feature in feature_indices:
            thresholds = np.unique(X[:, feature])
            for threshold in thresholds:
                left_mask  = X[:, feature] <= threshold
                right_mask = ~left_mask

                if left_mask.sum() == 0 or right_mask.sum() == 0:
                    continue

                gini = self._split_gini(y[left_mask], y[right_mask])

                if gini < best_gini:
                    best_gini      = gini
                    best_feature   = feature
                    best_threshold = threshold

        return best_feature, best_threshold

# building the tree recursively
    def _build(self, X, y, depth):
        n_samples  = len(y)
        n_classes  = len(np.unique(y))

        if (depth >= self.max_depth or
                n_samples < self.min_samples_split or
                n_classes == 1):
            majority_class = np.bincount(y).argmax()
            return Node(value=majority_class)

        feature, threshold = self._best_split(X, y)

        if feature is None:  
            majority_class = np.bincount(y).argmax()
            return Node(value=majority_class)

        left_mask  = X[:, feature] <= threshold
        right_mask = ~left_mask

        left  = self._build(X[left_mask],  y[left_mask],  depth + 1)
        right = self._build(X[right_mask], y[right_mask], depth + 1)

        return Node(feature=feature, threshold=threshold, left=left, right=right)

    def fit(self, X, y):
        self.root = self._build(X, y, depth=0)
        return self

    def _predict_one(self, x, node):
        if node.is_leaf():
            return node.value
        if x[node.feature] <= node.threshold:
            return self._predict_one(x, node.left)
        return self._predict_one(x, node.right)

    def predict(self, X):
        return np.array([self._predict_one(x, self.root) for x in X])

    
