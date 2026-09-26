// "Show next move" walkthroughs for topic "regression". Written to spec/WALKS.md.
// Every number checked with numpy against 2025-C's table.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ───────────────────────────────────────── 2025-C Q1.1: X and y
    "2025C-q1.1": {
      moves: [
        { line: R`Read the target: \(\|X\theta - y\|^2 + \lambda\|\theta\|_1\) must equal the stem's sum, so entry \(i\) of \(X\theta - y\) must be the stem's bracket for sample \(i\).`,
          why: R`<p><b>One loss, written twice.</b> The stem writes \(J_\lambda\) as a <b>sum over the samples</b>. Part 1 writes the <b>same</b> \(J_\lambda\) with matrices and asks you for the matrices that make the two equal. It is a translation job, not a new loss (Regression note 1, "Reading part 1").</p>
<p><b>What \(\|v\|^2\) means.</b> Square every entry of the vector \(v\) and add them up: \(\|v\|^2 = v_1^2 + v_2^2 + \dots + v_n^2\) (Regression note 2). So \(\|X\theta - y\|^2\) is "entry 1 squared + entry 2 squared + …". That matches the stem's \(\sum_i(\text{bracket}_i)^2\) exactly when entry \(i\) of \(X\theta - y\) is the bracket of sample \(i\).</p>
<p><b>The bracket.</b> \(\theta_0 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y^{(i)}\) is sample \(i\)'s prediction minus its true label. So \(X\theta\) must be the vector of <b>predictions</b> and \(y\) the vector of <b>labels</b>.</p>
<p><b>The penalty already matches.</b> \(\|\theta\|_1\) means \(|\theta_0| + \dots + |\theta_p|\) (Regression note 3). Nothing to build there.</p>` },

        { line: R`Write sample 1's prediction as a dot product: \(\theta_0\cdot 1 + \theta_1\cdot(-1) + \theta_2\cdot 1 = (1, -1, 1)\cdot\theta\)`,
          why: R`<p><b>The numbers.</b> The table has \(p = 2\) features, so \(\theta = (\theta_0, \theta_1, \theta_2)\). Sample 1 has \(x_1 = -1\), \(x_2 = 1\), so its prediction is \(\theta_0 + \theta_1\cdot(-1) + \theta_2\cdot 1\).</p>
<p><b>The trick for the bias.</b> \(\theta_0\) is not multiplied by anything. Multiply it by 1, which changes nothing. Now every term is "number × knob", and a sum of "number × knob" terms is a <b>dot product</b>: \((1, x_1, x_2)\cdot(\theta_0, \theta_1, \theta_2)\) (Regression note 1, step 1).</p>` },

        { line: R`Do the same for samples 2, 3, 4: \((1, -2, 0)\), \((1, 1, 3)\), \((1, 0, 1)\). Always a 1 first, then \(x_1\), then \(x_2\).`,
          why: R`<p>Read each row of the table the same way: sample 2 has \(x_1 = -2\), \(x_2 = 0\), so its vector is \((1, -2, 0)\); and so on.</p>
<p><b>Why this order.</b> The entries must line up with \(\theta = (\theta_0, \theta_1, \theta_2)\): the 1 pairs with \(\theta_0\), \(x_1\) with \(\theta_1\), \(x_2\) with \(\theta_2\). The label \(y\) is <b>not</b> in these vectors; it goes into \(y\) (move 5).</p>` },

        { line: R`Stack the four vectors as the rows of \(X\), one row per sample:
          <div class="formula">\[X = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix}\]</div>`,
          why: R`<p><b>Why stacking works.</b> Multiplying a matrix by a vector means: dot <b>each row</b> with the vector. Row \(i\) of \(X\) is sample \(i\)'s vector from moves 2&ndash;3, so row \(i\) dotted with \(\theta\) is sample \(i\)'s prediction. One multiplication \(X\theta\) gives all four predictions (Regression note 1, step 3).</p>
<p><b>The ones column</b> is simply the "1" you put in front of every sample in move 2.</p>
<p><b>Size check.</b> \(X\) is \(4\times 3\) (4 samples; the ones column plus 2 features), \(\theta\) is \(3\times 1\), so \(X\theta\) is \(4\times 1\): one prediction per sample, the same size as \(y\).</p>`,
          extra: [{ label: "trap", html: R`<p>Forgetting the ones column makes \(X\) a \(4\times 2\) matrix, which can't even multiply a \(\theta\) with 3 entries. It loses this part and makes every later part (gradient, the step, the code) wrong too (Regression note 1).</p>` }] },

        { line: R`Write the labels in the same row order as the column \(y\):
          <div class="formula">\[y = \begin{bmatrix}6\\4\\5\\1\end{bmatrix}\]</div>`,
          why: R`<p>Entry \(i\) of \(X\theta - y\) must be "prediction of sample \(i\) minus label of sample \(i\)" (move 1). Row \(i\) of \(X\) is sample \(i\), so entry \(i\) of \(y\) must be sample \(i\)'s label: the \(y\) column of the table, top to bottom.</p>
<p>Moves 4 and 5 together are the answer.</p>` },
      ],
      compare: R`The official answer is exactly your moves 4 and 5: \(X\) with the ones column first, and \(y = (6, 4, 5, 1)\).`,
    },

    // ───────────────────────────────────────── 2025-C Q1.2: the gradient
    "2025C-q1.2": {
      moves: [
        { line: R`Translate the question: the gradient is the vector of partial derivatives, one per knob. So find \(\dfrac{\partial J_\lambda}{\partial\theta_j}\) for one general knob \(j\).`,
          why: R`<p><b>The picture.</b> Imagine \(J\) as a landscape. Your position is the knob setting \(\theta\); the height at that position is the loss \(J(\theta)\). Training = finding the lowest point. You can't see the whole landscape, but where you stand you can feel which way the ground slopes. The gradient is that slope (Regression note 5).</p>
<p><b>One knob.</b> The partial derivative \(\partial J/\partial\theta_1\) answers: "if I turn <i>only</i> knob \(\theta_1\) up a tiny bit and hold the other knobs still, how fast does \(J\) change?" You compute it like an ordinary derivative, treating the other knobs as constants.</p>
<p><b>All knobs.</b> The gradient stacks the partial derivatives into one vector:</p>
\[\nabla J = \left(\frac{\partial J}{\partial\theta_0},\ \frac{\partial J}{\partial\theta_1},\ \dots,\ \frac{\partial J}{\partial\theta_p}\right)\]
<p>It points uphill, so \(-\nabla J\) points downhill; gradient descent (part 3) walks that way. If we find entry \(j\) for a general \(j\), we have every entry.</p>` },

        { line: R`Name the bracket: \(r_i = \theta^\top x^{(i)} - y^{(i)}\), so \(J_\lambda(\theta) = \sum_i r_i^2 + \lambda\big(|\theta_0| + \dots + |\theta_p|\big)\).`,
          why: R`<p><b>The bracket is the residual.</b> \(\theta_0 + \sum_j \theta_j x^{(i)}_j\) is the model's prediction for sample \(i\), and \(y^{(i)}\) is its true label. Prediction minus truth is the <b>residual</b> \(r_i\) (Regression note 0).</p>
<p><b>Why \(\theta^\top x^{(i)}\).</b> Write the bias as \(\theta_0\cdot 1\). Then the prediction is a dot product of the knobs \((\theta_0, \theta_1, \dots, \theta_p)\) with the sample's features with a 1 in front, \((1, x^{(i)}_1, \dots, x^{(i)}_p)\). That vector is row \(i\) of \(X\) (part 1, move 2).</p>
<p><b>The two parts of \(J_\lambda\).</b> \(\sum_i r_i^2\) is the squared error: squaring stops a \(+3\) and a \(-3\) from cancelling (Regression note 2). The second part is the LASSO penalty, which makes large weights cost something. It <b>includes</b> \(\theta_0\) here (Regression note 3).</p>
<p>Naming \(r_i\) keeps the next lines short.</p>` },

        { line: R`Split into the two parts: \(\dfrac{\partial J_\lambda}{\partial\theta_j} = \dfrac{\partial}{\partial\theta_j}\sum_i r_i^2 \;+\; \dfrac{\partial}{\partial\theta_j}\lambda\big(|\theta_0| + \dots + |\theta_p|\big)\)`,
          why: R`<p>The derivative of a sum is the sum of the derivatives. So we can handle the squared-error part (moves 4&ndash;6) and the penalty (move 7) separately, and add them at the end (move 8).</p>` },

        { line: R`Differentiate one residual: \(\dfrac{\partial r_i}{\partial\theta_j} = x^{(i)}_j\) (with \(x^{(i)}_0 = 1\)).`,
          why: R`<p>Write it out: \(r_i = \theta_0\cdot 1 + \theta_1 x^{(i)}_1 + \dots + \theta_p x^{(i)}_p - y^{(i)}\). Differentiate with respect to \(\theta_j\): only the term \(\theta_j x^{(i)}_j\) contains \(\theta_j\). Everything else is a constant with derivative 0. So the result is the number multiplying \(\theta_j\), which is \(x^{(i)}_j\).</p>
<p>For \(\theta_0\) the number multiplying it is the 1, so call it "feature 0": \(x^{(i)}_0 = 1\). That is the ones column of \(X\).</p>
<p class="small">The official solutions quote this as "we've seen in class that \(\frac{\partial}{\partial w_j} r_i = x^{(i)}_j\)". You may do the same.</p>` },

        { line: R`Apply the chain rule to one sample: \(\dfrac{\partial}{\partial\theta_j} r_i^2 = 2r_i\cdot\dfrac{\partial r_i}{\partial\theta_j} = 2r_i\,x^{(i)}_j\)`,
          why: R`<p>Sample \(i\) contributes \(r_i^2\): an outer function (squaring) of an inner function (\(r_i\), which depends on \(\theta_j\)). Chain rule = (outer derivative) \(\times\) (inner derivative). The outer derivative of \(u^2\) is \(2u\), so \(2r_i\). The inner derivative is move 4's \(x^{(i)}_j\).</p>` },

        { line: R`Add over the samples: \(\dfrac{\partial}{\partial\theta_j}\sum_{i=1}^{n} r_i^2 = 2\sum_{i=1}^{n} x^{(i)}_j\big(\theta^\top x^{(i)} - y^{(i)}\big)\)`,
          why: R`<p>The derivative of a sum is the sum of the derivatives, so add move 5 over \(i = 1, \dots, n\): \(\sum_i 2r_i x^{(i)}_j\). The 2 is the same in every term, so pull it out in front. Then write \(r_i\) back in full, as the official solution does.</p>` },

        { line: R`Differentiate the penalty: \(\dfrac{\partial}{\partial\theta_j}\lambda\big(|\theta_0| + \dots + |\theta_p|\big) = \lambda\,\mathrm{sign}(\theta_j)\)`,
          why: R`<p>The absolute value has two straight pieces: \(|a| = a\) when \(a > 0\) (slope \(+1\)) and \(|a| = -a\) when \(a \lt 0\) (slope \(-1\)). So its derivative is the <b>sign</b> of \(a\):</p>
\[\begin{aligned}\frac{d}{da}|a| &= \mathrm{sign}(a)\\ &= \begin{cases}+1 & a > 0\\ -1 & a \lt 0\end{cases}\end{aligned}\]
<p>At \(a = 0\) the graph has a corner and there is no derivative. That is why the question says "you may assume that all entries of \(\theta\) are non-zero".</p>
<p>In \(\lambda(|\theta_0| + \dots + |\theta_p|)\) only the term \(|\theta_j|\) contains \(\theta_j\); the rest are constants. So the result is \(\lambda\,\mathrm{sign}(\theta_j)\). Note there is <b>no factor 2</b> here (unlike ridge's \(\theta_j^2\); Regression note 6).</p>` },

        { line: R`Add moves 6 and 7 to get the \(j\)-th partial derivative:
          <div class="formula">\[\begin{aligned}\frac{\partial J_\lambda}{\partial\theta_j} = &\;2\sum_{i=1}^{n} x^{(i)}_j\big(\theta^\top x^{(i)} - y^{(i)}\big)\\ &+ \lambda\,\mathrm{sign}(\theta_j)\end{aligned}\]</div>`,
          why: R`<p>Move 3 split \(J_\lambda\) into two parts; this is where they come back together. This line is exactly the first line of the official solution. The question asks for the whole gradient, though, so stack it over all \(j\) (move 9).</p>` },

        { line: R`Read the sum as a dot product, \(\sum_i x^{(i)}_j r_i = (\text{column } j \text{ of } X)\cdot r\). Over all \(j\) it becomes \(X^\top(X\theta - y)\); the signs stack into \(\mathrm{sign}(\theta)\).`,
          why: R`<p>Write the sum out: \(\sum_i x^{(i)}_j r_i = x^{(1)}_j r_1 + x^{(2)}_j r_2 + \dots + x^{(n)}_j r_n\). The numbers \(x^{(1)}_j, \dots, x^{(n)}_j\) are feature \(j\) of every sample: exactly <b>column \(j\) of \(X\)</b>. So the sum is the dot product (column \(j\) of \(X\)) \(\cdot\, r\).</p>
<p>\(X^\top\) (X transposed) is \(X\) with its columns turned into rows. So \(X^\top r\) computes exactly these dot products, one per column, all at once. And \(r = X\theta - y\) is the vector of all residuals (Regression note 1).</p>
<p>\(\mathrm{sign}(\theta)\) is the vector \((\mathrm{sign}(\theta_0), \dots, \mathrm{sign}(\theta_p))\): the official solution calls it "the vector in \(\{-1, +1\}^{p+1}\)".</p>
<div class="trapline"><b>Trap:</b> it is \(X^\top(X\theta - y)\), not \(X(X\theta - y)\). The gradient has one entry per <b>knob</b>, not per sample. Size check (2025-C): \(X^\top\) is \(3\times 4\), \(X\theta - y\) is \(4\times 1\), product \(3\times 1\).</div>` },

        { line: R`Write the answer:
          <div class="formula">\[\nabla J_\lambda(\theta) = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\]</div>`,
          why: R`<p>Move 8 for every \(j\), written with move 9's vectors. "Do not use numeric values for \(X\) and \(y\)" means: answer with the symbols, not the table. That's what this is.</p>`,
          extra: [{ label: "where this goes next (part 3)", html: R`<p>Part 3 plugs 2025-C's numbers into exactly this formula, at \(\theta = (1, -2, 3)\) with \(\lambda = 1\): first \(X\theta - y\), then \(2X^\top(X\theta - y)\), then \(+\,\lambda\,\mathrm{sign}(\theta)\). It comes out as \((15, 1, 25)\).</p>` }] },
      ],
      compare: R`Its first line is your move 8; its last line is your move 10.`,
    },

    // ───────────────────────────────────────── 2025-C Q1.3: one gradient-descent step
    "2025C-q1.3": {
      moves: [
        { line: R`Write the update rule you'll fill in: \(\theta_{\text{new}} = \theta - \eta\,\nabla J_\lambda(\theta)\), with \(\theta = (1, -2, 3)\), \(\lambda = 1\), \(\eta = 0.1\).`,
          why: R`<p><b>One iteration = one step downhill.</b> The gradient points uphill (part 2, move 1), so we step the <b>opposite</b> way: subtract it. \(\eta\) ("eta", the learning rate) makes the step small (Regression note 8).</p>
<p><b>The plan.</b> Part 2 gave \(\nabla J_\lambda = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\). So:</p>
<ol><li>the residuals \(X\theta - y\) (moves 2&ndash;6),</li><li>\(X^\top(X\theta - y)\) (moves 7&ndash;9),</li><li>the whole gradient (move 10),</li><li>the step (move 11).</li></ol>
<p>"Show all intermediate calculations" means: write each of these vectors down. Each one earns partial credit even if a later number slips.</p>`,
          extra: [{ label: "slip in the official solution", html: R`<p>Its first line says "\(\lambda = 2\)". That is a typo: the question says \(\lambda = 1\), and the solution itself multiplies by 1 two lines later.</p>` }] },

        { line: R`Compute prediction 1 (row 1 of \(X\) dotted with \(\theta\)): \((1, -1, 1)\cdot(1, -2, 3) = 1\cdot 1 + (-1)\cdot(-2) + 1\cdot 3 = 1 + 2 + 3 = 6\)`,
          why: R`<p>\(X\theta\) is the vector of all predictions: entry \(i\) is row \(i\) of \(X\) dotted with \(\theta\) (part 1, move 4). Each product pairs one feature with its knob: \(1\cdot\theta_0\), \(x_1\cdot\theta_1\), \(x_2\cdot\theta_2\).</p>
<p>\((-1)\cdot(-2) = +2\): minus times minus is plus.</p>` },

        { line: R`Prediction 2: \((1, -2, 0)\cdot(1, -2, 3) = 1\cdot 1 + (-2)\cdot(-2) + 0\cdot 3 = 1 + 4 + 0 = 5\)`,
          why: R`<p>Same recipe with row 2 of \(X\). Sample 2 has \(x_2 = 0\), so \(\theta_2\) doesn't affect its prediction at all.</p>` },

        { line: R`Prediction 3: \((1, 1, 3)\cdot(1, -2, 3) = 1\cdot 1 + 1\cdot(-2) + 3\cdot 3 = 1 - 2 + 9 = 8\)`,
          why: R`<p>Row 3 of \(X\). Here \(x_1 = +1\), so \(\theta_1 = -2\) pulls the prediction <b>down</b> by 2.</p>` },

        { line: R`Prediction 4: \((1, 0, 1)\cdot(1, -2, 3) = 1\cdot 1 + 0\cdot(-2) + 1\cdot 3 = 1 + 0 + 3 = 4\)`,
          why: R`<p>Row 4 of \(X\). So \(X\theta = (6, 5, 8, 4)\): the four predictions.</p>` },

        { line: R`Subtract the labels: \(X\theta - y = (6, 5, 8, 4) - (6, 4, 5, 1) = (6-6,\ 5-4,\ 8-5,\ 4-1) = (0, 1, 3, 3)\)`,
          why: R`<p>Residual = prediction minus true label, sample by sample (part 2, move 2). Sample 1 is predicted exactly (residual 0); samples 3 and 4 are predicted 3 too high.</p>
<p>On the exam, write it as columns, like the official first line: \(X\theta - y = X\begin{bmatrix}1\\-2\\3\end{bmatrix} - y = \begin{bmatrix}6\\5\\8\\4\end{bmatrix} - \begin{bmatrix}6\\4\\5\\1\end{bmatrix} = \begin{bmatrix}0\\1\\3\\3\end{bmatrix}\).</p>` },

        { line: R`Entry 0 of \(X^\top r\), column 0 of \(X\) dotted with \(r\): \((1, 1, 1, 1)\cdot(0, 1, 3, 3) = 1\cdot 0 + 1\cdot 1 + 1\cdot 3 + 1\cdot 3 = 0 + 1 + 3 + 3 = 7\)`,
          why: R`<p>\(X^\top\) turns the <b>columns</b> of \(X\) into rows, so \(X^\top r\) is one dot product per column of \(X\) (part 2, move 9). \(r = (0, 1, 3, 3)\) is move 6's residual vector.</p>
<p>Column 0 is the ones column, so entry 0 is simply the sum of the residuals. It belongs to the bias \(\theta_0\).</p>` },

        { line: R`Entry 1, column 1 of \(X\): \((-1, -2, 1, 0)\cdot(0, 1, 3, 3) = (-1)\cdot 0 + (-2)\cdot 1 + 1\cdot 3 + 0\cdot 3 = 0 - 2 + 3 + 0 = 1\)`,
          why: R`<p>Column 1 of \(X\) is feature \(x_1\) of all four samples: the \(X_1\) column of the table.</p>` },

        { line: R`Entry 2, column 2 of \(X\): \((1, 0, 3, 1)\cdot(0, 1, 3, 3) = 1\cdot 0 + 0\cdot 1 + 3\cdot 3 + 1\cdot 3 = 0 + 0 + 9 + 3 = 12\)`,
          why: R`<p>Column 2 is the \(X_2\) column of the table. So \(X^\top(X\theta - y) = (7, 1, 12)\).</p>` },

        { line: R`Double it and add the penalty part:
          <div class="formula">\[\begin{aligned}\nabla J_\lambda &= 2\cdot(7, 1, 12) + 1\cdot(1, -1, 1)\\ &= (14 + 1,\ 2 + (-1),\ 24 + 1)\\ &= (15, 1, 25)\end{aligned}\]</div>`,
          why: R`<p><b>The 2</b> comes from part 2's \(2X^\top(X\theta - y)\): \(2\cdot(7, 1, 12) = (14, 2, 24)\).</p>
<p><b>The signs.</b> \(\theta = (1, -2, 3)\): 1 is positive \(\to +1\), \(-2\) is negative \(\to -1\), 3 is positive \(\to +1\). So \(\mathrm{sign}(\theta) = (1, -1, 1)\), and \(\lambda = 1\) leaves it unchanged.</p>
<p><b>Add entry by entry:</b> \(14 + 1 = 15\), \(2 + (-1) = 1\), \(24 + 1 = 25\).</p>`,
          extra: [{ label: "slip in the official solution", html: R`<p>The official solution prints the middle entry as <b>0</b>. That is a slip: \(2 + (-1) = 1\). The correct gradient is \((15, 1, 25)\).</p>` }] },

        { line: R`Take the step, entry by entry:
          <div class="formula">\[\begin{aligned}\theta_{\text{new}} &= (1, -2, 3) - 0.1\cdot(15, 1, 25)\\ &= (1 - 1.5,\ -2 - 0.1,\ 3 - 2.5)\\ &= (-0.5,\ -2.1,\ 0.5)\end{aligned}\]</div>`,
          why: R`<p>First \(\eta\nabla J_\lambda = 0.1\cdot(15, 1, 25) = (1.5, 0.1, 2.5)\), then subtract it from \(\theta\), one knob at a time.</p>
<p>Every gradient entry is positive (turning any knob up makes the loss worse), so every knob is turned <b>down</b>. The knob with the biggest gradient entry, \(\theta_2\) (25), moves the most.</p>
<p>This is the answer: \(\theta = (-0.5, -2.1, 0.5)\).</p>`,
          extra: [{ label: "slip in the official solution", html: R`<p>Because of the middle-entry slip (move 10), the official solution prints the new \(\theta\) as \((-0.5, -2, 0.5)\). The correct middle entry is \(-2 - 0.1\cdot 1 = -2.1\).</p>` },
                  { label: "did the step help? (not asked)", html: R`<p>The loss before the step: residuals \((0, 1, 3, 3)\) give \(0 + 1 + 9 + 9 = 19\), plus the penalty \(1\cdot(1 + 2 + 3) = 6\), so \(J_1 = 25\).</p>
<p>After the step, the residuals are \((-3.9, -0.3, -6.1, -1)\), so the squared error is \(15.21 + 0.09 + 37.21 + 1 = 53.51\), plus the penalty \(0.5 + 2.1 + 0.5 = 3.1\), so \(J_1 = 56.61\).</p>
<p>It went <b>up</b>: \(\eta = 0.1\) is too big for this table, and the step overshot the bottom of the valley. The exam doesn't ask about this; it only wants the one step (Regression note 8).</p>` }] },
      ],
      compare: R`Its \(X\theta - y\) line is your moves 2&ndash;6, its \(2X^\top(X\theta - y)\) line is moves 7&ndash;9 (doubled in move 10), its \(\nabla J_\lambda\) line is move 10, and its update is move 11. Two slips: the first line says "\(\lambda = 2\)" (it uses 1), and the middle gradient entry is printed 0 but \(2 + (-1) = 1\), so the correct update is \((-0.5, -2.1, 0.5)\), not \((-0.5, -2, 0.5)\).`,
    },

    // ───────────────────────────────────────── 2025-C Q1.4: compare θ* with θ̃
    "2025C-q1.4": {
      moves: [
        { line: R`Notice both vectors are scored on the <b>same</b> loss, the LASSO loss \(J_\lambda\) (the official solution takes \(\lambda = 1\) from part 3).`,
          why: R`<p><b>What the question hands you.</b> Two knob settings, made in two different ways: \(\theta^*\) (gradient descent run to the end) and \(\tilde\theta\) (a formula). It asks which one gives the lower value of \(J_\lambda\).</p>
<p><b>No numbers needed.</b> "Briefly justify" means a short argument about what each vector was built to do (Regression note 11).</p>` },

        { line: R`Say what \(\theta^*\) is: gradient descent on \(J_\lambda\) ran until it converged, so \(\theta^*\) minimizes \(J_\lambda\).`,
          why: R`<p>Gradient descent keeps stepping downhill on the loss it is given (part 3). "Converged" means it reached the bottom, where the ground is flat and the steps stop moving it. So \(\theta^*\) is the lowest point of \(J_\lambda\), penalty included.</p>` },

        { line: R`Write what "minimizes" means: \(J_\lambda(\theta^*) \le J_\lambda(\theta)\) for every \(\theta\).`,
          why: R`<p>"\(\theta^*\) is the minimizer" says: no knob setting has a lower loss. So whatever \(\theta\) you plug in on the right, it can't beat \(\theta^*\).</p>` },

        { line: R`Say what \(\tilde\theta\) is: \((X^\top X)^{-1}X^\top y\) is the least-squares solution, the minimizer of the plain squared error \(J_0\) (no penalty).`,
          why: R`<p><b>Where the formula comes from.</b> Take the gradient of the plain squared error, \(2X^\top(X\theta - y)\), and set it to 0:</p>
\[\begin{aligned}2X^\top(X\theta - y) &= 0\\ X^\top X\,\theta &= X^\top y\\ \theta &= (X^\top X)^{-1}X^\top y\end{aligned}\]
<p>(Regression note 9; it is also on the formula sheet.) There is no \(\lambda\) anywhere: \(\tilde\theta\) never looked at the penalty. It is the bottom of \(J_{\lambda=0}\), not of \(J_{\lambda=1}\).</p>` },

        { line: R`Plug \(\theta = \tilde\theta\) into move 3: \(J_\lambda(\theta^*) \le J_\lambda(\tilde\theta)\).`,
          why: R`<p>Move 3 holds for <b>every</b> \(\theta\), so in particular for the one the question hands you, \(\tilde\theta\).</p>` },

        { line: R`Rule out "=": \(\tilde\theta\) ignores the penalty, so it has no reason to minimize \(J_\lambda\). Answer: \(J_\lambda(\theta^*) \lt J_\lambda(\tilde\theta)\).`,
          why: R`<p><b>Why not equal, with part 2's formula.</b> \(\tilde\theta\) was found by making the squared-error gradient 0 (move 4). So at \(\tilde\theta\) the LASSO gradient is</p>
\[\nabla J_\lambda(\tilde\theta) = \underbrace{2X^\top(X\tilde\theta - y)}_{=\,0} + \lambda\,\mathrm{sign}(\tilde\theta) = \lambda\,\mathrm{sign}(\tilde\theta)\]
<p>Every entry of that is \(+\lambda\) or \(-\lambda\), never 0. So the ground at \(\tilde\theta\) is <b>not flat</b> on the LASSO landscape: \(\tilde\theta\) is not its bottom, and the bottom \(\theta^*\) is strictly lower.</p>
<p>The official answer says it in one sentence: \(\theta^*\) minimizes \(J_{\lambda=1}\), \(\tilde\theta\) minimizes \(J_{\lambda=0}\), "so we expect \(J_{\lambda=1}(\theta^*) \lt J_{\lambda=1}(\tilde\theta)\)".</p>`,
          extra: [{ label: "see it with 2025-C's numbers (not asked)", html: R`<p>Computed with numpy (Regression note 11): \(\tilde\theta = \left(-\tfrac{22}{7}, -\tfrac{55}{14}, \tfrac{29}{7}\right)\) has squared error \(\tfrac{25}{14}\) and penalty \(\tfrac{157}{14}\), so \(J_1(\tilde\theta) = \tfrac{182}{14} = 13\).</p>
<p>The LASSO minimizer \(\theta^* \approx (0, -2.202, 2.355)\) has squared error \(\approx 4.101\) and penalty \(\approx 4.557\), so \(J_1(\theta^*) \approx 8.66 \lt 13\). ✓</p>` },
                  { label: "trap", html: R`<p>Score both vectors on the loss the question names, \(J_\lambda\). On the <b>plain</b> loss \(J_0\) the answer flips: \(J_0(\tilde\theta) \approx 1.79 \lt 4.10 \approx J_0(\theta^*)\). Each vector wins on the loss it was built to minimize.</p>` }] },
      ],
      compare: R`Its first sentence is your moves 2&ndash;3, its second is move 4, and its conclusion is move 6.`,
    },

    // ───────────────────────────────────────── 2025-C Q1.5: find the bugs in the CV code
    "2025C-q1.5": {
      moves: [
        { line: R`Read the task and docstring: goal = the \(\lambda\) with the smallest error on unseen data; \(X\) has the ones column; lines 8&ndash;13 are correct.`,
          why: R`<p><b>What the code should do</b> (\(k\)-fold cross-validation, Regression note 13):</p>
<ol><li>Split the rows into <code>n_splits</code> groups ("folds").</li>
<li>For each fold: train on all the <b>other</b> rows, then measure the squared error of the predictions on <b>this</b> fold (the validation rows).</li>
<li>Average the fold errors: that is the <b>CV risk</b> of this \(\lambda\).</li>
<li>Keep the \(\lambda\) with the <b>smallest</b> CV risk.</li></ol>
<p><b>Two different losses.</b> Training (inside <code>solve_lasso</code>) uses the penalized loss \(J_\lambda\): that is where \(\lambda\) goes. Validation measures plain squared prediction error, with <b>no</b> penalty.</p>
<p><b>The plan.</b> Lines 8&ndash;13 split the folds and are given as correct. Check every other line against the steps above, one at a time.</p>`,
          extra: [{ label: "the code with the exam's line numbers", html: R`<p>The exam page numbers the lines in a left margin (the cropped image above doesn't show it):</p>
<pre><code> 1  n = X.shape[1]
 2  best_lmd = None
 3
 4  min_cv_risk = np.inf
 5  for lmd in lmd_values:
 6     # find cv risk for each fold
 7     lo_risk = []
 8     for i in range(n_splits):
 9        left_out_indices = np.arange(n)[i::n_splits]
10        X_train = X[[i for i in range(n) if i not in left_out_indices], :]
11        y_train = y[[i for i in range(n) if i not in left_out_indices]]
12        X_val = X[left_out_indices, :]
13        y_val = y[left_out_indices]
14
15        w_star = solve_lasso(X_train, y_train, lmd)
16        y_pred = X_val @ w_star + lmd * np.sum(np.abs(w_star))
17        risk = np.sum((y_train - y_pred) ** 2)
18        lo_risk.append(risk)
19
20     if np.mean(lo_risk) > min_cv_risk:
21        min_cv_risk = np.sum(lo_risk)
22        best_lmd = lmd
23
24  return best_lmd</code></pre>` },
                  { label: "from your Moed B", html: R`<p>In 2026-B Q1.4 the docstring spelled out the stopping rule (<code>||grad J(w)||_2 &lt;= epsilon</code>) and the answer <code>grad &lt; epsilon</code> missed it. Code questions hide half the answer in the docstring and comments: read them first.</p>` }] },

        { line: R`Check line 1, <code>n = X.shape[1]</code>: \(n\) must count samples (rows), but <code>shape[1]</code> counts columns. Bug: should be <code>n = X.shape[0]</code>.`,
          why: R`<p><code>X.shape</code> is (number of rows, number of columns). Rows are samples; columns are the ones column plus the features.</p>
<p>\(n\) is used in <code>np.arange(n)</code> and <code>range(n)</code> (lines 9&ndash;11) to list the row numbers that get split into folds. So it must be the number of rows.</p>
<p><b>With 2025-C's table:</b> \(X\) is \(4\times 3\), so <code>X.shape[1]</code> = 3 and row 4 would never be used, for training or validation (Regression note 13).</p>` },

        { line: R`Check lines 2&ndash;7: start values <code>None</code> and <code>np.inf</code>, a loop over <code>lmd_values</code>, a fresh <code>lo_risk = []</code> per \(\lambda\). All fine.`,
          why: R`<p><code>np.inf</code> is infinity: a "best so far" that any real risk beats, so the first \(\lambda\) always gets stored.</p>
<p><code>lo_risk</code> ("leave-out risk") is emptied for each new \(\lambda\), so it only ever holds that \(\lambda\)'s fold errors. Line 6 is a comment.</p>` },

        { line: R`Check line 15, <code>w_star = solve_lasso(X_train, y_train, lmd)</code>: train on the training rows with this \(\lambda\). Fine.`,
          why: R`<p>This is where \(\lambda\) belongs: the solver minimizes \(J_\lambda\), penalty included, using only the training rows. The validation rows stay hidden from it.</p>` },

        { line: R`Check line 16: a prediction is just <code>X_val @ w_star</code>; the added <code>lmd * …</code> term is the penalty. Bug: should be <code>y_pred = X_val @ w_star</code>.`,
          why: R`<p><b>A prediction</b> for a row is \(\theta^\top x\): the row dotted with the weights (part 1). For all validation rows at once that is <code>X_val @ w_star</code>.</p>
<p><b>The penalty</b> \(\lambda\|\theta\|_1\) is part of the <b>training</b> loss (it keeps the weights small while fitting). It is not part of what the model predicts; adding it just shifts every prediction by the same number.</p>`,
          extra: [{ label: "line numbers in the official solution", html: R`<p>The official solution calls this "Line 15" and the next one "Line 16". On the exam's margin they are lines 16 and 17 (line 15 is <code>w_star = …</code>). Always write the statement next to the number, so the grader sees which line you mean.</p>` }] },

        { line: R`Check line 17: validation predictions must be compared with validation labels, not <code>y_train</code>. Bug: should be <code>risk = np.sum((y_val - y_pred) ** 2)</code>.`,
          why: R`<p>Each error is "true label of a row minus the prediction for the <b>same</b> row". <code>y_pred</code> has one entry per validation row, so its partner is <code>y_val</code>. <code>y_train</code> holds different samples (and more of them).</p>
<p>The rest of the line is right: plain squared error, summed, with no penalty.</p>` },

        { line: R`Check line 18, <code>lo_risk.append(risk)</code>: one validation error per fold goes into the list. Fine.`,
          why: R`<p>After the fold loop, <code>lo_risk</code> holds <code>n_splits</code> numbers, one per fold. Lines 20&ndash;21 then use their average.</p>` },

        { line: R`Check line 20: we keep the <b>smallest</b> CV risk, so <code>&gt;</code> is backwards. Bug: should be <code>if np.mean(lo_risk) &lt; min_cv_risk:</code>.`,
          why: R`<p><code>np.mean(lo_risk)</code> is this \(\lambda\)'s CV risk, the average over the folds. A smaller error is better, so replace the best-so-far only when the new one is <b>smaller</b>.</p>
<p><b>What the bug does.</b> <code>min_cv_risk</code> starts at <code>np.inf</code>, and no number is larger than infinity. So the <code>if</code> never runs and the function returns <code>None</code>.</p>` },

        { line: R`Check line 21: store the same quantity you just compared, the mean. Bug: should be <code>min_cv_risk = np.mean(lo_risk)</code>.`,
          why: R`<p>The next \(\lambda\)'s <b>mean</b> is compared with <code>min_cv_risk</code> (line 20). With the <b>sum</b> stored instead, the bar is <code>n_splits</code> times too high (5 times, by default), so a worse \(\lambda\) can still "beat" it.</p>` },

        { line: R`Check lines 22 and 24: remember this \(\lambda\), and return the best one at the end. Fine.`,
          why: R`<p>Line 22 runs only when line 20 found a new best, so <code>best_lmd</code> always matches <code>min_cv_risk</code>. Line 24 returns it, as the docstring says.</p>` },

        { line: R`Write the answer: for at least three bugs, the line number, the wrong statement, and the fix (moves 2, 5, 6, 8, 9).`,
          why: R`<p>That is the format of the official answer. All five bugs:</p>
<div class="tw"><table><thead><tr><th>line</th><th>written</th><th>should be</th></tr></thead><tbody>
<tr><td>1</td><td><code>n = X.shape[1]</code></td><td><code>n = X.shape[0]</code></td></tr>
<tr><td>16</td><td><code>y_pred = X_val @ w_star + lmd * np.sum(np.abs(w_star))</code></td><td><code>y_pred = X_val @ w_star</code></td></tr>
<tr><td>17</td><td><code>risk = np.sum((y_train - y_pred) ** 2)</code></td><td><code>risk = np.sum((y_val - y_pred) ** 2)</code></td></tr>
<tr><td>20</td><td><code>if np.mean(lo_risk) &gt; min_cv_risk:</code></td><td><code>if np.mean(lo_risk) &lt; min_cv_risk:</code></td></tr>
<tr><td>21</td><td><code>min_cv_risk = np.sum(lo_risk)</code></td><td><code>min_cv_risk = np.mean(lo_risk)</code></td></tr>
</tbody></table></div>
<p>Add a few words of why to each (one per move above) if you have time.</p>`,
          extra: [{ label: "not a bug: the docstring's \"ridge\"", html: R`<p>The docstring calls <code>lmd_values</code> "ridge regression parameters". That's a leftover in a comment, not a statement, and the official answer doesn't list it. Spend your time on the five code lines.</p>` }] },
      ],
      compare: R`Its five bullets are your moves 2, 5, 6, 8 and 9. It numbers the <code>y_pred</code> and <code>risk</code> lines 15 and 16; on the exam's margin they are lines 16 and 17 (line 15 is <code>w_star = …</code>).`,
    },
  });
})();
