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
  intro: R`<p>Question 1 of every past exam is regression. The loss changes from exam to exam (ridge, LASSO, weighted, cubic), but the parts repeat: <b>write \(X\) and \(y\)</b> → <b>gradient</b> → <b>one gradient descent step</b> or <b>closed form</b> → <b>code</b>.</p>
<p><b>How to use the notes:</b> read them in order — each one builds on the one before. Every note explains the idea in plain words, decodes the symbols, and works a full example with real numbers. The examples all use the data of <b>2025-C Question 1</b>, so that question becomes your guided first one (you'll recognise the numbers). The other four questions you then do on your own.</p>`,
  moves: [
    { title: "0 · Start here: what regression is, and what the symbols mean",
      idea: R`<p>You get a table. Each <b>row</b> is one example (a "sample"). Each sample has a few <b>input numbers</b> (the "features", \(x_1, x_2\)) and one <b>output number</b> (the "label", \(y\)) that we want to learn to predict.</p>
<p>Regression means: choose a formula that turns the features into a <b>predicted</b> label. In this course the formula is always a weighted sum:</p>
\[\hat y = \theta_0 + \theta_1 x_1 + \theta_2 x_2\]
<p>The \(\theta\)'s are <b>knobs</b> ("weights" or "parameters"). Different knob settings give different predictions. <b>Training</b> = finding the knob settings whose predictions are as close as possible to the true labels in the table. Every regression question is about <i>how</i> we measure "close" and <i>how</i> we find the best knobs.</p>`,
      notation: [
        [R`\(n\)`, "number of samples (rows in the table)"],
        [R`\(p\)`, R`number of features (2 in every exam so far: \(x_1, x_2\))`],
        [R`\(x^{(i)}\)`, R`the features of sample \(i\). The \((i)\) up top is the <b>row number</b>, not a power.`],
        [R`\(x^{(i)}_j\)`, R`feature \(j\) of sample \(i\) — row \(i\), column \(j\)`],
        [R`\(y_i\) or \(y^{(i)}\)`, R`the true label of sample \(i\)`],
        [R`\(\theta = (\theta_0, \theta_1, \theta_2)\)`, R`the weights. Some exams call them \(w\) — identical meaning.`],
        [R`\(\theta_0\)`, R`the <b>bias</b> (intercept): the prediction when every feature is 0. It isn't attached to any feature.`],
        [R`\(\hat y\) ("y-hat")`, "a prediction. The hat always means \"our guess\"."],
        [R`\(\theta^\top x\)`, R`a dot product: \(\theta_0\cdot 1 + \theta_1 x_1 + \theta_2 x_2\) — exactly the prediction formula`],
        [R`\(r_i = \hat y_i - y_i\)`, R`the <b>residual</b>: how far the prediction on sample \(i\) is from the truth`],
        [R`\(J(\theta)\)`, R`the <b>loss</b>: one number saying how bad the knob setting \(\theta\) is on the whole table`],
        [R`\(\theta^*\)`, R`the best knob setting — the \(\theta\) with the smallest \(J\)`],
      ],
      example: R`<p>2025-C Q1's table: sample 1 has \(x_1 = -1, x_2 = 1, y = 6\); sample 2 has \(x_1 = -2, x_2 = 0, y = 4\).</p>
<p>Take the knob setting \(\theta = (1, -2, 3)\), i.e. \(\theta_0 = 1, \theta_1 = -2, \theta_2 = 3\):</p>
<ul>
<li>Sample 1: \(\hat y = 1 + (-2)(-1) + 3\cdot 1 = 6\). True \(y = 6\) → residual \(r_1 = 0\) (perfect).</li>
<li>Sample 2: \(\hat y = 1 + (-2)(-2) + 3\cdot 0 = 5\). True \(y = 4\) → residual \(r_2 = 1\) (one too high).</li>
</ul>
<p>That's all a regression model does: plug features into the formula.</p>` },

    { title: "1 · Write the data matrix \\(X\\) and the label vector \\(y\\)",
      idea: R`<p>Instead of computing each prediction separately, stack all samples into one table \(X\), so that <b>one multiplication \(X\theta\) gives every prediction at once</b>.</p>
<p>Why a column of ones? The formula is \(\theta_0 + \theta_1 x_1 + \theta_2 x_2 = \theta_0\cdot\mathbf{1} + \theta_1 x_1 + \theta_2 x_2\). The bias \(\theta_0\) needs a number to multiply, and that number is always 1. So row \(i\) of \(X\) is \((1,\ x^{(i)}_1,\ x^{(i)}_2)\).</p>
<p>\(y\) is simply the label column as a vector.</p>`,
      notation: [
        [R`\(X\)`, R`the \(n \times (p+1)\) data matrix: one row per sample, first column all ones`],
        [R`\(y\)`, R`the vector of the \(n\) true labels`],
        [R`\(X\theta\)`, R`the vector of all \(n\) predictions (row \(i\) of \(X\) dotted with \(\theta\))`],
        [R`\(X\theta - y\)`, R`the vector of all residuals \(r = (r_1, \dots, r_n)\)`],
      ],
      example: R`<p>2025-C Q1 (this is the official answer to its part 1):</p>
\[X = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix},\qquad y = \begin{bmatrix}6\\4\\5\\1\end{bmatrix}\]
<p>With \(\theta = (1,-2,3)\), each entry of \(X\theta\) is one row dotted with \(\theta\):</p>
\[X\theta = \begin{bmatrix}1+2+3\\1+4+0\\1-2+9\\1+0+3\end{bmatrix} = \begin{bmatrix}6\\5\\8\\4\end{bmatrix},\qquad r = X\theta - y = \begin{bmatrix}0\\1\\3\\3\end{bmatrix}\]`,
      cue: R`Part 1 of almost every Q1: "Write down the data matrix \(X\) such that \(X\theta\) produces the predictions".`,
      first: R`Draw the table: a column of 1s, then the feature columns in order. Then \(y\).`,
      recipe: R`Weighted variant (2026-A): each sample also has an importance weight \(\gamma_i\). Put the weights on the diagonal of a matrix \(\Gamma = \mathrm{diag}(\gamma_1,\dots,\gamma_n)\) (zeros elsewhere). Then \((Xw-y)^\top\Gamma(Xw-y) = \sum_i \gamma_i r_i^2\).`,
      trap: "Forgetting the ones column loses points on this part and makes every later part wrong." },

    { title: "2 · The loss \\(J\\): how bad is a knob setting?",
      idea: R`<p>We need <b>one number</b> that says how wrong the predictions are overall, so we can compare knob settings. The standard choice: take every residual, <b>square</b> it, and <b>add them up</b>.</p>
<ul>
<li>Squaring makes every error positive (so +3 and −3 don't cancel).</li>
<li>Squaring makes big errors cost much more than small ones.</li>
</ul>
<p>Exams then add a <b>penalty</b> on the weights themselves ("regularization"). Why? Huge weights make a model over-react to its training data. The penalty makes the loss worse when the weights get big, so training prefers smaller weights. \(\lambda\) sets how strong the penalty is: \(\lambda = 0\) means no penalty.</p>`,
      notation: [
        [R`\(\|v\|^2\)`, R`squared length of a vector = the sum of the squares of its entries`],
        [R`\(\|X\theta - y\|^2\)`, R`\(= \sum_i r_i^2\), the sum of squared residuals`],
        [R`\(\|\theta\|_1\)`, R`sum of absolute values: \(|\theta_0| + |\theta_1| + |\theta_2|\)`],
        [R`\(\lambda\) ("lambda")`, "a number you choose in advance (a \"hyperparameter\") that sets the penalty strength"],
        [R`\(\sum_{i=1}^{n}\)`, R`"add this up over every sample \(i\)"`],
      ],
      example: R`<p>Residuals from note 1: \(r = (0, 1, 3, 3)\). Squared and added: \(0 + 1 + 9 + 9 = 19\).</p>
<p>2025-C uses LASSO with \(\lambda = 1\): penalty \(= |1| + |-2| + |3| = 6\). So \(J_{\lambda=1}(1,-2,3) = 19 + 6 = 25\).</p>
<p><b>The loss variants you'll meet</b> (only the penalty or the per-sample error changes):</p>
<ul>
<li><b>Plain least squares:</b> \(\sum_i r_i^2\)</li>
<li><b>Ridge</b> (2025-A, 2025-B): \(+\ \lambda(\theta_1^2 + \theta_2^2)\). The exam writes it as \(\lambda(\|\theta\|^2 - \theta_0^2)\), which means "square every weight except the bias".</li>
<li><b>LASSO</b> (2025-C): \(+\ \lambda(|\theta_0| + |\theta_1| + |\theta_2|)\)</li>
<li><b>Weighted</b> (2026-A): \(\sum_i \gamma_i r_i^2\) — some samples count more</li>
<li><b>Cubic</b> (2026-B): \(\sum_i |r_i|^3\)</li>
</ul>`,
      cue: R`2025-A Q1.2 asks you to see \(J\) as a polynomial in \(\theta_0,\theta_1,\theta_2\).`,
      first: R`Write \(J\) as a sum of squared brackets, one bracket per sample, e.g. \((\theta_0 + \theta_1 + 2\theta_2 - 3)^2 + \dots\)`,
      recipe: R`Every bracket squared gives only degree-2 terms (\(\theta_1^2\), \(\theta_0\theta_1\), …), degree-1 terms, and constants — so \(J\) is a degree-2 polynomial. The coefficient of \(\theta_1^2\) = sum of \((x_1^{(i)})^2\) over the samples (+\(\lambda\) for ridge). The constant = the value at \(\theta = 0\) = \(\sum_i y_i^2\).` },

    { title: "3 · The gradient: which direction makes the loss grow?",
      idea: R`<p>\(J\) depends on three knobs at once. Think of \(J\) as a <b>landscape</b>: the position is \(\theta\) and the height is the loss. We want the lowest point.</p>
<p>The <b>partial derivative</b> \(\dfrac{\partial J}{\partial \theta_1}\) answers one question: "if I turn only knob \(\theta_1\) up a tiny bit and hold the others still, how fast does \(J\) change?" You compute it like an ordinary derivative, treating the other \(\theta\)'s as constants.</p>
<p>The <b>gradient</b> \(\nabla J\) is just the three partial derivatives stacked into a vector. It points in the direction where the loss grows fastest (uphill).</p>`,
      notation: [
        [R`\(\dfrac{\partial J}{\partial \theta_j}\)`, R`partial derivative: the derivative of \(J\) with respect to knob \(j\) only`],
        [R`\(\nabla J\) ("nabla J")`, R`the gradient \(= \left(\dfrac{\partial J}{\partial\theta_0}, \dfrac{\partial J}{\partial\theta_1}, \dfrac{\partial J}{\partial\theta_2}\right)\)`],
        [R`\(X^\top\)`, R`\(X\) transposed: its columns become rows`],
        [R`\(\mathrm{sign}(a)\)`, R`\(+1\) if \(a > 0\), \(-1\) if \(a < 0\): the derivative of \(|a|\)`],
      ],
      example: R`<p><b>Deriving it with the tools you know.</b> Write the loss out: \(J = \sum_i (\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y_i)^2 = \sum_i r_i^2\).</p>
<p>Differentiate with respect to \(\theta_1\). Each term is (bracket)², so the chain rule gives 2·(bracket)·(derivative of the bracket). Inside the bracket, only \(\theta_1 x^{(i)}_1\) contains \(\theta_1\), so the bracket's derivative is \(x^{(i)}_1\):</p>
\[\frac{\partial J}{\partial \theta_1} = \sum_i 2\,r_i\,x^{(i)}_1\]
<p>Same for the others: \(\dfrac{\partial J}{\partial \theta_0} = \sum_i 2 r_i \cdot 1\) and \(\dfrac{\partial J}{\partial \theta_2} = \sum_i 2 r_i x^{(i)}_2\).</p>
<p><b>Spot the pattern:</b> \(\partial J/\partial\theta_j\) = 2 × (column \(j\) of \(X\)) · (residual vector). Doing that for every column at once is exactly \(X^\top r\), because \(X^\top\) turns the columns into rows:</p>
\[\nabla J = 2X^\top(X\theta - y)\]
<p><b>With numbers</b> (2025-C, \(\theta = (1,-2,3)\), \(r = (0,1,3,3)\)):</p>
<ul>
<li>column 0 \((1,1,1,1)\cdot r = 7\)</li>
<li>column 1 \((-1,-2,1,0)\cdot r = 0 - 2 + 3 + 0 = 1\)</li>
<li>column 2 \((1,0,3,1)\cdot r = 0 + 0 + 9 + 3 = 12\)</li>
</ul>
<p>So \(2X^\top r = (14, 2, 24)\). Now the LASSO penalty: the derivative of \(\lambda|\theta_j|\) is \(\lambda\,\mathrm{sign}(\theta_j)\), and \(\mathrm{sign}(1,-2,3) = (1,-1,1)\). With \(\lambda = 1\):</p>
\[\nabla J = (14, 2, 24) + (1, -1, 1) = (15, 1, 25)\]
<p class="muted">(The official 2025-C Q1.3 solution prints the middle entry as 0. That's an arithmetic slip: \(2 + (-1) = 1\).)</p>`,
      cue: R`"Express the gradient of \(J\) as a function of \(X, y, \theta\)" (2025-A, 2025-C, 2026-A) or "represent it as \(\nabla J = \sum_i z_i x^{(i)}\)" (2026-B).`,
      first: R`Write \(r_i = \theta^\top x^{(i)} - y_i\) and the fact from class \(\dfrac{\partial r_i}{\partial \theta_j} = x^{(i)}_j\). Then take the derivative of <b>one sample's</b> loss.`,
      recipe: R`<p>The general shape: \(\dfrac{\partial J}{\partial\theta_j} = \sum_i z_i\,x^{(i)}_j\), where \(z_i\) = "the derivative of sample \(i\)'s loss with respect to its residual". So \(\nabla J = \sum_i z_i x^{(i)} = X^\top z\). Only \(z_i\) changes between exams:</p>`,
      table: {
        head: ["Loss", R`\(z_i\), then the gradient`, "Where"],
        rows: [
          [R`\(\sum_i r_i^2\)`, R`\(z_i = 2r_i\) → \(2X^\top(X\theta-y)\)`, "all"],
          [R`\(\sum_i \gamma_i r_i^2\) (weighted)`, R`\(z_i = 2\gamma_i r_i\) → \(2X^\top\Gamma(Xw-y)\)`, "2026-A Q1.2"],
          [R`\(\sum_i |r_i|^3\) (cubic)`, R`\(z_i = 3r_i^2\,\mathrm{sign}(r_i)\)`, "2026-B Q1.3"],
          [R`ridge penalty \(\lambda(\theta_1^2+\theta_2^2)\)`, R`adds \(2\lambda(0,\theta_1,\theta_2)\)`, "2025-A Q1.3"],
          [R`LASSO penalty \(\lambda\|\theta\|_1\)`, R`adds \(\lambda\,\mathrm{sign}(\theta)\)`, "2025-C Q1.2"],
        ]},
      trap: R`\(z_i\) is the <b>derivative</b>, not the loss. In Moed B Q1.4 you wrote <code>np.abs(r)**3</code> (the loss) where \(z\) belonged.` },

    { title: "4 · Gradient descent: one step downhill",
      idea: R`<p>The gradient points <b>uphill</b>. To lower the loss, take a small step the <b>opposite</b> way:</p>
\[\theta_{\text{new}} = \theta - \eta\,\nabla J(\theta)\]
<p>\(\eta\) ("eta", the learning rate) is how big a step to take, e.g. 0.1. Repeat many times; when the gradient is (almost) zero, the ground is flat — you're at the bottom. That repeated loop is <b>gradient descent</b>. On paper, the exam asks for <b>one</b> step.</p>`,
      notation: [
        [R`\(\eta\) ("eta")`, "learning rate = step size"],
        [R`\(\theta \leftarrow \dots\)`, R`"replace \(\theta\) with …" (an update)`],
      ],
      example: R`<p>2025-C (\(\theta = (1,-2,3)\), \(\eta = 0.1\), gradient \((15, 1, 25)\) from note 3):</p>
\[\theta_{\text{new}} = (1,-2,3) - 0.1\,(15, 1, 25) = (1 - 1.5,\ -2 - 0.1,\ 3 - 2.5) = (-0.5,\ -2.1,\ 0.5)\]
<p class="muted">(Because of the slip mentioned in note 3, the official solution prints \(-2\) for the middle entry.)</p>`,
      cue: R`"Execute one iteration of gradient descent with \(\theta = \dots\), \(\eta = \dots\), \(\lambda = \dots\)" (2025-A Q1.3b, 2025-B Q1.4, 2025-C Q1.3).`,
      first: R`Compute the residual vector \(X\theta - y\). (At \(\theta = 0\) it is just \(-y\).)`,
      recipe: R`Residual \(X\theta - y\) → gradient (note 3) → \(\theta - \eta\nabla J\). Write every vector down; each step earns partial credit.` },

    { title: "5 · The closed form: jumping straight to the bottom",
      idea: R`<p>At the lowest point of the landscape the ground is flat, so the gradient is zero. For squared-error losses, "gradient = 0" is a system of <b>linear equations</b> — you can solve it directly instead of walking downhill step by step:</p>
\[2X^\top(X\theta - y) = 0 \;\Longrightarrow\; X^\top X\,\theta = X^\top y \;\Longrightarrow\; \theta^* = (X^\top X)^{-1}X^\top y\]
<p>This is the "analytical solution" (also called the pseudo-inverse solution). It needs \(X^\top X\) to be invertible.</p>`,
      notation: [
        [R`\((X^\top X)^{-1}\)`, R`the inverse matrix of \(X^\top X\)`],
        [R`"analytically"`, "with a formula, in one go — no iterations"],
      ],
      example: R`<p><b>When does a formula exist?</b></p>
<ul>
<li><b>Plain least squares:</b> yes, \(\theta^* = (X^\top X)^{-1}X^\top y\).</li>
<li><b>Weighted</b> (2026-A): the gradient \(2X^\top\Gamma(Xw-y) = 0\) gives \(w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\).</li>
<li><b>Ridge</b> (2025-B): the penalty \(\lambda\theta_1^2 = (0\cdot\theta_0 + \sqrt\lambda\,\theta_1 + 0\cdot\theta_2 - 0)^2\) looks exactly like one more squared residual, for a "fake" sample with features \((0, \sqrt\lambda, 0)\) and label 0. Add one fake row per penalized weight to \(X\) (and zeros to \(y\)), and ridge becomes plain least squares on \(X', y'\): \(\theta^* = (X'^\top X')^{-1}X'^\top y'\).</li>
<li><b>LASSO</b> (2025-C): no. Its gradient contains \(\mathrm{sign}(\theta)\), which isn't linear (and \(|\theta|\) has no derivative at 0). So LASSO is solved with gradient descent.</li>
</ul>
<p><b>Comparing two solutions</b> (2025-C Q1.4): \(\theta^*\) is the minimizer of \(J_\lambda\), so no other vector can do better <i>on \(J_\lambda\)</i>. The least-squares vector \(\tilde\theta\) minimizes a different loss (no penalty). So \(J_\lambda(\theta^*) \le J_\lambda(\tilde\theta)\), and it's strictly smaller unless the two happen to coincide.</p>`,
      cue: R`"Is it possible to find \(\theta^*\) analytically?", "Find a formula for \(w^*\)", "Compare \(J(\theta^*)\) with \(J(\tilde\theta)\)" (2025-B Q1.2–1.3, 2026-A Q1.3, 2025-C Q1.4).`,
      first: R`Set the gradient to zero, or rewrite the loss as \(\|X'\theta - y'\|^2\) for a modified \(X', y'\).` },

    { title: "6 · Code parts: the gradient descent loop and cross-validation bugs",
      idea: R`<p>Every Q1 ends with code: fill in blanks, or find planted bugs. The code only ever does the things from notes 1–4, so read each line and ask "which note is this?".</p>
<p><b>Gradient descent, line by line:</b></p>
<pre><code>X_b  = np.hstack([np.ones((X.shape[0], 1)), X])  # note 1: add the ones column. X.shape[0] = number of ROWS = n
w    = np.zeros(X_b.shape[1])                     # start with all knobs at 0 (one knob per column)
for _ in range(max_iter):
    r    = X_b @ w - y                            # note 1: residuals (prediction minus truth)
    z    = 2 * r                                  # note 3: z_i for this loss
    grad = X_b.T @ z                              # note 3: sum_i z_i x^(i)
    if np.linalg.norm(grad) &lt;= eps:               # flat enough? stop (copy the rule from the docstring)
        break
    w    = w - eta * grad                         # note 4: step AGAINST the gradient</code></pre>
<p><b>Cross-validation (choosing \(\lambda\)).</b> Training error can't pick \(\lambda\): on the training data, less penalty always fits better. So we test on data the model didn't train on:</p>
<ol>
<li>Split the rows into \(k\) groups ("folds").</li>
<li>For each fold: train on the <b>other</b> folds, then measure plain squared error on <b>this</b> fold (the validation fold).</li>
<li>Average those \(k\) errors. That's the CV risk for this \(\lambda\).</li>
<li>Keep the \(\lambda\) with the <b>lowest</b> average.</li>
</ol>`,
      notation: [
        [R`<code>X.shape[0]</code> / <code>X.shape[1]</code>`, "number of rows (samples) / number of columns (features)"],
        [R`<code>X.T @ z</code>`, R`\(X^\top z\) — <code>@</code> is matrix multiplication`],
        [R`<code>np.linalg.norm(v)</code>`, R`length of a vector, \(\sqrt{\sum v_i^2}\)`],
        [R`<code>arange(n)[i::k]</code>`, R`indices \(i, i+k, i+2k, \dots\) — fold number \(i\)`],
      ],
      example: R`<p><b>Bugs planted in the real exams</b> — each one appeared at least once. Check every line against this list:</p>
<ul>
<li><code>n = X.shape[1]</code> → should be <code>X.shape[0]</code>: \(n\) counts samples = rows (2025-A, 2025-C)</li>
<li><code>y_pred = X_train @ w</code> → <code>X_val @ w</code>: validation must predict the validation rows (2025-A)</li>
<li>risk computed with <code>y_train</code> → <code>y_val</code> (2025-C)</li>
<li>validation risk that adds the penalty \(\lambda\|w\|\) → remove it: validation measures plain squared error (2025-A, 2025-C)</li>
<li>comparing the last fold's <code>risk</code> → compare <code>np.mean(lo_risk)</code>, the average over all folds (2025-A)</li>
<li><code>if np.mean(lo_risk) &gt; min_cv_risk</code> → <code>&lt;</code>; and <code>min_cv_risk = np.sum(lo_risk)</code> → <code>np.mean</code> (2025-C)</li>
<li><code>range(1, num_iters)</code> → <code>range(num_iters)</code>; <code>error = y - y_pred</code> → <code>y_pred - y</code>; gradient missing the weights → <code>2*X.T @ (gamma*error)</code>; <code>w + eta*grad</code> → <code>w - eta*grad</code>; <code>(gamma*error)**2</code> → <code>gamma*error**2</code>; stop test <code>&gt;</code> → <code>&lt;</code> (all six in 2026-A)</li>
</ul>`,
      cue: "Fill in the blanks of a gradient descent loop (2025-B Q1.5, 2026-B Q1.4), or find the errors in a cross-validation / gradient descent function (2025-A Q1.4, 2025-C Q1.5, 2026-A Q1.4).",
      first: "Read the docstring first: it states the shapes, the loss and the stopping rule. The blanks and the bugs are the lines that disagree with it.",
      trap: R`In Moed B you wrote <code>grad &lt; epsilon</code> — a vector compared with a number. The docstring said <code>||grad J(w)||_2 &lt;= epsilon</code>, which is <code>np.linalg.norm(grad) &lt;= epsilon</code>.` },

    { title: "7 · KNN regression and normalization",
      idea: R`<p>A completely different kind of regression: <b>no weights at all</b>. To predict the label of a new point:</p>
<ol>
<li>Measure its distance to every training sample: \(\sqrt{(a_1 - b_1)^2 + (a_2 - b_2)^2}\) (Euclidean distance).</li>
<li>Take the \(k\) closest ones (1-NN: the single closest; 2-NN: the two closest).</li>
<li>Predict the <b>average of their labels</b>.</li>
</ol>
<p><b>Why normalize?</b> If one feature ranges over 20–50 and another over 0–2, the big one dominates every distance and the small one is practically ignored. Normalizing puts them on comparable scales, and the nearest neighbours can change.</p>`,
      notation: [
        [R`\(L_2\) norm of a feature`, R`\(\sqrt{\text{sum of the squares of that column's values}}\) over the training samples`],
        [R`MSE`, R`mean squared error \(= \frac1n\sum_i(\hat y_i - y_i)^2\) over the test samples`],
      ],
      example: R`<p>Normalizing, as 2026-B Q1.2 defines it: for each feature column, compute its \(L_2\) norm over the <b>training</b> rows, then divide <b>every</b> value in that column (training and test) by that norm. Do this for <b>each</b> feature separately. Then redo the distance table.</p>`,
      cue: R`"Compute the predictions of 1-NN / 2-NN and the test MSE", "normalize each feature by its \(L_2\) norm" (2026-B Q1.1–1.2).`,
      first: "A distance table: every test point against every training point.",
      trap: R`In Moed B you divided by the <b>sum</b> of the column instead of the \(L_2\) norm, and normalized only \(X_1\).` },
  ],
  questions: [
    { id: "2025C-q1", summary: "LASSO: X and y, gradient, one GD step, compare with least squares, find bugs in cross-validation code.",
      parts: {
        2: { move: R`Squared part gives \(2X^\top(X\theta-y)\); the LASSO part gives \(\lambda\,\mathrm{sign}(\theta)\).` },
        3: { move: R`Residual \(X\theta - y\) first, then the gradient from part 2, then \(\theta - \eta\nabla\). Note: the official solution has a slip in the middle entry — the correct gradient is \((15, 1, 25)\) and the update is \((-0.5, -2.1, 0.5)\).` },
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
