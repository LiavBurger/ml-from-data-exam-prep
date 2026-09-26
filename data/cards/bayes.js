// Recipe cards for topic "bayes". Standard: spec/CARDS.md. Built from data/notes/bayes.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["bayes"] = {
    intro: R`<p>Count probabilities from a table (or fit a Poisson rate), then predict a class: joints → add → divide → pick. The twists repeat: full vs naive Bayes, equal priors, costs, "which prior / cost flips it?". Open question 1 (2025-A Q5) and go part by part: each part shows its card(s) right above it. Read the card (1–3 min), do the part on paper, then check. In 2026-B, use the given \(e^t\) table for every exponential.</p>`,
    cards: {
      // ───────────────────────────── table questions
      "count-probs": {
        title: "Priors and class-conditionals by counting",
        minutes: 2,
        cue: R`"Estimate these probabilities based on the data … No need to apply Laplace smoothing" (2025-A Q5.1); "What are the prior probabilities of the three species" (2025-C Q4.1).`,
        lines: [
          R`Count each class and write \(n_j\) next to it.`,
          R`Priors: \(\pi_j = n_j / n\).`,
          R`Class-conditional, one feature at a time: \(p(X_t = a \mid y = j) = \dfrac{\text{rows of class } j \text{ with } X_t = a}{n_j}\).`,
          R`Check: within one class, the values of one feature add to 1; the priors add to 1.`,
        ],
        numbers: R`<p>2025-A table: A = samples 1–8, so \(n_\mathrm{A} = 8\); B = samples 9–20, so \(n_\mathrm{B} = 12\).</p>
<ul>
<li>\(\pi_\mathrm{A} = 8/20 = 0.4\), \(\pi_\mathrm{B} = 12/20 = 0.6\)</li>
<li>Red among A (samples 3–8): \(p(X_1 = \mathrm{r} \mid \mathrm{A}) = 6/8 = 0.75\)</li>
<li>Red among B (samples 17–20): \(p(X_1 = \mathrm{r} \mid \mathrm{B}) = 4/12 = 1/3\)</li>
<li>3 petals among B (samples 9–13, 17): \(p(X_2 = 3 \mid \mathrm{B}) = 6/12 = 0.5\)</li>
</ul>`,
        trap: R`Dividing by all 20 rows instead of \(n_j\) (that is the joint). In 2025-C the last column is a <b>count</b>: add it (A: \(32 + 16 + 8 + 4 = 60\)), don't count rows.`,
        why: [
          [R`The whole 2025-A Q5.1 answer table`, R`<p>Divide each count by its own class size (8 for A, 12 for B):</p>
<div class="tw"><table><thead><tr><th></th><th>A (÷ 8)</th><th>B (÷ 12)</th></tr></thead><tbody>
<tr><td>\(p(X_1 = \mathrm{p} \mid y)\)</td><td>\(2/8 = 0.25\)</td><td>\(8/12 \approx 0.667\)</td></tr>
<tr><td>\(p(X_1 = \mathrm{r} \mid y)\)</td><td>\(6/8 = 0.75\)</td><td>\(4/12 \approx 0.333\)</td></tr>
<tr><td>\(p(X_2 = 3 \mid y)\)</td><td>\(2/8 = 0.25\)</td><td>\(6/12 = 0.5\)</td></tr>
<tr><td>\(p(X_2 = 4 \mid y)\)</td><td>\(4/8 = 0.5\)</td><td>\(3/12 = 0.25\)</td></tr>
<tr><td>\(p(X_2 = 5 \mid y)\)</td><td>\(2/8 = 0.25\)</td><td>\(3/12 = 0.25\)</td></tr>
</tbody></table></div>
<p>Rows used: A purple = 1, 2; A red = 3–8; A 3 petals = 1, 3; A 4 petals = 4–7; A 5 petals = 2, 8. B purple = 9–16; B red = 17–20; B 3 petals = 9–13, 17; B 4 petals = 14–16; B 5 petals = 18–20.</p>`],
          [R`Why divide by \(n_j\)? What the bar "|" means`, R`<p>\(p(X_1 = \mathrm{r} \mid y = \mathrm{A})\) reads "the probability of red, <b>given</b> that the flower is A". What stands after the bar is already known, so it shrinks the table: throw away every non-A row, and among the 8 rows left, take the fraction that is red. The divisor is the class size, not all 20 rows.</p>
<p>Dividing by 20 instead gives \(p(y = \mathrm{A}, X_1 = \mathrm{r}) = 6/20 = 0.3\), the fraction of <b>all</b> flowers that are A and red: a joint, a different number.</p>`],
          [R`2025-C: the priors with the count column`, R`<p>Each row of the fish table stands for many fish; the last column says how many (100 in total). Add the four counts of each species:</p>
<ul>
<li>\(\pi_\mathrm{A} = (32 + 16 + 8 + 4)/100 = 60/100 = 0.6\)</li>
<li>\(\pi_\mathrm{B} = (5 + 15 + 1 + 3)/100 = 24/100 = 0.24\)</li>
<li>\(\pi_\mathrm{C} = (3 + 9 + 3 + 1)/100 = 16/100 = 0.16\)</li>
</ul>
<p>Check: \(0.6 + 0.24 + 0.16 = 1\).</p>`],
        ],
        side: R`<ul>
<li><b>"Multinomial / unordered"</b>: 3, 4, 5 petals are just three categories; count each one.</li>
<li><b>"No need to prove these are the MLEs"</b>: these count fractions are the maximum-likelihood estimates. 2026-B Q4.1 derives an MLE for a formula model; same idea.</li>
<li><b>Laplace smoothing</b> would add 1 to every count so no probability is exactly 0. The question says skip it.</li>
</ul>`,
      },

      "posterior-map": {
        title: "Posteriors and the MAP prediction",
        minutes: 2,
        cue: R`"For each of the two test samples, compute the posterior probability for it to belong to each of the two species … predict its species based on MAP classification" (2025-A Q5.2).`,
        lines: [
          R`One joint per class: \(\pi_j \cdot p(x_1 \mid j) \cdot p(x_2 \mid j)\) (naive Bayes multiplies the per-feature numbers).`,
          R`Add the joints: \(p(x) = \text{joint}_\mathrm{A} + \text{joint}_\mathrm{B}\).`,
          R`Posterior: \(p(j \mid x) = \text{joint}_j / p(x)\).`,
          R`MAP = the class with the largest posterior.`,
        ],
        numbers: R`<p>2025-A sample 21, \(x = (\mathrm{p}, 5)\), numbers from the part-1 table:</p>
<ul>
<li>A: \(0.4 \times 0.25 \times 0.25 = 0.025\); B: \(0.6 \times \tfrac23 \times 0.25 = 0.1\)</li>
<li>\(p(x) = 0.025 + 0.1 = 0.125\)</li>
<li>\(0.025/0.125 = 0.2\) (A), \(0.1/0.125 = 0.8\) (B) → MAP <b>B</b></li>
</ul>
<p>Sample 22, \(x = (\mathrm{r}, 3)\): joints \(0.4 \times 0.75 \times 0.25 = 0.075\) and \(0.6 \times \tfrac13 \times 0.5 = 0.1\); \(p(x) = 0.175\); posteriors \(\tfrac37 \approx 0.429\), \(\tfrac47 \approx 0.571\) → <b>B</b>.</p>`,
        check: R`The posteriors add to 1 (\(0.2 + 0.8\)). The joints don't.`,
        trap: R`Reporting the joints (0.025, 0.1) as the posteriors. And don't drop the prior: without it you get the ML prediction, not MAP.`,
        why: [
          [R`Why line 1? Bayes' rule in one picture`, R`<p>The fraction of flowers that are "class \(j\) <b>and</b> look like \(x\)" can be built in two orders: \(\pi_j \cdot p(x \mid j)\), or \(p(x) \cdot p(j \mid x)\). Both equal the joint, so</p>
\[p(j \mid x) = \frac{\pi_j\, p(x \mid j)}{p(x)}\]
<p>That is Bayes' rule. Naive Bayes assumes the two features are independent inside a class, so \(p(x \mid j) = p(x_1 \mid j)\, p(x_2 \mid j)\), and the joint is prior × both factors.</p>`],
          [R`Why line 2? The denominator is a sum of joints`, R`<p>Every flower that looks like \(x\) is either A or B. So the probability of seeing \(x\) at all is (A and \(x\)) + (B and \(x\)) = the sum of the joints. The solutions call it the marginal (data) probability.</p>`],
          [R`Why line 4? Comparing joints is enough to predict`, R`<p>Every posterior is divided by the same \(p(x)\). Dividing all candidates by one positive number doesn't change which is largest, so the largest joint is also the largest posterior. But when the part says "compute the posterior", you must still divide.</p>`],
        ],
        side: R`<ul>
<li><b>Why the prior matters (lecture).</b> A rare disease (\(\pi = 0.001\)), a test positive for 99% of the sick and 2% of the healthy. Joints for a positive test: \(0.001 \cdot 0.99 = 0.00099\) vs \(0.999 \cdot 0.02 = 0.01998\), so \(p(\text{sick} \mid +) \approx 0.047\). A small prior can outweigh strong evidence; it happens again in 2026-B.</li>
<li><b>MAP</b> = "maximum a posteriori".</li>
</ul>`,
      },

      "flip-features": {
        title: "Find features that give the other class",
        minutes: 1,
        cue: R`"Specify a combination of features (color and number of petals) that would result in a MAP classification for the other species. Justify your answer with computations" (2025-A Q5.3).`,
        lines: [
          R`Both test samples came out B, so you need a flower that looks "very A".`,
          R`In the part-1 table, for each feature pick the value where A's probability beats B's the most.`,
          R`Compute both joints for that combination (same as card "Posteriors and the MAP prediction") and show A's is larger.`,
        ],
        numbers: R`<p>Red: A 0.75 vs B \(\tfrac13\). 4 petals: A 0.5 vs B 0.25. So try \(x = (\mathrm{r}, 4)\):</p>
<ul>
<li>A: \(0.4 \times 0.75 \times 0.5 = 0.15\); B: \(0.6 \times \tfrac13 \times 0.25 = 0.05\)</li>
<li>\(p(x) = 0.2\); posteriors \(0.15/0.2 = 0.75\) (A), \(0.05/0.2 = 0.25\) (B) → MAP <b>A</b> (the official answer)</li>
</ul>`,
        check: R`One combination is enough. \((\mathrm{r}, 5)\) also works: \(0.075\) vs \(0.05\).`,
        trap: R`Choosing by the class-conditionals alone: B's prior 0.6 pulls toward B, so show the joints <b>with</b> the priors.`,
        why: [
          [R`Why pick the value where A beats B the most?`, R`<p>The joint is prior × factor 1 × factor 2. B starts ahead on the prior (0.6 vs 0.4). To overtake it, A needs factors that are much larger than B's, so choose, feature by feature, the value with the biggest A-to-B ratio: red (0.75 vs 0.333) and 4 petals (0.5 vs 0.25). Then confirm with the numbers.</p>`],
        ],
      },

      "prior-range": {
        title: "The range of priors that keeps the predictions",
        minutes: 3,
        cue: R`"Specify the range of prior probabilities for which the two predictions you gave in (2) remain unchanged. Justify your answer" (2025-A Q5.4).`,
        lines: [
          R`Per sample, the likelihoods <b>without</b> prior: \(L_j = p(x_1 \mid j)\, p(x_2 \mid j)\).`,
          R`Prior as a letter, \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\). Prediction was B, so write \(\pi_\mathrm{A} L_\mathrm{A} < (1 - \pi_\mathrm{A}) L_\mathrm{B}\).`,
          R`Solve: \(\pi_\mathrm{A} < \dfrac{L_\mathrm{B}}{L_\mathrm{A} + L_\mathrm{B}}\).`,
          R`Keep the strictest bound; state the range for \(\pi_\mathrm{A}\) and for \(\pi_\mathrm{B}\).`,
        ],
        numbers: R`<ul>
<li>Sample 21 (p, 5): \(L_\mathrm{A} = 0.25 \times 0.25 = \tfrac{1}{16}\), \(L_\mathrm{B} = \tfrac23 \times \tfrac14 = \tfrac16\) → \(\pi_\mathrm{A} < \dfrac{1/6}{1/16 + 1/6} = \tfrac{8}{11} \approx 0.727\)</li>
<li>Sample 22 (r, 3): \(L_\mathrm{A} = 0.75 \times 0.25 = \tfrac{3}{16}\), \(L_\mathrm{B} = \tfrac13 \times \tfrac12 = \tfrac16\) → \(\pi_\mathrm{A} < \dfrac{1/6}{3/16 + 1/6} = \tfrac{8}{17} \approx 0.471\)</li>
<li>Both: \(\pi_\mathrm{A} \in [0, \tfrac{8}{17})\), \(\pi_\mathrm{B} \in (\tfrac{9}{17}, 1]\)</li>
</ul>`,
        check: R`At \(\pi_\mathrm{A} = \tfrac{8}{17}\) the joints tie: \(\tfrac{8}{17} \cdot \tfrac{3}{16} = \tfrac{3}{34} = \tfrac{9}{17} \cdot \tfrac16\).`,
        trap: R`Using the posteriors (0.2, 0.8, …) as \(L_j\): they already contain the old priors.`,
        why: [
          [R`Why line 3? The algebra`, R`<p>Multiply out: \(\pi_\mathrm{A} L_\mathrm{A} < L_\mathrm{B} - \pi_\mathrm{A} L_\mathrm{B}\). Move the \(\pi_\mathrm{A}\) terms left: \(\pi_\mathrm{A}(L_\mathrm{A} + L_\mathrm{B}) < L_\mathrm{B}\). Divide by the positive \(L_\mathrm{A} + L_\mathrm{B}\). At exactly that value the two joints are equal: the flipping point.</p>`],
          [R`The fractions, step by step (sample 22)`, R`<p>\(\pi_\mathrm{A} \cdot \tfrac{3}{16} < (1 - \pi_\mathrm{A}) \cdot \tfrac16\). Multiply both sides by 48 (divisible by 16 and 6): \(48 \cdot \tfrac{3}{16} = 9\), \(48 \cdot \tfrac16 = 8\). So \(9\pi_\mathrm{A} < 8 - 8\pi_\mathrm{A}\), then \(17\pi_\mathrm{A} < 8\), so \(\pi_\mathrm{A} < \tfrac{8}{17}\). Sample 21 the same way: \(3\pi_\mathrm{A} < 8 - 8\pi_\mathrm{A}\), \(11\pi_\mathrm{A} < 8\).</p>`],
          [R`Why the strictest bound?`, R`<p>Both predictions must stay B, so both inequalities must hold. \(\pi_\mathrm{A} < \tfrac{8}{17}\) automatically satisfies \(\pi_\mathrm{A} < \tfrac{8}{11}\). The stricter sample is the one that was closest to 50/50 (sample 22: 0.571 vs 0.429). Making \(\pi_\mathrm{A}\) smaller only helps B, so the range goes down to 0.</p>`],
        ],
        side: R`<ul>
<li><b>The official solution's shortcut</b>: at the tie, \(\pi_\mathrm{A} : \pi_\mathrm{B} = L_\mathrm{B} : L_\mathrm{A} = \tfrac16 : \tfrac{3}{16} = 8 : 9\), so \(\pi_\mathrm{A} = \tfrac{8}{17}\).</li>
<li>2026-B Q4.4 asks the same kind of question for a Poisson model.</li>
</ul>`,
      },

      "expected-cost": {
        title: "Minimum expected cost with two classes",
        minutes: 2,
        cue: R`"Classifying an Afloris flower as Bifloris costs \(\lambda_\mathrm{BA} = 2\) … specify the prediction that minimizes the classification risk" (2025-A Q5.5).`,
        lines: [
          R`Decode: \(\lambda_\mathrm{BA}\) = <b>say</b> B, <b>truth</b> A (first index = what you say).`,
          R`Cost of predicting A \(= \lambda_\mathrm{AB} \cdot p(\mathrm{B} \mid x)\): A is wrong only when the truth is B.`,
          R`Cost of predicting B \(= \lambda_\mathrm{BA} \cdot p(\mathrm{A} \mid x)\).`,
          R`Predict the <b>smaller</b> cost.`,
        ],
        numbers: R`<p>Posteriors from part 2; \(\lambda_\mathrm{AB} = 1\), \(\lambda_\mathrm{BA} = 2\).</p>
<ul>
<li>Sample 21 (0.2, 0.8): predict A \(1 \times 0.8 = 0.8\); predict B \(2 \times 0.2 = 0.4\) → <b>B</b></li>
<li>Sample 22 (\(\tfrac37, \tfrac47\)): predict A \(1 \times \tfrac47 \approx 0.571\); predict B \(2 \times \tfrac37 = \tfrac67 \approx 0.857\) → <b>A</b> (MAP said B)</li>
</ul>`,
        trap: R`Each cost multiplies the probability of the <b>other</b> class, not its own.`,
        why: [
          [R`Why lines 2–3? Expected cost in plain words`, R`<p>We don't know the truth, but we know how probable each truth is. If we predict A, then with probability \(p(\mathrm{A} \mid x)\) we are right (cost 0) and with probability \(p(\mathrm{B} \mid x)\) we are wrong (cost \(\lambda_\mathrm{AB}\)). Expected cost \(= 0 \cdot p(\mathrm{A} \mid x) + \lambda_\mathrm{AB}\, p(\mathrm{B} \mid x)\). Same for B.</p>`],
          [R`Why does sample 22 flip to A?`, R`<p>It is almost 50/50 (0.429 vs 0.571). Calling an A flower "B" costs twice as much, so on a near-tie the safe answer is A.</p>`],
        ],
        side: R`<ul>
<li><b>Official-solution slip:</b> it writes "\(\tfrac47 \times \lambda_\mathrm{AB} = \tfrac47 \approx 0.429\)". \(\tfrac47 \approx 0.571\) (0.429 is \(\tfrac37\)). The answer (A) is unchanged: \(0.571 < 0.857\).</li>
<li><b>Formula sheet</b> writes the risk with joints, \(\sum_{y'} \pi_{y'} P(x \mid y') \lambda_{y,y'}\): the same numbers × \(p(x)\), so the same winner.</li>
</ul>`,
      },

      "full-bayes": {
        title: "Posteriors under full Bayes (count the exact combination)",
        minutes: 2,
        cue: R`"Compute the three posterior probabilities under the <b>full Bayes</b> model" for the fish with \(X_1 = \text{yes}, X_2 = \text{no}\) (2025-C Q4.2).`,
        lines: [
          R`Class-conditional = the one row matching (yes, no), ÷ \(n_j\): \(p(\text{yes}, \text{no} \mid j) = \text{count}_j / n_j\).`,
          R`Joint = \(\pi_j \times\) that. With \(\pi_j = n_j/100\), the \(n_j\) cancels: joint = count ÷ 100.`,
          R`Add the three joints = \(p(x)\); posterior = joint ÷ \(p(x)\).`,
        ],
        numbers: R`<p>\(n_\mathrm{A} = 60\), \(n_\mathrm{B} = 24\), \(n_\mathrm{C} = 16\) (part 1). The (yes, no) rows: A 16, B 15, C 9.</p>
<ul>
<li>A: \(\tfrac{60}{100} \cdot \tfrac{16}{60} = 0.16\); B: \(\tfrac{24}{100} \cdot \tfrac{15}{24} = 0.15\); C: \(\tfrac{16}{100} \cdot \tfrac{9}{16} = 0.09\)</li>
<li>\(p(x) = 0.16 + 0.15 + 0.09 = 0.4\)</li>
<li>Posteriors: \(0.16/0.4 = 0.4\) (A), \(0.15/0.4 = 0.375\) (B), \(0.09/0.4 = 0.225\) (C)</li>
</ul>`,
        check: R`\(0.4 + 0.375 + 0.225 = 1\).`,
        trap: R`Writing the class-conditional as \(16/100\): that is the joint. The class-conditional divides by the species' own \(n_j\).`,
        why: [
          [R`Why "full"? What it means`, R`<p>Full Bayes estimates \(p(x_1, x_2 \mid j)\) by counting the exact <b>combination</b> among class-\(j\) fish. No independence assumption. The price: with many features you need a count for every combination, and most combinations have few rows.</p>`],
        ],
        side: R`<ul><li><b>Official-solution slip:</b> the C line is printed \(\tfrac{0.9}{0.4} = 0.225\); it means \(\tfrac{0.09}{0.4}\).</li></ul>`,
      },

      "naive-bayes": {
        title: "Posteriors under naive Bayes (one fin at a time)",
        minutes: 3,
        cue: R`"Compute the three posterior probabilities under the <b>naïve Bayes</b> model trained using the same dataset" (2025-C Q4.3).`,
        lines: [
          R`\(p(X_1 = \text{yes} \mid j)\) = all class-\(j\) rows with upper fin yes (any lower fin), ÷ \(n_j\).`,
          R`\(p(X_2 = \text{no} \mid j)\) = all class-\(j\) rows with lower fin no, ÷ \(n_j\).`,
          R`Joint = \(\pi_j \times\) both factors; add the joints, divide (as in full Bayes).`,
        ],
        numbers: R`<ul>
<li>A: \(\tfrac{32+16}{60} = \tfrac45\), \(\tfrac{16+4}{60} = \tfrac13\) → \(\tfrac35 \cdot \tfrac45 \cdot \tfrac13 = 0.16\)</li>
<li>B: \(\tfrac{5+15}{24} = \tfrac56\), \(\tfrac{15+3}{24} = \tfrac34\) → \(\tfrac{6}{25} \cdot \tfrac56 \cdot \tfrac34 = 0.15\)</li>
<li>C: \(\tfrac{3+9}{16} = \tfrac34\), \(\tfrac{9+1}{16} = \tfrac58\) → \(\tfrac{4}{25} \cdot \tfrac34 \cdot \tfrac58 = 0.075\)</li>
<li>\(p(x) = 0.385\); posteriors \(\approx 0.416\) (A), \(0.390\) (B), \(0.195\) (C)</li>
</ul>`,
        trap: R`For \(X_2 = \text{no}\), not just the (yes, no) row: add (no, no) too.`,
        why: [
          [R`Why multiply the two fins?`, R`<p>Naive Bayes <b>assumes</b> that inside one species the fins are independent: knowing the upper fin tells you nothing extra about the lower fin once you know the species. Then \(p(\text{yes}, \text{no} \mid j) = p(X_1 = \text{yes} \mid j) \cdot p(X_2 = \text{no} \mid j)\), and each factor is a one-column count.</p>`],
          [R`The fraction arithmetic`, R`<p>Write the priors as fractions: \(0.6 = \tfrac35\), \(0.24 = \tfrac{6}{25}\), \(0.16 = \tfrac{4}{25}\). Multiply tops and bottoms: A \(\tfrac{3 \cdot 4 \cdot 1}{5 \cdot 5 \cdot 3} = \tfrac{12}{75} = 0.16\); B \(\tfrac{6 \cdot 5 \cdot 3}{25 \cdot 6 \cdot 4} = \tfrac{90}{600} = 0.15\); C \(\tfrac{4 \cdot 3 \cdot 5}{25 \cdot 4 \cdot 8} = \tfrac{60}{800} = 0.075\). Then \(0.16/0.385 \approx 0.416\), \(0.15/0.385 \approx 0.390\), \(0.075/0.385 \approx 0.195\).</p>`],
        ],
        side: R`<ul>
<li><b>Official-solution slip (rounding):</b> it gives 0.194 for C; \(0.075/0.385 = 0.1948\ldots\) rounds to 0.195.</li>
<li><b>Why A and B match full Bayes but C doesn't:</b> A full \(\tfrac{16}{60} = \tfrac{4}{15}\), naive \(\tfrac45 \cdot \tfrac13 = \tfrac{4}{15}\); B full \(\tfrac{15}{24}\), naive \(\tfrac56 \cdot \tfrac34 = \tfrac{15}{24}\); C full \(\tfrac{9}{16} = 0.5625\), naive \(\tfrac{15}{32} \approx 0.469\). In A and B the fins happen to be exactly independent; in C they aren't.</li>
</ul>`,
      },

      "compare-models": {
        title: "Read off the predictions and compare the models",
        minutes: 1,
        cue: R`"What is the predicted species for this fish … under each of the two models … Do classifiers based on these models agree?" (2025-C Q4.4).`,
        lines: [
          R`Full Bayes: the largest posterior from part 2 → name the species.`,
          R`Naive Bayes: the largest posterior from part 3 → name the species.`,
          R`Answer "agree" or "disagree" in one sentence.`,
        ],
        numbers: R`<p>Full: 0.4 is the largest → <b>Armfish (A)</b>. Naive: 0.416 is the largest → <b>Armfish (A)</b>. The two classifiers agree.</p>`,
        trap: R`Answering only half: name the species for <b>both</b> models and say agree/disagree. No new computation is needed.`,
      },

      "ml-uniform": {
        title: "Uniform priors: the maximum-likelihood (ML) prediction",
        minutes: 2,
        cue: R`"Specify the predicted species … assuming uniform prior probabilities \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C}\) (this is the maximum-likelihood prediction). Explain" (2025-C Q4.5).`,
        lines: [
          R`Write: "equal priors are the same factor for every class, so they cancel".`,
          R`Compare only the class-conditionals \(p(x \mid j)\) you already have (parts 2 and 3).`,
          R`The largest one is the ML prediction; do it for each model.`,
        ],
        numbers: R`<ul>
<li>Full: A \(\tfrac{16}{60} \approx 0.267\), B \(\tfrac{15}{24} = 0.625\), C \(\tfrac{9}{16} = 0.5625\) → <b>Blofish (B)</b></li>
<li>Naive: A \(\tfrac45 \cdot \tfrac13 \approx 0.267\), B \(\tfrac56 \cdot \tfrac34 = 0.625\), C \(\tfrac34 \cdot \tfrac58 \approx 0.469\) → <b>Blofish (B)</b></li>
</ul>`,
        check: R`MAP said Armfish only because \(\pi_\mathrm{A} = 0.6\) is big; the features alone point to Blofish.`,
        trap: R`Reusing the real priors 0.6 / 0.24 / 0.16.`,
        why: [
          [R`Why can the prior be dropped?`, R`<p>MAP compares \(\pi_j\, p(x \mid j)\). If every \(\pi_j\) is the same number, it multiplies every candidate equally, and that never changes which one is largest. What is left, \(p(x \mid j)\), is called the <b>likelihood</b> of class \(j\), hence "maximum likelihood". Computing full posteriors with \(\pi_j = \tfrac13\) gives the same winner, just slower.</p>`],
        ],
        side: R`<ul>
<li><b>Official-solution slip:</b> the naive-Bayes B line prints "0625"; it means 0.625.</li>
<li><b>The nested rules (lecture):</b> minimum expected cost with all costs equal is MAP; MAP with all priors equal is ML.</li>
</ul>`,
      },

      "cost-matrix": {
        title: "Minimum expected cost with a cost matrix",
        minutes: 2,
        cue: R`"\(\lambda_{j,l}\) reflects the cost of predicting species \(j\) when the true species is \(l\) … What is the species that minimizes the expected misclassification risk?" (2025-C Q4.6).`,
        lines: [
          R`Rows of \(\lambda\) = what you predict, columns = the truth (order A, B, C).`,
          R`Posterior column from full Bayes (part 2): \((0.4,\ 0.375,\ 0.225)\).`,
          R`Expected cost of predicting \(j\) = row \(j\) of \(\lambda\) · posterior column.`,
          R`Predict the <b>smallest</b>.`,
        ],
        numbers: R`<p>\(\lambda\) rows: \((0, 1, 2)\), \((1, 0, 2)\), \((1, 1, 0)\).</p>
<ul>
<li>A: \(0 \cdot 0.4 + 1 \cdot 0.375 + 2 \cdot 0.225 = 0.825\)</li>
<li>B: \(1 \cdot 0.4 + 0 \cdot 0.375 + 2 \cdot 0.225 = 0.85\)</li>
<li>C: \(1 \cdot 0.4 + 1 \cdot 0.375 + 0 \cdot 0.225 = 0.775\) → <b>Catfish (C)</b></li>
</ul>`,
        check: R`\(\lambda_{\mathrm{B},\mathrm{C}}\) (row B, column C) \(= 2\) = "call a Catfish a Blofish", the costly mistake in the story ✓.`,
        trap: R`Picking the largest, or dotting the columns instead of the rows.`,
        why: [
          [R`Why row · posterior column?`, R`<p>Predicting \(j\), the truth is \(l\) with probability \(p(l \mid x)\) and then costs \(\lambda_{j,l}\). The expected cost is \(\sum_l \lambda_{j,l}\, p(l \mid x)\): exactly row \(j\) of the matrix dotted with the posteriors. \(\lambda\) times the column does all three at once.</p>`],
          [R`Why does the least likely class win?`, R`<p>C has the smallest posterior (0.225), but any wrong answer on a Catfish costs 2. Saying "C" avoids that risk entirely; its own errors cost only 1 each.</p>`],
        ],
        side: R`<ul><li><b>Joint (formula-sheet) version:</b> with joints \((0.16, 0.15, 0.09)\): A \(0.15 + 2 \cdot 0.09 = 0.33\), B \(0.16 + 2 \cdot 0.09 = 0.34\), C \(0.16 + 0.15 = 0.31\). Same winner (these are the costs above × 0.4).</li></ul>`,
      },

      // ───────────────────────────── Poisson (2026-B)
      "poisson-mle": {
        title: "The Poisson MLE: log → derivative → 0",
        minutes: 2,
        cue: R`"Assume a dataset \(D = \{x_i\}_{i=1}^n\) … Express the data log-likelihood \(\ell(\lambda; D)\) as a function of the Poisson rate \(\lambda\) … derive a formula for the MLE \(\hat\lambda\)" (2026-B Q4.1).`,
        lines: [
          R`\(\ell(\lambda; D) = \sum_{i=1}^n \log\dfrac{\lambda^{x_i} e^{-\lambda}}{x_i!}\): general \(x_i\), one \(\lambda\).`,
          R`Split each log: \(\ell = \big(\sum_i x_i\big)\log\lambda - n\lambda - \sum_i \log(x_i!)\).`,
          R`Differentiate: \(\ell'(\lambda) = \big(\sum_i x_i\big)\dfrac1\lambda - n\).`,
          R`Set to 0: \(\hat\lambda = \dfrac1n \sum_{i=1}^n x_i\) (the average).`,
          R`\(\ell''(\lambda) = -\big(\sum_i x_i\big)\dfrac{1}{\lambda^2} < 0\) → a maximum.`,
        ],
        numbers: R`<p>The part stays in letters. One term of line 2, e.g. a count \(x_i = 3\) (user 7 of the table):</p>
\[\log\frac{\lambda^3 e^{-\lambda}}{3!} = 3\log\lambda - \lambda - \log 6\]
<p>Adding \(n\) such terms gives line 2. In part 2, line 4 turns into plain averages.</p>`,
        trap: R`Moed B (0/5): you wrote this table's likelihood with \(\lambda_\mathrm{R}, \lambda_\mathrm{M}\) and never differentiated. Letters, one \(\lambda\); the points are for lines 3–4.`,
        why: [
          [R`Why line 1? Likelihood, then log`, R`<p>The likelihood is the probability of the whole dataset if the rate were \(\lambda\). The samples are independent, so it is a product: \(L(\lambda) = \prod_i \dfrac{\lambda^{x_i} e^{-\lambda}}{x_i!}\). A product is awkward to differentiate; the log turns it into a sum, and since log is increasing, the same \(\lambda\) maximizes both.</p>`],
          [R`Why line 2? The three log rules`, R`<p>Log of a quotient = difference; log of a product = sum; \(\log(\lambda^{x_i}) = x_i \log\lambda\); \(\log(e^{-\lambda}) = -\lambda\). So each term is \(x_i\log\lambda - \lambda - \log(x_i!)\). Summing over \(i\): the \(x_i\) add up in front of \(\log\lambda\), and \(-\lambda\) appears \(n\) times.</p>`],
          [R`Why line 3? The derivative piece by piece`, R`<p>\(\sum_i x_i\) is a fixed number, and \(\tfrac{d}{d\lambda}\log\lambda = \tfrac1\lambda\). \(\tfrac{d}{d\lambda}(n\lambda) = n\). \(\sum_i\log(x_i!)\) has no \(\lambda\): derivative 0. Then \(\big(\sum_i x_i\big)\tfrac1\lambda = n \iff \lambda = \tfrac1n\sum_i x_i\).</p>`],
        ],
        side: R`<ul>
<li>Your own <b>HW5 Q1–2</b> is exactly this derivation.</li>
<li>The count fractions of the table questions are MLEs by the same recipe (the lecture derives \(\hat p = x/n\) for the binomial).</li>
<li>The Poisson formula \(\mathrm{Poiss}(k \mid \lambda) = \tfrac{\lambda^k e^{-\lambda}}{k!}\) is on the formula sheet and in the question.</li>
</ul>`,
      },

      "poisson-fit": {
        title: "Fit the classifier: rates are averages, priors are fractions",
        minutes: 1,
        cue: R`"Use the formula you obtained for the Poisson MLE in (1) to obtain MLEs for the Poisson rates \(\hat\lambda_\mathrm{R}\) and \(\hat\lambda_\mathrm{M}\) … also … the two class prior probabilities" (2026-B Q4.2).`,
        lines: [
          R`Split the users by class: list the R counts and the M counts.`,
          R`\(\hat\lambda_\mathrm{R}\) = average of the R counts; \(\hat\lambda_\mathrm{M}\) = average of the M counts.`,
          R`\(\hat\pi_\mathrm{R} = n_\mathrm{R}/n\), \(\hat\pi_\mathrm{M} = n_\mathrm{M}/n\).`,
        ],
        numbers: R`<p>2026-B table: users 1–8 are R, users 9–10 are M.</p>
<ul>
<li>\(\hat\lambda_\mathrm{R} = \dfrac{1+1+2+2+2+2+3+3}{8} = \dfrac{16}{8} = 2\)</li>
<li>\(\hat\lambda_\mathrm{M} = \dfrac{4+4}{2} = 4\)</li>
<li>\(\hat\pi_\mathrm{R} = 8/10 = 0.8\), \(\hat\pi_\mathrm{M} = 2/10 = 0.2\)</li>
</ul>`,
        trap: R`Moed B: priors right, rates missing: 3 free points lost. Don't average all ten users together (2.4).`,
        why: [
          [R`Why fit each class separately?`, R`<p>Each class has its own Poisson: \(p(x \mid y) = \mathrm{Poiss}(x \mid \lambda_y)\). \(\lambda_\mathrm{R}\) describes regular users only, so it is fitted to the R rows only, just like the table questions count A's probabilities among A rows only. Part 1's formula applied to each group gives its average.</p>`],
        ],
        side: R`<ul><li><b>Official-solution slip:</b> the second prior is labelled \(\hat\pi_\mathrm{R} = \tfrac{2}{10}\); it is \(\hat\pi_\mathrm{M}\).</li></ul>`,
      },

      "poisson-plug": {
        title: "A Poisson probability from the \\(e^t\\) table",
        minutes: 2,
        cue: R`Under 2026-B Q4: "you may refer to the following table for exponent values" (\(t = -4, \ldots, 4\)). Parts 3–6 all need it.`,
        lines: [
          R`Write the formula with the numbers in: \(\mathrm{Poiss}(k \mid \lambda) = \dfrac{\lambda^k e^{-\lambda}}{k!}\).`,
          R`Look up \(e^{-\lambda}\) in the table: \(e^{-2} = 0.1353\), \(e^{-4} = 0.0183\).`,
          R`Compute \(\lambda^k\) and \(k!\) (\(4! = 24\)).`,
          R`Top ÷ bottom. For MAP, multiply by the prior.`,
        ],
        numbers: R`<p>\(x = 4\), rates and priors from part 2:</p>
<ul>
<li>\(\mathrm{Poiss}(4 \mid 2) = \dfrac{2^4 e^{-2}}{4!} = \dfrac{16 \times 0.1353}{24} = \dfrac{2.1648}{24} = 0.0902\)</li>
<li>\(\mathrm{Poiss}(4 \mid 4) = \dfrac{4^4 e^{-4}}{4!} = \dfrac{256 \times 0.0183}{24} = \dfrac{4.6848}{24} = 0.1952\)</li>
<li>Joints: R \(0.8 \times 0.0902 = 0.0722\); M \(0.2 \times 0.1952 = 0.0390\) → <b>R</b></li>
</ul>`,
        check: R`This numeric route earns the points even if the algebra stalls.`,
        trap: R`The formula has \(e^{-\lambda}\) (minus): use 0.1353, not \(e^{2} = 7.389\).`,
        why: [
          [R`The other part-3 users (\(x = 2\), \(x = 7\)) and the cut-off \(x = 5\)`, R`<p>Same recipe, both joints each time:</p>
<ul>
<li>\(x = 2\) (\(2! = 2\)): M \(0.2 \cdot \tfrac{4^2 \times 0.0183}{2} = 0.2 \cdot \tfrac{16 \times 0.0183}{2} = 0.0293\); R \(0.8 \cdot \tfrac{2^2 \times 0.1353}{2} = 0.8 \cdot \tfrac{4 \times 0.1353}{2} = 0.2165\) → <b>R</b></li>
<li>\(x = 7\) (\(7! = 5040\)): M \(0.2 \cdot \tfrac{4^7 \times 0.0183}{5040} = 0.2 \cdot \tfrac{16384 \times 0.0183}{5040} = 0.0119\); R \(0.8 \cdot \tfrac{2^7 \times 0.1353}{5040} = 0.8 \cdot \tfrac{128 \times 0.1353}{5040} = 0.0027\) → <b>M</b></li>
<li>\(x = 5\) (\(5! = 120\)): M \(0.2 \cdot \tfrac{1024 \times 0.0183}{120} = 0.0312\); R \(0.8 \cdot \tfrac{32 \times 0.1353}{120} = 0.0289\) → M. So \(x = 5\) is the first count called M.</li>
</ul>`],
        ],
      },

      "poisson-map": {
        title: "MAP with Poisson classes: a cut-off on \\(x\\)",
        minutes: 2,
        cue: R`"Three users with packet counts \(x_{11} = 2\), \(x_{12} = 4\), \(x_{13} = 7\). Use the fitted model from (2) and the MAP rule … to classify each" (2026-B Q4.3).`,
        lines: [
          R`Predict M iff \(0.2 \cdot \dfrac{4^x e^{-4}}{x!} > 0.8 \cdot \dfrac{2^x e^{-2}}{x!}\).`,
          R`Multiply by \(x!\): it cancels.`,
          R`Divide by \(0.2 \cdot 2^x e^{-4}\): \(2^x > 4e^{2}\).`,
          R`Table: \(e^2 = 7.389\), so \(2^x > 29.556\).`,
          R`\(2^4 = 16 < 29.556\), \(2^5 = 32 > 29.556\): M iff \(x \ge 5\). Classify each user.`,
        ],
        numbers: R`<ul>
<li>\(x = 2\): \(2^2 = 4 < 29.556\) → <b>R</b></li>
<li>\(x = 4\): \(2^4 = 16 < 29.556\) → <b>R</b></li>
<li>\(x = 7\): \(2^7 = 128 > 29.556\) → <b>M</b></li>
</ul>`,
        check: R`Numeric at \(x = 4\): R \(0.0722\) > M \(0.0390\) → R ✓.`,
        trap: R`Left blank in Moed B (0/5). The \(e^t\) table under the question is the hint.`,
        why: [
          [R`Why line 3? The cancelling, piece by piece`, R`<p>After dividing both sides by \(0.2 \cdot 2^x \cdot e^{-4}\) (positive, so \(>\) stays):</p>
<ul>
<li>Left: 0.2 and \(e^{-4}\) cancel, leaving \(\tfrac{4^x}{2^x} = \left(\tfrac42\right)^x = 2^x\).</li>
<li>Right: \(2^x\) cancels, leaving \(\tfrac{0.8}{0.2} = 4\) times \(\tfrac{e^{-2}}{e^{-4}} = e^{-2-(-4)} = e^{2}\).</li>
</ul>`],
          [R`Why a cut-off instead of three separate computations?`, R`<p>One derivation classifies every \(x\) at once ("M iff \(x \ge 5\)"), and part 6 reuses it. Computing both joints for each user separately (card on the \(e^t\) table) is also fine and earns the points.</p>`],
        ],
        side: R`<ul>
<li>The official solution writes the rule as a ratio "\(\ldots / \ldots > 1\)"; same thing.</li>
<li><b>The surprise:</b> 4 packets is exactly the typical malicious count (\(\hat\lambda_\mathrm{M} = 4\)), yet it is classified R, because malicious users are rare (\(\hat\pi_\mathrm{M} = 0.2\)). Parts 4–5 ask what would flip it.</li>
</ul>`,
      },

      "poisson-prior-flip": {
        title: "The smallest prior that flips \\(x = 4\\) to M",
        minutes: 2,
        cue: R`"Find the smallest value for the prior probability \(\pi_\mathrm{M}\) for which a user with \(x = 4\) packets would be classified as malicious … State whether this value is larger or smaller than \(\hat\pi_\mathrm{M}\) … explain" (2026-B Q4.4).`,
        lines: [
          R`At \(x = 4\), prior as a letter, \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\): \(\pi_\mathrm{M} \dfrac{4^4 e^{-4}}{4!} > (1 - \pi_\mathrm{M}) \dfrac{2^4 e^{-2}}{4!}\).`,
          R`Divide: \(\dfrac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} > \dfrac{2^4 e^{-2}}{4^4 e^{-4}} = \dfrac{e^2}{16}\).`,
          R`Solve: \(16\pi_\mathrm{M} > e^2 - e^2\pi_\mathrm{M}\), so \(\pi_\mathrm{M} > \dfrac{e^2}{16 + e^2}\).`,
          R`Compare with \(\hat\pi_\mathrm{M} = 0.2\) and say why.`,
        ],
        numbers: R`<ul>
<li>Table: \(\dfrac{e^2}{16 + e^2} = \dfrac{7.389}{23.389} \approx 0.316\)</li>
<li>Numeric route, same answer (\(\mathrm{Poiss}(4 \mid 4) = 0.1952\), \(\mathrm{Poiss}(4 \mid 2) = 0.0902\)): \(\pi_\mathrm{M} \cdot 0.1952 > (1 - \pi_\mathrm{M}) \cdot 0.0902\) → \(\pi_\mathrm{M} > \dfrac{0.0902}{0.0902 + 0.1952} = \dfrac{0.0902}{0.2854} \approx 0.316\)</li>
<li>\(0.316 > 0.2\): with 0.2, \(x = 4\) was R, so M's prior must go <b>up</b> to flip it.</li>
</ul>`,
        trap: R`Keeping \(\pi_\mathrm{R} = 0.8\) fixed: then there is nothing to solve. The "why it makes sense" sentence is part of the points.`,
        why: [
          [R`Why line 2? The ratio, piece by piece`, R`<p>Divide both sides by \((1 - \pi_\mathrm{M}) \cdot \tfrac{4^4 e^{-4}}{4!}\) (positive). The \(4!\) cancels. \(\tfrac{2^4}{4^4} = \tfrac{16}{256} = \tfrac{1}{16}\); \(\tfrac{e^{-2}}{e^{-4}} = e^{2}\). So the right side is \(\tfrac{e^2}{16}\).</p>`],
          [R`Why line 3? The algebra`, R`<p>Multiply both sides by \(16(1 - \pi_\mathrm{M})\) (positive): \(16\pi_\mathrm{M} > e^2(1 - \pi_\mathrm{M}) = e^2 - e^2\pi_\mathrm{M}\). Move \(\pi_\mathrm{M}\) terms left: \(\pi_\mathrm{M}(16 + e^2) > e^2\). Divide. It is the same move as \(\pi_\mathrm{A} < \tfrac{L_\mathrm{B}}{L_\mathrm{A} + L_\mathrm{B}}\) in 2025-A Q5.4: here \(\pi_\mathrm{M} > \tfrac{L_\mathrm{R}}{L_\mathrm{R} + L_\mathrm{M}}\) with \(L_\mathrm{R} = 0.0902\), \(L_\mathrm{M} = 0.1952\).</p>`],
        ],
        side: R`<ul><li>Even though 4 packets is the typical malicious count, M has to be common enough (above about 32% of users) before MAP calls it. Same effect as the rare-disease example.</li></ul>`,
      },

      "poisson-cost-ratio": {
        title: "The smallest cost ratio that flips \\(x = 4\\) to M",
        minutes: 2,
        cue: R`"Let \(C_{y,y'}\) denote the cost of predicting class \(y\) when the true class is \(y'\). Find the smallest ratio \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) for which a user with \(x = 4\) packets would be classified as malicious" (2026-B Q4.5).`,
        lines: [
          R`Decode: \(C_{\mathrm{R},\mathrm{M}}\) = say R, truth M (missed threat); \(C_{\mathrm{M},\mathrm{R}}\) = false alarm.`,
          R`M is cheaper iff \(C_{\mathrm{M},\mathrm{R}} \cdot 0.8\,\mathrm{Poiss}(4 \mid 2) < C_{\mathrm{R},\mathrm{M}} \cdot 0.2\,\mathrm{Poiss}(4 \mid 4)\).`,
          R`Isolate the ratio: \(\dfrac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} > \dfrac{0.8\,\mathrm{Poiss}(4 \mid 2)}{0.2\,\mathrm{Poiss}(4 \mid 4)}\).`,
          R`Simplify with the \(e^t\) table.`,
        ],
        numbers: R`<ul>
<li>\(\tfrac{0.8}{0.2} = 4\); \(4!\) cancels; \(\tfrac{2^4}{4^4} = \tfrac{1}{16}\); \(\tfrac{e^{-2}}{e^{-4}} = e^2\)</li>
<li>Ratio \(> 4 \cdot \tfrac{1}{16} \cdot e^2 = \dfrac{e^2}{4} = \dfrac{7.389}{4} \approx 1.847\)</li>
<li>Numeric route: \(\dfrac{0.8 \times 0.0902}{0.2 \times 0.1952} = \dfrac{0.0722}{0.0390} \approx 1.85\)</li>
</ul>
<p>A missed threat must cost more than about 1.85 false alarms.</p>`,
        trap: R`Putting each cost next to its own class. \(C_{\mathrm{R},\mathrm{M}}\) is paid when the truth is M, so it multiplies M's joint.`,
        why: [
          [R`Why line 2? The two expected costs`, R`<p>Predicting M is wrong only if the truth is R: expected cost \(C_{\mathrm{M},\mathrm{R}} \cdot \pi_\mathrm{R}\,\mathrm{Poiss}(4 \mid 2)\) (joint form, as on the formula sheet). Predicting R is wrong only if the truth is M: \(C_{\mathrm{R},\mathrm{M}} \cdot \pi_\mathrm{M}\,\mathrm{Poiss}(4 \mid 4)\). Predict M when its cost is smaller. It is the MAP inequality with each side multiplied by the cost of being wrong <b>against</b> that side.</p>`],
        ],
        side: R`<ul>
<li>The numeric route gives about 1.85 (1.848–1.851 depending on how far you round) because the table values are rounded; the exact answer is \(\tfrac{e^2}{4} \approx 1.847\), the official one.</li>
<li>The right side is \(\tfrac{\pi_\mathrm{R}}{\pi_\mathrm{M}} \cdot \tfrac{e^2}{16}\): the same likelihood ratio as part 4. Costs and priors move the same balance.</li>
<li>2026-B writes \(C\) instead of the usual \(\lambda_{y,y'}\) because \(\lambda\) is the Poisson rate here.</li>
</ul>`,
      },

      "poisson-risk": {
        title: "Generalization risk (bonus): the probability of a wrong prediction",
        minutes: 3,
        cue: R`"Assume that future data are drawn from the Poisson model you fitted … Compute the generalization risk of this classifier, i.e. the probability of a faulty classification" (2026-B Q4.6, bonus).`,
        lines: [
          R`From part 3: say M iff \(x \ge 5\). Wrong iff [R and \(x \ge 5\)] or [M and \(x \le 4\)].`,
          R`\(R = \pi_\mathrm{R} \Pr[X \ge 5 \mid 2] + \pi_\mathrm{M} \Pr[X \le 4 \mid 4]\).`,
          R`\(\Pr[X \le 4 \mid \lambda] = e^{-\lambda}\big(1 + \lambda + \tfrac{\lambda^2}{2} + \tfrac{\lambda^3}{6} + \tfrac{\lambda^4}{24}\big)\).`,
          R`\(\Pr[X \ge 5] = 1 - \Pr[X \le 4]\). Take \(e^{-2}, e^{-4}\) from the table.`,
        ],
        numbers: R`<ul>
<li>\(\lambda = 2\): bracket \(1 + 2 + 2 + \tfrac43 + \tfrac23 = 7\); \(7 \times 0.1353 = 0.9471\); \(\Pr[X \ge 5] = 0.0529\)</li>
<li>\(\lambda = 4\): bracket \(1 + 4 + 8 + \tfrac{32}{3} + \tfrac{32}{3} = \tfrac{103}{3}\); \(34.333 \times 0.0183 = 0.6283\)</li>
<li>\(R = 0.8 \times 0.0529 + 0.2 \times 0.6283 = 0.0423 + 0.1257 = 0.168\)</li>
</ul>`,
        trap: R`Leaving out the priors, or summing \(\Pr[X \ge 5]\) term by term (it never ends).`,
        why: [
          [R`Why line 2? Prior × probability of the wrong range`, R`<p>"Truly R <b>and</b> \(x \ge 5\)" is a joint: (fraction that is R) × (fraction of R users with \(x \ge 5\)) = \(\pi_\mathrm{R} \Pr[X \ge 5 \mid \lambda_\mathrm{R}]\). Same for M. The two ways to be wrong don't overlap, so add them. With all costs 1, the expected cost is just this probability of a mistake.</p>`],
          [R`Why line 3? The bracket`, R`<p>\(\Pr[X \le 4]\) is the sum of the Poisson probabilities for \(k = 0, \ldots, 4\). Every term has \(e^{-\lambda}\), so factor it out; the factorials are \(0! = 1, 1! = 1, 2! = 2, 3! = 6, 4! = 24\). For \(\lambda = 2\): \(\tfrac{4}{2} = 2\), \(\tfrac86 = \tfrac43\), \(\tfrac{16}{24} = \tfrac23\). For \(\lambda = 4\): \(\tfrac{16}{2} = 8\), \(\tfrac{64}{6} = \tfrac{32}{3}\), \(\tfrac{256}{24} = \tfrac{32}{3}\).</p>`],
        ],
        side: R`<ul>
<li>Exact form (official): \(R = \tfrac45(1 - 7e^{-2}) + \tfrac15 \cdot \tfrac{103}{3} e^{-4} \approx 0.168\).</li>
<li>Most of the error (0.126 of 0.168) comes from malicious users with few packets: the classifier misses about 63% of them, but they are only 20% of users.</li>
</ul>`,
      },
    },
    parts: {
      "2025A-q5.1": ["count-probs"],
      "2025A-q5.2": ["posterior-map"],
      "2025A-q5.3": ["flip-features"],
      "2025A-q5.4": ["prior-range"],
      "2025A-q5.5": ["expected-cost"],
      "2025C-q4.1": ["count-probs"],
      "2025C-q4.2": ["full-bayes"],
      "2025C-q4.3": ["naive-bayes"],
      "2025C-q4.4": ["compare-models"],
      "2025C-q4.5": ["ml-uniform"],
      "2025C-q4.6": ["cost-matrix"],
      "2026B-q4.1": ["poisson-mle"],
      "2026B-q4.2": ["poisson-fit"],
      "2026B-q4.3": ["poisson-plug", "poisson-map"],
      "2026B-q4.4": ["poisson-prior-flip"],
      "2026B-q4.5": ["poisson-cost-ratio"],
      "2026B-q4.6": ["poisson-risk"],
    },
  };
})();
