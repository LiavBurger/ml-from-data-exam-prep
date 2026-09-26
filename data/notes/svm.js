// Notes for topic "svm". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["svm"] = {
  intro: R`<p>This question family is about <b>linear classifiers that keep a safe distance from the data</b> (the max-margin classifier and the SVM), about what to do when no straight line can separate the classes (<b>mappings \(\varphi\)</b> and <b>kernels</b>), and about the code that picks their hyperparameters. It came up in 2025-B (Q4), 2025-C (Q3) and 2026-A (Q3, kernels). The same kinds of parts keep coming back:</p>
<ul>
<li><b>Is the data linearly separable?</b> (2025-C Q3.1, 2026-A Q3.3)</li>
<li><b>Find the max-margin line by hand</b>: its equation, its decision rule, its margin (2025-C Q3.2, 2025-B Q4.1)</li>
<li><b>A sample is added: does the classifier change?</b> (2025-C Q3.4, 2025-B Q4.1c), and the <b>LMS classifier</b> for comparison (2025-C Q3.3)</li>
<li><b>Hinge loss and the hyperparameter \(C\)</b>: match plots to values of \(C\) (2025-B Q4.2)</li>
<li><b>A mapping \(\varphi\) or a kernel</b>: propose one, compute one, decide which ones separate the data, and whether the (dual) perceptron converges (2025-C Q3.5, 2026-A Q3.1–3.4)</li>
<li><b>Cross-validation code</b> for \(C\) or for the RBF \(\gamma\): find the bugs or fill the blanks (2025-B Q4.3, 2026-A Q3.5)</li>
</ul>
<p><b>How to use the notes:</b> read them in order. Each note builds on the one before it: it explains the idea in plain words, decodes the symbols, and then works a full example with real exam numbers. Notes 0–5 use the four points of <b>2025-C Question 3</b>, so that question becomes your guided first one. Notes 7–9 use the five points of 2026-A Q3, and notes 6 and 10 use 2025-B Q4. Every number was checked with numpy. Where an official solution has a slip, the note says so and gives the corrected value. There are several slips in 2025-C Q3.4–3.5, so read notes 1, 5 and 7 before you check your answers against that solution. The Linear-classification notes come before this topic. Where an idea was already explained there (the perceptron, separability, mappings, the quadratic kernel), this topic gives a short recap and says which note to look back at.</p>`,
  moves: [
    { title: "0 · Start here: a linear classifier, drawn in the plane",
      idea: R`<p>In Regression the formula produced a <b>number</b> (a price, a grade). In classification the label is one of <b>two classes</b>, and this course writes them as \(y = +1\) ("positive") and \(y = -1\) ("negative"). Linear classification note 0 introduced the classifier. Here is a short recap, because every later note is built on it.</p>
<h5>Step 1 — the score</h5>
<p>A linear classifier computes the same kind of weighted sum as regression:</p>
\[f(x) = w_0 + w_1 x_1 + w_2 x_2\]
<p>This number is called the <b>score</b> or the <b>discriminant</b>. \(w_0\) is the bias, and \(w = (w_1, w_2)\) are the weights of the two features.</p>
<h5>Step 2 — the sign of the score is the prediction</h5>
<p>The classifier ignores how big the score is and looks only at its sign:</p>
\[\hat y(x) = \mathrm{sign}\big(f(x)\big) = \begin{cases} +1 & f(x) \gt 0\\ -1 & f(x) \lt 0\end{cases}\]
<p>(A score of exactly 0 goes to +1 in the lectures. In this topic that only matters when running the perceptron, note 9.)</p>
<h5>Step 3 — the decision boundary is a line</h5>
<p>The points where the score is exactly 0, \(\{x : w_0 + w_1x_1 + w_2x_2 = 0\}\), form a <b>straight line</b> in the plane (in more dimensions it is called a <i>hyperplane</i>). The line cuts the plane into two halves. On one side every score is positive, and on the other side every score is negative. The vector \(w = (w_1, w_2)\) is perpendicular to the line and points toward the <b>positive</b> side.</p>
<h5>Step 4 — the bias trick (the ones column again)</h5>
<p>Exams often write the rule as \(\mathrm{sign}(w^\top x)\) "assuming an added bias term". This is the trick from Regression note 1: put a 1 in front of every sample, \(x = (1, x_1, x_2)\), and put the bias first in the weights, \(w = (w_0, w_1, w_2)\). Then \(w^\top x = w_0\cdot 1 + w_1x_1 + w_2x_2\) is exactly the score.</p>
<h5>Step 5 — one product says "correct or not"</h5>
<p>A sample is classified correctly when its score has the <b>same sign</b> as its label. Two numbers have the same sign exactly when their product is positive, so:</p>
\[\text{sample } i \text{ is correct} \iff y_i\, f(x^{(i)}) \gt 0\]
<p>This product \(y_i f(x^{(i)})\) is the most important quantity in this whole topic. It will measure the margin (note 3), the hinge loss (note 6), and the perceptron's mistakes (note 9).</p>`,
      notation: [
        [R`\(y_i \in \{+1, -1\}\)`, R`the label of sample \(i\): +1 (positive, often drawn as a filled circle or "+") or −1 (negative)`],
        [R`\(w_0\)`, R`the bias: the score at the origin`],
        [R`\(w = (w_1, w_2)\)`, R`the feature weights. Sometimes \(w\) also includes \(w_0\) as its first entry (the bias trick); the exam says so when it does.`],
        [R`\(f(x) = w_0 + w^\top x\)`, R`the score (discriminant) of a point \(x\)`],
        [R`\(\mathrm{sign}(a)\)`, R`+1 if \(a \gt 0\), −1 if \(a \lt 0\)`],
        [R`\(\hat y(x)\)`, R`the predicted label = the "decision rule"`],
        [R`\(H\)`, R`the decision boundary \(\{x : f(x) = 0\}\), a line in 2D`],
        [R`\(y_i f(x^{(i)})\)`, R`positive ⇔ sample \(i\) is on its correct side`],
      ],
      example: R`<p><b>The table.</b> 2025-C Q3 gives four samples in \(\mathbb{R}^2\):</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>2</td><td>2</td><td>+1</td></tr><tr><td>2</td><td>3</td><td>1</td><td>+1</td></tr>
<tr><td>3</td><td>−2</td><td>−2</td><td>−1</td></tr><tr><td>4</td><td>−3</td><td>−1</td><td>−1</td></tr></tbody></table></div>
<p><b>A classifier.</b> Take \(w_0 = 0\) and \(w = (1, 1)\), so the score is \(f(x) = 0 + 1\cdot x_1 + 1\cdot x_2 = x_1 + x_2\). Score every sample, take the sign, and check it against the label:</p>
<ul>
<li>Sample 1: \(f = 0 + 1\cdot 2 + 1\cdot 2 = 4\). Sign +1, label +1. Check: \(y f = (+1)\cdot 4 = 4 \gt 0\), correct.</li>
<li>Sample 2: \(f = 0 + 1\cdot 3 + 1\cdot 1 = 4\). Sign +1, label +1. Check: \(y f = (+1)\cdot 4 = 4 \gt 0\), correct.</li>
<li>Sample 3: \(f = 0 + 1\cdot(-2) + 1\cdot(-2) = -4\). Sign −1, label −1. Check: \(y f = (-1)\cdot(-4) = 4 \gt 0\), correct.</li>
<li>Sample 4: \(f = 0 + 1\cdot(-3) + 1\cdot(-1) = -4\). Sign −1, label −1. Check: \(y f = (-1)\cdot(-4) = 4 \gt 0\), correct.</li>
</ul>
<p><b>The boundary</b> is \(x_1 + x_2 = 0\), i.e. the line \(x_2 = -x_1\) through the origin (going from top-left to bottom-right). \(w = (1,1)\) points up and to the right, toward the two positive samples. With the bias trick, the same classifier is \(w = (0, 1, 1)\) and \(x = (1, x_1, x_2)\), which is how the official 2025-C solution writes it.</p>` },

    { title: "1 · Is the data linearly separable?",
      idea: R`<p>Note 0 found one line that puts every sample on its correct side. That is exactly what the word means: a dataset is <b>linearly separable</b> if <b>some</b> line (some \(w_0, w\)) classifies every sample correctly, i.e. \(y_i f(x^{(i)}) \gt 0\) for every \(i\). The two possible answers need two different kinds of explanation.</p>
<h5>Step 1 — to show "yes": give one line and check every sample</h5>
<p>One example is enough. Look at the table for a pattern (in 2025-C, \(x_1 + x_2\) is \(+4\) for both positives and \(-4\) for both negatives). Write the line, then check the sign for <b>every</b> sample, as in note 0.</p>
<h5>Step 2 — to show "no": you need a reason why <i>no</i> line works</h5>
<p>You can't try all lines, so you need an argument. Two arguments cover every exam case so far.</p>
<p><b>(a) Two samples at the same point with different labels.</b> A classifier gives one point one score, so it cannot call it both + and −. This one shows up after a mapping squeezes two different samples onto the same spot (note 7).</p>
<p><b>(b) A sample exactly halfway between two samples of the other class.</b> Say \(m = \tfrac12 p + \tfrac12 q\) is the midpoint of \(p\) and \(q\). The score is linear, so the score of the midpoint is the average of the two scores:</p>
\[f(m) = w_0 + w^\top\big(\tfrac12 p + \tfrac12 q\big) = \tfrac12\big(w_0 + w^\top p\big) + \tfrac12\big(w_0 + w^\top q\big) = \tfrac12 f(p) + \tfrac12 f(q)\]
<p>(the \(w_0\) splits as \(\tfrac12 w_0 + \tfrac12 w_0\)). If \(p\) and \(q\) are both positive, then \(f(p) \gt 0\) and \(f(q) \gt 0\), so their average \(f(m)\) is also \(\gt 0\). That means \(m\) is classified positive whatever the line is. If \(m\) is a negative sample, no line can be right about all three. (Linear classification note 5 covered separability when you only know one classifier's scores. Here you see the samples' coordinates, so you can argue about <i>every</i> line directly.)</p>
<h5>Step 3 — sketch first</h5>
<p>Plot the points on a small grid with + and − marks. Almost always the sketch shows you right away which of steps 1 and 2 applies. (The official 2026-A solution starts with "by plotting the dataset…".) Then write the line or the argument in words, because the sketch alone is not an explanation.</p>`,
      notation: [
        [R`linearly separable`, R`some line has every sample on its correct side: \(y_i(w_0 + w^\top x^{(i)}) \gt 0\) for all \(i\)`],
        [R`\(\tfrac12 p + \tfrac12 q\)`, R`the midpoint of \(p\) and \(q\): average each coordinate`],
      ],
      example: R`<p><b>2025-C Q3.1 — yes.</b> The official answer: the positives lie on the line \(x_1 + x_2 = 4\) and the negatives on \(x_1 + x_2 = -4\), so the line \(x_1 + x_2 = 0\) (between them) separates them. Note 0 checked all four signs.</p>
<p><b>2026-A Q3.3 — no.</b> The data:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>0</td><td>0</td><td>−</td></tr><tr><td>2</td><td>1</td><td>1</td><td>−</td></tr>
<tr><td>3</td><td>3</td><td>0</td><td>+</td></tr><tr><td>4</td><td>0</td><td>3</td><td>+</td></tr><tr><td>5</td><td>−3</td><td>0</td><td>+</td></tr></tbody></table></div>
<p>The negative sample 1 is exactly the midpoint of the positives 3 and 5:</p>
\[\tfrac12(3, 0) + \tfrac12(-3, 0) = \big(\tfrac{3 + (-3)}{2},\ \tfrac{0 + 0}{2}\big) = (0, 0)\]
<p>So for any line, \(f(0,0) = \tfrac12 f(3,0) + \tfrac12 f(-3,0)\). If both positives get positive scores, \((0,0)\) does too and is misclassified. Not separable.</p>
<p><b>A slip in the exam itself (2025-C Q3.5).</b> Part 5 adds \(x^{(5)} = (-4, -5)\) with label +1 and says "since this extended dataset is not linearly separable…". That claim is <b>false</b>. Here is how to find a line that works.</p>
<ul>
<li>The new positive \((-4,-5)\) lies below-left of the negatives, so \(x_1 + x_2 = 0\) no longer works. Try a line through the origin that is a little steeper, with score \(f(x) = a\,x_1 - b\,x_2\) (\(w_0 = 0\)) and \(a, b \gt 0\).</li>
<li>Sample 1 \((2,2)\), +1, needs \(f = 2a - 2b \gt 0\), i.e. \(b \lt a\). (Sample 3 \((-2,-2)\) gives the same condition with the sign flipped, and samples 2 and 4 are then automatically fine.)</li>
<li>The new sample \((-4,-5)\), +1, needs \(f = -4a + 5b \gt 0\), i.e. \(b \gt \tfrac45 a = 0.8a\).</li>
<li>So any \(b\) between \(0.8a\) and \(a\) works. With \(a = 7\): \(0.8\cdot 7 = 5.6 \lt b \lt 7\), so take \(b = 6\).</li>
</ul>
<p>The line \(7x_1 - 6x_2 = 0\) (score \(f(x) = 7x_1 - 6x_2\), \(w_0 = 0\)) separates all five samples:</p>
<ul>
<li>\((2,2)\), +1: \(f = 7\cdot 2 - 6\cdot 2 = 14 - 12 = 2 \gt 0\) ✓</li>
<li>\((3,1)\), +1: \(f = 7\cdot 3 - 6\cdot 1 = 21 - 6 = 15 \gt 0\) ✓</li>
<li>\((-2,-2)\), −1: \(f = 7\cdot(-2) - 6\cdot(-2) = -14 + 12 = -2 \lt 0\) ✓</li>
<li>\((-3,-1)\), −1: \(f = 7\cdot(-3) - 6\cdot(-1) = -21 + 6 = -15 \lt 0\) ✓</li>
<li>\((-4,-5)\), +1: \(f = 7\cdot(-4) - 6\cdot(-5) = -28 + 30 = 2 \gt 0\) ✓</li>
</ul>
<p>In the exam, don't argue with the premise. The part asks for a mapping and a hyperplane, and the official answer (a circle, note 7) is what the grader expects, so give them. If you like, you can add one sentence noting the line above.</p>`,
      cue: R`"Is this dataset linearly separable? Explain your answer." (2025-C Q3.1). "For each of the four mappings, specify whether the dataset is linearly separable after mapping" (2026-A Q3.3).`,
      first: R`Sketch the points with + and − marks. Then either write a line and check \(y_i f(x^{(i)}) \gt 0\) for every sample, or point to a negative sample exactly between two positives (or two identical points with different labels).`,
      trap: R`"Yes" without a line, or "no" without a reason, gets little credit, because the question says "explain". And a sketch is not a reason: write the line, or write the midpoint argument.` },

    { title: "2 · Distance from a point to the line, and the margin",
      idea: R`<p>2025-C's data can be separated by many lines. \(x_1 + x_2 = 0\) works, and so does the vertical line \(x_1 = 0\) (the positives have \(x_1 = 2, 3\) and the negatives \(x_1 = -2, -3\)). Which line is <b>better</b>? A line that only just misses a sample is fragile: a new test point slightly off that sample may land on the wrong side. We prefer a line that stays <b>as far as possible from every sample</b>. To make "far" precise we need the distance from a point to a line.</p>
<h5>Step 1 — the distance formula</h5>
\[\mathrm{dist}(x, H) = \frac{|w_0 + w^\top x|}{\|w\|} = \frac{|f(x)|}{\|w\|},\qquad \|w\| = \sqrt{w_1^2 + w_2^2}\]
<p>Why: the score is 0 on the line and grows steadily as you walk away from it, by \(\|w\|\) for every unit of distance. Dividing the score by \(\|w\|\) turns it into a distance. Note that \(\|w\|\) uses the <b>feature weights only</b>, never the bias \(w_0\).</p>
<h5>Step 2 — rescaling \((w_0, w)\) doesn't move the line</h5>
<p>Multiply \(w_0\) and \(w\) by the same positive number, say 2. Every score doubles, but the points with score 0 are the same points, and every sign stays the same. So it is the same line and the same classifier. \(\|w\|\) doubles too, so the distance \(|f(x)|/\|w\|\) doesn't change. <b>One line has many \((w_0, w)\) descriptions</b>, and note 3 uses this freedom.</p>
<h5>Step 3 — the margin of a classifier</h5>
<p>For a line that classifies every sample correctly, its <b>margin</b> is the distance from the line to the <b>closest</b> sample:</p>
\[\delta = \min_i\ \mathrm{dist}(x^{(i)}, H)\]
<p>Only the closest samples matter. A far-away sample can move a bit without changing \(\delta\).</p>
<h5>Step 4 — the same thing written with \(y_i f\)</h5>
<p>For a correctly classified sample, \(|f(x^{(i)})| = y_i f(x^{(i)})\) (note 0, step 5: the product is positive). So "the line has margin \(\delta\)" can be written without absolute values, as the lecture does:</p>
\[y_i\,(w_0 + w^\top x^{(i)}) \ \ge\ \delta\,\|w\| \quad\text{for every } i\]`,
      notation: [
        [R`\(\|w\|\)`, R`length of the weight vector, \(\sqrt{w_1^2 + w_2^2}\), <b>without</b> \(w_0\)`],
        [R`\(\mathrm{dist}(x, H)\)`, R`distance from the point \(x\) to the line \(H\): \(|f(x)|/\|w\|\)`],
        [R`\(\delta\) ("delta")`, R`the margin: the smallest distance from the line to any sample`],
      ],
      example: R`<p><b>The line \(x_1 + x_2 = 0\)</b> (2025-C, \(w_0 = 0\), \(w = (1,1)\)). First the length: \(\|w\| = \sqrt{1^2 + 1^2} = \sqrt 2\). The scores are from note 0:</p>
<ul>
<li>Sample 1 \((2,2)\): \(\dfrac{|0 + 1\cdot 2 + 1\cdot 2|}{\sqrt2} = \dfrac{|4|}{\sqrt 2} = \dfrac{4}{\sqrt2} = \dfrac{4\sqrt2}{2} = 2\sqrt2 \approx 2.83\)</li>
<li>Sample 2 \((3,1)\): \(\dfrac{|0 + 3 + 1|}{\sqrt2} = \dfrac{4}{\sqrt2} = 2\sqrt2\)</li>
<li>Sample 3 \((-2,-2)\): \(\dfrac{|0 - 2 - 2|}{\sqrt2} = \dfrac{|-4|}{\sqrt2} = 2\sqrt2\)</li>
<li>Sample 4 \((-3,-1)\): \(\dfrac{|0 - 3 - 1|}{\sqrt2} = \dfrac{|-4|}{\sqrt2} = 2\sqrt2\)</li>
</ul>
<p>All four samples are at the same distance, so the margin is \(\delta = 2\sqrt2 \approx 2.83\). This is the official answer to 2025-C Q3.2c.</p>
<p><b>Same line, rescaled.</b> Use \(w = (\tfrac14, \tfrac14)\) instead. Sample 1's score is \(\tfrac14\cdot 2 + \tfrac14\cdot 2 = 0.5 + 0.5 = 1\), and \(\|w\| = \sqrt{\tfrac1{16} + \tfrac1{16}} = \sqrt{\tfrac{2}{16}} = \tfrac{\sqrt2}{4}\). The distance is \(\dfrac{1}{\sqrt2/4} = \dfrac{4}{\sqrt2} = 2\sqrt2\), the same as before.</p>
<p><b>A worse line, for comparison: \(x_1 = 0\)</b> (\(w_0 = 0\), \(w = (1, 0)\), \(\|w\| = \sqrt{1^2 + 0^2} = 1\)). The distances are \(|x_1|/1\): samples 1–4 give \(2, 3, 2, 3\). Its margin is \(2 \lt 2\sqrt2\). It separates the data, but it comes closer to samples 1 and 3.</p>`,
      trap: R`Putting \(w_0\) into \(\|w\|\), or forgetting the absolute value. With the bias trick \(w = (0, 1, 1)\), the denominator is still \(\sqrt{w_1^2 + w_2^2} = \sqrt2\), exactly as the official 2025-C solution writes it.` },

    { title: "3 · The max-margin classifier by hand",
      idea: R`<p>Now the goal is clear: among all lines that separate the data, find the one with the <b>largest margin</b>. This is the <b>max-margin classifier</b>. In general it is found by solving an optimization problem (the SVM, step 5). On the exam the data is small and symmetric, so you find it with geometry and then <b>verify</b> it.</p>
<h5>Step 1 — no line can beat half the distance of the closest opposite pair</h5>
<p>Take any positive sample \(p\) and any negative sample \(q\). A separating line has \(p\) and \(q\) on opposite sides, so it cuts the segment from \(p\) to \(q\) at some point \(c\). The distance from \(p\) to the line is at most \(|p - c|\) (the straight way to the line is the shortest), and the same holds for \(q\). The two pieces add up to the whole segment, \(|p - c| + |c - q| = |p - q|\), so the smaller distance is at most half of it:</p>
\[\delta \ \le\ \tfrac12\,|p - q| \quad\text{for every positive } p \text{ and negative } q\]
<p>The tightest bound comes from the <b>closest</b> positive–negative pair.</p>
<h5>Step 2 — the candidate: the line exactly between that pair</h5>
<p>The only way to get distance \(\tfrac12|p-q|\) from both \(p\) and \(q\) is the line through the midpoint of \(p\) and \(q\) that is perpendicular to the segment (the "perpendicular bisector"). Its weight vector is the direction \(w = p - q\) (or any positive multiple of it), and \(w_0\) is chosen so that the midpoint has score 0.</p>
<h5>Step 3 — verify with every sample</h5>
<p>Compute every sample's distance to the candidate (note 2). If no sample is closer than \(\tfrac12|p-q|\), the candidate reaches the bound from step 1, so no line can do better and it is the max-margin line. (If some other sample is closer, the answer is harder, but the exam data has always worked out.)</p>
<h5>Step 4 — the parallel-lines case (2025-B)</h5>
<p>Sometimes the positives all lie on one line and the negatives on a parallel line. Then the max-margin line is the parallel line <b>exactly midway</b>. The distance between the parallel lines \(a^\top x = c_1\) and \(a^\top x = c_2\) is \(|c_1 - c_2|/\|a\|\), and the margin is half of that.</p>
<h5>Step 5 — how the SVM writes the same problem (the canonical form)</h5>
<p>Note 2 showed that one line has many \((w_0, w)\) descriptions. The SVM picks the one where the <b>closest samples get \(y_i f = 1\) exactly</b>. Then every sample satisfies</p>
\[y_i\,(w_0 + w^\top x^{(i)}) \ \ge\ 1 \qquad\text{(the margin constraints)}\]
<p>and the closest ones have distance \(|f|/\|w\| = 1/\|w\|\) (note 2's formula with \(|f| = 1\)), so the margin is</p>
\[\delta = \frac{1}{\|w\|}\]
<p>A bigger margin means a smaller \(\|w\|\). So the max-margin problem becomes: <b>minimize \(\tfrac12\|w\|^2\) subject to \(y_i(w_0 + w^\top x^{(i)}) \ge 1\) for all \(i\)</b>. This is the (hard-margin) SVM primal on the formula sheet, with all \(\xi_i = 0\). The samples with \(y_i f = 1\) exactly lie on the margin. They are the <b>support vectors</b>, and they alone decide where the line goes.</p>`,
      notation: [
        [R`max-margin classifier`, R`the separating line with the largest margin \(\delta\)`],
        [R`\(|p - q|\)`, R`the distance between two points: \(\sqrt{(p_1 - q_1)^2 + (p_2 - q_2)^2}\)`],
        [R`\(y_i(w_0 + w^\top x^{(i)}) \ge 1\)`, R`the margin constraints (canonical form): every sample on its correct side, at least "1 unit of score" away`],
        [R`\(\delta = 1/\|w\|\)`, R`the margin, when \((w_0, w)\) is in canonical form`],
        [R`support vectors`, R`the samples with \(y_i f(x^{(i)}) = 1\) exactly, i.e. the closest samples, lying on the margin`],
        [R`SVM`, R`support vector machine: the method that solves \(\min \tfrac12\|w\|^2\) under the margin constraints`],
      ],
      example: R`<p><b>2025-C Q3.2.</b> <b>Step 1:</b> distances of all positive–negative pairs:</p>
<ul>
<li>\((2,2)\) and \((-2,-2)\): \(\sqrt{(2-(-2))^2 + (2-(-2))^2} = \sqrt{4^2 + 4^2} = \sqrt{16 + 16} = \sqrt{32} = 4\sqrt2 \approx 5.66\)</li>
<li>\((2,2)\) and \((-3,-1)\): \(\sqrt{(2+3)^2 + (2+1)^2} = \sqrt{25 + 9} = \sqrt{34} \approx 5.83\)</li>
<li>\((3,1)\) and \((-2,-2)\): \(\sqrt{(3+2)^2 + (1+2)^2} = \sqrt{25 + 9} = \sqrt{34} \approx 5.83\)</li>
<li>\((3,1)\) and \((-3,-1)\): \(\sqrt{(3+3)^2 + (1+1)^2} = \sqrt{36 + 4} = \sqrt{40} \approx 6.32\)</li>
</ul>
<p>The closest pair is \(p = (2,2)\), \(q = (-2,-2)\), so no line has a margin above \(\tfrac12\cdot 4\sqrt2 = 2\sqrt2\).</p>
<p><b>Step 2:</b> the midpoint is \(\big(\tfrac{2 + (-2)}{2}, \tfrac{2 + (-2)}{2}\big) = (0, 0)\). The direction is \(p - q = (2-(-2),\ 2-(-2)) = (4, 4)\), and we can use the simpler multiple \((1, 1)\). The line \(x_1 + x_2 + w_0 = 0\) must pass through \((0,0)\): \(0 + 0 + w_0 = 0\), so \(w_0 = 0\). The candidate is \(x_1 + x_2 = 0\).</p>
<p><b>Step 3:</b> note 2 computed all four distances, and each one is \(2\sqrt2\). The bound is reached, so this is the max-margin line. The official answers:</p>
<ul>
<li>(a) Decision boundary: \(\{(x_1, x_2) : x_1 + x_2 = 0\}\)</li>
<li>(b) Decision rule: \(\hat y(x) = \mathrm{sign}(x_1 + x_2)\), i.e. \(\mathrm{sign}(w^\top x)\) with \(w = (0, 1, 1)\) using the bias trick</li>
<li>(c) Margin: \(2\sqrt2 \approx 2.83\)</li>
</ul>
<p><b>Canonical form (step 5).</b> Scale so that the closest samples get \(y f = 1\): sample 1 has score \(c\cdot(2 + 2) = 4c\), and \(4c = 1\) gives \(c = \tfrac14\). So \(w = (\tfrac14, \tfrac14)\), \(w_0 = 0\). Check each \(y_i f\): \((+1)\cdot\tfrac{2+2}{4} = 1\), \((+1)\cdot\tfrac{3+1}{4} = 1\), \((-1)\cdot\tfrac{-2-2}{4} = 1\), \((-1)\cdot\tfrac{-3-1}{4} = 1\). All four are exactly 1, so all four are support vectors. Margin: \(1/\|w\| = 1/(\sqrt2/4) = 4/\sqrt2 = 2\sqrt2\), the same answer.</p>
<p><b>2025-B Q4.1a–b.</b> Five positives lie on \(x_1 - x_2 = 1\), and five negatives on \(x_1 - x_2 = -1\). The parallel line midway is \(x_1 - x_2 = 0\) (\(w = (1, -1)\), \(w_0 = 0\)). Check the canonical form: a positive sample has score \(1\cdot x_1 + (-1)\cdot x_2 = x_1 - x_2 = 1\), so \(y f = (+1)(1) = 1\). A negative sample has score \(x_1 - x_2 = -1\), so \(y f = (-1)(-1) = 1\). All ten samples are exactly on the margin, and</p>
\[\delta = \frac{1}{\|w\|} = \frac{1}{\sqrt{1^2 + (-1)^2}} = \frac{1}{\sqrt2} = \frac{\sqrt2}{2} \approx 0.707\]
<p>Cross-check with step 4: the lines are \(\frac{|1 - (-1)|}{\sqrt2} = \frac{2}{\sqrt2} = \sqrt2\) apart, and half of that is \(\frac{\sqrt2}{2}\).</p>`,
      cue: R`"Find the max-margin linear classifier: (a) decision boundary, (b) decision rule \(\hat y(x)\), (c) margin" (2025-C Q3.2). "What is the equation of the max-margin separating line? What is the size of the margin?" (2025-B Q4.1a–b).`,
      first: R`List the distance of every positive–negative pair and circle the smallest. The answer line is the perpendicular bisector of that pair, or the midline if the classes lie on two parallel lines.`,
      recipe: R`Closest opposite pair \(p, q\) → \(w \propto p - q\), line through the midpoint → check every sample's distance \(|f(x)|/\|w\|\) → answer (a) the equation \(f(x) = 0\), (b) \(\hat y = \mathrm{sign}(f(x))\), (c) \(\delta\). Canonical form: scale so the closest samples have \(y f = 1\), then \(\delta = 1/\|w\|\).`,
      trap: R`The 2025-B grader expected many students to answer "margin = 1", because \(y_i f = 1\) for every sample. But 1 is a <b>score</b>, not a distance: divide by \(\|w\| = \sqrt2\). Also, in this course the margin is the distance from the line to the closest sample (\(1/\|w\|\)), <b>not</b> the full width of the band between the two margin lines (\(2/\|w\|\)).` },

    { title: "4 · A sample is added: does the max-margin line move?",
      idea: R`<p>A favourite exam twist: add one sample and ask whether the classifier changes. For the max-margin classifier the answer comes from two facts.</p>
<h5>Step 1 — adding a sample can never increase the best margin</h5>
<p>The margin is the distance to the <b>closest</b> sample. A new sample can only be closer than the old closest ones, or not closer. So for every line, its margin after the addition is at most its margin before. In particular, the best margin achievable can only <b>stay the same or shrink</b>.</p>
<h5>Step 2 — check the new sample against the old line</h5>
<p>Write the old line in canonical form (note 3, step 5) and compute \(y_{\text{new}}\,f(x_{\text{new}})\):</p>
<ul>
<li><b>\(\ge 1\):</b> the new sample is on the correct side and at least as far as the margin. The old line keeps its old margin, and by step 1 nothing can beat that. So the max-margin classifier <b>does not change</b>.</li>
<li><b>\(\lt 1\):</b> the new sample is inside the margin band (\(0 \lt y f \lt 1\)) or on the wrong side (\(y f \le 0\)). The old line has lost margin or misclassifies a sample, so the max-margin classifier <b>changes</b> (and its margin shrinks).</li>
</ul>
<p>The same check in distances: compare the new sample's distance \(|f|/\|w\|\) with the margin \(\delta\), and check its sign.</p>`,
      notation: [
        [R`\(y_{\text{new}} f(x_{\text{new}}) \ge 1\)`, R`new sample outside or on the margin, correctly classified → max-margin line unchanged`],
      ],
      example: R`<p><b>2025-C Q3.4 (first bullet).</b> New sample \(x^{(5)} = (2, 3)\), label +1. Canonical old line: \(w = (\tfrac14, \tfrac14)\), \(w_0 = 0\).</p>
\[y f = (+1)\cdot\big(0 + \tfrac14\cdot 2 + \tfrac14\cdot 3\big) = 0.5 + 0.75 = 1.25 \ \ge 1\]
<p>In distances: \(\dfrac{|2 + 3|}{\sqrt2} = \dfrac{5}{\sqrt2} \approx 3.54\), which is more than the margin \(2\sqrt2 \approx 2.83\). The sample is correctly classified and farther away than the support vectors, so the max-margin classifier <b>does not change</b>. This is the official answer.</p>
<p><b>2025-B Q4.1c.</b> New positive sample \(x = (2, 0)\). Old line \(w = (1, -1)\), \(w_0 = 0\) (canonical, from note 3):</p>
\[y f = (+1)\cdot\big(0 + 1\cdot 2 + (-1)\cdot 0\big) = 2 \ \ge 1\]
<p>The max-margin line stays \(x_1 - x_2 = 0\) with margin \(\tfrac{\sqrt2}{2}\).</p>
<p><b>The sentence to write</b> (it is the argument of steps 1–2): "\((2,0)\) is correctly classified and satisfies the margin constraint \(y f \ge 1\), so the old line keeps its margin; and adding a sample can never <b>increase</b> the best margin, so the old line is still the max-margin line."</p>
<p class="muted">(Slip in the official 2025-B Q4.1c solution: it ends with "Furthermore, the margin cannot <i>shrink</i> by adding a sample". As a general rule that is backwards: a sample inside the margin band <b>does</b> shrink it (see the \(\lt 1\) case above). For this particular sample the old line's margin indeed doesn't shrink, but the fact the argument needs is step 1: the margin cannot <b>grow</b>. The 2025-C solution states it correctly: "the margin cannot increase by adding samples".)</p>
<p><b>For contrast, 2025-C Q3.5's sample.</b> \((-4, -5)\) with label +1: \(y f = (+1)\cdot\big(\tfrac14(-4) + \tfrac14(-5)\big) = -1 - 1.25 = -2.25 \lt 0\). It is misclassified by the old line, so the max-margin classifier would have to change.</p>`,
      cue: R`"Determine whether adding this sample affects the max-margin classifier" (2025-C Q3.4), "How does the max-margin classifier change when adding a positive training sample \(x = (2,0)\)?" (2025-B Q4.1c).`,
      first: R`Compute \(y_{\text{new}}(w_0 + w^\top x_{\text{new}})\) with the old line in canonical form (the closest samples have \(y f = 1\)).`,
      recipe: R`\(\ge 1\) → "no change: it is correctly classified and outside the margin, and adding samples can't increase the margin". \(\lt 1\) → "changes: it violates the margin or is misclassified".` },

    { title: "5 · The LMS classifier, and why it reacts to every sample",
      idea: R`<p>The max-margin line depends only on the closest samples. The exam contrasts it with a classifier that depends on <b>all</b> of them: the <b>LMS (least mean squares) classifier</b>. It is plain regression from the Regression notes, applied to classification.</p>
<h5>Step 1 — it is regression on the labels ±1</h5>
<p>Treat the labels +1 and −1 as ordinary numbers, and fit the score to them by least squares:</p>
\[J(w) = \frac1n\sum_{i=1}^n \big(w^\top x^{(i)} - y^{(i)}\big)^2\]
<p>(with the bias trick, \(x = (1, x_1, x_2)\), \(w = (w_0, w_1, w_2)\)). This is the Regression loss with a \(\tfrac1n\) in front: build \(X\) with the ones column, and put the ±1 labels in \(y\). Then classify with \(\mathrm{sign}(w^\top x)\).</p>
<h5>Step 2 — the shortcut: a loss of zero is the minimum</h5>
<p>\(J\) is a sum of squares, so \(J \ge 0\) for every \(w\). If you find a \(w\) with \(w^\top x^{(i)} = y^{(i)}\) for <b>every</b> sample, all residuals are 0, so \(J = 0\), and no \(w\) can do better. How to find it: take a line that separates the data with the <b>same score size</b> on every sample, and scale it so the scores are exactly ±1. That is the canonical form from note 3! (If there is no such pattern, use the closed form \((X^\top X)^{-1}X^\top y\) from Regression note 5.)</p>
<h5>Step 3 — LMS punishes samples that are "too correct"</h5>
<p>LMS wants every score to <b>equal</b> its label. A positive sample with score 1.25 is correctly classified, but its residual is 0.25, and LMS pays \(0.25^2\) for it. So adding a sample changes the LMS classifier <b>unless its score is exactly its label</b>. This is different from the max-margin line, which ignores such a sample.</p>
<h5>Step 4 — proving that the LMS solution changed</h5>
<p>Two ways. (i) <b>Gradient check</b> (Regression note 3): the minimum is where the gradient is 0. Regression note 3 found \(\nabla J = 2X^\top(X\theta - y)\) for the plain sum of squares. Here the weights are called \(w\) instead of \(\theta\), and the sum is multiplied by \(\tfrac1n\), which multiplies the gradient by \(\tfrac1n\) too: \(\nabla J = \tfrac2n X^\top(Xw - y)\). If it is not zero at the old \(w\), the old \(w\) is not the minimum any more. (ii) <b>The official way</b>: show a slightly different \(w\) with a smaller loss.</p>`,
      notation: [
        [R`LMS classifier`, R`the \(w\) minimizing \(J(w) = \frac1n\sum_i (w^\top x^{(i)} - y^{(i)})^2\), used as \(\mathrm{sign}(w^\top x)\)`],
        [R`\(r = Xw - y\)`, R`the residual vector (score minus label), as in Regression`],
        [R`\(\nabla J = \tfrac2n X^\top r\)`, R`the gradient of the LMS loss. It is zero exactly at the minimum.`],
      ],
      example: R`<p><b>2025-C Q3.3.</b> Build \(X\) (ones column first) and \(y\) as in Regression note 1:</p>
\[X = \begin{bmatrix}1&2&2\\1&3&1\\1&-2&-2\\1&-3&-1\end{bmatrix},\qquad y = \begin{bmatrix}1\\1\\-1\\-1\end{bmatrix}\]
<p>Take the canonical max-margin weights with the bias trick, \(w = (0, \tfrac14, \tfrac14)\), and compute every score:</p>
<ul>
<li>Row 1: \((1, 2, 2)\cdot(0, \tfrac14, \tfrac14) = 1\cdot 0 + 2\cdot\tfrac14 + 2\cdot\tfrac14 = 0 + 0.5 + 0.5 = 1\)</li>
<li>Row 2: \((1, 3, 1)\cdot(0, \tfrac14, \tfrac14) = 0 + 0.75 + 0.25 = 1\)</li>
<li>Row 3: \((1, -2, -2)\cdot(0, \tfrac14, \tfrac14) = 0 - 0.5 - 0.5 = -1\)</li>
<li>Row 4: \((1, -3, -1)\cdot(0, \tfrac14, \tfrac14) = 0 - 0.75 - 0.25 = -1\)</li>
</ul>
<p>So \(Xw = (1, 1, -1, -1) = y\): every residual is 0, and \(J = 0\). Since \(J \ge 0\) always, the LMS classifier is \(w = (0, \tfrac14, \tfrac14)\). This is the official answer. (numpy's least-squares solver gives the same \(w\), and it is the only one, because \(X\) has rank 3.)</p>
<p><b>2025-C Q3.4 (second bullet).</b> Add \((2, 3)\) with label +1, so \(X\) gets the row \((1, 2, 3)\) and \(y\) gets a 1. The new score is \(0 + \tfrac14\cdot 2 + \tfrac14\cdot 3 = 1.25\), the new residual is \(1.25 - 1 = 0.25\), and</p>
\[J = \tfrac15\big(0^2 + 0^2 + 0^2 + 0^2 + 0.25^2\big) = \tfrac15\cdot 0.0625 = 0.0125 = \tfrac1{80}\]
<p><b>(i) Gradient check.</b> The residuals are \(r = Xw - y = (1-1,\ 1-1,\ -1-(-1),\ -1-(-1),\ 1.25-1) = (0, 0, 0, 0, 0.25)\). \(X^\top r\) adds up the rows of \(X\), each multiplied by its residual, so only the last row \((1, 2, 3)\) survives: \(X^\top r = 0\cdot(\dots) + 0.25\cdot(1, 2, 3) = (0.25\cdot 1,\ 0.25\cdot 2,\ 0.25\cdot 3) = (0.25, 0.5, 0.75)\). With \(n = 5\):</p>
\[\nabla J = \tfrac25 (0.25,\ 0.5,\ 0.75) = (0.4\cdot 0.25,\ 0.4\cdot 0.5,\ 0.4\cdot 0.75) = (0.1,\ 0.2,\ 0.3) \ne 0\]
<p>So the old \(w\) is no longer the minimum, and the LMS classifier <b>changes</b>.</p>
<p><b>(ii) The official way, corrected.</b> Move the line slightly toward the positives by lowering the bias: \(w = (-\varepsilon, \tfrac14, \tfrac14)\) with a small \(\varepsilon \gt 0\). (The boundary becomes \(-\varepsilon + \tfrac14 x_1 + \tfrac14 x_2 = 0\), i.e. \(x_1 + x_2 = 4\varepsilon\): the same direction, shifted a little toward the positives, which have \(x_1 + x_2 = 4\) or 5.) Each of the four old scores drops by \(\varepsilon\), so their residuals become \(-\varepsilon\). The new sample's score becomes \(1.25 - \varepsilon\), so its residual is \(0.25 - \varepsilon\). Then:</p>
\[J = \tfrac15\big(4\varepsilon^2 + (\tfrac14 - \varepsilon)^2\big) = \tfrac15\big(4\varepsilon^2 + \tfrac1{16} - \tfrac{\varepsilon}{2} + \varepsilon^2\big) = \tfrac15\big(5\varepsilon^2 - \tfrac{\varepsilon}{2} + \tfrac1{16}\big) = \varepsilon^2 - \tfrac{\varepsilon}{10} + \tfrac1{80}\]
<p>This is below \(\tfrac1{80}\) exactly when \(\varepsilon^2 - \tfrac{\varepsilon}{10} \lt 0\), i.e. \(\varepsilon(\varepsilon - 0.1) \lt 0\), i.e. \(0 \lt \varepsilon \lt 0.1\). For example, \(\varepsilon = 0.05\) gives \(0.0025 - 0.005 + 0.0125 = 0.01 \lt 0.0125\).</p>
<p class="muted">(Slip in the official 2025-C Q3.4 solution: it writes \(w = (\varepsilon, \tfrac14, \tfrac14)\) with a <b>plus</b>. With \(+\varepsilon\) every score goes <b>up</b> by \(\varepsilon\): the four old residuals become \(+\varepsilon\) and the fifth becomes \(0.25 + \varepsilon\), so the loss goes <b>up</b>: at \(\varepsilon = 0.05\) it is \(\tfrac15\big(4\cdot 0.05^2 + 0.3^2\big) = \tfrac15(0.01 + 0.09) = 0.02 \gt 0.0125\). Its own formula \((\tfrac14 - \varepsilon)^2\) and "moving the line toward the positive samples" both need \(w_0 = -\varepsilon\). For the curious, numpy's new LMS solution is \(w \approx (-0.022, 0.280, 0.183)\). You don't need it in the exam.)</p>`,
      cue: R`"Find the least mean squares (LMS) classifier… Specify the weight vector \(w\). Explain." (2025-C Q3.3), then "does adding this sample affect the LMS classifier?" (2025-C Q3.4).`,
      first: R`Write "\(J(w) \ge 0\) for every \(w\)", then look for a \(w\) whose score equals the label on every sample (the canonical max-margin \(w\) is the first thing to try).`,
      recipe: R`Zero-loss \(w\) → it is the LMS solution. After adding a sample: compute its residual with the old \(w\). If the residual is 0, nothing changes. If it isn't, show \(\nabla J = \tfrac2n X^\top r \ne 0\) (or a nearby \(w\) with a smaller loss), so LMS changes.`,
      table: {
        head: ["", "Max-margin (SVM)", "LMS"],
        rows: [
          ["Depends on", "only the closest samples (support vectors)", "every sample"],
          [R`A new, correctly classified sample with \(y f \gt 1\)`, "no change", R`changes (its residual \(f - y \ne 0\))`],
          ["Loss", R`\(\tfrac12\|w\|^2\) under \(y_i f \ge 1\)`, R`\(\frac1n\sum(w^\top x^{(i)} - y^{(i)})^2\)`],
        ]},
      trap: R`"It's still correctly classified, so LMS doesn't change" is wrong. LMS doesn't measure right/wrong, it measures <b>how far the score is from the label</b>, and a score of 1.25 against a label of 1 costs something.` },

    { title: "6 · Soft margins: the hinge loss and the slack hyperparameter C",
      idea: R`<p>The max-margin classifier of notes 3–4 is called <b>hard-margin</b>: every sample must satisfy \(y_i f \ge 1\). That causes two problems. If the data isn't separable, no line satisfies the constraints at all. And one odd sample near the other class can force a very narrow margin. The fix is the <b>soft margin</b>: allow violations, but charge a price for each one.</p>
<h5>Step 1 — the hinge loss of one sample</h5>
\[L^{(i)}_{\text{hinge}} = \max\big\{0,\ 1 - y_i\,(w_0 + w^\top x^{(i)})\big\}\]
<p>Read it through \(y_i f\) (note 0, step 5):</p>
<ul>
<li>\(y_i f \ge 1\) (correct side, outside or on the margin): \(1 - y_i f \le 0\), so the loss is \(0\). No charge.</li>
<li>\(0 \lt y_i f \lt 1\) (correct side, but inside the margin band): the loss is between 0 and 1.</li>
<li>\(y_i f \le 0\) (wrong side): the loss is \(\ge 1\). The farther on the wrong side, the bigger it is.</li>
</ul>
<h5>Step 2 — the total objective</h5>
<p>The objective (on the formula sheet) adds up two wishes:</p>
\[L(w, w_0) = \underbrace{\tfrac12\|w\|^2}_{\text{small} \iff \text{wide margin } 1/\|w\|} + \underbrace{\frac{C}{n}\sum_{i=1}^n \max\big\{0,\ 1 - y_i(w^\top x^{(i)} + w_0)\big\}}_{\text{average margin violation}}\]
<p>The first term wants a wide margin. The second wants few and small violations. The two pull against each other: a wider margin means more samples fall inside it.</p>
<h5>Step 3 — \(C\) sets the exchange rate between the two wishes</h5>
<ul>
<li><b>Small \(C\)</b> (e.g. 0.01): violations are cheap, so the \(\tfrac12\|w\|^2\) term dominates. The result: small \(w\), a <b>wide margin</b>, and many violations tolerated, possibly including training errors.</li>
<li><b>Large \(C\)</b> (e.g. 100): violations are expensive. The result: a <b>narrow margin</b> and few (ideally zero) violations and training errors. It behaves like the hard margin.</li>
</ul>
<p>\(C\) is a <b>hyperparameter</b>: you choose it before training, and cross-validation (note 10) picks it.</p>
<h5>Step 4 — the same thing written with slack variables</h5>
<p>The formula sheet's "primal" with \(\xi_i\) ("xi", the <b>slack</b>) is the same problem (it writes \(C\sum_i\xi_i\) without the \(\tfrac1n\), which only changes what a given number \(C\) means, not the idea): \(\xi_i\) is sample \(i\)'s margin violation, i.e. its hinge loss. \(\xi_i = 0\): satisfies the margin. \(\xi_i \gt 0\): violates it. \(\xi_i \gt 1\): misclassified. (Your HW4 <code>LinearSVM</code> minimized this objective with sub-gradient descent, and the formula sheet has its gradient.)</p>
<h5>Step 5 — matching plots to values of C</h5>
<ol>
<li>Count the training errors in each plot (samples on the wrong side of the line). The plot with the <b>fewest errors (zero)</b> gets the <b>largest \(C\)</b>.</li>
<li>Of the remaining plots, the one whose line keeps <b>farther away from the nearest samples</b> (the wider margin) gets the <b>smallest \(C\)</b>.</li>
<li>The last plot gets the middle value, by elimination. (The official grader's comment says exactly this.)</li>
</ol>`,
      notation: [
        [R`\(\max\{0, a\}\)`, R`\(a\) if \(a \gt 0\), otherwise 0`],
        [R`\(L^{(i)}_{\text{hinge}}\)`, R`sample \(i\)'s hinge loss = its margin violation`],
        [R`\(C\)`, R`the slackness hyperparameter: the price of violations relative to margin width`],
        [R`\(\xi_i\) ("xi")`, R`slack variable = sample \(i\)'s margin violation (the same number as its hinge loss)`],
        [R`soft / hard margin`, R`violations allowed at a price / not allowed at all`],
      ],
      example: R`<p><b>Hinge loss with real samples</b> (illustration using 2025-C Q3's line, canonical \(w = (\tfrac14, \tfrac14)\), \(w_0 = 0\)):</p>
<ul>
<li>Sample \((2,2)\), +1: \(y f = (+1)(\tfrac24 + \tfrac24) = 1\). Hinge: \(\max\{0, 1 - 1\} = \max\{0, 0\} = 0\).</li>
<li>Q3.4's sample \((2,3)\), +1: \(y f = 1.25\) (note 4). Hinge: \(\max\{0, 1 - 1.25\} = \max\{0, -0.25\} = 0\).</li>
<li>Q3.5's sample \((-4,-5)\), +1: \(y f = (+1)(\tfrac{-4}{4} + \tfrac{-5}{4}) = -2.25\). Hinge: \(\max\{0, 1 - (-2.25)\} = \max\{0, 3.25\} = 3.25\). This is bigger than 1, which fits: the sample is misclassified.</li>
</ul>
<p><b>The role of \(C\), with numbers.</b> Take the extended set of Q3.5 (\(n = 5\): the four original samples, each with hinge 0, plus \((-4,-5)\) with hinge 3.25) and the same line. The first term is \(\tfrac12\|w\|^2 = \tfrac12\big(\tfrac1{16} + \tfrac1{16}\big) = \tfrac1{16} = 0.0625\). The second term is \(\tfrac{C}{5}(0 + 0 + 0 + 0 + 3.25) = \tfrac{3.25}{5}\,C = 0.65\,C\).</p>
<div class="tw"><table><thead><tr><th>\(C\)</th><th>\(\tfrac12\|w\|^2\)</th><th>\(0.65\,C\)</th><th>total</th></tr></thead><tbody>
<tr><td>0.01</td><td>0.0625</td><td>0.0065</td><td>0.069</td></tr>
<tr><td>1</td><td>0.0625</td><td>0.65</td><td>0.7125</td></tr>
<tr><td>100</td><td>0.0625</td><td>65</td><td>65.0625</td></tr></tbody></table></div>
<p>With \(C = 0.01\) the violation hardly counts, and the optimizer would rather keep \(w\) small (wide margin). With \(C = 100\) the violation is almost the whole loss, and the optimizer will pay for a larger \(\|w\|\) (narrower margin) to get rid of it.</p>
<p><b>2025-B Q4.1's data:</b> every sample has \(y f = 1\) (note 3), so every hinge is 0 and \(L = \tfrac12\|w\|^2 = \tfrac12(1^2 + (-1)^2) = 1\), whatever \(C\) is.</p>
<p><b>2025-B Q4.2 — the plots</b> (filled vs. unfilled circles, one line per plot):</p>
<ul>
<li><b>Plot B:</b> the line squeezes between the classes. It passes very close to several points, but <b>every</b> sample is on its correct side. Zero training errors → \(C = 100\).</li>
<li><b>Plots A and C:</b> both leave the unfilled circle at about \((0.4, -0.7)\) on the filled side (one error each), so they tolerate violations → the two smaller values of \(C\).</li>
<li>In <b>A</b> the line sits farther from the closest filled circles than in C → wider margin → \(C = 0.01\). That leaves <b>C</b> with \(C = 1\).</li>
</ul>
<p>This is the official matching: A = 0.01, B = 100, C = 1.</p>`,
      cue: R`"The plots depict training data on which a linear classifier was trained by minimizing the hinge loss with different values of \(C\). Match to each plot a value of \(C\) in \(\{0.01, 1, 100\}\). Justify." (2025-B Q4.2).`,
      first: R`Write the objective \(\tfrac12\|w\|^2 + \tfrac Cn\sum\text{hinge}\) and the sentence "large \(C\) → few violations, narrow margin; small \(C\) → wide margin, many violations". Then count the errors in each plot.`,
      recipe: R`Zero training errors → largest \(C\). The widest margin (line farthest from the nearest samples) → smallest \(C\). The rest → middle value. Justify each match with the trade-off sentence.`,
      trap: R`Reversing the direction. \(C\) multiplies the <b>violations</b>, not the margin term. So a big \(C\) makes violations expensive and gives a narrow margin. (It is the opposite of \(\lambda\) in ridge regression, which multiplies the penalty on \(w\).)` },

    { title: "7 · When no line works: map the data with φ",
      idea: R`<p>Where we are: some datasets have no separating line (note 1). The idea, which Linear classification note 6 used for a ring of positives around the origin, is to <b>compute new features</b> from the old ones and run a linear classifier on the new features. This note is a short recap of that idea, plus the new case where the circle's centre is <b>not</b> the origin. A line in the new features is a <b>curve</b> (a circle, an ellipse, a hyperbola…) back in the original plane.</p>
<h5>Step 1 — a mapping is a list of new features</h5>
<p>A mapping \(\varphi\) ("phi") turns each sample \(x = (x_1, x_2)\) into a longer vector, e.g. \(\varphi(x) = (1, x_1, x_2, x_1^2, x_2^2)\). The mapped space (\(\mathbb{R}^N\), with \(N\) = the number of new features) is called the <b>ambient space</b>. A linear classifier there has a score \(w^\top\varphi(x)\), which is linear in the new features but <b>not</b> linear in \(x_1, x_2\).</p>
<h5>Step 2 — the circle recipe (lecture example 4)</h5>
<p>To put one class <b>inside a circle</b> with centre \((a, b)\) and radius \(r\), use the score "squared distance to the centre minus \(r^2\)", which is negative inside and positive outside:</p>
\[f(x) = (x_1 - a)^2 + (x_2 - b)^2 - r^2\]
<p>Expand both squares, \((x_1 - a)^2 = x_1^2 - 2ax_1 + a^2\) and \((x_2 - b)^2 = x_2^2 - 2bx_2 + b^2\), then group the terms by feature:</p>
\[f(x) = (a^2 + b^2 - r^2)\cdot 1 + (-2a)\cdot x_1 + (-2b)\cdot x_2 + 1\cdot x_1^2 + 1\cdot x_2^2\]
<p>This is a weighted sum of the features \(1, x_1, x_2, x_1^2, x_2^2\). So</p>
\[\varphi(x) = (1, x_1, x_2, x_1^2, x_2^2),\qquad w = (a^2 + b^2 - r^2,\ -2a,\ -2b,\ 1,\ 1)\]
<p>and the separating hyperplane in the ambient space is \(\{z : w^\top z = 0\}\).</p>
<h5>Step 3 — choosing \(a\), \(b\), \(r\)</h5>
<p>Take the centre in the middle of the group you want to enclose (for example their midpoint). The radius must be <b>larger</b> than the distance from the centre to every enclosed sample, and <b>smaller</b> than the distance to every other sample. Then check every sample's sign, as in note 0.</p>
<h5>Step 4 — mappings that cannot help</h5>
<ul>
<li><b>Linear mappings</b>, whose new features are just weighted sums of \(x_1, x_2\) (like \((2x_1 - x_2, x_1 + 2x_2)\)): a line in the new features is still a line in the original plane, so if the original data isn't separable, the mapped data isn't either. The midpoint argument of note 1 carries over unchanged.</li>
<li><b>Mappings that collide</b>: if two samples with different labels land on the same mapped point, no classifier can separate them (note 1, argument (a)).</li>
</ul>`,
      notation: [
        [R`\(\varphi(x)\) ("phi of x")`, R`the mapped sample: a vector of new features computed from \(x\)`],
        [R`ambient space \(\mathbb{R}^N\)`, R`the space of mapped samples; \(N\) = number of features of \(\varphi\)`],
        [R`\(w^\top\varphi(x)\)`, R`the score in the ambient space; with the constant 1 as the first feature, its weight plays the role of the bias`],
        [R`full quadratic variety`, R`all monomials up to degree 2: \((1, x_1, x_2, x_1^2, x_2^2, x_1x_2)\)`],
      ],
      example: R`<p><b>2025-C Q3.5.</b> The negatives \((-2,-2)\) and \((-3,-1)\) sit close together. The positives \((2,2)\), \((3,1)\), \((-4,-5)\) are all farther away. So put the negatives inside a circle.</p>
<p><b>Centre</b> = the negatives' midpoint: \(\big(\tfrac{-2 + (-3)}{2}, \tfrac{-2 + (-1)}{2}\big) = (-2.5, -1.5)\). <b>Distances from the centre:</b></p>
<ul>
<li>to \((-2,-2)\): \(\sqrt{(-2+2.5)^2 + (-2+1.5)^2} = \sqrt{0.25 + 0.25} = \sqrt{0.5} \approx 0.707\)</li>
<li>to \((-3,-1)\): \(\sqrt{(-0.5)^2 + 0.5^2} = \sqrt{0.5} \approx 0.707\)</li>
<li>to \((-4,-5)\): \(\sqrt{(-1.5)^2 + (-3.5)^2} = \sqrt{2.25 + 12.25} = \sqrt{14.5} \approx 3.81\) (the closest positive)</li>
<li>to \((2,2)\): \(\sqrt{4.5^2 + 3.5^2} = \sqrt{32.5} \approx 5.70\); to \((3,1)\): \(\sqrt{5.5^2 + 2.5^2} = \sqrt{36.5} \approx 6.04\)</li>
</ul>
<p>So any radius between 0.707 and 3.81 works. Take \(r = 1\):</p>
\[w = (a^2 + b^2 - r^2,\ -2a,\ -2b,\ 1,\ 1) = \big((-2.5)^2 + (-1.5)^2 - 1^2,\ -2(-2.5),\ -2(-1.5),\ 1,\ 1\big) = (6.25 + 2.25 - 1,\ 5,\ 3,\ 1,\ 1) = (7.5,\ 5,\ 3,\ 1,\ 1)\]
<p><b>Check every sample</b>, with score \(= 7.5 + 5x_1 + 3x_2 + x_1^2 + x_2^2\):</p>
<ul>
<li>\((2,2)\), +: \(7.5 + 5\cdot 2 + 3\cdot 2 + 2^2 + 2^2 = 7.5 + 10 + 6 + 4 + 4 = 31.5 \gt 0\) ✓</li>
<li>\((3,1)\), +: \(7.5 + 15 + 3 + 9 + 1 = 35.5 \gt 0\) ✓</li>
<li>\((-2,-2)\), −: \(7.5 - 10 - 6 + 4 + 4 = -0.5 \lt 0\) ✓</li>
<li>\((-3,-1)\), −: \(7.5 - 15 - 3 + 9 + 1 = -0.5 \lt 0\) ✓</li>
<li>\((-4,-5)\), +: \(7.5 - 20 - 15 + 16 + 25 = 13.5 \gt 0\) ✓</li>
</ul>
<p>Answer: \(\varphi(x_1, x_2) = (1, x_1, x_2, x_1^2, x_2^2)\) (or the full quadratic variety, with weight 0 on \(x_1x_2\)), and the hyperplane \(w = (7.5, 5, 3, 1, 1)\).</p>
<p class="muted">(Slip in the official 2025-C Q3.5 solution: it uses radius \(r = 0.6\), so \(w = (8.14, 5, 3, 1, 1)\). But the negatives are \(\sqrt{0.5} \approx 0.707\) from the centre, which is <b>outside</b> a circle of radius 0.6. Indeed \(8.14 - 10 - 6 + 4 + 4 = +0.14\), so both negatives are classified positive. Any \(r\) between 0.71 and 3.8 fixes it, e.g. \(r = 1\) above. The same solution also prints \((x_2 - a)^2\) where it means \((x_2 - b)^2\).)</p>
<p><b>2026-A Q3.3 — four mappings, same five samples</b> (data in note 1). Map every sample:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(y\)</th><th>\(\varphi_A = (x_1, x_2)\)</th><th>\(\varphi_B = (x_1^2, x_1x_2)\)</th><th>\(\varphi_C = (x_1^2, x_2^2)\)</th><th>\(\varphi_D = (2x_1 - x_2, x_1 + 2x_2)\)</th></tr></thead><tbody>
<tr><td>1 \((0,0)\)</td><td>−</td><td>(0, 0)</td><td>(0, 0)</td><td>(0, 0)</td><td>(0, 0)</td></tr>
<tr><td>2 \((1,1)\)</td><td>−</td><td>(1, 1)</td><td>(1, 1)</td><td>(1, 1)</td><td>(1, 3)</td></tr>
<tr><td>3 \((3,0)\)</td><td>+</td><td>(3, 0)</td><td>(9, 0)</td><td>(9, 0)</td><td>(6, 3)</td></tr>
<tr><td>4 \((0,3)\)</td><td>+</td><td>(0, 3)</td><td>(0, 0)</td><td>(0, 9)</td><td>(−3, 6)</td></tr>
<tr><td>5 \((-3,0)\)</td><td>+</td><td>(−3, 0)</td><td>(9, 0)</td><td>(9, 0)</td><td>(−6, −3)</td></tr></tbody></table></div>
<ul>
<li><b>\(\varphi_A\): not separable.</b> It is the original data, and note 1 showed \((0,0)\) is the midpoint of \((3,0)\) and \((-3,0)\).</li>
<li><b>\(\varphi_B\): not separable.</b> Sample 1 (−) and sample 4 (+) both map to \((0, 0)\): the same point with different labels.</li>
<li><b>\(\varphi_C\): separable</b> with \(w_0 = -3\), \(w = (1, 1)\), i.e. score \(-3 + x_1^2 + x_2^2\) (a circle of radius \(\sqrt3\) in the original plane). Check: sample 1: \(-3 + 0 + 0 = -3 \lt 0\) ✓; sample 2: \(-3 + 1 + 1 = -1 \lt 0\) ✓; samples 3, 4, 5: \(-3 + 9 + 0 = 6 \gt 0\), \(-3 + 0 + 9 = 6\), \(-3 + 9 + 0 = 6\) ✓.</li>
<li><b>\(\varphi_D\): not separable.</b> It is a linear mapping of the original features. Concretely, the midpoint survives: \(\varphi_D(3,0) = (2\cdot 3 - 0,\ 3 + 2\cdot 0) = (6, 3)\), \(\varphi_D(-3,0) = (-6, -3)\), and their midpoint \(\big(\tfrac{6 - 6}{2}, \tfrac{3 - 3}{2}\big) = (0, 0) = \varphi_D(0,0)\) is still the negative sample 1.</li>
</ul>`,
      cue: R`"Propose a mapping \(\varphi(x_1, x_2)\) into a higher-dimensional space in which the extended dataset is linearly separable. Specify \(\varphi\) and a hyperplane" (2025-C Q3.5). "For each of the four mappings, specify whether the dataset is linearly separable after mapping… specify \(w\)" (2026-A Q3.3).`,
      first: R`Sketch the data and ask "what shape separates it?" If one class sits in a clump, draw a circle around it and write \((x_1 - a)^2 + (x_2 - b)^2 - r^2\). For given mappings, write the table of mapped points first.`,
      recipe: R`Circle: expand → \(\varphi = (1, x_1, x_2, x_1^2, x_2^2)\), \(w = (a^2 + b^2 - r^2, -2a, -2b, 1, 1)\) → check the sign of every sample. Given mappings: table → a collision or a midpoint means "no"; otherwise give \(w\) and check every sample.`,
      trap: R`Choosing the radius without measuring. Compute the distance from the centre to the enclosed samples first (the official solution didn't, and its circle misses them). Also, always check <b>every</b> sample's sign at the end: that check is the proof.` },

    { title: "8 · Kernels: an inner product in the mapped space, computed in the original space",
      idea: R`<p>Where we are: mappings make data separable, but they can have many features. With \(p\) original features, the full quadratic variety already has \(\tfrac{(p+2)(p+1)}{2}\) features (6 for \(p = 2\), 66 for \(p = 10\)), and higher degrees explode. Some training algorithms, the dual perceptron (note 9) and the dual SVM, never use the mapped vectors themselves. They only ever use <b>inner products</b> \(\varphi(u)^\top\varphi(v)\) between pairs of samples. A kernel is a shortcut for exactly that number. (Linear classification note 7 already met the quadratic kernel. Steps 1–3 recap it with 2026-A's numbers, and step 4 adds the RBF kernel.)</p>
<h5>Step 1 — the definition</h5>
<p>A function \(K(u, v)\) is a <b>kernel</b> for the mapping \(\varphi\) if, for all \(u, v\),</p>
\[K(u, v) = \varphi(u)^\top\varphi(v)\]
<p>We then say "\(\varphi\) affords \(K\)". You compute \(K\) directly from the short vectors \(u, v\), and get the inner product of the long vectors without ever building them.</p>
<h5>Step 2 — the quadratic kernel</h5>
\[K(u, v) = (1 + u^\top v)^2\]
<p>To evaluate it, compute \(u^\top v\), add 1, and square.</p>
<h5>Step 3 — finding the \(\varphi\) behind it: expand, then pair up</h5>
<p>In 2D, \(u^\top v = u_1v_1 + u_2v_2\). Square the three-term sum \((1 + u_1v_1 + u_2v_2)^2\): you get every term squared plus twice every pair of terms:</p>
\[(1 + u_1v_1 + u_2v_2)^2 = 1 + u_1^2v_1^2 + u_2^2v_2^2 + 2u_1v_1 + 2u_2v_2 + 2u_1u_2v_1v_2\]
<p>Now write every term as (something of \(u\)) × (the <b>same</b> something of \(v\)). The factor 2 is split as \(\sqrt2\cdot\sqrt2\):</p>
\[= 1\cdot 1 + (\sqrt2u_1)(\sqrt2v_1) + (\sqrt2u_2)(\sqrt2v_2) + (\sqrt2u_1u_2)(\sqrt2v_1v_2) + u_1^2\,v_1^2 + u_2^2\,v_2^2\]
<p>A sum of matching products is a dot product, so this is \(\varphi(u)^\top\varphi(v)\) with</p>
\[\varphi(x) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ \sqrt2x_1x_2,\ x_1^2,\ x_2^2\big) \in \mathbb{R}^6\]
<p>(The order of the entries doesn't matter, as long as \(u\) and \(v\) use the same order. Linear classification note 7 lists the same six entries in a different order.)</p>
<p>The lecture gives a second valid answer with repeats: all products \(x_jx_l\) for \(j, l = 0, 1, 2\), with \(x_0 = 1\):</p>
\[\varphi(x) = (1, x_1, x_2, x_1, x_1^2, x_1x_2, x_2, x_2x_1, x_2^2) \in \mathbb{R}^9\]
<p>Here the repeats (\(x_1\) twice, \(x_2\) twice, \(x_1x_2\) twice) produce the factors 2 instead of the \(\sqrt2\)'s. Both mappings are official answers to 2026-A Q3.2. Either one contains every monomial of degree ≤ 2 (up to positive scaling). So the quadratic kernel = working in the <b>full quadratic variety</b>, which can draw any circle, ellipse or hyperbola.</p>
<h5>Step 4 — the RBF kernel</h5>
\[K_{\text{RBF}}(u, v) = e^{-\gamma\|u - v\|^2}\]
<p>It equals 1 when \(u = v\) and decays toward 0 as the points move apart, so it measures <b>similarity</b>. \(\gamma\) ("gamma") sets how fast it decays. <b>Large \(\gamma\)</b>: only very close points count as similar, so each training sample influences only a tiny area around itself, which gives a wiggly boundary that can wrap around single points (overfitting). <b>Small \(\gamma\)</b>: far points still count as similar, which gives a smooth boundary. Its \(\varphi\) has infinitely many features, so you can only use it through the kernel. \(\gamma\) is a hyperparameter, chosen by cross-validation (note 10).</p>`,
      notation: [
        [R`\(K(u, v)\)`, R`a kernel: a number computed from two original samples that equals \(\varphi(u)^\top\varphi(v)\)`],
        [R`"\(\varphi\) affords \(K\)"`, R`\(K(u,v) = \varphi(u)^\top\varphi(v)\) for all \(u, v\)`],
        [R`\((1 + u^\top v)^2\)`, R`the quadratic (polynomial, degree 2) kernel`],
        [R`\(e^{-\gamma\|u - v\|^2}\)`, R`the RBF (radial basis function) kernel; \(\|u - v\|^2 = (u_1 - v_1)^2 + (u_2 - v_2)^2\)`],
        [R`\(\gamma\) ("gamma")`, R`RBF width hyperparameter: large = very local, small = smooth`],
      ],
      example: R`<p><b>2026-A Q3.1.</b> \(u = (1, 0)\), \(v = (3, 0)\):</p>
\[u^\top v = 1\cdot 3 + 0\cdot 0 = 3,\qquad K(u, v) = (1 + 3)^2 = 4^2 = 16\]
<p><b>Check against the 6-feature \(\varphi\)</b> (this is also a good way to test your answer to Q3.2):</p>
<ul>
<li>\(\varphi(1, 0) = (1,\ \sqrt2\cdot 1,\ \sqrt2\cdot 0,\ \sqrt2\cdot 1\cdot 0,\ 1^2,\ 0^2) = (1, \sqrt2, 0, 0, 1, 0)\)</li>
<li>\(\varphi(3, 0) = (1,\ \sqrt2\cdot 3,\ 0,\ 0,\ 3^2,\ 0) = (1, 3\sqrt2, 0, 0, 9, 0)\)</li>
<li>\(\varphi(u)^\top\varphi(v) = 1\cdot 1 + \sqrt2\cdot 3\sqrt2 + 0 + 0 + 1\cdot 9 + 0 = 1 + 6 + 9 = 16\) ✓</li>
</ul>
<p><b>And against the 9-feature \(\varphi\):</b> \(\varphi(1,0) = (1, 1, 0, 1, 1, 0, 0, 0, 0)\) and \(\varphi(3,0) = (1, 3, 0, 3, 9, 0, 0, 0, 0)\). Their dot product is \(1 + 3 + 0 + 3 + 9 + 0 + 0 + 0 + 0 = 16\) ✓.</p>
<p><b>RBF, as an illustration</b> (the same \(u, v\), with two of the \(\gamma\) values from 2026-A Q3.5's list): \(\|u - v\|^2 = (1 - 3)^2 + (0 - 0)^2 = 4\).</p>
<ul>
<li>\(\gamma = 0.25\): \(K = e^{-0.25\cdot 4} = e^{-1} \approx 0.368\). The points are fairly similar.</li>
<li>\(\gamma = 10\): \(K = e^{-10\cdot 4} = e^{-40} \approx 4\times 10^{-18}\). The points are practically "invisible" to each other.</li>
</ul>`,
      cue: R`"Compute \(K(u,v)\) for \(u = \dots\), \(v = \dots\)" (2026-A Q3.1). "Specify an explicit mapping \(\varphi: \mathbb{R}^2 \to \mathbb{R}^N\) that affords the kernel \(K(u,v) = (1 + u^\top v)^2\)" (2026-A Q3.2).`,
      first: R`Write \(u^\top v = u_1v_1 + u_2v_2\). To evaluate: plug in and square. To find \(\varphi\): expand \((1 + u_1v_1 + u_2v_2)^2\) completely.`,
      recipe: R`Expand → write each term as \(g(u)\cdot g(v)\) (split a 2 as \(\sqrt2\cdot\sqrt2\)) → \(\varphi\) = the list of the \(g\)'s. Test it on one pair: \(\varphi(u)^\top\varphi(v)\) must equal \(K(u,v)\).`,
      trap: R`Forgetting the \(\sqrt2\)'s (then the cross terms come out 1× instead of 2×) or forgetting the constant 1 feature. Test with the numbers of Q3.1: you must get 16.` },

    { title: "9 · The dual perceptron with a kernel, and when it converges",
      idea: R`<p>Where we are: note 8 said some algorithms only need inner products. Here is the one the exam asks about, the <b>dual perceptron</b>. It is the ordinary perceptron from the Linear-classification notes, just written differently. Steps 1–4 are a recap of Linear classification notes 1 and 7. Step 5 (when it converges) is what the exam asks.</p>
<h5>Step 1 — the perceptron, as the lecture writes it</h5>
<p>Start with \(w = 0\) (the bias is inside \(w\), and every \(x\) gets a leading 1). Go through the samples again and again. For sample \(i\): predict \(\hat y_i = \mathrm{sign}(w^\top x^{(i)})\). If \(\hat y_i \ne y_i\), update \(w \leftarrow w + 2\eta\, y_i x^{(i)}\). (Convention: \(\mathrm{sign}(0) = +1\).)</p>
<h5>Step 2 — \(w\) is always a combination of the samples</h5>
<p>\(w\) starts at 0, and every update adds a multiple of some \(y_j x^{(j)}\). So at every moment</p>
\[w = \sum_{j=1}^n \lambda_j\, y_j\, x^{(j)},\qquad \lambda_j = 2\eta \times (\text{number of mistakes made so far on sample } j)\]
<h5>Step 3 — so we never need \(w\) itself</h5>
<p>Substitute into the score: \(w^\top x^{(i)} = \sum_j \lambda_j y_j\, x^{(j)\top}x^{(i)}\). The algorithm becomes: keep one number \(\lambda_j\) per sample (all start at 0). For sample \(i\), predict \(\hat y_i = \mathrm{sign}\big(\sum_j \lambda_j y_j\, x^{(j)\top}x^{(i)}\big)\). On a mistake, update \(\lambda_i \leftarrow \lambda_i + 2\eta\). This is the <b>dual perceptron</b>, and it touches the data only through inner products.</p>
<h5>Step 4 — swap in a kernel</h5>
<p>Replace every inner product \(x^{(j)\top}x^{(i)}\) by \(K(x^{(j)}, x^{(i)})\):</p>
\[\hat y_i = \mathrm{sign}\Big(\sum_{j=1}^n \lambda_j\, y_j\, K(x^{(j)}, x^{(i)})\Big)\]
<p>This is <b>exactly</b> the perceptron running on the mapped samples \(\varphi(x)\) (because \(K = \varphi^\top\varphi\)), without ever computing \(\varphi\). (The dual SVM of lecture ML07b, printed on the formula-sheet extension, works the same way: replace \(x^{(i)\top}x^{(j)}\) by \(K(x^{(i)}, x^{(j)})\) and you get the kernel SVM, your HW4 <code>KernelSVM</code>, with \(P_{ij} = y_iy_jK(x^{(i)}, x^{(j)})\).)</p>
<h5>Step 5 — when does it converge?</h5>
<p>The perceptron stops making mistakes after finitely many updates <b>if and only if</b> the data is linearly separable. So the dual perceptron with kernel \(K\) is guaranteed to converge exactly when the <b>mapped</b> data \(\varphi(x^{(i)})\) is linearly separable in the ambient space. To answer "yes", show one separating \(w\) in the ambient space. To answer "no", show a collision or a midpoint in the ambient space (note 1).</p>
<h5>Step 6 — what about the learning rate?</h5>
<p>The 2026-A question says "using a small positive learning rate (e.g. \(\eta = 0.01\))", and the official solution writes: "The Perceptron algorithm is guaranteed to converge (<b>with small enough learning rate</b>) iff the dataset is linearly separable." Write it that way in the exam, so your sentence matches the grader's.</p>
<p class="muted">(A side remark, not needed for the exam: for this perceptron, which starts from \(\lambda = 0\), the size of \(\eta\) actually doesn't change anything. Every update adds the same \(2\eta\), so doubling \(\eta\) doubles every \(\lambda_j\) and every score, and no sign changes. The same mistakes happen in the same order, for any \(\eta \gt 0\). So "small enough" is a harmless extra condition here, not something you need to argue about.)</p>`,
      notation: [
        [R`\(\lambda_j\) ("lambda j")`, R`the dual variable of sample \(j\): \(2\eta\) × how many times sample \(j\) was misclassified. Samples with \(\lambda_j \gt 0\) are the "support".`],
        [R`\(\eta\) ("eta")`, R`learning rate (step size)`],
        [R`\(\sum_j \lambda_j y_j K(x^{(j)}, x^{(i)})\)`, R`the score of sample \(i\) in the dual (kernel) perceptron`],
        [R`converges`, R`reaches a pass through the data with no mistakes`],
      ],
      example: R`<p><b>2026-A Q3.4 — the argument.</b> The quadratic kernel = the perceptron on \(\varphi(x) = (1, \sqrt2x_1, \sqrt2x_2, \sqrt2x_1x_2, x_1^2, x_2^2)\) (note 8). Take the ambient weights \(w = (-3, 0, 0, 0, 1, 1)\):</p>
\[w^\top\varphi(x) = -3\cdot 1 + 0 + 0 + 0 + 1\cdot x_1^2 + 1\cdot x_2^2 = -3 + x_1^2 + x_2^2\]
<p>That is exactly the \(\varphi_C\) separator of note 7, which classifies all five samples correctly. So the mapped data is linearly separable, and the dual perceptron is <b>guaranteed to converge</b>. This is the official answer, and the official solution uses the 9-feature \(\varphi\), which also contains \(1, x_1^2, x_2^2\). (Your HW4 Q4 showed that rescaling features by positive constants, like the \(\sqrt2\)'s, never changes separability.)</p>
<p><b>Watching it run</b> (first pass on 2026-A's five samples, \(\eta = 0.01\), \(\lambda = (0,0,0,0,0)\) at the start). The kernel values needed: sample 1 is \((0,0)\), so \(K(x^{(1)}, v) = (1 + 0)^2 = 1\) for every \(v\). Also \(K(x^{(3)}, x^{(4)}) = (1 + 3\cdot 0 + 0\cdot 3)^2 = 1\) and \(K(x^{(3)}, x^{(5)}) = (1 + 3\cdot(-3) + 0\cdot 0)^2 = (-8)^2 = 64\).</p>
<ul>
<li>Sample 1 (−): score \(= 0\) (all \(\lambda = 0\)), \(\mathrm{sign}(0) = +1 \ne -1\). Mistake: \(\lambda_1 = 0 + 2\cdot 0.01 = 0.02\).</li>
<li>Sample 2 (−): score \(= \lambda_1 y_1 K(x^{(1)}, x^{(2)}) = 0.02\cdot(-1)\cdot 1 = -0.02\), sign −1. Correct.</li>
<li>Sample 3 (+): score \(= 0.02\cdot(-1)\cdot 1 = -0.02\), sign −1 ≠ +1. Mistake: \(\lambda_3 = 0.02\).</li>
<li>Sample 4 (+): score \(= 0.02\cdot(-1)\cdot 1 + 0.02\cdot(+1)\cdot 1 = -0.02 + 0.02 = 0\), \(\mathrm{sign}(0) = +1\). Correct.</li>
<li>Sample 5 (+): score \(= 0.02\cdot(-1)\cdot 1 + 0.02\cdot(+1)\cdot 64 = -0.02 + 1.28 = 1.26\), sign +1. Correct.</li>
</ul>
<p>Continuing (numpy), the 6th pass has no mistakes, with \(\lambda = (0.04, 0.08, 0.02, 0.02, 0)\). It converged, as the argument promised.</p>`,
      cue: R`"Benjamin executed the dual Perceptron algorithm with the quadratic kernel on the dataset above using a small positive learning rate. Is the algorithm guaranteed to converge to a weight vector that classifies all training samples without error? Explain." (2026-A Q3.4).`,
      first: R`Write: "dual perceptron with kernel \(K\) = perceptron on \(\varphi(x)\) where \(\varphi\) affords \(K\); the perceptron converges (with a small enough learning rate) iff the data is linearly separable." Then look for a separating \(w\) in \(\varphi\)-space.`,
      recipe: R`Name \(\varphi\) for the kernel (note 8) → find a \(w\) in that space (often an earlier part already gave one, e.g. a circle \(-r^2 + x_1^2 + x_2^2\)) → "separable ⇒ converges". If nothing can separate in \(\varphi\)-space (a collision), say it is not guaranteed.`,
      trap: R`Answering from the <b>original</b> data ("it isn't linearly separable, so no"). The kernel perceptron works in the <b>mapped</b> space, so separability there is what counts.` },

    { title: "10 · Code parts: cross-validation for C and for the RBF γ",
      idea: R`<p>Both SVM code questions choose a <b>hyperparameter</b>: \(C\) (note 6) or the RBF \(\gamma\) (note 8). Training can't choose it. On the training data, the most flexible setting (huge \(C\), huge \(\gamma\)) always looks best, even when it will fail on new data. So we measure on data the model was <b>not</b> trained on, which is cross-validation, as in Regression note 6:</p>
<ol>
<li>Split the row indices into \(m\) folds: fold \(i\) is rows \(i, i+m, i+2m, \dots\) (<code>np.arange(n)[i::m]</code>).</li>
<li>For each fold: train on all the other rows, then predict the fold's rows.</li>
<li>Score that prediction with a <b>classification</b> measure: accuracy <code>np.mean(pred == y_val)</code> (higher is better) or error rate <code>np.mean(pred != y_val)</code> (lower is better).</li>
<li>Average over the \(m\) folds. That average is the CV score of this hyperparameter value.</li>
<li>Keep the value with the best average.</li>
</ol>
<p><b>Why not score with the hinge objective?</b> \(\tfrac12\|w\|^2 + C\cdot(\dots)\) contains \(C\) itself, so a bigger \(C\) inflates the number automatically, and comparing it across values of \(C\) is meaningless. Validation measures what we actually care about: <b>misclassifications</b>.</p>
<p><b>The completed 2026-A Q3.5 code</b>, line by line:</p>
<pre><code>def select_svm_gamma(X, y, gamma_vals, m):
    n = len(X)                        # number of samples (rows)
    best_gamma = None
    best_score = -1                   # accuracy is in [0, 1], so any real score beats -1
    for gamma in gamma_vals:          # try every candidate gamma
        fold_scores = []
        for i in range(m):                                     # (1) one round per fold
            left_out_indices = np.arange(n)[i::m]              # fold i = the validation rows
            train_indices = [j for j in range(n) if j not in left_out_indices]
            X_train = X[train_indices, :]
            y_train = y[train_indices]
            svm = KernelSVM(gamma=gamma)
            svm.fit(X_train, y_train)                          # train WITHOUT fold i
            pred = svm.predict(X[left_out_indices, :])         # (2) predict the held-out rows
            fold_scores.append(np.mean(pred == y[left_out_indices]))   # accuracy on fold i
        cv_score = np.mean(fold_scores)                        # (3) average over the m folds
        if cv_score > best_score:                              # (4) accuracy: higher is better
            best_score = cv_score
            best_gamma = gamma
    return best_gamma</code></pre>
<p>(On the exam page the <code>cv_score = ___(3)___</code> line is printed with an in-between indentation, so it may look as if it sits inside the fold loop. Either way <code>np.mean(fold_scores)</code> is the right blank: after the last fold it is the average over all \(m\) folds, and that is the value the <code>if</code> compares.)</p>
<p><code>KernelSVM</code> is the class from your HW4: <code>fit</code> solves the dual with \(P_{ij} = y_iy_jK(x^{(i)}, x^{(j)})\), and <code>predict</code> returns ±1.</p>`,
      notation: [
        [R`<code>np.arange(n)[i::m]</code>`, R`indices \(i, i+m, i+2m, \dots\): fold number \(i\)`],
        [R`<code>X[idx, :]</code>`, R`the rows of \(X\) listed in <code>idx</code> (all columns)`],
        [R`<code>np.mean(pred == y_val)</code>`, R`accuracy: the fraction of correct predictions (higher is better)`],
        [R`<code>np.mean(y_val != y_pred)</code>`, R`error rate / misclassification risk (lower is better)`],
        [R`<code>X.shape[0]</code>`, R`number of rows = number of samples \(n\)`],
      ],
      example: R`<p><b>2025-B Q4.3 — find the errors.</b> The exam says: "Find at least three errors, specify their line numbers and erroneous statements… <b>Assume that lines 11–17 do not contain errors.</b>" Here is the printed code.</p>
<p><b>About the line numbers.</b> On the exam page the numbers 1–32 are printed in a separate column next to the code, with a slightly smaller line spacing than the code itself, so they don't line up exactly with the code lines. The numbers below are the ones printed <b>level with</b> each code line. With them, lines 11–17 are exactly the block that splits off the validation fold (<code>left_out_indices</code> … <code>y_val</code>), which is the block the exam tells you to trust.</p>
<pre><code> 1  n = X.shape[1]
 2  X = np.concatenate([np.ones((n,1)), X], axis = 1)
 3  best_C = None
 6  min_cv_risk = np.inf
 7  for C in C_values:
 8      # find cv risk for each fold
 9      lo_risk = []
10      for i in range(n_splits):
12          left_out_indices = np.arange(n)[i::k]
13          X_train = X[[i for i in range(n) if i not in left_out_indices], :]
14          y_train = y[[i for i in range(n) if i not in left_out_indices]]
15          X_val = X[left_out_indices, :]
16          y_val = y[left_out_indices]
19          w, w0 = minimize_hinge_SVM(X_train, y_train, C)
20          z_pred = X_train @ w + w0
21          y_pred = np.sign(z_pred)
22          risk = np.sum(w ** 2)/2 + C * np.mean(np.maximum(1 - z_pred, 0))
23          lo_risk.append(risk)
26      if risk &lt; min_cv_risk:
27          min_cv_risk = np.mean(lo_risk)
28          best_C = C
30  return best_C</code></pre>
<p><b>The official errors and fixes</b> (in the order they appear in the code):</p>
<ul>
<li><b>Line 1:</b> <code>n = X.shape[1]</code> → <code>n = X.shape[0]</code>. The docstring says <code>X</code> is "n_samples X p_features", so the samples are the <b>rows</b>, and <code>shape[0]</code> counts rows.</li>
<li><b>Line 2:</b> delete it. The solver returns its own bias (<code>w, w0 = …</code>) and the <code>z_pred</code> line adds <code>w0</code>, so the SVM needs no ones column. (With the column, the bias would be counted twice, and its weight would wrongly be penalized inside \(\tfrac12\|w\|^2\).)</li>
<li><b>Line 20</b> (<code>z_pred</code>): <code>X_train @ w + w0</code> → <code>X_val @ w + w0</code>. Validation must predict the <b>held-out</b> rows.</li>
<li><b>Line 22</b> (<code>risk</code>): the hinge objective → <code>risk = np.mean(y_val != y_pred)</code>, the misclassification rate on the validation fold (see "why not the hinge objective" above).</li>
<li><b>Line 26</b> (<code>if</code>): <code>if risk &lt; min_cv_risk</code> → <code>if np.mean(lo_risk) &lt; min_cv_risk</code>. The CV risk is the <b>average</b> over all folds, while <code>risk</code> is only the last fold's.</li>
</ul>
<p class="muted">(The official solution calls the last three "line 16", "line 17" and "line 22", which doesn't match the printed column (the solution's author seems to have counted the lines differently). Because the numbering is this confusing, in the exam always write the <b>statement itself</b> next to the line number, as the question asks, so the grader knows which line you mean. Also: <code>k</code> in <code>np.arange(n)[i::k]</code> is never defined (<code>n_splits</code> is meant), but that line is inside the block 11–17 that the exam tells you to treat as correct, so don't spend one of your three answers on it.)</p>`,
      cue: R`"This implementation contains several errors. Find at least three, specify their line numbers and erroneous statements, and propose a fix" (2025-B Q4.3). "Complete the missing parts of the code labeled 1–4" (2026-A Q3.5).`,
      first: R`Read the docstring and the setup lines first: what is \(n\), what does the solver return, what is being maximized or minimized (<code>best_score = -1</code> means a score where higher is better; <code>min_cv_risk = np.inf</code> means a risk where lower is better).`,
      recipe: R`Check this list in order: rows vs columns (<code>shape[0]</code>) → the bias handled once → train on the train rows, predict the <b>validation</b> rows → score = accuracy / misclassification (not the training objective) → average over folds (<code>np.mean</code>) → compare the average in the right direction.`,
      trap: R`The comparison direction. For an accuracy with <code>best_score = -1</code> you need <code>&gt;</code>. For a risk with <code>min_cv_risk = np.inf</code> you need <code>&lt;</code>. In Moed B (Q3.4, blank 4) you compared the wrong quantity in the stopping test. Here too, first decide <i>what</i> is being compared, then the direction.` },
  ],
    hints: {
      "2025C-q3": {
        1: R`Compute \(x_1 + x_2\) for each of the four samples and look at the signs. If a pattern appears, propose the line where that sum is 0 and check \(y_i f(x^{(i)}) \gt 0\) for every sample (notes 0–1).`,
        2: R`List the distance of every positive–negative pair and take the closest pair. Your candidate is the line exactly between them (perpendicular to the segment, through its midpoint); then check every sample's distance \(|f(x)|/\|w\|\) to it (notes 2–3).`,
        3: R`Write "\(J(w) \ge 0\) for every \(w\)", then look for a \(w\) whose score equals the label (+1 or −1) on every sample. Start from part 2's line and rescale it so the closest samples get score exactly ±1 (note 5).`,
        4: R`Max-margin: put the old line in canonical form (closest samples have \(y f = 1\)) and compute \(y f\) for the new sample. LMS: compute the new sample's residual (score − label) with the old \(w\) (notes 4–5). Careful: the official solution's \(w = (\varepsilon, \tfrac14, \tfrac14)\) should be \((-\varepsilon, \tfrac14, \tfrac14)\); with \(+\varepsilon\) the loss goes up.`,
        5: R`Sketch the five points: the two negatives sit together, so enclose them in a circle and expand \((x_1 - a)^2 + (x_2 - b)^2 - r^2\) (note 7). Measure the centre-to-sample distances before picking \(r\): the official \(r = 0.6\) is too small (the negatives are \(\sqrt{0.5} \approx 0.707\) away), so use e.g. \(r = 1\), which gives \(w = (7.5, 5, 3, 1, 1)\). (The premise "not linearly separable" is actually false, see note 1, but answer as asked.)`,
      },
      "2025B-q4": {
        1: R`(a–b) The max-margin line lies exactly midway between the parallel lines \(x_1 - x_2 = 1\) and \(x_1 - x_2 = -1\); compute \(y f\) for a sample on each, then the margin \(1/\|w\|\), a distance, not the score 1 (note 3). (c) Compute \(y f\) for \((2, 0)\) and compare it with 1 (note 4). The official (c) says the margin "cannot shrink"; the argument needs "cannot <b>grow</b>".`,
        2: R`First find the plot with no training errors: it gets the largest \(C\). Of the other two, the line farther from the nearest samples (the wider margin) gets the smallest \(C\) (note 6).`,
        3: R`Read the docstring and setup lines, then go line by line asking "what should this be?": what does \(n\) count (rows or columns?), does the SVM need a ones column if the solver returns <code>w0</code>, which rows are predicted, what should the risk measure, and is the comparison made on the average over folds (note 10)? Skip lines 11–17: the exam says they are correct.`,
      },
      "2026A-q3": {
        1: R`Compute \(u^\top v = u_1v_1 + u_2v_2\) first, then add 1 and square (note 8).`,
        2: R`Expand \((1 + u_1v_1 + u_2v_2)^2\) completely, then write every term as (something of \(u\)) × (the same something of \(v\)), splitting each 2 as \(\sqrt2\cdot\sqrt2\) (note 8).`,
        3: R`Make a table of all five mapped points under each \(\varphi\). For each one, look for two samples with different labels on the same point, or a negative exactly at the midpoint of two positives; if neither happens, look for a rule like \(-c + z_1 + z_2\) and check every sample (notes 1, 7).`,
        4: R`Write: "dual perceptron with kernel \(K\) = perceptron on \(\varphi(x)\), where \(\varphi\) affords \(K\) (part 2); the perceptron converges (with a small enough learning rate) iff the data is linearly separable." Then look back at part 3 for a separator whose features are all inside part 2's \(\varphi\) (note 9).`,
        5: R`Read the setup first: <code>best_score = -1</code> and <code>np.mean(pred == …)</code> mean the score is accuracy, so higher is better. Then ask, blank by blank: what does the inner loop run over, which rows must the model predict, and how do the fold scores become one number (note 10)?`,
      },
    },
  };
})();
