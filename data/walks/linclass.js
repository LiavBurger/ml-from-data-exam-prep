// Walkthroughs for the Linear Classification questions — CASUAL style (spec/WALKS.md):
// the point first, then few moves, plain words, only the lines that earn the points.
// All numbers checked with numpy (Perceptron pass, Xw, ROC counts, score shifts, kernel identity, probit gradient
// against finite differences).
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ─────────────────────────────── 2025-A Q4 ───────────────────────────────
    "2025A-q4.1": {
      point: R`Go through the samples in order, always scoring with the newest \(w\). Only a wrong one changes \(w\): add \(0.2\cdot x\) if its label is +1, subtract \(0.2\cdot x\) if it is −1.`,
      start: R`<p>Sample \(i\) with the 1 in front: \(\;x^{(i)} = (1, \square, \square, \square)\)</p>
<p>Score: \(\;w^\top x^{(i)} = \square\)</p>
<p>Prediction: \(\;\hat y^{(i)} = \mathrm{sign}(\square) = \square\), compare with \(y^{(i)}\)</p>
<p>If wrong: \(\;\Delta w = -0.1\,(\hat y^{(i)} - y^{(i)})\,x^{(i)} = \square\), new \(w = \square\)</p>
<p>If right: "no update".</p>`,
      moves: [
        { line: R`<b>Add the 1</b> — a 1 in front of each sample, so the score \(w^\top x = w_0\cdot 1 + w_1x_1 + w_2x_2 + w_3x_3\) includes \(w_0\) (as in Regression, 2025-C Q1.1): <div class="formula">\[\begin{aligned}&x^{(1)} = (1, 1, 1, 0) &&x^{(2)} = (1, -1, 0, 2)\\ &x^{(3)} = (1, 2, 1, 1) &&x^{(4)} = (1, 0, -1, 1)\end{aligned}\]</div>Start: \(w = (-1, 0, 0, 0)\).`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 4}\,\underbrace{x^{(i)}}_{\textstyle 4\times 1} = \text{one number}\]<p>4 = the 1 + 3 features, in both \(w\) and \(x^{(i)}\) · inner 4 = 4 ✓ · result = one score per sample ✓</p>` },
        { line: R`<b>Sample 1</b> — score \((-1)\cdot 1 + 0 + 0 + 0 = -1\), sign \(-1 \ne 1 = y^{(1)}\): wrong, so update: <div class="formula">\[\begin{aligned}\Delta w &= -0.1\cdot(-1 - 1)\cdot(1, 1, 1, 0)\\ &= (0.2,\ 0.2,\ 0.2,\ 0)\\ w &= (-0.8,\ 0.2,\ 0.2,\ 0)\end{aligned}\]</div>`,
          remember: R`\[\hat y = \mathrm{sign}(w^\top x)\]<p>The Perceptron's prediction (with the 1 in front of \(x\), so \(w_0\) is in). Not on the sheet, and the question's reminder only says "compute \(\hat y^{(i)}\)". The update \(\Delta w\) is printed in the question.</p>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 4}\,\underbrace{x^{(1)}}_{\textstyle 4\times 1} = -1\]\[\underbrace{0.2}_{\textstyle \text{number}}\cdot\underbrace{x^{(1)}}_{\textstyle 4\times 1} = \underbrace{\Delta w}_{\textstyle 4\times 1}\]<p>score: inner 4 = 4 ✓ → one number · \(\Delta w\) is 4×1 like \(w\), so \(w + \Delta w\) adds entry by entry ✓</p>`,
          why: R`<p>\(\hat y - y = -1 - 1 = -2\), and \(-0.1\cdot(-2) = +0.2\). So \(\Delta w\) = 0.2 × the sample, and the new \(w\) is the old one plus it, entry by entry: \((-1 + 0.2,\ 0 + 0.2,\ 0 + 0.2,\ 0 + 0)\).</p>
<p>Shortcut: wrong on a \(y = +1\) sample → add \(0.2\cdot x\). Wrong on a \(y = -1\) sample → \(\hat y - y = 1 - (-1) = 2\), so subtract \(0.2\cdot x\).</p>` },
        { line: R`<b>Sample 2</b> — with the <b>new</b> \(w\): score \(-0.8 - 0.2 + 0 + 0 = -1\), sign \(-1 = y^{(2)}\): right, no update.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 4}\,\underbrace{x^{(2)}}_{\textstyle 4\times 1} = -1\]<p>inner 4 = 4 ✓ → one number (the new \(w\) is still 4 long) ✓</p>`,
          why: R`<p>\((-0.8)\cdot 1 + 0.2\cdot(-1) + 0.2\cdot 0 + 0\cdot 2 = -1\).</p>` },
        { line: R`<b>Sample 3</b> — score \(-0.8 + 0.4 + 0.2 + 0 = -0.2\), sign \(-1 \ne 1 = y^{(3)}\): wrong, so add \(0.2\cdot x^{(3)}\): <div class="formula">\[\begin{aligned}\Delta w &= -0.1\cdot(-1 - 1)\cdot(1, 2, 1, 1)\\ &= (0.2,\ 0.4,\ 0.2,\ 0.2)\\ w &= (-0.6,\ 0.6,\ 0.4,\ 0.2)\end{aligned}\]</div>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 4}\,\underbrace{x^{(3)}}_{\textstyle 4\times 1} = -0.2\]\[\underbrace{0.2}_{\textstyle \text{number}}\cdot\underbrace{x^{(3)}}_{\textstyle 4\times 1} = \underbrace{\Delta w}_{\textstyle 4\times 1}\]<p>score: inner 4 = 4 ✓ → one number · \(\Delta w\) is 4×1 like \(w\), so they add entry by entry ✓</p>`,
          why: R`<p>Score: \((-0.8)\cdot 1 + 0.2\cdot 2 + 0.2\cdot 1 + 0\cdot 1 = -0.2\). New \(w\): \((-0.8 + 0.2,\ 0.2 + 0.4,\ 0.2 + 0.2,\ 0 + 0.2)\).</p>` },
        { line: R`<b>Sample 4</b> — score \(-0.6 + 0 - 0.4 + 0.2 = -0.8\), sign \(-1 = y^{(4)}\): right, no update. After the pass: \(w = (-0.6,\ 0.6,\ 0.4,\ 0.2)\). Done.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 4}\,\underbrace{x^{(4)}}_{\textstyle 4\times 1} = -0.8\]<p>inner 4 = 4 ✓ → one number ✓</p>`,
          why: R`<p>\((-0.6)\cdot 1 + 0.6\cdot 0 + 0.4\cdot(-1) + 0.2\cdot 1 = -0.8\).</p>`,
          extra: [{ label: "the official text has three wrong labels", html: R`<p>Its numbers and updates are right, but: at \(i = 2\) it writes \(\mathrm{sign}(w^\top x^{(3)})\) for \(x^{(2)}\); at \(i = 3\) "\(-1 = 1 = y^{(4)}\)" should be "\(-1 \ne 1 = y^{(3)}\)"; at \(i = 4\) "\(-1 \ne 1 = y^{(1)}\)" should be "\(-1 = -1 = y^{(4)}\)".</p>` }] },
      ],
      compare: R`Moves 2–5 are the official \(i = 1, \dots, 4\), same numbers. Its text has three label slips (see the last move's extra); the updates are right.`,
    },

    "2025A-q4.2": {
      point: R`"After" means the final \(w = (-0.6, 0.6, 0.4, 0.2)\) from part 1, not the scores from during the pass. Score every sample with it and take the sign.`,
      start: R`<p>For each sample: \(\;w^\top x^{(i)} = \square\), so \(\;\hat y^{(i)} = \mathrm{sign}(\square) = \square\)</p>`,
      moves: [
        { line: R`<b>Scores with the final \(w = (-0.6, 0.6, 0.4, 0.2)\)</b> — each sample (with its 1) · \(w\): <div class="formula">\[Xw = (0.4,\ -0.8,\ 1.2,\ -0.8)\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 4}\,\underbrace{w}_{\textstyle 4\times 1} = \underbrace{Xw}_{\textstyle 4\times 1}\]<p>4 samples × (1 + 3 features) · inner 4 = 4 ✓ · result 4×1 = one score per sample ✓</p><p>Row \(i\) of \(X\) is \(x^{(i)\top}\) (1×4), so \(X\) computes \(x^{(i)\top}w\) where part 1 wrote \(w^\top x^{(i)}\): (1×4)(4×1) = one number either way — a dot product doesn't care about order.</p><p>Careful: \(X\) is square here (4 samples, 4 knobs), so the sizes can't catch a rows/columns swap. Rows = samples.</p>`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>· \(w = (-0.6, 0.6, 0.4, 0.2)\)</th><th>score</th></tr></thead><tbody>
<tr><td>(1, 1, 1, 0)</td><td>−0.6 + 0.6 + 0.4 + 0</td><td>0.4</td></tr>
<tr><td>(1, −1, 0, 2)</td><td>−0.6 − 0.6 + 0 + 0.4</td><td>−0.8</td></tr>
<tr><td>(1, 2, 1, 1)</td><td>−0.6 + 1.2 + 0.4 + 0.2</td><td>1.2</td></tr>
<tr><td>(1, 0, −1, 1)</td><td>−0.6 + 0 − 0.4 + 0.2</td><td>−0.8</td></tr></tbody></table></div>
<p>numpy: <code>X @ w</code>. Sample 1 scored −1 during the pass (older \(w\)); with the final \(w\) it's 0.4.</p>` },
        { line: R`<b>Signs</b> — \(\hat y = (1, -1, 1, -1)\). Done (all four match the true labels).`,
          remember: R`\[\hat y = \mathrm{sign}(w^\top x)\]<p>The Perceptron's prediction. Not on the sheet.</p>` },
      ],
      compare: R`Same four scores and signs as the official solution.`,
    },

    "2025A-q4.3": {
      point: R`LoR's loss multiplies by \(y\) and \(1 - y\), so the labels must be 0 and 1. Which colour gets the 1 doesn't matter.`,
      moves: [
        { line: R`<b>Labels must be 0 / 1</b> — the BCE loss multiplies by \(y\) and \(1 - y\) [sheet: Binary cross-entropy (BCE) loss]. So (a), −1 / 1, is out.`,
          why: R`<p>One sample's loss is \(-[\,y\log\hat y + (1-y)\log(1-\hat y)\,]\). \(y = 1\) keeps only \(-\log\hat y\); \(y = 0\) keeps only \(-\log(1-\hat y)\). With \(y = -1\) they become −1 and 2, and the formula no longer means anything.</p>` },
        { line: R`<b>Either colour can be the 1</b> — the model then gives the probability of that colour. So (b) and (c) both work: answer <b>(d)</b>. Done.` },
      ],
      compare: R`The official answer is option d.`,
    },

    "2025A-q4.4": {
      point: R`Each threshold is one point: TPR = the fraction of the reds (positives) with \(p \ge \tau\), FPR = the fraction of the blues with \(p \ge \tau\). There are 5 of each, so it's counting and dividing by 5.`,
      start: R`<p>Positive = \(\square\). Predicted positive iff \(P(\text{red} \mid x^{(i)}) \ge \tau\).</p>
<p>Per threshold: TP = □, FP = □, TPR = TP / □, FPR = FP / □</p>
<p>Table: \(\tau\) | predicted positive | TP | FP | TN | FN | TPR | FPR</p>
<p>Plot: FPR on the x-axis, TPR on the y-axis.</p>`,
      moves: [
        { line: R`<b>Red = positive; split the probabilities by true colour</b> — then TP = reds with \(p \ge \tau\), FP = blues with \(p \ge \tau\): <div class="formula">\[\begin{aligned}\text{reds: }&0.4,\ 0.45,\ 0.55,\ 0.75,\ 0.9\\ \text{blues: }&0.15,\ 0.25,\ 0.35,\ 0.65,\ 0.85\end{aligned}\]</div>`,
          why: R`<p>The model gives \(P(\text{red})\), so red is the positive class. TP + FN = every red (caught or missed) = 5, and FP + TN = every blue = 5, at every threshold. So TPR = TP / 5 and FPR = FP / 5.</p>` },
        { line: R`<b>Count for each \(\tau\)</b>, divide by 5: <div class="formula">\[\begin{array}{c|ccccc}\tau & 0.1&0.2&0.3&0.4&0.5\\ \hline \text{TP} & 5&5&5&5&3\\ \text{FP} & 5&4&3&2&2\\ \hline \text{TPR} & 1&1&1&1&0.6\\ \text{FPR} & 1&0.8&0.6&0.4&0.4\end{array}\]</div><div class="formula">\[\begin{array}{c|ccccc}\tau & 0.6&0.7&0.8&0.9&1\\ \hline \text{TP} & 2&2&1&1&0\\ \text{FP} & 2&1&1&0&0\\ \hline \text{TPR} & 0.4&0.4&0.2&0.2&0\\ \text{FPR} & 0.4&0.2&0.2&0&0\end{array}\]</div>`,
          why: R`<p><b>One in full, \(\tau = 0.5\):</b> reds \(\ge 0.5\): 0.55, 0.75, 0.9 → TP = 3, FN = 2. Blues \(\ge 0.5\): 0.65, 0.85 → FP = 2, TN = 3. TPR = 3/5 = 0.6, FPR = 2/5 = 0.4.</p>
<p>The full table to write (the question wants the computations):</p>
<div class="tw"><table><thead><tr><th>\(\tau\)</th><th>predicted positive</th><th>TP</th><th>FP</th><th>TN</th><th>FN</th></tr></thead><tbody>
<tr><td>0.1</td><td>all ten</td><td>5</td><td>5</td><td>0</td><td>0</td></tr>
<tr><td>0.2</td><td>all but \(x^{(1)}\)</td><td>5</td><td>4</td><td>1</td><td>0</td></tr>
<tr><td>0.3</td><td>\(x^{(3)}, \dots, x^{(10)}\)</td><td>5</td><td>3</td><td>2</td><td>0</td></tr>
<tr><td>0.4</td><td>\(x^{(4)}, \dots, x^{(10)}\)</td><td>5</td><td>2</td><td>3</td><td>0</td></tr>
<tr><td>0.5</td><td>\(x^{(4)}, x^{(5)}, x^{(7)}, x^{(8)}, x^{(10)}\)</td><td>3</td><td>2</td><td>3</td><td>2</td></tr>
<tr><td>0.6</td><td>\(x^{(4)}, x^{(5)}, x^{(8)}, x^{(10)}\)</td><td>2</td><td>2</td><td>3</td><td>3</td></tr>
<tr><td>0.7</td><td>\(x^{(5)}, x^{(8)}, x^{(10)}\)</td><td>2</td><td>1</td><td>4</td><td>3</td></tr>
<tr><td>0.8</td><td>\(x^{(5)}, x^{(10)}\)</td><td>1</td><td>1</td><td>4</td><td>4</td></tr>
<tr><td>0.9</td><td>\(x^{(10)}\)</td><td>1</td><td>0</td><td>5</td><td>4</td></tr>
<tr><td>1</td><td>none</td><td>0</td><td>0</td><td>5</td><td>5</td></tr></tbody></table></div>`,
          extra: [{ label: "the official \"predicted positive\" column has four slips", html: R`<p>Its counts and rates are right, but the lists are off at 0.2 (leaves out \(x^{(2)}\), 0.25), 0.3 (leaves out \(x^{(3)}\), 0.35), 0.4 (leaves out \(x^{(6)}\), 0.45) and 0.8 (lists \(x^{(8)}\), 0.75, instead of \(x^{(5)}\), 0.85). It also accepts "&gt;" instead of "≥", or blue as positive.</p>` }] },
        { line: R`<b>Draw it</b> — one point (FPR, TPR) per \(\tau\), joined in order: <div><svg viewBox="0 0 240 230" width="250" style="max-width:100%;height:auto" role="img" aria-label="ROC curve">
<g fill="none" style="stroke:var(--line)" stroke-width="1"><line x1="76" y1="190" x2="76" y2="10"/><line x1="112" y1="190" x2="112" y2="10"/><line x1="148" y1="190" x2="148" y2="10"/><line x1="184" y1="190" x2="184" y2="10"/><line x1="220" y1="190" x2="220" y2="10"/><line x1="40" y1="154" x2="220" y2="154"/><line x1="40" y1="118" x2="220" y2="118"/><line x1="40" y1="82" x2="220" y2="82"/><line x1="40" y1="46" x2="220" y2="46"/><line x1="40" y1="10" x2="220" y2="10"/></g>
<g fill="none" style="stroke:var(--muted)" stroke-width="1"><line x1="40" y1="190" x2="220" y2="190"/><line x1="40" y1="190" x2="40" y2="10"/></g>
<polyline fill="none" style="stroke:var(--accent)" stroke-width="2.5" points="220,10 184,10 148,10 112,10 112,82 112,118 76,118 76,154 40,154 40,190"/>
<g style="fill:var(--accent)"><circle cx="220" cy="10" r="3.5"/><circle cx="184" cy="10" r="3.5"/><circle cx="148" cy="10" r="3.5"/><circle cx="112" cy="10" r="3.5"/><circle cx="112" cy="82" r="3.5"/><circle cx="112" cy="118" r="3.5"/><circle cx="76" cy="118" r="3.5"/><circle cx="76" cy="154" r="3.5"/><circle cx="40" cy="154" r="3.5"/><circle cx="40" cy="190" r="3.5"/></g>
<g fill="currentColor" font-size="11"><text x="130" y="222" text-anchor="middle">FPR</text><text x="12" y="100" text-anchor="middle" transform="rotate(-90 12 100)">TPR</text><text x="36" y="203" text-anchor="end">0</text><text x="112" y="203" text-anchor="middle">0.4</text><text x="220" y="203" text-anchor="middle">1</text><text x="34" y="122" text-anchor="end">0.4</text><text x="34" y="14" text-anchor="end">1</text></g>
</svg></div>Done.`,
          why: R`<p>The points, from \(\tau = 0.1\) to \(1\): (1, 1), (0.8, 1), (0.6, 1), (0.4, 1), (0.4, 0.6), (0.4, 0.4), (0.2, 0.4), (0.2, 0.2), (0, 0.2), (0, 0). Grid lines are every 0.2.</p>` },
      ],
      compare: R`Same TP / FP / TN / FN / TPR / FPR as the official table. Its "predicted positive" lists have four slips (0.2, 0.3, 0.4, 0.8 — see move 2's extra).`,
    },

    "2025A-q4.5": {
      point: R`Every blank is named by the lines around it: the library called np, \(\sigma\) from the formula sheet, the scores that line 15 feeds into <code>sigmoid</code>, and the step that uses line 16's <code>grad</code>.`,
      moves: [
        { line: R`<b>(1) and (2)</b> — the library imported as np is <code>numpy</code>. \(\sigma(z) = \frac{1}{1 + e^{-z}}\) in numpy: <code>1 / (1 + np.exp(-z))</code>.`,
          why: R`<p>You don't need to know \(\sigma\) by heart: [sheet: Sigmoid function].</p>` },
        { line: R`<b>(3) The scores</b> — line 15 puts <code>z</code> into sigmoid, so <code>z</code> = every sample's score \(w^\top x^{(i)}\): <code>X_with_bias @ w</code>.`,
          size: R`<p><code>X_with_bias.shape</code> = (n, d + 1): one row per sample, the 1 + d features (part 1's table: (4, 4)). <code>w.shape</code> = (d + 1,) (line 11).</p>\[\underbrace{\texttt{X\_with\_bias}}_{\textstyle n\times(d+1)}\,\underbrace{w}_{\textstyle (d+1)\times 1} = \underbrace{z}_{\textstyle n\times 1}\]<p>inner d + 1 = d + 1 ✓ · one score per sample ✓ · <code>sigmoid</code> works entry by entry, so <code>y_hat</code> is (n,) like <code>y</code> ✓ (line 16 subtracts them)</p>`,
          why: R`<p>Row \(i\) of <code>X_with_bias</code> is \((1, x^{(i)}_1, \dots)\); times \(w\) that's \(w_0 + w_1x^{(i)}_1 + \dots\) = sample \(i\)'s score. So <code>X_with_bias @ w</code> = one score per row (as in Regression, 2025-C Q1.3, move 2). It's <code>X_with_bias</code> because \(w\) includes \(w_0\) (line 11 makes \(w\) as long as a row of <code>X_with_bias</code>).</p>` },
        { line: R`<b>(4) One step downhill</b> — current \(w\) minus step size × gradient: <code>w - eta * grad</code>. Done.`,
          remember: R`\[w \leftarrow w - \eta\,\nabla L(w)\]<p>One gradient-descent step. Not on the sheet. Here \(\eta\) is <code>eta</code>, \(\nabla L\) is <code>grad</code>.</p>`,
          size: R`\[\underbrace{\texttt{X\_with\_bias.T}}_{\textstyle (d+1)\times n}\,\underbrace{(\hat y - y)}_{\textstyle n\times 1} = \underbrace{\texttt{grad}}_{\textstyle (d+1)\times 1}\]\[\underbrace{w}_{\textstyle (d+1)\times 1} - \eta\cdot\underbrace{\texttt{grad}}_{\textstyle (d+1)\times 1}\]<p>Line 16: inner n = n ✓ · <code>grad</code> has one entry per knob, like <code>w</code>, so the step subtracts entry by entry ✓</p>`,
          why: R`<p>The gradient points uphill (where the loss grows), so minus a small step of it (<code>eta</code> × <code>grad</code>) lowers the loss (same step as \(\theta - 0.1\cdot\nabla J\) in Regression, 2025-C Q1.3). Line 16's <code>grad</code> is [sheet: BCE loss gradient] without the \(\frac1n\), which only rescales the step.</p>` },
      ],
      compare: R`Same four blanks as the official solution.`,
    },

    // ─────────────────────────────── 2025-B Q3 ───────────────────────────────
    "2025B-q3.1": {
      point: R`The table gives scores \(w^\top x\), not probabilities. \(\sigma(\text{score}) \ge \tfrac12\) exactly when the score \(\ge 0\), so the label is just the sign of the score.`,
      moves: [
        { line: R`<b>Predict 1 when \(\sigma \ge \tfrac12\)</b> — \(\sigma(0) = \tfrac12\) and \(\sigma\) only goes up, so \(\sigma(w^\top x) \ge \tfrac12\) exactly when \(w^\top x \ge 0\).`,
          remember: R`\[\text{predict } 1 \iff P(Y = 1 \mid x) = \sigma(w^\top x) \ge \tfrac12\]<p>The ½ cut is from class. Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability.</p>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times(p+1)}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1} = \text{one number}\]<p>\(w \in \mathbb R^{p+1}\), and \(x^{(i)}\) has its \(x_0 = 1\) too · inner p + 1 = p + 1 ✓ · one score per sample: the table's column, 6 scores for 6 samples ✓</p>`,
          why: R`<p>\(\sigma(0) = \frac{1}{1 + e^0} = \frac12\) [sheet: Sigmoid function]. Bigger score → smaller \(e^{-t}\) → bigger \(\sigma\). So "above ½" = "score above 0". The grader gave 0 points for comparing the scores themselves with ½.</p>` },
        { line: R`<b>Read the signs</b> — 1.4, 0.8, 0.4 are positive: samples 1, 3, 5 → "1". −0.8, −1.6, −0.4 are negative: samples 2, 4, 6 → "0". Done.` },
      ],
      compare: R`Same as the official answer. It writes "samples 2, 4, 6–8 are 0", but 7–8 only appear in part 3: for this part it's 2, 4, 6.`,
    },

    "2025B-q3.2": {
      point: R`Separable means <b>some</b> line gets every sample right. The given \(w\) already does (part 1), so we have one.`,
      moves: [
        { line: R`<b>The given \(w\) gets all six right</b> — score \(\ge 0\) → "1" (part 1): the scores 1.4, −0.8, 0.8, −1.6, 0.4, −0.4 give 1, 0, 1, 0, 1, 0; the true labels are 1, 0, 1, 0, 1, 0.`,
          remember: R`\[\hat y = 1 \iff \sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\]<p>So LoR's decision boundary is the hyperplane \(w^\top x = 0\). Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability.</p>` },
        { line: R`<b>So its line separates them</b> — the hyperplane \(w^\top x = 0\) has every "1" on the + side and every "0" on the − side: <b>necessarily separable</b>. Done.` },
      ],
      compare: R`Same as the official answer: \(\{x : w^\top x = 0\}\) is a separating hyperplane.`,
    },

    "2025B-q3.3": {
      point: R`TPR = 1 and FPR = 0 just means zero mistakes. Changing \(w_0\) moves every score by the same amount, so if every positive scores above every negative, a shift of \(w_0\) fixes the one mistake.`,
      moves: [
        { line: R`<b>The one mistake</b> — sample 8 is a "0" with score \(0.2 > 0\): a false positive. Everything else is right.`,
          remember: R`\[\hat y = 1 \iff \sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\]<p>LoR's cut. Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability.</p>`,
          why: R`<p>TPR = TP / (TP + FN) is 1 only if FN = 0. FPR = FP / (FP + TN) is 0 only if FP = 0. So we need no missed "1" and no flagged "0".</p>` },
        { line: R`<b>Lowest "1" vs highest "0"</b> — the "1"s score 1.4, 0.8, 0.4, 1.1 (lowest <b>0.4</b>); the "0"s score −0.8, −1.6, −0.4, 0.2 (highest <b>0.2</b>). \(0.4 > 0.2\), so a cut at 0.3 splits them.` },
        { line: R`<b>Shift \(w_0\)</b> — \(w_0' = w_0 - 0.3\), other weights the same: every score drops by 0.3. <div class="formula">\[\begin{aligned}\text{"1"s: }&1.1,\ 0.5,\ 0.1,\ 0.8 \;\gt 0\\ \text{"0"s: }&-1.1,\ -1.9,\ -0.7,\ -0.1 \;\lt 0\end{aligned}\]</div>So TPR = 4/4 = 1, FPR = 0/4 = 0: <b>yes</b>. Done.`,
          size: R`\[\underbrace{w'^\top}_{\textstyle 1\times(p+1)}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1} = w^\top x^{(i)} - 0.3\cdot\underbrace{x^{(i)}_0}_{\textstyle =1}\]<p>\(w'\) is \(w\) with only entry 0 changed, same size ✓ · still one score per sample, now 0.3 lower ✓</p>`,
          why: R`<p>\(w_0\) is multiplied by the 1 in every sample, so \(w_0 - 0.3\) takes 0.3 off every score. The grader wants the new classifier named (\(w_0' = w_0 - 0.3\)), not just "yes".</p>` },
      ],
      compare: R`Same classifier as the official answer: \(w_0' = w_0 - 0.3\), \(w_j' = w_j\).`,
    },

    "2025B-q3.4": {
      point: R`Sample 9 (a "0") scores above sample 5 (a "1"), so no shift of this \(w\) can separate them. But we only see this one \(w\)'s scores, not the features, so a line in another direction might still work. We can't tell.`,
      moves: [
        { line: R`<b>This \(w\) and its shifts fail</b> — sample 9 (a "0") scores 0.5, above the lowest "1" (sample 5, 0.4). Any cut below 0.4 keeps sample 9 on the "1" side.` },
        { line: R`<b>Other lines — we can't check</b> — we only have this \(w\)'s scores, not the samples' features. So: <b>insufficient information</b>. Done.`,
          why: R`<p>"Necessarily inseparable" is a claim about every line. One failing \(w\) (and its shifts) doesn't prove it — the grader gave only partial credit (≈ 3/5) for "inseparable".</p>` },
      ],
      compare: R`Same as the official answer: not separable by the given classifier or by adjusting \(w_0\), but another linear classifier may separate the data.`,
    },

    "2025B-q3.5": {
      point: R`The negatives sit inside a circle around the origin, the positives outside. "Outside" is \(x_1^2 + x_2^2 > r^2\), so make \(x_1^2 + x_2^2\) a feature: \(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2)\). The graded thing is this explicit \(\varphi\).`,
      start: R`<p>Positive \(\iff\;\square > 0\)</p>
<p>\(\varphi(x_1, x_2) = \square, \qquad w = \square\)</p>`,
      moves: [
        { line: R`<b>The boundary is a circle</b> — negatives reach about 0.5 from the origin, the closest positive is the lone one at about \((0, 0.8)\). Take \(r^2 = 0.4\) (\(r \approx 0.63\), in between): <div class="formula">\[\text{positive} \iff -0.4 + (x_1^2 + x_2^2) > 0\]</div>`,
          why: R`<p>A circle around the origin is \(x_1^2 + x_2^2 = r^2\); outside it, \(x_1^2 + x_2^2 > r^2\). Move \(r^2\) to the left side. Any \(r\) between 0.5 and 0.8 works.</p>` },
        { line: R`<b>Select the pieces</b> — numbers = \(w\), the things they multiply = \(\varphi\): <div class="formula">\[\underbrace{\color{#e8912d}-0.4}_{\textstyle\color{#e8912d}w_0}\cdot\underbrace{\color{#4c8dff}1}_{\textstyle\color{#4c8dff}\varphi_0} + \underbrace{\color{#e8912d}1}_{\textstyle\color{#e8912d}w_1}\cdot\underbrace{\color{#4c8dff}(x_1^2 + x_2^2)}_{\textstyle\color{#4c8dff}\varphi_1} > 0\]</div>So \(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2)\), \(w = (-0.4,\ 1)\). Done.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{\varphi(x)}_{\textstyle 2\times 1} = -0.4\cdot 1 + 1\cdot(x_1^2 + x_2^2)\]<p>\(w = (-0.4, 1)\), \(\varphi(x) = (1, x_1^2 + x_2^2)\): 2 entries each · inner 2 = 2 ✓ · one number per sample, compared with 0 ✓</p>`,
          why: R`<p>"number · thing + number · thing \(> 0\)" is exactly a linear classifier \(w^\top\varphi(x) > 0\). The grader needs the explicit \(\varphi\). The full quadratic mapping \((1, x_1, x_2, x_1^2, x_2^2, x_1x_2)\) also works (the official answer mentions it).</p>`,
          extra: [{ label: "check it with numbers", html: R`<div class="tw"><table><thead><tr><th>point (from the figure)</th><th>\(-0.4 + x_1^2 + x_2^2\)</th><th>side</th></tr></thead><tbody>
<tr><td>farthest negative, \(r \approx 0.5\)</td><td>−0.4 + 0.25 = −0.15</td><td>−  ✓</td></tr>
<tr><td>closest positive, \((0, 0.8)\)</td><td>−0.4 + 0.64 = 0.24</td><td>+  ✓</td></tr></tbody></table></div>` }] },
      ],
      compare: R`Same \(\varphi = (1, x_1^2 + x_2^2)\) as the official answer. It uses \(r \approx \tfrac12\); that is right at the edge of the negatives (they reach ≈ 0.5), so \(r^2 = 0.4\) (\(r \approx 0.63\)) is safer. Only \(\varphi\) is graded, so either \(r\) is fine. It also writes \(\varphi(x_1, x_1)\) for \(\varphi(x_1, x_2)\).`,
    },

    "2025B-q3.6": {
      point: R`A kernel is just the dot product of mapped features, \(K(u, v) = \varphi(u)^\top\varphi(v)\). Pick the quadratic one: its features include \(x_1^2\) and \(x_2^2\), so the circle "\(x_1^2 + x_2^2 > 0.4\) → positive" is a line there: the data is separable (part 5), and the Perceptron always converges on separable data.`,
      start: R`<p>\(K(u, v) = \square\)</p>
<p>It equals \(\varphi(u)^\top\varphi(v)\) for \(\;\varphi(x) = \square\)</p>
<p>In that space the data is □ (part 5), so the dual Perceptron □</p>`,
      moves: [
        { line: R`<b>The kernel</b> — the quadratic kernel: <div class="formula">\[K(u, v) = (1 + u^\top v)^2\]</div>`,
          size: R`\[\underbrace{u^\top}_{\textstyle 1\times 2}\,\underbrace{v}_{\textstyle 2\times 1} = \text{one number}\]<p>\(u, v\) = two samples, 2 features each · inner 2 = 2 ✓ · so \(1 + u^\top v\) and its square are plain numbers: one \(K\) per pair of samples ✓</p>`,
          remember: R`\[K(u, v) = (1 + u^\top v)^2\]<p>The quadratic kernel from class; every kernel is \(K(u, v) = \varphi(u)^\top\varphi(v)\) for some \(\varphi\). Not on the sheet (neither is the dual Perceptron).</p>`,
          why: R`<p>The dual Perceptron only uses dot products between samples; replacing each by \(K\) = running the Perceptron on \(\varphi(x)\) without building \(\varphi\).</p>` },
        { line: R`<b>It's a dot product of quadratic features</b> — expand both sides, they match term by term: <div class="formula">\[\begin{aligned}(1 + u_1v_1 + u_2v_2)^2 = \;&1 + 2u_1v_1 + 2u_2v_2\\ &+ u_1^2v_1^2 + u_2^2v_2^2 + 2u_1u_2v_1v_2\end{aligned}\]</div><div class="formula">\[\varphi(x) = (1,\ \sqrt2x_1,\ \sqrt2x_2,\ x_1^2,\ x_2^2,\ \sqrt2x_1x_2)\]</div>`,
          size: R`\[\underbrace{\varphi(u)^\top}_{\textstyle 1\times 6}\,\underbrace{\varphi(v)}_{\textstyle 6\times 1} = (1 + u^\top v)^2\]<p>\(\varphi\) turns 2 features into 6 · inner 6 = 6 ✓ · one number, like the kernel ✓</p>`,
          why: R`<p>\(\varphi(u)^\top\varphi(v)\), entry by entry: \(1\cdot 1\), \(\sqrt2u_1\cdot\sqrt2v_1 = 2u_1v_1\), \(\sqrt2u_2\cdot\sqrt2v_2 = 2u_2v_2\), \(u_1^2v_1^2\), \(u_2^2v_2^2\), \(\sqrt2u_1u_2\cdot\sqrt2v_1v_2 = 2u_1u_2v_1v_2\). The \(\sqrt2\)'s are only there to make the 2's.</p>`,
          extra: [{ label: "check it with numbers (two points from the figure)", html: R`<p>\(u = (0, 0.8)\), \(v = (0.2, 0.3)\). Kernel: \(u^\top v = 0 + 0.24\), so \(K = 1.24^2 = 1.5376\).</p>
<p>Expanded: \(1 + 0 + 2\cdot 0.24 + 0 + 0.64\cdot 0.09 + 0 = 1 + 0.48 + 0.0576 = 1.5376\). ✓</p>` }] },
        { line: R`<b>Separable there, so it converges</b> — this \(\varphi\) contains \(1, x_1^2, x_2^2\), so the circle rule \(-0.4 + x_1^2 + x_2^2 > 0\) (part 5) is a line in it: \(w = (-0.4, 0, 0, 1, 1, 0)\). The Perceptron converges on separable data. Done.`,
          remember: R`<p><b>The Perceptron converges (with a small enough learning rate) iff the data is linearly separable</b> — here: separable after \(\varphi\).</p><p>Not on the sheet.</p>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 6}\,\underbrace{\varphi(x)}_{\textstyle 6\times 1} = -0.4 + x_1^2 + x_2^2\]<p>\(w\) needs one entry per entry of \(\varphi\): 6 here, not part 5's 2 · inner 6 = 6 ✓ · one number per sample ✓</p>`,
          why: R`<p>\(w^\top\varphi(x) = -0.4 + x_1^2 + x_2^2\): exactly part 5's rule. The grader: no full proof needed — the kernel plus "it's the dot product of the quadratic features" is enough.</p>` },
      ],
      compare: R`Same kernel, expansion and argument as the official answer.`,
    },

    // ─────────────────────────────── 2026-B Q3 ───────────────────────────────
    "2026B-q3.1": {
      point: R`\(\Phi(0) = \tfrac12\) and \(\Phi\) only goes up, so \(\Phi(w^\top x) \ge \tfrac12\) exactly when \(w^\top x \ge 0\). The sign of the score is the whole answer — no integral.`,
      moves: [
        { line: R`<b>Scores with the bias</b> — \(w = (w_0, w_1, w_2) = (1, -1, 2)\): <div class="formula">\[\begin{aligned}\text{sample 1: }&1 - 1\cdot 2 + 2\cdot 0 = -1\\ \text{sample 2: }&1 - 1\cdot 0 + 2\cdot 1 = 3\end{aligned}\]</div>`,
          size: R`\[\underbrace{\begin{bmatrix}1&2&0\\1&0&1\end{bmatrix}}_{\textstyle 2\times 3}\underbrace{\begin{bmatrix}1\\-1\\2\end{bmatrix}}_{\textstyle 3\times 1} = \underbrace{\begin{bmatrix}-1\\3\end{bmatrix}}_{\textstyle 2\times 1}\]<p>2 samples × (1 + 2 features) · inner 3 = 3 ✓ · one score per sample ✓ · one row alone: \(w^\top x^{(i)}\) = (1×3)(3×1) = one number</p>` },
        { line: R`<b>The sign decides</b> — \(\Phi\) is increasing with \(\Phi(0) = \tfrac12\), like \(\sigma\) in 2025-B Q3.1. So \(-1 \lt 0\): sample 1 <b>negative</b>; \(3 > 0\): sample 2 <b>positive</b>. Done.`,
          remember: R`\[\text{positive} \iff \hat y_w(x) \ge \tfrac12\]<p>The ½ cut from class (in LoR: \(\sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\)). Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability. Here \(\Phi\) plays \(\sigma\)'s role.</p>`,
          why: R`<p>\(\Phi(t)\) = area under the bell left of \(t\). The bell is symmetric, so half the area is left of 0: \(\Phi(0) = \tfrac12\). Moving \(t\) right adds area, so \(\Phi\) goes up.</p>`,
          extra: [{ label: "your Moed B", html: R`<p>You had −1 and 3 right, then tried to integrate \(\Phi(-1)\) by hand and crossed it all out (0/4). The sign plus the sentence above was all four points.</p>` }] },
      ],
      compare: R`Same as the official solution: classification by \(\mathrm{sign}(w^\top x)\), scores −1 and 3.`,
    },

    "2026B-q3.2": {
      point: R`The loss is printed in the question. The only new thing is what \(\hat y\) is: here \(\hat y_w(x^{(i)}) = \Phi(t_i)\), so substitute it.`,
      start: R`<p>With \(t_i = w^\top x^{(i)}\): \(\;\hat y_w(x^{(i)}) = \square\)</p>
\[L(w) = -\frac1n\sum_{i=1}^n\Big[\;\square\;\Big]\]`,
      moves: [
        { line: R`<b>What \(\hat y\) is here</b> — the model: \(\hat y_w(x^{(i)}) = \Phi(w^\top x^{(i)}) = \Phi(t_i)\).`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times(p+1)}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1} = \underbrace{t_i}_{\textstyle \text{number}}\]<p>\(w_0, \dots, w_p\) and \(x^{(i)}\) with its \(x_0 = 1\) · inner p + 1 = p + 1 ✓ · so \(\Phi(t_i)\) is one number per sample, and so is each log in \(L\) ✓</p>` },
        { line: R`<b>Put it in</b> — copy the printed BCE (the sheet's, with \(\Phi\) for \(\sigma\): [sheet: Binary cross-entropy (BCE) loss]) and replace every \(\hat y_w(x^{(i)})\) by \(\Phi(t_i)\): <div class="formula">\[\begin{aligned}L(w) = -\frac1n\sum_{i=1}^n\Big[\,&y_i\log\Phi(t_i)\\ &+ (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\end{aligned}\]</div>Done.`,
          why: R`<p>Nothing simplifies further for \(\Phi\) (in your HW3, CLL's \(\log(1 - \gamma) = -e^{t}\) did).</p>` },
      ],
      compare: R`Identical to the official solution.`,
    },

    "2026B-q3.3": {
      point: R`Same derivation as LoR, with \(\Phi\) for \(\sigma\): derivative by one weight \(w_j\) (each log → \(\frac{1}{(\dots)}\cdot(\pm\varphi(t_i))\cdot x^{(i)}_j\)) → constant \(-\frac1n\) out, the rest \(= X_j^\top\)(a list) → stacked, \(X^\top\)(the list) = the hint's \(\sum_i z_i x^{(i)}\). So \(z_i\) = what multiplies \(x^{(i)}\), over one denominator (unlike \(\sigma\), nothing cancels).`,
      start: R`<p><b>The function (part 2):</b> \(\;L(w) = \square\)</p>
<p><b>Derivative by one weight \(w_j\):</b></p>
\[\frac{\partial L}{\partial w_j} = \;\square\; = \;\square\]
<p><b>All weights (the gradient):</b></p>
\[\nabla L(w) = \;\square\; = \sum_{i} z_i\,x^{(i)}, \qquad z_i = \square\]`,
      moves: [
        { line: R`<b>The function</b> — part 2's answer: <div class="formula">\[\begin{aligned}L(w) = -\frac1n\sum_{i}\Big[\,&y_i\log\Phi(t_i)\\ &+ (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\end{aligned}\]</div>`,
          why: R`<p>One bracket per sample, each with two logs. \(y_i\) and \(1 - y_i\) are just numbers (0 or 1) in front; only the logs contain \(w\), through \(t_i = w_0 + w_1x^{(i)}_1 + \dots + w_px^{(i)}_p\).</p>` },
        { line: R`<b>Derivative by one weight \(w_j\)</b> — each log: 1/(…) · (±\(\varphi(t_i)\)) · (the number in front of \(w_j\)), like \(\ln(x^2+3) \to \frac{1}{x^2+3}\cdot 2x\). Both share \(\varphi(t_i)\,x^{(i)}_j\), so pull it out: <div class="formula">\[\begin{aligned}\frac{\partial L}{\partial w_j} = -\frac1n\sum_{i}\,&\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\\ &\cdot\varphi(t_i)\,x^{(i)}_j\end{aligned}\]</div>`,
          why: R`<p><b>Each log, by \(w_j\):</b></p>
\[\frac{\partial}{\partial w_j}\log\Phi(t_i) = \frac{1}{\Phi(t_i)}\cdot\varphi(t_i)\cdot x^{(i)}_j\]
\[\begin{aligned}&\frac{\partial}{\partial w_j}\log\big(1 - \Phi(t_i)\big)\\ &= \frac{1}{1 - \Phi(t_i)}\cdot\big(-\varphi(t_i)\big)\cdot x^{(i)}_j\end{aligned}\]
<p>Three layers, outside to inside; multiply their derivatives (the chain rule, as in \(\ln(x^2+3)\)):</p>
<ul><li>\(\log(\dots) \to \frac{1}{(\dots)}\) — the derivative of \(\ln u\) is \(1/u\).</li>
<li>\(\Phi(t_i) \to \varphi(t_i)\) — observation (1), given in the question. For the second log the inside is \(1 - \Phi(t_i)\), so its derivative is \(-\varphi(t_i)\).</li>
<li>\(t_i \to x^{(i)}_j\) — \(t_i\) is a plain sum, so its derivative by \(w_j\) is the number in front of \(w_j\), as in Regression (2025-C Q1.2, move 2).</li></ul>
<p><b>Put them in the sum</b> (\(y_i\) and \(1 - y_i\) ride along), before pulling out:</p>
\[\begin{aligned}\frac{\partial L}{\partial w_j} = -\frac1n\sum_{i}\Big[&y_i\,\frac{\varphi(t_i)}{\Phi(t_i)}\,x^{(i)}_j\\ &- (1 - y_i)\,\frac{\varphi(t_i)}{1 - \Phi(t_i)}\,x^{(i)}_j\Big]\end{aligned}\]
<p>Optional, extension sheet only: [sheet: Chain rule], [sheet: Derivative of loga (x)].</p>` },
        { line: R`<b>Write it with matrices</b> — \(-\frac1n\) is a constant: out of the sum. The rest (entry × entry, added up) is a dot product; \([\dots]_i\) = move 2's bracket: <div class="formula">\[\begin{aligned}\frac{\partial L}{\partial w_j} &= \underbrace{\color{#e8912d}-\frac1n}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\cdot[\dots]_i\,\varphi(t_i)\\ &= -\frac1n\,X_j^\top\begin{bmatrix}[\dots]_1\,\varphi(t_1)\\ \vdots\\ [\dots]_n\,\varphi(t_n)\end{bmatrix}\end{aligned}\]</div>\(X_j\) = column \(j\) of \(X\).`,
          size: R`\[\underbrace{X_j^\top}_{\textstyle 1\times n}\,\underbrace{\begin{bmatrix}[\dots]_1\,\varphi(t_1)\\ \vdots\\ [\dots]_n\,\varphi(t_n)\end{bmatrix}}_{\textstyle n\times 1} = \text{one number}\]<p>inner n = n ✓ · one number, like \(\frac{\partial L}{\partial w_j}\) ✓ · without the \(^\top\): (n×1)(n×1) — inner 1 ≠ n ✗</p>`,
          why: R`<p>\(X_j\) = (sample 1's \(x_j\), sample 2's \(x_j\), …) — reading down column \(j\) of \(X\) (one row per sample, with the column of 1s in front). The list = (sample 1's \([\dots]_1\varphi(t_1)\), sample 2's, …). The sum multiplies them entry by entry and adds up: that's exactly a dot product, \(X_j^\top\cdot\) the list. For \(w_0\), \(X_0\) is the column of 1s.</p>
<p><b>Why only the \(-\frac1n\) comes out:</b> only things without an \(i\) (the same for every sample) can go in front of \(\sum_i\). \(x^{(i)}_j\), the bracket \([\dots]_i\) and \(\varphi(t_i)\) change from sample to sample, so they can't; they get packed into lists instead (\(X_j\) and the list above), and the sum becomes the dot product of the two lists.</p>` },
        { line: R`<b>From one weight to \(\nabla L\)</b> — stack move 3 for \(w_0, \dots, w_p\) (list = move 3's); only \(X_j\) changes, the rest is constant → out. \(X^\top\)(a list) = the hint's \(\sum_i z_i x^{(i)}\); \(z_i\) = what multiplies \(x^{(i)}\): <div class="formula">\[\begin{aligned}\nabla L &= \begin{bmatrix}-\frac1n X_0^\top(\text{list})\\ \vdots\\ -\frac1n X_p^\top(\text{list})\end{bmatrix}\\ &= \underbrace{\color{#e8912d}-\frac1n}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}X_0^\top\\ \vdots\\ X_p^\top\end{bmatrix}}_{\textstyle X^\top}\;\underbrace{\color{#e8912d}\begin{bmatrix}[\dots]_1\,\varphi(t_1)\\ \vdots\\ [\dots]_n\,\varphi(t_n)\end{bmatrix}}_{\textstyle\color{#e8912d}\text{constant}}\\ &= \sum_i z_i\,x^{(i)}\end{aligned}\]</div><div class="formula">\[z_i = -\frac1n\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\]</div>`,
          size: R`\[\underbrace{X^\top}_{\textstyle (p+1)\times n}\,\underbrace{z}_{\textstyle n\times 1} = \underbrace{\nabla L}_{\textstyle (p+1)\times 1} \qquad \underbrace{z_i}_{\text{number}}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1}\]<p>The \(p + 1\) rows \(X_j^\top\) (each 1×n) stacked = (p+1)×n = \(X^\top\) ✓ · inner n = n ✓ · one entry per knob, like \(w\) ✓ · the hint's way: a number × a sample, added over n samples → (p+1)×1 too ✓ · as code (part 4, blank 1): <code>X_b.T @ z</code></p><p>Wrong order: \(Xz\) = (n×(p+1))(n×1) — inner p + 1 ≠ n ✗</p>`,
          why: R`<p>The rows of \(X^\top\) are the columns of \(X\): row 0 = \(X_0^\top\), …, row \(p\) = \(X_p^\top\). The \(-\frac1n\) can go back inside the list: that's why it ends up in \(z_i\).</p>
<p>Why \(X^\top z = \sum_i z_i x^{(i)}\): the <b>columns</b> of \(X^\top\) are the samples \(x^{(i)}\) (with their 1), and a matrix times a list = column 1 × entry 1 + column 2 × entry 2 + … = \(z_1x^{(1)} + z_2x^{(2)} + \dots\) That's the hint's form.</p>` },
        { line: R`<b>Group common terms</b> — one denominator; the minus flips \(y_i - \Phi\) into \(\Phi - y_i\): <div class="formula">\[z_i = \frac{\big(\Phi(t_i) - y_i\big)\,\varphi(t_i)}{n\,\Phi(t_i)\,\big(1 - \Phi(t_i)\big)}\]</div>That's the answer.`,
          why: R`<p>Write \(\Phi\) for \(\Phi(t_i)\):</p>
\[\begin{aligned}\frac{y_i}{\Phi} - \frac{1 - y_i}{1 - \Phi} &= \frac{y_i(1 - \Phi) - (1 - y_i)\Phi}{\Phi(1 - \Phi)}\\ &= \frac{y_i - y_i\Phi - \Phi + y_i\Phi}{\Phi(1 - \Phi)}\\ &= \frac{y_i - \Phi}{\Phi(1 - \Phi)}\end{aligned}\]
<p>With \(\sigma\) instead: \(\sigma' = \sigma(1 - \sigma)\) cancels the denominator and leaves \(z_i = \frac{\sigma(t_i) - y_i}{n}\) — that's [sheet: BCE loss gradient]. With \(\Phi\), nothing cancels.</p>`,
          extra: [{ label: "you've done this before (HW3 Q6)", html: R`<p>Your HW3 Q6 is the same derivation with \(\gamma\) for \(\Phi\) and \(\gamma' = e^t(1 - \gamma)\) for \(\varphi\): same common denominator, then only \(1 - \gamma\) cancelled, giving \(\frac{e^{t_i}(\gamma(t_i) - y_i)}{n\,\gamma(t_i)}\).</p>` }] },
      ],
      compare: R`The official solution's lines match moves 2, 4 and 5: the two log derivatives and the combined sum (move 2 and its why?), \(z_i = -\frac1n[\dots]\varphi(t_i)\), and the grouped \(z_i\). It goes from the sum straight to \(\sum_i z_i x^{(i)}\) (move 3 is the step in between), and writes both forms of \(z_i\), one after the other.`,
    },

    "2026B-q3.4": {
      point: R`Every blank is spelled out around it: the hint \(\sum_i z_i x^{(i)}\), <code>self.learning_rate</code>, <code>BCE_loss(X, y)</code> on this batch, and the comment "loss <b>change</b>".`,
      moves: [
        { line: R`<b>(1) The hint's sum</b> — \(\sum_i z_i\,x^{(i)}\) over this batch's rows is \(X_b^\top z\): <code>X_b.T @ z</code>.`,
          size: R`<p><code>X_b.shape</code> = (b, d): the batch's b rows (b = <code>batch_size</code>), d = <code>X.shape[1]</code> = one column per knob (<code>self.w_</code> has <code>X.shape[1]</code> entries). <code>z.shape</code> = (b,): one \(z_i\) per row.</p>\[\underbrace{\texttt{X\_b.T}}_{\textstyle d\times b}\,\underbrace{z}_{\textstyle b\times 1} = \underbrace{\texttt{grad}}_{\textstyle d\times 1}\]<p>inner b = b ✓ · one entry per knob, like <code>self.w</code> ✓</p><p>Wrong order: <code>X_b @ z</code> = (b, d) @ (b,) — inner d ≠ b ✗</p>`,
          why: R`<p>\(\sum_i z_i\,x^{(i)} = z_1x^{(1)} + z_2x^{(2)} + \dots\): each row of \(X_b\) times its number \(z_i\), added up. The columns of \(X_b^\top\) are those rows, so \(X_b^\top z\) does exactly that (as in Regression, 2025-C Q1.2, move 4). You don't need part 3 for this.</p>` },
        { line: R`<b>(2) One step downhill</b> — weights minus learning rate × gradient: <code>self.w - self.learning_rate * grad</code>.`,
          remember: R`\[w \leftarrow w - \eta\,\nabla L(w)\]<p>One gradient-descent step. Not on the sheet. Here \(\eta\) is <code>self.learning_rate</code>, \(\nabla L\) is <code>grad</code>.</p>`,
          size: R`\[\underbrace{\texttt{self.w}}_{\textstyle d\times 1} - \eta\cdot\underbrace{\texttt{grad}}_{\textstyle d\times 1}\]<p>\(\eta\) = <code>self.learning_rate</code>, a number · both (d,) — one entry per knob, so the step subtracts entry by entry ✓</p>`,
          why: R`<p>The gradient points uphill (where the loss grows), so minus a small step of it lowers the loss; <code>self.learning_rate</code> sets the step size (same step as 2025-A Q4.5, blank 4).</p>` },
        { line: R`<b>(3) The loss on this batch</b> — <code>BCE_loss(X, y)</code> evaluates \(L(w)\) on a dataset; give it the batch: <code>self.BCE_loss(X_b, y_b)</code>.`,
          size: R`<p><code>X_b</code> (b, d) and <code>y_b</code> (b,): same b rows ✓ — the loss pairs row \(i\) with label \(i\). <code>BCE_loss(X, y_b)</code> would pair n rows with b labels ✗.</p>`,
          why: R`<p>It takes the original labels <code>y_b</code> (like your HW3 <code>BCE_loss</code>, it converts to 0/1 inside).</p>` },
        { line: R`<b>(4) Stop when the loss stops changing</b> — the comment says loss <b>change</b>: <code>abs(previous_loss - current_loss) &lt; self.eps</code>. Done.`,
          extra: [{ label: "your Moed B", html: R`<p>You wrote <code>current_loss &lt; self.eps</code> — that tests the loss itself, not its change. Blanks 1–2 were empty and blank 3 stopped at <code>self.BCE_loss(</code>: 1/8.</p>` }] },
      ],
      compare: R`Same four blanks as the official solution. Its blank 2 writes <code>self.w_ = self.w - …</code> (the code creates <code>self.w_</code>, the question lists <code>self.w</code>); it's the same update either way.`,
    },
  });
})();
