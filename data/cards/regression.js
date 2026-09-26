// Recipe cards for topic "regression". Standard: spec/CARDS.md. Built from data/notes/regression.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["regression"] = {
    intro: R`<p>Question 1 of every exam: a small table, a loss, and the same kinds of parts each time. Open question 1 below and go part by part: each part shows the recipe card(s) it needs, right above it. Read the card (1–2 min), do the part on paper, then check. Start with 2025-C (the cards use its numbers) and finish with 2026-B, your Moed B question.</p>`,
    cards: {
      "x-and-y": {
        title: "Write \\(X\\) and \\(y\\) (and \\(\\Gamma\\))",
        minutes: 1,
        cue: R`"Write down the data matrix \(X\) [and the target vector \(y\)] such that \(X\theta\) produces the vector of model responses \(\hat y\)" (2025-A, B, C Q1.1); "Specify matrices \(X\) and \(\Gamma\) and vector \(y\)" (2026-A Q1.1).`,
        lines: [
          R`One row per sample: \((1, x_1, x_2)\) — the 1 first; it multiplies the bias \(\theta_0\).`,
          R`\(y\) = the labels as one column, in the same row order.`,
          R`Weighted (2026-A): \(\Gamma = \mathrm{diag}(\gamma_1, \dots, \gamma_n)\) — the weights on the diagonal, 0 everywhere else.`,
        ],
        numbers: R`<p>2025-C's table, row by row: \((x_1, x_2) = (-1, 1)\) becomes \((1, -1, 1)\), and so on:</p>
\[X = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix},\qquad y = \begin{bmatrix}6\\4\\5\\1\end{bmatrix}\]
<p>Test row 1 with \(\theta = (1,-2,3)\): \((1,-1,1)\cdot(1,-2,3) = 1 + 2 + 3 = 6 = \hat y_1\).</p>`,
        check: R`\(X\) is \(n\times 3\) (here \(4\times 3\)), \(y\) is \(n\times 1\), \(\Gamma\) is \(n\times n\).`,
        trap: R`Forgetting the ones column loses this part and breaks every later part (predictions, gradient, code).`,
        why: [
          [R`Why a 1 in front of every row?`, R`<p>The prediction is \(\hat y = \theta_0 + \theta_1 x_1 + \theta_2 x_2\). Two terms are "weight × feature"; the bias \(\theta_0\) is not multiplied by anything. Multiply it by 1, which changes nothing: \(\hat y = \theta_0\cdot 1 + \theta_1 x_1 + \theta_2 x_2\). Now the prediction is the dot product of \((1, x_1, x_2)\) with \((\theta_0, \theta_1, \theta_2)\). Stack those rows and you get \(X\) — its first column is all ones.</p>`],
          [R`Why does \(X\theta\) give every prediction at once?`, R`<p>Matrix × vector = the dot product of <b>each row</b> with the vector. Row \(i\) of \(X\) is sample \(i\)'s \((1, x_1, x_2)\), so entry \(i\) of \(X\theta\) is \(\hat y_i\). For 2025-C and \(\theta = (1,-2,3)\): \(X\theta = (6, 5, 8, 4)\), and \(X\theta - y = (0, 1, 3, 3)\) — all four residuals.</p>`],
          [R`Why is \(\Gamma\) diagonal?`, R`<p>A diagonal matrix times a vector multiplies each entry by its own diagonal number: \(\Gamma r = (\gamma_1 r_1, \dots, \gamma_n r_n)\) — each sample's residual times its own weight, no mixing between samples. 2026-A: \(\gamma = (2,1,1,2)\) gives the \(4\times 4\) matrix \(\Gamma = \mathrm{diag}(2,1,1,2)\).</p>`],
        ],
        side: R`<ul>
<li>2026-A and 2026-B call the weights \(w\) instead of \(\theta\) — same thing.</li>
<li>2025-A Q1.1 asks only for \(X\); the others also want \(y\) (and 2026-A \(\Gamma\)).</li>
</ul>`,
      },
      "loss-forms": {
        title: "The loss: sum form = matrix form",
        minutes: 2,
        cue: R`The stem defines \(J\) as a sum; part 1 writes the <b>same</b> \(J\) as a matrix formula: "such that \(J_\lambda(\theta) = \|X\theta - y\|^2 + \lambda\|\theta\|_1\)" (2025-C), "\(J(w; D, \gamma) = (Xw - y)^\top\Gamma(Xw - y)\)" (2026-A).`,
        lines: [
          R`The bracket \(\big(\theta_0 + \sum_j \theta_j x^{(i)}_j - y^{(i)}\big)\) is the residual \(r_i\) = entry \(i\) of \(X\theta - y\).`,
          R`\(\sum_i r_i^2 = \|X\theta - y\|^2 = (X\theta - y)^\top(X\theta - y)\): each residual times itself, added up.`,
          R`Weighted: \(\sum_i \gamma_i r_i^2 = (Xw - y)^\top\,\Gamma\,(Xw - y)\) — \(\Gamma\) between the two copies.`,
          R`Penalty: LASSO \(\lambda\|\theta\|_1 = \lambda(|\theta_0| + |\theta_1| + |\theta_2|)\); ridge \(\lambda(\|\theta\|^2 - \theta_0^2) = \lambda(\theta_1^2 + \theta_2^2)\).`,
        ],
        numbers: R`<p>2025-C, \(\theta = (1,-2,3)\), \(\lambda = 1\): \(r = (6,5,8,4) - (6,4,5,1) = (0,1,3,3)\).</p>
<ul>
<li>\(\|X\theta - y\|^2 = 0^2 + 1^2 + 3^2 + 3^2 = 0 + 1 + 9 + 9 = 19\)</li>
<li>\(\lambda\|\theta\|_1 = 1\cdot(|1| + |-2| + |3|) = 1 + 2 + 3 = 6\)</li>
<li>\(J_1(1,-2,3) = 19 + 6 = 25\)</li>
</ul>`,
        trap: R`Read the stem's penalty: ridge leaves \(\theta_0\) out; 2025-C's LASSO keeps it.`,
        why: [
          [R`Why square, and why is that \(r^\top r\)?`, R`<p>Just adding the residuals lets \(+3\) and \(-3\) cancel to 0, which looks perfect although both predictions are wrong. Squaring first makes every term \(\ge 0\). "Square each entry, then add" is the dot product of \(r\) with itself: \(r^\top r = r_1 r_1 + \dots + r_n r_n\), also written \(\|r\|^2\).</p>`],
          [R`Why does \(\Gamma\) sit in the middle?`, R`<p>Each sample should contribute \(\gamma_i\cdot r_i\cdot r_i\). \(\Gamma r = (\gamma_1 r_1, \dots, \gamma_n r_n)\) supplies the weight and <b>one</b> copy of \(r_i\). The \(r^\top\) on the left supplies the <b>second</b> copy, which does the squaring: \(r^\top\Gamma r = \sum_i r_i\cdot\gamma_i r_i = \sum_i \gamma_i r_i^2\).</p>
<p>2026-A at \(w = 0\): \(r = (-1,-2,-4,-5)\), \(\Gamma r = (-2,-2,-4,-10)\). Adding \(\Gamma r\) alone gives \(-18\), a negative "loss"; \(r^\top\Gamma r = 2 + 4 + 16 + 50 = 72\) ✓.</p>`],
          [R`Why does ridge leave out \(\theta_0\)?`, R`<p>\(\|\theta\|^2 = \theta_0^2 + \theta_1^2 + \theta_2^2\); subtracting \(\theta_0^2\) leaves \(\theta_1^2 + \theta_2^2\). The bias only shifts every prediction by the same amount, so it is not what makes a model overreact to its features. 2025-C's LASSO writes \(|\theta_0|\) explicitly, so there it is included.</p>`],
        ],
        side: R`<ul>
<li><b>Why penalties exist.</b> Very large weights are a sign of overfitting; a penalty makes them cost something. \(\lambda \ge 0\) is the dial — a hyperparameter, chosen by cross-validation.</li>
<li>Ridge on the same 2025-C numbers (illustration): \(1\cdot((-2)^2 + 3^2) = 13\), so \(J = 19 + 13 = 32\).</li>
<li>The formula sheet's loss has a \(\tfrac12\); the exam losses don't. Scaling a loss doesn't change which \(\theta\) is best.</li>
<li>Cubic (2026-B): each sample contributes \(|r_i|^3\); the absolute value stops negative residuals from lowering the loss.</li>
</ul>`,
      },
      "gradient": {
        title: "The gradient of the squared error",
        minutes: 2,
        cue: R`"Express the gradient of \(J\) as a function of \(X, y, \theta\). Do not use numeric values."`,
        lines: [
          R`\(r_i = \theta^\top x^{(i)} - y_i\), so \(J = \sum_i r_i^2\), and \(\dfrac{\partial r_i}{\partial\theta_j} = x^{(i)}_j\) ("seen in class").`,
          R`Chain rule, one sample at a time: \(\dfrac{\partial J}{\partial\theta_j} = \sum_i 2r_i\,x^{(i)}_j\).`,
          R`Stack the entries \(j = 0, 1, 2\): \(\nabla J = 2X^\top(X\theta - y)\).`,
        ],
        numbers: R`<p>2025-C, \(\theta = (1,-2,3)\), residuals \(r = (0,1,3,3)\). Each entry of \(X^\top r\) is a column of \(X\) dotted with \(r\):</p>
<ul>
<li>\((1,1,1,1)\cdot(0,1,3,3) = 0+1+3+3 = 7\)</li>
<li>\((-1,-2,1,0)\cdot(0,1,3,3) = 0-2+3+0 = 1\)</li>
<li>\((1,0,3,1)\cdot(0,1,3,3) = 0+0+9+3 = 12\)</li>
</ul>
<p>\(\nabla J = 2\cdot(7,1,12) = (14, 2, 24)\).</p>`,
        check: R`\(X^\top\) is \(3\times4\), \(X\theta - y\) is \(4\times1\) → the answer is \(3\times1\): one entry per knob. Not \(X(X\theta - y)\).`,
        why: [
          [R`Why line 1? What \(\partial r_i/\partial\theta_j\) means`, R`<p>A <b>partial derivative</b> \(\partial J/\partial\theta_j\) asks: if I turn only knob \(\theta_j\) a tiny bit and hold the others still, how fast does \(J\) change? You compute it like an ordinary derivative, treating the other knobs as constants.</p>
<p>Write out one residual: \(r_i = \theta_0\cdot 1 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y_i\). Differentiate with respect to \(\theta_1\): only \(\theta_1 x^{(i)}_1\) contains \(\theta_1\); everything else is a constant (derivative 0). So \(\partial r_i/\partial\theta_1 = x^{(i)}_1\). For \(\theta_0\) the "feature" is the constant 1 — the ones column of \(X\).</p>`],
          [R`Why line 2? The chain rule on \(r_i^2\)`, R`<p>Sample \(i\) contributes \(r_i^2\). Outer derivative × inner derivative: \(\dfrac{\partial}{\partial\theta_j} r_i^2 = 2r_i\cdot\dfrac{\partial r_i}{\partial\theta_j} = 2r_i\,x^{(i)}_j\). The derivative of a sum is the sum of the derivatives, so add over \(i\).</p>`],
          [R`Why line 3? Where \(X^\top\) comes from`, R`<p>Pull the 2 out: \(\dfrac{\partial J}{\partial\theta_j} = 2\left(x^{(1)}_j r_1 + x^{(2)}_j r_2 + \dots + x^{(n)}_j r_n\right)\). The numbers \(x^{(1)}_j, \dots, x^{(n)}_j\) are feature \(j\) of every sample — <b>column \(j\) of \(X\)</b>. So the bracket is (column \(j\) of \(X\)) · \(r\). \(X^\top\) turns the columns of \(X\) into rows, so \(X^\top r\) does all three dot products at once: \(\nabla J = 2X^\top r = 2X^\top(X\theta - y)\).</p>`],
          [R`Only for 2026-B Q1.3 and the code: the same gradient as \(\sum_i z_i x^{(i)}\)`, R`<p>Read line 2 per sample instead of per column: \(\nabla J = \sum_i 2r_i\,x^{(i)}\), where \(x^{(i)}\) is row \(i\) of \(X\). Call each row's multiplier \(z_i = 2r_i\). Then \(\nabla J = \sum_i z_i x^{(i)} = X^\top z\) — the form 2026-B asks for, and the <code>X.T @ z</code> in the code.</p>
<p>Same numbers: \(z = (0,2,6,6)\), so \(0\cdot(1,-1,1) + 2\cdot(1,-2,0) + 6\cdot(1,1,3) + 6\cdot(1,0,1) = (0,0,0) + (2,-4,0) + (6,6,18) + (6,0,6) = (14,2,24)\).</p>`],
        ],
        side: R`<ul>
<li><b>Formula sheet.</b> It gives \(\nabla_w\left[\tfrac12(y - w^\top x)^2\right] = (w^\top x - y)\,x\): one sample, with a \(\tfrac12\) that cancels the chain-rule 2. The exam losses have no \(\tfrac12\), so keep the 2.</li>
<li><b>What the gradient means.</b> It points uphill — the direction in which \(J\) grows fastest. Gradient descent steps the other way, \(-\nabla J\).</li>
</ul>`,
      },
      "penalty-gradients": {
        title: "Gradients of the penalties (LASSO, ridge)",
        minutes: 2,
        cue: R`"Express the gradient of \(J_\lambda(\theta)\) as a function of \(X, y, \theta, \lambda\)" (2025-C Q1.2, LASSO: "you may assume that all entries of \(\theta\) are non-zero"; 2025-A Q1.3a, ridge).`,
        lines: [
          R`Split: \(\nabla J_\lambda = 2X^\top(X\theta - y) + \nabla(\text{penalty})\).`,
          R`Differentiate the penalty one weight at a time: \(\partial/\partial\theta_j\) only sees the term containing \(\theta_j\).`,
          R`LASSO: \(\dfrac{d}{da}|a| = \mathrm{sign}(a)\), so \(\nabla J_\lambda = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\).`,
          R`Ridge: \(\partial/\partial\theta_0 = 0\), \(\partial/\partial\theta_j = 2\lambda\theta_j\), so \(\nabla J_\lambda = 2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\).`,
        ],
        numbers: R`<p>2025-C, \(\theta = (1,-2,3)\), \(\lambda = 1\); the fit part is \((14, 2, 24)\) (same as card "gradient").</p>
<ul>
<li>\(\lambda\,\mathrm{sign}(\theta) = 1\cdot(+1, -1, +1) = (1, -1, 1)\)</li>
<li>\(\nabla J_\lambda = (14 + 1,\ 2 - 1,\ 24 + 1) = (15, 1, 25)\)</li>
</ul>`,
        trap: R`Ridge: first entry 0 (bias not penalized) and a factor 2. LASSO: no factor 2 (\(|\theta_j|\) has slope \(\pm 1\)), and 2025-C's includes \(\theta_0\).`,
        why: [
          [R`Why can we just add the two gradients?`, R`<p>The derivative of a sum is the sum of the derivatives. \(J_\lambda\) = fit term + penalty term, so \(\nabla J_\lambda\) = (gradient of the fit) + (gradient of the penalty). The fit part is always \(2X^\top(X\theta - y)\).</p>`],
          [R`Why is the derivative of \(|a|\) the sign of \(a\)?`, R`<p>\(|a|\) has two straight pieces: \(|a| = a\) for \(a > 0\) (slope \(+1\)) and \(|a| = -a\) for \(a \lt 0\) (slope \(-1\)). At \(a = 0\) there is a corner and no derivative — that is why 2025-C lets you assume every \(\theta_j \ne 0\). So \(\dfrac{\partial}{\partial\theta_j}\lambda(|\theta_0| + |\theta_1| + |\theta_2|) = \lambda\,\mathrm{sign}(\theta_j)\).</p>`],
          [R`Why the 0 in ridge's first entry?`, R`<p>The ridge penalty \(\lambda(\theta_1^2 + \theta_2^2)\) contains no \(\theta_0\), so its derivative with respect to \(\theta_0\) is 0. With respect to \(\theta_1\): \(\lambda\cdot 2\theta_1\); same for \(\theta_2\). Stacked: \((0, 2\lambda\theta_1, 2\lambda\theta_2) = 2\lambda(0, \theta_1, \theta_2)\) — the official 2025-A Q1.3a answer.</p>`],
        ],
        side: R`<ul>
<li><b>Official-solution slip (2025-C Q1.3).</b> It prints the middle entry of \((15, 1, 25)\) as 0, but \(2 + (-1) = 1\). Its first line also says "\(\lambda = 2\)" and then correctly uses \(\lambda = 1\).</li>
<li>Ridge on the same numbers (illustration): \(2\cdot 1\cdot(0, -2, 3) = (0, -4, 6)\), total \((14, -2, 30)\).</li>
<li>LASSO pushes every weight by the same \(\pm\lambda\) — that constant push can drive a weight to exactly 0 (the "selection" in its name). Ridge's push \(2\lambda\theta_j\) fades as the weight shrinks.</li>
</ul>`,
      },
      "z-recipe": {
        title: "Other per-sample losses: the \\(z_i\\) recipe (weighted, cubic)",
        minutes: 2,
        cue: R`"Write an expression for the gradient \(\nabla J(w)\) … as a function of \(w, X, \Gamma, y\)" (2026-A Q1.2); "represent it as \(\nabla J(w) = \sum_i z_i x^{(i)}\) … write \(z_i\) as a function of \(x^{(i)}, y_i, w\)" (2026-B Q1.3).`,
        lines: [
          R`\(r_i = w^\top x^{(i)} - y_i\) and \(\dfrac{\partial r_i}{\partial w_j} = x^{(i)}_j\).`,
          R`Sample \(i\) contributes \(\ell(r_i)\). Chain rule: \(\dfrac{\partial J}{\partial w_j} = \sum_i \ell'(r_i)\,x^{(i)}_j\).`,
          R`So \(\nabla J = \sum_i z_i x^{(i)} = X^\top z\), with \(z_i = \ell'(r_i)\).`,
          R`Weighted, \(\gamma_i r_i^2\): \(z_i = 2\gamma_i r_i\), so \(\nabla J = 2X^\top\Gamma(Xw - y)\).`,
          R`Cubic, \(|r_i|^3\): \(z_i = 3|r_i|^2\,\mathrm{sign}(r_i) = 3r_i^2\,\mathrm{sign}(r_i)\).`,
        ],
        numbers: R`<p>2026-B's training rows, \(w = (2, 0.1, 1)\) from Q1.1a (illustration): \(r = (-1, 1, -1, -1, -2)\).</p>
<ul>
<li>\(z_1 = 3\cdot(-1)^2\cdot(-1) = -3\), \(z_2 = 3\cdot 1^2\cdot(+1) = 3\), \(z_3 = z_4 = -3\)</li>
<li>\(z_5 = 3\cdot(-2)^2\cdot(-1) = -12\)</li>
<li>entry 0 of \(\sum_i z_i x^{(i)}\) (ones column): \(-3 + 3 - 3 - 3 - 12 = -18\)</li>
</ul>`,
        check: R`\(X^\top\,\Gamma\,(Xw - y)\): \((3\times4)(4\times4)(4\times1) = 3\times1\). \(\Gamma\) sits between \(X^\top\) and the residuals.`,
        trap: R`\(z_i\) is the <b>derivative</b> of the loss, not the loss (Moed B: <code>np.abs(r)**3</code>). Keep \(\mathrm{sign}(r_i)\).`,
        why: [
          [R`Why does only \(z_i\) change between losses?`, R`<p>For any per-sample loss \(J = \sum_i \ell_i(r_i)\), the chain rule gives \(\dfrac{\partial J}{\partial w_j} = \sum_i \ell_i'(r_i)\cdot\dfrac{\partial r_i}{\partial w_j} = \sum_i \ell_i'(r_i)\,x^{(i)}_j\). The "\(\times\, x^{(i)}_j\), add over \(i\)" part comes from \(r_i\) and is the same for every loss; only \(\ell_i'\) depends on the loss. Check with the squared error: \(\ell = r^2\), \(\ell' = 2r\), \(z_i = 2r_i\) ✓.</p>`],
          [R`Why \(2X^\top\Gamma(Xw - y)\) for the weighted loss?`, R`<p>\(\gamma_i\) is a fixed number, so \(\dfrac{d}{dr}(\gamma_i r^2) = 2\gamma_i r\) and \(z_i = 2\gamma_i r_i\). The vector of these is \(2\Gamma r\), because \(\Gamma r = (\gamma_1 r_1, \dots, \gamma_n r_n)\). So \(\nabla J = X^\top z = 2X^\top\Gamma(Xw - y)\). The official solution deducted points when \(\Gamma\) was put anywhere else. The sum form \(\sum_i 2\gamma_i r_i\,x^{(i)}\) is also allowed ("You may use matrix operations or a sum over samples").</p>`],
          [R`Why \(3r^2\,\mathrm{sign}(r)\) for the cubic loss?`, R`<p>Chain rule with outer \((\cdot)^3\) and inner \(|r|\): \(\dfrac{d}{dr}|r|^3 = 3|r|^2\cdot\dfrac{d}{dr}|r| = 3|r|^2\,\mathrm{sign}(r)\), and \(|r|^2 = r^2\). The full derivation to write (the official order):</p>
\[\frac{\partial J}{\partial w_j} = \sum_i 3|r_i|^2\,\frac{\partial |r_i|}{\partial w_j} = \sum_i 3r_i^2\,\mathrm{sign}(r_i)\,\frac{\partial r_i}{\partial w_j} = \sum_i 3r_i^2\,\mathrm{sign}(r_i)\,x^{(i)}_j\]
<p>Without \(\mathrm{sign}(r_i)\) every \(z_i\) would be \(\ge 0\), and the gradient couldn't tell "too high" from "too low".</p>`],
        ],
        side: R`<ul>
<li>Weighted with numbers (2026-A at \(w = 0\), illustration): \(r = (-1,-2,-4,-5)\), \(z = (2\cdot2\cdot(-1),\ 2\cdot1\cdot(-2),\ 2\cdot1\cdot(-4),\ 2\cdot2\cdot(-5)) = (-4, -4, -8, -20)\), \(\nabla J = X^\top z = (-36, -52, -32)\).</li>
<li>The full cubic gradient at \(w = (2, 0.1, 1)\) is \((-18, -630, -12)\); entry 1 is huge only because the \(x_1\) values (20–40) are large.</li>
<li>In code it is always <code>X.T @ z</code> — only the <code>z = …</code> line changes.</li>
</ul>`,
      },
      "gd-step": {
        title: "One gradient descent step by hand",
        minutes: 2,
        cue: R`"Execute / evaluate one iteration of gradient descent … \(\theta = \dots\), \(\eta = 0.1\), \(\lambda = 1\). Show all intermediate calculations" (2025-A Q1.3b, 2025-B Q1.4, 2025-C Q1.3).`,
        lines: [
          R`Residuals \(r = X\theta - y\).`,
          R`Fit gradient \(2X^\top r\): each entry = one column of \(X\) dotted with \(r\), times 2.`,
          R`Add the penalty gradient (LASSO \(\lambda\,\mathrm{sign}(\theta)\), ridge \(2\lambda(0,\theta_1,\theta_2)\)).`,
          R`Update entry by entry: \(\theta_j - \eta\,(\nabla J)_j\). Write every vector down — each earns partial credit.`,
          R`Start at \(\theta = 0\)? Then \(r = -y\), ridge adds 0, and \(\theta_{\text{new}} = 2\eta X^\top y\) — also with \(X', y'\) (its extra labels are 0).`,
        ],
        numbers: R`<p>2025-C Q1.3: \(\theta = (1,-2,3)\), \(\lambda = 1\), \(\eta = 0.1\).</p>
<ul>
<li>\(r = (6,5,8,4) - (6,4,5,1) = (0,1,3,3)\)</li>
<li>\(2X^\top r = 2\cdot(7,1,12) = (14,2,24)\); plus \((1,-1,1)\) gives \((15,1,25)\)</li>
<li>\(1 - 0.1\cdot 15 = -0.5\); \(-2 - 0.1\cdot 1 = -2.1\); \(3 - 0.1\cdot 25 = 0.5\)</li>
</ul>
<p>\(\theta_{\text{new}} = (-0.5, -2.1, 0.5)\).</p>`,
        trap: R`The update <b>subtracts</b>: \(\theta - \eta\nabla J\). At \(\theta = 0\) two minus signs cancel: \(\nabla J = -2X^\top y\), so \(\theta_{\text{new}} = +2\eta X^\top y\).`,
        why: [
          [R`Why minus the gradient?`, R`<p>The gradient points uphill — the direction in which \(J\) grows fastest. To lower \(J\), step the other way. A knob whose gradient entry is positive (turning it up makes the loss worse) gets turned down. \(\eta\), the learning rate, sets how far: small = slow but safe, large = can overshoot the bottom.</p>`],
          [R`Why is \(\theta = 0\) a shortcut?`, R`<p>\(X\cdot 0 = 0\), so \(r = 0 - y = -y\), and the fit gradient is \(2X^\top(-y) = -2X^\top y\). The ridge gradient \(2\lambda(0, 0, 0)\) is 0, so the penalty has no effect on the first step. Update: \(0 - \eta\cdot(-2X^\top y) = 2\eta X^\top y\). So compute \(X^\top y\) (one column of \(X\) dotted with \(y\) per entry) and multiply by \(2\eta = 0.2\).</p>
<p>With 2025-B's \(X', y'\): the two extra rows have label 0, so they add nothing to \(X'^\top y'\).</p>`],
          [R`Why doesn't a LASSO run start at 0?`, R`<p>\(\mathrm{sign}(0)\) is undefined (the corner of \(|a|\)). That is why 2025-C starts at \((1,-2,3)\).</p>`],
        ],
        side: R`<ul>
<li><b>Official-solution slip (2025-C Q1.3).</b> The middle gradient entry is printed as 0 (it is \(2 - 1 = 1\)), so it prints \(-2\) instead of \(-2.1\). The "\(\lambda = 2\)" on its first line is a typo; it uses 1.</li>
<li><b>Overshoot.</b> At \((-0.5,-2.1,0.5)\) the LASSO loss is \(53.51 + 3.1 = 56.61\), up from 25: \(\eta = 0.1\) is too big for this table. The exam doesn't ask, and the answer stays the same.</li>
<li>The shortcut on 2025-C's table (illustration): \(X^\top y = (16, -9, 22)\), so \(\theta_{\text{new}} = 0.2\cdot(16,-9,22) = (3.2, -1.8, 4.4)\).</li>
</ul>`,
      },
      "loss-polynomial": {
        title: "The loss as a degree-2 polynomial (2025-A Q1.2)",
        minutes: 2,
        cue: R`"Argue that … there exist ten scalar values \(a_0, a_1, a_2, b_{01}, b_{02}, b_{12}, c_0, c_1, c_2, d\) such that \(J_\lambda(\theta; D) = a_0\theta_0^2 + \dots + d\) … Conclude your argument by reporting the values of \(a_1\) and \(d\)" (2025-A Q1.2).`,
        lines: [
          R`Write \(J\) as one squared bracket per row, with the table's numbers, plus \(\lambda(\theta_1^2 + \theta_2^2)\).`,
          R`Each bracket is degree 1 in \(\theta\); its square is degree 2; the penalty is degree 2; a sum of degree-2 terms is degree 2 → the ten-term form.`,
          R`\(a_1\), the coefficient of \(\theta_1^2\): \(\sum_i \big(x^{(i)}_1\big)^2 + \lambda\).`,
          R`\(d\), the constant: \(J(0,0,0) = \sum_i y_i^2\).`,
        ],
        numbers: R`<p>2025-C's table, plain loss (\(\lambda = 0\); illustration — 2025-A is yours):</p>
<ul>
<li>row 1: \((\theta_0 - \theta_1 + \theta_2 - 6)^2\), and so on</li>
<li>\(a_1\): \(x_1 = (-1,-2,1,0)\), so \(1 + 4 + 1 + 0 = 6\) (with ridge: \(6 + \lambda\))</li>
<li>\(d\): \(y = (6,4,5,1)\), so \(36 + 16 + 25 + 1 = 78\)</li>
</ul>`,
        trap: R`\(a_1\) needs the \(+\lambda\) (the penalty contains \(\lambda\theta_1^2\)); \(d\) has no \(\lambda\) (the penalty is 0 at \(\theta = 0\)).`,
        why: [
          [R`Why is a squared bracket degree 2?`, R`<p>\((a + b + c + e)^2\) multiplies every term by every term: \(a^2 + b^2 + \dots + 2ab + 2ac + \dots\). Each product is knob × knob, knob × number or number × number — never \(\theta^3\). The official solution accepts "this is a quadratic expression" as the argument.</p>`],
          [R`Why is \(a_1 = \sum_i (x^{(i)}_1)^2 + \lambda\)?`, R`<p>Each bracket is \(\theta_0 + x^{(i)}_1\theta_1 + x^{(i)}_2\theta_2 - y_i\). When you square it, \(\theta_1^2\) can only come from \((x^{(i)}_1\theta_1)^2 = (x^{(i)}_1)^2\theta_1^2\); every other product has at most one \(\theta_1\). One such term per row, plus \(\lambda\theta_1^2\) from the penalty. In the same way \(a_0 = n\) (the \(\theta_0\) term is \(1\cdot\theta_0\), and no penalty).</p>`],
          [R`Why is \(d = J(0,0,0)\)?`, R`<p>Put every \(\theta_j = 0\) into the ten-term form: every term with a \(\theta\) vanishes and only \(d\) is left. In \(J\) itself each bracket becomes \(-y_i\) and the penalty becomes 0, so \(d = \sum_i (-y_i)^2 = \sum_i y_i^2\).</p>`],
        ],
        side: R`<ul>
<li>All ten on 2025-C's table (\(\lambda = 0\), numpy-checked): \(a = (4, 6, 11)\), \(b_{01} = -4\), \(b_{02} = 10\), \(b_{12} = 4\), \(c = (-32, 18, -44)\), \(d = 78\). At \(\theta = (1,-2,3)\) they give 19, the same \(J\) as before.</li>
<li>The \(c\)'s equal the gradient at \(\theta = 0\).</li>
<li>LASSO's \(|\theta_j|\) is not a polynomial, so 2025-C's loss has no such form.</li>
</ul>`,
      },
      "closed-form": {
        title: "Closed form: set the gradient to zero",
        minutes: 2,
        cue: R`"We wish to analytically find \(\theta^*\) … Is this possible? Explain" (2025-B Q1.3); "Find a formula for \(w^*\) … explicit and contain only numerical matrices and vectors" (2026-A Q1.3).`,
        lines: [
          R`Set the gradient to 0: \(2X^\top(X\theta - y) = 0\).`,
          R`Open the bracket, move the \(y\) term over: \(X^\top X\,\theta = X^\top y\).`,
          R`"If \(X^\top X\) is invertible": \(\theta^* = (X^\top X)^{-1}X^\top y\) (on the formula sheet).`,
          R`Weighted: the same steps give \(w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\); for 2026-A write the numeric \(X, \Gamma, y\) inside.`,
          R`"Is it possible?" Yes if the gradient is linear in \(\theta\) (plain, weighted, ridge via \(X', y'\)). No for LASSO (\(\mathrm{sign}(\theta)\)).`,
        ],
        numbers: R`<p>2025-C, plain loss (this is Q1.4's \(\tilde\theta\)). Each entry of \(X^\top X\) is column · column, e.g. \(c_0\cdot c_1 = -1 - 2 + 1 + 0 = -2\):</p>
\[X^\top X = \begin{bmatrix}4&-2&5\\-2&6&2\\5&2&11\end{bmatrix},\quad X^\top y = \begin{bmatrix}16\\-9\\22\end{bmatrix},\quad \tilde\theta \approx (-3.14, -3.93, 4.14)\]
<p>(numpy — no inverting by hand).</p>`,
        check: R`\(X^\top X\) is \(3\times3\); \(XX^\top\) would be \(4\times4\) — wrong order.`,
        trap: R`Weighted: \(\Gamma\) appears <b>twice</b> — between \(X^\top\) and \(X\), and between \(X^\top\) and \(y\).`,
        why: [
          [R`Why "gradient = 0"?`, R`<p>At the lowest point the ground is flat: every partial derivative is 0. For squared-error losses the gradient \(2X^\top X\theta - 2X^\top y\) is <b>linear</b> in \(\theta\) (no squares, no signs), so "= 0" is 3 linear equations in 3 unknowns, solvable with matrix algebra. It is a minimum, not a maximum, because the squared error is bowl-shaped (convex).</p>`],
          [R`Why "if invertible"?`, R`<p>\((X^\top X)^{-1}\) exists when the columns of \(X\) are linearly independent, which needs at least as many samples as columns (\(n \ge p + 1\)). Say "if \(X^\top X\) is invertible" in the answer.</p>`],
          [R`The weighted version, step by step`, R`\[2X^\top\Gamma(Xw - y) = 0 \;\Rightarrow\; X^\top\Gamma Xw - X^\top\Gamma y = 0 \;\Rightarrow\; X^\top\Gamma X\,w = X^\top\Gamma y \;\Rightarrow\; w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\]
<p>You don't have to compute the inverse. The 2026-A hint's route (duplicate rows, or \(A^\top A = \Gamma\)) gives the same formula.</p>`],
          [R`Why no closed form for LASSO?`, R`<p>Its gradient \(2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\) contains \(\mathrm{sign}(\theta)\), which jumps from \(-1\) to \(+1\) and has no value at 0. You can't isolate \(\theta\), so LASSO needs gradient descent — which is exactly what 2025-C does.</p>`],
        ],
        side: R`<ul>
<li>\((X^\top X)^{-1}X^\top\) is the <b>pseudo-inverse</b> of \(X\) — the "pseudo-inverse matrix" in the 2026-A hint.</li>
<li>Exact 2025-C values: \(\tilde\theta = (-\tfrac{22}{7}, -\tfrac{55}{14}, \tfrac{29}{7})\). Its residuals \((-\tfrac{15}{14}, \tfrac{10}{14}, \tfrac{5}{14}, 0)\) dot every column of \(X\) to 0 (gradient 0 ✓); its squared error is \(\tfrac{25}{14} \approx 1.79\).</li>
<li>Ridge adds \(\lambda\) to the \(\theta_1, \theta_2\) diagonal entries: \(X'^\top X' = X^\top X + \lambda\,\mathrm{diag}(0,1,1)\).</li>
</ul>`,
      },
      "x-prime": {
        title: "Fold the penalty or the weights into \\(X'\\), \\(y'\\)",
        minutes: 2,
        cue: R`"There is a matrix \(X'\) and a vector \(y'\) … \(J_\lambda(\theta) = \|X'\theta - y'\|^2\). Write down \(X'\) and \(y'\) as a function of \(\lambda\)" (2025-B Q1.2); 2026-A Q1.3's hint: "Duplicate some data points", or multiply by \(A\) with \(A^\top A = \Gamma\).`,
        lines: [
          R`Write each penalty term as (row · \(\theta\) − label)²: \(\lambda\theta_1^2 = (0\cdot\theta_0 + \sqrt\lambda\,\theta_1 + 0\cdot\theta_2 - 0)^2\).`,
          R`Its coefficients are an extra row \((0, \sqrt\lambda, 0)\), label 0; likewise \((0, 0, \sqrt\lambda)\) for \(\theta_2\). No row for \(\theta_0\).`,
          R`\(X'\) = \(X\) plus those two rows; \(y'\) = \(y\) plus two 0s.`,
          R`Plain least squares now: \(\theta^* = (X'^\top X')^{-1}X'^\top y'\), \(\nabla J = 2X'^\top(X'\theta - y')\).`,
          R`Weighted: repeat row \(i\) and \(y_i\) \(\gamma_i\) times (whole numbers), or scale both by \(\sqrt{\gamma_i}\).`,
        ],
        numbers: R`<p>2025-C with ridge (illustration), \(\lambda = 1\), \(\theta = (1,-2,3)\): new rows \((0,1,0)\), \((0,0,1)\), labels 0, residuals \(-2\) and \(3\):</p>
\[\|X'\theta - y'\|^2 = \underbrace{0 + 1 + 9 + 9}_{\text{fit} = 19} + \underbrace{4 + 9}_{\text{penalty} = 13} = 32\]
<p>The fake rows <i>are</i> the penalty.</p>`,
        trap: R`The row gets \(\sqrt\lambda\), not \(\lambda\) — it is squared inside the loss.`,
        why: [
          [R`Why can a penalty term become a row?`, R`<p>\(\|X'\theta - y'\|^2\) is a sum with one term per row: (row · \(\theta\) − label)². Any loss term of that shape can be one more row. \(\lambda\theta_1^2 = (\sqrt\lambda\,\theta_1)^2\), and \(\sqrt\lambda\,\theta_1 = (0, \sqrt\lambda, 0)\cdot\theta - 0\). LASSO's \(\lambda|\theta_j|\) is not the square of such a bracket, so it can't be folded in.</p>`],
          [R`Why does duplicating rows work (2026-A)?`, R`<p>\(\gamma = (2,1,1,2)\): weight 2 means "this sample's squared error counts twice" — the same as the sample appearing twice. Copy rows 1 and 4 and their labels:</p>
\[X' = \begin{bmatrix}1&1&0\\1&1&0\\1&0&1\\1&1&1\\1&2&1\\1&2&1\end{bmatrix},\quad y' = \begin{bmatrix}1\\1\\2\\4\\5\\5\end{bmatrix},\quad w^* = (X'^\top X')^{-1}X'^\top y'\]
<p>Check at \(w = 0\): \(1 + 1 + 4 + 16 + 25 + 25 = 72\), the weighted loss ✓. Written with numbers like this, it is "explicit".</p>`],
          [R`Why does multiplying by \(\sqrt{\gamma_i}\) work?`, R`<p>\(\gamma_i r_i^2 = (\sqrt{\gamma_i}\,r_i)^2\), and \(\sqrt{\gamma_i}\,r_i = (\sqrt{\gamma_i}\,x^{(i)})\cdot w - \sqrt{\gamma_i}\,y_i\): a new row and a new label. With \(A = \mathrm{diag}(\sqrt{\gamma_1}, \dots, \sqrt{\gamma_n})\): \(X' = AX\), \(y' = Ay\) and \(A^\top A = \Gamma\), so \(X'^\top X' = X^\top\Gamma X\) and \(X'^\top y' = X^\top\Gamma y\) — the same \(w^*\) as setting the weighted gradient to 0. Works for any positive weights.</p>`],
        ],
        side: R`<ul>
<li><b>Official-solution slip (2025-B Q1.3).</b> It prints \((X'^\top X)^{-1}X'^\top y\); every \(X\) and \(y\) there should be \(X'\), \(y'\).</li>
<li>The extra rows add \(\lambda\) to two diagonal entries: \(X'^\top X' = X^\top X + \lambda\,\mathrm{diag}(0,1,1)\).</li>
<li>2026-A solved with numpy (not asked): both ways give \(w^* \approx (-0.45, 1.45, 2.64)\).</li>
</ul>`,
      },
      "compare-minimizers": {
        title: "Compare \\(J_\\lambda(\\theta^*)\\) with \\(J_\\lambda(\\tilde\\theta)\\)",
        minutes: 1,
        cue: R`"You continue executing the gradient descent algorithm until it converges to \(\theta^*\). You then compare \(\theta^*\) to \(\tilde\theta := (X^\top X)^{-1}X^\top y\). Determine whether \(J_\lambda(\theta^*) \lt J_\lambda(\tilde\theta)\) or \(>\) or \(=\). Briefly justify" (2025-C Q1.4).`,
        lines: [
          R`\(\theta^*\): gradient descent ran on \(J_{\lambda=1}\), so \(\theta^*\) minimizes \(J_{\lambda=1}\).`,
          R`\(\tilde\theta\): that formula comes from the <b>plain</b> gradient = 0, so it minimizes \(J_{\lambda=0}\) and ignores the penalty.`,
          R`Minimizer means \(J_1(\theta^*) \le J_1(\theta)\) for every \(\theta\) — in particular for \(\theta = \tilde\theta\).`,
          R`Equality isn't expected (\(\tilde\theta\) never looked at the penalty), so \(J_1(\theta^*) \lt J_1(\tilde\theta)\).`,
        ],
        numbers: R`<p>2025-C with numpy (the exam wants only the argument):</p>
<ul>
<li>\(J_1(\tilde\theta) = \tfrac{25}{14} + \tfrac{157}{14} = \tfrac{182}{14} = 13\) (fit + penalty)</li>
<li>\(\theta^* \approx (0, -2.202, 2.355)\): \(J_1(\theta^*) \approx 4.101 + 4.557 = 8.66\)</li>
<li>\(8.66 \lt 13\) ✓</li>
</ul>`,
        trap: R`Score both on the <b>same</b> loss, \(J_{\lambda=1}\). On the plain loss it flips: \(J_0(\tilde\theta) \le J_0(\theta^*)\).`,
        why: [
          [R`Why not "="?`, R`<p>They would be equal only if \(\tilde\theta\) happened to minimize the LASSO loss too. Nothing makes that happen: \(\tilde\theta\) was built without the penalty, and its weights are large (penalty \(\tfrac{157}{14} \approx 11.2\)). The official answer: "we expect \(J_{\lambda=1}(\theta^*) \lt J_{\lambda=1}(\tilde\theta)\)".</p>`],
          [R`Why does \(\tilde\theta\) minimize the plain loss?`, R`<p>\((X^\top X)^{-1}X^\top y\) is what you get by setting \(2X^\top(X\theta - y) = 0\) — the gradient of \(\|X\theta - y\|^2\) alone, without the penalty.</p>`],
        ],
        side: R`<ul>
<li>Mirror check: on the plain loss \(\tilde\theta\) scores \(\tfrac{25}{14} \approx 1.79\) and \(\theta^*\) about 4.10 — each wins on its own loss.</li>
<li>LASSO set \(\theta^*_0\) to exactly 0 (the "selection" effect); \(\tilde\theta\) used a bias of \(-3.14\).</li>
</ul>`,
      },
      "gd-code": {
        title: "Fill in the gradient descent code",
        minutes: 2,
        cue: R`"Complete the missing parts of code by filling the blocks labeled 1–5" (2025-B Q1.5); "Complete the three missing parts of the code labeled 1–3" (2026-B Q1.4).`,
        lines: [
          R`Read the docstring and the comment above each blank: they say it in words.`,
          R`Ones column: <code>np.ones((n, 1))</code>, <code>n = X.shape[0]</code> (rows).`,
          R`Prediction <code>X_b @ w</code>; residual <code>X_b @ w - y</code>.`,
          R`<code>z</code> = derivative of one sample's loss (cubic: <code>3 * r**2 * np.sign(r)</code>); gradient <code>X.T @ z</code>.`,
          R`Update <code>w - eta * grad</code> (minus).`,
          R`Stop <code>np.linalg.norm(grad) &lt;= eps</code> (the docstring's rule); training error <code>np.mean((y_hat - y) ** 2)</code>.`,
        ],
        numbers: R`<p>One pass, 2025-C, plain loss, <code>eta = 0.1</code>, <code>w = 0</code>:</p>
<ul>
<li><code>r</code> \(= -y = (-6,-4,-5,-1)\); <code>z = 2 * r</code> \(= (-12,-8,-10,-2)\)</li>
<li><code>X_b.T @ z</code> \(= (-32, 18, -44)\) (entry 0: \(-12 - 8 - 10 - 2\))</li>
<li>norm \(\approx 57.3\), no break; <code>w</code> \(= (3.2, -1.8, 4.4)\)</li>
</ul>`,
        trap: R`Moed B: <code>np.abs(r)**3</code> is the loss, not \(z\); <code>grad &lt; epsilon</code> compares a vector with a number.`,
        why: [
          [R`Why every blank is something you already know`, R`<p>Every gradient descent function in the exams has this shape; each line is a paper step:</p>
<pre><code>n    = X.shape[0]                       # rows = samples
X_b  = np.hstack([np.ones((n, 1)), X])  # ones column in front
w    = np.zeros(X_b.shape[1])           # one weight per column
for _ in range(max_iter):               # exactly max_iter steps
    r    = X_b @ w - y                  # residuals
    z    = 2 * r                        # z_i for THIS loss
    grad = X_b.T @ z                    # sum_i z_i x^(i)
    if np.linalg.norm(grad) &lt;= eps:     # flat enough? stop
        break
    w    = w - eta * grad               # step AGAINST the gradient
train_risk = np.mean((X_b @ w - y) ** 2)</code></pre>
<p>Only the <code>z</code> line changes between exams (2025-B instead calls a helper, <code>get_ridge_grad</code>, that returns the whole gradient).</p>`],
          [R`Why <code>@</code> vs <code>*</code> matters`, R`<p><code>@</code> is matrix multiplication (dot products); <code>*</code> and <code>**</code> work entry by entry, and <code>**</code> goes first. So <code>3 * r**2 * np.sign(r)</code> is \(3r_i^2\,\mathrm{sign}(r_i)\) for every \(i\) at once, and <code>X.T @ z</code> is \(\sum_i z_i x^{(i)}\).</p>`],
          [R`Why <code>np.linalg.norm</code> for the stop?`, R`<p><code>grad</code> is a vector (3 numbers). \(\|\nabla J\|_2 \le \varepsilon\) means its length \(\sqrt{g_0^2 + g_1^2 + g_2^2}\), one number — that is <code>np.linalg.norm(grad)</code>. <code>grad &lt;= eps</code> would give three True/False values.</p>`],
        ],
        side: R`<ul>
<li>2026-B blank 2: the question's own hint \(\nabla J = \sum_i z_i x^{(i)}\) <i>is</i> <code>X.T @ z</code> — you can get it even without part 3.</li>
<li><code>range(m)</code> runs exactly \(m\) times; <code>range(1, m)</code> only \(m - 1\).</li>
</ul>`,
      },
      "gd-bugs": {
        title: "Find the bugs in a gradient descent loop",
        minutes: 2,
        cue: R`"This code … contains six errors. Find at least four of them, specify the corresponding line numbers and erroneous statements, and propose a way to fix them" (2026-A Q1.4).`,
        lines: [
          R`First write the correct loop for the docstring's loss yourself (same as card "gd-code"), with \(z_i = 2\gamma_i r_i\).`,
          R`Go down the given code one line at a time and compare it with yours — every line, not only the formulas.`,
          R`Unsure about a line? Evaluate it at \(w = 0\) and compare with your paper values.`,
          R`For each bug write: line number, the wrong statement, the fix.`,
        ],
        numbers: R`<p>Paper values for 2026-A at \(w = (0,0,0)\), \(\gamma = (2,1,1,2)\) — a correct line reproduces them:</p>
<ul>
<li>residual \(r = Xw - y = (0,0,0,0) - (1,2,4,5) = (-1,-2,-4,-5)\)</li>
<li>\(z_i = 2\gamma_i r_i\): \((2\cdot2\cdot(-1),\ 2\cdot1\cdot(-2),\ 2\cdot1\cdot(-4),\ 2\cdot2\cdot(-5)) = (-4,-4,-8,-20)\)</li>
<li>gradient \(X^\top z = (-36,-52,-32)\) (entry 0: \(-4-4-8-20 = -36\))</li>
<li>loss \(\sum_i\gamma_i r_i^2 = 2\cdot1 + 1\cdot4 + 1\cdot16 + 2\cdot25 = 72\)</li>
</ul>`,
        trap: R`Write down every bug you find, not just four.`,
        why: [
          [R`The six bugs (open after you try)`, R`<div class="tw"><table><thead><tr><th>line</th><th>written</th><th>fix</th><th>why</th></tr></thead><tbody>
<tr><td>4</td><td><code>range(1, num_iters)</code></td><td><code>range(num_iters)</code></td><td>runs only num_iters − 1 times</td></tr>
<tr><td>6</td><td><code>error = y - y_pred</code></td><td><code>y_pred - y</code></td><td>residual = prediction − truth</td></tr>
<tr><td>7</td><td><code>grad = 2*X.T @ error</code></td><td><code>2*X.T @ (gamma * error)</code></td><td>\(z_i = 2\gamma_i r_i\)</td></tr>
<tr><td>8</td><td><code>w = w + eta * grad</code></td><td><code>w - eta * grad</code></td><td>step against the gradient</td></tr>
<tr><td>9</td><td><code>np.sum((gamma * error) ** 2)</code></td><td><code>np.sum(gamma * error**2)</code></td><td>the first gives \(\gamma_i^2 r_i^2\)</td></tr>
<tr><td>11</td><td><code>norm(grad) &gt; 1e-6</code></td><td><code>&lt; 1e-6</code></td><td>stop when the gradient is small</td></tr>
</tbody></table></div>
<p>These six are the official answer. The official solution adds for line 7: <code>gamma @ error</code> is also wrong — it is one number (\(-18\) at \(w = 0\)), while <code>gamma * error</code> is the vector \(\Gamma r = (-2,-2,-4,-10)\). Line 9 at \(w = 0\): the wrong version gives \(4 + 4 + 16 + 100 = 124\) instead of 72.</p>`],
          [R`Two bugs that cancel (open after you try)`, R`<p>Line 6 flips the residual's sign (\(y - \hat y\)), so the gradient points the wrong way; line 8 steps with \(+\), the wrong way again. The two mistakes happen to cancel and still go downhill. Fixing only one would make the loop walk uphill.</p>`],
        ],
        side: R`<ul>
<li>The docstring's loss has no \(\tfrac12\) and no mean, so the correct gradient keeps the factor 2 and has no \(1/n\).</li>
</ul>`,
      },
      "cv-bugs": {
        title: "Find the bugs in cross-validation code",
        minutes: 2,
        cue: R`"The code below implements a cross-validation process for finding an optimal value for the hyperparameter \(\lambda\) … contains several errors. Find at least three … and propose a way to fix them" (2025-A Q1.4, 2025-C Q1.5).`,
        lines: [
          R`Skip the lines they call error-free (the fold splitting).`,
          R`Rows or columns? \(n\) must count the samples = the rows of \(X\).`,
          R`Train or validation? Fit on the training rows; predict and score only on the validation rows.`,
          R`Plain or penalized? \(\lambda\) goes only into the solver call; the validation risk is the plain squared error.`,
          R`One fold or the average? Smaller or larger? The CV risk of a \(\lambda\) is the mean over its folds; the best \(\lambda\) has the smallest.`,
          R`Per bug write: line number, wrong statement, fix.`,
        ],
        numbers: R`<p>2025-C: \(X\) (with the ones column) is \(4\times 3\), so <code>X.shape</code> \(= (4, 3)\): <code>X.shape[0]</code> \(= 4\) rows (samples), <code>X.shape[1]</code> \(= 3\) columns.</p>`,
        why: [
          [R`Why no penalty in validation?`, R`<p>Training minimizes \(J_\lambda\) — that is where \(\lambda\) acts. Validation only asks "how good are the predictions on rows the model never saw?", so it measures the plain squared error \(\sum(y_{\text{val}} - \hat y)^2\). A prediction is just \(X_{\text{val}}w\); adding \(\lambda\sum|w_j|\) to it means nothing.</p>`],
          [R`Why average over the folds?`, R`<p>Each fold is one train/validate split, and one split can be lucky or unlucky. The CV risk of a \(\lambda\) is the <b>mean</b> of its \(k\) validation errors; <code>risk</code> after the loop is only the last fold. Then keep the \(\lambda\) with the <b>smallest</b> CV risk, so the comparison is <code>&lt;</code>, and <code>min_cv_risk</code> must store that same mean — otherwise the next \(\lambda\) is compared with a different kind of number.</p>`],
          [R`How the folds are picked`, R`<p><code>np.arange(n)[i::k]</code> = rows \(i, i+k, i+2k, \dots\). With \(n = 10\), \(k = 5\): fold 0 = rows [0, 5], fold 1 = [1, 6], …, fold 4 = [4, 9]. Every row lands in exactly one fold.</p>`],
          [R`Every bug planted so far (open after you try)`, R`<ul>
<li><code>n = X.shape[1]</code> → <code>X.shape[0]</code> (2025-A, 2025-C)</li>
<li><code>y_pred = X_train @ w_star</code> → <code>X_val @ w_star</code> (2025-A)</li>
<li><code>y_pred = X_val @ w_star + lmd * np.sum(np.abs(w_star))</code> → drop the <code>+ lmd * …</code> (2025-C)</li>
<li><code>risk = np.sum((y_train - y_pred) ** 2)</code> → <code>y_val</code> (2025-C)</li>
<li><code>risk = … + lmd * np.sum(w_star[1:] ** 2)</code> → drop the penalty (2025-A)</li>
<li><code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code> (2025-A)</li>
<li><code>if np.mean(lo_risk) &gt; min_cv_risk</code> → <code>&lt;</code> (2025-C)</li>
<li><code>min_cv_risk = np.sum(lo_risk)</code> → <code>np.mean(lo_risk)</code> (2025-C)</li>
</ul>`],
        ],
        side: R`<ul>
<li>Why \(\lambda\) needs cross-validation at all: on the training table a penalty can only make the fit worse, so training error would always pick \(\lambda = 0\).</li>
</ul>`,
      },
      "knn": {
        title: "KNN predictions and the test MSE",
        minutes: 2,
        cue: R`"Compute the predictions on the two test samples and the test MSE for … a linear regression model with weights \(w = (2, 0.1, 1)\); 1-NN; 2-NN … Which … is the best one?" (2026-B Q1.1).`,
        lines: [
          R`Linear: \(\hat y = w_0 + w_1 x_1 + w_2 x_2\) for each test sample (don't forget \(w_0\)).`,
          R`Distance table: one row per test sample, one column per <b>training</b> sample, \(d = \sqrt{(\Delta x_1)^2 + (\Delta x_2)^2}\).`,
          R`1-NN: the label of the nearest; 2-NN: the average of the two nearest labels.`,
          R`Per model: SE \(= (\hat y - y)^2\) per test sample, MSE = their average. Best = smallest MSE.`,
        ],
        numbers: R`<p>2026-B test sample 6, \((30, 1)\), \(y = 7\):</p>
<ul>
<li>Linear: \(2 + 0.1\cdot 30 + 1\cdot 1 = 6\), SE \(= 1\)</li>
<li>Distances to samples 1–5: \(\sqrt{101}, 1, \sqrt{101}, \sqrt{101}, 10\)</li>
<li>1-NN: sample 2, \(\hat y = 6\), SE \(= 1\). 2-NN: samples 2, 5, \(\hat y = \tfrac{6 + 9}{2} = 7.5\), SE \(= 0.25\)</li>
</ul>
`,
        trap: R`Neighbours come only from the training rows (1–5), never the other test sample. MSE divides by 2, the number of test samples.`,
        why: [
          [R`Why only training rows as neighbours?`, R`<p>KNN "trains" by memorizing the training table. A test sample must be predicted as if it were new, so no test label — its own or the other one's — may be used.</p>`],
          [R`Why can I skip the square root?`, R`<p>To <i>rank</i> distances you can compare squared distances: \(\sqrt{\ }\) doesn't change the order. Sample 6: squared distances \(101, 1, 101, 101, 100\) — same order as the distances.</p>`],
          [R`Why does the MSE pick the best model?`, R`<p>The test samples were never used for training, so their average squared error estimates how the model does on new data. Lower = better.</p>`],
        ],
        side: R`<ul>
<li>The distances from sample 6 are decided almost only by \(x_1\) (gaps of 10–20); \(x_2\) (gaps of at most 2) hardly counts. That is why Q1.2 normalizes.</li>
<li>KNN has no weights and no training loop — only a hyperparameter \(k\).</li>
</ul>`,
      },
      "normalize": {
        title: "Normalize the features, then redo 1-NN",
        minutes: 2,
        cue: R`"When normalizing a feature, we divide each value of that feature by the \(L_2\) norm of the vector composed of all values of that feature across all training samples. Compute the test predictions and test MSE of the 1-NN model" (2026-B Q1.2).`,
        lines: [
          R`For each feature: its \(L_2\) norm over the <b>training</b> rows, \(\sqrt{\text{sum of squares}}\).`,
          R`Divide every value in that column — training <b>and</b> test rows — by that norm. Labels stay.`,
          R`Redo the distance table with the new values; 1-NN = label of the nearest training row.`,
          R`SE per test sample; MSE = their average.`,
        ],
        numbers: R`<p>2026-B, training rows 1–5:</p>
<ul>
<li>\(\|X_1\|_2 = \sqrt{400 + 900 + 1600 + 400 + 1600} = \sqrt{4900} = 70\); \(\|X_2\|_2 = \sqrt{0 + 4 + 0 + 4 + 1} = 3\)</li>
<li>Test 6: \((30, 1) \to (\tfrac37, \tfrac13)\). Nearest: sample 5 \((\tfrac47, \tfrac13)\), squared distance \((\tfrac17)^2 = \tfrac1{49}\) (sample 2: \(\tfrac19\); 1, 3, 4: \(\tfrac{58}{441}\))</li>
<li>\(\hat y_6 = y_5 = 9\), SE \(= (9 - 7)^2 = 4\)</li>
</ul>`,
        trap: R`Moed B (2/4): you divided \(x_1\) by its <b>sum</b> (150), not its \(L_2\) norm (70), and left \(x_2\) unscaled. Every feature, \(L_2\) norm.`,
        why: [
          [R`Why normalize?`, R`<p>In a squared distance, a gap of 10 in \(x_1\) adds \(10^2 = 100\), while the biggest possible gap in \(x_2\) (2) adds only \(2^2 = 4\). So \(x_2\) is ignored just because its numbers are small. Dividing each feature by its own size puts both on a comparable scale.</p>`],
          [R`Why do the test rows use the training norm?`, R`<p>Test samples must go through exactly the same transformation as the training samples; otherwise their distances would be measured on a different scale. The norm itself uses training rows only ("across all training samples").</p>`],
          [R`Why did the nearest neighbour change?`, R`<p>Before: sample 2 differed from sample 6 by 1 in \(x_2\), sample 5 by 10 in \(x_1\) — the 10 looked huge. After dividing: the \(x_1\) gap is \(\tfrac{10}{70} = \tfrac17\), the \(x_2\) gap is \(\tfrac13\). Now the \(x_2\) gap is the bigger one, so sample 5 is nearest.</p>`],
        ],
        side: R`<ul>
<li>To compare the fractions, put the squared distances over \(441 = 49\cdot 9\): \(\tfrac1{49} = \tfrac{9}{441}\), \(\tfrac19 = \tfrac{49}{441}\), and \(\tfrac1{49} + \tfrac19 = \tfrac{58}{441}\).</li>
</ul>`,
      },
    },
    parts: {
      "2025C-q1.1": ["x-and-y", "loss-forms"],
      "2025C-q1.2": ["gradient", "penalty-gradients"],
      "2025C-q1.3": ["gd-step"],
      "2025C-q1.4": ["compare-minimizers"],
      "2025C-q1.5": ["cv-bugs"],
      "2025A-q1.1": ["x-and-y"],
      "2025A-q1.2": ["loss-polynomial"],
      "2025A-q1.3": ["gradient", "penalty-gradients", "gd-step"],
      "2025A-q1.4": ["cv-bugs"],
      "2025B-q1.1": ["x-and-y", "loss-forms"],
      "2025B-q1.2": ["x-prime"],
      "2025B-q1.3": ["closed-form"],
      "2025B-q1.4": ["gd-step"],
      "2025B-q1.5": ["gd-code"],
      "2026A-q1.1": ["x-and-y", "loss-forms"],
      "2026A-q1.2": ["z-recipe"],
      "2026A-q1.3": ["closed-form", "x-prime"],
      "2026A-q1.4": ["gd-code", "gd-bugs"],
      "2026B-q1.1": ["knn"],
      "2026B-q1.2": ["normalize"],
      "2026B-q1.3": ["z-recipe"],
      "2026B-q1.4": ["gd-code"],
    },
  };
})();
