// Walkthroughs for the GMM / EM questions (2025-B Q5, 2026-A Q5, 2026-B Q5) — CASUAL style (spec/WALKS.md):
// few moves, plain words, only the lines that earn the points. Every number checked with numpy.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ─────────────────────────────────────────────── 2025-B Q5
    "2025B-q5.1": {
      point: R`<p>The means are the same in every plot, so compare bump heights: a bump is about \(\pi_j\cdot 0.399/\sigma_j\) high (small \(\sigma\) = tall and thin). GMM2's \(\sigma = 1\) at 25 gives one tall spike (A); GMM1 has a low bump at 10 and two equal bumps at 20 and 25 (C).</p>`,
      moves: [
        { line: R`<b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\), one row per bump: <div class="formula">\[\begin{array}{c|c|c} \mu & \text{GMM1} & \text{GMM2}\\ \hline 10 & 0.4\cdot 0.399/4 = 0.040 & 0.3\cdot 0.399/3 = 0.040\\ 20 & 0.3\cdot 0.399/2 = 0.060 & 0.3\cdot 0.399/2 = 0.060\\ 25 & 0.3\cdot 0.399/2 = 0.060 & 0.4\cdot 0.399/1 = 0.160\end{array}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Normal (Gaussian) probability density]. At \(x = \mu\) the exp part is \(e^0 = 1\), so a bell's peak is \(\frac{1}{\sigma\sqrt{2\pi}} = \frac{0.399}{\sigma}\). [sheet: Gaussian mixture model density func] multiplies bell \(j\) by \(\pi_j\). Neighbouring bells add a little tail, so it's "≈".</p>` },
        { line: R`<b>GMM2 → plot A</b> — A is the only plot with one tall, narrow peak at 25, about 4 times the bump at 10 (\(0.160/0.040 = 4\)). That's \(\sigma_3 = 1\).`,
          why: R`<p>A's y-axis numbers are cut off in the image, so compare ratios: peak at 25 ≈ 4 × the bump at 10, bump at 20 ≈ 1.5 × the bump at 10 (\(0.060/0.040 = 1.5\)). In B and C the bumps at 20 and 25 have the same width — like GMM1 (\(\sigma_2 = \sigma_3 = 2\)).</p>` },
        { line: R`<b>GMM1 → plot C</b> — C's bump at 10 is 0.040 and at 20 ≈ 0.064, like GMM1. B's bump at 10 (0.088) is its highest, but GMM1's is its lowest. Done.`,
          why: R`<p><b>The valley confirms it.</b> The midpoint 22.5 is only 1.25σ from both centres (σ = 2), so the two bells overlap and the valley stays high: \(f(22.5) \approx 2\cdot 0.3\cdot\phi(22.5; 20, 2) = 2\cdot 0.027 = 0.055\). C's valley is about there; B drops to ≈ 0 between 20 and 25. So B fits neither GMM.</p>`,
          extra: [{ label: "official slip: \"midpoint at x = 27.5\"", html: R`<p>The midpoint of 20 and 25 is \((20 + 25)/2 = 22.5\), not 27.5. Its "1.25 standard deviations from each mean" is right for 22.5.</p>` }] },
      ],
      compare: R`Official: GMM1 → C, GMM2 → A. It argues with widths (only A has \(\sigma_2 \gt \sigma_3\), move 2), the high valley between 20 and 25 (move 3's why?) and the areas (0.4 vs 0.3). Its "midpoint at x = 27.5" is a slip for 22.5.`,
    },

    "2025B-q5.2": {
      point: R`<p>We know which coin each experiment used, so just count. The log-likelihood = each count × log of its probability, and each MLE = count / total of its pair.</p>`,
      start: R`<p><b>The counts:</b> \(n_Q = \square,\ n_N = \square\)<br>\(n_{QH} = \square,\ n_{QT} = \square,\ n_{NH} = \square,\ n_{NT} = \square\)</p>
<p><b>The log-likelihood:</b></p>\[\ell = n_Q\log\pi_Q + \square\]
<p><b>The MLEs:</b> \(\pi_Q^* = \square,\ p_{QH}^* = \square,\ p_{NH}^* = \square\)</p>`,
      moves: [
        { line: R`<b>Count</b> — experiment 1 is the quarter, 2–4 are nickels: <div class="formula">\[\begin{array}{c|c|c} & \text{quarter} & \text{nickel}\\ \hline \text{experiments} & n_Q = 1 & n_N = 3\\ \text{heads} & n_{QH} = 3 & n_{NH} = 0 + 2 + 3 = 5\\ \text{tails} & n_{QT} = 2 & n_{NT} = 5 + 3 + 2 = 10\end{array}\]</div>` },
        { line: R`<b>The log-likelihood</b> — each count times the log of its probability: <div class="formula">\[\begin{aligned}\ell = \;&1\log\pi_Q + 3\log(1-\pi_Q)\\ &+ 3\log p_{QH} + 2\log(1-p_{QH})\\ &+ 5\log p_{NH} + 10\log(1-p_{NH})\end{aligned}\]</div>`,
          why: R`<p>Experiment 1 (H T T H H) = picked a quarter <b>and</b> got these tosses, so its probability is \(\pi_Q\cdot p_{QH}^3(1-p_{QH})^2\). A nickel experiment is \((1-\pi_Q)\cdot p_{NH}^h(1-p_{NH})^t\).</p>
<p>All the data = the product of the 4 experiments. The log turns the product into a sum and brings the powers down (🧠 know by heart — it's only on the extension sheet, for eligible students: [sheet: Log of product], [sheet: Log of power]). Experiment 1 alone gives</p>
\[\log\pi_Q + 3\log p_{QH} + 2\log(1-p_{QH})\]
<p>Add the 4 experiments and collect equal logs: \(\log(1-\pi_Q)\) comes 3 times (3 nickel experiments), \(\log p_{NH}\) comes \(0 + 2 + 3 = 5\) times, and so on.</p>` },
        { line: R`<b>Each MLE = count / total of its pair</b>: <div class="formula">\[\begin{aligned}\pi_Q^* &= \tfrac{1}{1 + 3} = 0.25\\ p_{QH}^* &= \tfrac{3}{3 + 2} = 0.6\\ p_{NH}^* &= \tfrac{5}{5 + 10} = 0.333\end{aligned}\]</div>Done.`,
          why: R`<p>🧠 Know by heart: the MLE of a probability is count / total (not on the sheet; closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates]). Where it comes from, with the \(p_{QH}\) pair of move 2:</p>
<ul><li>The function: \(3\log p + 2\log(1-p)\).</li>
<li>Derivative by \(p\): \(\frac{3}{p} - \frac{2}{1-p}\) (the \(-\) is the chain rule on \(1-p\)).</li>
<li>Set it to 0: \(3(1-p) = 2p\), so \(3 = 5p\), so \(p = 3/5 = 0.6\).</li></ul>
<p>Each parameter sits in its own pair, so each is solved alone the same way.</p>` },
      ],
      compare: R`Same counts, log-likelihood and MLEs as the official solution (0.25, 0.6, 0.33).`,
    },

    "2025B-q5.3": {
      point: R`<p>A responsibility is a posterior: \(r(i,Q)\) = the quarter's joint (prior × probability of the tosses) divided by both coins' joints added. So \(r(i,Q) + r(i,N) = 1\). Plug in four times.</p>`,
      start: R`<p><b>For each experiment (h heads, t tails):</b></p>
\[\begin{aligned}\text{joint Q} &= \pi_Q\,p_{QH}^{h}(1-p_{QH})^{t} = \square\\ \text{joint N} &= (1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t} = \square\\ r(i,Q) &= \frac{\text{joint Q}}{\text{joint Q} + \text{joint N}} = \square,\quad r(i,N) = \square\end{aligned}\]`,
      moves: [
        { line: R`<b>The formula</b> — the coin's joint, divided by both joints added: <div class="formula">\[r(i,Q) = \frac{\underbrace{\color{#e8912d}\pi_Q\,p_{QH}^{h}(1-p_{QH})^{t}}_{\textstyle\color{#e8912d}\text{this part = joint Q}}}{{\color{#e8912d}\text{joint Q}} + \underbrace{\color{#4c8dff}(1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t}}_{\textstyle\color{#4c8dff}\text{this part = joint N}}}\]</div>`,
          why: R`<p>Joint = picked this coin <b>and</b> got these tosses, so prior × tosses. The bottom is the probability of the sequence: the coin was one of the two.</p>
<p>You don't need to know this by heart: it's [sheet: Responsibilities update], with the coin's \(p^h(1-p)^t\) in place of \(\phi\). Only the counts \(h, t\) matter: the tosses are multiplied, and order doesn't change a product.</p>` },
        { line: R`<b>The joints</b> — \(p_{QH} = 0.5\), so every quarter joint is \(0.5\cdot 0.5^5 = 0.5^6\). The nickel: prior 0.5, heads 0.8, tails 0.2: <div class="formula">\[\begin{array}{c|c|c|l} \text{exp.} & h,\,t & \text{joint Q} & \text{joint N} = 0.5\cdot 0.8^{h}\cdot 0.2^{t}\\ \hline 1 & 3,\,2 & 0.015625 & 0.5\cdot 0.512\cdot 0.04 = 0.01024\\ 2 & 0,\,5 & 0.015625 & 0.5\cdot 1\cdot 0.00032 = 0.00016\\ 3 & 2,\,3 & 0.015625 & 0.5\cdot 0.64\cdot 0.008 = 0.00256\\ 4 & 3,\,2 & 0.015625 & 0.01024\ \text{(same as 1)}\end{array}\]</div>` },
        { line: R`<b>Divide</b> — joint Q / (joint Q + joint N); \(r(i,N)\) is the rest: <div class="formula">\[\begin{array}{c|c|c|c} \text{exp.} & \text{joint Q + joint N} & r(i,Q) & r(i,N)\\ \hline 1 & 0.025865 & 0.604 & 0.396\\ 2 & 0.015785 & 0.990 & 0.010\\ 3 & 0.018185 & 0.859 & 0.141\\ 4 & 0.025865 & 0.604 & 0.396\end{array}\]</div>Done.`,
          why: R`<p>Experiment 1: \(0.015625 / 0.025865 = 0.604\). Experiment 2 is all tails, and the nickel hates tails (0.2), so it's almost surely the quarter: 0.990.</p>` },
      ],
      compare: R`Same numbers as the official solution: \(r(\cdot,Q) = (0.604, 0.990, 0.859, 0.604)\).`,
    },

    "2025B-q5.4": {
      point: R`<p>Same counting as part 2, but each experiment counts as \(r(i,Q)\) of a quarter instead of 1 or 0. Then the same count / total fractions.</p>`,
      start: R`\[\begin{aligned}\mathbb E[n_Q] &= \textstyle\sum_i r(i,Q) = \square\\ \mathbb E[n_N] &= \textstyle\sum_i r(i,N) = \square\\ \mathbb E[n_{QH}] &= \textstyle\sum_i r(i,Q)\,h_i = \square\\ \mathbb E[n_{QT}] &= \textstyle\sum_i r(i,Q)\,t_i = \square\\ \pi_Q &\leftarrow \square, \qquad p_{QH} \leftarrow \square\end{aligned}\]`,
      moves: [
        { line: R`<b>Soft count of experiments</b> — part 2 counted a quarter experiment as 1. Now experiment \(i\) counts as \(r(i,Q)\) of a quarter: <div class="formula">\[\begin{aligned}\mathbb E[n_Q] &= 0.604 + 0.990 + 0.859 + 0.604 = 3.057\\ \mathbb E[n_N] &= 0.396 + 0.010 + 0.141 + 0.396 = 0.943\end{aligned}\]</div>`,
          why: R`<p>Check: \(3.057 + 0.943 = 4\) experiments. This is \(n_j = \sum_i r(i,j)\) in [sheet: Maximization updates].</p>` },
        { line: R`<b>Soft heads and tails</b> — each experiment's heads count \(r(i,Q)\cdot h_i\) toward the quarter: <div class="formula">\[\begin{array}{c|c|c|c|c|c} \text{exp.} & r(i,Q) & h & r\cdot h & t & r\cdot t\\ \hline 1 & 0.604 & 3 & 1.812 & 2 & 1.208\\ 2 & 0.990 & 0 & 0 & 5 & 4.950\\ 3 & 0.859 & 2 & 1.718 & 3 & 2.577\\ 4 & 0.604 & 3 & 1.812 & 2 & 1.208\\ \hline \text{add} & & & 5.342 & & 9.943\end{array}\]</div>So \(\mathbb E[n_{QH}] = 5.342\), \(\mathbb E[n_{QT}] = 9.943\).`,
          why: R`<p>Check: \(5.342 + 9.943 = 15.285 = 5\cdot 3.057\) — every experiment has 5 tosses.</p>` },
        { line: R`<b>Same fractions as part 2</b> — count / total of its pair, with the soft counts: <div class="formula">\[\begin{aligned}\pi_Q &\leftarrow \frac{3.057}{3.057 + 0.943} = \frac{3.057}{4} = 0.764\\ p_{QH} &\leftarrow \frac{5.342}{5.342 + 9.943} = \frac{5.342}{15.285} = 0.349\end{aligned}\]</div>Done.`,
          why: R`<p>Part 2's MLE was count / total. The M-step is exactly that, with the counts replaced by the soft counts. (Unrounded responsibilities give 0.3495; 0.349 or 0.350 are both fine.)</p>`,
          extra: [{ label: "official slip in E[n_N]", html: R`<p>It writes \(\mathbb E[n_N] = \sum_{i=1}^{5} r(i,Q)\). It means \(\sum_{i=1}^{4} r(i,N)\) — the numbers it adds (0.396 + 0.010 + 0.141 + 0.396) are the right ones.</p>` }] },
      ],
      compare: R`Same as the official solution: \(\pi_Q \leftarrow 0.764\), \(p_{QH} \leftarrow 0.349\). Its label "\(\sum_{i=1}^{5} r(i,Q)\)" for \(\mathbb E[n_N]\) should be \(\sum_{i=1}^{4} r(i,N)\).`,
    },

    "2025B-q5.5": {
      point: R`<p>\(p_{QH} = p_{NH}\), so the two coins are identical and the data can't tell them apart: every \(r = 0.5\). So \(\pi_Q\) stays 0.5 and \(p_{QH}\) = all heads / all tosses.</p>`,
      moves: [
        { line: R`<b>Two identical coins</b> — \(p_{QH} = p_{NH} = 0.8\) and both priors are 0.5, so joint Q = joint N in every experiment. So every \(r(i,Q) = 0.5\). Experiment 1 (3 heads, 2 tails): <div class="formula">\[\begin{aligned}\text{joint Q} = \text{joint N} &= 0.5\cdot 0.8^3\cdot 0.2^2 = 0.01024\\ r(1,Q) &= \frac{0.01024}{0.01024 + 0.01024} = 0.5\end{aligned}\]</div>`,
          why: R`<p>Joint Q \(= 0.5\cdot 0.8^h\cdot 0.2^t\) and joint N \(= 0.5\cdot 0.8^h\cdot 0.2^t\) — the same expression. Something divided by twice itself is 0.5. The data can't tell two identical coins apart.</p>` },
        { line: R`<b>\(\pi_Q\)</b> — \(\mathbb E[n_Q] = 0.5 + 0.5 + 0.5 + 0.5 = 2\), so \(\pi_Q \leftarrow 2/4 = 0.5\) (unchanged).` },
        { line: R`<b>\(p_{QH}\)</b> — each experiment's heads and tails count half: <div class="formula">\[\begin{aligned}\mathbb E[n_{QH}] &= 0.5\cdot(3 + 0 + 2 + 3) = 4\\ \mathbb E[n_{QT}] &= 0.5\cdot(2 + 5 + 3 + 2) = 6\\ p_{QH} &\leftarrow \frac{4}{4 + 6} = 0.4\end{aligned}\]</div>Done.`,
          why: R`<p>The 0.5 cancels, so \(p_{QH}\) = all heads / all tosses = 8/20 = 0.4. \(p_{NH}\) gets the same 0.4, so the coins stay identical, so the next iteration does the same: EM is stuck at (0.5, 0.4, 0.4).</p>`,
          extra: [{ label: "official slip: 4/10 = 0.2", html: R`<p>It computes \(\mathbb E[n_{QH}] = 4\), \(\mathbb E[n_{QT}] = 6\) correctly, then writes \(4/10 = 0.2\). But \(4/10 = 0.4\). Its last paragraph's "we also get \(p_{QH} \leftarrow 0.2\)" means the nickel: \(p_{NH} \leftarrow 0.4\).</p>` }] },
      ],
      compare: R`Same steps as the official solution; its last division is a slip: \(4/10 = 0.4\), not 0.2 (and \(p_{NH} \leftarrow 0.4\) too).`,
    },

    // ─────────────────────────────────────────────── 2026-A Q5
    "2026A-q5.1": {
      point: R`<p>The means are the same in every plot, so look at bump heights: each bump is about \(\pi_j\cdot 0.399/\sigma_j\) high. Compute them for both GMMs and read the plots' y-axes.</p>`,
      moves: [
        { line: R`<b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\), one row per bump: <div class="formula">\[\begin{array}{c|c|c} \mu & \text{GMM1} & \text{GMM2}\\ \hline 5 & 0.4\cdot 0.399/3 = 0.053 & 0.3\cdot 0.399/2 = 0.060\\ 15 & 0.3\cdot 0.399/2 = 0.060 & 0.3\cdot 0.399/2 = 0.060\\ 20 & 0.3\cdot 0.399/2 = 0.060 & 0.4\cdot 0.399/1 = 0.160\end{array}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Normal (Gaussian) probability density]. At \(x = \mu\) the exp part is \(e^0 = 1\), so a bell's peak is \(\frac{1}{\sigma\sqrt{2\pi}} = \frac{0.399}{\sigma}\). [sheet: Gaussian mixture model density func] multiplies bell \(j\) by \(\pi_j\). Neighbouring bells add a little tail, so it's "≈".</p>` },
        { line: R`<b>Read the y-axes</b> — A: 0.06, 0.06, 0.16 → <b>GMM2</b>. C: 0.053, 0.063, 0.063 → <b>GMM1</b>. B: 0.105, 0.12, 0.12 → neither. Done.`,
          why: R`<p>C's 0.063 instead of 0.060 is the neighbour bell's tail.</p>
<p><b>The gaps confirm it (the official argument, 2σ rule: 95% of a bell is within \(\mu \pm 2\sigma\)).</b> GMM1's bell 1 reaches right to \(5 + 2\cdot 3 = 11\), bell 2 reaches left to \(15 - 2\cdot 2 = 11\). They meet, so the density doesn't drop to 0 near 10: C has a "bridge" there, B drops to 0. Bells 2 and 3 overlap between \(20 - 4 = 16\) and \(15 + 4 = 19\), so the valley at 17.5 stays high: C ≈ 0.055, B ≈ 0.01.</p>`,
          extra: [{ label: "official slip: σ₁ = σ₂ = 0.2", html: R`<p>For GMM2 it writes \(\sigma_1 = \sigma_2 = 0.2\). The question says \(\sigma_1 = \sigma_2 = 2\).</p>` }] },
      ],
      compare: R`Official: GMM1 → C, GMM2 → A. It argues that only A shows GMM2's two equal first bumps (\(\pi_1 = \pi_2\), \(\sigma_1 = \sigma_2\)), then uses the 2σ rule on the gaps (move 2's why?). Its "\(\sigma_1 = \sigma_2 = 0.2\)" is a slip for 2.`,
    },

    "2026A-q5.2": {
      point: R`<p>We know which coin each experiment used, so just count: every MLE = count / total.</p>`,
      moves: [
        { line: R`<b>Count</b> — heads per experiment: 3, 1, 4, 2. Gold = experiments 1 and 3, silver = 2 and 4: <div class="formula">\[\begin{array}{c|c|c|c} & \text{experiments} & \text{heads} & \text{tosses}\\ \hline \text{gold} & 2 & 3 + 4 = 7 & 5 + 5 = 10\\ \text{silver} & 2 & 1 + 2 = 3 & 5 + 5 = 10\end{array}\]</div>` },
        { line: R`<b>Each MLE = count / total</b>: <div class="formula">\[\begin{aligned}\pi_G &= \tfrac{2}{4} = 0.5\\ p_G &= \tfrac{7}{10} = 0.7\\ p_S &= \tfrac{3}{10} = 0.3\end{aligned}\]</div>Done.`,
          why: R`<p>🧠 Know by heart: the MLE of a probability is count / total (not on the sheet; closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates]). Where it comes from: each experiment's probability = prior × tosses (e.g. experiment 1, gold, 3 heads: \(\pi_G\,p_G^3(1-p_G)^2\)). All the data = the product of the 4 experiments; the log turns the product into a sum and brings the powers down, so each count lands in front of its log (we did the same in 2025-B Q5.2):</p>
\[\begin{aligned}\ell = \;&2\log\pi_G + 2\log(1-\pi_G)\\ &+ 7\log p_G + 3\log(1-p_G)\\ &+ 3\log p_S + 7\log(1-p_S)\end{aligned}\]
<p>Take the \(p_G\) pair. Derivative: \(\frac{7}{p} - \frac{3}{1-p} = 0\), so \(7(1-p) = 3p\), so \(7 = 10p\), so \(p = 0.7\). Every pair works the same way.</p>` },
      ],
      compare: R`Same as the official solution: \(\pi_G = 0.5\), \(p_G = 0.7\), \(p_S = 0.3\).`,
    },

    "2026A-q5.3": {
      point: R`<p>A responsibility is a posterior: \(r(i,G)\) = gold's joint (prior × probability of the tosses) divided by both coins' joints added. The priors are 0.8 and 0.2 here, so they matter.</p>`,
      start: R`<p><b>For each experiment (h heads, t tails):</b></p>
\[\begin{aligned}\text{joint G} &= \pi_G\,p_G^{h}(1-p_G)^{t} = \square\\ \text{joint S} &= (1-\pi_G)\,p_S^{h}(1-p_S)^{t} = \square\\ r(i,G) &= \frac{\text{joint G}}{\text{joint G} + \text{joint S}} = \square,\quad r(i,S) = \square\end{aligned}\]`,
      moves: [
        { line: R`<b>The formula</b> — the coin's joint, divided by both joints added: <div class="formula">\[r(i,G) = \frac{\underbrace{\color{#e8912d}\pi_G\,p_G^{h}(1-p_G)^{t}}_{\textstyle\color{#e8912d}\text{this part = joint G}}}{{\color{#e8912d}\text{joint G}} + \underbrace{\color{#4c8dff}(1-\pi_G)\,p_S^{h}(1-p_S)^{t}}_{\textstyle\color{#4c8dff}\text{this part = joint S}}}\]</div>`,
          why: R`<p>Joint = picked this coin <b>and</b> got these tosses, so prior × tosses. The bottom is the probability of the sequence. It's [sheet: Responsibilities update] with the coin's \(p^h(1-p)^t\) in place of \(\phi\). The priors are 0.8 and 0.2 here, so don't drop them.</p>` },
        { line: R`<b>Joint G</b> — prior 0.8, heads 0.2, tails 0.8: <div class="formula">\[\begin{array}{c|c|l} \text{exp.} & h,\,t & 0.8\cdot 0.2^{h}\cdot 0.8^{t}\\ \hline 1 & 3,\,2 & 0.8\cdot 0.008\cdot 0.64 = 0.004096\\ 2 & 1,\,4 & 0.8\cdot 0.2\cdot 0.4096 = 0.065536\\ 3 & 4,\,1 & 0.8\cdot 0.0016\cdot 0.8 = 0.001024\\ 4 & 2,\,3 & 0.8\cdot 0.04\cdot 0.512 = 0.016384\end{array}\]</div>` },
        { line: R`<b>Joint S</b> — prior 0.2, heads 0.8, tails 0.2: <div class="formula">\[\begin{array}{c|c|l} \text{exp.} & h,\,t & 0.2\cdot 0.8^{h}\cdot 0.2^{t}\\ \hline 1 & 3,\,2 & 0.2\cdot 0.512\cdot 0.04 = 0.004096\\ 2 & 1,\,4 & 0.2\cdot 0.8\cdot 0.0016 = 0.000256\\ 3 & 4,\,1 & 0.2\cdot 0.4096\cdot 0.2 = 0.016384\\ 4 & 2,\,3 & 0.2\cdot 0.64\cdot 0.008 = 0.001024\end{array}\]</div>` },
        { line: R`<b>Divide</b> — joint G / (joint G + joint S); \(r(i,S)\) is the rest: <div class="formula">\[\begin{array}{c|c|c|c} \text{exp.} & \text{joint G + joint S} & r(i,G) & r(i,S)\\ \hline 1 & 0.008192 & 0.5 & 0.5\\ 2 & 0.065792 & 0.9961 & 0.0039\\ 3 & 0.017408 & 0.0588 & 0.9412\\ 4 & 0.017408 & 0.9412 & 0.0588\end{array}\]</div>Done.`,
          why: R`<p>Gold likes tails (0.2 heads), so tail-heavy experiment 2 is gold (0.9961) and 4-heads experiment 3 is silver (0.9412). In experiment 1 the prior (0.8 for gold) and the 3 heads (good for silver) exactly cancel: 0.5.</p>` },
      ],
      compare: R`Same table as the official solution.`,
    },

    "2026A-q5.4": {
      point: R`<p>Same counting as the MLE in part 2, but each experiment counts as its responsibility instead of 1 or 0; then each update = soft count / soft total. \(p_S\) is about silver, so it uses the silver responsibilities.</p>`,
      start: R`\[\begin{aligned}\mathbb E[n_G] &= \textstyle\sum_i r(i,G) = \square\\ \mathbb E[n_S] &= \textstyle\sum_i r(i,S) = \square\\ \mathbb E[n_{SH}] &= \textstyle\sum_i r(i,S)\,h_i = \square\\ \mathbb E[n_{ST}] &= \textstyle\sum_i r(i,S)\,t_i = \square\\ \pi_G &\leftarrow \square, \qquad p_S \leftarrow \square\end{aligned}\]`,
      moves: [
        { line: R`<b>Soft count of experiments</b> — experiment \(i\) counts as \(r(i,G)\) of a gold coin: <div class="formula">\[\begin{aligned}\mathbb E[n_G] &= 0.5 + 0.9961 + 0.0588 + 0.9412 = 2.4961\\ \mathbb E[n_S] &= 0.5 + 0.0039 + 0.9412 + 0.0588 = 1.5039\end{aligned}\]</div>`,
          why: R`<p>Check: \(2.4961 + 1.5039 = 4\) experiments. This is \(n_j = \sum_i r(i,j)\) in [sheet: Maximization updates].</p>` },
        { line: R`<b>Silver heads and tails</b> — the part asks \(p_S\), so use the <b>silver</b> responsibilities: <div class="formula">\[\begin{array}{c|c|c|c|c|c} \text{exp.} & r(i,S) & h & r\cdot h & t & r\cdot t\\ \hline 1 & 0.5 & 3 & 1.5 & 2 & 1\\ 2 & 0.0039 & 1 & 0.0039 & 4 & 0.0156\\ 3 & 0.9412 & 4 & 3.7648 & 1 & 0.9412\\ 4 & 0.0588 & 2 & 0.1176 & 3 & 0.1764\\ \hline \text{add} & & & 5.3863 & & 2.1332\end{array}\]</div>So \(\mathbb E[n_{SH}] = 5.3863\), \(\mathbb E[n_{ST}] = 2.1332\).`,
          why: R`<p>Check: \(5.3863 + 2.1332 = 7.5195 = 5\cdot 1.5039\) — every experiment has 5 tosses. With \(r(i,G)\) you would be computing \(p_G\) instead.</p>` },
        { line: R`<b>The fractions</b> — count / total, with the soft counts: <div class="formula">\[\begin{aligned}\pi_G &\leftarrow \frac{2.4961}{2.4961 + 1.5039} = \frac{2.4961}{4} = 0.624\\ p_S &\leftarrow \frac{5.3863}{5.3863 + 2.1332} = \frac{5.3863}{7.5195} = 0.716\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution: \(\pi_G \leftarrow 0.624\), \(p_S \leftarrow 0.716\). (It writes "\(\pi_G \leftarrow \pi_G \leftarrow\)" and "update \(\pi_S\)" — typos for \(\pi_G\).)`,
    },

    "2026A-q5.5": {
      point: R`<p>If gold and silver start identical, EM can't tell them apart: every \(r = 0.5\), so \(\pi_G\) stays 0.5 and both \(p\)'s become all heads / all tosses \(= 10/20 = 0.5\). So start at 0.5, 0.5, 0.5.</p>`,
      moves: [
        { line: R`<b>Make the coins identical</b> — with \(p_G = p_S\) and \(\pi_G = 0.5\), joint G = joint S in every experiment, so every \(r(i,G) = r(i,S) = 0.5\).`,
          why: R`<p>Joint G \(= 0.5\cdot p^h(1-p)^t\) = joint S. Each is half of the sum, so 0.5. The data can't tell two identical coins apart.</p>` },
        { line: R`<b>What the M-step gives</b> — \(\mathbb E[n_G] = 4\cdot 0.5 = 2\), so \(\pi_G \leftarrow 2/4 = 0.5\). Every head counts half, so both \(p\)'s become all heads / all tosses: <div class="formula">\[p_G, p_S \leftarrow \frac{0.5\cdot(3 + 1 + 4 + 2)}{0.5\cdot 20} = \frac{5}{10} = 0.5\]</div>` },
        { line: R`<b>Start there</b> — \(\pi_G = p_G = p_S = 0.5\). The M-step gives back 0.5, 0.5, 0.5, so one iteration changes nothing. Done.`,
          why: R`<p>A start that the iteration returns unchanged is a fixed point. The half-heads data (10 of 20) is what makes 0.5 work for the \(p\)'s.</p>`,
          extra: [{ label: "the official solution's other options, and a slip", html: R`<p>It also lists \(\pi_G = 1, p_G = 0.5\), \(p_S\) = anything (or the mirror \(\pi_G = 0\), \(p_S = 0.5\)): silver owns no experiment, so its update is \(0/0\) and stays as it was. It says to avoid these.</p><p>Slip: "\(\pi_G \leftarrow 2/4 = 2\)" should be \(2/4 = 0.5\).</p>` }] },
      ],
      compare: R`Same answer and argument as the official solution: \(\pi_G = p_G = p_S = 0.5\). Its "\(2/4 = 2\)" is a slip for 0.5.`,
    },

    // ─────────────────────────────────────────────── 2026-B Q5 (your Moed B question)
    "2026B-q5.1": {
      point: R`<p>\(f(x) = \frac12\phi(x;-1,1) + \frac12\phi(x;1,1)\), and every \(\phi\) is read from the table at the distance \(|x - \mu|\). Nothing to compute by hand.</p>`,
      start: R`\[f(x) = \pi_1\,\phi(x;\mu_1,1) + \pi_2\,\phi(x;\mu_2,1)\]
\[\begin{aligned}f(-2) &= \tfrac12\,\phi(\square) + \tfrac12\,\phi(\square) = \square\\ f(0) &= \square\\ f(2) &= \square\end{aligned}\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question, with \(\pi = (0.5, 0.5)\), \(\mu = (-1, 1)\): <div class="formula">\[f(x) = \tfrac12\,\phi(x;-1,1) + \tfrac12\,\phi(x;1,1)\]</div>`,
          why: R`<p>[sheet: Gaussian mixture model density func]: each bell times its weight, added up.</p>` },
        { line: R`<b>Read φ from the table</b> — the table is indexed by \(x - \mu\); drop the sign: <div class="formula">\[\begin{array}{c|c|c|c|c} x & x - (-1) & \phi & x - 1 & \phi\\ \hline -2 & -1 & 0.242 & -3 & 0.004\\ 0 & 1 & 0.242 & -1 & 0.242\\ 2 & 3 & 0.004 & 1 & 0.242\end{array}\]</div>`,
          why: R`<p>In \(\phi\), \(x\) and \(\mu\) only appear as \((x-\mu)^2\), so −1 and 1 give the same value. Check one: \(\phi = 0.399\cdot e^{-1^2/2} = 0.399\cdot 0.607 = 0.242\) — the table's number.</p>`,
          extra: [{ label: "your Moed B trap", html: R`<p>You wrote the full \(\frac{1}{\sqrt{2\pi\sigma^2}}\exp(\dots)\) formula, evaluated it by hand, got wrong numbers and crossed it out — every \(\phi\) you need is in the table.</p>` }] },
        { line: R`<b>Weights × φ, add</b>: <div class="formula">\[\begin{aligned}f(-2) &= \tfrac12\cdot 0.242 + \tfrac12\cdot 0.004 = 0.121 + 0.002 = 0.123\\ f(0) &= \tfrac12\cdot 0.242 + \tfrac12\cdot 0.242 = 0.121 + 0.121 = 0.242\\ f(2) &= \tfrac12\cdot 0.004 + \tfrac12\cdot 0.242 = 0.002 + 0.121 = 0.123\end{aligned}\]</div>Done.`,
          why: R`<p>Keep the terms (0.121, 0.002, …) written down: part 2 divides exactly these.</p>` },
      ],
      compare: R`Same as the official solution: 0.123, 0.242, 0.123.`,
    },

    "2026B-q5.2": {
      point: R`<p>\(r(i,j)\) = this component's term \(\pi_j\,\phi(x_i;\mu_j,1)\), divided by \(f(x_i)\) = both terms added (both already computed in part 1). Six divisions.</p>`,
      start: R`\[r(i,j) = \frac{\pi_j\,\phi(x_i;\mu_j,1)}{f(x_i)} = \frac{\square}{\square} = \square\qquad\text{(six times)}\]`,
      moves: [
        { line: R`<b>The formula</b> — both pieces are already in part 1: <div class="formula">\[r(i,j) = \frac{\underbrace{\color{#e8912d}\pi_j\,\phi(x_i;\mu_j,\sigma_j)}_{\textstyle\color{#e8912d}\text{this part = a term from part 1}}}{\underbrace{\color{#4c8dff}\textstyle\sum_{j'}\pi_{j'}\,\phi(x_i;\mu_{j'},\sigma_{j'})}_{\textstyle\color{#4c8dff}\text{this part = } f(x_i)\text{ from part 1}}}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Responsibilities update]. \(j'\) is just a second letter for "every component", so the bottom adds both terms = part 1's \(f(x_i)\). It's Bayes: prior \(\pi_j\) × likelihood \(\phi\), divided by the total.</p>` },
        { line: R`<b>Divide</b> — each row's term by its \(f(x_i)\): <div class="formula">\[\begin{array}{c|c|c|c|c} x_i & j & \pi_j\phi & f(x_i) & r(i,j)\\ \hline -2 & 1 & 0.121 & 0.123 & 0.984\\ -2 & 2 & 0.002 & 0.123 & 0.016\\ 0 & 1 & 0.121 & 0.242 & 0.5\\ 0 & 2 & 0.121 & 0.242 & 0.5\\ 2 & 1 & 0.002 & 0.123 & 0.016\\ 2 & 2 & 0.121 & 0.123 & 0.984\end{array}\]</div>Done.`,
          why: R`<p>First row: \(0.121/0.123 = 0.984\). \(-2\) is 1 away from \(\mu_1 = -1\) but 3 away from \(\mu_2 = 1\), so component 1 almost surely produced it. \(x = 0\) is exactly between the means, so 50/50. Each sample's two responsibilities add to 1.</p>` },
      ],
      compare: R`Same table as the official solution.`,
    },

    "2026B-q5.3": {
      point: R`<p>\(n_j\) = add up component \(j\)'s responsibilities, \(\pi_j = n_j/3\), and \(\mu_j\) = the average of the \(x\)'s weighted by the responsibilities (so divide by \(n_j\), not by 3).</p>`,
      start: R`\[\begin{aligned}n_1 &= \square,\qquad n_2 = \square\\ \pi_1 &= \frac{n_1}{n} = \square,\qquad \pi_2 = \square\\ \mu_1 &= \frac{1}{n_1}\big(\square\cdot(-2) + \square\cdot 0 + \square\cdot 2\big) = \square\\ \mu_2 &= \square\end{aligned}\]`,
      moves: [
        { line: R`<b>\(n_j\) and \(\pi_j\)</b> — add each component's responsibilities, then divide by \(n = 3\): <div class="formula">\[\begin{aligned}n_1 &= 0.984 + 0.5 + 0.016 = 1.5\\ n_2 &= 0.016 + 0.5 + 0.984 = 1.5\\ \pi_1 &= \pi_2 = 1.5/3 = 0.5\end{aligned}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Maximization updates]. \(n_j\) = how many samples component \(j\) owns, counting fractions. Check: \(1.5 + 1.5 = 3 = n\).</p>` },
        { line: R`<b>\(\mu_1\) = a weighted average</b> — each \(x\) times its \(r(i,1)\), divided by the weights' sum: <div class="formula">\[\begin{aligned}\mu_1 &= \frac{\color{#e8912d}0.984\cdot(-2) + 0.5\cdot 0 + 0.016\cdot 2}{\color{#4c8dff}1.5}\\ &= \frac{-1.968 + 0 + 0.032}{1.5} = \frac{-1.936}{1.5} = -1.291\end{aligned}\]</div>`,
          why: R`<p>An ordinary average of 3 numbers is \(\frac{1\cdot x_1 + 1\cdot x_2 + 1\cdot x_3}{1 + 1 + 1}\): every sample has weight 1. Here each sample counts \(r(i,1)\) instead of 1, so the bottom is the sum of the weights, \(n_1 = 1.5\) — not \(n = 3\).</p>
\[\mu_j = \frac{1}{n_j}\sum_i \underbrace{\color{#e8912d}r(i,j)\,x_i}_{\textstyle\color{#e8912d}\text{this part = orange top}}\]
<p>numpy: <code>(r[:, 0] * x).sum() / r[:, 0].sum()</code>.</p>` },
        { line: R`<b>\(\mu_2\)</b> — same with column 2: <div class="formula">\[\mu_2 = \frac{0.016\cdot(-2) + 0.5\cdot 0 + 0.984\cdot 2}{1.5} = \frac{1.936}{1.5} = 1.291\]</div>So \(\pi \leftarrow (0.5, 0.5)\), \(\mu \leftarrow (-1.291, 1.291)\). Done.`,
          why: R`<p>Both means moved outward from ±1: component 1 fully owns −2 and only half-owns 0, so its average is pulled toward −2.</p>` },
      ],
      compare: R`Same as the official solution: \(\pi \leftarrow (0.5, 0.5)\), \(\mu \leftarrow (-1.291, 1.291)\). It writes \(\frac{2}{3}(\dots)\), which is \(\frac{1}{1.5}(\dots)\), and commas where it means "+".`,
    },

    "2026B-q5.4": {
      point: R`<p>MAP = pick the class with the bigger prior × class density. A's density is just a GMM; every \(\phi\) is read from the table at the distance \(|x - \mu|\) (like part 1).</p>`,
      start: R`\[\begin{aligned}f(x, A) &= \pi_A\,f(x\mid A)\\ &= \tfrac12\big[\tfrac12\,\phi(x;-2,1) + \tfrac12\,\phi(x;2,1)\big] = \square\\ f(x, B) &= \pi_B\,f(x\mid B) = \tfrac12\,\phi(x;0,1) = \square\end{aligned}\]
<p>\(\square \gt \square\), so predict \(\square\). (For \(x = 0\) and for \(x = 2\).)</p>`,
      moves: [
        { line: R`<b>\(x = 0\)</b> — distances to the means −2, 2, 0 are 2, 2, 0, so the table gives \(\phi\) = 0.054, 0.054, 0.399: <div class="formula">\[\begin{aligned}f(0, A) &= \tfrac12\big[\tfrac12\cdot 0.054 + \tfrac12\cdot 0.054\big] = 0.027\\ f(0, B) &= \tfrac12\cdot 0.399 = 0.200\end{aligned}\]</div>\(0.027 \lt 0.200\), so predict <b>B</b>.`,
          why: R`<p>MAP compares \(f(x, y) = \pi_y\cdot f(x\mid Y = y)\): the posterior is \(P(X\mid Y)\,P(Y)/P(X)\) ([sheet: Class posterior probability], [sheet: Class prior]), and \(P(X)\) is the same for both classes, so compare only the tops.</p>
<p>Two layers of weights: the class prior \(\pi_A = \frac12\) outside the bracket, and the \(\frac12\)'s of A's GMM inside. Both multiply.</p>` },
        { line: R`<b>\(x = 2\)</b> — distances to −2, 2, 0 are 4, 0, 2, so \(\phi\) = 0.0001, 0.399, 0.054: <div class="formula">\[\begin{aligned}f(2, A) &= \tfrac12\big[\tfrac12\cdot 0.0001 + \tfrac12\cdot 0.399\big] = 0.100\\ f(2, B) &= \tfrac12\cdot 0.054 = 0.027\end{aligned}\]</div>\(0.100 \gt 0.027\), so predict <b>A</b>. Done.`,
          why: R`<p>\(x = 2\) sits on the centre of one of A's two bumps; \(x = 0\) sits between A's bumps but on B's centre.</p>`,
          extra: [{ label: "official slip: x = 0 in the last line", html: R`<p>Its last line says "Because \(f(x=0, Y=A) \gt f(x=0, Y=B)\)". It means \(x = 2\): \(0.100 \gt 0.027\).</p>` }] },
      ],
      compare: R`Same as the official solution: \(x = 0\) → B (0.027 vs 0.200), \(x = 2\) → A (0.100 vs 0.027). Its last line writes \(x = 0\) where it means \(x = 2\).`,
    },

    "2026B-q5.5": {
      point: R`<p>Naive Bayes multiplies an \(x_1\)-GMM by an \(x_2\)-GMM, so each class becomes a grid of blobs: every \(x_1\) cluster with every \(x_2\) cluster. If a class's real blobs are that grid, it works; if not, it doesn't.</p>`,
      moves: [
        { line: R`<b>(a) makes sense</b> — each class's four blobs are a full grid. Four GMMs, 2 components each: <div class="formula">\[\begin{array}{c|c} \mathrm{GMM}_{A,1}(x_1) & \text{means} \approx -3,\ 1\\ \mathrm{GMM}_{A,2}(x_2) & \text{means} \approx -2,\ 2\\ \mathrm{GMM}_{B,1}(x_1) & \text{means} \approx 1.2,\ 3.2\\ \mathrm{GMM}_{B,2}(x_2) & \text{means} \approx -3,\ 1\end{array}\]</div>`,
          why: R`<p>The model is \(f(x\mid Y = y) = \mathrm{GMM}_{y,1}(x_1)\times\mathrm{GMM}_{y,2}(x_2)\) (as in HW6's <code>NaiveBayesGMM</code>). A product is big only where both factors are big, so it's big at every combination of an \(x_1\) cluster with an \(x_2\) cluster.</p>
<p>Class A projects to \(x_1\) clusters at −3 and 1 and \(x_2\) clusters at −2 and 2. Its grid is (−3, 2), (−3, −2), (1, 2), (1, −2) — exactly A's four blobs. Class B's blobs, (1.2, 1), (3.2, 1), (1.2, −3), (3.2, −3), are also a full grid.</p>` },
        { line: R`<b>(b) doesn't</b> — class A is only at (2, 2) and (−2, −2), but its grid adds (2, −2), where A has no points. Its features are dependent: <div class="formula">\[\begin{aligned}&f\big((2,-2)\mid A\big) \approx 0,\ \text{but}\\ &f(x_1{=}2\mid A)\cdot f(x_2{=}{-2}\mid A) \text{ is not small}\end{aligned}\]</div>`,
          why: R`<p>Class B (at (−2, 2) and (2, −2)) projects to the same clusters, −2 and 2 on both axes, so both classes get the same grid. Naive Bayes can't tell them apart.</p>` },
        { line: R`<b>(c) doesn't</b> — each class is a tilted band: \(x_2\) changes with \(x_1\), so the features are dependent. And the classes overlap a lot in \(x_2\). A full Bayes model would do much better. Done.` },
      ],
      compare: R`Same verdicts as the official solution: (a) yes, with those four 2-component GMMs; (b) no — its example is \(f\big((2,-2)\mid A\big)\); (c) no — dependent features and heavy overlap in \(x_2\).`,
    },
  });
})();
