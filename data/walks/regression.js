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
<p>Each bracket is "prediction − label" for one sample.</p>` },
        { line: R`<b>Derivative by \(\theta_j\)</b> — like \(2\cdot(x^2+3)\cdot 2x\): 2 · (the bracket, copied) · (the number in front of \(\theta_j\)), and \(|\theta_j| \to \mathrm{sign}(\theta_j)\): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_j} = \;&\sum_{i} 2\cdot\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)\cdot x^{(i)}_j\\ &+ \lambda\,\mathrm{sign}(\theta_j)\end{aligned}\]</div>`,
          why: R`<p><b>Each squared bracket:</b> \((\text{bracket})^2 \to 2\cdot(\text{bracket})\cdot(\text{derivative of the bracket})\) — the same move as \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\).</p>
<p><b>Derivative of the bracket by \(\theta_j\):</b> the bracket is a plain sum like \(\theta_0 - 2\theta_1 + 0\theta_2 - 4\). Its derivative by \(\theta_1\) is just the number in front of \(\theta_1\): here \(-2\) — that sample's \(x_1\). In general it's that sample's \(x_j\), written \(x^{(i)}_j\) (for \(\theta_0\) it's 1).</p>
<p><b>Penalty:</b> only \(|\theta_j|\) contains \(\theta_j\). The derivative of \(|a|\) is its sign: +1 if positive, −1 if negative.</p>
<p>Written out for knob \(\theta_1\) with the 4 real brackets:</p>
\[\begin{aligned}\frac{dJ}{d\theta_1} = \;&2\cdot(\theta_0 - 1\theta_1 + 1\theta_2 - 6)\cdot(-1)\\ +\;&2\cdot(\theta_0 - 2\theta_1 + 0\theta_2 - 4)\cdot(-2)\\ +\;&2\cdot(\theta_0 + 1\theta_1 + 3\theta_2 - 5)\cdot(1)\\ +\;&2\cdot(\theta_0 + 0\theta_1 + 1\theta_2 - 1)\cdot(0)\\ +\;&\lambda\,\mathrm{sign}(\theta_1)\end{aligned}\]`,
          extra: [{ label: "check it with numbers (θ = (1, −2, 3), knob θ₁)", html: R`<div class="tw"><table><thead><tr><th>sample</th><th>bracket value</th><th>its \(x_1\)</th><th>2 · bracket · \(x_1\)</th></tr></thead><tbody>
<tr><td>1</td><td>1 + 2 + 3 − 6 = 0</td><td>−1</td><td>0</td></tr><tr><td>2</td><td>1 + 4 + 0 − 4 = 1</td><td>−2</td><td>−4</td></tr>
<tr><td>3</td><td>1 − 2 + 9 − 5 = 3</td><td>1</td><td>6</td></tr><tr><td>4</td><td>1 + 0 + 3 − 1 = 3</td><td>0</td><td>0</td></tr>
<tr><td colspan="3"><b>add</b></td><td><b>2</b></td></tr></tbody></table></div>
<p>Plus the penalty \(\lambda\,\mathrm{sign}(\theta_1) = 1\cdot(-1) = -1\): \(\;2 - 1 = 1\). That's the middle entry of part 3's gradient \((15, 1, 25)\).</p>` }] },
        { line: R`<b>Write it short</b> — that's the answer: <div class="formula">\[\nabla J(\theta) = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\]</div>`,
          why: R`<p>Same thing as move 2, for all knobs at once:</p>
<ul><li>\(X\theta - y\) = the list of all the brackets (each sample's prediction − label).</li>
<li>"each bracket × that sample's \(x_j\), added" = (column \(j\) of \(X\)) · (the brackets). \(X^\top\) does that for every column at once.</li>
<li>\(\mathrm{sign}(\theta)\) = the list of the signs of all knobs.</li></ul>
<p>The official solution also writes move 2 with \(\theta^\top x^{(i)}\) — that's just short for the prediction \(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2\).</p>` },
      ],
      compare: R`The official solution's first line is move 2 (written with \(\theta^\top x^{(i)}\) for the prediction), and its last line is move 3.`,
    },

    "2025C-q1.3": {
      start: R`<p><b>The rule:</b></p>\[\theta_{\text{new}} = \theta - \eta\cdot(\text{the derivative})\]<p><b>The derivative, one knob at a time (from part 2):</b></p>\[\frac{dJ}{d\theta_j} = \sum_i 2\cdot(\text{bracket})\cdot x^{(i)}_j + \lambda\,\mathrm{sign}(\theta_j)\]<p><b>Then plug in:</b> brackets \(= \square\), \(\;\frac{dJ}{d\theta_0} = \square\), \(\;\frac{dJ}{d\theta_1} = \square\), \(\;\frac{dJ}{d\theta_2} = \square\), \(\;\theta_{\text{new}} = \square\)</p>`,
      moves: [
        { line: R`<b>The rule</b> — write it first: <div class="formula">\[\theta_{\text{new}} = \theta - \eta\cdot(\text{the derivative})\]</div> Given: \(\theta = (1, -2, 3)\), \(\eta = 0.1\), \(\lambda = 1\).`,
          why: R`<p>The derivative points uphill (where the loss grows). We want the loss to shrink, so we step the other way: <b>minus</b> a small piece (\(\eta = 0.1\)) of the derivative. One step = do this once.</p>` },
        { line: R`<b>Plug \(\theta\) into each sample's bracket</b> (prediction − label), from part 2: <div class="formula">\[\begin{aligned}\text{sample 1:}\;\; &1 - 1\cdot(-2) + 1\cdot 3 - 6 = 1 + 2 + 3 - 6 = 0\\ \text{sample 2:}\;\; &1 - 2\cdot(-2) + 0\cdot 3 - 4 = 1 + 4 + 0 - 4 = 1\\ \text{sample 3:}\;\; &1 + 1\cdot(-2) + 3\cdot 3 - 5 = 1 - 2 + 9 - 5 = 3\\ \text{sample 4:}\;\; &1 + 0\cdot(-2) + 1\cdot 3 - 1 = 1 + 0 + 3 - 1 = 3\end{aligned}\]</div>`,
          why: R`<p>These are part 2's brackets, \(\theta_0 + \theta_1 x_1 + \theta_2 x_2 - y\), with \(\theta_0 = 1,\ \theta_1 = -2,\ \theta_2 = 3\) put in. Each sample uses its own \(x_1, x_2, y\) from the table.</p>` },
        { line: R`<b>Knob \(\theta_0\)</b> — part 2's derivative, each bracket × that sample's \(x_0\) (always 1): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_0} &= 2\cdot(0\cdot 1 + 1\cdot 1 + 3\cdot 1 + 3\cdot 1)\\ &\quad + 1\cdot\mathrm{sign}(1)\\ &= 2\cdot 7 + 1 = 15\end{aligned}\]</div>`,
          why: R`<p>The number in front of \(\theta_0\) in every bracket is 1 (it's the bias), so each bracket is multiplied by 1. \(\mathrm{sign}(\theta_0) = \mathrm{sign}(1) = +1\).</p>` },
        { line: R`<b>Knob \(\theta_1\)</b> — each bracket × that sample's \(x_1\) = \((-1, -2, 1, 0)\): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_1} &= 2\cdot\big(0\cdot(-1) + 1\cdot(-2) + 3\cdot 1 + 3\cdot 0\big)\\ &\quad + 1\cdot\mathrm{sign}(-2)\\ &= 2\cdot 1 - 1 = 1\end{aligned}\]</div>`,
          extra: [{ label: "the official solution says 0 here — it's a slip", html: R`<p>\(2\cdot 1 + (-1) = 1\), not 0. (Its first line also says "λ = 2" but it uses 1.)</p>` }] },
        { line: R`<b>Knob \(\theta_2\)</b> — each bracket × that sample's \(x_2\) = \((1, 0, 3, 1)\): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_2} &= 2\cdot(0\cdot 1 + 1\cdot 0 + 3\cdot 3 + 3\cdot 1)\\ &\quad + 1\cdot\mathrm{sign}(3)\\ &= 2\cdot 12 + 1 = 25\end{aligned}\]</div> So the derivative is \((15, 1, 25)\).` },
        { line: R`<b>The step</b> — the rule from move 1, knob by knob: <div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (1, -2, 3) - 0.1\cdot(15, 1, 25)\\ &= (1 - 1.5,\; -2 - 0.1,\; 3 - 2.5)\\ &= (-0.5,\; -2.1,\; 0.5)\end{aligned}\]</div> Done.` },
      ],
      compare: R`Same steps as the official solution (it writes moves 3–5 as the matrix \(2X^\top(X\theta - y)\)). Its slip: the correct derivative is (15, 1, 25) and the new θ is (−0.5, −2.1, 0.5).`,
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
