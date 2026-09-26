// Notes for topic "regression". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["regression"] = {
  intro: R`<p><b>What this topic is.</b> Question 1 of every past exam (2025-A, 2025-B, 2025-C, 2026-A, 2026-B) is about <b>regression</b>: learning to predict a number from a table of examples. It is worth 25 points, and — unlike most questions — it repeats almost exactly from exam to exam. That makes it the most "trainable" question on the paper.</p>
<p><b>What changes, and what doesn't.</b> Each exam picks a slightly different <i>loss</i> (the formula that scores how wrong a model is): squared error with a <b>ridge</b> penalty (2025-A, 2025-B), with a <b>LASSO</b> penalty (2025-C), with <b>per-sample weights</b> (2026-A), a <b>cubic</b> loss (2026-B). But the <i>kinds</i> of parts are always the same ones:</p>
<div class="tw"><table><thead><tr><th>Kind of part</th><th>Where it appeared</th><th>Note</th></tr></thead><tbody>
<tr><td>Write the data matrix \(X\) and label vector \(y\) (and \(\Gamma\))</td><td>2025-A 1, 2025-B 1, 2025-C 1, 2026-A 1</td><td>1</td></tr>
<tr><td>Work with the loss itself (write it out, as a polynomial)</td><td>2025-A 2</td><td>2–4</td></tr>
<tr><td>Derive the gradient</td><td>2025-A 3a, 2025-C 2, 2026-A 2, 2026-B 3</td><td>5–7</td></tr>
<tr><td>One gradient descent step with numbers</td><td>2025-A 3b, 2025-B 4, 2025-C 3</td><td>8</td></tr>
<tr><td>Closed-form solution / "is it possible analytically?"</td><td>2025-B 3, 2026-A 3</td><td>9–10</td></tr>
<tr><td>Rewrite the loss as plain least squares with \(X', y'\)</td><td>2025-B 2</td><td>10</td></tr>
<tr><td>Compare the losses of two solutions</td><td>2025-C 4</td><td>11</td></tr>
<tr><td>Code: fill in or debug a gradient descent loop</td><td>2025-B 5, 2026-A 4, 2026-B 4</td><td>12</td></tr>
<tr><td>Code: debug a cross-validation function</td><td>2025-A 4, 2025-C 5</td><td>13</td></tr>
<tr><td>KNN predictions, test MSE, feature normalization</td><td>2026-B 1, 2026-B 2</td><td>14–15</td></tr>
</tbody></table></div>
<p><b>How to use the notes.</b> Read them in order — each one starts from where the previous one stopped, so skipping ahead will feel like jumping. Every note has the same four blocks: <i>In plain words</i> (the idea, in small steps), <i>Symbols</i> (every new symbol decoded), <i>Worked example</i> (real numbers, every multiplication written out), and <i>On the exam</i> (how the exam phrases it, the first line to write, the recipe, the trap).</p>
<p><b>The guided question.</b> The worked examples use the table of <b>2025-C Question 1</b>, so when you open that question you will already recognise its numbers — do it first, start to finish. When a variant does not appear in 2025-C (weighted, cubic, KNN), the note uses the table of the exam that has it and says so. Then do 2025-A, 2025-B, 2026-A on your own, and finish with <b>2026-B</b> — your Moed B question — as the checkpoint. Each part has a "Stuck? Show the first move" button; use it before looking at the solution.</p>
<p><b>What the formula sheet gives you.</b> In the "Linear Regression" box: the linear model (note 0), the squared-error loss of one sample and its gradient (notes 2 and 5), and the least-squares solution (note 9). In the "Norms and Distances" box: the \(L_1\) and \(L_2\) norms (notes 3 and 15) and the distance between two points (note 14). You don't need to understand these symbols yet — each note decodes them when it gets there.</p>
<p><b>One thing to know about the sheet: its \(\tfrac12\).</b> The sheet writes the squared-error loss with a \(\tfrac12\) in front. The exam questions write it <i>without</i> the \(\tfrac12\). That is why the exams' gradients have an extra factor 2 that the sheet's gradient doesn't have — note 5 (last step) shows exactly where the 2 comes from. So never copy the sheet's gradient blindly: use the loss written in the question.</p>
<p>Everything else in these notes you must be able to produce yourself.</p>`,
  moves: [
    { title: "0 · Start here: what regression is, and what the symbols mean",
      idea: R`<h5>Step 1 — the table you are given</h5>
<p>Every regression question starts with a table. Each <b>row</b> is one example, called a <b>sample</b>. Each sample has a few <b>input numbers</b>, called <b>features</b> — in every exam so far there are two of them, named \(x_1\) and \(x_2\) — and one <b>output number</b>, called the <b>label</b> and named \(y\).</p>
<p>For example, the first row of 2025-C's table says: for this sample the features were \(x_1 = -1\) and \(x_2 = 1\), and its label was \(y = 6\).</p>
<h5>Step 2 — what we want</h5>
<p>We want a <b>rule</b> that takes the features of a sample and produces a guess for its label. If the rule guesses well on the table, we can also use it on new samples whose label we don't know. Such a rule is called a <b>model</b>, and its guess is called a <b>prediction</b>, written \(\hat y\) ("y-hat"; the hat always means "our guess", as opposed to the true \(y\)).</p>
<h5>Step 3 — the rule: a weighted sum</h5>
<p>In <b>linear regression</b> the rule always has the same shape: multiply each feature by a number, add the results, and add one more number on its own:</p>
\[\hat y = \theta_0 + \theta_1 x_1 + \theta_2 x_2\]
<p>The numbers \(\theta_0, \theta_1, \theta_2\) ("theta zero, one, two") are the model's <b>weights</b>, also called its <b>parameters</b>. Think of them as three knobs:</p>
<ul>
<li>\(\theta_1\) says how strongly \(x_1\) pushes the prediction up (if \(\theta_1 > 0\)) or down (if \(\theta_1 \lt 0\)).</li>
<li>\(\theta_2\) does the same for \(x_2\).</li>
<li>\(\theta_0\), the <b>bias</b> (or intercept), is a base value added no matter what the features are. It equals the prediction when both features are 0.</li>
</ul>
<p>Different knob settings give different predictions. Some exams (2026-A, 2026-B) call the knobs \(w_0, w_1, w_2\) instead of \(\theta_0, \theta_1, \theta_2\) — same thing, different letter.</p>
<h5>Step 4 — how wrong is one prediction?</h5>
<p>For a sample from the table we know the true label, so we can measure how far off the prediction is. That difference is the <b>residual</b>:</p>
\[r = \hat y - y \qquad(\text{prediction minus truth})\]
<p>\(r = 0\) means the prediction was perfect, \(r > 0\) means it was too high, \(r \lt 0\) means it was too low.</p>
<h5>Step 5 — what "training" means</h5>
<p><b>Training</b> the model means: find the knob setting whose residuals, over the whole table, are as small as possible. Everything else in this topic answers one of two questions:</p>
<ol>
<li>How do we turn "the residuals are small" into <b>one number</b> we can compare? That number is the <b>loss</b> (notes 2–4).</li>
<li>How do we <b>find</b> the best knob setting? Either by walking downhill step by step — <b>gradient descent</b> (notes 5–8) — or with a direct formula (notes 9–11).</li>
</ol>
<p>Notes 12–13 turn this into code, and notes 14–15 show a second kind of regression, <b>K nearest neighbours</b>, which has no knobs at all.</p>`,
      notation: [
        [R`\(n\)`, "the number of samples (rows in the table)"],
        [R`\(p\)`, R`the number of features (2 in every exam so far: \(x_1, x_2\))`],
        [R`\(x^{(i)}\)`, R`the features of sample \(i\), e.g. \(x^{(1)} = (-1, 1)\). The \((i)\) up top is the <b>row number</b>, not a power.`],
        [R`\(x^{(i)}_j\)`, R`feature \(j\) of sample \(i\) — row \(i\), column \(j\). E.g. \(x^{(1)}_1 = -1\), \(x^{(1)}_2 = 1\).`],
        [R`\(y_i\) or \(y^{(i)}\)`, R`the true label of sample \(i\) (both spellings appear in the exams). E.g. \(y_1 = 6\).`],
        [R`\(\theta = (\theta_0, \theta_1, \theta_2)\)`, R`the weights (knobs), written as one vector. Some exams call it \(w\).`],
        [R`\(\theta_0\)`, R`the <b>bias</b> (intercept): the part of the prediction not attached to any feature`],
        [R`\(\hat y\) ("y-hat")`, "a prediction. The hat always means \"our guess\"."],
        [R`\(r_i = \hat y_i - y_i\)`, R`the <b>residual</b> of sample \(i\): prediction minus truth`],
        [R`\(J(\theta)\)`, R`the <b>loss</b>: one number saying how bad the knob setting \(\theta\) is on the whole table (note 2)`],
        [R`\(\theta^*\)`, R`the best knob setting — the \(\theta\) with the smallest loss`],
      ],
      example: R`<p><b>The table.</b> 2025-C Q1 gives four samples:</p>
<div class="tw"><table><thead><tr><th>sample \(i\)</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>−1</td><td>1</td><td>6</td></tr><tr><td>2</td><td>−2</td><td>0</td><td>4</td></tr>
<tr><td>3</td><td>1</td><td>3</td><td>5</td></tr><tr><td>4</td><td>0</td><td>1</td><td>1</td></tr></tbody></table></div>
<p><b>A knob setting.</b> 2025-C Q1.3 starts from \(\theta = (1, -2, 3)\), i.e. \(\theta_0 = 1\), \(\theta_1 = -2\), \(\theta_2 = 3\). So this model predicts \(\hat y = 1 + (-2)\,x_1 + 3\,x_2\).</p>
<p><b>Sample 1</b> (\(x_1 = -1\), \(x_2 = 1\), \(y = 6\)):</p>
\[\hat y_1 = \theta_0 + \theta_1 x_1 + \theta_2 x_2 = 1 + (-2)\cdot(-1) + 3\cdot 1 = 1 + 2 + 3 = 6\]
\[r_1 = \hat y_1 - y_1 = 6 - 6 = 0 \quad(\text{perfect})\]
<p><b>Sample 2</b> (\(x_1 = -2\), \(x_2 = 0\), \(y = 4\)):</p>
\[\hat y_2 = 1 + (-2)\cdot(-2) + 3\cdot 0 = 1 + 4 + 0 = 5\]
\[r_2 = \hat y_2 - y_2 = 5 - 4 = 1 \quad(\text{one too high})\]
<p>That is all a linear model does: plug the features into the formula. Doing it for every sample one at a time gets tedious — note 1 does all four samples in one step.</p>` },

    { title: "1 · Put the table into matrix form: \\(X\\) and \\(y\\)",
      idea: R`<p>In note 0 we computed predictions <b>one sample at a time</b>: take sample 1's features, plug them into \(\hat y = \theta_0 + \theta_1 x_1 + \theta_2 x_2\), then do the same for sample 2, and so on. With 4 samples that's 4 separate calculations. The exams (and numpy) do all of them in <b>one</b> operation by arranging the table as a matrix. This note builds that matrix in three small steps.</p>
<h5>Step 1 — a prediction is a dot product</h5>
<p>Look at the prediction formula again: \(\hat y = \theta_0 + \theta_1 x_1 + \theta_2 x_2\). Two of its terms have the form "weight × feature". The bias \(\theta_0\) is the odd one out: it isn't multiplied by anything. We can make it look like the others by multiplying it by 1, which changes nothing:</p>
\[\hat y = \theta_0\cdot 1 + \theta_1\cdot x_1 + \theta_2\cdot x_2\]
<p>Now every term is "something × weight", so the whole prediction is a <b>dot product</b> of two vectors: the sample's features with an extra 1 in front, \((1, x_1, x_2)\), and the weights, \((\theta_0, \theta_1, \theta_2)\).</p>
<h5>Step 2 — stack the samples as rows</h5>
<p>Do step 1 for every sample: each one becomes a vector \((1, x_1, x_2)\). Write these vectors one under the other, one row per sample, and you get the <b>data matrix \(X\)</b>. Its first column is all ones — that's simply the "1" we put in front of every sample in step 1. The true labels, written in the same order, form the <b>label vector \(y\)</b>.</p>
<h5>Step 3 — one multiplication gives every prediction</h5>
<p>Multiplying a matrix by a vector means: take the dot product of <b>each row</b> with the vector. Row \(i\) of \(X\) is sample \(i\)'s vector from step 1, so row \(i\) dotted with \(\theta\) is exactly sample \(i\)'s prediction. So \(X\theta\) is the vector of all predictions, and \(X\theta - y\) is the vector of all residuals.</p>`,
      notation: [
        [R`\(X\)`, R`the data matrix: one row per sample, a column of ones first, then one column per feature. Size \(n \times (p+1)\): \(n\) rows, \(p\) features plus the ones column.`],
        [R`\(y\)`, R`the label vector: the \(n\) true labels, in the same order as the rows of \(X\)`],
        [R`\(X\theta\)`, R`the vector of all \(n\) predictions (entry \(i\) = row \(i\) of \(X\) dotted with \(\theta\))`],
        [R`\(r = X\theta - y\)`, R`the vector of all residuals \((r_1, \dots, r_n)\)`],
      ],
      example: R`<p><b>The table.</b> 2025-C Q1 gives four samples:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>−1</td><td>1</td><td>6</td></tr><tr><td>2</td><td>−2</td><td>0</td><td>4</td></tr>
<tr><td>3</td><td>1</td><td>3</td><td>5</td></tr><tr><td>4</td><td>0</td><td>1</td><td>1</td></tr></tbody></table></div>
<p><b>Build \(X\) and \(y\).</b> Each sample becomes the row \((1, x_1, x_2)\); the labels go into \(y\) in the same order (this is the official answer to 2025-C Q1.1):</p>
\[X = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix},\qquad y = \begin{bmatrix}6\\4\\5\\1\end{bmatrix}\]
<p><b>Compute all predictions at once</b> for the knob setting \(\theta = (1, -2, 3)\). Each entry of \(X\theta\) is one row of \(X\) dotted with \(\theta\):</p>
<ul>
<li>Row 1: \((1, -1, 1)\cdot(1, -2, 3) = 1\cdot 1 + (-1)\cdot(-2) + 1\cdot 3 = 1 + 2 + 3 = 6\)</li>
<li>Row 2: \((1, -2, 0)\cdot(1, -2, 3) = 1\cdot 1 + (-2)\cdot(-2) + 0\cdot 3 = 1 + 4 + 0 = 5\)</li>
<li>Row 3: \((1, 1, 3)\cdot(1, -2, 3) = 1\cdot 1 + 1\cdot(-2) + 3\cdot 3 = 1 - 2 + 9 = 8\)</li>
<li>Row 4: \((1, 0, 1)\cdot(1, -2, 3) = 1\cdot 1 + 0\cdot(-2) + 1\cdot 3 = 1 + 0 + 3 = 4\)</li>
</ul>
\[X\theta = \begin{bmatrix}6\\5\\8\\4\end{bmatrix}\]
<p><b>Residuals.</b> Subtract the true labels entry by entry:</p>
\[r = X\theta - y = \begin{bmatrix}6-6\\5-4\\8-5\\4-1\end{bmatrix} = \begin{bmatrix}0\\1\\3\\3\end{bmatrix}\]
<p>Samples 1 and 2 give the same residuals (0 and 1) we computed by hand in note 0 — the matrix form just does all four at once.</p>
<h5>The weighted variant (2026-A)</h5>
<p><b>Why it exists.</b> Plain least squares treats every sample as equally important. Sometimes some samples matter more — for example, they were measured more reliably. The weighted variant gives each sample \(i\) an importance weight \(\gamma_i > 0\) ("gamma") and multiplies that sample's squared error by it:</p>
\[J = \sum_i \gamma_i\, r_i^2\]
<p>A sample with \(\gamma_i = 2\) counts twice as much as one with \(\gamma_i = 1\).</p>
<p><b>Writing it with matrices.</b> 2026-A Q1.1 asks for matrices such that \(J = (Xw - y)^\top\,\Gamma\,(Xw - y)\) (this exam calls the weights \(w\) instead of \(\theta\)). \(X\) and \(y\) are built exactly as above. \(\Gamma\) ("capital gamma") is a square \(n \times n\) matrix with the weights on its diagonal and zeros everywhere else. 2026-A's weights are \(\gamma = (2, 1, 1, 2)\), so:</p>
\[\Gamma = \mathrm{diag}(2, 1, 1, 2) = \begin{bmatrix}2&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&2\end{bmatrix}\]
<p><b>Why that product equals \(\sum_i \gamma_i r_i^2\) — three small steps.</b> Write the residual vector as \(r = Xw - y = (r_1, r_2, r_3, r_4)\).</p>
<p><i>Step A — plain least squares is already "\(r\) times \(r\)".</i> The plain loss is \(\sum_i r_i^2 = r_1\cdot r_1 + r_2\cdot r_2 + r_3\cdot r_3 + r_4\cdot r_4\): every residual multiplied by <b>itself</b>, then added up. That is exactly the dot product of \(r\) with itself, written \(r^\top r\). (The \(^\top\) turns the column \(r\) into a row, so that row × column gives a single number.) So each residual needs to appear <b>twice</b> — once from each side — because the loss <b>squares</b> it.</p>
<p><i>Step B — slip the weights in between.</i> We want each squared residual multiplied by its weight: \(\gamma_i\,r_i\cdot r_i\). Multiplying \(\Gamma\) by \(r\) handles the weight and <b>one</b> of the two copies of \(r_i\). Because \(\Gamma\) is diagonal, each residual just gets multiplied by its own weight:</p>
\[\Gamma r = \begin{bmatrix}2r_1\\ 1r_2\\ 1r_3\\ 2r_4\end{bmatrix}\]
<p>These are the "weighted residuals" \(\gamma_i r_i\) — but each \(r_i\) appears only once, so nothing is squared yet.</p>
<p><i>Step C — the second copy of \(r\) does the squaring.</i> The \((Xw - y)^\top = r^\top\) on the left supplies the second copy: the dot product of \(r\) with \(\Gamma r\) multiplies each \(r_i\) by its own \(\gamma_i r_i\):</p>
\[r^\top \Gamma r = r_1\cdot 2r_1 + r_2\cdot r_2 + r_3\cdot r_3 + r_4\cdot 2r_4 = 2r_1^2 + r_2^2 + r_3^2 + 2r_4^2 = \sum_i \gamma_i r_i^2\]
<p>That is exactly the weighted loss: every squared residual, multiplied by its sample's weight. It is the plain \(r^\top r\) from step A with \(\Gamma\) placed in the middle.</p>
<p><b>With numbers — and why we can't stop at \(\Gamma r\).</b> 2026-A's labels are \(y = (1, 2, 4, 5)\). At the starting point \(w = (0,0,0)\) every prediction is 0, so the residuals are \(r = Xw - y = (0-1,\ 0-2,\ 0-4,\ 0-5) = (-1, -2, -4, -5)\).</p>
<ul>
<li>Step B: \(\Gamma r = (2\cdot(-1),\ 1\cdot(-2),\ 1\cdot(-4),\ 2\cdot(-5)) = (-2, -2, -4, -10)\).<br>If we just added these up we'd get \(-2 - 2 - 4 - 10 = -18\): a <b>negative</b> "loss", because the residuals keep their signs and errors in opposite directions would cancel. That is why we don't stop here.</li>
<li>Step C: \(r^\top(\Gamma r) = (-1)(-2) + (-2)(-2) + (-4)(-4) + (-5)(-10) = 2 + 4 + 16 + 50 = 72\).</li>
<li>Check against the definition: \(\sum_i \gamma_i r_i^2 = 2\cdot(-1)^2 + 1\cdot(-2)^2 + 1\cdot(-4)^2 + 2\cdot(-5)^2 = 2\cdot 1 + 1\cdot 4 + 1\cdot 16 + 2\cdot 25 = 2 + 4 + 16 + 50 = 72\) ✓</li>
</ul>
<p>For comparison, the unweighted loss is \(r^\top r = 1 + 4 + 16 + 25 = 46\); the weights add one extra copy of samples 1 and 4's squared errors: \(46 + 1 + 25 = 72\).</p>`,
      cue: R`Part 1 of almost every Q1: "Write down the data matrix \(X\) such that \(X\theta\) produces the vector of predictions" (2025-A, 2025-B, 2025-C); the weighted version adds \(\Gamma\) (2026-A).`,
      first: R`Draw the table: a column of 1s, then the feature columns in their order, one row per sample. Then write \(y\) in the same row order.`,
      recipe: R`Weighted: \(X\) and \(y\) as usual, plus \(\Gamma = \mathrm{diag}(\gamma_1, \dots, \gamma_n)\) — weights on the diagonal, zeros elsewhere.`,
      trap: "Forgetting the ones column loses the points on this part and makes every later part (predictions, gradient, code) wrong too." },


    { title: "2 · The loss \\(J\\): one number for \"how wrong is this knob setting?\"",
      idea: R`<h5>Where we are</h5>
<p>From note 1 we can compute every residual at once: \(r = X\theta - y\). For 2025-C and \(\theta = (1, -2, 3)\) that gave four numbers, \(r = (0, 1, 3, 3)\).</p>
<h5>What we want</h5>
<p>To say whether one knob setting is better than another, we need a <b>single number</b> that scores how bad the whole set of residuals is. This number is called the <b>loss</b> and written \(J(\theta)\). Smaller loss = better knob setting.</p>
<h5>The problem with just adding the residuals</h5>
<p>Adding the residuals doesn't work: a residual of \(+3\) (too high by 3) and one of \(-3\) (too low by 3) would add up to 0, which looks perfect although both predictions are wrong.</p>
<h5>The idea: square each residual, then add</h5>
<p>Square every residual first, then add them up:</p>
\[J(\theta) = \sum_{i=1}^{n} r_i^2 = \sum_{i=1}^{n} \left(\theta^\top x^{(i)} - y_i\right)^2\]
<ul>
<li>A square is never negative, so errors can't cancel.</li>
<li>Squaring makes big errors cost much more than small ones: an error of 1 costs 1, an error of 3 costs 9.</li>
</ul>
<p>This is the <b>squared error loss</b> (or "sum of squared errors"). Finding the \(\theta\) that minimizes it is called <b>least squares</b> linear regression — the standard kind.</p>
<h5>The notation the exams use for it</h5>
<p>"Sum of the squares of a vector's entries" is the squared <b>length</b> (norm) of the vector, written \(\|v\|^2\). The residuals form the vector \(X\theta - y\), so</p>
\[J(\theta) = \|X\theta - y\|^2 = (X\theta - y)^\top (X\theta - y)\]
<p>All three ways of writing it — the sum, the norm, and the vector dotted with itself — mean exactly the same number.</p>
<h5>Sum, mean, or half — does it matter?</h5>
<p>The lecture also uses the <b>mean</b> squared error, \(\frac1n\sum_i r_i^2\), and the formula sheet puts a \(\tfrac12\) in front. Multiplying a loss by a positive constant doesn't change <i>which</i> \(\theta\) is best (the lowest point stays the lowest point); it only scales the loss and its gradient. The exam losses use the plain sum, so work with exactly the loss the stem gives.</p>
<h5>Other ways to score one sample</h5>
<p>Two exams change what each sample contributes (everything else stays the same):</p>
<ul>
<li><b>Weighted</b> (2026-A): sample \(i\) contributes \(\gamma_i r_i^2\) — its squared error times an importance weight \(\gamma_i > 0\) (see the end of note 1).</li>
<li><b>Cubic</b> (2026-B): sample \(i\) contributes \(|r_i|^3\). The absolute value is needed because \(r^3\) is negative when \(r\) is negative — without it, predictions that are too low would <i>lower</i> the loss. Cubing punishes big errors even harder than squaring: an error of 2 costs \(2^2 = 4\) when squared but \(2^3 = 8\) when cubed.</li>
</ul>`,
      notation: [
        [R`\(\sum_{i=1}^{n}\)`, R`"add this up over every sample \(i = 1, \dots, n\)"`],
        [R`\(\|v\|^2\)`, R`squared length of a vector = the sum of the squares of its entries: \(\|v\|^2 = v_1^2 + v_2^2 + \dots\)`],
        [R`\(\|X\theta - y\|^2\)`, R`\(= \sum_i r_i^2\), the squared error loss`],
        [R`\(v^\top v\)`, R`a vector dotted with itself — the same thing as \(\|v\|^2\)`],
        [R`\(\gamma_i\) ("gamma")`, R`importance weight of sample \(i\) (weighted variant, 2026-A)`],
        [R`\(|r|\)`, R`absolute value: \(r\) without its minus sign`],
        [R`MSE`, R`mean squared error \(= \frac1n\sum_i r_i^2\) (used for <i>test</i> error, note 14)`],
      ],
      example: R`<p><b>Squared error — 2025-C, \(\theta = (1, -2, 3)\).</b> The residuals from note 1 are \(r = (0, 1, 3, 3)\):</p>
\[J(\theta) = 0^2 + 1^2 + 3^2 + 3^2 = 0 + 1 + 9 + 9 = 19\]
<p>Samples 3 and 4 are each off by 3 and together cost 18 of the 19 — squaring makes the loss care mostly about the biggest errors.</p>
<p><b>Weighted — 2026-A's table</b> (weights \(\gamma = (2, 1, 1, 2)\), labels \(y = (1, 2, 4, 5)\)), at the usual starting point \(w = (0, 0, 0)\). This is only an illustration; the exam doesn't ask for this number. With all weights 0 every prediction is 0, so each residual is \(0 - y_i\): \(r = (-1, -2, -4, -5)\).</p>
\[J = 2\cdot(-1)^2 + 1\cdot(-2)^2 + 1\cdot(-4)^2 + 2\cdot(-5)^2 = 2\cdot 1 + 1\cdot 4 + 1\cdot 16 + 2\cdot 25 = 2 + 4 + 16 + 50 = 72\]
<p>Without weights it would be \(1 + 4 + 16 + 25 = 46\). Samples 1 and 4 (weight 2) count twice.</p>
<p><b>Cubic — 2026-B's five training rows</b> with the weights \(w = (2, 0.1, 1)\) from 2026-B Q1.1a (again only an illustration). First the predictions \(\hat y = 2 + 0.1\,x_1 + 1\,x_2\) and residuals:</p>
<ul>
<li>Sample 1 \((20, 0)\), \(y = 5\): \(\hat y = 2 + 0.1\cdot 20 + 1\cdot 0 = 2 + 2 + 0 = 4\), \(r = 4 - 5 = -1\)</li>
<li>Sample 2 \((30, 2)\), \(y = 6\): \(\hat y = 2 + 0.1\cdot 30 + 1\cdot 2 = 2 + 3 + 2 = 7\), \(r = 7 - 6 = 1\)</li>
<li>Sample 3 \((40, 0)\), \(y = 7\): \(\hat y = 2 + 0.1\cdot 40 + 1\cdot 0 = 2 + 4 + 0 = 6\), \(r = 6 - 7 = -1\)</li>
<li>Sample 4 \((20, 2)\), \(y = 7\): \(\hat y = 2 + 0.1\cdot 20 + 1\cdot 2 = 2 + 2 + 2 = 6\), \(r = 6 - 7 = -1\)</li>
<li>Sample 5 \((40, 1)\), \(y = 9\): \(\hat y = 2 + 0.1\cdot 40 + 1\cdot 1 = 2 + 4 + 1 = 7\), \(r = 7 - 9 = -2\)</li>
</ul>
\[J = |-1|^3 + |1|^3 + |-1|^3 + |-1|^3 + |-2|^3 = 1 + 1 + 1 + 1 + 8 = 12\]
<p>The squared loss of the same residuals would be \(1 + 1 + 1 + 1 + 4 = 8\): the one error of size 2 costs 8 instead of 4.</p>`,
      cue: R`The loss is always given in the stem — the exam never asks you to invent one. It asks you to <i>work with</i> it: write it with \(X\) and \(y\), differentiate it, minimize it.`,
      first: R`Name the per-sample piece: what does sample \(i\) contribute — \(r_i^2\), \(\gamma_i r_i^2\), or \(|r_i|^3\)? Then check whether a penalty on the weights is added (note 3).`,
      trap: R`The residual is <b>prediction minus truth</b>, \(\theta^\top x^{(i)} - y_i\). Writing \(y - \hat y\) gives the same squared loss but flips the sign of every gradient built from it — that is exactly the bug on line 6 of 2026-A Q1.4.` },

    { title: "3 · Penalties on the weights: ridge and LASSO",
      idea: R`<h5>Where we are</h5>
<p>The loss from note 2 measures only one thing: how well the model fits the training table.</p>
<h5>The problem: fitting the table too well</h5>
<p>The lecture on model evaluation shows that a model can fit its training data "too closely" and then predict badly on new data — it has learned the noise of this particular table. This is called <b>overfitting</b>. In a linear model it typically shows up as very <b>large weights</b>: the prediction then swings a lot when a feature changes a little.</p>
<h5>The idea: make large weights cost something</h5>
<p>Add a second term to the loss that grows when the weights grow. This term is called a <b>penalty</b>, and adding one is called <b>regularization</b>. Training now has to balance two wishes: fit the table (small first term) and keep the weights small (small penalty).</p>
<h5>The dial: \(\lambda\)</h5>
<p>The penalty is multiplied by a number \(\lambda \ge 0\) ("lambda") that sets how much the second wish counts. \(\lambda = 0\) switches the penalty off (plain least squares). A large \(\lambda\) pushes the weights hard towards 0. \(\lambda\) is a <b>hyperparameter</b>: it is not found by the training formula, you choose it beforehand — in practice with cross-validation (note 13).</p>
<h5>Ridge: penalize the squares of the weights</h5>
\[J_\lambda(\theta) = \|X\theta - y\|^2 + \lambda\left(\theta_1^2 + \theta_2^2\right)\]
<p>2025-A and 2025-B write the penalty as \(\lambda(\|\theta\|^2 - \theta_0^2)\). Decode it: \(\|\theta\|^2 = \theta_0^2 + \theta_1^2 + \theta_2^2\), and subtracting \(\theta_0^2\) leaves \(\theta_1^2 + \theta_2^2\). So the <b>bias is not penalized</b> — the stems say "excluding the bias term \(\theta_0\)". (The bias only shifts every prediction up or down by the same amount; it doesn't make the model react more strongly to the features.)</p>
<h5>LASSO: penalize the absolute values of the weights</h5>
\[J_\lambda(\theta) = \|X\theta - y\|^2 + \lambda\left(|\theta_0| + |\theta_1| + |\theta_2|\right) = \|X\theta - y\|^2 + \lambda\|\theta\|_1\]
<p>\(\|\theta\|_1\) (the "\(L_1\) norm", on the formula sheet) is the sum of the absolute values. Careful: 2025-C's LASSO <b>does include</b> \(\theta_0\) — read the formula in the stem, not what you expect. The name stands for <i>Least Absolute Shrinkage and Selection Operator</i>; the "selection" is that LASSO tends to set some weights to exactly 0, which throws the corresponding feature out of the model (note 11 shows this on 2025-C's data).</p>`,
      notation: [
        [R`\(\lambda\) ("lambda")`, R`the penalty strength, a hyperparameter chosen in advance; \(\lambda \ge 0\)`],
        [R`\(J_\lambda(\theta)\)`, R`the loss with the penalty included; \(J_{\lambda=0}\) is plain least squares`],
        [R`\(\|\theta\|^2\)`, R`\(\theta_0^2 + \theta_1^2 + \theta_2^2\) (the squared \(L_2\) norm)`],
        [R`\(\|\theta\|^2 - \theta_0^2\)`, R`\(\theta_1^2 + \theta_2^2\): every weight squared <b>except</b> the bias (ridge)`],
        [R`\(\|\theta\|_1\)`, R`\(|\theta_0| + |\theta_1| + |\theta_2|\) (the \(L_1\) norm, LASSO)`],
        ["regularization", "adding a penalty on the weights to the loss"],
        ["hyperparameter", R`a number set before training (\(\lambda\) here, \(k\) in KNN), not computed by it`],
      ],
      example: R`<p>Same 2025-C setting as before: \(\theta = (1, -2, 3)\), \(\lambda = 1\), and the fit part \(\|X\theta - y\|^2 = 19\) from note 2.</p>
<p><b>LASSO</b> (the loss 2025-C actually uses):</p>
\[\lambda\|\theta\|_1 = 1\cdot\left(|1| + |-2| + |3|\right) = 1\cdot(1 + 2 + 3) = 6\]
\[J_{\lambda=1}(1, -2, 3) = 19 + 6 = 25\]
<p><b>Ridge on the same numbers</b> (an illustration, not an exam part — so you can see the difference):</p>
\[\lambda(\theta_1^2 + \theta_2^2) = 1\cdot\left((-2)^2 + 3^2\right) = 1\cdot(4 + 9) = 13\]
\[J_{\lambda=1}(1, -2, 3) = 19 + 13 = 32\]
<p>Notice \(\theta_0 = 1\) appears in the LASSO penalty but not in the ridge penalty. And the weight 3 costs 3 under LASSO but 9 under ridge: ridge punishes big weights much more, LASSO charges every weight in proportion to its size.</p>
<div class="tw"><table><thead><tr><th></th><th>Ridge</th><th>LASSO</th></tr></thead><tbody>
<tr><td>penalty per weight</td><td>\(\lambda\theta_j^2\)</td><td>\(\lambda|\theta_j|\)</td></tr>
<tr><td>bias \(\theta_0\) included?</td><td>no (2025-A, 2025-B)</td><td>yes (2025-C)</td></tr>
<tr><td>gradient of the penalty</td><td>\(2\lambda\theta_j\) (note 6)</td><td>\(\lambda\,\mathrm{sign}(\theta_j)\) (note 6)</td></tr>
<tr><td>closed-form solution?</td><td>yes (notes 9–10)</td><td>no — gradient descent only</td></tr>
</tbody></table></div>`,
      cue: R`The stem defines the penalty: ridge \(= \lambda(\|\theta\|^2 - \theta_0^2)\) (2025-A, 2025-B), LASSO \(= \lambda\|\theta\|_1 = \lambda(|\theta_0| + \dots + |\theta_p|)\) (2025-C).`,
      first: R`Write the penalty out term by term with the actual weight names — \(\lambda(\theta_1^2 + \theta_2^2)\) or \(\lambda(|\theta_0| + |\theta_1| + |\theta_2|)\) — so you see exactly which weights are in it.`,
      trap: R`Ridge leaves out \(\theta_0\); 2025-C's LASSO keeps it. Read the stem's formula before you differentiate.` },

    { title: "4 · The loss written out as a polynomial in \\(\\theta\\) (2025-A Q1.2)",
      idea: R`<h5>Where we are</h5>
<p>The loss \(J\) is a function of the three knobs \(\theta_0, \theta_1, \theta_2\). The table's numbers are fixed; only the knobs vary.</p>
<h5>What the exam asks</h5>
<p>2025-A Q1.2: argue that there are ten numbers \(a_0, a_1, a_2, b_{01}, b_{02}, b_{12}, c_0, c_1, c_2, d\) such that</p>
\[J_\lambda(\theta) = a_0\theta_0^2 + a_1\theta_1^2 + a_2\theta_2^2 + b_{01}\theta_0\theta_1 + b_{02}\theta_0\theta_2 + b_{12}\theta_1\theta_2 + c_0\theta_0 + c_1\theta_1 + c_2\theta_2 + d\]
<p>and report \(a_1\) and \(d\). In words: \(J\) is a <b>polynomial of degree 2</b> in the knobs — it only has squared knobs (\(a\) terms), products of two knobs (\(b\) terms), single knobs (\(c\) terms) and a constant (\(d\)).</p>
<h5>Step 1 — each residual is a bracket of degree 1</h5>
<p>Write the residual of sample \(i\) with the table's numbers filled in:</p>
\[r_i = \theta_0 + x^{(i)}_1\theta_1 + x^{(i)}_2\theta_2 - y_i\]
<p>Each knob appears once, multiplied by a fixed number, and there is one plain number \(-y_i\). No knob is squared yet — "degree 1".</p>
<h5>Step 2 — squaring a degree-1 bracket gives degree 2</h5>
<p>Squaring a bracket of four terms multiplies every term by every term:</p>
\[(a + b + c + e)^2 = a^2 + b^2 + c^2 + e^2 + 2ab + 2ac + 2ae + 2bc + 2be + 2ce\]
<p>Each product is (knob × knob), (knob × number) or (number × number). So a squared residual contains only squared knobs, products of two knobs, single knobs and constants — never \(\theta^3\).</p>
<h5>Step 3 — adding keeps degree 2</h5>
<p>\(J\) adds up the squared residuals of all samples, plus (for ridge) the penalty \(\lambda\theta_1^2 + \lambda\theta_2^2\), which is itself degree 2. A sum of degree-2 polynomials is a degree-2 polynomial, so \(J\) has exactly the ten kinds of terms. <b>That is the whole argument</b> — the official solution says that "this is a quadratic expression" is an acceptable justification.</p>
<h5>Step 4 — reading off \(a_1\) without expanding everything</h5>
<p>Where can \(\theta_1^2\) come from? Only from squaring the \(\theta_1\)-term of a bracket: \(\left(x^{(i)}_1\theta_1\right)^2 = \left(x^{(i)}_1\right)^2\theta_1^2\). One such term per sample, plus \(\lambda\theta_1^2\) from the ridge penalty:</p>
\[a_1 = \sum_i \left(x^{(i)}_1\right)^2 + \lambda\]
<p>In the same way \(a_2 = \sum_i (x^{(i)}_2)^2 + \lambda\), and \(a_0 = n\) (the bias term is \(1\cdot\theta_0\) in every bracket, and \(1^2 = 1\), no penalty on \(\theta_0\)).</p>
<h5>Step 5 — the constant \(d\)</h5>
<p>The constant is what's left when every knob is 0 — so \(d = J(0, 0, 0)\). At \(\theta = 0\) each bracket is just \(-y_i\) and the penalty is 0:</p>
\[d = \sum_i (-y_i)^2 = \sum_i y_i^2\]
<p>(This only works for ridge or plain least squares. A LASSO penalty \(|\theta_j|\) is not a polynomial, so 2025-C's loss has no such form.)</p>`,
      notation: [
        ["degree-2 polynomial", R`a sum of terms, each a number times at most two knobs multiplied together (\(\theta_1^2\), \(\theta_0\theta_2\), \(\theta_1\), constant)`],
        [R`\(a_j\)`, R`coefficient of \(\theta_j^2\)`],
        [R`\(b_{jk}\)`, R`coefficient of the product \(\theta_j\theta_k\)`],
        [R`\(c_j\)`, R`coefficient of the single knob \(\theta_j\)`],
        [R`\(d\)`, R`the constant \(= J(0, 0, 0)\)`],
      ],
      example: R`<p>The exam part itself uses 2025-A's table (with ridge). To show the method without doing that part for you, here it is on <b>2025-C's table</b> with the plain squared error (\(\lambda = 0\)).</p>
<p><b>Step 1 — the four brackets.</b> Fill in \(x_1, x_2, y\) of each row:</p>
<ul>
<li>\(r_1 = \theta_0 + (-1)\theta_1 + 1\cdot\theta_2 - 6 = \theta_0 - \theta_1 + \theta_2 - 6\)</li>
<li>\(r_2 = \theta_0 + (-2)\theta_1 + 0\cdot\theta_2 - 4 = \theta_0 - 2\theta_1 - 4\)</li>
<li>\(r_3 = \theta_0 + 1\cdot\theta_1 + 3\theta_2 - 5 = \theta_0 + \theta_1 + 3\theta_2 - 5\)</li>
<li>\(r_4 = \theta_0 + 0\cdot\theta_1 + 1\cdot\theta_2 - 1 = \theta_0 + \theta_2 - 1\)</li>
</ul>
<p><b>Step 2 — one bracket squared, fully</b> (\(r_1\), using the rule above with \(a = \theta_0\), \(b = -\theta_1\), \(c = \theta_2\), \(e = -6\)):</p>
\[\begin{aligned}r_1^2 &= \theta_0^2 + \theta_1^2 + \theta_2^2 + 36 + 2\theta_0(-\theta_1) + 2\theta_0\theta_2 + 2\theta_0(-6) + 2(-\theta_1)\theta_2 + 2(-\theta_1)(-6) + 2\theta_2(-6)\\ &= \theta_0^2 + \theta_1^2 + \theta_2^2 - 2\theta_0\theta_1 + 2\theta_0\theta_2 - 2\theta_1\theta_2 - 12\theta_0 + 12\theta_1 - 12\theta_2 + 36\end{aligned}\]
<p>Every term has degree at most 2, as promised.</p>
<p><b>Step 4 — \(a_1\):</b> the squares of the \(x_1\) column \((-1, -2, 1, 0)\):</p>
\[a_1 = (-1)^2 + (-2)^2 + 1^2 + 0^2 = 1 + 4 + 1 + 0 = 6 \qquad(\text{with ridge: } 6 + \lambda)\]
<p><b>Step 5 — \(d\):</b> the squares of the labels \((6, 4, 5, 1)\):</p>
\[d = 6^2 + 4^2 + 5^2 + 1^2 = 36 + 16 + 25 + 1 = 78\]
<p><b>All ten, for reference</b> (checked with numpy). Each has a simple rule:</p>
<div class="tw"><table><thead><tr><th>coefficient</th><th>rule</th><th>2025-C value</th></tr></thead><tbody>
<tr><td>\(a_0\)</td><td>\(n\)</td><td>4</td></tr>
<tr><td>\(a_1\)</td><td>\(\sum (x_1)^2\) (+\(\lambda\) for ridge)</td><td>6</td></tr>
<tr><td>\(a_2\)</td><td>\(\sum (x_2)^2\) (+\(\lambda\) for ridge)</td><td>\(1 + 0 + 9 + 1 = 11\)</td></tr>
<tr><td>\(b_{01}\)</td><td>\(2\sum x_1\)</td><td>\(2(-1 - 2 + 1 + 0) = -4\)</td></tr>
<tr><td>\(b_{02}\)</td><td>\(2\sum x_2\)</td><td>\(2(1 + 0 + 3 + 1) = 10\)</td></tr>
<tr><td>\(b_{12}\)</td><td>\(2\sum x_1x_2\)</td><td>\(2(-1 + 0 + 3 + 0) = 4\)</td></tr>
<tr><td>\(c_0\)</td><td>\(-2\sum y\)</td><td>\(-2(6 + 4 + 5 + 1) = -32\)</td></tr>
<tr><td>\(c_1\)</td><td>\(-2\sum x_1 y\)</td><td>\(-2(-6 - 8 + 5 + 0) = 18\)</td></tr>
<tr><td>\(c_2\)</td><td>\(-2\sum x_2 y\)</td><td>\(-2(6 + 0 + 15 + 1) = -44\)</td></tr>
<tr><td>\(d\)</td><td>\(\sum y^2\)</td><td>78</td></tr>
</tbody></table></div>
<p><b>Check</b> at \(\theta = (1, -2, 3)\), where note 2 found \(J = 19\):</p>
\[\begin{aligned}&4\cdot 1^2 + 6\cdot(-2)^2 + 11\cdot 3^2 + (-4)\cdot 1\cdot(-2) + 10\cdot 1\cdot 3 + 4\cdot(-2)\cdot 3 + (-32)\cdot 1 + 18\cdot(-2) + (-44)\cdot 3 + 78\\ &= 4 + 24 + 99 + 8 + 30 - 24 - 32 - 36 - 132 + 78 = 19\end{aligned}\]
<p>Same 19 as note 2 — the polynomial is just \(J\) written differently.</p>`,
      cue: R`"Argue that there exist ten scalar values \(a_0, \dots, d\) such that \(J_\lambda(\theta) = a_0\theta_0^2 + \dots + d\) … report the values of \(a_1\) and \(d\)" (2025-A Q1.2).`,
      first: R`Write \(J\) as one squared bracket per row with the table's numbers, plus the penalty — for 2025-A's first row that is \((\theta_0 + \theta_1 + 2\theta_2 - 3)^2\).`,
      recipe: R`<ol><li>Each bracket is degree 1 in \(\theta\); its square is degree 2; the ridge penalty is degree 2; a sum of degree-2 terms is degree 2 → the ten-term form.</li><li>\(a_1 = \sum_i (x^{(i)}_1)^2 + \lambda\).</li><li>\(d = J(0) = \sum_i y_i^2\).</li></ol>`,
      trap: R`Don't forget the \(+\lambda\) in \(a_1\) (the penalty contains \(\lambda\theta_1^2\)). And there is no \(\lambda\) in \(a_0\) or \(d\): \(\theta_0\) isn't penalized, and the penalty is 0 at \(\theta = 0\).` },

    { title: "5 · The gradient: which way is uphill?",
      idea: R`<h5>Where we are</h5>
<p>We can score any knob setting with \(J\). Now we want to <b>find</b> the setting with the smallest \(J\).</p>
<h5>The picture: a landscape</h5>
<p>Imagine \(J\) as a landscape. Your position is the knob setting \(\theta\); the height at that position is the loss \(J(\theta)\). Training = finding the lowest point. You can't see the whole landscape, but at the spot where you stand you can feel which way the ground slopes. The gradient is that slope.</p>
<h5>Step 1 — one knob at a time: the partial derivative</h5>
<p>The <b>partial derivative</b> \(\dfrac{\partial J}{\partial \theta_1}\) answers: "if I turn <i>only</i> knob \(\theta_1\) up a tiny bit and hold the other knobs still, how fast does \(J\) change?" You compute it like an ordinary derivative, treating the other knobs as constants. If it is positive, turning \(\theta_1\) up makes the loss worse; if negative, turning \(\theta_1\) up makes it better.</p>
<h5>Step 2 — all knobs together: the gradient</h5>
<p>The <b>gradient</b> \(\nabla J\) ("nabla J") stacks the partial derivatives into one vector, one entry per knob:</p>
\[\nabla J = \left(\frac{\partial J}{\partial\theta_0},\ \frac{\partial J}{\partial\theta_1},\ \frac{\partial J}{\partial\theta_2}\right)\]
<p>The lecture shows that this vector points in the direction where the loss grows fastest (uphill), so \(-\nabla J\) points downhill. Note 8 uses that to walk down.</p>
<h5>Step 3 — the derivative of one residual</h5>
<p>Recall \(r_i = \theta_0\cdot 1 + \theta_1 x^{(i)}_1 + \theta_2 x^{(i)}_2 - y_i\). Differentiate with respect to \(\theta_1\): only the term \(\theta_1 x^{(i)}_1\) contains \(\theta_1\); everything else is a constant with derivative 0. So \(\dfrac{\partial r_i}{\partial\theta_1} = x^{(i)}_1\). In general (calling the constant 1 in front of \(\theta_0\) "feature 0", \(x^{(i)}_0 = 1\)):</p>
\[\frac{\partial r_i}{\partial\theta_j} = x^{(i)}_j\]
<p>The official solutions quote this as "we've seen in class that \(\frac{\partial}{\partial w_j} r_i = x^{(i)}_j\)" — you may do the same.</p>
<h5>Step 4 — the derivative of one sample's loss (chain rule)</h5>
<p>Sample \(i\) contributes \(r_i^2\). By the chain rule, (outer derivative) × (inner derivative):</p>
\[\frac{\partial}{\partial\theta_j}\, r_i^2 = 2r_i\cdot\frac{\partial r_i}{\partial\theta_j} = 2r_i\,x^{(i)}_j\]
<h5>Step 5 — add over the samples</h5>
<p>The derivative of a sum is the sum of the derivatives:</p>
\[\frac{\partial J}{\partial\theta_j} = \sum_{i=1}^n 2r_i\,x^{(i)}_j\]
<h5>Step 6 — all entries at once: \(X^\top\)</h5>
<p>First pull the constant 2 out of the sum: \(\dfrac{\partial J}{\partial\theta_j} = 2\sum_i r_i\,x^{(i)}_j\). Now look at what is left, \(\sum_i r_i x^{(i)}_j = x^{(1)}_j r_1 + x^{(2)}_j r_2 + \dots + x^{(n)}_j r_n\). The numbers \(x^{(1)}_j, \dots, x^{(n)}_j\) are feature \(j\) of every sample — that is exactly <b>column \(j\) of \(X\)</b>. So the sum is a dot product: (column \(j\) of \(X\)) · \(r\). \(X^\top\) (X transposed) is \(X\) with its columns turned into rows, so \(X^\top r\) computes exactly these dot products, one per column. Therefore:</p>
\[\nabla J = 2X^\top(X\theta - y)\]
<h5>Step 7 — the same thing read by rows: \(\sum_i z_i x^{(i)}\)</h5>
<p>Collect the entries of Step 5 into a vector instead: \(\nabla J = \sum_i 2r_i\,x^{(i)}\), where \(x^{(i)} = (1, x^{(i)}_1, x^{(i)}_2)\) is row \(i\) of \(X\). So the gradient is a <b>weighted sum of the sample rows</b>, and each row's weight is</p>
\[z_i = 2r_i\]
<p>Writing \(\nabla J = \sum_i z_i x^{(i)} = X^\top z\) is the form 2026-B asks for, and it is exactly what the code computes (<code>X.T @ z</code>, note 12). Note 7 shows that for other losses only \(z_i\) changes.</p>
<h5>On the formula sheet</h5>
<p>The sheet gives \(\nabla_w\left[\tfrac12(y - w^\top x)^2\right] = (w^\top x - y)\,x\) — the loss of <b>one</b> sample, with a \(\tfrac12\) in front (the sheet calls the weights \(w\) instead of \(\theta\)). Two things make it look different from ours:</p>
<ul>
<li>\((y - w^\top x)^2 = (w^\top x - y)^2\): a number and its negative have the same square, so the order inside the bracket doesn't matter for the loss. Call the bracket \(r = w^\top x - y\) (our residual).</li>
<li>The \(\tfrac12\): by Step 4, \(\dfrac{\partial}{\partial w_j}\tfrac12 r^2 = \tfrac12\cdot 2r\cdot x_j = r\,x_j\). The \(\tfrac12\) cancels the 2 from the chain rule, which gives the sheet's \((w^\top x - y)\,x\).</li>
</ul>
<p>The exams' losses have no \(\tfrac12\) (and add over all samples), so their gradient keeps the 2: \(\sum_i 2r_i x^{(i)}\).</p>`,
      notation: [
        [R`\(\dfrac{\partial J}{\partial \theta_j}\)`, R`partial derivative: derivative of \(J\) with respect to knob \(j\), the other knobs held fixed`],
        [R`\(\nabla J\) ("nabla J")`, R`the gradient, the vector of all partial derivatives; points uphill`],
        [R`\(x^{(i)}_0 = 1\)`, R`the "feature" that multiplies the bias — the ones column of \(X\)`],
        [R`\(X^\top\)`, R`\(X\) transposed: row \(j\) of \(X^\top\) is column \(j\) of \(X\). Size \(3 \times n\).`],
        [R`\(X^\top r\)`, R`entry \(j\) = (column \(j\) of \(X\)) · \(r\)`],
        [R`\(z_i\)`, R`the weight of sample \(i\)'s row in the gradient \(\nabla J = \sum_i z_i x^{(i)}\); for squared error \(z_i = 2r_i\)`],
      ],
      example: R`<p>2025-C, \(\theta = (1, -2, 3)\), residuals \(r = (0, 1, 3, 3)\) from note 1. This is the squared-error part of 2025-C Q1.3; the LASSO part is added in note 6.</p>
<p><b>Way 1 — by columns (\(X^\top r\)).</b> The rows of \(X^\top\) are the columns of \(X\):</p>
\[X^\top = \begin{bmatrix}1&1&1&1\\-1&-2&1&0\\1&0&3&1\end{bmatrix}\]
<ul>
<li>Entry 0: \((1, 1, 1, 1)\cdot(0, 1, 3, 3) = 1\cdot 0 + 1\cdot 1 + 1\cdot 3 + 1\cdot 3 = 0 + 1 + 3 + 3 = 7\)</li>
<li>Entry 1: \((-1, -2, 1, 0)\cdot(0, 1, 3, 3) = (-1)\cdot 0 + (-2)\cdot 1 + 1\cdot 3 + 0\cdot 3 = 0 - 2 + 3 + 0 = 1\)</li>
<li>Entry 2: \((1, 0, 3, 1)\cdot(0, 1, 3, 3) = 1\cdot 0 + 0\cdot 1 + 3\cdot 3 + 1\cdot 3 = 0 + 0 + 9 + 3 = 12\)</li>
</ul>
\[X^\top r = \begin{bmatrix}7\\1\\12\end{bmatrix},\qquad 2X^\top(X\theta - y) = 2\begin{bmatrix}7\\1\\12\end{bmatrix} = \begin{bmatrix}14\\2\\24\end{bmatrix}\]
<p><b>Way 2 — by rows (\(\sum_i z_i x^{(i)}\)).</b> \(z = 2r = (2\cdot 0, 2\cdot 1, 2\cdot 3, 2\cdot 3) = (0, 2, 6, 6)\). Multiply each row of \(X\) by its \(z_i\) and add:</p>
\[\begin{aligned}\nabla J &= 0\cdot(1, -1, 1) + 2\cdot(1, -2, 0) + 6\cdot(1, 1, 3) + 6\cdot(1, 0, 1)\\ &= (0, 0, 0) + (2, -4, 0) + (6, 6, 18) + (6, 0, 6)\\ &= (0 + 2 + 6 + 6,\ 0 - 4 + 6 + 0,\ 0 + 0 + 18 + 6) = (14, 2, 24)\end{aligned}\]
<p>Same vector both ways. <b>Reading it:</b> all three entries are positive, so turning any knob up would increase the loss; to go downhill, turn them down — most of all \(\theta_2\) (entry 24). That matches the residuals: every prediction was too high or exact.</p>`,
      cue: R`"Express the gradient of \(J\) as a function of \(X, y, \theta\). Do not use numeric values" (2025-A Q1.3a, 2025-C Q1.2, 2026-A Q1.2), or "represent it as \(\nabla J(w) = \sum_i z_i x^{(i)}\)" (2026-B Q1.3). "No numeric values" means: answer with the symbols, not the table.`,
      first: R`Write \(r_i = \theta^\top x^{(i)} - y_i\) and \(\dfrac{\partial r_i}{\partial\theta_j} = x^{(i)}_j\). Then differentiate <b>one sample's</b> term with the chain rule.`,
      recipe: R`<ol><li>\(J = \sum_i r_i^2\).</li><li>\(\dfrac{\partial J}{\partial\theta_j} = \sum_i 2r_i\dfrac{\partial r_i}{\partial\theta_j} = \sum_i 2r_i x^{(i)}_j\).</li><li>Stack over \(j\): \(\nabla J = 2\sum_i r_i x^{(i)} = 2X^\top(X\theta - y)\).</li></ol>`,
      trap: R`It is \(X^\top(X\theta - y)\), not \(X(X\theta - y)\): the gradient has one entry per <b>knob</b> (3), not per sample (4). Size check: \(X^\top\) is \(3\times 4\), \(X\theta - y\) is \(4\times 1\), product \(3\times 1\). And don't copy the formula sheet's version without its \(\tfrac12\) in mind — the exam losses give a factor 2.` },

    { title: "6 · Gradients of the penalties: LASSO and ridge",
      idea: R`<h5>Where we are</h5>
<p>Note 5 gave the gradient of the squared-error part, \(2X^\top(X\theta - y)\). Penalized losses (note 3) add a second term: \(J_\lambda = \|X\theta - y\|^2 + \text{penalty}\).</p>
<h5>Step 1 — the gradient of a sum is the sum of the gradients</h5>
<p>So we only need the gradient of the penalty, then add it to what we already have:</p>
\[\nabla J_\lambda = 2X^\top(X\theta - y) + \nabla(\text{penalty})\]
<p>A penalty is a sum of one term per weight, so its partial derivative with respect to \(\theta_j\) only "sees" the term that contains \(\theta_j\).</p>
<h5>Step 2 — LASSO: the derivative of \(|\theta_j|\)</h5>
<p>The absolute value has two straight pieces: \(|a| = a\) when \(a > 0\) (slope \(+1\)), and \(|a| = -a\) when \(a \lt 0\) (slope \(-1\)). So its derivative is the <b>sign</b> of \(a\):</p>
\[\frac{d}{da}|a| = \mathrm{sign}(a) = \begin{cases}+1 & a > 0\\ -1 & a \lt 0\end{cases}\]
<p>At \(a = 0\) the graph has a corner and there is no derivative — that's why 2025-C Q1.2 says "you may assume that all entries of \(\theta\) are non-zero". Now differentiate \(\lambda(|\theta_0| + |\theta_1| + |\theta_2|)\) with respect to \(\theta_j\): only \(|\theta_j|\) contains \(\theta_j\), so the result is \(\lambda\,\mathrm{sign}(\theta_j)\). Stacking the three entries:</p>
\[\nabla J_\lambda = 2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\]
<p>where \(\mathrm{sign}(\theta)\) is the vector of the signs of the entries. This is the official answer to 2025-C Q1.2.</p>
<h5>Step 3 — ridge: the derivative of \(\theta_j^2\)</h5>
<p>Differentiate \(\lambda(\theta_1^2 + \theta_2^2)\) one knob at a time:</p>
<ul>
<li>with respect to \(\theta_0\): no \(\theta_0\) in it → \(0\)</li>
<li>with respect to \(\theta_1\): \(\lambda\cdot 2\theta_1 = 2\lambda\theta_1\)</li>
<li>with respect to \(\theta_2\): \(\lambda\cdot 2\theta_2 = 2\lambda\theta_2\)</li>
</ul>
\[\nabla J_\lambda = 2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\]
<p>This is the official answer to 2025-A Q1.3a. The 0 in the first entry is exactly "the bias is not penalized".</p>
<h5>Step 4 — what each penalty does to a step</h5>
<p>Read the two formulas: LASSO adds \(\pm\lambda\) to every entry — the same push towards 0 whatever the weight's size. Ridge adds \(2\lambda\theta_j\) — a push proportional to the weight, strong for big weights and tiny for weights near 0. That constant push is why LASSO can drive a weight all the way to exactly 0 (the "selection" in its name).</p>`,
      notation: [
        [R`\(\mathrm{sign}(a)\)`, R`\(+1\) if \(a > 0\), \(-1\) if \(a \lt 0\); the derivative of \(|a|\) (undefined at 0)`],
        [R`\(\mathrm{sign}(\theta)\)`, R`the vector \((\mathrm{sign}(\theta_0), \mathrm{sign}(\theta_1), \mathrm{sign}(\theta_2))\)`],
        [R`\(2\lambda(0, \theta_1, \theta_2)\)`, R`the ridge penalty's gradient; first entry 0 because \(\theta_0\) isn't penalized`],
      ],
      example: R`<p>2025-C, \(\theta = (1, -2, 3)\), \(\lambda = 1\). Squared-error part from note 5: \((14, 2, 24)\).</p>
<p><b>LASSO</b> (2025-C Q1.3's actual gradient). The signs: \(\mathrm{sign}(1) = +1\), \(\mathrm{sign}(-2) = -1\), \(\mathrm{sign}(3) = +1\), so \(\lambda\,\mathrm{sign}(\theta) = 1\cdot(1, -1, 1) = (1, -1, 1)\).</p>
\[\nabla J_\lambda = \begin{bmatrix}14\\2\\24\end{bmatrix} + \begin{bmatrix}1\\-1\\1\end{bmatrix} = \begin{bmatrix}14 + 1\\2 + (-1)\\24 + 1\end{bmatrix} = \begin{bmatrix}15\\1\\25\end{bmatrix}\]
<p><b>Official-solution slip.</b> The official 2025-C Q1.3 solution prints the middle entry as 0. That is an arithmetic slip: \(2 + (-1) = 1\). (Its first line also says "\(\lambda = 2\)", but it then correctly uses \(\lambda = 1\), as the question states.) The correct gradient is \((15, 1, 25)\).</p>
<p><b>Ridge on the same numbers</b> (illustration, not an exam part): \(2\lambda(0, \theta_1, \theta_2) = 2\cdot 1\cdot(0, -2, 3) = (0, -4, 6)\).</p>
\[\nabla J_\lambda = \begin{bmatrix}14\\2\\24\end{bmatrix} + \begin{bmatrix}0\\-4\\6\end{bmatrix} = \begin{bmatrix}14 + 0\\2 + (-4)\\24 + 6\end{bmatrix} = \begin{bmatrix}14\\-2\\30\end{bmatrix}\]
<p>Compare the pushes: on \(\theta_2 = 3\), LASSO adds 1 but ridge adds 6; on the bias, LASSO adds 1 but ridge adds nothing.</p>`,
      cue: R`"Express the gradient of \(J_\lambda(\theta)\) as a function of \(X, y, \theta, \lambda\)" (2025-C Q1.2, LASSO; 2025-A Q1.3a, ridge).`,
      first: R`Split: \(\nabla J_\lambda = \nabla\|X\theta - y\|^2 + \nabla(\text{penalty})\). Write the first part as \(2X^\top(X\theta - y)\) straight away (note 5), then differentiate the penalty one weight at a time.`,
      table: {
        head: ["Penalty", "Its gradient", "Exam"],
        rows: [
          [R`LASSO \(\lambda\|\theta\|_1\)`, R`\(\lambda\,\mathrm{sign}(\theta)\)`, "2025-C Q1.2"],
          [R`ridge \(\lambda(\|\theta\|^2 - \theta_0^2)\)`, R`\(2\lambda(0, \theta_1, \theta_2)\)`, "2025-A Q1.3a"],
          [R`ridge folded into \(X', y'\) (note 10)`, R`whole gradient \(2X'^\top(X'\theta - y')\)`, "2025-B Q1.4"],
        ]},
      trap: R`Ridge: the first entry of the penalty gradient is 0, and there is a factor 2 from differentiating \(\theta_j^2\). LASSO: no factor 2 — the derivative of \(|\theta_j|\) is just \(\pm 1\) — and it includes \(\theta_0\) in 2025-C.` },

    { title: "7 · Other per-sample losses: weighted and cubic (the \\(z_i\\) recipe)",
      idea: R`<h5>Where we are</h5>
<p>Note 5 found \(\nabla J = \sum_i z_i x^{(i)}\) with \(z_i = 2r_i\) for the squared error. 2026-A and 2026-B change what each sample contributes (note 2): \(\gamma_i r_i^2\) or \(|r_i|^3\). Do we have to start the derivation over? No.</p>
<h5>The one idea that handles every such loss</h5>
<p>Suppose each sample contributes \(\ell_i(r_i)\) — some function of its residual — and \(J = \sum_i \ell_i(r_i)\). The chain rule gives, exactly as in note 5:</p>
\[\frac{\partial J}{\partial\theta_j} = \sum_i \ell_i'(r_i)\cdot\frac{\partial r_i}{\partial\theta_j} = \sum_i \ell_i'(r_i)\,x^{(i)}_j\]
<p>So always \(\nabla J = \sum_i z_i x^{(i)} = X^\top z\), with</p>
\[z_i = \ell_i'(r_i) = \text{the derivative of sample } i\text{'s loss with respect to its residual}\]
<p>Only \(z_i\) depends on the loss; the "multiply by \(x^{(i)}\) and add up" part never changes (and in code it is always <code>X.T @ z</code>). Check with the squared error: \(\ell(r) = r^2\), \(\ell'(r) = 2r\), so \(z_i = 2r_i\) ✓.</p>
<h5>Variant A — weighted (2026-A)</h5>
<p><b>Why it exists:</b> some samples matter more (note 1). <b>What changes:</b> \(\ell_i(r) = \gamma_i r^2\), where \(\gamma_i\) is a fixed number, so</p>
\[z_i = \frac{d}{dr}\left(\gamma_i r^2\right)\Big|_{r = r_i} = 2\gamma_i r_i, \qquad \nabla J = \sum_i 2\gamma_i r_i\,x^{(i)}\]
<p><b>In matrix form:</b> the vector \(z\) has entries \(2\gamma_i r_i\). Multiplying the diagonal matrix \(\Gamma\) by \(r\) multiplies each \(r_i\) by its own \(\gamma_i\) (note 1), so \(z = 2\Gamma r = 2\Gamma(Xw - y)\), and</p>
\[\nabla J(w) = X^\top z = 2X^\top\Gamma(Xw - y)\]
<p>This is the official answer to 2026-A Q1.2. \(\Gamma\) must sit <b>between</b> \(X^\top\) and the residual vector: sizes \((3\times 4)(4\times 4)(4\times 1) = 3\times 1\), one entry per weight. The official solution says points were deducted when \(\Gamma\) was put anywhere else.</p>
<h5>Variant B — cubic (2026-B)</h5>
<p><b>Why it exists:</b> it punishes large errors even more than squaring (note 2). <b>What changes:</b> \(\ell(r) = |r|^3\). Differentiate with the chain rule — outer function \((\cdot)^3\), inner function \(|r|\):</p>
\[\frac{d}{dr}|r|^3 = 3|r|^2\cdot\frac{d}{dr}|r| = 3|r|^2\,\mathrm{sign}(r) = 3r^2\,\mathrm{sign}(r)\]
<p>(the last step because \(|r|^2 = r^2\)). So</p>
\[z_i = 3r_i^2\,\mathrm{sign}(r_i) = 3\left(w^\top x^{(i)} - y_i\right)^2\mathrm{sign}\!\left(w^\top x^{(i)} - y_i\right)\]
<p>This is the official answer to 2026-B Q1.3. Why the sign must stay: \(r_i^2\) is never negative, so without \(\mathrm{sign}(r_i)\) every \(z_i\) would be positive and the gradient couldn't tell "too high" from "too low".</p>
<p><b>The full derivation, in the order to write it</b> (as in the official solution):</p>
\[\frac{\partial J}{\partial w_j} = \sum_i \frac{\partial}{\partial w_j}|r_i|^3 = \sum_i 3|r_i|^2\frac{\partial}{\partial w_j}|r_i| = \sum_i 3r_i^2\,\mathrm{sign}(r_i)\frac{\partial r_i}{\partial w_j} = \sum_i 3r_i^2\,\mathrm{sign}(r_i)\,x^{(i)}_j\]`,
      notation: [
        [R`\(\ell_i(r)\)`, R`the loss contributed by sample \(i\), as a function of its residual`],
        [R`\(\ell_i'(r_i)\)`, R`its derivative, evaluated at the actual residual — this is \(z_i\)`],
        [R`\(z = (z_1, \dots, z_n)\)`, R`one number per sample; \(\nabla J = X^\top z\)`],
        [R`\(\Gamma r\)`, R`each residual multiplied by its own weight: \((\gamma_1 r_1, \dots, \gamma_n r_n)\)`],
      ],
      example: R`<p><b>Weighted — 2026-A's table</b> at \(w = (0, 0, 0)\) (illustration: the exam part asks only for the formula). From note 2, \(r = (-1, -2, -4, -5)\) and \(\gamma = (2, 1, 1, 2)\).</p>
<ul>
<li>\(z_1 = 2\cdot 2\cdot(-1) = -4\)</li>
<li>\(z_2 = 2\cdot 1\cdot(-2) = -4\)</li>
<li>\(z_3 = 2\cdot 1\cdot(-4) = -8\)</li>
<li>\(z_4 = 2\cdot 2\cdot(-5) = -20\)</li>
</ul>
<p>2026-A's \(X\) has rows \((1, 1, 0), (1, 0, 1), (1, 1, 1), (1, 2, 1)\). \(\nabla J = X^\top z\), one dot product per column:</p>
<ul>
<li>Entry 0: \((1, 1, 1, 1)\cdot z = 1\cdot(-4) + 1\cdot(-4) + 1\cdot(-8) + 1\cdot(-20) = -4 - 4 - 8 - 20 = -36\)</li>
<li>Entry 1: \((1, 0, 1, 2)\cdot z = 1\cdot(-4) + 0\cdot(-4) + 1\cdot(-8) + 2\cdot(-20) = -4 + 0 - 8 - 40 = -52\)</li>
<li>Entry 2: \((0, 1, 1, 1)\cdot z = 0\cdot(-4) + 1\cdot(-4) + 1\cdot(-8) + 1\cdot(-20) = 0 - 4 - 8 - 20 = -32\)</li>
</ul>
<p>\(\nabla J(0) = (-36, -52, -32)\) — numpy gives the same from \(2X^\top\Gamma(Xw - y)\).</p>
<p><b>Cubic — 2026-B's training rows</b> with \(w = (2, 0.1, 1)\) (illustration). Residuals from note 2: \(r = (-1, 1, -1, -1, -2)\).</p>
<ul>
<li>\(z_1 = 3\cdot(-1)^2\cdot\mathrm{sign}(-1) = 3\cdot 1\cdot(-1) = -3\)</li>
<li>\(z_2 = 3\cdot 1^2\cdot\mathrm{sign}(1) = 3\cdot 1\cdot(+1) = 3\)</li>
<li>\(z_3 = 3\cdot(-1)^2\cdot(-1) = -3\), \(z_4 = -3\) (same residual)</li>
<li>\(z_5 = 3\cdot(-2)^2\cdot\mathrm{sign}(-2) = 3\cdot 4\cdot(-1) = -12\)</li>
</ul>
<p>With rows \(x^{(i)} = (1, x_1, x_2)\) = \((1, 20, 0), (1, 30, 2), (1, 40, 0), (1, 20, 2), (1, 40, 1)\):</p>
<ul>
<li>Entry 0: \(-3\cdot 1 + 3\cdot 1 + (-3)\cdot 1 + (-3)\cdot 1 + (-12)\cdot 1 = -3 + 3 - 3 - 3 - 12 = -18\)</li>
<li>Entry 1: \(-3\cdot 20 + 3\cdot 30 + (-3)\cdot 40 + (-3)\cdot 20 + (-12)\cdot 40 = -60 + 90 - 120 - 60 - 480 = -630\)</li>
<li>Entry 2: \(-3\cdot 0 + 3\cdot 2 + (-3)\cdot 0 + (-3)\cdot 2 + (-12)\cdot 1 = 0 + 6 + 0 - 6 - 12 = -12\)</li>
</ul>
<p>\(\nabla J = (-18, -630, -12)\). Entry 1 is huge simply because the \(x_1\) values of the training rows (20–40) are large. Note how the one residual of size 2 dominates: its \(z_5 = -12\) is four times the others.</p>`,
      cue: R`"Write an expression for the gradient … as a function of \(w, X, \Gamma, y\)" (2026-A Q1.2); "derive an expression for the gradient and represent it as \(\nabla J(w) = \sum_i z_i x^{(i)}\) … write \(z_i\)" (2026-B Q1.3).`,
      first: R`Define \(r_i = w^\top x^{(i)} - y_i\) and write \(\dfrac{\partial r_i}{\partial w_j} = x^{(i)}_j\). Then take the derivative of <b>one sample's</b> loss with the chain rule.`,
      recipe: R`<p>\(z_i\) = derivative of sample \(i\)'s loss with respect to its residual; then \(\nabla J = \sum_i z_i x^{(i)} = X^\top z\).</p>`,
      table: {
        head: ["Loss", R`\(z_i\)`, "Gradient", "Exam"],
        rows: [
          [R`\(\sum_i r_i^2\)`, R`\(2r_i\)`, R`\(2X^\top(X\theta - y)\)`, "all"],
          [R`\(\sum_i \gamma_i r_i^2\)`, R`\(2\gamma_i r_i\)`, R`\(2X^\top\Gamma(Xw - y)\)`, "2026-A Q1.2"],
          [R`\(\sum_i |r_i|^3\)`, R`\(3r_i^2\,\mathrm{sign}(r_i)\)`, R`\(\sum_i z_i x^{(i)}\)`, "2026-B Q1.3"],
        ]},
      trap: R`\(z_i\) is the <b>derivative</b> of the loss, not the loss. In Moed B Q1.4 you wrote <code>np.abs(r)**3</code> — that's \(|r|^3\), the loss itself — where \(z\) belonged (<code>3 * r**2 * np.sign(r)</code>).` },

    { title: "8 · Gradient descent: one step downhill",
      idea: R`<h5>Where we are</h5>
<p>We can compute the gradient \(\nabla J\) at any knob setting, and it points uphill (note 5).</p>
<h5>The idea</h5>
<p>To go down, take a small step in the <b>opposite</b> direction of the gradient. "Small" is controlled by a positive number \(\eta\) ("eta", explained below): multiply the gradient by \(\eta\) and subtract it from the current knobs:</p>
\[\theta_{\text{new}} = \theta - \eta\,\nabla J(\theta)\]
<p>Entry by entry this says: \(\theta_{j,\text{new}} = \theta_j - \eta\cdot(\nabla J)_j\). A knob whose gradient entry is positive (turning it up makes the loss worse) gets turned down, and vice versa.</p>
<p>Then compute the gradient at the new spot and step again, and again. This loop is <b>gradient descent</b>. From the lecture:</p>
<ol>
<li>Start with an initial guess \(\theta^{(0)}\).</li>
<li>Compute the gradient \(\nabla J\) at the current \(\theta\).</li>
<li>Update: \(\theta \leftarrow \theta - \eta\nabla J(\theta)\).</li>
<li>If not converged, go back to step 2.</li>
</ol>
<h5>The step size \(\eta\)</h5>
<p>\(\eta\) ("eta", the <b>learning rate</b>) sets how far each step goes. The lecture: a small \(\eta\) converges slowly but safely; a large \(\eta\) moves faster but can overshoot the bottom and bounce around. The exam always gives you \(\eta\).</p>
<h5>When do we stop?</h5>
<p>At the bottom the ground is flat, so the gradient is (almost) zero. Code stops when the gradient's length is tiny, e.g. \(\|\nabla J\|_2 \le \varepsilon\) (note 12). On paper, the exam asks for <b>one</b> step.</p>
<h5>The recipe for one step</h5>
<ol>
<li>Residuals \(r = X\theta - y\) (note 1).</li>
<li>Squared-error part of the gradient \(2X^\top r\) (note 5) — or the variant's \(X^\top z\) (note 7).</li>
<li>Penalty part, if any (note 6), and add.</li>
<li>Update entry by entry: \(\theta_j - \eta\cdot(\nabla J)_j\).</li>
</ol>
<h5>The shortcut when you start at \(\theta = 0\)</h5>
<p>2025-A Q1.3b and 2025-B Q1.4 start from \(\theta = (0, 0, 0)\). Then:</p>
<ul>
<li>\(X\theta = 0\), so the residual vector is simply \(r = 0 - y = -y\).</li>
<li>The ridge penalty's gradient is \(2\lambda(0, 0, 0) = 0\) — the penalty has no effect on the first step.</li>
</ul>
\[\nabla J(0) = 2X^\top(-y) = -2X^\top y, \qquad \theta_{\text{new}} = 0 - \eta\cdot(-2X^\top y) = 2\eta\,X^\top y\]
<p>With 2025-B's \(X', y'\) (note 10) the extra labels are 0, so \(X'^\top y' = X^\top y\) — same shortcut. (LASSO can't start at exactly 0: \(\mathrm{sign}(0)\) is undefined. That's why 2025-C starts from \((1, -2, 3)\).)</p>`,
      notation: [
        [R`\(\eta\) ("eta")`, "learning rate = step size, given in the question"],
        [R`\(\theta \leftarrow \dots\)`, R`"replace \(\theta\) with …" (an update)`],
        [R`\(\theta^{(t)}\)`, R`the knob setting after \(t\) steps`],
        [R`\(\varepsilon\) ("epsilon")`, R`a tiny threshold: stop when \(\|\nabla J\|_2 \le \varepsilon\)`],
      ],
      example: R`<p><b>2025-C Q1.3, start to finish.</b> \(\theta = (1, -2, 3)\), \(\lambda = 1\), \(\eta = 0.1\).</p>
<p><b>Step 1 — residuals</b> (note 1):</p>
\[X\theta - y = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\end{bmatrix}\begin{bmatrix}1\\-2\\3\end{bmatrix} - \begin{bmatrix}6\\4\\5\\1\end{bmatrix} = \begin{bmatrix}6\\5\\8\\4\end{bmatrix} - \begin{bmatrix}6\\4\\5\\1\end{bmatrix} = \begin{bmatrix}0\\1\\3\\3\end{bmatrix}\]
<p><b>Step 2 — squared-error part</b> (note 5): \(2X^\top(X\theta - y) = 2\cdot(7, 1, 12) = (14, 2, 24)\).</p>
<p><b>Step 3 — LASSO part</b> (note 6): \(\lambda\,\mathrm{sign}(\theta) = 1\cdot(1, -1, 1)\). Sum: \(\nabla J_\lambda = (14 + 1,\ 2 - 1,\ 24 + 1) = (15, 1, 25)\).</p>
<p><b>Step 4 — the update</b>, one entry at a time:</p>
<ul>
<li>\(\theta_0\): \(1 - 0.1\cdot 15 = 1 - 1.5 = -0.5\)</li>
<li>\(\theta_1\): \(-2 - 0.1\cdot 1 = -2 - 0.1 = -2.1\)</li>
<li>\(\theta_2\): \(3 - 0.1\cdot 25 = 3 - 2.5 = 0.5\)</li>
</ul>
\[\theta_{\text{new}} = (-0.5,\ -2.1,\ 0.5)\]
<p class="muted">Because of the slip explained in note 6 (middle gradient entry printed as 0), the official solution prints \(-2\) for the middle entry. The correct value is \(-2.1\).</p>
<p><b>A side remark on \(\eta\)</b> (an illustration — the exam does not ask for this, and it does not change the answer above). If you evaluate the LASSO loss at the new point \((-0.5, -2.1, 0.5)\), it went <i>up</i>. The new residuals \(\theta_0 + \theta_1 x_1 + \theta_2 x_2 - y\):</p>
<ul>
<li>Row 1: \(-0.5 + (-2.1)\cdot(-1) + 0.5\cdot 1 - 6 = -0.5 + 2.1 + 0.5 - 6 = -3.9\)</li>
<li>Row 2: \(-0.5 + (-2.1)\cdot(-2) + 0.5\cdot 0 - 4 = -0.5 + 4.2 + 0 - 4 = -0.3\)</li>
<li>Row 3: \(-0.5 + (-2.1)\cdot 1 + 0.5\cdot 3 - 5 = -0.5 - 2.1 + 1.5 - 5 = -6.1\)</li>
<li>Row 4: \(-0.5 + (-2.1)\cdot 0 + 0.5\cdot 1 - 1 = -0.5 + 0 + 0.5 - 1 = -1\)</li>
</ul>
\[\|X\theta_{\text{new}} - y\|^2 = (-3.9)^2 + (-0.3)^2 + (-6.1)^2 + (-1)^2 = 15.21 + 0.09 + 37.21 + 1 = 53.51\]
\[\lambda\|\theta_{\text{new}}\|_1 = 1\cdot(|-0.5| + |-2.1| + |0.5|) = 0.5 + 2.1 + 0.5 = 3.1\]
\[J_1(\theta_{\text{new}}) = 53.51 + 3.1 = 56.61 \;>\; 25 = J_1(1, -2, 3)\ (\text{note 3})\]
<p>The step went too far and landed higher on the other side of the valley — the lecture's "large step size may overshoot" picture. (With \(\eta = 0.1\) this table keeps overshooting; a smaller \(\eta\) would walk down. Q1.4's "you continue until it converges" simply assumes a run that works — its argument doesn't use \(\eta\) at all, see note 11.)</p>
<p><b>The \(\theta = 0\) shortcut with numbers</b> (2025-C's table, plain squared error — an illustration; 2025-A and 2025-B are where the exam uses it). First \(X^\top y\), one dot product per column of \(X\):</p>
<ul>
<li>\((1, 1, 1, 1)\cdot(6, 4, 5, 1) = 6 + 4 + 5 + 1 = 16\)</li>
<li>\((-1, -2, 1, 0)\cdot(6, 4, 5, 1) = -6 - 8 + 5 + 0 = -9\)</li>
<li>\((1, 0, 3, 1)\cdot(6, 4, 5, 1) = 6 + 0 + 15 + 1 = 22\)</li>
</ul>
\[\nabla J(0) = -2X^\top y = -2\cdot(16, -9, 22) = \left(-2\cdot 16,\ -2\cdot(-9),\ -2\cdot 22\right) = (-32, 18, -44)\]
\[\theta_{\text{new}} = 0 - 0.1\cdot(-32, 18, -44) = \left(0 + 3.2,\ 0 - 1.8,\ 0 + 4.4\right) = (3.2, -1.8, 4.4)\]
<p>(These are exactly the coefficients \(c_0, c_1, c_2\) of note 4: the single-knob terms of the polynomial are the gradient at \(\theta = 0\).)</p>`,
      cue: R`"Execute / evaluate one iteration of gradient descent with \(\theta = \dots\), \(\eta = \dots\), \(\lambda = \dots\). Show all intermediate calculations" (2025-A Q1.3b, 2025-B Q1.4, 2025-C Q1.3).`,
      first: R`Compute the residual vector \(X\theta - y\) and write it down. (At \(\theta = 0\) it is just \(-y\).)`,
      recipe: R`Residuals → gradient (note 5, plus the penalty from note 6) → \(\theta - \eta\nabla J\), entry by entry. Write every vector down: each one earns partial credit even if a later number slips.`,
      trap: R`Two minus signs at \(\theta = 0\): \(\nabla J = -2X^\top y\), and the update subtracts it, so \(\theta_{\text{new}} = +2\eta X^\top y\). And the update is \(\theta - \eta\nabla J\), never \(+\).` },

    { title: "9 · The closed form: jumping straight to the bottom",
      idea: R`<h5>Where we are</h5>
<p>Gradient descent walks downhill step by step (note 8). For some losses there is a faster way: compute the lowest point directly.</p>
<h5>The idea</h5>
<p>At the lowest point the ground is flat, so the gradient is zero. For squared-error losses the gradient \(2X^\top(X\theta - y)\) is <b>linear</b> in \(\theta\) (no squares, no signs), so "gradient = 0" is a system of linear equations, which we can solve with matrix algebra. This is called the <b>analytical</b> (or closed-form) solution.</p>
<h5>Step 1 — set the gradient to zero</h5>
\[2X^\top(X\theta - y) = 0\]
<h5>Step 2 — open the bracket and rearrange</h5>
<p>Multiply out: \(2X^\top X\theta - 2X^\top y = 0\). Divide by 2 and move the second term to the other side:</p>
\[X^\top X\,\theta = X^\top y\]
<p>This is 3 equations (one per row of the \(3\times 3\) matrix \(X^\top X\)) in 3 unknowns.</p>
<h5>Step 3 — multiply both sides by the inverse</h5>
<p>If the matrix \(X^\top X\) is invertible, multiply both sides from the left by \((X^\top X)^{-1}\):</p>
\[\theta^* = (X^\top X)^{-1}X^\top y\]
<p>This is on the formula sheet ("least squares solution"). The matrix \((X^\top X)^{-1}X^\top\) is called the <b>pseudo-inverse</b> of \(X\), so this is the "pseudo-inverse method".</p>
<h5>When does it work?</h5>
<p>From the lecture: \(X^\top X\) is invertible when the columns of \(X\) are linearly independent; this needs at least as many samples as columns, \(n \ge p + 1\). And the point with zero gradient is really the minimum (not a maximum) because the squared-error loss is convex — bowl-shaped.</p>
<h5>Variant: weighted (2026-A Q1.3)</h5>
<p>Same three steps with the weighted gradient from note 7:</p>
\[2X^\top\Gamma(Xw - y) = 0 \;\Longrightarrow\; X^\top\Gamma Xw - X^\top\Gamma y = 0 \;\Longrightarrow\; X^\top\Gamma X\,w = X^\top\Gamma y \;\Longrightarrow\; w^* = (X^\top\Gamma X)^{-1}X^\top\Gamma y\]
<p>(if \(X^\top\Gamma X\) is invertible). 2026-A asks for a formula that is "explicit and contains only numerical matrices and vectors": write this expression with the actual matrices \(X\), \(\Gamma\), \(y\) from part 1 written out inside it. You don't have to compute the inverse. Note 10 shows the other route the exam's hint suggests.</p>
<h5>Variant: ridge (2025-B Q1.3)</h5>
<p>The ridge gradient \(2X^\top(X\theta - y) + 2\lambda(0, \theta_1, \theta_2)\) is still linear in \(\theta\), so a closed form exists. The exam's way to get it is to fold the penalty into a bigger table \(X', y'\) and use the plain formula — note 10.</p>
<h5>Variant: LASSO — no closed form</h5>
<p>The LASSO gradient \(2X^\top(X\theta - y) + \lambda\,\mathrm{sign}(\theta)\) contains \(\mathrm{sign}(\theta)\), which is not linear: it jumps from \(-1\) to \(+1\) and has no value at 0. You can't isolate \(\theta\) with matrix algebra, so LASSO is solved by gradient descent — which is exactly what 2025-C does.</p>`,
      notation: [
        [R`\(X^\top X\)`, R`a \((p+1)\times(p+1)\) matrix (\(3\times 3\) here); entry \((j,k)\) = column \(j\) of \(X\) · column \(k\) of \(X\)`],
        [R`\((X^\top X)^{-1}\)`, R`its inverse matrix`],
        [R`\((X^\top X)^{-1}X^\top\)`, R`the pseudo-inverse \(X^\dagger\)`],
        ["analytically / closed form", "with a formula in one go — no iterations"],
        [R`\(\tilde\theta\) ("theta tilde")`, R`2025-C's name for the plain least-squares solution \((X^\top X)^{-1}X^\top y\)`],
      ],
      example: R`<p><b>2025-C's table, plain least squares</b> — this is the vector \(\tilde\theta\) of 2025-C Q1.4.</p>
<p><b>\(X^\top X\)</b>: each entry is a dot product of two columns of \(X\). The columns are \(c_0 = (1, 1, 1, 1)\), \(c_1 = (-1, -2, 1, 0)\), \(c_2 = (1, 0, 3, 1)\):</p>
<ul>
<li>\(c_0\cdot c_0 = 1 + 1 + 1 + 1 = 4\)</li>
<li>\(c_0\cdot c_1 = -1 - 2 + 1 + 0 = -2\)</li>
<li>\(c_0\cdot c_2 = 1 + 0 + 3 + 1 = 5\)</li>
<li>\(c_1\cdot c_1 = 1 + 4 + 1 + 0 = 6\)</li>
<li>\(c_1\cdot c_2 = (-1)(1) + (-2)(0) + (1)(3) + (0)(1) = -1 + 0 + 3 + 0 = 2\)</li>
<li>\(c_2\cdot c_2 = 1 + 0 + 9 + 1 = 11\)</li>
</ul>
\[X^\top X = \begin{bmatrix}4&-2&5\\-2&6&2\\5&2&11\end{bmatrix},\qquad X^\top y = \begin{bmatrix}16\\-9\\22\end{bmatrix}\ (\text{note 8})\]
<p>(The matrix is symmetric: entry \((1,0)\) is the same dot product as \((0,1)\).) Solving \(X^\top X\,\theta = X^\top y\) (numpy or a calculator — the exams don't make you invert a \(3\times 3\) by hand) gives</p>
\[\tilde\theta = \left(-\tfrac{22}{7},\ -\tfrac{55}{14},\ \tfrac{29}{7}\right) \approx (-3.14,\ -3.93,\ 4.14)\]
<p><b>Check that the gradient really is zero there.</b> The residuals \(X\tilde\theta - y\) come out as \(\left(-\tfrac{15}{14}, \tfrac{10}{14}, \tfrac{5}{14}, 0\right)\). Dot them with each column:</p>
<ul>
<li>\(c_0\): \(\tfrac{1}{14}(-15 + 10 + 5 + 0) = 0\)</li>
<li>\(c_1\): \(\tfrac{1}{14}\left((-1)(-15) + (-2)(10) + (1)(5) + 0\right) = \tfrac{1}{14}(15 - 20 + 5) = 0\)</li>
<li>\(c_2\): \(\tfrac{1}{14}\left((1)(-15) + 0 + (3)(5) + 0\right) = \tfrac{1}{14}(-15 + 15) = 0\)</li>
</ul>
<p>So \(2X^\top(X\tilde\theta - y) = 0\) ✓ — flat ground, the bottom of the plain squared-error landscape. Its loss is \(\left(\tfrac{15}{14}\right)^2 + \left(\tfrac{10}{14}\right)^2 + \left(\tfrac{5}{14}\right)^2 + 0 = \tfrac{225 + 100 + 25}{196} = \tfrac{350}{196} = \tfrac{25}{14} \approx 1.79\), far below the 19 of \(\theta = (1, -2, 3)\).</p>`,
      cue: R`"We wish to analytically find \(\theta^*\) … Is this possible? Explain" (2025-B Q1.3); "Find a formula for \(w^*\) … explicit and contain only numerical matrices and vectors" (2026-A Q1.3).`,
      first: R`Write the gradient (notes 5–7) and set it equal to 0. Then move the term without \(\theta\) (or \(w\)) to the other side.`,
      recipe: R`<ol><li>\(\nabla J = 0\).</li><li>Rearrange to (matrix)·\(\theta\) = (vector): \(X^\top X\theta = X^\top y\), or \(X^\top\Gamma Xw = X^\top\Gamma y\).</li><li>"If the matrix is invertible": \(\theta^* = (\text{matrix})^{-1}(\text{vector})\).</li><li>For "is it possible?": yes for plain / weighted / ridge (linear gradient), no for LASSO (\(\mathrm{sign}\) isn't linear).</li></ol>`,
      trap: R`The order matters: \((X^\top X)^{-1}X^\top y\), not \((XX^\top)^{-1}\dots\) — \(XX^\top\) is \(4\times 4\) and the sizes don't work. In the weighted version \(\Gamma\) appears twice: between \(X^\top\) and \(X\), and between \(X^\top\) and \(y\).` },

    { title: "10 · Disguising ridge and weighted losses as plain least squares: \\(X'\\) and \\(y'\\)",
      idea: R`<h5>Where we are</h5>
<p>For plain least squares we have everything ready: the gradient \(2X^\top(X\theta - y)\) (note 5) and the closed form \((X^\top X)^{-1}X^\top y\) (note 9, on the formula sheet). Ridge and weighted losses look different. But both can be rewritten as a <b>plain</b> sum of squared residuals on a modified table \(X', y'\) — and then every plain formula applies to them unchanged. 2025-B Q1.2–1.4 are built on this, and 2026-A Q1.3's hint suggests it.</p>
<h5>The key observation</h5>
<p>\(\|X'\theta - y'\|^2\) is a sum with one squared term per row of \(X'\): (row · \(\theta\) − label)². So any term of the loss that can be written as \((\text{some row}\cdot\theta - \text{some number})^2\) can become one extra row of the table.</p>
<h5>Ridge, Step 1 — write each penalty term as a square</h5>
\[\lambda\theta_1^2 = \left(\sqrt\lambda\,\theta_1\right)^2 = \left(0\cdot\theta_0 + \sqrt\lambda\cdot\theta_1 + 0\cdot\theta_2 - 0\right)^2\]
<h5>Ridge, Step 2 — read off the extra row</h5>
<p>That bracket is exactly "row \((0, \sqrt\lambda, 0)\) dotted with \(\theta\), minus label 0". Likewise \(\lambda\theta_2^2\) is the row \((0, 0, \sqrt\lambda)\) with label 0. \(\theta_0\) isn't penalized, so it gets no row.</p>
<h5>Ridge, Step 3 — stack them under the table</h5>
\[X' = \begin{bmatrix}&X&\\ 0&\sqrt\lambda&0\\ 0&0&\sqrt\lambda\end{bmatrix},\qquad y' = \begin{bmatrix}y\\0\\0\end{bmatrix},\qquad J_\lambda(\theta) = \|X'\theta - y'\|^2\]
<p>This is the official answer to 2025-B Q1.2 (with 2025-B's \(X\) and \(y\) written out).</p>
<h5>Ridge, Step 4 — reuse the plain formulas</h5>
<ul>
<li><b>Closed form</b> (2025-B Q1.3: "is it possible analytically?" — yes): \(\theta^* = (X'^\top X')^{-1}X'^\top y'\). <span class="muted">The official solution prints \((X'^\top X)^{-1}X'^\top y\) — the primes are missing on the second \(X\) and on \(y\); it should be \(X'\) and \(y'\) throughout.</span></li>
<li><b>Gradient</b> (2025-B Q1.4): \(\nabla J_\lambda = 2X'^\top(X'\theta - y')\).</li>
</ul>
<h5>What the extra rows do to \(X^\top X\)</h5>
<p>\(X'^\top X'\) adds up (column · column) over all rows, including the two extra ones. The extra rows only have \(\sqrt\lambda\cdot\sqrt\lambda = \lambda\) on the diagonal positions of \(\theta_1\) and \(\theta_2\), so \(X'^\top X' = X^\top X + \lambda\,\mathrm{diag}(0, 1, 1)\). Ridge is least squares with \(\lambda\) added to two diagonal entries.</p>
<h5>Why this doesn't work for LASSO</h5>
<p>\(\lambda|\theta_j|\) is not the square of a linear bracket, so it can't become a row. (That's also why LASSO has no closed form, note 9.)</p>
<h5>Weighted, way 1 — duplicate rows (2026-A hint)</h5>
<p>2026-A's weights are \(\gamma = (2, 1, 1, 2)\) — whole numbers. A weight of 2 means "this sample's squared error counts twice", which is the same as the sample <b>appearing twice</b> in the table. So copy rows 1 and 4 (and their labels): a 6-row table whose plain squared error equals the weighted loss of the original.</p>
\[X' = \begin{bmatrix}1&1&0\\1&1&0\\1&0&1\\1&1&1\\1&2&1\\1&2&1\end{bmatrix},\qquad y' = \begin{bmatrix}1\\1\\2\\4\\5\\5\end{bmatrix},\qquad w^* = (X'^\top X')^{-1}X'^\top y'\]
<p>Writing the matrices out with their numbers like this is what "explicit and contains only numerical matrices and vectors" means. This only works because the weights are whole numbers (the official solution says so).</p>
<h5>Weighted, way 2 — scale each row by \(\sqrt{\gamma_i}\) (2026-A hint)</h5>
<p><b>Step 1 — move the weight inside the square.</b> \(\gamma_i r_i^2 = \left(\sqrt{\gamma_i}\,r_i\right)^2\), because \(\left(\sqrt{\gamma_i}\right)^2 = \gamma_i\).</p>
<p><b>Step 2 — read off the new row.</b> \(\sqrt{\gamma_i}\,r_i = \sqrt{\gamma_i}\left(x^{(i)}\cdot w - y_i\right) = \left(\sqrt{\gamma_i}\,x^{(i)}\right)\cdot w - \sqrt{\gamma_i}\,y_i\). That is "a row dotted with \(w\), minus a label", with row \(\sqrt{\gamma_i}\,x^{(i)}\) and label \(\sqrt{\gamma_i}\,y_i\). So: multiply row \(i\) of \(X\) and label \(y_i\) by \(\sqrt{\gamma_i}\).</p>
<p><b>Step 3 — the same thing with a matrix \(A\)</b> (the form the 2026-A hint uses). Let \(A = \mathrm{diag}(\sqrt{\gamma_1}, \dots, \sqrt{\gamma_n})\), also written \(\Gamma^{1/2}\). Multiplying by a diagonal matrix scales each row by its diagonal entry (note 1), so \(X' = AX\) and \(y' = Ay\). \(A\) is diagonal, so \(A^\top = A\), and</p>
\[A^\top A = \mathrm{diag}\left(\sqrt{\gamma_1}\cdot\sqrt{\gamma_1}, \dots, \sqrt{\gamma_n}\cdot\sqrt{\gamma_n}\right) = \mathrm{diag}(\gamma_1, \dots, \gamma_n) = \Gamma\]
<p><b>Step 4 — plug into the plain formula.</b> Transposing a product reverses the order, \((AX)^\top = X^\top A^\top\). So</p>
\[X'^\top X' = (AX)^\top(AX) = X^\top A^\top A X = X^\top\Gamma X, \qquad X'^\top y' = (AX)^\top(Ay) = X^\top A^\top A y = X^\top\Gamma y\]
\[w^* = (X'^\top X')^{-1}X'^\top y' = (X^\top\Gamma X)^{-1}X^\top\Gamma y\]
<p>— the same formula as note 9. This way works for any positive weights.</p>`,
      notation: [
        [R`\(X', y'\)`, R`the modified table: \(X\) and \(y\) with extra (or rescaled) rows, chosen so that \(J = \|X'\theta - y'\|^2\)`],
        [R`\(\sqrt\lambda\)`, R`square root of \(\lambda\) — goes in the extra row because the row gets squared`],
        [R`\(\mathrm{diag}(a, b, c)\)`, R`diagonal matrix with \(a, b, c\) on the diagonal, zeros elsewhere`],
        [R`\(\Gamma^{1/2}\)`, R`\(\mathrm{diag}(\sqrt{\gamma_1}, \dots, \sqrt{\gamma_n})\), a "square root" of \(\Gamma\)`],
        [R`\((AX)^\top = X^\top A^\top\)`, R`transposing a product reverses the order`],
      ],
      example: R`<p><b>Ridge check on 2025-C's table</b> (illustration, \(\lambda = 1\), so \(\sqrt\lambda = 1\); \(\theta = (1, -2, 3)\)). Append the rows \((0, 1, 0)\) and \((0, 0, 1)\) to \(X\) and two zeros to \(y\):</p>
\[X' = \begin{bmatrix}1&-1&1\\1&-2&0\\1&1&3\\1&0&1\\0&1&0\\0&0&1\end{bmatrix},\qquad y' = \begin{bmatrix}6\\4\\5\\1\\0\\0\end{bmatrix}\]
<p>The first four residuals are the old ones, \((0, 1, 3, 3)\). The two new ones:</p>
<ul>
<li>Row 5: \((0, 1, 0)\cdot(1, -2, 3) - 0 = 0\cdot 1 + 1\cdot(-2) + 0\cdot 3 - 0 = -2\)</li>
<li>Row 6: \((0, 0, 1)\cdot(1, -2, 3) - 0 = 0\cdot 1 + 0\cdot(-2) + 1\cdot 3 - 0 = 3\)</li>
</ul>
\[\|X'\theta - y'\|^2 = 0^2 + 1^2 + 3^2 + 3^2 + (-2)^2 + 3^2 = 0 + 1 + 9 + 9 + 4 + 9 = 32\]
<p>That is exactly the ridge loss \(19 + 13 = 32\) from note 3 ✓: the two fake rows <i>are</i> the penalty. And on this table \(X'^\top X' = X^\top X + \mathrm{diag}(0, 1, 1)\): the diagonal entries 6 and 11 of note 9's \(X^\top X\) become 7 and 12.</p>
<p><b>Weighted check on 2026-A's table</b> at \(w = 0\) (illustration). Note 2 found the weighted loss 72. The duplicated table has rows 1, 1, 2, 3, 4, 4 with labels \(1, 1, 2, 4, 5, 5\); at \(w = 0\) its residuals are \(-1, -1, -2, -4, -5, -5\):</p>
\[1 + 1 + 4 + 16 + 25 + 25 = 72 \;\checkmark\]
<p>And with way 2, row 1 is multiplied by \(\sqrt2\): its residual becomes \(\sqrt2\cdot(-1)\), whose square is \(2\cdot 1 = 2 = \gamma_1 r_1^2\) ✓. (Solved with numpy, both ways give the same \(w^* \approx (-0.45, 1.45, 2.64)\); the exam doesn't ask for these numbers.)</p>`,
      cue: R`"There is a matrix \(X'\) and a vector \(y'\) that allow us to simplify the expression for the loss as \(J_\lambda(\theta) = \|X'\theta - y'\|^2\). Write down \(X'\) and \(y'\) as a function of \(\lambda\)" (2025-B Q1.2); the hint of 2026-A Q1.3 ("duplicate some data points", "multiply \(X\) and \(y\) by a matrix \(A\) with \(A^\top A = \Gamma\)").`,
      first: R`Rewrite the penalty so it looks like the error terms: \(\lambda\theta_1^2 = (0\cdot\theta_0 + \sqrt\lambda\,\theta_1 + 0\cdot\theta_2 - 0)^2\). The bracket's coefficients are the new row, the number after the minus is its label.`,
      recipe: R`<ol><li>One extra row per penalized weight: \(\sqrt\lambda\) in that weight's column, 0 elsewhere; label 0.</li><li>\(J_\lambda = \|X'\theta - y'\|^2\) → closed form \((X'^\top X')^{-1}X'^\top y'\), gradient \(2X'^\top(X'\theta - y')\).</li><li>Weighted: duplicate rows (whole-number weights) or multiply row \(i\) by \(\sqrt{\gamma_i}\).</li></ol>`,
      trap: R`The extra rows get \(\sqrt\lambda\), not \(\lambda\) — the row is squared inside the loss. Append a 0 to \(y'\) for every extra row, and no row for \(\theta_0\).` },

    { title: "11 · Comparing two solutions: \\(J_\\lambda(\\theta^*)\\) vs \\(J_\\lambda(\\tilde\\theta)\\) (2025-C Q1.4)",
      idea: R`<h5>Where we are</h5>
<p>We now have two ways to produce a knob setting for 2025-C: run gradient descent on the LASSO loss until it converges (call the result \(\theta^*\)), or apply the plain least-squares formula (note 9) and get \(\tilde\theta = (X^\top X)^{-1}X^\top y\).</p>
<h5>What the exam asks</h5>
<p>Is \(J_\lambda(\theta^*)\) smaller than, larger than, or equal to \(J_\lambda(\tilde\theta)\)? Both are scored on the <b>same</b> loss — the LASSO loss with \(\lambda = 1\).</p>
<h5>Step 1 — what "minimizer" means</h5>
<p>"\(\theta^*\) minimizes \(J_\lambda\)" means: no knob setting has a lower \(J_\lambda\). In symbols, \(J_\lambda(\theta^*) \le J_\lambda(\theta)\) for <b>every</b> \(\theta\) — including \(\theta = \tilde\theta\).</p>
<h5>Step 2 — which loss does each vector minimize?</h5>
<ul>
<li>\(\theta^*\): gradient descent was run on \(J_{\lambda=1}\), so it minimizes \(J_{\lambda=1}\).</li>
<li>\(\tilde\theta\): the formula \((X^\top X)^{-1}X^\top y\) comes from setting the <b>plain</b> squared-error gradient to 0 (note 9), so it minimizes \(J_{\lambda=0}\), which ignores the penalty.</li>
</ul>
<h5>Step 3 — conclude</h5>
<p>From Step 1, \(J_1(\theta^*) \le J_1(\tilde\theta)\). They could only be equal if \(\tilde\theta\) happened to be a minimizer of the LASSO loss too, and there's no reason for that: \(\tilde\theta\) never looked at the penalty. So the expected answer is</p>
\[J_{\lambda=1}(\theta^*) \lt J_{\lambda=1}(\tilde\theta)\]
<p>which is the official answer ("we expect \(J_{\lambda=1}(\theta^*) \lt J_{\lambda=1}(\tilde\theta)\)").</p>
<h5>The mirror statement</h5>
<p>On the <i>plain</i> loss \(J_0\) it flips: \(J_0(\tilde\theta) \le J_0(\theta^*)\). Each vector wins on the loss it was built to minimize.</p>`,
      notation: [
        [R`\(\theta^*\)`, R`the minimizer of the loss being optimized (here \(J_{\lambda=1}\), found by gradient descent)`],
        [R`\(\tilde\theta\)`, R`\((X^\top X)^{-1}X^\top y\), the minimizer of the plain squared error \(J_{\lambda=0}\)`],
        [R`\(J_\lambda(\theta^*) \le J_\lambda(\theta)\ \forall\theta\)`, R`"for all \(\theta\)" — the definition of a minimizer`],
      ],
      example: R`<p><b>The actual numbers on 2025-C's table</b> (computed with numpy; the exam only wants the argument).</p>
<p><b>\(\tilde\theta = \left(-\tfrac{22}{7}, -\tfrac{55}{14}, \tfrac{29}{7}\right)\)</b> from note 9. Its squared error is \(\tfrac{25}{14}\) (note 9). Its penalty:</p>
\[|\tilde\theta_0| + |\tilde\theta_1| + |\tilde\theta_2| = \tfrac{22}{7} + \tfrac{55}{14} + \tfrac{29}{7} = \tfrac{44}{14} + \tfrac{55}{14} + \tfrac{58}{14} = \tfrac{157}{14} \approx 11.21\]
\[J_1(\tilde\theta) = \tfrac{25}{14} + \tfrac{157}{14} = \tfrac{182}{14} = 13\]
<p><b>\(\theta^* \approx (0,\ -2.202,\ 2.355)\)</b> — the LASSO minimizer (computed with numpy by running a LASSO solver to convergence; this is an illustration, not something you could be asked to compute). Its squared error is \(\|X\theta^* - y\|^2 \approx 4.101\) and its penalty is \(|0| + |-2.202| + |2.355| = 0 + 2.202 + 2.355 = 4.557\), so</p>
\[J_1(\theta^*) \approx 4.101 + 4.557 = 8.658 \approx 8.66 \;\lt\; 13 = J_1(\tilde\theta)\]
<p>✓ — as the argument predicted.</p>
<p>Two things to notice:</p>
<ul>
<li>The mirror statement holds too: on the plain loss, \(\tilde\theta\) scores \(\tfrac{25}{14} \approx 1.79\) and \(\theta^*\) scores \(\approx 4.10\).</li>
<li>LASSO set \(\theta^*_0\) to <b>exactly</b> 0 — the "selection" effect from note 3. \(\tilde\theta\) needed a big bias of \(-3.14\); LASSO decided the bias wasn't worth its penalty.</li>
</ul>`,
      cue: R`"You continue executing gradient descent until it converges to \(\theta^*\). You then compare \(\theta^*\) to \(\tilde\theta := (X^\top X)^{-1}X^\top y\). Determine whether \(J_\lambda(\theta^*) \lt J_\lambda(\tilde\theta)\) or \(>\) or \(=\). Briefly justify" (2025-C Q1.4).`,
      first: R`Write: "\(\theta^*\) minimizes \(J_{\lambda=1}\), so \(J_1(\theta^*) \le J_1(\theta)\) for every \(\theta\) — in particular for \(\theta = \tilde\theta\)."`,
      recipe: R`Say which loss each vector minimizes (\(\theta^*\): \(J_{\lambda=1}\); \(\tilde\theta\): \(J_{\lambda=0}\)), apply the definition of minimizer, and explain why equality is not expected: \(\tilde\theta\) ignores the penalty.`,
      trap: R`Both vectors must be scored on the <b>same</b> loss, the one named in the question (\(J_\lambda\)). Scoring \(\tilde\theta\) on the plain loss flips the answer. "Briefly justify" means the minimizer argument — no computation needed.` },

    { title: "12 · Code 1: the gradient descent loop (fill in the blanks, find the bugs)",
      idea: R`<h5>Where we are</h5>
<p>Notes 1–8 did everything on paper. Every Q1 ends with a code part that does the same things in numpy — either with blanks to fill (2025-B Q1.5, 2026-B Q1.4) or with planted bugs to find (2026-A Q1.4). The code never does anything new: every line is one of the steps you already know. So the method is always: read a line, ask "which note is this?".</p>
<h5>Step 1 — the numpy you need</h5>
<p>The Symbols table below lists every numpy expression that has appeared. Two rules matter most:</p>
<ul>
<li><code>@</code> is matrix multiplication (dot products); <code>*</code> and <code>**</code> act <b>entry by entry</b>. So <code>gamma * error</code> multiplies each residual by its own weight (that's \(\Gamma r\)), while <code>gamma @ error</code> would be a single number.</li>
<li><code>**</code> is done before <code>*</code>: <code>gamma * error**2</code> means \(\gamma_i r_i^2\), but <code>(gamma * error)**2</code> means \(\gamma_i^2 r_i^2\).</li>
</ul>
<h5>Step 2 — the loop, line by line</h5>
<p>This is the shape of every gradient descent function in the exams (here for the plain squared error):</p>
<pre><code>n    = X.shape[0]                           # number of samples = ROWS of X
X_b  = np.hstack([np.ones((n, 1)), X])      # note 1: put the ones column in front
w    = np.zeros(X_b.shape[1])               # one weight per column, all starting at 0
for _ in range(max_iter):                   # exactly max_iter steps
    r    = X_b @ w - y                      # note 1: residuals = prediction - truth
    z    = 2 * r                            # note 7: z_i for THIS loss
    grad = X_b.T @ z                        # note 5: sum_i z_i x^(i)
    if np.linalg.norm(grad) &lt;= eps:         # note 8: flat enough? stop (copy the docstring's rule)
        break
    w    = w - eta * grad                   # note 8: step AGAINST the gradient
train_risk = np.mean((X_b @ w - y) ** 2)    # note 2: mean of the squared residuals</code></pre>
<h5>Step 3 — what changes from exam to exam</h5>
<p>Only the line that computes \(z\) (and, for penalties, a helper that returns the gradient). Everything else is the same skeleton:</p>
<ul>
<li>plain squared error: <code>z = 2 * r</code></li>
<li>weighted (2026-A): <code>z = 2 * gamma * r</code>, i.e. <code>grad = 2 * X.T @ (gamma * error)</code></li>
<li>cubic (2026-B): <code>z = 3 * r**2 * np.sign(r)</code></li>
<li>ridge (2025-B): the gradient comes from a helper, <code>grad = get_ridge_grad(theta, X, y, lam)</code></li>
</ul>
<h5>Step 4 — attacking a blank</h5>
<ol>
<li>Read the docstring and the comment right above the blank — it usually says in words what goes there ("Compute prediction", "Check for convergence", "stop when ||grad J(w)||_2 &lt;= epsilon").</li>
<li>Translate those words with the notes: prediction = <code>X_b @ w</code>; residual = prediction minus <code>y</code>; gradient = <code>X.T @ z</code>; update = minus; stop = norm of the gradient.</li>
<li>Check the shape: a blank inside <code>np.ones((__, 1))</code> needs the number of rows.</li>
</ol>
<h5>Step 5 — attacking "find the bugs"</h5>
<p>First write, for yourself, the correct loop for the loss in the docstring (Step 2 with the right \(z\)). Then compare line by line. Each planted bug is a line that disagrees with your version.</p>`,
      notation: [
        [R`<code>X.shape[0]</code> / <code>X.shape[1]</code>`, R`number of rows (samples, \(n\)) / number of columns (features)`],
        [R`<code>np.ones((n, 1))</code>`, R`a column of \(n\) ones`],
        [R`<code>np.hstack([A, B])</code>, <code>np.concatenate((A, B), axis=1)</code>`, R`glue matrices side by side (add columns)`],
        [R`<code>np.zeros(k)</code>`, R`a vector of \(k\) zeros`],
        [R`<code>A @ B</code>`, "matrix multiplication (dot products)"],
        [R`<code>X.T</code>`, R`\(X^\top\), the transpose`],
        [R`<code>a * b</code>, <code>a ** 2</code>`, R`entry-by-entry product / square (<code>**</code> is done first)`],
        [R`<code>np.sign(r)</code>, <code>np.abs(r)</code>`, R`entry-by-entry \(\mathrm{sign}\) / absolute value`],
        [R`<code>np.linalg.norm(v)</code>`, R`the length \(\|v\|_2 = \sqrt{\sum_i v_i^2}\) of a vector — one number`],
        [R`<code>np.mean(v)</code> / <code>np.sum(v)</code>`, "average / total of the entries"],
        [R`<code>range(m)</code>`, R`\(0, 1, \dots, m-1\): exactly \(m\) repetitions (<code>range(1, m)</code> gives only \(m - 1\))`],
      ],
      example: R`<p><b>One pass through the loop on 2025-C's table</b> (plain squared error, <code>eta = 0.1</code>), so you can see the code holding the numbers of note 8. The features-only matrix <code>X</code> has rows \((-1, 1), (-2, 0), (1, 3), (0, 1)\) and <code>y = [6, 4, 5, 1]</code>.</p>
<ul>
<li><code>n = X.shape[0]</code> = 4. <code>X_b</code> = the \(X\) of note 1 (ones column in front). <code>w = [0, 0, 0]</code>.</li>
<li><code>r = X_b @ w - y</code> = \((0, 0, 0, 0) - (6, 4, 5, 1) = (-6, -4, -5, -1)\)</li>
<li><code>z = 2 * r</code> = \((-12, -8, -10, -2)\)</li>
<li><code>grad = X_b.T @ z</code>: entry 0 \(= -12 - 8 - 10 - 2 = -32\); entry 1 \(= (-1)(-12) + (-2)(-8) + (1)(-10) + (0)(-2) = 12 + 16 - 10 + 0 = 18\); entry 2 \(= (1)(-12) + (0)(-8) + (3)(-10) + (1)(-2) = -12 + 0 - 30 - 2 = -44\). So <code>grad</code> = \((-32, 18, -44)\) — note 8's shortcut \(-2X^\top y\) ✓.</li>
<li><code>np.linalg.norm(grad)</code> \(= \sqrt{32^2 + 18^2 + 44^2} = \sqrt{1024 + 324 + 1936} = \sqrt{3284} \approx 57.3\), not \(\le\) <code>eps</code>, so no break.</li>
<li><code>w = w - eta * grad</code> = \((0, 0, 0) - 0.1\cdot(-32, 18, -44) = (3.2, -1.8, 4.4)\).</li>
</ul>
<p><b>The six bugs of 2026-A Q1.4</b> (weighted loss; docstring: "Minimizes J(w) = sum_i gamma_i * (w^T x_i - y_i)^2"). Each is a line that disagrees with the correct loop:</p>
<div class="tw"><table><thead><tr><th>line</th><th>written</th><th>should be</th><th>why</th></tr></thead><tbody>
<tr><td>4</td><td><code>range(1, num_iters)</code></td><td><code>range(num_iters)</code></td><td>runs only num_iters − 1 iterations</td></tr>
<tr><td>6</td><td><code>error = y - y_pred</code></td><td><code>error = y_pred - y</code></td><td>residual = prediction minus truth (note 2)</td></tr>
<tr><td>7</td><td><code>grad = 2*X.T @ error</code></td><td><code>grad = 2*X.T @ (gamma * error)</code></td><td>the weights are missing: \(z_i = 2\gamma_i r_i\) (note 7). <code>gamma @ error</code> would be one number — wrong shape.</td></tr>
<tr><td>8</td><td><code>w = w + eta * grad</code></td><td><code>w = w - eta * grad</code></td><td>step against the gradient (note 8)</td></tr>
<tr><td>9</td><td><code>np.sum((gamma * error) ** 2)</code></td><td><code>np.sum(gamma * error**2)</code></td><td>the first squares the weight too: \(\gamma_i^2 r_i^2\)</td></tr>
<tr><td>11</td><td><code>if np.linalg.norm(grad) &gt; 1e-6</code></td><td><code>&lt; 1e-6</code></td><td>stop when the gradient is <b>small</b></td></tr>
</tbody></table></div>
<p><b>These six lines are exactly the official answer.</b> The question says the code has six errors and asks for at least four: learn all six, and in the exam write down every one you find — each with the line number, the wrong statement and the fix, as in the table.</p>
<p class="muted">Side remark: lines 6 and 8 are both wrong, and they also happen to compensate each other (a gradient with the wrong sign, then a step with the wrong sign, still goes downhill). So when you fix one of them, fix the other too — fixing only one would make the loop walk uphill.</p>`,
      cue: R`"Complete the missing parts of the code … label them 1–5" (2025-B Q1.5), "Complete the three missing parts … labeled 1–3" (2026-B Q1.4), "This code contains six errors. Find at least four" (2026-A Q1.4).`,
      first: R`Read the docstring first: it gives the shapes, the loss and the stopping rule. The blanks are those words in numpy; the bugs are the lines that disagree with them.`,
      recipe: R`<p>The kinds of blanks that appear, and what they translate to:</p><ul><li>size of the ones column → <code>X.shape[0]</code> (rows)</li><li>prediction → <code>X_with_bias @ theta</code></li><li>\(z\) → the derivative of the per-sample loss (note 7)</li><li>gradient from \(z\) → <code>X.T @ z</code></li><li>update → <code>theta - eta * grad</code></li><li>convergence → <code>np.linalg.norm(grad) &lt; eps</code> (2025-B's official answer; its code has no stopping rule in words), or <code>np.linalg.norm(grad) &lt;= epsilon</code> (2026-B, copying its docstring)</li><li>training error → <code>np.mean((y_hat - y) ** 2)</code></li></ul>`,
      trap: R`Moed B Q1.4: blank 1 — you wrote <code>np.abs(r)**3</code> (the loss) where \(z\), its derivative <code>3 * r**2 * np.sign(r)</code>, belonged. Blank 2 — the hint \(\nabla J = \sum_i z_i x^{(i)}\) <i>is</i> <code>X.T @ z</code>, even if you couldn't do part 3. Blank 3 — you wrote <code>grad &lt; epsilon</code>, a vector compared with a number; the docstring said <code>||grad J(w)||_2 &lt;= epsilon</code>, which is <code>np.linalg.norm(grad) &lt;= epsilon</code>.` },

    { title: "13 · Code 2: cross-validation for choosing \\(\\lambda\\)",
      idea: R`<h5>Where we are</h5>
<p>Ridge and LASSO have a dial \(\lambda\) that must be set <i>before</i> training (note 3). Which value should we use?</p>
<h5>The problem: training error can't choose \(\lambda\)</h5>
<p>On the training table, a penalty can only make the fit worse — the penalty pulls the weights away from the best-fitting ones. So judged by training error, \(\lambda = 0\) always wins. But what we care about is error on <b>unseen</b> data (the lecture calls it the generalization error), and that is exactly what the penalty is meant to improve.</p>
<h5>The idea: hide some data</h5>
<p>Train on part of the data, and measure the error on the part the model never saw — the <b>validation</b> part. That error imitates "error on new data".</p>
<h5>\(k\)-fold cross-validation</h5>
<p>One split can be lucky or unlucky, so the lecture uses several:</p>
<ol>
<li>Split the rows into \(k\) groups, called <b>folds</b>.</li>
<li>For each fold in turn: train on all the <b>other</b> folds, then compute the squared error of the predictions on <b>this</b> fold.</li>
<li>Average the \(k\) validation errors. That average is the <b>CV risk</b> of this \(\lambda\).</li>
<li>Do this for every candidate \(\lambda\), and keep the \(\lambda\) with the <b>smallest</b> CV risk.</li>
</ol>
<h5>Two different losses — don't mix them</h5>
<ul>
<li><b>Training</b> (inside the solver) minimizes the penalized loss \(J_\lambda\) — that's where \(\lambda\) is used.</li>
<li><b>Validation</b> measures plain squared prediction error, \(\sum(y_{\text{val}} - \hat y)^2\), with <b>no penalty</b>: we only care how good the predictions are (official solution, 2025-A).</li>
</ul>
<h5>Picking the folds: <code>np.arange(n)[i::k]</code></h5>
<p><code>np.arange(n)</code> is the list of row numbers \(0, 1, \dots, n-1\); <code>[i::k]</code> takes every \(k\)-th one starting at \(i\). With \(n = 10\) rows and \(k = 5\): fold 0 is rows \([0, 5]\), fold 1 is \([1, 6]\), …, fold 4 is \([4, 9]\). Every row lands in exactly one fold.</p>
<h5>The correct function</h5>
<pre><code>n = X.shape[0]                               # number of samples = ROWS
best_lmd, min_cv_risk = None, np.inf
for lmd in lmd_values:
    lo_risk = []                             # one validation risk per fold
    for i in range(k):
        left_out = np.arange(n)[i::k]        # fold i = the validation rows
        X_train = X[[j for j in range(n) if j not in left_out], :]
        y_train = y[[j for j in range(n) if j not in left_out]]
        X_val, y_val = X[left_out, :], y[left_out]
        w_star = solve(X_train, y_train, lmd)          # train WITH the penalty
        y_pred = X_val @ w_star                        # predict the VALIDATION rows
        risk   = np.sum((y_val - y_pred) ** 2)         # plain squared error, NO penalty
        lo_risk.append(risk)
    if np.mean(lo_risk) &lt; min_cv_risk:       # average over ALL folds; smaller is better
        min_cv_risk = np.mean(lo_risk)       # remember the same quantity you compared
        best_lmd = lmd
return best_lmd</code></pre>`,
      notation: [
        ["fold", R`one of the \(k\) groups the rows are split into`],
        [R`validation set`, R`the held-out fold: used only to measure error, never to train`],
        [R`CV risk`, R`the average of the \(k\) validation errors for one \(\lambda\)`],
        [R`<code>np.arange(n)[i::k]</code>`, R`row numbers \(i, i+k, i+2k, \dots\) — fold \(i\)`],
        [R`<code>np.inf</code>`, R`infinity — a starting "best so far" that any real risk beats`],
        [R`<code>lo_risk</code>`, R`"leave-out risk": the list of validation errors, one per fold`],
      ],
      example: R`<p><b>What <code>X.shape[1]</code> does on 2025-C's data.</b> 2025-C's \(X\) (with the ones column) has shape \((4, 3)\): 4 rows, 3 columns. The buggy line <code>n = X.shape[1]</code> sets \(n = 3\), so <code>range(n)</code> and <code>np.arange(n)</code> only ever see rows 0, 1, 2 — sample 4 is never used for training <i>or</i> validation. \(n\) counts samples, which are rows: <code>X.shape[0]</code>.</p>
<p><b>Every bug planted in the two real cross-validation questions</b>, with the reason:</p>
<div class="tw"><table><thead><tr><th>written</th><th>should be</th><th>why</th><th>exam</th></tr></thead><tbody>
<tr><td><code>n = X.shape[1]</code></td><td><code>n = X.shape[0]</code></td><td>\(n\) = number of samples = rows</td><td>2025-A, 2025-C</td></tr>
<tr><td><code>y_pred = X_train @ w_star</code></td><td><code>X_val @ w_star</code></td><td>validation must predict the rows the model didn't see</td><td>2025-A</td></tr>
<tr><td><code>y_pred = X_val @ w_star + lmd * np.sum(np.abs(w_star))</code></td><td><code>X_val @ w_star</code></td><td>a prediction is just \(w^\top x\); the penalty belongs to training, not to predictions</td><td>2025-C</td></tr>
<tr><td><code>risk = np.sum((y_train - y_pred) ** 2)</code></td><td><code>(y_val - y_pred)</code></td><td>compare validation predictions with validation labels</td><td>2025-C</td></tr>
<tr><td><code>risk = np.sum((y_val - y_pred)**2) + lmd * np.sum(w_star[1:]**2)</code></td><td>drop the <code>+ lmd * …</code></td><td>validation measures plain squared error</td><td>2025-A</td></tr>
<tr><td><code>if risk &lt; min_cv_risk</code></td><td><code>if np.mean(lo_risk) &lt; min_cv_risk</code></td><td><code>risk</code> is only the last fold; the CV risk is the average over all folds</td><td>2025-A</td></tr>
<tr><td><code>if np.mean(lo_risk) &gt; min_cv_risk</code></td><td><code>&lt;</code></td><td>we keep the <b>smallest</b> risk</td><td>2025-C</td></tr>
<tr><td><code>min_cv_risk = np.sum(lo_risk)</code></td><td><code>np.mean(lo_risk)</code></td><td>store the same quantity that was compared</td><td>2025-C</td></tr>
</tbody></table></div>`,
      cue: R`"The code below implements a cross-validation process for finding an optimal value for the hyperparameter \(\lambda\) … contains several errors. Find at least three, specify their line numbers … and propose a fix" (2025-A Q1.4, 2025-C Q1.5). They tell you which lines are error-free (the fold-splitting lines).`,
      first: R`Read the docstring (is the ones column already in \(X\)? what is returned?). Then check each remaining line with five questions: rows or columns? train or validation? plain error or penalized? one fold or the average? smaller or larger is better?`,
      recipe: R`For each bug write three things: the line number, the wrong statement, the corrected statement (plus a few words of why). That is exactly the format of the official answers.`,
      trap: R`The comparison must use <code>&lt;</code> (we want the minimum), and <code>min_cv_risk</code> must be updated with the same quantity that was compared — <code>np.mean(lo_risk)</code>, not <code>np.sum</code> and not the last <code>risk</code>.` },

    { title: "14 · KNN regression and the test MSE (2026-B Q1.1)",
      idea: R`<h5>Where we are</h5>
<p>Everything so far used a <b>linear</b> model: knobs \(\theta\), a loss, a search for the best knobs. The first regression lecture also shows a completely different approach that has no knobs and no training loop at all: <b>K nearest neighbours</b> (KNN).</p>
<h5>The idea</h5>
<p>To predict the label of a new point, look for the training samples that are most <b>similar</b> to it, and average their labels. "Similar" means "close" when each sample is drawn as a point with coordinates \((x_1, x_2)\).</p>
<h5>Step 1 — measure distances</h5>
<p>The distance between two points \(a = (a_1, a_2)\) and \(b = (b_1, b_2)\) is the ordinary straight-line (<b>Euclidean</b>) distance, on the formula sheet:</p>
\[d(a, b) = \sqrt{(a_1 - b_1)^2 + (a_2 - b_2)^2}\]
<p>Compute it from the new point to <b>every training sample</b>.</p>
<h5>Step 2 — pick the \(k\) nearest</h5>
<p>Sort the training samples by distance and take the \(k\) closest; this set is written \(N_k(x)\). \(k\) is a hyperparameter: 1-NN uses the single closest sample, 2-NN the two closest.</p>
<h5>Step 3 — average their labels</h5>
\[\hat y = \frac1k\sum_{i\in N_k(x)} y_i\]
<p>For 1-NN that is simply the label of the nearest sample.</p>
<h5>Step 4 — judge a model on test samples: the test MSE</h5>
<p>The lecture on model evaluation: to estimate how a model does on unseen data, keep some samples out as a <b>test set</b> and never use them for training. For each test sample compute the prediction and its squared error \((\hat y - y)^2\); the <b>test MSE</b> is the average of those squared errors:</p>
\[\mathrm{MSE} = \frac1{n_{\text{test}}}\sum_{i\in\text{test}}\left(\hat y(x^{(i)}) - y_i\right)^2\]
<p>Lower MSE = better model. That's how 2026-B decides "which model is best".</p>
<h5>The linear model in the same question</h5>
<p>2026-B Q1.1a also gives a linear model with fixed weights \(w = (w_0, w_1, w_2)\). Its prediction is note 0's formula, \(\hat y = w_0 + w_1x_1 + w_2x_2\) — don't forget the bias.</p>
<h5>A time-saver</h5>
<p>To <i>rank</i> distances you can compare the squared distances (skip the \(\sqrt{\ }\)): the square root doesn't change the order.</p>`,
      notation: [
        [R`\(d(a, b)\)`, R`Euclidean distance \(\sqrt{\sum_j (a_j - b_j)^2}\)`],
        [R`\(k\)`, R`how many neighbours to average (a hyperparameter)`],
        [R`\(N_k(x)\)`, R`the \(k\) training samples closest to \(x\)`],
        ["test set", "samples held out from training, used only to measure error"],
        [R`SE, MSE`, R`squared error \((\hat y - y)^2\) of one sample; mean of the SEs over the test samples`],
      ],
      example: R`<p><b>2026-B's table</b> — samples 1–5 are for training, 6–7 for testing:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(y\)</th><th></th></tr></thead><tbody>
<tr><td>1</td><td>20</td><td>0</td><td>5</td><td>train</td></tr><tr><td>2</td><td>30</td><td>2</td><td>6</td><td>train</td></tr>
<tr><td>3</td><td>40</td><td>0</td><td>7</td><td>train</td></tr><tr><td>4</td><td>20</td><td>2</td><td>7</td><td>train</td></tr>
<tr><td>5</td><td>40</td><td>1</td><td>9</td><td>train</td></tr><tr><td>6</td><td>30</td><td>1</td><td>7</td><td>test</td></tr>
<tr><td>7</td><td>50</td><td>2</td><td>7</td><td>test</td></tr></tbody></table></div>
<p>Here is <b>test sample 6</b>, \(x^{(6)} = (30, 1)\), \(y_6 = 7\), done completely for all three models. Sample 7 is done the same way — that's for you in the exam question.</p>
<p><b>(a) Linear model</b> \(w = (2, 0.1, 1)\):</p>
\[\hat y(x^{(6)}) = 2 + 0.1\cdot 30 + 1\cdot 1 = 2 + 3 + 1 = 6, \qquad \mathrm{SE} = (6 - 7)^2 = 1\]
<p><b>Distances</b> from \((30, 1)\) to each training sample:</p>
<ul>
<li>to 1 \((20, 0)\): \(\sqrt{(30 - 20)^2 + (1 - 0)^2} = \sqrt{100 + 1} = \sqrt{101} \approx 10.05\)</li>
<li>to 2 \((30, 2)\): \(\sqrt{(30 - 30)^2 + (1 - 2)^2} = \sqrt{0 + 1} = 1\)</li>
<li>to 3 \((40, 0)\): \(\sqrt{(30 - 40)^2 + (1 - 0)^2} = \sqrt{100 + 1} = \sqrt{101}\)</li>
<li>to 4 \((20, 2)\): \(\sqrt{(30 - 20)^2 + (1 - 2)^2} = \sqrt{100 + 1} = \sqrt{101}\)</li>
<li>to 5 \((40, 1)\): \(\sqrt{(30 - 40)^2 + (1 - 1)^2} = \sqrt{100 + 0} = 10\)</li>
</ul>
<p>Sorted: sample 2 (distance 1), then sample 5 (10), then samples 1, 3, 4 (all \(\sqrt{101}\)).</p>
<p><b>(b) 1-NN:</b> nearest is sample 2, so \(\hat y = y_2 = 6\), \(\mathrm{SE} = (6 - 7)^2 = 1\).</p>
<p><b>(c) 2-NN:</b> nearest two are samples 2 and 5, so \(\hat y = \tfrac12(y_2 + y_5) = \tfrac12(6 + 9) = 7.5\), \(\mathrm{SE} = (7.5 - 7)^2 = 0.25\).</p>
<p><b>Finishing the part:</b> do the same for sample 7 \((50, 2)\), then for each model \(\mathrm{MSE} = \tfrac12(\mathrm{SE}_6 + \mathrm{SE}_7)\); the best model is the one with the smallest MSE.</p>
<p>Look at the distances: sample 2 is "close" and samples 1, 3, 4 are "far" almost only because of \(x_1\). The \(x_2\) differences (at most 2) hardly matter next to the \(x_1\) differences (10 or 20). The lecture lists this as KNN's main limitation — "with multiple features, appropriate feature scaling is required" — and it is what note 15 fixes.</p>`,
      cue: R`"Compute the predictions on the two test samples and the test MSE for each of the following three models: a linear model with weights \(w = \dots\); 1-NN; 2-NN … Which is best?" (2026-B Q1.1).`,
      first: R`Make a distance table: one row per test sample, one column per <b>training</b> sample. Then circle the nearest one (1-NN) and nearest two (2-NN) in each row.`,
      recipe: R`<ol><li>Linear: \(\hat y = w_0 + w_1x_1 + w_2x_2\).</li><li>KNN: distances to all training samples → \(k\) smallest → average their labels.</li><li>For each model: SE per test sample, MSE = their average. Best = smallest MSE.</li></ol>`,
      trap: R`Neighbours come only from the <b>training</b> rows — never use the other test sample as a neighbour. The MSE divides by the number of <b>test</b> samples (2), and the linear prediction includes the bias \(w_0\).` },

    { title: "15 · Normalizing the features before KNN (2026-B Q1.2)",
      idea: R`<h5>Where we are</h5>
<p>In note 14, the distances from test sample 6 were decided almost entirely by \(x_1\).</p>
<h5>The problem: one feature drowns out the other</h5>
<p>In 2026-B, \(x_1\) ranges over 20–50 and \(x_2\) over 0–2. In a squared distance, a difference of 10 in \(x_1\) contributes \(10^2 = 100\), while the biggest possible difference in \(x_2\) (2) contributes only \(2^2 = 4\). So \(x_2\) is practically ignored, just because its numbers happen to be small — not because it matters less for the label.</p>
<h5>The idea: put every feature on a comparable scale</h5>
<p>Divide each feature by a number that describes how big that feature's values are. After that, both features have values of similar size, and both count in the distances. This is called <b>normalizing</b> (or scaling) the features.</p>
<h5>The exact rule 2026-B uses</h5>
<p>The question says: "divide each value of that feature by the \(L_2\) norm of the vector composed of all values of that feature across all training samples". Word by word:</p>
<ol>
<li><b>"the vector composed of all values of that feature across all training samples"</b>: take that feature's column, training rows only. For \(x_1\) that is a vector with 5 entries.</li>
<li><b>"the \(L_2\) norm"</b> of that vector: the square root of the sum of the squares of its entries, \(\|v\|_2 = \sqrt{v_1^2 + \dots + v_5^2}\) (on the formula sheet). Not the sum of the entries, not the largest entry.</li>
<li><b>"divide each value of that feature"</b>: every value in that column — the training rows <b>and</b> the test rows — is divided by this one number.</li>
<li>Do it for <b>each</b> feature separately, each with its own norm.</li>
<li>The labels \(y\) are not touched. Then redo the distance table with the new values.</li>
</ol>
<p>Why the test rows use the <i>training</i> norm: the test samples must be put through exactly the same transformation as the training samples, otherwise their distances would be measured on a different scale.</p>`,
      notation: [
        [R`\(\|v\|_2\)`, R`the \(L_2\) norm (length) of a vector: \(\sqrt{\sum_i v_i^2}\)`],
        [R`\(\|X_1\|_2\)`, R`the \(L_2\) norm of the \(x_1\) column over the training rows`],
        [R`\(\tilde x_1 = x_1 / \|X_1\|_2\)`, R`the normalized value of feature 1`],
      ],
      example: R`<p><b>Step 1–2 — the two norms</b> (training rows 1–5 of 2026-B):</p>
\[\|X_1\|_2 = \sqrt{20^2 + 30^2 + 40^2 + 20^2 + 40^2} = \sqrt{400 + 900 + 1600 + 400 + 1600} = \sqrt{4900} = 70\]
\[\|X_2\|_2 = \sqrt{0^2 + 2^2 + 0^2 + 2^2 + 1^2} = \sqrt{0 + 4 + 0 + 4 + 1} = \sqrt{9} = 3\]
<p><b>Step 3–4 — divide</b> every \(x_1\) by 70 and every \(x_2\) by 3:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(\tilde x_1 = x_1/70\)</th><th>\(\tilde x_2 = x_2/3\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>\(20/70 = 2/7\)</td><td>\(0/3 = 0\)</td><td>5</td></tr>
<tr><td>2</td><td>\(30/70 = 3/7\)</td><td>\(2/3\)</td><td>6</td></tr>
<tr><td>3</td><td>\(40/70 = 4/7\)</td><td>\(0\)</td><td>7</td></tr>
<tr><td>4</td><td>\(2/7\)</td><td>\(2/3\)</td><td>7</td></tr>
<tr><td>5</td><td>\(4/7\)</td><td>\(1/3\)</td><td>9</td></tr>
<tr><td>6 (test)</td><td>\(30/70 = 3/7\)</td><td>\(1/3\)</td><td>7</td></tr>
<tr><td>7 (test)</td><td>\(50/70 = 5/7\)</td><td>\(2/3\)</td><td>7</td></tr>
</tbody></table></div>
<p><b>Step 5 — new distances from test sample 6</b>, \((3/7, 1/3)\). Squared distances first (to compare fractions, write them over \(441 = 49\cdot 9\)):</p>
<ul>
<li>to 1 \((2/7, 0)\): \(\left(\tfrac37 - \tfrac27\right)^2 + \left(\tfrac13 - 0\right)^2 = \tfrac1{49} + \tfrac19 = \tfrac{9}{441} + \tfrac{49}{441} = \tfrac{58}{441}\), distance \(\approx 0.363\)</li>
<li>to 2 \((3/7, 2/3)\): \(0^2 + \left(\tfrac13 - \tfrac23\right)^2 = 0 + \tfrac19 = \tfrac{49}{441}\), distance \(= \tfrac13 \approx 0.333\)</li>
<li>to 3 \((4/7, 0)\): \(\left(-\tfrac17\right)^2 + \left(\tfrac13\right)^2 = \tfrac{58}{441}\), distance \(\approx 0.363\)</li>
<li>to 4 \((2/7, 2/3)\): \(\left(\tfrac17\right)^2 + \left(-\tfrac13\right)^2 = \tfrac{58}{441}\), distance \(\approx 0.363\)</li>
<li>to 5 \((4/7, 1/3)\): \(\left(-\tfrac17\right)^2 + 0^2 = \tfrac1{49} = \tfrac{9}{441}\), distance \(= \tfrac17 \approx 0.143\)</li>
</ul>
<p>The nearest neighbour is now <b>sample 5</b> (distance \(\tfrac17\)), not sample 2 as before normalization. So 1-NN predicts \(\hat y(x^{(6)}) = y_5 = 9\), with \(\mathrm{SE} = (9 - 7)^2 = 4\).</p>
<p><b>Why it changed:</b> before, samples 2 and 5 differed from sample 6 by 1 in \(x_2\) and by 10 in \(x_1\) respectively, and the 10 looked huge. After dividing, the \(x_1\) gap is \(\tfrac{10}{70} = \tfrac17\) and the \(x_2\) gap is \(\tfrac13\) — now the \(x_2\) difference is the bigger one.</p>
<p><b>Finishing the part:</b> the same five distances for test sample 7 \((5/7, 2/3)\), its 1-NN prediction and SE, then \(\mathrm{MSE} = \tfrac12(\mathrm{SE}_6 + \mathrm{SE}_7)\).</p>`,
      cue: R`"We wish to normalize [the features] before applying NN regression. When normalizing a feature, we divide each value of that feature by the \(L_2\) norm of the vector composed of all values of that feature across all training samples. Compute the test predictions and test MSE of the 1-NN model" (2026-B Q1.2).`,
      first: R`Write \(\|X_1\|_2 = \sqrt{20^2 + 30^2 + 40^2 + 20^2 + 40^2}\) and \(\|X_2\|_2 = \sqrt{0^2 + 2^2 + 0^2 + 2^2 + 1^2}\) — squares, sum, root, training rows only.`,
      recipe: R`Norm of each feature column over the training rows → divide that column (train and test) by it → new distance table → 1-NN predictions → SEs → MSE.`,
      trap: R`Moed B Q1.2 (2/4, "wrong normalization"): you divided \(x_1\) by the <b>sum</b> of its values (150) instead of its \(L_2\) norm (70), and you didn't normalize \(x_2\) at all. The rule applies to <b>each</b> feature, with the <b>\(L_2\) norm</b> = \(\sqrt{\text{sum of squares}}\).` },
  ],
    hints: {
      "2025C-q1": {
        1: R`Turn each row of the table into \((1, x_1, x_2)\) — the 1 first, for the bias \(\theta_0\) — and stack them as the rows of \(X\). Then write the labels, in the same order, as the column \(y\) (note 1).`,
        2: R`Split \(J_\lambda\) into its two parts and differentiate each separately: the squared part is the standard one (note 5); for the penalty, differentiate \(\lambda(|\theta_0| + |\theta_1| + |\theta_2|)\) one weight at a time using \(\frac{d}{da}|a| = \mathrm{sign}(a)\) (note 6). Then add the two parts.`,
        3: R`Start with the residual vector \(X\theta - y\) at \(\theta = (1, -2, 3)\), then plug it into part 2's gradient with \(\lambda = 1\), then \(\theta - 0.1\nabla J\) (note 8). Careful when you compare with the official solution: it slips on the middle gradient entry — \(2 + (-1) = 1\), not 0 — so the correct middle entry after the update is \(-2.1\), not \(-2\). (Its "\(\lambda = 2\)" on the first line is also a typo; it uses \(\lambda = 1\).)`,
        4: R`Ask which loss each vector minimizes: \(\theta^*\) minimizes \(J_{\lambda=1}\) itself, \(\tilde\theta\) minimizes the plain squared error. Then use the definition of a minimizer on \(J_{\lambda=1}\) (note 11).`,
        5: R`For each line ask: rows or columns? train or validation? plain error or penalized? one fold or the average? \(\lt\) or \(>\)? The checklist of planted bugs is in note 13.`,
      },
      "2025A-q1": {
        1: R`Ones column first, then the \(x_1\) column, then the \(x_2\) column — one row per sample (note 1).`,
        2: R`Write \(J\) as four squared brackets, one per row, e.g. \((\theta_0 + \theta_1 + 2\theta_2 - 3)^2\), plus \(\lambda(\theta_1^2 + \theta_2^2)\). Squares of degree-1 brackets are degree 2 — that's the argument. For \(a_1\), ask which terms can produce \(\theta_1^2\) (don't forget the penalty); for \(d\), set every \(\theta_j = 0\) (note 4, Steps 4–5).`,
        3: R`(a) Split into the squared part (note 5) and the ridge part; differentiate \(\lambda(\theta_1^2 + \theta_2^2)\) one knob at a time — and ask what its derivative with respect to \(\theta_0\) is (note 6). (b) At \(\theta = 0\) the residual vector is \(-y\) and the penalty's gradient is 0, so start by computing \(X^\top y\) (note 8).`,
        4: R`Write the correct cross-validation loop for yourself (note 13), then compare it line by line with the exam's code, asking: rows or columns? train or validation? penalty or not? one fold or the average over folds?`,
      },
      "2025B-q1": {
        1: R`Same as always: a ones column, then the feature columns, one row per sample; \(y\) = the labels in the same order (note 1).`,
        2: R`Rewrite each penalty term so it looks like an error term: \(\lambda\theta_1^2 = (0\cdot\theta_0 + \sqrt\lambda\,\theta_1 + 0\cdot\theta_2 - 0)^2\). Each such bracket is one extra row of \(X'\), with label 0 in \(y'\) (note 10).`,
        3: R`Look at part 2's result \(J_\lambda = \|X'\theta - y'\|^2\) and ask: what kind of loss is this, and which formula on the formula sheet minimizes that kind of loss (notes 9–10)? Careful when you compare with the official solution: it drops some primes — every \(X\) and \(y\) in its formula should be \(X'\) and \(y'\).`,
        4: R`Gradient \(2X'^\top(X'\theta - y')\); at \(\theta = 0\) the residual is \(-y'\), so \(\nabla J = -2X'^\top y'\). The two extra labels are 0, so they add nothing to \(X'^\top y'\) (note 8).`,
        5: R`Read each comment and translate: the ones column needs the number of <b>rows</b>; prediction = design matrix @ parameters; update goes against the gradient; convergence = norm of the gradient vs eps; training error = squared residuals inside <code>np.mean</code> (note 12).`,
      },
      "2026A-q1": {
        1: R`\(X\) with a ones column and \(y\) as usual; \(\Gamma\) is a \(4\times 4\) matrix with the \(\gamma\) column on its diagonal and zeros elsewhere (note 1).`,
        2: R`Each sample contributes \(\gamma_i r_i^2\): differentiate that with respect to \(r_i\) to get \(z_i\), then \(\nabla J = \sum_i z_i x^{(i)}\) (note 7). For the matrix form, check the sizes — the gradient must be \(3\times 1\), one entry per weight.`,
        3: R`Set part 2's gradient to 0 and rearrange to \(X^\top\Gamma X\,w = X^\top\Gamma y\), then invert (note 9). Or follow the hint: duplicate the weight-2 rows and use the plain pseudo-inverse formula (note 10).`,
        4: R`Write the correct loop for the docstring's loss first (note 12), then compare line by line: the range, the sign of the error, where <code>gamma</code> enters the gradient, the sign of the update, the loss formula, the stop condition. The official answer lists all six errors — write down every one you find, not just four.`,
      },
      "2026B-q1": {
        1: R`Linear: put the 1 in front and dot with \(w\). KNN: a table of distances from each test point to the five <b>training</b> points, then average the labels of the \(k\) nearest. MSE = average of the two squared errors (note 14).`,
        2: R`For each feature, compute its \(L_2\) norm over the five training rows — \(\sqrt{\text{sum of squares}}\), not the sum. Divide that whole column (train and test) by it, for both features, then redo the 1-NN distance table (note 15).`,
        3: R`Define \(r_i = w^\top x^{(i)} - y_i\) and use \(\partial r_i/\partial w_j = x^{(i)}_j\). Differentiate one term \(|r_i|^3\) with the chain rule — outer function \((\cdot)^3\), inner \(|r_i|\), whose derivative is \(\mathrm{sign}(r_i)\) — and then \(z_i\) is everything that multiplies \(x^{(i)}_j\) (note 7).`,
        4: R`Blank 1: write part 3's \(z_i\) in numpy using <code>r</code> — the derivative, not the loss. Blank 2: the question's own hint \(\nabla J = \sum_i z_i x^{(i)}\), written with <code>X.T</code>. Blank 3: copy the docstring's stopping rule; the length of a vector is <code>np.linalg.norm</code> (note 12).`,
      },
    },
  };
})();
