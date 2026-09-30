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
      start: R`<p><b>Add the 1:</b> \(x^{(1)} = \square,\ x^{(2)} = \square,\ x^{(3)} = \square,\ x^{(4)} = \square\); start \(w = \square\)</p>
<p><b>\(i = \square\):</b> \(w^\top x^{(i)} = \square\), \(\;\hat y^{(i)} = \mathrm{sign}(\square) = \square\) vs \(y^{(i)} = \square\)</p>
<p>If wrong: \(\;\Delta w = -0.1\,(\hat y^{(i)} - y^{(i)})\,x^{(i)} = \square\), new \(w = \square\). If right: "no update".</p>
<p>(one such block for each \(i = 1, 2, 3, 4\), in order)</p>
<p><b>After the pass:</b> \(w = \square\)</p>`,
      answer: R`<p><b>Add the 1:</b> \(x^{(1)} = (1, 1, 1, 0),\ x^{(2)} = (1, -1, 0, 2)\), \(x^{(3)} = (1, 2, 1, 1),\ x^{(4)} = (1, 0, -1, 1)\); start \(w = (-1, 0, 0, 0)\)</p>
<p><b>\(i = 1\):</b> \(w^\top x^{(1)} = -1\), \(\;\hat y^{(1)} = \mathrm{sign}(-1) = -1\) vs \(y^{(1)} = 1\) → wrong</p>
<p>\(\Delta w = -0.1\cdot(-1 - 1)\cdot(1, 1, 1, 0) = (0.2, 0.2, 0.2, 0)\), new \(w = (-0.8, 0.2, 0.2, 0)\)</p>
<p><b>\(i = 2\):</b> \(w^\top x^{(2)} = -0.8 - 0.2 = -1\), \(\;\hat y^{(2)} = \mathrm{sign}(-1) = -1\) vs \(y^{(2)} = -1\) → right: no update</p>
<p><b>\(i = 3\):</b> \(w^\top x^{(3)} = -0.8 + 0.4 + 0.2 = -0.2\), \(\;\hat y^{(3)} = \mathrm{sign}(-0.2) = -1\) vs \(y^{(3)} = 1\) → wrong</p>
<p>\(\Delta w = -0.1\cdot(-1 - 1)\cdot(1, 2, 1, 1) = (0.2, 0.4, 0.2, 0.2)\), new \(w = (-0.6, 0.6, 0.4, 0.2)\)</p>
<p><b>\(i = 4\):</b> \(w^\top x^{(4)} = -0.6 - 0.4 + 0.2 = -0.8\), \(\;\hat y^{(4)} = \mathrm{sign}(-0.8) = -1\) vs \(y^{(4)} = -1\) → right: no update</p>
<p><b>After the pass:</b> \(w = (-0.6, 0.6, 0.4, 0.2)\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> One pass: score each sample with the <b>current</b> \(w\), update only if wrong. \(w\) has 4 entries (\(w_0\) too), so put a 1 in front of each sample: <div class="formula">\[\begin{aligned}&x^{(1)} = (1, 1, 1, 0) &&x^{(2)} = (1, -1, 0, 2)\\ &x^{(3)} = (1, 2, 1, 1) &&x^{(4)} = (1, 0, -1, 1)\end{aligned}\]</div>Start: \(w = (-1, 0, 0, 0)\).`,
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
      slip: R`Label typos only; the updates are right.<ul><li>\(i = 2\): read \(\mathrm{sign}(w^\top x^{(2)})\).</li><li>\(i = 3\): read "\(-1 \ne 1 = y^{(3)}\)", so it updates.</li><li>\(i = 4\): read "\(-1 = -1 = y^{(4)}\)", so no update.</li></ul>`,
    },

    "2025A-q4.2": {
      point: R`"After" means the final \(w = (-0.6, 0.6, 0.4, 0.2)\) from part 1, not the scores from during the pass. Score every sample with it and take the sign.`,
      start: R`<p><b>Final \(w\) (part 1):</b> \(w = \square\)</p>
<p>\(x^{(1)}\): \(\;w^\top x^{(1)} = \square\), so \(\;\hat y^{(1)} = \mathrm{sign}(\square) = \square\)</p>
<p>(the same line for \(x^{(2)}, x^{(3)}, x^{(4)}\))</p>`,
      answer: R`<p><b>Final \(w\) (part 1):</b> \(w = (-0.6, 0.6, 0.4, 0.2)\)</p>
<p>\(x^{(1)}\): \(\;w^\top x^{(1)} = -0.6 + 0.6 + 0.4 + 0 = 0.4\), so \(\;\hat y^{(1)} = \mathrm{sign}(0.4) = 1\)</p>
<p>\(x^{(2)}\): \(\;w^\top x^{(2)} = -0.6 - 0.6 + 0 + 0.4 = -0.8\), so \(\;\hat y^{(2)} = \mathrm{sign}(-0.8) = -1\)</p>
<p>\(x^{(3)}\): \(\;w^\top x^{(3)} = -0.6 + 1.2 + 0.4 + 0.2 = 1.2\), so \(\;\hat y^{(3)} = \mathrm{sign}(1.2) = 1\)</p>
<p>\(x^{(4)}\): \(\;w^\top x^{(4)} = -0.6 + 0 - 0.4 + 0.2 = -0.8\), so \(\;\hat y^{(4)} = \mathrm{sign}(-0.8) = -1\)</p>`,
      moves: [
        { line: R`<b>What does "after" mean?</b> Use part 1's <b>final</b> \(w = (-0.6, 0.6, 0.4, 0.2)\), not the scores from during the pass. Score each sample (with its 1): <div class="formula">\[Xw = (0.4,\ -0.8,\ 1.2,\ -0.8)\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 4}\,\underbrace{w}_{\textstyle 4\times 1} = \underbrace{Xw}_{\textstyle 4\times 1}\]<p>4 samples × (1 + 3 features) · inner 4 = 4 ✓ · result 4×1 = one score per sample ✓ · rows = samples</p>`,
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
      start: R`<p><b>Answer:</b> option □</p>
<p><b>Because:</b> the BCE loss multiplies by □, so the labels must be □</p>
<p><b>So:</b> □</p>`,
      answer: R`<p><b>Answer:</b> option (d)</p>
<p><b>Because:</b> the BCE loss \(-[\,y\log\hat y + (1 - y)\log(1 - \hat y)\,]\) multiplies by \(y\) and \(1 - y\) (on/off switches), so the labels must be 0 / 1 — (a), −1 / 1, is out.</p>
<p><b>So:</b> which colour is 1 doesn't matter (the model then gives the probability of that colour), so (b) and (c) are both valid → (d).</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Which labels LoR can train on → look at its loss. BCE multiplies by \(y\) and \(1 - y\) [sheet: Binary cross-entropy (BCE) loss]: labels must be 0 / 1, so (a) is out.`,
          why: R`<p>One sample's loss is \(-[\,y\log\hat y + (1-y)\log(1-\hat y)\,]\). \(y = 1\) keeps only \(-\log\hat y\); \(y = 0\) keeps only \(-\log(1-\hat y)\). So \(y\) and \(1 - y\) are on/off switches: exactly one log is on. With \(y = -1\) they become −1 and 2: both logs are on, one with a minus, so the loss drops below 0 (down to −∞ as \(\hat y \to 0\)). And a label −1 can never be matched: \(\sigma\) never outputs −1 (it's always between 0 and 1).</p>` },
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
      answer: R`<p>Positive = red. Predicted positive iff \(P(\text{red} \mid x^{(i)}) \ge \tau\).</p>
<p>Per threshold: TP = # reds with \(p \ge \tau\), FP = # blues with \(p \ge \tau\), TPR = TP / 5, FPR = FP / 5 (5 reds, 5 blues)</p>
<p>Table:</p>
<div class="formula">\[\begin{array}{c|l|cccc|cc}\tau & \text{pred. +} & \text{TP}&\text{FP}&\text{TN}&\text{FN} & \text{TPR}&\text{FPR}\\ \hline 0.1 & \text{all} & 5&5&0&0 & 1&1\\ 0.2 & 2\text{–}10 & 5&4&1&0 & 1&0.8\\ 0.3 & 3\text{–}10 & 5&3&2&0 & 1&0.6\\ 0.4 & 4\text{–}10 & 5&2&3&0 & 1&0.4\\ 0.5 & 4, 5, 7, 8, 10 & 3&2&3&2 & 0.6&0.4\\ 0.6 & 4, 5, 8, 10 & 2&2&3&3 & 0.4&0.4\\ 0.7 & 5, 8, 10 & 2&1&4&3 & 0.4&0.2\\ 0.8 & 5, 10 & 1&1&4&4 & 0.2&0.2\\ 0.9 & 10 & 1&0&5&4 & 0.2&0\\ 1 & \text{none} & 0&0&5&5 & 0&0\end{array}\]</div>
<p>Plot: FPR on the x-axis, TPR on the y-axis — the points (1, 1), (0.8, 1), (0.6, 1), (0.4, 1), (0.4, 0.6), (0.4, 0.4), (0.2, 0.4), (0.2, 0.2), (0, 0.2), (0, 0), joined in order:</p>
<div><svg viewBox="0 0 240 230" width="250" style="max-width:100%;height:auto" role="img" aria-label="ROC curve">
<g fill="none" style="stroke:var(--line)" stroke-width="1"><line x1="76" y1="190" x2="76" y2="10"/><line x1="112" y1="190" x2="112" y2="10"/><line x1="148" y1="190" x2="148" y2="10"/><line x1="184" y1="190" x2="184" y2="10"/><line x1="220" y1="190" x2="220" y2="10"/><line x1="40" y1="154" x2="220" y2="154"/><line x1="40" y1="118" x2="220" y2="118"/><line x1="40" y1="82" x2="220" y2="82"/><line x1="40" y1="46" x2="220" y2="46"/><line x1="40" y1="10" x2="220" y2="10"/></g>
<g fill="none" style="stroke:var(--muted)" stroke-width="1"><line x1="40" y1="190" x2="220" y2="190"/><line x1="40" y1="190" x2="40" y2="10"/></g>
<polyline fill="none" style="stroke:var(--accent)" stroke-width="2.5" points="220,10 184,10 148,10 112,10 112,82 112,118 76,118 76,154 40,154 40,190"/>
<g style="fill:var(--accent)"><circle cx="220" cy="10" r="3.5"/><circle cx="184" cy="10" r="3.5"/><circle cx="148" cy="10" r="3.5"/><circle cx="112" cy="10" r="3.5"/><circle cx="112" cy="82" r="3.5"/><circle cx="112" cy="118" r="3.5"/><circle cx="76" cy="118" r="3.5"/><circle cx="76" cy="154" r="3.5"/><circle cx="40" cy="154" r="3.5"/><circle cx="40" cy="190" r="3.5"/></g>
<g fill="currentColor" font-size="11"><text x="130" y="222" text-anchor="middle">FPR</text><text x="12" y="100" text-anchor="middle" transform="rotate(-90 12 100)">TPR</text><text x="36" y="203" text-anchor="end">0</text><text x="112" y="203" text-anchor="middle">0.4</text><text x="220" y="203" text-anchor="middle">1</text><text x="34" y="122" text-anchor="end">0.4</text><text x="34" y="14" text-anchor="end">1</text></g>
</svg></div>`,
      moves: [
        { line: R`<b>What does the question really want?</b> One (FPR, TPR) point per \(\tau\). The model gives \(P(\text{red})\), so red = positive; split by true colour: <div class="formula">\[\begin{aligned}\text{reds: }&0.4,\ 0.45,\ 0.55,\ 0.75,\ 0.9\\ \text{blues: }&0.15,\ 0.25,\ 0.35,\ 0.65,\ 0.85\end{aligned}\]</div>Then TP = reds with \(p \ge \tau\), FP = blues with \(p \ge \tau\).`,
          remember: R`<p>ROC curve = one point (FPR, TPR) per threshold \(\tau\), FPR on the x-axis, TPR on the y-axis. A threshold predicts positive iff \(P(\text{positive} \mid x) \ge \tau\).</p><p>Not on the sheet; the question gives only TPR = TP / (TP + FN) and FPR = FP / (FP + TN).</p>`,
          why: R`<p>The model gives \(P(\text{red})\), so red is the positive class. TP + FN = every red (caught or missed) = 5, and FP + TN = every blue = 5, at every threshold. So TPR = TP / 5 and FPR = FP / 5.</p>` },
        { line: R`<b>Count for each \(\tau\)</b>, divide by 5 — the full table (predicted positive = the \(x^{(i)}\) with \(p \ge \tau\), listed by \(i\)): <div class="formula">\[\begin{array}{c|l|cccc|cc}\tau & \text{pred. +} & \text{TP}&\text{FP}&\text{TN}&\text{FN} & \text{TPR}&\text{FPR}\\ \hline 0.1 & \text{all} & 5&5&0&0 & 1&1\\ 0.2 & 2\text{–}10 & 5&4&1&0 & 1&0.8\\ 0.3 & 3\text{–}10 & 5&3&2&0 & 1&0.6\\ 0.4 & 4\text{–}10 & 5&2&3&0 & 1&0.4\\ 0.5 & 4, 5, 7, 8, 10 & 3&2&3&2 & 0.6&0.4\\ 0.6 & 4, 5, 8, 10 & 2&2&3&3 & 0.4&0.4\\ 0.7 & 5, 8, 10 & 2&1&4&3 & 0.4&0.2\\ 0.8 & 5, 10 & 1&1&4&4 & 0.2&0.2\\ 0.9 & 10 & 1&0&5&4 & 0.2&0\\ 1 & \text{none} & 0&0&5&5 & 0&0\end{array}\]</div>`,
          why: R`<p><b>One in full, \(\tau = 0.5\):</b> reds \(\ge 0.5\): 0.55, 0.75, 0.9 → TP = 3, FN = 2. Blues \(\ge 0.5\): 0.65, 0.85 → FP = 2, TN = 3. TPR = 3/5 = 0.6, FPR = 2/5 = 0.4.</p>
<p>"2–10" = \(x^{(2)}, \dots, x^{(10)}\). On paper, write the \(x^{(i)}\)'s out.</p>`,
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
      slip: R`The counts and TPR/FPR are right, but four "Predicted Positive" lists are off (positive = probability ≥ threshold):<ul><li>0.2: missing \(x^{(2)}\) (0.25).</li><li>0.3: missing \(x^{(3)}\) (0.35).</li><li>0.4: missing \(x^{(6)}\) (0.45).</li><li>0.8: should be \(x^{(5)}, x^{(10)}\), not \(x^{(8)}, x^{(10)}\) (0.75 &lt; 0.8).</li></ul>`,
    },

    "2025A-q4.5": {
      point: R`Every blank is named by the lines around it: the library called np, \(\sigma\) from the formula sheet, the scores that line 15 feeds into <code>sigmoid</code>, and the step that uses line 16's <code>grad</code>.`,
      start: R`<p><b>(1)</b> □</p>
<p><b>(2)</b> □</p>
<p><b>(3)</b> □</p>
<p><b>(4)</b> □</p>`,
      answer: R`<p><b>(1)</b> <code>numpy</code></p>
<p><b>(2)</b> <code>1 / (1 + np.exp(-z))</code></p>
<p><b>(3)</b> <code>X_with_bias @ w</code></p>
<p><b>(4)</b> <code>w - eta * grad</code></p>`,
      moves: [
        { line: R`<b>(1)</b> — the library imported as np: <code>numpy</code>. <b>(2)</b> — \(\sigma(z) = \frac{1}{1 + e^{-z}}\), piece by piece:
<div class="tw"><table><thead><tr><th>formula</th><th>code</th></tr></thead><tbody>
<tr><td>\(e^{-z}\)</td><td><code>np.exp(-z)</code></td></tr>
<tr><td>\(1 + (\dots)\)</td><td><code>1 + …</code></td></tr>
<tr><td>\(\frac{1}{(\dots)}\)</td><td><code>1 / (…)</code></td></tr></tbody></table></div>
→ <code>1 / (1 + np.exp(-z))</code>.`,
          size: R`<p><code>z</code> = line 14's scores, one per sample: shape (n,), n = <code>X.shape[0]</code> = number of samples.</p><p><code>np.exp(-z)</code>, <code>1 + …</code> and <code>1 / …</code> all work entry by entry → (n,) = one probability per sample ✓ · <code>math.exp(-z)</code> takes only one number → error on an array ✗</p>`,
          why: R`<p>You don't need to know \(\sigma\) by heart: [sheet: Sigmoid function]. numpy does it to every entry: with part 2's four scores, <code>z = np.array([0.4, -0.8, 1.2, -0.8])</code>, <code>1 / (1 + np.exp(-z))</code> = (0.60, 0.31, 0.77, 0.31).</p>` },
        { line: R`<b>(3) The scores</b> — line 15 puts <code>z</code> into sigmoid, so <code>z</code> = every sample's score \(w^\top x^{(i)}\). \(w\) has one entry per column of <code>X_with_bias</code> (line 11), so: <code>X_with_bias @ w</code>.`,
          size: R`<p><b>Line 8:</b> <code>np.ones((X.shape[0], 1))</code> = a column of n ones, (n, 1). <code>np.concatenate((ones, X), axis=1)</code> glues it in front of <code>X</code>, side by side → <code>X_with_bias</code>: (n, X.shape[1] + 1).</p><p><b>Line 11:</b> <code>np.zeros(X_with_bias.shape[1])</code> = a flat list of zeros, one per column → <code>w</code>: (X.shape[1] + 1,).</p><p><code>X_with_bias @ w</code>: (n, X.shape[1] + 1) @ (X.shape[1] + 1,) → (n,) = one score per sample ✓ · <code>X @ w</code>: inner X.shape[1] ≠ X.shape[1] + 1 ✗</p><p>With parts 3–4's table (10 samples, 2 features): <code>X_with_bias</code> (10, 3), <code>w</code> (3,), <code>z</code> (10,).</p>`,
          why: R`<p>Row \(i\) of <code>X_with_bias</code> is \((1, x^{(i)}_1, \dots)\); times \(w\) that's \(w_0 + w_1x^{(i)}_1 + \dots\) = sample \(i\)'s score. So <code>X_with_bias @ w</code> = one score per row (as in Regression, 2025-C Q1.3, move 2).</p>`,
          extra: [{ label: "why not w.T @ X_with_bias, like the formula wᵀx⁽ⁱ⁾?", html: R`<p><b>The formula is one sample:</b> \(w^\top x^{(i)}\) = \(w\) dotted with sample \(i\) = one number. The code wants all n scores at once.</p>
<p><b>In the code the samples are rows:</b> row \(i\) of <code>X_with_bias</code> is \(x^{(i)}\). A dot product doesn't care about order, so \(w^\top x^{(i)}\) = (row \(i\)) · \(w\). Doing "row · \(w\)" for every row is exactly matrix × vector: <code>X_with_bias @ w</code>.</p>
<div class="tw"><table><thead><tr><th></th><th>shapes</th><th>result</th></tr></thead><tbody>
<tr><td>formula, one sample</td><td>\(\underbrace{w^\top}_{1\times 3}\,\underbrace{x^{(i)}}_{3\times 1}\)</td><td>one number</td></tr>
<tr><td><code>X_with_bias @ w</code></td><td>(10, 3) @ (3,)</td><td>(10,) ✓ one per sample</td></tr>
<tr><td><code>w.T @ X_with_bias</code></td><td>(3,) @ (10, 3)</td><td>inner 3 ≠ 10 → error ✗</td></tr></tbody></table></div>
<p><code>w</code> is a flat (3,) array, so <code>.T</code> does nothing to it. <code>w @ X_with_bias.T</code> would also work ((3,) @ (3, 10) → (10,), the same scores) — the samples just have to be columns for \(w\) to go first.</p>` }] },
        { line: R`<b>(4) One step downhill</b> — line 16 just computed <code>grad</code>, and line 17 makes the new <code>w</code> from it: current \(w\) minus step size × gradient: <code>w - eta * grad</code>. Done.`,
          remember: R`\[w \leftarrow w - \eta\,\nabla L(w)\]<p>One gradient-descent step. Not on the sheet. Here \(\eta\) is <code>eta</code>, \(\nabla L\) is <code>grad</code>.</p>`,
          size: R`<p>Line 16: <code>X_with_bias.T @ (y_hat - y)</code>: (X.shape[1] + 1, n) @ (n,) → (X.shape[1] + 1,) — inner n = n ✓</p><p><code>w - eta * grad</code>: (X.shape[1] + 1,) − (X.shape[1] + 1,) → same shape: one entry per knob, subtracted entry by entry ✓</p>`,
          why: R`<p>The gradient points uphill (where the loss grows), so minus a small step of it (<code>eta</code> × <code>grad</code>) lowers the loss (same step as \(\theta - 0.1\cdot\nabla J\) in Regression, 2025-C Q1.3).</p>
<p>Line 16's <code>grad</code> is [sheet: BCE loss gradient] without the \(\frac1n\) (which only rescales the step): the sheet's sum \(\sum_i(\sigma(w^\top x^{(i)}) - y_i)\,x^{(i)}\) is <code>X_with_bias.T @ (y_hat - y)</code>, because <code>X.T @ list</code> = \(\sum_i\) (entry \(i\) of the list) × (row \(i\) of <code>X</code>).</p>` },
      ],
      compare: R`Same four blanks as the official solution.`,
    },

    // ─────────────────────────────── 2025-B Q3 ───────────────────────────────
    "2025B-q3.1": {
      point: R`The table gives scores \(w^\top x\), not probabilities. \(\sigma(\text{score}) \ge \tfrac12\) exactly when the score \(\ge 0\), so the label is just the sign of the score.`,
      start: R`<p><b>Rule:</b> predict "1" iff \(\sigma(w^\top x^{(i)}) \ge \square \iff w^\top x^{(i)} \ge \square\)</p>
<p><b>Predicted "1":</b> samples □</p>
<p><b>Predicted "0":</b> samples □</p>`,
      answer: R`<p><b>Rule:</b> predict "1" iff \(\sigma(w^\top x^{(i)}) \ge \tfrac12 \iff w^\top x^{(i)} \ge 0\) (because \(\sigma(0) = \tfrac12\) and \(\sigma\) only goes up)</p>
<p><b>Predicted "1":</b> samples 1, 3, 5 (scores 1.4, 0.8, 0.4 \(\gt 0\))</p>
<p><b>Predicted "0":</b> samples 2, 4, 6 (scores −0.8, −1.6, −0.4 \(\lt 0\))</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The table gives scores, not probabilities, and LoR predicts 1 when \(\sigma(w^\top x) \ge \tfrac12\). \(\sigma(0) = \tfrac12\) and \(\sigma\) only goes up, so that's exactly when \(w^\top x \ge 0\).`,
          remember: R`\[\text{predict } 1 \iff P(Y = 1 \mid x) = \sigma(w^\top x) \ge \tfrac12\]<p>The ½ cut is from class. Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability.</p><p>The sheet's posterior is \(\sigma(w_0 + w^\top x)\), with \(w_0\) outside; here \(x_0^{(i)} = 1\) puts it inside \(w^\top x\).</p>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times(p+1)}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1} = \text{one number}\]<p>\(w \in \mathbb R^{p+1}\), and \(x^{(i)}\) has its \(x_0 = 1\) too · inner p + 1 = p + 1 ✓ · one score per sample: the table's column, 6 scores for 6 samples ✓</p>`,
          why: R`<p>\(\sigma(0) = \frac{1}{1 + e^0} = \frac12\) [sheet: Sigmoid function]. Bigger score → smaller \(e^{-t}\) → bigger \(\sigma\). So "above ½" = "score above 0". The grader gave 0 points for comparing the scores themselves with ½.</p>` },
        { line: R`<b>Read the signs</b> — 1.4, 0.8, 0.4 are positive: samples 1, 3, 5 → "1". −0.8, −1.6, −0.4 are negative: samples 2, 4, 6 → "0". Done.` },
      ],
      compare: R`Same as the official answer. It writes "samples 2, 4, 6–8 are 0", but 7–8 only appear in part 3: for this part it's 2, 4, 6.`,
      slip: R`It says "samples 2, 4, 6–8 are 0", but this part has only samples 1–6. Samples 7 and 8 are added later, in part 3 (and sample 7, score 1.1, would be a "1" anyway). The right answer here: 1, 3, 5 → "1"; 2, 4, 6 → "0".`,
    },

    "2025B-q3.2": {
      point: R`Separable means <b>some</b> line gets every sample right. The given \(w\) already does (part 1), so we have one.`,
      start: R`<p><b>Answer:</b> □</p>
<p><b>Because:</b> the given \(w\) predicts □; the true labels are □</p>
<p><b>So:</b> □</p>`,
      answer: R`<p><b>Answer:</b> necessarily separable</p>
<p><b>Because:</b> the given \(w\) predicts 1, 0, 1, 0, 1, 0 (score \(\ge 0\) → "1": scores 1.4, −0.8, 0.8, −1.6, 0.4, −0.4); the true labels are 1, 0, 1, 0, 1, 0 — all six right.</p>
<p><b>So:</b> the hyperplane \(\{x : w^\top x = 0\}\) has every "1" on its + side and every "0" on its − side: it is a separating hyperplane.</p>`,
      moves: [
        { line: R`<b>What does "separable" need?</b> <b>Some</b> line that gets every sample right. Try the one we have, the given \(w\) (score \(\ge 0\) → "1", part 1): it predicts 1, 0, 1, 0, 1, 0 = the true labels.`,
          remember: R`\[\hat y = 1 \iff \sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\]<p>So LoR's decision boundary is the hyperplane \(w^\top x = 0\). Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability.</p><p>The sheet's posterior is \(\sigma(w_0 + w^\top x)\), with \(w_0\) outside; here \(x_0^{(i)} = 1\) puts it inside \(w^\top x\).</p>` },
        { line: R`<b>So its line separates them</b> — the hyperplane \(w^\top x = 0\) has every "1" on the + side and every "0" on the − side: <b>necessarily separable</b>. Done.` },
      ],
      compare: R`Same as the official answer: \(\{x : w^\top x = 0\}\) is a separating hyperplane.`,
    },

    "2025B-q3.3": {
      point: R`TPR = 1 and FPR = 0 just means zero mistakes. Changing \(w_0\) moves every score by the same amount, so if every positive scores above every negative, a shift of \(w_0\) fixes the one mistake.`,
      start: R`<p><b>Answer:</b> □</p>
<p><b>The given \(w\)'s only mistake:</b> sample □</p>
<p><b>Lowest "1" vs highest "0":</b> □ \(\gt\) □, so a cut at □ splits them</p>
<p><b>The classifier:</b> \(w_0' = \square\), \(\;w_j' = \square\) for \(j = 1, \dots, p\)</p>
<p><b>Check:</b> TPR = □, FPR = □</p>`,
      answer: R`<p><b>Answer:</b> yes</p>
<p><b>The given \(w\)'s only mistake:</b> sample 8 (label 0, score \(0.2 \ge 0\) → predicted 1: a false positive)</p>
<p><b>Lowest "1" vs highest "0":</b> 0.4 \(\gt\) 0.2, so a cut at 0.3 splits them</p>
<p><b>The classifier:</b> \(w_0' = w_0 - 0.3\), \(\;w_j' = w_j\) for \(j = 1, \dots, p\) — every score drops by 0.3: "1"s 1.1, 0.5, 0.1, 0.8 \(\gt 0\); "0"s −1.1, −1.9, −0.7, −0.1 \(\lt 0\)</p>
<p><b>Check:</b> TPR = 4/4 = 1, FPR = 0/4 = 0</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> TPR = 1 and FPR = 0 means no mistakes at all. With the given \(w\): sample 8 is a "0" with score \(0.2 > 0\), a false positive. Everything else is right.`,
          remember: R`\[\hat y = 1 \iff \sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\]<p>LoR's cut. Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability.</p><p>The sheet's posterior is \(\sigma(w_0 + w^\top x)\), with \(w_0\) outside; here \(x_0^{(i)} = 1\) puts it inside \(w^\top x\).</p>`,
          why: R`<p>TPR = TP / (TP + FN) is 1 only if FN = 0. FPR = FP / (FP + TN) is 0 only if FP = 0. So we need no missed "1" and no flagged "0".</p>` },
        { line: R`<b>Can a cut fix it? Lowest "1" vs highest "0"</b> — simplest other classifier: same scores, a cut other than 0. Works only if every "1" scores above every "0": <div class="formula">\[\begin{aligned}\text{"1"s: }&1.4,\ 0.8,\ \mathbf{0.4},\ 1.1 &&\text{lowest } 0.4\\ \text{"0"s: }&-0.8,\ -1.6,\ -0.4,\ \mathbf{0.2} &&\text{highest } 0.2\end{aligned}\]</div>\(0.4 > 0.2\), so a cut at 0.3 splits them.` },
        { line: R`<b>Move the cut: shift \(w_0\)</b> — \(w_0\) multiplies the 1 in every sample, so changing it moves every score equally. \(w_0' = w_0 - 0.3\), rest the same: <div class="formula">\[\begin{aligned}\text{"1"s: }&1.1,\ 0.5,\ 0.1,\ 0.8 \;\gt 0\\ \text{"0"s: }&-1.1,\ -1.9,\ -0.7,\ -0.1 \;\lt 0\end{aligned}\]</div>TPR = 4/4 = 1, FPR = 0/4 = 0: <b>yes</b>. Done.`,
          size: R`\[\underbrace{w'^\top}_{\textstyle 1\times(p+1)}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1} = w^\top x^{(i)} - 0.3\cdot\underbrace{x^{(i)}_0}_{\textstyle =1}\]<p>\(w'\) is \(w\) with only entry 0 changed, same size ✓ · still one score per sample, now 0.3 lower ✓</p>`,
          why: R`<p>\(w^\top x^{(i)} = w_0\cdot 1 + w_1x^{(i)}_1 + \dots\), so \(w_0 - 0.3\) takes 0.3 off every score. The grader wants the new classifier named (\(w_0' = w_0 - 0.3\)), not just "yes". Also accepted: "threshold 0.3 on the original scores" — the same classifier (score \(- 0.3 \ge 0\) ⟺ score \(\ge 0.3\)).</p>` },
      ],
      compare: R`Same classifier as the official answer: \(w_0' = w_0 - 0.3\), \(w_j' = w_j\).`,
    },

    "2025B-q3.4": {
      point: R`Two sides. This \(w\) (and every shift of \(w_0\)) fails: sample 9 (a "0") scores above sample 5 (a "1"). Every other \(w\) can't be checked: we only see this \(w\)'s scores, not the features. No working line, no proof there is none → insufficient information.`,
      start: R`<p><b>Answer:</b> □</p>
<p><b>The given \(w\), and any shift of \(w_0\):</b> □</p>
<p><b>Other linear classifiers:</b> □</p>
<p><b>So:</b> □</p>`,
      answer: R`<p><b>Answer:</b> insufficient information</p>
<p><b>The given \(w\), and any shift of \(w_0\):</b> fail. Sample 9 (label 0) scores 0.5, above sample 5 (label 1, score 0.4). Shifting \(w_0\) moves every score equally, so any cut that keeps sample 5 a "1" also makes sample 9 a "1".</p>
<p><b>Other linear classifiers:</b> can't be checked — we only see this \(w\)'s scores, not the features, so another \(w\) may still separate the data.</p>
<p><b>So:</b> no separating line found, but none ruled out: not necessarily separable, not necessarily inseparable → insufficient information.</p>`,
      moves: [
        { line: R`<b>This \(w\) fails</b> — sample 9 is a "0" but scores 0.5 \(\ge 0\) → predicted "1".` },
        { line: R`<b>Its shifts fail too</b> — shifting \(w_0\) moves every score equally, so sample 9 (0.5) stays above sample 5 (a "1", 0.4). A cut that keeps sample 5 a "1" also makes sample 9 a "1".<div class="fig"><svg viewBox="0 0 600 270" width="600" role="img" aria-label="Sliding the cut"><circle cx="18" cy="14" r="7" style="fill:var(--got)"/><text x="32" y="19" font-size="13" fill="currentColor">label 1</text><rect x="100" y="8" width="12" height="12" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="120" y="19" font-size="13" fill="currentColor">label 0</text><circle cx="205" cy="14" r="10" fill="none" style="stroke:var(--shaky)" stroke-width="3"/><text x="222" y="19" font-size="13" fill="currentColor">wrong</text><text x="590" y="19" text-anchor="end" font-size="12" fill="currentColor">sample number above · score below</text><text x="10" y="62" font-size="14" font-weight="700" fill="currentColor">Cut between 8 and 5 → sample 9 is wrong</text><rect x="270" y="74" width="320" height="52" style="fill:var(--accent-soft)"/><text x="586" y="70" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">predicted "1" →</text><line x1="20" y1="100" x2="590" y2="100" style="stroke:var(--muted)"/><line x1="270" y1="72" x2="270" y2="128" style="stroke:var(--accent)" stroke-width="2.5" stroke-dasharray="6 4"/><text x="270" y="144" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">cut 0.3</text><rect x="53" y="93" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="60" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">4</text><text x="60" y="124" text-anchor="middle" font-size="12" fill="currentColor">-1.6</text><rect x="113" y="93" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="120" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">2</text><text x="120" y="124" text-anchor="middle" font-size="12" fill="currentColor">-0.8</text><rect x="173" y="93" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="180" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">6</text><text x="180" y="124" text-anchor="middle" font-size="12" fill="currentColor">-0.4</text><rect x="233" y="93" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="240" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">8</text><text x="240" y="124" text-anchor="middle" font-size="12" fill="currentColor">0.2</text><circle cx="300" cy="100" r="8" style="fill:var(--got)"/><text x="300" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">5</text><text x="300" y="124" text-anchor="middle" font-size="12" fill="currentColor">0.4</text><rect x="353" y="93" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="360" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">9</text><text x="360" y="124" text-anchor="middle" font-size="12" fill="currentColor">0.5</text><circle cx="420" cy="100" r="8" style="fill:var(--got)"/><text x="420" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">3</text><text x="420" y="124" text-anchor="middle" font-size="12" fill="currentColor">0.8</text><circle cx="480" cy="100" r="8" style="fill:var(--got)"/><text x="480" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">7</text><text x="480" y="124" text-anchor="middle" font-size="12" fill="currentColor">1.1</text><circle cx="540" cy="100" r="8" style="fill:var(--got)"/><text x="540" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">1</text><text x="540" y="124" text-anchor="middle" font-size="12" fill="currentColor">1.4</text><circle cx="360" cy="100" r="15" fill="none" style="stroke:var(--shaky)" stroke-width="3"/><text x="10" y="177" font-size="14" font-weight="700" fill="currentColor">Slide it past 9 → now sample 5 is wrong</text><rect x="330" y="189" width="260" height="52" style="fill:var(--accent-soft)"/><text x="586" y="185" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">predicted "1" →</text><line x1="20" y1="215" x2="590" y2="215" style="stroke:var(--muted)"/><line x1="330" y1="187" x2="330" y2="243" style="stroke:var(--accent)" stroke-width="2.5" stroke-dasharray="6 4"/><text x="330" y="259" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">cut 0.45</text><rect x="53" y="208" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="60" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">4</text><text x="60" y="239" text-anchor="middle" font-size="12" fill="currentColor">-1.6</text><rect x="113" y="208" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="120" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">2</text><text x="120" y="239" text-anchor="middle" font-size="12" fill="currentColor">-0.8</text><rect x="173" y="208" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="180" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">6</text><text x="180" y="239" text-anchor="middle" font-size="12" fill="currentColor">-0.4</text><rect x="233" y="208" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="240" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">8</text><text x="240" y="239" text-anchor="middle" font-size="12" fill="currentColor">0.2</text><circle cx="300" cy="215" r="8" style="fill:var(--got)"/><text x="300" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">5</text><text x="300" y="239" text-anchor="middle" font-size="12" fill="currentColor">0.4</text><rect x="353" y="208" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="360" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">9</text><text x="360" y="239" text-anchor="middle" font-size="12" fill="currentColor">0.5</text><circle cx="420" cy="215" r="8" style="fill:var(--got)"/><text x="420" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">3</text><text x="420" y="239" text-anchor="middle" font-size="12" fill="currentColor">0.8</text><circle cx="480" cy="215" r="8" style="fill:var(--got)"/><text x="480" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">7</text><text x="480" y="239" text-anchor="middle" font-size="12" fill="currentColor">1.1</text><circle cx="540" cy="215" r="8" style="fill:var(--got)"/><text x="540" y="201" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">1</text><text x="540" y="239" text-anchor="middle" font-size="12" fill="currentColor">1.4</text><circle cx="300" cy="215" r="15" fill="none" style="stroke:var(--shaky)" stroke-width="3"/></svg></div>`,
          why: R`<p>Separating needs a cut \(c\) with every "1" \(\ge c\) and every "0" \(\lt c\): sample 5 needs \(c \le 0.4\), sample 9 needs \(c \gt 0.5\). Both at once is impossible.</p>` },
        { line: R`<b>Other \(w\)'s — can't be checked</b> — we see only this \(w\)'s scores, not the features. Two <i>made-up</i> layouts, both with <b>this exact table</b> (the given \(w\) just reads left to right):<div class="fig"><svg viewBox="0 0 600 395" width="600" role="img" aria-label="Two made-up layouts with the same scores"><circle cx="18" cy="14" r="7" style="fill:var(--got)"/><text x="32" y="19" font-size="13" fill="currentColor">label 1</text><rect x="100" y="8" width="12" height="12" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="120" y="19" font-size="13" fill="currentColor">label 0</text><text x="590" y="19" text-anchor="end" font-size="12" fill="currentColor">sample number above · score below</text><text x="10" y="50" font-size="14" font-weight="700" fill="currentColor">Layout A — separable</text><line x1="20" y1="142" x2="590" y2="142" style="stroke:var(--accent)" stroke-width="2.5" stroke-dasharray="7 5"/><text x="20" y="162" font-size="12" font-weight="700" style="fill:var(--accent-ink)">a different line: all 1s above it, all 0s below it ✓</text><rect x="53" y="193" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="60" y="186" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">4</text><text x="60" y="224" text-anchor="middle" font-size="12" fill="currentColor">-1.6</text><rect x="113" y="193" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="120" y="186" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">2</text><text x="120" y="224" text-anchor="middle" font-size="12" fill="currentColor">-0.8</text><rect x="173" y="193" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="180" y="186" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">6</text><text x="180" y="224" text-anchor="middle" font-size="12" fill="currentColor">-0.4</text><rect x="233" y="193" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="240" y="186" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">8</text><text x="240" y="224" text-anchor="middle" font-size="12" fill="currentColor">0.2</text><circle cx="300" cy="85" r="8" style="fill:var(--got)"/><text x="300" y="71" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">5</text><text x="300" y="109" text-anchor="middle" font-size="12" fill="currentColor">0.4</text><rect x="353" y="193" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="360" y="186" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">9</text><text x="360" y="224" text-anchor="middle" font-size="12" fill="currentColor">0.5</text><circle cx="420" cy="85" r="8" style="fill:var(--got)"/><text x="420" y="71" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">3</text><text x="420" y="109" text-anchor="middle" font-size="12" fill="currentColor">0.8</text><circle cx="480" cy="85" r="8" style="fill:var(--got)"/><text x="480" y="71" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">7</text><text x="480" y="109" text-anchor="middle" font-size="12" fill="currentColor">1.1</text><circle cx="540" cy="85" r="8" style="fill:var(--got)"/><text x="540" y="71" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">1</text><text x="540" y="109" text-anchor="middle" font-size="12" fill="currentColor">1.4</text><text x="10" y="290" font-size="14" font-weight="700" fill="currentColor">Layout B — inseparable (all on one line)</text><line x1="20" y1="335" x2="590" y2="335" style="stroke:var(--muted)"/><rect x="53" y="328" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="60" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">4</text><text x="60" y="359" text-anchor="middle" font-size="12" fill="currentColor">-1.6</text><rect x="113" y="328" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="120" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">2</text><text x="120" y="359" text-anchor="middle" font-size="12" fill="currentColor">-0.8</text><rect x="173" y="328" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="180" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">6</text><text x="180" y="359" text-anchor="middle" font-size="12" fill="currentColor">-0.4</text><rect x="233" y="328" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="240" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">8</text><text x="240" y="359" text-anchor="middle" font-size="12" fill="currentColor">0.2</text><circle cx="300" cy="335" r="8" style="fill:var(--got)"/><text x="300" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">5</text><text x="300" y="359" text-anchor="middle" font-size="12" fill="currentColor">0.4</text><rect x="353" y="328" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="360" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">9</text><text x="360" y="359" text-anchor="middle" font-size="12" fill="currentColor">0.5</text><circle cx="420" cy="335" r="8" style="fill:var(--got)"/><text x="420" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">3</text><text x="420" y="359" text-anchor="middle" font-size="12" fill="currentColor">0.8</text><circle cx="480" cy="335" r="8" style="fill:var(--got)"/><text x="480" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">7</text><text x="480" y="359" text-anchor="middle" font-size="12" fill="currentColor">1.1</text><circle cx="540" cy="335" r="8" style="fill:var(--got)"/><text x="540" y="321" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">1</text><text x="540" y="359" text-anchor="middle" font-size="12" fill="currentColor">1.4</text><path d="M292 369 q0 9 9 9 h118 q9 0 9 -9" fill="none" style="stroke:var(--shaky)" stroke-width="2.5"/><text x="360" y="395" text-anchor="middle" font-size="12" fill="currentColor">1 · 0 · 1 in a row: one straight line can't split it ✗</text></svg></div>Same table, A separable, B not.` },
        { line: R`<b>So</b> — no line that works, and no proof that none exists: <b>insufficient information</b>. Done.`,
          why: R`<p>"Necessarily inseparable" is a claim about every line; one failing \(w\) (and its shifts) doesn't prove it — the grader gave only partial credit (≈ 3/5) for "inseparable". "Necessarily separable" would need a line that works, and we have none.</p>` },
      ],
      compare: R`Same as the official answer: not separable by the given classifier or by adjusting \(w_0\) (moves 1–2), but another linear classifier may separate the data (moves 3–4).`,
      slip: R`The official answer never names an option. The one it means is <b>Insufficient information</b>: this \(w\) (and any shift of \(w_0\)) fails on sample 9, but some other line might still separate the data.`,
    },

    "2025B-q3.5": {
      point: R`The negatives sit inside a circle around the origin, the positives outside. "Outside" is \(x_1^2 + x_2^2 > r^2\), so make \(x_1^2 + x_2^2\) a feature: \(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2)\). The graded thing is this explicit \(\varphi\).`,
      start: R`<p>Positive \(\iff\;\square > 0\)</p>
<p>\(\varphi(x_1, x_2) = \square, \qquad w = \square\)</p>`,
      answer: R`<p>Positive \(\iff\;-0.4 + (x_1^2 + x_2^2) > 0\) (outside a circle around the origin, \(r^2 = 0.4\): the negatives are inside, the positives outside)</p>
<p>\(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2), \qquad w = (-0.4,\ 1)\)</p>`,
      moves: [
        { line: R`<b>The boundary is a circle</b> — negatives reach about 0.5 from the origin, the closest positive is the lone one at about \((0, 0.8)\). Take \(r^2 = 0.4\) (\(r \approx 0.63\), in between): <div class="formula">\[\text{positive} \iff -0.4 + (x_1^2 + x_2^2) > 0\]</div>`,
          why: R`<p>A circle around the origin is \(x_1^2 + x_2^2 = r^2\); outside it, \(x_1^2 + x_2^2 > r^2\). Move \(r^2\) to the left side. Any \(r\) between 0.5 and 0.8 works.</p>` },
        { line: R`<b>Select the pieces</b> — numbers = \(w\), the things they multiply = \(\varphi\): <div class="formula">\[\underbrace{\color{#e8912d}-0.4}_{\textstyle\color{#e8912d}w_0}\cdot\underbrace{\color{#4c8dff}1}_{\textstyle\color{#4c8dff}\varphi_0} + \underbrace{\color{#e8912d}1}_{\textstyle\color{#e8912d}w_1}\cdot\underbrace{\color{#4c8dff}(x_1^2 + x_2^2)}_{\textstyle\color{#4c8dff}\varphi_1} > 0\]</div>So \(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2)\), \(w = (-0.4,\ 1)\). Done.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{\varphi(x)}_{\textstyle 2\times 1} = -0.4\cdot 1 + 1\cdot(x_1^2 + x_2^2)\]<p>\(w = (-0.4, 1)\), \(\varphi(x) = (1, x_1^2 + x_2^2)\): 2 entries each · inner 2 = 2 ✓ · one number per sample, compared with 0 ✓</p>`,
          why: R`<p>"number · thing + number · thing \(> 0\)" is exactly a linear classifier \(w^\top\varphi(x) > 0\). The grader needs the explicit \(\varphi\). The full quadratic mapping \((1, x_1, x_2, x_1^2, x_2^2, x_1x_2)\) also works (the official answer mentions it).</p>`,
          extra: [{ label: "check it with numbers", html: R`<div class="tw"><table><thead><tr><th>point (from the figure)</th><th>\(-0.4 + x_1^2 + x_2^2\)</th><th>side</th></tr></thead><tbody>
<tr><td>farthest negative, \(r \approx 0.5\)</td><td>−0.4 + 0.25 = −0.15</td><td>−  ✓</td></tr>
<tr><td>closest positive, \((0, 0.8)\)</td><td>−0.4 + 0.64 = 0.24</td><td>+  ✓</td></tr></tbody></table></div>` },
                  { label: "the full-mapping solution, written out (r ≈ ½)", html: R`<p><b>1. What I see.</b> The negatives sit inside a circle around (0, 0) of radius about ½; the positives are outside it. So: positive \(\iff x_1^2 + x_2^2 > r^2\) with \(r \approx \tfrac12\), i.e. \(r^2 = 0.25\).</p>
<p><b>2. The mapping</b> (this is what's graded):</p>
\[\varphi(x_1, x_2) = (1,\ x_1,\ x_2,\ x_1^2,\ x_2^2,\ x_1x_2)\]
<p><b>3. The weights</b> — one per entry of \(\varphi\): the number in front of each feature in "\(x_1^2 + x_2^2 - 0.25\)":</p>
\[w = (-0.25,\ 0,\ 0,\ 1,\ 1,\ 0)\]
<p><b>4. What the classifier computes</b> — \(w^\top\varphi(x)\) = multiply entry by entry, then add:</p>
<div class="tw"><table><thead><tr><th>entry</th><th>\(w\)</th><th>\(\varphi(x)\)</th><th>\(w \times \varphi\)</th></tr></thead><tbody>
<tr><td>1</td><td>−0.25</td><td>1</td><td>−0.25</td></tr>
<tr><td>2</td><td>0</td><td>\(x_1\)</td><td>0</td></tr>
<tr><td>3</td><td>0</td><td>\(x_2\)</td><td>0</td></tr>
<tr><td>4</td><td>1</td><td>\(x_1^2\)</td><td>\(x_1^2\)</td></tr>
<tr><td>5</td><td>1</td><td>\(x_2^2\)</td><td>\(x_2^2\)</td></tr>
<tr><td>6</td><td>0</td><td>\(x_1x_2\)</td><td>0</td></tr>
<tr><td colspan="3"><b>add them up</b></td><td>\(x_1^2 + x_2^2 - 0.25\)</td></tr></tbody></table></div>
<p>So the classifier "predict positive iff \(w^\top\varphi(x) > 0\)" is exactly</p>
\[x_1^2 + x_2^2 - 0.25 > 0 \iff x_1^2 + x_2^2 > 0.25 \iff \text{distance from } (0,0) > 0.5\]
<p>= outside the circle → positive; inside → negative. That's the circle from step 1.</p>
<p><b>5. Check with two points from the figure:</b> the centre (0, 0): \(0 + 0 - 0.25 = -0.25 < 0\) → negative ✓. The closest positive, about (0, 0.8): \(0 + 0.64 - 0.25 = 0.39 > 0\) → positive ✓.</p>
<p><b>Conclusion to write:</b> "A single \(w\) on the features \(\varphi(x)\) separates the data, so the data is linearly separable in the transformed feature space."</p>
<p class="muted">Size check: \(w\) and \(\varphi(x)\) have 6 entries each → \(w^\top\varphi(x)\) = (1×6)(6×1) = one number per sample ✓. (The negatives reach about 0.5, so a hair more, e.g. 0.55, is safer — ½ is what the official answer uses and is accepted.)</p>` },
                  { label: "why \"the more general quadratic variety\"? (pictures)", html: R`<p><b>1. The features decide which boundaries are possible.</b> A linear classifier on \(\varphi\) draws its boundary where \(w^\top\varphi(x) = 0\). With your map \(\varphi = (1,\ x_1^2 + x_2^2)\) that's</p>
\[w_0 + w_1(x_1^2 + x_2^2) = 0 \;\Rightarrow\; x_1^2 + x_2^2 = -\tfrac{w_0}{w_1}\]
<p>— always a circle <b>around (0, 0)</b>. The two weights can only change its radius. Nothing else.</p>
<p><b>2. With all six quadratic features</b> \(\varphi = (1, x_1, x_2, x_1^2, x_2^2, x_1x_2)\), the boundary is</p>
\[w_0 + w_1x_1 + w_2x_2 + w_3x_1^2 + w_4x_2^2 + w_5x_1x_2 = 0\]
<p>and six weights can draw any of these (and parabolas, hyperbolas, straight lines too):</p>
<div class="fig"><svg viewBox="0 0 600 420" width="600" role="img" aria-label="Four quadratic boundaries"><rect x="4" y="4" width="292" height="202" rx="8" style="fill:none;stroke:var(--line)"/><text x="14" y="26" font-size="14" font-weight="700" fill="currentColor">circle at (0, 0)</text><line x1="20" y1="115" x2="280" y2="115" style="stroke:var(--muted)"/><line x1="150" y1="40" x2="150" y2="198" style="stroke:var(--muted)"/><text x="282" y="109" text-anchor="end" font-size="12" fill="currentColor">x₁</text><text x="156" y="50" font-size="12" fill="currentColor">x₂</text><text x="200" y="130" text-anchor="middle" font-size="10" fill="currentColor">1</text><text x="100" y="130" text-anchor="middle" font-size="10" fill="currentColor">−1</text><circle cx="150" cy="115" r="50" style="fill:var(--accent-soft);fill-opacity:.7;stroke:var(--accent)" stroke-width="2.5"/><rect x="304" y="4" width="292" height="202" rx="8" style="fill:none;stroke:var(--line)"/><text x="314" y="26" font-size="14" font-weight="700" fill="currentColor">circle at (1, 0)</text><line x1="320" y1="115" x2="580" y2="115" style="stroke:var(--muted)"/><line x1="450" y1="40" x2="450" y2="198" style="stroke:var(--muted)"/><text x="582" y="109" text-anchor="end" font-size="12" fill="currentColor">x₁</text><text x="456" y="50" font-size="12" fill="currentColor">x₂</text><text x="500" y="130" text-anchor="middle" font-size="10" fill="currentColor">1</text><text x="400" y="130" text-anchor="middle" font-size="10" fill="currentColor">−1</text><circle cx="500" cy="115" r="50" style="fill:var(--accent-soft);fill-opacity:.7;stroke:var(--accent)" stroke-width="2.5"/><rect x="4" y="214" width="292" height="202" rx="8" style="fill:none;stroke:var(--line)"/><text x="14" y="236" font-size="14" font-weight="700" fill="currentColor">ellipse (narrow)</text><line x1="20" y1="325" x2="280" y2="325" style="stroke:var(--muted)"/><line x1="150" y1="250" x2="150" y2="408" style="stroke:var(--muted)"/><text x="282" y="319" text-anchor="end" font-size="12" fill="currentColor">x₁</text><text x="156" y="260" font-size="12" fill="currentColor">x₂</text><text x="200" y="340" text-anchor="middle" font-size="10" fill="currentColor">1</text><text x="100" y="340" text-anchor="middle" font-size="10" fill="currentColor">−1</text><ellipse cx="150" cy="325" rx="25.0" ry="50.0" style="fill:var(--accent-soft);fill-opacity:.7;stroke:var(--accent)" stroke-width="2.5" transform="rotate(0 150 325)"/><rect x="304" y="214" width="292" height="202" rx="8" style="fill:none;stroke:var(--line)"/><text x="314" y="236" font-size="14" font-weight="700" fill="currentColor">tilted ellipse</text><line x1="320" y1="325" x2="580" y2="325" style="stroke:var(--muted)"/><line x1="450" y1="250" x2="450" y2="408" style="stroke:var(--muted)"/><text x="582" y="319" text-anchor="end" font-size="12" fill="currentColor">x₁</text><text x="456" y="260" font-size="12" fill="currentColor">x₂</text><text x="500" y="340" text-anchor="middle" font-size="10" fill="currentColor">1</text><text x="400" y="340" text-anchor="middle" font-size="10" fill="currentColor">−1</text><ellipse cx="450" cy="325" rx="70.7" ry="40.8" style="fill:var(--accent-soft);fill-opacity:.7;stroke:var(--accent)" stroke-width="2.5" transform="rotate(45 450 325)"/></svg></div><p>Each shape is one \(w\) — the number in front of each feature (bold = used, grey 0 = not needed):</p>
<div class="tw"><table><thead><tr><th>boundary</th><th>1</th><th>x₁</th><th>x₂</th><th>x₁²</th><th>x₂²</th><th>x₁x₂</th></tr></thead><tbody><tr><td>circle at (0, 0), radius 1</td><td><b>−1</b></td><td class="muted">0</td><td class="muted">0</td><td><b>1</b></td><td><b>1</b></td><td class="muted">0</td></tr><tr><td>circle at (1, 0), radius 1</td><td class="muted">0</td><td><b>−2</b></td><td class="muted">0</td><td><b>1</b></td><td><b>1</b></td><td class="muted">0</td></tr><tr><td>ellipse, narrow</td><td><b>−1</b></td><td class="muted">0</td><td class="muted">0</td><td><b>4</b></td><td><b>1</b></td><td class="muted">0</td></tr><tr><td>tilted ellipse</td><td><b>−1</b></td><td class="muted">0</td><td class="muted">0</td><td><b>1</b></td><td><b>1</b></td><td><b>1</b></td></tr><tr><td><i>this question</i> (r² = 0.4)</td><td><b>−0.4</b></td><td class="muted">0</td><td class="muted">0</td><td><b>1</b></td><td><b>1</b></td><td class="muted">0</td></tr></tbody></table></div><p>E.g. circle at (1, 0): \((x_1 - 1)^2 + x_2^2 = 1\) → multiply out: \(x_1^2 - 2x_1 + 1 + x_2^2 = 1\) → \(0\cdot 1 - 2\cdot x_1 + 1\cdot x_1^2 + 1\cdot x_2^2 = 0\). The \(-2x_1\) needs the feature \(x_1\), which your map doesn't have.</p>
<p><b>3. Where your map fails</b> (made-up points, not from the exam): the inside class sits in a circle centred at (1, 0).</p>
<div class="fig"><svg viewBox="0 0 600 262" width="600" role="img" aria-label="Where the circle-at-origin map fails"><line x1="20" y1="130" x2="400" y2="130" style="stroke:var(--muted)"/><line x1="170" y1="8" x2="170" y2="254" style="stroke:var(--muted)"/><text x="398" y="124" text-anchor="end" font-size="12" fill="currentColor">x₁</text><text x="176" y="20" font-size="12" fill="currentColor">x₂</text><circle cx="230" cy="130" r="60" style="fill:var(--accent-soft);fill-opacity:.7;stroke:var(--accent)" stroke-width="2.5"/><circle cx="284.0" cy="130" r="8" style="fill:var(--got)"/><text x="296.0" y="122" font-size="13" font-weight="700" fill="currentColor">A</text><circle cx="182.0" cy="130" r="8" style="fill:var(--got)"/><text x="186.0" y="118" font-size="13" font-weight="700" fill="currentColor">C</text><rect x="163" y="213.0" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="182" y="225.0" font-size="13" font-weight="700" fill="currentColor">B</text><g font-size="13" fill="currentColor"><circle cx="420" cy="30" r="7" style="fill:var(--got)"/><text x="434" y="35">inside class</text><rect x="413" y="52" width="14" height="14" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2.5"/><text x="434" y="64">outside class</text><line x1="410" y1="90" x2="430" y2="90" style="stroke:var(--accent)" stroke-width="2.5"/><text x="434" y="95">true boundary:</text><text x="434" y="112">circle at (1, 0)</text><text x="410" y="160" font-weight="700">x₁² + x₂²:</text><text x="410" y="182">C = (0.2, 0) → 0.04  in</text><text x="410" y="204">B = (0, −1.5) → 2.25  out</text><text x="410" y="226">A = (1.9, 0) → 3.61  in</text></g></svg></div><p>Your map only sees \(x_1^2 + x_2^2\), the squared distance from (0, 0). Sorted by it: C 0.04 (inside) · B 2.25 (outside) · A 3.61 (inside) — the same "1 · 0 · 1" pattern as part 4. A single cut on this one number (either direction) can't put B on one side and both A and C on the other ✗. With the six features it's easy: \(w = (0, -2, 0, 1, 1, 0)\) is exactly the blue circle (negative = inside).</p>
<p><b>4. So why "typically":</b> in real data you rarely know the centre or the exact shape. The general map covers every such shape; training finds \(w\), and the weights it doesn't need come out 0 (for this question it would learn about \((-0.4, 0, 0, 1, 1, 0)\) — your circle). <b>The price:</b> 6 weights instead of 2, and it grows fast — all terms up to degree 3 in 2 features is already 10. That cost is what part 6's kernel fixes: \((1 + u^\top v)^2\) gives the dot product of these same six features (with √2's) without building them.</p>
<p><b>In the exam:</b> here the picture shows a circle around (0, 0), so your map is enough and gets the points — "any mapping that works" is accepted.</p>`}] },
      ],
      compare: R`Same \(\varphi = (1, x_1^2 + x_2^2)\) as the official answer. It uses \(r \approx \tfrac12\); that is right at the edge of the negatives (they reach ≈ 0.5), so \(r^2 = 0.4\) (\(r \approx 0.63\)) is safer. Only \(\varphi\) is graded, so either \(r\) is fine. It also writes \(\varphi(x_1, x_1)\) for \(\varphi(x_1, x_2)\).`,
      slip: R`\(\varphi(x_1, x_1)\) is a typo for \(\varphi(x_1, x_2)\). Also, \(r \approx \tfrac12\) sits right on the edge of the negatives; \(r \approx 0.63\) (\(r^2 = 0.4\)) is safer. Only \(\varphi\) is graded, so \((1, x_1^2 + x_2^2)\) stands.`,
    },

    "2025B-q3.6": {
      point: R`"Converges" is the key word: the dual Perceptron converges exactly when the data is separable in the kernel's features. So take features where it <b>is</b> separable (part 5's full quadratic), and make the kernel their dot product, \(K(u, v) = \varphi(u)^\top\varphi(v)\).`,
      start: R`<p><b>Features:</b> \(\varphi(x) = \square\)</p>
<p><b>Kernel:</b></p>
\[K(u, v) = \varphi(u)^\top\varphi(v) = \;\square\]
<p><b>Converges because:</b> □</p>`,
      answer: R`<p><b>Features:</b> \(\varphi(x) = (1,\ x_1,\ x_2,\ x_1^2,\ x_2^2,\ x_1x_2)\)</p>
<p><b>Kernel:</b></p>
\[\begin{aligned}K(u, v) = \varphi(u)^\top\varphi(v) = \;&1 + u_1v_1 + u_2v_2\\ &+ u_1^2v_1^2 + u_2^2v_2^2 + u_1u_2v_1v_2\end{aligned}\]
<p><b>Converges because:</b> the dual Perceptron with this \(K\) is the Perceptron run on \(\varphi(x)\). In \(\varphi\)-space the data is linearly separable (part 5: \(w = (-0.25, 0, 0, 1, 1, 0)\), i.e. positive iff \(x_1^2 + x_2^2 > 0.25\)). The Perceptron converges on linearly separable data, so the dual Perceptron with this kernel converges.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Guarantee convergence" → the Perceptron converges only on separable data, and with \(K\) it runs on \(\varphi(x)\). So: find <b>features where the data is separable</b>, then turn them into a kernel.`,
          remember: R`<p>The Perceptron converges iff the data is linearly separable. The dual Perceptron with a kernel \(K\) = the Perceptron run on \(\varphi(x)\). Not on the sheet.</p>` },
        { line: R`<b>Features where it's separable</b> — part 5 already found them: the full quadratic map, with the circle \(x_1^2 + x_2^2 > 0.25\) as a line, \(w = (-0.25, 0, 0, 1, 1, 0)\): <div class="formula">\[\varphi(x) = (1,\ x_1,\ x_2,\ x_1^2,\ x_2^2,\ x_1x_2)\]</div>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 6}\,\underbrace{\varphi(x)}_{\textstyle 6\times 1} = x_1^2 + x_2^2 - 0.25\]<p>one weight per feature ✓ · positive outside the circle ✓</p>` },
        { line: R`<b>Turn the features into a kernel</b> — a kernel is the dot product of the two feature lists. So dot \(\varphi(u)\) and \(\varphi(v)\), entry × entry, added up: <div class="formula">\[\begin{aligned}K(u, v) = \;&1 + u_1v_1 + u_2v_2\\ &+ u_1^2v_1^2 + u_2^2v_2^2 + u_1u_2v_1v_2\end{aligned}\]</div>`,
          remember: R`\[K(u, v) = \varphi(u)^\top\varphi(v)\]<p>A kernel = map both samples, dot the lists. From class: \((1 + u^\top v)^2\) = these same six features (with \(\sqrt2\)'s) — writing that also gets full points. Not on the sheet.</p>`,
          size: R`\[\underbrace{\varphi(u)^\top}_{\textstyle 1\times 6}\,\underbrace{\varphi(v)}_{\textstyle 6\times 1} = \text{one number}\]<p>one number per pair of samples ✓</p>`,
          extra: [{ label: "the dot product, entry by entry", html: R`<div class="tw"><table><thead><tr><th>\(\varphi(u)\)</th><th>\(\varphi(v)\)</th><th>product</th></tr></thead><tbody>
<tr><td>\(1\)</td><td>\(1\)</td><td>\(1\)</td></tr>
<tr><td>\(u_1\)</td><td>\(v_1\)</td><td>\(u_1v_1\)</td></tr>
<tr><td>\(u_2\)</td><td>\(v_2\)</td><td>\(u_2v_2\)</td></tr>
<tr><td>\(u_1^2\)</td><td>\(v_1^2\)</td><td>\(u_1^2v_1^2\)</td></tr>
<tr><td>\(u_2^2\)</td><td>\(v_2^2\)</td><td>\(u_2^2v_2^2\)</td></tr>
<tr><td>\(u_1u_2\)</td><td>\(v_1v_2\)</td><td>\(u_1u_2v_1v_2\)</td></tr></tbody></table></div><p>Add the last column → \(K(u, v)\).</p>` },
                  { label: "where (1 + uᵀv)² comes from", html: R`<p>Multiply it out: \((1 + u_1v_1 + u_2v_2)^2 = 1 + 2u_1v_1 + 2u_2v_2 + u_1^2v_1^2 + u_2^2v_2^2 + 2u_1u_2v_1v_2\) — the same six terms, three with a 2.</p><p>A 2 = \(\sqrt2\cdot\sqrt2\), so it's the features \((1, \sqrt2x_1, \sqrt2x_2, x_1^2, x_2^2, \sqrt2x_1x_2)\). A \(\sqrt2\) on a feature doesn't change what's separable.</p>` }] },
        { line: R`<b>Why it converges</b> — write step 1's chain with step 2's result: the dual Perceptron with this \(K\) = the Perceptron on \(\varphi(x)\); there the data is separable; the Perceptron converges on separable data. Done.` },
      ],
      compare: R`The official answer uses \((1 + u^\top v)^2\) — the same features with \(\sqrt2\)'s (step 3's second extra) — and the same convergence argument (step 4).`,
    },

    // ─────────────────────────────── 2026-B Q3 ───────────────────────────────
    "2026B-q3.1": {
      point: R`\(\Phi(0) = \tfrac12\) and \(\Phi\) only goes up, so \(\Phi(w^\top x) \ge \tfrac12\) exactly when \(w^\top x \ge 0\). The sign of the score is the whole answer — no integral.`,
      start: R`<p>\(w = (w_0, w_1, w_2) = (\square, \square, \square)\)</p>
<p>Sample 1: \(\;w^\top x = \square \lt 0 \;\Rightarrow\; \Phi(\square) \lt \Phi(0) = \tfrac12 \;\Rightarrow\;\) negative</p>
<p>Sample 2: \(\;w^\top x = \square \gt 0 \;\Rightarrow\; \Phi(\square) \gt \Phi(0) = \tfrac12 \;\Rightarrow\;\) positive</p>`,
      answer: R`<p>\(w = (w_0, w_1, w_2) = (1, -1, 2)\)</p>
<p>Sample 1: \(\;w^\top x = 1 - 1\cdot 2 + 2\cdot 0 = -1 \lt 0\) \(\;\Rightarrow\; \Phi(-1) \lt \Phi(0) = \tfrac12 \;\Rightarrow\;\) negative</p>
<p>Sample 2: \(\;w^\top x = 1 - 1\cdot 0 + 2\cdot 1 = 3 \gt 0\) \(\;\Rightarrow\; \Phi(3) \gt \Phi(0) = \tfrac12 \;\Rightarrow\;\) positive</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Classify" = is \(\hat y = \Phi(w^\top x)\) above ½? First the scores. \(w\) has 3 numbers for 2 features, so \(w = (w_0, w_1, w_2) = (1, -1, 2)\): <div class="formula">\[\begin{aligned}\text{sample 1: }&1 - 1\cdot 2 + 2\cdot 0 = -1\\ \text{sample 2: }&1 - 1\cdot 0 + 2\cdot 1 = 3\end{aligned}\]</div>`,
          size: R`\[\underbrace{\begin{bmatrix}1&2&0\\1&0&1\end{bmatrix}}_{\textstyle 2\times 3}\underbrace{\begin{bmatrix}1\\-1\\2\end{bmatrix}}_{\textstyle 3\times 1} = \underbrace{\begin{bmatrix}-1\\3\end{bmatrix}}_{\textstyle 2\times 1}\]<p>2 samples × (1 + 2 features) · inner 3 = 3 ✓ · one score per sample ✓ · one row alone: \(w^\top x^{(i)}\) = (1×3)(3×1) = one number</p>`,
          extra: [{ label: "reading the question, line by line (what each sentence tells you)", html: R`<p><b>"similar to logistic regression (LoR)"</b> → a hint: everything works like LoR, with \(\Phi\) in the place of \(\sigma\).</p>
<p><b>"\(\hat y_w(x)\) is the probability of positive classification"</b> → \(\hat y\) is a number between 0 and 1: how sure the model is that \(x\) is positive. To <i>classify</i>, ask: is it more likely positive than not? → positive when \(\hat y \ge \tfrac12\).</p>
<p><b>"\(\hat y_w(x) = \Phi(w^\top x)\)"</b> → two steps, exactly like LoR's \(\sigma(w^\top x)\):</p>
<p>1. the score \(w^\top x = w_0 + w_1x_1 + w_2x_2\): any number, negative or positive.</p>
<p>2. \(\Phi\) squashes the score into 0…1, so it can be a probability.</p>
<p><b>"\(\Phi\) is the CDF of the standard normal, \(\Phi(t) = \int_{-\infty}^t \varphi(u)\,du\)"</b> → the integral is just the <i>definition</i>. You never compute it. In words: \(\varphi\) is the bell curve centred at 0, and \(\Phi(t)\) = the area under the bell to the left of \(t\). All you need is its shape:</p>
<p>· far left (\(t\) very negative): almost no area → close to 0</p>
<p>· at \(t = 0\): the bell is symmetric, so exactly half the area → \(\Phi(0) = \tfrac12\)</p>
<p style="margin-left:1.2em"><i>Why symmetric? Read it off \(\varphi\)'s formula in the question: \(t\) only appears as \(t^2\), and \((-2)^2 = 2^2\), so \(\varphi(-2) = \varphi(2)\): same height at \(-t\) and \(t\). The left half mirrors the right half, so they have equal area. All the area together is 1 (it's a probability), so each half is ½. (Or from class: "standard normal" = mean 0, and the bell is centred on its mean.)</i></p>
<p>· moving right always adds area → \(\Phi\) only goes up, towards 1</p>
<p>That's the same shape as \(\sigma\) (\(\sigma(0) = \tfrac12\), goes up from 0 to 1).</p>
<p><b>"\(\varphi\)", "probit function", "BCE loss"</b> → not used in part 1. \(\varphi\) is for part 3 (the derivative of \(\Phi\) is \(\varphi\)), BCE for parts 2–4.</p>
<p><b>Put together:</b> positive ⟺ \(\Phi(\text{score}) \ge \tfrac12 = \Phi(0)\) ⟺ score \(\ge 0\) (because \(\Phi\) only goes up). So part 1 = compute two scores, look at their signs.</p>` }] },
        { line: R`<b>The sign decides</b> — the question: \(\hat y_w(x)\) is the probability of positive, so positive when \(\hat y \ge \tfrac12\). \(\Phi\) goes up and \(\Phi(0) = \tfrac12\): you never need a value like \(\Phi(-1)\), only which side of ½. <div class="formula">\[\begin{aligned}-1 \lt 0 &\Rightarrow \text{sample 1 negative}\\ 3 \gt 0 &\Rightarrow \text{sample 2 positive}\end{aligned}\]</div>Done.`,
          remember: R`\[\text{positive} \iff \hat y_w(x) \ge \tfrac12\]<p>The ½ cut from class (in LoR: \(\sigma(w^\top x) \ge \tfrac12 \iff w^\top x \ge 0\)). Not on the sheet: [sheet: Logistic regression posterior model] gives only the probability. Here \(\Phi\) plays \(\sigma\)'s role.</p><p>The sheet's posterior is \(\sigma(w_0 + w^\top x)\), with \(w_0\) outside; here the question's \(w^\top x = w_0 + \sum_i w_ix_i\) already has it inside (a 1 in front of \(x\)).</p>`,
          why: R`<p>\(\Phi(t)\) = area under the bell left of \(t\). The bell is symmetric, so half the area is left of 0: \(\Phi(0) = \tfrac12\). Moving \(t\) right adds area, so \(\Phi\) goes up. So \(\Phi(-1) \lt \Phi(0) = \tfrac12\) and \(\Phi(3) \gt \tfrac12\), whatever their exact values.</p>`,
          extra: [{ label: "your Moed B", html: R`<p>You had −1 and 3 right, then tried to integrate \(\Phi(-1)\) by hand and crossed it all out (0/4). The sign plus the sentence above was all four points.</p>` }] },
      ],
      compare: R`Same as the official solution: classification by \(\mathrm{sign}(w^\top x)\), scores −1 and 3.`,
    },

    "2026B-q3.2": {
      point: R`The loss is printed in the question. The only new thing is what \(\hat y\) is: here \(\hat y_w(x^{(i)}) = \Phi(t_i)\), so substitute it.`,
      start: R`<p>With \(t_i = w^\top x^{(i)}\): \(\;\hat y_w(x^{(i)}) = \square\)</p>
\[L(w) = -\frac1n\sum_{i=1}^n\Big[\;\square\;\Big]\]`,
      answer: R`<p>With \(t_i = w^\top x^{(i)}\): \(\;\hat y_w(x^{(i)}) = \Phi(t_i)\)</p>
\[\begin{aligned}L(w) = -\frac1n\sum_{i=1}^n\Big[\,&y_i\log\Phi(t_i)\\ &+ (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The loss is printed above; only \(\hat y\) is new. The model: \(\hat y_w(x^{(i)}) = \Phi(w^\top x^{(i)}) = \Phi(t_i)\). "Simplify with \(t_i\)" just means: write \(t_i\) instead of \(w^\top x^{(i)}\).`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times(p+1)}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1} = \underbrace{t_i}_{\textstyle \text{number}}\]<p>\(w_0, \dots, w_p\) and \(x^{(i)}\) with its \(x_0 = 1\) · inner p + 1 = p + 1 ✓ · so \(\Phi(t_i)\) is one number per sample, and so is each log in \(L\) ✓</p>` },
        { line: R`<b>Put it in</b> — copy the printed BCE (the sheet's, with \(\Phi\) for \(\sigma\): [sheet: Binary cross-entropy (BCE) loss]) and replace every \(\hat y_w(x^{(i)})\) by \(\Phi(t_i)\): <div class="formula">\[\begin{aligned}L(w) = -\frac1n\sum_{i=1}^n\Big[\,&y_i\log\Phi(t_i)\\ &+ (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\end{aligned}\]</div>Done.`,
          why: R`<p>Nothing else simplifies for \(\Phi\): this is the whole answer.</p>` },
      ],
      compare: R`Identical to the official solution.`,
    },

    "2026B-q3.3": {
      point: R`Same derivation as LoR, with \(\Phi\) for \(\sigma\): derivative by one weight \(w_j\) (each log → \(\frac{1}{(\dots)}\cdot(\pm\varphi(t_i))\cdot x^{(i)}_j\)) → constant \(-\frac1n\) out, the rest \(= X_j^\top\)(a list) → stacked, \(X^\top\)(the list) = the hint's \(\sum_i z_i x^{(i)}\). So \(z_i\) = what multiplies \(x^{(i)}\), over one denominator (unlike \(\sigma\), nothing cancels).`,
      start: R`<p><b>The function (part 2):</b></p>
\[L(w) = \;\square\]
<p><b>Derivative by one weight \(w_j\):</b></p>
\[\frac{\partial L}{\partial w_j} = \;\square\; = \;\square\]
<p><b>All weights (the gradient):</b></p>
\[\nabla L(w) = \;\square\; = \sum_{i} z_i\,x^{(i)}\]
<p>(list, entry \(i\) = □)</p>
\[z_i = \;\square\; = \;\square\]`,
      answer: R`<p><b>The function (part 2):</b></p>
\[\begin{aligned}L(w) = -\frac1n\sum_{i}\Big[\,&y_i\log\Phi(t_i)\\ &+ (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\end{aligned}\]
<p><b>Derivative by one weight \(w_j\):</b></p>
\[\begin{aligned}\frac{\partial L}{\partial w_j} &= -\frac1n\sum_{i}\Big[y_i\,\frac{\varphi(t_i)}{\Phi(t_i)}\,x^{(i)}_j\\ &\qquad - (1 - y_i)\,\frac{\varphi(t_i)}{1 - \Phi(t_i)}\,x^{(i)}_j\Big]\\ &= -\frac1n\sum_{i}\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\,x^{(i)}_j\end{aligned}\]
<p><b>All weights (the gradient):</b></p>
\[\nabla L(w) = -\frac1n\,X^\top(\text{list}) = \sum_{i} z_i\,x^{(i)}\]
<p>(list, entry \(i\) = \(\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\); \(X\) has one row per sample, with a 1 in front)</p>
\[\begin{aligned}z_i &= -\frac1n\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\\ &= \frac{\big(\Phi(t_i) - y_i\big)\,\varphi(t_i)}{n\,\Phi(t_i)\,\big(1 - \Phi(t_i)\big)}\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The hint gives the target, \(\nabla L = \sum_i z_i\,x^{(i)}\): derive by one weight, stack, read off \(z_i\). <b>The function</b> — part 2's answer: <div class="formula">\[\begin{aligned}L(w) = -\frac1n\sum_{i}\Big[\,&y_i\log\Phi(t_i)\\ &+ (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\end{aligned}\]</div>`,
          why: R`<p>One bracket per sample, each with two logs. \(y_i\) and \(1 - y_i\) are just numbers (0 or 1) in front; only the logs contain \(w\), through \(t_i = w_0 + w_1x^{(i)}_1 + \dots + w_px^{(i)}_p\).</p>` },
        { line: R`<b>Derivative by one weight \(w_j\)</b> — each log: 1/(…) · (±\(\varphi(t_i)\)) · (the number in front of \(w_j\)), like \(\ln(x^2+3) \to \frac{1}{x^2+3}\cdot 2x\). Before pulling out: <div class="formula">\[\begin{aligned}\frac{\partial L}{\partial w_j} = -\frac1n\sum_{i}\Big[&y_i\,\frac{\varphi(t_i)}{\Phi(t_i)}\,x^{(i)}_j\\ &- (1 - y_i)\,\frac{\varphi(t_i)}{1 - \Phi(t_i)}\,x^{(i)}_j\Big]\end{aligned}\]</div>Both share \(\varphi(t_i)\,x^{(i)}_j\) — pull it out: <div class="formula">\[\begin{aligned}\frac{\partial L}{\partial w_j} = -\frac1n\sum_{i}\,&\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\\ &\cdot\varphi(t_i)\,x^{(i)}_j\end{aligned}\]</div>`,
          why: R`<p><b>Each log, by \(w_j\):</b></p>
\[\frac{\partial}{\partial w_j}\log\Phi(t_i) = \frac{1}{\Phi(t_i)}\cdot\varphi(t_i)\cdot x^{(i)}_j\]
\[\begin{aligned}&\frac{\partial}{\partial w_j}\log\big(1 - \Phi(t_i)\big)\\ &= \frac{1}{1 - \Phi(t_i)}\cdot\big(-\varphi(t_i)\big)\cdot x^{(i)}_j\end{aligned}\]
<p>Three layers, outside to inside; multiply their derivatives (the chain rule, as in \(\ln(x^2+3)\)):</p>
<ul><li>\(\log(\dots) \to \frac{1}{(\dots)}\) — the derivative of \(\ln u\) is \(1/u\).</li>
<li>\(\Phi(t_i) \to \varphi(t_i)\) — observation (1), given in the question. For the second log the inside is \(1 - \Phi(t_i)\), so its derivative is \(-\varphi(t_i)\).</li>
<li>\(t_i \to x^{(i)}_j\) — \(t_i\) is a plain sum, so its derivative by \(w_j\) is the number in front of \(w_j\), as in Regression (2025-C Q1.2, move 2).</li></ul>
<p>\(y_i\) and \(1 - y_i\) are plain numbers in front: they ride along.</p>
<p>Optional, extension sheet only: [sheet: Chain rule], [sheet: Derivative of loga (x)].</p>` },
        { line: R`<b>Write it with matrices</b> — \(-\frac1n\) is a constant: out of the sum. The rest (entry × entry, added up) is a dot product; \(t_i\) = entry \(i\) of \(Xw\): <div class="formula">\[\begin{aligned}\frac{\partial L}{\partial w_j} &= \underbrace{\color{#e8912d}-\frac1n}_{\textstyle\color{#e8912d}\text{constant}}\sum_i x^{(i)}_j\cdot(\dots)\,\varphi(t_i)\\ &= -\frac1n\,X_j^\top\,(\text{list})\end{aligned}\]</div><div class="formula">\[\text{list} = \begin{bmatrix}\vdots\\ \Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\\ \vdots\end{bmatrix}\leftarrow\text{entry } i\]</div>\(X_j\) = column \(j\) of \(X\).`,
          size: R`\[\underbrace{X_j^\top}_{\textstyle 1\times n}\,\underbrace{(\text{list})}_{\textstyle n\times 1} = \text{one number}\]<p>inner n = n ✓ · one number, like \(\frac{\partial L}{\partial w_j}\) ✓ · without the \(^\top\): (n×1)(n×1) — inner 1 ≠ n ✗</p>`,
          why: R`<p>\(X_j\) = (sample 1's \(x_j\), sample 2's \(x_j\), …) — reading down column \(j\) of \(X\) (one row per sample, with the column of 1s in front). The list = (sample 1's \((\dots)\varphi(t_1)\), sample 2's, …). The sum multiplies them entry by entry and adds up: that's exactly a dot product, \(X_j^\top\cdot\) the list. For \(w_0\), \(X_0\) is the column of 1s.</p>
<p><b>Why only the \(-\frac1n\) comes out:</b> only things without an \(i\) (the same for every sample) can go in front of \(\sum_i\). \(x^{(i)}_j\), the bracket and \(\varphi(t_i)\) change from sample to sample, so they can't; they get packed into lists instead (\(X_j\) and the list above), and the sum becomes the dot product of the two lists.</p>` },
        { line: R`<b>From one weight to \(\nabla L\)</b> — stack move 3 for \(w_0, \dots, w_p\); only \(X_j\) changes, the rest is constant → out. \(X^\top\)(a list) = the hint's \(\sum_i z_i x^{(i)}\); \(z_i\) = what multiplies \(x^{(i)}\): <div class="formula">\[\begin{aligned}\nabla L &= \begin{bmatrix}-\frac1n X_0^\top(\text{list})\\ \vdots\\ -\frac1n X_p^\top(\text{list})\end{bmatrix}\\ &= \underbrace{\color{#e8912d}-\frac1n}_{\textstyle\color{#e8912d}\text{constant}}\;\underbrace{\begin{bmatrix}X_0^\top\\ \vdots\\ X_p^\top\end{bmatrix}}_{\textstyle X^\top}\;\underbrace{\color{#e8912d}(\text{list})}_{\textstyle\color{#e8912d}\text{constant}}\\ &= \sum_i z_i\,x^{(i)}\end{aligned}\]</div><div class="formula">\[z_i = -\frac1n\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\]</div>`,
          size: R`\[\underbrace{X^\top}_{\textstyle (p+1)\times n}\,\underbrace{z}_{\textstyle n\times 1} = \underbrace{\nabla L}_{\textstyle (p+1)\times 1} \qquad \underbrace{z_i}_{\text{number}}\,\underbrace{x^{(i)}}_{\textstyle (p+1)\times 1}\]<p>The \(p + 1\) rows \(X_j^\top\) (each 1×n) stacked = (p+1)×n = \(X^\top\) ✓ · inner n = n ✓ · one entry per knob, like \(w\) ✓ · the hint's way: a number × a sample, added over n samples → (p+1)×1 too ✓ · as code (part 4, blank 1): <code>X_b.T @ z</code></p><p>Wrong order: \(Xz\) = (n×(p+1))(n×1) — inner p + 1 ≠ n ✗</p>`,
          why: R`<p>The rows of \(X^\top\) are the columns of \(X\): row 0 = \(X_0^\top\), …, row \(p\) = \(X_p^\top\). The \(-\frac1n\) can go back inside the list: that's why it ends up in \(z_i\).</p>
<p>Why \(X^\top z = \sum_i z_i x^{(i)}\): the <b>columns</b> of \(X^\top\) are the samples \(x^{(i)}\) (with their 1), and a matrix times a list = column 1 × entry 1 + column 2 × entry 2 + … = \(z_1x^{(1)} + z_2x^{(2)} + \dots\) That's the hint's form.</p>`,
          extra: [{ label: "without matrices: match the sums", html: R`<p>Entry \(j\) of the hint's \(\sum_i z_i\,x^{(i)}\) is \(\sum_i z_i\,x^{(i)}_j\) (entry \(j\) of sample \(i\) is \(x^{(i)}_j\)).</p>
<p>Move 2, with the \(-\frac1n\) moved inside the sum: \(\;\frac{\partial L}{\partial w_j} = \sum_i (\dots)\cdot x^{(i)}_j\), where \((\dots) = -\frac1n\Big[\frac{y_i}{\Phi(t_i)} - \frac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\).</p>
<p>Both are "\(\sum_i\) (a number for sample \(i\)) \(\cdot\,x^{(i)}_j\)", for every \(j\). Match term by term: \(z_i\) = that \((\dots)\). Same \(z_i\) as above — moves 3–4 aren't needed for the points.</p>` }] },
        { line: R`<b>Group common terms</b> — one denominator; the minus flips \(y_i - \Phi\) into \(\Phi - y_i\): <div class="formula">\[z_i = \frac{\big(\Phi(t_i) - y_i\big)\,\varphi(t_i)}{n\,\Phi(t_i)\,\big(1 - \Phi(t_i)\big)}\]</div>That's the answer.`,
          why: R`<p>Write \(\Phi\) for \(\Phi(t_i)\):</p>
\[\begin{aligned}\frac{y_i}{\Phi} - \frac{1 - y_i}{1 - \Phi} &= \frac{y_i(1 - \Phi) - (1 - y_i)\Phi}{\Phi(1 - \Phi)}\\ &= \frac{y_i - y_i\Phi - \Phi + y_i\Phi}{\Phi(1 - \Phi)}\\ &= \frac{y_i - \Phi}{\Phi(1 - \Phi)}\end{aligned}\]
<p>With \(\sigma\) instead: \(\sigma' = \sigma(1 - \sigma)\) cancels the denominator and leaves \(z_i = \frac{\sigma(t_i) - y_i}{n}\) — that's [sheet: BCE loss gradient]. With \(\Phi\), nothing cancels.</p>`,
          extra: [{ label: "you've done this before (HW3 Q6)", html: R`<p>Your HW3 Q6 is the same derivation with \(\gamma\) for \(\Phi\) and \(\gamma' = e^t(1 - \gamma)\) for \(\varphi\): same common denominator, then only \(1 - \gamma\) cancelled, giving \(\frac{e^{t_i}(\gamma(t_i) - y_i)}{n\,\gamma(t_i)}\).</p>` }] },
      ],
      compare: R`The official solution's lines match moves 2, 4 and 5: the two log derivatives (move 2's why?) and the combined sum (move 2), \(z_i = -\frac1n[\dots]\varphi(t_i)\), and the grouped \(z_i\). It goes from the sum straight to \(\sum_i z_i x^{(i)}\) (move 3 is the step in between), and writes both forms of \(z_i\), one after the other.`,
    },

    "2026B-q3.4": {
      point: R`Every blank is spelled out around it: the hint \(\sum_i z_i x^{(i)}\), <code>self.learning_rate</code>, <code>BCE_loss(X, y)</code> on this batch, and the comment "loss <b>change</b>".`,
      start: R`<p><b>(1)</b> <code>grad =</code> □</p>
<p><b>(2)</b> <code>self.w =</code> □</p>
<p><b>(3)</b> <code>current_loss =</code> □</p>
<p><b>(4)</b> <code>if</code> □ <code>:</code></p>`,
      answer: R`<p><b>(1)</b> <code>grad = X_b.T @ z</code></p>
<p><b>(2)</b> <code>self.w = self.w - self.learning_rate * grad</code></p>
<p><b>(3)</b> <code>current_loss = self.BCE_loss(X_b, y_b)</code></p>
<p><b>(4)</b> <code>if abs(previous_loss - current_loss) &lt; self.eps:</code></p>`,
      moves: [
        { line: R`<b>(1) The hint, piece by piece</b> — \(\sum_i z_i\,x^{(i)}\) in numpy:
<div class="tw"><table><thead><tr><th>hint</th><th>code</th></tr></thead><tbody>
<tr><td>\(z_i\)</td><td>entry \(i\) of <code>z</code></td></tr>
<tr><td>\(x^{(i)}\)</td><td>row \(i\) of <code>X_b</code></td></tr>
<tr><td>\(\sum_i\)</td><td>added over the batch's rows</td></tr></tbody></table></div>
→ <code>X_b.T @ z</code>.`,
          size: R`<p><code>X_b.shape</code> = (batch_size, X.shape[1]): one row per sample in the batch, one column per weight (<code>self.w_</code> has <code>X.shape[1]</code> entries).</p><p><code>z</code> = <code>probit_grad_coeffs(…)</code> = "the vector of \(z_i\)": flat, (batch_size,).</p><p><code>X_b.T @ z</code>: (X.shape[1], batch_size) @ (batch_size,) → (X.shape[1],) · inner batch_size = batch_size ✓ · one entry per weight, like <code>self.w</code> ✓</p><p>Wrong order: <code>X_b @ z</code> = (batch_size, X.shape[1]) @ (batch_size,) — inner X.shape[1] ≠ batch_size ✗</p>`,
          why: R`<p><b>What the numpy pieces do:</b> <code>X_b.T</code> flips rows and columns, so the samples become columns. <code>@</code> with a flat list = column 1 × entry 1 + column 2 × entry 2 + … — exactly \(z_1x^{(1)} + z_2x^{(2)} + \dots\)</p>
<p><b>With part 1's two samples</b> as the batch (with their 1 in front):</p>
\[X_b = \begin{bmatrix}1&2&0\\1&0&1\end{bmatrix} \qquad X_b^\top = \begin{bmatrix}1&1\\2&0\\0&1\end{bmatrix}\]
\[\begin{aligned}X_b^\top z &= (z_1 + z_2,\ 2z_1,\ z_2)\\ &= z_1\,(1, 2, 0) + z_2\,(1, 0, 1)\end{aligned}\]
<p>= \(z_1\) × row 1 + \(z_2\) × row 2: the hint's sum ✓. You don't need part 3 for this.</p>` },
        { line: R`<b>(2) One step downhill</b> — blank 1 just made <code>grad</code>, and this line makes the new weights from it: weights minus learning rate × gradient: <code>self.w - self.learning_rate * grad</code>.`,
          remember: R`\[w \leftarrow w - \eta\,\nabla L(w)\]<p>One gradient-descent step. Not on the sheet. Here \(\eta\) is <code>self.learning_rate</code>, \(\nabla L\) is <code>grad</code>.</p>`,
          size: R`<p><code>self.learning_rate</code> is a number · <code>self.w</code> and <code>grad</code> are both (X.shape[1],) — one entry per weight, so the step subtracts entry by entry → (X.shape[1],) ✓</p>`,
          why: R`<p>The gradient points uphill (where the loss grows), so minus a small step of it lowers the loss; <code>self.learning_rate</code> sets the step size (same step as 2025-A Q4.5, blank 4).</p>` },
        { line: R`<b>(3) The loss on this batch</b> — we're inside the batch loop, so <code>X_b</code>. <code>BCE_loss(X, y)</code> names its labels <code>y</code>, like fit's original <code>y</code>; only <code>probit_grad_coeffs(y_prob, y01)</code> asks for <code>y01</code>. So: <code>self.BCE_loss(X_b, y_b)</code>.`,
          size: R`<p><code>X_b</code> (batch_size, X.shape[1]) and <code>y_b</code> (batch_size,): same rows ✓ — the loss pairs row \(i\) with label \(i\). <code>BCE_loss(X, y_b)</code> would pair all <code>X.shape[0]</code> rows with batch_size labels ✗.</p>`,
          why: R`<p>It sits right after this batch's step, next to <code>X_b</code>, <code>y_b</code>, <code>y01_b</code>. <code>y_b</code> = the batch's original labels, <code>y01_b</code> = the same labels as 0/1. <code>fit</code> builds <code>y_01</code> itself from <code>y</code> (<code>np.where(y == self.class_names[0], 0, 1)</code>), so a method that takes <code>y</code> gets the original labels and converts inside — like your HW3 <code>BCE_loss</code>.</p>` },
        { line: R`<b>(4) Stop when the loss stops changing</b> — the comment, piece by piece:
<div class="tw"><table><thead><tr><th>comment</th><th>code</th></tr></thead><tbody>
<tr><td>early halting</td><td><code>if …: return</code> (given)</td></tr>
<tr><td>loss change</td><td><code>previous_loss - current_loss</code></td></tr>
<tr><td>small</td><td><code>&lt; self.eps</code></td></tr></tbody></table></div>
→ <code>abs(previous_loss - current_loss) &lt; self.eps</code>. Done.`,
          size: R`<p><code>previous_loss</code>, <code>current_loss</code>: one number each (<code>BCE_loss</code> returns one number) → <code>abs(…)</code> one number, compared with the number <code>self.eps</code> ✓</p>`,
          why: R`<p><b>Why <code>abs</code>:</b> each batch is different samples, so the loss can go <b>up</b> from one batch to the next. Then the change is negative, and a negative number is always <code>&lt; self.eps</code> → it would stop wrongly. <code>abs</code> makes "small" mean small in either direction.</p>
<p><b>Why <code>previous_loss = np.inf</code>:</b> on the first batch the change is <code>inf</code>, never <code>&lt; self.eps</code>, so it can't stop there.</p>`,
          extra: [{ label: "your Moed B", html: R`<p>You wrote <code>current_loss &lt; self.eps</code> — that tests the loss itself, not its change. Blanks 1–2 were empty and blank 3 stopped at <code>self.BCE_loss(</code>: 1/8.</p>` }] },
      ],
      compare: R`Same four blanks as the official solution. Its blank 2 writes <code>self.w_ = self.w - …</code> (the code creates <code>self.w_</code>, the question lists <code>self.w</code>); it's the same update either way.`,
      slip: R`It mixes <code>self.w_</code> and <code>self.w</code>. Same weights: the code creates <code>self.w_</code>, the question calls it <code>self.w</code>, so either name is fine.`,
    },
  });
})();
