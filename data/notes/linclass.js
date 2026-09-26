// Notes for topic "linclass". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["linclass"] = {
  intro: R`<p>Three past exams have a linear classification question: <b>2025-A Q4</b>, <b>2025-B Q3</b> and <b>2026-B Q3</b> (your Moed B question). The details change, but every part is one of these:</p>
<ul>
<li><b>compute a score</b> \(w^\top x\) (with the bias) and <b>classify by its sign</b>: Perceptron, logistic regression, probit</li>
<li><b>one Perceptron pass</b> by hand, then the predictions afterwards</li>
<li><b>thresholds</b>: TP / FP / TN / FN, TPR and FPR, the ROC curve</li>
<li><b>linear separability</b>: separable, inseparable, or not enough information?</li>
<li><b>a mapping \(\varphi\)</b> that makes round data separable, and the <b>kernel</b> that goes with it</li>
<li><b>the BCE loss and its gradient</b> for logistic regression or a variant (probit, and the CLL of your HW3)</li>
<li><b>code</b>: fill in a gradient descent loop</li>
</ul>
<p><b>How to use the notes:</b> read them in order. Each note builds on the one before. They also build on the Regression notes: the column of ones (Regression note 1), the gradient \(\nabla = \sum_i z_i x^{(i)}\) (Regression note 3), the step \(w - \eta\nabla\) (Regression note 4) and the code loop (Regression note 6) all come back here, and the notes point to them when they do. The worked examples use <b>2025-A Q4</b>, your guided question, so do that one first with the notes open. Then do <b>2025-B Q3</b>, and finish with <b>2026-B Q3</b> as the checkpoint.</p>`,
  moves: [
    // ───────────────────────────────────────────────────────────── 0
    { title: "0 · Start here: from a number to a class",
      idea: R`<p>In regression the label was a <b>number</b> (a price, a score) and the model predicted a number. In classification the label is one of <b>two classes</b>: blue or red, sick or healthy, "+" or "−". You have already seen one classifier, the decision tree. This topic uses a different one, built from the same weighted sum as regression.</p>
<h5>Step 1 — the same weighted sum as regression</h5>
<p>Take a sample with features \(x_1, \dots, x_p\). Exactly as in Regression note 1, put a 1 in front of the features, \(x = (1, x_1, \dots, x_p)\), so that the bias \(w_0\) is multiplied by that 1. The weighted sum is then one dot product:</p>
\[w^\top x = w_0\cdot 1 + w_1 x_1 + \dots + w_p x_p\]
<p>We call this number the sample's <b>score</b>. In regression the score <i>was</i> the prediction. Here it is only a step toward the prediction.</p>
<h5>Step 2 — the sign of the score decides the class</h5>
<p>A score can be any real number, but we need one of two answers. So we look only at its <b>sign</b>:</p>
\[\hat y = \mathrm{sign}(w^\top x) = \begin{cases} +1 & \text{if } w^\top x \ge 0 \\ -1 & \text{if } w^\top x < 0 \end{cases}\]
<p>(A score of exactly 0 goes to "+" in the lectures. It almost never happens in the exams.)</p>
<h5>Step 3 — the picture: a line that cuts the plane in two</h5>
<p>With two features, the points where the score is exactly 0, \(w_0 + w_1 x_1 + w_2 x_2 = 0\), form a <b>straight line</b>. Points on one side of the line get a positive score, points on the other side a negative one. So a linear classifier is simply a line (with more features: a flat "hyperplane") with a "+" side and a "−" side. The line is called the <b>decision boundary</b>.</p>
<p>The lecture adds two facts. The "+" side is the side that the vector \((w_1, w_2)\) points to. And the size of the score tells you how far the point is from the line: the distance is \(|w^\top x| / \|(w_1,\dots,w_p)\|\). A big score means the point is far from the line, on its side.</p>
<h5>Step 4 — two ways to write the labels</h5>
<p>The classes are words (blue / red), so we replace them by numbers. Two conventions appear, and each method has its own:</p>
<ul>
<li><b>\(y \in \{-1, +1\}\)</b>: used by the <b>Perceptron</b> (notes 1–2), so that \(y\) can be compared directly with \(\mathrm{sign}(w^\top x)\).</li>
<li><b>\(y \in \{0, 1\}\)</b>: used by <b>logistic regression</b> and <b>probit</b> (notes 3, 8–11), where the prediction is a probability.</li>
</ul>
<h5>Step 5 — what the rest of the topic does with this</h5>
<p>Every part of the exam question is one of three things: <b>finding</b> a good \(w\) (Perceptron, logistic regression, probit), <b>judging</b> a classifier (TP, FP, TPR, FPR, ROC), or asking whether <b>any</b> line can do the job (separability, mappings, kernels).</p>`,
      notation: [
        [R`\(x^{(i)}\)`, R`sample \(i\), written with the 1 in front: \((1, x^{(i)}_1, \dots, x^{(i)}_p)\). As in Regression, the \((i)\) is the sample number, not a power.`],
        [R`\(x_0 = 1\)`, R`the "bias feature": the 1 we put in front of every sample so that \(w_0\) is part of the dot product`],
        [R`\(w = (w_0, w_1, \dots, w_p)\)`, R`the weights. \(w_0\) is the bias.`],
        [R`\(w^\top x\)`, R`the <b>score</b> of sample \(x\): \(w_0 + w_1x_1 + \dots + w_px_p\). 2026-B calls it \(t\) (\(t_i = w^\top x^{(i)}\)).`],
        [R`\(\mathrm{sign}(a)\)`, R`\(+1\) if \(a \ge 0\), \(-1\) if \(a < 0\)`],
        [R`\(\hat y\)`, R`the predicted label ("y-hat")`],
        [R`\(y_i\) or \(y^{(i)}\)`, R`the true label of sample \(i\): \(\pm 1\) for the Perceptron, \(0/1\) for logistic regression and probit`],
        [R`decision boundary / hyperplane`, R`the points with score exactly 0. A line when there are 2 features.`],
      ],
      example: R`<p>We use the classifier of 2026-B Q3.1 (your Moed B question): \(w = (w_0, w_1, w_2) = (1, -1, 2)\), and its two samples.</p>
<p><b>Sample 1</b> has \(x_1 = 2, x_2 = 0\). With the 1 in front: \(x^{(1)} = (1, 2, 0)\). Its score:</p>
\[w^\top x^{(1)} = (1, -1, 2)\cdot(1, 2, 0) = 1\cdot 1 + (-1)\cdot 2 + 2\cdot 0 = 1 - 2 + 0 = -1\]
<p>The score is negative, so sample 1 is on the "−" side: \(\hat y = -1\).</p>
<p><b>Sample 2</b> has \(x_1 = 0, x_2 = 1\). With the 1 in front: \(x^{(2)} = (1, 0, 1)\). Its score:</p>
\[w^\top x^{(2)} = (1, -1, 2)\cdot(1, 0, 1) = 1\cdot 1 + (-1)\cdot 0 + 2\cdot 1 = 1 + 0 + 2 = 3\]
<p>The score is positive, so sample 2 is on the "+" side: \(\hat y = +1\).</p>
<p><b>The picture.</b> The decision boundary is the line \(1 - x_1 + 2x_2 = 0\). The vector \((w_1, w_2) = (-1, 2)\) points to the "+" side, and its length is \(\sqrt{(-1)^2 + 2^2} = \sqrt{1 + 4} = \sqrt 5\). So sample 1 is \(|-1|/\sqrt5 \approx 0.45\) away from the line on the "−" side, and sample 2 is \(3/\sqrt5 \approx 1.34\) away on the "+" side.</p>
<p>Note 8 will show that these two scores already answer 2026-B Q3.1.</p>` },

    // ───────────────────────────────────────────────────────────── 1
    { title: "1 · The Perceptron: learning \\(w\\) one sample at a time",
      idea: R`<p>Note 0 classified samples with a <b>given</b> \(w\). Now: how do we <b>find</b> a good \(w\) from a labelled table? In regression we walked downhill on a loss (Regression note 4). The Perceptron is older and simpler. It never computes a loss. It goes through the samples one at a time and fixes \(w\) whenever it gets one wrong.</p>
<h5>Step 1 — predict the current sample</h5>
<p>For sample \(i\), compute the score \(w^\top x^{(i)}\) with the <b>current</b> \(w\), and its sign \(\hat y^{(i)}\). Labels here are \(\pm1\).</p>
<h5>Step 2 — compare with the truth</h5>
<p>The difference \(\hat y^{(i)} - y^{(i)}\) can only take three values:</p>
<ul>
<li>\(0\): the prediction is right. Do nothing and move on.</li>
<li>\(-1 - 1 = -2\): we said "−", the truth is "+".</li>
<li>\(1 - (-1) = +2\): we said "+", the truth is "−".</li>
</ul>
<h5>Step 3 — if wrong, nudge \(w\)</h5>
<p>The update the exam prints is</p>
\[\Delta w = -\eta\,(\hat y^{(i)} - y^{(i)})\,x^{(i)}, \qquad w \leftarrow w + \Delta w\]
<p>Plug in the two mistake cases:</p>
<ul>
<li>truth "+", we said "−": \(\Delta w = -\eta\cdot(-2)\cdot x^{(i)} = +2\eta\,x^{(i)}\). We <b>add</b> a bit of the sample to \(w\).</li>
<li>truth "−", we said "+": \(\Delta w = -\eta\cdot(+2)\cdot x^{(i)} = -2\eta\,x^{(i)}\). We <b>subtract</b> a bit of the sample.</li>
</ul>
<p><b>Why this helps.</b> Take the first case. The new score of the same sample is \((w + 2\eta x^{(i)})^\top x^{(i)} = w^\top x^{(i)} + 2\eta\,(x^{(i)})^\top x^{(i)}\). The last dot product is the sample with itself, i.e. the sum of its squared entries, written \(\|x^{(i)}\|^2\). A sum of squares is positive (the bias entry 1 alone contributes \(1^2 = 1\)), so the added part \(2\eta\|x^{(i)}\|^2\) is positive and the score went <b>up</b>, toward the "+" it should have. The second case pushes the score down in the same way. One nudge may not be enough to fix the sample; it only moves in the right direction.</p>
<h5>Step 4 — one "iteration" = one pass over the table</h5>
<p>Go through the samples in the given order. \(w\) changes <b>during</b> the pass, so each sample is judged with the latest \(w\), including every update made before it.</p>
<h5>Step 5 — when does it stop?</h5>
<p>Repeat passes until a whole pass makes no mistake. If some line separates the two classes perfectly ("linearly separable", note 5), this is guaranteed to happen after finitely many passes. If no such line exists, the Perceptron never stops on its own.</p>
<h5>The lecture's way of writing it</h5>
<p>The lecture writes \(z_i = \mathrm{sign}(w^\top x^{(i)}) - y_i\) (so \(z_i \in \{-2, 0, 2\}\)) and \(w \leftarrow w - \eta\,z_i\,x^{(i)}\). It is the same rule. It looks like the gradient step of Regression note 4, but it is <b>not</b> gradient descent: \(z_i\) is a mistake indicator, not a derivative of a loss.</p>`,
      notation: [
        [R`\(\eta\) ("eta")`, R`learning rate: the size of each nudge`],
        [R`\(\hat y^{(i)} - y^{(i)}\)`, R`the error on sample \(i\): 0 if right, \(\pm 2\) if wrong`],
        [R`\(\Delta w\)`, R`the change added to \(w\): \(\pm 2\eta\,x^{(i)}\) on a mistake, nothing otherwise`],
        [R`\(z_i\)`, R`the lecture's name for \(\mathrm{sign}(w^\top x^{(i)}) - y_i\)`],
        ["iteration (pass, epoch)", R`one trip through all \(n\) samples in order`],
      ],
      example: R`<p><b>2025-A Q4.1.</b> The table (labels are \(\pm1\)):</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(x_3\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><td>2</td><td>−1</td><td>0</td><td>2</td><td>−1</td></tr>
<tr><td>3</td><td>2</td><td>1</td><td>1</td><td>1</td></tr><tr><td>4</td><td>0</td><td>−1</td><td>1</td><td>−1</td></tr></tbody></table></div>
<p><b>Add the bias feature.</b> Put a 1 in front of every sample: \(x^{(1)} = (1,1,1,0)\), \(x^{(2)} = (1,-1,0,2)\), \(x^{(3)} = (1,2,1,1)\), \(x^{(4)} = (1,0,-1,1)\). Start: \(w = (-1, 0, 0, 0)\), \(\eta = 0.1\).</p>
<h5>Sample 1: \(x^{(1)} = (1,1,1,0)\), \(y = 1\)</h5>
\[w^\top x^{(1)} = (-1)\cdot1 + 0\cdot1 + 0\cdot1 + 0\cdot0 = -1 + 0 + 0 + 0 = -1\]
<p>\(\hat y = \mathrm{sign}(-1) = -1 \ne 1\): <b>mistake</b>. Error \(\hat y - y = -1 - 1 = -2\).</p>
\[\Delta w = -0.1\cdot(-2)\cdot(1,1,1,0) = 0.2\cdot(1,1,1,0) = (0.2,\ 0.2,\ 0.2,\ 0)\]
\[w = (-1 + 0.2,\ 0 + 0.2,\ 0 + 0.2,\ 0 + 0) = (-0.8,\ 0.2,\ 0.2,\ 0)\]
<h5>Sample 2: \(x^{(2)} = (1,-1,0,2)\), \(y = -1\)</h5>
\[w^\top x^{(2)} = (-0.8)\cdot1 + 0.2\cdot(-1) + 0.2\cdot0 + 0\cdot2 = -0.8 - 0.2 + 0 + 0 = -1\]
<p>\(\hat y = \mathrm{sign}(-1) = -1 = y\): correct. <b>No update</b>, \(w\) stays \((-0.8, 0.2, 0.2, 0)\).</p>
<h5>Sample 3: \(x^{(3)} = (1,2,1,1)\), \(y = 1\)</h5>
\[w^\top x^{(3)} = (-0.8)\cdot1 + 0.2\cdot2 + 0.2\cdot1 + 0\cdot1 = -0.8 + 0.4 + 0.2 + 0 = -0.2\]
<p>\(\hat y = \mathrm{sign}(-0.2) = -1 \ne 1\): <b>mistake</b>. Error \(-1 - 1 = -2\).</p>
\[\Delta w = -0.1\cdot(-2)\cdot(1,2,1,1) = 0.2\cdot(1,2,1,1) = (0.2,\ 0.4,\ 0.2,\ 0.2)\]
\[w = (-0.8 + 0.2,\ 0.2 + 0.4,\ 0.2 + 0.2,\ 0 + 0.2) = (-0.6,\ 0.6,\ 0.4,\ 0.2)\]
<h5>Sample 4: \(x^{(4)} = (1,0,-1,1)\), \(y = -1\)</h5>
\[w^\top x^{(4)} = (-0.6)\cdot1 + 0.6\cdot0 + 0.4\cdot(-1) + 0.2\cdot1 = -0.6 + 0 - 0.4 + 0.2 = -0.8\]
<p>\(\hat y = \mathrm{sign}(-0.8) = -1 = y\): correct. <b>No update.</b></p>
<p><b>After the iteration:</b> \(w = (-0.6,\ 0.6,\ 0.4,\ 0.2)\). Two updates happened, at samples 1 and 3.</p>
<p class="muted">(The official solution has the right numbers but three wrong labels in its text: at sample 2 it writes \(\mathrm{sign}(w^\top x^{(3)})\) where it means \(x^{(2)}\); at sample 3 it writes "\(-1 = 1 = y^{(4)}\)", which should read "\(-1 \ne 1 = y^{(3)}\)" (a mistake, so the update it then does is right); at sample 4 it writes "\(-1 \ne 1 = y^{(1)}\)", which should read "\(-1 = -1 = y^{(4)}\)" (correct, so no update, as it says).)</p>`,
      cue: R`"Execute one iteration of the Perceptron algorithm by traversing the training samples once (in that order). Describe the updates to \(w\)" (2025-A Q4.1, 8 points). The update rule is printed in the question.`,
      first: R`Rewrite every sample with a 1 in front, write the starting \(w\), and compute \(w^\top x^{(1)}\).`,
      recipe: R`For each sample, in order: score → sign → compare with \(y\). If wrong, \(\Delta w = -\eta(\hat y - y)x = \pm 2\eta\,x\) (plus if the truth is +1, minus if it is −1) and add it to \(w\). If right, write "no update". Always carry the newest \(w\) to the next sample.`,
      trap: R`Two classic slips: computing all four scores with the <b>starting</b> \(w\) (wrong: \(w\) changes mid-pass), and forgetting the 1 for the bias (then \(w_0\) never changes and every score is off).` },

    // ───────────────────────────────────────────────────────────── 2
    { title: "2 · Predictions after training: all samples at once",
      idea: R`<p>After the pass we have a new \(w\). The exam then asks what this <b>final</b> \(w\) predicts for every training sample. This is note 0's "score, then sign", done for all samples.</p>
<h5>Step 1 — stack the samples, as in Regression note 1</h5>
<p>Write the samples (each with its 1 in front) as the rows of a matrix \(X\). Then \(Xw\) is the vector of all scores at once: entry \(i\) is row \(i\) dotted with \(w\).</p>
<h5>Step 2 — take the sign of every entry</h5>
<p>The signs are the predictions. Compare them with the true labels.</p>
<h5>Why the exam asks this</h5>
<p>During the pass, each sample was judged with whatever \(w\) existed at that moment. The final \(w\) can judge a sample differently. In 2025-A, sample 1 was wrong during the pass (score \(-1\)) but is right with the final \(w\). And if the final \(w\) gets <b>every</b> sample right, it separates the two classes perfectly, which is exactly "linearly separable" (note 5).</p>`,
      notation: [
        [R`\(X\)`, R`one row per sample, bias 1 first (as in Regression note 1)`],
        [R`\(Xw\)`, R`the vector of all scores \(w^\top x^{(i)}\)`],
      ],
      example: R`<p><b>2025-A Q4.2.</b> Final \(w = (-0.6, 0.6, 0.4, 0.2)\) from note 1.</p>
\[X = \begin{bmatrix}1&1&1&0\\1&-1&0&2\\1&2&1&1\\1&0&-1&1\end{bmatrix}, \qquad w = \begin{bmatrix}-0.6\\0.6\\0.4\\0.2\end{bmatrix}\]
<ul>
<li>Row 1: \(1\cdot(-0.6) + 1\cdot0.6 + 1\cdot0.4 + 0\cdot0.2 = -0.6 + 0.6 + 0.4 + 0 = 0.4\) → \(\hat y^{(1)} = \mathrm{sign}(0.4) = 1\)</li>
<li>Row 2: \(1\cdot(-0.6) + (-1)\cdot0.6 + 0\cdot0.4 + 2\cdot0.2 = -0.6 - 0.6 + 0 + 0.4 = -0.8\) → \(\hat y^{(2)} = -1\)</li>
<li>Row 3: \(1\cdot(-0.6) + 2\cdot0.6 + 1\cdot0.4 + 1\cdot0.2 = -0.6 + 1.2 + 0.4 + 0.2 = 1.2\) → \(\hat y^{(3)} = 1\)</li>
<li>Row 4: \(1\cdot(-0.6) + 0\cdot0.6 + (-1)\cdot0.4 + 1\cdot0.2 = -0.6 + 0 - 0.4 + 0.2 = -0.8\) → \(\hat y^{(4)} = -1\)</li>
</ul>
<p>Predictions \((1, -1, 1, -1)\); true labels \((1, -1, 1, -1)\). All four are right, so this \(w\) separates the training set, and a second pass would make no updates.</p>`,
      cue: R`"What is the predicted label of each training sample <u>after</u> the Perceptron iteration you computed?" (2025-A Q4.2).`,
      first: R`Write the final \(w\) from the previous part and compute \(w^\top x^{(1)}\) with it.`,
      trap: R`Don't copy the signs you computed during the pass: they used older weights. Sample 1 had score \(-1\) during the pass and has \(+0.4\) now.` },

    // ───────────────────────────────────────────────────────────── 3
    { title: "3 · Logistic regression: from a score to a probability",
      idea: R`<p>The Perceptron gives a hard answer: "+" or "−". Often we also want to know <b>how sure</b> the model is: "this sample is red with probability 0.9". Logistic regression (LoR) gives exactly that. Despite the name, it is a <b>classifier</b>.</p>
<h5>Step 1 — the problem: a score is not a probability</h5>
<p>The score \(t = w^\top x\) can be any number, like \(-7\) or \(12.5\). A probability must lie between 0 and 1. We need a function that squashes any number into \((0, 1)\): large positive scores (far on the "+" side) should give probabilities near 1, large negative scores near 0, and points on the line (score 0) should be a coin flip, \(\tfrac12\).</p>
<h5>Step 2 — the sigmoid does exactly that</h5>
\[\sigma(t) = \frac{1}{1 + e^{-t}}\]
<ul>
<li>\(t = 0\): \(e^{0} = 1\), so \(\sigma(0) = \frac{1}{1+1} = \frac12\).</li>
<li>\(t\) large positive: \(e^{-t}\) is almost 0, so \(\sigma(t) \approx \frac{1}{1+0} = 1\).</li>
<li>\(t\) large negative: \(e^{-t}\) is huge, so \(\sigma(t) \approx 0\).</li>
<li>In between it rises smoothly (an "S" shape) and is <b>always increasing</b>. Also \(\sigma(-t) = 1 - \sigma(t)\).</li>
</ul>
<p>The LoR model is: the probability that \(x\) is positive is \(\hat y = \sigma(w^\top x)\). It is on the formula sheet.</p>
<p><b>Where \(\sigma\) comes from</b> (lecture). LoR assumes the <b>log-odds</b> of being positive is the score: \(\log\frac{\hat y}{1 - \hat y} = t\). Solve for \(\hat y\): \(\frac{\hat y}{1-\hat y} = e^t\), so \(\hat y = e^t - \hat y e^t\), so \(\hat y(1 + e^t) = e^t\), so \(\hat y = \frac{e^t}{1+e^t} = \frac{1}{1+e^{-t}}\) (divide top and bottom by \(e^t\)).</p>
<h5>Step 3 — labels are 0 and 1</h5>
<p>\(\hat y\) is "the probability that \(y = 1\)". The loss that trains LoR (the BCE, note 9) uses \(y\) and \(1 - y\) as on/off switches, which only works if \(y\) is 0 or 1. Which class you call 1 is your choice: the model then gives the probability of <i>that</i> class. The \(-1/+1\) coding belongs to the Perceptron.</p>
<h5>Step 4 — classifying: just the sign of the score</h5>
<p>The lecture's rule: positive iff \(\hat y \ge \tfrac12\). Because \(\sigma\) is increasing and \(\sigma(0) = \tfrac12\):</p>
\[\sigma(t) \ge \tfrac12 \iff \sigma(t) \ge \sigma(0) \iff t \ge 0\]
<p>So you never need to compute \(\sigma\) to classify: <b>positive score → class 1, negative score → class 0.</b> It is the same line as in note 0. LoR only adds a probability on top of it.</p>`,
      notation: [
        [R`\(\sigma(t)\) ("sigma")`, R`the sigmoid (logistic) function \(1/(1+e^{-t})\)`],
        [R`\(t\)`, R`short for the score \(w^\top x\)`],
        [R`\(\hat y = \sigma(w^\top x)\)`, R`the predicted probability that \(y = 1\). Also written \(P(y = 1 \mid x)\).`],
        [R`odds, log-odds`, R`odds \(= \hat y/(1-\hat y)\); LoR assumes \(\log(\text{odds}) = w^\top x\)`],
        [R`threshold`, R`the probability above which we say "1"; ½ by default (note 4 changes it)`],
      ],
      example: R`<p><b>2025-A Q4.3</b> (blue / red labels): LoR needs \(0/1\) labels, and either colour may be the 1. So "blue/red → 1/0" and "blue/red → 0/1" are both fine: answer <b>(d)</b>. Option (a), \(-1/1\), is the Perceptron's coding and breaks the BCE loss.</p>
<p><b>2025-B Q3.1.</b> A trained LoR model gives these scores on six test samples. Classify by the sign; the \(\sigma\) column is only there to show that it agrees.</p>
<div class="tw"><table><thead><tr><th>\(i\)</th><th>true \(y\)</th><th>\(t = w^\top x^{(i)}\)</th><th>sign</th><th>\(\hat y\) (class)</th><th>check: \(\sigma(t) = 1/(1+e^{-t})\)</th></tr></thead><tbody>
<tr><td>1</td><td>1</td><td>1.4</td><td>+</td><td>1</td><td>\(1/(1 + e^{-1.4}) = 1/(1 + 0.2466) = 0.802\)</td></tr>
<tr><td>2</td><td>0</td><td>−0.8</td><td>−</td><td>0</td><td>\(1/(1 + e^{0.8}) = 1/(1 + 2.2255) = 0.310\)</td></tr>
<tr><td>3</td><td>1</td><td>0.8</td><td>+</td><td>1</td><td>\(1/(1 + e^{-0.8}) = 1/(1 + 0.4493) = 0.690\)</td></tr>
<tr><td>4</td><td>0</td><td>−1.6</td><td>−</td><td>0</td><td>\(1/(1 + e^{1.6}) = 1/(1 + 4.9530) = 0.168\)</td></tr>
<tr><td>5</td><td>1</td><td>0.4</td><td>+</td><td>1</td><td>\(1/(1 + e^{-0.4}) = 1/(1 + 0.6703) = 0.599\)</td></tr>
<tr><td>6</td><td>0</td><td>−0.4</td><td>−</td><td>0</td><td>\(1/(1 + e^{0.4}) = 1/(1 + 1.4918) = 0.401\)</td></tr></tbody></table></div>
<p>(For a negative score, \(-t\) is positive: e.g. \(t = -0.8\) gives \(e^{-t} = e^{0.8}\).)</p>
<p>Answer: samples 1, 3, 5 → "1"; samples 2, 4, 6 → "0". Every \(\sigma\) above ½ belongs to a positive score, as Step 4 promised.</p>
<p class="muted">(The official answer writes "samples 2,4,6-8 are 0". Samples 7 and 8 are only added in part 3, so for this part it should read "2, 4, 6".)</p>`,
      cue: R`"Which transformation should be applied to the target \(y\) before training LoR?" (2025-A Q4.3); "Determine the predicted label for each of the six test samples" given a column of \(w^\top x^{(i)}\) (2025-B Q3.1).`,
      first: R`Write "predict 1 \(\iff \sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\)", then read the sign of each score.`,
      trap: R`The table gives <b>scores</b>, not probabilities. Comparing the scores with ½ (so that 0.4 becomes "0") is wrong, and the 2025-B grader's note says such answers get <b>no points</b>.` },

    // ───────────────────────────────────────────────────────────── 4
    { title: "4 · Thresholds, TP / FP / TN / FN, TPR / FPR and the ROC curve",
      idea: R`<p>LoR gives each sample a probability \(p_i\) of being positive. Note 3 said "positive iff \(p_i \ge \tfrac12\)". But ½ is only a default: we may pick any <b>threshold</b> \(\tau\) and say "positive iff \(p_i \ge \tau\)".</p>
<h5>Step 1 — why move the threshold?</h5>
<p>The two kinds of mistakes are not always equally bad. In disease screening, missing a sick patient is worse than a false alarm (a false alarm gets re-tested). Lowering \(\tau\) flags more samples as positive: we catch more real positives, but also raise more false alarms. Raising \(\tau\) does the opposite.</p>
<h5>Step 2 — the four outcomes</h5>
<p>Once a threshold is fixed, every sample lands in exactly one box:</p>
<div class="tw"><table><thead><tr><th></th><th>predicted positive</th><th>predicted negative</th></tr></thead><tbody>
<tr><td><b>truly positive</b></td><td><b>TP</b> (true positive): caught</td><td><b>FN</b> (false negative): missed</td></tr>
<tr><td><b>truly negative</b></td><td><b>FP</b> (false positive): false alarm</td><td><b>TN</b> (true negative): correctly left out</td></tr></tbody></table></div>
<h5>Step 3 — two rates</h5>
\[\text{TPR} = \frac{\text{TP}}{\text{TP}+\text{FN}}, \qquad \text{FPR} = \frac{\text{FP}}{\text{FP}+\text{TN}}\]
<ul>
<li>\(\text{TP}+\text{FN}\) is the number of truly positive samples (every real positive is either caught or missed). So <b>TPR = the fraction of real positives we catch</b>. We want it high.</li>
<li>\(\text{FP}+\text{TN}\) is the number of truly negative samples. So <b>FPR = the fraction of real negatives we wrongly flag</b>. We want it low.</li>
</ul>
<p>Both denominators are fixed by the data and do not change with \(\tau\). Only the numerators TP and FP change.</p>
<h5>Step 4 — the ROC curve</h5>
<p>Each threshold gives one pair (FPR, TPR). Plot FPR on the horizontal axis and TPR on the vertical axis, one point per threshold, and connect the points: that is the <b>ROC curve</b>. A tiny \(\tau\) flags everything, giving the point (1, 1). A \(\tau\) above every \(p_i\) flags nothing, giving (0, 0). A good classifier's curve bulges toward the top-left corner (0, 1), which means catching every positive with no false alarm.</p>
<h5>Step 5 — a threshold is a shifted line</h5>
<p>Since \(\sigma\) is increasing, "\(\sigma(t) \ge \tau\)" is the same as "\(t \ge c\)" for the number \(c\) with \(\sigma(c) = \tau\). And "\(w_0 + w_1x_1 + \dots \ge c\)" is the same as "\((w_0 - c) + w_1x_1 + \dots \ge 0\)". So changing the threshold is the same as changing the bias \(w_0\): the line moves parallel to itself. Note 5 uses this.</p>`,
      notation: [
        [R`\(\tau\) ("tau")`, R`the threshold: predict positive iff \(p_i \ge \tau\)`],
        [R`TP, FP, TN, FN`, R`counts of true positives, false positives, true negatives, false negatives`],
        [R`TPR`, R`true positive rate \(= \text{TP}/(\text{TP}+\text{FN})\), also called recall`],
        [R`FPR`, R`false positive rate \(= \text{FP}/(\text{FP}+\text{TN})\)`],
        [R`ROC curve`, R`the points (FPR, TPR) for all thresholds, joined up`],
      ],
      example: R`<p><b>2025-A Q4.4.</b> The model gives \(P(y = \text{red} \mid x^{(i)})\). Samples 1–5 are blue, 6–10 are red. Call <b>red the positive class</b>, as the official solution does. Then there are 5 real positives and 5 real negatives, so \(\text{TP}+\text{FN} = 5\) and \(\text{FP}+\text{TN} = 5\) at every threshold.</p>
<p><b>Sort the probabilities by true colour</b>, which makes the counting easy:</p>
<ul>
<li>reds (positives): \(x^{(9)}{:}\ 0.4,\ x^{(6)}{:}\ 0.45,\ x^{(7)}{:}\ 0.55,\ x^{(8)}{:}\ 0.75,\ x^{(10)}{:}\ 0.9\)</li>
<li>blues (negatives): \(x^{(1)}{:}\ 0.15,\ x^{(2)}{:}\ 0.25,\ x^{(3)}{:}\ 0.35,\ x^{(4)}{:}\ 0.65,\ x^{(5)}{:}\ 0.85\)</li>
</ul>
<p>At threshold \(\tau\): TP = number of reds with \(p \ge \tau\), FP = number of blues with \(p \ge \tau\). Then FN = 5 − TP and TN = 5 − FP.</p>
<p><b>One threshold in full, \(\tau = 0.5\):</b></p>
<ul>
<li>Predicted positive (\(p \ge 0.5\)): \(x^{(4)}\) (0.65), \(x^{(5)}\) (0.85), \(x^{(7)}\) (0.55), \(x^{(8)}\) (0.75), \(x^{(10)}\) (0.9).</li>
<li>Of those, red: \(x^{(7)}, x^{(8)}, x^{(10)}\) → TP = 3. Blue: \(x^{(4)}, x^{(5)}\) → FP = 2.</li>
<li>Reds left out: \(x^{(6)}\) (0.45), \(x^{(9)}\) (0.4) → FN = 2. Blues left out: \(x^{(1)}, x^{(2)}, x^{(3)}\) → TN = 3.</li>
<li>\(\text{TPR} = \frac{3}{3+2} = \frac35 = 0.6\), \(\text{FPR} = \frac{2}{2+3} = \frac25 = 0.4\).</li>
</ul>
<p><b>All ten thresholds:</b></p>
<div class="tw"><table><thead><tr><th>\(\tau\)</th><th>predicted positive (\(p \ge \tau\))</th><th>TP</th><th>FP</th><th>TN</th><th>FN</th><th>TPR</th><th>FPR</th></tr></thead><tbody>
<tr><td>0.1</td><td>all ten</td><td>5</td><td>5</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>0.2</td><td>all except \(x^{(1)}\)</td><td>5</td><td>4</td><td>1</td><td>0</td><td>1</td><td>0.8</td></tr>
<tr><td>0.3</td><td>\(x^{(3)}, \dots, x^{(10)}\)</td><td>5</td><td>3</td><td>2</td><td>0</td><td>1</td><td>0.6</td></tr>
<tr><td>0.4</td><td>\(x^{(4)}, \dots, x^{(10)}\)</td><td>5</td><td>2</td><td>3</td><td>0</td><td>1</td><td>0.4</td></tr>
<tr><td>0.5</td><td>\(x^{(4)}, x^{(5)}, x^{(7)}, x^{(8)}, x^{(10)}\)</td><td>3</td><td>2</td><td>3</td><td>2</td><td>0.6</td><td>0.4</td></tr>
<tr><td>0.6</td><td>\(x^{(4)}, x^{(5)}, x^{(8)}, x^{(10)}\)</td><td>2</td><td>2</td><td>3</td><td>3</td><td>0.4</td><td>0.4</td></tr>
<tr><td>0.7</td><td>\(x^{(5)}, x^{(8)}, x^{(10)}\)</td><td>2</td><td>1</td><td>4</td><td>3</td><td>0.4</td><td>0.2</td></tr>
<tr><td>0.8</td><td>\(x^{(5)}, x^{(10)}\)</td><td>1</td><td>1</td><td>4</td><td>4</td><td>0.2</td><td>0.2</td></tr>
<tr><td>0.9</td><td>\(x^{(10)}\)</td><td>1</td><td>0</td><td>5</td><td>4</td><td>0.2</td><td>0</td></tr>
<tr><td>1</td><td>none</td><td>0</td><td>0</td><td>5</td><td>5</td><td>0</td><td>0</td></tr></tbody></table></div>
<p><b>The ROC curve</b> joins the points (FPR, TPR): (1, 1), (0.8, 1), (0.6, 1), (0.4, 1), (0.4, 0.6), (0.4, 0.4), (0.2, 0.4), (0.2, 0.2), (0, 0.2), (0, 0).</p>
<div><svg viewBox="0 0 240 230" width="260" style="max-width:100%;height:auto" role="img" aria-label="ROC curve of 2025-A Q4.4">
<g fill="none" style="stroke:var(--line)" stroke-width="1"><line x1="76" y1="190" x2="76" y2="10"/><line x1="112" y1="190" x2="112" y2="10"/><line x1="148" y1="190" x2="148" y2="10"/><line x1="184" y1="190" x2="184" y2="10"/><line x1="220" y1="190" x2="220" y2="10"/><line x1="40" y1="154" x2="220" y2="154"/><line x1="40" y1="118" x2="220" y2="118"/><line x1="40" y1="82" x2="220" y2="82"/><line x1="40" y1="46" x2="220" y2="46"/><line x1="40" y1="10" x2="220" y2="10"/></g>
<g fill="none" style="stroke:var(--muted)" stroke-width="1"><line x1="40" y1="190" x2="220" y2="190"/><line x1="40" y1="190" x2="40" y2="10"/><line x1="40" y1="190" x2="220" y2="10" stroke-dasharray="4 4"/></g>
<polyline fill="none" style="stroke:var(--accent)" stroke-width="2.5" points="220,10 184,10 148,10 112,10 112,82 112,118 76,118 76,154 40,154 40,190"/>
<g style="fill:var(--accent)"><circle cx="220" cy="10" r="3.5"/><circle cx="184" cy="10" r="3.5"/><circle cx="148" cy="10" r="3.5"/><circle cx="112" cy="10" r="3.5"/><circle cx="112" cy="82" r="3.5"/><circle cx="112" cy="118" r="3.5"/><circle cx="76" cy="118" r="3.5"/><circle cx="76" cy="154" r="3.5"/><circle cx="40" cy="154" r="3.5"/><circle cx="40" cy="190" r="3.5"/></g>
<g fill="currentColor" font-size="11"><text x="130" y="222" text-anchor="middle">FPR</text><text x="12" y="100" text-anchor="middle" transform="rotate(-90 12 100)">TPR</text><text x="36" y="203" text-anchor="end">0</text><text x="112" y="203" text-anchor="middle">0.4</text><text x="220" y="203" text-anchor="middle">1</text><text x="34" y="122" text-anchor="end">0.4</text><text x="34" y="14" text-anchor="end">1</text><text x="116" y="78">τ=0.5</text></g>
</svg></div>
<p>The faint grid lines are at steps of 0.2. The dashed diagonal is what random guessing would give. This curve stays above it.</p>
<p class="muted">(The official table has the right counts and rates, but four slips in its "predicted positive" column: at 0.2 it leaves out \(x^{(2)}\) (0.25), at 0.3 it leaves out \(x^{(3)}\) (0.35), at 0.4 it leaves out \(x^{(6)}\) (0.45), and at 0.8 it lists \(x^{(8)}, x^{(10)}\) where it should be \(x^{(5)}, x^{(10)}\) (\(x^{(8)}\) has 0.75 &lt; 0.8, \(x^{(5)}\) has 0.85). The solution also accepts "&gt;" instead of "≥": then \(x^{(9)}\) (exactly 0.4) drops out at \(\tau = 0.4\), giving TPR 0.8, and \(x^{(10)}\) (exactly 0.9) drops out at \(\tau = 0.9\), giving TPR 0.)</p>`,
      cue: R`"Draw the ROC curve by calculating and plotting 10 points on the ROC curve associated with the thresholds 0.1, 0.2, …, 1. Describe all the required computations" (2025-A Q4.4, 7 points). TPR and FPR also appear in 2025-B Q3.3 (note 5).`,
      first: R`Write which class is "positive" and the rule "predicted positive iff \(p \ge \tau\)". Then list the probabilities of the real positives and of the real negatives separately.`,
      recipe: R`For each \(\tau\): TP = # positives with \(p \ge \tau\), FP = # negatives with \(p \ge \tau\), TPR = TP / #positives, FPR = FP / #negatives. Put it in a table (the question wants the computations), then plot the (FPR, TPR) points with FPR on the x-axis and connect them.`,
      trap: R`Swapping the axes (the ROC's x-axis is FPR), and dividing by the wrong total: TPR divides by the number of real <b>positives</b>, FPR by the number of real <b>negatives</b>, never by all 10.` },

    // ───────────────────────────────────────────────────────────── 5
    { title: "5 · Linear separability: separable, inseparable, or can't tell?",
      idea: R`<p>Notes 1–2 found a \(w\) that got every training sample right. That is not always possible. This note is about <b>when</b> it is.</p>
<h5>Step 1 — the definition</h5>
<p>A data set is <b>linearly separable</b> if <b>some</b> line (hyperplane) has all the positive samples strictly on one side and all the negative samples on the other. In symbols: there exists <b>some</b> \(w\) with \(\mathrm{sign}(w^\top x^{(i)})\) equal to the label of every sample. The word "some" matters: it doesn't have to be the \(w\) in the question. Any \(w\) at all will do.</p>
<h5>Step 2 — the three possible answers, and what each needs</h5>
<ul>
<li><b>Necessarily separable</b>: you can point to one \(w\) that separates. The given \(w\) or a shifted version of it (Step 3) is enough.</li>
<li><b>Necessarily inseparable</b>: you can argue that <b>no</b> line at all can work. You need to see the features for that, e.g. a picture where one class surrounds the other (note 6).</li>
<li><b>Insufficient information</b>: the given classifier and all its shifts fail, but you only know <b>its</b> scores, not the samples' features. A line pointing in another direction might still separate.</li>
</ul>
<h5>Step 3 — the tool: shifting the bias</h5>
<p>Suppose the question gives only the scores \(t_i = w^\top x^{(i)}\) of one classifier. If we replace \(w_0\) by \(w_0 - c\) and keep the other weights, each score becomes \(t_i - c\), because \(w_0\) is multiplied by the bias feature 1 in every sample. So every score moves down by the same \(c\), and the line moves parallel to itself. This is the same as a threshold (note 4, Step 5).</p>
<p>So "can some shift of this classifier separate the data?" becomes: <b>is there a number \(c\) with every positive's score above \(c\) and every negative's score below \(c\)?</b> That works exactly when</p>
\[\min_{\text{positives}} t_i \;>\; \max_{\text{negatives}} t_i\]
<p>If it holds, any \(c\) in the gap works.</p>
<h5>Step 4 — TPR = 1 and FPR = 0 means "no mistakes"</h5>
<p>TPR = 1 means FN = 0 (no positive missed). FPR = 0 means FP = 0 (no negative flagged). So TPR = 1 together with FPR = 0 means the classifier makes <b>zero mistakes</b>, i.e. it separates the set. A question about TPR and FPR can be a separability question in disguise.</p>
<h5>A side remark from the lecture</h5>
<p>The Perceptron is guaranteed to stop when the data is separable. LoR behaves oddly then: with a separating \(w\), multiplying \(w\) by a bigger and bigger number keeps the same line but keeps lowering the loss, so plain gradient descent never settles.</p>`,
      notation: [
        [R`linearly separable`, R`some \(w\) classifies every sample correctly`],
        [R`\(t_i = w^\top x^{(i)}\)`, R`the given classifier's score on sample \(i\)`],
        [R`\(w_0 - c\)`, R`the shifted bias: every score becomes \(t_i - c\), and the line moves parallel to itself`],
      ],
      example: R`<p><b>2025-B Q3.2–3.4.</b> Scores of one trained LoR classifier (labels 0/1):</p>
<div class="tw"><table><thead><tr><th>\(i\)</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr></thead><tbody>
<tr><td>\(y\)</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>\(t_i\)</td><td>1.4</td><td>−0.8</td><td>0.8</td><td>−1.6</td><td>0.4</td><td>−0.4</td><td>1.1</td><td>0.2</td><td>0.5</td></tr></tbody></table></div>
<p>Part 2 uses samples 1–6, part 3 adds 7–8, part 4 adds 9.</p>
<h5>Part 2 (samples 1–6): necessarily separable</h5>
<p>Positives (1, 3, 5) have scores 1.4, 0.8, 0.4: all \(> 0\). Negatives (2, 4, 6) have \(-0.8, -1.6, -0.4\): all \(< 0\). The given \(w\) already puts every sample on its correct side, so its hyperplane \(\{x : w^\top x = 0\}\) separates the set.</p>
<h5>Part 3 (samples 1–8): yes, TPR = 1 and FPR = 0 is reachable</h5>
<p>With the given \(w\), sample 8 (a negative) has score \(0.2 > 0\), so it is a false positive: FPR = 1/4. Try a shift (Step 3):</p>
<ul>
<li>positives' scores: 1.4, 0.8, 0.4, 1.1 → the lowest is <b>0.4</b></li>
<li>negatives' scores: −0.8, −1.6, −0.4, 0.2 → the highest is <b>0.2</b></li>
</ul>
<p>\(0.4 > 0.2\), so there is a gap. Pick \(c = 0.3\), i.e. \(w_0' = w_0 - 0.3\), other weights unchanged. The new scores \(t_i - 0.3\):</p>
<ul>
<li>positives: \(1.4 - 0.3 = 1.1\), \(0.8 - 0.3 = 0.5\), \(0.4 - 0.3 = 0.1\), \(1.1 - 0.3 = 0.8\) → all \(> 0\)</li>
<li>negatives: \(-0.8 - 0.3 = -1.1\), \(-1.6 - 0.3 = -1.9\), \(-0.4 - 0.3 = -0.7\), \(0.2 - 0.3 = -0.1\) → all \(< 0\)</li>
</ul>
<p>TP = 4, FN = 0 → TPR = 4/4 = 1. FP = 0, TN = 4 → FPR = 0/4 = 0. (The grader's note: a complete answer must name the new classifier or the threshold, not just say "yes".)</p>
<h5>Part 4 (samples 1–9): insufficient information</h5>
<p>Sample 9 is a <b>negative</b> with score 0.5, higher than the lowest positive's score, 0.4 (sample 5). Any \(c\) that keeps sample 5 positive (\(c < 0.4\)) also makes sample 9 positive (\(0.5 > c\)). So no shift of this classifier separates the set. But we only know this one classifier's scores, not the features, so a line pointing in a different direction might still separate. Answer: <b>insufficient information</b>. (The grader gave only partial credit for "necessarily inseparable", even with this argument.)</p>`,
      cue: R`"Is this test set linearly separable? Necessarily separable | Necessarily inseparable | Insufficient information" (2025-B Q3.2, Q3.4); "Is there a linear classifier that achieves TPR = 1 and FPR = 0?" (2025-B Q3.3).`,
      first: R`Split the scores into positives and negatives and write down the lowest positive score and the highest negative score.`,
      recipe: R`All positives \(> 0 >\) all negatives → separable by the given \(w\). Lowest positive \(>\) highest negative → separable after shifting \(w_0\) by any \(c\) in the gap (name it). Otherwise → this classifier and its shifts can't; without the features the answer is "insufficient information".`,
      trap: R`"Inseparable" is a claim about <b>every possible line</b>. One failing classifier never proves it.` },

    // ───────────────────────────────────────────────────────────── 6
    { title: "6 · Feature mappings \\(\\varphi\\): making round data separable",
      idea: R`<p>Note 5 was about whether a line <i>exists</i>. Sometimes you can <b>see</b> that none does. This note shows the standard fix.</p>
<h5>Step 1 — the problem</h5>
<p>In the 2025-B figure, the negatives form a small blob around the origin and the positives form a ring around that blob. A line cuts the plane into two half-planes. Whichever line you draw, the ring has points on both sides of it. So the data is not linearly separable in the features \((x_1, x_2)\).</p>
<h5>Step 2 — the boundary we want is a circle</h5>
<p>A circle of radius \(r\) around the origin is the set \(x_1^2 + x_2^2 = r^2\). Here the rule is "positive \(\iff\) outside the circle":</p>
\[y = + \iff x_1^2 + x_2^2 > r^2 \iff -r^2 + 1\cdot(x_1^2 + x_2^2) > 0\]
<h5>Step 3 — the idea: make the squares into features</h5>
<p>The last inequality is not linear in \(x_1, x_2\) (it has squares). But it <b>is</b> linear in the number \(x_1^2 + x_2^2\): it has the form "weight × 1 + weight × something > 0". So we compute new features from the old ones and give those to the classifier:</p>
\[\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2), \qquad w = (-r^2,\ 1)\]
<p>Then \(w^\top \varphi(x) = -r^2 + (x_1^2 + x_2^2)\), which is positive exactly outside the circle. In the new feature space the data <b>is</b> linearly separable. Any linear method (Perceptron, LoR, SVM) can now be run on \(\varphi(x)\) instead of \(x\). A straight line in the new space is a circle in the original plane.</p>
<h5>Step 4 — choose \(r\) from the figure</h5>
<p>Read the distances off the axes of the figure. The hollow negatives all lie within about <b>0.5</b> of the origin (the farthest ones are near \((0, 0.5)\) and \((-0.2, -0.45)\)). Most filled positives are 1 or more away, but one lone positive sits just above the blob at about \((0, 0.8)\), so the closest positive is only about <b>0.8</b> away. Any \(r\) strictly between 0.5 and 0.8 works. Easy numbers: \(r^2 = 0.4\) (so \(r = \sqrt{0.4} \approx 0.63\)), giving \(w = (-0.4,\ 1)\).</p>
<p>Check on the two critical points. The farthest negative, radius 0.5: \(-0.4 + 0.5^2 = -0.4 + 0.25 = -0.15 < 0\), negative ✓. The closest positive, radius 0.8: \(-0.4 + 0.8^2 = -0.4 + 0.64 = 0.24 > 0\), positive ✓.</p>
<p>Careful: \(r = 1\) looks "safely in the middle" but is <b>not</b>: that lone positive at radius 0.8 would be inside the circle and be called negative. (For the exam the exact \(r\) matters little: the grader wanted an explicit \(\varphi\). But say "any \(r\) between the blob and the ring".)</p>
<h5>Step 5 — when you don't know the shape: the full quadratic mapping</h5>
<p>Use every product of the features up to degree 2 (the lecture calls it the <b>full quadratic variety</b>):</p>
\[\varphi(x_1, x_2) = (1,\ x_1,\ x_2,\ x_1^2,\ x_2^2,\ x_1x_2)\]
<p>It contains the circle (\(w = (-r^2, 0, 0, 1, 1, 0)\)) and also shifted circles, ellipses and hyperbolas, so it covers any boundary given by a degree-2 equation. The official answer mentions both mappings.</p>
<h5>The general recipe</h5>
<p>Read the shape of the boundary from the picture → write "positive \(\iff\) (inequality)" → expand the inequality into a sum of "number × expression in \(x\)" → the expressions are \(\varphi\), the numbers are \(w\).</p>`,
      notation: [
        [R`\(\varphi(x)\) ("phi")`, R`the mapping: a list of new features computed from \(x\). (2026-B uses the same letter for the normal density, note 8. Different meaning, same symbol.)`],
        [R`\(1\) inside \(\varphi\)`, R`the bias feature, as always`],
        [R`full quadratic variety`, R`all products of features of degree \(\le 2\): \(1, x_1, x_2, x_1^2, x_2^2, x_1x_2\)`],
        [R`ambient / transformed space`, R`the space of the new features \(\varphi(x)\)`],
      ],
      example: R`<p><b>2025-B Q3.5.</b> Positives on a ring, negatives in the middle: \(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2)\) with \(w = (-r^2, 1)\) and \(r^2 = 0.4\) (Step 4). Then \(w^\top\varphi(x) = -0.4 + x_1^2 + x_2^2\), which is negative inside the circle of radius \(\approx 0.63\) (the blob) and positive outside it (the ring). A negative read off the figure, at about \((0.2, 0.3)\): \(\varphi = (1,\ 0.2^2 + 0.3^2) = (1,\ 0.04 + 0.09) = (1,\ 0.13)\), score \(-0.4\cdot1 + 1\cdot0.13 = -0.27 < 0\). A positive on the ring, at about \((-1.35, 0)\): \(\varphi = (1,\ 1.8225 + 0) = (1,\ 1.8225)\), score \(-0.4 + 1.8225 = 1.4225 > 0\).</p>
<p>Also acceptable (the official answer mentions it): the full quadratic mapping of Step 5.</p>
<p class="muted">(The official answer says "\(r \approx \tfrac12\)". That is right at the edge of the blob, since some negatives are about 0.5 away, so a slightly bigger \(r\) (up to about 0.8) is safer. It also writes \(\varphi(x_1, x_1)\) twice where it means \(\varphi(x_1, x_2)\).)</p>
<p><b>The same recipe on a lecture example</b> (one feature). Negatives are exactly the points with \(x \in [a - b,\ a + b]\), for \(a = 6, b = 2\), i.e. \([4, 8]\). No single threshold on \(x\) works, because positives lie on both sides. Write the rule and expand it:</p>
\[y = - \iff (x - 6)^2 < 2^2 \iff x^2 - 12x + 36 < 4 \iff 32 - 12x + 1\cdot x^2 < 0\]
<p>(from \((x-a)^2 = x^2 - 2ax + a^2\) with \(2a = 12\) and \(a^2 = 36\), then \(36 - 4 = 32\)). So \(\varphi(x) = (1, x, x^2)\) and \(w = (32, -12, 1)\) separate the data. Check at the ends of the interval: \(x = 4\): \(32 - 48 + 16 = 0\); \(x = 8\): \(32 - 96 + 64 = 0\). Both are exactly on the boundary, as they should be.</p>`,
      cue: R`"Propose a mapping function \(\varphi(x_1, x_2)\) that would make this dataset linearly separable in the transformed feature space. Write an explicit expression" (2025-B Q3.5).`,
      first: R`Name the shape in the figure (here a circle around the origin) and write "positive \(\iff x_1^2 + x_2^2 > r^2\)".`,
      recipe: R`Move everything to one side, read off \(\varphi\) (the expressions) and \(w\) (their coefficients), and state that \(w^\top\varphi(x) > 0\) exactly for the positives.`,
      trap: R`Writing only words ("use a quadratic mapping") loses points: the grader requires an <b>explicit</b> formula for \(\varphi\), and gave partial credit for "quadratic variation" and less for "polynomial".` },

    // ───────────────────────────────────────────────────────────── 7
    { title: "7 · Kernels, just enough for the dual Perceptron",
      idea: R`<p>Note 6 runs the Perceptron on \(\varphi(x)\) instead of \(x\). With many features, \(\varphi(x)\) gets very long. A <b>kernel</b> is a shortcut that avoids ever building \(\varphi(x)\). (The SVM topic covers kernels in depth. This note covers what 2025-B Q3.6 needs.)</p>
<h5>Step 1 — the Perceptron only ever adds samples to \(w\)</h5>
<p>Start the Perceptron from \(w = 0\). Note 1 showed that a mistake on sample \(j\) adds \(+2\eta x^{(j)}\) when its true label is \(y_j = +1\), and \(-2\eta x^{(j)}\) when \(y_j = -1\). Both cases are one expression: \(2\eta\,y_j\,x^{(j)}\) (the \(y_j = \pm1\) supplies the sign). So at any moment \(w\) is a sum of samples:</p>
\[w = \sum_j \lambda_j\,y_j\,x^{(j)}\]
<p>where \(\lambda_j\) is \(2\eta\) times the number of mistakes made so far on sample \(j\).</p>
<h5>Step 2 — the dual Perceptron keeps the counters \(\lambda_j\) instead of \(w\)</h5>
<p>Substitute this \(w\) into the score of sample \(i\):</p>
\[w^\top x^{(i)} = \sum_j \lambda_j\,y_j\,\big(x^{(j)}\big)^\top x^{(i)}\]
<p>So the algorithm only needs <b>dot products between pairs of samples</b>. On a mistake on sample \(i\), the update is simply \(\lambda_i \leftarrow \lambda_i + 2\eta\).</p>
<h5>Step 3 — with a mapping, and the shortcut</h5>
<p>Running it on \(\varphi(x)\) means replacing each \(\big(x^{(j)}\big)^\top x^{(i)}\) by \(\varphi(x^{(j)})^\top \varphi(x^{(i)})\). A <b>kernel</b> is a formula \(K(u, v)\) that gives this dot product directly from \(u\) and \(v\):</p>
\[K(u, v) = \varphi(u)^\top\varphi(v) \quad \text{for all } u, v\]
<h5>Step 4 — the quadratic kernel</h5>
<p>The lecture's kernel for the full quadratic mapping is \(K(u, v) = (1 + u^\top v)^2\). Why it works, for two features: expand the square of \(1 + u_1v_1 + u_2v_2\) (every pair of terms, cross terms twice):</p>
\[(1 + u_1v_1 + u_2v_2)^2 = 1 + u_1^2v_1^2 + u_2^2v_2^2 + 2u_1v_1 + 2u_2v_2 + 2u_1u_2v_1v_2\]
<p>Now take the mapping \(\varphi(x) = (1,\ \sqrt2 x_1,\ \sqrt2 x_2,\ x_1^2,\ x_2^2,\ \sqrt2 x_1x_2)\) and dot two of them, entry by entry:</p>
\[\varphi(u)^\top\varphi(v) = 1\cdot1 + \sqrt2u_1\sqrt2v_1 + \sqrt2u_2\sqrt2v_2 + u_1^2v_1^2 + u_2^2v_2^2 + \sqrt2u_1u_2\sqrt2v_1v_2\]
\[= 1 + 2u_1v_1 + 2u_2v_2 + u_1^2v_1^2 + u_2^2v_2^2 + 2u_1u_2v_1v_2\]
<p>The two lines match term by term. The \(\sqrt2\)'s are only there to produce the 2's. They don't change which boundaries are possible, because a weight can always absorb a constant factor.</p>
<h5>Step 5 — why the dual Perceptron with this kernel must converge on 2025-B's data</h5>
<ol>
<li>The dual Perceptron with \(K\) is exactly the ordinary Perceptron run on \(\varphi(x)\).</li>
<li>This \(\varphi\) contains \(1, x_1^2, x_2^2\), so the circle rule of note 6 is linear in it: \(w = (-r^2, 0, 0, 1, 1, 0)\) separates the mapped data.</li>
<li>The Perceptron always converges on linearly separable data (note 1, Step 5). So it converges here.</li>
</ol>`,
      notation: [
        [R`\(\lambda_j\) ("lambda")`, R`the dual Perceptron's counter for sample \(j\): how much of \(x^{(j)}\) has been added into \(w\)`],
        [R`\(K(u, v)\)`, R`kernel: a formula equal to \(\varphi(u)^\top\varphi(v)\)`],
        [R`\((1 + u^\top v)^2\)`, R`the quadratic kernel (the full quadratic mapping with \(\sqrt2\) scalings "affords" it)`],
      ],
      example: R`<p><b>Checking the identity with numbers.</b> Borrow two points just as test numbers: \(u = (2, 0)\) and \(v = (0, 1)\) (the samples of 2026-B Q3.1).</p>
<p>\(\varphi(u) = (1,\ \sqrt2\cdot2,\ \sqrt2\cdot0,\ 2^2,\ 0^2,\ \sqrt2\cdot2\cdot0) = (1,\ 2\sqrt2,\ 0,\ 4,\ 0,\ 0)\).</p>
<p>\(\varphi(v) = (1,\ 0,\ \sqrt2,\ 0,\ 1,\ 0)\).</p>
<ul>
<li>\(u\) with itself. Kernel: \(u^\top u = 2\cdot2 + 0\cdot0 = 4\), so \(K(u, u) = (1 + 4)^2 = 25\). Long way: \(\varphi(u)^\top\varphi(u) = 1\cdot1 + 2\sqrt2\cdot2\sqrt2 + 0 + 4\cdot4 + 0 + 0 = 1 + 8 + 0 + 16 + 0 + 0 = 25\). ✓</li>
<li>\(u\) with \(v\). Kernel: \(u^\top v = 2\cdot0 + 0\cdot1 = 0\), so \(K(u, v) = (1 + 0)^2 = 1\). Long way: \(1\cdot1 + 2\sqrt2\cdot0 + 0\cdot\sqrt2 + 4\cdot0 + 0\cdot1 + 0\cdot0 = 1\). ✓</li>
</ul>
<p><b>2025-B Q3.6, the answer to write:</b> \(K(u, v) = (1 + u^\top v)^2\). It equals \(\varphi(u)^\top\varphi(v)\) for the full quadratic mapping \(\varphi(x) = (1, \sqrt2x_1, \sqrt2x_2, x_1^2, x_2^2, \sqrt2x_1x_2)\) (show the expansion). By part 5 the data is linearly separable in that space, and the Perceptron converges on separable data, so the dual Perceptron with \(K\) converges. The grader's note says a full proof isn't required: the kernel plus "it is the dot product of the quadratic features" is enough.</p>
<p><b>Another valid answer</b> built from part 5's small mapping \(\varphi(x) = (1, x_1^2 + x_2^2)\): \(K(u, v) = 1\cdot1 + (u_1^2+u_2^2)(v_1^2+v_2^2) = 1 + \|u\|^2\|v\|^2\).</p>`,
      cue: R`"Propose a kernel function \(K(u,v)\) that will guarantee convergence of the dual perceptron … Clearly define the kernel and explain why it guarantees convergence" (2025-B Q3.6).`,
      first: R`Write the mapping from the previous part and \(K(u, v) = \varphi(u)^\top\varphi(v)\). For the quadratic mapping that is \((1 + u^\top v)^2\).`,
      recipe: R`Three sentences: (1) \(K\) is the dot product of the mapped features (show the expansion); (2) in that feature space the data is linearly separable (previous part); (3) the Perceptron converges on separable data.` },

    // ───────────────────────────────────────────────────────────── 8
    { title: "8 · Probit regression: a different S-curve (the Moed B variant)",
      idea: R`<p><b>Why it exists.</b> In note 3, the sigmoid \(\sigma\) was used to squash a score into a probability. Any other function with the same S-shape would do the same job: increasing, from 0 on the far left to 1 on the far right, ½ in the middle. <b>Probit regression</b> uses a different one: the cumulative distribution function (CDF) of the standard normal distribution, written \(\Phi\) ("capital phi").</p>
<h5>Step 1 — what \(\Phi\) is</h5>
<p>The standard normal density is the bell curve</p>
\[\varphi(t) = \frac{1}{\sqrt{2\pi}}\,e^{-t^2/2}\]
<p>(2026-B writes \(\varphi\), "small phi", for it). \(\Phi(t)\) is the <b>area under the bell to the left of \(t\)</b>, i.e. \(\Phi(t) = \int_{-\infty}^{t}\varphi(u)\,du\). Three facts follow from the picture, with no integration:</p>
<ul>
<li>As \(t\) moves right, more area is included, so \(\Phi\) is <b>increasing</b>. Far left it is 0, far right it is 1.</li>
<li>The bell is symmetric around 0, so exactly half of the area lies left of 0: \(\Phi(0) = \tfrac12\).</li>
<li>The derivative of "area up to \(t\)" is the height of the bell at \(t\): \(\Phi'(t) = \varphi(t)\). The question gives this as observation (1). It is needed in note 10.</li>
</ul>
<h5>Step 2 — what exactly changes compared with LoR</h5>
<p>Only the squashing function: \(\hat y_w(x) = \Phi(w^\top x)\) instead of \(\sigma(w^\top x)\). The score with its bias, the \(0/1\) labels, the BCE loss (note 9), the gradient's shape (note 10) and gradient descent (note 11) all stay the same.</p>
<h5>Step 3 — classifying: the sign rule again</h5>
<p>Positive iff \(\hat y \ge \tfrac12\). Since \(\Phi\) is increasing and \(\Phi(0) = \tfrac12\), the argument of note 3 carries over word for word:</p>
\[\Phi(t) \ge \tfrac12 \iff \Phi(t) \ge \Phi(0) \iff t \ge 0\]
<h5>Step 4 — the sign rule needs \(g(0) = \tfrac12\)</h5>
<p>Call the squashing function \(g\) (\(\sigma\) for LoR, \(\Phi\) for probit). In general the cut-off score is the \(t\) where \(g(t) = \tfrac12\). For \(\sigma\) and \(\Phi\) that is \(t = 0\). Your HW3 had a function where it is not: CLL, \(\gamma(t) = 1 - e^{-e^t}\). There \(\gamma(0) = 1 - e^{-1} \approx 0.632\), and solving \(\gamma(t) = \tfrac12\) gives \(e^{-e^t} = \tfrac12\), so \(e^t = \ln 2\), so \(t = \ln\ln 2 \approx -0.367\) (your HW3 Q4). So check \(g(0)\) before using the sign.</p>`,
      notation: [
        [R`\(\varphi(t)\)`, R`standard normal density (the bell curve) \(\frac{1}{\sqrt{2\pi}}e^{-t^2/2}\). In 2025-B the same letter meant a mapping (note 6).`],
        [R`\(\Phi(t)\)`, R`standard normal CDF: area under \(\varphi\) left of \(t\). Increasing, \(\Phi(0) = \tfrac12\), \(\Phi' = \varphi\).`],
        [R`\(\Phi^{-1}\)`, R`the inverse of \(\Phi\), called the "probit function" (hence the name)`],
        [R`\(g\)`, R`these notes' name for "whichever squashing function": \(\sigma\), \(\Phi\), or \(\gamma\)`],
        [R`\(t_i = w^\top x^{(i)}\)`, R`the score of sample \(i\) (2026-B's notation)`],
      ],
      example: R`<p><b>2026-B Q3.1.</b> \(w = (1, -1, 2)\); samples \((2, 0)\) and \((0, 1)\). Note 0 already computed the scores:</p>
<ul>
<li>Sample 1: \(w^\top x^{(1)} = 1\cdot1 + (-1)\cdot2 + 2\cdot0 = 1 - 2 + 0 = -1 < 0\) → \(\Phi(-1) < \Phi(0) = \tfrac12\) → <b>negative</b>.</li>
<li>Sample 2: \(w^\top x^{(2)} = 1\cdot1 + (-1)\cdot0 + 2\cdot1 = 1 + 0 + 2 = 3 > 0\) → \(\Phi(3) > \tfrac12\) → <b>positive</b>.</li>
</ul>
<p>That is the full answer. Only if you want to see them: \(\Phi(-1) \approx 0.159\) and \(\Phi(3) \approx 0.9987\), read off a normal table, never integrated by hand.</p>
<p><b>Side by side with LoR</b> on the same scores: \(\sigma(-1) = 1/(1 + e^{1}) = 1/3.718 \approx 0.269\) and \(\sigma(3) = 1/(1 + e^{-3}) = 1/1.0498 \approx 0.953\). The numbers differ, the decisions don't.</p>`,
      cue: R`"Consider a trained probit regression classifier with weights \(w = (1, -1, 2)\). Use it to classify each of the two samples as positive or negative. Briefly explain" (2026-B Q3.1, 4 points).`,
      first: R`Compute \(w^\top x\) with the bias for each sample, then write "\(\Phi\) is increasing and \(\Phi(0) = \tfrac12\), so positive iff \(w^\top x \ge 0\)".`,
      trap: R`In Moed B you computed the scores \(-1\) and \(3\) correctly, then tried to integrate \(\Phi(-1)\) by hand and crossed everything out: 0/4. The answer was already on your page. The sign plus that one sentence was all four points.` },

    // ───────────────────────────────────────────────────────────── 9
    { title: "9 · The BCE loss: how LoR and probit are trained",
      idea: R`<p>We have a model that outputs a probability \(\hat y_i = g(t_i)\) (\(g = \sigma\) for LoR, \(\Phi\) for probit). To <b>train</b> it we need a loss: one number saying how bad a \(w\) is, like \(J\) in Regression note 2. For probabilities the standard choice is the <b>binary cross-entropy (BCE)</b>.</p>
<h5>Step 1 — the loss of one sample</h5>
<p>Look at the probability the model gave to the <b>true</b> label:</p>
<ul>
<li>if \(y_i = 1\), that probability is \(\hat y_i\);</li>
<li>if \(y_i = 0\), it is \(1 - \hat y_i\).</li>
</ul>
<p>The sample's loss is \(-\log(\text{that probability})\). If the model gave the truth probability 1, the loss is \(-\log 1 = 0\). If it gave the truth probability near 0, \(-\log\) of a tiny number is huge. So confident mistakes cost a lot.</p>
<h5>Step 2 — one formula for both cases</h5>
\[\ell_i = -\big[\,y_i\log\hat y_i + (1 - y_i)\log(1 - \hat y_i)\,\big]\]
<p>Plug in \(y_i = 1\): the second term is multiplied by \(1 - 1 = 0\), leaving \(-\log\hat y_i\). Plug in \(y_i = 0\): the first term is multiplied by 0, leaving \(-\log(1 - \hat y_i)\). So \(y_i\) and \(1 - y_i\) are on/off switches, which is why the labels must be 0 and 1 (note 3).</p>
<h5>Step 3 — average over the samples</h5>
\[L(w) = \frac1n\sum_{i=1}^n \ell_i = -\frac1n\sum_{i=1}^n\Big[y_i\log\hat y_w(x^{(i)}) + (1 - y_i)\log\big(1 - \hat y_w(x^{(i)})\big)\Big]\]
<p>This is exactly what 2026-B prints in the question and what the formula sheet lists (for \(\sigma\)).</p>
<h5>Step 4 — "simplify using \(t_i\)": substitute the model</h5>
<p>The model says \(\hat y_w(x^{(i)}) = g(w^\top x^{(i)}) = g(t_i)\). Replace every \(\hat y_w(x^{(i)})\) with \(g(t_i)\):</p>
<ul>
<li>LoR: \(L(w) = -\frac1n\sum_i\big[y_i\log\sigma(t_i) + (1-y_i)\log(1 - \sigma(t_i))\big]\)</li>
<li><b>Probit</b>: \(L(w) = -\frac1n\sum_i\big[y_i\log\Phi(t_i) + (1-y_i)\log(1 - \Phi(t_i))\big]\)</li>
<li>CLL (your HW3 Q5): \(1 - \gamma(t) = e^{-e^t}\), so \(\log(1 - \gamma(t_i)) = -e^{t_i}\) and the loss simplifies to \(-\frac1n\sum_i\big[y_i\log(1 - e^{-e^{t_i}}) - (1-y_i)e^{t_i}\big]\).</li>
</ul>
<p>For probit nothing simplifies further. The substitution is the whole answer to 2026-B Q3.2.</p>`,
      notation: [
        [R`BCE`, R`binary cross-entropy: the average of \(-\log(\text{probability given to the true label})\)`],
        [R`\(\ell_i\)`, R`the loss of sample \(i\) alone`],
        [R`\(L(w)\)`, R`the BCE on the whole data set, a function of the weights`],
        [R`\(\log\)`, R`natural log (ln)`],
      ],
      example: R`<p><b>What the loss measures, with numbers.</b> This uses the six scores and labels of 2025-B Q3 as test numbers (that question itself doesn't ask for the loss). The \(\sigma\) values are note 3's, kept to 4 decimals here so the logs come out right.</p>
<div class="tw"><table><thead><tr><th>\(i\)</th><th>\(y_i\)</th><th>\(t_i\)</th><th>\(\sigma(t_i)\)</th><th>prob. of true label</th><th>\(\ell_i = -\log(\cdot)\)</th></tr></thead><tbody>
<tr><td>1</td><td>1</td><td>1.4</td><td>0.8022</td><td>\(\sigma = 0.8022\)</td><td>\(-\log 0.8022 = 0.220\)</td></tr>
<tr><td>2</td><td>0</td><td>−0.8</td><td>0.3100</td><td>\(1 - 0.3100 = 0.6900\)</td><td>\(-\log 0.6900 = 0.371\)</td></tr>
<tr><td>3</td><td>1</td><td>0.8</td><td>0.6900</td><td>\(\sigma = 0.6900\)</td><td>\(-\log 0.6900 = 0.371\)</td></tr>
<tr><td>4</td><td>0</td><td>−1.6</td><td>0.1680</td><td>\(1 - 0.1680 = 0.8320\)</td><td>\(-\log 0.8320 = 0.184\)</td></tr>
<tr><td>5</td><td>1</td><td>0.4</td><td>0.5987</td><td>\(\sigma = 0.5987\)</td><td>\(-\log 0.5987 = 0.513\)</td></tr>
<tr><td>6</td><td>0</td><td>−0.4</td><td>0.4013</td><td>\(1 - 0.4013 = 0.5987\)</td><td>\(-\log 0.5987 = 0.513\)</td></tr></tbody></table></div>
\[L = \frac{0.220 + 0.371 + 0.371 + 0.184 + 0.513 + 0.513}{6} = \frac{2.172}{6} \approx 0.362\]
<p>Every sample is classified correctly, yet the loss is not 0: samples 5 and 6 sit close to the line (\(|t| = 0.4\)), the model is unsure about them, and they cost the most. Sample 4 is far on its correct side and costs the least.</p>
<p><b>Same scores through probit</b> (\(\Phi\) instead of \(\sigma\)): \(\Phi(t_i) = 0.919, 0.212, 0.788, 0.055, 0.655, 0.345\); losses \(0.084, 0.238, 0.238, 0.056, 0.422, 0.422\); average \(\approx 0.244\). Same pattern, different numbers.</p>
<p><b>2026-B Q3.2, the answer:</b> with \(t_i = w^\top x^{(i)}\) and \(\hat y_w(x^{(i)}) = \Phi(t_i)\),</p>
\[L(w) = -\frac1n\sum_{i=1}^n\Big[y_i\log\Phi(t_i) + (1-y_i)\log\big(1 - \Phi(t_i)\big)\Big]\]`,
      cue: R`"Write an expression for the BCE loss \(L(w)\) … Simplify your expression by using the notation \(t_i := w^\top x^{(i)}\)" (2026-B Q3.2, 5 points; your HW3 Q5 for CLL).`,
      first: R`Copy the BCE printed in the question and write "\(\hat y_w(x^{(i)}) = \Phi(t_i)\)" underneath.`,
      recipe: R`Substitute \(g(t_i)\) for every \(\hat y_w(x^{(i)})\). Then simplify only if \(\log g\) or \(\log(1-g)\) simplifies (it does for CLL, not for \(\sigma\) or \(\Phi\)).`,
      trap: R`You left this blank in Moed B: 5 points for one substitution into a formula that was printed on the page.` },

    // ───────────────────────────────────────────────────────────── 10
    { title: "10 · The gradient of BCE for any S-curve: \\(z_i\\) for LoR, probit, CLL",
      idea: R`<p>To run gradient descent on \(L(w)\) we need its gradient. Regression note 3 showed the shape every gradient in this course has: \(\nabla L = \sum_i z_i\,x^{(i)}\), where \(z_i\) is "the derivative of sample \(i\)'s loss with respect to its score". We derive \(z_i\) once for a general squashing function \(g\), then plug in \(\sigma\), \(\Phi\) or \(\gamma\).</p>
<h5>Step 1 — the one fact about the score</h5>
<p>\(t_i = w_0\cdot1 + w_1x^{(i)}_1 + \dots + w_px^{(i)}_p\). Only the term \(w_jx^{(i)}_j\) contains \(w_j\), so \(\dfrac{\partial t_i}{\partial w_j} = x^{(i)}_j\), just as in Regression note 3.</p>
<h5>Step 2 — differentiate the two logs (chain rule)</h5>
<p>Outside to inside: \(\log\) (derivative \(1/\text{its input}\)), then \(g\) (derivative \(g'\)), then \(t_i\) (derivative \(x^{(i)}_j\)):</p>
\[\frac{\partial}{\partial w_j}\log g(t_i) = \frac{1}{g(t_i)}\cdot g'(t_i)\cdot x^{(i)}_j = \frac{g'(t_i)}{g(t_i)}\,x^{(i)}_j\]
<p>For the second log the inside is \(1 - g(t_i)\), whose derivative is \(-g'(t_i)\cdot x^{(i)}_j\):</p>
\[\frac{\partial}{\partial w_j}\log\big(1 - g(t_i)\big) = \frac{1}{1 - g(t_i)}\cdot\big(-g'(t_i)\big)\cdot x^{(i)}_j = -\frac{g'(t_i)}{1 - g(t_i)}\,x^{(i)}_j\]
<h5>Step 3 — put them into the loss</h5>
\[\frac{\partial L}{\partial w_j} = -\frac1n\sum_i\Big[y_i\frac{g'(t_i)}{g(t_i)} - (1-y_i)\frac{g'(t_i)}{1-g(t_i)}\Big]x^{(i)}_j = -\frac1n\sum_i\Big[\frac{y_i}{g(t_i)} - \frac{1-y_i}{1-g(t_i)}\Big]g'(t_i)\,x^{(i)}_j\]
<h5>Step 4 — "group common terms": one common denominator</h5>
<p>Write \(g\) for \(g(t_i)\) to keep it short:</p>
\[\frac{y}{g} - \frac{1-y}{1-g} = \frac{y(1-g) - (1-y)g}{g(1-g)} = \frac{y - yg - g + yg}{g(1-g)} = \frac{y - g}{g(1-g)}\]
<p>The \(-yg\) and \(+yg\) cancel. Put it back, and use the minus sign in front to flip \(y - g\) into \(g - y\):</p>
\[\frac{\partial L}{\partial w_j} = \sum_i \underbrace{\frac{\big(g(t_i) - y_i\big)\,g'(t_i)}{n\,g(t_i)\,\big(1 - g(t_i)\big)}}_{z_i}\,x^{(i)}_j \qquad\Longrightarrow\qquad \nabla L = \sum_i z_i\,x^{(i)}\]
<h5>Step 5 — plug in the S-curve</h5>
<ul>
<li><b>LoR</b>, \(g = \sigma\). The lecture shows \(\sigma'(t) = \sigma(t)(1 - \sigma(t))\). Where it comes from: differentiate \(\sigma(t) = (1+e^{-t})^{-1}\) with the chain rule, \(-(1+e^{-t})^{-2}\cdot(-e^{-t}) = \frac{1}{1+e^{-t}}\cdot\frac{e^{-t}}{1+e^{-t}}\). The first factor is \(\sigma\). The second is \(\frac{(1+e^{-t}) - 1}{1+e^{-t}} = 1 - \frac{1}{1+e^{-t}} = 1 - \sigma\). Now put \(g' = \sigma(1-\sigma)\) into \(z_i\):
\[z_i = \frac{\big(\sigma(t_i) - y_i\big)\,\sigma(t_i)\big(1 - \sigma(t_i)\big)}{n\,\sigma(t_i)\big(1 - \sigma(t_i)\big)} = \frac{\sigma(t_i) - y_i}{n}\]
The whole denominator except \(n\) cancels. This is the formula-sheet gradient \(\frac1n\sum_i(\sigma(w^\top x^{(i)}) - y_i)x^{(i)}\).</li>
<li><b>Probit</b>, \(g = \Phi\), \(g' = \varphi\) (observation 1). Nothing cancels:
\[z_i = \frac{\big(\Phi(t_i) - y_i\big)\,\varphi(t_i)}{n\,\Phi(t_i)\,\big(1 - \Phi(t_i)\big)}\]
Observation 2 (\(\varphi' = -t\varphi\)) is not needed, as the question itself says.</li>
<li><b>CLL</b> (your HW3 Q6), \(g = \gamma = 1 - e^{-e^t}\). Its derivative (chain rule, twice): \(\gamma'(t) = -e^{-e^t}\cdot(-e^t) = e^t\,e^{-e^t} = e^t\,(1 - \gamma(t))\), because \(1 - \gamma(t) = e^{-e^t}\). Put it into \(z_i\):
\[z_i = \frac{\big(\gamma(t_i) - y_i\big)\,e^{t_i}\big(1 - \gamma(t_i)\big)}{n\,\gamma(t_i)\big(1 - \gamma(t_i)\big)} = \frac{e^{t_i}\,\big(\gamma(t_i) - y_i\big)}{n\,\gamma(t_i)}\]
Only the \(1 - \gamma\) cancels.</li>
</ul>
<p>In all three, \(z_i\) has the sign of \(g(t_i) - y_i\): positive when the model's probability is too high, negative when too low. The step \(w - \eta\nabla L\) then moves the scores the right way.</p>`,
      notation: [
        [R`\(g'(t)\)`, R`the derivative of the S-curve: \(\sigma(1-\sigma)\) for LoR, \(\varphi\) for probit, \(e^t(1-\gamma)\) for CLL`],
        [R`\(\partial t_i / \partial w_j = x^{(i)}_j\)`, R`the fact used in every gradient of the course`],
        [R`\(z_i\)`, R`sample \(i\)'s coefficient in \(\nabla L = \sum_i z_i x^{(i)}\) (a number per sample)`],
      ],
      example: R`<p><b>2026-B Q3.3, the answer:</b> \(\nabla L(w) = \sum_i z_i\,x^{(i)}\) with</p>
\[z_i = -\frac1n\Big[\frac{y_i}{\Phi(t_i)} - \frac{1-y_i}{1-\Phi(t_i)}\Big]\varphi(t_i) = \frac{\Phi(t_i) - y_i}{n\,\Phi(t_i)\,(1 - \Phi(t_i))}\,\varphi(t_i)\]
<p>(Both forms are the official answer; the second is the grouped one.)</p>
<p><b>What the \(z_i\) look like, with numbers</b> (again borrowing 2025-B's six scores, \(n = 6\), only as test numbers):</p>
<ul>
<li><b>LoR, sample 1</b> (\(y = 1\), \(\sigma = 0.8022\)): \(z_1 = (0.8022 - 1)/6 = -0.1978/6 \approx -0.033\).</li>
<li><b>LoR, sample 2</b> (\(y = 0\), \(\sigma = 0.3100\)): \(z_2 = (0.3100 - 0)/6 \approx 0.052\).</li>
<li><b>Probit, sample 1</b> (\(y = 1\), \(t = 1.4\)): \(\Phi(1.4) = 0.9192\), \(\varphi(1.4) = e^{-0.98}/\sqrt{2\pi} = 0.3753/2.5066 = 0.1497\). Numerator \((0.9192 - 1)\cdot0.1497 = -0.0808\cdot0.1497 = -0.0121\). Denominator \(6\cdot0.9192\cdot0.0808 = 0.4456\). \(z_1 = -0.0121/0.4456 \approx -0.027\).</li>
<li><b>Probit, sample 2</b> (\(y = 0\), \(t = -0.8\)): \(\Phi(-0.8) = 0.2119\), \(\varphi(-0.8) = e^{-0.32}/\sqrt{2\pi} = 0.7261/2.5066 = 0.2897\). Numerator \((0.2119 - 0)\cdot0.2897 = 0.0614\). Denominator \(6\cdot0.2119\cdot0.7881 = 1.0020\). \(z_2 \approx 0.061\).</li>
</ul>
<p>Sample 1 is a positive whose probability is a bit too low → negative \(z\). Sample 2 is a negative whose probability is a bit too high → positive \(z\).</p>`,
      cue: R`"Derive an expression for the gradient \(\nabla L(w)\) … Use the chain rule and group common terms, as we did for LoR … the appropriate expression for \(z_i\)" (2026-B Q3.3, 8 points; your HW3 Q6 is the same derivation for CLL).`,
      first: R`Write \(\dfrac{\partial}{\partial w_j}\log\Phi(t_i) = \dfrac{\varphi(t_i)}{\Phi(t_i)}\,x^{(i)}_j\) (chain rule with observation 1 and \(\partial t_i/\partial w_j = x^{(i)}_j\)). That line alone earns partial credit.`,
      recipe: R`Two log-derivatives → substitute into \(-\frac1n\sum[\dots]\) → factor out \(g'(t_i)x^{(i)}_j\) → common denominator \(g(1-g)\) → read off \(z_i\).`,
      trap: R`Left blank in Moed B (8 points). It is your own HW3 Q6 with \(\gamma\) replaced by \(\Phi\) and \(\gamma'\) by \(\varphi\).` },

    // ───────────────────────────────────────────────────────────── 11
    { title: "11 · Code: LoR gradient descent and the probit mini-batch loop",
      idea: R`<p>Both code parts of this topic are the Regression loop (Regression note 6) with the classification pieces put in. Read each line and ask which note it is.</p>
<h5>Step 1 — full-batch gradient descent for LoR (2025-A Q4.5)</h5>
<pre><code>import numpy as np                                   # blank (1)

def sigmoid(z):
    return 1 / (1 + np.exp(-z))                      # blank (2): note 3, sigma on the formula sheet

def logistic_regression_gd(X, y, eta, num_steps):
    X_with_bias = np.concatenate((np.ones((X.shape[0],1)), X), axis=1)  # the 1 in front (note 0)
    w = np.zeros(X_with_bias.shape[1])               # one weight per column
    for step in range(num_steps):
        z = X_with_bias @ w                          # blank (3): all scores at once (note 2)
        y_hat = sigmoid(z)                           # all probabilities
        grad = X_with_bias.T @ (y_hat - y)           # sum_i (sigma(t_i) - y_i) x^(i)  (note 10)
        w = w - eta * grad                           # blank (4): step downhill (Regression note 4)
    return w</code></pre>
<p>Here <code>z</code> is the vector of <b>scores</b> (the \(t_i\)). In the probit code below, <code>z</code> means the gradient coefficients \(z_i\). Same letter, different meaning, so read the surrounding lines. The gradient here leaves out the \(\frac1n\). That only rescales the step, like a different \(\eta\).</p>
<h5>Step 2 — the new words in the probit code: epoch and mini-batch</h5>
<p>Full-batch gradient descent uses <b>all</b> \(n\) samples for every step. <b>Mini-batch</b> gradient descent shuffles the rows, cuts them into small consecutive chunks ("batches") of <code>batch_size</code> rows, and takes one step per chunk, using only that chunk's gradient. One trip through all the chunks is an <b>epoch</b>. Many cheap, slightly noisy steps instead of few exact ones. The Perceptron (note 1) is the extreme case, with one sample per step.</p>
<h5>Step 3 — the probit mini-batch loop (2026-B Q3.4), line by line</h5>
<pre><code>for _ in range(num_epochs):                              # one epoch = one pass over the data
    X_s, y_s, y01_s = shuffle_data(X, y, y_01)           # new random row order each epoch
    for start in range(0, n_samples, batch_size):
        end = min(start + batch_size, n_samples)
        X_b = X_s[start:end]                             # this batch's rows
        y_b = y_s[start:end]                             # ... their original labels
        y01_b = y01_s[start:end]                         # ... the same labels as 0/1
        y_prob = self.predict_proba(X_b)                 # Phi(t_i) for the batch (note 8)
        z = probit_grad_coeffs(y_prob, y01_b)            # the z_i of note 10
        grad = X_b.T @ z                                 # blank (1): sum_i z_i x^(i)
        self.w = self.w - self.learning_rate * grad      # blank (2): step against the gradient
        current_loss = self.BCE_loss(X_b, y_b)           # blank (3): BCE on this batch (note 9)
        self.loss_history_.append(current_loss)
        # early halting based on loss change
        if abs(previous_loss - current_loss) &lt; self.eps:  # blank (4): the CHANGE is small
            return
        previous_loss = current_loss</code></pre>
<ul>
<li><b>Blank 1.</b> The question's hint says \(\nabla L = \sum_i z_i x^{(i)}\). Summing "coefficient × row" over the rows is \(X^\top z\) (Regression note 3), so <code>X_b.T @ z</code>. You can write this without having solved part 3.</li>
<li><b>Blank 2.</b> The printed line is <code>self.w = ____</code>, so the blank is only the right-hand side: "current weights minus learning rate times gradient", the Regression note 4 step written with the class's names: <code>self.w - self.learning_rate * grad</code>. <i>A naming slip in the question:</i> the start of <code>fit</code> creates the weights as <code>self.w_</code> (with an underscore, as in your HW3), while the printed line and the list of class variables say <code>self.w</code>. The official answer mixes the two (<code>self.w_ = self.w - …</code>). The name is not what is graded; just use one name on both sides (e.g. write <code>self.w_ - self.learning_rate * grad</code> and add "assuming <code>self.w</code> means <code>self.w_</code>").</li>
<li><b>Blank 3.</b> <code>self.BCE_loss(X, y)</code> "evaluates \(L(w)\) on a dataset X, y", so give it this batch: <code>self.BCE_loss(X_b, y_b)</code>. It takes the <b>original</b> labels and converts them to 0/1 itself. In your HW3, <code>BCE_loss</code> starts with <code>y_01 = np.where(y == self.class_names[0], 0, 1)</code>, and your HW3 mini-batch <code>fit</code> called <code>self.BCE_loss(X_batch, y_shuffled[start:end])</code>, which is this exact answer.</li>
<li><b>Blank 4.</b> The comment says "based on loss <b>change</b>": the stop test compares the <b>difference</b> between the previous and current loss with <code>eps</code>, and <code>abs</code> makes it a size.</li>
</ul>`,
      notation: [
        [R`<code>X @ w</code>`, R`\(Xw\): all scores at once`],
        [R`<code>X.T @ z</code>`, R`\(X^\top z = \sum_i z_i x^{(i)}\): the gradient from its coefficients`],
        [R`epoch`, R`one pass over all the data`],
        [R`mini-batch`, R`a chunk of <code>batch_size</code> rows; one gradient step per chunk`],
        [R`<code>abs(a - b) &lt; eps</code>`, R`"a and b are within eps of each other": the loss has stopped changing`],
      ],
      example: R`<p><b>2025-A Q4.5, the four blanks:</b> (1) <code>numpy</code> (2) <code>1 / (1 + np.exp(-z))</code> (3) <code>X_with_bias @ w</code> (4) <code>w - eta * grad</code>.</p>
<p><b>2026-B Q3.4, the four blanks:</b> (1) <code>X_b.T @ z</code> (2) <code>self.w - self.learning_rate * grad</code> (or with <code>self.w_</code> on both sides) (3) <code>self.BCE_loss(X_b, y_b)</code> (4) <code>abs(previous_loss - current_loss) &lt; self.eps</code>.</p>
<p><b>Your HW3 already contains this loop.</b> Your mini-batch <code>fit</code> did, per batch: <code>p = 1/(1+np.exp(-X_batch @ self.w_))</code> → <code>gradient = X_batch.T @ (p - y_01_batch) / X_batch.shape[0]</code> → <code>self.w_ = self.w_ - self.learning_rate * gradient</code> → <code>self.BCE_loss(X_batch, y_shuffled[start:end])</code>. The exam's version only swaps \(\sigma\) for \(\Phi\) and hands you \(z\) ready-made.</p>`,
      cue: R`"Complete the missing parts of code by filling in the four blank expressions" (2025-A Q4.5, 5 points; 2026-B Q3.4, 8 points).`,
      first: R`Read the docstring, the comments and the list of available functions first. Every blank is spelled out there (the hint \(\sum_i z_ix^{(i)}\), "early halting based on loss change", <code>self.learning_rate</code>, <code>self.BCE_loss(X, y)</code>).`,
      trap: R`Moed B: blanks 1–2 empty, blank 3 unfinished (<code>self.BCE_loss(</code>), and blank 4 written as <code>current_loss &lt; self.eps</code>. That tests the loss itself, but the comment says loss <b>change</b>. 1/8, on a part the HW3 code gives almost line for line.` },
  ],
    hints: {
      "2025A-q4": {
        1: R`Put a 1 in front of each sample and start from \(w = (-1, 0, 0, 0)\): \(w^\top x^{(1)} = -1\), sign \(-1 \ne 1 = y^{(1)}\), so \(\Delta w = -0.1\cdot(-1-1)\cdot x^{(1)}\). Carry the new \(w\) to sample 2 (note 1). (The official text has three wrong labels at samples 2–4, but its numbers and updates are right; see note 1.)`,
        2: R`Use the <b>final</b> \(w = (-0.6, 0.6, 0.4, 0.2)\) from part 1 and compute \(Xw\): one dot product per sample, then signs (note 2). Don't reuse the scores from during the pass.`,
        3: R`Ask what the LoR loss needs: the BCE uses \(y\) and \(1 - y\) as on/off switches (note 9, Step 2). Check which options give labels that can do that, and whether swapping the two colours changes anything (note 3).`,
        4: R`Call red positive. For each \(\tau\): TP = # reds with \(p \ge \tau\), FP = # blues with \(p \ge \tau\), TPR = TP/5, FPR = FP/5; plot (FPR, TPR) (note 4). The official "predicted positive" lists have slips at 0.2, 0.3, 0.4, 0.8, but its counts are right.`,
        5: R`(1) is the library imported as np; (2) is \(\sigma\) from the formula sheet; (3) is "all scores at once"; (4) is the gradient step (note 11).`,
      },
      "2025B-q3": {
        1: R`\(\sigma(t) \ge \tfrac12 \iff t \ge 0\): read the <b>sign</b> of each \(w^\top x^{(i)}\) (note 3). Comparing the scores with ½ got 0 points.`,
        2: R`Check whether the given \(w\) already puts every label-1 sample at a positive score and every label-0 sample at a negative score. If yes, its hyperplane separates the set (note 5).`,
        3: R`Write the lowest score among the positives and the highest among the negatives. If there is a gap, shift \(w_0\) by a number \(c\) inside it and name the new classifier (note 5).`,
        4: R`Compare sample 9's score (a negative, 0.5) with the lowest positive score (0.4): no shift of this \(w\) works. But you only know this \(w\)'s scores, not the features (note 5).`,
        5: R`Negatives in a small disc, positives on a ring: write "positive \(\iff x_1^2 + x_2^2 > r^2\)" and read \(\varphi\) and \(w\) off that inequality. Give an explicit formula, and take \(r\) between the blob (about 0.5) and the closest positive (about 0.8) (note 6).`,
        6: R`Take the full quadratic mapping and its kernel \(K(u,v) = (1 + u^\top v)^2 = \varphi(u)^\top\varphi(v)\). Then: separable in \(\varphi\)-space (part 5) + the Perceptron converges on separable data (note 7).`,
      },
      "2026B-q3": {
        1: R`Compute \(w^\top x\) with the bias: \(-1\) and \(3\). \(\Phi\) is increasing with \(\Phi(0) = \tfrac12\), so classify by the sign. No integral (note 8).`,
        2: R`Copy the printed BCE and replace every \(\hat y_w(x^{(i)})\) by \(\Phi(t_i)\). That substitution is the answer (note 9).`,
        3: R`Start with \(\frac{\partial}{\partial w_j}\log\Phi(t_i) = \frac{\varphi(t_i)}{\Phi(t_i)}x^{(i)}_j\) and \(\frac{\partial}{\partial w_j}\log(1-\Phi(t_i)) = -\frac{\varphi(t_i)}{1-\Phi(t_i)}x^{(i)}_j\), then use the common denominator \(\Phi(1-\Phi)\) (note 10).`,
        4: R`The hint \(\sum_i z_ix^{(i)}\) is <code>X_b.T @ z</code>; the update uses <code>self.learning_rate</code>; the loss is on the batch; the comment says stop on the loss <b>change</b> (note 11).`,
      },
    },
  };
})();
