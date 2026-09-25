// Study content. Only real course material: exam items (images cut from the official
// solution PDFs), homework, and the learner's own Moed B script. Nothing here is an
// invented question — "first moves" are short notes distilled from the official solutions.
// Math: \( ... \) inline, \[ ... \] display (rendered by KaTeX). Strings use String.raw.
const R = String.raw;

window.STUCK_PROTOCOL = [
  "Write the definition or formula the item names (from the question text or the formula sheet).",
  "Plug in the numbers — especially any table they gave you. A given table means the question is built on it.",
  "Read the hint or remark: it is the shape of the answer (e.g. \\(\\nabla = \\sum_i z_i x^{(i)}\\) means the code is <code>X.T @ z</code>).",
  "Code blanks: the answer is spelled out in the docstring, the comments, or an earlier item.",
  "Write your setup even if you can't finish. Never cross it out — crossed-out correct work scores 0.",
];

window.TOPICS = [
// ─────────────────────────────────────────────────────────────── 0
{
  id: "moedb", num: 0, title: "Moed B free points", ready: true,
  blurb: "Redo the Moed B items that needed no derivation.",
  intro: R`
<p>You scored 35 in Moed B. These 11 items are worth <b>57 points</b>, and none of them needs a derivation — only a formula from the sheet, a given table, or a code template. You scored 5 of those 57.</p>
<p><b>How to do this topic:</b> for each item, answer on paper first, from memory, with only the formula sheet. Then open <i>What you wrote in Moed B</i> to see the difference, then the official solution, then mark yourself honestly.</p>`,
  moves: [],
  items: [
    { id: "2026B-q1.2",
      mine: { img: "images/mine/2026B-q1.2.png", score: "2 / 4", what: R`You divided by the <b>sum</b> of \(X_1\) (150) instead of its \(L_2\) norm, and you didn't normalize \(X_2\) at all. The question says "\(L_2\) norm of the vector composed of all values of that feature across all training samples".` },
      move: R`Norm of a feature column = \(\sqrt{\text{sum of squares}}\) over the training values. Compute \(\|X_1\|\) and \(\|X_2\|\) first, then divide <i>every</i> value of that column (train and test) by its norm. Then redo 1-NN on the new table.` },
    { id: "2026B-q1.4", context: ["2026B-q1.3"], code: "cubic",
      mine: { img: "images/mine/2026B-q1.4.png", score: "0 / 6", what: R`Blank 1: <code>np.abs(r)**3</code> is the <b>loss</b>, but \(z_i\) is the <b>derivative</b> of the loss. Blank 2: you wrote "answer to 1.3 in python", but the hint \(\nabla J = \sum_i z_i x^{(i)}\) is exactly <code>X.T @ z</code>, even without 1.3. Blank 3: <code>grad &lt; epsilon</code> compares a vector with a number; the docstring says <code>||grad J(w)||_2 &lt;= epsilon</code>.` },
      move: R`(1) \(z_i\) is the coefficient from the derivation in 1.3: \(3r_i^2\,\mathrm{sign}(r_i)\). (2) \(\sum_i z_i x^{(i)}\) in numpy is <code>X.T @ z</code>. (3) Copy the stopping rule from the docstring.` },
    { id: "2026B-q3.1",
      mine: { img: "images/mine/2026B-q3.1.png", score: "0 / 4", what: R`You computed \(w^\top x^{(1)} = -1\) and \(w^\top x^{(2)} = 3\) correctly, then tried to integrate \(\Phi(-1)\) by hand and crossed everything out. The answer was already on the page.` },
      move: R`\(\Phi\) is increasing and \(\Phi(0) = \tfrac12\). So \(\hat y > \tfrac12 \iff w^\top x > 0\): classify by the <b>sign</b> of \(w^\top x\), exactly like logistic regression. No integral.` },
    { id: "2026B-q3.2",
      mine: { score: "0 / 5", what: "Left blank." },
      move: R`Take the BCE formula printed in the question and replace \(\hat y_w(x^{(i)})\) with \(\Phi(t_i)\). That substitution is the entire answer.` },
    { id: "2026B-q3.4", context: ["2026B-q3.3"], code: "probit",
      mine: { img: "images/mine/2026B-q3.4.png", score: "1 / 8", what: R`Blanks 1–2 blank. Blank 3 unfinished (<code>self.BCE_loss(</code>). Blank 4: <code>current_loss &lt; self.eps</code>, but the comment says halting is based on loss <b>change</b>: <code>abs(previous_loss - current_loss) &lt; self.eps</code>.` },
      move: R`The same 4-line gradient descent skeleton as always: <code>grad = X.T @ z</code>, <code>w = w - lr * grad</code>, loss on the same batch, then the stop rule from the comment. Everything is computed on the batch (<code>X_b</code>, <code>y_b</code>).` },
    { id: "2026B-q4.2",
      mine: { img: "images/mine/2026B-q4.1.png", score: "2 / 5", what: R`You got the priors (0.2 / 0.8) but not the rates. Your 4.1 attempt wrote the log-likelihood of this specific dataset instead of a general \(\lambda\), and never differentiated — so there was no formula to use here. Your own HW5 derives \(\hat\lambda = \bar x\).` },
      move: R`Poisson MLE = the <b>average</b> of the counts (HW5 Q2). Per class: \(\hat\lambda_y\) = mean of that class's \(x_i\). Priors: \(\hat\pi_y\) = fraction of samples in class \(y\).` },
    { id: "2026B-q4.3",
      mine: { score: "0 / 5", what: "Left blank." },
      move: R`MAP: predict M iff \(\pi_M\,\mathrm{Poiss}(x\mid\lambda_M) > \pi_R\,\mathrm{Poiss}(x\mid\lambda_R)\). Write the ratio: the \(x!\) cancels, and you get \((\lambda_M/\lambda_R)^x\) against a constant with \(e^{\lambda_M-\lambda_R}\) — use the given \(e^t\) table.` },
    { id: "2026B-q5.1",
      mine: { img: "images/mine/2026B-q5.1.png", score: "0 / 3", what: R`You wrote the right GMM formula, then computed densities from scratch instead of reading them from the table, got wrong numbers, and crossed it out.` },
      move: R`\(f(x) = \pi_1\phi(x;\mu_1,1) + \pi_2\phi(x;\mu_2,1)\). With \(\sigma=1\), \(\phi\) depends only on \(|x-\mu|\) — read every value from the given table.` },
    { id: "2026B-q5.2",
      mine: { score: "0 / 6", what: "Left blank." },
      move: R`Responsibility = Bayes posterior (formula sheet): \(r(i,j) = \dfrac{\pi_j\,\phi(x_i;\mu_j,\sigma_j)}{f(x_i)}\). The numerators are the two terms you computed in 5.1; the denominator is the 5.1 answer.` },
    { id: "2026B-q5.3",
      mine: { score: "0 / 6", what: "Left blank." },
      move: R`M-step (formula sheet): \(n_j = \sum_i r(i,j)\), \(\pi_j = n_j / n\), \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x_i\).` },
    { id: "2026B-q5.4",
      mine: { score: "0 / 5", what: "Left blank." },
      move: R`MAP: compare \(\pi_A f(x\mid A)\) with \(\pi_B f(x\mid B)\) at each \(x\). \(f(x\mid A)\) is a GMM — evaluate it exactly like 5.1, with values from the same table.` },
  ],
},
// ─────────────────────────────────────────────────────────────── 1
{
  id: "gradient", num: 1, title: "Gradient template + GD code", ready: true,
  blurb: "One chain-rule move behind regression, LoR, probit, CLL — and most code blanks.",
  intro: R`
<p>In Moed B this single move was worth about <b>28 points</b> (Q1.3, Q1.4, Q3.3, Q3.4). It shows up in every exam: gradient of a loss → one step of gradient descent → fill in the gradient descent code. The loss changes from exam to exam (squared, LASSO, weighted, cubic, logistic, probit, CLL) — <b>the move never does</b>.</p>`,
  moves: [
    { title: "Derive the gradient of a loss that is a sum over samples",
      cue: R`"Derive an expression for the gradient…", "represent it as \(\nabla J(w)=\sum_i z_i x^{(i)}\)", "use the chain rule and group common terms".`,
      first: R`Write \(t_i = w^\top x^{(i)}\) (or \(r_i = w^\top x^{(i)} - y_i\)), and the fact from class: \(\dfrac{\partial t_i}{\partial w_j} = x^{(i)}_j\).`,
      recipe: R`
<ol>
<li>\(\dfrac{\partial J}{\partial w_j} = \sum_i \dfrac{\partial\,\ell_i}{\partial t_i}\cdot\dfrac{\partial t_i}{\partial w_j} = \sum_i \ell_i'(t_i)\,x^{(i)}_j\)</li>
<li>So \(\nabla J = \sum_i z_i\,x^{(i)}\) with \(z_i = \ell_i'(t_i)\) — <b>the derivative of one sample's loss with respect to its own \(t_i\)</b>.</li>
<li>Matrix form: \(\sum_i z_i x^{(i)} = X^\top z\).</li>
<li>A regularizer outside the sum just adds its own gradient: LASSO \(+\lambda\,\mathrm{sign}(\theta)\) (2025-C Q1.2).</li>
</ol>`,
      trap: R`\(z_i\) is the <b>derivative</b>, not the loss. In Moed B Q1.4 you wrote <code>np.abs(r)**3</code> (the loss) for <code>z</code>. Also: for \(|r|^k\), use \(\frac{d}{dr}|r| = \mathrm{sign}(r)\).` },
    { title: "The \\(z_i\\) of every loss the course has used",
      cue: "Reference. Each line comes from an official solution or your homework.",
      table: {
        head: ["Loss (per sample)", R`\(z_i\)`, "Source"],
        rows: [
          [R`\((t_i - y_i)^2\)`, R`\(2(t_i - y_i)\)  →  \(\nabla = 2X^\top(Xw-y)\)`, "2025-C Q1.2 · 2025-B Q1.4"],
          [R`\(\gamma_i (t_i - y_i)^2\) (weighted)`, R`\(2\gamma_i(t_i - y_i)\)  →  \(2X^\top\Gamma(Xw-y)\)`, "2026-A Q1.2"],
          [R`\(|t_i - y_i|^3\) (cubic)`, R`\(3(t_i-y_i)^2\,\mathrm{sign}(t_i-y_i)\)`, "2026-B Q1.3"],
          [R`BCE with \(\hat y = \sigma(t)\) (LoR)`, R`\(\dfrac{\sigma(t_i)-y_i}{n}\)`, "2026-B Q3.3, Remark 2"],
          [R`BCE with \(\hat y = \Phi(t)\) (probit)`, R`\(\dfrac{(\Phi(t_i)-y_i)\,\varphi(t_i)}{n\,\Phi(t_i)(1-\Phi(t_i))}\)`, "2026-B Q3.3"],
          [R`BCE with \(\hat y = \gamma(t) = 1-e^{-e^t}\) (CLL)`, R`\(\dfrac{e^{t_i}(\gamma(t_i)-y_i)}{n\,\gamma(t_i)}\)`, "HW3 Q6 (your own solution)"],
        ]},
      recipe: R`<p>All three BCE rows are one formula. For \(\hat y = g(t)\): \[z_i = \frac{(g(t_i) - y_i)\,g'(t_i)}{n\,g(t_i)\,(1-g(t_i))}\] then plug \(g'\): \(\sigma' = \sigma(1-\sigma)\) (everything cancels), \(\Phi' = \varphi\), \(\gamma' = e^t(1-\gamma)\).</p>` },
    { title: "Write the loss in terms of \\(t_i\\)",
      cue: R`"Write an expression for the BCE loss… simplify using \(t_i := w^\top x^{(i)}\)" (2026-B Q3.2, HW3 Q5).`,
      first: R`Copy the loss from the question and substitute \(\hat y_w(x^{(i)}) = g(t_i)\).`,
      recipe: R`That's usually the full answer. Simplify only when a log cancels an exp (CLL: \(\log(1-\gamma(t)) = -e^{t}\)).` },
    { title: "Gradient descent code: the 4-line skeleton",
      cue: "Fill in the blanks / find the bugs in a gradient descent (or mini-batch) loop.",
      first: R`Find the lines that compute <code>z</code>, <code>grad</code>, the update, and the stop rule — the blanks are almost always these.`,
      recipe: R`
<pre><code>X_b  = np.hstack([np.ones((X.shape[0], 1)), X])   # bias column: n = X.shape[0]
z    = ...                        # z_i from the derivation (vector over samples)
grad = X_b.T @ z                  # sum_i z_i x^(i)
w    = w - eta * grad             # step AGAINST the gradient
loss = loss_fn(X_b, y)            # on the SAME data the gradient used (the batch)
if np.linalg.norm(grad) &lt;= eps: break          # when told "||grad||_2 &lt;= eps"
if abs(previous_loss - current_loss) &lt; eps: …   # when told "loss change"</code></pre>
<p>Real examples: 2026-B Q1.4 and Q3.4, 2025-B Q1.5, 2025-A Q4.5.</p>`,
      trap: R`The stop rule is written in the docstring or a comment — copy it. In Moed B you wrote <code>grad &lt; epsilon</code> (vector vs number) and <code>current_loss &lt; eps</code> (loss, not loss change).` },
    { title: "One gradient descent step by hand",
      cue: R`"Execute one iteration of gradient descent with \(\theta = \dots\), \(\eta = \dots\)" (2025-C Q1.3, 2025-B Q1.4).`,
      first: R`Write \(X\) with the column of ones, then compute the residual vector \(X\theta - y\).`,
      recipe: R`\(\;X\theta - y\;\) → \(\;\nabla = 2X^\top(X\theta - y)\) (+ regularizer term) → \(\;\theta_{\text{new}} = \theta - \eta\nabla\). Show each vector — partial credit is per step.` },
  ],
  items: [
    { id: "2025C-q1.2", move: R`\(J\) = squared error + \(\lambda\sum_j|\theta_j|\). The squared part gives \(2X^\top(X\theta-y)\); the LASSO part gives \(\lambda\,\mathrm{sign}(\theta)\).` },
    { id: "2026A-q1.2", context: ["2026A-q1.1"], move: R`Each sample's loss is \(\gamma_i(t_i-y_i)^2\), so \(z_i = 2\gamma_i(t_i-y_i)\). In matrix form the weights sit between \(X^\top\) and the residual: \(2X^\top\Gamma(Xw-y)\).` },
    { id: "2026B-q1.3", move: R`\(r_i = w^\top x^{(i)} - y_i\). \(\frac{d}{dr}|r|^3 = 3|r|^2\,\mathrm{sign}(r)\), then the chain rule gives \(\cdot\,x^{(i)}_j\).` },
    { id: "2026B-q3.2", move: R`Substitute \(\hat y = \Phi(t_i)\) into the given BCE.` },
    { id: "hw3-q5", hw: true, title: "HW3 · Q5 — BCE under CLL in terms of \\(w^\\top x\\)", pts: null,
      prompt: R`<p>Complementary log-log (CLL) regression assumes \(\ln(-\ln(1-\hat y_w(x))) = w^\top x\), which gives \(\hat y_w(x) = \gamma(w^\top x)\) with \(\gamma(t) = 1-e^{-e^t}\) (Q1).</p><p><b>Q5.</b> Use the expression you obtained for \(\gamma\) in (1) to express the BCE loss as a function of \(w^\top x\).</p>`,
      solution: R`<p>Write \(t_i = w^\top x^{(i)}\). Then \(1-\hat y_w(x^{(i)}) = e^{-e^{t_i}}\), so \(\ln(1-\hat y_w(x^{(i)})) = -e^{t_i}\) and \(\ln \hat y_w(x^{(i)}) = \ln(1-e^{-e^{t_i}})\):</p>\[\mathrm{BCE}(w;D) = -\frac1n\sum_{i=1}^n\Big[y_i\ln(1-e^{-e^{t_i}}) - (1-y_i)\,e^{t_i}\Big]\]`,
      source: "Your own HW3 submission (hw3/hw3_solutions.md)",
      move: R`Substitute \(\hat y = \gamma(t_i)\) into the BCE; simplify \(\ln(1-\gamma(t)) = -e^t\).` },
    { id: "2026B-q3.3", context: ["2026B-q3.2"], move: R`\(\frac{\partial}{\partial w_j}\log\Phi(t_i) = \frac{\varphi(t_i)}{\Phi(t_i)}x^{(i)}_j\) and \(\frac{\partial}{\partial w_j}\log(1-\Phi(t_i)) = -\frac{\varphi(t_i)}{1-\Phi(t_i)}x^{(i)}_j\). Combine over a common denominator.` },
    { id: "hw3-q6", hw: true, title: "HW3 · Q6 — gradient of the BCE under CLL", pts: null,
      prompt: R`<p><b>Q6.</b> Express the gradient of the BCE loss and describe the gradient descent procedure for minimizing the BCE loss under CLL. When computing an expression for the gradient, use the chain rule for (partial) derivatives and group together common terms, in a similar way we did for the gradient of the MSE loss (for linear regression) and the BCE loss (for logistic regression).</p>`,
      solution: R`<p>With \(t_i = w^\top x^{(i)}\), \(\partial t_i/\partial w_j = x^{(i)}_j\), and \(\gamma'(t) = e^t e^{-e^t} = e^t(1-\gamma(t))\).</p>
<p>Per sample: \(\dfrac{\partial}{\partial w_j}\big[-y\ln\gamma(t) - (1-y)\ln(1-\gamma(t))\big] = \Big[-\dfrac{y\,\gamma'(t)}{\gamma(t)} + \dfrac{(1-y)\gamma'(t)}{1-\gamma(t)}\Big]x_j\).</p>
<p>Grouping: \(-\dfrac{y}{\gamma} + \dfrac{1-y}{1-\gamma} = \dfrac{\gamma - y}{\gamma(1-\gamma)}\); multiplying by \(\gamma' = e^t(1-\gamma)\) cancels \(1-\gamma\):</p>
\[\nabla\,\mathrm{BCE}(w;D) = \frac1n\sum_{i=1}^n \frac{e^{t_i}\,(\gamma(t_i)-y_i)}{\gamma(t_i)}\,x^{(i)}\]
<p>Gradient descent: initialize \(w\) with small random values; repeat \(w \leftarrow w - \eta\,\nabla\mathrm{BCE}(w)\) until \(|\mathrm{BCE}(w^{(t+1)}) - \mathrm{BCE}(w^{(t)})| < \varepsilon\) or an iteration cap.</p>`,
      source: "Your own HW3 submission (hw3/hw3_solutions.md)",
      move: R`Same chain rule as probit, with \(\gamma'\) in place of \(\varphi\).` },
    { id: "2025C-q1.3", context: ["2025C-q1.1"], move: R`Residual \(X\theta - y\) first, then \(2X^\top(\cdot) + \lambda\,\mathrm{sign}(\theta)\), then \(\theta - \eta\nabla\).` },
    { id: "2025B-q1.4", context: ["2025B-q1.1", "2025B-q1.2"], move: R`Ridge = squared error on the stacked \(X', y'\) from item 2, so \(\nabla = 2X'^\top(X'\theta - y')\). At \(\theta = 0\) this is \(-2X'^\top y'\).` },
    { id: "2025B-q1.5", code: "ridge", move: "Bias column needs n = number of rows. Prediction is design matrix @ parameters. Update steps against the gradient. Training error = mean of squared residuals." },
    { id: "2025A-q4.5", code: "logreg", move: R`Sigmoid is \(1/(1+e^{-z})\); the linear score is <code>X_with_bias @ w</code>; the update is <code>w - eta * grad</code>.` },
    { id: "2026B-q1.4", context: ["2026B-q1.3"], code: "cubic", move: R`<code>z = 3 * r**2 * np.sign(r)</code>, <code>grad = X.T @ z</code>, stop rule from the docstring.` },
    { id: "2026B-q3.4", context: ["2026B-q3.3"], code: "probit", move: R`Batch versions of the skeleton: <code>X_b.T @ z</code>, update with <code>self.learning_rate</code>, loss on <code>X_b, y_b</code>, stop on loss <i>change</i>.` },
  ],
},
// ─────────────────────────────────────────────────────────────── 2–11 (next)
{ id: "regression", num: 2, title: "Regression", ready: false, blurb: "X/y, GD step, closed form, cross-validation bug hunts, KNN + normalization. Q1 in every exam.", sources: "2025-A Q1 · 2025-B Q1 · 2025-C Q1 · 2026-A Q1 · 2026-B Q1" },
{ id: "linclass", num: 3, title: "Linear classification", ready: false, blurb: "Perceptron, LoR / probit predictions, TPR/FPR/ROC, separability, mappings.", sources: "2025-A Q4 · 2025-B Q3 · 2026-B Q3 · HW3" },
{ id: "svm", num: 4, title: "SVM", ready: false, blurb: "Max-margin by hand, margin, support vectors, hinge loss, effect of C. Not yet in 2026.", sources: "2025-B Q4 · 2025-C Q3 · HW4" },
{ id: "kernels", num: 5, title: "Kernels & mappings", ready: false, blurb: "Compute K(u,v), φ from K, dual perceptron, mapping tricks.", sources: "2026-A Q3 · 2025-B Q3.5–3.6 · 2026-B Q2.4 · HW4" },
{ id: "mle", num: 6, title: "MLE + MAP", ready: false, blurb: "Count / mean / log-derivative recipe; MAP thresholds on x, prior and cost.", sources: "2026-B Q4 · HW5" },
{ id: "bayes", num: 7, title: "Bayes classifiers", ready: false, blurb: "Full vs naive Bayes, cost matrix and risk.", sources: "2025-A Q5 · 2025-C Q4" },
{ id: "clustering", num: 8, title: "Clustering", ready: false, blurb: "K-means step, WCSS, ranges, linkage, K-means code.", sources: "2025-A Q2 · 2025-C Q5 · 2026-A Q4 · HW6" },
{ id: "gmm", num: 9, title: "GMM / EM", ready: false, blurb: "Gaussian EM and coin EM: responsibilities, M-step.", sources: "2026-B Q5 · 2025-B Q5 · 2026-A Q5 · HW6" },
{ id: "trees", num: 10, title: "Decision trees", ready: false, blurb: "Upkeep: impurity, min-depth trees, LOO, pruning, short proofs.", sources: "2025-A Q3 · 2025-B Q2 · 2025-C Q2 · 2026-A Q2 · 2026-B Q2" },
{ id: "resit", num: 11, title: "Timed re-sit", ready: false, blurb: "One real past exam, 3 hours, closed book, then review.", sources: "The least-practised past exam" },
];

// Code blanks: accepted answers are the official solution plus plainly equivalent spellings.
// Anything else is shown next to the official answer for you to judge — never auto-failed.
window.CODE = {
  cubic: { item: "2026B-q1.4", blanks: [
    { label: "(1)  z =", accept: ["3*r**2*np.sign(r)", "3.0*r**2*np.sign(r)", "3*np.sign(r)*r**2", "3*r*np.abs(r)", "3*np.abs(r)*r", "3*np.abs(r)**2*np.sign(r)"] },
    { label: "(2)  grad =", accept: ["X.T@z", "np.dot(X.T,z)", "X.T.dot(z)", "X.transpose()@z"] },
    { label: "(3)  if … :", accept: ["np.linalg.norm(grad)<=epsilon", "np.linalg.norm(grad)<epsilon", "np.sum(grad**2)<=epsilon**2", "np.sqrt(np.sum(grad**2))<=epsilon"] },
  ]},
  probit: { item: "2026B-q3.4", blanks: [
    { label: "(1)  grad =", accept: ["X_b.T@z", "np.dot(X_b.T,z)", "X_b.T.dot(z)"] },
    { label: "(2)  self.w =", accept: ["self.w-self.learning_rate*grad", "self.w_-self.learning_rate*grad"] },
    { label: "(3)  current_loss =", accept: ["self.BCE_loss(X_b,y_b)", "self.BCE_loss(X_b,y01_b)"] },
    { label: "(4)  if … :", accept: ["abs(previous_loss-current_loss)<self.eps", "np.abs(previous_loss-current_loss)<self.eps", "abs(current_loss-previous_loss)<self.eps", "np.abs(current_loss-previous_loss)<self.eps", "abs(previous_loss-current_loss)<=self.eps"] },
  ]},
  ridge: { item: "2025B-q1.5", blanks: [
    { label: "(1)", accept: ["X.shape[0]", "len(X)"] },
    { label: "(2)  y_hat =", accept: ["X_with_bias@theta", "np.dot(X_with_bias,theta)"] },
    { label: "(3)  theta =", accept: ["theta-eta*grad"] },
    { label: "(4)  if … :", accept: ["np.linalg.norm(grad)<eps", "np.linalg.norm(grad)<=eps"] },
    { label: "(5)  np.mean( … )", accept: ["(y_hat-y)**2", "(y-y_hat)**2"] },
  ]},
  logreg: { item: "2025A-q4.5", blanks: [
    { label: "(1)", accept: ["numpy"] },
    { label: "(2)  return", accept: ["1/(1+np.exp(-z))"] },
    { label: "(3)  z =", accept: ["X_with_bias@w", "np.dot(X_with_bias,w)"] },
    { label: "(4)  w =", accept: ["w-eta*grad"] },
  ]},
};
