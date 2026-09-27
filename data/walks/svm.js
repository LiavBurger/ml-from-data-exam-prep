// Walkthroughs for the SVM / kernels questions — CASUAL style (spec/WALKS.md):
// the point first, then only the moves that earn the points.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ───────────────────────── 2025-C Q3 ─────────────────────────
    "2025C-q3.1": {
      point: R`Separable = one line with all the + on one side and all the − on the other. \(x_1 + x_2\) is +4 for both positives and −4 for both negatives, so the line \(x_1 + x_2 = 0\) does it.`,
      moves: [
        { line: R`<b>Add the two coordinates</b> of each sample: <div class="formula">\[\begin{aligned}\text{positives: }& 2+2 = 4,\;\; 3+1 = 4\\ \text{negatives: }& -2-2 = -4,\;\; -3-1 = -4\end{aligned}\]</div>` },
        { line: R`<b>The line</b> \(x_1 + x_2 = 0\): the positives score \(4 \gt 0\), the negatives \(-4 \lt 0\). Every sample is on its own side, so the data is linearly separable. Done.`,
          why: R`<p>To show "yes", one line that works is enough. Name it and check every sample's sign.</p>` },
      ],
      compare: R`Same as the official answer: positives on \(x_1 + x_2 = 4\), negatives on \(x_1 + x_2 = -4\), so \(x_1 + x_2 = 0\) separates them.`,
    },

    "2025C-q3.2": {
      point: R`Part 1's line \(x_1 + x_2 = 0\) is the same distance (\(2\sqrt2\)) from all four samples. So it's already the max-margin line, and that distance is the margin.`,
      start: R`<p><b>(a)</b> Decision boundary: \(\{(x_1, x_2) : \;\square = 0\}\)</p><p><b>(b)</b> Decision rule: \(\hat y(x) = \mathrm{sign}(\;\square\;)\)</p><p><b>(c)</b> Margin = distance to the closest sample:</p>\[\frac{|\square|}{\sqrt{w_1^2 + w_2^2}} = \;\square\]`,
      moves: [
        { line: R`<b>Distance of each sample to \(x_1 + x_2 = 0\)</b> — |score| divided by the length of \(w = (1, 1)\): <div class="formula">\[\frac{|x_1 + x_2|}{\sqrt{1^2 + 1^2}} = \frac{4}{\sqrt2} = 2\sqrt2 \quad\text{for all four}\]</div>`,
          why: R`<p>🧠 know by heart (it's not on the formula sheet): distance from a point to the line = \(|w_0 + w_1x_1 + w_2x_2|\,/\,\|w\|\), with \(\|w\| = \sqrt{w_1^2 + w_2^2}\) (no \(w_0\) in it).</p>
<p>Why: the score is 0 on the line and grows by \(\|w\|\) for every step of 1 straight away from it. So score ÷ \(\|w\|\) = distance. Part 1 already gave \(|x_1 + x_2| = 4\) for every sample.</p>` },
        { line: R`<b>Same distance to all → max-margin.</b> (a) \(\{(x_1, x_2) : x_1 + x_2 = 0\}\). (b) \(\hat y(x) = \mathrm{sign}(x_1 + x_2)\), i.e. \(\mathrm{sign}(w^\top x)\) with \(w = (0, 1, 1)\) (bias first).`,
          why: R`<p>Why nothing beats it: \((2, 2)\) and \((-2, -2)\) are \(\sqrt{4^2 + 4^2} = 4\sqrt2\) apart. Any separating line crosses between them, so it is at most half of that, \(2\sqrt2\), from one of them. Our line is \(2\sqrt2\) from both, so it already has the best possible margin.</p>` },
        { line: R`<b>(c) The margin</b> = distance to the closest sample \(= 2\sqrt2 \approx 2.83\). Done.` },
      ],
      compare: R`Move 2 is the official "equal distance to all samples, so it is the max-margin boundary", with the same rule \(\mathrm{sign}(x_1 + x_2)\) / \(w = (0, 1, 1)\). Move 3 is its \(4/\sqrt2 = 2\sqrt2\).`,
    },

    "2025C-q3.3": {
      point: R`\(J\) is a sum of squares, so it can't go below 0. If some \(w\) makes every score equal its label (±1), then \(J = 0\), and that \(w\) is the minimum.`,
      start: R`\[w = (\square, \square, \square)\]<p>Scores \(w^\top x^{(i)}\): \(\;\square, \square, \square, \square\;\) = the labels, so every \((\dots)\) is 0 and \(J(w) = \square\)</p>`,
      moves: [
        { line: R`<b>\(J \ge 0\)</b> — it is \(\tfrac1n\) · a sum of squares \((w^\top x^{(i)} - y^{(i)})^2\). So a \(w\) with \(J = 0\) is the minimum.`,
          why: R`<p>You don't need to know LMS by heart:</p><p>[sheet: Least mean squares classification]</p><p>It writes the same loss split by class, \((1 - w^\top x)^2\) for positives and \((1 + w^\top x)^2\) for negatives. Both are 0 when the score equals the label.</p>` },
        { line: R`<b>Part 2's line, scaled to ±1</b> — \(w = (0, 1, 1)\) scores \((4, 4, -4, -4)\). Divide by 4: <div class="formula">\[w = (0, \tfrac14, \tfrac14) \;\text{ scores }\; (1, 1, -1, -1) = y\]</div>`,
          why: R`<p>Each score = row \((1, x_1, x_2)\) · \(w\):</p>
<div class="tw"><table><thead><tr><th>row</th><th>· \((0, \tfrac14, \tfrac14)\)</th><th>score</th><th>label</th></tr></thead><tbody>
<tr><td>(1, 2, 2)</td><td>0 + 0.5 + 0.5</td><td>1</td><td>+1</td></tr>
<tr><td>(1, 3, 1)</td><td>0 + 0.75 + 0.25</td><td>1</td><td>+1</td></tr>
<tr><td>(1, −2, −2)</td><td>0 − 0.5 − 0.5</td><td>−1</td><td>−1</td></tr>
<tr><td>(1, −3, −1)</td><td>0 − 0.75 − 0.25</td><td>−1</td><td>−1</td></tr></tbody></table></div>
<p>Dividing by 4 doesn't move the line (same signs), it only makes the scores the right size.</p>` },
        { line: R`<b>Every (…) is 0</b> — \(w^\top x^{(i)} - y^{(i)} = 0\) for all four samples, so \(J = 0\). The LMS classifier is \(w = (0, \tfrac14, \tfrac14)\). Done.`,
          extra: [{ label: "check it with numpy", html: R`<pre><code>np.linalg.lstsq(X, y, rcond=None)[0]
# array([0.  , 0.25, 0.25])</code></pre><p>Same \(w\), and it's the only one (\(X\) has rank 3).</p>` }] },
      ],
      compare: R`Same as the official answer: \(w = (0, \tfrac14, \tfrac14)\) gives \(w^\top x^{(i)} - y^{(i)} = 0\) for every sample, so the loss is 0, the minimum possible.`,
    },

    "2025C-q3.4": {
      point: R`Max-margin only cares about the closest samples: \((2, 3)\) is farther away than them, so nothing changes. LMS cares about every sample's score = label: \((2, 3)\) scores 1.25, not 1, so LMS changes.`,
      moves: [
        { line: R`<b>Max-margin: where is (2, 3)?</b> Score \(2 + 3 = 5 \gt 0\), so it's on the correct side. Its distance \(5/\sqrt2 \approx 3.54\) is more than the margin \(2\sqrt2 \approx 2.83\).`,
          why: R`<p>Same distance formula as part 2, move 1: \(|x_1 + x_2|/\sqrt2\).</p>` },
        { line: R`<b>So max-margin doesn't change.</b> The old line still has margin \(2\sqrt2\), and adding a sample can never increase the best margin. So nothing beats the old line.`,
          why: R`<p>The margin = distance to the <b>closest</b> sample. A new sample either is closer (margin shrinks) or isn't (margin stays). It can never make it bigger.</p>` },
        { line: R`<b>LMS: the new (…) isn't 0.</b> With \(w = (0, \tfrac14, \tfrac14)\): \(\tfrac14\cdot 2 + \tfrac14\cdot 3 - 1 = 0.25\). <div class="formula">\[J = \tfrac15\big(0^2 + 0^2 + 0^2 + 0^2 + 0.25^2\big) = \tfrac1{80}\]</div>` },
        { line: R`<b>A nudged line does better</b> — \(w = (-\varepsilon, \tfrac14, \tfrac14)\): <div class="formula">\[J = \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80} \lt \tfrac1{80} \;\text{ for } 0 \lt \varepsilon \lt 0.1\]</div>So \(w = (0, \tfrac14, \tfrac14)\) is no longer the minimum: LMS changes. Done.`,
          why: R`<p>\(-\varepsilon\) lowers every score by \(\varepsilon\). The four old (…) become \(-\varepsilon\), the new one becomes \(0.25 - \varepsilon\):</p>
\[\begin{aligned}J &= \tfrac15\big(4\varepsilon^2 + (\tfrac14 - \varepsilon)^2\big)\\ &= \tfrac15\big(4\varepsilon^2 + \tfrac1{16} - \tfrac{\varepsilon}{2} + \varepsilon^2\big)\\ &= \tfrac15\big(5\varepsilon^2 - \tfrac{\varepsilon}{2} + \tfrac1{16}\big)\\ &= \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80}\end{aligned}\]
<p>Below \(\tfrac1{80}\) when \(\varepsilon^2 - \tfrac{\varepsilon}{10} \lt 0\), i.e. \(0 \lt \varepsilon \lt 0.1\). Example \(\varepsilon = 0.05\): \(0.0025 - 0.005 + 0.0125 = 0.01 \lt 0.0125\).</p>`,
          extra: [{ label: "the official solution writes w = (ε, ¼, ¼) — it's a slip", html: R`<p>With \(+\varepsilon\) every score goes <b>up</b>, so the loss goes up: at \(\varepsilon = 0.05\) it is \(\tfrac15(4\cdot 0.05^2 + 0.3^2) = 0.02 \gt 0.0125\). Its own \((\tfrac14 - \varepsilon)^2\) and "move the line toward the positives" both need \(w_0 = -\varepsilon\).</p>` },
                  { label: "another way: the gradient isn't 0", html: R`<p>Like Regression 2025-C Q1.2, with a \(\tfrac15\) in front: \(\nabla J = \tfrac25 X^\top(Xw - y)\). The errors are \((0, 0, 0, 0, 0.25)\), so only the new row \((1, 2, 3)\) counts:</p>\[\nabla J = \tfrac25\cdot 0.25\cdot(1, 2, 3) = (0.1,\ 0.2,\ 0.3) \ne 0\]` }] },
      ],
      compare: R`Moves 1–2 are the official max-margin sentence ("correctly classified, farther away, the margin cannot increase"). Moves 3–4 are its LMS part, with one slip: the official \(w = (\varepsilon, \tfrac14, \tfrac14)\) must be \((-\varepsilon, \tfrac14, \tfrac14)\).`,
    },

    "2025C-q3.5": {
      point: R`The two negatives sit together, so put them inside a circle. A circle's formula, expanded, is a weighted sum of \(1, x_1, x_2, x_1^2, x_2^2\): those features are \(\varphi\), and the weights are \(w\).`,
      start: R`<p>Circle: centre \((a, b) = (\square, \square)\), radius \(r = \square\)</p>\[\varphi(x_1, x_2) = (\square, \square, \square, \square, \square)\]\[w = (\square, \square, \square, \square, \square)\]<p>Check: \(\mathrm{sign}(w^\top\varphi(x))\) for every sample = its label.</p>`,
      moves: [
        { line: R`<b>Circle around the negatives</b> — centre = their midpoint \((-2.5, -1.5)\). The negatives are \(\sqrt{0.5} \approx 0.71\) from it, the nearest positive \((-4, -5)\) is \(\approx 3.81\). So take \(r = 1\).`,
          why: R`<p>The radius must be bigger than the distance to every negative and smaller than the distance to every positive:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>label</th><th>distance to \((-2.5, -1.5)\)</th></tr></thead><tbody>
<tr><td>(−2, −2)</td><td>−</td><td>\(\sqrt{0.5^2 + 0.5^2} \approx 0.71\)</td></tr>
<tr><td>(−3, −1)</td><td>−</td><td>\(\sqrt{0.5^2 + 0.5^2} \approx 0.71\)</td></tr>
<tr><td>(−4, −5)</td><td>+</td><td>\(\sqrt{1.5^2 + 3.5^2} \approx 3.81\)</td></tr>
<tr><td>(2, 2)</td><td>+</td><td>\(\sqrt{4.5^2 + 3.5^2} \approx 5.70\)</td></tr>
<tr><td>(3, 1)</td><td>+</td><td>\(\sqrt{5.5^2 + 2.5^2} \approx 6.04\)</td></tr></tbody></table></div>
<p>Anything between 0.71 and 3.81 works.</p>` },
        { line: R`<b>Expand the circle, select the pieces</b> — orange = numbers, blue = features: <div class="formula">\[\begin{aligned}&(x_1 + 2.5)^2 + (x_2 + 1.5)^2 - 1^2\\ &= \textcolor{#e8912d}{7.5}\cdot\textcolor{#4c8dff}{1} + \textcolor{#e8912d}{5}\,\textcolor{#4c8dff}{x_1} + \textcolor{#e8912d}{3}\,\textcolor{#4c8dff}{x_2} + \textcolor{#e8912d}{1}\,\textcolor{#4c8dff}{x_1^2} + \textcolor{#e8912d}{1}\,\textcolor{#4c8dff}{x_2^2}\end{aligned}\]</div><div class="formula">\[\textcolor{#4c8dff}{\varphi(x) = (1, x_1, x_2, x_1^2, x_2^2)}\]</div><div class="formula">\[\textcolor{#e8912d}{w = (7.5, 5, 3, 1, 1)}\]</div>`,
          why: R`<p>(squared distance to the centre) − \(r^2\) is negative inside the circle and positive outside. Expand each bracket:</p>
\[\begin{aligned}(x_1 + 2.5)^2 &= x_1^2 + 5x_1 + 6.25\\ (x_2 + 1.5)^2 &= x_2^2 + 3x_2 + 2.25\\ 6.25 + 2.25 - 1 &= 7.5\end{aligned}\]
<p>In general it's \(w = (a^2 + b^2 - r^2,\ -2a,\ -2b,\ 1,\ 1)\), as in the official solution.</p>` },
        { line: R`<b>Check every sample</b> — \(w^\top\varphi(x)\) = 31.5, 35.5, −0.5, −0.5, 13.5: signs +, +, −, −, + = the labels. The hyperplane is \(\{z : w^\top z = 0\}\). Done.`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>\(7.5 + 5x_1 + 3x_2 + x_1^2 + x_2^2\)</th><th>sign</th><th>label</th></tr></thead><tbody>
<tr><td>(2, 2)</td><td>7.5 + 10 + 6 + 4 + 4 = 31.5</td><td>+</td><td>+</td></tr>
<tr><td>(3, 1)</td><td>7.5 + 15 + 3 + 9 + 1 = 35.5</td><td>+</td><td>+</td></tr>
<tr><td>(−2, −2)</td><td>7.5 − 10 − 6 + 4 + 4 = −0.5</td><td>−</td><td>−</td></tr>
<tr><td>(−3, −1)</td><td>7.5 − 15 − 3 + 9 + 1 = −0.5</td><td>−</td><td>−</td></tr>
<tr><td>(−4, −5)</td><td>7.5 − 20 − 15 + 16 + 25 = 13.5</td><td>+</td><td>+</td></tr></tbody></table></div>`,
          extra: [{ label: "the official r = 0.6 is a slip", html: R`<p>The negatives are 0.71 from the centre, so a circle of radius 0.6 misses them: its \(w = (8.14, 5, 3, 1, 1)\) gives \(8.14 - 10 - 6 + 4 + 4 = +0.14\) for both negatives (wrong sign). Use any \(r\) between 0.71 and 3.81, e.g. \(r = 1\). It also prints \((x_2 - a)^2\) where it means \((x_2 - b)^2\).</p>` },
                  { label: "the question's premise is false (don't argue it in the exam)", html: R`<p>The extended data <b>is</b> linearly separable: \(7x_1 - 6x_2\) scores \(2, 15, -2, -15, 2\) on the five samples, all the right signs. Answer the question as asked anyway.</p>` }] },
      ],
      compare: R`Same \(\varphi = (1, x_1, x_2, x_1^2, x_2^2)\), centre and general \(w\) as the official answer. Its radius \(r = 0.6\) is a slip (both negatives fall outside); \(r = 1\) gives \(w = (7.5, 5, 3, 1, 1)\).`,
    },

    // ───────────────────────── 2025-B Q4 ─────────────────────────
    "2025B-q4.1": {
      point: R`The max-margin line runs exactly midway between the two rows of samples. Every sample then has y · score = 1, so the margin is \(1/\|w\|\) (a distance, not 1); \((2, 0)\) has y · score = 2 ≥ 1, so nothing changes.`,
      start: R`<p><b>(a)</b> The line: \(\;\square = 0\;\) (\(w = (\square, \square)\), \(w_0 = \square\))</p><p><b>(b)</b> Every sample: \(y_i(w^\top x^{(i)} + w_0) = \square\), so the margin is</p>\[\frac{1}{\|w\|} = \;\square\]<p><b>(c)</b> New sample: \(y(w^\top x + w_0) = \square \ge 1\), so \(\;\square\)</p>`,
      moves: [
        { line: R`<b>(a) Midway between the two lines</b> — halfway between \(x_1 - x_2 = 1\) and \(x_1 - x_2 = -1\) is <div class="formula">\[x_1 - x_2 = 0 \qquad (w = (1, -1),\ w_0 = 0)\]</div>`,
          why: R`<p>Every sample has \(x_1 - x_2 = +1\) (positives) or \(-1\) (negatives). The line where \(x_1 - x_2 = 0\) is exactly halfway, so it's equally far from every sample. (Grader's note: "they only need to specify the line".)</p>` },
        { line: R`<b>(b) y · score = 1 for every sample</b> — positives: \((+1)(1) = 1\); negatives: \((-1)(-1) = 1\). All are on the margin, so <div class="formula">\[\text{margin} = \frac{1}{\|w\|} = \frac{1}{\sqrt{1^2 + (-1)^2}} = \frac{\sqrt2}{2} \approx 0.707\]</div>`,
          why: R`<p>The SVM constraint is \(y_i(w^\top x^{(i)} + w_0) \ge 1\) with \(\xi_i = 0\). Samples with exactly 1 are the closest ones. You don't need to know it by heart:</p><p>[sheet: Primal objective function (to minimize)]</p>
<p>Their distance = |score| ÷ \(\|w\|\) = \(1/\sqrt2\). The 1 is a score, not a distance: answering "margin = 1" gets only partial credit (grader's note).</p>` },
        { line: R`<b>(c) The new sample \((2, 0)\):</b> \((+1)(2 - 0) = 2 \ge 1\), correct side and outside the margin. The old line keeps its margin, and a margin can't grow by adding a sample, so nothing changes. Done.`,
          extra: [{ label: "the official (c) says the margin \"cannot shrink\" — read it as \"cannot grow\"", html: R`<p>"Cannot shrink" is true only for this sample (it's outside the margin band). The general fact the argument needs: adding a sample can never make the margin <b>grow</b> (a sample inside the band does shrink it). 2025-C Q3.4's solution says it right: "the margin cannot increase by adding samples".</p>` }] },
      ],
      compare: R`Move 1 is the official \(x_1 - x_2 = 0\), \(w = (1, -1)\), \(w_0 = 0\). Move 2 is its \(1/\|w\| = \sqrt2/2\). Move 3 is its (c), with "cannot shrink" read as "cannot grow".`,
    },

    "2025B-q4.2": {
      point: R`\(C\) is the price of each margin violation. Big \(C\) → no errors, narrow margin. Small \(C\) → wide margin, errors allowed. So: count the errors, then compare the margins.`,
      moves: [
        { line: R`<b>Count the errors.</b> Plot B has none, so <b>C = 100 → B</b>. A and C both leave the unfilled circle at about \((0.4, -0.7)\) on the filled side.`,
          why: R`<p>The loss is printed in the question (and on the sheet: [sheet: Hinge loss objective formulation]): \(\tfrac12\|w\|^2 + \tfrac Cn\sum_i\max(0,\ \dots)\). \(C\) multiplies the violations, so a big \(C\) makes them expensive: the line avoids every error, even at a narrow margin.</p>` },
        { line: R`<b>A vs C: wider margin.</b> A's line is farther from the closest filled circle, so A has the wider margin: <b>C = 0.01 → A</b>.`,
          why: R`<p>Small \(C\): violations are cheap, so the \(\tfrac12\|w\|^2\) part wins. Small \(w\) = wide margin \(1/\|w\|\), and violations are tolerated.</p>` },
        { line: R`<b>What's left:</b> <b>C = 1 → C</b>, the in-between margin and violations. Done.` },
      ],
      compare: R`Same matching as the official answer: C = 100 → B (only plot without errors), C = 0.01 → A (line farther from the closest filled circle), C = 1 → C by elimination.`,
    },

    "2025B-q4.3": {
      point: R`Cross-validation = train on the other folds, predict the held-out fold, score it by the fraction of mistakes, average over the folds, keep the smallest average. Each bug breaks one of these.`,
      start: R`<p>One line per bug (write at least three):</p><p><b>Line \(\square\):</b> <code>wrong</code> → should be <code>fix</code>, because \(\square\)</p>`,
      moves: [
        { line: R`<b>n counts rows; the SVM brings its own bias.</b> <b>Line 1:</b> <code>X.shape[1]</code> → <code>X.shape[0]</code>. <b>Line 2:</b> delete it (no ones column).`,
          why: R`<p>The docstring says <code>X</code> is n_samples × p_features, so samples are rows: <code>shape[0]</code>. The solver returns its own <code>w0</code> and <code>z_pred</code> adds it, so a ones column would count the bias twice.</p>` },
        { line: R`<b>Score the held-out rows by mistakes.</b> <b>Line 20:</b> <code>X_train @ w + w0</code> → <code>X_val @ w + w0</code>. <b>Line 22:</b> → <code>risk = np.mean(y_val != y_pred)</code>.`,
          why: R`<p>Validation must predict the rows the model didn't train on. And the hinge objective has \(C\) inside it, so a bigger \(C\) inflates the number by itself: comparing it across \(C\)'s means nothing. What we care about is the fraction of validation rows predicted wrong.</p>` },
        { line: R`<b>Compare the average over folds.</b> <b>Line 26:</b> <code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code>. Done (5 bugs; 3 are enough).`,
          why: R`<p><code>risk</code> is only the last fold's number. The CV risk of this \(C\) is the average over all folds, and that's also what line 27 stores.</p>` ,
          extra: [{ label: "why lines 20, 22, 26 and not 16, 17, 22?", html: R`<p>The official solution calls them 16, 17 and 22, but on the printed page the numbers level with those statements are 20, 22 and 26. The question's "lines 11–17 have no errors" (the fold set-up lines) only fits the printed numbers. Either way, write the statement itself next to the number so the grader can't miss it.</p>` }] },
      ],
      compare: R`The official list has the same 5 bugs (lines 1 and 2, then <code>z_pred</code>, <code>risk</code>, and the <code>if</code>, which it numbers 16, 17, 22).`,
    },

    // ───────────────────────── 2026-A Q3 ─────────────────────────
    "2026A-q3.1": {
      point: R`\(u^\top v\) is just a dot product — one number. Plug it into \((1 + u^\top v)^2\).`,
      start: R`\[K(u, v) = (1 + u^\top v)^2 = (1 + \square)^2 = \square\]`,
      moves: [
        { line: R`<b>\(u^\top v\)</b> — multiply matching entries and add: \(1\cdot 3 + 0\cdot 0 = 3\).` },
        { line: R`<b>Add 1, square:</b> \((1 + 3)^2 = 4^2 = 16\). Done.` },
      ],
      compare: R`Same as the official \((1 + 1\cdot 3 + 0\cdot 0)^2 = 4^2 = 16\).`,
    },

    "2026A-q3.2": {
      point: R`Expand \((1 + u^\top v)^2\) and write each term as (a piece of \(u\)) · (the same piece of \(v\)). The list of pieces is \(\varphi\).`,
      start: R`\[\begin{aligned}K(u, v) &= (1 + u_1v_1 + u_2v_2)^2\\ &= \square \;\;\text{(expanded)}\\ &= (\square)(\square) + (\square)(\square) + \dots\end{aligned}\]\[\varphi(x) = (\square, \dots)\]`,
      moves: [
        { line: R`<b>Expand</b> — every term squared, plus 2 × every pair: <div class="formula">\[\begin{aligned}&(1 + u_1v_1 + u_2v_2)^2\\ &= 1 + 2u_1v_1 + 2u_2v_2 + 2u_1u_2v_1v_2\\ &\quad + u_1^2v_1^2 + u_2^2v_2^2\end{aligned}\]</div>`,
          why: R`<p>Like \((a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc\), with \(a = 1\), \(b = u_1v_1\), \(c = u_2v_2\). So \(2bc = 2u_1v_1u_2v_2\).</p>` },
        { line: R`<b>Select the pieces</b> — each term = (piece of \(u\)) · (same piece of \(v\)); a 2 splits as \(\sqrt2\cdot\sqrt2\): <div class="formula">\[2u_1v_1 = \underbrace{\textcolor{#e8912d}{\sqrt2u_1}}_{\textstyle\textcolor{#e8912d}{\text{piece of }u}}\cdot\underbrace{\textcolor{#4c8dff}{\sqrt2v_1}}_{\textstyle\textcolor{#4c8dff}{\text{same piece of }v}}\]</div>`,
          why: R`<div class="tw"><table><thead><tr><th>term</th><th>piece of \(u\)</th><th>same piece of \(v\)</th></tr></thead><tbody>
<tr><td>\(1\)</td><td>\(1\)</td><td>\(1\)</td></tr>
<tr><td>\(2u_1v_1\)</td><td>\(\sqrt2u_1\)</td><td>\(\sqrt2v_1\)</td></tr>
<tr><td>\(2u_2v_2\)</td><td>\(\sqrt2u_2\)</td><td>\(\sqrt2v_2\)</td></tr>
<tr><td>\(2u_1u_2v_1v_2\)</td><td>\(\sqrt2u_1u_2\)</td><td>\(\sqrt2v_1v_2\)</td></tr>
<tr><td>\(u_1^2v_1^2\)</td><td>\(u_1^2\)</td><td>\(v_1^2\)</td></tr>
<tr><td>\(u_2^2v_2^2\)</td><td>\(u_2^2\)</td><td>\(v_2^2\)</td></tr></tbody></table></div>
<p>Matching products, added up = a dot product. The orange column is \(\varphi(u)\), the blue one is \(\varphi(v)\).</p>` },
        { line: R`<b>Put it together</b> — the pieces of \(u\), as a list, with \(x\) in place of \(u\): <div class="formula">\[\varphi(x) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ \sqrt2x_1x_2,\ x_1^2,\ x_2^2\big) \in \mathbb{R}^6\]</div>Done.`,
          extra: [{ label: "check it with part 1's numbers", html: R`<p>\(\varphi(1, 0) = (1, \sqrt2, 0, 0, 1, 0)\), \(\varphi(3, 0) = (1, 3\sqrt2, 0, 0, 9, 0)\). Dot product: \(1 + \sqrt2\cdot 3\sqrt2 + 9 = 1 + 6 + 9 = 16\) = part 1's \(K\). ✓</p>` },
                  { label: "the other official answer (ℝ⁹)", html: R`<p>\(\varphi(x) = (1, x_1, x_2, x_1, x_1^2, x_1x_2, x_2, x_2x_1, x_2^2)\): all products \(x_jx_l\) with \(x_0 = 1\). The repeats give the 2's instead of the \(\sqrt2\)'s. Either one gets full points.</p>` }] },
      ],
      compare: R`Move 3 is the official Option 2 (\(\mathbb{R}^6\)). Option 1 (\(\mathbb{R}^9\)) uses repeated entries instead of the \(\sqrt2\)'s.`,
    },

    "2026A-q3.3": {
      point: R`The original data isn't separable: the − sample \((0, 0)\) sits exactly between the + samples \((3, 0)\) and \((-3, 0)\). \(\varphi_A\) and \(\varphi_D\) are linear, so they keep that; \(\varphi_B\) puts a − and a + on the same point; only \(\varphi_C\) (the squares) separates.`,
      moves: [
        { line: R`<b>Map every sample</b> — one column per mapping (table in why?).`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>\(y\)</th><th>\(\varphi_A\)</th><th>\(\varphi_B\)</th><th>\(\varphi_C\)</th><th>\(\varphi_D\)</th></tr></thead><tbody>
<tr><td>1 (0, 0)</td><td>−</td><td>(0, 0)</td><td>(0, 0)</td><td>(0, 0)</td><td>(0, 0)</td></tr>
<tr><td>2 (1, 1)</td><td>−</td><td>(1, 1)</td><td>(1, 1)</td><td>(1, 1)</td><td>(1, 3)</td></tr>
<tr><td>3 (3, 0)</td><td>+</td><td>(3, 0)</td><td>(9, 0)</td><td>(9, 0)</td><td>(6, 3)</td></tr>
<tr><td>4 (0, 3)</td><td>+</td><td>(0, 3)</td><td>(0, 0)</td><td>(0, 9)</td><td>(−3, 6)</td></tr>
<tr><td>5 (−3, 0)</td><td>+</td><td>(−3, 0)</td><td>(9, 0)</td><td>(9, 0)</td><td>(−6, −3)</td></tr></tbody></table></div>` },
        { line: R`<b>\(\varphi_A\) — not separable.</b> It's the original data: sample 1 \((0, 0)\), −, is exactly between samples 3 \((3, 0)\) and 5 \((-3, 0)\), both +.`,
          why: R`<p>A line's score is linear, so the score of the middle point is the average of the two ends' scores. If both + samples score \(\gt 0\), the middle scores \(\gt 0\) too, so sample 1 is called +. No line gets all three right.</p>` },
        { line: R`<b>\(\varphi_B\) — not separable.</b> Sample 1 (−) and sample 4 (+) both land on \((0, 0)\): the same point with different labels.` },
        { line: R`<b>\(\varphi_C\) — separable.</b> The negatives land on \(z_1 + z_2 = 0\) and 2, the positives on 9. Cut at 3: <div class="formula">\[w_0 = -3,\ w_1 = w_2 = 1:\;\; \mathrm{sign}(-3 + x_1^2 + x_2^2)\]</div>`,
          why: R`<p>Scores \(-3 + z_1 + z_2\): sample 1: −3, sample 2: −1, samples 3, 4, 5: 6. All the right signs.</p>` },
        { line: R`<b>\(\varphi_D\) — not separable.</b> It's a linear mapping (new features = weighted sums of \(x_1, x_2\)), so "exactly between" survives: \((0, 0)\) is still the midpoint of \((6, 3)\) and \((-6, -3)\). Done.` },
      ],
      compare: R`Same four verdicts as the official answer, with the same \(w_0 = -3\), \(w_1 = w_2 = 1\) for \(\varphi_C\). (Its \(\varphi_B\) line prints sample 4 as "(0,0,−)"; sample 4 is +, which is the whole point.)`,
    },

    "2026A-q3.4": {
      point: R`Kernel perceptron = ordinary perceptron on part 2's \(\varphi(x)\), and it converges iff that mapped data is separable. Part 3's \(\varphi_C\) line uses only \(1, x_1^2, x_2^2\), which are inside part 2's \(\varphi\), so yes.`,
      moves: [
        { line: R`<b>Kernel perceptron = perceptron on \(\varphi(x)\)</b> — \(K(u, v) = \varphi(u)^\top\varphi(v)\) with part 2's \(\varphi\), so it's the ordinary perceptron run on the mapped samples.`,
          why: R`<p>The dual perceptron only ever uses the samples through dot products \(x^{(j)\top}x^{(i)}\). Replacing each one by \(K = \varphi^\top\varphi\) is the same as replacing every sample \(x\) by \(\varphi(x)\).</p>` },
        { line: R`<b>The perceptron converges (with a small enough learning rate) iff the data is linearly separable.</b> So: is the \(\varphi\)-mapped data separable?`,
          why: R`<p>🧠 know by heart (it's not on the formula sheet). Write it in exactly these words: they're the official solution's.</p>` },
        { line: R`<b>Yes — part 3 already separates it.</b> \(-3 + x_1^2 + x_2^2\) uses only \(1, x_1^2, x_2^2\), all inside part 2's \(\varphi\): <div class="formula">\[w = (-3, 0, 0, 0, 1, 1)\]</div>So it's guaranteed to converge. Done.`,
          why: R`<p>\(w^\top\varphi(x) = -3\cdot 1 + 0\cdot\sqrt2x_1 + 0\cdot\sqrt2x_2 + 0\cdot\sqrt2x_1x_2 + 1\cdot x_1^2 + 1\cdot x_2^2\), which is part 3's \(\varphi_C\) rule.</p>`,
          extra: [{ label: "check it with numbers", html: R`<p>Running the dual perceptron in numpy (all \(\lambda = 0\) at the start; on a mistake, \(\lambda_i \mathrel{+}= 0.01\)): the 6th pass makes no mistakes, with \(\lambda = (0.02, 0.04, 0.01, 0.01, 0)\).</p>` }] },
      ],
      compare: R`Same argument as the official answer: kernel perceptron = perceptron on the full quadratic variety (part 2); converges iff separable; part 3's \(\varphi_C\) is contained in it.`,
    },

    "2026A-q3.5": {
      point: R`Cross-validation again: one round per fold, predict the held-out rows, average the fold accuracies, keep the highest average.`,
      moves: [
        { line: R`<b>(1) One round per fold:</b> <code>range(m)</code>.`,
          why: R`<p><code>np.arange(n)[i::m]</code> is fold \(i\), so \(i\) must run over 0, 1, …, m − 1.</p>` },
        { line: R`<b>(2) Predict the held-out rows:</b> <code>X[left_out_indices, :]</code>.`,
          why: R`<p>The next line compares <code>pred</code> with <code>y[left_out_indices]</code>, so it must predict those same rows, which the model didn't train on.</p>` },
        { line: R`<b>(3) Average over the folds:</b> <code>np.mean(fold_scores)</code>.` },
        { line: R`<b>(4) Accuracy: higher is better:</b> <code>&gt;</code>. Done.`,
          why: R`<p><code>np.mean(pred == y[...])</code> is the fraction correct, and <code>best_score = -1</code> starts below any accuracy.</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>In 2026-B you wrote <code>grad &lt; epsilon</code> — the wrong quantity in a blank like this. First decide what is compared (here: accuracy), then the direction.</p>` }] },
      ],
      compare: R`Same four blanks as the official answer: <code>range(m)</code>, <code>X[left_out_indices, :]</code>, <code>np.mean(fold_scores)</code>, <code>&gt;</code>.`,
    },
  });
})();
