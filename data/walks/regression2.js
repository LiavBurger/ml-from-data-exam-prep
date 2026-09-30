// Walkthroughs for the other Regression questions (2025-A, 2025-B, 2026-A, 2026-B Q1) — CASUAL style (spec/WALKS.md).
// The gradient template is walked in full in data/walks/regression.js (2025-C Q1.2); each spot here restates the step it uses (WALKS.md §8), with a pointer after.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ───────────────────────── 2025-A Q1 (ridge) ─────────────────────────
    "2025A-q1.1": {
      point: R`<p>\(X\) is just the table with a column of 1s in front (the 1 is for \(\theta_0\)).</p>`,
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix}\]<p>(\(y = \square\) — not asked, but part 3 uses it)</p>`,
      answer: R`\[X = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\end{bmatrix}\]<p>(\(y = (3, 1, 4, -1)\) — not asked, but part 3 uses it)</p>`,
      moves: [
        { line: R`<b>X</b> — \(X\theta\) must give one prediction \(\theta_0 + \theta_1x_1 + \theta_2x_2\) per sample, so one row per sample: a 1, then \(x_1\), then \(x_2\): <div class="formula">\[X = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\end{bmatrix}\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} = \underbrace{X\theta}_{\textstyle 4\times 1}\]<p>4 samples × (1 + 2 features); inner 3 = 3 ✓ · result 4×1 = one prediction per sample ✓</p>`,
          why: R`<p>Row 1 times \(\theta\) is \(\theta_0\cdot 1 + \theta_1\cdot 1 + \theta_2\cdot 2\) — sample 1's prediction. The 1 is what \(\theta_0\) multiplies. (Same as 2025-C Q1, part 1.)</p>` },
        { line: R`<b>y</b> (not asked, but part 3 needs it) — the labels, same order: \(\;y = (3, 1, 4, -1)\). Done.` },
      ],
      compare: R`Same \(X\) (and \(y\)) as the official answer.`,
      slip: R`The stem's "Items 13- below" is a garbled "Items 1–3": this table is used in parts 1–3 (part 4 is the code).`,
    },

    "2025A-q1.2": {
      point: R`<p>\(J\) is squared brackets plus \(\theta^2\)'s, and squaring a bracket only makes \(\theta\cdot\theta\) terms, single \(\theta\)'s and numbers — that's the form. \(a_1\) = everything in front of \(\theta_1^2\); \(d\) = what's left when every \(\theta = 0\).</p>`,
      start: R`<p><b>The function, one bracket per sample:</b></p>\[J_\lambda(\theta) = (\;\square\;)^2 + (\;\square\;)^2 + \dots + \lambda(\;\square\;)\]<p><b>It has that form because</b> \(\square\)</p>\[a_1 = \;\square \qquad d = \;\square\]`,
      answer: R`<p><b>The function, one bracket per sample:</b></p>\[\begin{aligned}J_\lambda(\theta) = \;&(\theta_0 + \theta_1 + 2\theta_2 - 3)^2 + (\theta_0 + 2\theta_1 - 1)^2\\ &+ (\theta_0 + 3\theta_1 + \theta_2 - 4)^2 + (\theta_0 - \theta_2 + 1)^2\\ &+ \lambda(\theta_1^2 + \theta_2^2)\end{aligned}\]<p><b>It has that form because</b> squaring a bracket of plain \(\theta\)'s gives only \(\theta\cdot\theta\) terms, single \(\theta\) terms and numbers, and the penalty adds \(\theta_1^2, \theta_2^2\): \(J_\lambda\) is a polynomial of degree 2 in \((\theta_0, \theta_1, \theta_2)\) — exactly those ten kinds of terms.</p>\[\begin{aligned}a_1 &= 1^2 + 2^2 + 3^2 + 0^2 + \lambda = 14 + \lambda\\ d &= 3^2 + 1^2 + 4^2 + (-1)^2 = 27\end{aligned}\]`,
      moves: [
        { line: R`<b>The function</b> — one squared bracket per row of \(X\) (row · \(\theta\) − label), plus the penalty: <div class="formula">\[\begin{aligned}J_\lambda = \;&(\theta_0 + 1\theta_1 + 2\theta_2 - 3)^2\\ +\;&(\theta_0 + 2\theta_1 + 0\theta_2 - 1)^2\\ +\;&(\theta_0 + 3\theta_1 + 1\theta_2 - 4)^2\\ +\;&(\theta_0 + 0\theta_1 - 1\theta_2 + 1)^2\\ +\;&\lambda(\theta_1^2 + \theta_2^2)\end{aligned}\]</div>Penalty: \(\|\theta\|^2\) = all weights squared, so \(\theta_0^2\) cancels: <div class="formula">\[\begin{aligned}\|\theta\|^2 - \theta_0^2 &= \color{#e8912d}\theta_0^2 + \theta_1^2 + \theta_2^2 \color{#e8912d}- \theta_0^2\\ &= \theta_1^2 + \theta_2^2\end{aligned}\]</div>(bias not penalized)`,
          size: R`\[\underbrace{\text{row } i\text{ of }X}_{\textstyle 1\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} = \text{one number}\]<p>One bracket per row: 4 rows → 4 brackets = the 4×1 list \(X\theta - y\) ✓ · penalty \(\underbrace{\theta^\top}_{\textstyle 1\times 3}\underbrace{\theta}_{\textstyle 3\times 1}\) = one number ✓</p>`,
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
      slip: R`Typo in the \(d\) line: it should read \(3^2 + 1^2 + 4^2 + (-1)^2\). The value \(d = 27\) is right.`,
    },

    "2025A-q1.3": {
      point: R`<p>Derivative by one weight \(\theta_j\) → write it with matrix pieces: \(2X_j^\top(X\theta - y) + 2\lambda\theta_j\) (\(X_j\) = column \(j\) of \(X\); \(\theta_0\) isn't penalized, so no \(2\lambda\theta_0\)) → stack it for every weight: the \(X_j^\top\)'s are \(X^\top\), the penalty rows are \(2\lambda(0, \theta_1, \theta_2)\). At \(\theta = 0\) everything except \(-2X^\top y\) is 0.</p>`,
      start: R`<p><b>(a) The function:</b></p>\[J_\lambda(\theta) = \;\square\]<p><b>Derivative by one weight \(\theta_j\):</b></p>\[\frac{dJ_\lambda}{d\theta_j} = \;\square\; = \;\square\]<p><b>All weights (the gradient):</b></p>\[\nabla J_\lambda(\theta) = \;\square\]<p><b>(b)</b></p>\[\nabla J_\lambda(0,0,0) = \;\square\]\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J_\lambda = \;\square\]`,
      answer: R`<p><b>(a) The function:</b></p>\[\begin{aligned}J_\lambda(\theta) = \;&\sum_i\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)^2\\ &+ \lambda(\theta_1^2 + \theta_2^2)\end{aligned}\]<p><b>Derivative by one weight \(\theta_j\):</b></p>\[\begin{aligned}\frac{dJ_\lambda}{d\theta_j} &= \sum_i 2\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)\,x^{(i)}_j\\ &\quad+ 2\lambda\theta_j\\ &= 2\,X_j^\top(X\theta - y) + 2\lambda\theta_j\end{aligned}\]<p>(\(X_j\) = column \(j\) of \(X\); for \(\theta_0\) there is no \(2\lambda\theta_0\) — the bias isn't penalized.)</p><p><b>All weights (the gradient):</b></p>\[\nabla J_\lambda(\theta) = 2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\]<p><b>(b)</b></p>\[\begin{aligned}\nabla J_\lambda(0,0,0) &= -2X^\top y = -2\cdot(7, 17, 11)\\ &= (-14, -34, -22)\end{aligned}\]\[\begin{aligned}\theta_{\text{new}} &= \theta - 0.1\cdot\nabla J_\lambda = (0,0,0) - 0.1\cdot(-14, -34, -22)\\ &= (1.4,\ 3.4,\ 2.2)\end{aligned}\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question; \(\|X\theta - y\|^2\) = one squared bracket per sample, and \(\theta_0^2\) cancels in the penalty: <div class="formula">\[\begin{aligned}J_\lambda(\theta) &= \|X\theta - y\|^2 + \lambda(\|\theta\|^2 - \theta_0^2)\\ &= \sum_i\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)^2\\ &\quad+ \lambda(\theta_1^2 + \theta_2^2)\end{aligned}\]</div>`,
          size: R`\[\underbrace{\text{row } i\text{ of }X}_{\textstyle 1\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} - y^{(i)} = \text{one bracket}\]<p>4 rows → 4 brackets = the 4×1 list \(X\theta - y\) ✓ · \(\|X\theta - y\|^2\) = those 4 brackets squared and added = one number ✓</p>`,
          why: R`<p>With the real table it literally is:</p>
\[\begin{aligned}J_\lambda = \;&(\theta_0 + 1\theta_1 + 2\theta_2 - 3)^2 &&\leftarrow\text{sample 1}\\ +\;&(\theta_0 + 2\theta_1 + 0\theta_2 - 1)^2 &&\leftarrow\text{sample 2}\\ +\;&(\theta_0 + 3\theta_1 + 1\theta_2 - 4)^2 &&\leftarrow\text{sample 3}\\ +\;&(\theta_0 + 0\theta_1 - 1\theta_2 + 1)^2 &&\leftarrow\text{sample 4}\\ +\;&\lambda(\theta_1^2 + \theta_2^2)\end{aligned}\]
<p>Penalty: \(\|\theta\|^2 - \theta_0^2 = \theta_0^2 + \theta_1^2 + \theta_2^2 - \theta_0^2 = \theta_1^2 + \theta_2^2\) (the bias is not penalized).</p>` },
        { line: R`<b>Derivative by one weight \(\theta_j\)</b> — each \((\dots)^2\) gives 2 · (…) · (the number in front of \(\theta_j\)); the penalty \(\lambda\theta_j^2 \to 2\lambda\theta_j\): <div class="formula">\[\begin{aligned}\frac{dJ_\lambda}{d\theta_j} = \;&\sum_i 2\cdot(\dots)\cdot x^{(i)}_j\\ &+ 2\lambda\theta_j \qquad(\text{for }\theta_0\text{: no penalty term})\end{aligned}\]</div>`,
          why: R`<p>Sample 1's bracket is \((\theta_0 + 1\theta_1 + 2\theta_2 - 3)^2\): by \(\theta_1\) it gives \(2\cdot(\dots)\cdot 1\), by \(\theta_2\) it gives \(2\cdot(\dots)\cdot 2\) — like \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\). For \(\theta_1\) the numbers in front are the \(x_1\)'s: 1, 2, 3, 0.</p>
\[\begin{aligned}\frac{dJ}{d\theta_1} = \;&2\cdot(\dots)\cdot 1 &&\leftarrow\text{sample 1}\\ +\;&2\cdot(\dots)\cdot 2 &&\leftarrow\text{sample 2}\\ +\;&2\cdot(\dots)\cdot 3 &&\leftarrow\text{sample 3}\\ +\;&2\cdot(\dots)\cdot 0 &&\leftarrow\text{sample 4}\\ +\;&2\lambda\theta_1\end{aligned}\]
<p>Penalty: \(\lambda\theta_1^2 \to 2\lambda\theta_1\), like \(x^2 \to 2x\). \(\theta_0\) isn't in the penalty, so its derivative there is 0. For \(\theta_0\) the number in front is 1.</p>`,
          extra: [{ label: "the same answer (a) in sum format", html: R`<p>One line per knob — each squared bracket gives 2 · (bracket) · (the number in front of that knob), summed over the samples, plus the penalty's derivative:</p>
\[\begin{aligned}\frac{dJ}{d\theta_0} &= 2\sum_i \big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)\cdot 1\\[4pt] \frac{dJ}{d\theta_1} &= 2\sum_i \big(\dots\big)\cdot x^{(i)}_1 + 2\lambda\theta_1\\[4pt] \frac{dJ}{d\theta_2} &= 2\sum_i \big(\dots\big)\cdot x^{(i)}_2 + 2\lambda\theta_2\end{aligned}\]
<p>(…) = the same bracket as in the first line. That's a complete answer to (a) — it's the official solution's first version too (it writes the sum as \(2(X\theta - y)^\top X_j\), i.e. column \(j\) of \(X\) dotted with the list of brackets — move 3). Move 4's matrix line is the same three rows stacked.</p>` }] },
        { line: R`<b>Write it with matrices</b> — the 2 is a constant: out of the sum. The rest (entry × entry, added up) is a dot product: <div class="formula">\[\begin{aligned}\frac{dJ_\lambda}{d\theta_j} &= \underbrace{\color{#e8912d}2}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\cdot(\dots) + 2\lambda\theta_j\\ &= 2\,X_j^\top(X\theta - y) + 2\lambda\theta_j\end{aligned}\]</div>\(X_j\) = column \(j\) of \(X\) (the official calls it \(X_t\)).`,
          size: R`\[\underbrace{X_j^\top}_{\textstyle 1\times 4}\,\underbrace{(X\theta - y)}_{\textstyle 4\times 1} = \text{one number}\]<p>inner 4 = 4 ✓ · one number, like \(\frac{dJ_\lambda}{d\theta_j}\) ✓ · without the \(^\top\): (4×1)(4×1) — inner 1 ≠ 4 ✗</p><p>The official row \((X\theta - y)^\top X_j\) is (1×4)(4×1) = one number, same as \(X_j^\top(X\theta - y)\) — a dot product doesn't care about order.</p>`,
          why: R`<p>\(X_1\) = (sample 1's \(x_1\), sample 2's, …) = \((1, 2, 3, 0)\) — column 1 of \(X\). The (…)'s = (sample 1's prediction − label, …) = \(X\theta - y\). The sum multiplies them entry by entry and adds up: that's exactly a dot product, \(X_1^\top(X\theta - y)\). Same for \(\theta_0\) (column \((1,1,1,1)\)) and \(\theta_2\) (column \((2,0,1,-1)\)).</p>
<p><b>Why only the 2 comes out:</b> only things without an \(i\) (the same for every sample) can go in front of \(\sum_i\). \(x^{(i)}_j\) and the (…)'s change from sample to sample, so they can't; they get packed into lists instead (\(X_j\) and \(X\theta - y\)), and the sum becomes the dot product of the two lists. \(2\lambda\theta_j\) isn't inside the sum at all.</p>` },
        { line: R`<b>From one weight to \(\nabla J_\lambda\)</b> — stack move 3 for \(\theta_0, \theta_1, \theta_2\) (\(\theta_0\)'s row has no penalty); only \(X_j\) and \(\theta_j\) change, the rest is constant → out. So (a): <div class="formula">\[\begin{aligned}\nabla J_\lambda &= \begin{bmatrix}2X_0^\top(X\theta - y) + 0\\ 2X_1^\top(X\theta - y) + 2\lambda\theta_1\\ 2X_2^\top(X\theta - y) + 2\lambda\theta_2\end{bmatrix}\\ &= \underbrace{\color{#e8912d}2}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}X_0^\top\\ X_1^\top\\ X_2^\top\end{bmatrix}}_{\textstyle X^\top}\;\underbrace{\color{#e8912d}(X\theta - y)}_{\textstyle\color{#e8912d}\text{constant}}\\ &\quad+ \underbrace{\color{#e8912d}2\lambda}_{\textstyle\color{#e8912d}\text{constant}}\begin{bmatrix}0\\ \theta_1\\ \theta_2\end{bmatrix}\\ &= 2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\end{aligned}\]</div>`,
          remember: R`\[\nabla\,\|Xw - y\|^2 = 2X^\top(Xw - y)\]<p>Not on the sheet in this form: [sheet: Square error loss gradient] only has <b>one sample with a ½</b>, \((w^\top x - y)\,x\). Here \(w\) is \(\theta\).</p>`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 4}\,\underbrace{(X\theta - y)}_{\textstyle 4\times 1} + \underbrace{2\lambda(0, \theta_1, \theta_2)}_{\textstyle 3\times 1} = \underbrace{\nabla J_\lambda}_{\textstyle 3\times 1}\]<p>The three \(X_j^\top\) (each 1×4) stacked = 3×4 = \(X^\top\) ✓ · inner 4 = 4 ✓ · both parts 3×1 (one entry per knob), so they add entry by entry ✓</p><p>Wrong order: \(X(X\theta - y)\) = (4×3)(4×1) — inner 3 ≠ 4 ✗</p>`,
          why: R`<p>The rows of \(X^\top\) are the columns of \(X\): row 0 = \(X_0^\top\), row 1 = \(X_1^\top\), row 2 = \(X_2^\top\). The penalty column is \((0, 2\lambda\theta_1, 2\lambda\theta_2)\): the 0 because \(\theta_0\) isn't penalized; \(2\lambda\) is in every row, so it comes out.</p>` },
        { line: R`<b>(b) Plug in \(\theta = (0,0,0)\)</b> — \(X\theta - y = -y\) and the penalty part is 0: <div class="formula">\[\nabla J_\lambda = -2X^\top y = -2\cdot(7, 17, 11) = (-14, -34, -22)\]</div>`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 4}\,\underbrace{y}_{\textstyle 4\times 1} = \underbrace{(7, 17, 11)}_{\textstyle 3\times 1}\]<p>inner 4 = 4 ✓ · 3 numbers, one per knob ✓ · numpy: <code>X.T @ y</code> = (3, 4) @ (4,) → (3,)</p>`,
          why: R`<p>\(X^\top y\) = each column of \(X\) dotted with \(y = (3, 1, 4, -1)\):</p>
<div class="tw"><table><thead><tr><th>column of \(X\)</th><th>· (3, 1, 4, −1)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1)</td><td>3 + 1 + 4 − 1</td><td>7</td></tr>
<tr><td>(1, 2, 3, 0)</td><td>3 + 2 + 12 + 0</td><td>17</td></tr>
<tr><td>(2, 0, 1, −1)</td><td>6 + 0 + 4 + 1</td><td>11</td></tr></tbody></table></div>
<p>numpy: <code>-2 * X.T @ y</code>.</p>` },
        { line: R`<b>The step</b> — minus times minus is plus: <div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (0,0,0) - 0.1\cdot(-14, -34, -22)\\ &= (1.4,\ 3.4,\ 2.2)\end{aligned}\]</div>Done.`,
          remember: R`\[w \leftarrow w - \eta\,\nabla J(w)\]<p>One gradient-descent step. Not on the sheet. Here \(w\) is \(\theta\), \(\eta = 0.1\).</p>`,
          size: R`\[\underbrace{\theta}_{\textstyle 3\times 1} - 0.1\cdot\underbrace{\nabla J_\lambda}_{\textstyle 3\times 1} = \underbrace{\theta_{\text{new}}}_{\textstyle 3\times 1}\]<p>The gradient has one entry per knob, like \(\theta\), so the step subtracts entry by entry ✓</p>` },
      ],
      compare: R`The official (a) writes one line per knob with \((X\theta - y)^\top X_t\) (= move 3, column \(t\) of \(X\) dotted with the errors), then move 4's answer. Its (b) is moves 5–6, same numbers.`,
    },

    "2025A-q1.4": {
      point: R`<p>Cross-validation = train on the other folds, score plain squared error on the held-out fold, average over the folds, keep the smallest. Each bug breaks one of these.</p>`,
      start: R`<p>One line per bug (write at least three):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      answer: R`<p><b>Line 1:</b> <code>n = X.shape[1]</code> → should be <code>n = X.shape[0]</code>, because n = number of samples = rows.</p>
<p><b>Line 16:</b> <code>y_pred = X_train @ w_star</code> → should be <code>y_pred = X_val @ w_star</code>, because we score the held-out fold, so we predict its rows.</p>
<p><b>Line 17:</b> <code>risk = np.sum((y_val - y_pred) ** 2) + lmd * np.sum(w_star[1:] ** 2)</code> → should be <code>risk = np.sum((y_val - y_pred) ** 2)</code>, because validation scores the plain squared error; the penalty belongs to training only.</p>
<p><b>Line 20:</b> <code>if risk &lt; min_cv_risk</code> → should be <code>if np.mean(lo_risk) &lt; min_cv_risk</code>, because the CV risk is the average over all folds; <code>risk</code> is only the last fold.</p>`,
      moves: [
        { line: R`<b>n counts samples = rows.</b> <b>Line 1:</b> <code>X.shape[1]</code> → <code>X.shape[0]</code>`,
          remember: R`<p><code>X.shape</code> = (rows, columns) = (samples, features) → <code>X.shape[0]</code> = number of samples.</p><p>numpy — not on the sheet.</p>`,
          size: R`<p><code>X.shape</code> = (n, 3) = (rows, columns) = (samples, 1 + 2 features). So <code>shape[0]</code> = n ✓, <code>shape[1]</code> = 3 ✗.</p>`,
          why: R`<p><code>shape[0]</code> = number of rows (samples), <code>shape[1]</code> = number of columns.</p>` },
        { line: R`<b>Score on the held-out fold, no penalty.</b> <b>Line 16:</b> <code>X_train @ w_star</code> → <code>X_val @ w_star</code>. <b>Line 17:</b> delete <code>+ lmd * np.sum(w_star[1:] ** 2)</code>`,
          remember: R`<p>k-fold cross-validation, for each \(\lambda\): train on the other folds (with the penalty), score the held-out fold with <b>plain</b> squared error (no penalty), <b>average</b> over the folds; keep the \(\lambda\) with the <b>smallest</b> average.</p><p>Not on the sheet.</p>`,
          size: R`<p><code>X_val @ w_star</code>: (validation rows, 3) @ (3,) → one prediction per validation row ✓ — same length as <code>y_val</code>.</p><p><code>X_train @ w_star</code>: one per <b>training</b> row — a different length from <code>y_val</code> ✗</p>`,
          why: R`<p>Two functions, two jobs: <b>inside <code>solve_ridge_regression</code></b> the penalty is used — it finds \(w^*\) by minimizing squared error + \(\lambda\cdot\)(weights²) on the training folds. <b>This function only chooses \(\lambda\)</b>: it takes that \(w^*\), predicts the held-out fold, and scores it with plain squared error. The penalty already did its job inside the solver. (Keeping it here would also give a bigger \(\lambda\) an extra cost just for being bigger, not for predicting worse.)</p>` },
        { line: R`<b>Compare the average over the folds.</b> <b>Line 20:</b> <code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code>. Done (4 bugs; 3 are enough).`,
          why: R`<p><code>risk</code> is only the last fold's score. The \(\lambda\)'s score is the average over all folds — the same number line 21 stores.</p>` },
      ],
      compare: R`Same four bugs as the official list.`,
    },

    // ───────────────────────── 2025-B Q1 (ridge as least squares) ─────────────────────────
    "2025B-q1.1": {
      point: R`<p>\(X\) is the table with a column of 1s in front (the 1 is for \(\theta_0\)); \(y\) is the label column.</p>`,
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix} \qquad y = \begin{bmatrix}\square\\ \square\\ \square\\ \square\end{bmatrix}\]`,
      answer: R`\[X = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\end{bmatrix} \qquad y = \begin{bmatrix}2\\ 0\\ 4\\ -1\end{bmatrix}\]`,
      moves: [
        { line: R`<b>X</b> — \(\|X\theta - y\|^2\) needs row · \(\theta\) = sample's prediction \(\theta_0 + \theta_1x_1 + \theta_2x_2\), so one row per sample: a 1, then \(x_1\), then \(x_2\): <div class="formula">\[X = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\end{bmatrix}\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} = \underbrace{X\theta}_{\textstyle 4\times 1}\]<p>4 samples × (1 + 2 features); inner 3 = 3 ✓ · result 4×1 = one prediction per sample ✓</p>` },
        { line: R`<b>y</b> — the labels, same order: \(\;y = (2, 0, 4, -1)\). Done.` },
      ],
      compare: R`Same \(X\) and \(y\) as the official answer.`,
    },

    "2025B-q1.2": {
      point: R`<p>\(\|X'\theta - y'\|^2\) is one squared bracket per row: (row · \(\theta\) − label)². So write \(J_\lambda\) out and make <b>every</b> term look like that. The 4 samples already do; each penalty term becomes one extra row with label 0.</p>`,
      start: R`<p><b>What I have</b> — \(J_\lambda\) written out:</p>\[J_\lambda = \;\square\]<p><b>What every term must look like:</b></p>\[(\theta_0\cdot\square + \theta_1\cdot\square + \theta_2\cdot\square - \square)^2\]<p><b>Answer:</b> \(X' = \square \quad y' = \square\)</p>`,
      answer: R`<p><b>What I have</b> — \(J_\lambda\) written out:</p>\[\begin{aligned}J_\lambda = \;&(\theta_0 + \theta_1 + 2\theta_2 - 2)^2 + (\theta_0 + 2\theta_1 - 0)^2\\ &+ (\theta_0 + 3\theta_1 + \theta_2 - 4)^2 + (\theta_0 - \theta_2 + 1)^2\\ &+ \lambda\theta_1^2 + \lambda\theta_2^2\end{aligned}\]<p><b>What every term must look like:</b> one bracket per row of \(X'\):</p>\[(\text{row of }X'\cdot\theta - \text{its label in }y')^2\]<p>The 4 sample brackets already are (rows of \(X\), labels \(y\)). The penalty terms become:</p>\[\begin{aligned}\lambda\theta_1^2 &= (\theta_0\cdot 0 + \theta_1\cdot\sqrt\lambda + \theta_2\cdot 0 - 0)^2\\ \lambda\theta_2^2 &= (\theta_0\cdot 0 + \theta_1\cdot 0 + \theta_2\cdot\sqrt\lambda - 0)^2\end{aligned}\]<p><b>Answer:</b></p>\[X' = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\\0&\sqrt\lambda&0\\0&0&\sqrt\lambda\end{bmatrix} \qquad y' = \begin{bmatrix}2\\0\\4\\-1\\0\\0\end{bmatrix}\]`,
      moves: [
        { line: R`<b>Write it out</b> — one bracket per sample (numbers from the table), then the penalty (\(\theta_0\) is not in it): <div class="formula">\[\begin{aligned}J_\lambda = \;&(\theta_0 + 1\theta_1 + 2\theta_2 - 2)^2 &&\leftarrow\text{sample 1}\\ +\;&(\theta_0 + 2\theta_1 + 0\theta_2 - 0)^2 &&\leftarrow\text{sample 2}\\ +\;&(\theta_0 + 3\theta_1 + 1\theta_2 - 4)^2 &&\leftarrow\text{sample 3}\\ +\;&(\theta_0 + 0\theta_1 - 1\theta_2 + 1)^2 &&\leftarrow\text{sample 4}\\ +\;&\lambda\theta_1^2 + \lambda\theta_2^2\end{aligned}\]</div>`,
          why: R`<p>Sample 1: \(x_1 = 1\), \(x_2 = 2\), label 2 → \((\theta_0 + 1\theta_1 + 2\theta_2 - 2)^2\). The penalty \(\lambda(\|\theta\|^2 - \theta_0^2) = \lambda(\theta_1^2 + \theta_2^2)\): \(\theta_0^2\) cancels.</p>` },
        { line: R`<b>What the target looks like</b> — \(\|X'\theta - y'\|^2\) = one bracket per row of \(X'\), each of this shape: <div class="formula">\[(\theta_0\cdot\square + \theta_1\cdot\square + \theta_2\cdot\square - \square)^2\]</div>The three blanks = that row of \(X'\); the last blank = its label in \(y'\).`,
          size: R`\[\underbrace{X'}_{\textstyle ?\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} - \underbrace{y'}_{\textstyle ?\times 1}\]<p>\(\theta\) has 3 knobs → every row of \(X'\) has 3 numbers ✓ · one row per squared bracket — we'll count them ✓</p>`,
          why: R`<p>Row · \(\theta\) = \(\theta_0\cdot(\text{1st number}) + \theta_1\cdot(\text{2nd}) + \theta_2\cdot(\text{3rd})\); minus the label; squared. \(\|\cdot\|^2\) adds these up over all rows.</p>` },
        { line: R`<b>Match term by term</b> — the 4 sample brackets already have the shape: rows \((1, 1, 2)\), \((1, 2, 0)\), \((1, 3, 1)\), \((1, 0, -1)\), labels \(2, 0, 4, -1\) (= \(X\), \(y\)). Left over: \(\lambda\theta_1^2\) and \(\lambda\theta_2^2\) — not brackets yet.` },
        { line: R`<b>Make \(\lambda\theta_1^2\) a bracket</b> — fill the blanks so the square gives \(\lambda\theta_1^2\): only \(\theta_1\) appears, and \((\sqrt\lambda\,\theta_1)^2 = \lambda\theta_1^2\): <div class="formula">\[\lambda\theta_1^2 = \big(\underbrace{\color{#e8912d}\theta_0\cdot 0 + \theta_1\cdot\sqrt\lambda + \theta_2\cdot 0}_{\textstyle\color{#e8912d}\text{row }(0,\,\sqrt\lambda,\,0)} - \underbrace{\color{#4c8dff}0}_{\textstyle\color{#4c8dff}\text{label}}\big)^2\]</div>Same for \(\lambda\theta_2^2\): row \((0, 0, \sqrt\lambda)\), label 0.`,
          size: R`\[\underbrace{(0, \sqrt\lambda, 0)}_{\textstyle 1\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} = \sqrt\lambda\,\theta_1\]<p>3 numbers, like every row of \(X\) ✓</p>`,
          why: R`<p>\(\theta_0\) and \(\theta_2\) aren't in \(\lambda\theta_1^2\) → their blanks are 0. The bracket gets squared, so \(\theta_1\)'s blank is \(\sqrt\lambda\), not \(\lambda\). Nothing else is added → label 0.</p>` },
        { line: R`<b>Put it together</b> — 6 brackets = 6 rows: \(X\)'s rows, then the two new ones; \(y\), then two 0s: <div class="formula">\[X' = \begin{bmatrix}1&1&2\\1&2&0\\1&3&1\\1&0&-1\\0&\sqrt\lambda&0\\0&0&\sqrt\lambda\end{bmatrix} \qquad y' = \begin{bmatrix}2\\0\\4\\-1\\0\\0\end{bmatrix}\]</div>Done.`,
          size: R`\[\underbrace{X'}_{\textstyle 6\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} - \underbrace{y'}_{\textstyle 6\times 1} = 6\times 1\]<p>4 samples + 2 penalty rows = 6 rows · inner 3 = 3 ✓ · \(y'\) needs 6 entries too ✓</p>` },
      ],
      compare: R`Same \(X'\) and \(y'\) as the official answer; its derivation is moves 1 and 4.`,
      slip: R`"The solution to (1)" means part 1's answer (its \(X\), 4×3, and \(y\)), not an equation numbered (1). \(X'\) and \(y'\) are just those plus two extra rows, one per \(\sqrt\lambda\) penalty term.`,
    },

    "2025B-q1.3": {
      point: R`<p>Part 2 turned \(J_\lambda\) into plain least squares: \(J_\lambda = \|X'\theta - y'\|^2\). Plain least squares has a formula on the sheet. So yes.</p>`,
      start: R`<p><b>Answer:</b> □</p>
<p><b>Because:</b> \(J_\lambda(\theta) = \;\square\)</p>
<p><b>So:</b> □</p>
\[\theta^* = \;\square\]`,
      answer: R`<p><b>Answer:</b> Yes.</p>
<p><b>Because:</b> \(J_\lambda(\theta) = \|X'\theta - y'\|^2\) with part 2's \(X'\), \(y'\) — that is the plain least-squares loss of standard linear regression, on the data \(X'\), \(y'\).</p>
<p><b>So:</b> the least-squares (pseudo-inverse) formula on \(X'\), \(y'\) gives the minimizer:</p>
\[\theta^* = (X'^\top X')^{-1}X'^\top y'\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Analytically" = a formula for \(\theta^*\), no gradient descent. The formula I have is for <b>plain</b> least squares \(\|X\theta - y\|^2\). So: can \(J_\lambda\) be written as plain least squares?`,
          why: R`<p>[sheet: Least squares solution] \(w = (X^\top X)^{-1}X^\top y\) minimizes \(\|Xw - y\|^2\) — and only that loss. With the penalty in it, \(J_\lambda\) doesn't look like it yet.</p>` },
        { line: R`<b>Yes — part 2 did it</b>: the penalty \(\lambda\theta_1^2 + \lambda\theta_2^2\) is two extra squared brackets, rows \((0, \sqrt\lambda, 0)\), \((0, 0, \sqrt\lambda)\), label 0. So \(J_\lambda(\theta) = \|X'\theta - y'\|^2\).`,
          size: R`\[\|\underbrace{X'}_{\textstyle 6\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} - \underbrace{y'}_{\textstyle 6\times 1}\|^2 = \text{one number}\]<p>inner 3 = 3 ✓ · 6 brackets (4 samples + 2 penalty rows), squared and added ✓</p>` },
        { line: R`<b>So use the least-squares formula</b> with \(X'\), \(y'\): <div class="formula">\[\theta^* = (X'^\top X')^{-1}X'^\top y'\]</div>Answer: yes, it's possible. Done.`,
          size: R`\[\underbrace{(X'^\top X')^{-1}}_{\textstyle 3\times 3}\,\underbrace{X'^\top}_{\textstyle 3\times 6}\,\underbrace{y'}_{\textstyle 6\times 1} = \underbrace{\theta^*}_{\textstyle 3\times 1}\]<p>\(X'^\top X'\) = (3×6)(6×3) = 3×3 · then (3×3)(3×6)(6×1) = 3×1, one weight per knob ✓</p><p>The official slip \(X'^\top X\) = (3×6)(4×3): inner 6 ≠ 4 ✗ — the sizes catch it.</p>`,
          why: R`<p>You don't need to know this by heart: [sheet: Least squares solution] \(w = (X^\top X)^{-1}X^\top y\). Where it comes from:</p>
<ul><li>The function: \(\|X'\theta - y'\|^2\).</li>
<li>Its gradient: each squared bracket by \(\theta_j\) gives 2 · (…) · (the number in front of \(\theta_j\)); stacked over the knobs that's \(2X'^\top(X'\theta - y')\) (as in 2025-C Q1, part 2, without the penalty).</li>
<li>Set it to 0 (the lowest point, like \(f'(x) = 0\)): \(X'^\top X'\theta = X'^\top y'\).</li>
<li>Solve: multiply both sides by \((X'^\top X')^{-1}\) — the matrix version of dividing.</li></ul>`,
          extra: [{ label: "the official formula drops two primes — it's a slip", html: R`<p>It prints \((X'^\top X)^{-1}X'^\top y\): the second \(X\) and the \(y\) are missing their primes. Correct: \((X'^\top X')^{-1}X'^\top y'\).</p>` }] },
      ],
      compare: R`Same argument as the official solution (moves 2–3). Its formula \((X'^\top X)^{-1}X'^\top y\) is missing two primes; correct is \((X'^\top X')^{-1}X'^\top y'\).`,
      slip: R`The formula is missing two primes: it should be \(\theta^* = (X'^\top X')^{-1}X'^\top y'\). As printed, \(X'^\top X\) doesn't even multiply (\(X'^\top\) is 3×6, \(X\) is 4×3: 6 ≠ 4).`,
    },

    "2025B-q1.4": {
      point: R`<p>It's plain least squares \(\|X'\theta - y'\|^2\) (part 2: \(X\) plus rows \((0, \sqrt\lambda, 0)\), \((0, 0, \sqrt\lambda)\); \(y\) plus two 0s), so \(\nabla J = 2X'^\top(X'\theta - y')\). At \(\theta = 0\) that's \(-2X'^\top y'\), and the two extra labels are 0, so \(\lambda\) drops out.</p>`,
      start: R`\[\nabla J_\lambda(\theta) = \;\square\]<p>(because \(J_\lambda = \square\))</p>\[\nabla J_\lambda(0,0,0) = \;\square\]\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J_\lambda = \;\square\]`,
      answer: R`\[\nabla J_\lambda(\theta) = 2X'^\top(X'\theta - y')\]<p>(because \(J_\lambda = \|X'\theta - y'\|^2\), part 2 — a standard squared error)</p>\[\begin{aligned}\nabla J_\lambda(0,0,0) &= -2X'^\top y' = -2\cdot(5, 14, 9)\\ &= (-10, -28, -18)\end{aligned}\]\[\begin{aligned}\theta_{\text{new}} &= \theta - 0.1\cdot\nabla J_\lambda = (0,0,0) - 0.1\cdot(-10, -28, -18)\\ &= (1,\ 2.8,\ 1.8)\end{aligned}\]`,
      moves: [
        { line: R`<b>The formula</b> — \(J_\lambda = \|X'\theta - y'\|^2\) (part 2). Each (…)² by \(\theta_j\) gives 2 · (…) · (the number in front of \(\theta_j\)); stacked over the knobs: <div class="formula">\[\nabla J_\lambda(\theta) = 2X'^\top(X'\theta - y')\]</div>(the plain squared-error gradient, as in 2025-C Q1.2)`,
          remember: R`\[\nabla\,\|Xw - y\|^2 = 2X^\top(Xw - y)\]<p>Not on the sheet in this form: [sheet: Square error loss gradient] only has <b>one sample with a ½</b>, \((w^\top x - y)\,x\). Here \(X\) is \(X'\), \(y\) is \(y'\).</p>`,
          size: R`\[\underbrace{X'^\top}_{\textstyle 3\times 6}\,\underbrace{(X'\theta - y')}_{\textstyle 6\times 1} = \underbrace{\nabla J_\lambda}_{\textstyle 3\times 1}\]<p>inner 6 = 6 ✓ · result 3×1 = one entry per knob ✓</p><p>Wrong order: \(X'(X'\theta - y')\) = (6×3)(6×1) — inner 3 ≠ 6 ✗</p>`,
          why: R`<p>Part 2's \(X'\) = \(X\) plus rows \((0, \sqrt\lambda, 0)\), \((0, 0, \sqrt\lambda)\); \(y' = (2, 0, 4, -1, 0, 0)\). Knob \(j\)'s row = 2 · (column \(j\) of \(X'\)) dotted with the list of (…)'s \(= X'\theta - y'\). The rows of \(X'^\top\) are those columns, so all rows at once \(= 2X'^\top(X'\theta - y')\). (2025-A Q1.3's formula \(2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\) gives the same numbers.)</p>` },
        { line: R`<b>Plug in \(\theta = 0\)</b> — \(X'\theta - y' = -y'\), so \(\nabla J_\lambda = -2X'^\top y'\). The two extra labels are 0, so the \(\sqrt\lambda\) entries multiply 0: <div class="formula">\[\nabla J_\lambda = -2\cdot(5, 14, 9) = (-10, -28, -18)\]</div>`,
          size: R`\[\underbrace{X'^\top}_{\textstyle 3\times 6}\,\underbrace{y'}_{\textstyle 6\times 1} = \underbrace{(5, 14, 9)}_{\textstyle 3\times 1}\]<p>inner 6 = 6 ✓ · 3 numbers, one per knob ✓</p>`,
          why: R`<p>\(X'^\top y'\) = each column of \(X'\) dotted with \(y' = (2, 0, 4, -1, 0, 0)\):</p>
<div class="tw"><table><thead><tr><th>column of \(X'\)</th><th>· (2, 0, 4, −1, 0, 0)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1, 0, 0)</td><td>2 + 0 + 4 − 1 + 0 + 0</td><td>5</td></tr>
<tr><td>(1, 2, 3, 0, √λ, 0)</td><td>2 + 0 + 12 + 0 + 0 + 0</td><td>14</td></tr>
<tr><td>(2, 0, 1, −1, 0, √λ)</td><td>4 + 0 + 4 + 1 + 0 + 0</td><td>9</td></tr></tbody></table></div>` },
        { line: R`<b>The step</b> — minus times minus is plus: <div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (0,0,0) - 0.1\cdot(-10, -28, -18)\\ &= (1,\ 2.8,\ 1.8)\end{aligned}\]</div>Done.`,
          remember: R`\[w \leftarrow w - \eta\,\nabla J(w)\]<p>One gradient-descent step. Not on the sheet. Here \(w\) is \(\theta\), \(\eta = 0.1\).</p>`,
          size: R`\[\underbrace{\theta}_{\textstyle 3\times 1} - 0.1\cdot\underbrace{\nabla J_\lambda}_{\textstyle 3\times 1} = \underbrace{\theta_{\text{new}}}_{\textstyle 3\times 1}\]<p>The gradient has one entry per knob, like \(\theta\), so the step subtracts entry by entry ✓</p>` },
      ],
      compare: R`Same steps and numbers as the official solution: gradient \((-10, -28, -18)\), new \(\theta = (1, 2.8, 1.8)\).`,
    },

    "2025B-q1.5": {
      point: R`<p>Each blank is the comment above it, in numpy: one 1 per row, prediction = \(X\theta\), step against the gradient, stop when the gradient is tiny, squared errors.</p>`,
      start: R`<p><b>(1)</b> □</p><p><b>(2)</b> □</p><p><b>(3)</b> □</p><p><b>(4)</b> □</p><p><b>(5)</b> □</p>`,
      answer: R`<p><b>(1)</b> <code>X.shape[0]</code></p><p><b>(2)</b> <code>X_with_bias @ theta</code></p><p><b>(3)</b> <code>theta - eta * grad</code></p><p><b>(4)</b> <code>np.linalg.norm(grad) &lt; eps</code></p><p><b>(5)</b> <code>(y_hat - y) ** 2</code></p>`,
      moves: [
        { line: R`<b>(1) one 1 per sample = per row:</b> <code>X.shape[0]</code>. <b>(2) prediction = X · θ:</b> <code>X_with_bias @ theta</code>`,
          remember: R`<p><code>X.shape</code> = (rows, columns) = (samples, features) → <code>X.shape[0]</code> = number of samples.</p><p>numpy — not on the sheet.</p>`,
          size: R`<p><code>X</code>: (n, 2) and <code>np.ones((n, 1))</code>: (n, 1) — same n rows, so they glue side by side (<code>axis=1</code>) → <code>X_with_bias</code>: (n, 3) ✓</p><p><code>X_with_bias @ theta</code>: (n, 3) @ (3,) → (n,) = one prediction per sample ✓ · <code>theta @ X_with_bias</code>: (3,) @ (n, 3) — inner 3 ≠ n ✗</p>`,
          why: R`<p><code>np.ones((n, 1))</code> is a column of \(n\) ones, and \(n\) = number of rows = <code>X.shape[0]</code>. The prediction uses the matrix with the ones column, like part 1's \(X\).</p>` },
        { line: R`<b>(3) step against the gradient:</b> <code>theta - eta * grad</code>. <b>(4) stop when the gradient is tiny:</b> <code>np.linalg.norm(grad) &lt; eps</code>`,
          remember: R`\[w \leftarrow w - \eta\,\nabla J(w)\]<p>One gradient-descent step; stop when \(\|\nabla J\|\) is tiny (the bottom is flat). <code>np.linalg.norm(v)</code> = \(\|v\|_2\), one number. Not on the sheet. Here \(w\) is <code>theta</code>, \(\eta\) is <code>eta</code>.</p>`,
          size: R`<p><code>theta - eta * grad</code>: (3,) − (3,) → (3,), one entry per knob ✓</p><p><code>np.linalg.norm(grad)</code>: (3,) → one number, so it can be compared with <code>eps</code> ✓</p>`,
          why: R`<p><code>grad</code> is a list and <code>eps</code> a number, so compare the gradient's length: <code>np.linalg.norm(grad)</code>.</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>In 2026-B Q1.4 you wrote <code>grad &lt; epsilon</code> — a list compared with a number; it needs <code>np.linalg.norm(grad)</code>.</p>` }] },
        { line: R`<b>(5) the squared errors</b> — the "sum" is already there: <code>np.mean</code> = add them all up ÷ how many. So the blank is just the list of squared errors: <code>(y_hat - y) ** 2</code>. Done.`,
          size: R`<p><code>y_hat - y</code>: (n,) − (n,) → (n,); <code>** 2</code> is entry by entry → (n,); <code>np.mean</code> → one number ✓</p>`,
          why: R`<p>Select the pieces of <code>np.mean((y_hat - y) ** 2)</code>:</p>
<ul><li><code>y_hat - y</code> = the list of errors, one per sample (numpy subtracts entry by entry).</li>
<li><code>** 2</code> = each error squared — still a list.</li>
<li><code>np.mean(…)</code> = <b>adds the list up</b> and divides by how many → one number.</li></ul>
<p>With part 4's \(\theta = (1, 2.8, 1.8)\) and this question's 4 samples:</p>
<div class="tw"><table><thead><tr><th>sample</th><th><code>y_hat</code></th><th><code>y</code></th><th><code>y_hat - y</code></th><th><code>** 2</code></th></tr></thead><tbody>
<tr><td>1</td><td>1 + 2.8 + 3.6 = 7.4</td><td>2</td><td>5.4</td><td>29.16</td></tr>
<tr><td>2</td><td>1 + 5.6 + 0 = 6.6</td><td>0</td><td>6.6</td><td>43.56</td></tr>
<tr><td>3</td><td>1 + 8.4 + 1.8 = 11.2</td><td>4</td><td>7.2</td><td>51.84</td></tr>
<tr><td>4</td><td>1 + 0 − 1.8 = −0.8</td><td>−1</td><td>0.2</td><td>0.04</td></tr>
<tr><td colspan="4"><code>np.mean</code> = (29.16 + 43.56 + 51.84 + 0.04) ÷ 4</td><td><b>31.15</b></td></tr></tbody></table></div>
<p>Strictly that's the <i>average</i> of the squared errors, not the sum — the comment is a bit loose. ÷ 4 doesn't change which \(\theta\) is best.</p>` },
      ],
      compare: R`Same five expressions as the official answer.`,
      slip: R`Two quirks in the exam's code, not blanks: line 17 passes <code>X</code> instead of <code>X_with_bias</code> (θ has 3 entries), and line 24's comment says "sum" while line 25 takes <code>np.mean</code>. Ignore them; blank (5) is still <code>(y_hat - y) ** 2</code>.`,
    },

    // ───────────────────────── 2026-A Q1 (weighted least squares) ─────────────────────────
    "2026A-q1.1": {
      point: R`<p>They give you \(J\) as a sum and want it as a matrix product. Work backwards: write the sum out, fill in the pieces you already know (\(X\), \(y\)). What's left is \(\Gamma\): it must turn each bracket into (its \(\gamma\) × the bracket).</p>`,
      start: R`<p><b>What I have</b> — the sum, written out for the 4 samples:</p>\[J = \;\square\]<p><b>What it must equal:</b></p>\[(Xw - y)^\top\,\Gamma\,(Xw - y)\]<p><b>Known pieces:</b> \(X = \square \quad y = \square\)</p><p><b>Unknown:</b> \(\Gamma = \square\) (size □ × □)</p>`,
      answer: R`<p><b>What I have</b> — the sum, written out for the 4 samples:</p>\[\begin{aligned}J = \;&2(w_0 + w_1 - 1)^2 + 1(w_0 + w_2 - 2)^2\\ &+ 1(w_0 + w_1 + w_2 - 4)^2 + 2(w_0 + 2w_1 + w_2 - 5)^2\end{aligned}\]<p><b>What it must equal:</b></p>\[(Xw - y)^\top\,\Gamma\,(Xw - y)\]<p><b>Known pieces:</b></p>\[X = \begin{bmatrix}1&1&0\\1&0&1\\1&1&1\\1&2&1\end{bmatrix} \qquad y = \begin{bmatrix}1\\2\\4\\5\end{bmatrix}\]<p><b>Unknown:</b> \(\Gamma\) (size 4 × 4) — row \(i\) turns the brackets into (\(\gamma_i\) × bracket \(i\)):</p>\[\Gamma = \begin{bmatrix}2&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&2\end{bmatrix} = \mathrm{diag}(2, 1, 1, 2)\]`,
      moves: [
        { line: R`<b>Write the sum out</b> — one term per sample: its \(\gamma\) · (prediction − label)², numbers from the table: <div class="formula">\[\begin{aligned}J = \;&2\cdot(w_0 + w_1 - 1)^2 &&\leftarrow\text{sample 1}\\ +\;&1\cdot(w_0 + w_2 - 2)^2 &&\leftarrow\text{sample 2}\\ +\;&1\cdot(w_0 + w_1 + w_2 - 4)^2 &&\leftarrow\text{sample 3}\\ +\;&2\cdot(w_0 + 2w_1 + w_2 - 5)^2 &&\leftarrow\text{sample 4}\end{aligned}\]</div>`,
          why: R`<p>Sample 1: \(x_1 = 1\), \(x_2 = 0\), so the prediction is \(w_0 + w_1\cdot 1 + w_2\cdot 0 = w_0 + w_1\); label \(y = 1\); weight \(\gamma = 2\). Same for the other rows.</p>` },
        { line: R`<b>Fill in what you know</b> — the four brackets, stacked as a list, are always \(Xw - y\). So \(X\) and \(y\) are the usual ones: <div class="formula">\[X = \begin{bmatrix}1&1&0\\1&0&1\\1&1&1\\1&2&1\end{bmatrix} \qquad y = \begin{bmatrix}1\\2\\4\\5\end{bmatrix}\]\[Xw - y = \begin{bmatrix}w_0 + w_1 - 1\\ w_0 + w_2 - 2\\ w_0 + w_1 + w_2 - 4\\ w_0 + 2w_1 + w_2 - 5\end{bmatrix}\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{w}_{\textstyle 3\times 1} - \underbrace{y}_{\textstyle 4\times 1} = 4\times 1\]<p>4 samples × (1 + 2 features); inner 3 = 3 ✓ · a list of 4 brackets, one per sample ✓</p>`,
          why: R`<p>Row 1 of \(X\) is \((1, 1, 0)\): a 1 for \(w_0\), then sample 1's \(x_1\), \(x_2\). Row · \(w\) = \(w_0 + w_1\) = sample 1's prediction; minus \(y\)'s first entry (1) = bracket 1.</p>` },
        { line: R`<b>What's left: \(\Gamma\).</b> Look at one term of \(J\): \(2\cdot(\dots)_1^2 = (\dots)_1 \cdot 2(\dots)_1\) — a bracket times (its \(\gamma\) × the same bracket). So \(J\) is two lists dotted: <div class="formula">\[J = \begin{bmatrix}(\dots)_1\\ (\dots)_2\\ (\dots)_3\\ (\dots)_4\end{bmatrix}\cdot\begin{bmatrix}2\,(\dots)_1\\ 1\,(\dots)_2\\ 1\,(\dots)_3\\ 2\,(\dots)_4\end{bmatrix}\]</div>`,
          why: R`<p>\((\dots)_1\) = sample 1's bracket from move 1, \(w_0 + w_1 - 1\); \((\dots)_2\) = sample 2's, and so on. Dotting two lists = multiply entry by entry, then add: \((\dots)_1\cdot 2(\dots)_1 + (\dots)_2\cdot 1(\dots)_2 + \dots\) = exactly move 1's \(J\).</p>` },
        { line: R`<b>Select the pieces</b> of the matrix form — the same kind of dot product: <div class="formula">\[\underbrace{\color{#e8912d}(Xw - y)^\top}_{\textstyle\color{#e8912d}\text{the brackets}}\quad\underbrace{\color{#4c8dff}\Gamma\,(Xw - y)}_{\textstyle\color{#4c8dff}\gamma\,\times\,\text{each bracket}}\]</div>Orange = the first list already. So blue must be the second list.`,
          size: R`\[\underbrace{\Gamma}_{\textstyle ?\times ?}\,\underbrace{(Xw - y)}_{\textstyle 4\times 1} = \underbrace{\text{list of 4}}_{\textstyle 4\times 1}\]<p>Inner: \(\Gamma\) needs 4 columns · result has 4 rows, so \(\Gamma\) has 4 rows → 4×4 ✓</p>` },
        { line: R`<b>Find \(\Gamma\) row by row</b> — each row · the brackets = one entry of the blue list:
<div class="tw"><table><thead><tr><th>entry</th><th>row</th></tr></thead><tbody>
<tr><td>\(2\,(\dots)_1\)</td><td>\((2, 0, 0, 0)\)</td></tr>
<tr><td>\(1\,(\dots)_2\)</td><td>\((0, 1, 0, 0)\)</td></tr>
<tr><td>\(1\,(\dots)_3\)</td><td>\((0, 0, 1, 0)\)</td></tr>
<tr><td>\(2\,(\dots)_4\)</td><td>\((0, 0, 0, 2)\)</td></tr></tbody></table></div>
<div class="formula">\[\Gamma = \begin{bmatrix}2&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&2\end{bmatrix} = \mathrm{diag}(2, 1, 1, 2)\]</div>Done.`,
          why: R`<p>Row 1: \((2, 0, 0, 0)\cdot\big((\dots)_1, (\dots)_2, (\dots)_3, (\dots)_4\big) = 2(\dots)_1 + 0 + 0 + 0\) ✓. Any other number in row 1 would drag another sample's bracket into entry 1 — so zeros. That's why the \(\gamma\)'s end up on the diagonal.</p>` },
      ],
      compare: R`Same \(X\), \(y\), \(\Gamma\) as the official answer; its "explanation (not required)" is moves 3–5 read backwards.`,
    },

    "2026A-q1.2": {
      point: R`<p>Derivative by one weight \(w_j\) → write it with matrix pieces: \(2X_j^\top\Gamma(Xw - y)\) (\(X_j\) = column \(j\) of \(X\)) → stack it for every weight: the \(X_j^\top\)'s stacked are \(X^\top\). So \(\nabla J = 2X^\top\Gamma(Xw - y)\).</p>`,
      start: R`<p><b>The function:</b></p>\[J(w) = \;\square\]<p><b>Derivative by one weight \(w_j\):</b></p>\[\frac{dJ}{dw_j} = \;\square\; = \;\square\]<p><b>All weights (the gradient):</b></p>\[\nabla J(w) = \;\square\]`,
      answer: R`<p><b>The function:</b></p>\[J(w) = \sum_{i}\gamma_i\big(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\big)^2\]<p><b>Derivative by one weight \(w_j\):</b></p>\[\begin{aligned}\frac{dJ}{dw_j} &= \sum_i \gamma_i\cdot 2\big(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\big)\,x^{(i)}_j\\ &= 2\,X_j^\top\,\Gamma(Xw - y)\end{aligned}\]<p>(\(X_j\) = column \(j\) of \(X\).)</p><p><b>All weights (the gradient):</b></p>\[\begin{aligned}\nabla J(w) &= 2X^\top\Gamma(Xw - y)\\ &= 2\sum_i\gamma_i\big(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\big)\,x^{(i)}\end{aligned}\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question: <div class="formula">\[J(w) = \sum_{i}\gamma_i\big(w_0 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\big)^2\]</div>`,
          why: R`<p>With the real table it literally is:</p>
\[\begin{aligned}J(w) = \;&2\,(w_0 + 1w_1 + 0w_2 - 1)^2 &&\leftarrow\text{sample 1}\\ +\;&1\,(w_0 + 0w_1 + 1w_2 - 2)^2 &&\leftarrow\text{sample 2}\\ +\;&1\,(w_0 + 1w_1 + 1w_2 - 4)^2 &&\leftarrow\text{sample 3}\\ +\;&2\,(w_0 + 2w_1 + 1w_2 - 5)^2 &&\leftarrow\text{sample 4}\end{aligned}\]` },
        { line: R`<b>Derivative by \(w_j\)</b> — 2 · (…) · (the number in front of \(w_j\)), with \(\gamma_i\) riding along: <div class="formula">\[\frac{dJ}{dw_j} = \sum_i \gamma_i\cdot 2\cdot(\dots)\cdot x^{(i)}_j\]</div>`,
          why: R`<p>\(\gamma_i\) is a plain number, like the 3 in \(3(x^2+1)^2 \to 3\cdot 2(x^2+1)\cdot 2x\). The rest is the usual chain rule: \((\dots)^2 \to 2\cdot(\dots)\), times what's in front of \(w_j\) inside the bracket. E.g. sample 4's \(2\,(w_0 + 2w_1 + 1w_2 - 5)^2\) by \(w_1\) is \(2\cdot 2\cdot(\dots)\cdot 2\). For \(w_0\) the number in front is 1. (Same step as 2025-C Q1, part 2, move 2.)</p>
<p>All three knobs as a list, that's already a full answer (the question allows a sum): \(\nabla J = 2\sum_i\gamma_i(\dots)\,x^{(i)}\), with \(x^{(i)} = (1, x^{(i)}_1, x^{(i)}_2)\).</p>` },
        { line: R`<b>Write it with matrices</b> — the 2 is a constant: out of the sum. The rest (entry × entry, added up) is a dot product: <div class="formula">\[\begin{aligned}\frac{dJ}{dw_j} &= \underbrace{\color{#e8912d}2}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\cdot\gamma_i(\dots)\\ &= 2\,X_j^\top\,\Gamma(Xw - y)\end{aligned}\]</div>\(X_j\) = column \(j\) of \(X\).`,
          size: R`\[\underbrace{X_j^\top}_{\textstyle 1\times 4}\,\underbrace{\Gamma(Xw - y)}_{\textstyle 4\times 1} = \text{one number}\]<p>inner 4 = 4 ✓ · one number, like \(\frac{dJ}{dw_j}\) ✓ · without the \(^\top\): (4×1)(4×1) — inner 1 ≠ 4 ✗</p>`,
          why: R`<p>\(X_j\) = (sample 1's \(x_j\), sample 2's \(x_j\), …). \(\Gamma(Xw - y)\) = (\(\gamma_1(\dots)\), \(\gamma_2(\dots)\), …). \(\Gamma(Xw - y)\) is that list (part 1). The sum multiplies them entry by entry and adds up: that's exactly a dot product, \(X_j^\top\cdot\) the list. For \(w_0\), \(X_0\) is the column of 1s.</p>
<p><b>Why don't \(\gamma_i\) and \(x^{(i)}_j\) come out too?</b> Only things without an \(i\) (the same for every sample) come out — like the 2. \(\gamma_i\) is 2, 1, 1, 2 and \(x^{(i)}_j\) changes per sample too, so there's no single number to pull out. Instead they get packed into lists (\(X_j\), \(\Gamma(Xw - y)\)), and the sum becomes the dot product of those lists.</p>` },
        { line: R`<b>From one weight to \(\nabla J\)</b> — \(\nabla J\) is the list of all the partials. Stack move 3 for \(w_0, w_1, w_2\); only \(X_j\) changes, the rest is constant → out: <div class="formula">\[\begin{aligned}\nabla J &= \begin{bmatrix}2X_0^\top\Gamma(Xw - y)\\ 2X_1^\top\Gamma(Xw - y)\\ 2X_2^\top\Gamma(Xw - y)\end{bmatrix}\\ &= \underbrace{\color{#e8912d}2}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}X_0^\top\\ X_1^\top\\ X_2^\top\end{bmatrix}}_{\textstyle X^\top}\;\underbrace{\color{#e8912d}\Gamma(Xw - y)}_{\textstyle\color{#e8912d}\text{constant}}\\ &= 2X^\top\Gamma(Xw - y)\end{aligned}\]</div>Done.`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 4}\;\;\underbrace{\Gamma}_{\textstyle 4\times 4}\;\;\underbrace{(Xw - y)}_{\textstyle 4\times 1} = \underbrace{\nabla J}_{\textstyle 3\times 1}\]<p>The three \(X_j^\top\) (each 1×4) stacked = 3×4 = \(X^\top\) ✓ · inner 4 = 4, 4 = 4 ✓ · result 3×1 = one entry per weight ✓</p><p>\(\Gamma X^\top(\dots)\) = (4×4)(3×4): inner 4 ≠ 3 ✗</p>`,
          why: R`<p>The rows of \(X^\top\) are the columns of \(X\): row 0 = \(X_0^\top\), row 1 = \(X_1^\top\), row 2 = \(X_2^\top\). \(\Gamma\) must sit between \(X^\top\) and \((Xw - y)\); the official solution deducted points when it was put anywhere else.</p>`,
          extra: [{ label: "check it with numbers (w = (1, 1, 1))", html: R`<p>\(Xw - y = (2, 2, 3, 4) - (1, 2, 4, 5) = (1, 0, -1, -1)\). Times the weights: \(\Gamma(Xw - y) = (2, 0, -1, -2)\).</p>
<div class="tw"><table><thead><tr><th>column of \(X\)</th><th>· (2, 0, −1, −2)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1)</td><td>2 + 0 − 1 − 2</td><td>−1</td></tr>
<tr><td>(1, 0, 1, 2)</td><td>2 + 0 − 1 − 4</td><td>−3</td></tr>
<tr><td>(0, 1, 1, 1)</td><td>0 + 0 − 1 − 2</td><td>−3</td></tr></tbody></table></div>
<p>×2: \(\nabla J = (-2, -6, -6)\) — the same as nudging each \(w_j\) in numpy and measuring the change in \(J\).</p>` }] },
      ],
      compare: R`The official answer is move 4 \(=\) move 2's sum (\(2\sum_i\gamma_i(\dots)x^{(i)}\)). Its optional expansion ends with \(+\,y^\top y\); it should be \(y^\top\Gamma y\) — no effect on the gradient.`,
      slip: R`<ul><li>The optional expansion ends with \(+\,y^\top y\) (twice); it should be \(y^\top\Gamma y\). It's a constant, so the gradient \(2X^\top\Gamma(Xw - y)\) is still right.</li><li>The note's "\(p\times 1\)" should be \((p+1)\times 1\) (3×1 here): \(w\) includes the bias \(w_0\).</li></ul>`,
    },

    "2026A-q1.3": {
      point: R`<p>The best \(w\) is where part 2's gradient \(2X^\top\Gamma(Xw - y)\) is 0 — like solving \(f'(x) = 0\). Solving gives \((X^\top\Gamma X)^{-1}X^\top\Gamma y\), and "only numerical matrices" just means: \(X\), \(\Gamma\), \(y\) are part 1's numbers.</p>`,
      start: R`<p><b>Set the gradient to 0:</b></p>\[\square = 0\]<p><b>Solve for \(w\):</b></p>\[w^* = \;\square\]<p><b>With the numbers:</b> \(\;X = \square,\ \Gamma = \square,\ y = \square\)</p>`,
      answer: R`<p><b>Set the gradient to 0:</b></p>\[\begin{aligned}2X^\top\Gamma(Xw - y) &= 0\\ X^\top\Gamma X\,w &= X^\top\Gamma y\end{aligned}\]<p><b>Solve for \(w\):</b> (\(X^\top\Gamma X\) is invertible — its determinant is 22)</p>\[w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\]<p><b>With the numbers:</b></p>\[X = \begin{bmatrix}1&1&0\\1&0&1\\1&1&1\\1&2&1\end{bmatrix} \quad \Gamma = \mathrm{diag}(2,1,1,2) \quad y = \begin{bmatrix}1\\2\\4\\5\end{bmatrix}\]`,
      moves: [
        { line: R`<b>Set part 2's gradient to 0</b> and open the bracket (the 2 goes away): <div class="formula">\[\begin{aligned}2X^\top\Gamma(Xw - y) &= 0\\ X^\top\Gamma X\,w &= X^\top\Gamma y\end{aligned}\]</div>`,
          size: R`\[\begin{aligned}\underbrace{X^\top}_{\textstyle 3\times 4}\underbrace{\Gamma}_{\textstyle 4\times 4}\underbrace{X}_{\textstyle 4\times 3} &= 3\times 3\\ \underbrace{X^\top\Gamma X}_{\textstyle 3\times 3}\,\underbrace{w}_{\textstyle 3\times 1} &= \underbrace{X^\top\Gamma y}_{\textstyle 3\times 1}\end{aligned}\]<p>Right side: (3×4)(4×4)(4×1) = 3×1. Both sides 3×1 — one row per weight ✓</p>`,
          why: R`<p>\(w^*\) is the lowest point of \(J\). At the lowest point the slope by every weight is 0.</p>` },
        { line: R`<b>Solve for \(w\)</b> — multiply both sides by \((X^\top\Gamma X)^{-1}\) (the matrix version of dividing): <div class="formula">\[w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\]</div>`,
          size: R`\[\underbrace{(X^\top\Gamma X)^{-1}}_{\textstyle 3\times 3}\,\underbrace{X^\top\Gamma y}_{\textstyle 3\times 1} = \underbrace{w^*}_{\textstyle 3\times 1}\]<p>inner 3 = 3 ✓ · one weight per knob ✓ · the inverse goes in <b>front</b>: \(X^\top\Gamma y\,(X^\top\Gamma X)^{-1}\) = (3×1)(3×3) ✗</p>`,
          why: R`<p>Like \(3w = 6 \to w = 6/3\). With every \(\gamma_i = 1\) (\(\Gamma\) = identity) it's exactly [sheet: Least squares solution]. It needs \(X^\top\Gamma X\) to be invertible.</p>`,
          extra: [{ label: "how do we know it's invertible?", html: R`<p>For the points, one sentence is enough — the official solution only says "we check if \(X^\top\Gamma X\) is invertible".</p>
<p><b>The rule:</b> \(X^\top\Gamma X\) is invertible when no column of \(X\) can be built from the others (and every \(\gamma_i > 0\), given).</p>
<p><b>Quick exam check — red flags:</b> fewer samples than weights; a feature column that copies / is a multiple of another; a constant feature column (it repeats the 1s). None here: 4 samples, 3 weights, columns \((1,1,1,1)\), \((1,0,1,2)\), \((0,1,1,1)\).</p>
<p><b>Check with numbers:</b> \(X^\top\Gamma X = \begin{bmatrix}6&7&4\\7&11&5\\4&5&4\end{bmatrix}\), determinant \(= 22 \ne 0\) → invertible.</p>` }] },
        { line: R`<b>Say which numbers go in</b> — part 1's matrices. That's the answer: <div class="formula">\[w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y, \quad\text{where}\]</div><div class="formula">\[X = \begin{bmatrix}1&1&0\\1&0&1\\1&1&1\\1&2&1\end{bmatrix} \quad \Gamma = \mathrm{diag}(2,1,1,2) \quad y = \begin{bmatrix}1\\2\\4\\5\end{bmatrix}\]</div>Done.`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\qquad \underbrace{\Gamma}_{\textstyle 4\times 4}\qquad \underbrace{y}_{\textstyle 4\times 1}\]<p>\(X^\top\Gamma X\) = 3×3 (the matrix in "multiplied out"), \(X^\top\Gamma y\) = (18, 26, 16), 3×1 → \(w^*\) is 3×1 ✓</p>`,
          extra: [{ label: "multiplied out (not required)", html: R`\[w^* = \begin{bmatrix}6&7&4\\7&11&5\\4&5&4\end{bmatrix}^{-1}\begin{bmatrix}18\\26\\16\end{bmatrix} = \tfrac{1}{11}(-5,\ 16,\ 29)\]
<p>numpy: <code>np.linalg.inv(X.T @ G @ X) @ X.T @ G @ y</code> with <code>G = np.diag([2, 1, 1, 2])</code>.</p>` },
                  { label: "the hint's way: duplicate samples", html: R`<p>A weight of 2 = the sample counted twice. So copy samples 1 and 4: a 6-row \(X'\), \(y'\) whose plain squared error equals \(J\). Then [sheet: Least squares solution] gives \(w^* = (X'^\top X')^{-1}X'^\top y'\) — the same numbers.</p>` }] },
      ],
      compare: R`The official main answer is moves 1–3: \(w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\) "where \(X, y, \Gamma\) are as specified in (1)". Its alternatives (\(A = \Gamma^{1/2}\), or duplicating samples 1 and 4) give the same \(w^*\).`,
    },

    "2026A-q1.4": {
      point: R`<p>The correct loop: run all <code>num_iters</code> times, error = prediction − label, gradient \(2X^\top\Gamma\)(error), step \(w - \eta\cdot\)grad, loss \(\sum\gamma\cdot\)error², stop when the gradient is small. Six lines break one of these each — those are the six bugs.</p>`,
      start: R`<p>One line per bug (write at least four):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      answer: R`<p><b>Line 4:</b> <code>range(1, num_iters)</code> → should be <code>range(num_iters)</code>, because <code>range(1, N)</code> runs only N − 1 iterations.</p>
<p><b>Line 6:</b> <code>error = y - y_pred</code> → should be <code>error = y_pred - y</code>, because the gradient uses \(Xw - y\) = prediction − label.</p>
<p><b>Line 7:</b> <code>grad = 2*X.T @ error</code> → should be <code>grad = 2*X.T @ (gamma * error)</code>, because the gradient is \(2X^\top\Gamma(Xw - y)\): each error times its \(\gamma_i\).</p>
<p><b>Line 8:</b> <code>w = w + eta * grad</code> → should be <code>w = w - eta * grad</code>, because gradient descent steps against the gradient.</p>
<p><b>Line 9:</b> <code>np.sum((gamma * error) ** 2)</code> → should be <code>np.sum(gamma * error**2)</code>, because \(J = \sum_i\gamma_i(\dots)^2\) — only the error is squared, not \(\gamma\).</p>
<p><b>Line 11:</b> <code>np.linalg.norm(grad) &gt; 1e-6</code> → should be <code>np.linalg.norm(grad) &lt; 1e-6</code>, because we stop when the gradient is tiny.</p>`,
      moves: [
        { line: R`<b>Run all the iterations.</b> <b>Line 4:</b> <code>range(1, num_iters)</code> → <code>range(num_iters)</code>`,
          why: R`<p><code>range(1, N)</code> runs only \(N - 1\) times.</p>` },
        { line: R`<b>Error = prediction − label; step downhill.</b> <b>Line 6:</b> → <code>error = y_pred - y</code>. <b>Line 8:</b> → <code>w = w - eta * grad</code>`,
          remember: R`\[w \leftarrow w - \eta\,\nabla J(w)\]<p>One gradient-descent step (minus: go downhill). Not on the sheet.</p>`,
          size: R`<p>Docstring: <code>X</code> (n, p+1) = (4, 3) here, <code>w</code> (3,), <code>y</code> (n,).</p><p><code>y_pred = X @ w</code>: (n, 3) @ (3,) → (n,) · <code>y_pred - y</code>: (n,) ✓ · <code>w - eta * grad</code>: (3,) − (3,) ✓</p>`,
          why: R`<p>Part 2's gradient uses \(Xw - y\), and the step subtracts the gradient. (The two flips cancel, but both are bugs.)</p>` },
        { line: R`<b>\(\gamma\) multiplies each error once.</b> <b>Line 7:</b> → <code>grad = 2*X.T @ (gamma * error)</code>. <b>Line 9:</b> → <code>np.sum(gamma * error**2)</code>`,
          size: R`<p><code>gamma * error</code>: (n,) * (n,) → (n,), entry by entry = \(\Gamma(Xw - y)\) ✓</p><p><code>X.T @ (…)</code>: (3, n) @ (n,) → (3,), one entry per weight ✓ · <code>gamma @ error</code> → one number ✗ · <code>np.sum(gamma * error**2)</code> → one number = \(J\) ✓</p>`,
          why: R`<p>Part 2: \(2X^\top\Gamma(Xw - y)\), and \(\Gamma\) times a list = <code>gamma * error</code> (entry by entry). \(J = \sum\gamma_i(\dots)^2\): <code>(gamma * error) ** 2</code> would square \(\gamma\) too.</p>`,
          extra: [{ label: "why not error.T @ gamma @ error, like part 1?", html: R`<p>In the code <code>gamma</code> is <b>(n,) — a list</b> of the 4 weights (docstring), not the 4×4 matrix \(\Gamma\). <code>error @ gamma</code> = \(\sum\gamma_i e_i\), one number (not squared), and then <code>number @ error</code> crashes.</p>
<p>Line 9 is the docstring, translated piece by piece:</p>
<div class="tw"><table><thead><tr><th>docstring</th><th>code</th></tr></thead><tbody>
<tr><td><code>sum_i</code></td><td><code>np.sum(…)</code></td></tr>
<tr><td><code>gamma_i *</code></td><td><code>gamma *</code> (entry by entry)</td></tr>
<tr><td><code>(w^T x_i - y_i)</code></td><td><code>error</code></td></tr>
<tr><td><code>^2</code></td><td><code>**2</code></td></tr></tbody></table></div>
<p>With \(w = (1,1,1)\): <code>error</code> = (1, 0, −1, −1) → <code>**2</code> = (1, 0, 1, 1) → <code>gamma *</code> = (2, 0, 1, 2) → <code>np.sum</code> = 5 = part 1's \((Xw-y)^\top\Gamma(Xw-y)\).</p>
<p>Part 1's form also works if you build the matrix first: <code>error @ np.diag(gamma) @ error</code>.</p>` }] },
        { line: R`<b>Stop when the gradient is small.</b> <b>Line 11:</b> <code>&gt; 1e-6</code> → <code>&lt; 1e-6</code>. Done: that's all six bugs (lines 4, 6, 7, 8, 9, 11); the question asks for four.`,
          remember: R`<p>Gradient descent stops when \(\|\nabla J\|\) is tiny (the bottom is flat) → <code>break</code> when <code>np.linalg.norm(grad)</code> &lt; tolerance.</p><p>Not on the sheet.</p>`,
          size: R`<p><code>np.linalg.norm(grad)</code>: (3,) → one number, so it can be compared with <code>1e-6</code> ✓</p>` },
      ],
      compare: R`Same six bugs as the official list (lines 4, 6, 7, 8, 9, 11).`,
    },

    // ───────────────────────── 2026-B Q1 (your Moed B) ─────────────────────────
    "2026B-q1.1": {
      point: R`<p>Linear: plug the test \(x\)'s in. k-NN: copy (or average) the labels of the nearest <b>training</b> samples. Then MSE over the 2 test samples; smallest wins.</p>`,
      start: R`<p><b>(a)</b> \(\hat y^{(6)} = \square,\ \hat y^{(7)} = \square\) → \(\mathrm{MSE} = \tfrac12(\square + \square) = \square\)</p>
<p><b>Distances</b> (squared) to training samples 1–5: from 6: □ · from 7: □</p>
<p><b>(b)</b> \(\hat y^{(6)} = y_\square = \square,\ \hat y^{(7)} = y_\square = \square\) → \(\mathrm{MSE} = \square\)</p>
<p><b>(c)</b> \(\hat y^{(6)} = \tfrac12(y_\square + y_\square) = \square,\ \hat y^{(7)} = \tfrac12(y_\square + y_\square) = \square\) → \(\mathrm{MSE} = \square\)</p>
<p><b>Best:</b> □ (lowest test MSE)</p>`,
      answer: R`<p><b>(a)</b> \(\hat y^{(6)} = 2 + 0.1\cdot 30 + 1\cdot 1 = 6,\ \hat y^{(7)} = 2 + 0.1\cdot 50 + 1\cdot 2 = 9\) → \(\mathrm{MSE} = \tfrac12\big((6-7)^2 + (9-7)^2\big) = 2.5\)</p>
<p><b>Distances</b> (squared) to training samples 1–5: from 6: 101, <b>1</b>, 101, 101, <b>100</b> · from 7: 904, 400, <b>104</b>, 900, <b>101</b></p>
<p><b>(b)</b> \(\hat y^{(6)} = y_2 = 6,\ \hat y^{(7)} = y_5 = 9\) → \(\mathrm{MSE} = \tfrac12(1 + 4) = 2.5\)</p>
<p><b>(c)</b> \(\hat y^{(6)} = \tfrac12(y_2 + y_5) = 7.5,\ \hat y^{(7)} = \tfrac12(y_5 + y_3) = 8\) → \(\mathrm{MSE} = \tfrac12(0.25 + 1) = 0.625\)</p>
<p><b>Best:</b> 2-NN (c) (lowest test MSE, 0.625)</p>`,
      moves: [
        { line: R`<b>(a) Linear</b> — \(\hat y = 2 + 0.1x_1 + 1x_2\): <div class="formula">\[\begin{aligned}\hat y^{(6)} &= 2 + 3 + 1 = 6, \quad \hat y^{(7)} = 2 + 5 + 2 = 9\\ \mathrm{MSE} &= \tfrac12\big((6-7)^2 + (9-7)^2\big) = \tfrac12(1 + 4) = 2.5\end{aligned}\]</div>`,
          size: R`\[\underbrace{(1, 30, 1)}_{\textstyle 1\times 3}\,\underbrace{(2, 0.1, 1)^\top}_{\textstyle 3\times 1} = 6\]<p>Test row (1, \(x_1\), \(x_2\)) · the 3 weights = one prediction ✓. Both test samples at once: (2×3)(3×1) = 2×1 = (6, 9) ✓</p>` },
        { line: R`<b>Distances</b> — (b), (c) need the nearest <b>training</b> samples: squared distance from each test sample to 1–5: <div class="tw"><table><thead><tr><th>from</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>6 (30, 1)</td><td>101</td><td><b>1</b></td><td>101</td><td>101</td><td><b>100</b></td></tr><tr><td>7 (50, 2)</td><td>904</td><td>400</td><td><b>104</b></td><td>900</td><td><b>101</b></td></tr></tbody></table></div>`,
          remember: R`<p>k-NN regression: find the \(k\) <b>training</b> samples nearest to \(x\), predict the <b>average</b> of their labels (1-NN = the nearest one's label).</p><p>Not on the sheet. The distance is: [sheet: Normed distance] with the [sheet: L2 norm].</p>`,
          size: R`\[\|\underbrace{x^{(6)} - x^{(2)}}_{\textstyle 2\times 1}\|^2 = \underbrace{(0, -1)}_{\textstyle 1\times 2}\underbrace{(0, -1)^\top}_{\textstyle 2\times 1} = 1\]<p>2 features (no 1 in front here) → one number per pair · 2 test × 5 training = the 2×5 table ✓</p>`,
          why: R`<p>Squared distance = \((\Delta x_1)^2 + (\Delta x_2)^2\). 6 to 2: \((30-30)^2 + (1-2)^2 = 1\). Skipping the \(\sqrt{}\) keeps the same order. [sheet: Normed distance] with [sheet: L2 norm].</p>` },
        { line: R`<b>(b) 1-NN</b> — the nearest one's label: \(\hat y^{(6)} = y_2 = 6\), \(\hat y^{(7)} = y_5 = 9\). Same predictions as (a), so MSE = 2.5.` },
        { line: R`<b>(c) 2-NN</b> — average the two nearest labels: <div class="formula">\[\begin{aligned}\hat y^{(6)} &= \tfrac12(6 + 9) = 7.5, \quad \hat y^{(7)} = \tfrac12(9 + 7) = 8\\ \mathrm{MSE} &= \tfrac12(0.25 + 1) = 0.625\end{aligned}\]</div>Smallest MSE, so 2-NN is best. Done.` },
      ],
      compare: R`Same predictions and MSEs as the official answer (2.5, 2.5, 0.625 → 2-NN).`,
    },

    "2026B-q1.2": {
      point: R`<p>Dividing each feature by its norm makes \(x_2\) count as much as \(x_1\), so the nearest neighbours change. Then 1-NN: copy the label of the nearest training sample (as in part 1).</p>`,
      start: R`<p><b>Norms</b> (training rows 1–5 only):</p>\[\|X_1\| = \square, \qquad \|X_2\| = \square\]<p><b>Normalized data</b> (every \(x_1\) ÷ □, every \(x_2\) ÷ □, test samples too): □</p><p><b>Nearest to 6:</b> □ → \(\hat y^{(6)} = \square\)</p><p><b>Nearest to 7:</b> □ → \(\hat y^{(7)} = \square\)</p>\[\mathrm{MSE} = \tfrac12(\square + \square) = \square\]`,
      answer: R`<p><b>Norms</b> (training rows 1–5 only):</p>\[\begin{aligned}\|X_1\| &= \sqrt{20^2 + 30^2 + 40^2 + 20^2 + 40^2} = \sqrt{4900} = 70\\ \|X_2\| &= \sqrt{0 + 4 + 0 + 4 + 1} = 3\end{aligned}\]<p><b>Normalized data</b> (every \(x_1\) ÷ 70, every \(x_2\) ÷ 3, test samples too):</p><div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>\(x_1\)</td><td>\(\tfrac27\)</td><td>\(\tfrac37\)</td><td>\(\tfrac47\)</td><td>\(\tfrac27\)</td><td>\(\tfrac47\)</td><td>\(\tfrac37\)</td><td>\(\tfrac57\)</td></tr><tr><td>\(x_2\)</td><td>0</td><td>\(\tfrac23\)</td><td>0</td><td>\(\tfrac23\)</td><td>\(\tfrac13\)</td><td>\(\tfrac13\)</td><td>\(\tfrac23\)</td></tr></tbody></table></div><p><b>Nearest to 6:</b> sample 5, at distance \(\tfrac17\) (all others \(\ge\tfrac13\)) → \(\hat y^{(6)} = y_5 = 9\)</p><p><b>Nearest to 7:</b> sample 2, at distance \(\tfrac27\) (all others \(\gt\tfrac13\)) → \(\hat y^{(7)} = y_2 = 6\)</p>\[\mathrm{MSE} = \tfrac12\big((9-7)^2 + (6-7)^2\big) = \tfrac12(4 + 1) = 2.5\]`,
      moves: [
        { line: R`<b>Norm of each feature, training rows 1–5 only</b> — \(\sqrt{\text{sum of squares}}\): <div class="formula">\[\begin{aligned}\|X_1\| &= \sqrt{20^2 + 30^2 + 40^2 + 20^2 + 40^2} = \sqrt{4900} = 70\\ \|X_2\| &= \sqrt{0 + 4 + 0 + 4 + 1} = 3\end{aligned}\]</div>`,
          size: R`\[\|X_1\|^2 = \underbrace{X_1^\top}_{\textstyle 1\times 5}\,\underbrace{X_1}_{\textstyle 5\times 1} = 4900\]<p>\(X_1\) = the \(x_1\) column over the 5 training rows (5×1) → one number per feature ✓</p>`,
          why: R`<p>[sheet: L2 norm]</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You divided \(x_1\) by its <b>sum</b> (150), not its \(L_2\) norm (70), and didn't normalize \(x_2\) — 2/4.</p>` }] },
        { line: R`<b>Divide</b> — every \(x_1\) by 70, every \(x_2\) by 3, test samples too: <div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>\(x_1\)</td><td>\(\tfrac27\)</td><td>\(\tfrac37\)</td><td>\(\tfrac47\)</td><td>\(\tfrac27\)</td><td>\(\tfrac47\)</td><td>\(\tfrac37\)</td><td>\(\tfrac57\)</td></tr><tr><td>\(x_2\)</td><td>0</td><td>\(\tfrac23\)</td><td>0</td><td>\(\tfrac23\)</td><td>\(\tfrac13\)</td><td>\(\tfrac13\)</td><td>\(\tfrac23\)</td></tr></tbody></table></div>` },
        { line: R`<b>Nearest to 6</b> \((\tfrac37, \tfrac13)\) — sample 5: same \(x_2\), \(x_1\) off by only \(\tfrac17\). Every other sample is already off by \(\tfrac13\) in \(x_2\). So \(\hat y^{(6)} = y_5 = 9\).`,
          remember: R`<p>1-NN regression: predict the label of the single nearest <b>training</b> sample.</p><p>Not on the sheet. The distance is: [sheet: Normed distance] with the [sheet: L2 norm].</p>`,
          extra: [{ label: "check it with numbers (squared distances)", html: R`<div class="tw"><table><thead><tr><th>from</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><td>6</td><td>0.132</td><td>0.111</td><td>0.132</td><td>0.132</td><td><b>0.020</b></td></tr><tr><td>7</td><td>0.628</td><td><b>0.082</b></td><td>0.465</td><td>0.184</td><td>0.132</td></tr></tbody></table></div>` }] },
        { line: R`<b>Nearest to 7</b> \((\tfrac57, \tfrac23)\) — sample 2: same \(x_2\), \(x_1\) off by \(\tfrac27\). Sample 4 is off by \(\tfrac37\); the rest by \(\ge\tfrac13\) in \(x_2\). So \(\hat y^{(7)} = y_2 = 6\): <div class="formula">\[\mathrm{MSE} = \tfrac12\big((9-7)^2 + (6-7)^2\big) = \tfrac12(4 + 1) = 2.5\]</div>Done.` },
      ],
      compare: R`Same norms (70, 3), neighbours (5 at \(\tfrac17\), 2 at \(\tfrac27\)) and MSE 2.5 as the official answer — the same MSE as before, with different neighbours.`,
    },

    "2026B-q1.3": {
      point: R`<p>Derivative by one weight \(w_j\), sample by sample: \(|\dots|^3 \to 3|\dots|^2\cdot\mathrm{sign}(\dots)\cdot x^{(i)}_j\) → with matrix pieces: \(3X_j^\top\)(list) (\(X_j\) = column \(j\) of \(X\)) → stack: the \(X_j^\top\)'s are \(X^\top\), and \(X^\top\)(a list) is exactly the hint's \(\sum_i z_i x^{(i)}\). The brackets are the entries of \(Xw - y\), so \(\nabla J = 3X^\top\big[(Xw - y)^2\,\mathrm{sign}(Xw - y)\big]\) (entry by entry) and \(z_i = 3(w^\top x^{(i)} - y_i)^2\,\mathrm{sign}(w^\top x^{(i)} - y_i)\).</p>`,
      start: R`<p><b>The function:</b></p>\[J(w) = \;\square\]<p><b>Derivative by one weight \(w_j\):</b></p>\[\frac{dJ}{dw_j} = \;\square\; = \;\square\]<p><b>All weights (the gradient):</b></p>\[\nabla J(w) = \;\square\; = \sum_i z_i\,x^{(i)}, \qquad z_i = \;\square\]`,
      answer: R`<p><b>The function:</b></p>\[J(w) = \sum_i \big|w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\big|^3\]<p><b>Derivative by one weight \(w_j\):</b></p>\[\begin{aligned}\frac{dJ}{dw_j} = \sum_i\; &3\,\big|w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\big|^2\\ &\cdot\,\mathrm{sign}\big(w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\big)\cdot x^{(i)}_j\\ = \;&3\,X_j^\top\big[(Xw - y)^2\,\mathrm{sign}(Xw - y)\big]\end{aligned}\]<p>(\(X_j\) = column \(j\) of \(X\); square and sign entry by entry.)</p><p><b>All weights (the gradient):</b></p>\[\begin{aligned}\nabla J(w) &= 3X^\top\big[(Xw - y)^2\,\mathrm{sign}(Xw - y)\big] = \sum_i z_i\,x^{(i)}\\ z_i &= 3\,(w^\top x^{(i)} - y_i)^2\,\mathrm{sign}(w^\top x^{(i)} - y_i)\end{aligned}\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question: <div class="formula">\[J(w) = \sum_i \big|w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\big|^3\]</div>`,
          size: R`<p>The bracket \(= w_0\cdot 1 + w_1 x^{(i)}_1 + w_2 x^{(i)}_2 - y_i\) = sample \(i\)'s prediction − label = one number per sample ✓</p>`,
          why: R`<p>One \(|\dots|^3\) per training sample, all added up. Sample 1: \(|w_0 + 20w_1 + 0w_2 - 5|^3\).</p>` },
        { line: R`<b>Derivative by one weight \(w_j\)</b> — outer \((\cdot)^3 \to 3(\cdot)^2\), then \(|\cdot| \to \mathrm{sign}(\cdot)\), then the number in front of \(w_j\): <div class="formula">\[\begin{aligned}\frac{dJ}{dw_j} = \sum_i\; &3\,\big|w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\big|^2\\ &\cdot\,\mathrm{sign}\big(w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\big)\cdot x^{(i)}_j\end{aligned}\]</div>`,
          remember: R`\[\frac{d}{da}\,|a| = \mathrm{sign}(a)\]<p>+1 if \(a > 0\), −1 if \(a < 0\). Not on the sheet. Here \(a\) is the bracket \(w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\).</p>`,
          why: R`<p>Like \((x^2+3)^3 \to 3(x^2+3)^2\cdot 2x\), with two inner layers: \(|\cdot|\), then the bracket. \(|a|\) by \(a\) is \(\mathrm{sign}(a)\); the bracket by \(w_j\) is \(x^{(i)}_j\), the number in front of \(w_j\) (for \(w_0\) it's 1).</p>
<p>\(|\dots|^2 = (\dots)^2\): squaring removes the sign. And the bracket is just row \(i\) of \(X\) · \(w\) − \(y_i\) = <b>entry \(i\) of \(Xw - y\)</b>.</p>
<p>Numbers: at bracket \(= -2\), \(|\cdot|^3 = -(\cdot)^3\), slope \(-3\cdot 4 = -12\); formula: \(3\cdot 4\cdot(-1) = -12\) ✓</p>` },
        { line: R`<b>Write it with matrices</b> — the 3 is a constant: out of the sum. The rest (entry × entry, added up) is a dot product: <div class="formula">\[\begin{aligned}\frac{dJ}{dw_j} &= \underbrace{\color{#e8912d}3}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\cdot(\dots)^2\,\mathrm{sign}(\dots)\\ &= 3\,X_j^\top\underbrace{(Xw - y)^2\,\mathrm{sign}(Xw - y)}_{\textstyle\text{entry by entry}}\end{aligned}\]</div>\(X_j\) = column \(j\) of \(X\); brackets = entries of \(Xw - y\).`,
          size: R`\[\underbrace{X_j^\top}_{\textstyle 1\times 5}\,\underbrace{(Xw - y)^2\,\mathrm{sign}(Xw - y)}_{\textstyle 5\times 1} = \text{one number}\]<p>\(Xw - y\) is 5×1; squaring and sign go entry by entry, so still 5×1 · inner 5 = 5 ✓ · one number, like \(\frac{dJ}{dw_j}\) ✓ · without the \(^\top\): (5×1)(5×1) — inner 1 ≠ 5 ✗</p>`,
          why: R`<p>\(X_j\) = (sample 1's \(x_j\), sample 2's \(x_j\), …) — reading down column \(j\) of \(X\) (the table with a column of 1s in front). The list = (sample 1's \((\dots)^2\mathrm{sign}(\dots)\), sample 2's, …) — each bracket is an entry of \(Xw - y\), so the list is \((Xw - y)^2\,\mathrm{sign}(Xw - y)\), done to each entry (numpy: <code>r**2 * np.sign(r)</code> with <code>r = X @ w - y</code> — part 4). The sum multiplies them entry by entry and adds up: a dot product, \(X_j^\top\cdot\) the list. For \(w_0\), \(X_0\) is the column of 1s.</p>
<p><b>Why only the 3 comes out:</b> only things without an \(i\) (the same for every sample) go in front of \(\sum_i\). \(x^{(i)}_j\) and \((\dots)^2\,\mathrm{sign}(\dots)\) change per sample, so they get packed into lists (\(X_j\) and the list) and the sum becomes their dot product.</p>` },
        { line: R`<b>From one weight to \(\nabla J\)</b> — stack move 3 for \(w_0, w_1, w_2\); only \(X_j\) changes, the rest is constant → out. \(X^\top\)(a list) = the hint's \(\sum_i z_i x^{(i)}\): <div class="formula">\[\begin{aligned}\nabla J &= \begin{bmatrix}3X_0^\top(\text{list})\\ 3X_1^\top(\text{list})\\ 3X_2^\top(\text{list})\end{bmatrix}\\ &= \underbrace{\color{#e8912d}3}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}X_0^\top\\ X_1^\top\\ X_2^\top\end{bmatrix}}_{\textstyle X^\top}\;\underbrace{\color{#e8912d}\text{list}}_{\textstyle\color{#e8912d}\text{constant}}\\ &= 3X^\top\big[(Xw - y)^2\,\mathrm{sign}(Xw - y)\big] = \sum_i z_i\,x^{(i)}\end{aligned}\]</div><div class="formula">\[z_i = 3\,(w^\top x^{(i)} - y_i)^2\,\mathrm{sign}(w^\top x^{(i)} - y_i)\]</div>Done.`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 5}\,\underbrace{z}_{\textstyle 5\times 1} = \underbrace{\nabla J}_{\textstyle 3\times 1} \qquad \underbrace{z_i}_{\text{number}}\,\underbrace{x^{(i)}}_{\textstyle 3\times 1} = 3\times 1\]<p>The three \(X_j^\top\) (each 1×5) stacked = 3×5 = \(X^\top\) ✓ · inner 5 = 5 ✓ · result 3×1 = one entry per weight ✓ · the hint's way: a number times a 3×1 sample, added over the 5 samples → 3×1 too ✓</p><p>Wrong order: \(Xz\) = (5×3)(5×1) — inner 3 ≠ 5 ✗</p>`,
          why: R`<p>list = move 3's \((Xw - y)^2\,\mathrm{sign}(Xw - y)\), entry by entry. The rows of \(X^\top\) are the columns of \(X\): row 0 = \(X_0^\top\), row 1 = \(X_1^\top\), row 2 = \(X_2^\top\). The 3 can go back inside the list: \(3X^\top(\text{list}) = X^\top(3\cdot\text{list})\).</p>
<p>Why \(X^\top z = \sum_i z_i x^{(i)}\): the <b>columns</b> of \(X^\top\) are the samples \(x^{(i)} = (1, x^{(i)}_1, x^{(i)}_2)\), and a matrix times a list = column 1 × entry 1 + column 2 × entry 2 + … = \(z_1x^{(1)} + z_2x^{(2)} + \dots\) So \(z_i\) is everything that multiplies \(x^{(i)}\): 3 × entry \(i\) of the list. Entry \(i\) of \(Xw - y\) is \(w^\top x^{(i)} - y_i\) (= \(w_0 + w_1x^{(i)}_1 + w_2x^{(i)}_2 - y_i\)).</p>` },
      ],
      compare: R`Same result as the official solution. It names the bracket \(r_i = w^\top x^{(i)} - y_i\) (so \(z_i = 3r_i^2\,\mathrm{sign}(r_i)\)); we wrote the bracket out instead — same thing. It also takes the 3 out of the sum (move 3).`,
    },

    "2026B-q1.4": {
      point: R`<p>(1) is part 3's \(z_i = 3\,(\text{bracket})^2\,\mathrm{sign}(\text{bracket})\) in numpy — the code's <code>r</code> is the list of brackets, (2) is the question's own \(\sum_i z_i x^{(i)}\), written with <code>X.T</code>, (3) is the docstring's stopping rule.</p>`,
      start: R`<p><b>(1)</b> <code>z = </code>□</p><p><b>(2)</b> <code>grad = </code>□</p><p><b>(3)</b> <code>if </code>□<code>:</code></p>`,
      answer: R`<p><b>(1)</b> <code>z = 3 * r**2 * np.sign(r)</code></p><p><b>(2)</b> <code>grad = X.T @ z</code></p><p><b>(3)</b> <code>if np.linalg.norm(grad) &lt;= epsilon:</code></p>`,
      moves: [
        { line: R`<b>(1) What does the question really want?</b> The code's <code>r = X @ w - y</code> = the list of all brackets \(w^\top x^{(i)} - y_i\). Part 3: \(z_i = 3\,(\text{bracket})^2\,\mathrm{sign}(\text{bracket})\). Entry by entry: <code>3 * r**2 * np.sign(r)</code>`,
          remember: R`<p><code>np.sign(r)</code> = the sign of each entry (+1, −1, or 0), as an array.</p><p>numpy — not on the sheet.</p>`,
          size: R`<p>Docstring: <code>X</code> (n, 3) with the constant column, <code>w</code> (3,), <code>y</code> (n,) — n = 5 for part 1's table.</p><p><code>r = X @ w - y</code>: (n, 3) @ (3,) − (n,) → (n,) · <code>3 * r**2 * np.sign(r)</code> is entry by entry → <code>z</code>: (n,), one \(z_i\) per sample ✓</p>`,
          why: R`<p>Entry \(i\) of <code>r</code> is sample \(i\)'s bracket \(w^\top x^{(i)} - y_i\); numpy does the formula entry by entry. \(z_i\) is the derivative of \(|\text{bracket}|^3\): \(3|\dots|^2\cdot\mathrm{sign}(\dots)\), and \(|\dots|^2 = (\dots)^2\).</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You wrote <code>np.abs(r)**3</code> — that's the loss; \(z\) is its derivative.</p>` }] },
        { line: R`<b>(2) \(\sum_i z_i x^{(i)}\)</b> — each sample \(x^{(i)}\) times its number \(z_i\), added up. The samples are the rows of <code>X</code> = the columns of <code>X.T</code>, and matrix @ list does exactly that: <code>X.T @ z</code>`,
          size: R`<p><code>X.T @ z</code>: (3, n) @ (n,) → (3,) — exactly the docstring's "Returns: shape (3,)" ✓</p><p><code>X @ z</code>: (n, 3) @ (n,) — inner 3 ≠ n ✗</p>`,
          why: R`<p>Row \(j\) of \(\sum_i z_i x^{(i)}\) = column \(j\) of \(X\) dotted with \(z\). The rows of \(X^\top\) are the columns of \(X\), so all rows at once \(= X^\top z\) (as in 2025-C Q1, part 2, move 4). You get this one from the hint alone, even without part 3.</p>` },
        { line: R`<b>(3) the docstring's rule \(\|\nabla J\|_2 \le \varepsilon\):</b> <code>np.linalg.norm(grad) &lt;= epsilon</code>. Done.`,
          remember: R`<p><code>np.linalg.norm(v)</code> = \(\|v\|_2\), one number.</p><p>numpy — not on the sheet.</p>`,
          size: R`<p><code>np.linalg.norm(grad)</code>: (3,) → one number, so <code>&lt;= epsilon</code> compares a number with a number ✓ · <code>grad &lt; epsilon</code> gives 3 True/False values ✗</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You wrote <code>grad &lt; epsilon</code> — a list compared with a number; \(\|\cdot\|_2\) is <code>np.linalg.norm</code>.</p>` }] },
      ],
      compare: R`Same three expressions as the official answer (it also accepts <code>np.sum(grad ** 2) &lt;= epsilon**2</code>).`,
      slip: R`Small bug in the exam's code: the loop passes <code>y_train</code>, but the function's argument is called <code>y</code>. Read it as <code>y</code>; the three blanks don't change.`,
    },
  });
})();
