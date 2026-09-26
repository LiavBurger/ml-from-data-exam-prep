// Recipe cards for topic "gmm". Standard: spec/CARDS.md. Built from data/notes/gmm.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["gmm"] = {
    intro: R`<p>Question 5 of 2025-B, 2026-A and 2026-B: mixtures and the EM algorithm. The parts repeat: a GMM density (or plots), MLE by counting, the E-step, the M-step, one special case. Nothing is derived: <b>the GMM and EM formulas are on the formula sheet</b> (for coins, put \(p^h(1-p)^t\) where \(\phi\) is), and 2026-B prints a \(\phi\) table. Go part by part: read the card above the part (1–2 min), do the part on paper, then check. Start with 2025-B.</p>`,
    cards: {
      // ───────────────────────────────────────────── plots (2025-B Q5.1, 2026-A Q5.1)
      "gmm-plots": {
        title: "Match GMM parameters to plots",
        minutes: 2,
        cue: R`"Two of the three plots below … describe the PDFs of these two GMMs … Specify which plot matches each … and explain" (2025-B Q5.1; 2026-A Q5.1).`,
        lines: [
          R`Same means in both GMMs → they don't decide.`,
          R`Under each GMM, write each bump's height: \(\pi_j\cdot 0.399/\sigma_j\).`,
          R`Match the heights to the plots' peaks (ratios if the y-axis is cut off).`,
          R`Close bumps: ranges \(\mu\pm2\sigma\) overlap → the valley stays high; separate → it drops to 0.`,
          R`Name one feature that rules out the wrong plot.`,
        ],
        numbers: R`<p>2025-B, both GMMs have \(\mu = (10, 20, 25)\):</p>
<ul>
<li>GMM1: \(0.4\cdot 0.399/4 = 0.040\), \(0.3\cdot 0.399/2 = 0.060\), \(0.060\) → <b>plot C</b>.</li>
<li>GMM2: \(0.3\cdot 0.399/3 = 0.040\), \(0.060\), \(0.4\cdot 0.399/1 = 0.160\) → <b>plot A</b> (peak at 25 ≈ 4× the one at 10).</li>
<li>Not B: its tallest bump is at 10, and it drops to 0 between 20 and 25, where GMM1's bells overlap (\(20+2\cdot2 = 24 \gt 21 = 25-2\cdot2\)).</li>
</ul>`,
        trap: R`Height tracks \(\pi_j/\sigma_j\), not \(\pi_j\): GMM1's \(\pi = 0.4\) bump is its <b>lowest</b> (\(\sigma = 4\)).`,
        why: [
          [R`Why line 2? Where \(0.399/\sigma\) comes from`, R`<p>One bell \(\phi(x;\mu,\sigma) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)\) is highest at \(x = \mu\), where the exponential is \(e^0 = 1\). What's left is \(\frac{1}{\sigma\sqrt{2\pi}} = \frac{1}{2.507}\cdot\frac1\sigma = \frac{0.399}{\sigma}\). A wider bell is lower, because every bell has area exactly 1.</p>
<p>The mixture multiplies bell \(j\) by its weight \(\pi_j\). When the bumps are far apart, the density at \(x = \mu_j\) is almost only term \(j\), so the bump's height is \(\approx \pi_j\cdot 0.399/\sigma_j\). When two bumps are close, the neighbour's tail adds a little on top (that's why plot C shows 0.064, not 0.060).</p>`],
          [R`Why line 4? Valleys between close bumps`, R`<p>About 95% of a bell lies within \(\mu\pm2\sigma\) (the "2σ rule"). If two bells' ranges overlap, both are still clearly positive between the means, so the density can't drop to 0 there.</p>
<p>With numbers (2025-B GMM1, bumps at 20 and 25, \(\sigma = 2\)): the midpoint 22.5 is 2.5 from both centres. One bell there is \(0.1995\cdot e^{-2.5^2/8} = 0.1995\cdot 0.458 = 0.0913\); times its weight 0.3 gives 0.0274. Two such terms: \(f(22.5)\approx 0.0274 + 0.0274 = 0.055\) — a high valley, like plot C. You don't need this number on the exam; the 2σ argument is enough.</p>`],
        ],
        side: R`<ul>
<li><b>2026-A Q5.1</b> (\(\mu = (5, 15, 20)\)), same method: GMM1 heights \(0.4\cdot 0.399/3 = 0.053\), \(0.3\cdot 0.399/2 = 0.060\), \(0.060\) → plot C. GMM2 heights \(0.060\), \(0.060\), \(0.4\cdot 0.399/1 = 0.160\) → plot A. Plot B (peaks ≈ 0.105, 0.12, 0.12) fits neither. Valley check: GMM1's bells at 15 and 20 reach 19 and 16 → they overlap; plot C's valley stays high (≈0.055), plot B drops to ≈0.01.</li>
<li><b>Official 2025-B explanation</b> uses widths instead of heights: plot A is the only one whose bump at 20 is clearly wider than the one at 25 (\(\sigma_2 = 2 \gt \sigma_3 = 1\)). Either argument earns the points.</li>
<li><b>Slips in the official solutions:</b> 2025-B says "the midpoint at \(x = 27.5\)"; the midpoint of 20 and 25 is 22.5. 2026-A writes \(\sigma_1 = \sigma_2 = 0.2\) for GMM2; the table says 2.</li>
<li>Area tracks \(\pi_j\): GMM1's first bump (2025-B) should have \(0.4/0.3 = 1.33\) times the area of each other bump.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── φ table (2026-B)
      "phi-table": {
        title: "Read \\(\\phi\\) from the table — never compute it",
        minutes: 1,
        cue: R`"…densities of the normal distribution \(\mathcal N(\mu, \sigma = 1)\) as a function of the difference between the value \(x\) and the mean \(\mu\)" (2026-B, above part 1).`,
        lines: [
          R`Circle the table above part 1: \(x-\mu\) = 0, 1, 2, 3, 4 → \(\phi\) = 0.399, 0.242, 0.054, 0.004, 0.0001.`,
          R`For each \(\phi(x;\mu,1)\) you need, write the distance \(|x - \mu|\) (the sign doesn't matter).`,
          R`Write the table value for that distance. That <b>is</b> \(\phi\). No \(\sqrt{2\pi}\), no \(\exp\).`,
        ],
        numbers: R`<p>2026-B: means \(-1\) and \(1\), samples \(-2, 0, 2\):</p>
<ul>
<li>\(\phi(-2;-1,1)\): \(-2-(-1) = -1\) → <b>0.242</b>; &nbsp;\(\phi(-2;1,1)\): \(-2-1 = -3\) → <b>0.004</b></li>
<li>\(\phi(0;-1,1)\): \(0-(-1) = 1\) → <b>0.242</b>; &nbsp;\(\phi(0;1,1)\): \(0-1 = -1\) → <b>0.242</b></li>
<li>\(x = 2\) mirrors \(-2\): <b>0.004</b> (to \(-1\)) and <b>0.242</b> (to \(1\)).</li>
</ul>`,
        check: R`Every \(\phi\) is one of the five table numbers — never above 0.399.`,
        trap: R`<b>Moed B Q5.1 (0/3):</b> you wrote the \(\exp\) formula, then \(f(-2) = 0.9769\), \(f(0) = 0.5\) (right: 0.123, 0.242), and crossed it all out. The table was on the page.`,
        why: [
          [R`Why can one small table replace the formula?`, R`<p>The formula is \(\phi(x;\mu,\sigma) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)\). Look where \(x\) and \(\mu\) appear: only together, as \((x-\mu)^2\). So with \(\sigma = 1\) fixed, \(\phi\) depends only on the distance \(|x-\mu|\): 1 to the left of the centre and 1 to the right give the same value. That's why the table is indexed by \(x - \mu\) and has no negative columns.</p>
<p>Check column 1 once: \(\frac{1}{\sqrt{2\pi}}e^{-1^2/2} = 0.399\cdot e^{-0.5} = 0.399\cdot 0.607 = 0.242\). It's the table value. On the exam you skip this line.</p>`],
          [R`Why are 0.9769 and 0.5 impossible here?`, R`<p>The tallest a \(\sigma = 1\) bell gets is its peak, 0.399 (column 0). A GMM density is a weighted average of bells (weights add to 1), so it can't be taller than the tallest bell: \(f(x) \le 0.399\). Any bigger number is a slip — a signal to go back to the table.</p>
<p>The two numbers look like <b>areas</b> (cumulative probabilities, what a z-table lists), not heights: the area left of a bell's centre is exactly 0.5, and the area left of \(\mu + 2\sigma\) is 0.977. A density is the height of the curve at \(x\) — the table above part 1.</p>`],
        ],
        side: R`<ul>
<li>The table only covers \(\sigma = 1\) and whole-number distances — exactly what 2026-B needs in parts 1 and 4 (part 2 reuses part 1's numbers). Part 4 says it too: "you may use the normal densities specified in the table on the previous page".</li>
<li>The \(\phi\) formula is also on the formula sheet ("Normal (Gaussian) probability density function"). You need it only for plot reasoning (card "Match GMM parameters to plots"), never for these parts.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── GMM density (2026-B Q5.1)
      "gmm-density": {
        title: "The GMM density \\(f(x)\\) of a sample",
        minutes: 1,
        cue: R`"Using the initial parameters, compute the GMM density \(f(x_i)\) for each of the three samples in the dataset. Show your calculations." (2026-B Q5.1)`,
        lines: [
          R`Copy the formula printed in the question: \(f(x) = \pi_1\phi(x;\mu_1,\sigma_1) + \pi_2\phi(x;\mu_2,\sigma_2)\).`,
          R`Substitute one sample, e.g. \(f(-2) = 0.5\,\phi(-2;-1,1) + 0.5\,\phi(-2;1,1)\).`,
          R`Replace each \(\phi\) by its table value (same as card "Read \(\phi\) from the table").`,
          R`Multiply and write the two terms separately (0.121 + 0.002) — part 2 reuses them.`,
          R`Add. One line per sample.`,
        ],
        numbers: R`<p>2026-B: \(\pi = (0.5, 0.5)\), \(\mu = (-1, 1)\), \(\sigma = (1, 1)\), \(D = \{-2, 0, 2\}\):</p>
<ul>
<li>\(f(-2) = 0.5\cdot 0.242 + 0.5\cdot 0.004 = 0.121 + 0.002 = 0.123\)</li>
<li>\(f(0) = 0.5\cdot 0.242 + 0.5\cdot 0.242 = 0.121 + 0.121 = 0.242\)</li>
<li>\(f(2) = 0.5\cdot 0.004 + 0.5\cdot 0.242 = 0.002 + 0.121 = 0.123\)</li>
</ul>`,
        check: R`Data and means are symmetric around 0, so \(f(-2) = f(2)\).`,
        why: [
          [R`Why multiply by \(\pi_j\), then add?`, R`<p>A GMM makes each sample in two stages: (1) pick component \(j\) with probability \(\pi_j\) (hidden — we never see it); (2) that component's bell produces \(x\), with density \(\phi(x;\mu_j,\sigma_j)\).</p>
<p>"Picked \(j\) <b>and</b> produced \(x\)": both must happen → multiply, \(\pi_j\,\phi(x;\mu_j,\sigma_j)\). In Bayes words: prior × likelihood.</p>
<p>\(x\) came from exactly one component, we just don't know which → add the possibilities: \(f(x) = \sum_j \pi_j\,\phi(x;\mu_j,\sigma_j)\). This is the "Gaussian mixture model density function" on the formula sheet.</p>`],
          [R`Why keep the two terms (line 4)?`, R`<p>Part 2's responsibility is \(r(i,j) = \dfrac{\pi_j\phi(x_i;\mu_j,\sigma_j)}{f(x_i)}\): its top is one of your terms (0.121 or 0.002) and its bottom is your answer \(f(x_i)\). Written down now, part 2 is just six divisions.</p>`],
        ],
      },

      // ───────────────────────────────────────────── MLE with known coins
      "mle-count": {
        title: "MLE when you know the coin: count",
        minutes: 2,
        cue: R`"Assume that we know that a quarter was selected in experiment 1, and nickels were selected in experiments 2-4. Write the expression for the log-likelihood … and specify the MLEs" (2025-B Q5.2; 2026-A Q5.2 with gold/silver).`,
        lines: [
          R`Count heads \(h_i\) and tails \(t_i\) of every experiment (only counts matter, not order).`,
          R`Six totals: \(n_Q, n_N\) (experiments); \(n_{QH}, n_{QT}\) (quarter heads/tails); \(n_{NH}, n_{NT}\) (nickel heads/tails).`,
          R`\(\ell = n_Q\log\pi_Q + n_N\log(1-\pi_Q) + n_{QH}\log p_{QH} + n_{QT}\log(1-p_{QH}) + n_{NH}\log p_{NH} + n_{NT}\log(1-p_{NH})\)`,
          R`Each MLE = count / total of its pair: \(\pi_Q = \frac{n_Q}{n_Q+n_N}\), \(p_{QH} = \frac{n_{QH}}{n_{QH}+n_{QT}}\), \(p_{NH} = \frac{n_{NH}}{n_{NH}+n_{NT}}\).`,
        ],
        numbers: R`<p>2025-B: \(h = (3, 0, 2, 3)\), \(t = (2, 5, 3, 2)\); quarter = experiment 1, nickels = 2–4.</p>
<ul>
<li>\(n_Q = 1\), \(n_N = 3\); \(n_{QH} = 3\), \(n_{QT} = 2\); \(n_{NH} = 0+2+3 = 5\), \(n_{NT} = 5+3+2 = 10\)</li>
<li>\(\ell = 1\log\pi_Q + 3\log(1-\pi_Q) + 3\log p_{QH} + 2\log(1-p_{QH}) + 5\log p_{NH} + 10\log(1-p_{NH})\)</li>
<li>\(\pi_Q = \frac{1}{4} = 0.25\), \(p_{QH} = \frac{3}{5} = 0.6\), \(p_{NH} = \frac{5}{15} = 0.333\)</li>
</ul>`,
        check: R`Heads + tails of a coin = 5 × its experiments: \(3 + 2 = 5\cdot 1\), \(5 + 10 = 5\cdot 3\).`,
        trap: R`\(p_{QH}\) is divided by the <b>quarter tosses</b> (5), not by experiments and not by all 20 tosses.`,
        why: [
          [R`Why line 3? From "probability of the data" to six terms`, R`<p>MLE = the parameters that make the observed data most probable. One quarter experiment with \(h_i\) heads and \(t_i\) tails has probability \(\pi_Q\,p_{QH}^{h_i}(1-p_{QH})^{t_i}\) (pick the quarter, then independent tosses multiply). Experiments are independent → the data's probability is the product over experiments.</p>
<p>Take the log: products become sums, powers come down in front: \(\log\pi_Q + h_i\log p_{QH} + t_i\log(1-p_{QH})\). Add over all experiments and collect equal logs: \(\log\pi_Q\) appears once per quarter experiment (\(n_Q\) times), \(\log p_{QH}\) is multiplied by all quarter heads (\(n_{QH}\)), and so on. Only the six totals remain.</p>`],
          [R`Why line 4? Maximizing one pair`, R`<p>Each parameter sits in its own pair \(a\log q + b\log(1-q)\). Derivative = 0: \(\frac{a}{q} - \frac{b}{1-q} = 0\) → \(a(1-q) = bq\) → \(a = (a+b)q\) → \(q = \frac{a}{a+b}\). So every MLE is "count / total" — the same "fraction of heads" as for a single coin.</p>`],
        ],
        side: R`<ul>
<li><b>2026-A Q5.2</b> (official): gold = experiments 1, 3 (heads 3, 4); silver = 2, 4 (heads 1, 2). \(\pi_G = 2/4 = 0.5\), \(p_G = (3+4)/(5+5) = 0.7\), \(p_S = (1+2)/(5+5) = 0.3\).</li>
<li>No binomial coefficient \(\binom{5}{h}\): the exam gives one specific sequence. (It would only add a constant to \(\ell\) and not change the MLEs.)</li>
</ul>`,
      },

      // ───────────────────────────────────────────── E-step, coins
      "coin-e-step": {
        title: "E-step for coins: responsibilities",
        minutes: 2,
        cue: R`"Compute the responsibility values in this case. Recall that responsibility \(r(i,a)\) is the posterior probability that a coin of type \(a\) was selected in experiment \(i\)" (2025-B Q5.3; 2026-A Q5.3).`,
        lines: [
          R`Write the starting values and their complements: \(\pi_Q, 1-\pi_Q, p_{QH}, 1-p_{QH}, p_{NH}, 1-p_{NH}\).`,
          R`Per experiment: joint Q \(= \pi_Q\,p_{QH}^{h}(1-p_{QH})^{t}\).`,
          R`Joint N \(= (1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t}\).`,
          R`Total = joint Q + joint N.`,
          R`\(r(i,Q)\) = joint Q / total; \(r(i,N)\) = joint N / total. Collect all in one table.`,
        ],
        numbers: R`<p>2025-B, start \(\pi_Q = 0.5\), \(p_{QH} = 0.5\), \(p_{NH} = 0.8\). Experiment 1 (\(h = 3\), \(t = 2\)):</p>
<ul>
<li>joint Q \(= 0.5\cdot 0.5^3\cdot 0.5^2 = 0.5\cdot 0.125\cdot 0.25 = 0.015625\)</li>
<li>joint N \(= 0.5\cdot 0.8^3\cdot 0.2^2 = 0.5\cdot 0.512\cdot 0.04 = 0.01024\)</li>
<li>total \(= 0.025865\) → \(r(1,Q) = 0.015625/0.025865 = 0.604\), \(r(1,N) = 0.396\)</li>
</ul>
<p>All four: \(r(i,Q) = 0.604, 0.990, 0.859, 0.604\).</p>`,
        check: R`\(r(i,Q) + r(i,N) = 1\); experiments with the same \(h\) (1 and 4) get the same \(r\).`,
        trap: R`Keep the prior in the joints. Here it's 0.5/0.5 and cancels, but in 2026-A it's 0.8/0.2 and changes every answer.`,
        why: [
          [R`Why this formula? It's a Bayes posterior`, R`<p>"Probability that experiment \(i\) used the quarter, <b>given</b> its tosses" is a posterior. Bayes: posterior = prior × likelihood / evidence.</p>
<ul>
<li>prior = \(\pi_Q\) (how often a quarter is picked);</li>
<li>likelihood = \(p_{QH}^{h}(1-p_{QH})^{t}\) (independent tosses multiply);</li>
<li>evidence = total probability of the sequence = joint Q + joint N (it was one of the two coins).</li>
</ul>
<p>So \(r(i,Q)\) = joint Q / (joint Q + joint N). The formula sheet's "Responsibilities update" \(r(i,j) = \frac{\pi_j\phi(x^{(i)};\dots)}{\sum_{j'}\pi_{j'}\phi(x^{(i)};\dots)}\) is the same thing with a bell \(\phi\) as the likelihood; for coins, put \(p^h(1-p)^t\) where \(\phi\) is.</p>`],
          [R`What is EM, and where does this step fit?`, R`<p>If we knew which coin each experiment used, we'd just count (MLE card). If we knew the parameters, we could compute how likely each coin is (this card). EM alternates:</p>
<ol>
<li><b>E-step</b>: from the current parameters, compute every \(r(i,a)\) — "soft labels", e.g. 60% quarter, 40% nickel.</li>
<li><b>M-step</b>: count again, but each experiment counts as the fraction \(r(i,a)\) toward each coin → new parameters.</li>
</ol>
<p>Repeat until nothing changes. The exams ask for <b>one</b> iteration: one E-step, one M-step. It's K-means with soft assignments.</p>`],
        ],
        side: R`<ul>
<li><b>Time saver (2025-B):</b> \(p_{QH} = 0.5\), so every joint Q is \(0.5\cdot 0.5^5 = 0.5^6 = 0.015625\), whatever the sequence.</li>
<li><b>The whole 2025-B table:</b> joint N = 0.01024, 0.00016, 0.00256, 0.01024; totals 0.025865, 0.015785, 0.018185, 0.025865; \(r(i,N)\) = 0.396, 0.010, 0.141, 0.396.</li>
<li><b>2026-A Q5.3</b> (official; start \(\pi_G = 0.8\), \(p_G = 0.2\), \(p_S = 0.8\); heads 3, 1, 4, 2): \(r(i,G) = 0.5, 0.9961, 0.0588, 0.9412\). Experiment 1: joint G \(= 0.8\cdot 0.2^3\cdot 0.8^2 = 0.004096\), joint S \(= 0.2\cdot 0.8^3\cdot 0.2^2 = 0.004096\) → 0.5.</li>
<li>No binomial coefficient: it would be the same factor in both joints and cancel.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── M-step, coins
      "coin-m-step": {
        title: "M-step for coins: expected counts",
        minutes: 2,
        cue: R`"Use the responsibility values you computed in (3) above to update the parameters \(\pi_Q\) and \(p_{QH}\) … Base your computations on the following four expected values" (2025-B Q5.4; 2026-A Q5.4 asks for \(\pi_G\) and \(p_S\)).`,
        lines: [
          R`\(\mathbb E[n_Q] = \sum_i r(i,Q)\) and \(\mathbb E[n_N] = \sum_i r(i,N)\).`,
          R`\(\mathbb E[n_{QH}] = \sum_i r(i,Q)\,h_i\) — one product per experiment, written out.`,
          R`\(\mathbb E[n_{QT}] = \sum_i r(i,Q)\,t_i\).`,
          R`\(\pi_Q \leftarrow \frac{\mathbb E[n_Q]}{\mathbb E[n_Q]+\mathbb E[n_N]}\), &nbsp;\(p_{QH} \leftarrow \frac{\mathbb E[n_{QH}]}{\mathbb E[n_{QH}]+\mathbb E[n_{QT}]}\).`,
        ],
        numbers: R`<p>2025-B: \(r(i,Q) = (0.604, 0.990, 0.859, 0.604)\) from part 3, \(h = (3,0,2,3)\), \(t = (2,5,3,2)\).</p>
<ul>
<li>\(\mathbb E[n_Q] = 0.604+0.990+0.859+0.604 = 3.057\); \(\mathbb E[n_N] = 0.943\)</li>
<li>\(\mathbb E[n_{QH}] = 1.812 + 0 + 1.718 + 1.812 = 5.342\)</li>
<li>\(\mathbb E[n_{QT}] = 1.208 + 4.950 + 2.577 + 1.208 = 9.943\)</li>
<li>\(\pi_Q \leftarrow 3.057/4 = 0.764\); \(p_{QH} \leftarrow 5.342/15.285 = 0.349\)</li>
</ul>`,
        check: R`\(\mathbb E[n_Q] + \mathbb E[n_N] = 4\) (experiments); \(\mathbb E[n_{QH}] + \mathbb E[n_{QT}] = 5\cdot\mathbb E[n_Q] = 15.285\).`,
        trap: R`Use the coin the part asks about: 2026-A asks for \(p_S\) → multiply by \(r(i,S)\), not \(r(i,G)\).`,
        why: [
          [R`Why lines 1–3? Counting with fractions`, R`<p>With known coins (MLE card), \(n_Q\) adds 1 for each quarter experiment and 0 for each nickel experiment, and \(n_{QH}\) adds that experiment's \(h_i\) if it was a quarter.</p>
<p>Now experiment \(i\) is only "\(r(i,Q)\) of a quarter" (e.g. 0.604). So it adds \(r(i,Q)\) instead of 1 to the quarter count, and its \(h_i\) heads count as \(r(i,Q)\cdot h_i\) quarter heads. These fractional totals are the <b>expected counts</b>.</p>`],
          [R`Why line 4? Same fractions as the MLE`, R`<p>Line 4 is the MLE card's "count / total of its pair", with expected counts in place of real counts. On the formula sheet ("Maximization updates") it's \(n_j = \sum_i r(i,j)\), \(\pi_j = n_j/n\). The quarter now "owns" 3.06 of 4 experiments, including the tail-heavy experiment 2, so \(\pi_Q\) rises from 0.5 to 0.764 and \(p_{QH}\) falls from 0.5 to 0.349.</p>`],
        ],
        side: R`<ul>
<li><b>2026-A Q5.4</b> (official): \(\mathbb E[n_G] = 2.4961\), \(\mathbb E[n_S] = 1.5039\), \(\mathbb E[n_{SH}] = 5.3863\), \(\mathbb E[n_{ST}] = 2.1332\) → \(\pi_G \leftarrow 2.4961/4 = 0.624\), \(p_S \leftarrow 5.3863/7.5195 = 0.716\).</li>
<li>2025-B \(p_{NH}\) (not asked): \(\mathbb E[n_{NH}] = 1.188 + 0 + 0.282 + 1.188 = 2.658\), nickel tosses \(5\cdot 0.943 = 4.715\) → \(0.564\).</li>
<li>Slip in the 2025-B official solution: it writes \(\mathbb E[n_N] = \sum_{i=1}^{5} r(i,Q)\); it means \(\sum_{i=1}^{4} r(i,N)\) (the numbers it adds are right).</li>
<li>With unrounded responsibilities \(\mathbb E[n_{QH}] = 5.343\); either rounding gives 0.349.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── EM fixed point
      "em-stuck": {
        title: "When EM doesn't move: two identical coins",
        minutes: 2,
        cue: R`"… after initializing the parameters with the following values: \(\pi_Q = 0.5\); \(p_{QH} = 0.8\); \(p_{NH} = 0.8\) … Note that the updated values can be computed with relatively few calculations" (2025-B Q5.5); "Suggest initial values … that would remain unchanged after an iteration" (2026-A Q5.5, bonus).`,
        lines: [
          R`Spot \(p_{QH} = p_{NH}\): the two coins are identical.`,
          R`So both joints share the factor \(p^h(1-p)^t\), and every \(r(i,Q) = \pi_Q\) (here 0.5).`,
          R`\(\pi_Q \leftarrow \sum_i r(i,Q)/4 = \pi_Q\): unchanged.`,
          R`Both heads-probabilities \(\leftarrow\) all heads / all tosses.`,
          R`Bonus (fixed point): start there — equal coins, each with p = all heads / all tosses.`,
        ],
        numbers: R`<ul>
<li>2025-B: every \(r(i,Q) = 0.5\) → \(\mathbb E[n_Q] = 2\), \(\pi_Q \leftarrow 2/4 = 0.5\).</li>
<li>\(\mathbb E[n_{QH}] = 0.5\cdot(3+0+2+3) = 4\), \(\mathbb E[n_{QT}] = 0.5\cdot(2+5+3+2) = 6\) → \(p_{QH} \leftarrow 4/10 = \mathbf{0.4}\) (and \(p_{NH}\) too).</li>
<li>2026-A: heads \(3+1+4+2 = 10\) of 20 → start \(\pi_G = 0.5\), \(p_G = p_S = 0.5\).</li>
</ul>`,
        check: R`\(0.4 = 8/20\) = the fraction of heads in all 20 tosses.`,
        trap: R`The 2025-B official solution writes \(4/10 = 0.2\). It is <b>0.4</b>.`,
        why: [
          [R`Why line 2? The shared factor cancels`, R`<p>With \(p_{QH} = p_{NH} = p\), the joints are \(\pi_Q\cdot p^{h}(1-p)^{t}\) and \((1-\pi_Q)\cdot p^{h}(1-p)^{t}\). Divide joint Q by the total and the common factor cancels: \(r(i,Q) = \frac{\pi_Q}{\pi_Q + (1-\pi_Q)} = \pi_Q\), for every experiment. The data can't tell two identical coins apart.</p>
<p>2025-B, experiment 1: both joints are \(0.5\cdot 0.8^3\cdot 0.2^2 = 0.01024\), so \(r = 0.01024/0.02048 = 0.5\).</p>`],
          [R`Why line 4, and why it's stuck forever`, R`<p>Every experiment's heads count half toward each coin: \(\mathbb E[n_{QH}] = 0.5\cdot(\text{all heads})\), \(\mathbb E[n_{QT}] = 0.5\cdot(\text{all tails})\). The 0.5 cancels in the fraction, leaving all heads / all tosses — for both coins.</p>
<p>After the step the coins are <b>still</b> identical, so the next E-step gives 0.5 again, and so on: a <b>fixed point</b>. If you start exactly there, not even the first step changes anything — that's the 2026-A bonus. Lesson: EM can't break a symmetry it starts with.</p>`],
        ],
        side: R`<ul>
<li>2025-B official solution: it also says "similarly, we also get \(p_{QH} \leftarrow 0.2\)" at the end; it means the nickel, and the correct value is \(p_{NH} \leftarrow 0.4\). EM stays at \((0.5, 0.4, 0.4)\).</li>
<li>2026-A: any \(\pi_G\) works with \(p_G = p_S = 0.5\) (every \(r = \pi_G\), so \(\pi_G\) comes back unchanged). The official solution also lists degenerate options (\(\pi_G = 1\), \(p_G = 0.5\), \(p_S\) anything; or the mirror image) and says to avoid them. Slip there: "\(\pi_G \leftarrow 2/4 = 2\)" should be 0.5.</li>
<li>Practical lesson: never initialize two components identically.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── E-step, Gaussian
      "gauss-e-step": {
        title: "E-step for a GMM: responsibilities",
        minutes: 1,
        cue: R`"Compute the responsibilities associated with the E step of the EM update … Specify the six responsibility values and show your intermediate calculations." (2026-B Q5.2)`,
        lines: [
          R`Copy from the formula sheet, section "Expectation Maximization for Gaussian Mixture Models", line "Responsibilities update": \(r(i,j) = \dfrac{\pi_j\phi(x_i;\mu_j,\sigma_j)}{\sum_{j'}\pi_{j'}\phi(x_i;\mu_{j'},\sigma_{j'})}\).`,
          R`Write: top = a term from part 1; bottom = \(f(x_i)\) from part 1. No new \(\phi\).`,
          R`Table: \(x_i\) | \(j\) | \(\pi_j\phi\) | \(f(x_i)\) | \(r = \pi_j\phi/f\). Six rows.`,
          R`Check each sample's two \(r\) add to 1.`,
        ],
        numbers: R`<p>2026-B, terms and densities from part 1:</p>
<ul>
<li>\(x = -2\): \(r = 0.121/0.123 = 0.984\) and \(0.002/0.123 = 0.016\)</li>
<li>\(x = 0\): \(r = 0.121/0.242 = 0.5\) and \(0.121/0.242 = 0.5\)</li>
<li>\(x = 2\): \(r = 0.002/0.123 = 0.016\) and \(0.121/0.123 = 0.984\)</li>
</ul>`,
        check: R`\(-2\) is 1 from \(\mu_1 = -1\) and 3 from \(\mu_2 = 1\) → component 1 almost surely; 0 is halfway → 50/50.`,
        trap: R`Moed B: left blank (0/6). This part is six divisions of numbers you already wrote in part 1.`,
        why: [
          [R`Why this formula? A Bayes posterior`, R`<p>\(r(i,j)\) = probability that component \(j\) produced \(x_i\), <b>given</b> \(x_i\). Bayes: prior \(\pi_j\) × likelihood \(\phi(x_i;\mu_j,\sigma_j)\), divided by the evidence — the total density \(f(x_i)\), which is the sum of all components' terms. The \(j'\) in the bottom is just a second letter meaning "every component", so the bottom adds all \(k\) terms.</p>
<p>It's the same as the coin E-step: "this component's term / sum of all terms", with a bell instead of \(p^h(1-p)^t\).</p>`],
        ],
        side: R`<ul>
<li>Unrounded: \(0.121/0.123 = 0.9837\). Rounding to 0.984 is what the official table shows.</li>
<li>The formula sheet writes it for vectors, \(\phi(x^{(i)};\mu_j,\Sigma_j)\); in 1-D, \(\Sigma_j\) is just \(\sigma_j^2\).</li>
</ul>`,
      },

      // ───────────────────────────────────────────── M-step, Gaussian
      "gauss-m-step": {
        title: "M-step for a GMM: new \\(\\pi\\) and \\(\\mu\\)",
        minutes: 2,
        cue: R`"Using the responsibilities you computed in (2) above, compute the updated values for parameters \(\pi\) and \(\mu\) after applying the M-step update. You do not need to update \(\sigma\)." (2026-B Q5.3)`,
        lines: [
          R`Copy from the formula sheet, "Maximization updates": \(n_j = \sum_i r(i,j)\), \(\pi_j = \frac{n_j}{n}\), \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x_i\).`,
          R`\(n_j\) = column sum of your responsibility table.`,
          R`\(\pi_j = n_j/n\) (\(n\) = number of samples).`,
          R`\(\mu_j\): one product \(r(i,j)\cdot x_i\) per sample, add them, divide by \(n_j\).`,
        ],
        numbers: R`<p>2026-B, \(D = \{-2, 0, 2\}\), \(r\) from part 2:</p>
<ul>
<li>\(n_1 = 0.984 + 0.5 + 0.016 = 1.5\), \(n_2 = 1.5\) → \(\pi = (1.5/3,\ 1.5/3) = (0.5, 0.5)\)</li>
<li>\(\mu_1 = \frac{0.984\cdot(-2) + 0.5\cdot 0 + 0.016\cdot 2}{1.5} = \frac{-1.968 + 0 + 0.032}{1.5} = \frac{-1.936}{1.5} = -1.291\)</li>
<li>\(\mu_2 = \frac{0.016\cdot(-2) + 0.5\cdot 0 + 0.984\cdot 2}{1.5} = \frac{1.936}{1.5} = 1.291\)</li>
</ul>`,
        check: R`\(n_1 + n_2 = 3 = n\). The means moved outward from \(\pm1\): component 1 mostly owns \(-2\).`,
        trap: R`Divide \(\mu_j\) by \(n_j\) (1.5), not by \(n\) (3): \(-1.936/3 = -0.645\) is wrong.`,
        why: [
          [R`Why line 4? A weighted average`, R`<p>An ordinary average gives every sample weight 1: \(\frac{1\cdot x_1 + 1\cdot x_2 + 1\cdot x_3}{1+1+1}\). For component \(j\), each sample counts only as much as \(j\) owns it, so the weights become the responsibilities, and you divide by the sum of the weights, \(n_j\). It's the K-means centroid ("average of the cluster's points") with soft membership.</p>`],
          [R`If \(\sigma\) is asked too (formula sheet \(\Sigma_j\))`, R`<p>Same idea: \(\sigma_j^2 = \frac{1}{n_j}\sum_i r(i,j)(x_i - \mu_j)^2\), with the <b>new</b> \(\mu_j\). 2026-B numbers (not asked): \(0.984\cdot(-0.709)^2 + 0.5\cdot 1.291^2 + 0.016\cdot 3.291^2 = 0.495 + 0.833 + 0.173 = 1.501\); divided by 1.5 gives \(1.001\), so \(\sigma_1 \approx 1\).</p>`],
        ],
        side: R`<ul>
<li>Official answer: \(\pi \leftarrow (0.5, 0.5)\), \(\mu \leftarrow (-1.291, 1.291)\). With unrounded responsibilities (0.9837) you get \(\pm1.290\) — either is fine.</li>
<li>Coins vs. Gaussians: \(n_j\) is the coin card's \(\mathbb E[n_Q]\); \(\mu_j\) replaces the coin's "expected heads / expected tosses".</li>
</ul>`,
      },

      // ───────────────────────────────────────────── MAP with a GMM class density
      "map-gmm": {
        title: "MAP classification when a class density is a GMM",
        minutes: 2,
        cue: R`"Assume uniform class priors (\(\pi_A = \pi_B = 0.5\)) and use the MAP rule to predict a class label for each of the two samples \(x \in \{0, 2\}\) … you may use the normal densities specified in the table on the previous page." (2026-B Q5.4)`,
        lines: [
          R`Rule: predict the class with the larger \(\pi_y\cdot f(x\mid Y=y)\).`,
          R`For one \(x\): write the distance \(|x-\mu|\) to all three means (\(-2\), \(2\) for A; \(0\) for B) and read each \(\phi\) from the table above part 1 — never compute it.`,
          R`\(f(x,A) = \pi_A\big[\tfrac12\phi(x;-2,1) + \tfrac12\phi(x;2,1)\big]\).`,
          R`\(f(x,B) = \pi_B\,\phi(x;0,1)\).`,
          R`Compare, write the winner. Repeat for the next \(x\).`,
        ],
        numbers: R`<p>2026-B:</p>
<ul>
<li>\(x = 0\): distances 2, 2, 0. \(f(0,A) = 0.5[0.5\cdot 0.054 + 0.5\cdot 0.054] = 0.5\cdot 0.054 = 0.027\); \(f(0,B) = 0.5\cdot 0.399 = 0.200\) → <b>B</b>.</li>
<li>\(x = 2\): distances 4, 0, 2. \(f(2,A) = 0.5[0.5\cdot 0.0001 + 0.5\cdot 0.399] = 0.5\cdot 0.19955 = 0.100\); \(f(2,B) = 0.5\cdot 0.054 = 0.027\) → <b>A</b>.</li>
</ul>`,
        trap: R`Two layers of weights: the class prior 0.5 <b>and</b> the GMM weights \(\tfrac12\) both multiply.`,
        why: [
          [R`Why line 1? MAP without the denominator`, R`<p>MAP picks the class with the largest posterior \(P(y\mid x) = \frac{\pi_y f(x\mid y)}{f(x)}\). Both classes share the same denominator \(f(x)\), so comparing the tops \(\pi_y f(x\mid y)\) gives the same winner.</p>`],
          [R`Why can a class density be a GMM?`, R`<p>Class A's data can sit in two clusters (around \(-2\) and \(+2\)). One bell fits that badly; a mixture of two bells fits it. The MAP rule doesn't change — you just evaluate \(f(x\mid A)\) like any GMM density: weights × \(\phi\), added. Intuition for the answers: \(x = 0\) is between A's two clusters but at the centre of B's bell; \(x = 2\) is at the centre of one of A's clusters.</p>`],
        ],
        side: R`<ul>
<li>Slip in the official solution: for the second point its last line says "Because \(f(x=0, Y=A) \gt f(x=0, Y=B)\)"; it means \(x = 2\): \(0.100 \gt 0.027\).</li>
<li>With equal priors, forgetting \(\pi_A\), \(\pi_B\) on both sides doesn't change the winner, but it loses the intermediate-calculation points.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── naive Bayes with GMMs
      "naive-bayes-gmm": {
        title: "Naive Bayes with univariate GMMs: does it fit the plot?",
        minutes: 3,
        cue: R`"For each dataset (a-c), determine whether it makes sense to use a naïve Bayes classifier that uses univariate GMMs" (2026-B Q5.5).`,
        lines: [
          R`Assumption: \(f(x_1,x_2\mid y) = f(x_1\mid y)\,f(x_2\mid y)\) — features independent given the class.`,
          R`Per class, project its points on each axis: how many clusters, where?`,
          R`Grid: pair every \(x_1\)-centre with every \(x_2\)-centre.`,
          R`Grid = the real blobs → "yes": list the 4 GMMs (components + means).`,
          R`Grid hits empty places, or the cloud is tilted → "no": name the assumption and one such point.`,
        ],
        numbers: R`<p>2026-B (A = circles, B = crosses):</p>
<ul>
<li>(a) A: \(x_1\) ≈ −3, 1; \(x_2\) ≈ −2, 2 → grid = A's blobs ✓. B: \(x_1\) ≈ 1.2, 3.2; \(x_2\) ≈ −3, 1 ✓. Four GMMs, 2 components each.</li>
<li>(b) A at \((2,2), (-2,-2)\): its grid adds \((2,-2), (-2,2)\) — B's blobs ✗.</li>
<li>(c) Tilted bands: \(x_2\) changes with \(x_1\) ✗.</li>
</ul>`,
        trap: R`"Yes" needs numbers (components, means); "no" needs the name: conditional independence given the class.`,
        why: [
          [R`Why does a product give a grid?`, R`<p>Say class A's \(x_1\) values cluster at \(a\) and \(b\), and its \(x_2\) values at \(c\) and \(d\). The product \(f(x_1\mid A)\,f(x_2\mid A)\) is large wherever <b>both</b> factors are large: at all four combinations \((a,c), (a,d), (b,c), (b,d)\). So naive Bayes can only draw an axis-aligned grid of blobs. It can't draw a tilted cloud, and it can't pick just \((a,c)\) and \((b,d)\).</p>`],
          [R`Why (b) fails — the official argument`, R`<p>The true \(f(x = (2,-2)\mid A)\) is ≈ 0: no circles there. But \(f(x_1 = 2\mid A)\) and \(f(x_2 = -2\mid A)\) are both clearly positive (A has points with \(x_1 = 2\), and others with \(x_2 = -2\)), so their product isn't small. Class B's projections are the same, so naive Bayes gives both classes (almost) the same density everywhere and can't separate them. Within each class the features are strongly <b>dependent</b>.</p>`],
        ],
        side: R`<ul>
<li>This is HW6's <code>NaiveBayesGMM</code>: one univariate GMM per (class, feature), prediction \(\arg\max_y \pi_y\,\mathrm{GMM}_{y,1}(x_1)\,\mathrm{GMM}_{y,2}(x_2)\).</li>
<li>(b) is the lecture's "Limitations of naive Bayes" (XOR) example.</li>
<li>(c) also: the classes overlap heavily on the \(x_2\) axis, so \(x_2\)'s GMMs barely help. The official answer adds that a full (2-D) Bayes model would do much better.</li>
</ul>`,
      },
    },
    parts: {
      "2025B-q5.1": ["gmm-plots"],
      "2025B-q5.2": ["mle-count"],
      "2025B-q5.3": ["coin-e-step"],
      "2025B-q5.4": ["coin-m-step"],
      "2025B-q5.5": ["em-stuck"],
      "2026A-q5.1": ["gmm-plots"],
      "2026A-q5.2": ["mle-count"],
      "2026A-q5.3": ["coin-e-step"],
      "2026A-q5.4": ["coin-m-step"],
      "2026A-q5.5": ["em-stuck"],
      "2026B-q5.1": ["phi-table", "gmm-density"],
      "2026B-q5.2": ["gauss-e-step"],
      "2026B-q5.3": ["gauss-m-step"],
      "2026B-q5.4": ["map-gmm"],
      "2026B-q5.5": ["naive-bayes-gmm"],
    },
  };
})();
