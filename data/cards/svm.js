// Recipe cards for topic "svm". Standard: spec/CARDS.md. Built from data/notes/svm.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["svm"] = {
    intro: R`<p>Max-margin lines, SVM, mappings and kernels: 2025-C Q3, 2025-B Q4, 2026-A Q3. Start with 2025-C Q3 (the guided one) and go part by part: each part shows the recipe card(s) it needs, right above it. Read the card (1–2 min), do the part on paper, then check against the official solution. Most parts are small hand calculations on a 4–5 point table: sketch the points first, every time.</p>`,
    cards: {
      "separable": {
        title: "Is the data linearly separable?",
        minutes: 1,
        cue: R`"Is this dataset linearly separable? Explain your answer." (2025-C Q3.1)`,
        lines: [
          R`Sketch the points on a small grid with + and − marks.`,
          R`<b>Yes:</b> write one line \(w_0 + w^\top x = 0\), then check \(y_i\,f(x^{(i)}) \gt 0\) for <b>every</b> sample.`,
          R`<b>No:</b> point to a negative sample exactly at the midpoint of two positives (or the reverse), or to two samples with different labels on the same point.`,
        ],
        numbers: R`<p>2025-C table: \(x_1 + x_2\) is \(2+2 = 4\), \(3+1 = 4\) for the positives and \(-2-2 = -4\), \(-3-1 = -4\) for the negatives.</p>
<p>Line \(x_1 + x_2 = 0\), so \(f(x) = x_1 + x_2\). Then \(y f = (+1)(4),\ (+1)(4),\ (-1)(-4),\ (-1)(-4) = 4, 4, 4, 4\), all \(\gt 0\). Separable.</p>`,
        trap: R`"Yes" without a line, or "no" without a reason, gets little credit. A sketch alone is not an explanation.`,
        why: [
          [R`Why line 2? What "separable" means`, R`<p>A dataset is <b>linearly separable</b> if <b>some</b> line puts every sample on its correct side. "Correct side" means the score \(f(x) = w_0 + w^\top x\) has the same sign as the label, and two numbers have the same sign exactly when their product is positive: \(y_i f(x^{(i)}) \gt 0\). So one line plus a positive product for every sample is a complete proof of "yes".</p>`],
          [R`Why line 3? The midpoint argument`, R`<p>Say \(m = \tfrac12 p + \tfrac12 q\) is the midpoint of \(p\) and \(q\). The score is linear, so</p>
\[f(m) = \tfrac12\big(w_0 + w^\top p\big) + \tfrac12\big(w_0 + w^\top q\big) = \tfrac12 f(p) + \tfrac12 f(q)\]
<p>If \(p\) and \(q\) are both positive, \(f(p) \gt 0\) and \(f(q) \gt 0\), so their average \(f(m) \gt 0\) too: \(m\) is called positive by <b>every</b> line. If \(m\) is a negative sample, no line can be right about all three.</p>
<p>Same point, different labels: a line gives one point one score, so it can't call it both + and −.</p>`],
        ],
        side: R`<ul>
<li><b>2026-A Q3.3</b> (\(\varphi_A\)) is the "no" case: the negative \((0,0)\) is the midpoint of the positives \((3,0)\) and \((-3,0)\): \(\tfrac12(3,0) + \tfrac12(-3,0) = (0,0)\).</li>
<li>The official 2026-A solution starts with "by plotting the dataset in 2D, we see…". The plot finds the answer; the written line or argument earns the points.</li>
</ul>`,
      },

      "max-margin-line": {
        title: "The max-margin line by hand",
        minutes: 2,
        cue: R`"Find the max-margin linear classifier… decision boundary… decision rule \(\hat y(x)\)" (2025-C Q3.2), "the equation of the max-margin separating line" (2025-B Q4.1a)`,
        lines: [
          R`List the distance \(|p - q|\) of every positive–negative pair; circle the closest pair \(p, q\).`,
          R`Direction \(w = p - q\) (or a simpler positive multiple). The line passes through the midpoint \(m\) of \(p, q\): \(w_0 = -w^\top m\).`,
          R`Check every sample's distance \(|f(x)|/\|w\|\): none is below \(\tfrac12|p - q|\) → this is the max-margin line.`,
          R`Answer (a) \(\{x : w_0 + w^\top x = 0\}\) and (b) \(\hat y(x) = \mathrm{sign}(w_0 + w^\top x)\).`,
          R`Shortcut: positives on \(a^\top x = c_+\), negatives on \(a^\top x = c_-\) → the line midway, \(a^\top x = \tfrac{c_+ + c_-}{2}\).`,
        ],
        numbers: R`<p>2025-C pair distances: \(\sqrt{32} = 4\sqrt2\) for \((2,2),(-2,-2)\); the others \(\sqrt{34}, \sqrt{34}, \sqrt{40}\). Closest: \(p = (2,2)\), \(q = (-2,-2)\).</p>
<p>\(p - q = (4,4)\), use \((1,1)\). Midpoint \((0,0)\), so \(w_0 = 0\). Every sample: \(|f|/\|w\| = 4/\sqrt2 = 2\sqrt2 = \tfrac12\cdot 4\sqrt2\) ✓.</p>
<p>(a) \(x_1 + x_2 = 0\); (b) \(\hat y = \mathrm{sign}(x_1 + x_2)\).</p>`,
        check: R`\(w\) points toward the positives: \(f\) of a positive sample must come out \(\gt 0\).`,
        why: [
          [R`Why line 1? Nothing beats half the closest pair`, R`<p>Take a positive \(p\) and a negative \(q\). A separating line cuts the segment from \(p\) to \(q\) at some point \(c\). The distance from \(p\) to the line is at most \(|p - c|\), and from \(q\) at most \(|c - q|\). These two add up to \(|p - q|\), so the smaller one is at most half of it: \(\delta \le \tfrac12|p - q|\) for every pair. The closest pair gives the tightest bound.</p>`],
          [R`Why line 2? The perpendicular bisector`, R`<p>The only line at distance exactly \(\tfrac12|p - q|\) from both \(p\) and \(q\) goes through their midpoint and is perpendicular to the segment. "Perpendicular to the segment" means its weight vector points along \(p - q\). Choosing \(w_0 = -w^\top m\) makes the midpoint's score \(w_0 + w^\top m = 0\), i.e. the midpoint is on the line.</p>`],
          [R`Why line 3? The check is the proof`, R`<p>The distance formula is \(\mathrm{dist}(x, H) = |w_0 + w^\top x|/\|w\|\), with \(\|w\| = \sqrt{w_1^2 + w_2^2}\) (no \(w_0\)). If every sample is at least \(\tfrac12|p - q|\) away, the candidate reaches the bound of line 1, so no line can do better. The official 2025-C solution says it as "the line has equal distance to all samples".</p>`],
          [R`Why line 5? Two parallel lines of samples`, R`<p>2025-B: five positives on \(x_1 - x_2 = 1\), five negatives on \(x_1 - x_2 = -1\). The line exactly midway, \(x_1 - x_2 = \tfrac{1 + (-1)}{2} = 0\), is equally far from all ten samples, and no line can be farther from both rows. So \(w = (1, -1)\), \(w_0 = 0\).</p>`],
        ],
        side: R`<ul>
<li>With the bias trick the official 2025-C answer writes the rule as \(\mathrm{sign}(w^\top x)\) with \(w = (0, 1, 1)\) "assuming an added bias term".</li>
<li>Other lines also separate 2025-C, e.g. \(x_1 = 0\), but its margin is only 2 (samples 1 and 3 are 2 away), less than \(2\sqrt2\).</li>
</ul>`,
      },

      "margin-size": {
        title: "The size of the margin",
        minutes: 2,
        cue: R`"Find the value of the classifier's margin" (2025-C Q3.2c), "What is the size of the margin of the classifier associated with this line?" (2025-B Q4.1b)`,
        lines: [
          R`Scale \((w_0, w)\) so the closest samples get \(y_i f(x^{(i)}) = 1\) exactly (canonical form).`,
          R`Check: every sample has \(y_i f(x^{(i)}) \ge 1\).`,
          R`Margin \(\delta = \dfrac{1}{\|w\|}\), with \(\|w\| = \sqrt{w_1^2 + w_2^2}\) (no \(w_0\)).`,
          R`Or directly: \(\delta = \dfrac{|f(x)|}{\|w\|}\) for a closest sample \(x\), any scaling.`,
        ],
        numbers: R`<p>2025-C, line \(x_1 + x_2 = 0\), scaled as \(f = c(x_1 + x_2)\): sample 1 has score \(c(2 + 2) = 4c = 1\), so \(c = \tfrac14\), \(w = (\tfrac14, \tfrac14)\). All four \(y f\) are exactly 1.</p>
<p>\(\|w\| = \sqrt{\tfrac1{16} + \tfrac1{16}} = \tfrac{\sqrt2}{4}\), so \(\delta = \tfrac{4}{\sqrt2} = 2\sqrt2 \approx 2.83\).</p>
<p>2025-B: \(w = (1,-1)\), \(y f = 1\) for all ten, \(\delta = \tfrac{1}{\sqrt2} = \tfrac{\sqrt2}{2} \approx 0.707\).</p>`,
        trap: R`"Margin = 1" (2025-B, many students): 1 is a <b>score</b>, not a distance. Divide by \(\|w\|\).`,
        why: [
          [R`Why line 1? Rescaling doesn't move the line`, R`<p>Multiply \(w_0\) and \(w\) by the same positive number: every score is multiplied too, but the points with score 0 and every sign stay the same. Same line, same classifier. So we are free to pick the scaling where the closest samples have \(y f = 1\). The SVM writes it as the constraints \(y_i(w_0 + w^\top x^{(i)}) \ge 1\).</p>`],
          [R`Why line 3? Where \(1/\|w\|\) comes from`, R`<p>The distance from \(x\) to the line is \(|f(x)|/\|w\|\): the score grows by \(\|w\|\) for every unit you walk away from the line, so dividing turns score into distance. For a closest sample in canonical form \(|f| = y f = 1\), so its distance is \(1/\|w\|\). That is why the SVM minimizes \(\tfrac12\|w\|^2\): smaller \(\|w\|\) = bigger margin.</p>`],
        ],
        side: R`<ul>
<li>In this course the margin is the distance from the line to the closest sample, \(1/\|w\|\), <b>not</b> the full band width \(2/\|w\|\).</li>
<li>Cross-check 2025-B: the two sample lines are \(\tfrac{|1 - (-1)|}{\sqrt2} = \sqrt2\) apart; half of that is \(\tfrac{\sqrt2}{2}\).</li>
<li>Samples with \(y f = 1\) exactly are the <b>support vectors</b>. In 2025-C all four are; in 2025-B all ten are.</li>
<li>With the bias trick \(w = (0,1,1)\), the denominator is still \(\sqrt{w_1^2 + w_2^2} = \sqrt2\), as the official 2025-C solution writes.</li>
</ul>`,
      },

      "lms-zero-loss": {
        title: "The LMS classifier: look for zero loss",
        minutes: 2,
        cue: R`"Find the least mean squares (LMS) classifier… whose weights minimize \(J(w) = \frac1n\sum_i (w^\top x^{(i)} - y^{(i)})^2\). Specify the weight vector \(w\). Explain." (2025-C Q3.3)`,
        lines: [
          R`Write: "\(J(w) \ge 0\) for every \(w\) (a sum of squares)."`,
          R`Build \(X\) with a ones column first, and \(y\) = the ±1 labels.`,
          R`Try the canonical max-margin \(w = (w_0, w_1, w_2)\) (closest samples at score ±1) and compute \(Xw\).`,
          R`If \(Xw = y\): every residual is 0, so \(J = 0\), the smallest possible → this \(w\) is the LMS classifier.`,
        ],
        numbers: R`<p>2025-C, \(w = (0, \tfrac14, \tfrac14)\):</p>
<ul>
<li>\((1,2,2)\cdot w = 0 + 0.5 + 0.5 = 1\); \((1,3,1)\cdot w = 0 + 0.75 + 0.25 = 1\)</li>
<li>\((1,-2,-2)\cdot w = -1\); \((1,-3,-1)\cdot w = -1\)</li>
</ul>
<p>\(Xw = (1,1,-1,-1) = y\), \(J = 0\). LMS: \(w = (0, \tfrac14, \tfrac14)\).</p>`,
        check: R`\(w\) has 3 entries: the bias first, then one per feature.`,
        trap: R`Giving \(w = (0,1,1)\): it separates, but its scores are ±4, not ±1, so \(J = \tfrac14(3^2 \cdot 4) = 9\). For LMS the scale matters.`,
        why: [
          [R`Why line 1? Zero is the floor`, R`<p>\(J\) is an average of squares, and a square is never negative, so \(J \ge 0\) for every \(w\). If some \(w\) reaches \(J = 0\), nothing can be smaller, so it is the minimum. No derivative needed.</p>`],
          [R`Why line 3? Why try the canonical max-margin \(w\)`, R`<p>LMS is regression with the labels +1 and −1 as the targets: it wants every score to <b>equal</b> its label. In 2025-C all four samples are equally far from the max-margin line, so after scaling (card "margin size") every score is exactly +1 or −1, which is exactly what LMS wants.</p>`],
        ],
        side: R`<ul>
<li>If no \(w\) hits every label, use the closed form \(w = (X^\top X)^{-1}X^\top y\) from Regression.</li>
<li>numpy's least-squares solver gives the same \(w\), and it is the only one, because \(X\) has rank 3.</li>
</ul>`,
      },

      "add-sample-max-margin": {
        title: "A sample is added: does the max-margin line move?",
        minutes: 2,
        cue: R`"Determine whether adding this sample affects the max-margin classifier" (2025-C Q3.4), "How does the max-margin classifier change when adding a positive training sample \(x = (2,0)\)?" (2025-B Q4.1c)`,
        lines: [
          R`Old line in canonical form (closest samples have \(y f = 1\)).`,
          R`Compute \(y_{\text{new}}\,(w_0 + w^\top x_{\text{new}})\).`,
          R`\(\ge 1\) → write: "correctly classified and satisfies the margin constraint, so the old line keeps its margin; adding a sample can never <b>increase</b> the margin → no change."`,
          R`\(\lt 1\) → write: "inside the margin or misclassified → the max-margin classifier changes (its margin shrinks)."`,
        ],
        numbers: R`<p>2025-C, \(x^{(5)} = (2,3)\), +1, \(w = (\tfrac14, \tfrac14)\), \(w_0 = 0\): \(y f = \tfrac14\cdot 2 + \tfrac14\cdot 3 = 0.5 + 0.75 = 1.25 \ge 1\) → no change.</p>
<p>2025-B, \((2,0)\), +1, \(w = (1,-1)\), \(w_0 = 0\): \(y f = 1\cdot 2 + (-1)\cdot 0 = 2 \ge 1\) → no change.</p>`,
        check: R`Same in distances (2025-C): \(5/\sqrt2 \approx 3.54 \gt 2\sqrt2 \approx 2.83\).`,
        trap: R`Checking only the side (\(y f \gt 0\)). A new sample on the correct side with \(y f \lt 1\) is inside the margin and <b>does</b> change the classifier.`,
        why: [
          [R`Why line 3? The two facts`, R`<p>(1) The margin is the distance to the <b>closest</b> sample. A new sample is either closer than the old closest ones or not, so for every line the margin after adding is at most the margin before. The best margin can only stay or shrink.</p>
<p>(2) If \(y f \ge 1\), the new sample is on the correct side and no closer than the support vectors, so the old line still has its old margin. By (1) nothing can beat that, so the old line is still the best.</p>`],
          [R`Why line 4? A sample inside the band`, R`<p>\(0 \lt y f \lt 1\): correct side, but closer to the line than the old support vectors, so the old line's margin shrinks and another line may do better. \(y f \le 0\): the old line misclassifies it. Either way the answer changes. Example: 2025-C Q3.5's \((-4,-5)\), +1 gives \(y f = \tfrac{-4}{4} + \tfrac{-5}{4} = -2.25 \lt 0\).</p>`],
        ],
        side: R`<ul>
<li>Official 2025-B Q4.1c ends "Furthermore, the margin cannot shrink by adding a sample." As a general rule that is backwards (a sample inside the band does shrink it). The 2025-C solution says it right: "the margin cannot increase by adding samples".</li>
</ul>`,
      },

      "add-sample-lms": {
        title: "A sample is added: does the LMS classifier move?",
        minutes: 2,
        cue: R`"Determine whether adding this sample affects… the LMS classifier of the dataset" (2025-C Q3.4, second bullet)`,
        lines: [
          R`New sample's residual with the old \(w\): \(r_5 = w^\top x^{(5)} - y_5\) (with the leading 1).`,
          R`\(r_5 = 0\) → no change. Otherwise the residuals are \(r = (0, \dots, 0, r_5)\).`,
          R`Gradient: \(\nabla J = \tfrac2n X^\top r = \tfrac2n\, r_5\, x^{(5)}\) (only the new row survives).`,
          R`\(\nabla J \ne 0\) → the old \(w\) is no longer the minimum → the LMS classifier <b>changes</b>.`,
        ],
        numbers: R`<p>2025-C, \(x^{(5)} = (1, 2, 3)\), \(w = (0, \tfrac14, \tfrac14)\), \(n = 5\):</p>
<p>score \(0 + 0.5 + 0.75 = 1.25\), \(r_5 = 1.25 - 1 = 0.25\).</p>
<p>\(\nabla J = \tfrac25\cdot 0.25\cdot(1,2,3) = 0.1\cdot(1,2,3) = (0.1, 0.2, 0.3) \ne 0\) → LMS changes.</p>`,
        trap: R`"Still correctly classified, so LMS doesn't change." LMS measures how far the score is from the label, and 1.25 vs 1 costs \(0.25^2\).`,
        why: [
          [R`Why line 3? The LMS gradient`, R`<p>Regression's gradient of \(\sum_i r_i^2\) is \(2X^\top(Xw - y)\). The LMS loss has \(\tfrac1n\) in front, which multiplies the gradient by \(\tfrac1n\): \(\nabla J = \tfrac2n X^\top r\). \(X^\top r\) adds the rows of \(X\), each times its residual, so with four zero residuals only the new row \((1,2,3)\) remains.</p>`],
          [R`Why line 4? Zero gradient at a minimum`, R`<p>At the minimum of a smooth bowl-shaped loss the gradient is 0 (no downhill direction left). A non-zero gradient means a small step in \(-\nabla J\) lowers the loss, so the old \(w\) is not the minimum any more.</p>`],
          [R`The official way: a nearby \(w\) with a smaller loss`, R`<p>Lower the bias: \(w = (-\varepsilon, \tfrac14, \tfrac14)\). The four old residuals become \(-\varepsilon\), the new one \(0.25 - \varepsilon\):</p>
\[J = \tfrac15\big(4\varepsilon^2 + (\tfrac14 - \varepsilon)^2\big) = \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80}\]
<p>This is below the old \(J = \tfrac1{80} = 0.0125\) for \(0 \lt \varepsilon \lt 0.1\); e.g. \(\varepsilon = 0.05\) gives \(0.01\).</p>`],
        ],
        side: R`<ul>
<li><b>Slip in the official 2025-C Q3.4 solution:</b> it writes \(w = (\varepsilon, \tfrac14, \tfrac14)\) with a plus. With \(+\varepsilon\) the loss goes <b>up</b> (at \(\varepsilon = 0.05\): \(\tfrac15(0.01 + 0.09) = 0.02 \gt 0.0125\)). Its own \((\tfrac14 - \varepsilon)^2\) needs \(w_0 = -\varepsilon\).</li>
<li>numpy's new LMS solution is \(w \approx (-0.022, 0.280, 0.183)\). Not needed in the exam.</li>
<li>Contrast: the max-margin line ignores this sample (card "add-sample max-margin"); LMS reacts to every sample.</li>
</ul>`,
      },

      "circle-mapping": {
        title: "Propose a mapping \\(\\varphi\\): put one class in a circle",
        minutes: 3,
        cue: R`"Propose a mapping \(\varphi(x_1, x_2)\) into a higher-dimensional space in which the extended dataset is linearly separable. Specify the mapping function \(\varphi\) and express a hyperplane" (2025-C Q3.5)`,
        lines: [
          R`Sketch. Pick the class that sits in a clump; centre \((a, b)\) = its midpoint.`,
          R`Distance from the centre to every sample. Radius \(r\): above every enclosed sample's distance, below every other sample's.`,
          R`Expand \((x_1 - a)^2 + (x_2 - b)^2 - r^2\): \(\varphi(x) = (1, x_1, x_2, x_1^2, x_2^2)\), \(w = (a^2 + b^2 - r^2,\ -2a,\ -2b,\ 1,\ 1)\), hyperplane \(w^\top z = 0\).`,
          R`Check the sign of \(w^\top\varphi(x)\) for every sample: negative inside, positive outside.`,
        ],
        numbers: R`<p>2025-C + \((-4,-5)\): negatives \((-2,-2), (-3,-1)\) → centre \((-2.5, -1.5)\).</p>
<p>Distances: negatives \(\sqrt{0.5} \approx 0.707\); positives \(\sqrt{14.5} \approx 3.81\), \(5.70\), \(6.04\). Take \(r = 1\).</p>
<p>\(w = (6.25 + 2.25 - 1,\ 5,\ 3,\ 1,\ 1) = (7.5, 5, 3, 1, 1)\).</p>
<p>Scores: \((2,2)\): 31.5; \((3,1)\): 35.5; \((-2,-2)\): −0.5; \((-3,-1)\): −0.5; \((-4,-5)\): 13.5 ✓.</p>`,
        trap: R`Picking \(r\) without measuring: the official \(r = 0.6\) leaves both negatives outside the circle.`,
        why: [
          [R`Why line 3? The expansion`, R`<p>"Squared distance to the centre minus \(r^2\)" is negative inside the circle and positive outside. Expand: \((x_1 - a)^2 = x_1^2 - 2ax_1 + a^2\) and \((x_2 - b)^2 = x_2^2 - 2bx_2 + b^2\). Group by feature:</p>
\[f = (a^2 + b^2 - r^2)\cdot 1 + (-2a)\,x_1 + (-2b)\,x_2 + 1\cdot x_1^2 + 1\cdot x_2^2\]
<p>A weighted sum of \(1, x_1, x_2, x_1^2, x_2^2\): linear in the new features, a circle in the original plane. The hyperplane in the mapped space is \(\{z : w^\top z = 0\}\).</p>`],
          [R`Why line 4? The check is the proof`, R`<p>Example: \((2,2)\): \(7.5 + 5\cdot 2 + 3\cdot 2 + 2^2 + 2^2 = 7.5 + 10 + 6 + 4 + 4 = 31.5 \gt 0\). \((-2,-2)\): \(7.5 - 10 - 6 + 4 + 4 = -0.5 \lt 0\). Positives come out positive and negatives negative, so this hyperplane separates the mapped data.</p>`],
        ],
        side: R`<ul>
<li><b>Slip in the official solution:</b> \(r = 0.6\), \(w = (8.14, 5, 3, 1, 1)\). The negatives are 0.707 from the centre, outside that circle: \(8.14 - 10 - 6 + 4 + 4 = +0.14\). Any \(r\) between 0.71 and 3.8 works. It also prints \((x_2 - a)^2\) for \((x_2 - b)^2\).</li>
<li><b>Slip in the question:</b> "this extended dataset is not linearly separable" is false: the line \(7x_1 - 6x_2 = 0\) separates all five (scores 2, 15, −2, −15, 2). Answer the mapping as asked anyway.</li>
<li>The full quadratic variety \((1, x_1, x_2, x_1^2, x_2^2, x_1x_2)\) with weight 0 on \(x_1x_2\) is also a correct \(\varphi\).</li>
</ul>`,
      },

      "hinge-c-plots": {
        title: "Match plots to values of \\(C\\) (hinge loss)",
        minutes: 2,
        cue: R`"…trained by minimizing the hinge loss with different values of… \(C\). Match to each plot… a value for \(C\) in {0.01, 1, 100}. Justify." (2025-B Q4.2)`,
        lines: [
          R`Write: "\(C\) multiplies the hinge (violation) term: large \(C\) → narrow margin, few errors; small \(C\) → wide margin, more violations."`,
          R`Count the training errors (samples on the wrong side) in each plot. Zero errors → the largest \(C\).`,
          R`Of the rest: the line farther from its nearest samples (wider margin) → the smallest \(C\).`,
          R`The last plot → the middle \(C\).`,
        ],
        numbers: R`<p>2025-B plots:</p>
<ul>
<li>B: every sample on its correct side → \(C = 100\).</li>
<li>A and C: the unfilled circle near \((0.4, -0.7)\) is on the filled side (one error each).</li>
<li>A is farther from the nearest filled circles → \(C = 0.01\); C → \(C = 1\).</li>
</ul>`,
        trap: R`Reversing it. \(C\) multiplies the <b>violations</b>, not the margin term (the opposite of ridge's \(\lambda\)).`,
        why: [
          [R`Why line 1? Reading the hinge loss`, R`<p>One sample's hinge loss is \(\max\{0, 1 - y_i f(x^{(i)})\}\):</p>
<ul>
<li>\(y f \ge 1\) (correct side, outside the margin): loss 0.</li>
<li>\(0 \lt y f \lt 1\) (correct side, inside the margin band): between 0 and 1.</li>
<li>\(y f \le 0\) (wrong side): \(\ge 1\).</li>
</ul>
<p>2025-C numbers with \(w = (\tfrac14, \tfrac14)\): \((2,2)\): \(\max\{0, 1 - 1\} = 0\); \((2,3)\): \(\max\{0, 1 - 1.25\} = 0\); \((-4,-5)\): \(\max\{0, 1 + 2.25\} = 3.25\).</p>`],
          [R`Why lines 2–3? The trade-off`, R`<p>\(\tfrac12\|w\|^2\) is small when the margin \(1/\|w\|\) is wide. The second term is small when violations are few. \(C\) sets the exchange rate. With \(C = 100\) a violation costs a lot, so the optimizer accepts a bigger \(\|w\|\) (narrow margin) to remove errors. With \(C = 0.01\) violations are cheap, so it keeps \(\|w\|\) small (wide margin) and tolerates errors.</p>`],
        ],
        side: R`<ul>
<li>Illustration (2025-C + \((-4,-5)\), \(w = (\tfrac14,\tfrac14)\)): \(\tfrac12\|w\|^2 = 0.0625\), hinge term \(\tfrac C5\cdot 3.25 = 0.65\,C\): total 0.069 for \(C = 0.01\), 0.7125 for \(C = 1\), 65.0625 for \(C = 100\).</li>
<li>The formula sheet's primal writes the same thing with slack variables \(\xi_i\) (= each sample's hinge loss) and \(C\sum_i\xi_i\) without \(\tfrac1n\).</li>
<li>The official solution argues exactly as lines 2–4: A = 0.01, B = 100, C = 1.</li>
</ul>`,
      },

      "cv-skeleton": {
        title: "Cross-validation code for a hyperparameter",
        minutes: 2,
        cue: R`"…m-fold cross validation to select a value for the RBF kernel hyperparameter (\(\gamma\))… Complete the missing parts of the code labeled 1–4" (2026-A Q3.5)`,
        lines: [
          R`Loop over the folds: <code>for i in range(m)</code>; fold \(i\) = <code>np.arange(n)[i::m]</code>.`,
          R`Train on all the <b>other</b> rows.`,
          R`Predict the <b>held-out</b> rows: <code>X[left_out_indices, :]</code>.`,
          R`Score each fold with accuracy <code>np.mean(pred == y_val)</code> (or error rate <code>!=</code>), never the training loss.`,
          R`CV score = <code>np.mean(fold_scores)</code>; accuracy with <code>best_score = -1</code> → <code>&gt;</code>; risk with <code>np.inf</code> → <code>&lt;</code>.`,
        ],
        numbers: R`<p>2026-A Q3.5, the official blanks:</p>
<ul>
<li>(1) <code>range(m)</code></li>
<li>(2) <code>X[left_out_indices, :]</code></li>
<li>(3) <code>np.mean(fold_scores)</code></li>
<li>(4) <code>&gt;</code></li>
</ul>`,
        trap: R`Moed B lost points on a stop test comparing the wrong thing. First decide <i>what</i> is compared (the fold average), then the direction.`,
        why: [
          [R`Why validate at all?`, R`<p>On the training data the most flexible setting (huge \(C\), huge \(\gamma\)) always looks best, even when it fails on new data. So each fold is scored on rows the model did <b>not</b> train on, and the average over the \(m\) folds is the value's CV score.</p>`],
          [R`Why line 4? Not the hinge objective`, R`<p>\(\tfrac12\|w\|^2 + C\cdot(\dots)\) contains \(C\) itself, so a bigger \(C\) inflates the number automatically; comparing it across values of \(C\) is meaningless. What we care about is misclassifications.</p>`],
          [R`Why line 5? Reading the setup line`, R`<p><code>best_score = -1</code> and <code>np.mean(pred == …)</code> say "accuracy, higher is better": any real accuracy (between 0 and 1) beats −1, so the test is <code>cv_score &gt; best_score</code>. <code>min_cv_risk = np.inf</code> says "risk, lower is better", so <code>&lt;</code>.</p>`],
        ],
        side: R`<ul>
<li>On the 2026-A page the <code>cv_score = ___(3)___</code> line is printed with an in-between indentation. Either way <code>np.mean(fold_scores)</code> is right: after the last fold it is the average over all \(m\).</li>
<li><code>KernelSVM</code> is your HW4 class: <code>fit</code> solves the dual with \(P_{ij} = y_iy_jK(x^{(i)}, x^{(j)})\), <code>predict</code> returns ±1.</li>
<li>RBF kernel \(K = e^{-\gamma\|u - v\|^2}\): large \(\gamma\) = very local, wiggly boundary (overfitting); small \(\gamma\) = smooth. E.g. \(u = (1,0), v = (3,0)\): \(\gamma = 0.25\) gives \(e^{-1} \approx 0.368\), \(\gamma = 10\) gives \(e^{-40} \approx 4\times10^{-18}\).</li>
</ul>`,
      },

      "cv-bug-hunt": {
        title: "Find the errors in the CV code",
        minutes: 2,
        cue: R`"Find at least three errors, specify their line numbers and erroneous statements, and propose a way to fix them. Assume that lines 11–17 do not contain errors." (2025-B Q4.3)`,
        lines: [
          R`Read the docstring and setup: what is \(n\), what does the solver return, risk (<code>np.inf</code>) or score (<code>-1</code>)?`,
          R`Skip the lines declared correct.`,
          R`Check the rest in order: rows <code>shape[0]</code> → bias once → predict validation rows → misclassification risk → fold average.`,
          R`For each error: line number + the statement itself + the fix.`,
        ],
        numbers: R`<p>2025-B, the official errors:</p>
<ul>
<li><code>n = X.shape[1]</code> → <code>X.shape[0]</code> (rows = samples)</li>
<li><code>X = np.concatenate(…ones…)</code> → delete (solver returns <code>w0</code>)</li>
<li><code>z_pred = X_train @ w + w0</code> → <code>X_val @ w + w0</code></li>
<li><code>risk = np.sum(w**2)/2 + …</code> → <code>np.mean(y_val != y_pred)</code></li>
<li><code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code></li>
</ul>`,
        trap: R`A bare line number: the printed numbering is confusing, so quote the statement.`,
        why: [
          [R`Why delete the ones column?`, R`<p>The solver returns its own bias (<code>w, w0 = …</code>) and <code>z_pred</code> adds <code>w0</code>. With a ones column too, the bias is counted twice, and its weight would wrongly be penalized inside \(\tfrac12\|w\|^2\).</p>`],
          [R`Why <code>np.mean(lo_risk)</code> in the <code>if</code>?`, R`<p>The CV risk of a value of \(C\) is the <b>average</b> over all folds. After the fold loop, <code>risk</code> is only the last fold's number, while <code>lo_risk</code> holds all of them. The next line even stores <code>np.mean(lo_risk)</code>, so compare the same thing.</p>`],
          [R`Why the validation rows and the misclassification risk?`, R`<p>On the training rows the most flexible setting (huge \(C\)) always looks best, so a fold must be scored on the rows the model did <b>not</b> train on: <code>X_val</code>. And the hinge objective \(\tfrac12\|w\|^2 + C\cdot(\dots)\) contains \(C\) itself, so a bigger \(C\) inflates it automatically; comparing it across values of \(C\) is meaningless. What we care about is misclassifications: <code>np.mean(y_val != y_pred)</code>.</p>`],
        ],
        side: R`<ul>
<li>The official solution calls the last three "line 16", "line 17" and "line 22", which doesn't match the printed number column (it counted differently). Levelled with the code, they sit at 20, 22 and 26; lines 1 and 2 are the first two.</li>
<li><code>k</code> in <code>np.arange(n)[i::k]</code> is never defined (<code>n_splits</code> is meant), but it is inside lines 11–17, which you are told to trust. Don't spend an answer on it.</li>
</ul>`,
      },

      "kernel-value": {
        title: "Evaluate the quadratic kernel",
        minutes: 1,
        cue: R`"Consider the quadratic kernel function we saw in class: \(K(u,v) = (1 + u^\top v)^2\). Compute \(K(u,v)\) for \(u = (1,0)\) and \(v = (3,0)\)" (2026-A Q3.1)`,
        lines: [
          R`\(u^\top v = u_1v_1 + u_2v_2\).`,
          R`Add 1, then square: \(K = (1 + u^\top v)^2\).`,
        ],
        numbers: R`<p>2026-A: \(u^\top v = 1\cdot 3 + 0\cdot 0 = 3\), so \(K = (1 + 3)^2 = 4^2 = 16\).</p>`,
        trap: R`Squaring before adding the 1: \(1 + 3^2 = 10\) is wrong.`,
        why: [
          [R`What is a kernel?`, R`<p>A kernel is a shortcut: \(K(u, v) = \varphi(u)^\top\varphi(v)\) for some mapping \(\varphi\). You compute it from the short vectors \(u, v\) and get the inner product of the long mapped vectors without building them. Algorithms like the dual perceptron and the dual SVM only ever use such inner products.</p>`],
        ],
        side: R`<ul>
<li>This 16 is also the test for the next part: \(\varphi(u)^\top\varphi(v)\) must come out 16 (card "kernel \(\varphi\)").</li>
</ul>`,
      },

      "kernel-phi": {
        title: "Find the \\(\\varphi\\) behind a kernel",
        minutes: 2,
        cue: R`"Specify an explicit mapping function \(\varphi: \mathbb{R}^2 \to \mathbb{R}^N\) (for some \(N\)), that affords the kernel \(K(u,v) = (1 + u^\top v)^2\)… No need to prove this." (2026-A Q3.2)`,
        lines: [
          R`Expand fully: \((1 + u_1v_1 + u_2v_2)^2 = 1 + u_1^2v_1^2 + u_2^2v_2^2 + 2u_1v_1 + 2u_2v_2 + 2u_1u_2v_1v_2\).`,
          R`Write each term as (something of \(u\)) × (the same of \(v\)), splitting \(2 = \sqrt2\cdot\sqrt2\).`,
          R`\(\varphi(x) = (1,\ \sqrt2x_1,\ \sqrt2x_2,\ \sqrt2x_1x_2,\ x_1^2,\ x_2^2) \in \mathbb{R}^6\).`,
          R`Test on part 1's pair: \(\varphi(u)^\top\varphi(v)\) must equal \(K(u, v)\).`,
        ],
        numbers: R`<p>2026-A: \(\varphi(1,0) = (1, \sqrt2, 0, 0, 1, 0)\), \(\varphi(3,0) = (1, 3\sqrt2, 0, 0, 9, 0)\).</p>
<p>\(\varphi(u)^\top\varphi(v) = 1 + \sqrt2\cdot 3\sqrt2 + 1\cdot 9 = 1 + 6 + 9 = 16\) ✓ (= \(K\)).</p>`,
        trap: R`Forgetting the \(\sqrt2\)'s (cross terms come out 1× instead of 2×) or the constant 1.`,
        why: [
          [R`Why line 1? Squaring a three-term sum`, R`<p>\((A + B + C)^2 = A^2 + B^2 + C^2 + 2AB + 2AC + 2BC\). With \(A = 1\), \(B = u_1v_1\), \(C = u_2v_2\): \(A^2 = 1\), \(B^2 = u_1^2v_1^2\), \(C^2 = u_2^2v_2^2\), \(2AB = 2u_1v_1\), \(2AC = 2u_2v_2\), \(2BC = 2u_1u_2v_1v_2\).</p>`],
          [R`Why line 2? Matching products are a dot product`, R`<p>\(\varphi(u)^\top\varphi(v)\) is a sum of (entry of \(u\)) × (same entry of \(v\)). So pair up: \(1 = 1\cdot 1\), \(2u_1v_1 = (\sqrt2u_1)(\sqrt2v_1)\), \(2u_1u_2v_1v_2 = (\sqrt2u_1u_2)(\sqrt2v_1v_2)\), \(u_1^2v_1^2 = (u_1^2)(v_1^2)\), and so on. The \(u\)-sides, listed in order, are \(\varphi(u)\).</p>`],
        ],
        side: R`<ul>
<li>A second official answer, with repeats instead of \(\sqrt2\): all products \(x_jx_l\), \(j, l = 0,1,2\), \(x_0 = 1\): \(\varphi(x) = (1, x_1, x_2, x_1, x_1^2, x_1x_2, x_2, x_2x_1, x_2^2) \in \mathbb{R}^9\). Check: \(\varphi(1,0)^\top\varphi(3,0) = 1 + 3 + 3 + 9 = 16\).</li>
<li>The order of the entries doesn't matter, as long as \(u\) and \(v\) use the same order.</li>
<li>Both contain every monomial of degree ≤ 2: the quadratic kernel = the full quadratic variety (any circle, ellipse or hyperbola).</li>
</ul>`,
      },

      "given-mappings": {
        title: "Which given mappings make the data separable?",
        minutes: 2,
        cue: R`"For each of the four mappings, specify whether the dataset is linearly separable after mapping, or not… explain… specify a weight vector \(w\)" (2026-A Q3.3)`,
        lines: [
          R`Make a table: every sample mapped by every \(\varphi\).`,
          R`Two samples, different labels, same mapped point → not separable.`,
          R`A negative at the midpoint of two positives, or a <b>linear</b> \(\varphi\) of non-separable data → not separable.`,
          R`Otherwise give \(w_0, w\) and check the sign for every mapped sample.`,
        ],
        numbers: R`<p>2026-A:</p>
<ul>
<li>\(\varphi_A\): original data; \((0,0)\) is the midpoint of \((3,0), (-3,0)\) → no.</li>
<li>\(\varphi_B = (x_1^2, x_1x_2)\): samples 1 (−) and 4 (+) both → \((0,0)\) → no.</li>
<li>\(\varphi_C = (x_1^2, x_2^2)\): \(w_0 = -3\), \(w = (1,1)\): scores \(-3, -1, 6, 6, 6\) → yes.</li>
<li>\(\varphi_D = (2x_1 - x_2, x_1 + 2x_2)\): linear → no.</li>
</ul>`,
        trap: R`Moed B habit: plugging in points without looking for the pattern. Here the pattern is "negatives near the origin" → \(-c + x_1^2 + x_2^2\).`,
        why: [
          [R`Why line 3? Linear mappings can't help`, R`<p>If every new feature is a weighted sum of \(x_1, x_2\), then a line in the new features is still a line in the original plane. So if the original data isn't separable, the mapped data isn't either. Concretely for \(\varphi_D\): \(\varphi_D(3,0) = (6, 3)\), \(\varphi_D(-3,0) = (-6,-3)\), and their midpoint \((0,0) = \varphi_D(0,0)\) is still the negative sample 1.</p>`],
          [R`Why line 4? The \(\varphi_C\) check in full`, R`<p>Mapped points: 1 \((0,0)\) −, 2 \((1,1)\) −, 3 \((9,0)\) +, 4 \((0,9)\) +, 5 \((9,0)\) +. Score \(-3 + z_1 + z_2\): \(-3 + 0 + 0 = -3\), \(-3 + 1 + 1 = -1\), \(-3 + 9 + 0 = 6\), \(-3 + 0 + 9 = 6\), \(-3 + 9 + 0 = 6\). Negatives negative, positives positive. In the original plane this is the circle \(x_1^2 + x_2^2 = 3\).</p>`],
        ],
        side: R`<ul>
<li>The official solution writes the \(\varphi_C\) rule as \(\mathrm{sign}(w_0 + w_1x_1^2 + w_2x_2^2)\) with \(w_0 = -3\), \(w_1 = w_2 = 1\).</li>
</ul>`,
      },

      "kernel-perceptron": {
        title: "Does the dual (kernel) perceptron converge?",
        minutes: 2,
        cue: R`"Benjamin executed the dual Perceptron algorithm with the quadratic kernel… using a small positive learning rate. Is the algorithm guaranteed to converge to a weight vector that classifies all training samples without error? Explain." (2026-A Q3.4)`,
        lines: [
          R`Write: "The dual perceptron with kernel \(K\) = the perceptron on \(\varphi(x)\), where \(\varphi\) affords \(K\) (part 2)."`,
          R`Write: "The perceptron converges (with a small enough learning rate) iff the data is linearly separable", here the <b>mapped</b> data.`,
          R`Give a \(w\) in \(\varphi\)-space that separates (reuse an earlier separator whose features are all in \(\varphi\)).`,
          R`Conclude: separable after mapping → guaranteed to converge.`,
        ],
        numbers: R`<p>2026-A: \(\varphi = (1, \sqrt2x_1, \sqrt2x_2, \sqrt2x_1x_2, x_1^2, x_2^2)\), \(w = (-3, 0, 0, 0, 1, 1)\):</p>
<p>\(w^\top\varphi(x) = -3 + x_1^2 + x_2^2\), part 3's \(\varphi_C\) separator: scores \(-3, -1, 6, 6, 6\). Separable → converges.</p>`,
        trap: R`Answering from the original data ("not linearly separable, so no"). The kernel perceptron works in the mapped space.`,
        why: [
          [R`Why line 1? The dual perceptron is the perceptron`, R`<p>The perceptron starts at \(w = 0\) and on each mistake adds a multiple of \(y_jx^{(j)}\). So \(w = \sum_j \lambda_j y_j x^{(j)}\) at every moment, and the score is \(\sum_j \lambda_j y_j\, x^{(j)\top}x^{(i)}\): only inner products. Replace each inner product by \(K(x^{(j)}, x^{(i)}) = \varphi(x^{(j)})^\top\varphi(x^{(i)})\) and you are running the ordinary perceptron on the mapped samples.</p>`],
          [R`Why line 3? Where to find the separator`, R`<p>Part 2's \(\varphi\) contains the features \(1, x_1^2, x_2^2\), and part 3's \(\varphi_C\) separator \(-3 + x_1^2 + x_2^2\) uses only those. Put \(-3\) on the 1, 1 on \(x_1^2\) and \(x_2^2\), and 0 elsewhere. Rescaling features (the \(\sqrt2\)'s) never changes separability.</p>`],
        ],
        side: R`<ul>
<li>The official solution argues the same way: \(\varphi_C = (x_1^2, x_2^2)\) "is contained in the full quadratic variety" of part 2.</li>
<li>Watching it run (\(\eta = 0.01\), numpy): the 6th pass has no mistakes, with \(\lambda = (0.04, 0.08, 0.02, 0.02, 0)\).</li>
<li>For this perceptron (starting from \(\lambda = 0\)) the size of \(\eta\) changes nothing: every update adds the same \(2\eta\), so all scores scale together and no sign changes. Still write "with a small enough learning rate", as the official solution does.</li>
</ul>`,
      },
    },
    parts: {
      "2025C-q3.1": ["separable"],
      "2025C-q3.2": ["max-margin-line", "margin-size"],
      "2025C-q3.3": ["lms-zero-loss"],
      "2025C-q3.4": ["add-sample-max-margin", "add-sample-lms"],
      "2025C-q3.5": ["circle-mapping"],
      "2025B-q4.1": ["max-margin-line", "margin-size", "add-sample-max-margin"],
      "2025B-q4.2": ["hinge-c-plots"],
      "2025B-q4.3": ["cv-bug-hunt"],
      "2026A-q3.1": ["kernel-value"],
      "2026A-q3.2": ["kernel-phi"],
      "2026A-q3.3": ["separable", "given-mappings"],
      "2026A-q3.4": ["kernel-perceptron"],
      "2026A-q3.5": ["cv-skeleton"],
    },
  };
})();
