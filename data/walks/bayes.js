// Walkthroughs for the Bayesian-learning questions — CASUAL style (spec/WALKS.md):
// the point first, then "Begin your answer like this" + the full exam answer, then the steps that build it.
// Numbers verified with python3 (fractions + numpy); official slips flagged per part.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ═══════════════════════════════ 2025-A Q5 — the 20 flowers (naive Bayes by counting)

    "2025A-q5.1": {
      point: R`Every probability here is a count ÷ a total. Priors: ÷ all 20 flowers. "\(\mid y = \mathrm{A}\)" means look only at A's rows, so ÷ 8 (for B: ÷ 12).`,
      start: R`\[\pi_\mathrm{A} = \frac{\square}{20} = \square \qquad \pi_\mathrm{B} = \frac{\square}{20} = \square\]
<div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\)</th><th>\(y = \mathrm{B}\)</th></tr></thead><tbody>
<tr><td>\(p(x_1 = \mathrm{p} \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_1 = \mathrm{r} \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_2 = 3 \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_2 = 4 \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_2 = 5 \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr></tbody></table></div>`,
      answer: R`\[\pi_\mathrm{A} = \frac{8}{20} = 0.4 \qquad \pi_\mathrm{B} = \frac{12}{20} = 0.6\]
<div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\)</th><th>\(y = \mathrm{B}\)</th></tr></thead><tbody>
<tr><td>\(p(x_1 = \mathrm{p} \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{8}{12} \approx 0.667\)</td></tr>
<tr><td>\(p(x_1 = \mathrm{r} \mid y)\)</td><td>\(\dfrac68 = 0.75\)</td><td>\(\dfrac{4}{12} \approx 0.333\)</td></tr>
<tr><td>\(p(x_2 = 3 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{6}{12} = 0.5\)</td></tr>
<tr><td>\(p(x_2 = 4 \mid y)\)</td><td>\(\dfrac48 = 0.5\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr>
<tr><td>\(p(x_2 = 5 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr></tbody></table></div>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The naive Bayes numbers: 2 priors, and inside each class one fraction per colour and per petal count. Every one of them = a count ÷ a total.`,
          remember: R`\[\hat P = \frac{\text{count}}{\text{total}}\]<p>The MLE of a probability. Prior: class count ÷ all samples. \(p(x_t = a \mid y = j)\): count inside class \(j\)'s rows ÷ class \(j\)'s size. Not on the sheet in this form: [sheet: Class prior] only says \(\pi_j = P(Y = j)\); closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates].</p>` },
        { line: R`<b>Priors</b> — A = samples 1–8, B = samples 9–20: <div class="formula">\[\pi_\mathrm{A} = \frac{8}{20} = 0.4 \qquad \pi_\mathrm{B} = \frac{12}{20} = 0.6\]</div>`,
          why: R`<p>[sheet: Class prior] says \(\pi_j = P(Y = j)\), the fraction of all flowers that are class \(j\).</p>` },
        { line: R`<b>Colour and petals, per class</b> — count inside A's 8 rows and B's 12 rows only: <div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\;(\div 8)\)</th><th>\(y = \mathrm{B}\;(\div 12)\)</th></tr></thead><tbody>
<tr><td>\(p(x_1 = \mathrm{p} \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{8}{12} \approx 0.667\)</td></tr>
<tr><td>\(p(x_1 = \mathrm{r} \mid y)\)</td><td>\(\dfrac68 = 0.75\)</td><td>\(\dfrac{4}{12} \approx 0.333\)</td></tr>
<tr><td>\(p(x_2 = 3 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{6}{12} = 0.5\)</td></tr>
<tr><td>\(p(x_2 = 4 \mid y)\)</td><td>\(\dfrac48 = 0.5\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr>
<tr><td>\(p(x_2 = 5 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr></tbody></table></div>Done.`,
          why: R`<p>A: purple = samples 1, 2; red = 3–8. 3 petals = 1, 3; 4 petals = 4–7; 5 petals = 2, 8.<br>B: purple = 9–16; red = 17–20. 3 petals = 9–13 and 17; 4 petals = 14–16; 5 petals = 18–20.</p>
<p>"Unordered / multinomial" only means each petal number is its own category: just count it. Check: inside one class, each feature adds to 1 (\(0.25 + 0.75 = 1\)).</p>` },
      ],
      compare: R`Step 2 is the official first line, step 3 the other ten numbers. Same values.`,
    },

    "2025A-q5.2": {
      point: R`Joint = prior × part 1's two numbers (naive = just multiply them). Posterior = joint ÷ the sum of the joints. MAP = the class with the bigger posterior.`,
      start: R`<p><b>Sample 21, \(x = (\mathrm{p}, 5)\):</b></p>
\[\begin{aligned}\text{joint A} &= \pi_\mathrm{A}\,p(x_1 = \mathrm{p} \mid \mathrm{A})\,p(x_2 = 5 \mid \mathrm{A})\\ &= \square\\ \text{joint B} &= \pi_\mathrm{B}\,p(x_1 = \mathrm{p} \mid \mathrm{B})\,p(x_2 = 5 \mid \mathrm{B})\\ &= \square\\ p(x) &= \square + \square = \square\\ p(\mathrm{A} \mid x) &= \tfrac{\square}{\square} = \square\\ p(\mathrm{B} \mid x) &= \tfrac{\square}{\square} = \square\end{aligned}\]
<p>MAP \(= \square\)</p>
<p><b>Sample 22, \(x = (\mathrm{r}, 3)\):</b></p>
\[\begin{aligned}\text{joint A} &= \pi_\mathrm{A}\,p(x_1 = \mathrm{r} \mid \mathrm{A})\,p(x_2 = 3 \mid \mathrm{A})\\ &= \square\\ \text{joint B} &= \pi_\mathrm{B}\,p(x_1 = \mathrm{r} \mid \mathrm{B})\,p(x_2 = 3 \mid \mathrm{B})\\ &= \square\\ p(x) &= \square + \square = \square\\ p(\mathrm{A} \mid x) &= \tfrac{\square}{\square} = \square\\ p(\mathrm{B} \mid x) &= \tfrac{\square}{\square} = \square\end{aligned}\]
<p>MAP \(= \square\)</p>`,
      answer: R`<p><b>Sample 21, \(x = (\mathrm{p}, 5)\):</b></p>
\[\begin{aligned}\text{joint A} &= \pi_\mathrm{A}\,p(x_1 = \mathrm{p} \mid \mathrm{A})\,p(x_2 = 5 \mid \mathrm{A})\\ &= 0.4 \times 0.25 \times 0.25 = 0.025\\ \text{joint B} &= \pi_\mathrm{B}\,p(x_1 = \mathrm{p} \mid \mathrm{B})\,p(x_2 = 5 \mid \mathrm{B})\\ &= 0.6 \times \tfrac23 \times 0.25 = 0.1\\ p(x) &= 0.025 + 0.1 = 0.125\\ p(\mathrm{A} \mid x) &= \tfrac{0.025}{0.125} = 0.2\\ p(\mathrm{B} \mid x) &= \tfrac{0.1}{0.125} = 0.8\end{aligned}\]
<p>MAP \(= \mathrm{B}\)</p>
<p><b>Sample 22, \(x = (\mathrm{r}, 3)\):</b></p>
\[\begin{aligned}\text{joint A} &= \pi_\mathrm{A}\,p(x_1 = \mathrm{r} \mid \mathrm{A})\,p(x_2 = 3 \mid \mathrm{A})\\ &= 0.4 \times 0.75 \times 0.25 = 0.075\\ \text{joint B} &= \pi_\mathrm{B}\,p(x_1 = \mathrm{r} \mid \mathrm{B})\,p(x_2 = 3 \mid \mathrm{B})\\ &= 0.6 \times \tfrac13 \times 0.5 = 0.1\\ p(x) &= 0.075 + 0.1 = 0.175\\ p(\mathrm{A} \mid x) &= \tfrac{0.075}{0.175} = \tfrac37 \approx 0.429\\ p(\mathrm{B} \mid x) &= \tfrac{0.1}{0.175} = \tfrac47 \approx 0.571\end{aligned}\]
<p>MAP \(= \mathrm{B}\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Each class's posterior \(p(y \mid x)\), then MAP = the bigger one. Bayes' rule: posterior = joint ÷ sum of the joints; joint = prior × part 1's two fractions.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>Bayes' rule: posterior = joint (prior × likelihood) ÷ the sum of the joints. Naive = features independent inside a class, so multiply. MAP = the class with the biggest posterior. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          why: R`<p><b>Joint</b> = the fraction of flowers that are A <b>and</b> look like \(x\) = (fraction that is A) × (fraction of the A's that look like \(x\)) = \(\pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\).</p>
<p><b>Naive</b> = inside one class the features are treated as independent, so \(p(x \mid y = \mathrm{A}) = p(x_1 \mid \mathrm{A})\cdot p(x_2 \mid \mathrm{A})\): part 1's two numbers multiplied. [sheet: Class conditional probability (Likelihood)]</p>
<p><b>Divide by the sum:</b> every flower that looks like \(x\) is A or B, so \(p(x)\) = joint A + joint B.</p>` },
        { line: R`<b>Sample 21, \(x = (\mathrm{p}, 5)\)</b> — joint = prior × \(p(\mathrm{purple} \mid \text{class})\) × \(p(5 \mid \text{class})\); posterior = joint ÷ their sum \(p(x) = 0.025 + 0.1 = 0.125\): <div class="tw"><table><thead><tr><th>class</th><th>joint</th><th>posterior</th></tr></thead><tbody>
<tr><td>A</td><td>\(0.4 \times 0.25 \times 0.25 = 0.025\)</td><td>\(\dfrac{0.025}{0.125} = 0.2\)</td></tr>
<tr><td>B</td><td>\(0.6 \times \dfrac23 \times 0.25 = 0.1\)</td><td>\(\dfrac{0.1}{0.125} = 0.8\)</td></tr></tbody></table></div>MAP: <b>B</b>.` },
        { line: R`<b>Sample 22, \(x = (\mathrm{r}, 3)\)</b> — joint = prior × \(p(\mathrm{red} \mid \text{class})\) × \(p(3 \mid \text{class})\); posterior = joint ÷ their sum \(p(x) = 0.075 + 0.1 = 0.175\): <div class="tw"><table><thead><tr><th>class</th><th>joint</th><th>posterior</th></tr></thead><tbody>
<tr><td>A</td><td>\(0.4 \times 0.75 \times 0.25 = 0.075\)</td><td>\(\dfrac{0.075}{0.175} = \dfrac37 \approx 0.429\)</td></tr>
<tr><td>B</td><td>\(0.6 \times \dfrac13 \times 0.5 = 0.1\)</td><td>\(\dfrac{0.1}{0.175} = \dfrac47 \approx 0.571\)</td></tr></tbody></table></div>MAP: <b>B</b>. Done.`,
          why: R`<p>Posteriors add to 1 (\(\tfrac37 + \tfrac47 = 1\)); joints don't. Report the posteriors, not the joints.</p>` },
      ],
      compare: R`Steps 2–3 are the official lines with the same numbers: both samples → B.`,
    },

    "2025A-q5.3": {
      point: R`Both samples came out B, so build a flower that looks "very A": in part 1, pick the colour and the petal count where A's number beats B's most — red (0.75 vs 0.333) and 4 petals (0.5 vs 0.25). Then show A's posterior is bigger.`,
      start: R`<p><b>Take</b> \(x = (\square, \square)\):</p>
\[\begin{aligned}\text{joint A} &= \pi_\mathrm{A}\,p(x_1 = \square \mid \mathrm{A})\,p(x_2 = \square \mid \mathrm{A})\\ &= \square\\ \text{joint B} &= \pi_\mathrm{B}\,p(x_1 = \square \mid \mathrm{B})\,p(x_2 = \square \mid \mathrm{B})\\ &= \square\\ p(x) &= \square + \square = \square\\ p(\mathrm{A} \mid x) &= \tfrac{\square}{\square} = \square\\ p(\mathrm{B} \mid x) &= \tfrac{\square}{\square} = \square\end{aligned}\]
<p>MAP \(= \square\)</p>`,
      answer: R`<p><b>Take</b> \(x = (\mathrm{r}, 4)\):</p>
\[\begin{aligned}\text{joint A} &= \pi_\mathrm{A}\,p(x_1 = \mathrm{r} \mid \mathrm{A})\,p(x_2 = 4 \mid \mathrm{A})\\ &= 0.4 \times 0.75 \times 0.5 = 0.15\\ \text{joint B} &= \pi_\mathrm{B}\,p(x_1 = \mathrm{r} \mid \mathrm{B})\,p(x_2 = 4 \mid \mathrm{B})\\ &= 0.6 \times \tfrac13 \times 0.25 = 0.05\\ p(x) &= 0.15 + 0.05 = 0.2\\ p(\mathrm{A} \mid x) &= \tfrac{0.15}{0.2} = 0.75\\ p(\mathrm{B} \mid x) &= \tfrac{0.05}{0.2} = 0.25\end{aligned}\]
<p>MAP \(= \mathrm{A}\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> A flower with joint A \(\gt\) joint B. Joint = prior × colour fraction × petal fraction, and A's prior is smaller (0.4 vs 0.6). So pick the fractions where A beats B.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>Bayes' rule: posterior = joint (prior × likelihood) ÷ the sum of the joints. Naive = features independent inside a class, so multiply. MAP = the class with the biggest posterior. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>Read part 1's table</b> — colour: red (A 0.75 vs B 0.333; purple goes the other way). Petals: 4 (A 0.5 vs B 0.25; 3 favours B, 5 is a tie). So \(x = (\mathrm{r}, 4)\).` },
        { line: R`<b>Joints</b> — prior × \(p(\mathrm{red} \mid \text{class})\) × \(p(4 \mid \text{class})\), part 1's numbers: <div class="formula">\[\begin{aligned}\text{A: }\ 0.4 \times 0.75 \times 0.5 &= 0.15\\ \text{B: }\ 0.6 \times \dfrac13 \times 0.25 &= 0.05\end{aligned}\]</div>` },
        { line: R`<b>Posteriors</b> — each joint ÷ their sum \(p(x) = 0.15 + 0.05 = 0.2\): <div class="formula">\[\begin{aligned}p(\mathrm{A} \mid x) &= \dfrac{0.15}{0.2} = 0.75\\ p(\mathrm{B} \mid x) &= \dfrac{0.05}{0.2} = 0.25\end{aligned}\]</div>MAP: <b>A</b>. Done.`,
          why: R`<p>(r, 5) works too: joints 0.075 vs 0.05, so A with posterior 0.6. You need only one.</p>` },
      ],
      compare: R`Same flower (r, 4) and the same numbers as the official solution (steps 3–4).`,
    },

    "2025A-q5.4": {
      point: R`Only the prior changes; part 1's likelihoods stay. A sample stays B while \(\pi_\mathrm{A}\) × (A's likelihood) \(\lt\) \((1 - \pi_\mathrm{A})\) × (B's likelihood). Solve that for each sample; both must stay B, so the smaller bound is the answer.`,
      start: R`<p><b>Likelihoods</b> (part 1's two fractions multiplied):</p>
\[\begin{aligned}\text{21: }\ p(x \mid \mathrm{A}) &= \square\\ p(x \mid \mathrm{B}) &= \square\\ \text{22: }\ p(x \mid \mathrm{A}) &= \square\\ p(x \mid \mathrm{B}) &= \square\end{aligned}\]
<p><b>Sample 21 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\square &\lt (1 - \pi_\mathrm{A})\cdot\square\\ \iff \square\,\pi_\mathrm{A} &\lt \square - \square\,\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \square\end{aligned}\]
<p><b>Sample 22 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\square &\lt (1 - \pi_\mathrm{A})\cdot\square\\ \iff \square\,\pi_\mathrm{A} &\lt \square - \square\,\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \square\end{aligned}\]
<p><b>Both hold</b> (a smaller \(\pi_\mathrm{A}\) only helps B):</p>
\[\begin{aligned}\pi_\mathrm{A} &\in [0, \square)\\ \pi_\mathrm{B} &\in (\square, 1]\end{aligned}\]`,
      answer: R`<p><b>Likelihoods</b> (part 1's two fractions multiplied):</p>
\[\begin{aligned}\text{21: }\ p(x \mid \mathrm{A}) &= 0.25 \cdot 0.25 = \tfrac{1}{16}\\ p(x \mid \mathrm{B}) &= \tfrac23 \cdot 0.25 = \tfrac16\\ \text{22: }\ p(x \mid \mathrm{A}) &= 0.75 \cdot 0.25 = \tfrac{3}{16}\\ p(x \mid \mathrm{B}) &= \tfrac13 \cdot 0.5 = \tfrac16\end{aligned}\]
<p><b>Sample 21 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\tfrac{1}{16} &\lt (1 - \pi_\mathrm{A})\cdot\tfrac16\\ \iff 3\pi_\mathrm{A} &\lt 8 - 8\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \tfrac{8}{11} \approx 0.727\end{aligned}\]
<p><b>Sample 22 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\tfrac{3}{16} &\lt (1 - \pi_\mathrm{A})\cdot\tfrac16\\ \iff 9\pi_\mathrm{A} &\lt 8 - 8\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \tfrac{8}{17} \approx 0.471\end{aligned}\]
<p><b>Both hold</b> (a smaller \(\pi_\mathrm{A}\) only helps B):</p>
\[\begin{aligned}\pi_\mathrm{A} &\in \big[0, \tfrac{8}{17}\big) \approx [0, 0.471)\\ \pi_\mathrm{B} &\in \big(\tfrac{9}{17}, 1\big] \approx (0.529, 1]\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> All priors where both samples stay B. Only the prior moves. So per sample write "joint A \(\lt\) joint B" with \(\pi_\mathrm{A}\) a letter, \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\), and solve.`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ \pi_y\,p(x \mid y)\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>MAP = biggest posterior = biggest joint: the posterior is joint ÷ \(p(x)\) (Bayes' rule), and \(p(x)\) is the same for every class. Naive = features independent inside a class, so multiply. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>Likelihoods (no prior)</b> — part 1's two numbers multiplied: <div class="tw"><table><thead><tr><th>sample</th><th>likelihood of A</th><th>likelihood of B</th></tr></thead><tbody>
<tr><td>21 (p, 5)</td><td>\(0.25 \times 0.25 = \dfrac{1}{16}\)</td><td>\(\dfrac23 \times 0.25 = \dfrac16\)</td></tr>
<tr><td>22 (r, 3)</td><td>\(0.75 \times 0.25 = \dfrac{3}{16}\)</td><td>\(\dfrac13 \times 0.5 = \dfrac16\)</td></tr></tbody></table></div>`,
          why: R`<p>The prior is the thing we change, so leave it out. Part 2's posteriors already contain the old \(\pi_\mathrm{A} = 0.4\), so don't use them here.</p>` },
        { line: R`<b>Sample 21 stays B while</b> joint A \(\lt\) joint B: <div class="formula">\[\begin{aligned}\pi_\mathrm{A}\cdot\dfrac{1}{16} &\lt (1 - \pi_\mathrm{A})\cdot\dfrac16 &&(\times 48)\\ 3\pi_\mathrm{A} &\lt 8 - 8\pi_\mathrm{A}\\ \pi_\mathrm{A} &\lt \dfrac{8}{11} \approx 0.727\end{aligned}\]</div>`,
          why: R`<p>× 48 because 48 = 3 · 16 = 8 · 6 clears both fractions. Then add \(8\pi_\mathrm{A}\) to both sides (\(11\pi_\mathrm{A} \lt 8\)) and divide by 11.</p>` },
        { line: R`<b>Sample 22 stays B while</b> — same steps: <div class="formula">\[\begin{aligned}\pi_\mathrm{A}\cdot\dfrac{3}{16} &\lt (1 - \pi_\mathrm{A})\cdot\dfrac16 &&(\times 48)\\ 9\pi_\mathrm{A} &\lt 8 - 8\pi_\mathrm{A}\\ \pi_\mathrm{A} &\lt \dfrac{8}{17} \approx 0.471\end{aligned}\]</div>` },
        { line: R`<b>Both must hold</b> — keep the smaller bound; a smaller \(\pi_\mathrm{A}\) only helps B: <div class="formula">\[\begin{aligned}\pi_\mathrm{A} &\in \big[0, \dfrac{8}{17}\big) \approx [0, 0.471)\\ \pi_\mathrm{B} = 1 - \pi_\mathrm{A} &\in \big(\dfrac{9}{17}, 1\big] \approx (0.529, 1]\end{aligned}\]</div>Done.`,
          why: R`<p>Sample 22 was the close one (0.571 : 0.429), so it flips first. At \(\pi_\mathrm{A} = \tfrac{8}{17}\) both joints are \(\tfrac{3}{34}\): a tie.</p>` },
      ],
      compare: R`Step 5 is the official answer. It gets \(\tfrac{8}{17}\) straight from sample 22 with the ratio \(\pi_\mathrm{A} : \pi_\mathrm{B} = \tfrac16 : \tfrac{3}{16} = 8 : 9\) — the tie point of step 4.`,
    },

    "2025A-q5.5": {
      point: R`A prediction costs something only when the truth is the other class: saying A costs \(\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x)\), saying B costs \(\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x)\). Pick the cheaper one — it can differ from MAP.`,
      start: R`<p><b>Sample 21</b> (posteriors from part 2):</p>
\[\begin{aligned}\text{say A:}\quad &\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x) = \square\\ \text{say B:}\quad &\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x) = \square\end{aligned}\]
<p>Cheaper → \(\square\)</p>
<p><b>Sample 22</b> (posteriors from part 2):</p>
\[\begin{aligned}\text{say A:}\quad &\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x) = \square\\ \text{say B:}\quad &\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x) = \square\end{aligned}\]
<p>Cheaper → \(\square\)</p>`,
      answer: R`<p><b>Sample 21</b> (posteriors from part 2):</p>
\[\begin{aligned}\text{say A:}\quad &\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x) = 1 \times 0.8 = 0.8\\ \text{say B:}\quad &\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x) = 2 \times 0.2 = 0.4\end{aligned}\]
<p>Cheaper → <b>B</b> (same as MAP)</p>
<p><b>Sample 22</b> (posteriors from part 2):</p>
\[\begin{aligned}\text{say A:}\quad &\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x) = 1 \times \tfrac47 \approx 0.571\\ \text{say B:}\quad &\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x) = 2 \times \tfrac37 \approx 0.857\end{aligned}\]
<p>Cheaper → <b>A</b> (MAP said B)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> For each sample, the prediction with the smaller expected cost. Saying A is only wrong when the truth is B, so it costs \(\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x)\); saying B costs \(\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x)\). Posteriors: part 2.`,
          remember: R`\[\text{risk of saying } y = \sum_{y'}\lambda_{y,y'}\,p(y' \mid x)\ \to\ \text{predict the smallest}\]<p>[sheet: Expected risk of predicting class label y] has it with joints \(\pi_{y'}P(X = x \mid Y = y')\) instead of posteriors. Every one ÷ the same \(p(x)\), so the same winner.</p>`,
          why: R`<p>[sheet: Expected risk of predicting class label y] is \(\sum_{y'} \pi_{y'} P(X = x \mid Y = y')\,\lambda_{y,y'}\), one term per possible truth \(y'\). Being right costs 0, so only the other class's term is left.</p>
<p>The sheet uses joints (\(\pi \cdot P(x \mid y')\)); posteriors are those joints ÷ \(p(x)\), the same number for both predictions. So the winner is the same.</p>` },
        { line: R`<b>Read the costs</b> — first letter = what we say, second = the truth: \(\lambda_\mathrm{BA} = 2\) (an A flower called B), \(\lambda_\mathrm{AB} = 1\) (a B flower called A).` },
        { line: R`<b>Sample 21</b> — posteriors 0.2 (A), 0.8 (B) from part 2: <div class="formula">\[\begin{aligned}\text{say A: }& 1 \times 0.8 = 0.8\\ \text{say B: }& 2 \times 0.2 = 0.4\end{aligned}\]</div>Cheaper: <b>B</b> (same as MAP).` },
        { line: R`<b>Sample 22</b> — posteriors \(\tfrac37\) (A), \(\tfrac47\) (B): <div class="formula">\[\begin{aligned}\text{say A: }& 1 \times \dfrac47 \approx 0.571\\ \text{say B: }& 2 \times \dfrac37 = \dfrac67 \approx 0.857\end{aligned}\]</div>Cheaper: <b>A</b>, although MAP said B. Done.`,
          why: R`<p>It's almost 50/50, and calling an A flower "B" costs double, so A is the safe answer.</p>`,
          extra: [{ label: "the official solution says 4/7 ≈ 0.429 — it's a slip", html: R`<p>\(\tfrac47 \approx 0.571\); 0.429 is \(\tfrac37\). The comparison still gives A: \(0.571 \lt 0.857\).</p>` }] },
      ],
      compare: R`Steps 3–4 are the official lines. Its slip: "\(\tfrac47 \approx 0.429\)" should be \(\approx 0.571\); the answer (A for sample 22) is unchanged.`,
      slip: R`Arithmetic slip: \(\tfrac47 \approx 0.571\), not 0.429 (that's \(\tfrac37\)). A still wins for sample 22, since \(0.571 \lt 0.857\).`,
    },

    // ═══════════════════════════════ 2025-C Q4 — the fish (full vs naive Bayes, ML, cost matrix)

    "2025C-q4.1": {
      point: R`The last column counts fish. So a species' prior = its number of fish ÷ 100: add its 4 counts, don't count table rows.`,
      start: R`<p><b>Prior</b> = \(\square\) ÷ \(\square\):</p>
\[\begin{aligned}\pi_\mathrm{A} &= \frac{\square + \square + \square + \square}{100} = \square\\ \pi_\mathrm{B} &= \frac{\square + \square + \square + \square}{100} = \square\\ \pi_\mathrm{C} &= \frac{\square + \square + \square + \square}{100} = \square\end{aligned}\]`,
      answer: R`<p><b>Prior</b> = number of fish of that species ÷ all 100 fish:</p>
\[\begin{aligned}\pi_\mathrm{A} &= \frac{32 + 16 + 8 + 4}{100} = 0.6\\ \pi_\mathrm{B} &= \frac{5 + 15 + 1 + 3}{100} = 0.24\\ \pi_\mathrm{C} &= \frac{3 + 9 + 3 + 1}{100} = 0.16\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(\pi_j\) = the fraction of all fish that are species \(j\) (count ÷ total). Trap: each table row is a <i>group</i> of fish; the last column says how many.`,
          remember: R`\[\hat\pi_j = \frac{n_j}{n} = \frac{\text{samples in class } j}{\text{all samples}}\]<p>The MLE of a prior = count ÷ total. [sheet: Class prior] only says \(\pi_j = P(Y = j)\); closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates]. Here a sample is a fish, so add the counts, not the rows.</p>` },
        { line: R`<b>Fish per species</b> — add the 4 counts of each: <div class="formula">\[\begin{aligned}\mathrm{A}&: 32 + 16 + 8 + 4 = 60\\ \mathrm{B}&: 5 + 15 + 1 + 3 = 24\\ \mathrm{C}&: 3 + 9 + 3 + 1 = 16\end{aligned}\]</div>` },
        { line: R`<b>Divide by 100</b>: <div class="formula">\[\pi_\mathrm{A} = 0.6 \qquad \pi_\mathrm{B} = 0.24 \qquad \pi_\mathrm{C} = 0.16\]</div>Done.`,
          why: R`<p>[sheet: Class prior]: \(\pi_j = P(Y = j)\), the fraction of all 100 fish that are species \(j\). Check: \(0.6 + 0.24 + 0.16 = 1\).</p>` },
      ],
      compare: R`Same as the official answer (steps 2–3). (Its line "Joint probability with class y = A" is a leftover heading; ignore it.)`,
      slip: R`Ignore the line "Joint probability with class y = A". It's a leftover heading; the three lines are just the priors.`,
    },

    "2025C-q4.2": {
      point: R`Full Bayes = read the exact (yes, no) row: among species \(j\)'s fish, the fraction with upper = yes and lower = no. Then prior × that = joint, and each joint ÷ the sum of the joints.`,
      start: R`<p>\(x = (\text{yes}, \text{no})\). Joint = \(\pi_j \cdot p(x \mid j)\); posterior = joint ÷ \(p(x)\).</p>
<div class="tw"><table><thead><tr><th>\(j\)</th><th>\(p(x \mid j)\)</th><th>joint \(\pi_j\cdot p(x \mid j)\)</th></tr></thead><tbody>
<tr><td>A</td><td>\(\dfrac{\square}{60}\)</td><td>\(0.6 \cdot \square = \square\)</td></tr>
<tr><td>B</td><td>\(\dfrac{\square}{24}\)</td><td>\(0.24 \cdot \square = \square\)</td></tr>
<tr><td>C</td><td>\(\dfrac{\square}{16}\)</td><td>\(0.16 \cdot \square = \square\)</td></tr></tbody></table></div>
\[p(x) = \square + \square + \square = \square\]
\[\begin{aligned}p(\mathrm{A} \mid x) &= \tfrac{\square}{\square} = \square\\ p(\mathrm{B} \mid x) &= \tfrac{\square}{\square} = \square\\ p(\mathrm{C} \mid x) &= \tfrac{\square}{\square} = \square\end{aligned}\]`,
      answer: R`<p>\(x = (\text{yes}, \text{no})\). Joint = \(\pi_j \cdot p(x \mid j)\); posterior = joint ÷ \(p(x)\).</p>
<div class="tw"><table><thead><tr><th>\(j\)</th><th>\(p(x \mid j)\)</th><th>joint \(\pi_j\cdot p(x \mid j)\)</th></tr></thead><tbody>
<tr><td>A</td><td>\(\dfrac{16}{60}\)</td><td>\(0.6 \cdot \dfrac{16}{60} = 0.16\)</td></tr>
<tr><td>B</td><td>\(\dfrac{15}{24}\)</td><td>\(0.24 \cdot \dfrac{15}{24} = 0.15\)</td></tr>
<tr><td>C</td><td>\(\dfrac{9}{16}\)</td><td>\(0.16 \cdot \dfrac{9}{16} = 0.09\)</td></tr></tbody></table></div>
\[p(x) = 0.16 + 0.15 + 0.09 = 0.4\]
\[\begin{aligned}p(\mathrm{A} \mid x) &= \tfrac{0.16}{0.4} = 0.4\\ p(\mathrm{B} \mid x) &= \tfrac{0.15}{0.4} = 0.375\\ p(\mathrm{C} \mid x) &= \tfrac{0.09}{0.4} = 0.225\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(p(y = j \mid x)\) for each species. Bayes' rule: posterior = joint ÷ the sum of the joints, joint = prior × \(p(x \mid j)\). Priors are part 1's, so the missing piece is \(p(x \mid j)\).`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]<p>Bayes' rule: posterior = joint ÷ the sum of the joints. Full Bayes gets \(p(x \mid y)\) by counting the whole \(x\): count ÷ class total (the MLE). Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>\(p(x \mid j)\), full Bayes</b> — full = the whole \(x\) at once: the (yes, no) row's count ÷ that species' fish from part 1: <div class="formula">\[\mathrm{A}: \dfrac{16}{60} \qquad \mathrm{B}: \dfrac{15}{24} \qquad \mathrm{C}: \dfrac{9}{16}\]</div>` },
        { line: R`<b>Joints</b> — prior × that: <div class="formula">\[\begin{aligned}\mathrm{A}&: \dfrac{60}{100}\cdot\dfrac{16}{60} = 0.16\\ \mathrm{B}&: \dfrac{24}{100}\cdot\dfrac{15}{24} = 0.15\\ \mathrm{C}&: \dfrac{16}{100}\cdot\dfrac{9}{16} = 0.09\end{aligned}\]</div>`,
          why: R`<p>The species total cancels, so each joint is just (fish of that species with these fins) ÷ 100.</p>` },
        { line: R`<b>Divide by the sum</b> \(p(x) = 0.16 + 0.15 + 0.09 = 0.4\): <div class="formula">\[\begin{aligned}\mathrm{A}&: \dfrac{0.16}{0.4} = 0.4\\ \mathrm{B}&: \dfrac{0.15}{0.4} = 0.375\\ \mathrm{C}&: \dfrac{0.09}{0.4} = 0.225\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official solution prints 0.9/0.4 — a typo", html: R`<p>It's \(\tfrac{0.09}{0.4} = 0.225\). The result 0.225 is right; only the numerator is mistyped.</p>` }] },
      ],
      compare: R`Steps 2–4 are the official lines. Its last line prints \(\tfrac{0.9}{0.4}\); it should be \(\tfrac{0.09}{0.4} = 0.225\).`,
      slip: R`Typo in the last line: it's \(\tfrac{0.09}{0.4} = 0.225\), not \(\tfrac{0.9}{0.4}\). The 0.225 is right.`,
    },

    "2025C-q4.3": {
      point: R`Naive Bayes = one fin at a time, then multiply. "Upper = yes" is in two rows of each species, so add both; same for "lower = no". Then joint = prior × the two fractions, and each joint ÷ the sum of the joints (as in part 2).`,
      start: R`<p>Naive: \(p(x \mid j) = p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\). Joint = \(\pi_j \cdot p(x \mid j)\).</p>
<div class="tw"><table><thead><tr><th>\(j\)</th><th>\(p(X_1 = \text{yes} \mid j)\)</th><th>\(p(X_2 = \text{no} \mid j)\)</th><th>joint</th></tr></thead><tbody>
<tr><td>A</td><td>\(\dfrac{\square + \square}{60}\)</td><td>\(\dfrac{\square + \square}{60}\)</td><td>\(\square\)</td></tr>
<tr><td>B</td><td>\(\dfrac{\square + \square}{24}\)</td><td>\(\dfrac{\square + \square}{24}\)</td><td>\(\square\)</td></tr>
<tr><td>C</td><td>\(\dfrac{\square + \square}{16}\)</td><td>\(\dfrac{\square + \square}{16}\)</td><td>\(\square\)</td></tr></tbody></table></div>
\[p(x) = \square + \square + \square = \square\]
\[\begin{aligned}p(\mathrm{A} \mid x) &= \tfrac{\square}{\square} \approx \square\\ p(\mathrm{B} \mid x) &= \tfrac{\square}{\square} \approx \square\\ p(\mathrm{C} \mid x) &= \tfrac{\square}{\square} \approx \square\end{aligned}\]`,
      answer: R`<p>Naive: \(p(x \mid j) = p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\). Joint = \(\pi_j \cdot p(x \mid j)\).</p>
<div class="tw"><table><thead><tr><th>\(j\)</th><th>\(p(X_1 = \text{yes} \mid j)\)</th><th>\(p(X_2 = \text{no} \mid j)\)</th><th>joint</th></tr></thead><tbody>
<tr><td>A</td><td>\(\dfrac{32 + 16}{60} = \dfrac45\)</td><td>\(\dfrac{16 + 4}{60} = \dfrac13\)</td><td>\(\dfrac35\cdot\dfrac45\cdot\dfrac13 = 0.16\)</td></tr>
<tr><td>B</td><td>\(\dfrac{5 + 15}{24} = \dfrac56\)</td><td>\(\dfrac{15 + 3}{24} = \dfrac34\)</td><td>\(\dfrac{6}{25}\cdot\dfrac56\cdot\dfrac34 = 0.15\)</td></tr>
<tr><td>C</td><td>\(\dfrac{3 + 9}{16} = \dfrac34\)</td><td>\(\dfrac{9 + 1}{16} = \dfrac58\)</td><td>\(\dfrac{4}{25}\cdot\dfrac34\cdot\dfrac58 = 0.075\)</td></tr></tbody></table></div>
\[p(x) = 0.16 + 0.15 + 0.075 = 0.385\]
\[\begin{aligned}p(\mathrm{A} \mid x) &= \tfrac{0.16}{0.385} \approx 0.416\\ p(\mathrm{B} \mid x) &= \tfrac{0.15}{0.385} \approx 0.390\\ p(\mathrm{C} \mid x) &= \tfrac{0.075}{0.385} \approx 0.195\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The same three posteriors as part 2, but naive: \(p(x \mid j)\) = \(p(X_1 = \text{yes} \mid j)\) × \(p(X_2 = \text{no} \mid j)\). Each factor looks at one fin only. Then joints, sum, divide, as in part 2.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>Bayes' rule: posterior = joint ÷ the sum of the joints. Naive = features independent inside a class, and each \(p(x_t \mid y)\) = count ÷ class total (the MLE). Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          why: R`<p>"Naive" = inside one species the two fins are treated as independent, so \(p(\text{yes}, \text{no} \mid j) = p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\).</p>` },
        { line: R`<b>The six fractions</b> — each adds every row with that fin value: <div class="tw"><table><thead><tr><th></th><th>\(p(X_1 = \text{yes} \mid j)\)</th><th>\(p(X_2 = \text{no} \mid j)\)</th></tr></thead><tbody>
<tr><td>A</td><td>\(\dfrac{32 + 16}{60} = \dfrac45\)</td><td>\(\dfrac{16 + 4}{60} = \dfrac13\)</td></tr>
<tr><td>B</td><td>\(\dfrac{5 + 15}{24} = \dfrac56\)</td><td>\(\dfrac{15 + 3}{24} = \dfrac34\)</td></tr>
<tr><td>C</td><td>\(\dfrac{3 + 9}{16} = \dfrac34\)</td><td>\(\dfrac{9 + 1}{16} = \dfrac58\)</td></tr></tbody></table></div>`,
          why: R`<p>Upper = yes: the (yes, yes) and (yes, no) rows. Lower = no: the (yes, no) and (no, no) rows. Not just the single (yes, no) row — that would be full Bayes again.</p>` },
        { line: R`<b>Joints</b> — prior × both fractions: <div class="formula">\[\begin{aligned}\mathrm{A}&: \dfrac35\cdot\dfrac45\cdot\dfrac13 = \dfrac{4}{25} = 0.16\\ \mathrm{B}&: \dfrac{6}{25}\cdot\dfrac56\cdot\dfrac34 = \dfrac{3}{20} = 0.15\\ \mathrm{C}&: \dfrac{4}{25}\cdot\dfrac34\cdot\dfrac58 = \dfrac{3}{40} = 0.075\end{aligned}\]</div>`,
          why: R`<p>The priors as fractions: \(0.6 = \tfrac35\), \(0.24 = \tfrac{6}{25}\), \(0.16 = \tfrac{4}{25}\). Multiply the tops together and the bottoms together.</p>` },
        { line: R`<b>Divide by the sum</b> \(p(x) = 0.16 + 0.15 + 0.075 = 0.385\): <div class="formula">\[\begin{aligned}\mathrm{A}&: \dfrac{0.16}{0.385} \approx 0.416\\ \mathrm{B}&: \dfrac{0.15}{0.385} \approx 0.390\\ \mathrm{C}&: \dfrac{0.075}{0.385} \approx 0.195\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official solution says 0.194 for C", html: R`<p>\(0.075 / 0.385 = 0.19481\ldots\), which rounds to 0.195 (0.194 is cut off, not rounded). Either is fine for the grader.</p>` }] },
      ],
      compare: R`Steps 2–4 are the official lines. Its C posterior 0.194 is truncated; rounded it's 0.195.`,
      slip: R`\(0.075 / 0.385 = 0.1948\ldots\), which rounds to 0.195. The key's 0.194 is cut off, not rounded. Either is fine.`,
    },

    "2025C-q4.4": {
      point: R`Nothing new to compute: the prediction is the species with the biggest posterior — in part 2 and in part 3.`,
      start: R`<p><b>Full Bayes:</b> biggest posterior \(= \square\) → \(\square\)</p>
<p><b>Naive Bayes:</b> biggest posterior \(= \square\) → \(\square\)</p>
<p><b>Agree?</b> \(\square\)</p>`,
      answer: R`<p><b>Full Bayes:</b> biggest posterior \(= 0.4\) (vs 0.375, 0.225) → <b>Armfish</b></p>
<p><b>Naive Bayes:</b> biggest posterior \(= 0.416\) (vs 0.390, 0.195) → <b>Armfish</b></p>
<p><b>Agree?</b> Yes, both predict Armfish.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Predicted species" = MAP = the species with the biggest posterior. Parts 2 and 3 already computed all of them, so just read off the biggest.`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ p(y \mid x)\]<p>The prediction = the class with the biggest posterior. Not on the sheet: [sheet: Class posterior probability] only names \(P(Y \mid X)\).</p>` },
        { line: R`<b>Full Bayes</b> — part 2's posteriors are A 0.4, B 0.375, C 0.225. Biggest: 0.4 → <b>Armfish (A)</b>.` },
        { line: R`<b>Naive Bayes</b> — part 3's posteriors are A 0.416, B 0.390, C 0.195. Biggest: 0.416 → <b>Armfish (A)</b>. Same species, so they agree. Done.` },
      ],
      compare: R`Same as the official answer: Armfish under both (0.4 and 0.416).`,
    },

    "2025C-q4.5": {
      point: R`Equal priors multiply every joint by the same number, so they can't change the winner. Drop them and compare only \(p(\text{yes}, \text{no} \mid j)\) — you already have these from parts 2 and 3.`,
      start: R`<p><b>Equal priors:</b> \(\square\)</p>
<p><b>Full Bayes</b>, \(p(x \mid j)\):</p>
\[\mathrm{A}: \square \qquad \mathrm{B}: \square \qquad \mathrm{C}: \square\]
<p>Biggest → \(\square\)</p>
<p><b>Naive Bayes</b>, \(p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\):</p>
\[\mathrm{A}: \square \qquad \mathrm{B}: \square \qquad \mathrm{C}: \square\]
<p>Biggest → \(\square\)</p>`,
      answer: R`<p><b>Equal priors:</b> every joint \(\pi_j\,p(x \mid j)\) has the same \(\pi_j\), so the species with the biggest \(p(x \mid j)\) wins.</p>
<p><b>Full Bayes</b>, \(p(x \mid j)\):</p>
\[\mathrm{A}: \tfrac{16}{60} \approx 0.267 \qquad \mathrm{B}: \tfrac{15}{24} = 0.625 \qquad \mathrm{C}: \tfrac{9}{16} = 0.5625\]
<p>Biggest → <b>Blofish</b></p>
<p><b>Naive Bayes</b>, \(p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\):</p>
\[\mathrm{A}: \tfrac45\cdot\tfrac13 \approx 0.267 \qquad \mathrm{B}: \tfrac56\cdot\tfrac34 = 0.625 \qquad \mathrm{C}: \tfrac34\cdot\tfrac58 \approx 0.469\]
<p>Biggest → <b>Blofish</b></p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> MAP again, but with \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C}\). Joint = \(\pi_j \cdot p(x \mid j)\), and \(\pi_j\) is now the same number for every species, so it can't change the winner. Compare \(p(x \mid j)\) only.`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ \pi_y\,p(x \mid y)\]\[\hat y_{\text{ML}} = \arg\max_y\ p(x \mid y)\]<p>MAP compares the joints (the posterior's bottom \(p(x)\) is the same for every class). Equal priors are shared too, so MAP = maximum likelihood. Not on the sheet.</p>` },
        { line: R`<b>Full Bayes</b> — \(p(\text{yes}, \text{no} \mid j)\) = the (yes, no) count ÷ species \(j\)'s fish (part 2): <div class="formula">\[\begin{aligned}\mathrm{A}&: \dfrac{16}{60} \approx 0.267\\ \mathrm{B}&: \dfrac{15}{24} = 0.625\\ \mathrm{C}&: \dfrac{9}{16} = 0.5625\end{aligned}\]</div>Biggest → <b>Blofish (B)</b>.` },
        { line: R`<b>Naive Bayes</b> — \(p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\), the two fractions from part 3: <div class="formula">\[\begin{aligned}\mathrm{A}&: \dfrac45\cdot\dfrac13 \approx 0.267\\ \mathrm{B}&: \dfrac56\cdot\dfrac34 = 0.625\\ \mathrm{C}&: \dfrac34\cdot\dfrac58 \approx 0.469\end{aligned}\]</div>Biggest → <b>Blofish (B)</b>. Done.`,
          why: R`<p>MAP (part 4) said Armfish only because Armfish is common (\(\pi_\mathrm{A} = 0.6\)). The fins alone point to Blofish.</p>`,
          extra: [{ label: "the official solution prints \"0625\"", html: R`<p>It means 0.625.</p>` }] },
      ],
      compare: R`Steps 2–3 are the official lines (it prints "0625" for 0.625). Blofish under both.`,
      slip: R`"0625" in the naive-Bayes B line is 0.625.`,
    },

    "2025C-q4.6": {
      point: R`Expected cost of saying \(y\) = row \(y\) of \(\lambda\) · the posteriors. Pick the smallest — it can be the least likely species, when mistakes on it are expensive.`,
      start: R`<p><b>Expected cost of each prediction</b> = \(\lambda\) × part 2's posteriors:</p>
\[\begin{bmatrix}0&1&2\\1&0&2\\1&1&0\end{bmatrix}\begin{bmatrix}\square\\ \square\\ \square\end{bmatrix} = \begin{bmatrix}\square\\ \square\\ \square\end{bmatrix} = \begin{bmatrix}\square\\ \square\\ \square\end{bmatrix}\]
<p><b>Smallest</b> → \(\square\)</p>`,
      answer: R`<p><b>Expected cost of each prediction</b> = \(\lambda\) × part 2's posteriors:</p>
\[\begin{bmatrix}0&1&2\\1&0&2\\1&1&0\end{bmatrix}\begin{bmatrix}0.4\\ 0.375\\ 0.225\end{bmatrix} = \begin{bmatrix}0.375 + 0.45\\ 0.4 + 0.45\\ 0.4 + 0.375\end{bmatrix} = \begin{bmatrix}0.825\\ 0.85\\ 0.775\end{bmatrix}\]
<p><b>Smallest</b> → 0.775 → <b>Catfish (C)</b></p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The smallest expected cost. Row = what you say, column = the truth. Cost of saying \(y\) = row \(y\) · the posteriors; all three at once = \(\lambda\) × the posterior column.`,
          remember: R`\[\text{risk of saying } y = \sum_{y'}\lambda_{y,y'}\,p(y' \mid x)\ \to\ \text{predict the smallest}\]<p>[sheet: Expected risk of predicting class label y] has it with joints \(\pi_{y'}P(X = x \mid Y = y')\) instead of posteriors. Every one ÷ the same \(p(x)\), so the same winner.</p>`,
          size: R`\[\underbrace{(\text{row } y\text{ of }\lambda)}_{\textstyle 1\times 3}\,\underbrace{p(\cdot \mid x)}_{\textstyle 3\times 1} = \text{one number}\]<p>3 truths (A, B, C) in both → inner 3 = 3 ✓ · result = one cost for saying \(y\) ✓</p>`,
          why: R`<p>[sheet: Expected risk of predicting class label y] is \(\sum_{y'} \pi_{y'} P(X = x \mid Y = y')\,\lambda_{y,y'}\). It uses the joints (0.16, 0.15, 0.09); the posteriors are those ÷ 0.4, the same for every row, so the smallest is the same.</p>
<p>Direction check: \(\lambda_{\mathrm{B},\mathrm{C}} = 2\) = say Blofish, truth Catfish — the "twice as bad" mistake.</p>` },
        { line: R`<b>Multiply</b> — with part 2's full-Bayes posteriors \((0.4,\ 0.375,\ 0.225)\): <div class="tw"><table><thead><tr><th>say</th><th>row · posteriors</th><th>cost</th></tr></thead><tbody>
<tr><td>A</td><td>\(0 \cdot 0.4 + 1 \cdot 0.375 + 2 \cdot 0.225\)</td><td>\(0.825\)</td></tr>
<tr><td>B</td><td>\(1 \cdot 0.4 + 0 \cdot 0.375 + 2 \cdot 0.225\)</td><td>\(0.85\)</td></tr>
<tr><td>C</td><td>\(1 \cdot 0.4 + 1 \cdot 0.375 + 0 \cdot 0.225\)</td><td>\(0.775\)</td></tr></tbody></table></div>`,
          size: R`\[\underbrace{\lambda}_{\textstyle 3\times 3}\,\underbrace{p(\cdot \mid x)}_{\textstyle 3\times 1} = \underbrace{\text{costs}}_{\textstyle 3\times 1}\]<p>rows = what you say, columns = the truth · inner 3 = 3 ✓ · result 3×1 = one cost per prediction ✓</p><p>Wrong order: \(p(\cdot \mid x)\,\lambda\) = (3×1)(3×3) — inner 1 ≠ 3 ✗</p>` },
        { line: R`<b>Smallest</b> — 0.775 → <b>Catfish (C)</b>. Done.`,
          why: R`<p>Catfish is the least likely species, but any wrong answer on a Catfish costs 2, so saying C is the safe bet.</p>` },
      ],
      compare: R`The official line is \(\lambda\) × the posterior column = steps 2–3: \((0.825, 0.85, 0.775)\) → C.`,
    },

    // ═══════════════════════════════ 2026-B Q4 — your Moed B: Poisson users (R / M)

    "2026B-q4.1": {
      point: R`\(\ell\) = the log of each sample's Poisson probability, added up — with ONE general \(\lambda\) and general \(x_i\), not the table. Derivative by \(\lambda\), set to 0: \(\hat\lambda\) = the average of the counts.`,
      start: R`<p><b>The function:</b></p>\[\ell(\lambda; D) = \;\square\]<p><b>Rewrite (log rules):</b></p>\[\ell(\lambda; D) = \;\square\]<p><b>Its derivative by \(\lambda\):</b></p>\[\ell'(\lambda; D) = \;\square\]<p><b>Set to 0 and solve:</b></p>\[\hat\lambda = \;\square\]<p><b>It's a maximum because:</b> \(\ell''(\lambda; D) = \square \lt 0\)</p>`,
      answer: R`<p><b>The function:</b></p>\[\ell(\lambda; D) = \sum_{i=1}^{n}\log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\]<p><b>Rewrite (log rules):</b></p>\[\begin{aligned}\ell(\lambda; D) &= \sum_{i=1}^{n}\big(x_i\log\lambda - \lambda - \log(x_i!)\big)\\ &= \Big(\sum_{i=1}^{n} x_i\Big)\log\lambda - n\lambda - \sum_{i=1}^{n}\log(x_i!)\end{aligned}\]<p><b>Its derivative by \(\lambda\):</b></p>\[\ell'(\lambda; D) = \Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda - n\]<p><b>Set to 0 and solve:</b></p>\[\Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda = n \iff \hat\lambda = \frac1n\sum_{i=1}^{n} x_i\]<p><b>It's a maximum because:</b> \(\ell''(\lambda; D) = -\Big(\sum_{i=1}^{n} x_i\Big)\dfrac{1}{\lambda^2} \lt 0\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Two things: \(\ell(\lambda; D)\) as a formula in \(\lambda\) (general \(x_1, \ldots, x_n\)), then the MLE = the \(\lambda\) that maximizes it. One variable, so: derivative, set to 0, solve.`,
          remember: R`\[\ell(\theta) = \log\prod_{i} p(x_i;\theta) = \sum_{i}\log p(x_i;\theta)\]<p>The MLE recipe: independent samples → multiply their probabilities; take the log (log of a product = sum of the logs); derivative; set to 0; solve. Not on the sheet. Log of a product is on the extension sheet, if you get it: [sheet: Log of product].</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You wrote this with the table's numbers and \(\lambda_R\), \(\lambda_M\), and never differentiated (0/5). The part wants general \(x_1, \ldots, x_n\) and one \(\lambda\); the points are for the derivative and solving.</p>` }] },
        { line: R`<b>The function</b> — the log of each sample's Poisson probability, added up: <div class="formula">\[\ell(\lambda; D) = \sum_{i=1}^{n}\log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\]</div>`,
          why: R`<p>Each sample's probability is [sheet: Poisson probability mass function with]: \(\lambda^k e^{-\lambda}/k!\) with \(k = x_i\). The samples are independent, so all of them together = the product. The log turns the product into a sum (log of a product = sum of the logs).</p>
<p>The \(\sum_i\) only means one log per sample. With 3 samples it literally is:</p>
\[\begin{aligned}\ell = \;&\log\frac{\lambda^{x_1}e^{-\lambda}}{x_1!} &&\leftarrow \text{sample 1}\\ +\;&\log\frac{\lambda^{x_2}e^{-\lambda}}{x_2!} &&\leftarrow \text{sample 2}\\ +\;&\log\frac{\lambda^{x_3}e^{-\lambda}}{x_3!} &&\leftarrow \text{sample 3}\end{aligned}\]` },
        { line: R`<b>Rewrite</b> — a log of a fraction is hard to differentiate, so split each log into three simple parts, then add over \(i\): <div class="formula">\[\begin{aligned}\ell(\lambda; D) &= \sum_{i=1}^{n}\big(x_i\log\lambda - \lambda - \log(x_i!)\big)\\ &= \Big(\sum_{i=1}^{n} x_i\Big)\log\lambda - n\lambda - \sum_{i=1}^{n}\log(x_i!)\end{aligned}\]</div>`,
          remember: R`\[\log(ab) = \log a + \log b\]\[\log\frac{a}{b} = \log a - \log b\]\[\log a^k = k\log a\]<p>The log rules (log = natural log, so \(\log e^c = c\)). Not on the sheet; extension sheet, if you get it: [sheet: Log of product], [sheet: Log of quotient], [sheet: Log of power].</p>`,
          why: R`<p><b>One log</b>, with the three log rules: top ÷ bottom → minus; \(\lambda^{x_i}\cdot e^{-\lambda}\) → plus; the power comes down in front (\(\log\lambda^{x_i} = x_i\log\lambda\)):</p>
\[\log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!} = x_i\log\lambda + \underbrace{\log e^{-\lambda}}_{\textstyle = -\lambda} - \log(x_i!)\]
<p>(\(\log\) is the natural log, so \(\log e^{-\lambda} = -\lambda\).)</p>
<p><b>Add over \(i\):</b> \(\log\lambda\) is in every first part, so it comes out: \((x_1 + \dots + x_n)\log\lambda\). \(-\lambda\) appears \(n\) times: \(-n\lambda\). The last parts have no \(\lambda\), so leave them as a sum.</p>` },
        { line: R`<b>Derivative by \(\lambda\)</b> — \(\sum_i x_i\) is just a number, \((\log\lambda)' = \tfrac1\lambda\), \((n\lambda)' = n\), the last sum has no \(\lambda\): <div class="formula">\[\ell'(\lambda; D) = \Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda - n\]</div>`,
          remember: R`\[(\log x)' = \frac1x\]<p>Natural log. Not on the sheet; extension sheet, if you get it: [sheet: Derivative of loga (x)] gives \(\frac{1}{x\ln a}\), and with \(a = e\), \(\ln e = 1\).</p>`,
          why: R`<p>Same as \(f(\lambda) = 16\log\lambda - 8\lambda - c\) → \(f'(\lambda) = \tfrac{16}{\lambda} - 8\). (That's part 2's 8 R users: their counts add to 16.)</p>` },
        { line: R`<b>Set to 0 and solve</b>, then check it's a maximum (second derivative \(\lt 0\)): <div class="formula">\[\begin{aligned}\Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda = n \iff \hat\lambda &= \frac1n\sum_{i=1}^{n} x_i\\ \ell''(\lambda; D) = -\Big(\sum_{i=1}^{n} x_i\Big)\frac{1}{\lambda^2} &\lt 0\end{aligned}\]</div>Done.`,
          why: R`<p>The MLE is the average of the counts. With the R users: \(\tfrac{16}{\lambda} = 8\) → \(\lambda = 2\), exactly part 2. \(\ell''\) is the derivative of \((\sum_i x_i)\lambda^{-1} - n\); counts are \(\ge 0\), so it's negative.</p>` },
      ],
      compare: R`Steps 3–5 are the official lines, including \(\ell'' \lt 0\). Same derivation as your HW5 Q1–2 (written with ln there).`,
    },

    "2026B-q4.2": {
      point: R`Part 1 says the MLE of a Poisson rate is the average. So \(\hat\lambda_\mathrm{R}\) = the average of the R users' counts, \(\hat\lambda_\mathrm{M}\) = of the M users'. Each prior = that class's share of the 10 users.`,
      start: R`\[\begin{aligned}\hat\lambda_\mathrm{R} &= \frac{\square}{8} = \square\\ \hat\lambda_\mathrm{M} &= \frac{\square}{2} = \square\end{aligned}\]\[\hat\pi_\mathrm{R} = \frac{\square}{10} = \square \qquad \hat\pi_\mathrm{M} = \frac{\square}{10} = \square\]`,
      answer: R`\[\begin{aligned}\hat\lambda_\mathrm{R} &= \frac{1 + 1 + 2 + 2 + 2 + 2 + 3 + 3}{8} = 2\\ \hat\lambda_\mathrm{M} &= \frac{4 + 4}{2} = 4\end{aligned}\]\[\hat\pi_\mathrm{R} = \frac{8}{10} = 0.8 \qquad \hat\pi_\mathrm{M} = \frac{2}{10} = 0.2\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> Four MLEs. Rates: part 1's \(\hat\lambda = \frac1n\sum_i x_i\) = the average, applied to each class's own users. Priors: the class's count ÷ all 10 users.`,
          remember: R`\[\hat\pi_j = \frac{n_j}{n} = \frac{\text{samples in class } j}{\text{all samples}}\]<p>The MLE of a prior = count ÷ total. [sheet: Class prior] only says \(\pi_j = P(Y = j)\); closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates].</p>` },
        { line: R`<b>Rates = averages, per class</b> — R = users 1–8, M = users 9–10: <div class="formula">\[\begin{aligned}\hat\lambda_\mathrm{R} &= \frac{1 + 1 + 2 + 2 + 2 + 2 + 3 + 3}{8} = \frac{16}{8} = 2\\ \hat\lambda_\mathrm{M} &= \frac{4 + 4}{2} = \frac82 = 4\end{aligned}\]</div>`,
          why: R`<p>\(\lambda_\mathrm{R}\) describes regular users only, so it's fitted on the R users only. Averaging all ten (2.4) would give one rate for everyone, which can't tell the classes apart.</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You got the priors but left out the rates (2/5). The rates are just these two averages.</p>` }] },
        { line: R`<b>Priors = shares</b>: <div class="formula">\[\hat\pi_\mathrm{R} = \frac{8}{10} = 0.8 \qquad \hat\pi_\mathrm{M} = \frac{2}{10} = 0.2\]</div>Done.`,
          why: R`<p>[sheet: Class prior]: \(\pi_j = P(Y = j)\), the fraction of users in class \(j\).</p>`,
          extra: [{ label: "the official solution writes π̂_R twice", html: R`<p>Its second prior is labelled \(\hat\pi_\mathrm{R} = \tfrac{2}{10}\). It's \(\hat\pi_\mathrm{M} = 0.2\).</p>` }] },
      ],
      compare: R`Same numbers as the official answer (steps 2–3). Its second prior is mislabelled \(\hat\pi_\mathrm{R}\); it's \(\hat\pi_\mathrm{M} = 0.2\).`,
      slip: R`Typo: the second prior is \(\hat\pi_\mathrm{M} = \tfrac{2}{10} = 0.2\), not \(\hat\pi_\mathrm{R}\). \(\hat\pi_\mathrm{R}\) is 0.8.`,
    },

    "2026B-q4.3": {
      point: R`MAP compares the joints prior × Poisson. The \(x!\) cancels, and it becomes one condition on \(x\): \(2^x \gt 4e^2 \approx 29.6\). So M exactly when \(x \ge 5\).`,
      start: R`<p><b>Predict M iff</b></p>\[\hat\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{M}) \gt \hat\pi_\mathrm{R}\,\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{R})\]\[\iff \square \gt \square\]\[\iff \frac{4^x}{2^x} \gt \square\]\[\iff 2^x \gt \square\]<p>So M iff \(x \ge \square\):</p><p>\(\hat y(2) = \square \qquad \hat y(4) = \square \qquad \hat y(7) = \square\)</p>`,
      answer: R`<p><b>Predict M iff</b></p>\[\hat\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{M}) \gt \hat\pi_\mathrm{R}\,\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{R})\]\[\iff 0.2\cdot\frac{4^x e^{-4}}{x!} \gt 0.8\cdot\frac{2^x e^{-2}}{x!}\]\[\iff \frac{4^x}{2^x} \gt \frac{0.8}{0.2}\cdot\frac{e^{-2}}{e^{-4}}\]\[\iff 2^x \gt 4e^2 = 29.556\]<p>So M iff \(x \ge 5\) (\(2^4 = 16 \lt 29.556 \lt 32 = 2^5\)):</p><p>\(\hat y(2) = \mathrm{R} \qquad \hat y(4) = \mathrm{R} \qquad \hat y(7) = \mathrm{M}\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> MAP for \(x = 2, 4, 7\): the class with the bigger joint prior × Poisson. Instead of three computations, write "M's joint \(\gt\) R's joint" once for a general \(x\) and solve for \(x\).`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ \pi_y\,p(x \mid y)\]<p>MAP = biggest posterior = biggest joint: the posterior is joint ÷ \(p(x)\) (Bayes' rule), and \(p(x)\) is the same for every class. Here \(p(x \mid y)\) is the Poisson. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          why: R`<p>Posterior = joint ÷ \(p(x)\), and \(p(x)\) is the same for both classes, so compare the joints.</p>` },
        { line: R`<b>Plug in part 2's numbers</b> — \(\hat\pi_\mathrm{M} = 0.2\), \(\hat\lambda_\mathrm{M} = 4\), \(\hat\pi_\mathrm{R} = 0.8\), \(\hat\lambda_\mathrm{R} = 2\): <div class="formula">\[0.2\cdot\frac{4^x e^{-4}}{x!} \gt 0.8\cdot\frac{2^x e^{-2}}{x!}\]</div>`,
          why: R`<p>Each Poisson is [sheet: Poisson probability mass function with] with \(\lambda = 4\) (M) and \(\lambda = 2\) (R).</p>` },
        { line: R`<b>Get \(x\) alone</b> — \(x!\) is on both sides: cancel it. Then move the \(x\)-powers left, the numbers right (divide both sides by \(0.2 \cdot 2^x \cdot e^{-4}\)): <div class="formula">\[\begin{aligned}\frac{4^x}{2^x} &\gt \frac{0.8}{0.2}\cdot\frac{e^{-2}}{e^{-4}}\\ 2^x &\gt 4e^{2} = 4 \times 7.389 = 29.556\end{aligned}\]</div>`,
          why: R`<p><b>Left:</b> 0.2 and \(e^{-4}\) cancel; \(\tfrac{4^x}{2^x} = \big(\tfrac42\big)^x = 2^x\).</p>
<p><b>Right:</b> \(2^x\) cancels; \(\tfrac{0.8}{0.2} = 4\); \(\tfrac{e^{-2}}{e^{-4}} = e^{-2+4} = e^2\) (dividing powers of \(e\) = subtract the exponents; optional pointer, extension sheet: [sheet: Powers and Logarithms]). \(e^2 = 7.389\) is in the question's table.</p>` },
        { line: R`<b>Classify</b> — \(2^4 = 16 \lt 29.556 \lt 32 = 2^5\), so M iff \(x \ge 5\): <div class="formula">\[\begin{aligned}x = 2&: \ 2^2 = 4 \lt 29.556 \ \to\ \mathrm{R}\\ x = 4&: \ 2^4 = 16 \lt 29.556 \ \to\ \mathrm{R}\\ x = 7&: \ 2^7 = 128 \gt 29.556 \ \to\ \mathrm{M}\end{aligned}\]</div>Done.`,
          extra: [{ label: "check x = 4 with the table's numbers", html: R`<p>M: \(0.2\cdot\tfrac{4^4 e^{-4}}{4!} = 0.2\cdot\tfrac{256 \times 0.0183}{24} \approx 0.039\). R: \(0.8\cdot\tfrac{2^4 e^{-2}}{4!} = 0.8\cdot\tfrac{16 \times 0.1353}{24} \approx 0.072\). R is bigger. ✓</p>` },
                  { label: "Moed B trap", html: R`<p>You left this blank (0/5). If the algebra stalls, computing both joints for each \(x\) like the check above also earns the points.</p>` }] },
      ],
      compare: R`The official solution writes step 2 as a ratio "\(\ldots / \ldots \gt 1\)" — the same thing, divided through. Its last lines are step 4.`,
    },

    "2026B-q4.4": {
      point: R`M wins when its joint is bigger: \(\pi_\mathrm{M}\cdot\mathrm{Poiss}(4 \mid 4) \gt \pi_\mathrm{R}\cdot\mathrm{Poiss}(4 \mid 2)\) (part 3's comparison at \(x = 4\)). But now \(\pi_\mathrm{M}\) is the unknown and \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\). Solve for \(\pi_\mathrm{M}\).`,
      start: R`<p><b>M at \(x = 4\) iff</b></p>\[\pi_\mathrm{M}\cdot\square \gt (1 - \pi_\mathrm{M})\cdot\square\]\[\iff \frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} \gt \square\]\[\iff \square\,\pi_\mathrm{M} \gt \square - \square\,\pi_\mathrm{M}\]\[\iff \pi_\mathrm{M} \gt \square \approx \square\]<p>This is \(\square\) than \(\hat\pi_\mathrm{M} = 0.2\), because \(\square\)</p>`,
      answer: R`<p><b>M at \(x = 4\) iff</b></p>\[\pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!} \gt (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\]\[\iff \frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} \gt \frac{2^4 e^{-2}}{4^4 e^{-4}} = \frac{e^2}{16}\]\[\iff 16\pi_\mathrm{M} \gt e^2 - e^2\pi_\mathrm{M}\]\[\iff \pi_\mathrm{M} \gt \frac{e^2}{16 + e^2} \approx 0.316\]<p>This is <b>larger</b> than \(\hat\pi_\mathrm{M} = 0.2\), because with \(\hat\pi_\mathrm{M} = 0.2\) part 3 gave \(\hat y(4) = \mathrm{R}\): 4 packets is M's typical count, but M is rare, so its prior must be bigger to predict M.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The smallest \(\pi_\mathrm{M}\) that makes \(x = 4\) an M. MAP says M iff M's joint \(\gt\) R's joint. So write that with \(\pi_\mathrm{M}\) as a letter and \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\), and solve for \(\pi_\mathrm{M}\).`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ \pi_y\,p(x \mid y)\]<p>MAP = biggest posterior = biggest joint: the posterior is joint ÷ \(p(x)\) (Bayes' rule), and \(p(x)\) is the same for every class. Here \(p(x \mid y)\) is the Poisson. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>Plug in</b> \(x = 4\), \(\lambda_\mathrm{M} = 4\), \(\lambda_\mathrm{R} = 2\) (part 2): <div class="formula">\[\pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!} \gt (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\]</div>` },
        { line: R`<b>Priors on one side</b> — the unknown is in the priors, so collect them left and the Poissons right: divide both sides by \((1 - \pi_\mathrm{M})\cdot\frac{4^4 e^{-4}}{4!}\): <div class="formula">\[\frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} \gt \frac{2^4 e^{-2}}{4^4 e^{-4}} = \frac{e^2}{16}\]</div>`,
          why: R`<p>\(4!\) cancels; \(\tfrac{2^4}{4^4} = \tfrac{16}{256} = \tfrac{1}{16}\); \(\tfrac{e^{-2}}{e^{-4}} = e^2\).</p>` },
        { line: R`<b>Solve for \(\pi_\mathrm{M}\)</b> — multiply by \(16(1 - \pi_\mathrm{M})\): <div class="formula">\[\begin{aligned}16\pi_\mathrm{M} &\gt e^2 - e^2\pi_\mathrm{M}\\ \pi_\mathrm{M}(16 + e^2) &\gt e^2\\ \pi_\mathrm{M} &\gt \frac{e^2}{16 + e^2} = \frac{7.389}{23.389} \approx 0.316\end{aligned}\]</div>`,
          why: R`<p>Multiply out, put the \(\pi_\mathrm{M}\) terms on one side (add \(e^2\pi_\mathrm{M}\) to both sides), divide by \(16 + e^2\) (same moves as 2025-A Q5.4). At exactly 0.316 the two joints tie.</p>` },
        { line: R`<b>Compare with 0.2</b> — 0.316 is <b>larger</b>. That fits part 3: with \(\hat\pi_\mathrm{M} = 0.2\), \(x = 4\) was R, so \(\pi_\mathrm{M}\) has to go up to get M. Done.`,
          why: R`<p>4 packets is exactly M's typical count, but M is rare, so its prior must be big enough before we call it.</p>` },
      ],
      compare: R`Steps 3–5 are the official lines: \(\pi_\mathrm{M} \gt \tfrac{e^2}{16 + e^2} \approx 0.316\), larger than 0.2.`,
    },

    "2026B-q4.5": {
      point: R`A cost multiplies the joint of the class you'd be wrong about: saying M costs \(C_{\mathrm{M},\mathrm{R}}\) × R's joint, saying R costs \(C_{\mathrm{R},\mathrm{M}}\) × M's joint. Predict M when that's cheaper, then get the ratio alone.`,
      start: R`\[\begin{aligned}\text{say M:}\quad &C_{\mathrm{M},\mathrm{R}}\cdot\square\cdot\square\\ \text{say R:}\quad &C_{\mathrm{R},\mathrm{M}}\cdot\square\cdot\square\end{aligned}\]<p>M is cheaper \(\iff\)</p>\[\begin{aligned}\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} &\gt \frac{\square}{\square}\\ &= \square \approx \square\end{aligned}\]`,
      answer: R`\[\begin{aligned}\text{say M:}\quad &C_{\mathrm{M},\mathrm{R}}\cdot 0.8\cdot\mathrm{Poiss}(4 \mid 2)\\ \text{say R:}\quad &C_{\mathrm{R},\mathrm{M}}\cdot 0.2\cdot\mathrm{Poiss}(4 \mid 4)\end{aligned}\]<p>M is cheaper \(\iff\)</p>\[\begin{aligned}\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} &\gt \frac{0.8\cdot 2^4 e^{-2}/4!}{0.2\cdot 4^4 e^{-4}/4!}\\ &= \frac{e^2}{4} \approx 1.847\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The classifier says M when "cost of saying M" \(\lt\) "cost of saying R". Each prediction costs only when the truth is the other class. Write both costs, then get \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) alone.`,
          why: R`<p>You don't need to know this by heart: [sheet: Expected risk of predicting class label y] is \(\sum_{y'} \pi_{y'} P(X = x \mid Y = y')\,\lambda_{y,y'}\), with \(C\) in place of \(\lambda\). For "say M" the truth-M term costs \(C_{\mathrm{M},\mathrm{M}} = 0\), so only the truth-R term is left.</p>` },
        { line: R`<b>Cost of each prediction</b> — say M is wrong on an R user (joint \(0.8\cdot\mathrm{Poiss}(4 \mid 2)\)); say R is wrong on an M user: <div class="formula">\[\begin{aligned}\text{say M:}\quad &C_{\mathrm{M},\mathrm{R}}\cdot 0.8\cdot\mathrm{Poiss}(4 \mid 2)\\ \text{say R:}\quad &C_{\mathrm{R},\mathrm{M}}\cdot 0.2\cdot\mathrm{Poiss}(4 \mid 4)\end{aligned}\]</div>` },
        { line: R`<b>M is cheaper</b> — say-M cost \(\lt\) say-R cost. We want \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) alone, so divide both sides by \(C_{\mathrm{M},\mathrm{R}}\cdot 0.2\cdot\mathrm{Poiss}(4 \mid 4)\): <div class="formula">\[\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} \gt \frac{0.8\cdot\mathrm{Poiss}(4 \mid 2)}{0.2\cdot\mathrm{Poiss}(4 \mid 4)}\]</div>` },
        { line: R`<b>Simplify</b> — \(\tfrac{0.8}{0.2} = 4\). Poisson ratio: \(4!\) cancels, \(\tfrac{2^4}{4^4} = \tfrac{1}{16}\), \(\tfrac{e^{-2}}{e^{-4}} = e^2\), so it's \(\tfrac{e^2}{16}\) (as in part 4): <div class="formula">\[\begin{aligned}\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} &\gt 4\cdot\frac{e^2}{16} = \frac{e^2}{4}\\ &= \frac{7.389}{4} \approx 1.847\end{aligned}\]</div>Done.`,
          why: R`<p>\(C_{\mathrm{R},\mathrm{M}}\) = a missed threat, \(C_{\mathrm{M},\mathrm{R}}\) = a false alarm. So \(x = 4\) is called M only if a missed threat costs more than ≈ 1.85 false alarms.</p>` },
      ],
      compare: R`Steps 3–4 are the official lines (written as a ratio "\(\gt 1\)" first): \(\tfrac{e^2}{4} \approx 1.847\).`,
      slip: R`The last sentence is garbled. It means: call \(x = 4\) malicious only if a missed threat costs more than about 1.847 times a false alarm, i.e. \(C_{\mathrm{R},\mathrm{M}} / C_{\mathrm{M},\mathrm{R}} \gt \tfrac{e^2}{4} \approx 1.847\).`,
    },

    "2026B-q4.6": {
      point: R`Part 3's rule: M iff \(x \ge 5\). So it's wrong when an R user sends ≥ 5 packets or an M user sends ≤ 4. Risk = prior × Poisson probability of each, added.`,
      start: R`\[\begin{aligned}R = \;&\square\cdot\Pr[X \ge \square \mid \lambda = \square]\\ +\;&\square\cdot\Pr[X \le \square \mid \lambda = \square]\end{aligned}\]\[\Pr[X \le 4 \mid \lambda] = \square\]\[\begin{aligned}\Pr[X \ge 5 \mid \lambda = 2] &= 1 - \square = \square\\ \Pr[X \le 4 \mid \lambda = 4] &= \square = \square\end{aligned}\]\[R = \square \approx \square\]`,
      answer: R`\[\begin{aligned}R = \;&0.8\cdot\Pr[X \ge 5 \mid \lambda = 2]\\ +\;&0.2\cdot\Pr[X \le 4 \mid \lambda = 4]\end{aligned}\]\[\Pr[X \le 4 \mid \lambda] = e^{-\lambda}\Big(1 + \lambda + \frac{\lambda^2}{2} + \frac{\lambda^3}{6} + \frac{\lambda^4}{24}\Big)\]\[\begin{aligned}\Pr[X \ge 5 \mid \lambda = 2] &= 1 - 7e^{-2} \approx 0.0529\\ \Pr[X \le 4 \mid \lambda = 4] &= \tfrac{103}{3}e^{-4} \approx 0.6283\end{aligned}\]\[R = 0.8 \times 0.0529 + 0.2 \times 0.6283 \approx 0.168\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> Cost 1 for every mistake, so risk = the probability of a wrong prediction. Part 3's rule: M iff \(x \ge 5\). So find when that rule is wrong, and how likely each case is.` },
        { line: R`<b>When is it wrong</b> — an R user (0.8) with \(x \ge 5\), or an M user (0.2) with \(x \le 4\): <div class="formula">\[\begin{aligned}R = \;&0.8\cdot\Pr[X \ge 5 \mid \lambda = 2]\\ +\;&0.2\cdot\Pr[X \le 4 \mid \lambda = 4]\end{aligned}\]</div>`,
          why: R`<p>Each piece = (share of users in that class) × (share of that class in the wrong range).</p>` },
        { line: R`<b>\(\Pr[X \le 4]\) = five Poisson terms</b>, \(k = 0, \ldots, 4\); \(e^{-\lambda}\) is in all of them. \(\Pr[X \ge 5]\) never ends, so use \(1 - \Pr[X \le 4]\): <div class="formula">\[\begin{aligned}&\Pr[X \le 4 \mid \lambda]\\ &= e^{-\lambda}\Big(1 + \lambda + \frac{\lambda^2}{2} + \frac{\lambda^3}{6} + \frac{\lambda^4}{24}\Big)\end{aligned}\]</div>`,
          why: R`<p>[sheet: Poisson probability mass function with] for \(k = 0, 1, 2, 3, 4\), with \(0! = 1! = 1\), \(2! = 2\), \(3! = 6\), \(4! = 24\).</p>` },
        { line: R`<b>Plug in \(\lambda = 2\) and \(\lambda = 4\)</b> (\(e^{-2}\), \(e^{-4}\) from the question's table): <div class="tw"><table><thead><tr><th>\(\lambda\)</th><th>the bracket</th><th>\(\Pr[X \le 4]\)</th></tr></thead><tbody>
<tr><td>2</td><td>\(1 + 2 + 2 + \dfrac43 + \dfrac23 = 7\)</td><td>\(7e^{-2} = 0.9471\)</td></tr>
<tr><td>4</td><td>\(1 + 4 + 8 + 10\dfrac23 + 10\dfrac23 = \dfrac{103}{3}\)</td><td>\(\dfrac{103}{3}e^{-4} = 0.6283\)</td></tr></tbody></table></div>So \(\Pr[X \ge 5 \mid 2] = 1 - 0.9471 = 0.0529\).` },
        { line: R`<b>Put it together</b>: <div class="formula">\[\begin{aligned}R &= 0.8 \times 0.0529 + 0.2 \times 0.6283\\ &= 0.0423 + 0.1257 \approx 0.168\end{aligned}\]</div>Done.`,
          why: R`<p>Exact form (the official one): \(R = \tfrac45(1 - 7e^{-2}) + \tfrac15\cdot\tfrac{103}{3}e^{-4} \approx 0.168\). Most of it (0.126) is M users who send few packets.</p>` },
      ],
      compare: R`Steps 2–5 are the official lines; same \(R \approx 0.168\).`,
    },
  });
})();
