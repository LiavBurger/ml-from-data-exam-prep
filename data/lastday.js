// The last study day (2026-10-08): the plan, and the 8 answer templates the learner built this term.
// Templates use the same wording and notation as the walks (spec/WALKS.md §0.8). Rendered by app.js at #/day.
(function () {
  const R = String.raw;
  window.LASTDAY = {
    mock: "2025B",   // Block 1: the timed exam (2nd hardest; 2026B is the learner's own Moed B, half-remembered)
    check: "2026A",  // spare paper (Block 4 is now the homework)
    // Block 4: the homework. code = HW functions the exams turned into fill-in / bug questions (lines copied from the learner's own HW);
    // theory = HW theory questions not asked in a past exam yet (answers from the learner's hw*_solutions / hw5.pdf).
    hw: {
      code: [
        { title: "Gradient descent + stop rule", hw: "hw1 · gradient_descent_stop_condition", exams: ["2025B-q1.5", "2026A-q1.4", "2026B-q1.4"],
          lines: `slope = (2 / n) * X.T @ (X @ w - y)
w = w - eta * slope
if np.linalg.norm(slope) &lt; epsilon:
    break`,
          note: R`Gradient = \(X^\top\)(prediction − truth). Stop on the <b>gradient's</b> norm. <code>n = X.shape[0]</code> (rows).` },
        { title: "Cross-validation loop", hw: "hw4 · cross_validation (hw2 · cross_validate_depth)", exams: ["2025C-q1.5", "2025A-q1.4", "2025B-q4.3", "2026A-q3.5"],
          lines: `for i in range(n_folds):
    X_val, y_val = X_folds[i], y_folds[i]
    X_tr = np.vstack([X_folds[j] for j in range(n_folds) if j != i])
    model.fit(X_tr, y_tr)
    fold_acc.append(np.mean(model.predict(X_val) == y_val))
accuracy = np.mean(fold_acc)`,
          note: R`Train on the <b>other</b> folds, score the held-out one, average. Accuracy: keep the biggest (<code>&gt;</code>); error / loss: the smallest (<code>&lt;</code>). Score with plain error, never the penalized loss.` },
        { title: "Logistic regression (+ mini-batch)", hw: "hw3 · LogisticRegressionGD.fit, _MB.fit, BCE_loss", exams: ["2025A-q4.5", "2026B-q3.4"],
          lines: `p = 1.0 / (1.0 + np.exp(-X @ w))
gradient = X.T @ (p - y_01) / n
w = w - learning_rate * gradient
loss = -np.mean(y_01 * np.log(p) + (1 - y_01) * np.log(1 - p))
if abs(previous_loss - current_loss) &lt; eps:
    break
# mini-batch: same lines on X_batch = X_shuffled[start:end], divided by X_batch.shape[0]`,
          note: R`Labels as 0/1 (<code>y_01</code>). Here the stop rule is on the <b>loss change</b>, not the gradient.` },
        { title: "TPR / FPR per threshold (ROC)", hw: "hw3 · fpr_tpr_per_threshold", exams: ["2025A-q4.4"],
          lines: `tp = np.sum(probs_on_positives &gt;= t)
fp = np.sum(probs_on_negatives &gt;= t)
tpr.append(tp / num_positives)
fpr.append(fp / num_negatives)`,
          note: R`Predict positive iff prob \(\ge t\). TPR ÷ real positives, FPR ÷ real negatives.` },
        { title: "K-means", hw: "hw6 · kmeans", exams: ["2025C-q5.5", "2026A-q4.5"],
          lines: `distances = dist_from_centroids(X, centroids)      # (k, n)
assignments = np.argmin(distances, axis=0)         # nearest centroid per sample
members = X[assignments == j]
if len(members) == 0: ...                          # empty cluster: keep old / random sample
else: new_centroids[j] = np.mean(members, axis=0)  # mean per coordinate
WCSS = np.sum(np.min(distances, axis=0) ** 2)`,
          note: R`<code>axis=0</code> on <code>members</code> = average down the rows = one mean per coordinate. Stop when the centroids (or WCSS) stop changing.` },
        { title: "GMM: E-step and M-step", hw: "hw6 · GMM.expectation, maximization, fit", exams: ["2025B-q5.4", "2026A-q5.4", "2026B-q5.3"],
          lines: `weighted = weights * norm_pdf(X, mus, sigmas)               # joints, (n, k)
resp = weighted / np.sum(weighted, axis=1, keepdims=True)    # posteriors
nk = np.sum(resp, axis=0)
weights = nk / n
mus = np.sum(resp * X, axis=0) / nk
sigmas = np.sqrt(np.sum(resp * (X - mus) ** 2, axis=0) / nk)
if abs(previous_loss - current_loss) &lt; eps: break        # loss = -sum log f(x)`,
          note: R`The same E/M steps as the by-hand parts, in numpy: row sums for the E-step, column sums for the M-step.` },
      ],
      theory: [
        { q: R`Show that Gini \(= \Pr[\)two random labels differ\(]\).`, src: "HW2 1.2",
          first: R`Two independent labels \(Y_1, Y_2\) with probabilities \(p_j\): \(\Pr[Y_1 = Y_2] = \sum_j p_j^2\).`,
          ans: R`So \(\Pr[Y_1 \ne Y_2] = 1 - \sum_j p_j^2 = \varphi_{\text{Gini}}(p)\).` },
        { q: R`Show Gini \(\le 1 - \tfrac1k\) for \(k\) classes.`, src: "HW2 1.1",
          first: R`Cauchy–Schwarz on \(u = (p_1, \ldots, p_k)\) and \(v = (1, \ldots, 1)\): \((u^\top v)^2 \le \|u\|^2\|v\|^2\).`,
          ans: R`\(1 = (\sum_j p_j)^2 \le k\sum_j p_j^2\), so \(\sum_j p_j^2 \ge \tfrac1k\) and Gini \(\le 1 - \tfrac1k\). Equal at \(p_j = \tfrac1k\). (For 2 classes you did it with a derivative: 2025B Q2.5.)` },
        { q: R`Show IG \(\ge 0\) for any split.`, src: "HW2 2",
          first: R`The parent's proportion is the weighted average of the children's: \(p = \sum_v \frac{|S_v|}{|S|}\,p_v\).`,
          ans: R`Entropy \(h\) is concave: \(h(\sum_v \lambda_v p_v) \ge \sum_v \lambda_v h(p_v)\) (Jensen, by induction on the number of children). So \(H(S) \ge \sum_v \frac{|S_v|}{|S|}H(S_v)\), i.e. IG \(\ge 0\).` },
        { q: R`Any data with distinct binary vectors in \(\{0,1\}^p\) can be fit with zero error. How deep?`, src: "HW2 3.1",
          first: R`Split on feature \(j\) at depth \(j - 1\).`,
          ans: R`Depth \(p\): every path fixes all \(p\) features, so each leaf holds one vector.` },
        { q: R`Show a depth-\(d\) tree can't fit some \(2^{d+1}\) points.`, src: "HW2 3.3",
          first: R`Take all \(2^{d+1}\) vectors on features \(1..d{+}1\), label = parity \(x_1 \oplus \cdots \oplus x_{d+1}\).`,
          ans: R`A path tests at most \(d\) features, so some feature \(i\) is untested. Flip bit \(i\) of a sample in that leaf: same leaf, opposite label. One leaf, one prediction → an error. (Also: depth \(d\) → at most \(2^d\) leaves.)` },
        { q: R`CLL model \(\gamma(t) = 1 - e^{-e^t}\): the value at \(t = 0\), and the score where it predicts ½.`, src: "HW3 3–4",
          first: R`Set \(\gamma(t) = \tfrac12\) and undo one layer at a time: \(e^{-e^t} = \tfrac12\).`,
          ans: R`\(\gamma(0) = 1 - \tfrac1e \approx 0.632\) (not ½, unlike σ and Φ). \(-e^t = \ln\tfrac12 = -\ln 2 \Rightarrow t = \ln(\ln 2) \approx -0.367\). Gradient: same recipe as probit, 2026B Q3.3.` },
        { q: R`Write the hard-margin SVM as a QP (\(\min \tfrac12 z^\top Pz + q^\top z\) s.t. \(Gz \le h\)).`, src: "HW4 1",
          first: R`Variables \(z = (w_0, w)\); flip each \(\ge\) constraint into \(\le\).`,
          ans: R`\(P = \mathrm{diag}(0, I_p)\) (no \(w_0\) in \(\|w\|^2\)), \(q = 0\). Row \(i\) of \(G\) = \(-y_i(1, x^{(i)})\), \(h = -\mathbf 1\).` },
        { q: R`The dual SVM as a QP; soft margin; with a kernel.`, src: "HW4 2–3, 5",
          first: R`Max → min: negate. Variables \(z = \lambda\).`,
          ans: R`\(P_{ij} = y_iy_j\,x^{(i)\top}x^{(j)}\), \(q = -\mathbf 1\), \(G = -I_n\), \(h = 0\), \(A = y^\top\), \(b = 0\). Soft margin: stack \(\lambda_i \le C\): \(G = \begin{pmatrix}-I_n\\ I_n\end{pmatrix}\), \(h = \begin{pmatrix}0\\ C\mathbf 1\end{pmatrix}\). Kernel: \(P_{ij} = y_iy_j\,K(x^{(i)}, x^{(j)})\).` },
        { q: R`Poisson MLE \(\hat\lambda\): mean, variance, 95% confidence interval.`, src: "HW5 3–5",
          first: R`\(\hat\lambda = \frac1n\sum_i X_i\) with \(E[X_i] = \mathrm{Var}[X_i] = \lambda\), independent.`,
          ans: R`\(E[\hat\lambda] = \lambda\) (unbiased), \(\mathrm{Var}[\hat\lambda] = \lambda/n\). CLT: \(\hat\lambda \pm 1.96\sqrt{\hat\lambda/n}\). E.g. \(n = 50\), \(\sum x_i = 176\): \(3.52 \pm 0.52 = [3.00, 4.04]\).` },
        { q: R`Jobs arrive as Poisson with rate \(\lambda\) per second. Distribution of the time \(Y\) to the first job?`, src: "HW5 6",
          first: R`\(Y \gt y\) exactly when no job arrives in \([0, y]\): a \(\mathrm{Pois}(\lambda y)\) count equal to 0.`,
          ans: R`\(\Pr[Y \gt y] = e^{-\lambda y}\), so the CDF is \(1 - e^{-\lambda y}\) and the pdf \(\lambda e^{-\lambda y}\) (exponential).` },
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
\[\begin{aligned}\pi_j &= \frac{\text{expected component-}j\text{ samples}}{\text{all samples}} = \frac{\textstyle\sum_i r(i,j)}{n}\\[4pt] \mu_j &= \frac{\text{sum of component-}j\text{ samples}}{\text{number of component-}j\text{ samples}} = \frac{\textstyle\sum_i r(i,j)\,x_i}{\textstyle\sum_i r(i,j)}\\[4pt] p_j &= \frac{\text{expected heads}}{\text{expected tosses}} = \frac{\textstyle\sum_i r(i,j)\,h_i}{(\text{tosses per experiment})\cdot\textstyle\sum_i r(i,j)}\end{aligned}\]
<p>Then the <b>"with"</b> lines below: each sum written out with its numbers.</p>` },

      { title: "Information gain of a split",
        cue: R`"find the split that maximizes the information gain", impurity reduction`,
        html: R`
<p><b>Candidates:</b> midpoints between consecutive distinct values (one per gap).</p>
<p><b>Per candidate:</b> count each side (e.g. 3B 1R), then</p>
\[\text{IG} = H(\text{parent}) - \text{share}_1\cdot H(\text{child}_1) - \text{share}_2\cdot H(\text{child}_2)\]
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
