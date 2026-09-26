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
          why: R`<p><b>\(\|X\theta - y\|^2\) is a sum of squares</b>, one per sample: \(e_1^2 + e_2^2 + e_3^2 + e_4^2\), where \(e_i\) = sample \(i\)'s error (prediction − label).</p>
<p><b>Use 2 · stuff · (derivative of stuff) on each error separately.</b> \(e_1 = \theta_0 + \theta_1 x_1 + \theta_2 x_2 - y_1\) with sample 1's \(x\)'s, so the derivative of \(e_1^2\) with respect to \(\theta_j\) is \(2\cdot e_1\cdot\)(sample 1's \(x_j\)). Same for every sample.</p>
<p><b>Add them up:</b> \(2\cdot\)(each error × that sample's \(x_j\), summed) = \(2\cdot\)(column \(j\) of \(X\)) · (errors). All \(j\) at once: \(2X^\top(X\theta - y)\).</p>
<p class="trapline"><b>Not</b> \(2\cdot\|X\theta - y\|\cdot x_j\): the length \(\|X\theta - y\|\) is one number, but every sample has its own \(x_j\) — the rule has to be applied per sample.</p>` },
        { line: R`Penalty part \(\lambda(|\theta_0| + \dots + |\theta_p|)\) → \(\;\lambda\,\mathrm{sign}(\theta)\)`,
          why: R`<p>The derivative of \(|a|\) is just its sign: +1 if \(a\) is positive, −1 if negative. That's why the question says "assume no \(\theta\) is 0" — at 0 there's no derivative.</p>` },
        { line: R`Add them. That's the answer: <div class="formula">\[\nabla J(\theta) = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\]</div>`,
          why: R`<p>The official solution also writes one entry at a time first: \(2\sum_i x^{(i)}_j(\theta^\top x^{(i)} - y^{(i)}) + \lambda\,\mathrm{sign}(\theta_j)\). Same thing, just not stacked — the matrix form above is enough.</p>` },
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
