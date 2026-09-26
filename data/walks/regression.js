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
      start: R`<p><b>The function:</b></p>\[J(\theta) = \;\square\]<p><b>Its derivative by one knob \(\theta_j\):</b></p>\[\frac{dJ}{d\theta_j} = \;\square\]<p><b>The gradient (all knobs as a list):</b></p>\[\nabla J(\theta) = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question (it's our \(f\)): <div class="formula">\[\begin{aligned}J(\theta) = \;&\sum_{i}\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)^2\\ &+ \lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\end{aligned}\]</div>`,
          why: R`<p>The \(\sum_i\) only means: one squared bracket <b>per sample</b>, all added up. With 2025-C's 4 samples it literally is:</p>
\[\begin{aligned}J(\theta) = \;&(\theta_0 - 1\theta_1 + 1\theta_2 - 6)^2 &&\leftarrow \text{sample 1}\\ +\;&(\theta_0 - 2\theta_1 + 0\theta_2 - 4)^2 &&\leftarrow \text{sample 2}\\ +\;&(\theta_0 + 1\theta_1 + 3\theta_2 - 5)^2 &&\leftarrow \text{sample 3}\\ +\;&(\theta_0 + 0\theta_1 + 1\theta_2 - 1)^2 &&\leftarrow \text{sample 4}\\ +\;&\lambda\big(|\theta_0| + |\theta_1| + |\theta_2|\big)\end{aligned}\]
<p>Each bracket is "prediction − label" for one sample.</p>` },
        { line: R`<b>Derivative by \(\theta_j\)</b> — like \(2\cdot(x^2+3)\cdot 2x\): 2 · (…) · (the number in front of \(\theta_j\)), where (…) is the bracket copied as-is, and \(|\theta_j| \to \mathrm{sign}(\theta_j)\): <div class="formula">\[\begin{aligned}\frac{dJ}{d\theta_j} = \;&\sum_{i} 2\cdot\big(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\big)\cdot x^{(i)}_j\\ &+ \lambda\,\mathrm{sign}(\theta_j)\end{aligned}\]</div>`,
          why: R`<p><b>Each squared bracket:</b> \((\dots)^2 \to 2\cdot(\dots)\cdot(\text{derivative of }(\dots))\) — the same move as \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\).</p>
<p><b>Derivative of (…) by \(\theta_j\):</b> (…) is a plain sum like \(\theta_0 - 2\theta_1 + 0\theta_2 - 4\). Its derivative by \(\theta_1\) is just the number in front of \(\theta_1\): here \(-2\) — that sample's \(x_1\). In general it's that sample's \(x_j\), written \(x^{(i)}_j\) (for \(\theta_0\) it's 1).</p>
<p><b>Penalty:</b> only \(|\theta_j|\) contains \(\theta_j\). The derivative of \(|a|\) is its sign: +1 if positive, −1 if negative.</p>
<p>Written out for knob \(\theta_1\) with the 4 real brackets:</p>
\[\begin{aligned}\frac{dJ}{d\theta_1} = \;&2\cdot(\theta_0 - 1\theta_1 + 1\theta_2 - 6)\cdot(-1)\\ +\;&2\cdot(\theta_0 - 2\theta_1 + 0\theta_2 - 4)\cdot(-2)\\ +\;&2\cdot(\theta_0 + 1\theta_1 + 3\theta_2 - 5)\cdot(1)\\ +\;&2\cdot(\theta_0 + 0\theta_1 + 1\theta_2 - 1)\cdot(0)\\ +\;&\lambda\,\mathrm{sign}(\theta_1)\end{aligned}\]`,
          extra: [{ label: "check it with numbers (θ = (1, −2, 3), knob θ₁)", html: R`<div class="tw"><table><thead><tr><th>sample</th><th>(…) for this sample</th><th>its \(x_1\)</th><th>2 · (…) · \(x_1\)</th></tr></thead><tbody>
<tr><td>1</td><td>1 + 2 + 3 − 6 = 0</td><td>−1</td><td>0</td></tr><tr><td>2</td><td>1 + 4 + 0 − 4 = 1</td><td>−2</td><td>−4</td></tr>
<tr><td>3</td><td>1 − 2 + 9 − 5 = 3</td><td>1</td><td>6</td></tr><tr><td>4</td><td>1 + 0 + 3 − 1 = 3</td><td>0</td><td>0</td></tr>
<tr><td colspan="3"><b>add</b></td><td><b>2</b></td></tr></tbody></table></div>
<p>Plus the penalty \(\lambda\,\mathrm{sign}(\theta_1) = 1\cdot(-1) = -1\): \(\;2 - 1 = 1\). That's the middle entry of part 3's gradient \((15, 1, 25)\).</p>` }] },
        { line: R`<b>All knobs as a list</b> — the gradient is step 2 written for \(\theta_0\), \(\theta_1\), \(\theta_2\) (for \(\theta_0\) the "number in front" is 1): <div class="formula">\[\nabla J = \begin{bmatrix} \sum_i 2\cdot(\dots)\cdot 1 \;+\; \lambda\,\mathrm{sign}(\theta_0)\\[4pt] \sum_i 2\cdot(\dots)\cdot x^{(i)}_1 \;+\; \lambda\,\mathrm{sign}(\theta_1)\\[4pt] \sum_i 2\cdot(\dots)\cdot x^{(i)}_2 \;+\; \lambda\,\mathrm{sign}(\theta_2)\end{bmatrix}\]</div>`,
          why: R`<p>"The gradient" is nothing new: it's the derivative by each knob, stacked into a list — one row per knob. (…) is the same bracket as in step 2, copied as-is (each sample's prediction − label).</p>` },
        { line: R`<b>Select the pieces</b> — in each row of step 3, point at two pieces and say what they are: <div class="formula">\[\sum_i 2\cdot\underbrace{\color{#e8912d}(\dots)}_{\textstyle\color{#e8912d}\text{this part = }X\theta - y}\cdot\underbrace{\color{#4c8dff}x^{(i)}_j}_{\textstyle\color{#4c8dff}\text{this part = column } j\text{ of }X}\]</div>So each row is \(2\cdot\)(column \(j\) of \(X\)) · \((X\theta - y)\).`,
          why: R`<p><b>Orange piece — this part = \(X\theta - y\).</b> The sum runs over the samples, so the orange (…) takes every sample's value: sample 1's (…), sample 2's (…), … Each (…) is that sample's prediction − label, and all of them as a list is exactly \(X\theta - y\) (part 1: \(X\theta\) = all the predictions).</p>
<p><b>Blue piece — this part = column \(j\) of \(X\).</b> \(x^{(i)}_j\) over every sample is sample 1's \(x_j\), sample 2's \(x_j\), … — reading down column \(j\) of \(X\).</p>
<p><b>The sum multiplies them entry by entry and adds up</b> — that's a dot product: (column \(j\) of \(X\)) · \((X\theta - y)\).</p>
<p><b>Now select the whole list of rows:</b></p>
\[\underbrace{\begin{bmatrix}\text{column 0 of }X\cdot(X\theta - y)\\ \text{column 1 of }X\cdot(X\theta - y)\\ \text{column 2 of }X\cdot(X\theta - y)\end{bmatrix}}_{\textstyle\text{this part = }X^\top(X\theta - y)}\]
<p>Why: \(X^\top\) is \(X\) with its columns laid down as rows, and "\(X^\top\) times a list" dots each of those rows with the list — one result per column. That's exactly this list.</p>`,
          extra: [{ label: "see it with the real numbers (θ = (1, −2, 3))", html: R`<p>The four (…)'s, as a list: \(X\theta - y = (0, 1, 3, 3)\). Each column of \(X\) dotted with it:</p>
<div class="tw"><table><thead><tr><th>row of \(\nabla J\)</th><th>column of \(X\)</th><th>· (0, 1, 3, 3)</th></tr></thead><tbody>
<tr><td>\(\theta_0\)</td><td>(1, 1, 1, 1)</td><td>0 + 1 + 3 + 3 = 7</td></tr>
<tr><td>\(\theta_1\)</td><td>(−1, −2, 1, 0)</td><td>0 − 2 + 3 + 0 = 1</td></tr>
<tr><td>\(\theta_2\)</td><td>(1, 0, 3, 1)</td><td>0 + 0 + 9 + 3 = 12</td></tr></tbody></table></div>
<p>So \(X^\top(X\theta - y) = (7, 1, 12)\): the three sums, done in one go.</p>` }] },
        { line: R`<b>Put it together</b> — select the two pieces of the step 3 list, and that's the answer: <div class="formula">\[\nabla J(\theta) = \underbrace{2X^\top(X\theta - y)}_{\textstyle\text{= step 4's sums}} + \underbrace{\lambda\,\mathrm{sign}(\theta)}_{\textstyle\text{= the signs}}\]</div>`,
          why: R`<ul><li>The 2 from every term comes out in front: \(2X^\top(X\theta - y)\).</li>
</ul>
<p><b>sign(θ) with numbers:</b> \(\theta = (1, -2, 3)\) is short for the list \((\theta_0, \theta_1, \theta_2)\). sign of each: \(\mathrm{sign}(1) = +1\), \(\mathrm{sign}(-2) = -1\), \(\mathrm{sign}(3) = +1\). So \(\mathrm{sign}(\theta) = (1, -1, 1)\) — exactly like numpy:</p>
<pre><code>theta = np.array([1, -2, 3])
np.sign(theta)   # array([ 1, -1,  1])</code></pre>
<p><b>Where \(\lambda\,\mathrm{sign}(\theta)\) comes from — nothing is calculated, it's a shorthand.</b> Select the signs column of step 3:</p>
\[\underbrace{\begin{bmatrix}\lambda\,\mathrm{sign}(\theta_0)\\ \lambda\,\mathrm{sign}(\theta_1)\\ \lambda\,\mathrm{sign}(\theta_2)\end{bmatrix}}_{\textstyle\text{this part}} = \lambda\cdot\underbrace{\begin{bmatrix}\mathrm{sign}(\theta_0)\\ \mathrm{sign}(\theta_1)\\ \mathrm{sign}(\theta_2)\end{bmatrix}}_{\textstyle\text{this part = sign}(\theta)}\]
<ul><li>\(\lambda\) is in every row, so it comes out in front — like \((2a, 2b, 2c) = 2\cdot(a, b, c)\).</li>
<li>"\(\mathrm{sign}(\theta)\)" of a whole list simply <b>means</b> "the sign of each entry". It's a definition, not a step: the official solution writes "we define \(\mathrm{sign}(\theta)\) as the vector whose entries are \(\mathrm{sign}(\theta_j)\)".</li></ul>
<p>The official solution also writes step 2 with \(\theta^\top x^{(i)}\) — that's just short for the prediction \(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2\).</p>` },
      ],
      compare: R`The official solution's first line is move 2 (written with \(\theta^\top x^{(i)}\) for the prediction), and its last line is move 5.`,
    },

    "2025C-q1.3": {
      start: R`<p><b>The formula (from part 2), with the numbers plugged in:</b></p>\[\nabla J = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta) = \;\square\]<p><b>The step:</b></p>\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J = \;\square\]`,
      moves: [
        { line: R`<b>The formula</b> — part 2's answer, and the step rule: <div class="formula">\[\nabla J = \underbrace{\color{#e8912d}2X^\top(X\theta - y)}_{\textstyle\color{#e8912d}\text{this part: moves 2–3}} + \underbrace{\color{#4c8dff}\lambda\,\mathrm{sign}(\theta)}_{\textstyle\color{#4c8dff}\text{this part: move 4}}\]</div><div class="formula">\[\theta_{\text{new}} = \theta - 0.1\cdot\nabla J\]</div>We know \(\theta = (1, -2, 3)\), \(\lambda = 1\), and the step size 0.1 (the question's \(\eta\)).`,
          why: R`<p>"One iteration of gradient descent" = compute the gradient at the current \(\theta\), then take one small step against it. The gradient points uphill, so we subtract it to go downhill.</p>` },
        { line: R`<b>Errors \(X\theta - y\)</b> — each row of \(X\) · \(\theta\) gives a prediction, then subtract the label: <div class="formula">\[X\theta - y = (6, 5, 8, 4) - (6, 4, 5, 1) = (0, 1, 3, 3)\]</div>`,
          why: R`<p>Each prediction is one row of \(X\) (from part 1) times \(\theta = (1, -2, 3)\):</p>
\[\begin{aligned}\text{row 1: } & 1\cdot 1 + (-1)\cdot(-2) + 1\cdot 3 = 1 + 2 + 3 = 6\\ \text{row 2: } & 1\cdot 1 + (-2)\cdot(-2) + 0\cdot 3 = 1 + 4 + 0 = 5\\ \text{row 3: } & 1\cdot 1 + 1\cdot(-2) + 3\cdot 3 = 1 - 2 + 9 = 8\\ \text{row 4: } & 1\cdot 1 + 0\cdot(-2) + 1\cdot 3 = 1 + 0 + 3 = 4\end{aligned}\]
<p>numpy: <code>X @ theta - y</code>.</p>` },
        { line: R`<b>The orange part \(2X^\top(X\theta - y)\)</b> — each column of \(X\) · the errors, then ×2: <div class="formula">\[2X^\top(X\theta - y) = 2\cdot(7, 1, 12) = (14, 2, 24)\]</div>`,
          why: R`<p>\(X^\top\) times a list = each <b>column</b> of \(X\), dotted with that list (part 2, step 4). The errors are \((0, 1, 3, 3)\):</p>
\[\begin{aligned}\text{column 0: } & (1, 1, 1, 1)\cdot(0, 1, 3, 3) = 0 + 1 + 3 + 3 = 7\\ \text{column 1: } & (-1, -2, 1, 0)\cdot(0, 1, 3, 3) = 0 - 2 + 3 + 0 = 1\\ \text{column 2: } & (1, 0, 3, 1)\cdot(0, 1, 3, 3) = 0 + 0 + 9 + 3 = 12\end{aligned}\]
<p>numpy: <code>2 * X.T @ (X @ theta - y)</code>.</p>` },
        { line: R`<b>The blue part \(\lambda\,\mathrm{sign}(\theta)\)</b> — the sign of each knob, times \(\lambda = 1\): <div class="formula">\[1\cdot(\mathrm{sign}(1), \mathrm{sign}(-2), \mathrm{sign}(3)) = (1, -1, 1)\]</div>` },
        { line: R`<b>Put it together</b> — add the two parts, then take the step: <div class="formula">\[\nabla J = (14, 2, 24) + (1, -1, 1) = (15, 1, 25)\]</div><div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (1, -2, 3) - 0.1\cdot(15, 1, 25)\\ &= (1 - 1.5,\ -2 - 0.1,\ 3 - 2.5) = (-0.5,\ -2.1,\ 0.5)\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official solution says (15, 0, 25) — it's a slip", html: R`<p>\(2 + (-1) = 1\), not 0. So the middle gradient entry is 1, and the new middle knob is \(-2 - 0.1 = -2.1\) (the official solution prints \(-2\)). Its first line also says "\(\lambda = 2\)", but it then uses 1.</p>` }] },
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
