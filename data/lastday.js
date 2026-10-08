// The last study day (2026-10-08): the plan, and the 8 answer templates the learner built this term.
// Templates use the same wording and notation as the walks (spec/WALKS.md §0.8). Rendered by app.js at #/day.
(function () {
  const R = String.raw;
  window.LASTDAY = {
    mock: "2025B",   // Block 1: the timed exam (2nd hardest; 2026B is the learner's own Moed B, half-remembered)
    check: "2026A",  // spare paper (Block 4 is now the homework)
    // Block 4: the homework, as exam-style practice (built from the learner's OWN HW code / HW theory answers; not real exam questions).
    // fill = code with blanks, checked like the site's code trainer; bugs = planted bugs, click the wrong lines; theory = answer skeleton with gaps ⟦…⟧.
    hw: {
      fill: [
        { key: "hw_gd", title: "Gradient descent with a stop rule", hw: "hw1 · gradient_descent_stop_condition", exams: ["2025B-q1.5", "2026A-q1.4", "2026B-q1.4"],
          api: [
            [R`X`, R`\(n \times (p+1)\) data matrix, ones column included`],
            [R`y`, R`\((n,)\) targets`],
            [R`w`, R`\((p+1,)\) starting weights; returned as the learned weights`],
            [R`eta`, R`learning rate (a number)`],
            [R`compute_mean_squared_error(X, y, w)`, R`returns one number: \(J(w) = \frac1n\|Xw - y\|^2\)`],
            [R`np.linalg.norm(v)`, R`returns one number: the length \(\sqrt{v_1^2 + v_2^2 + \cdots}\) of the vector <code>v</code>`],
          ],
          prompt: R`Fill in the blanks so the function runs gradient descent on \(J(w) = \frac1n\|Xw - y\|^2\) and stops once the gradient's norm is below <code>epsilon</code>.`,
          code: `def gradient_descent_stop_condition(X, y, w, eta, max_iter, epsilon=1e-5):
    J_history = []
    n = ___(1)___
    for _ in range(max_iter):
        slope = ___(2)___            # the gradient of J at w
        w = ___(3)___
        J_history.append(compute_mean_squared_error(X, y, w))
        if ___(4)___:
            break
    return w, J_history`,
          blanks: [
            { label: "(1)  n =", accept: ["X.shape[0]", "len(X)", "len(y)", "y.shape[0]"] },
            { label: "(2)  slope =", accept: ["(2/n)*X.T@(X@w-y)", "2/n*X.T@(X@w-y)", "2*X.T@(X@w-y)/n", "(2/n)*X.T.dot(X.dot(w)-y)", "(2/n)*X.T@(X@w-y)"] },
            { label: "(3)  w =", accept: ["w-eta*slope", "w-slope*eta"] },
            { label: "(4)", accept: ["np.linalg.norm(slope)<epsilon", "np.linalg.norm(slope)<=epsilon"] },
          ] },
        { key: "hw_cv", title: "n-fold cross-validation", hw: "hw4 · cross_validation", exams: ["2025C-q1.5", "2025A-q1.4", "2025B-q4.3", "2026A-q3.5"],
          api: [
            [R`X`, R`\((n, p)\) samples; <code>y</code>: \((n,)\) labels`],
            [R`np.array_split(A, k)`, R`returns a list of \(k\) arrays: the rows of <code>A</code> cut into \(k\) consecutive blocks (the folds)`],
            [R`np.vstack(list)`, R`stacks 2-D arrays' rows into one array; <code>np.concatenate(list)</code> joins 1-D arrays`],
            [R`classifier`, R`an untrained model object; <code>copy.deepcopy(classifier)</code> returns a fresh untrained copy`],
            [R`model.fit(X, y)`, R`trains the model on samples <code>X</code> \((m, p)\) with labels <code>y</code> \((m,)\); returns nothing`],
            [R`model.predict(X)`, R`returns \((m,)\): the predicted label of each row of <code>X</code>`],
            [R`np.mean(a == b)`, R`the fraction of positions where <code>a</code> and <code>b</code> are equal (True counts 1)`],
            [R`returns`, R`<code>accuracy</code>: the average of the folds' accuracies (one number)`],
          ],
          prompt: R`Fill in the blanks so the function returns the average accuracy over the folds: train on all folds but one, test on the one left out.`,
          code: `X_folds = np.array_split(X, n_folds)
y_folds = np.array_split(y, n_folds)
fold_accuracies = []
for i in range(n_folds):
    X_val, y_val = ___(1)___
    X_tr = np.vstack([X_folds[j] for j in range(n_folds) if ___(2)___])
    y_tr = np.concatenate([y_folds[j] for j in range(n_folds) if j != i])
    model = copy.deepcopy(classifier)
    model.fit(___(3)___)
    fold_accuracies.append(___(4)___)
accuracy = ___(5)___`,
          blanks: [
            { label: "(1)  X_val, y_val =", accept: ["X_folds[i],y_folds[i]"] },
            { label: "(2)", accept: ["j!=i", "i!=j"] },
            { label: "(3)", accept: ["X_tr,y_tr"] },
            { label: "(4)", accept: ["np.mean(model.predict(X_val)==y_val)", "np.mean(y_val==model.predict(X_val))", "np.mean(model.predict(X_val).ravel()==y_val.ravel())"] },
            { label: "(5)  accuracy =", accept: ["np.mean(fold_accuracies)", "float(np.mean(fold_accuracies))", "sum(fold_accuracies)/n_folds", "sum(fold_accuracies)/len(fold_accuracies)"] },
          ] },
        { key: "hw_lr", title: "Logistic regression, gradient descent", hw: "hw3 · LogisticRegressionGD.fit", exams: ["2025A-q4.5", "2026B-q3.4"],
          api: [
            [R`X`, R`\((n, p+1)\) samples, ones column included; <code>y_01</code>: \((n,)\) labels as 0/1`],
            [R`self.w_`, R`\((p+1,)\) weights, already initialized`],
            [R`self.learning_rate`, R`the step size η`],
            [R`self.eps`, R`stop when the loss changes by less than this`],
            [R`self.predict_proba(X)`, R`returns \((n,)\): \(\sigma(w^\top x^{(i)})\) for every row, with the current <code>self.w_</code>`],
            [R`self.BCE_loss(X, y)`, R`returns one number: the mean BCE loss with the current <code>self.w_</code>`],
            [R`self.loss_history_`, R`a Python list of the losses so far; <code>[-1]</code> = last, <code>[-2]</code> = the one before`],
            [R`np.exp(a)`, R`\(e^{a}\), entry by entry`],
          ],
          prompt: R`<code>X</code> already has the ones column, <code>y_01</code> holds the labels as 0/1. Fill in the blanks: one gradient step of the BCE loss per iteration, stopping when the loss changes by less than <code>self.eps</code>.`,
          code: `n = X.shape[0]
for _ in range(self.max_iter):
    p = ___(1)___                 # P(y = 1 | x) for every sample
    gradient = ___(2)___
    self.w_ = ___(3)___
    self.loss_history_.append(self.BCE_loss(X, y))
    if len(self.loss_history_) >= 2 and ___(4)___:
        break`,
          blanks: [
            { label: "(1)  p =", accept: ["1.0/(1.0+np.exp(-X@self.w_))", "1/(1+np.exp(-X@self.w_))", "self.predict_proba(X)", "1/(1+np.exp(-(X@self.w_)))"] },
            { label: "(2)  gradient =", accept: ["X.T@(p-y_01)/n", "(1/n)*X.T@(p-y_01)", "X.T@(p-y_01)/X.shape[0]"] },
            { label: "(3)  self.w_ =", accept: ["self.w_-self.learning_rate*gradient"] },
            { label: "(4)", accept: ["abs(self.loss_history_[-2]-self.loss_history_[-1])<self.eps", "np.abs(self.loss_history_[-2]-self.loss_history_[-1])<self.eps", "abs(self.loss_history_[-1]-self.loss_history_[-2])<self.eps", "np.abs(self.loss_history_[-1]-self.loss_history_[-2])<self.eps"] },
          ] },
        { key: "hw_roc", title: "BCE loss and TPR / FPR per threshold", hw: "hw3 · BCE_loss, fpr_tpr_per_threshold", exams: ["2025A-q4.4", "2026B-q3.4"],
          api: [
            [R`p`, R`\((n,)\) predicted probabilities of class 1; <code>y_01</code>: \((n,)\) true labels as 0/1`],
            [R`np.log(a)`, R`natural log, entry by entry; <code>np.mean(a)</code>: the average of the entries`],
            [R`probabilities_on_positives`, R`the predicted probabilities of the samples whose <b>true</b> label is positive`],
            [R`probabilities_on_negatives`, R`the same for the samples whose true label is negative`],
            [R`num_positives, num_negatives`, R`how many true positives / true negatives there are`],
            [R`np.sum(a >= t)`, R`how many entries of <code>a</code> are \(\ge t\)`],
            [R`tpr, fpr`, R`Python lists, one value appended per threshold`],
          ],
          prompt: R`<code>p</code> = predicted probabilities, <code>y_01</code> = 0/1 labels. A sample is predicted positive under threshold <code>t</code> if its probability is <code>&gt;= t</code>. Fill in the blanks.`,
          code: `loss = -np.mean(___(1)___)

for t in prob_thresholds:
    tp = ___(2)___
    fp = np.sum(probabilities_on_negatives >= t)
    tpr.append(___(3)___)
    fpr.append(___(4)___)`,
          blanks: [
            { label: "(1)", accept: ["y_01*np.log(p)+(1-y_01)*np.log(1-p)", "(1-y_01)*np.log(1-p)+y_01*np.log(p)"] },
            { label: "(2)  tp =", accept: ["np.sum(probabilities_on_positives>=t)", "int(np.sum(probabilities_on_positives>=t))", "(probabilities_on_positives>=t).sum()"] },
            { label: "(3)", accept: ["tp/num_positives", "tp/len(probabilities_on_positives)"] },
            { label: "(4)", accept: ["fp/num_negatives", "fp/len(probabilities_on_negatives)"] },
          ] },
        { key: "hw_km", title: "K-means", hw: "hw6 · kmeans", exams: ["2025C-q5.5", "2026A-q4.5"],
          api: [
            [R`X`, R`\((n, d)\) samples; <code>centroids</code>, <code>new_centroids</code>: \((k, d)\)`],
            [R`dist_from_centroids(X, centroids)`, R`returns \((k, n)\): entry \([j, i]\) = Euclidean distance from sample \(i\) to centroid \(j\)`],
            [R`np.argmin(A, axis=…)`, R`the <b>index</b> of the smallest entry along that axis (<code>axis=0</code>: down each column, <code>axis=1</code>: along each row)`],
            [R`np.min(A, axis=…)`, R`the smallest <b>value</b> along that axis`],
            [R`np.mean(A, axis=0)`, R`the average of the rows: one mean per column`],
            [R`X[mask]`, R`the rows of <code>X</code> where the True/False array <code>mask</code> is True`],
            [R`rng.choice(n)`, R`a random index in \(0, \ldots, n-1\)`],
          ],
          prompt: R`<code>distances</code> has shape \((k, n)\): row \(j\) = every sample's Euclidean distance to centroid \(j\). Fill in the blanks.`,
          code: `for iteration in range(max_iter):
    distances = dist_from_centroids(X, centroids)     # shape (k, n)
    assignments = ___(1)___
    for j in range(k):
        members = ___(2)___
        if len(members) == 0:
            new_centroids[j] = X[rng.choice(n)]
        else:
            new_centroids[j] = ___(3)___
    ...
WCSS = ___(4)___`,
          blanks: [
            { label: "(1)  assignments =", accept: ["np.argmin(distances,axis=0)", "distances.argmin(axis=0)"] },
            { label: "(2)  members =", accept: ["X[assignments==j]"] },
            { label: "(3)", accept: ["np.mean(members,axis=0)", "members.mean(axis=0)"] },
            { label: "(4)  WCSS =", accept: ["np.sum(np.min(distances,axis=0)**2)", "np.sum(distances.min(axis=0)**2)", "(np.min(distances,axis=0)**2).sum()"] },
          ] },
        { key: "hw_em", title: "GMM: E-step and M-step", hw: "hw6 · GMM.expectation, maximization", exams: ["2025B-q5.4", "2026A-q5.4", "2026B-q5.3"],
          api: [
            [R`X`, R`\((n, 1)\) samples`],
            [R`self.weights, self.mus, self.sigmas`, R`\((k,)\) each: \(\pi_j, \mu_j, \sigma_j\)`],
            [R`norm_pdf(X, mus, sigmas)`, R`returns \((n, k)\): entry \([i, j] = \phi(x_i; \mu_j, \sigma_j)\)`],
            [R`self.responsibilities`, R`\((n, k)\): entry \([i, j] = r(i, j)\)`],
            [R`np.sum(A, axis=1, keepdims=True)`, R`the sum of each row, kept as an \((n, 1)\) column (so it divides row by row)`],
            [R`np.sum(A, axis=0)`, R`the sum of each column: \((k,)\)`],
            [R`A * B`, R`entry by entry; an \((n, 1)\) times an \((n, k)\) repeats the column across the \(k\) columns`],
          ],
          prompt: R`1-D data, <code>X</code> of shape \((n, 1)\); <code>norm_pdf(X, mus, sigmas)</code> returns the \((n, k)\) table of \(\phi(x_i; \mu_j, \sigma_j)\). Fill in the blanks.`,
          code: `def expectation(self, X):
    weighted = ___(1)___                         # (n, k): pi_j * phi(x_i)
    self.responsibilities = ___(2)___

def maximization(self, X):
    nk = np.sum(self.responsibilities, axis=0)
    self.weights = ___(3)___
    self.mus = ___(4)___`,
          blanks: [
            { label: "(1)  weighted =", accept: ["self.weights*norm_pdf(X,self.mus,self.sigmas)", "norm_pdf(X,self.mus,self.sigmas)*self.weights"] },
            { label: "(2)", accept: ["weighted/np.sum(weighted,axis=1,keepdims=True)", "weighted/weighted.sum(axis=1,keepdims=True)"] },
            { label: "(3)  self.weights =", accept: ["nk/X.shape[0]", "nk/len(X)", "nk/n", "nk/np.sum(nk)"] },
            { label: "(4)  self.mus =", accept: ["np.sum(self.responsibilities*X,axis=0)/nk", "(self.responsibilities*X).sum(axis=0)/nk"] },
          ] },
      ],
      bugs: [
        { title: "Choosing λ for ridge by cross-validation", hw: "hw1 GD + CV", exams: ["2025C-q1.5", "2025A-q1.4"],
          api: [
            [R`X_folds, y_folds`, R`lists of the folds: <code>X_folds[i]</code> is \((m_i, p)\), <code>y_folds[i]</code> is \((m_i,)\)`],
            [R`lambdas`, R`the \(\lambda\) values to try; <code>eta</code>, <code>iters</code>: step size and number of GD steps`],
            [R`training loss`, R`\(\|X_{tr}w - y_{tr}\|^2 + \lambda\|w\|^2\), minimized by gradient descent from \(w = 0\)`],
            [R`np.concatenate(list)`, R`joins 1-D arrays into one; <code>np.vstack</code> stacks rows`],
            [R`returns`, R`the \(\lambda\) with the smallest average validation error (plain mean squared error)`],
          ],
          prompt: R`The data is centred, so <code>X</code> has no ones column. The function should return the \(\lambda\) with the smallest average validation error. Click every line with a bug.`,
          lines: [
            "def choose_best_lambda(X_folds, y_folds, lambdas, eta, iters):",
            "    best_lam, best_err = None, np.inf",
            "    for lam in lambdas:",
            "        errs = []",
            "        for i in range(len(X_folds)):",
            "            X_tr = np.vstack([X_folds[j] for j in range(len(X_folds)) if j != i])",
            "            y_tr = np.concatenate([y_folds[j] for j in range(len(y_folds)) if j != i])",
            "            w = np.zeros(X_tr.shape[1])",
            "            for _ in range(iters):",
            "                grad = 2 * X_tr.T @ (y_tr - X_tr @ w) + 2 * lam * w",
            "                w = w - eta * grad",
            "            err = np.mean((X_folds[i] @ w - y_folds[i]) ** 2) + lam * np.sum(w ** 2)",
            "            errs.append(err)",
            "        if np.mean(errs) > best_err:",
            "            best_lam, best_err = lam, np.mean(errs)",
            "    return best_lam",
          ],
          bugs: { 10: R`Residual sign: <code>X_tr @ w - y_tr</code> (prediction − truth). As written, the step goes uphill.`,
                  12: R`The validation score must be the plain error, without <code>+ lam * np.sum(w ** 2)</code>: the penalty is for training only.`,
                  14: R`Smallest error wins: <code>&lt;</code>, not <code>&gt;</code>. With <code>best_err = np.inf</code>, nothing is ever chosen.` } },
        { title: "K-means with an (n, k) distance table", hw: "hw6 kmeans", exams: ["2025C-q5.5", "2026A-q4.5"],
          api: [
            [R`X`, R`\((n, d)\) samples; returns <code>centroids</code> \((k, d)\), <code>assign</code> \((n,)\), <code>wcss</code> (one number)`],
            [R`np.linalg.norm(A, axis=2)`, R`Euclidean length along the last axis: here <code>d[i, j]</code> = distance from sample \(i\) to centroid \(j\), shape \((n, k)\)`],
            [R`np.argmin / np.min(A, axis=…)`, R`index / value of the smallest entry along that axis (<code>axis=0</code>: down each column, <code>axis=1</code>: along each row)`],
            [R`A.mean(axis=…)`, R`average along that axis`],
            [R`np.allclose(A, B)`, R`True if all entries are (almost) equal`],
          ],
          prompt: R`Here <code>d</code> has shape \((n, k)\) (one row per sample), the opposite of your HW. Assume no cluster ever becomes empty and that it converges (breaks) before <code>max_iter</code>. Click every line with a bug.`,
          lines: [
            "def kmeans(X, k, max_iter):",
            "    centroids = X[np.random.choice(X.shape[0], k, replace=False)]",
            "    for _ in range(max_iter):",
            "        d = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)   # (n, k)",
            "        assign = np.argmin(d, axis=0)",
            "        new = np.array([X[assign == j].mean(axis=1) for j in range(k)])",
            "        if np.allclose(new, centroids):",
            "            break",
            "        centroids = new",
            "    wcss = np.sum(np.min(d, axis=1))",
            "    return centroids, assign, wcss",
          ],
          bugs: { 5: R`Each <b>sample</b> picks its nearest centroid: minimum across a row, <code>axis=1</code>. With <code>axis=0</code> you get one index per centroid.`,
                  6: R`The mean of the members runs down the rows (one mean per coordinate): <code>axis=0</code>.`,
                  10: R`WCSS adds <b>squared</b> distances: <code>np.sum(np.min(d, axis=1) ** 2)</code>.` } },
        { title: "Logistic regression fit", hw: "hw3 LogisticRegressionGD", exams: ["2025A-q4.5", "2026B-q3.4"],
          api: [
            [R`X`, R`\((n, p+1)\) samples with the ones column; <code>y</code>: \((n,)\) labels 0/1`],
            [R`eta, max_iter, eps`, R`step size, maximum iterations, stop threshold on the loss change`],
            [R`returns`, R`<code>w</code>: \((p+1,)\) learned weights`],
            [R`np.exp, np.log`, R`entry by entry; <code>np.mean</code>: average`],
          ],
          prompt: R`<code>X</code> has the ones column, <code>y</code> is 0/1. The function should minimize the BCE loss by gradient descent and stop when the loss changes by less than <code>eps</code>. Click every line with a bug.`,
          lines: [
            "def fit(X, y, eta, max_iter, eps):",
            "    w = np.zeros(X.shape[0])",
            "    prev = np.inf",
            "    for _ in range(max_iter):",
            "        p = 1 / (1 + np.exp(X @ w))",
            "        grad = X.T @ (p - y) / len(y)",
            "        w = w + eta * grad",
            "        loss = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))",
            "        if abs(prev - loss) < eps:",
            "            break",
            "        prev = loss",
            "    return w",
          ],
          bugs: { 2: R`One weight per <b>feature</b> (column): <code>X.shape[1]</code>. <code>X.shape[0]</code> is the number of samples.`,
                  5: R`Sigmoid is \(1/(1 + e^{-z})\): <code>np.exp(-X @ w)</code>.`,
                  7: R`Gradient <b>descent</b> steps against the gradient: <code>w - eta * grad</code>.` } },
      ],
      theory: [
        { q: R`Show that the Gini impurity equals the probability that two labels drawn independently from \(p\) differ.`, src: "HW2 1.2",
          a: R`<p>\(Y_1, Y_2\) independent, \(\Pr[Y = j] = p_j\):</p><p>\(\Pr[Y_1 = Y_2] = \sum_j \Pr[Y_1 = j]\Pr[Y_2 = j] = \) ⟦\(\sum_j p_j^2\)⟧</p><p>So \(\Pr[Y_1 \ne Y_2] = \) ⟦\(1 - \sum_j p_j^2\)⟧ \(=\) ⟦\(\varphi_{\text{Gini}}(p)\)⟧</p>` },
        { q: R`Show that \(\varphi_{\text{Gini}}(p) \le 1 - \frac1k\) for \(k\) classes.`, src: "HW2 1.1",
          a: R`<p>Cauchy–Schwarz \((u^\top v)^2 \le \|u\|^2\|v\|^2\) with \(u = \) ⟦\((p_1, \ldots, p_k)\)⟧, \(v = \) ⟦\((1, \ldots, 1)\)⟧:</p><p>\(u^\top v = \) ⟦\(\sum_j p_j = 1\)⟧, \(\|v\|^2 = \) ⟦\(k\)⟧</p><p>So \(1 \le \) ⟦\(k\sum_j p_j^2\)⟧ \(\Rightarrow \sum_j p_j^2 \ge \) ⟦\(\tfrac1k\)⟧ \(\Rightarrow \varphi_{\text{Gini}} \le \) ⟦\(1 - \tfrac1k\)⟧</p>` },
        { q: R`Show that the information gain of any split is \(\ge 0\).`, src: "HW2 2",
          a: R`<p>Count the parent's positives two ways: \(p = \) ⟦\(\sum_v \frac{|S_v|}{|S|}\,p_v\)⟧</p><p>The entropy \(h\) is ⟦concave⟧, so \(h\big(\sum_v \lambda_v p_v\big) \ge \) ⟦\(\sum_v \lambda_v\,h(p_v)\)⟧</p><p>With \(\lambda_v = \frac{|S_v|}{|S|}\): \(H(S) \ge \) ⟦\(\sum_v \frac{|S_v|}{|S|}H(S_v)\)⟧, so IG \(\ge 0\).</p>` },
        { q: R`The training set has \(n\) distinct vectors in \(\{0,1\}^p\). Show a tree with zero training error exists, and give its depth.`, src: "HW2 3.1",
          a: R`<p>At depth \(j - 1\), split on ⟦feature \(j\)⟧.</p><p>Each root-to-leaf path fixes ⟦all \(p\) features⟧, so each leaf holds ⟦at most one training vector⟧.</p><p>Zero error with depth ⟦\(p\)⟧.</p>` },
        { q: R`Show that for \(p \gt d\) there is a training set of \(2^{d+1}\) points that no depth-\(d\) tree fits with zero error.`, src: "HW2 3.3",
          a: R`<p>Points: ⟦all \(2^{d+1}\) 0/1 vectors on features \(1, \ldots, d{+}1\) (0 elsewhere)⟧, label ⟦\(x_1 \oplus x_2 \oplus \cdots \oplus x_{d+1}\)⟧</p><p>A path tests at most ⟦\(d\)⟧ features, so some feature \(i \le d{+}1\) is ⟦not tested on it⟧.</p><p>Flip bit \(i\) of a sample in that leaf: ⟦same leaf, opposite label⟧ → one prediction, an error.</p>` },
        { q: R`The CLL model predicts \(\gamma(w^\top x)\) with \(\gamma(t) = 1 - e^{-e^t}\). What is predicted when \(w^\top x = 0\)? For which \(w^\top x\) is the prediction \(\tfrac12\)?`, src: "HW3 3–4",
          a: R`<p>\(\gamma(0) = 1 - e^{-e^0} = \) ⟦\(1 - \tfrac1e \approx 0.632\)⟧ (not ½, unlike σ and Φ)</p><p>\(\gamma(t) = \tfrac12 \Rightarrow e^{-e^t} = \) ⟦\(\tfrac12\)⟧ \(\Rightarrow e^t = \) ⟦\(\ln 2\)⟧ \(\Rightarrow t = \) ⟦\(\ln(\ln 2) \approx -0.367\)⟧</p>` },
        { q: R`Write the hard-margin SVM primal as a QP: \(\min \tfrac12 z^\top Pz + q^\top z\) s.t. \(Gz \le h\).`, src: "HW4 1",
          a: R`<p>Variables \(z = \) ⟦\((w_0, w)\)⟧</p><p>\(P = \) ⟦\(\mathrm{diag}(0, I_p)\) (no \(w_0\) in \(\|w\|^2\))⟧, \(q = \) ⟦\(0\)⟧</p><p>\(y_i(w_0 + w^\top x^{(i)}) \ge 1\) as \(\le\): ⟦\(-y_i\,(1, x^{(i)})^\top z \le -1\)⟧</p><p>Row \(i\) of \(G = \) ⟦\(-y_i(1, x^{(i)})\)⟧, \(h = \) ⟦\(-\mathbf 1\)⟧</p>` },
        { q: R`Write the dual SVM as a QP. What changes for a soft margin, and with a kernel \(K\)?`, src: "HW4 2–3, 5",
          a: R`<p>Max → min by negating; variables \(z = \lambda\).</p><p>\(P_{ij} = \) ⟦\(y_iy_j\,x^{(i)\top}x^{(j)}\)⟧, \(q = \) ⟦\(-\mathbf 1\)⟧, \(G = \) ⟦\(-I_n\)⟧, \(h = \) ⟦\(0\)⟧, \(A = \) ⟦\(y^\top\)⟧, \(b = \) ⟦\(0\)⟧</p><p>Soft margin adds ⟦\(\lambda_i \le C\)⟧: \(G = \) ⟦\(\begin{pmatrix}-I_n\\ I_n\end{pmatrix}\)⟧, \(h = \) ⟦\(\begin{pmatrix}0\\ C\mathbf 1\end{pmatrix}\)⟧</p><p>Kernel: \(P_{ij} = \) ⟦\(y_iy_j\,K(x^{(i)}, x^{(j)})\)⟧</p>` },
        { q: R`\(X_1, \ldots, X_n \sim \mathrm{Pois}(\lambda)\) independent, \(\hat\lambda = \frac1n\sum_i X_i\). Find \(E[\hat\lambda]\), \(\mathrm{Var}[\hat\lambda]\) and a 95% confidence interval. Compute it for \(n = 50\), \(\sum_i x_i = 176\).`, src: "HW5 3–5",
          a: R`<p>\(E[X_i] = \mathrm{Var}[X_i] = \lambda\), so \(E[\hat\lambda] = \) ⟦\(\lambda\)⟧, \(\mathrm{Var}[\hat\lambda] = \) ⟦\(\lambda / n\)⟧</p><p>CLT, plug in \(\hat\lambda\): \(\hat\lambda \pm\) ⟦\(1.96\sqrt{\hat\lambda/n}\)⟧</p><p>\(\hat\lambda = \) ⟦\(176/50 = 3.52\)⟧, interval ⟦\(3.52 \pm 0.52 = [3.00,\ 4.04]\)⟧</p>` },
        { q: R`Jobs arrive as a Poisson process with rate \(\lambda\) per second. Find the CDF and pdf of the time \(Y\) until the first job.`, src: "HW5 6",
          a: R`<p>\(Y \gt y \iff\) ⟦no job arrives in \([0, y]\)⟧</p><p>\(\Pr[Y \gt y] = \Pr[\mathrm{Pois}(\lambda y) = 0] = \) ⟦\(e^{-\lambda y}\)⟧</p><p>CDF ⟦\(1 - e^{-\lambda y}\)⟧, pdf ⟦\(\lambda e^{-\lambda y}\)⟧</p>` },
      ],
    },
    templates: [
      { title: "MLE in 6 lines",
        cue: R`"derive the maximum likelihood estimator", "find the \(\theta\) that maximizes the likelihood"`,
        html: R`
<p><b>1. One sample</b> (the given distribution, with \(x_i\)):</p>\[p(x_i \mid \theta) = \ldots\]
<p><b>2. All samples</b> (independent → multiply):</p>\[L(\theta) = \prod_{i=1}^{n} p(x_i \mid \theta)\]
<p><b>3. The data log-likelihood</b> (log turns × into +):</p>\[\ell(\theta; D) = \sum_{i=1}^{n} \log p(x_i \mid \theta)\]
<p><b>4. Simplify:</b> log rules inside the sum, split into separate sums, take out what has no \(i\).</p>
<p><b>5. Derivative by \(\theta\), set to 0, solve</b> → \(\hat\theta\).</p>
<p><b>6. It's a maximum:</b> \(\ell''(\theta; D) \lt 0\).</p>
<p class="muted">Results you've seen: Poisson → \(\hat\lambda\) = the average count. Coin → heads ÷ tosses. Two probabilities that must add to 1: write them as \(p\) and \(1 - p\), so there is one unknown.</p>` },

      { title: "Bayes: one block per sample",
        cue: R`"classify with MAP", "compute the posterior", naive Bayes`,
        html: R`
<p><b>Sample \(x\):</b></p>
<p><b>Likelihoods:</b> \(P(x \mid A) = \ldots\), \(P(x \mid B) = \ldots\) <span class="muted">(naive Bayes: multiply one factor per feature)</span></p>
<p><b>Joints</b> (prior × likelihood): \(P(x, A) = \pi_A \cdot P(x \mid A)\), \(P(x, B) = \pi_B \cdot P(x \mid B)\)</p>
<p><b>Marginal</b> (sum of the joints): \(P(x) = P(x, A) + P(x, B)\)</p>
<p><b>Posteriors</b> (joint ÷ marginal): \(P(A \mid x) = \dfrac{P(x, A)}{P(x)}\), \(P(B \mid x) = \dfrac{P(x, B)}{P(x)}\)</p>
<p><b>MAP:</b> the class with the bigger posterior.</p>
<p class="muted">Formula first, then the numbers. Priors: \(\pi_A + \pi_B = 1\).</p>` },

      { title: "Costs as bets",
        cue: R`a cost / loss matrix, \(\lambda_{AB}\), "minimum risk"`,
        html: R`
<p><b>Givens as sentences:</b> "Classifying as A when it's actually B costs \(\lambda_{AB}\)". "Classifying as B when it's actually A costs \(\lambda_{BA}\)".</p>
<p><b>Classifying as A:</b> if it's actually A (chance \(P(A \mid x)\)) it costs 0; if it's actually B (chance \(P(B \mid x)\)) it costs \(\lambda_{AB}\)</p>\[\text{risk} = P(A \mid x)\cdot 0 + P(B \mid x)\cdot \lambda_{AB}\]
<p><b>Classifying as B:</b> if it's actually A (chance \(P(A \mid x)\)) it costs \(\lambda_{BA}\); if it's actually B (chance \(P(B \mid x)\)) it costs 0</p>\[\text{risk} = P(A \mid x)\cdot \lambda_{BA} + P(B \mid x)\cdot 0\]
<p><b>Predict the cheaper one.</b> It can differ from MAP.</p>` },

      { title: "EM: E-step and M-step in words",
        cue: R`GMM, mixture of coins, "one iteration of EM", responsibilities \(r(i,j)\)`,
        html: R`
<p><b>E-step:</b> \(r(i,j)\) = the posterior of component \(j\) for sample \(i\): the Bayes block (likelihood → joint → marginal → posterior), with \(\pi_j\) as the prior.</p>
<p><b>M-step:</b> every sample counts as \(r(i,j)\) of a component-\(j\) sample.</p>
\[\begin{aligned}\pi_j &= \frac{\text{expected component-}j\text{ samples}}{\text{all samples}}\\ &= \frac{\textstyle\sum_i r(i,j)}{n}\end{aligned}\]
\[\begin{aligned}\mu_j &= \frac{\text{sum of component-}j\text{ samples}}{\text{number of component-}j\text{ samples}}\\ &= \frac{\textstyle\sum_i r(i,j)\,x_i}{\textstyle\sum_i r(i,j)}\end{aligned}\]
\[\begin{aligned}p_j &= \frac{\text{expected heads}}{\text{expected tosses}}\\ &= \frac{\textstyle\sum_i r(i,j)\,h_i}{(\text{tosses per experiment})\cdot\textstyle\sum_i r(i,j)}\end{aligned}\]
<p>Then the <b>"with"</b> lines below: each sum written out with its numbers.</p>` },

      { title: "Information gain of a split",
        cue: R`"find the split that maximizes the information gain", impurity reduction`,
        html: R`
<p><b>Candidates:</b> midpoints between consecutive distinct values (one per gap).</p>
<p><b>Per candidate:</b> count each side (e.g. 3B 1R), then</p>
\[\begin{aligned}\text{IG} = H(\text{parent}) &- \text{share}_1\cdot H(\text{child}_1)\\ &- \text{share}_2\cdot H(\text{child}_2)\end{aligned}\]
<p>share = samples in the child ÷ samples in the parent.</p>
\[H = -p\log_2 p - (1-p)\log_2(1-p)\]
<p class="muted">Pure node → \(H = 0\) (\(0\cdot\log 0 = 0\)). \(\log_2 x = \ln x \div \ln 2\). Same with Gini instead of \(H\). The best split is written as two sides: "\(X_1 \lt 4.5\) vs \(X_1 \gt 4.5\)".</p>` },

      { title: "Distance to a line, margin",
        cue: R`"margin", "max-margin line", "distance of the sample from the boundary"`,
        html: R`
<p><b>Line as "… = 0":</b> \(w_0 + w_1x_1 + w_2x_2 = 0\)</p>
<p><b>Weights:</b> \(w_0 = \ldots,\ w_1 = \ldots,\ w_2 = \ldots\)</p>
<p><b>Score</b> of a sample: \(w_0 + w_1x_1 + w_2x_2\)</p>
<p><b>Length of \(w\)</b> (no \(w_0\)): \(\sqrt{w_1^2 + w_2^2}\)</p>
\[\text{distance} = \frac{|\text{score}|}{\sqrt{w_1^2 + w_2^2}}\]
<p><b>Margin</b> = distance to the closest sample. When the closest samples have \(y\cdot\text{score} = 1\), the margin is \(1/\|w\|\).</p>
<p class="muted">\(y\cdot\text{score} \ge 1\): correct side and outside the margin. Adding such a sample changes nothing.</p>` },

      { title: "K-means: one iteration",
        cue: R`"run one iteration of K-means", "WCSS before / after"`,
        html: R`
<p><b>1. Assign:</b> Euclidean distance of each sample to each centroid, the smaller wins:</p>\[d(x, \mu) = \sqrt{(x_1 - \mu_1)^2 + (x_2 - \mu_2)^2}\]
<p><b>2. WCSS before:</b> each sample's distance to its own <b>old</b> centroid, squared, added.</p>
<p><b>3. Update:</b> each centroid = the mean of its cluster, per coordinate: (mean of the \(x_1\)'s, mean of the \(x_2\)'s).</p>
<p><b>4. WCSS after:</b> each sample's distance to its own <b>new</b> centroid, squared, added.</p>
<p class="muted">Converged = the assignments don't change. WCSS never goes up.</p>` },

      { title: "Mapping so one cut / one line works",
        cue: R`"find a mapping \(\varphi\)", "so that the data is linearly separable / a depth-1 tree has zero error"`,
        html: R`
<p><b>1. What can one cut (or one line) do?</b> Split into two sides. I need one number with all of one class on one side.</p>
<p><b>2. Where is each class?</b> Write the labels along each feature.</p>
<p><b>3. Middle band or inside a circle?</b> Use the squared distance from the center:</p>
\[\begin{aligned}&\text{band: } (x - \text{center})^2 \lt (\text{half the width})^2\\ &\text{circle: } (x_1 - c_1)^2 + (x_2 - c_2)^2 \lt r^2\end{aligned}\]
<p><b>4. Expand, then match</b> the form they gave. If their form has no constant, move it to the other side of the \(\lt\).</p>
<p><b>5. Table check</b> of the mapped values, cut at the midpoint.</p>
<p class="muted">The \(x^2\) in their form is the hint. A linear mapping never helps.</p>` },
    ],
  };
})();
