// Study content. Only real course material: whole exam questions (images cut from the
// official solution PDFs) and the learner's own Moed B script. Nothing here is invented —
// "notes" are short summaries of moves taken from the official solutions.
// Every exam question appears exactly once, whole, in one topic.
// Math: \( ... \) inline, \[ ... \] display (KaTeX). Strings use String.raw.
const R = String.raw;

window.STUCK_PROTOCOL = [
  "Write the definition or formula the part names (from the question text or the formula sheet).",
  "Plug in the numbers — especially any table they gave you. A given table means the question is built on it.",
  "Read the hint or remark: it is the shape of the answer (e.g. \\(\\nabla = \\sum_i z_i x^{(i)}\\) means the code is <code>X.T @ z</code>).",
  "Code blanks: the answer is spelled out in the docstring, the comments, or an earlier part.",
  "Write your setup even if you can't finish. Never cross it out — crossed-out correct work scores 0.",
];

window.MOEDB = { "2026B-q1": 11, "2026B-q2": 21, "2026B-q3": 1, "2026B-q4": 2, "2026B-q5": 0 };

window.TOPICS = [
// ═══════════════════════════════════════════════════════════════ 1 REGRESSION
{
  id: "regression", num: 1, title: "Regression", notesReady: true,
  blurb: "Q1 in every exam. Write X and y, gradient, one GD step, closed form, code.",
  intro: R`<p>Question 1 of every past exam is regression. The loss changes each time (ridge, LASSO, weighted, cubic), but the parts repeat: <b>write \(X\) and \(y\)</b> → <b>gradient</b> → <b>one gradient descent step</b> or <b>closed form</b> → <b>code</b> (fill blanks or find bugs).</p>
<p>Read the notes, then do the five questions in order, each one start to finish. The last one is your Moed B question.</p>`,
  moves: [
    { title: "Write the data matrix \\(X\\) and target \\(y\\)",
      cue: R`"Write down the data matrix \(X\) such that \(X\theta\) gives the predictions" (2025-A, 2025-B, 2025-C, 2026-A — part 1 every time).`,
      first: R`A column of <b>ones</b> first (for \(\theta_0\)), then one column per feature, one row per sample. \(y\) = the label column.`,
      recipe: R`Weighted version (2026-A): also \(\Gamma = \mathrm{diag}(\gamma_1,\dots,\gamma_n)\), so \(J = (Xw-y)^\top\Gamma(Xw-y)\).`,
      trap: "Forgetting the ones column costs points on this part and breaks every later part." },
    { title: "Derive the gradient",
      cue: R`"Express the gradient of \(J\) as a function of \(X, y, \theta\)…", "represent it as \(\nabla J(w)=\sum_i z_i x^{(i)}\)".`,
      first: R`Write \(r_i = w^\top x^{(i)} - y_i\) and the fact from class \(\dfrac{\partial r_i}{\partial w_j} = x^{(i)}_j\).`,
      recipe: R`
<ol>
<li>Chain rule on one sample's loss: \(\dfrac{\partial J}{\partial w_j} = \sum_i \ell'(r_i)\,x^{(i)}_j\).</li>
<li>So \(\nabla J = \sum_i z_i x^{(i)}\) with \(z_i = \ell'(r_i)\) — the <b>derivative</b> of one sample's loss. In matrix form \(\sum_i z_i x^{(i)} = X^\top z\).</li>
<li>A penalty outside the sum adds its own gradient.</li>
</ol>`,
      table: {
        head: ["Loss", R`Gradient`, "Where"],
        rows: [
          [R`\(\|X\theta-y\|^2\)`, R`\(2X^\top(X\theta-y)\)`, "all"],
          [R`\(+\lambda(\|\theta\|^2-\theta_0^2)\) (ridge)`, R`\(+\,2\lambda(0,\theta_1,\dots,\theta_p)\)`, "2025-A Q1.3"],
          [R`\(+\lambda\|\theta\|_1\) (LASSO)`, R`\(+\,\lambda\,\mathrm{sign}(\theta)\)`, "2025-C Q1.2"],
          [R`\((Xw-y)^\top\Gamma(Xw-y)\) (weighted)`, R`\(2X^\top\Gamma(Xw-y)\)`, "2026-A Q1.2"],
          [R`\(\sum_i|r_i|^3\) (cubic)`, R`\(z_i = 3r_i^2\,\mathrm{sign}(r_i)\)`, "2026-B Q1.3"],
        ]},
      trap: R`\(z_i\) is the derivative, not the loss — in Moed B Q1.4 you wrote <code>np.abs(r)**3</code> for <code>z</code>. For \(|r|^k\) use \(\frac{d}{dr}|r| = \mathrm{sign}(r)\).` },
    { title: "One gradient descent step by hand",
      cue: R`"Execute one iteration of gradient descent with \(\theta=\dots\), \(\eta=\dots\), \(\lambda=\dots\)" (2025-A Q1.3b, 2025-B Q1.4, 2025-C Q1.3).`,
      first: R`Compute the residual vector \(X\theta - y\) (at \(\theta = 0\) it is just \(-y\)).`,
      recipe: R`\(X\theta - y\) → \(\nabla = 2X^\top(X\theta-y)\) + penalty term → \(\theta_{\text{new}} = \theta - \eta\nabla\). Write each vector — partial credit is per step.` },
    { title: "Closed form: fold everything into plain least squares",
      cue: R`"Is it possible to find \(\theta^*\) analytically?", "Find a formula for \(w^*\)" (2025-B Q1.2–1.3, 2026-A Q1.3).`,
      first: R`Set the gradient to zero, or rewrite the loss as \(\|X'\theta - y'\|^2\) for a modified \(X', y'\).`,
      recipe: R`
<ul>
<li>Plain: \(\theta^* = (X^\top X)^{-1}X^\top y\).</li>
<li>Weighted: \(2X^\top\Gamma(Xw-y)=0 \Rightarrow w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\) (or \(X' = \Gamma^{1/2}X\), \(y' = \Gamma^{1/2}y\)).</li>
<li>Ridge: add rows \((0,\sqrt\lambda,0)\), \((0,0,\sqrt\lambda)\) to \(X\) and zeros to \(y\) → \(\theta^* = (X'^\top X')^{-1}X'^\top y'\).</li>
<li>LASSO (\(|\theta|\) isn't differentiable at 0) has no such form — use gradient descent.</li>
</ul>` },
    { title: "Code: fill the blanks or find the bugs",
      cue: "Fill in a gradient descent loop (2025-B Q1.5, 2026-B Q1.4) or find the errors in a cross-validation / gradient descent function (2025-A Q1.4, 2025-C Q1.5, 2026-A Q1.4).",
      first: "Read the docstring first: it states the shapes, the loss and the stopping rule. The blanks and the bugs are the lines that disagree with it.",
      recipe: R`
<pre><code>X_b  = np.hstack([np.ones((X.shape[0], 1)), X])  # n = X.shape[0] (rows!)
z    = ...                    # z_i from the derivation
grad = X_b.T @ z              # sum_i z_i x^(i)
w    = w - eta * grad         # minus: step against the gradient
if np.linalg.norm(grad) &lt; eps: break   # copy the rule in the docstring</code></pre>
<p><b>Bugs planted in the real exams</b> (each appeared at least once):</p>
<ul>
<li><code>n = X.shape[1]</code> → <code>X.shape[0]</code> (2025-A, 2025-C)</li>
<li>predicting on <code>X_train</code> instead of <code>X_val</code>; risk with <code>y_train</code> instead of <code>y_val</code></li>
<li>validation risk that adds the penalty \(\lambda\|w\|\) — validation measures plain squared error</li>
<li>comparing the <b>last fold's</b> <code>risk</code> instead of <code>np.mean(lo_risk)</code>; <code>&gt;</code> instead of <code>&lt;</code>; <code>np.sum</code> instead of <code>np.mean</code></li>
<li><code>range(1, num_iters)</code>; <code>error = y - y_pred</code> (wrong sign); gradient missing the weights \(\gamma\); <code>w + eta*grad</code>; <code>(gamma*error)**2</code> instead of <code>gamma*error**2</code>; stop test with <code>&gt;</code> (2026-A)</li>
</ul>`,
      trap: R`In Moed B you wrote <code>grad &lt; epsilon</code> — a vector compared with a number. The docstring said <code>||grad||_2 &lt;= epsilon</code>.` },
    { title: "KNN regression and normalization",
      cue: R`"Compute the predictions of 1-NN / 2-NN…", "normalize each feature by its \(L_2\) norm" (2026-B Q1.1–1.2).`,
      first: "A distance table: every test point against every training point.",
      recipe: R`k-NN prediction = average of the \(k\) nearest training labels. Normalizing: divide each feature column by \(\sqrt{\sum x^2}\) over the training values, then recompute the distances — the nearest neighbours can change.`,
      trap: R`In Moed B you divided by the <b>sum</b> instead of the \(L_2\) norm, and didn't normalize \(X_2\).` },
  ],
  questions: [
    { id: "2025C-q1", summary: "LASSO: X and y, gradient, one GD step, compare with least squares, find bugs in cross-validation code.",
      parts: {
        2: { move: R`Squared part gives \(2X^\top(X\theta-y)\); the LASSO part gives \(\lambda\,\mathrm{sign}(\theta)\).` },
        3: { move: R`Residual \(X\theta - y\) first, then the gradient from part 2, then \(\theta - \eta\nabla\).` },
        4: { move: R`\(\theta^*\) minimizes \(J_{\lambda=1}\); \(\tilde\theta\) minimizes plain squared error. Compare both on \(J_{\lambda=1}\).` },
        5: { move: "Check the 4 classic cross-validation bugs in the notes: shape[1], train vs val, penalty in the validation risk, the comparison." },
      } },
    { id: "2025A-q1", summary: "Ridge: X, the loss as a quadratic in θ, gradient + one GD step, find bugs in cross-validation code.",
      parts: {
        2: { move: R`Write \(J\) as a sum of squared linear terms in \(\theta\) — it's a degree-2 polynomial. \(a_1\) collects every \(\theta_1^2\) term (including \(\lambda\)); \(d\) is the constant (\(\theta = 0\)).` },
        3: { move: R`Gradient of the squared error plus \(2\lambda\) times \(\theta\) without \(\theta_0\). At \(\theta = 0\): \(\nabla = -2X^\top y\).` },
        4: { move: "Same 4 cross-validation bugs as in the notes." },
      } },
    { id: "2025B-q1", summary: "Ridge: X and y, fold the penalty into X′ and y′, closed form, one GD step, fill in GD code.",
      parts: {
        2: { move: R`Write \(\lambda\theta_1^2 = (0\cdot\theta_0 + \sqrt\lambda\,\theta_1 + 0\cdot\theta_2 - 0)^2\): each penalty term is one extra row of \(X'\) with target 0.` },
        3: { move: R`Once \(J = \|X'\theta - y'\|^2\), it is plain least squares: \((X'^\top X')^{-1}X'^\top y'\).` },
        4: { move: R`\(\nabla = 2X'^\top(X'\theta - y')\); at \(\theta = 0\) this is \(-2X'^\top y'\).` },
        5: { code: "ridge", move: "Bias column needs n = number of rows. Prediction = design matrix @ parameters. Update steps against the gradient. Training error = mean of squared residuals." },
      } },
    { id: "2026A-q1", summary: "Weighted least squares: X, Γ and y; gradient; closed-form w*; find 6 bugs in GD code.",
      parts: {
        1: { move: R`Ones column in \(X\); \(\Gamma\) is the diagonal matrix of the weights.` },
        2: { move: R`Each sample's loss is \(\gamma_i r_i^2\), so \(z_i = 2\gamma_i r_i\): \(\nabla = 2X^\top\Gamma(Xw-y)\) — \(\Gamma\) sits between \(X^\top\) and the residual.` },
        3: { move: R`Set the gradient to 0: \(X^\top\Gamma X w = X^\top\Gamma y\).` },
        4: { move: "Compare every line with the docstring's loss. The bug list in the notes has all six." },
      } },
    { id: "2026B-q1", summary: "Your Moed B question: KNN vs linear predictions, normalization, cubic-loss gradient, fill in GD code.",
      parts: {
        1: { move: R`Linear: \(w^\top x\) with the ones column. KNN: distance table, then average the \(k\) nearest labels.` },
        2: { mine: { img: "images/mine/2026B-q1.2.png", score: "2 / 4", what: R`You divided by the <b>sum</b> of \(X_1\) (150) instead of its \(L_2\) norm, and you didn't normalize \(X_2\). The question says "\(L_2\) norm of the vector composed of all values of that feature across all training samples".` },
             move: R`\(\|X_1\| = \sqrt{\sum x_1^2}\), \(\|X_2\| = \sqrt{\sum x_2^2}\) over the training rows. Divide every value of each column (train and test) by its norm, then redo 1-NN.` },
        3: { mine: { score: "0 / 6", what: "Left blank." },
             move: R`\(r_i = w^\top x^{(i)} - y_i\). \(\frac{d}{dr}|r|^3 = 3|r|^2\,\mathrm{sign}(r) = 3r^2\,\mathrm{sign}(r)\), then the chain rule gives \(\cdot\,x^{(i)}_j\).` },
        4: { code: "cubic",
             mine: { img: "images/mine/2026B-q1.4.png", score: "0 / 6", what: R`Blank 1: <code>np.abs(r)**3</code> is the <b>loss</b>, but \(z\) is its <b>derivative</b>. Blank 2: the hint \(\nabla J = \sum_i z_i x^{(i)}\) is exactly <code>X.T @ z</code>, even without part 3. Blank 3: <code>grad &lt; epsilon</code> compares a vector with a number; the docstring says <code>||grad J(w)||_2 &lt;= epsilon</code>.` },
             move: R`(1) \(z_i\) from part 3. (2) \(\sum_i z_i x^{(i)}\) = <code>X.T @ z</code>. (3) Copy the stopping rule from the docstring.` },
      } },
  ],
},
// ═══════════════════════════════════════════════════════════════ 2 LINEAR CLASSIFICATION
{
  id: "linclass", num: 2, title: "Linear classification", notesReady: false,
  blurb: "Perceptron, logistic / probit regression, TPR/FPR, separability, mappings.",
  intro: R`<p>Perceptron and logistic-regression style questions. Probit (Moed B) is logistic regression with \(\Phi\) in place of \(\sigma\): the gradient move from the Regression notes carries over directly.</p>`,
  moves: [
    { title: "Classify with a logistic / probit model",
      cue: R`"Use this classifier to classify each sample as positive or negative" (2025-B Q3.1, 2026-B Q3.1).`,
      first: R`Compute \(t = w^\top x\) with the bias.`,
      recipe: R`\(\sigma\) and \(\Phi\) are increasing with value \(\tfrac12\) at 0, so \(\hat y > \tfrac12 \iff w^\top x > 0\): classify by the <b>sign</b> of \(w^\top x\). (For CLL in your HW3, \(\gamma(0) = 1-1/e\), so the threshold is \(t = \ln\ln 2\) instead.)`,
      trap: R`In Moed B you had \(w^\top x = -1\) and \(3\), then tried to integrate \(\Phi(-1)\) and crossed it all out.` },
    { title: "BCE loss and its gradient for any link \\(\\hat y = g(t)\\)",
      cue: R`"Write the BCE loss using \(t_i = w^\top x^{(i)}\)", "derive the gradient… group common terms" (2026-B Q3.2–3.3; your HW3 Q5–6 for CLL).`,
      first: R`Substitute \(\hat y_w(x^{(i)}) = g(t_i)\) into the BCE printed in the question — that alone answers the "write the loss" part.`,
      recipe: R`Chain rule, then one common denominator: \[\nabla L = \sum_i z_i x^{(i)},\qquad z_i = \frac{(g(t_i) - y_i)\,g'(t_i)}{n\,g(t_i)\,(1-g(t_i))}\] LoR: \(\sigma' = \sigma(1-\sigma)\) cancels → \(z_i = (\sigma(t_i)-y_i)/n\). Probit: \(g' = \varphi\). CLL (HW3): \(\gamma' = e^t(1-\gamma)\) → \(z_i = e^{t_i}(\gamma(t_i)-y_i)/(n\gamma(t_i))\).` },
  ],
  questions: [
    { id: "2025A-q4", summary: "One Perceptron iteration by hand, predictions, logistic regression, fill in the LoR gradient descent code.",
      parts: { 5: { code: "logreg", move: R`Sigmoid is \(1/(1+e^{-z})\); the linear score is <code>X_with_bias @ w</code>; the update is <code>w - eta * grad</code>.` } } },
    { id: "2025B-q3", summary: "LoR predictions, linear separability, TPR/FPR, a mapping φ, a kernel for the dual perceptron." },
    { id: "2026B-q3", summary: "Your Moed B question: probit — classify, BCE loss, gradient, fill in mini-batch code.",
      parts: {
        1: { mine: { img: "images/mine/2026B-q3.1.png", score: "0 / 4", what: R`You computed \(w^\top x^{(1)} = -1\) and \(w^\top x^{(2)} = 3\) correctly, then tried to integrate \(\Phi(-1)\) by hand and crossed everything out. The answer was already on the page.` },
             move: R`\(\Phi\) is increasing and \(\Phi(0) = \tfrac12\): classify by the <b>sign</b> of \(w^\top x\). No integral.` },
        2: { mine: { score: "0 / 5", what: "Left blank." },
             move: R`Take the BCE printed in the question and replace \(\hat y_w(x^{(i)})\) with \(\Phi(t_i)\). That substitution is the whole answer.` },
        3: { mine: { score: "0 / 8", what: "Left blank." },
             move: R`\(\frac{\partial}{\partial w_j}\log\Phi(t_i) = \frac{\varphi(t_i)}{\Phi(t_i)}x^{(i)}_j\) and \(\frac{\partial}{\partial w_j}\log(1-\Phi(t_i)) = -\frac{\varphi(t_i)}{1-\Phi(t_i)}x^{(i)}_j\). Combine over a common denominator.` },
        4: { code: "probit",
             mine: { img: "images/mine/2026B-q3.4.png", score: "1 / 8", what: R`Blanks 1–2 blank. Blank 3 unfinished (<code>self.BCE_loss(</code>). Blank 4: <code>current_loss &lt; self.eps</code>, but the comment says halting is based on loss <b>change</b>.` },
             move: R`Batch version of the usual skeleton: <code>X_b.T @ z</code>, update with <code>self.learning_rate</code>, loss on <code>X_b, y_b</code>, stop on the <i>change</i> in loss.` },
      } },
  ],
},
// ═══════════════════════════════════════════════════════════════ 3 SVM & KERNELS
{
  id: "svm", num: 3, title: "Max-margin, SVM & kernels", notesReady: false,
  blurb: "Max-margin by hand, hinge loss and C, kernels and mappings. Not yet in 2026.",
  intro: R`<p>Max-margin / SVM appeared in 2025-B and 2025-C but not yet in 2026; kernels had their own question in 2026-A.</p>`,
  moves: [],
  questions: [
    { id: "2025C-q3", summary: "Separability, the max-margin classifier by hand, the LMS classifier, effect of new samples, a mapping φ." },
    { id: "2025B-q4", summary: "Max-margin line and margin, hinge loss and C from plots, find bugs in cross-validation code for C." },
    { id: "2026A-q3", summary: "Quadratic kernel value, φ for a kernel, which mappings separate the data, dual perceptron, RBF cross-validation code." },
  ],
},
// ═══════════════════════════════════════════════════════════════ 4 BAYES
{
  id: "bayes", num: 4, title: "Bayes: MLE, MAP, costs", notesReady: false,
  blurb: "Estimate parameters by counting / averaging, classify with MAP, priors and costs.",
  intro: R`<p>Probabilistic models and Bayesian classification. Your HW5 derivation of the Poisson MLE is exactly Moed B Q4.1.</p>`,
  moves: [],
  questions: [
    { id: "2025A-q5", summary: "Naive Bayes on a flower table: priors and conditionals, predictions, asymmetric risk." },
    { id: "2025C-q4", summary: "Full Bayes vs naive Bayes posteriors, ML vs MAP prediction, a cost matrix." },
    { id: "2026B-q4", summary: "Your Moed B question: Poisson MLE, MAP classification, prior and cost thresholds.",
      parts: {
        1: { mine: { img: "images/mine/2026B-q4.1.png", score: "0 / 5", what: R`You wrote the log-likelihood of this particular dataset (with \(\lambda_R\), \(\lambda_M\)) instead of a general \(\lambda\), and never differentiated. Your own HW5 Q1–2 is this exact derivation.` },
             move: R`\(\ell(\lambda) = \sum_i \log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!} = (\sum_i x_i)\log\lambda - n\lambda - \sum_i\log x_i!\). Differentiate, set to 0.` },
        2: { mine: { score: "2 / 5", what: R`Priors correct (0.2 / 0.8); rates missing.` },
             move: R`Poisson MLE = the <b>average</b> of that class's counts. Priors = class fractions.` },
        3: { mine: { score: "0 / 5", what: "Left blank." },
             move: R`Predict M iff \(\pi_M\,\mathrm{Poiss}(x\mid\lambda_M) > \pi_R\,\mathrm{Poiss}(x\mid\lambda_R)\). In the ratio \(x!\) cancels; use the given \(e^t\) table.` },
        4: { mine: { score: "0 / 5", what: "Left blank." }, move: R`Same inequality at \(x = 4\) with \(\pi_R = 1 - \pi_M\); solve for \(\pi_M\).` },
        5: { mine: { score: "0 / 5", what: "Left blank." }, move: R`Same inequality with the costs multiplying each side; solve for the ratio \(C_{R,M}/C_{M,R}\).` },
      } },
  ],
},
// ═══════════════════════════════════════════════════════════════ 5 CLUSTERING
{
  id: "clustering", num: 5, title: "Clustering", notesReady: false,
  blurb: "K-means iterations, WCSS, agglomerative linkage, K-means code.",
  intro: R`<p>K-means and agglomerative clustering. K-means is "hard" EM, which makes the GMM topic easier afterwards.</p>`,
  moves: [],
  questions: [
    { id: "2025A-q2", summary: "K-means, choosing a solution by WCSS, the elbow method, agglomerative clustering." },
    { id: "2025C-q5", summary: "One K-means iteration, WCSS, ranges for the initial centroid, a modified WCSS, fill in K-means code." },
    { id: "2026A-q4", summary: "K-means iteration and WCSS, a k = 3 solution, complete-linkage agglomerative clustering (L1), K-means code." },
  ],
},
// ═══════════════════════════════════════════════════════════════ 6 GMM / EM
{
  id: "gmm", num: 6, title: "GMM & EM", notesReady: false,
  blurb: "Mixture densities, responsibilities (E-step), parameter updates (M-step).",
  intro: R`<p>Gaussian and coin mixtures. The formulas for the E- and M-steps are on the formula sheet.</p>`,
  moves: [],
  questions: [
    { id: "2025B-q5", summary: "GMM parameters, coin-mixture MLE, responsibilities, the M-step." },
    { id: "2026A-q5", summary: "GMM density, coin-mixture MLE, responsibilities, the M-step, a fixed point (bonus)." },
    { id: "2026B-q5", summary: "Your Moed B question: one Gaussian EM step, MAP with a GMM class, when naive Bayes fits.",
      parts: {
        1: { mine: { img: "images/mine/2026B-q5.1.png", score: "0 / 3", what: R`You wrote the right GMM formula, then computed densities from scratch instead of reading them from the table, got wrong numbers, and crossed it out.` },
             move: R`\(f(x) = \pi_1\phi(x;\mu_1,1) + \pi_2\phi(x;\mu_2,1)\). With \(\sigma = 1\), \(\phi\) depends only on \(|x-\mu|\) — read every value from the table.` },
        2: { mine: { score: "0 / 6", what: "Left blank." },
             move: R`\(r(i,j) = \dfrac{\pi_j\phi(x_i;\mu_j,\sigma_j)}{f(x_i)}\): numerators are the two terms from part 1, the denominator is part 1's answer.` },
        3: { mine: { score: "0 / 6", what: "Left blank." },
             move: R`\(n_j = \sum_i r(i,j)\), \(\pi_j = n_j/n\), \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x_i\).` },
        4: { mine: { score: "0 / 5", what: "Left blank." },
             move: R`Compare \(\pi_A f(x\mid A)\) with \(\pi_B f(x\mid B)\); \(f(x\mid A)\) is a GMM — evaluate it like part 1.` },
        5: { mine: { score: "0 / 5", what: "Left blank." } },
      } },
  ],
},
// ═══════════════════════════════════════════════════════════════ 7 TREES
{
  id: "trees", num: 7, title: "Decision trees", notesReady: false,
  blurb: "Impurity (Gini / entropy), minimum-depth trees, leave-one-out, pruning, short proofs.",
  intro: R`<p>Your strongest topic: 21/25 in Moed B. Keep it warm.</p>`,
  moves: [],
  questions: [
    { id: "2025B-q2", summary: "Gini impurity and its reduction, a minimum-depth tree, classify a test point, two short proofs." },
    { id: "2025C-q2", summary: "Gini and entropy reductions, fewest-split tree, pruning, leave-one-out with stumps." },
    { id: "2025A-q3", summary: "Is depth 1 enough?, a minimum-depth tree, a test instance, IG as a formula, a proof." },
    { id: "2026A-q2", summary: "Minimum-depth tree, remove one sample, Gini reduction, fix the tree algorithm, run one iteration." },
    { id: "2026B-q2", summary: "Your Moed B question: entropy IG, a depth-2 tree, leave-one-out error, a mapping for a depth-1 tree.",
      parts: {
        4: { mine: { img: "images/mine/2026B-q2.4.png", score: "1 / 5", what: R`You plugged single points into \(\varphi\) but didn't look for the pattern first: \(y = R\) exactly when \(x_2 \in (2.5, 6.5)\).` },
             move: R`Find the interval that holds the red points, then turn "inside an interval" into one threshold by squaring: \(x_2 \in (2.5, 6.5) \iff (x_2 - 4.5)^2 < 4\).` },
      } },
  ],
},
// ═══════════════════════════════════════════════════════════════ 8 RE-SIT
{
  id: "resit", num: 8, title: "Timed re-sit", notesReady: false, noQuestions: true,
  blurb: "One real past exam, 3 hours, closed book, then review.",
  intro: R`<p>At the end: sit one whole real past exam in 3 hours with only the formula sheet and a calculator. Pick the exam you practised least.</p>`,
  moves: [], questions: [],
},
];

// Code blanks: accepted answers are the official solution plus plainly equivalent spellings.
// Anything else is shown next to the official answer for you to judge — never auto-failed.
window.CODE = {
  cubic: { blanks: [
    { label: "(1)  z =", accept: ["3*r**2*np.sign(r)", "3.0*r**2*np.sign(r)", "3*np.sign(r)*r**2", "3*r*np.abs(r)", "3*np.abs(r)*r", "3*np.abs(r)**2*np.sign(r)"] },
    { label: "(2)  grad =", accept: ["X.T@z", "np.dot(X.T,z)", "X.T.dot(z)", "X.transpose()@z"] },
    { label: "(3)  if … :", accept: ["np.linalg.norm(grad)<=epsilon", "np.linalg.norm(grad)<epsilon", "np.sum(grad**2)<=epsilon**2", "np.sqrt(np.sum(grad**2))<=epsilon"] },
  ]},
  probit: { blanks: [
    { label: "(1)  grad =", accept: ["X_b.T@z", "np.dot(X_b.T,z)", "X_b.T.dot(z)"] },
    { label: "(2)  self.w =", accept: ["self.w-self.learning_rate*grad", "self.w_-self.learning_rate*grad"] },
    { label: "(3)  current_loss =", accept: ["self.BCE_loss(X_b,y_b)", "self.BCE_loss(X_b,y01_b)"] },
    { label: "(4)  if … :", accept: ["abs(previous_loss-current_loss)<self.eps", "np.abs(previous_loss-current_loss)<self.eps", "abs(current_loss-previous_loss)<self.eps", "np.abs(current_loss-previous_loss)<self.eps", "abs(previous_loss-current_loss)<=self.eps"] },
  ]},
  ridge: { blanks: [
    { label: "(1)", accept: ["X.shape[0]", "len(X)"] },
    { label: "(2)  y_hat =", accept: ["X_with_bias@theta", "np.dot(X_with_bias,theta)"] },
    { label: "(3)  theta =", accept: ["theta-eta*grad"] },
    { label: "(4)  if … :", accept: ["np.linalg.norm(grad)<eps", "np.linalg.norm(grad)<=eps"] },
    { label: "(5)  np.mean( … )", accept: ["(y_hat-y)**2", "(y-y_hat)**2"] },
  ]},
  logreg: { blanks: [
    { label: "(1)", accept: ["numpy"] },
    { label: "(2)  return", accept: ["1/(1+np.exp(-z))"] },
    { label: "(3)  z =", accept: ["X_with_bias@w", "np.dot(X_with_bias,w)"] },
    { label: "(4)  w =", accept: ["w-eta*grad"] },
  ]},
};
