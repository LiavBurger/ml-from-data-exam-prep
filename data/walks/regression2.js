// Walkthroughs for the other Regression questions (2025-A, 2025-B, 2026-A, 2026-B Q1) — CASUAL style (spec/WALKS.md).
// The gradient template is walked in full in data/walks/regression.js (2025-C Q1.2); each spot here restates the step it uses (WALKS.md §8), with a pointer after.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ───────────────────────── 2025-A Q1 (ridge) ─────────────────────────
    "2025A-q1.1": {
      point: R`<p>\(X\) is just the table with a column of 1s in front (the 1 is for \(\theta_0\)).</p>`,
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix}\]`,
      moves: [
        { line: R`<b>X</b> — one row per sample: a 1, then \(x_1\), then \(x_2\): <div class="formula">\[X = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\end{bmatrix}\]</div>`,
          why: R`<p>Row 1 times \(\theta\) is \(\theta_0\cdot 1 + \theta_1\cdot 1 + \theta_2\cdot 2\) — sample 1's prediction. The 1 is what \(\theta_0\) multiplies. (Same as 2025-C Q1, part 1.)</p>` },
        { line: R`<b>y</b> (not asked, but part 3 needs it) — the labels, same order: \(\;y = (3, 1, 4, -1)\). Done.` },
      ],
      compare: R`Same \(X\) (and \(y\)) as the official answer.`,
    },

    "2025A-q1.2": {
      point: R`<p>\(J\) is squared brackets plus \(\theta^2\)'s, and squaring a bracket only makes \(\theta\cdot\theta\) terms, single \(\theta\)'s and numbers — that's the form. \(a_1\) = everything in front of \(\theta_1^2\); \(d\) = what's left when every \(\theta = 0\).</p>`,
      start: R`<p><b>The function, one bracket per sample:</b></p>\[J_\lambda(\theta) = (\;\square\;)^2 + (\;\square\;)^2 + \dots + \lambda(\;\square\;)\]<p><b>It has that form because</b> \(\square\)</p>\[a_1 = \;\square \qquad d = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — one squared bracket per row of \(X\) (row · \(\theta\) − label), plus the penalty: <div class="formula">\[\begin{aligned}J_\lambda = \;&(\theta_0 + 1\theta_1 + 2\theta_2 - 3)^2\\ +\;&(\theta_0 + 2\theta_1 + 0\theta_2 - 1)^2\\ +\;&(\theta_0 + 3\theta_1 + 1\theta_2 - 4)^2\\ +\;&(\theta_0 + 0\theta_1 - 1\theta_2 + 1)^2\\ +\;&\lambda(\theta_1^2 + \theta_2^2)\end{aligned}\]</div>Penalty: \(\|\theta\|^2\) = all weights squared, so \(\theta_0^2\) cancels: <div class="formula">\[\begin{aligned}\|\theta\|^2 - \theta_0^2 &= \color{#e8912d}\theta_0^2 + \theta_1^2 + \theta_2^2 \color{#e8912d}- \theta_0^2\\ &= \theta_1^2 + \theta_2^2\end{aligned}\]</div>(bias not penalized)`,
          why: R`<p>\(\|X\theta - y\|^2\) is a sum of per-sample squares: each sample's (prediction − label)², with the rows of \(X\) from part 1. The penalty \(\|\theta\|^2 - \theta_0^2 = \theta_0^2 + \theta_1^2 + \theta_2^2 - \theta_0^2 = \theta_1^2 + \theta_2^2\).</p>` },
        { line: R`<b>Why it has that form</b> — squaring a bracket of plain \(\theta\)'s gives only \(\theta\cdot\theta\) terms, single \(\theta\) terms and a number. The penalty adds \(\theta^2\) terms. So \(J\) is exactly those ten kinds of terms.`,
          why: R`<p>Sample 1's bracket, squared:</p>
\[\begin{aligned}(\theta_0 + \theta_1 + 2\theta_2 - 3)^2 = \;&\theta_0^2 + \theta_1^2 + 4\theta_2^2\\ &+ 2\theta_0\theta_1 + 4\theta_0\theta_2 + 4\theta_1\theta_2\\ &- 6\theta_0 - 6\theta_1 - 12\theta_2 + 9\end{aligned}\]
<p>No \(\theta^3\), nothing else. The official solution says "this is a quadratic expression" is an acceptable argument.</p>` },
        { line: R`<b>\(a_1\) = everything in front of \(\theta_1^2\)</b> — each bracket gives (its \(x_1\))\(^2\,\theta_1^2\), the penalty gives \(\lambda\theta_1^2\): <div class="formula">\[a_1 = 1^2 + 2^2 + 3^2 + 0^2 + \lambda = 14 + \lambda\]</div>`,
          why: R`<p>In sample 2's bracket \(\theta_1\) has a 2 in front, so squaring gives \((2\theta_1)^2 = 4\theta_1^2\). That number in front is the sample's \(x_1\): 1, 2, 3, 0.</p>` },
        { line: R`<b>\(d\) = the number with no \(\theta\)</b> — set every \(\theta = 0\): each bracket becomes (−label)\(^2\), the penalty is 0: <div class="formula">\[d = 3^2 + 1^2 + 4^2 + (-1)^2 = 27\]</div>Done.` },
      ],
      compare: R`The official solution writes the same four brackets (move 1), argues "polynomial of degree 2" (move 2), and gets \(a_1 = 14 + \lambda\), \(d = 27\) (moves 3–4). Its \(d\) line prints \(1^1\) (twice) instead of \(1^2\) and \((-1)^2\) — a typo, 27 is right.`,
    },

    "2025A-q1.3": {
      point: R`<p>The squared part gives the usual \(2X^\top(X\theta - y)\); the penalty adds \(\lambda\theta_1^2 \to 2\lambda\theta_1\), and \(\theta_0\) isn't penalized, so its entry is 0. At \(\theta = 0\) everything except \(-2X^\top y\) is 0. (Same gradient as 2025-C Q1, plus the penalty.)</p>`,
      start: R`<p><b>(a)</b></p>\[\nabla J_\lambda(\theta) = \;\square\]<p><b>(b)</b></p>\[\nabla J_\lambda(0,0,0) = \;\square\]\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J_\lambda = \;\square\]`,
      moves: [
        { line: R`<b>The squared part</b> — each sample's \((\dots)^2\) by \(\theta_j\) gives \(2\cdot(\dots)\cdot x_j\) (\(x_j\) = the number in front of \(\theta_j\)). So row \(j\) = \(2\cdot(\text{column } j \text{ of } X)\cdot(X\theta - y)\); all rows: <div class="formula">\[\|X\theta - y\|^2 \;\to\; 2X^\top(X\theta - y)\]</div>(we saw this in 2025-C Q1.2)`,
          why: R`<p>Sample 1's bracket is \((\theta_0 + 1\theta_1 + 2\theta_2 - 3)^2\): by \(\theta_1\) it gives \(2\cdot(\dots)\cdot 1\), by \(\theta_2\) it gives \(2\cdot(\dots)\cdot 2\). For \(\theta_1\) the numbers in front are the \(x_1\)'s: 1, 2, 3, 0.</p>
\[\begin{aligned}\frac{dJ}{d\theta_1} = \;&2\cdot(\dots)\cdot 1 &&\leftarrow\text{sample 1}\\ +\;&2\cdot(\dots)\cdot 2 &&\leftarrow\text{sample 2}\\ +\;&2\cdot(\dots)\cdot 3 &&\leftarrow\text{sample 3}\\ +\;&2\cdot(\dots)\cdot 0 &&\leftarrow\text{sample 4}\end{aligned}\]
<p>That's 2 · column \((1, 2, 3, 0)\) of \(X\) dotted with the list of (…)'s \(= X\theta - y\). Same for \(\theta_0\) (column \((1,1,1,1)\)) and \(\theta_2\) (column \((2,0,1,-1)\)). The rows of \(X^\top\) are exactly these columns, so all three rows at once \(= 2X^\top(X\theta - y)\). You don't need to know this by heart: [sheet: Square error loss gradient].</p>` },
        { line: R`<b>The penalty, knob by knob</b> — \(\lambda(\theta_1^2 + \theta_2^2)\) by \(\theta_0\): 0, by \(\theta_1\): \(2\lambda\theta_1\), by \(\theta_2\): \(2\lambda\theta_2\). So (a): <div class="formula">\[\nabla J_\lambda(\theta) = 2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\]</div>`,
          why: R`<p>\(\theta_0\) isn't in the penalty, so its derivative is 0. \(\lambda\theta_1^2 \to 2\lambda\theta_1\), like \(x^2 \to 2x\).</p>` },
        { line: R`<b>(b) Plug in \(\theta = (0,0,0)\)</b> — \(X\theta - y = -y\) and the penalty part is 0: <div class="formula">\[\nabla J_\lambda = -2X^\top y = -2\cdot(7, 17, 11) = (-14, -34, -22)\]</div>`,
          why: R`<p>\(X^\top y\) = each column of \(X\) dotted with \(y = (3, 1, 4, -1)\):</p>
<div class="tw"><table><thead><tr><th>column of \(X\)</th><th>· (3, 1, 4, −1)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1)</td><td>3 + 1 + 4 − 1</td><td>7</td></tr>
<tr><td>(1, 2, 3, 0)</td><td>3 + 2 + 12 + 0</td><td>17</td></tr>
<tr><td>(2, 0, 1, −1)</td><td>6 + 0 + 4 + 1</td><td>11</td></tr></tbody></table></div>
<p>numpy: <code>-2 * X.T @ y</code>.</p>` },
        { line: R`<b>The step</b> — minus times minus is plus: <div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (0,0,0) - 0.1\cdot(-14, -34, -22)\\ &= (1.4,\ 3.4,\ 2.2)\end{aligned}\]</div>Done.` },
      ],
      compare: R`The official (a) writes one line per knob with \((X\theta - y)^\top X_t\) (= column \(t\) of \(X\) dotted with the errors), then move 2's answer. Its (b) is moves 3–4, same numbers.`,
    },

    "2025A-q1.4": {
      point: R`<p>Cross-validation = train on the other folds, score plain squared error on the held-out fold, average over the folds, keep the smallest. Each bug breaks one of these.</p>`,
      start: R`<p>One line per bug (write at least three):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      moves: [
        { line: R`<b>n counts samples = rows.</b> <b>Line 1:</b> <code>X.shape[1]</code> → <code>X.shape[0]</code>`,
          why: R`<p><code>shape[0]</code> = number of rows (samples), <code>shape[1]</code> = number of columns.</p>` },
        { line: R`<b>Score on the held-out fold, no penalty.</b> <b>Line 16:</b> <code>X_train @ w_star</code> → <code>X_val @ w_star</code>. <b>Line 17:</b> delete <code>+ lmd * np.sum(w_star[1:] ** 2)</code>`,
          why: R`<p>We predict the rows the model didn't train on, and we only care how good the predictions are: plain squared error.</p>` },
        { line: R`<b>Compare the average over the folds.</b> <b>Line 20:</b> <code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code>. Done (4 bugs; 3 are enough).`,
          why: R`<p><code>risk</code> is only the last fold's score. The \(\lambda\)'s score is the average over all folds — the same number line 21 stores.</p>` },
      ],
      compare: R`Same four bugs as the official list.`,
    },

    // ───────────────────────── 2025-B Q1 (ridge as least squares) ─────────────────────────
    "2025B-q1.1": {
      point: R`<p>\(X\) is the table with a column of 1s in front (the 1 is for \(\theta_0\)); \(y\) is the label column.</p>`,
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix} \qquad y = \begin{bmatrix}\square\\ \square\\ \square\\ \square\end{bmatrix}\]`,
      moves: [
        { line: R`<b>X</b> — one row per sample: a 1, then \(x_1\), then \(x_2\) (same \(X\) as 2025-A): <div class="formula">\[X = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\end{bmatrix}\]</div>` },
        { line: R`<b>y</b> — the labels, same order: \(\;y = (2, 0, 4, -1)\). Done.` },
      ],
      compare: R`Same \(X\) and \(y\) as the official answer.`,
    },

    "2025B-q1.2": {
      point: R`<p>The penalty \(\lambda\theta_1^2\) is also a square: \((\sqrt\lambda\,\theta_1 - 0)^2\). So it's just one more "sample" with row \((0, \sqrt\lambda, 0)\) and label 0. Same for \(\theta_2\).</p>`,
      start: R`\[\lambda\theta_1^2 + \lambda\theta_2^2 = (\;\square\;)^2 + (\;\square\;)^2\]\[X' = \begin{bmatrix}X\\ \square\\ \square\end{bmatrix} \qquad y' = \begin{bmatrix}y\\ \square\\ \square\end{bmatrix}\]`,
      moves: [
        { line: R`<b>The function</b> — one squared bracket per sample, plus the penalty (\(\theta_0\) is not in it): <div class="formula">\[J_\lambda = \sum_{i=1}^{4}\big(\theta^\top x^{(i)} - y^{(i)}\big)^2 + \lambda\theta_1^2 + \lambda\theta_2^2\]</div>`,
          why: R`<p>\(\|\theta\|^2 - \theta_0^2 = \theta_1^2 + \theta_2^2\). \(\theta^\top x^{(i)}\) is short for the prediction \(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2\).</p>` },
        { line: R`<b>Rewrite the penalty as brackets</b> — select the pieces, like a sample's (row · \(\theta\) − label)\(^2\): <div class="formula">\[\lambda\theta_1^2 = \big(\underbrace{\color{#e8912d}0\cdot\theta_0 + \sqrt\lambda\cdot\theta_1 + 0\cdot\theta_2}_{\textstyle\color{#e8912d}\text{row }(0,\,\sqrt\lambda,\,0)\cdot\theta} - \underbrace{\color{#4c8dff}0}_{\textstyle\color{#4c8dff}\text{label}}\big)^2\]</div>Same for \(\theta_2\): row \((0, 0, \sqrt\lambda)\), label 0.`,
          why: R`<p>\((\sqrt\lambda\,\theta_1)^2 = \lambda\theta_1^2\). It has to be \(\sqrt\lambda\), not \(\lambda\), because the bracket gets squared.</p>` },
        { line: R`<b>Put it together</b> — add the two new rows under \(X\), two 0s under \(y\): <div class="formula">\[X' = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\\0&\sqrt\lambda&0\\0&0&\sqrt\lambda\end{bmatrix} \qquad y' = \begin{bmatrix}2\\0\\4\\-1\\0\\0\end{bmatrix}\]</div>Done.`,
          why: R`<p>\(\|X'\theta - y'\|^2\) = one squared bracket per row of \(X'\): the 4 old brackets + \(\lambda\theta_1^2\) + \(\lambda\theta_2^2\) = \(J_\lambda\).</p>` },
      ],
      compare: R`Same \(X'\) and \(y'\) as the official answer; its derivation is moves 1–2.`,
    },

    "2025B-q1.3": {
      point: R`<p>Part 2 turned \(J_\lambda\) into plain least squares: \(J_\lambda = \|X'\theta - y'\|^2\). Plain least squares has a formula on the sheet. So yes.</p>`,
      moves: [
        { line: R`<b>\(J_\lambda\) is plain least squares</b> — the penalty \(\lambda\theta_1^2 + \lambda\theta_2^2\) is two extra squared brackets, rows \((0, \sqrt\lambda, 0)\), \((0, 0, \sqrt\lambda)\) with label 0. Add them under \(X\) and \(y\) (that's part 2's \(X'\), \(y'\)): \(J_\lambda(\theta) = \|X'\theta - y'\|^2\), the usual squared error.` },
        { line: R`<b>Plain least squares has a formula</b> — use it with \(X'\), \(y'\): <div class="formula">\[\theta^* = (X'^\top X')^{-1}X'^\top y'\]</div>So yes, it's possible. Done.`,
          why: R`<p>You don't need to know this by heart: [sheet: Least squares solution] \(w = (X^\top X)^{-1}X^\top y\). Where it comes from:</p>
<ul><li>The function: \(\|X'\theta - y'\|^2\).</li>
<li>Its gradient: each squared bracket by \(\theta_j\) gives 2 · (…) · (the number in front of \(\theta_j\)); stacked over the knobs that's \(2X'^\top(X'\theta - y')\) (as in 2025-C Q1, part 2, without the penalty).</li>
<li>Set it to 0 (the lowest point, like \(f'(x) = 0\)): \(X'^\top X'\theta = X'^\top y'\).</li>
<li>Solve: multiply both sides by \((X'^\top X')^{-1}\) — the matrix version of dividing.</li></ul>`,
          extra: [{ label: "the official formula drops two primes — it's a slip", html: R`<p>It prints \((X'^\top X)^{-1}X'^\top y\): the second \(X\) and the \(y\) are missing their primes. Correct: \((X'^\top X')^{-1}X'^\top y'\).</p>` }] },
      ],
      compare: R`Same argument as the official solution. Its formula \((X'^\top X)^{-1}X'^\top y\) is missing two primes; correct is \((X'^\top X')^{-1}X'^\top y'\).`,
    },

    "2025B-q1.4": {
      point: R`<p>It's plain least squares \(\|X'\theta - y'\|^2\) (part 2: \(X\) plus rows \((0, \sqrt\lambda, 0)\), \((0, 0, \sqrt\lambda)\); \(y\) plus two 0s), so \(\nabla J = 2X'^\top(X'\theta - y')\). At \(\theta = 0\) that's \(-2X'^\top y'\), and the two extra labels are 0, so \(\lambda\) drops out.</p>`,
      start: R`\[\nabla J_\lambda(\theta) = \;\square\]\[\nabla J_\lambda(0,0,0) = \;\square\]\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J_\lambda = \;\square\]`,
      moves: [
        { line: R`<b>The formula</b> — \(J_\lambda = \|X'\theta - y'\|^2\) (part 2). Each (…)² by \(\theta_j\) gives 2 · (…) · (the number in front of \(\theta_j\)); stacked over the knobs: <div class="formula">\[\nabla J_\lambda(\theta) = 2X'^\top(X'\theta - y')\]</div>(the plain squared-error gradient, as in 2025-C Q1.2)`,
          why: R`<p>Part 2's \(X'\) = \(X\) plus rows \((0, \sqrt\lambda, 0)\), \((0, 0, \sqrt\lambda)\); \(y' = (2, 0, 4, -1, 0, 0)\). Knob \(j\)'s row = 2 · (column \(j\) of \(X'\)) dotted with the list of (…)'s \(= X'\theta - y'\). The rows of \(X'^\top\) are those columns, so all rows at once \(= 2X'^\top(X'\theta - y')\). You don't need to know this by heart: [sheet: Square error loss gradient]. (2025-A Q1.3's formula \(2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\) gives the same numbers.)</p>` },
        { line: R`<b>Plug in \(\theta = 0\)</b> — \(X'\theta - y' = -y'\), so \(\nabla J_\lambda = -2X'^\top y'\). The two extra labels are 0, so the \(\sqrt\lambda\) entries multiply 0: <div class="formula">\[\nabla J_\lambda = -2\cdot(5, 14, 9) = (-10, -28, -18)\]</div>`,
          why: R`<p>\(X'^\top y'\) = each column of \(X'\) dotted with \(y' = (2, 0, 4, -1, 0, 0)\):</p>
<div class="tw"><table><thead><tr><th>column of \(X'\)</th><th>· (2, 0, 4, −1, 0, 0)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1, 0, 0)</td><td>2 + 0 + 4 − 1 + 0 + 0</td><td>5</td></tr>
<tr><td>(1, 2, 3, 0, √λ, 0)</td><td>2 + 0 + 12 + 0 + 0 + 0</td><td>14</td></tr>
<tr><td>(2, 0, 1, −1, 0, √λ)</td><td>4 + 0 + 4 + 1 + 0 + 0</td><td>9</td></tr></tbody></table></div>` },
        { line: R`<b>The step</b> — minus times minus is plus: <div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (0,0,0) - 0.1\cdot(-10, -28, -18)\\ &= (1,\ 2.8,\ 1.8)\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same steps and numbers as the official solution: gradient \((-10, -28, -18)\), new \(\theta = (1, 2.8, 1.8)\).`,
    },

    "2025B-q1.5": {
      point: R`<p>Each blank is the comment above it, in numpy: one 1 per row, prediction = \(X\theta\), step against the gradient, stop when the gradient is tiny, squared errors.</p>`,
      moves: [
        { line: R`<b>(1) one 1 per sample = per row:</b> <code>X.shape[0]</code>. <b>(2) prediction = X · θ:</b> <code>X_with_bias @ theta</code>`,
          why: R`<p><code>np.ones((n, 1))</code> is a column of \(n\) ones, and \(n\) = number of rows = <code>X.shape[0]</code>. The prediction uses the matrix with the ones column, like part 1's \(X\).</p>` },
        { line: R`<b>(3) step against the gradient:</b> <code>theta - eta * grad</code>. <b>(4) stop when the gradient is tiny:</b> <code>np.linalg.norm(grad) &lt; eps</code>`,
          why: R`<p><code>grad</code> is a list and <code>eps</code> a number, so compare the gradient's length: <code>np.linalg.norm(grad)</code>.</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>In 2026-B Q1.4 you wrote <code>grad &lt; epsilon</code> — a list compared with a number; it needs <code>np.linalg.norm(grad)</code>.</p>` }] },
        { line: R`<b>(5) the squared errors</b> (the <code>np.mean</code> is already around the blank): <code>(y_hat - y) ** 2</code>. Done.` },
      ],
      compare: R`Same five expressions as the official answer.`,
    },

    // ───────────────────────── 2026-A Q1 (weighted least squares) ─────────────────────────
    "2026A-q1.1": {
      point: R`<p>\(X\) and \(y\) as always. \(\Gamma\) = the weights on a diagonal: it multiplies each sample's (…)\(^2\) by its own \(\gamma_i\).</p>`,
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix} \quad y = \begin{bmatrix}\square\\ \square\\ \square\\ \square\end{bmatrix}\]\[\Gamma =\begin{bmatrix}\square&0&0&0\\0&\square&0&0\\0&0&\square&0\\0&0&0&\square\end{bmatrix}\]`,
      moves: [
        { line: R`<b>X and y</b> — a 1, then \(x_1\), \(x_2\) per row; the labels in the same order: <div class="formula">\[X = \begin{bmatrix}1&1&0\\1&0&1\\1&1&1\\1&2&1\end{bmatrix} \qquad y = \begin{bmatrix}1\\2\\4\\5\end{bmatrix}\]</div>` },
        { line: R`<b>\(\Gamma\)</b> — the weights \(\gamma\) on the diagonal, zeros elsewhere: <div class="formula">\[\Gamma = \begin{bmatrix}2&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&2\end{bmatrix} = \mathrm{diag}(2, 1, 1, 2)\]</div>Done.`,
          why: R`<p>\(Xw - y\) is the list of the four (…)'s. \(\Gamma\) times it multiplies each (…) by its own \(\gamma_i\) (zeros elsewhere, so nothing mixes). Then \((Xw - y)^\top\) dots that with the (…)'s again:</p>
\[\begin{aligned}(Xw - y)^\top\Gamma(Xw - y) = \;&2\cdot(\dots)^2 &&\leftarrow\text{sample 1}\\ +\;&1\cdot(\dots)^2 &&\leftarrow\text{sample 2}\\ +\;&1\cdot(\dots)^2 &&\leftarrow\text{sample 3}\\ +\;&2\cdot(\dots)^2 &&\leftarrow\text{sample 4}\end{aligned}\]
<p>That's \(J\).</p>` },
      ],
      compare: R`Same \(X\), \(y\), \(\Gamma\) as the official answer; its "explanation (not required)" is move 2's why.`,
    },

    "2026A-q1.2": {
      point: R`<p>The plain squared error's gradient is \(2X^\top(Xw - y)\). Here each sample's bracket has its \(\gamma_i\) in front, and a number in front just rides along. So \(2X^\top(Xw - y)\) becomes \(2X^\top\Gamma(Xw - y)\). (Plain gradient: 2025-C Q1, part 2.)</p>`,
      start: R`<p><b>The function:</b></p>\[J(w) = \;\square\]<p><b>Its derivative by one weight \(w_j\):</b></p>\[\frac{dJ}{dw_j} = \;\square\]<p><b>The gradient:</b></p>\[\nabla J(w) = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question: <div class="formula">\[J(w) = \sum_{i}\gamma_i\big(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\big)^2\]</div>`,
          why: R`<p>With the real table it literally is:</p>
\[\begin{aligned}J(w) = \;&2\,(w_0 + 1w_1 + 0w_2 - 1)^2 &&\leftarrow\text{sample 1}\\ +\;&1\,(w_0 + 0w_1 + 1w_2 - 2)^2 &&\leftarrow\text{sample 2}\\ +\;&1\,(w_0 + 1w_1 + 1w_2 - 4)^2 &&\leftarrow\text{sample 3}\\ +\;&2\,(w_0 + 2w_1 + 1w_2 - 5)^2 &&\leftarrow\text{sample 4}\end{aligned}\]` },
        { line: R`<b>Derivative by \(w_j\)</b> — 2 · (…) · (the number in front of \(w_j\)), with \(\gamma_i\) riding along: <div class="formula">\[\frac{dJ}{dw_j} = \sum_i \gamma_i\cdot 2\cdot(\dots)\cdot x^{(i)}_j\]</div>`,
          why: R`<p>\(\gamma_i\) is a plain number, like the 3 in \(3(x^2+1)^2 \to 3\cdot 2(x^2+1)\cdot 2x\). The rest is the usual chain rule: \((\dots)^2 \to 2\cdot(\dots)\), times what's in front of \(w_j\) inside the bracket. E.g. sample 4's \(2\,(w_0 + 2w_1 + 1w_2 - 5)^2\) by \(w_1\) is \(2\cdot 2\cdot(\dots)\cdot 2\). For \(w_0\) the number in front is 1. (Same step as 2025-C Q1, part 2, move 2.)</p>
<p>All three knobs as a list, that's already a full answer (the question allows a sum): \(\nabla J = 2\sum_i\gamma_i(\dots)\,x^{(i)}\), with \(x^{(i)} = (1, x^{(i)}_1, x^{(i)}_2)\).</p>` },
        { line: R`<b>Select the pieces</b> — in the row for knob \(j\): <div class="formula">\[\sum_i 2\cdot\underbrace{\color{#e8912d}\gamma_i(\dots)}_{\textstyle\color{#e8912d}\text{this part = }\Gamma(Xw - y)}\cdot\underbrace{\color{#4c8dff}x^{(i)}_j}_{\textstyle\color{#4c8dff}\text{column } j\text{ of }X}\]</div>So each row is \(2\cdot\)(column \(j\) of \(X\)) · \(\Gamma(Xw - y)\).`,
          why: R`<p><b>Orange:</b> every sample's (…) times its own \(\gamma_i\) — that's \(\Gamma\) times the list \(Xw - y\) (part 1). <b>Blue:</b> sample 1's \(x_j\), sample 2's \(x_j\), … = column \(j\) of \(X\). The sum multiplies them entry by entry and adds up: a dot product.</p>` },
        { line: R`<b>Put it together</b> — the rows of \(X^\top\) are the columns of \(X\), so "column \(j\) of \(X\) · a list, for every \(j\)" is \(X^\top\) · that list (2025-C Q1.2, move 4): <div class="formula">\[\nabla J(w) = 2X^\top\Gamma(Xw - y)\]</div>Done.`,
          why: R`<p>Size check: \(X^\top\) is \(3\times 4\), \(\Gamma\) is \(4\times 4\), \(Xw - y\) is \(4\times 1\) → \(3\times 1\), one entry per weight. \(\Gamma\) must sit between \(X^\top\) and \((Xw - y)\); the official solution deducted points when it was put anywhere else.</p>`,
          extra: [{ label: "check it with numbers (w = (1, 1, 1))", html: R`<p>\(Xw - y = (2, 2, 3, 4) - (1, 2, 4, 5) = (1, 0, -1, -1)\). Times the weights: \(\Gamma(Xw - y) = (2, 0, -1, -2)\).</p>
<div class="tw"><table><thead><tr><th>column of \(X\)</th><th>· (2, 0, −1, −2)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1)</td><td>2 + 0 − 1 − 2</td><td>−1</td></tr>
<tr><td>(1, 0, 1, 2)</td><td>2 + 0 − 1 − 4</td><td>−3</td></tr>
<tr><td>(0, 1, 1, 1)</td><td>0 + 0 − 1 − 2</td><td>−3</td></tr></tbody></table></div>
<p>×2: \(\nabla J = (-2, -6, -6)\) — the same as nudging each \(w_j\) in numpy and measuring the change in \(J\).</p>` }] },
      ],
      compare: R`The official answer is move 4 \(=\) move 2's sum (\(2\sum_i\gamma_i(\dots)x^{(i)}\)). Its optional expansion ends with \(+\,y^\top y\); it should be \(y^\top\Gamma y\) — no effect on the gradient.`,
    },

    "2026A-q1.3": {
      point: R`<p>The best \(w\) is where part 2's gradient \(2X^\top\Gamma(Xw - y)\) is 0 — like solving \(f'(x) = 0\). Solving gives \((X^\top\Gamma X)^{-1}X^\top\Gamma y\), and "only numerical matrices" just means: \(X\), \(\Gamma\), \(y\) are part 1's numbers.</p>`,
      start: R`<p><b>Set the gradient to 0:</b></p>\[\square = 0\]<p><b>Solve for \(w\):</b></p>\[w^* = \;\square\]<p><b>With the numbers:</b> \(\;X = \square,\ \Gamma = \square,\ y = \square\)</p>`,
      moves: [
        { line: R`<b>Set part 2's gradient to 0</b> and open the bracket (the 2 goes away): <div class="formula">\[\begin{aligned}2X^\top\Gamma(Xw - y) &= 0\\ X^\top\Gamma X\,w &= X^\top\Gamma y\end{aligned}\]</div>`,
          why: R`<p>\(w^*\) is the lowest point of \(J\). At the lowest point the slope by every weight is 0.</p>` },
        { line: R`<b>Solve for \(w\)</b> — multiply both sides by \((X^\top\Gamma X)^{-1}\) (the matrix version of dividing): <div class="formula">\[w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\]</div>`,
          why: R`<p>Like \(3w = 6 \to w = 6/3\). With every \(\gamma_i = 1\) (\(\Gamma\) = identity) it's exactly [sheet: Least squares solution]. It needs \(X^\top\Gamma X\) to be invertible — for this data it is.</p>` },
        { line: R`<b>Say which numbers go in</b> — part 1's matrices. That's the answer: <div class="formula">\[w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y, \quad\text{where}\]</div><div class="formula">\[X = \begin{bmatrix}1&1&0\\1&0&1\\1&1&1\\1&2&1\end{bmatrix} \quad \Gamma = \mathrm{diag}(2,1,1,2) \quad y = \begin{bmatrix}1\\2\\4\\5\end{bmatrix}\]</div>Done.`,
          extra: [{ label: "multiplied out (not required)", html: R`\[w^* = \begin{bmatrix}6&7&4\\7&11&5\\4&5&4\end{bmatrix}^{-1}\begin{bmatrix}18\\26\\16\end{bmatrix} = \tfrac{1}{11}(-5,\ 16,\ 29)\]
<p>numpy: <code>np.linalg.inv(X.T @ G @ X) @ X.T @ G @ y</code> with <code>G = np.diag([2, 1, 1, 2])</code>.</p>` },
                  { label: "the hint's way: duplicate samples", html: R`<p>A weight of 2 = the sample counted twice. So copy samples 1 and 4: a 6-row \(X'\), \(y'\) whose plain squared error equals \(J\). Then [sheet: Least squares solution] gives \(w^* = (X'^\top X')^{-1}X'^\top y'\) — the same numbers.</p>` }] },
      ],
      compare: R`The official main answer is moves 1–3: \(w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\) "where \(X, y, \Gamma\) are as specified in (1)". Its alternatives (\(A = \Gamma^{1/2}\), or duplicating samples 1 and 4) give the same \(w^*\).`,
    },

    "2026A-q1.4": {
      point: R`<p>The correct loop: run all <code>num_iters</code> times, error = prediction − label, gradient \(2X^\top\Gamma\)(error), step \(w - \eta\cdot\)grad, loss \(\sum\gamma\cdot\)error², stop when the gradient is small. Six lines break one of these each — those are the six bugs.</p>`,
      start: R`<p>One line per bug (write at least four):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      moves: [
        { line: R`<b>Run all the iterations.</b> <b>Line 4:</b> <code>range(1, num_iters)</code> → <code>range(num_iters)</code>`,
          why: R`<p><code>range(1, N)</code> runs only \(N - 1\) times.</p>` },
        { line: R`<b>Error = prediction − label; step downhill.</b> <b>Line 6:</b> → <code>error = y_pred - y</code>. <b>Line 8:</b> → <code>w = w - eta * grad</code>`,
          why: R`<p>Part 2's gradient uses \(Xw - y\), and the step subtracts the gradient. (The two flips cancel, but both are bugs.)</p>` },
        { line: R`<b>\(\gamma\) multiplies each error once.</b> <b>Line 7:</b> → <code>grad = 2*X.T @ (gamma * error)</code>. <b>Line 9:</b> → <code>np.sum(gamma * error**2)</code>`,
          why: R`<p>Part 2: \(2X^\top\Gamma(Xw - y)\), and \(\Gamma\) times a list = <code>gamma * error</code> (entry by entry). \(J = \sum\gamma_i(\dots)^2\): <code>(gamma * error) ** 2</code> would square \(\gamma\) too.</p>` },
        { line: R`<b>Stop when the gradient is small.</b> <b>Line 11:</b> <code>&gt; 1e-6</code> → <code>&lt; 1e-6</code>. Done: that's all six bugs (lines 4, 6, 7, 8, 9, 11); the question asks for four.` },
      ],
      compare: R`Same six bugs as the official list (lines 4, 6, 7, 8, 9, 11).`,
    },

    // ───────────────────────── 2026-B Q1 (your Moed B) ─────────────────────────
    "2026B-q1.1": {
      point: R`<p>Linear: plug the test \(x\)'s in. k-NN: copy (or average) the labels of the nearest <b>training</b> samples. Then MSE over the 2 test samples; smallest wins.</p>`,
      start: R`<p><b>(a)</b> \(\hat y^{(6)} = \square,\ \hat y^{(7)} = \square,\ \mathrm{MSE} = \tfrac12(\square + \square) = \square\)</p><p><b>(b)</b> nearest to 6: \(\square\), to 7: \(\square\) → \(\hat y = \square\), MSE \(= \square\)</p><p><b>(c)</b> two nearest … → \(\hat y = \square\), MSE \(= \square\)</p><p><b>Best:</b> \(\square\) (lowest MSE)</p>`,
      moves: [
        { line: R`<b>(a) Linear</b> — \(\hat y = 2 + 0.1x_1 + 1x_2\): <div class="formula">\[\begin{aligned}\hat y^{(6)} &= 2 + 3 + 1 = 6, \quad \hat y^{(7)} = 2 + 5 + 2 = 9\\ \mathrm{MSE} &= \tfrac12\big((6-7)^2 + (9-7)^2\big) = \tfrac12(1 + 4) = 2.5\end{aligned}\]</div>` },
        { line: R`<b>Distances</b> — squared, from each test sample to training samples 1–5: <div class="tw"><table><thead><tr><th>from</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>6 (30, 1)</td><td>101</td><td><b>1</b></td><td>101</td><td>101</td><td><b>100</b></td></tr><tr><td>7 (50, 2)</td><td>904</td><td>400</td><td><b>104</b></td><td>900</td><td><b>101</b></td></tr></tbody></table></div>`,
          why: R`<p>Squared distance = \((\Delta x_1)^2 + (\Delta x_2)^2\). 6 to 2: \((30-30)^2 + (1-2)^2 = 1\). Skipping the \(\sqrt{}\) keeps the same order. [sheet: Euclidean (L2 ) distance]</p>` },
        { line: R`<b>(b) 1-NN</b> — the nearest one's label: \(\hat y^{(6)} = y_2 = 6\), \(\hat y^{(7)} = y_5 = 9\). Same predictions as (a), so MSE = 2.5.` },
        { line: R`<b>(c) 2-NN</b> — average the two nearest labels: <div class="formula">\[\begin{aligned}\hat y^{(6)} &= \tfrac12(6 + 9) = 7.5, \quad \hat y^{(7)} = \tfrac12(9 + 7) = 8\\ \mathrm{MSE} &= \tfrac12(0.25 + 1) = 0.625\end{aligned}\]</div>Smallest MSE, so 2-NN is best. Done.` },
      ],
      compare: R`Same predictions and MSEs as the official answer (2.5, 2.5, 0.625 → 2-NN).`,
    },

    "2026B-q1.2": {
      point: R`<p>Dividing each feature by its norm makes \(x_2\) count as much as \(x_1\), so the nearest neighbours change. Then 1-NN: copy the label of the nearest training sample (as in part 1).</p>`,
      start: R`\[\|X_1\| = \square, \qquad \|X_2\| = \square\]<p>nearest to 6: \(\square\) → \(\hat y^{(6)} = \square\); nearest to 7: \(\square\) → \(\hat y^{(7)} = \square\)</p>\[\mathrm{MSE} = \tfrac12(\square + \square) = \square\]`,
      moves: [
        { line: R`<b>Norm of each feature, training rows 1–5 only</b> — \(\sqrt{\text{sum of squares}}\): <div class="formula">\[\begin{aligned}\|X_1\| &= \sqrt{20^2 + 30^2 + 40^2 + 20^2 + 40^2} = \sqrt{4900} = 70\\ \|X_2\| &= \sqrt{0 + 4 + 0 + 4 + 1} = 3\end{aligned}\]</div>`,
          why: R`<p>[sheet: L2 norm]</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You divided \(x_1\) by its <b>sum</b> (150), not its \(L_2\) norm (70), and didn't normalize \(x_2\) — 2/4.</p>` }] },
        { line: R`<b>Divide</b> — every \(x_1\) by 70, every \(x_2\) by 3, test samples too: <div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>\(x_1\)</td><td>\(\tfrac27\)</td><td>\(\tfrac37\)</td><td>\(\tfrac47\)</td><td>\(\tfrac27\)</td><td>\(\tfrac47\)</td><td>\(\tfrac37\)</td><td>\(\tfrac57\)</td></tr><tr><td>\(x_2\)</td><td>0</td><td>\(\tfrac23\)</td><td>0</td><td>\(\tfrac23\)</td><td>\(\tfrac13\)</td><td>\(\tfrac13\)</td><td>\(\tfrac23\)</td></tr></tbody></table></div>` },
        { line: R`<b>Nearest to 6</b> \((\tfrac37, \tfrac13)\) — sample 5: same \(x_2\), \(x_1\) off by only \(\tfrac17\). Every other sample is already off by \(\tfrac13\) in \(x_2\). So \(\hat y^{(6)} = y_5 = 9\).`,
          extra: [{ label: "check it with numbers (squared distances)", html: R`<div class="tw"><table><thead><tr><th>from</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>6</td><td>0.132</td><td>0.111</td><td>0.132</td><td>0.132</td><td><b>0.020</b></td></tr><tr><td>7</td><td>0.628</td><td><b>0.082</b></td><td>0.465</td><td>0.184</td><td>0.132</td></tr></tbody></table></div>` }] },
        { line: R`<b>Nearest to 7</b> \((\tfrac57, \tfrac23)\) — sample 2: same \(x_2\), \(x_1\) off by \(\tfrac27\). Sample 4 is off by \(\tfrac37\); the rest by \(\ge\tfrac13\) in \(x_2\). So \(\hat y^{(7)} = y_2 = 6\): <div class="formula">\[\mathrm{MSE} = \tfrac12\big((9-7)^2 + (6-7)^2\big) = \tfrac12(4 + 1) = 2.5\]</div>Done.` },
      ],
      compare: R`Same norms (70, 3), neighbours (5 at \(\tfrac17\), 2 at \(\tfrac27\)) and MSE 2.5 as the official answer — the same MSE as before, with different neighbours.`,
    },

    "2026B-q1.3": {
      point: R`<p>Same chain rule as always, one sample at a time: \(|(\dots)|^3 \to 3(\dots)^2\,\mathrm{sign}(\dots)\), times the number in front of \(w_j\). Everything in front of \(x^{(i)}\) is \(z_i\).</p>`,
      start: R`<p><b>The function:</b></p>\[J(w) = \;\square\]<p><b>Its derivative by one weight \(w_j\):</b></p>\[\frac{dJ}{dw_j} = \;\square\]<p><b>So:</b></p>\[z_i = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it; the official answer calls the bracket \(r_i\) (the code calls it <code>r</code>): <div class="formula">\[J(w) = \sum_i |r_i|^3, \qquad r_i = w^\top x^{(i)} - y_i\]</div>`,
          why: R`<p>\(w^\top x^{(i)}\) is short for the prediction \(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2\). Sample 1: \(r_1 = w_0 + 20w_1 + 0w_2 - 5\).</p>` },
        { line: R`<b>Derivative by \(w_j\)</b> — outer \((\cdot)^3 \to 3(\cdot)^2\), then \(|r| \to \mathrm{sign}(r)\), then the number in front of \(w_j\): <div class="formula">\[\begin{aligned}\frac{dJ}{dw_j} &= \sum_i 3|r_i|^2\cdot\mathrm{sign}(r_i)\cdot x^{(i)}_j\\ &= \sum_i 3r_i^2\,\mathrm{sign}(r_i)\,x^{(i)}_j\end{aligned}\]</div>`,
          why: R`<p>Like \((x^2+3)^3 \to 3(x^2+3)^2\cdot 2x\), with two inner layers: \(|\cdot|\) and then \(r_i\). \(|r|\) by \(r\) is \(\mathrm{sign}(r)\); \(r_i\) by \(w_j\) is \(x^{(i)}_j\): the number in front of \(w_j\) in \(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\) (for \(w_0\) it's 1; same as 2025-C Q1, part 2). \(|r|^2 = r^2\) because squaring removes the sign.</p>
<p>Numbers: at \(r = -2\), \(|r|^3 = -r^3\), slope \(-3r^2 = -12\); formula: \(3\cdot 4\cdot(-1) = -12\).</p>` },
        { line: R`<b>Select the pieces</b> — all knobs as a list: <div class="formula">\[\nabla J = \sum_i \underbrace{\color{#e8912d}3r_i^2\,\mathrm{sign}(r_i)}_{\textstyle\color{#e8912d}\text{this part = }z_i}\cdot\underbrace{\color{#4c8dff}x^{(i)}}_{\textstyle\color{#4c8dff}(1,\,x^{(i)}_1,\,x^{(i)}_2)}\]</div><div class="formula">\[z_i = 3\big(w^\top x^{(i)} - y_i\big)^2\,\mathrm{sign}\big(w^\top x^{(i)} - y_i\big)\]</div>Done.`,
          why: R`<p>The orange part is the same in every knob's row; only the blue \(x^{(i)}_j\) changes. Stacked over \(j\), the blue part is the whole \(x^{(i)}\).</p>` },
      ],
      compare: R`Same derivation as the official solution: it defines \(r_i\) (move 1), uses \(\partial r_i/\partial w_j = x^{(i)}_j\) (move 2), and gets the same \(z_i\) (move 3).`,
    },

    "2026B-q1.4": {
      point: R`<p>(1) is part 3's \(z_i = 3r_i^2\,\mathrm{sign}(r_i)\) in numpy, (2) is the question's own \(\sum_i z_i x^{(i)}\), written with <code>X.T</code>, (3) is the docstring's stopping rule.</p>`,
      moves: [
        { line: R`<b>(1) part 3's \(z_i = 3r_i^2\,\mathrm{sign}(r_i)\), for all samples at once:</b> <code>3 * r**2 * np.sign(r)</code>`,
          why: R`<p><code>r</code> is the list of all \(r_i = w^\top x^{(i)} - y_i\); numpy does the formula entry by entry. \(z_i\) is the derivative of \(|r_i|^3\): \(3|r_i|^2\cdot\mathrm{sign}(r_i)\), and \(|r|^2 = r^2\).</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You wrote <code>np.abs(r)**3</code> — that's the loss; \(z\) is its derivative.</p>` }] },
        { line: R`<b>(2) \(\sum_i z_i x^{(i)}\):</b> <code>X.T @ z</code>`,
          why: R`<p>Row \(j\) of \(\sum_i z_i x^{(i)}\) = column \(j\) of \(X\) dotted with \(z\). The rows of \(X^\top\) are the columns of \(X\), so all rows at once \(= X^\top z\) (as in 2025-C Q1, part 2, move 4). You get this one from the hint alone, even without part 3.</p>` },
        { line: R`<b>(3) the docstring's rule \(\|\nabla J\|_2 \le \varepsilon\):</b> <code>np.linalg.norm(grad) &lt;= epsilon</code>. Done.`,
          extra: [{ label: "Moed B trap", html: R`<p>You wrote <code>grad &lt; epsilon</code> — a list compared with a number; \(\|\cdot\|_2\) is <code>np.linalg.norm</code>.</p>` }] },
      ],
      compare: R`Same three expressions as the official answer (it also accepts <code>np.sum(grad ** 2) &lt;= epsilon**2</code>).`,
    },
  });
})();
