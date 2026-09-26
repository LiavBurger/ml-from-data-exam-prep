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
      start: R`<p>errors: \(\;r = X\theta - y\)</p>\[\nabla J = \;\square\; + \;\square\]<p>(one piece from the squared errors, one from the penalty)</p>`,
      moves: [
        { line: R`Squared-errors part → \(\;2X^\top(X\theta - y)\)`,
          why: R`<p><b>Same structure as \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\)</b> — just four brackets, one per sample, and the variable is \(\theta_1\) instead of \(x\). With 2025-C's table:</p>
\[\begin{aligned}J = \;&(\theta_0 - 1\theta_1 + 1\theta_2 - 6)^2 &&\leftarrow \text{sample 1}\\ +\;&(\theta_0 - 2\theta_1 + 0\theta_2 - 4)^2 &&\leftarrow \text{sample 2}\\ +\;&(\theta_0 + 1\theta_1 + 3\theta_2 - 5)^2 &&\leftarrow \text{sample 3}\\ +\;&(\theta_0 + 0\theta_1 + 1\theta_2 - 1)^2 &&\leftarrow \text{sample 4}\end{aligned}\]
<p>Derivative by \(\theta_1\): <b>2 · (bracket) · (derivative of the bracket)</b>, once per bracket, then add:</p>
\[\begin{aligned}\frac{dJ}{d\theta_1} = \;&2\cdot(\theta_0 - 1\theta_1 + 1\theta_2 - 6)\cdot(-1)\\ +\;&2\cdot(\theta_0 - 2\theta_1 + 0\theta_2 - 4)\cdot(-2)\\ +\;&2\cdot(\theta_0 + 1\theta_1 + 3\theta_2 - 5)\cdot(1)\\ +\;&2\cdot(\theta_0 + 0\theta_1 + 1\theta_2 - 1)\cdot(0)\end{aligned}\]
<p>The "\(2x\)" part is the number in front of \(\theta_1\) in that bracket — that sample's \(x_1\).</p>
<p><b>The official formula is just this, written short:</b> 2 × sum over samples of [ (that sample's bracket) × (that sample's \(x_j\)) ]. Stacked for every knob at once, that's \(2X^\top(X\theta - y)\).</p>
<p>Check with \(\theta = (1, -2, 3)\): the brackets are 0, 1, 3, 3, so \(2\cdot 0\cdot(-1) + 2\cdot 1\cdot(-2) + 2\cdot 3\cdot 1 + 2\cdot 3\cdot 0 = 0 - 4 + 6 + 0 = 2\) — the middle entry of \((14, 2, 24)\).</p>
<p class="trapline"><b>Not</b> \(2\cdot\|X\theta - y\|\cdot x_j\): the length \(\|X\theta - y\|\) is one number, but every sample has its own \(x_j\) — the rule has to be applied per sample.</p>`,
          extra: [{ label: "see it as a table (real numbers, θ = (1, −2, 3))", html: R`<p>Take knob \(\theta_1\) (so \(x_j\) = the \(x_1\) column). Each row = one sample. Apply "2 · error · x" per row, then add the column:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>its error</th><th>its \(x_1\)</th><th>2 · error · \(x_1\)</th></tr></thead><tbody>
<tr><td>1</td><td>0</td><td>−1</td><td>2 · 0 · (−1) = 0</td></tr>
<tr><td>2</td><td>1</td><td>−2</td><td>2 · 1 · (−2) = −4</td></tr>
<tr><td>3</td><td>3</td><td>1</td><td>2 · 3 · 1 = 6</td></tr>
<tr><td>4</td><td>3</td><td>0</td><td>2 · 3 · 0 = 0</td></tr>
<tr><td colspan="3"><b>add the last column</b></td><td><b>0 − 4 + 6 + 0 = 2</b></td></tr></tbody></table></div>
<p>2 is exactly the \(\theta_1\) entry of \(2X^\top(X\theta - y) = (14, 2, 24)\). The formula \(2X^\top(X\theta - y)\) is just this table, done for every knob at once.</p>` }] },
        { line: R`Penalty part \(\lambda(|\theta_0| + \dots + |\theta_p|)\) → \(\;\lambda\,\mathrm{sign}(\theta)\)`,
          why: R`<p>The derivative of \(|a|\) is just its sign: +1 if \(a\) is positive, −1 if negative. That's why the question says "assume no \(\theta\) is 0" — at 0 there's no derivative.</p>` },
        { line: R`Add them. That's the answer: <div class="formula">\[\nabla J(\theta) = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\]</div>`,
          why: R`<p>The official solution also writes one entry at a time first: \(2\sum_i x^{(i)}_j(\theta^\top x^{(i)} - y^{(i)}) + \lambda\,\mathrm{sign}(\theta_j)\). Same thing, just not stacked — the matrix form above is enough.</p>`,
          extra: [{ label: "how to read the official sum (what is inside Σ?)", html: R`<p><b>Everything that has an \(i\) in it is inside the sum.</b> Both \(x^{(i)}_j\) and \((\theta^\top x^{(i)} - y^{(i)})\) contain \(i\), so the sum covers their <b>product</b>:</p>
\[2\sum_{i=1}^{n}\Big[\;x^{(i)}_j \cdot \big(\theta^\top x^{(i)} - y^{(i)}\big)\;\Big]\]
<p>For each sample: (its \(x_j\)) × (its error). Then add the samples. Written out for 2025-C's 4 samples:</p>
\[\begin{aligned}2\,\Big[\;&x^{(1)}_j\cdot(\text{error of sample 1})\\ +\;&x^{(2)}_j\cdot(\text{error of sample 2})\\ +\;&x^{(3)}_j\cdot(\text{error of sample 3})\\ +\;&x^{(4)}_j\cdot(\text{error of sample 4})\;\Big]\end{aligned}\]
<p>It is <b>not</b> "(sum of the \(x_j\)'s) × (an error)": outside the sum there is no \(i\), so "the error of sample \(i\)" would have no meaning there.</p>
<p>That's exactly the table under move 1: one row per sample, multiply inside the row, add the last column.</p>` }] },
      ],
      compare: R`The official solution's last line is exactly move 3.`,
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
