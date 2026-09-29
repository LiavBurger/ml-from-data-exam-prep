// Walkthroughs for the Regression questions — CASUAL style (spec/WALKS.md):
// few moves, plain words, only the lines that earn the points.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    "2025C-q1.1": {
      point: R`<p>\(X\) is just the table with a column of 1s in front (the 1 is for \(\theta_0\)); \(y\) is the label column.</p>`,
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix} \qquad y = \begin{bmatrix}\square\\ \square\\ \square\\ \square\end{bmatrix}\]`,
      moves: [
        { line: R`<b>X</b> — one row per sample: a 1, then \(x_1\), then \(x_2\): <div class="formula">\[X = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix}\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} = \underbrace{X\theta}_{\textstyle 4\times 1}\]<p>4 samples × (1 + 2 features); inner 3 = 3 ✓ · result 4×1 = one prediction per sample ✓</p>`,
          why: R`<p>Why the 1: a row of \(X\) times \(\theta\) must give that sample's prediction. Sample 1:</p>
\[\begin{aligned}&(1, -1, 1)\cdot(\theta_0, \theta_1, \theta_2)\\ &= \underbrace{\color{#e8912d}\theta_0\cdot 1}_{\textstyle\color{#e8912d}\text{the 1 is for }\theta_0} + \theta_1\cdot(-1) + \theta_2\cdot 1\end{aligned}\]
<p>That's exactly the question's bracket \(\theta_0 + \theta_1 x_1 + \theta_2 x_2\) for sample 1. Without the 1, \(\theta_0\) would have nothing to multiply.</p>` },
        { line: R`<b>y</b> — the labels, same order: \(\;y = (6, 4, 5, 1)\). Done.` },
      ],
      compare: R`Same \(X\) and \(y\) as the official answer.`,
    },
    "2025C-q1.2": {
      point: R`<p>Derivative by one weight \(\theta_j\) → write it with matrix pieces: \(2X_j^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta_j)\) (\(X_j\) = column \(j\) of \(X\)) → stack it for every weight: the \(X_j^\top\)'s stacked are \(X^\top\), the signs stacked are \(\mathrm{sign}(\theta)\). So \(\nabla J = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\).</p>`,
      start: R`<p><b>The function:</b></p>\[J(\theta) = \;\square\]<p><b>Derivative by one weight \(\theta_j\):</b></p>\[\frac{dJ}{d\theta_j} = \;\square\; = \;\square\]<p><b>All weights (the gradient):</b></p>\[\nabla J(\theta) = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question (it's our \(f\)): <div class="formula">\[\begin{aligned}J(\theta) = \;&\sum_{i}\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)^2\\ &+ \lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\end{aligned}\]</div>`,
          why: R`<p>The \(\sum_i\) only means: one squared bracket <b>per sample</b>, all added up. With 2025-C's 4 samples it literally is:</p>
\[\begin{aligned}J(\theta) = \;&(\theta_0 - 1\theta_1 + 1\theta_2 - 6)^2 &&\leftarrow \text{sample 1}\\ +\;&(\theta_0 - 2\theta_1 + 0\theta_2 - 4)^2 &&\leftarrow \text{sample 2}\\ +\;&(\theta_0 + 1\theta_1 + 3\theta_2 - 5)^2 &&\leftarrow \text{sample 3}\\ +\;&(\theta_0 + 0\theta_1 + 1\theta_2 - 1)^2 &&\leftarrow \text{sample 4}\\ +\;&\lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\end{aligned}\]
<p>Each bracket is "prediction − label" for one sample.</p>` },
        { line: R`<b>Derivative by one weight \(\theta_j\)</b> — like \(2\cdot(x^2+3)\cdot 2x\): 2 · (…) · (the number in front of \(\theta_j\)), (…) = the bracket copied as-is; \(|\theta_j| \to \mathrm{sign}(\theta_j)\): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_j} = \;&\sum_{i} 2\cdot\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)\cdot x^{(i)}_j\\ &+ \lambda\,\mathrm{sign}(\theta_j)\end{aligned}\]</div>`,
          remember: R`\[\frac{d}{da}\,|a| = \mathrm{sign}(a)\]<p>+1 if \(a > 0\), −1 if \(a < 0\). Not on the sheet. Here \(a\) is \(\theta_j\).</p>`,
          why: R`<p><b>Each squared bracket:</b> \((\dots)^2 \to 2\cdot(\dots)\cdot(\text{derivative of }(\dots))\) — the same move as \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\).</p>
<p><b>Derivative of (…) by \(\theta_j\):</b> (…) is a plain sum like \(\theta_0 - 2\theta_1 + 0\theta_2 - 4\). Its derivative by \(\theta_1\) is just the number in front of \(\theta_1\): here \(-2\) — that sample's \(x_1\). In general it's that sample's \(x_j\), written \(x^{(i)}_j\) (for \(\theta_0\) it's 1).</p>
<p><b>Penalty:</b> only \(|\theta_j|\) contains \(\theta_j\). The derivative of \(|a|\) is its sign: +1 if positive, −1 if negative.</p>
<p>Written out for knob \(\theta_1\) with the 4 real brackets:</p>
\[\begin{aligned}\frac{dJ}{d\theta_1} = \;&2\cdot(\theta_0 - 1\theta_1 + 1\theta_2 - 6)\cdot(-1)\\ +\;&2\cdot(\theta_0 - 2\theta_1 + 0\theta_2 - 4)\cdot(-2)\\ +\;&2\cdot(\theta_0 + 1\theta_1 + 3\theta_2 - 5)\cdot(1)\\ +\;&2\cdot(\theta_0 + 0\theta_1 + 1\theta_2 - 1)\cdot(0)\\ +\;&\lambda\,\mathrm{sign}(\theta_1)\end{aligned}\]`,
          extra: [{ label: "is this on the formula sheet?", html: R`<p>Only the one-sample version: [sheet: Square error loss gradient]. It shows <b>one sample</b>, with a \(\tfrac12\) in front: \(\nabla\,\tfrac12(y - w^\top x)^2 = (w^\top x - y)\,x\).</p>
<p>Our loss has no \(\tfrac12\), so each sample gives <b>2 ·</b> (prediction − label) · \(x\) — exactly move 2 (the ½ is what cancels the 2). Add over the samples and you have move 2.</p>
<p>The matrix form \(2X^\top(X\theta - y)\) is <b>not</b> on the sheet — moves 3–4 build it. Neither is \(|\theta_j| \to \mathrm{sign}(\theta_j)\) (the box above).</p>` },
                  { label: "check it with numbers (θ = (1, −2, 3), knob θ₁)", html: R`<div class="tw"><table><thead><tr><th>sample</th><th>(…) for this sample</th><th>its \(x_1\)</th><th>2 · (…) · \(x_1\)</th></tr></thead><tbody>
<tr><td>1</td><td>1 + 2 + 3 − 6 = 0</td><td>−1</td><td>0</td></tr><tr><td>2</td><td>1 + 4 + 0 − 4 = 1</td><td>−2</td><td>−4</td></tr>
<tr><td>3</td><td>1 − 2 + 9 − 5 = 3</td><td>1</td><td>6</td></tr><tr><td>4</td><td>1 + 0 + 3 − 1 = 3</td><td>0</td><td>0</td></tr>
<tr><td colspan="3"><b>add</b></td><td><b>2</b></td></tr></tbody></table></div>
<p>Plus the penalty \(\lambda\,\mathrm{sign}(\theta_1) = 1\cdot(-1) = -1\): \(\;2 - 1 = 1\). That's the middle entry of part 3's gradient \((15, 1, 25)\).</p>` }] },
        { line: R`<b>Write it with matrices</b> — the 2 is a constant: out of the sum. The rest (entry × entry, added up) is a dot product; the penalty stays as is: <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_j} &= \underbrace{\color{#e8912d}2}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\cdot(\dots) + \lambda\,\mathrm{sign}(\theta_j)\\ &= 2\,X_j^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta_j)\end{aligned}\]</div>\(X_j\) = column \(j\) of \(X\).`,
          size: R`\[\underbrace{X_j^\top}_{\textstyle 1\times 4}\,\underbrace{(X\theta - y)}_{\textstyle 4\times 1} = \text{one number}\]<p>inner 4 = 4 ✓ · one number, like \(\frac{dJ}{d\theta_j}\) ✓ · without the \(^\top\): (4×1)(4×1) — inner 1 ≠ 4 ✗</p><p>\((X\theta - y)^\top X_j\) is (1×4)(4×1) too — the same number, a dot product doesn't care about order.</p>`,
          why: R`<p>\(X_j\) = (sample 1's \(x_j\), sample 2's \(x_j\), …) — reading down column \(j\) of \(X\). The (…)'s = (sample 1's prediction − label, sample 2's, …) = \(X\theta - y\), because row · \(\theta\) = \(\theta_0 + \theta_1x_1 + \theta_2x_2\) = that sample's prediction (part 1). The sum multiplies them entry by entry and adds up: that's exactly a dot product, \(X_j^\top(X\theta - y)\). For \(\theta_0\), \(X_0\) is the column of 1s.</p>
<p><b>Why only the 2 comes out:</b> only things without an \(i\) (the same for every sample) can go in front of \(\sum_i\). \(x^{(i)}_j\) and the (…)'s change from sample to sample, so they can't; they get packed into lists instead (\(X_j\) and \(X\theta - y\)), and the sum becomes the dot product of the two lists.</p>
<p>The official solution's first line is this move's first line, with \(\theta^\top x^{(i)}\) for (…) — that's just short for the prediction \(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2\).</p>` },
        { line: R`<b>From one weight to \(\nabla J\)</b> — \(\nabla J\) is the list of all the partials. Stack move 3 for \(\theta_0, \theta_1, \theta_2\); only \(X_j\) and \(\theta_j\) change, the rest is constant → out: <div class="formula">\[\begin{aligned}\nabla J &= \begin{bmatrix}2X_0^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta_0)\\ 2X_1^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta_1)\\ 2X_2^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta_2)\end{bmatrix}\\ &= \underbrace{\color{#e8912d}2}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}X_0^\top\\ X_1^\top\\ X_2^\top\end{bmatrix}}_{\textstyle X^\top}\;\underbrace{\color{#e8912d}(X\theta - y)}_{\textstyle\color{#e8912d}\text{constant}}\\ &\quad+ \underbrace{\color{#e8912d}\lambda}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}\mathrm{sign}(\theta_0)\\ \mathrm{sign}(\theta_1)\\ \mathrm{sign}(\theta_2)\end{bmatrix}}_{\textstyle\mathrm{sign}(\theta)}\\ &= 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\end{aligned}\]</div>Done.`,
          remember: R`\[\nabla\,\|Xw - y\|^2 = 2X^\top(Xw - y)\]<p>The squared-error part of this answer — remember it; it's the shortcut next time. Not on the sheet in this form: [sheet: Square error loss gradient] only has <b>one sample with a ½</b>, \((w^\top x - y)\,x\). Here \(w\) is \(\theta\).</p>`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 4}\,\underbrace{(X\theta - y)}_{\textstyle 4\times 1} = \underbrace{\nabla J}_{\textstyle 3\times 1}\]<p>The three \(X_j^\top\) (each 1×4) stacked = 3×4 = \(X^\top\) ✓ · inner 4 = 4 ✓ · result 3×1 = one entry per knob ✓ · \(\mathrm{sign}(\theta)\) is 3×1 too, so they add ✓</p><p>Wrong order: \(X(X\theta - y)\) = (4×3)(4×1) — inner 3 ≠ 4 ✗</p>`,
          why: R`<p>The rows of \(X^\top\) are the columns of \(X\): row 0 = \(X_0^\top\), row 1 = \(X_1^\top\), row 2 = \(X_2^\top\).</p>
<p><b>\(\mathrm{sign}(\theta)\) is a shorthand, not a step:</b> it <b>means</b> "the sign of each entry" — the official solution writes "we define \(\mathrm{sign}(\theta)\) as the vector whose entries are \(\mathrm{sign}(\theta_j)\)". With numbers: \(\theta = (1, -2, 3)\) → \(\mathrm{sign}(\theta) = (1, -1, 1)\), exactly like numpy:</p>
<pre><code>theta = np.array([1, -2, 3])
np.sign(theta)   # array([ 1, -1,  1])</code></pre>`,
          extra: [{ label: "see it with the real numbers (θ = (1, −2, 3))", html: R`<p>The four (…)'s, as a list: \(X\theta - y = (0, 1, 3, 3)\). Each column of \(X\) dotted with it:</p>
<div class="tw"><table><thead><tr><th>row of \(\nabla J\)</th><th>column of \(X\)</th><th>· (0, 1, 3, 3)</th></tr></thead><tbody>
<tr><td>\(\theta_0\)</td><td>(1, 1, 1, 1)</td><td>0 + 1 + 3 + 3 = 7</td></tr>
<tr><td>\(\theta_1\)</td><td>(−1, −2, 1, 0)</td><td>0 − 2 + 3 + 0 = 1</td></tr>
<tr><td>\(\theta_2\)</td><td>(1, 0, 3, 1)</td><td>0 + 0 + 9 + 3 = 12</td></tr></tbody></table></div>
<p>So \(X^\top(X\theta - y) = (7, 1, 12)\): the three sums, done in one go.</p>` }] },
      ],
      compare: R`The official solution's first line is move 3's first line (the 2 already out of the sum, \(\theta^\top x^{(i)}\) for the prediction), and its last line is move 4.`,
      slip: R`The stem says \(x^{(i)} \in \mathbb R^p\), but here \(x^{(i)}\) quietly includes a leading 1 (it's row \(i\) of \(X\)), so \(\theta^\top x^{(i)} = \theta_0 + \sum_j \theta_j x^{(i)}_j\).`,
    },

    "2025C-q1.3": {
      point: R`<p>One gradient-descent step = plug the numbers into the gradient \(2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\) (part 2's answer), then \(\theta_{\text{new}} = \theta - 0.1\cdot\)gradient.</p>`,
      start: R`<p><b>The formula (from part 2), with the numbers plugged in:</b></p>\[\nabla J = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta) = \;\square\]<p><b>The step:</b></p>\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J = \;\square\]`,
      moves: [
        { line: R`<b>The formula</b> — part 2's answer, and the step rule: <div class="formula">\[\nabla J = \underbrace{\color{#e8912d}2X^\top(X\theta - y)}_{\textstyle\color{#e8912d}\text{from the squared brackets}} + \underbrace{\color{#4c8dff}\lambda\,\mathrm{sign}(\theta)}_{\textstyle\color{#4c8dff}\text{from }\lambda|\theta_j|}\]</div><div class="formula">\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J\]</div>We know \(\theta = (1, -2, 3)\), \(\lambda = 1\), and the step size 0.1 (the question's \(\eta\)).`,
          remember: R`\[w \leftarrow w - \eta\,\nabla J(w)\]<p>One gradient-descent step. Not on the sheet. Here \(w\) is \(\theta\), \(\eta = 0.1\).</p>`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 4}\,\underbrace{(X\theta - y)}_{\textstyle 4\times 1} = 3\times 1 \qquad \underbrace{\theta}_{\textstyle 3\times 1} - 0.1\cdot\underbrace{\nabla J}_{\textstyle 3\times 1}\]<p>The gradient has one entry per knob, like \(\theta\), so the step subtracts entry by entry ✓</p>`,
          why: R`<p>"One iteration of gradient descent" = compute the gradient at the current \(\theta\), then take one small step against it. The gradient points uphill, so we subtract it to go downhill.</p>
<p>Where the formula comes from: each squared bracket \((\theta_0 + \theta_1 x_1 + \theta_2 x_2 - y)^2\) → 2 · (…) · (the number in front of \(\theta_j\)); stacked over the three knobs that's \(2X^\top(X\theta - y)\). Each \(\lambda|\theta_j|\) → \(\lambda\,\mathrm{sign}(\theta_j)\), stacked: \(\lambda\,\mathrm{sign}(\theta)\). (Worked out step by step in part 2.)</p>` },
        { line: R`<b>Errors \(X\theta - y\)</b> — each row of \(X\) · \(\theta\) gives a prediction, then subtract the label: <div class="formula">\[X\theta - y = (6, 5, 8, 4) - (6, 4, 5, 1) = (0, 1, 3, 3)\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{\theta}_{\textstyle 3\times 1} - \underbrace{y}_{\textstyle 4\times 1} = \underbrace{\text{errors}}_{\textstyle 4\times 1}\]<p>inner 3 = 3 ✓ · four predictions minus four labels = four errors ✓</p>`,
          why: R`<p>Each prediction is one row of \(X\) (from part 1) times \(\theta = (1, -2, 3)\):</p>
<div class="tw"><table><thead><tr><th>row of \(X\)</th><th>· \(\theta = (1, -2, 3)\)</th><th>prediction</th></tr></thead><tbody>
<tr><td>(1, −1, 1)</td><td>1·1 + (−1)·(−2) + 1·3 = 1 + 2 + 3</td><td>6</td></tr>
<tr><td>(1, −2, 0)</td><td>1·1 + (−2)·(−2) + 0·3 = 1 + 4 + 0</td><td>5</td></tr>
<tr><td>(1, 1, 3)</td><td>1·1 + 1·(−2) + 3·3 = 1 − 2 + 9</td><td>8</td></tr>
<tr><td>(1, 0, 1)</td><td>1·1 + 0·(−2) + 1·3 = 1 + 0 + 3</td><td>4</td></tr></tbody></table></div>
<p>numpy: <code>X @ theta - y</code>.</p>` },
        { line: R`<b>The orange part \(2X^\top(X\theta - y)\)</b> — each column of \(X\) · the errors, then ×2: <div class="formula">\[2X^\top(X\theta - y) = 2\cdot(7, 1, 12) = (14, 2, 24)\]</div>`,
          size: R`\[\underbrace{X^\top}_{\textstyle 3\times 4}\,\underbrace{(0, 1, 3, 3)}_{\textstyle 4\times 1} = \underbrace{(7, 1, 12)}_{\textstyle 3\times 1}\]<p>inner 4 = 4 ✓ · result = 3 numbers, one per knob ✓ (one row of \(X^\top\) = one column of \(X\))</p>`,
          why: R`<p>\(X^\top\) times a list = each <b>column</b> of \(X\), dotted with that list (part 2, moves 3–4). The errors are \((0, 1, 3, 3)\):</p>
<div class="tw"><table><thead><tr><th>column of \(X\)</th><th>· errors (0, 1, 3, 3)</th><th>result</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 1)</td><td>0 + 1 + 3 + 3</td><td>7</td></tr>
<tr><td>(−1, −2, 1, 0)</td><td>0 − 2 + 3 + 0</td><td>1</td></tr>
<tr><td>(1, 0, 3, 1)</td><td>0 + 0 + 9 + 3</td><td>12</td></tr></tbody></table></div>
<p>numpy: <code>2 * X.T @ (X @ theta - y)</code>.</p>` },
        { line: R`<b>The blue part \(\lambda\,\mathrm{sign}(\theta)\)</b> — the sign of each knob, times \(\lambda = 1\): <div class="formula">\[1\cdot(\mathrm{sign}(1), \mathrm{sign}(-2), \mathrm{sign}(3)) = (1, -1, 1)\]</div>` },
        { line: R`<b>Put it together</b> — add the two parts, then take the step: <div class="formula">\[\nabla J = (14, 2, 24) + (1, -1, 1) = (15, 1, 25)\]</div><div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (1, -2, 3) - 0.1\cdot(15, 1, 25)\\ &= (1 - 1.5,\ -2 - 0.1,\ 3 - 2.5) = (-0.5,\ -2.1,\ 0.5)\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official solution says (15, 0, 25) — it's a slip", html: R`<p>\(2 + (-1) = 1\), not 0. So the middle gradient entry is 1, and the new middle knob is \(-2 - 0.1 = -2.1\) (the official solution prints \(-2\)). Its first line also says "\(\lambda = 2\)", but it then uses 1.</p>` }] },
      ],
      compare: R`Same steps as the official solution, except its slip: the correct gradient is (15, 1, 25) and the new θ is (−0.5, −2.1, 0.5).`,
      slip: R`<ul><li>The first line says \(\lambda = 2\), but the question says \(\lambda = 1\), and the working uses 1 anyway.</li><li>The middle gradient entry is \(2 + (-1) = 1\), not 0. So \(\nabla J = (15, 1, 25)\) and the new \(\theta = (-0.5, -2.1, 0.5)\), not \((-0.5, -2, 0.5)\).</li></ul>`,
    },

    "2025C-q1.4": {
      point: R`<p>It doesn't matter how \(\tilde\theta\) was found: \(\theta^*\) is the best \(\theta\) for \(J_\lambda\), so every other \(\theta\) gives a larger \(J_\lambda\). So \(J_\lambda(\theta^*) \lt J_\lambda(\tilde\theta)\).</p>`,
      moves: [
        { line: R`<b>\(\theta^*\) is the best \(\theta\) for \(J_\lambda\)</b> — gradient descent on \(J_\lambda\) ran until it converged.` },
        { line: R`<b>So any other \(\theta\) — like \(\tilde\theta\) — gives a larger \(J_\lambda\):</b> <div class="formula">\[J_\lambda(\theta^*) \lt J_\lambda(\tilde\theta)\]</div>Done.`,
          size: R`\[\underbrace{(X^\top X)^{-1}}_{\textstyle 3\times 3}\,\underbrace{X^\top}_{\textstyle 3\times 4}\,\underbrace{y}_{\textstyle 4\times 1} = \underbrace{\tilde\theta}_{\textstyle 3\times 1}\]<p>\(X^\top X\) = (3×4)(4×3) = 3×3, so its inverse is 3×3 · then (3×3)(3×4)(4×1) = 3×1 — one weight per knob, like \(\theta\) ✓</p>`,
          why: R`<p>Strictly "\(\lt\)" because \(\tilde\theta\) is a different \(\theta\): it was found without the penalty ([sheet: Least squares solution]), so it isn't \(J_\lambda\)'s best point.</p>` },
      ],
      compare: R`Same argument as the official solution: θ* minimizes \(J_{\lambda=1}\), θ̃ minimizes the plain squared error, so \(J_{\lambda=1}(\theta^*) \lt J_{\lambda=1}(\tilde\theta)\).`,
    },

    "2025C-q1.5": {
      point: R`<p>Cross-validation = train on the other folds, score plain squared error on the held-out fold, average over the folds, keep the \(\lambda\) with the smallest average. Each bug breaks one of these.</p>`,
      start: R`<p>One line per bug (write at least three):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      moves: [
        { line: R`<b>n counts samples = rows.</b> <b>Line 1:</b> <code>X.shape[1]</code> → <code>X.shape[0]</code>`,
          remember: R`<p><code>X.shape</code> = (rows, columns) = (samples, features) → <code>X.shape[0]</code> = number of samples.</p><p>numpy — not on the sheet.</p>`,
          size: R`<p><code>X.shape</code> = (n, 3) = (rows, columns) = (samples, 1 + features). So <code>shape[0]</code> = n ✓, <code>shape[1]</code> = 3 ✗.</p>`,
          why: R`<p><code>shape[0]</code> = number of rows (samples), <code>shape[1]</code> = number of columns (features + the ones column).</p>` },
        { line: R`<b>Validation uses only validation data, no penalty.</b> <b>Line 16:</b> → <code>y_pred = X_val @ w_star</code>. <b>Line 17:</b> <code>y_train</code> → <code>y_val</code>`,
          remember: R`<p>k-fold cross-validation, for each \(\lambda\): train on the other folds (with the penalty), score the held-out fold with <b>plain</b> squared error (no penalty), <b>average</b> over the folds; keep the \(\lambda\) with the <b>smallest</b> average.</p><p>Not on the sheet.</p>`,
          size: R`<p><code>X_val @ w_star</code>: (validation rows × 3) @ (3,) = one prediction per validation row ✓ — so compare with <code>y_val</code> (same length), not <code>y_train</code> (different length).</p>`,
          why: R`<p>The point of cross-validation: score the model on rows it didn't train on, with plain squared error. So predict the validation rows, compare with the validation labels, and don't add the penalty.</p>`,
          extra: [{ label: "why lines 16–17 and not 15–16?", html: R`<p>The official solution calls them 15 and 16, but on the printed page (the numbers in the left margin) they are 16 and 17. Either way, quote the statement itself so the grader can't miss it.</p>` }] },
        { line: R`<b>Keep the smallest average error.</b> <b>Line 20:</b> <code>&gt;</code> → <code>&lt;</code>. <b>Line 21:</b> <code>np.sum</code> → <code>np.mean</code>. Done (5 bugs; 3 are enough).`,
          why: R`<p>A \(\lambda\)'s score is the <b>average</b> error over the folds, and we keep the \(\lambda\) with the lowest score. So compare with <code>&lt;</code>, and store the same mean you compared.</p>` },
      ],
      compare: R`The official list has the same 5 bugs.`,
      slip: R`Two line numbers are off by one: the <code>y_pred</code> line is 16 and the <code>risk</code> line is 17 in the printed margin, not 15 and 16. Lines 1, 20 and 21 are right.`,
    },
  });
})();
