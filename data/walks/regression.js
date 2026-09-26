// Walkthroughs for the Regression questions — CASUAL style (spec/WALKS.md):
// few moves, plain words, only the lines that earn the points.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    "2025C-q1.1": {
      start: R`\[X = \begin{bmatrix}1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\\ 1 & \square & \square\end{bmatrix} \qquad y = \begin{bmatrix}\square\\ \square\\ \square\\ \square\end{bmatrix}\]`,
      moves: [
        { line: R`One row per sample: a 1, then \(x_1\), then \(x_2\). <div class="formula">\[X = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix}\]</div>`,
          why: R`<p>The 1 is for \(\theta_0\) (the bias). Row × \(\theta\) then gives that sample's prediction: \(\theta_0\cdot 1 + \theta_1 x_1 + \theta_2 x_2\).</p>` },
        { line: R`\(y\) = the labels, same order: \(\;y = (6, 4, 5, 1)\). Done.` },
      ],
      compare: R`Same \(X\) and \(y\) as the official answer.`,
    },

    "2025C-q1.2": {
      start: R`<p><b>The function:</b></p>\[J(\theta) = \;\square\]<p><b>Its derivative by one knob \(\theta_j\):</b></p>\[\frac{dJ}{d\theta_j} = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question (it's our \(f\)): <div class="formula">\[\begin{aligned}J(\theta) = \;&\sum_{i}\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)^2\\ &+ \lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\end{aligned}\]</div>`,
          why: R`<p>The \(\sum_i\) only means: one squared bracket <b>per sample</b>, all added up. With 2025-C's 4 samples it literally is:</p>
\[\begin{aligned}J(\theta) = \;&(\theta_0 - 1\theta_1 + 1\theta_2 - 6)^2 &&\leftarrow \text{sample 1}\\ +\;&(\theta_0 - 2\theta_1 + 0\theta_2 - 4)^2 &&\leftarrow \text{sample 2}\\ +\;&(\theta_0 + 1\theta_1 + 3\theta_2 - 5)^2 &&\leftarrow \text{sample 3}\\ +\;&(\theta_0 + 0\theta_1 + 1\theta_2 - 1)^2 &&\leftarrow \text{sample 4}\\ +\;&\lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\end{aligned}\]
<p>Each bracket is "prediction − label" for one sample: that sample's <b>error</b>.</p>` },
        { line: R`<b>Rewrite</b> — give each bracket a short name, \(e_i\) = sample \(i\)'s error: <div class="formula">\[J(\theta) = e_1^2 + e_2^2 + e_3^2 + e_4^2 + \lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\]</div>`,
          why: R`<p>Nothing changes — it's only a name, so the derivative stays short. Exactly like writing \(f(x) = u^2\) with \(u = x^2 + 3\).</p>
<p>\(e_1 = \theta_0 - 1\theta_1 + 1\theta_2 - 6\), \(e_2 = \theta_0 - 2\theta_1 + 0\theta_2 - 4\), and so on.</p>` },
        { line: R`<b>Derivative by \(\theta_j\)</b> — your chain rule on each \(e_i^2\), and \(|\theta_j| \to \mathrm{sign}(\theta_j)\): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_j} = \;&2e_1\,x^{(1)}_j + 2e_2\,x^{(2)}_j\\ &+ 2e_3\,x^{(3)}_j + 2e_4\,x^{(4)}_j\\ &+ \lambda\,\mathrm{sign}(\theta_j)\end{aligned}\]</div>`,
          why: R`<p><b>Each \(e_i^2\):</b> like \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\), it becomes \(2\cdot e_i\cdot\)(derivative of \(e_i\)).</p>
<p><b>Derivative of \(e_i\) by \(\theta_j\):</b> \(e_i\) is a plain sum like \(\theta_0 - 2\theta_1 + 0\theta_2 - 4\). Its derivative by \(\theta_1\) is just the number in front of \(\theta_1\): here \(-2\), which is sample \(i\)'s \(x_1\). In general: sample \(i\)'s \(x_j\), written \(x^{(i)}_j\) (for \(\theta_0\) it's 1).</p>
<p><b>Penalty:</b> only \(|\theta_j|\) contains \(\theta_j\). The derivative of \(|a|\) is its sign: +1 if positive, −1 if negative.</p>`,
          extra: [{ label: "check it with numbers (θ = (1, −2, 3), knob θ₁)", html: R`<div class="tw"><table><thead><tr><th>sample</th><th>\(e_i\)</th><th>its \(x_1\)</th><th>\(2\cdot e_i\cdot x_1\)</th></tr></thead><tbody>
<tr><td>1</td><td>0</td><td>−1</td><td>0</td></tr><tr><td>2</td><td>1</td><td>−2</td><td>−4</td></tr>
<tr><td>3</td><td>3</td><td>1</td><td>6</td></tr><tr><td>4</td><td>3</td><td>0</td><td>0</td></tr>
<tr><td colspan="3"><b>add</b></td><td><b>2</b></td></tr></tbody></table></div>
<p>Plus the penalty \(\lambda\,\mathrm{sign}(\theta_1) = 1\cdot(-1) = -1\): \(\;2 - 1 = 1\). That's the middle entry of part 3's gradient \((15, 1, 25)\).</p>` }] },
        { line: R`<b>Write it short</b> — that's the answer: <div class="formula">\[\frac{dJ}{d\theta_j} = 2\sum_i x^{(i)}_j\,e_i + \lambda\,\mathrm{sign}(\theta_j)\]</div>all knobs at once: <div class="formula">\[\nabla J(\theta) = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\]</div>`,
          why: R`<p><b>Left:</b> move 3 with \(\sum_i\) instead of writing 4 terms. Everything with an \(i\) sits <b>inside</b> the sum: each sample's \(x_j\) times its own error.</p>
<p><b>Right:</b> the same for all knobs at once. "Each sample's \(x_j\) times its error, added" = (column \(j\) of \(X\)) · (errors), and \(X^\top(\text{errors})\) does that for every column. The errors are \(X\theta - y\).</p>` },
      ],
      compare: R`The official solution's first line is the left formula of move 4, and its last line is the right one.`,
    },

    "2025C-q1.3": {
      start: R`\[\text{errors} = X\theta - y = \square \qquad \nabla J = \square \qquad \theta_{\text{new}} = \theta - 0.1\cdot\nabla J = \square\]`,
      moves: [
        { line: R`Errors = predictions − labels = \((6, 5, 8, 4) - (6, 4, 5, 1) = (0, 1, 3, 3)\)`,
          why: R`<p>Each prediction is a row of \(X\) times \(\theta = (1, -2, 3)\). Row 1: \(1\cdot 1 + (-1)(-2) + 1\cdot 3 = 1 + 2 + 3 = 6\). Same for the other rows: 5, 8, 4.</p>` },
        { line: R`\(2X^\top\cdot\)errors: each column of \(X\) · errors → \((7, 1, 12)\), times 2 → \((14, 2, 24)\)`,
          why: R`<p>Column 0 \((1,1,1,1)\cdot(0,1,3,3) = 7\). Column 1 \((-1,-2,1,0)\cdot(0,1,3,3) = -2 + 3 = 1\). Column 2 \((1,0,3,1)\cdot(0,1,3,3) = 9 + 3 = 12\).</p>` },
        { line: R`Add \(\lambda\,\mathrm{sign}(\theta) = (1, -1, 1)\): \(\;\nabla J = (15, 1, 25)\)`,
          extra: [{ label: "the official solution says (15, 0, 25) — it's a slip", html: R`<p>\(2 + (-1) = 1\), not 0. So the middle entry is 1, and later \(-2 - 0.1 = -2.1\). (Its first line also says "λ = 2" but it uses 1.)</p>` }] },
        { line: R`Step: \(\theta - 0.1\cdot(15, 1, 25) = (1 - 1.5,\ -2 - 0.1,\ 3 - 2.5) = (-0.5,\ -2.1,\ 0.5)\). Done.` },
      ],
      compare: R`Same steps as the official solution, except its slip: the correct gradient is (15, 1, 25) and the new θ is (−0.5, −2.1, 0.5).`,
    },

    "2025C-q1.4": {
      start: R`<p>\(J(\theta^*)\ \square\ J(\tilde\theta)\;\) because \(\;\square\)</p>`,
      moves: [
        { line: R`\(\theta^*\) = where gradient descent on \(J_\lambda\) ends = the best possible \(\theta\) for \(J_\lambda\).` },
        { line: R`\(\tilde\theta\) is the best for a <b>different</b> loss (no penalty), so on \(J_\lambda\) it can't beat \(\theta^*\): \(\;J_\lambda(\theta^*) \lt J_\lambda(\tilde\theta)\)`,
          why: R`<p>"The winner of a race is at least as fast as anyone else in that race." \(\tilde\theta\) trained for another race, so it loses (strictly — it ignores the penalty).</p>` },
      ],
      compare: R`Same argument as the official solution.`,
    },

    "2025C-q1.5": {
      start: R`<p>One line per bug (write at least three):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      moves: [
        { line: R`\(n\) = number of samples = rows. <b>Line 1:</b> <code>X.shape[1]</code> → <code>X.shape[0]</code>` },
        { line: R`Validation = only validation data, no penalty. <b>Line 16:</b> → <code>y_pred = X_val @ w_star</code>. <b>Line 17:</b> <code>y_train</code> → <code>y_val</code>`,
          extra: [{ label: "why lines 16–17 and not 15–16?", html: R`<p>The official solution calls them 15 and 16, but on the printed page (the numbers in the left margin) they are 16 and 17. Either way, quote the statement itself so the grader can't miss it.</p>` }] },
        { line: R`We want the <b>smallest</b> average error. <b>Line 20:</b> <code>&gt;</code> → <code>&lt;</code>. <b>Line 21:</b> <code>np.sum</code> → <code>np.mean</code>. Done (5 bugs; 3 are enough).`,
          why: R`<p>The CV risk of a \(\lambda\) is the <b>average</b> error over the folds, and we keep the \(\lambda\) with the lowest one. So compare with <code>&lt;</code>, and store the same mean you compared.</p>` },
      ],
      compare: R`The official list has the same 5 bugs.`,
    },

  });
})();
