// Walkthroughs for the Bayesian-learning questions — CASUAL style (spec/WALKS.md):
// the point first, then "Begin your answer like this" + the full exam answer, then the steps that build it.
// Numbers verified with python3 (fractions + numpy); official slips flagged per part.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ═══════════════════════════════ 2025-A Q5 — the 20 flowers (naive Bayes by counting)

    "2025A-q5.1": {
      point: R`<p>Nothing to derive: every number here is a count ÷ a total. The only trap is <b>which</b> total.</p>
<p><b>1. What the question asks.</b> "Prior \(\pi_j\)" = how common class \(j\) is among all 20 flowers. "\(p(X_t = a \mid y = j)\)" = among class \(j\)'s flowers only, the share with feature \(t\) equal to \(a\).</p>
<p><b>2. The picture: the bar "\(\mid\)" cuts the table.</b> Whatever stands after "\(\mid\)" is already known: "we know it's an A". "Of the A flowers, how many are purple?" can only be answered inside A's rows (samples 1–8), so the total is 8, not 20. For B: samples 9–20, total 12. That's also why, inside one class, the colour shares add to 1.</p>
<p><b>3. "Unordered / multinomial".</b> 3, 4, 5 petals are just three labels, like colours: count each one, don't average them.</p>
<p><b>So:</b> 2 priors (÷ 20), then per class 2 colour shares and 3 petal shares (÷ 8 for A, ÷ 12 for B).</p>`,
      start: R`<p><b>Key idea:</b> every probability is a count ÷ a total: a prior = the class's count ÷ all 20 flowers; \(p(X_t = a \mid y = j)\) = the count of \(a\) inside class \(j\)'s rows ÷ class \(j\)'s size (8 or 12).</p>
<p><b>Priors</b> (the class's flowers ÷ all flowers):</p>
\[\begin{aligned}\pi_\mathrm{A} &= \frac{\text{A flowers}}{\text{all flowers}} = \frac{\square}{20} = \square\\ \pi_\mathrm{B} &= \frac{\text{B flowers}}{\text{all flowers}} = \frac{\square}{20} = \square\end{aligned}\]
<p><b>Class conditionals</b> (inside class \(j\)'s rows only):</p>
\[p(x_t = a \mid y = j) = \frac{\text{class-}j\text{ flowers with } x_t = a}{\text{class-}j\text{ flowers}}\]
<div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\)</th><th>\(y = \mathrm{B}\)</th></tr></thead><tbody>
<tr><td>\(p(x_1 = \mathrm{p} \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_1 = \mathrm{r} \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_2 = 3 \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_2 = 4 \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr>
<tr><td>\(p(x_2 = 5 \mid y)\)</td><td>\(\dfrac{\square}{8}\)</td><td>\(\dfrac{\square}{12}\)</td></tr></tbody></table></div>`,
      answer: R`<p><b>Key idea:</b> every probability is a count ÷ a total: a prior = the class's count ÷ all 20 flowers; \(p(X_t = a \mid y = j)\) = the count of \(a\) inside class \(j\)'s rows ÷ class \(j\)'s size (8 or 12).</p>
<p><b>Priors</b> (the class's flowers ÷ all flowers):</p>
\[\begin{aligned}\pi_\mathrm{A} &= \frac{\text{A flowers}}{\text{all flowers}} = \frac{8}{20} = 0.4\\ \pi_\mathrm{B} &= \frac{\text{B flowers}}{\text{all flowers}} = \frac{12}{20} = 0.6\end{aligned}\]
<p><b>Class conditionals</b> (inside class \(j\)'s rows only):</p>
\[p(x_t = a \mid y = j) = \frac{\text{class-}j\text{ flowers with } x_t = a}{\text{class-}j\text{ flowers}}\]
<div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\)</th><th>\(y = \mathrm{B}\)</th></tr></thead><tbody>
<tr><td>\(p(x_1 = \mathrm{p} \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{8}{12} \approx 0.667\)</td></tr>
<tr><td>\(p(x_1 = \mathrm{r} \mid y)\)</td><td>\(\dfrac68 = 0.75\)</td><td>\(\dfrac{4}{12} \approx 0.333\)</td></tr>
<tr><td>\(p(x_2 = 3 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{6}{12} = 0.5\)</td></tr>
<tr><td>\(p(x_2 = 4 \mid y)\)</td><td>\(\dfrac48 = 0.5\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr>
<tr><td>\(p(x_2 = 5 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr></tbody></table></div>`,
      moves: [
        { line: R`<b>What does the question really want?</b> 2 priors, and per class one fraction per colour and per petal count, each = count ÷ total. "No need to prove that these are the MLEs", so the counts are the answer.`,
          remember: R`\[\hat P = \frac{\text{count}}{\text{total}}\]<p>The MLE of a probability. Prior: class count ÷ all samples. \(p(x_t = a \mid y = j)\): count inside class \(j\)'s rows ÷ class \(j\)'s size. Not on the sheet in this form: [sheet: Class prior] only says \(\pi_j = P(Y = j)\); closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates].</p>`,
          extra: [{ label: "where count ÷ total comes from (the 6 MLE lines, not needed here)", html: R`<p>The same 6 lines as every MLE (2026-B Q4.1), shown for A's petal shares. Every other group (the priors, the colours, B's petals) works the same way.</p>
<p><b>1. One sample</b> (flower \(i\): prior × one factor per feature, naive):</p>
\[P(y_i, x_i) = \pi_{y_i}\cdot p(x_{i1} \mid y_i)\cdot p(x_{i2} \mid y_i)\]
<p>e.g. flower 1 (p, 3, A): \(\pi_\mathrm{A}\cdot p(x_1 = \mathrm{p} \mid \mathrm{A})\cdot p(x_2 = 3 \mid \mathrm{A})\).</p>
<p><b>2. All samples</b> (independent → multiply, collect powers). A's petals: 2 flowers with 3, 4 with 4, 2 with 5:</p>
\[\begin{aligned}L = \cdots\;&p(x_2 = 3 \mid \mathrm{A})^{2}\\ \cdot\;&p(x_2 = 4 \mid \mathrm{A})^{4}\\ \cdot\;&p(x_2 = 5 \mid \mathrm{A})^{2}\;\cdots\end{aligned}\]
<p><b>3. The log-likelihood</b> (log → sum, powers come down):</p>
\[\begin{aligned}\ell = \cdots\;&+ 2\log p(x_2 = 3 \mid \mathrm{A})\\ &+ 4\log p(x_2 = 4 \mid \mathrm{A})\\ &+ 2\log p(x_2 = 5 \mid \mathrm{A}) + \cdots\end{aligned}\]
<p><b>4. Split:</b> these three shares appear nowhere else, and they add to 1, so</p>
\[p(x_2 = 5 \mid \mathrm{A}) = 1 - p(x_2 = 3 \mid \mathrm{A}) - p(x_2 = 4 \mid \mathrm{A})\]
<p><b>5. Derivative by each, set to 0</b> (the last log's derivative comes with a minus, chain rule):</p>
\[\begin{aligned}\frac{2}{p(x_2 = 3 \mid \mathrm{A})} &= \frac{2}{p(x_2 = 5 \mid \mathrm{A})}\\ \frac{4}{p(x_2 = 4 \mid \mathrm{A})} &= \frac{2}{p(x_2 = 5 \mid \mathrm{A})}\end{aligned}\]
<p>So the three shares are in the ratio of their counts, 2 : 4 : 2, and add to 1: \(\tfrac28, \tfrac48, \tfrac28\). Count ÷ total.</p>
<p><b>6. A maximum:</b> every term is count × log, and each second derivative (e.g. \(-\tfrac{2}{p(x_2 = 3 \mid \mathrm{A})^2} - \tfrac{2}{p(x_2 = 5 \mid \mathrm{A})^2}\)) is \(\lt 0\).</p>` }] },
        { line: R`<b>Priors</b> — the class's flowers ÷ all 20 flowers; A = samples 1–8, B = samples 9–20: <div class="formula">\[\begin{aligned}\pi_\mathrm{A} &= \frac{\text{A flowers}}{\text{all flowers}} = \frac{8}{20} = 0.4\\ \pi_\mathrm{B} &= \frac{\text{B flowers}}{\text{all flowers}} = \frac{12}{20} = 0.6\end{aligned}\]</div>`,
          why: R`<p>[sheet: Class prior] says \(\pi_j = P(Y = j)\), the fraction of all flowers that are class \(j\).</p>` },
        { line: R`<b>Colour and petals, per class</b> — the formula, then count inside A's 8 rows and B's 12 rows only: <div class="formula">\[p(x_t = a \mid y = j) = \frac{\text{class-}j\text{ flowers with } x_t = a}{\text{class-}j\text{ flowers}}\]</div><div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\;(\div 8)\)</th><th>\(y = \mathrm{B}\;(\div 12)\)</th></tr></thead><tbody>
<tr><td>\(p(x_1 = \mathrm{p} \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{8}{12} \approx 0.667\)</td></tr>
<tr><td>\(p(x_1 = \mathrm{r} \mid y)\)</td><td>\(\dfrac68 = 0.75\)</td><td>\(\dfrac{4}{12} \approx 0.333\)</td></tr>
<tr><td>\(p(x_2 = 3 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{6}{12} = 0.5\)</td></tr>
<tr><td>\(p(x_2 = 4 \mid y)\)</td><td>\(\dfrac48 = 0.5\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr>
<tr><td>\(p(x_2 = 5 \mid y)\)</td><td>\(\dfrac28 = 0.25\)</td><td>\(\dfrac{3}{12} = 0.25\)</td></tr></tbody></table></div>Done.`,
          why: R`<p>A: purple = samples 1, 2; red = 3–8. 3 petals = 1, 3; 4 petals = 4–7; 5 petals = 2, 8.<br>B: purple = 9–16; red = 17–20. 3 petals = 9–13 and 17; 4 petals = 14–16; 5 petals = 18–20.</p>
<p>"Unordered / multinomial" only means each petal number is its own category: just count it. Check: inside one class, each feature adds to 1 (\(0.25 + 0.75 = 1\)).</p>` },
      ],
      compare: R`Step 2 is the official first line, step 3 the other ten numbers. Same values. (The official solution, like the question, skips the MLE proof; step 1's extra has it.)`,
    },

    "2025A-q5.2": {
      point: R`<p>Bayes' rule looks scary, but it says one thing: <b>of all flowers that look like \(x\), what share is A?</b></p>
<p><b>1. What the question asks.</b> "Posterior" = \(p(y \mid x)\): we see the flower's colour and petals; how likely is each species? "MAP" = predict the more likely one.</p>
<p><b>2. The picture.</b> Line up every flower that looks like \(x\). Some are A, some are B:</p><div class="fig"><svg viewBox="0 0 520 160" width="520" role="img" aria-label="A bar made of joint A and joint B; the posterior is A's share of the bar"><rect x="40" y="60" width="154.0" height="40" style="fill:var(--accent-soft);stroke:var(--accent)"/><rect x="194.0" y="60" width="286.0" height="40" style="fill:var(--panel);stroke:var(--muted)"/><text x="117.0" y="85.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">joint A</text><text x="337.0" y="85.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">joint B</text><path d="M40,52 L40,44 L480,44 L480,52" fill="none" style="stroke:var(--muted)"/><text x="260.0" y="36.0" font-size="13" text-anchor="middle" fill="currentColor">all flowers that look like x = joint A + joint B = p(x)</text><text x="40.0" y="124.0" font-size="12" text-anchor="start" fill="currentColor">joint A = share of ALL flowers that are A and look like x</text><text x="40.0" y="144.0" font-size="12" text-anchor="start" fill="currentColor">posterior of A = A's piece ÷ the whole bar  (sizes here made up)</text></svg></div>
<p><b>3. Why a piece = prior × part 1's numbers.</b> The share of all flowers that are A <i>and</i> look like \(x\) = (share that are A) × (share of the A's that look like \(x\)) = \(\pi_\mathrm{A}\cdot p(x \mid \mathrm{A})\): the joint. "Naive" = inside a class, colour and petals are treated as independent, so \(p(x \mid \mathrm{A})\) = colour share × petal share: part 1's two numbers multiplied. Every lookalike is A or B, so the whole bar \(p(x)\) = joint A + joint B.</p>
<p><b>So:</b> per sample, 2 joints, add them, each ÷ the sum. The bigger posterior = the MAP prediction.</p>`,
      start: R`<p><b>Key idea:</b> posterior = joint ÷ the sum of the joints (the marginal), with joint = prior × likelihood, and the naive likelihood = part 1's two fractions multiplied. MAP = the class with the bigger posterior.</p>
<p><b>Part 1's model:</b> \(\pi_\mathrm{A} = 0.4,\ \pi_\mathrm{B} = 0.6\) and the ten class conditionals \(p(x_t = a \mid y)\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Sample 21</b> (\(x_1 = \mathrm{p},\ x_2 = 5\))</p>
<p><b>Likelihoods (naive: one factor per feature):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(x_1 = \mathrm{p} \mid \mathrm{A})\cdot p(x_2 = 5 \mid \mathrm{A})\\ &= \square\\ p(x \mid y = \mathrm{B}) &= p(x_1 = \mathrm{p} \mid \mathrm{B})\cdot p(x_2 = 5 \mid \mathrm{B})\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → □</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Sample 22</b> (\(x_1 = \mathrm{r},\ x_2 = 3\))</p>
<p><b>Likelihoods (naive: one factor per feature):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(x_1 = \mathrm{r} \mid \mathrm{A})\cdot p(x_2 = 3 \mid \mathrm{A})\\ &= \square\\ p(x \mid y = \mathrm{B}) &= p(x_1 = \mathrm{r} \mid \mathrm{B})\cdot p(x_2 = 3 \mid \mathrm{B})\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → □</p>`,
      answer: R`<p><b>Key idea:</b> posterior = joint ÷ the sum of the joints (the marginal), with joint = prior × likelihood, and the naive likelihood = part 1's two fractions multiplied. MAP = the class with the bigger posterior.</p>
<p><b>Part 1's model:</b> \(\pi_\mathrm{A} = 0.4,\ \pi_\mathrm{B} = 0.6\) and the ten class conditionals \(p(x_t = a \mid y)\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Sample 21</b> (\(x_1 = \mathrm{p},\ x_2 = 5\))</p>
<p><b>Likelihoods (naive: one factor per feature):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(x_1 = \mathrm{p} \mid \mathrm{A})\cdot p(x_2 = 5 \mid \mathrm{A})\\ &= 0.25\cdot 0.25 = 0.0625\\ p(x \mid y = \mathrm{B}) &= p(x_1 = \mathrm{p} \mid \mathrm{B})\cdot p(x_2 = 5 \mid \mathrm{B})\\ &= \tfrac23\cdot 0.25 = \tfrac16 \approx 0.1667\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= 0.4\cdot 0.0625 = 0.025\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= 0.6\cdot\tfrac16 = 0.1\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &= 0.025 + 0.1 = 0.125\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.025}{0.125} = 0.2\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.1}{0.125} = 0.8\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → <b>B</b> (0.8 \(\gt\) 0.2)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Sample 22</b> (\(x_1 = \mathrm{r},\ x_2 = 3\))</p>
<p><b>Likelihoods (naive: one factor per feature):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(x_1 = \mathrm{r} \mid \mathrm{A})\cdot p(x_2 = 3 \mid \mathrm{A})\\ &= 0.75\cdot 0.25 = 0.1875\\ p(x \mid y = \mathrm{B}) &= p(x_1 = \mathrm{r} \mid \mathrm{B})\cdot p(x_2 = 3 \mid \mathrm{B})\\ &= \tfrac13\cdot 0.5 = \tfrac16 \approx 0.1667\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= 0.4\cdot 0.1875 = 0.075\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= 0.6\cdot\tfrac16 = 0.1\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &= 0.075 + 0.1 = 0.175\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.075}{0.175} = \tfrac37 \approx 0.429\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.1}{0.175} = \tfrac47 \approx 0.571\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → <b>B</b> (0.571 \(\gt\) 0.429)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Each class's posterior \(p(y \mid x)\), then MAP = the bigger one. Per sample: likelihood (part 1's two fractions multiplied) → joint (× prior) → marginal (sum of joints) → posterior.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>Bayes' rule: posterior = joint (prior × likelihood) ÷ the sum of the joints. Naive = features independent inside a class, so multiply. MAP = the class with the biggest posterior. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          why: R`<p><b>Joint</b> = the fraction of flowers that are A <b>and</b> look like \(x\) = (fraction that is A) × (fraction of the A's that look like \(x\)) = \(\pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\).</p>
<p><b>Naive</b> = inside one class the features are treated as independent, so \(p(x \mid y = \mathrm{A}) = p(x_1 \mid \mathrm{A})\cdot p(x_2 \mid \mathrm{A})\): part 1's two numbers multiplied. [sheet: Class conditional probability (Likelihood)]</p>
<p><b>Divide by the sum:</b> every flower that looks like \(x\) is A or B, so \(p(x)\) = joint A + joint B.</p>`,
          extra: [{ label: "can I write P(A | p, 5) = P(A)·P(p | A)·P(5 | A)?", html: R`<p><b>Not with "=".</b> The right side is the <b>joint</b>, \(P(A,\ x_1 = \mathrm{p},\ x_2 = 5)\), not the posterior. For sample 21 it's 0.025, and 0.025 isn't the probability of A (the two classes' numbers, 0.025 and 0.1, don't add up to 1).</p>
<p><b>Two correct ways to write it:</b></p>
\[P(A \mid \mathrm{p}, 5) \;\propto\; P(A)\,P(\mathrm{p} \mid A)\,P(5 \mid A)\]
<p>("∝" = proportional to: the same up to a number that's equal for both classes), or with the division:</p>
\[\begin{aligned}&P(A \mid \mathrm{p}, 5)\\ &= \frac{P(A)P(\mathrm{p} \mid A)P(5 \mid A)}{P(A)P(\mathrm{p} \mid A)P(5 \mid A) + P(B)P(\mathrm{p} \mid B)P(5 \mid B)}\end{aligned}\]
<p><b>When does the division matter?</b> For the MAP decision alone, comparing the joints is enough (the bottom is the same for A and B). But this question says "compute the posterior probability", so divide: \(0.025 / 0.125 = 0.2\).</p>` }] },
        { line: R`<b>Likelihoods</b> — naive: \(p(x \mid y) = p(x_1 \mid y)\cdot p(x_2 \mid y)\), part 1's two fractions multiplied: <div class="tw"><table><thead><tr><th>sample</th><th>\(p(x \mid y = \mathrm{A})\)</th><th>\(p(x \mid y = \mathrm{B})\)</th></tr></thead><tbody>
<tr><td>21 (p, 5)</td><td>\(0.25\cdot 0.25 = 0.0625\)</td><td>\(\tfrac23\cdot 0.25 = \tfrac16\)</td></tr>
<tr><td>22 (r, 3)</td><td>\(0.75\cdot 0.25 = 0.1875\)</td><td>\(\tfrac13\cdot 0.5 = \tfrac16\)</td></tr></tbody></table></div>`,
          why: R`<p>Sample 21 is purple with 5 petals, so for A: \(p(x_1 = \mathrm{p} \mid \mathrm{A}) = 0.25\) and \(p(x_2 = 5 \mid \mathrm{A}) = 0.25\) from part 1's table; for B: \(\tfrac23\) and 0.25.</p>` },
        { line: R`<b>Joints</b> — prior × likelihood, \(p(y, x) = \pi_y\cdot p(x \mid y)\): <div class="tw"><table><thead><tr><th>sample</th><th>\(p(y = \mathrm{A}, x)\)</th><th>\(p(y = \mathrm{B}, x)\)</th></tr></thead><tbody>
<tr><td>21</td><td>\(0.4\cdot 0.0625 = 0.025\)</td><td>\(0.6\cdot\tfrac16 = 0.1\)</td></tr>
<tr><td>22</td><td>\(0.4\cdot 0.1875 = 0.075\)</td><td>\(0.6\cdot\tfrac16 = 0.1\)</td></tr></tbody></table></div>` },
        { line: R`<b>Marginal and posteriors</b> — \(p(x)\) = the sum of the two joints; each posterior = its joint ÷ \(p(x)\): <div class="tw"><table><thead><tr><th>sample</th><th>\(p(x)\)</th><th>\(p(y = \mathrm{A} \mid x)\)</th><th>\(p(y = \mathrm{B} \mid x)\)</th></tr></thead><tbody>
<tr><td>21</td><td>\(0.025 + 0.1 = 0.125\)</td><td>\(\tfrac{0.025}{0.125} = 0.2\)</td><td>\(\tfrac{0.1}{0.125} = 0.8\)</td></tr>
<tr><td>22</td><td>\(0.075 + 0.1 = 0.175\)</td><td>\(\tfrac{0.075}{0.175} \approx 0.429\)</td><td>\(\tfrac{0.1}{0.175} \approx 0.571\)</td></tr></tbody></table></div>`,
          why: R`<p>Posteriors add to 1 (\(\tfrac37 + \tfrac47 = 1\)); joints don't. Report the posteriors, not the joints.</p>` },
        { line: R`<b>MAP</b> — the bigger posterior: sample 21 → <b>B</b> (0.8 \(\gt\) 0.2), sample 22 → <b>B</b> (0.571 \(\gt\) 0.429). Done.` },
      ],
      compare: R`Steps 2–5 are the official lines with the same numbers (it writes each joint in one line, prior × both fractions): both samples → B.`,
    },

    "2025A-q5.3": {
      point: R`<p>Work backwards: don't try flowers at random. <b>Part 1's table tells you where A beats B.</b></p>
<p><b>1. What the question asks.</b> Both test samples came out B, so "the other species" = A. Find a colour + petal count whose MAP is A (joint A \(\gt\) joint B), and show it with numbers.</p>
<p><b>2. The picture: three factors each.</b> Joint = prior × colour share × petal share, and A's product has to beat B's. A starts behind: prior 0.4 vs 0.6, so B is ahead ×1.5. The two shares must make that up.</p>
<p><b>3. Why red and 4 petals.</b> Compare A's number with B's in part 1, one factor at a time. Red: 0.75 vs 0.333, A ahead ×2.25 (purple goes B's way). 4 petals: 0.5 vs 0.25, A ahead ×2 (3 favours B, 5 is a tie). Together A is ahead ×4.5 on the shares, more than B's ×1.5 head start.</p>
<p><b>So:</b> take \(x = (\mathrm{red}, 4)\), compute both joints and posteriors as in part 2, and show A's is bigger. (Any combination where A wins gets the points; this one wins by the most.)</p>`,
      start: R`<p><b>Key idea:</b> A's prior is smaller (0.4 vs 0.6), so pick the colour and petal count where A's part-1 shares beat B's the most: red (0.75 vs 0.333) and 4 petals (0.5 vs 0.25). Then A's joint, and so its posterior, is bigger.</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Take the flower</b> \(x = (x_1 = \square,\ x_2 = \square)\)</p>
<p><b>Likelihoods (naive: one factor per feature):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(x_1 = \square \mid \mathrm{A})\cdot p(x_2 = \square \mid \mathrm{A})\\ &= \square\\ p(x \mid y = \mathrm{B}) &= p(x_1 = \square \mid \mathrm{B})\cdot p(x_2 = \square \mid \mathrm{B})\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → □</p>`,
      answer: R`<p><b>Key idea:</b> A's prior is smaller (0.4 vs 0.6), so pick the colour and petal count where A's part-1 shares beat B's the most: red (0.75 vs 0.333) and 4 petals (0.5 vs 0.25). Then A's joint, and so its posterior, is bigger.</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Take the flower</b> \(x = (x_1 = \mathrm{r},\ x_2 = 4)\)</p>
<p><b>Likelihoods (naive: one factor per feature):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(x_1 = \mathrm{r} \mid \mathrm{A})\cdot p(x_2 = 4 \mid \mathrm{A})\\ &= 0.75\cdot 0.5 = 0.375\\ p(x \mid y = \mathrm{B}) &= p(x_1 = \mathrm{r} \mid \mathrm{B})\cdot p(x_2 = 4 \mid \mathrm{B})\\ &= \tfrac13\cdot 0.25 = \tfrac{1}{12} \approx 0.0833\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= 0.4\cdot 0.375 = 0.15\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= 0.6\cdot\tfrac{1}{12} = 0.05\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &= 0.15 + 0.05 = 0.2\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.15}{0.2} = 0.75\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.05}{0.2} = 0.25\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → <b>A</b> (0.75 \(\gt\) 0.25)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> A flower whose MAP is A, shown with the four Bayes lines. A's prior is smaller (0.4 vs 0.6), so pick the colour and petal fractions where A wins.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>Bayes' rule: posterior = joint (prior × likelihood) ÷ the sum of the joints. Naive = features independent inside a class, so multiply. MAP = the class with the biggest posterior. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>Read part 1's table</b> — colour: red (A 0.75 vs B 0.333; purple goes the other way). Petals: 4 (A 0.5 vs B 0.25; 3 favours B, 5 is a tie). So \(x = (x_1 = \mathrm{r},\ x_2 = 4)\).` },
        { line: R`<b>Likelihoods and joints</b> — part 1's two fractions multiplied, then × the prior: <div class="formula">\[\begin{aligned}p(x \mid y = \mathrm{A}) &= 0.75\cdot 0.5 = 0.375\\ p(x \mid y = \mathrm{B}) &= \tfrac13\cdot 0.25 = \tfrac{1}{12}\\ p(y = \mathrm{A}, x) &= 0.4\cdot 0.375 = 0.15\\ p(y = \mathrm{B}, x) &= 0.6\cdot\tfrac{1}{12} = 0.05\end{aligned}\]</div>` },
        { line: R`<b>Marginal, posteriors, MAP</b> — \(p(x) = 0.15 + 0.05 = 0.2\), then each joint ÷ 0.2: <div class="formula">\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{0.15}{0.2} = 0.75\\ p(y = \mathrm{B} \mid x) &= \frac{0.05}{0.2} = 0.25\end{aligned}\]</div>MAP: the bigger posterior → <b>A</b>. Done.`,
          why: R`<p>(r, 5) works too: joints 0.075 vs 0.05, so A with posterior 0.6. You need only one.</p>` },
      ],
      compare: R`Same flower (r, 4) and the same numbers as the official solution (steps 3–4; it writes each joint in one line).`,
    },

    "2025A-q5.4": {
      point: R`<p>The likelihoods don't care which field the flowers came from. <b>Only the prior moves</b>, so make \(\pi_\mathrm{A}\) a letter and ask when each sample flips.</p>
<p><b>1. What the question asks.</b> "Predictions remain unchanged" = both samples still come out B. "Range of priors" = every \(\pi_\mathrm{A}\) (with \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\)) where that's true.</p>
<p><b>2. The picture.</b> For one sample, joint A = \(\pi_\mathrm{A}\) × (A's likelihood) is a straight line going up from 0; joint B = \((1 - \pi_\mathrm{A})\) × (B's likelihood) goes down to 0. They cross once, at the tie:</p><div class="fig"><svg viewBox="0 0 520 230" width="520" role="img" aria-label="Two straight lines in pi_A: joint A rises, joint B falls, they cross at the tie"><line x1="60" y1="190" x2="480" y2="190" style="stroke:var(--muted)"/><line x1="60" y1="190" x2="60" y2="25" style="stroke:var(--muted)"/><rect x="60" y="30" width="197.6" height="160" style="fill:var(--accent-soft)" opacity="0.6"/><line x1="60.0" y1="190.0" x2="480.0" y2="40.0" style="stroke:var(--shaky)" stroke-width="2.5"/><line x1="60.0" y1="56.7" x2="480.0" y2="190.0" style="stroke:var(--accent)" stroke-width="2.5"/><text x="476.0" y="32.0" font-size="12" text-anchor="end" fill="currentColor">joint A = π<tspan baseline-shift="sub" font-size="9">A</tspan> × A's likelihood</text><text x="66.0" y="48.7" font-size="12" text-anchor="start" fill="currentColor">joint B = (1 − π<tspan baseline-shift="sub" font-size="9">A</tspan>) × B's likelihood</text><circle cx="257.6" cy="119.4" r="5" style="fill:var(--fail)"/><line x1="257.6" y1="119.4" x2="257.6" y2="190" style="stroke:var(--fail)" stroke-dasharray="4 3"/><text x="261.6" y="206.0" font-size="12" text-anchor="start" fill="currentColor" font-weight="700">← tie: solve for this π<tspan baseline-shift="sub" font-size="9">A</tspan></text><text x="158.8" y="178.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">B wins</text><text x="387.6" y="140.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">A wins</text><text x="60.0" y="206.0" font-size="12" text-anchor="middle" fill="currentColor">0</text><text x="480.0" y="206.0" font-size="12" text-anchor="middle" fill="currentColor">1</text><line x1="228.0" y1="190" x2="228.0" y2="195" style="stroke:var(--muted)"/><text x="232.0" y="206.0" font-size="12" text-anchor="end" fill="currentColor">0.4 (now)</text><text x="480.0" y="224.0" font-size="12" text-anchor="end" fill="currentColor">π<tspan baseline-shift="sub" font-size="9">A</tspan> →</text><text x="60.0" y="18.0" font-size="12" text-anchor="start" fill="currentColor">sample 22, as π<tspan baseline-shift="sub" font-size="9">A</tspan> slides from 0 to 1</text></svg></div>
<p><b>3. Why the smaller tie point.</b> Left of its tie, a sample is B. Each sample has its own tie; both must stay B, so \(\pi_\mathrm{A}\) must be left of both = below the smaller one. The close sample (22: 0.571 vs 0.429 in part 2) ties first. Going down to 0 is safe: less \(\pi_\mathrm{A}\) only helps B.</p>
<p><b>So:</b> per sample, solve "joint A \(\lt\) joint B" for \(\pi_\mathrm{A}\) (part 1's likelihoods, not the old prior), keep the smaller bound, and \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\).</p>`,
      start: R`<p><b>Key idea:</b> only the prior changes. A sample stays B while \(\pi_\mathrm{A}\,p(x \mid \mathrm{A}) \lt (1 - \pi_\mathrm{A})\,p(x \mid \mathrm{B})\); a smaller \(\pi_\mathrm{A}\) only helps B, so the range is \(\pi_\mathrm{A}\) below the smaller of the two tie points.</p>
<p><b>Likelihoods</b> (part 1's two fractions multiplied):</p>
\[\begin{aligned}\text{21: }\ p(x \mid \mathrm{A}) &= \square\\ p(x \mid \mathrm{B}) &= \square\\ \text{22: }\ p(x \mid \mathrm{A}) &= \square\\ p(x \mid \mathrm{B}) &= \square\end{aligned}\]
<p><b>Priors:</b> only two classes, so \(\pi_\mathrm{A} + \pi_\mathrm{B} = 1\), i.e. \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\)</p>
<p><b>Sample 21 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\square &\lt (1 - \pi_\mathrm{A})\cdot\square\\ \iff \square\,\pi_\mathrm{A} &\lt \square - \square\,\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \square\end{aligned}\]
<p><b>Sample 22 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\square &\lt (1 - \pi_\mathrm{A})\cdot\square\\ \iff \square\,\pi_\mathrm{A} &\lt \square - \square\,\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \square\end{aligned}\]
<p><b>Both hold</b> (a smaller \(\pi_\mathrm{A}\) only helps B):</p>
\[\begin{aligned}0 \le\ &\pi_\mathrm{A} \lt \square\\ \square \lt\ &\pi_\mathrm{B} = 1 - \pi_\mathrm{A} \le 1\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> only the prior changes. A sample stays B while \(\pi_\mathrm{A}\,p(x \mid \mathrm{A}) \lt (1 - \pi_\mathrm{A})\,p(x \mid \mathrm{B})\); a smaller \(\pi_\mathrm{A}\) only helps B, so the range is \(\pi_\mathrm{A}\) below the smaller of the two tie points.</p>
<p><b>Likelihoods</b> (part 1's two fractions multiplied):</p>
\[\begin{aligned}\text{21: }\ p(x \mid \mathrm{A}) &= 0.25 \cdot 0.25 = \tfrac{1}{16}\\ p(x \mid \mathrm{B}) &= \tfrac23 \cdot 0.25 = \tfrac16\\ \text{22: }\ p(x \mid \mathrm{A}) &= 0.75 \cdot 0.25 = \tfrac{3}{16}\\ p(x \mid \mathrm{B}) &= \tfrac13 \cdot 0.5 = \tfrac16\end{aligned}\]
<p><b>Priors:</b> only two classes, so \(\pi_\mathrm{A} + \pi_\mathrm{B} = 1\), i.e. \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\)</p>
<p><b>Sample 21 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\tfrac{1}{16} &\lt (1 - \pi_\mathrm{A})\cdot\tfrac16\\ \iff 3\pi_\mathrm{A} &\lt 8 - 8\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \tfrac{8}{11} \approx 0.727\end{aligned}\]
<p><b>Sample 22 stays B while</b></p>
\[\begin{aligned}\pi_\mathrm{A}\cdot\tfrac{3}{16} &\lt (1 - \pi_\mathrm{A})\cdot\tfrac16\\ \iff 9\pi_\mathrm{A} &\lt 8 - 8\pi_\mathrm{A}\\ \iff \pi_\mathrm{A} &\lt \tfrac{8}{17} \approx 0.471\end{aligned}\]
<p><b>Both hold</b> (a smaller \(\pi_\mathrm{A}\) only helps B):</p>
\[\begin{aligned}0 \le\ &\pi_\mathrm{A} \lt \tfrac{8}{17} \approx 0.471\\ \tfrac{9}{17} \approx 0.529 \lt\ &\pi_\mathrm{B} = 1 - \pi_\mathrm{A} \le 1\end{aligned}\]`,
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
        { line: R`<b>Both must hold</b> — keep the smaller bound; a smaller \(\pi_\mathrm{A}\) only helps B: <div class="formula">\[\begin{aligned}0 \le\ &\pi_\mathrm{A} \lt \tfrac{8}{17} \approx 0.471\\ \tfrac{9}{17} \approx 0.529 \lt\ &\pi_\mathrm{B} = 1 - \pi_\mathrm{A} \le 1\end{aligned}\]</div>Done.`,
          why: R`<p>Sample 22 was the close one (0.571 : 0.429), so it flips first. At \(\pi_\mathrm{A} = \tfrac{8}{17}\) both joints are \(\tfrac{3}{34}\): a tie.</p>` },
      ],
      compare: R`Step 5 is the official answer. It gets \(\tfrac{8}{17}\) straight from sample 22 with the ratio \(\pi_\mathrm{A} : \pi_\mathrm{B} = \tfrac16 : \tfrac{3}{16} = 8 : 9\) — the tie point of step 4.`,
    },

    "2025A-q5.5": {
      point: R`<p>MAP treats every mistake the same. Here mistakes have prices, so <b>each posterior gets weighed by what it costs to be wrong about it.</b></p>
<p><b>1. Reading the costs.</b></p>
<p>· Classifying as B when it's actually A costs \(\lambda_\mathrm{BA} = 2\).</p>
<p>· Classifying as A when it's actually B costs \(\lambda_\mathrm{AB} = 1\).</p>
<p>· Being right costs 0.</p>
<p><b>The method: classifying = a bet. For each bet, write both ways the truth can turn out.</b> Classifying sample 21 as A is a bet on A. That bet is right with chance 0.2 (costs 0) and wrong with chance 0.8 (it's actually B: costs 1). Expected cost \(= 0.2\cdot 0 + 0.8\cdot 1 = 0.8\). The 0.2 is there, it just multiplies a 0.</p>
<p><b>2. What each answer costs: pay only when you're wrong.</b> Classify as A → you pay only if it's <b>actually B</b>. So multiply the cost by the chance it's actually B, \(p(\mathrm{B} \mid x)\) — the <i>other</i> class's posterior, not A's. Classify as B → pay \(\lambda_\mathrm{BA}\) times the chance it's actually A.</p>
<p><b>The picture:</b> 10 flowers that look like sample 21; posteriors 0.2 / 0.8, so 2 are A and 8 are B. Call all 10 "A": wrong on the 8 B's, 1 each → 8, i.e. 0.8 per flower. Call all 10 "B": wrong on the 2 A's, 2 each → 4, i.e. 0.4 per flower.</p>
<p><b>3. Why it can differ from MAP.</b> MAP says A only when A's posterior is above ½. Here A's posterior counts double (\(\lambda_\mathrm{BA} = 2\)): saying A is cheaper once 2 × A's posterior beats 1 × B's, i.e. once A's posterior is above ⅓. Sample 21 (A at 0.2) is below that; sample 22 (A at \(\tfrac37\)) is between ⅓ and ½, where the two rules disagree.</p>
<p><b>So:</b> per sample, two numbers: cost × the <i>other</i> class's posterior (part 2's). Predict the cheaper one.</p>`,
      start: R`<p><b>Key idea:</b> you pay only when you're wrong: risk(classify as A) = (chance it's actually B) × \(\lambda_\mathrm{AB}\), risk(classify as B) = (chance it's actually A) × \(\lambda_\mathrm{BA}\). Predict the cheaper one; it can differ from MAP.</p>
<p><b>Sample 21</b> (posteriors from part 2):</p>
<p>Classifying as A: if it's actually A (chance \(\square\)) it costs 0; if it's actually B (chance \(\square\)) it costs \(\lambda_\mathrm{AB} = 1\) → \(\square\cdot 0 + \square\cdot 1 = \square\)</p>
<p>Classifying as B: if it's actually A (chance \(\square\)) it costs \(\lambda_\mathrm{BA} = 2\); if it's actually B (chance \(\square\)) it costs 0 → \(\square\cdot 2 + \square\cdot 0 = \square\)</p>
<p>Cheaper → \(\square\)</p>
<p><b>Sample 22</b> (posteriors from part 2):</p>
<p>Classifying as A: if it's actually A (chance \(\square\)) it costs 0; if it's actually B (chance \(\square\)) it costs \(\lambda_\mathrm{AB} = 1\) → \(\square\cdot 0 + \square\cdot 1 = \square\)</p>
<p>Classifying as B: if it's actually A (chance \(\square\)) it costs \(\lambda_\mathrm{BA} = 2\); if it's actually B (chance \(\square\)) it costs 0 → \(\square\cdot 2 + \square\cdot 0 = \square\)</p>
<p>Cheaper → \(\square\)</p>`,
      answer: R`<p><b>Key idea:</b> you pay only when you're wrong: risk(classify as A) = (chance it's actually B) × \(\lambda_\mathrm{AB}\), risk(classify as B) = (chance it's actually A) × \(\lambda_\mathrm{BA}\). Predict the cheaper one; it can differ from MAP.</p>
<p><b>Sample 21</b> (posteriors from part 2):</p>
<p>Classifying as A: if it's actually A (chance 0.2) it costs 0; if it's actually B (chance 0.8) it costs \(\lambda_\mathrm{AB} = 1\) → \(0.2\cdot 0 + 0.8\cdot 1 = 0.8\)</p>
<p>Classifying as B: if it's actually A (chance 0.2) it costs \(\lambda_\mathrm{BA} = 2\); if it's actually B (chance 0.8) it costs 0 → \(0.2\cdot 2 + 0.8\cdot 0 = 0.4\)</p>
<p>Cheaper → <b>B</b> (same as MAP)</p>
<p><b>Sample 22</b> (posteriors from part 2):</p>
<p>Classifying as A: if it's actually A (chance \(\tfrac37\)) it costs 0; if it's actually B (chance \(\tfrac47\)) it costs \(\lambda_\mathrm{AB} = 1\) → \(\tfrac37\cdot 0 + \tfrac47\cdot 1 = \tfrac47 \approx 0.571\)</p>
<p>Classifying as B: if it's actually A (chance \(\tfrac37\)) it costs \(\lambda_\mathrm{BA} = 2\); if it's actually B (chance \(\tfrac47\)) it costs 0 → \(\tfrac37\cdot 2 + \tfrac47\cdot 0 = \tfrac67 \approx 0.857\)</p>
<p>Cheaper → <b>A</b> (MAP said B)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> For each sample, the prediction with the smaller expected cost. Saying A is only wrong when the truth is B, so it costs \(\lambda_\mathrm{AB}\cdot p(\mathrm{B} \mid x)\); saying B costs \(\lambda_\mathrm{BA}\cdot p(\mathrm{A} \mid x)\). Posteriors: part 2.`,
          remember: R`\[\begin{aligned}&\text{risk of saying } y = \sum_{y'}\lambda_{y,y'}\,p(y' \mid x)\\ &\to\ \text{predict the smallest}\end{aligned}\]<p>[sheet: Expected risk of predicting class label y] has it with joints \(\pi_{y'}P(X = x \mid Y = y')\) instead of posteriors. Every one ÷ the same \(p(x)\), so the same winner.</p>`,
          why: R`<p>[sheet: Expected risk of predicting class label y] is \(\sum_{y'} \pi_{y'} P(X = x \mid Y = y')\,\lambda_{y,y'}\), one term per possible truth \(y'\). Being right costs 0, so only the other class's term is left.</p>
<p>The sheet uses joints (\(\pi \cdot P(x \mid y')\)); posteriors are those joints ÷ \(p(x)\), the same number for both predictions. So the winner is the same.</p>` },
        { line: R`<b>Read the costs</b> — classifying as B when it's actually A costs \(\lambda_\mathrm{BA} = 2\); classifying as A when it's actually B costs \(\lambda_\mathrm{AB} = 1\). (First letter = what you say, second = the truth.)` },
        { line: R`<b>Sample 21</b> — posteriors 0.2 (A), 0.8 (B) from part 2: <div class="formula">\[\begin{aligned}\text{as A (actually B): }& 0.8 \times 1 = 0.8\\ \text{as B (actually A): }& 0.2 \times 2 = 0.4\end{aligned}\]</div>Cheaper: <b>B</b> (same as MAP).`,
          why: R`<p>Classifying as A when it's actually B: the chance it's actually B is <b>0.8</b>, not 0.2. The 0.2 is the chance it's A, and then classifying as A is <b>right</b> and costs 0.</p>` },
        { line: R`<b>Sample 22</b> — posteriors \(\tfrac37\) (A), \(\tfrac47\) (B): <div class="formula">\[\begin{aligned}\text{as A (actually B): }& \dfrac47 \times 1 \approx 0.571\\ \text{as B (actually A): }& \dfrac37 \times 2 = \dfrac67 \approx 0.857\end{aligned}\]</div>Cheaper: <b>A</b>, although MAP said B. Done.`,
          why: R`<p>It's almost 50/50, and calling an A flower "B" costs double, so A is the safe answer.</p>`,
          extra: [{ label: "the official solution says 4/7 ≈ 0.429 — it's a slip", html: R`<p>\(\tfrac47 \approx 0.571\); 0.429 is \(\tfrac37\). The comparison still gives A: \(0.571 \lt 0.857\).</p>` }] },
      ],
      compare: R`Steps 3–4 are the official lines. Its slip: "\(\tfrac47 \approx 0.429\)" should be \(\approx 0.571\); the answer (A for sample 22) is unchanged.`,
      slip: R`Arithmetic slip: \(\tfrac47 \approx 0.571\), not 0.429 (that's \(\tfrac37\)). A still wins for sample 22, since \(0.571 \lt 0.857\).`,
    },

    // ═══════════════════════════════ 2025-C Q4 — the fish (full vs naive Bayes, ML, cost matrix)

    "2025C-q4.1": {
      point: R`<p>A reading trap, not a math one: <b>the table has 12 rows, but 100 fish.</b></p>
<p><b>1. What the question asks.</b> \(\pi_j\) = the share of all fish that are species \(j\). "Briefly explain" = say where your counts come from.</p>
<p><b>2. The picture.</b> Each row is a <b>group</b> of identical fish, and the last column says how many. The first row is 32 Armfish with both fins, not one fish. So Armfish isn't "4 rows": it's all the fish in its 4 rows, added.</p>
<p><b>3. Why ÷ 100.</b> A prior is count ÷ total, counted in samples, and a sample here is one fish. The "Total: 100" under the table is the sum of the last column.</p>
<p><b>So:</b> add each species' 4 counts, ÷ 100. Check: the three priors add to 1.</p>`,
      start: R`<p><b>Key idea:</b> each row is a group of fish and the last column counts them, so species \(j\) has (the sum of its 4 counts) fish. The MLE of the priors comes out as \(\pi_j\) = species \(j\)'s fish ÷ all 100 fish.</p>
<p><b>1. One sample</b> = one fish (its species is A, B or C):</p>
\[P(y = y_i) = \pi_{y_i}\]
<p><b>2. All samples</b> (independent → multiply, collect the powers = fish per species):</p>
\[\begin{aligned}n_\mathrm{A} &= \square + \square + \square + \square = \square\\ n_\mathrm{B} &= \square + \square + \square + \square = \square\\ n_\mathrm{C} &= \square + \square + \square + \square = \square\end{aligned}\]
\[L = \prod_{i=1}^{100}\pi_{y_i} = \pi_\mathrm{A}^{\,\square}\,\pi_\mathrm{B}^{\,\square}\,\pi_\mathrm{C}^{\,\square}\]
<p><b>3. The data log-likelihood</b> (log turns × into +, powers come down in front):</p>
\[\ell = \log L = \square\log\pi_\mathrm{A} + \square\log\pi_\mathrm{B} + \square\log\pi_\mathrm{C}\]
<p><b>4. Simplify:</b> the priors add to 1, so \(\pi_\mathrm{C} = 1 - \pi_\mathrm{A} - \pi_\mathrm{B}\):</p>
\[\begin{aligned}\ell = \;&\square\log\pi_\mathrm{A} + \square\log\pi_\mathrm{B}\\ &+ \square\log(1 - \pi_\mathrm{A} - \pi_\mathrm{B})\end{aligned}\]
<p><b>5. Derivative by each parameter, set to 0, solve:</b></p>
\[\begin{aligned}\frac{\partial\ell}{\partial\pi_\mathrm{A}} &= \frac{\square}{\pi_\mathrm{A}} - \frac{\square}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}} = 0\\ &\Rightarrow\; \pi_\mathrm{A} = \tfrac{\square}{\square}\,\pi_\mathrm{C}\\ \frac{\partial\ell}{\partial\pi_\mathrm{B}} &= \frac{\square}{\pi_\mathrm{B}} - \frac{\square}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}} = 0\\ &\Rightarrow\; \pi_\mathrm{B} = \tfrac{\square}{\square}\,\pi_\mathrm{C}\end{aligned}\]
<p>They add to 1:</p>
\[\begin{aligned}\pi_\mathrm{C}\cdot\frac{\square + \square + \square}{\square} &= 1\;\Rightarrow\; \pi_\mathrm{C}^* = \square\\ \pi_\mathrm{A}^* &= \square\\ \pi_\mathrm{B}^* &= \square\end{aligned}\]
<p><b>6. It's a maximum:</b></p>
\[\begin{aligned}\frac{\partial^2\ell}{\partial\pi_\mathrm{A}^2} &= -\frac{\square}{\pi_\mathrm{A}^2} - \frac{\square}{\pi_\mathrm{C}^2} \lt 0\\ \frac{\partial^2\ell}{\partial\pi_\mathrm{B}^2} &= -\frac{\square}{\pi_\mathrm{B}^2} - \frac{\square}{\pi_\mathrm{C}^2} \lt 0\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> each row is a group of fish and the last column counts them, so species \(j\) has (the sum of its 4 counts) fish. The MLE of the priors comes out as \(\pi_j\) = species \(j\)'s fish ÷ all 100 fish.</p>
<p><b>1. One sample</b> = one fish (its species is A, B or C):</p>
\[P(y = y_i) = \pi_{y_i}\]
<p><b>2. All samples</b> (independent → multiply, collect the powers = fish per species):</p>
\[\begin{aligned}n_\mathrm{A} &= 32 + 16 + 8 + 4 = 60\\ n_\mathrm{B} &= 5 + 15 + 1 + 3 = 24\\ n_\mathrm{C} &= 3 + 9 + 3 + 1 = 16\end{aligned}\]
\[L = \prod_{i=1}^{100}\pi_{y_i} = \pi_\mathrm{A}^{\,60}\,\pi_\mathrm{B}^{\,24}\,\pi_\mathrm{C}^{\,16}\]
<p><b>3. The data log-likelihood</b> (log turns × into +, powers come down in front):</p>
\[\ell = \log L = 60\log\pi_\mathrm{A} + 24\log\pi_\mathrm{B} + 16\log\pi_\mathrm{C}\]
<p><b>4. Simplify:</b> the priors add to 1, so \(\pi_\mathrm{C} = 1 - \pi_\mathrm{A} - \pi_\mathrm{B}\):</p>
\[\begin{aligned}\ell = \;&60\log\pi_\mathrm{A} + 24\log\pi_\mathrm{B}\\ &+ 16\log(1 - \pi_\mathrm{A} - \pi_\mathrm{B})\end{aligned}\]
<p><b>5. Derivative by each parameter, set to 0, solve:</b></p>
\[\begin{aligned}\frac{\partial\ell}{\partial\pi_\mathrm{A}} &= \frac{60}{\pi_\mathrm{A}} - \frac{16}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}} = 0\\ &\Rightarrow\; \pi_\mathrm{A} = \tfrac{60}{16}\,\pi_\mathrm{C}\\ \frac{\partial\ell}{\partial\pi_\mathrm{B}} &= \frac{24}{\pi_\mathrm{B}} - \frac{16}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}} = 0\\ &\Rightarrow\; \pi_\mathrm{B} = \tfrac{24}{16}\,\pi_\mathrm{C}\end{aligned}\]
<p>They add to 1:</p>
\[\begin{aligned}\pi_\mathrm{C}\cdot\frac{60 + 24 + 16}{16} &= 1\;\Rightarrow\; \pi_\mathrm{C}^* = \tfrac{16}{100} = 0.16\\ \pi_\mathrm{A}^* &= \tfrac{60}{100} = 0.6\\ \pi_\mathrm{B}^* &= \tfrac{24}{100} = 0.24\end{aligned}\]
<p><b>6. It's a maximum:</b></p>
\[\begin{aligned}\frac{\partial^2\ell}{\partial\pi_\mathrm{A}^2} &= -\frac{60}{\pi_\mathrm{A}^2} - \frac{16}{\pi_\mathrm{C}^2} \lt 0\\ \frac{\partial^2\ell}{\partial\pi_\mathrm{B}^2} &= -\frac{24}{\pi_\mathrm{B}^2} - \frac{16}{\pi_\mathrm{C}^2} \lt 0\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The priors that fit the data = their MLEs: one sample → multiply → log → derivative = 0 (2026-B Q4.1). Trap: each row is a <i>group</i> of fish; the last column counts them.`,
          remember: R`\[\ell(\theta) = \log\prod_{i} p(x_i;\theta) = \sum_{i}\log p(x_i;\theta)\]\[\log a^k = k\log a\]<p>The MLE recipe: independent samples → multiply; log (the product becomes a sum, powers come down); derivative; set to 0; solve. The result for priors is count ÷ total: [sheet: Class prior] only says \(\pi_j = P(Y = j)\); closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates]. Log rules on the extension sheet, if you get it: [sheet: Log of power].</p>` },
        { line: R`<b>Lines 1–2: one fish → all 100 fish</b> — one fish of species \(y_i\) has probability \(\pi_{y_i}\); independent, so multiply. Each species' \(\pi\) appears once per fish, so its power = its number of fish: <div class="formula">\[\begin{aligned}n_\mathrm{A} &= 32 + 16 + 8 + 4 = 60\\ n_\mathrm{B} &= 5 + 15 + 1 + 3 = 24\\ n_\mathrm{C} &= 3 + 9 + 3 + 1 = 16\\ L &= \pi_\mathrm{A}^{\,60}\,\pi_\mathrm{B}^{\,24}\,\pi_\mathrm{C}^{\,16}\end{aligned}\]</div>`,
          why: R`<p>The first row is 32 Armfish: 32 fish, each contributing a factor \(\pi_\mathrm{A}\), so \(\pi_\mathrm{A}^{32}\) from that row alone. All 4 A rows: \(\pi_\mathrm{A}^{32 + 16 + 8 + 4} = \pi_\mathrm{A}^{60}\). Counting rows instead (4 each) is the trap.</p>` },
        { line: R`<b>Lines 3–4: log, then use "they add to 1"</b> — powers come down in front; only two priors are free, \(\pi_\mathrm{C} = 1 - \pi_\mathrm{A} - \pi_\mathrm{B}\): <div class="formula">\[\begin{aligned}\ell = \;&60\log\pi_\mathrm{A} + 24\log\pi_\mathrm{B}\\ &+ 16\log(1 - \pi_\mathrm{A} - \pi_\mathrm{B})\end{aligned}\]</div>`,
          why: R`<p>Without the "add to 1" rule, making every \(\pi\) bigger would always raise \(\ell\): there'd be no top. Writing \(\pi_\mathrm{C}\) as "the rest" is the same trick as \(p\) and \(1 - p\) for a coin.</p>` },
        { line: R`<b>Lines 5–6: derivative = 0, solve, check</b> — by \(\pi_\mathrm{A}\) and by \(\pi_\mathrm{B}\), set to 0 (the minus: chain rule): <div class="formula">\[\begin{aligned}\frac{\partial\ell}{\partial\pi_\mathrm{A}} &= \frac{60}{\pi_\mathrm{A}} - \frac{16}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}} = 0\\ &\Rightarrow\; \pi_\mathrm{A} = \tfrac{60}{16}\,\pi_\mathrm{C}\\ \frac{\partial\ell}{\partial\pi_\mathrm{B}} &= \frac{24}{\pi_\mathrm{B}} - \frac{16}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}} = 0\\ &\Rightarrow\; \pi_\mathrm{B} = \tfrac{24}{16}\,\pi_\mathrm{C}\end{aligned}\]</div>They add to 1: <div class="formula">\[\begin{aligned}\pi_\mathrm{C}\cdot\frac{60 + 24 + 16}{16} &= 1\;\Rightarrow\; \pi_\mathrm{C}^* = \tfrac{16}{100} = 0.16\\ \pi_\mathrm{A}^* &= \tfrac{60}{100} = 0.6\\ \pi_\mathrm{B}^* &= \tfrac{24}{100} = 0.24\end{aligned}\]</div>Second derivatives \(\lt 0\): a maximum. Done.`,
          why: R`<p><b>The minus:</b> the derivative of \(16\log(1 - \pi_\mathrm{A} - \pi_\mathrm{B})\) by \(\pi_\mathrm{A}\) is \(\frac{16}{1 - \pi_\mathrm{A} - \pi_\mathrm{B}}\cdot(-1)\) (chain rule: the inside's derivative is \(-1\)).</p>
<p><b>Solving:</b> \(\frac{60}{\pi_\mathrm{A}} = \frac{16}{\pi_\mathrm{C}}\) → \(\pi_\mathrm{A} = \tfrac{60}{16}\pi_\mathrm{C}\); same for B. Put both into \(\pi_\mathrm{A} + \pi_\mathrm{B} + \pi_\mathrm{C} = 1\): \(\pi_\mathrm{C}\big(\tfrac{60}{16} + \tfrac{24}{16} + 1\big) = \pi_\mathrm{C}\cdot\tfrac{100}{16} = 1\).</p>
<p><b>Line 6:</b> each \(\log\) term bends down (\(-\tfrac{a}{\pi^2}\)): \(\frac{\partial^2\ell}{\partial\pi_\mathrm{A}^2} = -\frac{60}{\pi_\mathrm{A}^2} - \frac{16}{\pi_\mathrm{C}^2} \lt 0\), same for B. Check: \(0.6 + 0.24 + 0.16 = 1\).</p>` },
      ],
      compare: R`Line 5's values are the official answer (0.6, 0.24, 0.16). The official solution writes count ÷ 100 directly; lines 1–4 and 6 show where that comes from. (Its line "Joint probability with class y = A" is a leftover heading; ignore it.)`,
      slip: R`Ignore the line "Joint probability with class y = A". It's a leftover heading; the three lines are just the priors.`,
    },

    "2025C-q4.2": {
      point: R`<p>With a count table, full Bayes is just: <b>look only at the fish that look like this one.</b></p>
<p><b>1. What the question asks.</b> The question says it itself: the posterior is the conditional probability \(p(y = j \mid X_1 = \text{yes}, X_2 = \text{no})\). Given that the fish has an upper fin and no lower fin, how likely is each species?</p>
<p><b>2. The picture.</b> Of the 100 fish, only the (yes, no) rows count:</p><div class="fig"><svg viewBox="0 0 520 130" width="520" role="img" aria-label="The fish with an upper fin and no lower fin, split by species"><rect x="40.0" y="50" width="176.0" height="40" style="fill:var(--accent-soft);stroke:var(--muted)"/><text x="128.0" y="75.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">16 A</text><rect x="216.0" y="50" width="165.0" height="40" style="fill:var(--shaky-bg);stroke:var(--muted)"/><text x="298.5" y="75.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">15 B</text><rect x="381.0" y="50" width="99.0" height="40" style="fill:var(--got-bg);stroke:var(--muted)"/><text x="430.5" y="75.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">9 C</text><path d="M40,42 L40,34 L480,34 L480,42" fill="none" style="stroke:var(--muted)"/><text x="260.0" y="26.0" font-size="12" text-anchor="middle" fill="currentColor">only the fish with upper = yes, lower = no (the table's (yes, no) rows)</text><text x="40.0" y="114.0" font-size="12" text-anchor="start" fill="currentColor">posterior of a species = its piece ÷ the whole bar</text></svg></div>
<p><b>3. Why Bayes' rule gives exactly this share.</b> "Full" = \(p(x \mid j)\) counts the whole \(x\) at once: species \(j\)'s (yes, no) fish ÷ all of species \(j\)'s fish. Joint = prior × that, e.g. A: \(\tfrac{60}{100}\cdot\tfrac{16}{60}\). The 60 cancels, leaving \(\tfrac{16}{100}\) = the share of all fish that are A <i>and</i> look like \(x\). Dividing by the sum of the joints = dividing by all the (yes, no) fish.</p>
<p><b>So:</b> write the Bayes' rule lines the grader wants (prior × \(p(x \mid j)\), then each ÷ the sum): they are exactly these shares.</p>`,
      start: R`<p><b>Key idea:</b> full Bayes reads the (yes, no) row itself: \(p(x \mid y = j)\) = species \(j\)'s (yes, no) fish ÷ its fish. Posterior = joint ÷ the sum of the joints (the marginal), with joint = \(\pi_j\,p(x \mid y = j)\).</p>
<p><b>The fish:</b> \(x = (X_1 = \text{yes},\ X_2 = \text{no})\). <b>Part 1's priors:</b> \(\pi_\mathrm{A} = 0.6,\ \pi_\mathrm{B} = 0.24,\ \pi_\mathrm{C} = 0.16\).</p>
<p><b>Likelihoods (full Bayes: the whole \(x\) at once):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= \frac{\text{A fish with (yes, no)}}{\text{all A fish}} = \square\\ p(x \mid y = \mathrm{B}) &= \frac{\text{B fish with (yes, no)}}{\text{all B fish}} = \square\\ p(x \mid y = \mathrm{C}) &= \frac{\text{C fish with (yes, no)}}{\text{all C fish}} = \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \square\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> full Bayes reads the (yes, no) row itself: \(p(x \mid y = j)\) = species \(j\)'s (yes, no) fish ÷ its fish. Posterior = joint ÷ the sum of the joints (the marginal), with joint = \(\pi_j\,p(x \mid y = j)\).</p>
<p><b>The fish:</b> \(x = (X_1 = \text{yes},\ X_2 = \text{no})\). <b>Part 1's priors:</b> \(\pi_\mathrm{A} = 0.6,\ \pi_\mathrm{B} = 0.24,\ \pi_\mathrm{C} = 0.16\).</p>
<p><b>Likelihoods (full Bayes: the whole \(x\) at once):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= \frac{\text{A fish with (yes, no)}}{\text{all A fish}} = \frac{16}{60}\\ p(x \mid y = \mathrm{B}) &= \frac{\text{B fish with (yes, no)}}{\text{all B fish}} = \frac{15}{24}\\ p(x \mid y = \mathrm{C}) &= \frac{\text{C fish with (yes, no)}}{\text{all C fish}} = \frac{9}{16}\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= 0.6\cdot\tfrac{16}{60} = 0.16\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= 0.24\cdot\tfrac{15}{24} = 0.15\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= 0.16\cdot\tfrac{9}{16} = 0.09\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= 0.16 + 0.15 + 0.09 = 0.4\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.16}{0.4} = 0.4\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.15}{0.4} = 0.375\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \frac{0.09}{0.4} = 0.225\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(p(y = j \mid x)\) for each species. Bayes' rule, four lines: likelihood → joint (× prior) → marginal (sum of the joints) → posterior (joint ÷ marginal). Priors are part 1's, so start with the likelihoods.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]<p>Bayes' rule: posterior = joint ÷ the sum of the joints. Full Bayes gets \(p(x \mid y)\) by counting the whole \(x\): count ÷ class total (the MLE). Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          extra: [{ label: "the notation looks different from 2025-A Q5 — it's the same four things", html: R`<div class="tw"><table><thead><tr><th>what</th><th>2025-A Q5 writes</th><th>2025-C Q4 writes</th></tr></thead><tbody>
<tr><td>prior</td><td>\(\pi_\mathrm{A}\)</td><td>\(\pi_j\) (\(j\) = any species)</td></tr>
<tr><td>likelihood</td><td>\(p(x_1 = \mathrm{p} \mid y = \mathrm{A})\cdot p(x_2 = 5 \mid y = \mathrm{A})\)</td><td>\(p(X_1 = \text{yes}, X_2 = \text{no} \mid y = \mathrm{A})\)</td></tr>
<tr><td>joint</td><td>"Joint probability with class \(y = \mathrm{A}\)": \(\pi_\mathrm{A}\times\dots\)</td><td>\(p(y = \mathrm{A}, X_1 = \text{yes}, X_2 = \text{no})\)</td></tr>
<tr><td>sum of joints</td><td>"Marginal data probability"</td><td>\(p(X_1 = \text{yes}, X_2 = \text{no})\)</td></tr>
<tr><td>posterior</td><td>"Posterior probability for class \(y = \mathrm{A}\)"</td><td>\(p(y = \mathrm{A} \mid X_1 = \text{yes}, X_2 = \text{no})\)</td></tr></tbody></table></div>
<p><b>How to read it:</b> the comma = "and" (both together), the bar \(\mid\) = "given". So \(p(y = \mathrm{A}, X_1 = \text{yes}, X_2 = \text{no})\) = "the chance of an Armfish <i>and</i> these fins" = the joint; \(p(y = \mathrm{A} \mid \dots)\) = "the chance of Armfish <i>given</i> these fins" = the posterior. Here \(x\) is short for "\(X_1 = \text{yes}, X_2 = \text{no}\)".</p>
<p><b>Capital \(X_1\) vs small \(x_1\):</b> just each question's own column names. Same meaning.</p>
<p><b>The one real difference</b> is the model, not the notation: 2025-A was naive (likelihood = one factor per feature, multiplied); this part is <b>full</b> Bayes, so the likelihood is one count of the whole combination ("yes, no") together. Part 3 goes back to naive.</p>` }] },
        { line: R`<b>Likelihoods, full Bayes</b> — full = the whole \(x\) at once: the (yes, no) row's count ÷ that species' fish from part 1: <div class="formula">\[\begin{aligned}p(x \mid y = \mathrm{A}) &= \tfrac{16}{60}\\ p(x \mid y = \mathrm{B}) &= \tfrac{15}{24}\\ p(x \mid y = \mathrm{C}) &= \tfrac{9}{16}\end{aligned}\]</div>` },
        { line: R`<b>Joints</b> — prior × likelihood: <div class="formula">\[\begin{aligned}p(y = \mathrm{A}, x) &= \tfrac{60}{100}\cdot\tfrac{16}{60} = 0.16\\ p(y = \mathrm{B}, x) &= \tfrac{24}{100}\cdot\tfrac{15}{24} = 0.15\\ p(y = \mathrm{C}, x) &= \tfrac{16}{100}\cdot\tfrac{9}{16} = 0.09\end{aligned}\]</div>`,
          why: R`<p>The species total cancels, so each joint is just (fish of that species with these fins) ÷ 100.</p>` },
        { line: R`<b>Marginal, then posteriors</b> — \(p(x) = 0.16 + 0.15 + 0.09 = 0.4\); each joint ÷ 0.4: <div class="formula">\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \tfrac{0.16}{0.4} = 0.4\\ p(y = \mathrm{B} \mid x) &= \tfrac{0.15}{0.4} = 0.375\\ p(y = \mathrm{C} \mid x) &= \tfrac{0.09}{0.4} = 0.225\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official solution prints 0.9/0.4 — a typo", html: R`<p>It's \(\tfrac{0.09}{0.4} = 0.225\). The result 0.225 is right; only the numerator is mistyped.</p>` }] },
      ],
      compare: R`Steps 2–4 are the official lines. Its last line prints \(\tfrac{0.9}{0.4}\); it should be \(\tfrac{0.09}{0.4} = 0.225\).`,
      slip: R`Typo in the last line: it's \(\tfrac{0.09}{0.4} = 0.225\), not \(\tfrac{0.9}{0.4}\). The 0.225 is right.`,
    },

    "2025C-q4.3": {
      point: R`<p>Naive Bayes never reads the (yes, no) row. It looks at <b>one fin at a time</b>, then multiplies.</p>
<p><b>1. What the question asks.</b> The same three posteriors as part 2, but with the naive model: it assumes that inside one species, the upper fin says nothing about the lower fin.</p>
<p><b>2. The picture.</b> Each species' 4 rows form a 2×2 grid of counts. Full Bayes (part 2) reads one cell; naive reads a whole row and a whole column:</p><div class="fig"><svg viewBox="0 0 540 216" width="540" role="img" aria-label="Each species as a 2 by 2 grid of fin counts; naive reads a row and a column, full reads one cell"><text x="110.0" y="46.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">A (Armfish)</text><text x="85.0" y="68.0" font-size="11" text-anchor="middle" fill="currentColor">yes</text><text x="135.0" y="68.0" font-size="11" text-anchor="middle" fill="currentColor">no</text><text x="52.0" y="97.0" font-size="11" text-anchor="end" fill="currentColor">yes</text><text x="52.0" y="131.0" font-size="11" text-anchor="end" fill="currentColor">no</text><rect x="60" y="76" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><rect x="60" y="76" width="50" height="34" style="fill:var(--accent)" opacity="0.3"/><text x="85.0" y="98.0" font-size="13" text-anchor="middle" fill="currentColor">32</text><rect x="110" y="76" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><rect x="110" y="76" width="50" height="34" style="fill:var(--accent)" opacity="0.3"/><text x="135.0" y="98.0" font-size="13" text-anchor="middle" fill="currentColor">16</text><rect x="60" y="110" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><text x="85.0" y="132.0" font-size="13" text-anchor="middle" fill="currentColor">8</text><rect x="110" y="110" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><text x="135.0" y="132.0" font-size="13" text-anchor="middle" fill="currentColor">4</text><rect x="113" y="79" width="44" height="62" fill="none" style="stroke:var(--shaky)" stroke-width="2.5" stroke-dasharray="5 3"/><rect x="110" y="76" width="50" height="34" fill="none" style="stroke:var(--accent)" stroke-width="3"/><text x="280.0" y="46.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">B (Blofish)</text><text x="255.0" y="68.0" font-size="11" text-anchor="middle" fill="currentColor">yes</text><text x="305.0" y="68.0" font-size="11" text-anchor="middle" fill="currentColor">no</text><rect x="230" y="76" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><rect x="230" y="76" width="50" height="34" style="fill:var(--accent)" opacity="0.3"/><text x="255.0" y="98.0" font-size="13" text-anchor="middle" fill="currentColor">5</text><rect x="280" y="76" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><rect x="280" y="76" width="50" height="34" style="fill:var(--accent)" opacity="0.3"/><text x="305.0" y="98.0" font-size="13" text-anchor="middle" fill="currentColor">15</text><rect x="230" y="110" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><text x="255.0" y="132.0" font-size="13" text-anchor="middle" fill="currentColor">1</text><rect x="280" y="110" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><text x="305.0" y="132.0" font-size="13" text-anchor="middle" fill="currentColor">3</text><rect x="283" y="79" width="44" height="62" fill="none" style="stroke:var(--shaky)" stroke-width="2.5" stroke-dasharray="5 3"/><rect x="280" y="76" width="50" height="34" fill="none" style="stroke:var(--accent)" stroke-width="3"/><text x="450.0" y="46.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">C (Catfish)</text><text x="425.0" y="68.0" font-size="11" text-anchor="middle" fill="currentColor">yes</text><text x="475.0" y="68.0" font-size="11" text-anchor="middle" fill="currentColor">no</text><rect x="400" y="76" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><rect x="400" y="76" width="50" height="34" style="fill:var(--accent)" opacity="0.3"/><text x="425.0" y="98.0" font-size="13" text-anchor="middle" fill="currentColor">3</text><rect x="450" y="76" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><rect x="450" y="76" width="50" height="34" style="fill:var(--accent)" opacity="0.3"/><text x="475.0" y="98.0" font-size="13" text-anchor="middle" fill="currentColor">9</text><rect x="400" y="110" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><text x="425.0" y="132.0" font-size="13" text-anchor="middle" fill="currentColor">3</text><rect x="450" y="110" width="50" height="34" style="fill:var(--panel);stroke:var(--muted)"/><text x="475.0" y="132.0" font-size="13" text-anchor="middle" fill="currentColor">1</text><rect x="453" y="79" width="44" height="62" fill="none" style="stroke:var(--shaky)" stroke-width="2.5" stroke-dasharray="5 3"/><rect x="450" y="76" width="50" height="34" fill="none" style="stroke:var(--accent)" stroke-width="3"/><text x="8.0" y="18.0" font-size="12" text-anchor="start" fill="currentColor">rows = upper fin (yes / no) · columns = lower fin (yes / no) · cells = number of fish</text><rect x="20" y="155" width="14" height="14" style="fill:var(--accent);stroke:var(--muted)" opacity="0.4"/><text x="40.0" y="166.0" font-size="12" text-anchor="start" fill="currentColor">shaded row = upper = yes (naive, fin 1)</text><rect x="20" y="175" width="14" height="14" fill="none" style="stroke:var(--shaky)" stroke-width="2.5" stroke-dasharray="5 3"/><text x="40.0" y="186.0" font-size="12" text-anchor="start" fill="currentColor">dashed column = lower = no (naive, fin 2)</text><rect x="20" y="195" width="14" height="14" fill="none" style="stroke:var(--accent)" stroke-width="3"/><text x="40.0" y="206.0" font-size="12" text-anchor="start" fill="currentColor">thick cell = (yes, no) itself (full Bayes, part 2)</text></svg></div>
<p><b>3. Why multiply.</b> If the fins really were independent, "upper yes and lower no" would be (share with upper = yes) × (share with lower = no), like two separate coin flips. That's the naive assumption. So "upper = yes" = the shaded row (both cells added), "lower = no" = the dashed column, each ÷ the species' fish. When the fins aren't really independent, naive and full can give different numbers.</p>
<p><b>So:</b> two shares per species, joint = prior × both, then each ÷ the sum, exactly as in part 2.</p>`,
      start: R`<p><b>Key idea:</b> naive Bayes treats the fins as independent inside a species: \(p(x \mid y = j) = p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\), each share counted over all rows with that fin value. Then joint = \(\pi_j\,p(x \mid y = j)\), each ÷ the sum.</p>
<p><b>The fish:</b> \(x = (X_1 = \text{yes},\ X_2 = \text{no})\). <b>Part 1's priors:</b> \(\pi_\mathrm{A} = \tfrac35,\ \pi_\mathrm{B} = \tfrac{6}{25},\ \pi_\mathrm{C} = \tfrac{4}{25}\).</p>
<p><b>Likelihoods (naive: one factor per fin):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(X_1 = \text{yes} \mid \mathrm{A})\cdot p(X_2 = \text{no} \mid \mathrm{A})\\ &= \frac{\square + \square}{60}\cdot\frac{\square + \square}{60} = \square\\ p(x \mid y = \mathrm{B}) &= p(X_1 = \text{yes} \mid \mathrm{B})\cdot p(X_2 = \text{no} \mid \mathrm{B})\\ &= \frac{\square + \square}{24}\cdot\frac{\square + \square}{24} = \square\\ p(x \mid y = \mathrm{C}) &= p(X_1 = \text{yes} \mid \mathrm{C})\cdot p(X_2 = \text{no} \mid \mathrm{C})\\ &= \frac{\square + \square}{16}\cdot\frac{\square + \square}{16} = \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \square\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> naive Bayes treats the fins as independent inside a species: \(p(x \mid y = j) = p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\), each share counted over all rows with that fin value. Then joint = \(\pi_j\,p(x \mid y = j)\), each ÷ the sum.</p>
<p><b>The fish:</b> \(x = (X_1 = \text{yes},\ X_2 = \text{no})\). <b>Part 1's priors:</b> \(\pi_\mathrm{A} = \tfrac35,\ \pi_\mathrm{B} = \tfrac{6}{25},\ \pi_\mathrm{C} = \tfrac{4}{25}\).</p>
<p><b>Likelihoods (naive: one factor per fin):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(X_1 = \text{yes} \mid \mathrm{A})\cdot p(X_2 = \text{no} \mid \mathrm{A})\\ &= \frac{32 + 16}{60}\cdot\frac{16 + 4}{60} = \frac45\cdot\frac13\\ p(x \mid y = \mathrm{B}) &= p(X_1 = \text{yes} \mid \mathrm{B})\cdot p(X_2 = \text{no} \mid \mathrm{B})\\ &= \frac{5 + 15}{24}\cdot\frac{15 + 3}{24} = \frac56\cdot\frac34\\ p(x \mid y = \mathrm{C}) &= p(X_1 = \text{yes} \mid \mathrm{C})\cdot p(X_2 = \text{no} \mid \mathrm{C})\\ &= \frac{3 + 9}{16}\cdot\frac{9 + 1}{16} = \frac34\cdot\frac58\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \tfrac35\cdot\tfrac45\cdot\tfrac13 = \tfrac{4}{25} = 0.16\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \tfrac{6}{25}\cdot\tfrac56\cdot\tfrac34 = \tfrac{3}{20} = 0.15\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \tfrac{4}{25}\cdot\tfrac34\cdot\tfrac58 = \tfrac{3}{40} = 0.075\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= 0.16 + 0.15 + 0.075 = 0.385\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.16}{0.385} \approx 0.416\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.15}{0.385} \approx 0.390\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \frac{0.075}{0.385} \approx 0.195\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The same three posteriors as part 2, but naive: \(p(x \mid y = j)\) = \(p(X_1 = \text{yes} \mid j)\) × \(p(X_2 = \text{no} \mid j)\). Each factor looks at one fin only. Then joints, marginal, posteriors, as in part 2.`,
          remember: R`\[p(y \mid x) = \frac{\pi_y\,p(x \mid y)}{\sum_{y'}\pi_{y'}\,p(x \mid y')}\]\[p(x \mid y) = \prod_t p(x_t \mid y)\quad\text{(naive)}\]<p>Bayes' rule: posterior = joint ÷ the sum of the joints. Naive = features independent inside a class, and each \(p(x_t \mid y)\) = count ÷ class total (the MLE). Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          why: R`<p>"Naive" = inside one species the two fins are treated as independent, so \(p(\text{yes}, \text{no} \mid j) = p(X_1 = \text{yes} \mid j)\cdot p(X_2 = \text{no} \mid j)\).</p>` },
        { line: R`<b>Likelihoods: the six fractions</b> — each adds every row with that fin value, ÷ the species' fish: <div class="tw"><table><thead><tr><th></th><th>\(p(X_1 = \text{yes} \mid j)\)</th><th>\(p(X_2 = \text{no} \mid j)\)</th></tr></thead><tbody>
<tr><td>A</td><td>\(\dfrac{32 + 16}{60} = \dfrac45\)</td><td>\(\dfrac{16 + 4}{60} = \dfrac13\)</td></tr>
<tr><td>B</td><td>\(\dfrac{5 + 15}{24} = \dfrac56\)</td><td>\(\dfrac{15 + 3}{24} = \dfrac34\)</td></tr>
<tr><td>C</td><td>\(\dfrac{3 + 9}{16} = \dfrac34\)</td><td>\(\dfrac{9 + 1}{16} = \dfrac58\)</td></tr></tbody></table></div>The likelihood \(p(x \mid y = j)\) = the row's two fractions multiplied.`,
          why: R`<p>Upper = yes: the (yes, yes) and (yes, no) rows. Lower = no: the (yes, no) and (no, no) rows. Not just the single (yes, no) row — that would be full Bayes again.</p>` },
        { line: R`<b>Joints</b> — prior × both fractions: <div class="formula">\[\begin{aligned}p(y = \mathrm{A}, x) &= \tfrac35\cdot\tfrac45\cdot\tfrac13 = 0.16\\ p(y = \mathrm{B}, x) &= \tfrac{6}{25}\cdot\tfrac56\cdot\tfrac34 = 0.15\\ p(y = \mathrm{C}, x) &= \tfrac{4}{25}\cdot\tfrac34\cdot\tfrac58 = 0.075\end{aligned}\]</div>`,
          why: R`<p>The priors as fractions: \(0.6 = \tfrac35\), \(0.24 = \tfrac{6}{25}\), \(0.16 = \tfrac{4}{25}\). Multiply the tops together and the bottoms together: \(\tfrac{4}{25}\), \(\tfrac{3}{20}\), \(\tfrac{3}{40}\).</p>` },
        { line: R`<b>Marginal, then posteriors</b> — \(p(x) = 0.16 + 0.15 + 0.075 = 0.385\); each joint ÷ 0.385: <div class="formula">\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \tfrac{0.16}{0.385} \approx 0.416\\ p(y = \mathrm{B} \mid x) &= \tfrac{0.15}{0.385} \approx 0.390\\ p(y = \mathrm{C} \mid x) &= \tfrac{0.075}{0.385} \approx 0.195\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official solution says 0.194 for C", html: R`<p>\(0.075 / 0.385 = 0.19481\ldots\), which rounds to 0.195 (0.194 is cut off, not rounded). Either is fine for the grader.</p>` }] },
      ],
      compare: R`Steps 2–4 are the official lines. Its C posterior 0.194 is truncated; rounded it's 0.195.`,
      slip: R`\(0.075 / 0.385 = 0.1948\ldots\), which rounds to 0.195. The key's 0.194 is cut off, not rounded. Either is fine.`,
    },

    "2025C-q4.4": {
      point: R`<p>Nothing new to compute: <b>"predicted species" = the one with the biggest posterior.</b></p>
<p><b>1. What the question asks.</b> For each model, the MAP prediction, and whether the two names match. Parts 2 and 3 already have all six posteriors.</p>
<p><b>2. Why the biggest posterior.</b> The posterior is how likely each species is, given these fins. Guessing the most likely one is right most often. Parts 2 and 3 used different likelihoods, so they could name different species; here you check whether they do.</p>
<p><b>So:</b> read the biggest number in part 2 and in part 3, name the species, compare.</p>`,
      start: R`<p><b>Key idea:</b> the prediction (MAP) is the species with the biggest posterior, read from part 2 (full Bayes) and part 3 (naive Bayes).</p>
<p>\(x = (X_1 = \text{yes},\ X_2 = \text{no})\)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Full Bayes</b> (part 2)</p>
<p><b>Posteriors:</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \square\\ p(y = \mathrm{B} \mid x) &= \square\\ p(y = \mathrm{C} \mid x) &= \square\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → □</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Naive Bayes</b> (part 3)</p>
<p><b>Posteriors:</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \square\\ p(y = \mathrm{B} \mid x) &= \square\\ p(y = \mathrm{C} \mid x) &= \square\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → □</p>
<p><b>Agree?</b> □</p>`,
      answer: R`<p><b>Key idea:</b> the prediction (MAP) is the species with the biggest posterior, read from part 2 (full Bayes) and part 3 (naive Bayes).</p>
<p>\(x = (X_1 = \text{yes},\ X_2 = \text{no})\)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Full Bayes</b> (part 2)</p>
<p><b>Posteriors:</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= 0.4\\ p(y = \mathrm{B} \mid x) &= 0.375\\ p(y = \mathrm{C} \mid x) &= 0.225\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → <b>Armfish (A)</b> (0.4 \(\gt\) 0.375 \(\gt\) 0.225)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Naive Bayes</b> (part 3)</p>
<p><b>Posteriors:</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &\approx 0.416\\ p(y = \mathrm{B} \mid x) &\approx 0.390\\ p(y = \mathrm{C} \mid x) &\approx 0.195\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → <b>Armfish (A)</b> (0.416 \(\gt\) 0.390 \(\gt\) 0.195)</p>
<p><b>Agree?</b> Yes, both predict Armfish.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Predicted species" = MAP = the species with the biggest posterior. Parts 2 and 3 already computed all of them, so just read off the biggest.`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ p(y \mid x)\]<p>The prediction = the class with the biggest posterior. Not on the sheet: [sheet: Class posterior probability] only names \(P(Y \mid X)\).</p>` },
        { line: R`<b>Full Bayes</b> — part 2's posteriors: \(p(y = \mathrm{A} \mid x) = 0.4\), \(p(y = \mathrm{B} \mid x) = 0.375\), \(p(y = \mathrm{C} \mid x) = 0.225\). MAP: the biggest → <b>Armfish (A)</b>.` },
        { line: R`<b>Naive Bayes</b> — part 3's posteriors: A 0.416, B 0.390, C 0.195. MAP: the biggest → <b>Armfish (A)</b>. Same species, so they agree. Done.` },
      ],
      compare: R`Same as the official answer: Armfish under both (0.4 and 0.416).`,
    },

    "2025C-q4.5": {
      point: R`<p>Equal priors = <b>the prior stops voting.</b> Only the fins decide.</p>
<p><b>1. What the question asks.</b> MAP again, but with \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C}\) (each ⅓). The question names the result: the maximum-likelihood prediction.</p>
<p><b>2. Why equal priors drop out.</b> Joint = \(\pi_j \times p(x \mid j)\). With every \(\pi_j = \tfrac13\), every joint is its likelihood × ⅓. Multiplying everyone by the same number can't change who's biggest (\(3 \gt 2\), and \(1 \gt \tfrac23\) too). The ÷ \(p(x)\) is shared as well. So compare \(p(x \mid j)\) only.</p>
<p><b>3. Why the winner can change from part 4.</b> There, Armfish had a head start: \(\pi_\mathrm{A} = 0.6\) vs 0.24 and 0.16. Take it away and the question is only: which species' fish most often look like (yes, no)?</p>
<p><b>So:</b> the four Bayes lines with every prior ⅓, in each model: full Bayes with part 2's \(p(x \mid j)\), naive with part 3's two shares multiplied. The biggest posterior sits on the biggest likelihood.</p>`,
      start: R`<p><b>Key idea:</b> equal priors multiply every joint by the same number (⅓), and the marginal is shared too, so the biggest posterior is the species with the biggest likelihood \(p(x \mid y = j)\): the ML prediction, in each model.</p>
<p>\(x = (X_1 = \text{yes},\ X_2 = \text{no})\). <b>Uniform priors:</b> \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C} = \square\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Full Bayes</b> (likelihoods as in part 2)</p>
<p><b>Likelihoods (the whole \(x\) at once):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= \frac{\text{A fish with (yes, no)}}{\text{all A fish}}\\ &= \square\\ p(x \mid y = \mathrm{B}) &= \frac{\text{B fish with (yes, no)}}{\text{all B fish}}\\ &= \square\\ p(x \mid y = \mathrm{C}) &= \frac{\text{C fish with (yes, no)}}{\text{all C fish}}\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \square\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → □</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Naive Bayes</b> (likelihoods as in part 3)</p>
<p><b>Likelihoods (one factor per fin):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(X_1 = \text{yes} \mid \mathrm{A})\cdot p(X_2 = \text{no} \mid \mathrm{A})\\ &= \square\\ p(x \mid y = \mathrm{B}) &= p(X_1 = \text{yes} \mid \mathrm{B})\cdot p(X_2 = \text{no} \mid \mathrm{B})\\ &= \square\\ p(x \mid y = \mathrm{C}) &= p(X_1 = \text{yes} \mid \mathrm{C})\cdot p(X_2 = \text{no} \mid \mathrm{C})\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \square\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \square\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \square\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \square\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \square\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → □</p>`,
      answer: R`<p><b>Key idea:</b> equal priors multiply every joint by the same number (⅓), and the marginal is shared too, so the biggest posterior is the species with the biggest likelihood \(p(x \mid y = j)\): the ML prediction, in each model.</p>
<p>\(x = (X_1 = \text{yes},\ X_2 = \text{no})\). <b>Uniform priors:</b> \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C} = \tfrac13\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Full Bayes</b> (likelihoods as in part 2)</p>
<p><b>Likelihoods (the whole \(x\) at once):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= \frac{\text{A fish with (yes, no)}}{\text{all A fish}}\\ &= \frac{16}{60} \approx 0.267\\ p(x \mid y = \mathrm{B}) &= \frac{\text{B fish with (yes, no)}}{\text{all B fish}}\\ &= \frac{15}{24} = 0.625\\ p(x \mid y = \mathrm{C}) &= \frac{\text{C fish with (yes, no)}}{\text{all C fish}}\\ &= \frac{9}{16} = 0.5625\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \tfrac13\cdot\tfrac{16}{60} \approx 0.0889\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \tfrac13\cdot\tfrac{15}{24} \approx 0.2083\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \tfrac13\cdot\tfrac{9}{16} = 0.1875\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= 0.0889 + 0.2083 + 0.1875 \approx 0.4847\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.0889}{0.4847} \approx 0.183\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.2083}{0.4847} \approx 0.430\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \frac{0.1875}{0.4847} \approx 0.387\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → <b>Blofish (B)</b> (0.430; it's also the biggest likelihood, 0.625)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>Naive Bayes</b> (likelihoods as in part 3)</p>
<p><b>Likelihoods (one factor per fin):</b></p>
\[\begin{aligned}p(x \mid y = \mathrm{A}) &= p(X_1 = \text{yes} \mid \mathrm{A})\cdot p(X_2 = \text{no} \mid \mathrm{A})\\ &= \tfrac45\cdot\tfrac13 = \tfrac{4}{15} \approx 0.267\\ p(x \mid y = \mathrm{B}) &= p(X_1 = \text{yes} \mid \mathrm{B})\cdot p(X_2 = \text{no} \mid \mathrm{B})\\ &= \tfrac56\cdot\tfrac34 = \tfrac58 = 0.625\\ p(x \mid y = \mathrm{C}) &= p(X_1 = \text{yes} \mid \mathrm{C})\cdot p(X_2 = \text{no} \mid \mathrm{C})\\ &= \tfrac34\cdot\tfrac58 = \tfrac{15}{32} \approx 0.469\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}p(y = \mathrm{A}, x) &= \pi_\mathrm{A}\cdot p(x \mid y = \mathrm{A})\\ &= \tfrac13\cdot\tfrac{4}{15} \approx 0.0889\\ p(y = \mathrm{B}, x) &= \pi_\mathrm{B}\cdot p(x \mid y = \mathrm{B})\\ &= \tfrac13\cdot\tfrac58 \approx 0.2083\\ p(y = \mathrm{C}, x) &= \pi_\mathrm{C}\cdot p(x \mid y = \mathrm{C})\\ &= \tfrac13\cdot\tfrac{15}{32} \approx 0.1563\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}p(x) &= p(y = \mathrm{A}, x) + p(y = \mathrm{B}, x)\\ &\quad + p(y = \mathrm{C}, x)\\ &= 0.0889 + 0.2083 + 0.1563 \approx 0.4535\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}p(y = \mathrm{A} \mid x) &= \frac{p(y = \mathrm{A}, x)}{p(x)} = \frac{0.0889}{0.4535} \approx 0.196\\ p(y = \mathrm{B} \mid x) &= \frac{p(y = \mathrm{B}, x)}{p(x)} = \frac{0.2083}{0.4535} \approx 0.459\\ p(y = \mathrm{C} \mid x) &= \frac{p(y = \mathrm{C}, x)}{p(x)} = \frac{0.1563}{0.4535} \approx 0.345\end{aligned}\]
<p><b>MAP:</b> the biggest posterior → <b>Blofish (B)</b> (0.459; it's also the biggest likelihood, 0.625)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> MAP again, but with \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C} = \tfrac13\) (the question calls it the maximum-likelihood prediction). Same four Bayes lines as parts 2–3, in both models.`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ \pi_y\,p(x \mid y)\]\[\hat y_{\text{ML}} = \arg\max_y\ p(x \mid y)\]<p>MAP = the biggest posterior; the posterior is joint ÷ \(p(x)\), and \(p(x)\) is the same for every class. With equal priors the joints are the likelihoods × ⅓, so MAP = maximum likelihood. Not on the sheet.</p>`,
          extra: [{ label: "the shortcut, if you want it: compare the likelihoods only", html: R`<p><b>What the official solution does:</b> it lists \(p(x \mid y = j)\) for the three species and names the biggest. That's enough because posterior = prior × likelihood ÷ \(p(x)\), and here the prior is the same for every species, and \(p(x)\) is the same for every species. Multiplying or dividing all three by the same number never changes which one is biggest.</p>
<p><b>What earns the "explain" points</b> is that one sentence: "the priors are equal and \(p(x)\) is the same for all species, so the largest posterior is the largest likelihood".</p>
<p><b>When you DO need the real numbers:</b> with costs (risk), because you multiply and then compare sums. Even there, joints work as well as posteriors (that's what the sheet's expected-risk formula uses).</p>` }] },
        { line: R`<b>Full Bayes</b> — likelihoods (part 2) × ⅓; marginal \(p(x) \approx 0.4847\): <div class="tw"><table><thead><tr><th>\(j\)</th><th>\(p(x \mid y = j)\)</th><th>joint</th><th>posterior</th></tr></thead><tbody>
<tr><td>A</td><td>\(\tfrac{16}{60} \approx 0.267\)</td><td>\(0.0889\)</td><td>\(0.183\)</td></tr>
<tr><td>B</td><td>\(\tfrac{15}{24} = 0.625\)</td><td>\(0.2083\)</td><td>\(0.430\)</td></tr>
<tr><td>C</td><td>\(\tfrac{9}{16} = 0.5625\)</td><td>\(0.1875\)</td><td>\(0.387\)</td></tr></tbody></table></div>MAP: the biggest posterior → <b>Blofish (B)</b>.` },
        { line: R`<b>Naive Bayes</b> — likelihoods (part 3) × ⅓; marginal \(p(x) \approx 0.4535\): <div class="tw"><table><thead><tr><th>\(j\)</th><th>\(p(x \mid y = j)\)</th><th>joint</th><th>posterior</th></tr></thead><tbody>
<tr><td>A</td><td>\(\tfrac{4}{15} \approx 0.267\)</td><td>\(0.0889\)</td><td>\(0.196\)</td></tr>
<tr><td>B</td><td>\(\tfrac58 = 0.625\)</td><td>\(0.2083\)</td><td>\(0.459\)</td></tr>
<tr><td>C</td><td>\(\tfrac{15}{32} \approx 0.469\)</td><td>\(0.1563\)</td><td>\(0.345\)</td></tr></tbody></table></div>MAP: the biggest posterior → <b>Blofish (B)</b>. Done.`,
          why: R`<p>MAP (part 4) said Armfish only because Armfish is common (\(\pi_\mathrm{A} = 0.6\)). The fins alone point to Blofish: in both tables the biggest posterior sits next to the biggest likelihood.</p>`,
          extra: [{ label: "the official solution prints \"0625\"", html: R`<p>It means 0.625.</p>` }] },
      ],
      compare: R`The official solution compares the likelihoods directly (the shortcut in step 1's extra; it prints "0625" for 0.625). Same winner: Blofish under both.`,
      slip: R`"0625" in the naive-Bayes B line is 0.625.`,
    },

    "2025C-q4.6": {
      point: R`<p>Same idea as 2025-A Q5.5, just with 3 species: <b>classifying is a bet</b>. For each bet, go through every possible truth, its chance, and what the bet costs then. The matrix is only a compact list of those costs.</p>
<p><b>1. Translate the matrix into sentences.</b> The question says \(\lambda_{j,l}\) = the cost of predicting \(j\) when the truth is \(l\), order A, B, C. So <b>row = what you say, column = what it actually is</b>:</p><div class="fig"><svg viewBox="0 0 560 180" width="560" role="img" aria-label="The cost matrix with rows = what you say and columns = the truth"><text x="173.0" y="20.0" font-size="12" text-anchor="middle" fill="currentColor">truth →</text><text x="111.0" y="42.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">A</text><text x="70.0" y="71.0" font-size="13" text-anchor="end" fill="currentColor" font-weight="700">say A</text><rect x="80" y="50" width="62" height="32" style="fill:var(--got-bg);stroke:var(--muted)"/><text x="111.0" y="71.0" font-size="14" text-anchor="middle" fill="currentColor">0</text><rect x="142" y="50" width="62" height="32" style="fill:var(--panel);stroke:var(--muted)"/><text x="173.0" y="71.0" font-size="14" text-anchor="middle" fill="currentColor">1</text><rect x="204" y="50" width="62" height="32" style="fill:var(--fail-bg);stroke:var(--muted)"/><text x="235.0" y="71.0" font-size="14" text-anchor="middle" fill="currentColor">2</text><text x="173.0" y="42.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">B</text><text x="70.0" y="103.0" font-size="13" text-anchor="end" fill="currentColor" font-weight="700">say B</text><rect x="80" y="82" width="62" height="32" style="fill:var(--panel);stroke:var(--muted)"/><text x="111.0" y="103.0" font-size="14" text-anchor="middle" fill="currentColor">1</text><rect x="142" y="82" width="62" height="32" style="fill:var(--got-bg);stroke:var(--muted)"/><text x="173.0" y="103.0" font-size="14" text-anchor="middle" fill="currentColor">0</text><rect x="204" y="82" width="62" height="32" style="fill:var(--fail-bg);stroke:var(--muted)"/><text x="235.0" y="103.0" font-size="14" text-anchor="middle" fill="currentColor">2</text><text x="235.0" y="42.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">C</text><text x="70.0" y="135.0" font-size="13" text-anchor="end" fill="currentColor" font-weight="700">say C</text><rect x="80" y="114" width="62" height="32" style="fill:var(--panel);stroke:var(--muted)"/><text x="111.0" y="135.0" font-size="14" text-anchor="middle" fill="currentColor">1</text><rect x="142" y="114" width="62" height="32" style="fill:var(--panel);stroke:var(--muted)"/><text x="173.0" y="135.0" font-size="14" text-anchor="middle" fill="currentColor">1</text><rect x="204" y="114" width="62" height="32" style="fill:var(--got-bg);stroke:var(--muted)"/><text x="235.0" y="135.0" font-size="14" text-anchor="middle" fill="currentColor">0</text><rect x="204" y="82" width="62" height="32" fill="none" style="stroke:var(--accent)" stroke-width="3"/><text x="278.0" y="103.0" font-size="12" text-anchor="start" fill="currentColor">← say B, truth C: a Catfish called Blofish</text><text x="278.0" y="119.0" font-size="12" text-anchor="start" fill="currentColor">(the question's "twice as bad")</text><text x="278.0" y="64.0" font-size="12" text-anchor="start" fill="currentColor">diagonal = right = 0</text><text x="20.0" y="168.0" font-size="12" text-anchor="start" fill="currentColor">column C holds the 2's: calling a real Catfish anything else costs 2</text></svg></div>
<p>· Classifying as A when it's actually A / B / C costs 0 / 1 / 2.</p>
<p>· Classifying as B when it's actually A / B / C costs 1 / 0 / 2.</p>
<p>· Classifying as C when it's actually A / B / C costs 1 / 1 / 0.</p>
<p>(Check with the question's example: "a Catfish as a Blofish" = classifying as B when it's actually C = 2 ✓, twice "a Blofish as a Catfish" = as C, actually B = 1.)</p>
<p><b>2. The chances</b> of each truth are part 2's full-Bayes posteriors: A 0.4, B 0.375, C 0.225. Posteriors, not priors: the bet is about <b>this</b> fish, and the posterior is the chance after looking at its fins. The prior (60/100, …) is the chance before looking; it's already inside the posterior (prior × likelihood ÷ \(p(x)\)).</p>
<p><b>3. Each bet's expected cost</b> = for every truth, (chance) × (cost), added up. Being right costs 0, so that term vanishes.</p>
<p><b>So:</b> three bets, three sums, predict the cheapest. (Row of the matrix · the posteriors is exactly that sum, which is why the official answer writes it as matrix × vector.)</p>`,
      start: R`<p><b>Key idea:</b> classifying = a bet. Its expected cost = for each possible truth, (chance it's actually that) × (cost of this bet then), added up. Predict the cheapest bet.</p>
<p><b>Costs</b> (row = what you say, column = the truth):</p>
<p>Classifying as A when it's actually A / B / C costs □ / □ / □</p>
<p>Classifying as B when it's actually A / B / C costs □ / □ / □</p>
<p>Classifying as C when it's actually A / B / C costs □ / □ / □</p>
<p><b>Chances</b> (part 2's posteriors): actually A □, actually B □, actually C □</p>
<p><b>Classifying as A:</b> \(\square\cdot\square + \square\cdot\square + \square\cdot\square = \square\)</p>
<p><b>Classifying as B:</b> \(\square\cdot\square + \square\cdot\square + \square\cdot\square = \square\)</p>
<p><b>Classifying as C:</b> \(\square\cdot\square + \square\cdot\square + \square\cdot\square = \square\)</p>
<p><b>Cheapest</b> → \(\square\)</p>`,
      answer: R`<p><b>Key idea:</b> classifying = a bet. Its expected cost = for each possible truth, (chance it's actually that) × (cost of this bet then), added up. Predict the cheapest bet.</p>
<p><b>Costs</b> (row = what you say, column = the truth):</p>
<p>Classifying as A when it's actually A / B / C costs 0 / 1 / 2</p>
<p>Classifying as B when it's actually A / B / C costs 1 / 0 / 2</p>
<p>Classifying as C when it's actually A / B / C costs 1 / 1 / 0</p>
<p><b>Chances</b> (part 2's posteriors): actually A 0.4, actually B 0.375, actually C 0.225</p>
<p><b>Classifying as A:</b> \(0.4\cdot 0 + 0.375\cdot 1 + 0.225\cdot 2 = 0.825\)</p>
<p><b>Classifying as B:</b> \(0.4\cdot 1 + 0.375\cdot 0 + 0.225\cdot 2 = 0.85\)</p>
<p><b>Classifying as C:</b> \(0.4\cdot 1 + 0.375\cdot 1 + 0.225\cdot 0 = 0.775\)</p>
<p><b>Cheapest</b> → 0.775 → <b>Catfish (C)</b></p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The smallest expected cost. Row = what you say, column = the truth. Cost of saying \(y\) = row \(y\) · the posteriors; all three at once = \(\lambda\) × the posterior column.`,
          remember: R`\[\begin{aligned}&\text{risk of saying } y = \sum_{y'}\lambda_{y,y'}\,p(y' \mid x)\\ &\to\ \text{predict the smallest}\end{aligned}\]<p>[sheet: Expected risk of predicting class label y] has it with joints \(\pi_{y'}P(X = x \mid Y = y')\) instead of posteriors. Every one ÷ the same \(p(x)\), so the same winner.</p>`,
          size: R`\[\underbrace{(\text{row } y\text{ of }\lambda)}_{\textstyle 1\times 3}\,\underbrace{p(\cdot \mid x)}_{\textstyle 3\times 1} = \text{one number}\]<p>3 truths (A, B, C) in both → inner 3 = 3 ✓ · result = one cost for saying \(y\) ✓</p>`,
          why: R`<p>[sheet: Expected risk of predicting class label y] is \(\sum_{y'} \pi_{y'} P(X = x \mid Y = y')\,\lambda_{y,y'}\). It uses the joints (0.16, 0.15, 0.09); the posteriors are those ÷ 0.4, the same for every row, so the smallest is the same.</p>
<p>Direction check: \(\lambda_{\mathrm{B},\mathrm{C}} = 2\) = say Blofish, truth Catfish — the "twice as bad" mistake.</p>` },
        { line: R`<b>Each bet, every truth</b> — columns: the truth (its chance); cells: the cost: <div class="tw"><table><thead><tr><th>say</th><th>A \((0.4)\)</th><th>B \((0.375)\)</th><th>C \((0.225)\)</th><th>expected</th></tr></thead><tbody>
<tr><td>A</td><td>\(0\)</td><td>\(1\)</td><td>\(2\)</td><td>\(0 + 0.375 + 0.45 = 0.825\)</td></tr>
<tr><td>B</td><td>\(1\)</td><td>\(0\)</td><td>\(2\)</td><td>\(0.4 + 0 + 0.45 = 0.85\)</td></tr>
<tr><td>C</td><td>\(1\)</td><td>\(1\)</td><td>\(0\)</td><td>\(0.4 + 0.375 + 0 = 0.775\)</td></tr></tbody></table></div>`,
          size: R`\[\underbrace{\lambda}_{\textstyle 3\times 3}\,\underbrace{p(\cdot \mid x)}_{\textstyle 3\times 1} = \underbrace{\text{costs}}_{\textstyle 3\times 1}\]<p>The same table as one matrix × vector (the official answer's form): rows = what you say, columns = the truth · inner 3 = 3 ✓ · one cost per bet ✓</p><p>Wrong order: \(p(\cdot \mid x)\,\lambda\) = (3×1)(3×3) — inner 1 ≠ 3 ✗</p>`,
          why: R`<p>Each row of the table = one bet. Multiply each cost by the chance on top of its column, add along the row. That's "row of \(\lambda\) · posterior column", so all three rows at once = \(\lambda\) × the posteriors.</p>` },
        { line: R`<b>Smallest</b> — 0.775 → <b>Catfish (C)</b>. Done.`,
          why: R`<p>Catfish is the least likely species, but any wrong answer on a Catfish costs 2, so saying C is the safe bet.</p>` },
      ],
      compare: R`The official line is \(\lambda\) × the posterior column: the same three sums as step 2's table, written as one matrix × vector: \((0.825, 0.85, 0.775)\) → C.`,
    },

    // ═══════════════════════════════ 2026-B Q4 — your Moed B: Poisson users (R / M)

    "2026B-q4.1": {
      point: R`<p>MLE = <b>find the top of a hill.</b> The log is only there to make the hill easy to climb.</p>
<p><b>1. What the question asks.</b> "Data log-likelihood \(\ell(\lambda; D)\)" = the log of how probable the whole dataset is, for a given \(\lambda\): a formula in \(\lambda\) with general \(x_1, \ldots, x_n\), not the table. The MLE \(\hat\lambda\) = the \(\lambda\) that makes it biggest.</p>
<p><b>2. The picture.</b> For fixed data, \(\ell\) is a hill in \(\lambda\): a too-small \(\lambda\) can't explain the counts, a too-big one predicts too many packets. At the top the slope is 0:</p><div class="fig"><svg viewBox="0 0 520 210" width="520" role="img" aria-label="The log-likelihood as a hill in lambda, top where the slope is 0"><line x1="40" y1="175" x2="490" y2="175" style="stroke:var(--muted)"/><path d="M40.0,175.0 L43.8,159.9 L47.5,146.9 L51.2,135.5 L55.0,125.5 L58.8,116.7 L62.5,108.7 L66.2,101.7 L70.0,95.3 L73.8,89.5 L77.5,84.3 L81.2,79.5 L85.0,75.2 L88.8,71.3 L92.5,67.7 L96.2,64.5 L100.0,61.5 L103.8,58.9 L107.5,56.4 L111.2,54.2 L115.0,52.2 L118.8,50.4 L122.5,48.8 L126.2,47.3 L130.0,46.0 L133.7,44.9 L137.5,43.9 L141.2,43.0 L145.0,42.3 L148.8,41.6 L152.5,41.1 L156.2,40.7 L160.0,40.4 L163.8,40.2 L167.5,40.0 L171.2,40.0 L175.0,40.0 L178.8,40.2 L182.5,40.3 L186.2,40.6 L190.0,40.9 L193.7,41.3 L197.5,41.8 L201.2,42.3 L205.0,42.9 L208.8,43.5 L212.5,44.2 L216.2,44.9 L220.0,45.7 L223.8,46.5 L227.5,47.4 L231.2,48.3 L235.0,49.3 L238.8,50.3 L242.5,51.4 L246.2,52.5 L250.0,53.6 L253.8,54.7 L257.5,55.9 L261.2,57.2 L265.0,58.4 L268.8,59.7 L272.5,61.1 L276.2,62.4 L280.0,63.8 L283.8,65.2 L287.5,66.7 L291.2,68.1 L295.0,69.6 L298.8,71.2 L302.5,72.7 L306.2,74.3 L310.0,75.9 L313.8,77.5 L317.5,79.2 L321.2,80.8 L325.0,82.5 L328.8,84.2 L332.5,86.0 L336.2,87.7 L340.0,89.5 L343.8,91.3 L347.5,93.1 L351.2,94.9 L355.0,96.7 L358.8,98.6 L362.5,100.5 L366.2,102.4 L370.0,104.3 L373.8,106.2 L377.5,108.2 L381.2,110.1 L385.0,112.1 L388.8,114.1 L392.5,116.1 L396.2,118.1 L400.0,120.2 L403.8,122.2 L407.5,124.3 L411.2,126.3 L415.0,128.4 L418.8,130.5 L422.5,132.6 L426.2,134.8 L430.0,136.9 L433.8,139.0 L437.5,141.2 L441.2,143.4 L445.0,145.6 L448.8,147.8 L452.5,150.0 L456.3,152.2 L460.0,154.4 L463.8,156.6 L467.5,158.9 L471.2,161.1 L475.0,163.4 L478.8,165.7 L482.5,168.0 L486.3,170.3 L490.0,172.6" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/><line x1="101.4" y1="40.0" x2="241.4" y2="40.0" style="stroke:var(--shaky)" stroke-width="2" stroke-dasharray="5 3"/><circle cx="171.4" cy="40.0" r="5" style="fill:var(--shaky)"/><line x1="171.4" y1="40.0" x2="171.4" y2="175" style="stroke:var(--shaky)" stroke-dasharray="4 3"/><text x="247.4" y="44.0" font-size="12" text-anchor="start" fill="currentColor">top: slope ℓ′(λ) = 0</text><text x="171.4" y="191.0" font-size="14" text-anchor="middle" fill="currentColor" font-weight="700">λ̂</text><text x="490.0" y="191.0" font-size="12" text-anchor="end" fill="currentColor">λ →</text><text x="71.8" y="81.3" font-size="12" text-anchor="end" fill="currentColor">slope > 0</text><text x="410.4" y="86.7" font-size="12" text-anchor="middle" fill="currentColor">slope &lt; 0</text><text x="40.0" y="20.0" font-size="12" text-anchor="start" fill="currentColor">ℓ(λ; D) for one dataset: a hill in λ</text></svg></div>
<p><b>3. Why a sum of logs.</b> The samples are independent, so the probability of all of them = the product of each one's Poisson probability. The log turns that hard product into an easy sum. And log only goes up, so the product and its log peak at the same \(\lambda\).</p>
<p><b>So:</b> \(\ell\) = one log-Poisson per sample, added; log rules, derivative by \(\lambda\), set to 0 (you get the average count); \(\ell'' \lt 0\) shows it's a top.</p>`,
      start: R`<p><b>Key idea:</b> independent samples → multiply their Poisson probabilities; the log turns the product into a sum. Derivative by \(\lambda\), set to 0: \(\hat\lambda\) = the average count, and \(\ell'' \lt 0\), so it's a maximum.</p>
<p><b>1. One sample</b> (the Poisson formula with \(x_i\)):</p>\[p(x_i \mid \lambda) = \;\square\]
<p><b>2. All samples</b> (independent → multiply):</p>\[L(\lambda) = \prod_{i=1}^{n}\;\square\]
<p><b>3. The data log-likelihood</b> (log turns × into +):</p>\[\ell(\lambda; D) = \log L(\lambda) = \sum_{i=1}^{n}\;\square\]
<p><b>4. Simplify:</b> log rules inside the sum, split into three sums, then take out what has no \(i\):</p>\[\begin{aligned}\ell(\lambda; D) &= \sum_{i=1}^{n}\big(\square\big)\\ &= \sum_{i=1}^{n}\square \;-\; \sum_{i=1}^{n}\square \;-\; \sum_{i=1}^{n}\square\\ &= \square\end{aligned}\]
<p><b>5. Derivative by \(\lambda\), set to 0, solve:</b></p>\[\ell'(\lambda; D) = \;\square\; = 0 \;\Rightarrow\; \hat\lambda = \;\square\]
<p><b>6. It's a maximum:</b> \(\ell''(\lambda; D) = \square \lt 0\)</p>`,
      answer: R`<p><b>Key idea:</b> independent samples → multiply their Poisson probabilities; the log turns the product into a sum. Derivative by \(\lambda\), set to 0: \(\hat\lambda\) = the average count, and \(\ell'' \lt 0\), so it's a maximum.</p>
<p><b>1. One sample</b> (the Poisson formula with \(x_i\)):</p>\[p(x_i \mid \lambda) = \frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\]
<p><b>2. All samples</b> (independent → multiply):</p>\[L(\lambda) = \prod_{i=1}^{n}\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\]
<p><b>3. The data log-likelihood</b> (log turns × into +):</p>\[\ell(\lambda; D) = \log L(\lambda) = \sum_{i=1}^{n}\log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\]
<p><b>4. Simplify:</b> log rules inside the sum, split into three sums, then take out what has no \(i\):</p>\[\begin{aligned}\ell(\lambda; D) &= \sum_{i=1}^{n}\big(x_i\log\lambda - \lambda - \log(x_i!)\big)\\ &= \sum_{i=1}^{n}x_i\log\lambda \;-\; \sum_{i=1}^{n}\lambda \;-\; \sum_{i=1}^{n}\log(x_i!)\\ &= \Big(\sum_{i=1}^{n} x_i\Big)\log\lambda - n\lambda - \sum_{i=1}^{n}\log(x_i!)\end{aligned}\]
<p><b>5. Derivative by \(\lambda\), set to 0, solve:</b></p>\[\begin{aligned}\ell'(\lambda; D) &= \Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda - n = 0\\ \Rightarrow\; \hat\lambda &= \frac1n\sum_{i=1}^{n} x_i\end{aligned}\]
<p><b>6. It's a maximum:</b> \(\ell''(\lambda; D) = -\Big(\sum_{i=1}^{n} x_i\Big)\dfrac{1}{\lambda^2} \lt 0\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Two things: \(\ell(\lambda; D)\) as a formula in \(\lambda\) (general \(x_1, \ldots, x_n\)), then the MLE = the \(\lambda\) that maximizes it. One variable, so: derivative, set to 0, solve.`,
          remember: R`\[\ell(\theta) = \log\prod_{i} p(x_i;\theta) = \sum_{i}\log p(x_i;\theta)\]<p>The MLE recipe: independent samples → multiply their probabilities; take the log (log of a product = sum of the logs); derivative; set to 0; solve. Not on the sheet. Log of a product is on the extension sheet, if you get it: [sheet: Log of product].</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You wrote this with the table's numbers and \(\lambda_R\), \(\lambda_M\), and never differentiated (0/5). The part wants general \(x_1, \ldots, x_n\) and one \(\lambda\); the points are for the derivative and solving.</p>` }] },
        { line: R`<b>Lines 1–3: one sample → all samples → log</b> — one sample is the question's Poisson formula with \(x_i\); independent, so multiply (\(\prod\)); the log turns × into +: <div class="formula">\[\ell(\lambda; D) = \sum_{i=1}^{n}\log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\]</div>`,
          why: R`<p>Each sample's probability is [sheet: Poisson probability mass function with]: \(\lambda^k e^{-\lambda}/k!\) with \(k = x_i\). The samples are independent, so all of them together = the product. The log turns the product into a sum (log of a product = sum of the logs).</p>
<p>The \(\sum_i\) only means one log per sample. With 3 samples it literally is:</p>
\[\begin{aligned}\ell = \;&\log\frac{\lambda^{x_1}e^{-\lambda}}{x_1!} &&\leftarrow \text{sample 1}\\ +\;&\log\frac{\lambda^{x_2}e^{-\lambda}}{x_2!} &&\leftarrow \text{sample 2}\\ +\;&\log\frac{\lambda^{x_3}e^{-\lambda}}{x_3!} &&\leftarrow \text{sample 3}\end{aligned}\]` },
        { line: R`<b>Simplify</b> — log rules inside the sum, then split into three sums, then take out of each sum what has no \(i\): <div class="formula">\[\begin{aligned}\ell(\lambda; D) &= \sum_{i=1}^{n}\big(x_i\log\lambda - \lambda - \log(x_i!)\big)\\ &= \sum_{i=1}^{n}x_i\log\lambda \;-\; \sum_{i=1}^{n}\lambda \;-\; \sum_{i=1}^{n}\log(x_i!)\\ &= \Big(\sum_{i=1}^{n} x_i\Big)\log\lambda - n\lambda - \sum_{i=1}^{n}\log(x_i!)\end{aligned}\]</div>`,
          remember: R`\[\log(ab) = \log a + \log b\]\[\log\frac{a}{b} = \log a - \log b\]\[\log a^k = k\log a\]<p>The log rules (log = natural log, so \(\log e^c = c\)). Not on the sheet; extension sheet, if you get it: [sheet: Log of product], [sheet: Log of quotient], [sheet: Log of power].</p>`,
          why: R`<p><b>Line 1, one log</b> with the three log rules: top ÷ bottom → minus; \(\lambda^{x_i}\cdot e^{-\lambda}\) → plus; the power comes down in front:</p>
\[\log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!} = x_i\log\lambda + \underbrace{\log e^{-\lambda}}_{\textstyle = -\lambda} - \log(x_i!)\]
<p><b>Line 2, split:</b> a sum of (a − b − c) = the sum of the a's − the sum of the b's − the sum of the c's.</p>
<p><b>Line 3, each sum on its own:</b></p>
<p>· \(\sum_i x_i\log\lambda\): \(\log\lambda\) has no \(i\), the same in every term → out: \(\big(\sum_i x_i\big)\log\lambda\).</p>
<p>· \(\sum_i \lambda\): no \(i\) at all, the same \(\lambda\) added once per user: \(\lambda + \lambda + \dots + \lambda = n\lambda\).</p>
<p>· \(\sum_i \log(x_i!)\): everything depends on \(i\), nothing comes out. It has no \(\lambda\), so it vanishes in the derivative.</p>
<p><b>With \(n = 3\), written out:</b> \((x_1\log\lambda - \lambda - \log x_1!) + (x_2\log\lambda - \lambda - \log x_2!) + (x_3\log\lambda - \lambda - \log x_3!)\) = \((x_1 + x_2 + x_3)\log\lambda - 3\lambda - (\log x_1! + \log x_2! + \log x_3!)\).</p>` },
        { line: R`<b>Derivative by \(\lambda\)</b> — \(\sum_i x_i\) is just a number, \((\log\lambda)' = \tfrac1\lambda\), \((n\lambda)' = n\), the last sum has no \(\lambda\): <div class="formula">\[\ell'(\lambda; D) = \Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda - n\]</div>`,
          remember: R`\[(\log x)' = \frac1x\]<p>Natural log. Not on the sheet; extension sheet, if you get it: [sheet: Derivative of loga (x)] gives \(\frac{1}{x\ln a}\), and with \(a = e\), \(\ln e = 1\).</p>`,
          why: R`<p>Same as \(f(\lambda) = 16\log\lambda - 8\lambda - c\) → \(f'(\lambda) = \tfrac{16}{\lambda} - 8\). (That's part 2's 8 R users: their counts add to 16.)</p>` },
        { line: R`<b>Set to 0 and solve</b>, then check it's a maximum (second derivative \(\lt 0\)): <div class="formula">\[\begin{aligned}\Big(\sum_{i=1}^{n} x_i\Big)\frac1\lambda = n \iff \hat\lambda &= \frac1n\sum_{i=1}^{n} x_i\\ \ell''(\lambda; D) = -\Big(\sum_{i=1}^{n} x_i\Big)\frac{1}{\lambda^2} &\lt 0\end{aligned}\]</div>Done.`,
          why: R`<p>The MLE is the average of the counts. With the R users: \(\tfrac{16}{\lambda} = 8\) → \(\lambda = 2\), exactly part 2. \(\ell''\) is the derivative of \((\sum_i x_i)\lambda^{-1} - n\); counts are \(\ge 0\), so it's negative.</p>` },
      ],
      compare: R`Steps 3–5 are the official lines, including \(\ell'' \lt 0\). Same derivation as your HW5 Q1–2 (written with ln there).`,
    },

    "2026B-q4.2": {
      point: R`<p>Part 1 did the work: <b>the MLE of a Poisson rate is the average count.</b> Use it on each class separately.</p>
<p><b>1. What the question asks.</b> Four numbers fitted to the 10 users: the rates \(\hat\lambda_\mathrm{R}, \hat\lambda_\mathrm{M}\) and the priors \(\hat\pi_\mathrm{R}, \hat\pi_\mathrm{M}\).</p>
<p><b>2. The picture.</b> The users are two groups of dots. Each class's rate is the middle of <i>its own</i> group:</p><div class="fig"><svg viewBox="0 0 520 165" width="520" role="img" aria-label="The ten users' packet counts as dots, R users and M users"><line x1="50" y1="120" x2="470" y2="120" style="stroke:var(--muted)"/><line x1="50.0" y1="120" x2="50.0" y2="125" style="stroke:var(--muted)"/><text x="50.0" y="139.0" font-size="12" text-anchor="middle" fill="currentColor">0</text><line x1="134.0" y1="120" x2="134.0" y2="125" style="stroke:var(--muted)"/><text x="134.0" y="139.0" font-size="12" text-anchor="middle" fill="currentColor">1</text><line x1="218.0" y1="120" x2="218.0" y2="125" style="stroke:var(--muted)"/><text x="218.0" y="139.0" font-size="12" text-anchor="middle" fill="currentColor">2</text><line x1="302.0" y1="120" x2="302.0" y2="125" style="stroke:var(--muted)"/><text x="302.0" y="139.0" font-size="12" text-anchor="middle" fill="currentColor">3</text><line x1="386.0" y1="120" x2="386.0" y2="125" style="stroke:var(--muted)"/><text x="386.0" y="139.0" font-size="12" text-anchor="middle" fill="currentColor">4</text><line x1="470.0" y1="120" x2="470.0" y2="125" style="stroke:var(--muted)"/><text x="470.0" y="139.0" font-size="12" text-anchor="middle" fill="currentColor">5</text><circle cx="134.0" cy="108.0" r="7" style="fill:var(--accent)"/><circle cx="134.0" cy="90.0" r="7" style="fill:var(--accent)"/><circle cx="218.0" cy="108.0" r="7" style="fill:var(--accent)"/><circle cx="218.0" cy="90.0" r="7" style="fill:var(--accent)"/><circle cx="218.0" cy="72.0" r="7" style="fill:var(--accent)"/><circle cx="218.0" cy="54.0" r="7" style="fill:var(--accent)"/><circle cx="302.0" cy="108.0" r="7" style="fill:var(--accent)"/><circle cx="302.0" cy="90.0" r="7" style="fill:var(--accent)"/><circle cx="386.0" cy="108.0" r="7" style="fill:var(--fail)"/><circle cx="386.0" cy="90.0" r="7" style="fill:var(--fail)"/><circle cx="55" cy="18" r="6" style="fill:var(--accent)"/><text x="66.0" y="22.0" font-size="12" text-anchor="start" fill="currentColor">R users (8)</text><circle cx="185" cy="18" r="6" style="fill:var(--fail)"/><text x="196.0" y="22.0" font-size="12" text-anchor="start" fill="currentColor">M users (2)</text><text x="470.0" y="156.0" font-size="12" text-anchor="end" fill="currentColor">packets x →</text></svg></div>
<p><b>3. Why per class.</b> The question says each class has its own typical rate \(\lambda_y\). Only regular users tell you anything about \(\lambda_\mathrm{R}\), so part 1's formula runs on the R users' counts alone (\(n = 8\)), and on the M users' alone for \(\lambda_\mathrm{M}\) (\(n = 2\)). Mixing them would pull R's rate toward the M's.</p>
<p><b>4. The priors.</b> Count ÷ total: each class's share of the 10 users. ("Such users are rare" → M's share is small.)</p>
<p><b>So:</b> the same 6 MLE lines as part 1, with one user = prior × Poisson. The log splits into one row per parameter, and the rows give two averages (one per class) and two shares.</p>`,
      start: R`<p><b>Key idea:</b> one user = its class <b>and</b> its packet count, so prior × Poisson. Multiply all ten, log → sum: the sum splits into a prior part, an R part and an M part. So \(\hat\lambda_y\) = part 1's average, over class \(y\)'s users only; \(\hat\pi_y\) = class \(y\)'s share of the 10 users.</p>
<p><b>1. One sample</b> = one user (its class and its count):</p>
\[P(Y = y_i, X = x_i) = \pi_{y_i}\cdot\frac{\lambda_{y_i}^{x_i}e^{-\lambda_{y_i}}}{x_i!}\]
<p><b>2. All samples</b> (independent → multiply; R = users 1–8, M = users 9–10):</p>
\[\begin{aligned}L = \;&\pi_\mathrm{R}^{\,\square}\,\pi_\mathrm{M}^{\,\square}\\ &\cdot\prod_{i=1}^{8}\frac{\lambda_\mathrm{R}^{x_i}e^{-\lambda_\mathrm{R}}}{x_i!}\\ &\cdot\prod_{i=9}^{10}\frac{\lambda_\mathrm{M}^{x_i}e^{-\lambda_\mathrm{M}}}{x_i!}\end{aligned}\]
<p><b>3. The data log-likelihood</b> (log turns × into +):</p>
\[\begin{aligned}\ell = \;&\square\log\pi_\mathrm{R} + \square\log\pi_\mathrm{M}\\ &+ \sum_{i=1}^{8}\big(x_i\log\lambda_\mathrm{R} - \lambda_\mathrm{R} - \log x_i!\big)\\ &+ \sum_{i=9}^{10}\big(x_i\log\lambda_\mathrm{M} - \lambda_\mathrm{M} - \log x_i!\big)\end{aligned}\]
<p><b>4. Simplify:</b> \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\); split each sum (part 1's line 4) with the counts \(\sum_{\mathrm{R}} x_i = \square\), \(\sum_{\mathrm{M}} x_i = \square\):</p>
\[\begin{aligned}\ell = \;&\square\log(1 - \pi_\mathrm{M}) + \square\log\pi_\mathrm{M}\\ &+ \square\log\lambda_\mathrm{R} - \square\,\lambda_\mathrm{R}\\ &+ \square\log\lambda_\mathrm{M} - \square\,\lambda_\mathrm{M} - \sum_{i=1}^{10}\log x_i!\end{aligned}\]
<p>Each parameter sits in its own row, so each is maximised on its own.</p>
<p><b>5. Derivative by each parameter, set to 0, solve:</b></p>
\[\begin{aligned}\frac{\partial\ell}{\partial\lambda_\mathrm{R}} &= \frac{\square}{\lambda_\mathrm{R}} - \square = 0\\ &\Rightarrow\; \hat\lambda_\mathrm{R} = \square\\ \frac{\partial\ell}{\partial\lambda_\mathrm{M}} &= \frac{\square}{\lambda_\mathrm{M}} - \square = 0\\ &\Rightarrow\; \hat\lambda_\mathrm{M} = \square\\ \frac{\partial\ell}{\partial\pi_\mathrm{M}} &= \frac{\square}{\pi_\mathrm{M}} - \frac{\square}{1 - \pi_\mathrm{M}} = 0\\ &\Rightarrow\; \hat\pi_\mathrm{M} = \square,\ \ \hat\pi_\mathrm{R} = \square\end{aligned}\]
<p><b>6. Each is a maximum:</b></p>
\[\begin{aligned}\frac{\partial^2\ell}{\partial\lambda_\mathrm{R}^2} &= -\frac{\square}{\lambda_\mathrm{R}^2} \lt 0\\ \frac{\partial^2\ell}{\partial\lambda_\mathrm{M}^2} &= -\frac{\square}{\lambda_\mathrm{M}^2} \lt 0\\ \frac{\partial^2\ell}{\partial\pi_\mathrm{M}^2} &= -\frac{\square}{\pi_\mathrm{M}^2} - \frac{\square}{(1 - \pi_\mathrm{M})^2} \lt 0\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> one user = its class <b>and</b> its packet count, so prior × Poisson. Multiply all ten, log → sum: the sum splits into a prior part, an R part and an M part. So \(\hat\lambda_y\) = part 1's average, over class \(y\)'s users only; \(\hat\pi_y\) = class \(y\)'s share of the 10 users.</p>
<p><b>1. One sample</b> = one user (its class and its count):</p>
\[P(Y = y_i, X = x_i) = \pi_{y_i}\cdot\frac{\lambda_{y_i}^{x_i}e^{-\lambda_{y_i}}}{x_i!}\]
<p><b>2. All samples</b> (independent → multiply; R = users 1–8, M = users 9–10):</p>
\[\begin{aligned}L = \;&\pi_\mathrm{R}^{\,8}\,\pi_\mathrm{M}^{\,2}\\ &\cdot\prod_{i=1}^{8}\frac{\lambda_\mathrm{R}^{x_i}e^{-\lambda_\mathrm{R}}}{x_i!}\\ &\cdot\prod_{i=9}^{10}\frac{\lambda_\mathrm{M}^{x_i}e^{-\lambda_\mathrm{M}}}{x_i!}\end{aligned}\]
<p><b>3. The data log-likelihood</b> (log turns × into +):</p>
\[\begin{aligned}\ell = \;&8\log\pi_\mathrm{R} + 2\log\pi_\mathrm{M}\\ &+ \sum_{i=1}^{8}\big(x_i\log\lambda_\mathrm{R} - \lambda_\mathrm{R} - \log x_i!\big)\\ &+ \sum_{i=9}^{10}\big(x_i\log\lambda_\mathrm{M} - \lambda_\mathrm{M} - \log x_i!\big)\end{aligned}\]
<p><b>4. Simplify:</b> \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\); split each sum (part 1's line 4) with the counts \(\sum_{\mathrm{R}} x_i = 1 + 1 + 2 + 2 + 2 + 2 + 3 + 3 = 16\), \(\sum_{\mathrm{M}} x_i = 4 + 4 = 8\):</p>
\[\begin{aligned}\ell = \;&8\log(1 - \pi_\mathrm{M}) + 2\log\pi_\mathrm{M}\\ &+ 16\log\lambda_\mathrm{R} - 8\,\lambda_\mathrm{R}\\ &+ 8\log\lambda_\mathrm{M} - 2\,\lambda_\mathrm{M} - \sum_{i=1}^{10}\log x_i!\end{aligned}\]
<p>Each parameter sits in its own row, so each is maximised on its own.</p>
<p><b>5. Derivative by each parameter, set to 0, solve:</b></p>
\[\begin{aligned}\frac{\partial\ell}{\partial\lambda_\mathrm{R}} &= \frac{16}{\lambda_\mathrm{R}} - 8 = 0\\ &\Rightarrow\; \hat\lambda_\mathrm{R} = \tfrac{16}{8} = 2\\ \frac{\partial\ell}{\partial\lambda_\mathrm{M}} &= \frac{8}{\lambda_\mathrm{M}} - 2 = 0\\ &\Rightarrow\; \hat\lambda_\mathrm{M} = \tfrac82 = 4\\ \frac{\partial\ell}{\partial\pi_\mathrm{M}} &= \frac{2}{\pi_\mathrm{M}} - \frac{8}{1 - \pi_\mathrm{M}} = 0\\ &\Rightarrow\; \hat\pi_\mathrm{M} = \tfrac{2}{10} = 0.2,\ \ \hat\pi_\mathrm{R} = 0.8\end{aligned}\]
<p><b>6. Each is a maximum:</b></p>
\[\begin{aligned}\frac{\partial^2\ell}{\partial\lambda_\mathrm{R}^2} &= -\frac{16}{\lambda_\mathrm{R}^2} \lt 0\\ \frac{\partial^2\ell}{\partial\lambda_\mathrm{M}^2} &= -\frac{8}{\lambda_\mathrm{M}^2} \lt 0\\ \frac{\partial^2\ell}{\partial\pi_\mathrm{M}^2} &= -\frac{2}{\pi_\mathrm{M}^2} - \frac{8}{(1 - \pi_\mathrm{M})^2} \lt 0\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> Four MLEs: the rates (part 1's formula) and the priors. Same 6 lines as part 1, but now one sample is a user <i>with its class</i>: prior × Poisson.`,
          remember: R`\[\ell(\theta) = \log\prod_{i} p(x_i;\theta) = \sum_{i}\log p(x_i;\theta)\]<p>The MLE recipe: independent samples → multiply; log; derivative; set to 0; solve. For a prior it gives count ÷ total: [sheet: Class prior] only says \(\pi_j = P(Y = j)\); closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates]. The Poisson is [sheet: Poisson probability mass function with].</p>`,
          extra: [{ label: "Moed B trap", html: R`<p>You got the priors but left out the rates (2/5). The rates are just two averages, one per class (line 5).</p>` }] },
        { line: R`<b>Lines 1–2: one user → all ten</b> — a user is "this class <b>and</b> this count" = prior × Poisson with its class's rate. Multiply all ten; the priors collect into powers (8 R users, 2 M users): <div class="formula">\[\begin{aligned}L = \;&\pi_\mathrm{R}^{\,8}\,\pi_\mathrm{M}^{\,2}\\ &\cdot\prod_{i=1}^{8}\frac{\lambda_\mathrm{R}^{x_i}e^{-\lambda_\mathrm{R}}}{x_i!}\\ &\cdot\prod_{i=9}^{10}\frac{\lambda_\mathrm{M}^{x_i}e^{-\lambda_\mathrm{M}}}{x_i!}\end{aligned}\]</div>`,
          why: R`<p>User 1 (\(x = 1\), R): \(\pi_\mathrm{R}\cdot\frac{\lambda_\mathrm{R}^{1}e^{-\lambda_\mathrm{R}}}{1!}\). User 9 (\(x = 4\), M): \(\pi_\mathrm{M}\cdot\frac{\lambda_\mathrm{M}^{4}e^{-\lambda_\mathrm{M}}}{4!}\). The R users only ever bring \(\lambda_\mathrm{R}\), the M users only \(\lambda_\mathrm{M}\).</p>` },
        { line: R`<b>Lines 3–4: log, then split</b> — log turns × into +; inside each sum, part 1's log rules; \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\). R's counts add to 16, M's to 8: <div class="formula">\[\begin{aligned}\ell = \;&8\log(1 - \pi_\mathrm{M}) + 2\log\pi_\mathrm{M}\\ &+ 16\log\lambda_\mathrm{R} - 8\,\lambda_\mathrm{R}\\ &+ 8\log\lambda_\mathrm{M} - 2\,\lambda_\mathrm{M} - \textstyle\sum_i\log x_i!\end{aligned}\]</div>`,
          why: R`<p>R's sum, exactly part 1's line 4 with only the 8 R users: \(\big(\sum_{\mathrm{R}} x_i\big)\log\lambda_\mathrm{R} - 8\lambda_\mathrm{R} - \dots\), and \(\sum_{\mathrm{R}} x_i = 1 + 1 + 2 + 2 + 2 + 2 + 3 + 3 = 16\). M's: \(4 + 4 = 8\) and 2 users.</p>
<p>Each row has only one parameter, so the derivative by \(\lambda_\mathrm{R}\) ignores the other rows. That's why "part 1's formula on each class's own users" is right.</p>` },
        { line: R`<b>Lines 5–6: derivative = 0, solve, check</b>: <div class="formula">\[\begin{aligned}\tfrac{16}{\lambda_\mathrm{R}} - 8 = 0 &\Rightarrow \hat\lambda_\mathrm{R} = \tfrac{16}{8} = 2\\ \tfrac{8}{\lambda_\mathrm{M}} - 2 = 0 &\Rightarrow \hat\lambda_\mathrm{M} = \tfrac82 = 4\\ \tfrac{2}{\pi_\mathrm{M}} - \tfrac{8}{1 - \pi_\mathrm{M}} = 0 &\Rightarrow \hat\pi_\mathrm{M} = \tfrac{2}{10} = 0.2\end{aligned}\]</div>So \(\hat\pi_\mathrm{R} = 0.8\). Done.`,
          why: R`<p>\(\hat\lambda_\mathrm{R} = \tfrac{16}{8}\) is part 1's \(\hat\lambda = \tfrac1n\sum_i x_i\) on the R users (the average of their counts); same for M. Prior: \(2(1 - \pi_\mathrm{M}) = 8\pi_\mathrm{M}\), so \(2 = 10\pi_\mathrm{M}\): count ÷ total. All second derivatives are \(-\tfrac{a}{(\cdot)^2} \lt 0\): maxima.</p>
<p>Averaging all ten users (2.4) would give one rate for everyone, which can't tell the classes apart.</p>`,
          extra: [{ label: "the official solution writes π̂_R twice", html: R`<p>Its second prior is labelled \(\hat\pi_\mathrm{R} = \tfrac{2}{10}\). It's \(\hat\pi_\mathrm{M} = 0.2\).</p>` }] },
      ],
      compare: R`Line 5's numbers are the official answer. The official solution plugs straight into part 1's average and writes the priors as count ÷ 10; lines 1–4 show why that's the MLE. Its second prior is mislabelled \(\hat\pi_\mathrm{R}\); it's \(\hat\pi_\mathrm{M} = 0.2\).`,
      slip: R`Typo: the second prior is \(\hat\pi_\mathrm{M} = \tfrac{2}{10} = 0.2\), not \(\hat\pi_\mathrm{R}\). \(\hat\pi_\mathrm{R}\) is 0.8.`,
    },

    "2026B-q4.3": {
      point: R`<p>The same method as 2025-A Q5.2 and 2025-C Q4.2: <b>for each user, joint → marginal → posterior, pick the bigger posterior.</b> The only new thing is that the likelihood is the Poisson formula.</p>
<p><b>1. What the question asks.</b> "MAP rule" = the class with the bigger posterior. "Fitted model from (2)" = part 2's numbers: \(\hat\pi_\mathrm{R} = 0.8,\ \hat\lambda_\mathrm{R} = 2\) and \(\hat\pi_\mathrm{M} = 0.2,\ \hat\lambda_\mathrm{M} = 4\).</p>
<p><b>2. The picture.</b> R is common with a low rate, M is rare with a high rate. Few packets look regular, many packets look malicious:</p><div class="fig"><svg viewBox="0 0 520 236" width="520" role="img" aria-label="The two classes' joints as bars over x: R is taller on the left, M on the right"><line x1="40" y1="180" x2="500" y2="180" style="stroke:var(--muted)"/><rect x="45.9" y="116.4" width="15.1" height="63.6" style="fill:var(--accent)" opacity="0.9"/><rect x="60.9" y="177.8" width="15.1" height="2.2" style="fill:var(--fail)" opacity="0.9"/><rect x="87.7" y="52.7" width="15.1" height="127.3" style="fill:var(--accent)" opacity="0.9"/><rect x="102.7" y="171.4" width="15.1" height="8.6" style="fill:var(--fail)" opacity="0.9"/><rect x="129.5" y="52.7" width="15.1" height="127.3" style="fill:var(--accent)" opacity="0.9"/><rect x="144.5" y="162.8" width="15.1" height="17.2" style="fill:var(--fail)" opacity="0.9"/><rect x="171.3" y="95.2" width="15.1" height="84.8" style="fill:var(--accent)" opacity="0.9"/><rect x="186.4" y="157.0" width="15.1" height="23.0" style="fill:var(--fail)" opacity="0.9"/><rect x="213.1" y="137.6" width="15.1" height="42.4" style="fill:var(--accent)" opacity="0.9"/><rect x="228.2" y="157.0" width="15.1" height="23.0" style="fill:var(--fail)" opacity="0.9"/><rect x="254.9" y="163.0" width="15.1" height="17.0" style="fill:var(--accent)" opacity="0.9"/><rect x="270.0" y="161.6" width="15.1" height="18.4" style="fill:var(--fail)" opacity="0.9"/><rect x="296.8" y="174.3" width="15.1" height="5.7" style="fill:var(--accent)" opacity="0.9"/><rect x="311.8" y="167.8" width="15.1" height="12.2" style="fill:var(--fail)" opacity="0.9"/><rect x="338.6" y="178.4" width="15.1" height="1.6" style="fill:var(--accent)" opacity="0.9"/><rect x="353.6" y="173.0" width="15.1" height="7.0" style="fill:var(--fail)" opacity="0.9"/><rect x="380.4" y="179.6" width="15.1" height="0.4" style="fill:var(--accent)" opacity="0.9"/><rect x="395.5" y="176.5" width="15.1" height="3.5" style="fill:var(--fail)" opacity="0.9"/><rect x="422.2" y="179.9" width="15.1" height="0.1" style="fill:var(--accent)" opacity="0.9"/><rect x="437.3" y="178.4" width="15.1" height="1.6" style="fill:var(--fail)" opacity="0.9"/><rect x="464.0" y="180.0" width="15.1" height="0.0" style="fill:var(--accent)" opacity="0.9"/><rect x="479.1" y="179.4" width="15.1" height="0.6" style="fill:var(--fail)" opacity="0.9"/><rect x="310" y="48" width="12" height="12" style="fill:var(--accent)"/><text x="328.0" y="58.0" font-size="12" text-anchor="start" fill="currentColor">0.8 × Poiss(x | 2)  (R)</text><rect x="310" y="68" width="12" height="12" style="fill:var(--fail)"/><text x="328.0" y="78.0" font-size="12" text-anchor="start" fill="currentColor">0.2 × Poiss(x | 4)  (M)</text><text x="500.0" y="214.0" font-size="12" text-anchor="end" fill="currentColor">packets x →</text><text x="40.0" y="16.0" font-size="12" text-anchor="start" fill="currentColor">R's joint vs M's joint for each packet count x (one bar pair per x)</text></svg></div>
<p><b>3. The likelihood.</b> "How likely is this packet count, if the user is R?" = the Poisson formula with R's rate: \(\mathrm{Poiss}(x \mid 2) = \frac{2^x e^{-2}}{x!}\). For M, the rate 4. The question's table gives \(e^{-2} = 0.1353\) and \(e^{-4} = 0.0183\).</p>
<p><b>So:</b> per user: two likelihoods (Poisson), two joints (× prior), their sum (the marginal), two posteriors (joint ÷ sum). The bigger posterior is the MAP class.</p>`,
      start: R`<p><b>Key idea:</b> MAP = the class with the bigger posterior. Per user: likelihood = the Poisson formula with the class's rate, joint = prior × likelihood, marginal = the sum of the joints, posterior = joint ÷ marginal.</p>
<p><b>Part 2's fitted model:</b> \(\hat\pi_\mathrm{R} = 0.8,\ \hat\lambda_\mathrm{R} = 2\) and \(\hat\pi_\mathrm{M} = 0.2,\ \hat\lambda_\mathrm{M} = 4\). From the question's table: \(e^{-2} = 0.1353,\ e^{-4} = 0.0183\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 2\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 2 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,2}\,e^{-\hat\lambda_\mathrm{R}}}{2!} = \square\\ P(X = 2 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,2}\,e^{-\hat\lambda_\mathrm{M}}}{2!} = \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 2) &= \hat\pi_\mathrm{R}\cdot P(X = 2 \mid Y = \mathrm{R})\\ &= \square\\ P(Y = \mathrm{M}, X = 2) &= \hat\pi_\mathrm{M}\cdot P(X = 2 \mid Y = \mathrm{M})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 2) &= P(Y = \mathrm{R}, X = 2) + P(Y = \mathrm{M}, X = 2)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 2) &= \frac{P(Y = \mathrm{R}, X = 2)}{P(X = 2)} = \square\\ P(Y = \mathrm{M} \mid X = 2) &= \frac{P(Y = \mathrm{M}, X = 2)}{P(X = 2)} = \square\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → □</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 4\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,4}\,e^{-\hat\lambda_\mathrm{R}}}{4!} = \square\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,4}\,e^{-\hat\lambda_\mathrm{M}}}{4!} = \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= \hat\pi_\mathrm{R}\cdot P(X = 4 \mid Y = \mathrm{R})\\ &= \square\\ P(Y = \mathrm{M}, X = 4) &= \hat\pi_\mathrm{M}\cdot P(X = 4 \mid Y = \mathrm{M})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 4) &= P(Y = \mathrm{R}, X = 4) + P(Y = \mathrm{M}, X = 4)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 4) &= \frac{P(Y = \mathrm{R}, X = 4)}{P(X = 4)} = \square\\ P(Y = \mathrm{M} \mid X = 4) &= \frac{P(Y = \mathrm{M}, X = 4)}{P(X = 4)} = \square\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → □</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 7\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 7 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,7}\,e^{-\hat\lambda_\mathrm{R}}}{7!} = \square\\ P(X = 7 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,7}\,e^{-\hat\lambda_\mathrm{M}}}{7!} = \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 7) &= \hat\pi_\mathrm{R}\cdot P(X = 7 \mid Y = \mathrm{R})\\ &= \square\\ P(Y = \mathrm{M}, X = 7) &= \hat\pi_\mathrm{M}\cdot P(X = 7 \mid Y = \mathrm{M})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 7) &= P(Y = \mathrm{R}, X = 7) + P(Y = \mathrm{M}, X = 7)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 7) &= \frac{P(Y = \mathrm{R}, X = 7)}{P(X = 7)} = \square\\ P(Y = \mathrm{M} \mid X = 7) &= \frac{P(Y = \mathrm{M}, X = 7)}{P(X = 7)} = \square\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → □</p>
<p><b>So:</b> \(\hat y(2) = \square,\ \hat y(4) = \square,\ \hat y(7) = \square\)</p>`,
      answer: R`<p><b>Key idea:</b> MAP = the class with the bigger posterior. Per user: likelihood = the Poisson formula with the class's rate, joint = prior × likelihood, marginal = the sum of the joints, posterior = joint ÷ marginal.</p>
<p><b>Part 2's fitted model:</b> \(\hat\pi_\mathrm{R} = 0.8,\ \hat\lambda_\mathrm{R} = 2\) and \(\hat\pi_\mathrm{M} = 0.2,\ \hat\lambda_\mathrm{M} = 4\). From the question's table: \(e^{-2} = 0.1353,\ e^{-4} = 0.0183\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 2\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 2 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,2}\,e^{-\hat\lambda_\mathrm{R}}}{2!}\\ &= \frac{2^{2}\cdot 0.1353}{2!} = 0.2706\\ P(X = 2 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,2}\,e^{-\hat\lambda_\mathrm{M}}}{2!}\\ &= \frac{4^{2}\cdot 0.0183}{2!} = 0.1464\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 2) &= \hat\pi_\mathrm{R}\cdot P(X = 2 \mid Y = \mathrm{R})\\ &= 0.8 \cdot 0.2706 = 0.2165\\ P(Y = \mathrm{M}, X = 2) &= \hat\pi_\mathrm{M}\cdot P(X = 2 \mid Y = \mathrm{M})\\ &= 0.2 \cdot 0.1464 = 0.0293\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 2) &= P(Y = \mathrm{R}, X = 2) + P(Y = \mathrm{M}, X = 2)\\ &= 0.2165 + 0.0293 = 0.2458\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 2) &= \frac{P(Y = \mathrm{R}, X = 2)}{P(X = 2)}\\ &= \frac{0.2165}{0.2458} = 0.881\\ P(Y = \mathrm{M} \mid X = 2) &= \frac{P(Y = \mathrm{M}, X = 2)}{P(X = 2)}\\ &= \frac{0.0293}{0.2458} = 0.119\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → <b>R</b> \((0.881 \gt 0.119)\)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 4\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,4}\,e^{-\hat\lambda_\mathrm{R}}}{4!}\\ &= \frac{2^{4}\cdot 0.1353}{4!} = 0.0902\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,4}\,e^{-\hat\lambda_\mathrm{M}}}{4!}\\ &= \frac{4^{4}\cdot 0.0183}{4!} = 0.1952\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= \hat\pi_\mathrm{R}\cdot P(X = 4 \mid Y = \mathrm{R})\\ &= 0.8 \cdot 0.0902 = 0.0722\\ P(Y = \mathrm{M}, X = 4) &= \hat\pi_\mathrm{M}\cdot P(X = 4 \mid Y = \mathrm{M})\\ &= 0.2 \cdot 0.1952 = 0.0390\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 4) &= P(Y = \mathrm{R}, X = 4) + P(Y = \mathrm{M}, X = 4)\\ &= 0.0722 + 0.0390 = 0.1112\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 4) &= \frac{P(Y = \mathrm{R}, X = 4)}{P(X = 4)}\\ &= \frac{0.0722}{0.1112} = 0.649\\ P(Y = \mathrm{M} \mid X = 4) &= \frac{P(Y = \mathrm{M}, X = 4)}{P(X = 4)}\\ &= \frac{0.0390}{0.1112} = 0.351\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → <b>R</b> \((0.649 \gt 0.351)\)</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 7\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 7 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,7}\,e^{-\hat\lambda_\mathrm{R}}}{7!}\\ &= \frac{2^{7}\cdot 0.1353}{7!} = 0.0034\\ P(X = 7 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,7}\,e^{-\hat\lambda_\mathrm{M}}}{7!}\\ &= \frac{4^{7}\cdot 0.0183}{7!} = 0.0595\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 7) &= \hat\pi_\mathrm{R}\cdot P(X = 7 \mid Y = \mathrm{R})\\ &= 0.8 \cdot 0.0034 = 0.0027\\ P(Y = \mathrm{M}, X = 7) &= \hat\pi_\mathrm{M}\cdot P(X = 7 \mid Y = \mathrm{M})\\ &= 0.2 \cdot 0.0595 = 0.0119\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 7) &= P(Y = \mathrm{R}, X = 7) + P(Y = \mathrm{M}, X = 7)\\ &= 0.0027 + 0.0119 = 0.0146\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 7) &= \frac{P(Y = \mathrm{R}, X = 7)}{P(X = 7)}\\ &= \frac{0.0027}{0.0146} = 0.188\\ P(Y = \mathrm{M} \mid X = 7) &= \frac{P(Y = \mathrm{M}, X = 7)}{P(X = 7)}\\ &= \frac{0.0119}{0.0146} = 0.812\end{aligned}\]
<p><b>MAP:</b> the bigger posterior → <b>M</b> \((0.812 \gt 0.188)\)</p>
<p><b>So:</b> \(\hat y(2) = \mathrm{R},\ \hat y(4) = \mathrm{R},\ \hat y(7) = \mathrm{M}\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> MAP for each user (2, 4, 7 packets): the class with the bigger posterior. Same steps as 2025-A Q5.2: likelihood → joint → marginal → posterior, with part 2's numbers.`,
          remember: R`\[\begin{aligned}\text{joint} &= \pi_y \cdot p(x \mid y)\\ p(x) &= \text{the sum of the joints}\\ p(y \mid x) &= \frac{\text{joint}}{p(x)}\end{aligned}\]<p>Bayes' rule, the same three lines as every Bayes question. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>Likelihoods</b> — the Poisson formula with each class's rate, \(e^{-2} = 0.1353\), \(e^{-4} = 0.0183\) from the question's table: <div class="tw"><table><thead><tr><th>\(x\)</th><th>\(\mathrm{Poiss}(x \mid 2)\) (R)</th><th>\(\mathrm{Poiss}(x \mid 4)\) (M)</th></tr></thead><tbody>
<tr><td>\(2\)</td><td>\(\frac{4 \cdot 0.1353}{2} = 0.2706\)</td><td>\(\frac{16 \cdot 0.0183}{2} = 0.1464\)</td></tr>
<tr><td>\(4\)</td><td>\(\frac{16 \cdot 0.1353}{24} = 0.0902\)</td><td>\(\frac{256 \cdot 0.0183}{24} = 0.1952\)</td></tr>
<tr><td>\(7\)</td><td>\(\frac{128 \cdot 0.1353}{5040} = 0.0034\)</td><td>\(\frac{16384 \cdot 0.0183}{5040} = 0.0595\)</td></tr></tbody></table></div>`,
          why: R`<p>[sheet: Poisson probability mass function with]: \(\lambda^k e^{-\lambda}/k!\) with \(k = x\). R's rate is 2, M's is 4 (part 2). \(2! = 2\), \(4! = 24\), \(7! = 5040\).</p>` },
        { line: R`<b>Joints, marginal, posteriors</b> — prior × likelihood, their sum, then each ÷ the sum: <div class="tw"><table><thead><tr><th>\(x\)</th><th>\(\text{joint R}\)</th><th>\(\text{joint M}\)</th><th>\(\text{marginal}\)</th><th>\(p(\mathrm{R} \mid x)\)</th><th>\(p(\mathrm{M} \mid x)\)</th></tr></thead><tbody>
<tr><td>\(2\)</td><td>\(0.2165\)</td><td>\(0.0293\)</td><td>\(0.2458\)</td><td>\(0.881\)</td><td>\(0.119\)</td></tr>
<tr><td>\(4\)</td><td>\(0.0722\)</td><td>\(0.0390\)</td><td>\(0.1112\)</td><td>\(0.649\)</td><td>\(0.351\)</td></tr>
<tr><td>\(7\)</td><td>\(0.0027\)</td><td>\(0.0119\)</td><td>\(0.0146\)</td><td>\(0.188\)</td><td>\(0.812\)</td></tr></tbody></table></div>`,
          why: R`<p>E.g. \(x = 4\): joint R \(= 0.8 \times 0.0902 = 0.0722\), joint M \(= 0.2 \times 0.1952 = 0.0390\), sum \(0.1112\), posteriors \(0.0722/0.1112 = 0.649\) and \(0.0390/0.1112 = 0.351\).</p>` },
        { line: R`<b>Classify</b> — the bigger posterior: \(x = 2\): R (0.881), \(x = 4\): R (0.649), \(x = 7\): M (0.812). Done.`,
          why: R`<p>M has the higher <b>likelihood</b> at \(x = 4\) (0.1952 vs 0.0902), but M users are rare (prior 0.2), so R still wins the posterior. At \(x = 7\) the likelihood gap is too big for the prior to save R.</p>`,
          extra: [{ label: "the official solution's shortcut: one cut-off for every x", html: R`<p>Instead of computing each user, write "M's joint \(\gt\) R's joint" once for a general \(x\):</p>
\[\begin{aligned}0.2\cdot\frac{4^x e^{-4}}{x!} &\gt 0.8\cdot\frac{2^x e^{-2}}{x!}\\ \iff \frac{4^x}{2^x} &\gt \frac{0.8}{0.2}\cdot\frac{e^{-2}}{e^{-4}}\\ \iff 2^x &\gt 4e^2 = 29.556\end{aligned}\]
<p><b>Left:</b> 0.2 and \(e^{-4}\) cancel; \(\tfrac{4^x}{2^x} = \big(\tfrac42\big)^x = 2^x\).</p>
<p><b>Right:</b> \(2^x\) cancels; \(\tfrac{0.8}{0.2} = 4\); \(\tfrac{e^{-2}}{e^{-4}} = e^{-2+4} = e^2\) (dividing powers of \(e\) = subtract the exponents; optional pointer, extension sheet: [sheet: Powers and Logarithms]). \(e^2 = 7.389\) is in the question's table.</p>
<p>\(2^4 = 16 \lt 29.556 \lt 32 = 2^5\), so M iff \(x \ge 5\): 2 → R, 4 → R, 7 → M. Same answer; it's what part 4 builds on.</p>` },
                  { label: "Moed B trap", html: R`<p>You left this blank (0/5). The joint → marginal → posterior steps above earn the points on their own.</p>` }] },
      ],
      compare: R`Same three classifications as the official solution. It uses the cut-off shortcut (step 4's first box): "M iff \(2^x \gt 4e^2\)", which skips the per-user numbers.`,
    },

    "2026B-q4.4": {
      point: R`<p>Part 3's comparison, turned around: <b>now \(x = 4\) is fixed and the prior is the unknown.</b></p>
<p><b>1. What the question asks.</b> "Smallest \(\pi_\mathrm{M}\) for which \(x = 4\) is classified M" = the \(\pi_\mathrm{M}\) where M's joint and R's joint tie; above it, M wins.</p>
<p><b>2. The picture.</b> At \(x = 4\) the two Poisson numbers are fixed. M's joint = \(\pi_\mathrm{M}\) × a number: a line going up. R's joint = \((1 - \pi_\mathrm{M})\) × a number: a line going down. They cross once:</p><div class="fig"><svg viewBox="0 0 520 230" width="520" role="img" aria-label="Two straight lines in pi_M: M's joint rises, R's joint falls, they cross at the smallest pi_M"><line x1="60" y1="190" x2="480" y2="190" style="stroke:var(--muted)"/><line x1="60" y1="190" x2="60" y2="25" style="stroke:var(--muted)"/><rect x="192.7" y="30" width="287.3" height="160" style="fill:var(--fail-bg)" opacity="0.7"/><line x1="60.0" y1="190.0" x2="480.0" y2="41.1" style="stroke:var(--fail)" stroke-width="2.5"/><line x1="60.0" y1="121.3" x2="480.0" y2="190.0" style="stroke:var(--accent)" stroke-width="2.5"/><text x="476.0" y="33.1" font-size="12" text-anchor="end" fill="currentColor">M's joint = π<tspan baseline-shift="sub" font-size="9">M</tspan> × Poiss(4 | 4)</text><text x="66.0" y="113.3" font-size="12" text-anchor="start" fill="currentColor">R's joint = (1 − π<tspan baseline-shift="sub" font-size="9">M</tspan>) × Poiss(4 | 2)</text><circle cx="192.7" cy="143.0" r="5" style="fill:var(--shaky)"/><line x1="192.7" y1="143.0" x2="192.7" y2="190" style="stroke:var(--shaky)" stroke-dasharray="4 3"/><text x="196.7" y="206.0" font-size="12" text-anchor="start" fill="currentColor" font-weight="700">← tie = the smallest π<tspan baseline-shift="sub" font-size="9">M</tspan></text><text x="110.4" y="160.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">R wins</text><text x="387.6" y="140.0" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">M wins</text><text x="60.0" y="206.0" font-size="12" text-anchor="middle" fill="currentColor">0</text><text x="480.0" y="206.0" font-size="12" text-anchor="middle" fill="currentColor">1</text><line x1="144.0" y1="190" x2="144.0" y2="195" style="stroke:var(--muted)"/><circle cx="144.0" cy="190" r="4" style="fill:var(--accent)"/><text x="148.0" y="206.0" font-size="12" text-anchor="end" fill="currentColor">0.2 (part 2)</text><text x="480.0" y="224.0" font-size="12" text-anchor="end" fill="currentColor">π<tspan baseline-shift="sub" font-size="9">M</tspan> →</text><text x="60.0" y="18.0" font-size="12" text-anchor="start" fill="currentColor">a user with x = 4, as π<tspan baseline-shift="sub" font-size="9">M</tspan> slides from 0 to 1</text></svg></div>
<p><b>3. Why it must be larger than 0.2.</b> The Poisson part favours M (4 is M's typical count; R's is 2). But M is rare: with \(\pi_\mathrm{M} = 0.2\), part 3 said R, so 0.2 is left of the tie. A bigger \(\pi_\mathrm{M}\) only helps M, so the tie is above 0.2.</p>
<p><b>So:</b> write M's joint \(\gt\) R's joint with \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\), solve for \(\pi_\mathrm{M}\), and compare with 0.2.</p>`,
      start: R`<p><b>Key idea:</b> at \(x = 4\) the Poisson numbers are fixed and only the prior moves: MAP says M iff M's posterior beats R's, i.e. (same marginal) iff \(\pi_\mathrm{M}\,\mathrm{Poiss}(4 \mid 4) \gt (1 - \pi_\mathrm{M})\,\mathrm{Poiss}(4 \mid 2)\); solve for \(\pi_\mathrm{M}\). It must be above 0.2, because with 0.2 part 3 predicted R.</p>
<p><b>Part 2's rates:</b> \(\hat\lambda_\mathrm{R} = 2,\ \hat\lambda_\mathrm{M} = 4\). <b>Priors:</b> \(\pi_\mathrm{M}\) is the unknown, \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 4\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,4}\,e^{-\hat\lambda_\mathrm{R}}}{4!}\\ &= \square\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,4}\,e^{-\hat\lambda_\mathrm{M}}}{4!}\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= \pi_\mathrm{R}\cdot P(X = 4 \mid Y = \mathrm{R})\\ &= (1 - \pi_\mathrm{M})\cdot\square\\ P(Y = \mathrm{M}, X = 4) &= \pi_\mathrm{M}\cdot P(X = 4 \mid Y = \mathrm{M})\\ &= \pi_\mathrm{M}\cdot\square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[P(X = 4) = P(Y = \mathrm{R}, X = 4) + P(Y = \mathrm{M}, X = 4)\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 4) &= \frac{P(Y = \mathrm{R}, X = 4)}{P(X = 4)}\\ P(Y = \mathrm{M} \mid X = 4) &= \frac{P(Y = \mathrm{M}, X = 4)}{P(X = 4)}\end{aligned}\]
<p><b>MAP says M iff</b> M's posterior is bigger (× \(P(X = 4)\) on both sides, the same positive number):</p>
\[\begin{aligned}P(Y = \mathrm{M} \mid X = 4) &\gt P(Y = \mathrm{R} \mid X = 4)\\ \iff P(Y = \mathrm{M}, X = 4) &\gt P(Y = \mathrm{R}, X = 4)\\ \iff \pi_\mathrm{M}\cdot\square &\gt (1 - \pi_\mathrm{M})\cdot\square\\ \iff \frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} &\gt \square\\ \iff \square\,\pi_\mathrm{M} &\gt \square - \square\,\pi_\mathrm{M}\\ \iff \pi_\mathrm{M} &\gt \square \approx \square\end{aligned}\]
<p>This is \(\square\) than \(\hat\pi_\mathrm{M} = 0.2\), because \(\square\)</p>`,
      answer: R`<p><b>Key idea:</b> at \(x = 4\) the Poisson numbers are fixed and only the prior moves: MAP says M iff M's posterior beats R's, i.e. (same marginal) iff \(\pi_\mathrm{M}\,\mathrm{Poiss}(4 \mid 4) \gt (1 - \pi_\mathrm{M})\,\mathrm{Poiss}(4 \mid 2)\); solve for \(\pi_\mathrm{M}\). It must be above 0.2, because with 0.2 part 3 predicted R.</p>
<p><b>Part 2's rates:</b> \(\hat\lambda_\mathrm{R} = 2,\ \hat\lambda_\mathrm{M} = 4\). <b>Priors:</b> \(\pi_\mathrm{M}\) is the unknown, \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 4\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,4}\,e^{-\hat\lambda_\mathrm{R}}}{4!}\\ &= \frac{2^4 e^{-2}}{4!} \approx 0.0902\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,4}\,e^{-\hat\lambda_\mathrm{M}}}{4!}\\ &= \frac{4^4 e^{-4}}{4!} \approx 0.1952\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= \pi_\mathrm{R}\cdot P(X = 4 \mid Y = \mathrm{R})\\ &= (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\\ P(Y = \mathrm{M}, X = 4) &= \pi_\mathrm{M}\cdot P(X = 4 \mid Y = \mathrm{M})\\ &= \pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!}\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[P(X = 4) = P(Y = \mathrm{R}, X = 4) + P(Y = \mathrm{M}, X = 4)\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 4) &= \frac{P(Y = \mathrm{R}, X = 4)}{P(X = 4)}\\ P(Y = \mathrm{M} \mid X = 4) &= \frac{P(Y = \mathrm{M}, X = 4)}{P(X = 4)}\end{aligned}\]
<p><b>MAP says M iff</b> M's posterior is bigger (× \(P(X = 4)\) on both sides, the same positive number):</p>
\[\begin{aligned}P(Y = \mathrm{M} \mid X = 4) &\gt P(Y = \mathrm{R} \mid X = 4)\\ \iff P(Y = \mathrm{M}, X = 4) &\gt P(Y = \mathrm{R}, X = 4)\\ \iff \pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!} &\gt (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\\ \iff \frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} &\gt \frac{2^4 e^{-2}}{4^4 e^{-4}} = \frac{e^2}{16}\\ \iff 16\,\pi_\mathrm{M} &\gt e^2 - e^2\,\pi_\mathrm{M}\\ \iff \pi_\mathrm{M} &\gt \frac{e^2}{16 + e^2} \approx 0.316\end{aligned}\]
<p>This is <b>larger</b> than \(\hat\pi_\mathrm{M} = 0.2\), because with \(\hat\pi_\mathrm{M} = 0.2\) part 3 gave \(\hat y(4) = \mathrm{R}\): 4 packets is M's typical count, but M is rare, so its prior must be bigger to predict M.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> The smallest \(\pi_\mathrm{M}\) that makes \(x = 4\) an M. MAP says M iff M's posterior is bigger. So write the four Bayes lines with \(\pi_\mathrm{M}\) as a letter and \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\), and solve.`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ P(Y = y \mid X = x)\]\[P(Y = y \mid X = x) = \frac{\pi_y\,P(X = x \mid Y = y)}{P(X = x)}\]<p>MAP = the biggest posterior; posterior = joint ÷ marginal (Bayes' rule). Here \(P(X = x \mid Y = y)\) is the Poisson. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>` },
        { line: R`<b>Likelihoods and joints</b> — the Poisson with \(x = 4\) and part 2's rates: <div class="formula">\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{2^4 e^{-2}}{4!} \approx 0.0902\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{4^4 e^{-4}}{4!} \approx 0.1952\end{aligned}\]</div>× the prior, with \(\pi_\mathrm{M}\) left as a letter: <div class="formula">\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\\ P(Y = \mathrm{M}, X = 4) &= \pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!}\end{aligned}\]</div>`,
          why: R`<p>[sheet: Poisson probability mass function with]: \(\lambda^k e^{-\lambda}/k!\) with \(k = 4\). R's rate is 2, M's is 4 (part 2). The prior is what we're looking for, so it stays a letter.</p>` },
        { line: R`<b>Marginal and posteriors → compare the joints</b> — both posteriors are "joint ÷ the same \(P(X = 4)\)", so multiplying both sides by \(P(X = 4)\) leaves the joints: <div class="formula">\[\begin{aligned}P(Y = \mathrm{M} \mid X = 4) &\gt P(Y = \mathrm{R} \mid X = 4)\\ \iff \pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!} &\gt (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\end{aligned}\]</div>`,
          why: R`<p>\(P(X = 4)\) = the sum of the two joints, a positive number. Multiplying both sides of "\(a \gt b\)" by the same positive number keeps it true, so "posterior M \(\gt\) posterior R" is exactly "joint M \(\gt\) joint R".</p>` },
        { line: R`<b>Solve for \(\pi_\mathrm{M}\)</b> — priors to the left, Poissons to the right, then multiply by \(16(1 - \pi_\mathrm{M})\): <div class="formula">\[\begin{aligned}\frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} &\gt \frac{2^4 e^{-2}}{4^4 e^{-4}} = \frac{e^2}{16}\\ 16\,\pi_\mathrm{M} &\gt e^2 - e^2\,\pi_\mathrm{M}\\ \pi_\mathrm{M} &\gt \frac{e^2}{16 + e^2} = \frac{7.389}{23.389} \approx 0.316\end{aligned}\]</div>`,
          why: R`<p>\(4!\) cancels; \(\tfrac{2^4}{4^4} = \tfrac{16}{256} = \tfrac{1}{16}\); \(\tfrac{e^{-2}}{e^{-4}} = e^2\). Then add \(e^2\pi_\mathrm{M}\) to both sides, \(\pi_\mathrm{M}(16 + e^2) \gt e^2\), divide by \(16 + e^2\) (same moves as 2025-A Q5.4). At exactly 0.316 the two joints tie.</p>` },
        { line: R`<b>Compare with 0.2</b> — 0.316 is <b>larger</b>. That fits part 3: with \(\hat\pi_\mathrm{M} = 0.2\), \(x = 4\) was R, so \(\pi_\mathrm{M}\) has to go up to get M. Done.`,
          why: R`<p>4 packets is exactly M's typical count, but M is rare, so its prior must be big enough before we call it.</p>` },
      ],
      compare: R`Steps 3–5 are the official lines: it starts from "M iff \(\tfrac{\pi_\mathrm{M}\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{M})}{\pi_\mathrm{R}\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{R})} \gt 1\)" (the joints, step 3) and gets \(\pi_\mathrm{M} \gt \tfrac{e^2}{16 + e^2} \approx 0.316\), larger than 0.2.`,
    },

    "2026B-q4.5": {
      point: R`<p>Costs act like extra weights on the joints: <b>the mistake you hate most gets weighed up.</b></p>
<p><b>1. Reading the costs.</b> \(C_{y,y'}\) = the cost of saying \(y\) when the truth is \(y'\). \(C_{\mathrm{R},\mathrm{M}}\) = saying "regular" to a malicious user = a missed threat. \(C_{\mathrm{M},\mathrm{R}}\) = a false alarm. Wanted: the smallest "missed threat ÷ false alarm" that makes \(x = 4\) an M.</p>
<p><b>2. Where each mistake happens.</b> Among the users who send 4 packets: saying M is wrong on the R ones (R's joint), each costing \(C_{\mathrm{M},\mathrm{R}}\). Saying R is wrong on the M ones (M's joint), each costing \(C_{\mathrm{R},\mathrm{M}}\).</p>
<p><b>3. Why the answer is a ratio.</b> At \(x = 4\), R's joint is bigger (part 3 said R). So to call M, a missed threat must cost enough to make up the gap: \(C_{\mathrm{R},\mathrm{M}}\) × M's joint \(\gt\) \(C_{\mathrm{M},\mathrm{R}}\) × R's joint, i.e. the ratio must beat R's joint ÷ M's joint.</p>
<p><b>So:</b> write both costs, divide to get the ratio alone, simplify (the same Poisson ratio as in part 4).</p>`,
      start: R`<p><b>Key idea:</b> classifying = a bet; you pay only when you're wrong. Saying M costs \(C_{\mathrm{M},\mathrm{R}}\) × (chance it's actually R), saying R costs \(C_{\mathrm{R},\mathrm{M}}\) × (chance it's actually M). M is cheaper iff \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) \(\gt\) R's posterior ÷ M's posterior at \(x = 4\).</p>
<p><b>The costs as sentences:</b></p>
<p>· Classifying as M when it's actually R (a false alarm) costs \(C_{\mathrm{M},\mathrm{R}}\).</p>
<p>· Classifying as R when it's actually M (a missed threat) costs \(C_{\mathrm{R},\mathrm{M}}\).</p>
<p>· Being right costs 0.</p>
<p><b>Part 2's model:</b> \(\hat\pi_\mathrm{R} = 0.8,\ \hat\lambda_\mathrm{R} = 2\) and \(\hat\pi_\mathrm{M} = 0.2,\ \hat\lambda_\mathrm{M} = 4\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 4\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,4}\,e^{-\hat\lambda_\mathrm{R}}}{4!}\\ &= \square\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,4}\,e^{-\hat\lambda_\mathrm{M}}}{4!}\\ &= \square\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= \hat\pi_\mathrm{R}\cdot P(X = 4 \mid Y = \mathrm{R})\\ &= \square\\ P(Y = \mathrm{M}, X = 4) &= \hat\pi_\mathrm{M}\cdot P(X = 4 \mid Y = \mathrm{M})\\ &= \square\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 4) &= P(Y = \mathrm{R}, X = 4) + P(Y = \mathrm{M}, X = 4)\\ &= \square\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 4) &= \frac{P(Y = \mathrm{R}, X = 4)}{P(X = 4)}\\ &= \square\\ P(Y = \mathrm{M} \mid X = 4) &= \frac{P(Y = \mathrm{M}, X = 4)}{P(X = 4)}\\ &= \square\end{aligned}\]
<p><b>The two bets:</b></p>
<p>Classifying as M: if it's actually R (chance □) it costs \(C_{\mathrm{M},\mathrm{R}}\); if it's actually M (chance □) it costs 0 → \(\square\cdot C_{\mathrm{M},\mathrm{R}}\)</p>
<p>Classifying as R: if it's actually R (chance □) it costs 0; if it's actually M (chance □) it costs \(C_{\mathrm{R},\mathrm{M}}\) → \(\square\cdot C_{\mathrm{R},\mathrm{M}}\)</p>
<p><b>M is cheaper iff</b></p>
\[\begin{aligned}\square\cdot C_{\mathrm{R},\mathrm{M}} &\gt \square\cdot C_{\mathrm{M},\mathrm{R}}\\ \iff \frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} &\gt \frac{P(Y = \mathrm{R} \mid X = 4)}{P(Y = \mathrm{M} \mid X = 4)}\\ &= \frac{P(Y = \mathrm{R}, X = 4)}{P(Y = \mathrm{M}, X = 4)}\\ &= \frac{\square}{\square}\\ &= \square \approx \square\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> classifying = a bet; you pay only when you're wrong. Saying M costs \(C_{\mathrm{M},\mathrm{R}}\) × (chance it's actually R), saying R costs \(C_{\mathrm{R},\mathrm{M}}\) × (chance it's actually M). M is cheaper iff \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) \(\gt\) R's posterior ÷ M's posterior at \(x = 4\).</p>
<p><b>The costs as sentences:</b></p>
<p>· Classifying as M when it's actually R (a false alarm) costs \(C_{\mathrm{M},\mathrm{R}}\).</p>
<p>· Classifying as R when it's actually M (a missed threat) costs \(C_{\mathrm{R},\mathrm{M}}\).</p>
<p>· Being right costs 0.</p>
<p><b>Part 2's model:</b> \(\hat\pi_\mathrm{R} = 0.8,\ \hat\lambda_\mathrm{R} = 2\) and \(\hat\pi_\mathrm{M} = 0.2,\ \hat\lambda_\mathrm{M} = 4\).</p>
<p style="margin-top:14px;border-top:1px solid #ccd;padding-top:8px"><b>User with \(x = 4\)</b></p>
<p><b>Likelihoods (the Poisson formula):</b></p>
\[\begin{aligned}P(X = 4 \mid Y = \mathrm{R}) &= \frac{\hat\lambda_\mathrm{R}^{\,4}\,e^{-\hat\lambda_\mathrm{R}}}{4!}\\ &= \frac{2^4 e^{-2}}{4!} \approx 0.0902\\ P(X = 4 \mid Y = \mathrm{M}) &= \frac{\hat\lambda_\mathrm{M}^{\,4}\,e^{-\hat\lambda_\mathrm{M}}}{4!}\\ &= \frac{4^4 e^{-4}}{4!} \approx 0.1952\end{aligned}\]
<p><b>Joints (prior × likelihood):</b></p>
\[\begin{aligned}P(Y = \mathrm{R}, X = 4) &= \hat\pi_\mathrm{R}\cdot P(X = 4 \mid Y = \mathrm{R})\\ &= 0.8\cdot 0.0902 = 0.0722\\ P(Y = \mathrm{M}, X = 4) &= \hat\pi_\mathrm{M}\cdot P(X = 4 \mid Y = \mathrm{M})\\ &= 0.2\cdot 0.1952 = 0.0390\end{aligned}\]
<p><b>Marginal (the sum of the joints):</b></p>
\[\begin{aligned}P(X = 4) &= P(Y = \mathrm{R}, X = 4) + P(Y = \mathrm{M}, X = 4)\\ &= 0.0722 + 0.0390 = 0.1112\end{aligned}\]
<p><b>Posteriors (joint ÷ marginal):</b></p>
\[\begin{aligned}P(Y = \mathrm{R} \mid X = 4) &= \frac{P(Y = \mathrm{R}, X = 4)}{P(X = 4)}\\ &= \frac{0.0722}{0.1112} \approx 0.649\\ P(Y = \mathrm{M} \mid X = 4) &= \frac{P(Y = \mathrm{M}, X = 4)}{P(X = 4)}\\ &= \frac{0.0390}{0.1112} \approx 0.351\end{aligned}\]
<p><b>The two bets:</b></p>
<p>Classifying as M: if it's actually R (chance 0.649) it costs \(C_{\mathrm{M},\mathrm{R}}\); if it's actually M (chance 0.351) it costs 0 → \(0.649\cdot C_{\mathrm{M},\mathrm{R}}\)</p>
<p>Classifying as R: if it's actually R (chance 0.649) it costs 0; if it's actually M (chance 0.351) it costs \(C_{\mathrm{R},\mathrm{M}}\) → \(0.351\cdot C_{\mathrm{R},\mathrm{M}}\)</p>
<p><b>M is cheaper iff</b></p>
\[\begin{aligned}0.351\cdot C_{\mathrm{R},\mathrm{M}} &\gt 0.649\cdot C_{\mathrm{M},\mathrm{R}}\\ \iff \frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} &\gt \frac{P(Y = \mathrm{R} \mid X = 4)}{P(Y = \mathrm{M} \mid X = 4)}\\ &= \frac{P(Y = \mathrm{R}, X = 4)}{P(Y = \mathrm{M}, X = 4)}\\ &= \frac{0.8\cdot 2^4 e^{-2}/4!}{0.2\cdot 4^4 e^{-4}/4!}\\ &= 4\cdot\frac{e^2}{16} = \frac{e^2}{4} \approx 1.847\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> Say M when its expected cost is smaller than saying R's. A bet costs only when the truth is the other class, so: posteriors at \(x = 4\), both bets, then \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) alone.`,
          remember: R`\[\begin{aligned}&\text{risk of saying } y = \sum_{y'}C_{y,y'}\,P(Y = y' \mid X = x)\\ &\to\ \text{predict the smallest}\end{aligned}\]<p>[sheet: Expected risk of predicting class label y] has it with joints \(\pi_{y'}P(X = x \mid Y = y')\) instead of posteriors, and \(\lambda\) instead of \(C\). Every joint ÷ the same \(P(X = x)\), so the same winner.</p>` },
        { line: R`<b>Read the costs</b> — \(C_{y,y'}\) = predicting \(y\) when the truth is \(y'\): classifying as M when it's actually R (false alarm) costs \(C_{\mathrm{M},\mathrm{R}}\); as R when it's actually M (missed threat) costs \(C_{\mathrm{R},\mathrm{M}}\); right costs 0.` },
        { line: R`<b>Likelihoods → joints → marginal → posteriors at \(x = 4\)</b> — part 2's model, exactly as in part 3: <div class="tw"><table><thead><tr><th></th><th>likelihood</th><th>joint</th><th>posterior</th></tr></thead><tbody>
<tr><td>R</td><td>\(\frac{2^4 e^{-2}}{4!} = 0.0902\)</td><td>\(0.0722\)</td><td>\(\frac{0.0722}{0.1112} = 0.649\)</td></tr>
<tr><td>M</td><td>\(\frac{4^4 e^{-4}}{4!} = 0.1952\)</td><td>\(0.0390\)</td><td>\(\frac{0.0390}{0.1112} = 0.351\)</td></tr></tbody></table></div>`,
          why: R`<p>Joints: \(0.8 \times 0.0902 = 0.0722\) and \(0.2 \times 0.1952 = 0.0390\). Marginal: \(0.0722 + 0.0390 = 0.1112\). Part 3 already found these for \(x = 4\).</p>` },
        { line: R`<b>The two bets</b> — every truth, its chance, its cost: <div class="formula">\[\begin{aligned}\text{as M: }& 0.649\cdot C_{\mathrm{M},\mathrm{R}} + 0.351\cdot 0\\ \text{as R: }& 0.649\cdot 0 + 0.351\cdot C_{\mathrm{R},\mathrm{M}}\end{aligned}\]</div>M is cheaper iff \(0.351\,C_{\mathrm{R},\mathrm{M}} \gt 0.649\,C_{\mathrm{M},\mathrm{R}}\).`,
          why: R`<p>Saying M on a user who's actually R is the false alarm; saying R on a user who's actually M is the missed threat. "Cheaper to say M" = the say-M cost is the smaller one.</p>` },
        { line: R`<b>The ratio alone</b> — divide by \(C_{\mathrm{M},\mathrm{R}}\) and by 0.351; the posteriors' ratio = the joints' ratio (same marginal): <div class="formula">\[\begin{aligned}\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} &\gt \frac{0.8\cdot 2^4 e^{-2}/4!}{0.2\cdot 4^4 e^{-4}/4!}\\ &= 4\cdot\frac{e^2}{16} = \frac{e^2}{4} \approx 1.847\end{aligned}\]</div>Done.`,
          why: R`<p>\(\tfrac{0.8}{0.2} = 4\). Poisson ratio: \(4!\) cancels, \(\tfrac{2^4}{4^4} = \tfrac{1}{16}\), \(\tfrac{e^{-2}}{e^{-4}} = e^2\) (as in part 4). With the rounded posteriors, \(0.649 / 0.351 \approx 1.85\): the same number up to rounding.</p>
<p>So \(x = 4\) is called M only if a missed threat costs more than ≈ 1.85 false alarms.</p>` },
      ],
      compare: R`Step 5 is the official answer: "M iff \(\tfrac{C_{\mathrm{R},\mathrm{M}}\hat\pi_\mathrm{M}\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{M})}{C_{\mathrm{M},\mathrm{R}}\hat\pi_\mathrm{R}\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{R})} \gt 1\)", i.e. step 4's bets with joints in place of posteriors, giving \(\tfrac{e^2}{4} \approx 1.847\).`,
      slip: R`The last sentence is garbled. It means: call \(x = 4\) malicious only if a missed threat costs more than about 1.847 times a false alarm, i.e. \(C_{\mathrm{R},\mathrm{M}} / C_{\mathrm{M},\mathrm{R}} \gt \tfrac{e^2}{4} \approx 1.847\).`,
    },

    "2026B-q4.6": {
      point: R`<p>With cost 1 per mistake, <b>risk = the probability of a mistake.</b> So ask: when is part 3's rule wrong?</p>
<p><b>1. What the question asks.</b> New users come from the fitted model (R: share 0.8, rate 2; M: share 0.2, rate 4). Part 3's rule says M iff \(x \ge 5\). How often is it wrong?</p>
<p><b>2. The picture.</b> Each class's joint as bars, with the rule's cut between 4 and 5. The mistakes are the R users right of the cut and the M users left of it:</p><div class="fig"><svg viewBox="0 0 520 236" width="520" role="img" aria-label="The joints as bars with the cut between 4 and 5; the mistakes are highlighted"><line x1="40" y1="180" x2="500" y2="180" style="stroke:var(--muted)"/><rect x="45.9" y="116.4" width="15.1" height="63.6" style="fill:var(--accent)" opacity="0.3"/><rect x="60.9" y="177.8" width="15.1" height="2.2" style="fill:var(--fail)" opacity="1"/><text x="60.9" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">0</text><rect x="87.7" y="52.7" width="15.1" height="127.3" style="fill:var(--accent)" opacity="0.3"/><rect x="102.7" y="171.4" width="15.1" height="8.6" style="fill:var(--fail)" opacity="1"/><text x="102.7" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">1</text><rect x="129.5" y="52.7" width="15.1" height="127.3" style="fill:var(--accent)" opacity="0.3"/><rect x="144.5" y="162.8" width="15.1" height="17.2" style="fill:var(--fail)" opacity="1"/><text x="144.5" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">2</text><rect x="171.3" y="95.2" width="15.1" height="84.8" style="fill:var(--accent)" opacity="0.3"/><rect x="186.4" y="157.0" width="15.1" height="23.0" style="fill:var(--fail)" opacity="1"/><text x="186.4" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">3</text><rect x="213.1" y="137.6" width="15.1" height="42.4" style="fill:var(--accent)" opacity="0.3"/><rect x="228.2" y="157.0" width="15.1" height="23.0" style="fill:var(--fail)" opacity="1"/><text x="228.2" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">4</text><rect x="254.9" y="163.0" width="15.1" height="17.0" style="fill:var(--accent)" opacity="1"/><rect x="270.0" y="161.6" width="15.1" height="18.4" style="fill:var(--fail)" opacity="0.3"/><text x="270.0" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">5</text><rect x="296.8" y="174.3" width="15.1" height="5.7" style="fill:var(--accent)" opacity="1"/><rect x="311.8" y="167.8" width="15.1" height="12.2" style="fill:var(--fail)" opacity="0.3"/><text x="311.8" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">6</text><rect x="338.6" y="178.4" width="15.1" height="1.6" style="fill:var(--accent)" opacity="1"/><rect x="353.6" y="173.0" width="15.1" height="7.0" style="fill:var(--fail)" opacity="0.3"/><text x="353.6" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">7</text><rect x="380.4" y="179.6" width="15.1" height="0.4" style="fill:var(--accent)" opacity="1"/><rect x="395.5" y="176.5" width="15.1" height="3.5" style="fill:var(--fail)" opacity="0.3"/><text x="395.5" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">8</text><rect x="422.2" y="179.9" width="15.1" height="0.1" style="fill:var(--accent)" opacity="1"/><rect x="437.3" y="178.4" width="15.1" height="1.6" style="fill:var(--fail)" opacity="0.3"/><text x="437.3" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">9</text><rect x="464.0" y="180.0" width="15.1" height="0.0" style="fill:var(--accent)" opacity="1"/><rect x="479.1" y="179.4" width="15.1" height="0.6" style="fill:var(--fail)" opacity="0.3"/><text x="479.1" y="196.0" font-size="12" text-anchor="middle" fill="currentColor">10</text><line x1="249.1" y1="28" x2="249.1" y2="180" style="stroke:var(--shaky)" stroke-width="2" stroke-dasharray="5 3"/><text x="243.1" y="38.0" font-size="12" text-anchor="end" fill="currentColor" font-weight="700">say R</text><text x="255.1" y="38.0" font-size="12" text-anchor="start" fill="currentColor" font-weight="700">say M</text><rect x="310" y="48" width="12" height="12" style="fill:var(--accent)"/><text x="328.0" y="58.0" font-size="12" text-anchor="start" fill="currentColor">0.8 × Poiss(x | 2)  (R)</text><rect x="310" y="68" width="12" height="12" style="fill:var(--fail)"/><text x="328.0" y="78.0" font-size="12" text-anchor="start" fill="currentColor">0.2 × Poiss(x | 4)  (M)</text><text x="500.0" y="214.0" font-size="12" text-anchor="end" fill="currentColor">packets x →</text><text x="40.0" y="16.0" font-size="12" text-anchor="start" fill="currentColor">the rule's mistakes: bright R bars right of the cut + bright M bars left of it</text></svg></div>
<p><b>3. Why "1 −".</b> \(\Pr[X \ge 5]\) is an endless sum (5, 6, 7, …). But all of a Poisson's probabilities add up to 1, so \(\Pr[X \ge 5] = 1 - \Pr[X \le 4]\): only five terms (0 to 4).</p>
<p><b>So:</b> risk = 0.8 × \(\Pr[X \ge 5 \mid \lambda = 2]\) + 0.2 × \(\Pr[X \le 4 \mid \lambda = 4]\), each from five Poisson terms.</p>`,
      start: R`<p><b>Key idea:</b> with cost 1 per mistake, risk = the probability of a mistake. Part 3's rule (M iff \(x \ge 5\)) is wrong on an R user with \(x \ge 5\) or an M user with \(x \le 4\): \(R = \hat\pi_\mathrm{R}\Pr[X \ge 5 \mid \lambda = 2] + \hat\pi_\mathrm{M}\Pr[X \le 4 \mid \lambda = 4]\).</p>
<p><b>The rule's two bets</b> (part 3: R when \(x \le 4\), M when \(x \ge 5\)):</p>
<p>Classifying as R (\(x \le 4\)): if it's actually R it costs 0; if it's actually M it costs 1 → chance \(\hat\pi_\mathrm{M}\cdot\Pr[X \le 4 \mid \lambda = \hat\lambda_\mathrm{M}]\)</p>
<p>Classifying as M (\(x \ge 5\)): if it's actually M it costs 0; if it's actually R it costs 1 → chance \(\hat\pi_\mathrm{R}\cdot\Pr[X \ge 5 \mid \lambda = \hat\lambda_\mathrm{R}]\)</p>
<p><b>Risk</b> = the chances of the cost-1 cases, added:</p>
\[\begin{aligned}R = \;&\hat\pi_\mathrm{R}\cdot\Pr[X \ge 5 \mid \lambda = 2]\\ +\;&\hat\pi_\mathrm{M}\cdot\Pr[X \le 4 \mid \lambda = 4]\end{aligned}\]
<p><b>The Poisson pieces</b> (one count: \(\Pr[X = k \mid \lambda] = \frac{\lambda^k e^{-\lambda}}{k!}\)):</p>
\[\begin{aligned}\Pr[X \le 4 \mid \lambda] &= \sum_{k=0}^{4}\frac{\lambda^k e^{-\lambda}}{k!}\\ &= e^{-\lambda}\Big(1 + \lambda + \frac{\lambda^2}{2} + \frac{\lambda^3}{6} + \frac{\lambda^4}{24}\Big)\end{aligned}\]
\[\begin{aligned}\Pr[X \le 4 \mid \lambda = 4] &= \square\\ \Pr[X \ge 5 \mid \lambda = 2] &= 1 - \Pr[X \le 4 \mid \lambda = 2]\\ &= 1 - \square = \square\end{aligned}\]
\[R = \square\cdot\square + \square\cdot\square \approx \square\]`,
      answer: R`<p><b>Key idea:</b> with cost 1 per mistake, risk = the probability of a mistake. Part 3's rule (M iff \(x \ge 5\)) is wrong on an R user with \(x \ge 5\) or an M user with \(x \le 4\): \(R = \hat\pi_\mathrm{R}\Pr[X \ge 5 \mid \lambda = 2] + \hat\pi_\mathrm{M}\Pr[X \le 4 \mid \lambda = 4]\).</p>
<p><b>The rule's two bets</b> (part 3: R when \(x \le 4\), M when \(x \ge 5\)):</p>
<p>Classifying as R (\(x \le 4\)): if it's actually R it costs 0; if it's actually M it costs 1 → chance \(\hat\pi_\mathrm{M}\cdot\Pr[X \le 4 \mid \lambda = \hat\lambda_\mathrm{M}]\)</p>
<p>Classifying as M (\(x \ge 5\)): if it's actually M it costs 0; if it's actually R it costs 1 → chance \(\hat\pi_\mathrm{R}\cdot\Pr[X \ge 5 \mid \lambda = \hat\lambda_\mathrm{R}]\)</p>
<p><b>Risk</b> = the chances of the cost-1 cases, added:</p>
\[\begin{aligned}R = \;&\hat\pi_\mathrm{R}\cdot\Pr[X \ge 5 \mid \lambda = 2]\\ +\;&\hat\pi_\mathrm{M}\cdot\Pr[X \le 4 \mid \lambda = 4]\end{aligned}\]
<p><b>The Poisson pieces</b> (one count: \(\Pr[X = k \mid \lambda] = \frac{\lambda^k e^{-\lambda}}{k!}\)):</p>
\[\begin{aligned}\Pr[X \le 4 \mid \lambda] &= \sum_{k=0}^{4}\frac{\lambda^k e^{-\lambda}}{k!}\\ &= e^{-\lambda}\Big(1 + \lambda + \frac{\lambda^2}{2} + \frac{\lambda^3}{6} + \frac{\lambda^4}{24}\Big)\end{aligned}\]
\[\begin{aligned}\Pr[X \le 4 \mid \lambda = 4] &= \tfrac{103}{3}e^{-4} \approx 0.6283\\ \Pr[X \ge 5 \mid \lambda = 2] &= 1 - \Pr[X \le 4 \mid \lambda = 2]\\ &= 1 - 7e^{-2} \approx 0.0529\end{aligned}\]
\[R = 0.8\cdot 0.0529 + 0.2\cdot 0.6283 \approx 0.168\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> Cost 1 for every mistake, so risk = the probability of a wrong prediction. Part 3's rule: M iff \(x \ge 5\). So find when that rule is wrong, and how likely each case is.` },
        { line: R`<b>The rule's two bets</b> — saying R (\(x \le 4\)) costs 1 only if it's actually M; saying M (\(x \ge 5\)) costs 1 only if it's actually R. Add the chances of those two cases: <div class="formula">\[\begin{aligned}R = \;&0.8\cdot\Pr[X \ge 5 \mid \lambda = 2]\\ +\;&0.2\cdot\Pr[X \le 4 \mid \lambda = 4]\end{aligned}\]</div>`,
          why: R`<p>Each piece = (share of users in that class) × (share of that class in the wrong range). The right cases cost 0, so they add nothing.</p>` },
        { line: R`<b>\(\Pr[X \le 4]\) = five Poisson terms</b>, \(k = 0, \ldots, 4\); \(e^{-\lambda}\) is in all of them. \(\Pr[X \ge 5]\) never ends, so use \(1 - \Pr[X \le 4]\): <div class="formula">\[\begin{aligned}&\Pr[X \le 4 \mid \lambda]\\ &= e^{-\lambda}\Big(1 + \lambda + \frac{\lambda^2}{2} + \frac{\lambda^3}{6} + \frac{\lambda^4}{24}\Big)\end{aligned}\]</div>`,
          why: R`<p>[sheet: Poisson probability mass function with] for \(k = 0, 1, 2, 3, 4\), with \(0! = 1! = 1\), \(2! = 2\), \(3! = 6\), \(4! = 24\). All of a Poisson's probabilities add to 1, so \(\Pr[X \ge 5] = 1 - \Pr[X \le 4]\).</p>` },
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
