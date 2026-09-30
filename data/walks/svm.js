// Walkthroughs for the SVM / kernels questions — CASUAL style (spec/WALKS.md):
// the point first, then "begin your answer like this" + the full exam answer, then the steps that build it.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ───────────────────────── 2025-C Q3 ─────────────────────────
    "2025C-q3.1": {
      point: R`Separable = one line with all the + on one side and all the − on the other. \(x_1 + x_2\) is +4 for both positives and −4 for both negatives, so the line \(x_1 + x_2 = 0\) does it.`,
      start: R`<p><b>Answer:</b> □ (separable or not)</p>
<p><b>Because:</b> the positives have \(\square = \square\), the negatives \(\square = \square\)</p>
<p><b>So:</b> the line □ separates them.</p>`,
      answer: R`<p><b>Answer:</b> yes, the dataset is linearly separable.</p>
<p><b>Because:</b> the positives have \(x_1 + x_2 = 4\), the negatives \(x_1 + x_2 = -4\)</p>
<p><b>So:</b> the line \(L = \{(x_1, x_2) : x_1 + x_2 = 0\}\) separates them: every positive scores \(4 \gt 0\), every negative \(-4 \lt 0\).</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Linearly separable?" = is there one line with every + on one side and every − on the other? To show "yes": name one line and check every sample.`,
          remember: R`<p><b>Linearly separable</b> = some line \(w^\top x + w_0 = 0\) gives every sample the sign of its label. "Yes" → give one line and check every sample. "No" → show why no line can work.</p><p>Not on the sheet.</p>` },
        { line: R`<b>Which line?</b> Plot them: positives top-right, negatives bottom-left, each negative = minus a positive (\((-2, -2) = -(2, 2)\), \((-3, -1) = -(3, 1)\)). So the diagonal through \((0, 0)\), \(x_1 + x_2 = 0\), sits between. Add the coordinates to check: <div class="formula">\[\begin{aligned}\text{positives: }& 2+2 = 4,\;\; 3+1 = 4\\ \text{negatives: }& -2-2 = -4,\;\; -3-1 = -4\end{aligned}\]</div>`,
          why: R`<p>Minus a sample = its mirror through \((0, 0)\). So a line through \((0, 0)\) that puts the positives on the + side automatically puts their mirrors on the − side. \(x_1 + x_2\) is the simplest score that is positive for both positives.</p>` },
        { line: R`<b>The line</b> \(x_1 + x_2 = 0\): the positives score \(4 \gt 0\), the negatives \(-4 \lt 0\). Every sample is on its own side, so the data is linearly separable. Done.` },
      ],
      compare: R`Same as the official answer: positives on \(x_1 + x_2 = 4\), negatives on \(x_1 + x_2 = -4\) (step 2), so \(x_1 + x_2 = 0\) separates them (step 3).`,
    },

    "2025C-q3.2": {
      point: R`Part 1's line \(x_1 + x_2 = 0\) is the same distance (\(2\sqrt2\)) from all four samples. So it's already the max-margin line, and that distance is the margin.`,
      start: R`<p><b>Distance of every sample to \(x_1 + x_2 = 0\):</b></p>
\[\frac{|x_1 + x_2|}{\sqrt{w_1^2 + w_2^2}} = \;\square\]
<p><b>So it's the max-margin line, because:</b> □</p>
<p><b>(a)</b> Decision boundary: \(\{(x_1, x_2) : \;\square = 0\}\)</p>
<p><b>(b)</b> Decision rule: \(\hat y(x) = \mathrm{sign}(\;\square\;)\)</p>
<p><b>(c)</b> Margin = □</p>`,
      answer: R`<p><b>Distance of every sample to \(x_1 + x_2 = 0\):</b></p>
\[\frac{|x_1 + x_2|}{\sqrt{w_1^2 + w_2^2}} = \frac{4}{\sqrt{1^2 + 1^2}} = 2\sqrt2 \;\text{ for all four}\]
<p><b>So it's the max-margin line, because:</b> it is equally far from all four samples. The closest +/− pair, \((2, 2)\) and \((-2, -2)\), is \(4\sqrt2\) apart, so no separating line can be more than \(2\sqrt2\) from both.</p>
<p><b>(a)</b> Decision boundary: \(\{(x_1, x_2) : x_1 + x_2 = 0\}\)</p>
<p><b>(b)</b> Decision rule: \(\hat y(x) = \mathrm{sign}(x_1 + x_2)\), i.e. \(\mathrm{sign}(w^\top x)\) with \(w = (0, 1, 1)\) (bias first)</p>
<p><b>(c)</b> Margin = \(2\sqrt2 \approx 2.83\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Max-margin line = the separating line whose <b>closest</b> sample is as far away as possible. Part 1 already gave a separating line, \(x_1 + x_2 = 0\). So first: how far is each sample from it?`,
          remember: R`\[\text{distance}(x, \text{line}) = \frac{|w^\top x + w_0|}{\|w\|}\]<p>\(\|w\| = \sqrt{w_1^2 + w_2^2}\), no \(w_0\) in it. Margin = this distance to the <b>closest</b> sample. Not on the sheet. Here \(w = (1, 1)\), \(w_0 = 0\).</p>` },
        { line: R`<b>Distance of each sample to \(x_1 + x_2 = 0\)</b> — |score| divided by the length of \(w = (1, 1)\): <div class="formula">\[\frac{|x_1 + x_2|}{\sqrt{1^2 + 1^2}} = \frac{4}{\sqrt2} = 2\sqrt2 \quad\text{for all four}\]</div>`,
          size: R`\[\|w\| = \sqrt{\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{w}_{\textstyle 2\times 1}} = \sqrt{1^2 + 1^2}\]<p>Here \(w = (1, 1)\) is only the 2 feature weights, no bias. inner 2 = 2 ✓ · result = one number ✓</p>`,
          why: R`<p>Why: the score is 0 on the line and grows by \(\|w\|\) for every step of 1 straight away from it. So score ÷ \(\|w\|\) = distance. Part 1 already gave \(|x_1 + x_2| = 4\) for every sample.</p>` },
        { line: R`<b>Same distance to all → nothing beats it.</b> Moving the line away from one sample brings it closer to another. \((2, 2)\) and \((-2, -2)\) are \(4\sqrt2\) apart, so no separating line is more than \(2\sqrt2\) from both.`,
          why: R`<p>Any separating line crosses the segment between \((2, 2)\) and \((-2, -2)\), which is \(\sqrt{4^2 + 4^2} = 4\sqrt2\) long. So it is at most half of that, \(2\sqrt2\), from one of them. Our line is \(2\sqrt2\) from both: it already has the best possible margin.</p>` },
        { line: R`<b>Write (a), (b), (c).</b> (a) \(\{(x_1, x_2) : x_1 + x_2 = 0\}\). (b) \(\hat y(x) = \mathrm{sign}(x_1 + x_2)\), i.e. \(\mathrm{sign}(w^\top x)\) with \(w = (0, 1, 1)\) (bias first). (c) Margin \(= 2\sqrt2 \approx 2.83\). Done.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 3}\,\underbrace{x}_{\textstyle 3\times 1} = \text{one score}\]<p>Bias first: \(w = (0, 1, 1)\) is 3 long, so \(x = (1, x_1, x_2)\), with a 1 for the bias. inner 3 = 3 ✓ · \((0, 1, 1)\cdot(1, x_1, x_2) = x_1 + x_2\) ✓</p><p>Without the 1: (1×3)(2×1), inner 3 ≠ 2 ✗</p>` },
      ],
      compare: R`Steps 2–3 are the official "equal distance to all samples, so it is the max-margin boundary". Step 4 is its rule \(\mathrm{sign}(x_1 + x_2)\) / \(w = (0, 1, 1)\) and its margin \(4/\sqrt2 = 2\sqrt2\).`,
      slip: R`"The line L specified above" is \(x_1 + x_2 = 0\) from part 1's official answer. The real reason it's max-margin: the closest +/− pair, (2,2) and (−2,−2), is \(4\sqrt2\) apart and L cuts that gap exactly in half, so no line can beat a margin of \(2\sqrt2\).`,
    },

    "2025C-q3.3": {
      point: R`\(J\) is a sum of squares, so it can't go below 0. If some \(w\) makes every score equal its label (±1), then \(J = 0\), and that \(w\) is the minimum.`,
      start: R`<p><b>Lowest possible \(J\):</b> \(J(w) \ge \square\), because □</p>
<p><b>Weights:</b> \(w = (\square, \square, \square)\)</p>
<p><b>Scores</b> \(w^\top x^{(i)}\): □, □, □, □ = the labels</p>
<p><b>So:</b> every \((w^\top x^{(i)} - y^{(i)}) = \square\), \(J(w) = \square\) = the minimum, so □</p>`,
      answer: R`<p><b>Lowest possible \(J\):</b> \(J(w) \ge 0\), because it is \(\tfrac1n\) · a sum of squares.</p>
<p><b>Weights:</b> \(w = (0, \tfrac14, \tfrac14)\)</p>
<p><b>Scores</b> \(w^\top x^{(i)}\): 1, 1, −1, −1 = the labels</p>
<p><b>So:</b> every \((w^\top x^{(i)} - y^{(i)}) = 0\), \(J(w) = 0\) = the minimum, so \(w = (0, \tfrac14, \tfrac14)\) is the LMS classifier.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The \(w\) with the smallest \(J\). Work backwards: \(J\) is \(\tfrac1n\) · a sum of squares, so \(J \ge 0\). A \(w\) with \(J = 0\) is the minimum, no derivative needed.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 3}\,\underbrace{x^{(i)}}_{\textstyle 3\times 1} - \underbrace{y^{(i)}}_{\textstyle 1\times 1} = \text{one number}\]<p>\(x^{(i)} = (1, x_1, x_2)\), with a 1 for the bias. inner 3 = 3 ✓ · each bracket is one number, so its square is one number too ✓</p>`,
          why: R`<p>You don't need to know LMS by heart: the question prints \(J\). The extension sheet (if you get it) has it too:</p><p>[sheet: Least mean squares classification]</p><p>It writes the same loss (with a ½) split by class, \((1 - w^\top x)^2\) for positives and \((1 + w^\top x)^2\) for negatives. Both are 0 when the score equals the label.</p>` },
        { line: R`<b>\(J = 0\) needs every score = its label (±1).</b> Part 2's line \(w = (0, 1, 1)\) has the right signs but scores \((4, 4, -4, -4)\). Divide by 4: <div class="formula">\[w = (0, \tfrac14, \tfrac14) \;\text{ scores }\; (1, 1, -1, -1) = y\]</div>`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{w}_{\textstyle 3\times 1} = \underbrace{(1, 1, -1, -1)}_{\textstyle 4\times 1}\]<p>4 samples × (1 + 2 features); inner 3 = 3 ✓ · result 4×1 = one score per sample ✓ (each row of the why? table is one row of \(X\) · \(w\))</p><p>Wrong order: \(wX\) = (3×1)(4×3), inner 1 ≠ 4 ✗</p>`,
          why: R`<p>Each score = row \((1, x_1, x_2)\) · \(w\):</p>
<div class="tw"><table><thead><tr><th>row</th><th>· \((0, \tfrac14, \tfrac14)\)</th><th>score</th><th>label</th></tr></thead><tbody>
<tr><td>(1, 2, 2)</td><td>0 + 0.5 + 0.5</td><td>1</td><td>+1</td></tr>
<tr><td>(1, 3, 1)</td><td>0 + 0.75 + 0.25</td><td>1</td><td>+1</td></tr>
<tr><td>(1, −2, −2)</td><td>0 − 0.5 − 0.5</td><td>−1</td><td>−1</td></tr>
<tr><td>(1, −3, −1)</td><td>0 − 0.75 − 0.25</td><td>−1</td><td>−1</td></tr></tbody></table></div>
<p>Dividing by 4 doesn't move the line (same signs), it only makes the scores the right size.</p>` },
        { line: R`<b>Every (…) is 0</b> — \(w^\top x^{(i)} - y^{(i)} = 0\) for all four samples, so \(J = 0\), the minimum. The LMS classifier is \(w = (0, \tfrac14, \tfrac14)\). Done.`,
          size: R`\[\underbrace{X}_{\textstyle 4\times 3}\,\underbrace{w}_{\textstyle 3\times 1} - \underbrace{y}_{\textstyle 4\times 1} = \underbrace{(0, 0, 0, 0)}_{\textstyle 4\times 1}\]<p>inner 3 = 3 ✓ · four scores minus four labels = four brackets, all 0 ✓</p><p>numpy: <code>X.shape</code> = (4, 3), <code>y.shape</code> = (4,), so <code>lstsq</code> returns shape (3,), one weight per knob ✓</p>`,
          extra: [{ label: "check it with numpy", html: R`<pre><code>np.linalg.lstsq(X, y, rcond=None)[0]
# array([0.  , 0.25, 0.25])</code></pre><p>Same \(w\), and it's the only one (\(X\) has rank 3).</p>` }] },
      ],
      compare: R`Same as the official answer: \(w = (0, \tfrac14, \tfrac14)\) gives \(w^\top x^{(i)} - y^{(i)} = 0\) for every sample (steps 2–3), so the loss is 0, the minimum possible (step 1).`,
      slip: R`The stray commas under the fractions ("4,") are formatting junk. The vector is just \(w = (0, \tfrac14, \tfrac14)\).`,
    },

    "2025C-q3.4": {
      point: R`Max-margin only cares about the closest samples: \((2, 3)\) is farther away than them, so nothing changes. LMS cares about every sample's score = label: \((2, 3)\) scores 1.25, not 1, so LMS changes.`,
      start: R`<p><b>Max-margin:</b> □</p>
<p><b>Because:</b> \((2, 3)\) scores □, its distance □ is more than the margin □, and □</p>
<p><b>LMS:</b> □</p>
<p><b>Because:</b> with \(w = (0, \tfrac14, \tfrac14)\) the new \((\dots)\) is □, so</p>
\[J = \;\square\]
<p>and \(w = (\square, \tfrac14, \tfrac14)\) gives</p>
\[J = \;\square \lt \tfrac1{80} \;\text{ for }\; \square\]
<p>so □</p>`,
      answer: R`<p><b>Max-margin:</b> doesn't change.</p>
<p><b>Because:</b> \((2, 3)\) scores \(2 + 3 = 5 \gt 0\) (correct side), its distance \(5/\sqrt2 \approx 3.54\) is more than the margin \(2\sqrt2 \approx 2.83\), and adding a sample can never increase the margin, so \(w = (0, 1, 1)\) is still the max-margin classifier.</p>
<p><b>LMS:</b> changes.</p>
<p><b>Because:</b> with \(w = (0, \tfrac14, \tfrac14)\) the new \((\dots)\) is \(\tfrac{2 + 3}{4} - 1 = 0.25\), so</p>
\[J = \tfrac15\big(0^2 + 0^2 + 0^2 + 0^2 + 0.25^2\big) = \tfrac1{80}\]
<p>and \(w = (-\varepsilon, \tfrac14, \tfrac14)\) gives</p>
\[J = \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80} \lt \tfrac1{80} \;\text{ for }\; 0 \lt \varepsilon \lt 0.1\]
<p>so \(w = (0, \tfrac14, \tfrac14)\) no longer minimizes the LMS loss.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Affects the classifier?" = is the old classifier still the best for its own goal? Max-margin: largest distance to the closest sample. LMS: smallest \(J\). Check each goal with \((2, 3)\) added.` },
        { line: R`<b>Max-margin: where is (2, 3)?</b> Score \(2 + 3 = 5 \gt 0\), so it's on the correct side. Its distance \(5/\sqrt2 \approx 3.54\) is more than the margin \(2\sqrt2 \approx 2.83\).`,
          remember: R`\[\text{distance}(x, \text{line}) = \frac{|w^\top x + w_0|}{\|w\|}\]<p>\(\|w\|\) has no \(w_0\) in it. Not on the sheet. Here \(w = (1, 1)\), \(w_0 = 0\) (part 2's line).</p>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 3}\,\underbrace{x}_{\textstyle 3\times 1} = (0, 1, 1)\cdot(1, 2, 3) = 5\]<p>inner 3 = 3 ✓ · one score. The distance divides by \(\|w\|\) of the 2 feature weights \((1, 1)\) only: \(\sqrt{w^\top w}\) = √((1×2)(2×1)) = \(\sqrt2\) ✓</p>`,
          why: R`<p>Distance = |score| ÷ length of \(w = (1, 1)\) = \(|x_1 + x_2|/\sqrt{1^2 + 1^2}\), so \((2, 3)\) is \(5/\sqrt2\) away. (Same formula as part 2, step 2.)</p>` },
        { line: R`<b>So max-margin doesn't change.</b> The old line still has margin \(2\sqrt2\), and adding a sample can never increase the best margin. So nothing beats the old line.`,
          why: R`<p>The margin = distance to the <b>closest</b> sample. A new sample either is closer (margin shrinks) or isn't (margin stays). It can never make it bigger.</p>` },
        { line: R`<b>LMS: the new (…) isn't 0.</b> With \(w = (0, \tfrac14, \tfrac14)\): \(\tfrac14\cdot 2 + \tfrac14\cdot 3 - 1 = 0.25\). <div class="formula">\[J = \tfrac15\big(0^2 + 0^2 + 0^2 + 0^2 + 0.25^2\big) = \tfrac1{80}\]</div>\(J \gt 0\) now, so "\(J = 0\) is the minimum" no longer proves anything: show a \(w\) that beats it.`,
          size: R`\[\underbrace{X}_{\textstyle 5\times 3}\,\underbrace{w}_{\textstyle 3\times 1} - \underbrace{y}_{\textstyle 5\times 1} = \underbrace{(0, 0, 0, 0, 0.25)}_{\textstyle 5\times 1}\]<p>The new sample adds a 5th row \((1, 2, 3)\), so \(X\) is now 5×3. inner 3 = 3 ✓ · five brackets, so \(\tfrac15\) ✓</p>` },
        { line: R`<b>A nudged line does better</b> — the new score 1.25 is too high, so lower the scores a bit. The bias \(w_0\) shifts every score at once: \(w = (-\varepsilon, \tfrac14, \tfrac14)\): <div class="formula">\[J = \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80} \lt \tfrac1{80} \;\text{ for } 0 \lt \varepsilon \lt 0.1\]</div>So \(w = (0, \tfrac14, \tfrac14)\) is no longer the minimum: LMS changes. Done.`,
          size: R`\[\underbrace{X}_{\textstyle 5\times 3}\,\underbrace{w}_{\textstyle 3\times 1} = \underbrace{\text{scores}}_{\textstyle 5\times 1}\]<p>inner 3 = 3 ✓ · \(w = (-\varepsilon, \tfrac14, \tfrac14)\): the \(-\varepsilon\) meets \(X\)'s column of 1s, so all 5 scores drop by \(\varepsilon\) ✓</p>\[\underbrace{X^\top}_{\textstyle 3\times 5}\,\underbrace{(Xw - y)}_{\textstyle 5\times 1} = 3\times 1\]<p>(the gradient in "another way") inner 5 = 5 ✓ · one entry per knob ✓ · wrong order \(X(Xw - y)\) = (5×3)(5×1) ✗</p>`,
          why: R`<p>Why lowering every score works: the four old (…) only grow like \(\varepsilon^2\) (tiny), the new one shrinks like \(\varepsilon\). So for a small \(\varepsilon\) the total goes down. The four old (…) become \(-\varepsilon\), the new one becomes \(0.25 - \varepsilon\):</p>
\[\begin{aligned}J &= \tfrac15\big(4\varepsilon^2 + (\tfrac14 - \varepsilon)^2\big)\\ &= \tfrac15\big(4\varepsilon^2 + \tfrac1{16} - \tfrac{\varepsilon}{2} + \varepsilon^2\big)\\ &= \tfrac15\big(5\varepsilon^2 - \tfrac{\varepsilon}{2} + \tfrac1{16}\big)\\ &= \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80}\end{aligned}\]
<p>Below \(\tfrac1{80}\) when \(\varepsilon^2 - \tfrac{\varepsilon}{10} \lt 0\), i.e. \(0 \lt \varepsilon \lt 0.1\). Example \(\varepsilon = 0.05\): \(0.0025 - 0.005 + 0.0125 = 0.01 \lt 0.0125\).</p>`,
          extra: [{ label: "the official solution writes w = (ε, ¼, ¼) — it's a slip", html: R`<p>With \(+\varepsilon\) every score goes <b>up</b>, so the loss goes up: at \(\varepsilon = 0.05\) it is \(\tfrac15(4\cdot 0.05^2 + 0.3^2) = 0.02 \gt 0.0125\). Its own \((\tfrac14 - \varepsilon)^2\) and "move the line toward the positives" both need \(w_0 = -\varepsilon\).</p>` },
                  { label: "another way: the gradient isn't 0", html: R`<p>\(J = \tfrac15\sum_i (w^\top x^{(i)} - y^{(i)})^2\). Each squared bracket → 2 · (…) · (the number in front of \(w_j\), i.e. that sample's \(x_j\)). Stacked over the knobs \(w_0, w_1, w_2\): \(\nabla J = \tfrac25 X^\top(Xw - y)\). (We saw this in 2025-C Q1, part 2.) The errors are \((0, 0, 0, 0, 0.25)\), so only the new row \((1, 2, 3)\) counts:</p>\[\nabla J = \tfrac25\cdot 0.25\cdot(1, 2, 3) = (0.1,\ 0.2,\ 0.3) \ne 0\]` }] },
      ],
      compare: R`Steps 2–3 are the official max-margin sentence ("correctly classified, farther away, the margin cannot increase"). Steps 4–5 are its LMS part, with one slip: the official \(w = (\varepsilon, \tfrac14, \tfrac14)\) must be \((-\varepsilon, \tfrac14, \tfrac14)\).`,
      slip: R`<ul><li>The shifted classifier should be \(w = (-\varepsilon, \tfrac14, \tfrac14)\), not \((+\varepsilon, \tfrac14, \tfrac14)\). Only \(-\varepsilon\) moves the line toward the positives and gives the loss \(\varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80}\) they write.</li><li>The stray commas under the fractions ("4,", "5,") are formatting junk: \(w = (0, \tfrac14, \tfrac14)\) and the prefactor is \(\tfrac15\).</li></ul>`,
    },

    "2025C-q3.5": {
      point: R`The two negatives sit together, so put them inside a circle. A circle's formula, expanded, is a weighted sum of \(1, x_1, x_2, x_1^2, x_2^2\): those features are \(\varphi\), and the weights are \(w\).`,
      start: R`<p><b>Circle:</b> centre \((a, b) = (\square, \square)\), radius \(r = \square\)</p>
<p><b>Rule</b> (negative inside the circle):</p>
\[\mathrm{sign}\big((x_1 - a)^2 + (x_2 - b)^2 - r^2\big) = \mathrm{sign}(\square)\]
<p><b>Mapping:</b></p>
\[\varphi(x_1, x_2) = (\square, \square, \square, \square, \square)\]
<p><b>Hyperplane:</b> \(\{z \in \mathbb{R}^{\square} : w^\top z = 0\}\) with</p>
\[w = (\square, \square, \square, \square, \square)\]
<p><b>Check:</b> \(w^\top\varphi(x)\) = □ → signs = the labels.</p>`,
      answer: R`<p><b>Circle:</b> centre \((a, b) = (-2.5, -1.5)\), radius \(r = 1\)</p>
<p><b>Rule</b> (negative inside the circle):</p>
\[\begin{aligned}&\mathrm{sign}\big((x_1 + 2.5)^2 + (x_2 + 1.5)^2 - 1\big)\\ &= \mathrm{sign}(7.5 + 5x_1 + 3x_2 + x_1^2 + x_2^2)\end{aligned}\]
<p><b>Mapping:</b></p>
\[\varphi(x_1, x_2) = (1, x_1, x_2, x_1^2, x_2^2)\]
<p><b>Hyperplane:</b> \(\{z \in \mathbb{R}^5 : w^\top z = 0\}\) with</p>
\[w = (7.5, 5, 3, 1, 1)\]
<p><b>Check:</b> \(w^\top\varphi(x)\) = 31.5, 35.5, −0.5, −0.5, 13.5 → signs +, +, −, −, + = the labels.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> A \(\varphi\) where one hyperplane separates. Work backwards: find a <b>curve</b> that separates the original points, expand its formula. What it multiplies by numbers = \(\varphi\); the numbers = \(w\).`,
          why: R`<p>A hyperplane in \(\varphi\)-space is \(w^\top\varphi(x) = 0\): a sum of number × feature. Any curve whose formula is such a sum becomes a hyperplane once those features are the new coordinates.</p>` },
        { line: R`<b>Which curve? A circle around the negatives</b> — they sit close together, the positives far away. Centre = their midpoint \((-2.5, -1.5)\). Negatives: 0.71 from it; nearest positive \((-4, -5)\): 3.81. So \(r = 1\).`,
          why: R`<p>The radius must be bigger than the distance to every negative and smaller than the distance to every positive:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>label</th><th>distance to \((-2.5, -1.5)\)</th></tr></thead><tbody>
<tr><td>(−2, −2)</td><td>−</td><td>\(\sqrt{0.5^2 + 0.5^2} \approx 0.71\)</td></tr>
<tr><td>(−3, −1)</td><td>−</td><td>\(\sqrt{0.5^2 + 0.5^2} \approx 0.71\)</td></tr>
<tr><td>(−4, −5)</td><td>+</td><td>\(\sqrt{1.5^2 + 3.5^2} \approx 3.81\)</td></tr>
<tr><td>(2, 2)</td><td>+</td><td>\(\sqrt{4.5^2 + 3.5^2} \approx 5.70\)</td></tr>
<tr><td>(3, 1)</td><td>+</td><td>\(\sqrt{5.5^2 + 2.5^2} \approx 6.04\)</td></tr></tbody></table></div>
<p>Anything between 0.71 and 3.81 works.</p>` },
        { line: R`<b>Expand the circle, select the pieces</b> — orange = numbers, blue = features: <div class="formula">\[\begin{aligned}&(x_1 + 2.5)^2 + (x_2 + 1.5)^2 - 1^2\\ &= \textcolor{#e8912d}{7.5}\cdot\textcolor{#4c8dff}{1} + \textcolor{#e8912d}{5}\,\textcolor{#4c8dff}{x_1} + \textcolor{#e8912d}{3}\,\textcolor{#4c8dff}{x_2} + \textcolor{#e8912d}{1}\,\textcolor{#4c8dff}{x_1^2} + \textcolor{#e8912d}{1}\,\textcolor{#4c8dff}{x_2^2}\end{aligned}\]</div><div class="formula">\[\textcolor{#4c8dff}{\varphi(x) = (1, x_1, x_2, x_1^2, x_2^2)}\]</div><div class="formula">\[\textcolor{#e8912d}{w = (7.5, 5, 3, 1, 1)}\]</div>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 5}\,\underbrace{\varphi(x)}_{\textstyle 5\times 1} = \text{one score}\]<p>\(\varphi\) has 5 entries, so \(w\) needs 5 weights: inner 5 = 5 ✓ · one number ✓. The 2-long \(x\) only goes in through \(\varphi\): \(w^\top x\) = (1×5)(2×1) ✗</p>`,
          why: R`<p>(squared distance to the centre) − \(r^2\) is negative inside the circle and positive outside. Expand each bracket:</p>
\[\begin{aligned}(x_1 + 2.5)^2 &= x_1^2 + 5x_1 + 6.25\\ (x_2 + 1.5)^2 &= x_2^2 + 3x_2 + 2.25\\ 6.25 + 2.25 - 1 &= 7.5\end{aligned}\]
<p>In general it's \(w = (a^2 + b^2 - r^2,\ -2a,\ -2b,\ 1,\ 1)\), as in the official solution.</p>` },
        { line: R`<b>Check every sample</b> — \(w^\top\varphi(x)\) = 31.5, 35.5, −0.5, −0.5, 13.5: signs +, +, −, −, + = the labels. The hyperplane is \(\{z \in \mathbb{R}^5 : w^\top z = 0\}\). Done.`,
          size: R`\[\underbrace{\Phi}_{\textstyle 5\times 5}\,\underbrace{w}_{\textstyle 5\times 1} = \underbrace{(31.5, 35.5, -0.5, -0.5, 13.5)}_{\textstyle 5\times 1}\]<p>\(\Phi\) = one row \(\varphi(x^{(i)})\) per sample: 5 samples × 5 features (square only by chance). inner 5 = 5 ✓ · one score per sample ✓</p>`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>\(7.5 + 5x_1 + 3x_2 + x_1^2 + x_2^2\)</th><th>sign</th><th>label</th></tr></thead><tbody>
<tr><td>(2, 2)</td><td>7.5 + 10 + 6 + 4 + 4 = 31.5</td><td>+</td><td>+</td></tr>
<tr><td>(3, 1)</td><td>7.5 + 15 + 3 + 9 + 1 = 35.5</td><td>+</td><td>+</td></tr>
<tr><td>(−2, −2)</td><td>7.5 − 10 − 6 + 4 + 4 = −0.5</td><td>−</td><td>−</td></tr>
<tr><td>(−3, −1)</td><td>7.5 − 15 − 3 + 9 + 1 = −0.5</td><td>−</td><td>−</td></tr>
<tr><td>(−4, −5)</td><td>7.5 − 20 − 15 + 16 + 25 = 13.5</td><td>+</td><td>+</td></tr></tbody></table></div>`,
          extra: [{ label: "the official r = 0.6 is a slip", html: R`<p>The negatives are 0.71 from the centre, so a circle of radius 0.6 misses them: its \(w = (8.14, 5, 3, 1, 1)\) gives \(8.14 - 10 - 6 + 4 + 4 = +0.14\) for both negatives (wrong sign). Use any \(r\) between 0.71 and 3.81, e.g. \(r = 1\). It also prints \((x_2 - a)^2\) where it means \((x_2 - b)^2\).</p>` },
                  { label: "the question's premise is false (don't argue it in the exam)", html: R`<p>The extended data <b>is</b> linearly separable: \(7x_1 - 6x_2\) scores \(2, 15, -2, -15, 2\) on the five samples, all the right signs. Answer the question as asked anyway.</p>` }] },
      ],
      compare: R`Same \(\varphi = (1, x_1, x_2, x_1^2, x_2^2)\), centre and general \(w\) as the official answer (steps 2–3). Its radius \(r = 0.6\) is a slip (both negatives fall outside); \(r = 1\) gives \(w = (7.5, 5, 3, 1, 1)\), checked in step 4.`,
      slip: R`<ul><li>Radius 0.6 doesn't reach the negatives (they're 0.71 from the centre). Use \(r = 1\), which gives \(w = (7.5, 5, 3, 1, 1)\).</li><li>\((x_2 - a)^2\) should be \((x_2 - b)^2\).</li><li>The extended data actually is linearly separable (e.g. \(\mathrm{sign}(7x_1 - 6x_2)\)), but answer the question as asked.</li></ul>`,
    },

    // ───────────────────────── 2025-B Q4 ─────────────────────────
    "2025B-q4.1": {
      point: R`The max-margin line runs exactly midway between the two rows of samples. Every sample then has y · score = 1, so the margin is \(1/\|w\|\) (a distance, not 1); \((2, 0)\) has y · score = 2 ≥ 1, so nothing changes.`,
      start: R`<p><b>(a)</b> The line: \(\;\square = 0\;\) (\(w = (\square, \square)\), \(w_0 = \square\))</p>
<p><b>(b)</b> Every sample: \(y_i(w^\top x^{(i)} + w_0) = \square\), so the margin is</p>
\[\frac{1}{\|w\|} = \;\square\]
<p><b>(c)</b> New sample: \(y(w^\top x + w_0) = \square \ge 1\), so \(\;\square\)</p>`,
      answer: R`<p><b>(a)</b> The line: \(x_1 - x_2 = 0\) (\(w = (1, -1)\), \(w_0 = 0\))</p>
<p><b>(b)</b> Every sample: \(y_i(w^\top x^{(i)} + w_0) = 1\) (all samples are on the margin), so the margin is</p>
\[\frac{1}{\|w\|} = \frac{1}{\sqrt{1^2 + (-1)^2}} = \frac{\sqrt2}{2} \approx 0.707\]
<p><b>(c)</b> New sample: \(y(w^\top x + w_0) = (+1)(2 - 0) = 2 \ge 1\), so it is correctly classified and outside the margin. Adding a sample can never make the margin grow, so the max-margin classifier doesn't change.</p>`,
      moves: [
        { line: R`<b>(a) Midway between the two lines</b> — max-margin = as far as possible from the closest samples. The samples sit on two parallel lines, so go exactly halfway between \(x_1 - x_2 = 1\) and \(x_1 - x_2 = -1\): <div class="formula">\[x_1 - x_2 = 0 \qquad (w = (1, -1),\ w_0 = 0)\]</div>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{x}_{\textstyle 2\times 1} + \underbrace{w_0}_{\textstyle 1\times 1} = x_1 - x_2\]<p>Here the bias \(w_0\) is kept apart, so \(w = (1, -1)\) and \(x = (x_1, x_2)\) are both 2 long, no 1 in front of \(x\). inner 2 = 2 ✓ · one score ✓</p>`,
          why: R`<p>Every sample has \(x_1 - x_2 = +1\) (positives) or \(-1\) (negatives). Moving the line toward one row brings it closer to that row, so the best is exactly halfway: \(x_1 - x_2 = 0\), equally far from every sample. (Grader's note: "they only need to specify the line".)</p>` },
        { line: R`<b>(b) y · score = 1 for every sample</b> — positives: \((+1)(1) = 1\); negatives: \((-1)(-1) = 1\). All are on the margin, so <div class="formula">\[\text{margin} = \frac{1}{\|w\|} = \frac{1}{\sqrt{1^2 + (-1)^2}} = \frac{\sqrt2}{2} \approx 0.707\]</div>`,
          remember: R`\[\begin{aligned}&y_i(w^\top x^{(i)} + w_0) = 1 \text{ on the closest samples}\\ &\text{margin} = \frac{1}{\|w\|}\end{aligned}\]<p>It comes from distance \(= |w^\top x + w_0|/\|w\|\). Not on the sheet: [sheet: Primal objective function (to minimize)] only has the constraint \(y_i(w^\top x^{(i)} + w_0) \ge 1 - \xi_i\).</p>`,
          size: R`\[\underbrace{y_i}_{\textstyle 1\times 1}\big(\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{x^{(i)}}_{\textstyle 2\times 1} + w_0\big) = 1\]\[\|w\| = \sqrt{\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{w}_{\textstyle 2\times 1}} = \sqrt2\]<p>inner 2 = 2 ✓ · the bracket is one number, times the label (one number) ✓. All 10 samples at once: \(Xw + w_0\) = (10×2)(2×1) = one score per sample ✓</p>`,
          why: R`<p>The SVM constraint is \(y_i(w^\top x^{(i)} + w_0) \ge 1\) with \(\xi_i = 0\). Samples with exactly 1 are the closest ones. The constraint is on the sheet:</p><p>[sheet: Primal objective function (to minimize)]</p>
<p>Their distance = |score| ÷ \(\|w\|\) = \(1/\sqrt2\). The 1 is a score, not a distance: answering "margin = 1" gets only partial credit (grader's note).</p>` },
        { line: R`<b>(c) The new sample \((2, 0)\):</b> \((+1)(2 - 0) = 2 \ge 1\), correct side and outside the margin. The old line keeps its margin, and a margin can't grow by adding a sample, so nothing changes. Done.`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 2}\,\underbrace{(2, 0)}_{\textstyle 2\times 1} + 0 = 2\]<p>inner 2 = 2 ✓ · one score, times \(y = +1\) → 2 ✓</p>`,
          why: R`<p>The margin = distance to the <b>closest</b> sample. A new sample either is closer (margin shrinks) or isn't (margin stays). It can never make it bigger, so no other line can beat the old one.</p>`,
          extra: [{ label: "the official (c) says the margin \"cannot shrink\" — read it as \"cannot grow\"", html: R`<p>"Cannot shrink" is true only for this sample (it's outside the margin band). The general fact the argument needs: adding a sample can never make the margin <b>grow</b> (a sample inside the band does shrink it). 2025-C Q3.4's solution says it right: "the margin cannot increase by adding samples".</p>` }] },
      ],
      compare: R`Step 1 is the official \(x_1 - x_2 = 0\), \(w = (1, -1)\), \(w_0 = 0\). Step 2 is its \(1/\|w\| = \sqrt2/2\). Step 3 is its (c), with "cannot shrink" read as "cannot grow".`,
      slip: R`"The margin cannot shrink by adding a sample" is backwards: adding a sample can never make the margin <b>grow</b>. Here \((2,0)\) has \(y\cdot\text{score} = 2 \ge 1\), so the old line stays optimal.`,
    },

    "2025B-q4.2": {
      point: R`\(C\) is the price of each margin violation. Big \(C\) → no errors, narrow margin. Small \(C\) → wide margin, errors allowed. So: count the errors, then compare the margins.`,
      start: R`<p><b>C = 100 → plot □</b>, because □</p>
<p><b>C = 0.01 → plot □</b>, because □</p>
<p><b>C = 1 → plot □</b>, because □</p>`,
      answer: R`<p><b>C = 100 → plot B</b>, because a large \(C\) makes every margin violation expensive, so no (or few) errors. B is the only plot with no misclassified sample.</p>
<p><b>C = 0.01 → plot A</b>, because a small \(C\) makes violations cheap, so \(\tfrac12\|w\|^2\) wins: small \(\|w\|\) = wide margin \(1/\|w\|\). A's line is farther from the closest filled circle than C's, so A has the wider margin.</p>
<p><b>C = 1 → plot C</b>, because an in-between \(C\) gives an in-between margin and some violations.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> What does \(C\) do to the picture? In the loss, \(C\) multiplies the violations. Big \(C\) → violations expensive → no errors, narrow margin. Small \(C\) → \(\tfrac12\|w\|^2\) wins → wide margin.`,
          remember: R`\[\text{margin} = \frac{1}{\|w\|}\]<p>So small \(\|w\|\) = wide margin. Not on the sheet: [sheet: Hinge loss objective formulation] has the \(\tfrac12\|w\|^2\) but doesn't say it sets the margin.</p>`,
          why: R`<p>The loss is printed in the question (and on the sheet: [sheet: Hinge loss objective formulation]): \(\tfrac12\|w\|^2 + \tfrac Cn\sum_i\max(0,\ \dots)\). \(C\) multiplies the violations, so a big \(C\) makes them expensive: the line avoids every error, even at a narrow margin. A small \(C\) makes them cheap, so making \(\|w\|\) small (wide margin) matters more.</p>` },
        { line: R`<b>Count the errors.</b> Plot B has none, so <b>C = 100 → B</b>. A and C both leave the unfilled circle at about \((0.4, -0.7)\) on the filled side.` },
        { line: R`<b>A vs C: wider margin.</b> A's line is farther from the closest filled circle, so A has the wider margin: <b>C = 0.01 → A</b>.`,
          why: R`<p>The margin band reaches at least to the closest filled circle, so the line's distance to that circle is a lower bound on the margin. In A it's clearly bigger than in C (the official solution's argument).</p>` },
        { line: R`<b>What's left:</b> <b>C = 1 → C</b>, the in-between margin and violations. Done.` },
      ],
      compare: R`Same matching as the official answer: C = 100 → B (only plot without errors, step 2), C = 0.01 → A (line farther from the closest filled circle, step 3), C = 1 → C by elimination (step 4).`,
    },

    "2025B-q4.3": {
      point: R`Cross-validation = train on the other folds, predict the held-out fold, score it by the fraction of mistakes, average over the folds, keep the smallest average. Each bug breaks one of these.`,
      start: R`<p>One line per bug (at least three):</p>
<p><b>(1) Line □:</b> <code>□</code> → <code>□</code>, because □</p>
<p><b>(2) Line □:</b> <code>□</code> → <code>□</code>, because □</p>
<p><b>(3) Line □:</b> <code>□</code> → <code>□</code>, because □</p>
<p><b>(4) Line □:</b> <code>□</code> → <code>□</code>, because □</p>
<p><b>(5) Line □:</b> <code>□</code> → <code>□</code>, because □</p>`,
      answer: R`<p>One line per bug (at least three):</p>
<p><b>(1) Line 1:</b> <code>n = X.shape[1]</code> → <code>n = X.shape[0]</code>, because X is n_samples × p_features, so samples are rows.</p>
<p><b>(2) Line 2:</b> <code>X = np.concatenate(...)</code> → delete it, because the SVM solver returns its own bias <code>w0</code>: no constant feature.</p>
<p><b>(3) Line 17:</b> <code>z_pred = X_train @ w + w0</code> → <code>z_pred = X_val @ w + w0</code>, because we validate on the held-out rows.</p>
<p><b>(4) Line 19:</b> <code>risk = np.sum(w**2)/2 + C * np.mean(...)</code> → <code>risk = np.mean(y_val != y_pred)</code>, because the risk is the misclassification rate, not the hinge loss.</p>
<p><b>(5) Line 22:</b> <code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code>, because the CV risk is the average over all folds, <code>risk</code> is only the last fold's.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Bugs = lines that break the cross-validation recipe. So: recall the recipe (box below), then read the code top to bottom and check each line against it.`,
          remember: R`<p><b>Cross-validation for a hyperparameter:</b> for each value: for each fold: train on the other folds, predict the held-out fold, score = fraction wrong. Average over the folds. Keep the value with the best average.</p><p>Not on the sheet.</p>` },
        { line: R`<b>n counts rows; the SVM brings its own bias.</b> <b>Line 1:</b> <code>X.shape[1]</code> → <code>X.shape[0]</code>. <b>Line 2:</b> delete it (no ones column).`,
          size: R`<p><code>X.shape</code> = (n_samples, p_features) = (rows, columns). So <code>shape[0]</code> = n ✓, <code>shape[1]</code> = p ✗.</p><p>Line 2 glues <code>np.ones((n, 1))</code> next to <code>X</code>: it needs n rows like <code>X</code>. With the line 1 bug it's (p, 1) next to (n, p) ✗. Fixed, <code>X</code> becomes (n, p + 1): a 1s column doing <code>w0</code>'s job, so the bias counts twice ✗.</p>`,
          why: R`<p>The docstring says <code>X</code> is n_samples × p_features, so samples are rows: <code>shape[0]</code>. The solver returns its own <code>w0</code> and <code>z_pred</code> adds it, so a ones column would count the bias twice.</p>` },
        { line: R`<b>Score the held-out rows by mistakes.</b> <b>Line 17:</b> <code>X_train @ w + w0</code> → <code>X_val @ w + w0</code>. <b>Line 19:</b> → <code>risk = np.mean(y_val != y_pred)</code>.`,
          size: R`<p><code>X_val @ w + w0</code>: (n_val, p) @ (p,) = (n_val,), plus one number = one score per validation row ✓, the same length as <code>y_val</code>.</p><p><code>X_train @ w</code> is (n_train,): with 5 folds about 4× longer than <code>y_val</code> ✗.</p><p><code>y_val != y_pred</code>: (n_val,) vs (n_val,) → <code>np.mean</code> = one number, the fraction wrong ✓</p>`,
          why: R`<p>Validation must predict the rows the model didn't train on. And the hinge objective has \(C\) inside it, so a bigger \(C\) inflates the number by itself: comparing it across \(C\)'s means nothing. What we care about is the fraction of validation rows predicted wrong.</p>` },
        { line: R`<b>Compare the average over folds.</b> <b>Line 22:</b> <code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code>. Done (5 bugs; 3 are enough).`,
          why: R`<p><code>risk</code> is only the last fold's number. The CV risk of this \(C\) is the average over all folds, and that's also what line 23 stores.</p>` ,
          extra: [{ label: "the line numbers are messy — write the statement too", html: R`<p>On the exam page the <code>z_pred</code>, <code>risk</code> and <code>if</code> lines are 17, 19 and 22 (as above). The official solution calls them 16, 17 and 22.</p><p>Also, the question says "lines 11–17 do not contain errors", yet line 17 (<code>z_pred</code>) is one of the official bugs — the exam contradicts itself. So always write the statement itself next to the number; the grader can't miss that.</p>` },
                  { label: "one more the official list misses: line 10", html: R`<p><code>np.arange(n)[i::k]</code> uses <code>k</code>, which is never defined. It should be <code>np.arange(n)[i::n_splits]</code> (fold \(i\) = every <code>n_splits</code>-th row starting at \(i\)). Not needed for full points.</p>` }] },
      ],
      compare: R`The official list has the same 5 bugs (lines 1 and 2 = step 2; then <code>z_pred</code>, <code>risk</code> = step 3; the <code>if</code> = step 4), numbering the last three 16, 17, 22.`,
      slip: R`The official line numbers (16, 17, 22) don't match the exam page: the <code>z_pred</code>, <code>risk</code> and <code>if</code> lines are 17, 19 and 22. And the question says lines 11–17 have no errors, yet the <code>z_pred</code> line (17) is one of the official bugs. Write the statement next to the line number.`,
    },

    // ───────────────────────── 2026-A Q3 ─────────────────────────
    "2026A-q3.1": {
      point: R`\(u^\top v\) is just a dot product — one number. Plug it into \((1 + u^\top v)^2\).`,
      start: R`\[K(u, v) = (1 + u^\top v)^2 = (1 + \square)^2 = \square\]`,
      answer: R`\[\begin{aligned}K(u, v) &= (1 + u^\top v)^2 = (1 + 1\cdot 3 + 0\cdot 0)^2\\ &= 4^2 = 16\end{aligned}\]`,
      moves: [
        { line: R`<b>\(u^\top v\)</b> — multiply matching entries and add: \(1\cdot 3 + 0\cdot 0 = 3\).`,
          size: R`\[\underbrace{u^\top}_{\textstyle 1\times 2}\,\underbrace{v}_{\textstyle 2\times 1} = 1\cdot 3 + 0\cdot 0 = 3\]<p>inner 2 = 2 ✓ · result 1×1 = one number, so \(1 + u^\top v\) is a number you can square ✓</p><p>\(uv^\top\) = (2×1)(1×2) = 2×2 ✗</p>` },
        { line: R`<b>Add 1, square:</b> \((1 + 3)^2 = 4^2 = 16\). Done.` },
      ],
      compare: R`Same as the official \((1 + 1\cdot 3 + 0\cdot 0)^2 = 4^2 = 16\).`,
    },

    "2026A-q3.2": {
      point: R`Expand \((1 + u^\top v)^2\) and write each term as (a piece of \(u\)) · (the same piece of \(v\)). The list of pieces is \(\varphi\).`,
      start: R`\[\begin{aligned}K(u, v) &= (1 + u_1v_1 + u_2v_2)^2\\ &= \square \;\;\text{(expanded)}\\ &= (\square)(\square) + (\square)(\square) + \dots\end{aligned}\]\[\varphi(x) = (\square, \dots)\]`,
      answer: R`\[\begin{aligned}K(u, v) &= (1 + u_1v_1 + u_2v_2)^2\\ &= 1 + 2u_1v_1 + 2u_2v_2 + 2u_1u_2v_1v_2\\ &\quad + u_1^2v_1^2 + u_2^2v_2^2\\ &= (1)(1) + (\sqrt2u_1)(\sqrt2v_1) + (\sqrt2u_2)(\sqrt2v_2)\\ &\quad + (\sqrt2u_1u_2)(\sqrt2v_1v_2)\\ &\quad + (u_1^2)(v_1^2) + (u_2^2)(v_2^2)\end{aligned}\]\[\varphi(x) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ \sqrt2x_1x_2,\ x_1^2,\ x_2^2\big) \in \mathbb{R}^6\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(\varphi(u)^\top\varphi(v)\) = (piece of \(u\)) · (same piece of \(v\)), added up. Work backwards: expand \(K\) into terms, split each term that way. The pieces of \(u\) = \(\varphi(u)\).` },
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
          size: R`\[K(u, v) = \underbrace{\varphi(u)^\top}_{\textstyle 1\times 6}\,\underbrace{\varphi(v)}_{\textstyle 6\times 1}\]<p>6 terms in the expansion → 6 entries each. inner 6 = 6 ✓ · one number, like \(K\) ✓. \(x\) goes in 2 long, \(\varphi(x)\) comes out 6 long.</p><p>\(\varphi(v)^\top\varphi(u)\) is (1×6)(6×1) = one number either way — a dot product doesn't care about order. (The ℝ⁹ answer: (1×9)(9×1), also one number.)</p>`,
          extra: [{ label: "check it with part 1's numbers", html: R`<p>\(\varphi(1, 0) = (1, \sqrt2, 0, 0, 1, 0)\), \(\varphi(3, 0) = (1, 3\sqrt2, 0, 0, 9, 0)\). Dot product: \(1 + \sqrt2\cdot 3\sqrt2 + 9 = 1 + 6 + 9 = 16\) = part 1's \(K\). ✓</p>` },
                  { label: "the other official answer (ℝ⁹)", html: R`<p>\(\varphi(x) = (1, x_1, x_2, x_1, x_1^2, x_1x_2, x_2, x_2x_1, x_2^2)\): all products \(x_jx_l\) with \(x_0 = 1\). The repeats give the 2's instead of the \(\sqrt2\)'s. Either one gets full points.</p>` }] },
      ],
      compare: R`Step 4 is the official Option 2 (\(\mathbb{R}^6\)). Option 1 (\(\mathbb{R}^9\)) uses repeated entries instead of the \(\sqrt2\)'s.`,
    },

    "2026A-q3.3": {
      point: R`The original data isn't separable: the − sample \((0, 0)\) sits exactly between the + samples \((3, 0)\) and \((-3, 0)\). \(\varphi_A\) and \(\varphi_D\) are linear, so they keep that; \(\varphi_B\) puts a − and a + on the same point; only \(\varphi_C\) (the squares) separates.`,
      start: R`<p><b>\(\varphi_A\):</b> □, because □</p>
<p><b>\(\varphi_B\):</b> □, because □</p>
<p><b>\(\varphi_C\):</b> □ — mapped samples □; \(w_0 = \square\), \(w_1 = \square\), \(w_2 = \square\), rule \(\mathrm{sign}(\square)\)</p>
<p><b>\(\varphi_D\):</b> □, because □</p>`,
      answer: R`<p><b>\(\varphi_A\):</b> not separable, because it is the original data: the − sample 1 \((0, 0)\) is exactly between the + samples 3 \((3, 0)\) and 5 \((-3, 0)\), so any line that scores both + samples positive scores \((0, 0)\) positive too.</p>
<p><b>\(\varphi_B\):</b> not separable, because samples 1 (−) and 4 (+) both map to \((0, 0)\): the same point with different labels.</p>
<p><b>\(\varphi_C\):</b> separable — mapped samples 1:(0,0,−), 2:(1,1,−), 3:(9,0,+), 4:(0,9,+), 5:(9,0,+); \(w_0 = -3\), \(w_1 = 1\), \(w_2 = 1\), rule \(\mathrm{sign}(-3 + x_1^2 + x_2^2)\) (scores −3, −1, 6, 6, 6).</p>
<p><b>\(\varphi_D\):</b> not separable, because it is a linear mapping of the original features, and the original data is not linearly separable (\((0, 0)\) stays exactly between the + samples' images \((6, 3)\) and \((-6, -3)\)).</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> For each mapping: map the 5 samples, then either give a \(w\) that separates, or a reason no line can. So first map them all (table in why?).`,
          size: R`\[\underbrace{\varphi_D(x)}_{\textstyle 2\times 1} = \underbrace{\begin{pmatrix}2 & -1\\ 1 & 2\end{pmatrix}}_{\textstyle 2\times 2}\,\underbrace{\begin{pmatrix}x_1\\ x_2\end{pmatrix}}_{\textstyle 2\times 1}\]<p>inner 2 = 2 ✓ · each mapping takes a 2-long sample to a 2-long one, so each mapping's column is 5 samples × 2 numbers ✓</p>`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>\(y\)</th><th>\(\varphi_A\)</th><th>\(\varphi_B\)</th><th>\(\varphi_C\)</th><th>\(\varphi_D\)</th></tr></thead><tbody>
<tr><td>1 (0, 0)</td><td>−</td><td>(0, 0)</td><td>(0, 0)</td><td>(0, 0)</td><td>(0, 0)</td></tr>
<tr><td>2 (1, 1)</td><td>−</td><td>(1, 1)</td><td>(1, 1)</td><td>(1, 1)</td><td>(1, 3)</td></tr>
<tr><td>3 (3, 0)</td><td>+</td><td>(3, 0)</td><td>(9, 0)</td><td>(9, 0)</td><td>(6, 3)</td></tr>
<tr><td>4 (0, 3)</td><td>+</td><td>(0, 3)</td><td>(0, 0)</td><td>(0, 9)</td><td>(−3, 6)</td></tr>
<tr><td>5 (−3, 0)</td><td>+</td><td>(−3, 0)</td><td>(9, 0)</td><td>(9, 0)</td><td>(−6, −3)</td></tr></tbody></table></div>` },
        { line: R`<b>\(\varphi_A\) — not separable.</b> It's the original data. Plot it: sample 1 \((0, 0)\), −, is exactly between samples 3 \((3, 0)\) and 5 \((-3, 0)\), both +.`,
          why: R`<p>A line's score is linear, so the score of the middle point is the average of the two ends' scores. If both + samples score \(\gt 0\), the middle scores \(\gt 0\) too, so sample 1 is called +. No line gets all three right.</p>` },
        { line: R`<b>\(\varphi_B\) — not separable.</b> Sample 1 (−) and sample 4 (+) both land on \((0, 0)\): the same point with different labels.` },
        { line: R`<b>\(\varphi_C\) — separable.</b> Mapped, every positive has a 9 in one coordinate or the other, the negatives only 0s and 1s. So add them, \(z_1 + z_2\): negatives 0 and 2, positives 9. Cut in between, at 3: <div class="formula">\[w_0 = -3,\ w_1 = w_2 = 1:\;\; \mathrm{sign}(-3 + x_1^2 + x_2^2)\]</div>`,
          size: R`\[\underbrace{w^\top}_{\textstyle 1\times 3}\,\underbrace{(1, z_1, z_2)}_{\textstyle 3\times 1} = -3 + z_1 + z_2\]<p>\(w = (w_0, w_1, w_2) = (-3, 1, 1)\), bias first, so the mapped sample gets a 1 in front. inner 3 = 3 ✓ · one score. All five: \(Zw\) = (5×3)(3×1) = \((-3, -1, 6, 6, 6)\) ✓</p>`,
          why: R`<p>Scores \(-3 + z_1 + z_2\): sample 1: −3, sample 2: −1, samples 3, 4, 5: 6. All the right signs.</p>` },
        { line: R`<b>\(\varphi_D\) — not separable.</b> It's a linear mapping (new features = weighted sums of \(x_1, x_2\)), so "exactly between" survives: \((0, 0)\) is still the midpoint of \((6, 3)\) and \((-6, -3)\). Done.`,
          remember: R`<p>A <b>linear mapping</b> (every new feature = a weighted sum of \(x_1, x_2\)) can't make non-separable data separable: a line on the mapped data is still a line on the original data.</p><p>Not on the sheet.</p>`,
          size: R`\[\underbrace{\begin{pmatrix}2 & -1\\ 1 & 2\end{pmatrix}}_{\textstyle 2\times 2}\,\underbrace{\begin{pmatrix}3\\ 0\end{pmatrix}}_{\textstyle 2\times 1} = \underbrace{\begin{pmatrix}6\\ 3\end{pmatrix}}_{\textstyle 2\times 1}\]<p>inner 2 = 2 ✓. The same matrix sends \((-3, 0)\) to \((-6, -3)\) and \((0, 0)\) to \((0, 0)\), so the midpoint stays the midpoint ✓</p>`,
          why: R`<p>Same reason as \(\varphi_A\): the middle point's score is the average of the two ends' scores. If \((6, 3)\) and \((-6, -3)\) (both +) score \(\gt 0\), then \((0, 0)\) scores \(\gt 0\) too, so sample 1 (−) is called +.</p>` },
      ],
      compare: R`Same four verdicts as the official answer (steps 2–5), with the same \(w_0 = -3\), \(w_1 = w_2 = 1\) for \(\varphi_C\). (Its \(\varphi_B\) line prints sample 4 as "(0,0,−)"; sample 4 is +, which is the whole point.)`,
      slip: R`Typo in the \(\varphi_B\) line: sample 4 is +, so it's 4:(0,0,+). That's the whole point: it lands on the same spot as sample 1 (−) with the opposite label.`,
    },

    "2026A-q3.4": {
      point: R`Kernel perceptron = ordinary perceptron on part 2's \(\varphi(x)\), and it converges iff that mapped data is separable. Part 3's \(\varphi_C\) line uses only \(1, x_1^2, x_2^2\), which are inside part 2's \(\varphi\), so yes.`,
      start: R`<p><b>Answer:</b> □</p>
<p><b>Because:</b> the Perceptron converges (with a small enough learning rate) iff □</p>
<p>The dual Perceptron with \(K\) = the ordinary Perceptron run on □:</p>
\[\varphi(x) = \square\]
<p><b>So:</b> □ separates the mapped data, so □</p>`,
      answer: R`<p><b>Answer:</b> yes, it is guaranteed to converge.</p>
<p><b>Because:</b> the Perceptron converges (with a small enough learning rate) iff the data is linearly separable.</p>
<p>The dual Perceptron with \(K\) = the ordinary Perceptron run on the data mapped by the full quadratic variety (part 2):</p>
\[\varphi(x) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ \sqrt2x_1x_2,\ x_1^2,\ x_2^2\big)\]
<p><b>So:</b> part 3's \(\varphi_C\) rule \(\mathrm{sign}(-3 + x_1^2 + x_2^2)\) uses only \(1, x_1^2, x_2^2\), which are in \(\varphi\): \(w = (-3, 0, 0, 0, 1, 1)\) separates the mapped data, so the Perceptron is guaranteed to converge.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Guaranteed to converge" → the Perceptron converges (small enough learning rate) iff the data is linearly separable. So: which data does the kernel Perceptron really run on, and is it separable there?`,
          remember: R`<p><b>The perceptron converges (with a small enough learning rate) iff the data is linearly separable.</b></p><p>Not on the sheet. Write it in exactly these words: they're the official solution's.</p>` },
        { line: R`<b>Kernel perceptron = perceptron on \(\varphi(x)\)</b> — \(K(u, v) = \varphi(u)^\top\varphi(v)\) with part 2's \(\varphi\): <div class="formula">\[\varphi(x) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ \sqrt2x_1x_2,\ x_1^2,\ x_2^2\big)\]</div>So it's the ordinary perceptron run on the mapped samples.`,
          remember: R`<p><b>Kernel trick:</b> \(K(u, v) = \varphi(u)^\top\varphi(v)\), and the dual perceptron uses the samples only through dot products \(x^{(j)\top}x^{(i)}\), so swapping in \(K\) = the perceptron on \(\varphi(x)\).</p><p>Not on the sheet (the question gives only \(K\)).</p>`,
          size: R`\[\underbrace{\varphi(u)^\top}_{\textstyle 1\times 6}\,\underbrace{\varphi(v)}_{\textstyle 6\times 1} = K(u, v)\]<p>inner 6 = 6 ✓ · one number, just like \(x^{(j)\top}x^{(i)}\) = (1×2)(2×1) that it replaces ✓</p>\[\underbrace{\Phi}_{\textstyle 5\times 6}\,\underbrace{\Phi^\top}_{\textstyle 6\times 5} = \underbrace{K}_{\textstyle 5\times 5}\]<p>All pairs at once (Gram matrix): inner 6 = 6 ✓ · one entry per pair of samples ✓</p>`,
          why: R`<p>The dual perceptron only ever uses the samples through dot products \(x^{(j)\top}x^{(i)}\). Replacing each one by \(K = \varphi^\top\varphi\) is the same as replacing every sample \(x\) by \(\varphi(x)\).</p>` },
        { line: R`<b>Yes — part 3 already separates it.</b> \(-3 + x_1^2 + x_2^2\) uses only \(1, x_1^2, x_2^2\), all inside part 2's \(\varphi\): <div class="formula">\[w = (-3, 0, 0, 0, 1, 1)\]</div>So it's guaranteed to converge. Done.`,
          size: R`\[\underbrace{\Phi}_{\textstyle 5\times 6}\,\underbrace{w}_{\textstyle 6\times 1} = \underbrace{(-3, -1, 6, 6, 6)}_{\textstyle 5\times 1}\]<p>One weight per entry of \(\varphi\): inner 6 = 6 ✓ · one score per sample ✓. Per sample: \(w^\top\varphi(x)\) = (1×6)(6×1).</p>`,
          why: R`<p>\(w^\top\varphi(x) = -3\cdot 1 + 0\cdot\sqrt2x_1 + 0\cdot\sqrt2x_2 + 0\cdot\sqrt2x_1x_2 + 1\cdot x_1^2 + 1\cdot x_2^2\), which is part 3's \(\varphi_C\) rule. On the five samples it scores \(-3, -1, 6, 6, 6\): both − negative, all + positive.</p>`,
          extra: [{ label: "check it with numbers", html: R`<p>Running the dual perceptron in numpy (all \(\lambda = 0\) at the start; on a mistake, \(\lambda_i \mathrel{+}= 0.01\)): the 6th pass makes no mistakes, with \(\lambda = (0.02, 0.04, 0.01, 0.01, 0)\).</p>` }] },
      ],
      compare: R`Same argument as the official answer: kernel perceptron = perceptron on the full quadratic variety (part 2, step 2); converges iff separable (step 1); part 3's \(\varphi_C\) is contained in it (step 3).`,
    },

    "2026A-q3.5": {
      point: R`Cross-validation again: one round per fold, predict the held-out rows, average the fold accuracies, keep the highest average.`,
      start: R`<p><b>(1)</b> □</p>
<p><b>(2)</b> □</p>
<p><b>(3)</b> □</p>
<p><b>(4)</b> □</p>`,
      answer: R`<p><b>(1)</b> <code>range(m)</code></p>
<p><b>(2)</b> <code>X[left_out_indices, :]</code></p>
<p><b>(3)</b> <code>np.mean(fold_scores)</code></p>
<p><b>(4)</b> <code>&gt;</code></p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Four blanks in a cross-validation loop. Recall the recipe (box below), then for each blank ask: which step of the recipe is this line doing?`,
          remember: R`<p><b>Cross-validation for a hyperparameter:</b> for each value: for each fold: train on the other folds, predict the held-out fold, score it. Average over the folds. Keep the value with the best average.</p><p>Not on the sheet.</p>` },
        { line: R`<b>(1) One round per fold:</b> <code>range(m)</code>.`,
          why: R`<p><code>np.arange(n)[i::m]</code> is fold \(i\), so \(i\) must run over 0, 1, …, m − 1.</p>` },
        { line: R`<b>(2) Predict the held-out rows:</b> <code>X[left_out_indices, :]</code>.`,
          size: R`<p><code>X[left_out_indices, :]</code>: about n/m rows (n/5 in the example), all columns → <code>pred</code> has one entry per left-out row, the same length as <code>y[left_out_indices]</code> ✓</p><p><code>X_train</code> has about 4n/5 rows → <code>pred == y[...]</code> lengths don't match ✗</p>`,
          why: R`<p>The next line compares <code>pred</code> with <code>y[left_out_indices]</code>, so it must predict those same rows, which the model didn't train on.</p>` },
        { line: R`<b>(3) Average over the folds:</b> <code>np.mean(fold_scores)</code>.` },
        { line: R`<b>(4) Accuracy: higher is better:</b> <code>&gt;</code>. Done.`,
          why: R`<p><code>np.mean(pred == y[...])</code> is the fraction correct, and <code>best_score = -1</code> starts below any accuracy.</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>In 2026-B you wrote <code>grad &lt; epsilon</code> — the wrong quantity in a blank like this. First decide what is compared (here: accuracy), then the direction.</p>` }] },
      ],
      compare: R`Same four blanks as the official answer (steps 2–5): <code>range(m)</code>, <code>X[left_out_indices, :]</code>, <code>np.mean(fold_scores)</code>, <code>&gt;</code>.`,
    },
  });
})();
