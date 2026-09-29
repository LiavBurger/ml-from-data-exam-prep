// Primer cards for Linear classification (spec/PRIMERS.md). Sources: lectures ML04, ML05, ML08a and HW3, HW4 only.
(function () {
  const R = String.raw;
  window.PRIMERS = window.PRIMERS || {};
  window.PRIMERS.linclass = [

    // ───────────────────────── 1 · ML04 ─────────────────────────
    { title: "Linear classifier: score and sign",
      what: R`<p>A linear classifier gives every sample a <b>score</b> \(w_0 + w_1x_1 + \dots + w_px_p\). Score ≥ 0 → predict +, score &lt; 0 → predict −. Labels are +1 and −1.</p>
<p>Like in regression, add a feature \(x_0 = 1\) so \(w_0\) is inside \(w\): the score is just \(w^\top x\). The points with score exactly 0 are the <b>decision boundary</b>: a point on a 1D axis, a line in 2D, a plane in 3D. \(w\) (without \(w_0\)) is at a right angle to the boundary, and the + side is the side \(w\) points to.</p>`,
      formula: R`\[\begin{aligned}\hat y &= \mathrm{sign}(w^\top x)\quad (x_0 = 1)\\ \text{boundary: }\ w^\top x &= 0\end{aligned}\]`,
      remember: R`\[\begin{aligned}&\text{distance from } x \text{ to the boundary}\\ &= \frac{|\text{score}|}{\sqrt{w_1^2 + \dots + w_p^2}}\end{aligned}\]<p>Score = \(w_0 + w_1x_1 + \dots + w_px_p\) as usual, but <b>no \(w_0\) under the root</b>. Not on the sheet.</p>`,
      example: { src: "Lecture ML08a, slide 'Linearly Separable Data – Example'", html: R`<p>1D data, weights \(w = (w_0, w_1) = (4, -1)\). The score is \(4 - 1\cdot x\).</p>
<p><b>Boundary:</b> \(4 - x = 0\) → \(x = 4\) (the slide writes it \(-w_0/w_1 = 4\)).</p>
<p><b>Predict:</b> left of 4 the score is positive → +, right of 4 it's negative → −. E.g. \(x = 2\): \(4 - 2 = 2 \gt  0\) → +. \(x = 7\): \(4 - 7 = -3 \lt  0\) → −.</p>
<p>On the slide all the + samples are left of 4 and all the − samples right of it, so every training sample is classified correctly.</p>` },
      try: { src: "Lecture ML04, slide 'Geometric Observations – Summary'",
        q: R`<p>What happens to the boundary and to the predictions if you multiply all the weights \((w_0, w)\) by 3? And by −1?</p>`,
        a: R`<p><b>By 3:</b> every score is 3× bigger. Score = 0 stays score = 0, so the boundary is the same, and the signs don't change, so the predictions are the same.</p>
<p><b>By −1:</b> the boundary is still the same (0 × −1 = 0), but every score flips sign, so every prediction flips (+ ↔ −).</p>` },
      mistakes: R`<ul><li>Forgetting the \(x_0 = 1\) column: then \(w^\top x\) misses \(w_0\).</li><li>The distance divides by \(\|w\|\) <b>without</b> \(w_0\).</li></ul>`,
      where: ["2025-A Q4.2", "2025-B Q3.1", "2025-C Q3.1", "2025-C Q3.2"] },

    // ───────────────────────── 2 · ML04 ─────────────────────────
    { title: "The LMS classifier",
      what: R`<p>The first idea for training: pretend it's regression. The labels +1 and −1 are just numbers, so fit \(w\) with the usual squared error (gradient descent or the least-squares formula), then predict with the sign of the score.</p>
<p>What it really asks: every + sample should score exactly +1 and every − sample exactly −1.</p>
<p>Why it's not ideal: a sample far on the <b>correct</b> side scores way more than 1, and gets punished for it. Those samples drag the line, so LMS can miss a line that separates the data perfectly, even when one exists.</p>`,
      formula: R`\[J(w) = \frac1n\sum_i\big(w^\top x^{(i)} - y_i\big)^2,\quad y_i \in \{-1, 1\}\]`,
      remember: R`<p>Not on the main sheet (it only has the regression version, [sheet: Square error loss]). Extension sheet, if you get it: [sheet: Least mean squares classification], the same loss with \(\frac1{2n}\), split into the + and the − samples.</p>`,
      example: { src: "Lecture ML04, slides 'The MSE loss for classification' and 'The LMS Classifier Is Not Ideal'", html: R`<p>Split the sum into the + samples and the − samples (with \(x_0 = 1\)):</p>
\[\begin{aligned}J = \frac1n\Big[&\sum_{y_i = +1}\big(w^\top x^{(i)} - 1\big)^2\\ +\;&\sum_{y_i = -1}\big(w^\top x^{(i)} + 1\big)^2\Big]\end{aligned}\]
<p>So each + sample wants score = 1 and each − sample wants score = −1: the line "score = 1" tries to pass through the + samples, and "score = −1" through the − samples.</p>
<p>On the slide's 2D example this gives a line with 2 of 12 training samples wrong, while another line gets all 12 right.</p>` },
      mistakes: R`<ul><li>Low LMS loss ≠ few mistakes: it measures distance from ±1, not wrong signs.</li><li>LMS always converges (for a small enough step); the Perceptron is the one that might not.</li></ul>`,
      where: ["2025-C Q3.3", "2025-C Q3.4"] },

    // ───────────────────────── 3 · ML04 ─────────────────────────
    { title: "The Perceptron",
      what: R`<p>A training rule that only reacts to mistakes. Go over the samples one at a time (\(x_0 = 1\), labels ±1) and predict sign(\(w^\top x\)). Right → do nothing. Wrong → nudge \(w\): a + sample predicted − gets added to \(w\), a − sample predicted + gets subtracted. That turns the boundary toward the sample. Keep passing over the data until a full pass has no mistakes.</p>
<p>It looks like gradient descent (step size η, updates from errors), but no loss is being lowered. LMS with one sample per step has the same update, except its error is \(w^\top x - y\), so it moves even on correct samples.</p>
<p>It converges iff the data is linearly separable.</p>`,
      formula: R`\[\begin{aligned}z_i &= \mathrm{sign}(w^\top x^{(i)}) - y_i \;\in \{-2, 0, 2\}\\ w &\leftarrow w - \eta\, z_i\, x^{(i)}\end{aligned}\]`,
      remember: R`\[\text{mistake: }\ w \leftarrow w + 2\eta\, y_i\, x^{(i)}\qquad \text{correct: no change}\]<p>Same rule, other way to write it. Not on the sheet.</p>`,
      example: { src: "Lecture ML04, slides 'Geometry of Perceptron Update'", html: R`<p>The three cases of \(z_i\):</p>
<div class="tw"><table><thead><tr><th>predicted</th><th>label</th><th>\(z_i\)</th><th>update</th></tr></thead><tbody>
<tr><td>+1</td><td>−1</td><td>2</td><td>\(w - 2\eta x^{(i)}\): away from \(x^{(i)}\)</td></tr>
<tr><td>−1</td><td>+1</td><td>−2</td><td>\(w + 2\eta x^{(i)}\): toward \(x^{(i)}\)</td></tr>
<tr><td>= label</td><td></td><td>0</td><td>no change</td></tr></tbody></table></div>
<p>Why toward / away: with \(x_0 = 1\) the boundary \(w^\top x = 0\) goes through the origin, and \(x^{(i)}\) scores + exactly when it's on the same side as \(w\). A + sample predicted −: pull \(w\) toward it, so it ends up on \(w\)'s side.</p>` },
      try: { src: "Lecture ML08a, slide 'The Dual Perceptron – Recap'",
        q: R`<p>ML08a writes the update as: if \(y_i \ne \hat y_i\), then \(w \leftarrow w + 2\eta\,y_i\,x^{(i)}\). Show it's the same as ML04's \(w \leftarrow w - \eta\,z_i\,x^{(i)}\).</p>`,
        a: R`<p>On a mistake the prediction is \(-y_i\), so \(z_i = -y_i - y_i = -2y_i\). Then \(w - \eta\,(-2y_i)\,x^{(i)} = w + 2\eta\,y_i\,x^{(i)}\). When the prediction is right, \(z_i = 0\): no change in both.</p>` },
      mistakes: R`<ul><li>Scoring with an old \(w\): each sample is scored with the newest \(w\), which changes right after every mistake.</li><li>Not separable → the Perceptron never settles (it's LMS that always converges).</li></ul>`,
      where: ["2025-A Q4.1", "2025-A Q4.2", "2025-B Q3.6", "2026-A Q3.4"] },

    // ───────────────────────── 4 · ML05 ─────────────────────────
    { title: "Logistic regression (LoR)",
      what: R`<p>Instead of just + / −, LoR outputs a <b>probability</b> that the label is 1: \(\hat y(x) \approx \Pr[Y = 1 \mid x]\), a number in [0, 1]. Labels are now <b>1 and 0</b>.</p>
<p><b>σ(\(w^\top x\)) = two steps:</b> compute the score \(w^\top x\) (any number), then put it into σ, which squashes it into a probability: σ(−2) ≈ 0.12, σ(0) = ½, σ(2) ≈ 0.88. Why σ? The model assumes the log-odds \(\log\frac{\hat y}{1 - \hat y}\) equal the score; solve for \(\hat y\) and you get σ.</p>
<p>Predict 1 iff \(\hat y \ge \frac12\), which is exactly score ≥ 0. So it's still the line \(w^\top x = 0\). The line sets the S-curve's center, \(\|w\|\) its steepness (bigger → sharper jump).</p>`,
      formula: R`\[\hat y(x) = \sigma(w^\top x) = \frac{1}{1 + e^{-w^\top x}}\]<p>[sheet: Sigmoid function] · [sheet: Logistic regression posterior model]</p>`,
      remember: R`\[\sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\]<p>So the sign of the score decides, no need to compute σ. Not on the sheet.</p>`,
      example: { src: "Lecture ML05, slide 'Inverting the Log-Odds'", html: R`<p>Write \(s = \hat y\) and \(t = w^\top x\) (the slide's letters) and solve the log-odds for \(s\):</p>
\[\begin{aligned}\log\frac{s}{1-s} = t \;&\Rightarrow\; \frac{s}{1-s} = e^t\\ &\Rightarrow\; s = e^t - s\,e^t\\ &\Rightarrow\; s\,(1 + e^t) = e^t\\ &\Rightarrow\; s = \frac{e^t}{1+e^t} = \frac{1}{1+e^{-t}}\end{aligned}\]
<p>Last step: divide top and bottom by \(e^t\). That's σ(t).</p>` },
      try: { src: "Lecture ML05, slide 'The Logistic Function' (left there as an exercise)",
        q: R`<p>Show that \(\sigma(-t) = 1 - \sigma(t)\).</p>`,
        a: R`\[\begin{aligned}1 - \sigma(t) &= 1 - \frac{1}{1+e^{-t}} = \frac{e^{-t}}{1+e^{-t}}\\ &= \frac{1}{e^{t} + 1} = \sigma(-t)\end{aligned}\]<p>(Second line: multiply top and bottom by \(e^t\).)</p>` },
      mistakes: R`<ul><li>LoR labels are 0/1, not ±1 (the Perceptron and LMS use ±1).</li><li>Thinking a bigger \(\|w\|\) moves the line: it only makes σ steeper.</li></ul>`,
      where: ["2025-A Q4.3", "2025-B Q3.1", "2026-B Q3.1"] },

    // ───────────────────────── 5 · ML05 ─────────────────────────
    { title: "The BCE loss",
      what: R`<p>How LoR scores a \(w\) on the training data. For each sample, take the probability the model gave to the <b>true</b> label: \(\hat y\) if the label is 1, \(1 - \hat y\) if it's 0. Take −log of it, and average over the samples.</p>
<p>−log(1) = 0, so a confident right answer costs nothing. −log of something near 0 is huge, so a confident wrong answer costs a lot. In the formula, \(y_i\) and \(1 - y_i\) are just switches: with 0/1 labels exactly one of the two terms is on.</p>
<p>BCE is convex (no extra local minima), but there's no closed-form solution, so it's minimized with gradient descent.</p>`,
      formula: R`\[\begin{aligned}\mathrm{BCE}(w) = -\frac1n\sum_i\Big[&y_i\log\sigma(w^\top x^{(i)})\\ +\;&(1-y_i)\log\big(1 - \sigma(w^\top x^{(i)})\big)\Big]\end{aligned}\]<p>[sheet: Binary cross-entropy (BCE) loss]</p>`,
      example: { src: "Lecture ML05, slides 'Binary Cross Entropy (BCE)'", html: R`<p>Flip the switches for one sample:</p>
<div class="tw"><table><thead><tr><th>label</th><th>what's left of the bracket</th></tr></thead><tbody>
<tr><td>\(y_i = 1\)</td><td>\(\log\sigma(w^\top x^{(i)}) = \log\hat y\)</td></tr>
<tr><td>\(y_i = 0\)</td><td>\(\log\big(1 - \sigma(w^\top x^{(i)})\big) = \log(1 - \hat y)\)</td></tr></tbody></table></div>
<p>Where the name comes from: the true label as a distribution is \(p = (y, 1-y)\), i.e. (1, 0) or (0, 1). The model's is \(q = (\hat y, 1 - \hat y)\). Cross entropy \(H(p, q) = -p_1\log q_1 - p_2\log q_2\) is exactly one sample's term; BCE averages it.</p>` },
      try: { src: "Lecture ML05, slide 'The BCE Loss Function'",
        q: R`<p>The slide writes \(\mathrm{BCE} = -\frac1n\sum_i\log(1 - err_i)\), where \(err_i = |y_i - \hat y(x^{(i)})|\) is the gap between the label and the curve. Why is this the same loss?</p>`,
        a: R`<p><b>Label 1:</b> \(err_i = 1 - \hat y\), so \(1 - err_i = \hat y\) → \(\log\hat y\), the \(y = 1\) term.</p><p><b>Label 0:</b> \(err_i = \hat y\), so \(1 - err_i = 1 - \hat y\) → \(\log(1 - \hat y)\), the \(y = 0\) term. Same loss, sample by sample.</p>` },
      mistakes: R`<ul><li>Dropping the minus in front: BCE \(= -\frac1n\sum[\dots]\) is ≥ 0.</li><li>Using ±1 labels here: with \(y = -1\) the switches \(y_i\), \(1 - y_i\) break.</li></ul>`,
      where: ["2025-A Q4.3", "2026-B Q3.2"] },

    // ───────────────────────── 6 · ML05 ─────────────────────────
    { title: "BCE gradient and gradient descent",
      what: R`<p>To run gradient descent we need \(\nabla\mathrm{BCE}\). Same recipe as regression: derivative by one weight \(w_j\) (a sum over samples) → write it with matrices → stack all the weights.</p>
<p>The chain rule needs one new fact: σ' = σ(1 − σ). With it the logs and σ's cancel, and each sample contributes (its error) × (its \(x\)), where error = σ(score) − label. Same shape as regression's gradient.</p>
<p>Setting it to 0 can't be solved by hand, so: repeat \(w \leftarrow w - \eta\nabla\mathrm{BCE}\). On separable data BCE keeps dropping as \(\|w\|\) grows (same line, steeper σ), so GD never settles; a \(\|w\|^2\) penalty fixes that.</p>`,
      formula: R`\[\begin{aligned}\nabla\mathrm{BCE} &= \frac1n\sum_i\big(\sigma(w^\top x^{(i)}) - y_i\big)\,x^{(i)}\\ &= \frac1n X^\top\big(\sigma(Xw) - y\big)\end{aligned}\]<p>[sheet: BCE loss gradient] has the first line.</p>`,
      remember: R`\[\sigma'(t) = \sigma(t)\big(1 - \sigma(t)\big)\]<p>Not on the sheet. Neither is the matrix form (the sheet has the sum) or the step \(w \leftarrow w - \eta\,\nabla\mathrm{BCE}\).</p>`,
      example: { src: "Lecture ML05, slides 'Gradient of BCE Loss'", html: R`<p><b>The function</b> — one bracket per sample:</p>
\[\begin{aligned}\mathrm{BCE}(w) = -\frac1n\sum_i\Big[&y_i\log\sigma(w^\top x^{(i)})\\ +\;&(1-y_i)\log\big(1 - \sigma(w^\top x^{(i)})\big)\Big]\end{aligned}\]
<p><b>Derivative by one weight \(w_j\)</b> — chain rule, like \(\log(x^2+1) \to \frac{1}{x^2+1}\cdot 2x\): log(…) → \(\frac{1}{(\dots)}\) · (derivative of …), then σ(…) → σ(1 − σ) · (the number in front of \(w_j\)) = \(x^{(i)}_j\). Here (…) = \(w^\top x^{(i)}\):</p>
\[\begin{aligned}\tfrac{\partial}{\partial w_j}\log\sigma(\dots) &= \tfrac{1}{\sigma(\dots)}\,\sigma(\dots)\big(1 - \sigma(\dots)\big)\,x^{(i)}_j\\ &= \big(1 - \sigma(\dots)\big)\,x^{(i)}_j\\ \tfrac{\partial}{\partial w_j}\log\big(1 - \sigma(\dots)\big) &= -\sigma(\dots)\,x^{(i)}_j\end{aligned}\]
<p>Put both in and open the bracket: \(y_i(1 - \sigma) - (1 - y_i)\sigma = y_i - \sigma\), and the minus in front flips it:</p>
\[\frac{\partial\,\mathrm{BCE}}{\partial w_j} = \frac1n\sum_i\big(\sigma(w^\top x^{(i)}) - y_i\big)\,x^{(i)}_j\]
<p><b>Write it with matrices</b> — \(\frac1n\) is the same for every sample: out. The rest, entry × entry added up, is a dot product:</p>
\[\begin{aligned}\frac{\partial\,\mathrm{BCE}}{\partial w_j} &= \underbrace{\color{#e8912d}\tfrac1n}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\big(\sigma(w^\top x^{(i)}) - y_i\big)\\ &= \tfrac1n\,X_j^\top\big(\sigma(Xw) - y\big)\end{aligned}\]
<p>\(X_j\) = column \(j\) of \(X\). \(\sigma(Xw)\) = σ applied to each entry of \(Xw\) (<code>sigmoid(X @ w)</code>), so entry \(i\) of \(\sigma(Xw) - y\) is sample \(i\)'s bracket. \(x^{(i)}_j\) and the bracket change per sample, so they don't come out; they're packed into the lists \(X_j\) and \(\sigma(Xw) - y\).</p>
<div class="sizecheck"><span class="tag sizetag">Size check</span>\[\underbrace{X_j^\top}_{\textstyle 1\times n}\,\underbrace{\big(\sigma(Xw) - y\big)}_{\textstyle n\times 1} = \text{one number}\]<p>inner n = n ✓ · one number, like \(\frac{\partial\,\mathrm{BCE}}{\partial w_j}\) ✓</p></div>
<p><b>From one weight to \(\nabla\mathrm{BCE}\)</b> — stack it for \(w_0, \dots, w_p\). Only \(X_j\) changes, the rest is constant → out. The stacked \(X_j^\top\) rows are \(X^\top\):</p>
\[\begin{aligned}\nabla\mathrm{BCE} &= \begin{bmatrix}\tfrac1n X_0^\top\big(\sigma(Xw) - y\big)\\ \vdots\\ \tfrac1n X_p^\top\big(\sigma(Xw) - y\big)\end{bmatrix}\\ &= \underbrace{\color{#e8912d}\tfrac1n}_{\textstyle\color{#e8912d}\text{constant}}\underbrace{\begin{bmatrix}X_0^\top\\ \vdots\\ X_p^\top\end{bmatrix}}_{\textstyle X^\top}\underbrace{\color{#e8912d}\big(\sigma(Xw) - y\big)}_{\textstyle\color{#e8912d}\text{constant}}\\ &= \tfrac1n X^\top\big(\sigma(Xw) - y\big)\end{aligned}\]
<div class="sizecheck"><span class="tag sizetag">Size check</span>\[\underbrace{X^\top}_{\textstyle (p+1)\times n}\,\underbrace{\big(\sigma(Xw) - y\big)}_{\textstyle n\times 1} = \underbrace{\nabla\mathrm{BCE}}_{\textstyle (p+1)\times 1}\]<p>inner n = n ✓ · one entry per weight ✓ · \(X(\sigma(Xw) - y)\) = \((n\times(p{+}1))(n\times 1)\): inner \(p{+}1 \ne n\) ✗</p></div>
<p><b>Gradient descent</b> (slide 'Gradient Descent for LoR'): start from a random \(w\), repeat until it stops changing:</p>
\[w \leftarrow w - \eta\,\tfrac1n X^\top\big(\sigma(Xw) - y\big)\]
<p>numpy: <code>w = w - eta * X.T @ (sigmoid(X @ w) - y) / n</code>.</p>` },
      try: { src: "Lecture ML05, slide 'Derivative of The Sigmoid'",
        q: R`<p>Show \(\sigma'(t) = \sigma(t)\big(1 - \sigma(t)\big)\), starting from \(\sigma(t) = (1 + e^{-t})^{-1}\).</p>`,
        a: R`<p>Chain rule: \((\dots)^{-1} \to -(\dots)^{-2}\) · (derivative of \(1 + e^{-t}\)) \(= -e^{-t}\):</p>
\[\begin{aligned}\sigma'(t) &= -(1 + e^{-t})^{-2}\cdot(-e^{-t})\\ &= \frac{1}{1 + e^{-t}}\cdot\frac{e^{-t}}{1 + e^{-t}}\\ &= \sigma(t)\big(1 - \sigma(t)\big)\end{aligned}\]
<p>Last step: \(\frac{e^{-t}}{1 + e^{-t}} = 1 - \frac{1}{1 + e^{-t}}\).</p>` },
      mistakes: R`<ul><li>\(X(\sigma(Xw) - y)\) doesn't fit, it's \(X^\top(\sigma(Xw) - y)\) (size check above).</li><li>Error = σ(score) − label, <b>not</b> score − label (that's LMS).</li></ul>`,
      where: ["2025-A Q4.5", "2026-B Q3.3", "2026-B Q3.4"] },

    // ───────────────────────── 7 · ML05 + HW3 ─────────────────────────
    { title: "Other S-curves (CLL, probit)",
      what: R`<p>σ is not the only S-curve. Swap in a curve γ, keep the rest: \(\hat y = \gamma(w^\top x)\), the same BCE, the same gradient steps. HW3 used CLL (complementary log-log): \(\hat y = 1 - e^{-e^{w^\top x}}\).</p>
<p><b>What changes:</b> γ and its derivative γ'. If γ(0) ≠ ½, "predict 1" is no longer score ≥ 0: solve γ(score) = ½. In the gradient, σ' = σ(1 − σ) canceled the whole denominator; another γ' usually doesn't, so each sample's factor stays a fraction.</p>
<p><b>What stays:</b> \(\frac1n\) out front, (each sample's factor) × \(x^{(i)}\), stacked into \(\frac1n X^\top\)(the list of factors).</p>`,
      formula: R`\[\frac{\partial\,\mathrm{BCE}}{\partial w_j} = \frac1n\sum_i\frac{\gamma'(\dots)\,\big(\gamma(\dots) - y_i\big)}{\gamma(\dots)\,\big(1 - \gamma(\dots)\big)}\,x^{(i)}_j\]<p>(…) = \(w^\top x^{(i)}\). With γ = σ it's the card before.</p>`,
      remember: R`<p>The chain-rule pieces for any curve: \(\log\gamma(\dots) \to \frac{\gamma'(\dots)}{\gamma(\dots)}\,x^{(i)}_j\) and \(\log(1 - \gamma(\dots)) \to -\frac{\gamma'(\dots)}{1 - \gamma(\dots)}\,x^{(i)}_j\). Not on the sheet: [sheet: BCE loss gradient] is σ's final answer only.</p><p><b>Probit:</b> \(\gamma = \Phi\), the \(\mathcal N(0,1)\) CDF (ML09). \(\Phi'\) = the \(\mathcal N(0,1)\) density, [sheet: Normal (Gaussian) probability density]. \(\Phi(0) = \tfrac12\) → predict 1 iff score ≥ 0.</p>`,
      example: { src: "HW3 Q1 and Q6", html: R`<p><b>Q1 — find γ.</b> CLL assumes \(\ln(-\ln(1 - \hat y)) = w^\top x\). Write \(s = \hat y\), \(t = w^\top x\) (HW3's letters) and solve for \(s\):</p>
\[\begin{aligned}\ln(-\ln(1 - s)) = t \;&\Rightarrow\; -\ln(1 - s) = e^t\\ &\Rightarrow\; 1 - s = e^{-e^t}\\ &\Rightarrow\; s = 1 - e^{-e^t} = \gamma(t)\end{aligned}\]
<p><b>Q6 — γ'.</b> Chain rule: \(\gamma'(t) = -e^{-e^t}\cdot(-e^t) = e^t\,e^{-e^t} = e^t\big(1 - \gamma(t)\big)\).</p>
<p><b>Derivative by one weight \(w_j\).</b> One sample's two log terms, grouped over one denominator:</p>
\[\begin{aligned}-\frac{y\,\gamma'}{\gamma} + \frac{(1-y)\,\gamma'}{1-\gamma} &= \gamma'\cdot\frac{\gamma - y}{\gamma(1-\gamma)}\\ &= \frac{e^t\,(\gamma - y)}{\gamma}\end{aligned}\]
<p>(the \(1 - \gamma\) in γ' cancels one factor; the γ below stays.) Times \(x^{(i)}_j\), averaged:</p>
\[\frac{\partial\,\mathrm{BCE}}{\partial w_j} = \frac1n\sum_i\frac{e^{t_i}\,\big(\gamma(t_i) - y_i\big)}{\gamma(t_i)}\,x^{(i)}_j\]
<p><b>All weights:</b> \(\frac1n\) is the constant, the fractions go in one list (entry \(i\) = sample \(i\)'s fraction), and stacking gives \(\nabla\mathrm{BCE} = \frac1n X^\top\)(that list). GD is the same loop as LoR with this gradient.</p>
<div class="sizecheck"><span class="tag sizetag">Size check</span>\[\underbrace{X^\top}_{\textstyle (p+1)\times n}\,\underbrace{(\text{list of fractions})}_{\textstyle n\times 1} = \underbrace{\nabla\mathrm{BCE}}_{\textstyle (p+1)\times 1}\]<p>inner n = n ✓ · one entry per weight ✓</p></div>` },
      try: { src: "HW3 Q3 and Q4",
        q: R`<p>Under CLL (\(\gamma(t) = 1 - e^{-e^t}\)): what is \(\hat y\) when \(w^\top x = 0\)? Which score \(w^\top x\) gives \(\hat y = \frac12\)?</p>`,
        a: R`<p>\(\gamma(0) = 1 - e^{-e^0} = 1 - \frac1e \approx 0.632\).</p>
\[\begin{aligned}1 - e^{-e^t} = \tfrac12 \;&\Rightarrow\; e^{-e^t} = \tfrac12\\ &\Rightarrow\; e^t = \ln 2\\ &\Rightarrow\; t = \ln(\ln 2) \approx -0.367\end{aligned}\]
<p>So CLL predicts 1 for scores ≥ −0.367, not ≥ 0.</p>` },
      mistakes: R`<ul><li>Copying σ's final gradient \((\gamma - y)x\): only σ cancels down to that.</li><li>Assuming "predict 1 iff score ≥ 0": that needs γ(0) = ½.</li></ul>`,
      where: ["2026-B Q3.1", "2026-B Q3.2", "2026-B Q3.3", "2026-B Q3.4"] },

    // ───────────────────────── 8 · ML05 ─────────────────────────
    { title: "Threshold, error types, ROC",
      what: R`<p>Every sample lands in one box: <b>TP</b> (positive, called positive), <b>TN</b>, <b>FP</b> (negative, called positive), <b>FN</b> (positive, called negative). Training aims at few FP + FN, but sometimes one kind is worse (a missed disease is an FN).</p>
<p>Trade them by moving the threshold: predict 1 when \(\hat y \ge \tau\) instead of ½. Higher τ → fewer positive calls → fewer FP, more FN. Same as sliding the line parallel (changing \(w_0\)).</p>
<p>Try every τ and plot TPR against FPR: the <b>ROC curve</b>. Precision against recall: the <b>PR curve</b>. The area under it (AUC): 1 = perfect, ½ = random.</p>`,
      formula: R`\[\begin{aligned}\text{TPR (recall)} &= \frac{TP}{TP + FN}\qquad \text{FPR} = \frac{FP}{FP + TN}\\ \text{precision} &= \frac{TP}{TP + FP}\end{aligned}\]`,
      remember: R`<p>Not on the sheet. TPR divides by all real positives, FPR by all real negatives, precision by everything <b>predicted</b> positive.</p>`,
      example: { src: "Lecture ML05, slides 'Tuning The Classification Threshold'", html: R`<p>1D data. The positives (y = 1) are mostly on the left, so σ falls from left to right, and the boundary (\(\hat y = 0.5\)) is at about \(x = 3\).</p>
<p><b>τ = 0.5:</b> left of the line is predicted 1. The figure shows two FP (negatives left of the line) and one FN (a positive far right). (The slide's text says "two FNs and one FP"; the figure has it the other way round.)</p>
<p><b>τ = 0.62:</b> fewer samples reach 0.62, so the boundary slides left. The FP just left of the old line becomes a TN, and the positive just left of it becomes an FN. Still 3 mistakes, a different mix.</p>` },
      try: { src: "Lecture ML05, slide 'Tuning The Classification Threshold'",
        q: R`<p>The slide says threshold 0.62 gives the same predictions as threshold ½ with a different \(w_0\). Why? What's the new line?</p>`,
        a: R`<p>σ only goes up, so \(\sigma(\text{score}) \ge 0.62\) exactly when the score ≥ the log-odds of 0.62:</p>
\[\log\frac{0.62}{0.38} \approx 0.49\]
<p>So predict 1 ⇔ \(w_0 + w^\top x - 0.49 \ge 0\): the same line with \(w_0 - 0.49\) instead of \(w_0\), i.e. a parallel line, with threshold ½.</p>` },
      mistakes: R`<ul><li>FPR divides by the real negatives (FP + TN), not by the predicted positives (that's precision).</li><li>Raising τ can only lower TPR and FPR (or keep them).</li></ul>`,
      where: ["2025-A Q4.4", "2025-B Q3.3", "2025-B Q3.4"] },

    // ───────────────────────── 9 · ML05 ─────────────────────────
    { title: "Multi-class: One-vs-All",
      what: R`<p>More than two classes (e.g. digits 0–9)? Train one LoR per class: model \(j\) answers "class \(j\) or not?" Its label 1 = class \(j\), label 0 = every other class. That's \(k\) separate binary models.</p>
<p>To predict, run all \(k\) on the sample and pick the class whose model gives the highest probability. Put the \(k\) weight vectors as the columns of a matrix \(W\): it's σ(\(W^\top x\)), then argmax. σ only goes up, so the argmax of the scores \(W^\top x\) gives the same class.</p>
<p>The \(k\) probabilities don't have to add up to 1: they come from \(k\) separate models.</p>`,
      formula: R`\[\hat y = \arg\max_j\ \big(W^\top x\big)_j,\quad W = \big[\,w^{(1)} \cdots w^{(k)}\,\big]\]`,
      example: { src: "Lecture ML05, slides 'Combining OvA Classifiers' and 'Classification of MNIST Data'", html: R`<p>MNIST: a 28 × 28 image = 784 pixels, plus \(x_0 = 1\) → \(x\) has 785 entries. 10 digits → 10 LoR models, so \(W\) is 785 × 10.</p>
<div class="sizecheck"><span class="tag sizetag">Size check</span>\[\underbrace{W^\top}_{\textstyle 10\times 785}\,\underbrace{x}_{\textstyle 785\times 1} = \underbrace{W^\top x}_{\textstyle 10\times 1}\]<p>inner 785 = 785 ✓ · one score per digit ✓ · \(Wx\) = (785×10)(785×1) ✗</p></div>
<p>Slide 'Classification of MNIST Data': model 3 scores one image \(w^{(3)\top}x = 8.45\) (σ ≈ 1.00: "a 3") and another −0.74 (σ ≈ 0.32: leaning "not a 3").</p>` },
      mistakes: R`<ul><li>Relabel per model: model \(j\) uses 1 for class \(j\) and 0 for all the others.</li><li>Expecting a sample's \(k\) probabilities to sum to 1.</li></ul>`,
      where: [] },

    // ───────────────────────── 10 · ML08a ─────────────────────────
    { title: "Separability and feature maps φ",
      what: R`<p><b>Linearly separable</b> = some line (plane) has all the + on one side and all the − on the other. The Perceptron needs it. Plenty of data doesn't have it (e.g. − in the middle, + on both sides).</p>
<p>Fix: make new features. Map each sample with φ (e.g. \(x \to (x, x^2)\)) and run any linear method (Perceptron, LoR, SVM) on the mapped data. A line in the new space is a curve in the original one. Pick φ from the shape you need: a circle needs \(x_1^2, x_2^2\); \(x_1x_2 = c\) needs \(x_1x_2\). Shape unknown? Take all monomials up to degree r (the full rational variety), and pick r by cross-validation.</p>`,
      formula: R`\[\hat y = \mathrm{sign}\Big(w_0 + \sum_j w_j\,\varphi_j(x)\Big)\]`,
      remember: R`<p>To show a φ works: write the class rule as an inequality, expand it, and read off \(w\) = the numbers in front of each feature. Not on the sheet.</p>`,
      example: { src: "Lecture ML08a, slide 'Linearly Inseparable Data – Example 1'", html: R`<p>1D data: − exactly when \(x \in [4, 8]\) (the slide's \(a = 6\), \(b = 2\)), + on both sides. No single cut point works.</p>
<p><b>Write the rule as an inequality and expand:</b></p>
\[\begin{aligned}y = - &\iff (x - 6)^2 \lt  2^2\\ &\iff 32 - 12x + x^2 \lt  0\end{aligned}\]
<p><b>Read off \(w\):</b> with \(\varphi(x) = (x, x^2)\) it's \(w_0 + w_1\varphi_1 + w_2\varphi_2 \lt  0\) with \(w = (32, -12, 1)\): a line in the \((x, x^2)\) plane.</p>
<p><b>Check:</b> \(x = 6\): \(32 - 72 + 36 = -4 \lt  0\) → − ✓. \(x = 9\): \(32 - 108 + 81 = 5 \gt  0\) → + ✓.</p>` },
      try: { src: "Lecture ML08a, slide 'Rational Varieties'",
        q: R`<p>Decision boundary \(x_2 = \frac{9}{x_1^2 - 9}\). Which φ makes it a line, and with which weights?</p>`,
        a: R`<p>Multiply out: \(x_2(x_1^2 - 9) = 9\) → \(9 + 9x_2 - x_1^2x_2 = 0\). So \(\varphi = (1, x_2, x_1^2x_2)\) and \(w = (9, 9, -1)\).</p>
<p>The slide's other two: \(x_1x_2 = 3\) → \(\varphi = (1, x_1x_2)\), \(w = (-3, 1)\). \(x_1^2 + x_2^2 = 1\) → \(\varphi = (1, x_1^2, x_2^2)\), \(w = (1, -1, -1)\).</p>` },
      mistakes: R`<ul><li>Wrong side: the − class must score &lt; 0. If your expansion gives the opposite, multiply all the weights by −1.</li><li>To show separability you need just <b>one</b> working \(w\): write it down and check it.</li></ul>`,
      where: ["2025-B Q3.2", "2025-B Q3.4", "2025-B Q3.5", "2025-C Q3.1", "2025-C Q3.5", "2026-A Q3.3"] },

    // ───────────────────────── 11 · ML08a + HW4 ─────────────────────────
    { title: "Kernels and the dual Perceptron",
      what: R`<p>Problem with φ: all monomials up to degree r is a huge list, so \(\varphi(u)^\top\varphi(v)\) is slow.</p>
<p><b>Dual Perceptron:</b> starting from \(w = 0\), \(w\) is always a sum of the samples it was nudged by: \(w = \sum_l \lambda_l y_l x^{(l)}\), with \(\lambda_l\) growing by 2η per mistake on sample \(l\). Keep the λ's instead of \(w\): predicting then needs only dot products between samples.</p>
<p><b>Kernel:</b> a function with \(K(u, v) = \varphi(u)^\top\varphi(v)\), computed straight from \(u, v\). \((1 + u^\top v)^2\) = the dot product of all monomials up to degree 2, in O(p) time. Swap every dot product for \(K\). RBF \(e^{-\gamma\|u - v\|^2}\) works too, no φ needed.</p>`,
      formula: R`\[\begin{aligned}\hat y_i &= \mathrm{sign}\Big(\sum_l \lambda_l\,y_l\,K(x^{(l)}, x^{(i)})\Big)\\ \text{mistake: }\ \lambda_i &\leftarrow \lambda_i + 2\eta\end{aligned}\]`,
      remember: R`\[K(u, v) = (c + u^\top v)^r\]<p>Polynomial kernel: all monomials up to degree r (c = 0: only degree exactly r). Not on the sheet.</p>`,
      example: { src: "Lecture ML08a, slide 'Kernel Function – Example' (for x in ℝ²)", html: R`<p>Expand the quadratic kernel:</p>
\[\begin{aligned}(1 + u^\top v)^2 &= (1 + u_1v_1 + u_2v_2)^2\\ &= 1 + u_1^2v_1^2 + u_2^2v_2^2\\ &\quad + 2u_1v_1 + 2u_2v_2 + 2u_1u_2v_1v_2\end{aligned}\]
<p>Write each term as (a piece of \(u\)) · (the same piece of \(v\)), e.g. \(2u_1v_1 = (\sqrt2u_1)(\sqrt2v_1)\). The list of pieces is φ:</p>
\[\varphi(u) = \big(1,\ \sqrt2u_1,\ \sqrt2u_2,\ u_1^2,\ u_2^2,\ \sqrt2u_1u_2\big)\]
<p>So one 2-number dot product, plus 1, squared, gives the 6-number dot product \(\varphi(u)^\top\varphi(v)\). (The slide uses the 9-entry list of all \(u_ju_l\), \(j, l = 0..2\), with repeats; same total.)</p>` },
      try: { src: "HW4 Q4 (first bullet)",
        q: R`<p>\(\varphi(x) = (1, x_1, x_2, x_1x_2, x_1^2, x_2^2)\) and the kernel's \(\varphi'(x) = (1, \sqrt2x_1, \sqrt2x_2, x_1^2, x_2^2, \sqrt2x_1x_2)\). Why is the data linearly separable after φ exactly when it is after φ'?</p>`,
        a: R`<p>Same six monomials; φ' only multiplies some of them by √2 (and reorders). A line for φ' with weights \(w\) is a line for φ with each weight times the same factor (1 or √2), and back by dividing. So a separating line in one space has a twin in the other, with the same score for every sample.</p>` },
      mistakes: R`<ul><li>A kernel doesn't change the method: the kernel Perceptron is the ordinary Perceptron on φ(x), so it converges iff the φ-mapped data is separable.</li><li>\((u^\top v)^2\) (c = 0) has only degree-2 terms: no \(1, x_1, x_2\).</li></ul>`,
      where: ["2025-B Q3.6", "2026-A Q3.1", "2026-A Q3.2", "2026-A Q3.4", "2026-A Q3.5"] },
  ];
})();
