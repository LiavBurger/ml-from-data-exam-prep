// Walkthroughs for the GMM / EM questions (2025-B Q5, 2026-A Q5, 2026-B Q5) — CASUAL style (spec/WALKS.md):
// point → start (template with □) → answer (the same template, filled in) → moves that build the answer line by line.
// Every number checked with numpy.
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ─────────────────────────────────────────────── 2025-B Q5
    "2025B-q5.1": {
      point: R`<p>The means are the same in every plot, so compare bump heights: a bump is about \(\pi_j\cdot 0.399/\sigma_j\) high (small \(\sigma\) = tall and thin). GMM2's \(\sigma = 1\) at 25 gives one tall spike (A); GMM1 has a low bump at 10 and two equal bumps at 20 and 25 (C).</p>`,
      start: R`<p><b>Answer:</b> GMM1 → plot □, GMM2 → plot □.</p>
<p><b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\) at \(\mu = 10, 20, 25\):</p>
\[\text{GMM1: } \square,\ \square,\ \square \qquad \text{GMM2: } \square,\ \square,\ \square\]
<p><b>GMM2 → □ because</b> □</p>
<p><b>GMM1 → □ because</b> □</p>
<p><b>The third plot fits neither because</b> □</p>`,
      answer: R`<p><b>Answer:</b> GMM1 → plot C, GMM2 → plot A.</p>
<p><b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\) at \(\mu = 10, 20, 25\):</p>
\[\text{GMM1: } 0.040,\ 0.060,\ 0.060 \qquad \text{GMM2: } 0.040,\ 0.060,\ 0.160\]
<p><b>GMM2 → A because</b> A's bumps are ≈ 0.04, 0.06, 0.16: one tall, narrow spike at 25 (\(\sigma_3 = 1\)), 4 times the bump at 10.</p>
<p><b>GMM1 → C because</b> C's bumps are ≈ 0.040, 0.064, 0.063, and the valley between 20 and 25 stays high: 22.5 is only 1.25σ from both means, so \(f(22.5) \approx 0.055\).</p>
<p><b>The third plot fits neither because</b> B's bump at 10 is its tallest (≈ 0.088), but GMM1's is its lowest; and B drops to ≈ 0 between 20 and 25.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Which plot is which GMM" → all plots have the same means, so they only differ in how <b>tall</b> each bump is. So compute each bump's height and compare with the y-axes.` },
        { line: R`<b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\), one row per bump: <div class="formula">\[\begin{array}{c|c|c} \mu & \text{GMM1} & \text{GMM2}\\ \hline 10 & 0.4\cdot 0.399/4 = 0.040 & 0.3\cdot 0.399/3 = 0.040\\ 20 & 0.3\cdot 0.399/2 = 0.060 & 0.3\cdot 0.399/2 = 0.060\\ 25 & 0.3\cdot 0.399/2 = 0.060 & 0.4\cdot 0.399/1 = 0.160\end{array}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Normal (Gaussian) probability density]. At \(x = \mu\) the exp part is \(e^0 = 1\), so a bell's peak is \(\frac{1}{\sigma\sqrt{2\pi}} = \frac{0.399}{\sigma}\). [sheet: Gaussian mixture model density func] multiplies bell \(j\) by \(\pi_j\). Neighbouring bells add a little tail, so it's "≈".</p>` },
        { line: R`<b>GMM2 → plot A</b> — A's bumps read ≈ 0.04, 0.06, 0.16: the only plot with one tall, narrow spike at 25 (\(\sigma_3 = 1\)), 4 times the bump at 10 (\(0.160/0.040 = 4\)).`,
          why: R`<p>GMM2's column is 0.040, 0.060, 0.160 — exactly A's y-axis. In B and C the bumps at 20 and 25 have the same height and width, like GMM1 (\(\sigma_2 = \sigma_3 = 2\)).</p>` },
        { line: R`<b>GMM1 → plot C</b> — C reads ≈ 0.040, 0.064, 0.063, like GMM1. Check the valley: 22.5 is only 1.25σ from both means (σ = 2), so the bells overlap and it stays high, \(f(22.5) \approx 0.055\) — C's valley.`,
          why: R`<p>\(f(22.5) \approx 2\cdot 0.3\cdot\phi(22.5; 20, 2) = 2\cdot 0.3\cdot 0.091 = 0.055\) (the bell at 10 adds almost nothing there). \((22.5 - 20)/2 = 1.25\) standard deviations.</p>`,
          extra: [{ label: "official slip: \"midpoint at x = 27.5\"", html: R`<p>The midpoint of 20 and 25 is \((20 + 25)/2 = 22.5\), not 27.5. Its "1.25 standard deviations from each mean" is right for 22.5.</p>` }] },
        { line: R`<b>B fits neither</b> — B's bump at 10 (≈ 0.088) is its tallest, but GMM1's is its lowest; and B drops to ≈ 0 between 20 and 25, where GMM1 stays ≈ 0.055. Done.` },
      ],
      compare: R`Official: GMM1 → C, GMM2 → A. It argues with widths (only A has \(\sigma_2 \gt \sigma_3\), move 3), the high valley between 20 and 25 (move 4) and the areas (0.4 vs 0.3, move 5). Its "midpoint at x = 27.5" is a slip for 22.5.`,
      slip: R`"Midpoint at \(x = 27.5\)" is a slip for 22.5, halfway between the peaks at 20 and 25. That's the spot that's 1.25 σ from both means: \((22.5 - 20)/2 = 1.25\).`,
    },

    "2025B-q5.2": {
      point: R`<p>We know which coin each experiment used, so just count. The log-likelihood = each count × log of its probability, and each MLE = count / total of its pair.</p>`,
      start: R`<p><b>The counts:</b> \(n_Q = \square,\ n_N = \square\)<br>\(n_{QH} = \square,\ n_{QT} = \square,\ n_{NH} = \square,\ n_{NT} = \square\)</p>
<p><b>The log-likelihood:</b></p>\[\begin{aligned}\ell = \;&n_Q\log\pi_Q + \square\\ = \;&\square\end{aligned}\]
<p><b>The MLEs:</b> \(\pi_Q^* = \square,\ p_{QH}^* = \square,\ p_{NH}^* = \square\)</p>`,
      answer: R`<p><b>The counts:</b> \(n_Q = 1,\ n_N = 3\)<br>\(n_{QH} = 3,\ n_{QT} = 2,\ n_{NH} = 5,\ n_{NT} = 10\)</p>
<p><b>The log-likelihood:</b></p>\[\begin{aligned}\ell = \;&n_Q\log\pi_Q + n_N\log(1-\pi_Q)\\ &+ n_{QH}\log p_{QH} + n_{QT}\log(1-p_{QH})\\ &+ n_{NH}\log p_{NH} + n_{NT}\log(1-p_{NH})\\ = \;&1\log\pi_Q + 3\log(1-\pi_Q)\\ &+ 3\log p_{QH} + 2\log(1-p_{QH})\\ &+ 5\log p_{NH} + 10\log(1-p_{NH})\end{aligned}\]
<p><b>The MLEs:</b> \(\pi_Q^* = \frac{1}{1 + 3} = 0.25,\ p_{QH}^* = \frac{3}{3 + 2} = 0.6,\ p_{NH}^* = \frac{5}{5 + 10} = 0.333\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> We're told which coin each experiment used, so nothing is hidden. The log-likelihood is then just counts × logs, and each MLE is a count / total. So: count first.` },
        { line: R`<b>Count</b> — experiment 1 is the quarter, 2–4 are nickels: <div class="formula">\[\begin{array}{c|c|c} & \text{quarter} & \text{nickel}\\ \hline \text{experiments} & n_Q = 1 & n_N = 3\\ \text{heads} & n_{QH} = 3 & n_{NH} = 0 + 2 + 3 = 5\\ \text{tails} & n_{QT} = 2 & n_{NT} = 5 + 3 + 2 = 10\end{array}\]</div>` },
        { line: R`<b>The log-likelihood</b> — one experiment = picked the coin <b>and</b> got these tosses = prior × \(p^h(1-p)^t\). Multiply the 4, take the log: each count lands in front of its log. Then plug in move 2's counts: <div class="formula">\[\begin{aligned}\ell = \;&n_Q\log\pi_Q + n_N\log(1-\pi_Q)\\ &+ n_{QH}\log p_{QH} + n_{QT}\log(1-p_{QH})\\ &+ n_{NH}\log p_{NH} + n_{NT}\log(1-p_{NH})\\ = \;&1\log\pi_Q + 3\log(1-\pi_Q)\\ &+ 3\log p_{QH} + 2\log(1-p_{QH})\\ &+ 5\log p_{NH} + 10\log(1-p_{NH})\end{aligned}\]</div>`,
          remember: R`\[\ell = \log\prod_i P(\text{experiment } i) = \sum_i\log P(\text{experiment } i)\]\[\log(ab) = \log a + \log b\]\[\log a^k = k\log a\]<p>Independent experiments (and tosses) → multiply; the log makes it a sum and brings the powers down. Not on the sheet; log rules on the extension sheet, if you get it: [sheet: Log of product], [sheet: Log of power].</p>`,
          why: R`<p>Experiment 1 (H T T H H) = picked a quarter <b>and</b> got these tosses, so its probability is \(\pi_Q\cdot p_{QH}^3(1-p_{QH})^2\). A nickel experiment is \((1-\pi_Q)\cdot p_{NH}^h(1-p_{NH})^t\).</p>
<p>All the data = the product of the 4 experiments. The log turns the product into a sum and brings the powers down. Experiment 1 alone gives</p>
\[\log\pi_Q + 3\log p_{QH} + 2\log(1-p_{QH})\]
<p>Add the 4 experiments and collect equal logs: \(\log(1-\pi_Q)\) comes 3 times (3 nickel experiments), \(\log p_{NH}\) comes \(0 + 2 + 3 = 5\) times, and so on.</p>` },
        { line: R`<b>Each MLE = count / total of its pair</b>: <div class="formula">\[\begin{aligned}\pi_Q^* &= \tfrac{1}{1 + 3} = 0.25\\ p_{QH}^* &= \tfrac{3}{3 + 2} = 0.6\\ p_{NH}^* &= \tfrac{5}{5 + 10} = 0.333\end{aligned}\]</div>Done.`,
          remember: R`\[\hat p = \frac{\text{count}}{\text{total}}\]<p>The MLE of a probability (you get it from: \(\ell\) → derivative → set to 0). Not on the sheet; closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates].</p>`,
          why: R`<p>Where count / total comes from, with the \(p_{QH}\) pair of move 3:</p>
<ul><li>The function: \(3\log p + 2\log(1-p)\).</li>
<li>Derivative by \(p\): \(\frac{3}{p} - \frac{2}{1-p}\) (the \(-\) is the chain rule on \(1-p\)).</li>
<li>Set it to 0: \(3(1-p) = 2p\), so \(3 = 5p\), so \(p = 3/5 = 0.6\).</li></ul>
<p>Each parameter sits in its own pair, so each is solved alone the same way.</p>` },
      ],
      compare: R`Same counts (move 2), log-likelihood (move 3) and MLEs (move 4) as the official solution (0.25, 0.6, 0.33).`,
    },

    "2025B-q5.3": {
      point: R`<p>A responsibility is a posterior: \(r(i,Q)\) = the quarter's joint (prior × probability of the tosses) divided by both coins' joints added. So \(r(i,Q) + r(i,N) = 1\). Plug in four times.</p>`,
      start: R`<p><b>For each experiment (h heads, t tails):</b></p>
\[\begin{aligned}\text{joint Q} &= \pi_Q\,p_{QH}^{h}(1-p_{QH})^{t}\\ \text{joint N} &= (1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t}\\ r(i,Q) &= \frac{\text{joint Q}}{\text{joint Q} + \text{joint N}},\quad r(i,N) = 1 - r(i,Q)\end{aligned}\]
<p><b>The numbers:</b></p>
\[\begin{array}{c|c|c|c|c|c} \text{exp.} & h,\,t & \text{joint Q} & \text{joint N} & r(i,Q) & r(i,N)\\ \hline 1 & \square & \square & \square & \square & \square\\ 2 & \square & \square & \square & \square & \square\\ 3 & \square & \square & \square & \square & \square\\ 4 & \square & \square & \square & \square & \square\end{array}\]`,
      answer: R`<p><b>For each experiment (h heads, t tails):</b></p>
\[\begin{aligned}\text{joint Q} &= \pi_Q\,p_{QH}^{h}(1-p_{QH})^{t} = 0.5\cdot 0.5^{h}\cdot 0.5^{t} = 0.5^6\\ \text{joint N} &= (1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t} = 0.5\cdot 0.8^{h}\cdot 0.2^{t}\\ r(i,Q) &= \frac{\text{joint Q}}{\text{joint Q} + \text{joint N}},\quad r(i,N) = 1 - r(i,Q)\end{aligned}\]
<p><b>The numbers:</b></p>
\[\begin{array}{c|c|c|c|c|c} \text{exp.} & h,\,t & \text{joint Q} & \text{joint N} & r(i,Q) & r(i,N)\\ \hline 1 & 3,\,2 & 0.015625 & 0.01024 & 0.604 & 0.396\\ 2 & 0,\,5 & 0.015625 & 0.00016 & 0.990 & 0.010\\ 3 & 2,\,3 & 0.015625 & 0.00256 & 0.859 & 0.141\\ 4 & 3,\,2 & 0.015625 & 0.01024 & 0.604 & 0.396\end{array}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(r(i,Q)\) = P(quarter | these tosses) — a posterior. Posterior = Bayes: the quarter's joint, divided by both joints added: <div class="formula">\[r(i,Q) = \frac{\underbrace{\color{#e8912d}\pi_Q\,p_{QH}^{h}(1-p_{QH})^{t}}_{\textstyle\color{#e8912d}\text{this part = joint Q}}}{{\color{#e8912d}\text{joint Q}} + \underbrace{\color{#4c8dff}(1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t}}_{\textstyle\color{#4c8dff}\text{this part = joint N}}}\]</div>`,
          remember: R`\[r(i,j) = \frac{\pi_j\,p_j^{h}(1-p_j)^{t}}{\sum_{j'}\pi_{j'}\,p_{j'}^{h}(1-p_{j'})^{t}}\]<p>Responsibility = posterior; a coin's likelihood is \(p^h(1-p)^t\) (independent tosses → multiply). The sheet has it only with Gaussians: [sheet: Responsibilities update] — put \(p_j^h(1-p_j)^t\) where \(\phi(x^{(i)};\mu_j,\Sigma_j)\) is. ([sheet: Binomial probability mass function with] adds a \(\binom{5}{h}\) — the same for both coins, so it cancels.)</p>`,
          why: R`<p>Joint = picked this coin <b>and</b> got these tosses, so prior × tosses. The bottom is the probability of the sequence: the coin was one of the two.</p>
<p>It's [sheet: Responsibilities update], with the coin's \(p^h(1-p)^t\) in place of \(\phi\). Only the counts \(h, t\) matter: the tosses are multiplied, and order doesn't change a product.</p>` },
        { line: R`<b>The joints</b> — \(p_{QH} = 0.5\), so every quarter joint is \(0.5\cdot 0.5^5 = 0.5^6\). The nickel: prior 0.5, heads 0.8, tails 0.2: <div class="formula">\[\begin{array}{c|c|c|l} \text{exp.} & h,\,t & \text{joint Q} & \text{joint N} = 0.5\cdot 0.8^{h}\cdot 0.2^{t}\\ \hline 1 & 3,\,2 & 0.015625 & 0.5\cdot 0.512\cdot 0.04 = 0.01024\\ 2 & 0,\,5 & 0.015625 & 0.5\cdot 1\cdot 0.00032 = 0.00016\\ 3 & 2,\,3 & 0.015625 & 0.5\cdot 0.64\cdot 0.008 = 0.00256\\ 4 & 3,\,2 & 0.015625 & 0.01024\ \text{(same as 1)}\end{array}\]</div>` },
        { line: R`<b>Divide</b> — joint Q / (joint Q + joint N); \(r(i,N)\) is the rest: <div class="formula">\[\begin{array}{c|c|c|c} \text{exp.} & \text{joint Q + joint N} & r(i,Q) & r(i,N)\\ \hline 1 & 0.025865 & 0.604 & 0.396\\ 2 & 0.015785 & 0.990 & 0.010\\ 3 & 0.018185 & 0.859 & 0.141\\ 4 & 0.025865 & 0.604 & 0.396\end{array}\]</div>Done.`,
          why: R`<p>Experiment 1: \(0.015625 / 0.025865 = 0.604\). Experiment 2 is all tails, and the nickel hates tails (0.2), so it's almost surely the quarter: 0.990.</p>` },
      ],
      compare: R`Same numbers as the official solution: \(r(\cdot,Q) = (0.604, 0.990, 0.859, 0.604)\). It writes the joints (move 2) and the divisions (move 3) out experiment by experiment.`,
      slip: R`\(\pi_N\) is never defined in the question: it's just \(1 - \pi_Q = 0.5\). And "same head and tail counts as toss 1" means experiment 1 (3 heads, 2 tails).`,
    },

    "2025B-q5.4": {
      point: R`<p>Same counting as part 2, but each experiment counts as \(r(i,Q)\) of a quarter instead of 1 or 0. Then the same count / total fractions.</p>`,
      start: R`\[\begin{aligned}\mathbb E[n_Q] &= \textstyle\sum_i r(i,Q) = \square\\ \mathbb E[n_N] &= \textstyle\sum_i r(i,N) = \square\\ \mathbb E[n_{QH}] &= \textstyle\sum_i r(i,Q)\,h_i = \square\\ \mathbb E[n_{QT}] &= \textstyle\sum_i r(i,Q)\,t_i = \square\\ \pi_Q &\leftarrow \square\\ p_{QH} &\leftarrow \square\end{aligned}\]`,
      answer: R`\[\begin{aligned}\mathbb E[n_Q] &= \textstyle\sum_i r(i,Q) = 0.604 + 0.990 + 0.859 + 0.604 = 3.057\\ \mathbb E[n_N] &= \textstyle\sum_i r(i,N) = 0.396 + 0.010 + 0.141 + 0.396 = 0.943\\ \mathbb E[n_{QH}] &= \textstyle\sum_i r(i,Q)\,h_i\\ &= 0.604\cdot 3 + 0.990\cdot 0 + 0.859\cdot 2 + 0.604\cdot 3 = 5.342\\ \mathbb E[n_{QT}] &= \textstyle\sum_i r(i,Q)\,t_i\\ &= 0.604\cdot 2 + 0.990\cdot 5 + 0.859\cdot 3 + 0.604\cdot 2 = 9.943\\ \pi_Q &\leftarrow \frac{3.057}{3.057 + 0.943} = 0.764\\ p_{QH} &\leftarrow \frac{5.342}{5.342 + 9.943} = 0.349\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Update" = the M-step: part 2's count / total, but now we don't know the coin. So experiment \(i\) counts as \(r(i,Q)\) of a quarter. The question lists the four soft counts to compute.`,
          remember: R`\[p_j \leftarrow \frac{\sum_i r(i,j)\,h_i}{\sum_i r(i,j)\,(h_i + t_i)}\]<p>M-step for a coin = count ÷ total (the MLE), with experiment \(i\) counted \(r(i,j)\) times. Not on the sheet for coins: [sheet: Maximization updates] has the Gaussian \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x^{(i)}\) — the same thing with \(x^{(i)} = h_i/5\), experiment \(i\)'s share of heads.</p>` },
        { line: R`<b>Soft count of experiments</b> — part 2 counted a quarter experiment as 1. Now experiment \(i\) counts as \(r(i,Q)\) of a quarter: <div class="formula">\[\begin{aligned}\mathbb E[n_Q] &= 0.604 + 0.990 + 0.859 + 0.604 = 3.057\\ \mathbb E[n_N] &= 0.396 + 0.010 + 0.141 + 0.396 = 0.943\end{aligned}\]</div>`,
          why: R`<p>Check: \(3.057 + 0.943 = 4\) experiments. This is \(n_j = \sum_i r(i,j)\) in [sheet: Maximization updates].</p>` },
        { line: R`<b>Soft heads and tails</b> — each experiment's heads count \(r(i,Q)\cdot h_i\) toward the quarter: <div class="formula">\[\begin{array}{c|c|c|c|c|c} \text{exp.} & r(i,Q) & h & r\cdot h & t & r\cdot t\\ \hline 1 & 0.604 & 3 & 1.812 & 2 & 1.208\\ 2 & 0.990 & 0 & 0 & 5 & 4.950\\ 3 & 0.859 & 2 & 1.718 & 3 & 2.577\\ 4 & 0.604 & 3 & 1.812 & 2 & 1.208\\ \hline \text{add} & & & 5.342 & & 9.943\end{array}\]</div>So \(\mathbb E[n_{QH}] = 5.342\), \(\mathbb E[n_{QT}] = 9.943\).`,
          why: R`<p>Check: \(5.342 + 9.943 = 15.285 = 5\cdot 3.057\) — every experiment has 5 tosses.</p>` },
        { line: R`<b>Same fractions as part 2</b> — count / total of its pair, with the soft counts: <div class="formula">\[\begin{aligned}\pi_Q &\leftarrow \frac{3.057}{3.057 + 0.943} = \frac{3.057}{4} = 0.764\\ p_{QH} &\leftarrow \frac{5.342}{5.342 + 9.943} = \frac{5.342}{15.285} = 0.349\end{aligned}\]</div>Done.`,
          why: R`<p>Part 2's MLE was count / total. The M-step is exactly that, with the counts replaced by the soft counts. (Unrounded responsibilities give 0.3495; 0.349 or 0.350 are both fine.)</p>`,
          extra: [{ label: "official slip in E[n_N]", html: R`<p>It writes \(\mathbb E[n_N] = \sum_{i=1}^{5} r(i,Q)\). It means \(\sum_{i=1}^{4} r(i,N)\) — the numbers it adds (0.396 + 0.010 + 0.141 + 0.396) are the right ones.</p>` }] },
      ],
      compare: R`Same as the official solution: the four expected counts (moves 2–3), then \(\pi_Q \leftarrow 0.764\), \(p_{QH} \leftarrow 0.349\) (move 4). Its label "\(\sum_{i=1}^{5} r(i,Q)\)" for \(\mathbb E[n_N]\) should be \(\sum_{i=1}^{4} r(i,N)\).`,
      slip: R`<ul><li>"Computed in (b)" means part 3's responsibilities (0.604, 0.990, 0.859, 0.604). There's no part (b).</li><li>The \(\mathbb E[n_N]\) line is labelled \(\sum_{i=1}^{5} r(i,Q)\), but it means \(\sum_{i=1}^{4} r(i,N)\). The numbers it adds (0.396 + 0.010 + 0.141 + 0.396 = 0.943) are the right ones.</li></ul>`,
    },

    "2025B-q5.5": {
      point: R`<p>\(p_{QH} = p_{NH}\), so the two coins are identical and the data can't tell them apart: every \(r = 0.5\). So \(\pi_Q\) stays 0.5 and \(p_{QH}\) = all heads / all tosses.</p>`,
      start: R`<p><b>Responsibilities:</b> □, so every \(r(i,Q) = r(i,N) = \square\)</p>
<p>e.g. experiment 1:</p>
\[\begin{aligned}\text{joint Q} &= \square,\quad \text{joint N} = \square\\ r(1,Q) &= \square\end{aligned}\]
<p><b>\(\pi_Q\):</b> \(\mathbb E[n_Q] = \square\), so \(\pi_Q \leftarrow \square\)</p>
<p><b>\(p_{QH}\):</b></p>
\[\begin{aligned}\mathbb E[n_{QH}] &= \square\\ \mathbb E[n_{QT}] &= \square\\ p_{QH} &\leftarrow \square\end{aligned}\]`,
      answer: R`<p><b>Responsibilities:</b> \(\pi_Q = 1 - \pi_Q = 0.5\) and \(p_{QH} = p_{NH} = 0.8\), so joint Q = joint N in every experiment, so every \(r(i,Q) = r(i,N) = 0.5\)</p>
<p>e.g. experiment 1:</p>
\[\begin{aligned}\text{joint Q} &= 0.5\cdot 0.8^3\cdot 0.2^2 = 0.01024,\quad \text{joint N} = 0.01024\\ r(1,Q) &= \frac{0.01024}{0.01024 + 0.01024} = 0.5\end{aligned}\]
<p><b>\(\pi_Q\):</b> \(\mathbb E[n_Q] = 4\cdot 0.5 = 2\), so \(\pi_Q \leftarrow 2/4 = 0.5\)</p>
<p><b>\(p_{QH}\):</b></p>
\[\begin{aligned}\mathbb E[n_{QH}] &= 0.5\cdot(3 + 0 + 2 + 3) = 4\\ \mathbb E[n_{QT}] &= 0.5\cdot(2 + 5 + 3 + 2) = 6\\ p_{QH} &\leftarrow \frac{4}{4 + 6} = 0.4\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Few calculations" is a hint that something makes it easy. Look at the start values: \(p_{QH} = p_{NH} = 0.8\) and \(\pi_Q = 0.5\) — the two coins are <b>identical</b>. So what does that do to the responsibilities?` },
        { line: R`<b>Two identical coins</b> — joint Q = joint N in every experiment, so every \(r(i,Q) = 0.5\). Experiment 1 (3 heads, 2 tails): <div class="formula">\[\begin{aligned}\text{joint Q} = \text{joint N} &= 0.5\cdot 0.8^3\cdot 0.2^2 = 0.01024\\ r(1,Q) &= \frac{0.01024}{0.01024 + 0.01024} = 0.5\end{aligned}\]</div>`,
          remember: R`\[r(i,j) = \frac{\pi_j\,p_j^{h}(1-p_j)^{t}}{\sum_{j'}\pi_{j'}\,p_{j'}^{h}(1-p_{j'})^{t}}\]<p>Responsibility = posterior; a coin's likelihood is \(p^h(1-p)^t\) (independent tosses → multiply). The sheet has it only with Gaussians: [sheet: Responsibilities update] — put \(p_j^h(1-p_j)^t\) where \(\phi(x^{(i)};\mu_j,\Sigma_j)\) is. ([sheet: Binomial probability mass function with] adds a \(\binom{5}{h}\) — the same for both coins, so it cancels.)</p>`,
          why: R`<p>Joint Q \(= 0.5\cdot 0.8^h\cdot 0.2^t\) and joint N \(= 0.5\cdot 0.8^h\cdot 0.2^t\) — the same expression. Something divided by twice itself is 0.5. The data can't tell two identical coins apart.</p>` },
        { line: R`<b>\(\pi_Q\)</b> — soft count of quarter experiments, then count / total: \(\mathbb E[n_Q] = 0.5 + 0.5 + 0.5 + 0.5 = 2\), so \(\pi_Q \leftarrow 2/4 = 0.5\) (unchanged).`,
          remember: R`\[p_j \leftarrow \frac{\sum_i r(i,j)\,h_i}{\sum_i r(i,j)\,(h_i + t_i)}\]<p>M-step for a coin = count ÷ total (the MLE), with experiment \(i\) counted \(r(i,j)\) times. Not on the sheet for coins: [sheet: Maximization updates] has the Gaussian \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x^{(i)}\) — the same thing with \(x^{(i)} = h_i/5\), experiment \(i\)'s share of heads.</p>` },
        { line: R`<b>\(p_{QH}\)</b> — each experiment's heads and tails count half: <div class="formula">\[\begin{aligned}\mathbb E[n_{QH}] &= 0.5\cdot(3 + 0 + 2 + 3) = 4\\ \mathbb E[n_{QT}] &= 0.5\cdot(2 + 5 + 3 + 2) = 6\\ p_{QH} &\leftarrow \frac{4}{4 + 6} = 0.4\end{aligned}\]</div>Done.`,
          why: R`<p>The 0.5 cancels, so \(p_{QH}\) = all heads / all tosses = 8/20 = 0.4. \(p_{NH}\) gets the same 0.4, so the coins stay identical, so the next iteration does the same: EM is stuck at (0.5, 0.4, 0.4).</p>`,
          extra: [{ label: "official slip: 4/10 = 0.2", html: R`<p>It computes \(\mathbb E[n_{QH}] = 4\), \(\mathbb E[n_{QT}] = 6\) correctly, then writes \(4/10 = 0.2\). But \(4/10 = 0.4\). Its last paragraph's "we also get \(p_{QH} \leftarrow 0.2\)" means the nickel: \(p_{NH} \leftarrow 0.4\).</p>` }] },
      ],
      compare: R`Same steps as the official solution (moves 2–4); its last division is a slip: \(4/10 = 0.4\), not 0.2 (and \(p_{NH} \leftarrow 0.4\) too).`,
      slip: R`Arithmetic slip: \(4/10 = 0.4\), not 0.2. So \(p_{QH} \leftarrow 0.4\), and the last paragraph's "we also get \(p_{QH} \leftarrow 0.2\)" means the nickel: \(p_{NH} \leftarrow 0.4\). \(\pi_Q \leftarrow 0.5\) is right.`,
    },

    // ─────────────────────────────────────────────── 2026-A Q5
    "2026A-q5.1": {
      point: R`<p>The means are the same in every plot, so look at bump heights: each bump is about \(\pi_j\cdot 0.399/\sigma_j\) high. Compute them for both GMMs and read the plots' y-axes.</p>`,
      start: R`<p><b>Answer:</b> GMM1 → plot □, GMM2 → plot □.</p>
<p><b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\) at \(\mu = 5, 15, 20\):</p>
\[\text{GMM1: } \square,\ \square,\ \square \qquad \text{GMM2: } \square,\ \square,\ \square\]
<p><b>GMM2 → □ because</b> □</p>
<p><b>GMM1 → □ because</b> □</p>
<p><b>The third plot fits neither because</b> □</p>`,
      answer: R`<p><b>Answer:</b> GMM1 → plot C, GMM2 → plot A.</p>
<p><b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\) at \(\mu = 5, 15, 20\):</p>
\[\text{GMM1: } 0.053,\ 0.060,\ 0.060 \qquad \text{GMM2: } 0.060,\ 0.060,\ 0.160\]
<p><b>GMM2 → A because</b> A's bumps are ≈ 0.06, 0.06, 0.16: two equal bumps (\(\pi_1 = \pi_2\), \(\sigma_1 = \sigma_2\)) and a tall spike at 20 (\(\sigma_3 = 1\)).</p>
<p><b>GMM1 → C because</b> C's bumps are ≈ 0.053, 0.063, 0.063, and the gaps stay filled: bells 1 and 2 meet at \(5 + 2\cdot 3 = 15 - 2\cdot 2 = 11\), bells 2 and 3 overlap between 16 and 19.</p>
<p><b>The third plot fits neither because</b> B's bumps are ≈ 0.105, 0.12, 0.12 (too tall for either GMM), and B drops to ≈ 0 between its bumps.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Match each GMM to its plot" → all plots have the same means, so they only differ in how <b>tall</b> each bump is. So compute each bump's height and compare with the y-axes.` },
        { line: R`<b>Bump heights</b> \(\pi_j\cdot 0.399/\sigma_j\), one row per bump: <div class="formula">\[\begin{array}{c|c|c} \mu & \text{GMM1} & \text{GMM2}\\ \hline 5 & 0.4\cdot 0.399/3 = 0.053 & 0.3\cdot 0.399/2 = 0.060\\ 15 & 0.3\cdot 0.399/2 = 0.060 & 0.3\cdot 0.399/2 = 0.060\\ 20 & 0.3\cdot 0.399/2 = 0.060 & 0.4\cdot 0.399/1 = 0.160\end{array}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Normal (Gaussian) probability density]. At \(x = \mu\) the exp part is \(e^0 = 1\), so a bell's peak is \(\frac{1}{\sigma\sqrt{2\pi}} = \frac{0.399}{\sigma}\). [sheet: Gaussian mixture model density func] multiplies bell \(j\) by \(\pi_j\). Neighbouring bells add a little tail, so it's "≈".</p>` },
        { line: R`<b>GMM2 → plot A</b> — A's y-axis reads 0.06, 0.06, 0.16: two equal bumps and one tall spike at 20, exactly GMM2's column.`,
          why: R`<p>That's also the official argument: GMM2's first two bells have the same weight and width (\(\pi_1 = \pi_2 = 0.3\), \(\sigma_1 = \sigma_2 = 2\)), so they look alike — only A shows that.</p>`,
          extra: [{ label: "official slip: σ₁ = σ₂ = 0.2", html: R`<p>For GMM2 it writes \(\sigma_1 = \sigma_2 = 0.2\). The question says \(\sigma_1 = \sigma_2 = 2\).</p>` }] },
        { line: R`<b>GMM1 → plot C</b> — C reads ≈ 0.053, 0.063, 0.063. Gaps, with \(\mu \pm 2\sigma\): bells 1 and 2 meet at \(5 + 2\cdot 3 = 15 - 2\cdot 2 = 11\), bells 2 and 3 overlap from 16 to 19. No gap drops to 0, like C.`,
          remember: R`<p>2σ rule: about 95% of a bell lies within \(\mu \pm 2\sigma\). Not on the sheet.</p>`,
          why: R`<p>C's 0.063 instead of 0.060 is the neighbour bell's tail. Bells 2 and 3: \(15 + 2\cdot 2 = 19\) and \(20 - 2\cdot 2 = 16\), so the valley at 17.5 stays high (≈ 0.055 in C). Near 10, C keeps a "bridge" (≈ 0.015).</p>` },
        { line: R`<b>B fits neither</b> — B's bumps are ≈ 0.105, 0.12, 0.12: too tall for either GMM. And B drops to ≈ 0 between its bumps. Done.` },
      ],
      compare: R`Official: GMM1 → C, GMM2 → A. It argues that only A shows GMM2's two equal first bumps (\(\pi_1 = \pi_2\), \(\sigma_1 = \sigma_2\), move 3), then uses the 2σ rule on the gaps (moves 4–5). Its "\(\sigma_1 = \sigma_2 = 0.2\)" is a slip for 2.`,
      slip: R`Typo: GMM2 has \(\sigma_1 = \sigma_2 = 2\), not 0.2 (see the question). Same argument: equal weights and equal widths make the first two bumps look alike.`,
    },

    "2026A-q5.2": {
      point: R`<p>We know which coin each experiment used, so just count: every MLE = count / total.</p>`,
      start: R`<p><b>The counts:</b> gold: □ experiments, □ heads of □ tosses · silver: □ experiments, □ heads of □ tosses</p>
<p><b>The MLEs</b> (count / total):</p>
\[\pi_G = \square,\qquad p_G = \square,\qquad p_S = \square\]`,
      answer: R`<p><b>The counts:</b> gold: 2 experiments, \(3 + 4 = 7\) heads of 10 tosses · silver: 2 experiments, \(1 + 2 = 3\) heads of 10 tosses</p>
<p><b>The MLEs</b> (count / total):</p>
\[\pi_G = \frac{2}{4} = 0.5,\qquad p_G = \frac{3 + 4}{5 + 5} = 0.7,\qquad p_S = \frac{1 + 2}{5 + 5} = 0.3\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> We're told which coin each experiment used, so nothing is hidden. The MLE of a probability is count / total. So: count experiments, heads and tosses per coin.`,
          remember: R`\[\hat p = \frac{\text{count}}{\text{total}}\]<p>The MLE of a probability (you get it from: \(\ell\) → derivative → set to 0). Not on the sheet; closest is \(\pi_j = n_j/n\) in [sheet: Maximization updates].</p>`,
          why: R`<p>Where count / total comes from: each experiment's probability = prior × tosses (e.g. experiment 1, gold, 3 heads: \(\pi_G\,p_G^3(1-p_G)^2\)). All the data = the product of the 4 experiments; the log turns the product into a sum and brings the powers down, so each count lands in front of its log (we did the same in 2025-B Q5.2):</p>
\[\begin{aligned}\ell = \;&2\log\pi_G + 2\log(1-\pi_G)\\ &+ 7\log p_G + 3\log(1-p_G)\\ &+ 3\log p_S + 7\log(1-p_S)\end{aligned}\]
<p>Take the \(p_G\) pair. Derivative: \(\frac{7}{p} - \frac{3}{1-p} = 0\), so \(7(1-p) = 3p\), so \(7 = 10p\), so \(p = 0.7\). Every pair works the same way.</p>` },
        { line: R`<b>Count</b> — heads per experiment: 3, 1, 4, 2. Gold = experiments 1 and 3, silver = 2 and 4: <div class="formula">\[\begin{array}{c|c|c|c} & \text{experiments} & \text{heads} & \text{tosses}\\ \hline \text{gold} & 2 & 3 + 4 = 7 & 5 + 5 = 10\\ \text{silver} & 2 & 1 + 2 = 3 & 5 + 5 = 10\end{array}\]</div>` },
        { line: R`<b>Each MLE = count / total</b>: <div class="formula">\[\begin{aligned}\pi_G &= \tfrac{2}{4} = 0.5\\ p_G &= \tfrac{3 + 4}{5 + 5} = 0.7\\ p_S &= \tfrac{1 + 2}{5 + 5} = 0.3\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution: \(\pi_G = 0.5\), \(p_G = 0.7\), \(p_S = 0.3\) (move 3), each explained as count / total.`,
    },

    "2026A-q5.3": {
      point: R`<p>A responsibility is a posterior: \(r(i,G)\) = gold's joint (prior × probability of the tosses) divided by both coins' joints added. The priors are 0.8 and 0.2 here, so they matter.</p>`,
      start: R`<p><b>For each experiment (h heads, t tails):</b></p>
\[\begin{aligned}\text{joint G} &= \pi_G\,p_G^{h}(1-p_G)^{t}\\ \text{joint S} &= (1-\pi_G)\,p_S^{h}(1-p_S)^{t}\\ r(i,G) &= \frac{\text{joint G}}{\text{joint G} + \text{joint S}},\quad r(i,S) = 1 - r(i,G)\end{aligned}\]
<p><b>The numbers:</b></p>
\[\begin{array}{c|c|c|c|c|c} \text{exp.} & h,\,t & \text{joint G} & \text{joint S} & r(i,G) & r(i,S)\\ \hline 1 & \square & \square & \square & \square & \square\\ 2 & \square & \square & \square & \square & \square\\ 3 & \square & \square & \square & \square & \square\\ 4 & \square & \square & \square & \square & \square\end{array}\]`,
      answer: R`<p><b>For each experiment (h heads, t tails):</b></p>
\[\begin{aligned}\text{joint G} &= \pi_G\,p_G^{h}(1-p_G)^{t} = 0.8\cdot 0.2^{h}\cdot 0.8^{t}\\ \text{joint S} &= (1-\pi_G)\,p_S^{h}(1-p_S)^{t} = 0.2\cdot 0.8^{h}\cdot 0.2^{t}\\ r(i,G) &= \frac{\text{joint G}}{\text{joint G} + \text{joint S}},\quad r(i,S) = 1 - r(i,G)\end{aligned}\]
<p><b>The numbers:</b></p>
\[\begin{array}{c|c|c|c|c|c} \text{exp.} & h,\,t & \text{joint G} & \text{joint S} & r(i,G) & r(i,S)\\ \hline 1 & 3,\,2 & 0.004096 & 0.004096 & 0.5 & 0.5\\ 2 & 1,\,4 & 0.065536 & 0.000256 & 0.9961 & 0.0039\\ 3 & 4,\,1 & 0.001024 & 0.016384 & 0.0588 & 0.9412\\ 4 & 2,\,3 & 0.016384 & 0.001024 & 0.9412 & 0.0588\end{array}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(r(i,G)\) = P(gold | these tosses) — a posterior. Posterior = Bayes: gold's joint, divided by both joints added: <div class="formula">\[r(i,G) = \frac{\underbrace{\color{#e8912d}\pi_G\,p_G^{h}(1-p_G)^{t}}_{\textstyle\color{#e8912d}\text{this part = joint G}}}{{\color{#e8912d}\text{joint G}} + \underbrace{\color{#4c8dff}(1-\pi_G)\,p_S^{h}(1-p_S)^{t}}_{\textstyle\color{#4c8dff}\text{this part = joint S}}}\]</div>`,
          remember: R`\[r(i,j) = \frac{\pi_j\,p_j^{h}(1-p_j)^{t}}{\sum_{j'}\pi_{j'}\,p_{j'}^{h}(1-p_{j'})^{t}}\]<p>Responsibility = posterior; a coin's likelihood is \(p^h(1-p)^t\) (independent tosses → multiply). The sheet has it only with Gaussians: [sheet: Responsibilities update] — put \(p_j^h(1-p_j)^t\) where \(\phi(x^{(i)};\mu_j,\Sigma_j)\) is. ([sheet: Binomial probability mass function with] adds a \(\binom{5}{h}\) — the same for both coins, so it cancels.)</p>`,
          why: R`<p>Joint = picked this coin <b>and</b> got these tosses, so prior × tosses. The bottom is the probability of the sequence. It's [sheet: Responsibilities update] with the coin's \(p^h(1-p)^t\) in place of \(\phi\). The priors are 0.8 and 0.2 here, so don't drop them.</p>` },
        { line: R`<b>Joint G</b> — prior 0.8, heads 0.2, tails 0.8: <div class="formula">\[\begin{array}{c|c|l} \text{exp.} & h,\,t & 0.8\cdot 0.2^{h}\cdot 0.8^{t}\\ \hline 1 & 3,\,2 & 0.8\cdot 0.008\cdot 0.64 = 0.004096\\ 2 & 1,\,4 & 0.8\cdot 0.2\cdot 0.4096 = 0.065536\\ 3 & 4,\,1 & 0.8\cdot 0.0016\cdot 0.8 = 0.001024\\ 4 & 2,\,3 & 0.8\cdot 0.04\cdot 0.512 = 0.016384\end{array}\]</div>` },
        { line: R`<b>Joint S</b> — prior 0.2, heads 0.8, tails 0.2: <div class="formula">\[\begin{array}{c|c|l} \text{exp.} & h,\,t & 0.2\cdot 0.8^{h}\cdot 0.2^{t}\\ \hline 1 & 3,\,2 & 0.2\cdot 0.512\cdot 0.04 = 0.004096\\ 2 & 1,\,4 & 0.2\cdot 0.8\cdot 0.0016 = 0.000256\\ 3 & 4,\,1 & 0.2\cdot 0.4096\cdot 0.2 = 0.016384\\ 4 & 2,\,3 & 0.2\cdot 0.64\cdot 0.008 = 0.001024\end{array}\]</div>` },
        { line: R`<b>Divide</b> — joint G / (joint G + joint S); \(r(i,S)\) is the rest: <div class="formula">\[\begin{array}{c|c|c|c} \text{exp.} & \text{joint G + joint S} & r(i,G) & r(i,S)\\ \hline 1 & 0.008192 & 0.5 & 0.5\\ 2 & 0.065792 & 0.9961 & 0.0039\\ 3 & 0.017408 & 0.0588 & 0.9412\\ 4 & 0.017408 & 0.9412 & 0.0588\end{array}\]</div>Done.`,
          why: R`<p>Gold likes tails (0.2 heads), so tail-heavy experiment 2 is gold (0.9961) and 4-heads experiment 3 is silver (0.9412). In experiment 1 the prior (0.8 for gold) and the 3 heads (good for silver) exactly cancel: 0.5.</p>` },
      ],
      compare: R`Same table as the official solution: joints (moves 2–3), then the divisions (move 4).`,
    },

    "2026A-q5.4": {
      point: R`<p>Same counting as the MLE in part 2, but each experiment counts as its responsibility instead of 1 or 0; then each update = soft count / soft total. \(p_S\) is about silver, so it uses the silver responsibilities.</p>`,
      start: R`\[\begin{aligned}\mathbb E[n_G] &= \textstyle\sum_i r(i,G) = \square\\ \mathbb E[n_S] &= \textstyle\sum_i r(i,S) = \square\\ \mathbb E[n_{SH}] &= \textstyle\sum_i r(i,S)\,h_i = \square\\ \mathbb E[n_{ST}] &= \textstyle\sum_i r(i,S)\,t_i = \square\\ \pi_G &\leftarrow \square\\ p_S &\leftarrow \square\end{aligned}\]`,
      answer: R`\[\begin{aligned}\mathbb E[n_G] &= \textstyle\sum_i r(i,G) = 0.5 + 0.9961 + 0.0588 + 0.9412 = 2.4961\\ \mathbb E[n_S] &= \textstyle\sum_i r(i,S) = 0.5 + 0.0039 + 0.9412 + 0.0588 = 1.5039\\ \mathbb E[n_{SH}] &= \textstyle\sum_i r(i,S)\,h_i\\ &= 0.5\cdot 3 + 0.0039\cdot 1 + 0.9412\cdot 4 + 0.0588\cdot 2 = 5.3863\\ \mathbb E[n_{ST}] &= \textstyle\sum_i r(i,S)\,t_i\\ &= 0.5\cdot 2 + 0.0039\cdot 4 + 0.9412\cdot 1 + 0.0588\cdot 3 = 2.1332\\ \pi_G &\leftarrow \frac{2.4961}{2.4961 + 1.5039} = 0.624\\ p_S &\leftarrow \frac{5.3863}{5.3863 + 2.1332} = 0.716\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Update" = the M-step: part 2's count / total, but now we don't know the coin. So experiment \(i\) counts as \(r(i,G)\) gold, \(r(i,S)\) silver. The hint lists the four counts.`,
          remember: R`\[p_j \leftarrow \frac{\sum_i r(i,j)\,h_i}{\sum_i r(i,j)\,(h_i + t_i)}\]<p>M-step for a coin = count ÷ total (the MLE), with experiment \(i\) counted \(r(i,j)\) times. Not on the sheet for coins: [sheet: Maximization updates] has the Gaussian \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x^{(i)}\) — the same thing with \(x^{(i)} = h_i/5\), experiment \(i\)'s share of heads.</p>` },
        { line: R`<b>Soft count of experiments</b> — experiment \(i\) counts as \(r(i,G)\) of a gold coin: <div class="formula">\[\begin{aligned}\mathbb E[n_G] &= 0.5 + 0.9961 + 0.0588 + 0.9412 = 2.4961\\ \mathbb E[n_S] &= 0.5 + 0.0039 + 0.9412 + 0.0588 = 1.5039\end{aligned}\]</div>`,
          why: R`<p>Check: \(2.4961 + 1.5039 = 4\) experiments. This is \(n_j = \sum_i r(i,j)\) in [sheet: Maximization updates].</p>` },
        { line: R`<b>Silver heads and tails</b> — the part asks \(p_S\), so use the <b>silver</b> responsibilities: <div class="formula">\[\begin{array}{c|c|c|c|c|c} \text{exp.} & r(i,S) & h & r\cdot h & t & r\cdot t\\ \hline 1 & 0.5 & 3 & 1.5 & 2 & 1\\ 2 & 0.0039 & 1 & 0.0039 & 4 & 0.0156\\ 3 & 0.9412 & 4 & 3.7648 & 1 & 0.9412\\ 4 & 0.0588 & 2 & 0.1176 & 3 & 0.1764\\ \hline \text{add} & & & 5.3863 & & 2.1332\end{array}\]</div>So \(\mathbb E[n_{SH}] = 5.3863\), \(\mathbb E[n_{ST}] = 2.1332\).`,
          why: R`<p>Check: \(5.3863 + 2.1332 = 7.5195 = 5\cdot 1.5039\) — every experiment has 5 tosses. With \(r(i,G)\) you would be computing \(p_G\) instead.</p>` },
        { line: R`<b>The fractions</b> — count / total, with the soft counts: <div class="formula">\[\begin{aligned}\pi_G &\leftarrow \frac{2.4961}{2.4961 + 1.5039} = \frac{2.4961}{4} = 0.624\\ p_S &\leftarrow \frac{5.3863}{5.3863 + 2.1332} = \frac{5.3863}{7.5195} = 0.716\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution: the four expected counts (moves 2–3), then \(\pi_G \leftarrow 0.624\), \(p_S \leftarrow 0.716\) (move 4). (It writes "\(\pi_G \leftarrow \pi_G \leftarrow\)" and "update \(\pi_S\)" — typos for \(\pi_G\).)`,
      slip: R`Just typos: it means "update \(\pi_G\) and \(p_S\)" (not \(\pi_S\)), and the doubled "\(\pi_G \leftarrow \pi_G \leftarrow\)" is one arrow. The numbers 0.624 and 0.716 are right.`,
    },

    "2026A-q5.5": {
      point: R`<p>If gold and silver start identical, EM can't tell them apart: every \(r = 0.5\), so \(\pi_G\) stays 0.5 and both \(p\)'s become all heads / all tosses \(= 10/20 = 0.5\). So start at 0.5, 0.5, 0.5.</p>`,
      start: R`<p><b>Start values:</b> \(\pi_G = \square,\ p_G = \square,\ p_S = \square\)</p>
<p><b>E-step:</b> □, so every \(r(i,G) = r(i,S) = \square\)</p>
<p><b>M-step:</b></p>
\[\begin{aligned}\pi_G &\leftarrow \square\\ p_G,\ p_S &\leftarrow \square\end{aligned}\]
<p><b>So:</b> □</p>`,
      answer: R`<p><b>Start values:</b> \(\pi_G = 0.5,\ p_G = 0.5,\ p_S = 0.5\)</p>
<p><b>E-step:</b> the two coins are identical (same prior, same \(p\)), so joint G = joint S \(= 0.5\cdot 0.5^h\cdot 0.5^t = 0.5^6\) in every experiment, so every \(r(i,G) = r(i,S) = 0.5\)</p>
<p><b>M-step:</b></p>
\[\begin{aligned}\pi_G &\leftarrow \frac{4\cdot 0.5}{4} = 0.5\\ p_G,\ p_S &\leftarrow \frac{0.5\cdot(3 + 1 + 4 + 2)}{0.5\cdot 20} = \frac{5}{10} = 0.5\end{aligned}\]
<p><b>So:</b> one iteration gives back exactly the start values, so they stay unchanged.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Unchanged" = the M-step gives back the start values. The M-step only uses the responsibilities; they're simplest when all are 0.5, i.e. when the coins are <b>identical</b>. So try identical coins.` },
        { line: R`<b>Make the coins identical</b> — with \(p_G = p_S\) and \(\pi_G = 0.5\), joint G = joint S in every experiment, so every \(r(i,G) = r(i,S) = 0.5\).`,
          remember: R`\[r(i,j) = \frac{\pi_j\,p_j^{h}(1-p_j)^{t}}{\sum_{j'}\pi_{j'}\,p_{j'}^{h}(1-p_{j'})^{t}}\]<p>Responsibility = posterior; a coin's likelihood is \(p^h(1-p)^t\) (independent tosses → multiply). The sheet has it only with Gaussians: [sheet: Responsibilities update] — put \(p_j^h(1-p_j)^t\) where \(\phi(x^{(i)};\mu_j,\Sigma_j)\) is. ([sheet: Binomial probability mass function with] adds a \(\binom{5}{h}\) — the same for both coins, so it cancels.)</p>`,
          why: R`<p>Joint G \(= 0.5\cdot p^h(1-p)^t\) = joint S. Each is half of the sum, so 0.5. The data can't tell two identical coins apart.</p>` },
        { line: R`<b>What the M-step gives</b> — \(\mathbb E[n_G] = 4\cdot 0.5 = 2\), so \(\pi_G \leftarrow 2/4 = 0.5\). Every head counts half, so both \(p\)'s become all heads / all tosses: <div class="formula">\[p_G, p_S \leftarrow \frac{0.5\cdot(3 + 1 + 4 + 2)}{0.5\cdot 20} = \frac{5}{10} = 0.5\]</div>`,
          remember: R`\[p_j \leftarrow \frac{\sum_i r(i,j)\,h_i}{\sum_i r(i,j)\,(h_i + t_i)}\]<p>M-step for a coin = count ÷ total (the MLE), with experiment \(i\) counted \(r(i,j)\) times. Not on the sheet for coins: [sheet: Maximization updates] has the Gaussian \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x^{(i)}\) — the same thing with \(x^{(i)} = h_i/5\), experiment \(i\)'s share of heads.</p>` },
        { line: R`<b>Work back to the start</b> — the M-step outputs \(\pi_G = 0.5\) and \(p = 0.5\) no matter which common \(p\) we started with. So start there: \(\pi_G = p_G = p_S = 0.5\), and one iteration changes nothing. Done.`,
          why: R`<p>A start that the iteration returns unchanged is a fixed point. The half-heads data (10 of 20) is what makes 0.5 work for the \(p\)'s.</p>`,
          extra: [{ label: "the official solution's other options, and a slip", html: R`<p>It also lists \(\pi_G = 1, p_G = 0.5\), \(p_S\) = anything (or the mirror \(\pi_G = 0\), \(p_S = 0.5\)): silver owns no experiment, so its update is \(0/0\) and stays as it was. It says to avoid these.</p><p>Slip: "\(\pi_G \leftarrow 2/4 = 2\)" should be \(2/4 = 0.5\).</p>` }] },
      ],
      compare: R`Same answer and argument as the official solution: \(\pi_G = p_G = p_S = 0.5\) (move 4), with identical coins → every \(r = 0.5\) (move 2). Its "\(2/4 = 2\)" is a slip for 0.5.`,
      slip: R`Typo: \(2/4 = 0.5\), not 2. So \(\pi_G\) stays 0.5, which is exactly why this start doesn't move.`,
    },

    // ─────────────────────────────────────────────── 2026-B Q5 (your Moed B question)
    "2026B-q5.1": {
      point: R`<p>\(f(x) = \frac12\phi(x;-1,1) + \frac12\phi(x;1,1)\), and every \(\phi\) is read from the table at the distance \(|x - \mu|\). Nothing to compute by hand.</p>`,
      start: R`\[f(x) = \pi_1\,\phi(x;\mu_1,1) + \pi_2\,\phi(x;\mu_2,1)\]
\[\begin{aligned}f(-2) &= \tfrac12\,\phi(\square) + \tfrac12\,\phi(\square)\\ &= \square\\ f(0) &= \square\\ &= \square\\ f(2) &= \square\\ &= \square\end{aligned}\]`,
      answer: R`\[f(x) = \pi_1\,\phi(x;\mu_1,1) + \pi_2\,\phi(x;\mu_2,1)\]
\[\begin{aligned}f(-2) &= \tfrac12\,\phi(-2;-1,1) + \tfrac12\,\phi(-2;1,1)\\ &= \tfrac12\cdot 0.242 + \tfrac12\cdot 0.004 = 0.123\\ f(0) &= \tfrac12\,\phi(0;-1,1) + \tfrac12\,\phi(0;1,1)\\ &= \tfrac12\cdot 0.242 + \tfrac12\cdot 0.242 = 0.242\\ f(2) &= \tfrac12\,\phi(2;-1,1) + \tfrac12\,\phi(2;1,1)\\ &= \tfrac12\cdot 0.004 + \tfrac12\cdot 0.242 = 0.123\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(f(x_i)\) = the GMM density at each sample. So copy the stem's formula with \(\pi = (0.5, 0.5)\), \(\mu = (-1, 1)\), then plug in \(-2, 0, 2\): <div class="formula">\[f(x) = \tfrac12\,\phi(x;-1,1) + \tfrac12\,\phi(x;1,1)\]</div>`,
          why: R`<p>[sheet: Gaussian mixture model density func]: each bell times its weight, added up.</p>` },
        { line: R`<b>Read φ from the table</b> — the table is indexed by \(x - \mu\); drop the sign: <div class="formula">\[\begin{array}{c|c|c|c|c} x & x - (-1) & \phi & x - 1 & \phi\\ \hline -2 & -1 & 0.242 & -3 & 0.004\\ 0 & 1 & 0.242 & -1 & 0.242\\ 2 & 3 & 0.004 & 1 & 0.242\end{array}\]</div>`,
          why: R`<p>In \(\phi\), \(x\) and \(\mu\) only appear as \((x-\mu)^2\), so −1 and 1 give the same value. Check one: \(\phi = 0.399\cdot e^{-1^2/2} = 0.399\cdot 0.607 = 0.242\) — the table's number.</p>`,
          extra: [{ label: "your Moed B trap", html: R`<p>You wrote the full \(\frac{1}{\sqrt{2\pi\sigma^2}}\exp(\dots)\) formula, evaluated it by hand, got wrong numbers and crossed it out — every \(\phi\) you need is in the table.</p>` }] },
        { line: R`<b>Weights × φ, add</b>: <div class="formula">\[\begin{aligned}f(-2) &= \tfrac12\cdot 0.242 + \tfrac12\cdot 0.004 = 0.121 + 0.002 = 0.123\\ f(0) &= \tfrac12\cdot 0.242 + \tfrac12\cdot 0.242 = 0.121 + 0.121 = 0.242\\ f(2) &= \tfrac12\cdot 0.004 + \tfrac12\cdot 0.242 = 0.002 + 0.121 = 0.123\end{aligned}\]</div>Done.`,
          why: R`<p>Keep the terms (0.121, 0.002, …) written down: part 2 divides exactly these.</p>` },
      ],
      compare: R`Same as the official solution: 0.123, 0.242, 0.123 (move 3).`,
    },

    "2026B-q5.2": {
      point: R`<p>\(r(i,j)\) = this component's term \(\pi_j\,\phi(x_i;\mu_j,1)\), divided by \(f(x_i)\) = both terms added (both already computed in part 1). Six divisions.</p>`,
      start: R`\[r(i,j) = \frac{\pi_j\,\phi(x_i;\mu_j,1)}{f(x_i)}\]
\[\begin{array}{c|c|c|c|c} x_i & j & \pi_j\phi(x_i;\mu_j,1) & f(x_i) & r(i,j)\\ \hline -2 & 1 & \square & \square & \square\\ -2 & 2 & \square & \square & \square\\ 0 & 1 & \square & \square & \square\\ 0 & 2 & \square & \square & \square\\ 2 & 1 & \square & \square & \square\\ 2 & 2 & \square & \square & \square\end{array}\]`,
      answer: R`\[r(i,j) = \frac{\pi_j\,\phi(x_i;\mu_j,1)}{f(x_i)}\]
\[\begin{array}{c|c|c|c|c} x_i & j & \pi_j\phi(x_i;\mu_j,1) & f(x_i) & r(i,j)\\ \hline -2 & 1 & \tfrac12\cdot 0.242 = 0.121 & 0.123 & 0.121/0.123 = 0.984\\ -2 & 2 & \tfrac12\cdot 0.004 = 0.002 & 0.123 & 0.002/0.123 = 0.016\\ 0 & 1 & \tfrac12\cdot 0.242 = 0.121 & 0.242 & 0.121/0.242 = 0.5\\ 0 & 2 & \tfrac12\cdot 0.242 = 0.121 & 0.242 & 0.121/0.242 = 0.5\\ 2 & 1 & \tfrac12\cdot 0.004 = 0.002 & 0.123 & 0.002/0.123 = 0.016\\ 2 & 2 & \tfrac12\cdot 0.242 = 0.121 & 0.123 & 0.121/0.123 = 0.984\end{array}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(r(i,j)\) = P(component \(j\) | \(x_i\)) — a posterior. Bayes: this component's term, divided by all terms added. Both pieces are already in part 1: <div class="formula">\[r(i,j) = \frac{\underbrace{\color{#e8912d}\pi_j\,\phi(x_i;\mu_j,\sigma_j)}_{\textstyle\color{#e8912d}\text{this part = a term from part 1}}}{\underbrace{\color{#4c8dff}\textstyle\sum_{j'}\pi_{j'}\,\phi(x_i;\mu_{j'},\sigma_{j'})}_{\textstyle\color{#4c8dff}\text{this part = } f(x_i)\text{ from part 1}}}\]</div>`,
          why: R`<p>You don't need to know this by heart: [sheet: Responsibilities update]. \(j'\) is just a second letter for "every component", so the bottom adds both terms = part 1's \(f(x_i)\). It's Bayes: prior \(\pi_j\) × likelihood \(\phi\), divided by the total.</p>` },
        { line: R`<b>Divide</b> — each row's term by its \(f(x_i)\): <div class="formula">\[\begin{array}{c|c|c|c|c} x_i & j & \pi_j\phi & f(x_i) & r(i,j)\\ \hline -2 & 1 & 0.121 & 0.123 & 0.984\\ -2 & 2 & 0.002 & 0.123 & 0.016\\ 0 & 1 & 0.121 & 0.242 & 0.5\\ 0 & 2 & 0.121 & 0.242 & 0.5\\ 2 & 1 & 0.002 & 0.123 & 0.016\\ 2 & 2 & 0.121 & 0.123 & 0.984\end{array}\]</div>Done.`,
          why: R`<p>First row: \(0.121/0.123 = 0.984\). \(-2\) is 1 away from \(\mu_1 = -1\) but 3 away from \(\mu_2 = 1\), so component 1 almost surely produced it. \(x = 0\) is exactly between the means, so 50/50. Each sample's two responsibilities add to 1.</p>` },
      ],
      compare: R`Same table as the official solution (move 2).`,
    },

    "2026B-q5.3": {
      point: R`<p>\(n_j\) = add up component \(j\)'s responsibilities, \(\pi_j = n_j/3\), and \(\mu_j\) = the average of the \(x\)'s weighted by the responsibilities (so divide by \(n_j\), not by 3).</p>`,
      start: R`\[\begin{aligned}n_1 &= \square\\ n_2 &= \square\\ \pi_1 &= \frac{n_1}{n} = \square,\qquad \pi_2 = \square\\ \mu_1 &= \frac{1}{n_1}\big(\square\cdot(-2) + \square\cdot 0 + \square\cdot 2\big)\\ &= \square\\ \mu_2 &= \frac{1}{n_2}\big(\square\cdot(-2) + \square\cdot 0 + \square\cdot 2\big)\\ &= \square\end{aligned}\]`,
      answer: R`\[\begin{aligned}n_1 &= 0.984 + 0.5 + 0.016 = 1.5\\ n_2 &= 0.016 + 0.5 + 0.984 = 1.5\\ \pi_1 &= \frac{n_1}{n} = \frac{1.5}{3} = 0.5,\qquad \pi_2 = \frac{1.5}{3} = 0.5\\ \mu_1 &= \frac{1}{n_1}\big(0.984\cdot(-2) + 0.5\cdot 0 + 0.016\cdot 2\big)\\ &= \frac{-1.936}{1.5} = -1.291\\ \mu_2 &= \frac{1}{n_2}\big(0.016\cdot(-2) + 0.5\cdot 0 + 0.984\cdot 2\big)\\ &= \frac{1.936}{1.5} = 1.291\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> "M-step for \(\pi\) and \(\mu\)" → [sheet: Maximization updates]: \(n_j = \sum_i r(i,j)\), \(\pi_j = n_j/n\), \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x_i\). Plug in part 2's responsibilities.`,
          why: R`<p>You don't need to know this by heart: it's on the sheet in exactly this form (with \(x^{(i)}\) for \(x_i\)). \(n_j\) = how many samples component \(j\) owns, counting fractions.</p>` },
        { line: R`<b>\(n_j\) and \(\pi_j\)</b> — add each component's responsibilities, then divide by \(n = 3\): <div class="formula">\[\begin{aligned}n_1 &= 0.984 + 0.5 + 0.016 = 1.5\\ n_2 &= 0.016 + 0.5 + 0.984 = 1.5\\ \pi_1 &= \pi_2 = 1.5/3 = 0.5\end{aligned}\]</div>`,
          why: R`<p>Check: \(1.5 + 1.5 = 3 = n\).</p>` },
        { line: R`<b>\(\mu_1\) = a weighted average</b> — each \(x\) times its \(r(i,1)\), divided by the weights' sum: <div class="formula">\[\begin{aligned}\mu_1 &= \frac{\color{#e8912d}0.984\cdot(-2) + 0.5\cdot 0 + 0.016\cdot 2}{\color{#4c8dff}1.5}\\ &= \frac{-1.968 + 0 + 0.032}{1.5} = \frac{-1.936}{1.5} = -1.291\end{aligned}\]</div>`,
          size: R`<p>The orange top is a dot product: column 1 of \(r\) with \(x\).</p>\[\underbrace{r_{\cdot,1}^\top}_{\textstyle 1\times 3}\,\underbrace{x}_{\textstyle 3\times 1} = \underbrace{-1.936}_{\textstyle 1\times 1}\]<p>inner 3 = 3 ✓ (3 samples) · result = one number ✓ · \(x^\top r_{\cdot,1}\) is (1×3)(3×1) = one number either way — a dot product doesn't care about order.</p><p>numpy: <code>r.shape = (3, 2)</code>, <code>r[:, 0]</code> and <code>x</code> are <code>(3,)</code> → <code>(r[:, 0] * x).sum()</code> = one number. Move 4 (column 2) has the same sizes.</p>`,
          why: R`<p>An ordinary average of 3 numbers is \(\frac{1\cdot x_1 + 1\cdot x_2 + 1\cdot x_3}{1 + 1 + 1}\): every sample has weight 1. Here each sample counts \(r(i,1)\) instead of 1, so the bottom is the sum of the weights, \(n_1 = 1.5\) — not \(n = 3\).</p>
\[\mu_j = \frac{1}{n_j}\sum_i \underbrace{\color{#e8912d}r(i,j)\,x_i}_{\textstyle\color{#e8912d}\text{this part = orange top}}\]
<p>numpy: <code>(r[:, 0] * x).sum() / r[:, 0].sum()</code>.</p>` },
        { line: R`<b>\(\mu_2\)</b> — same with column 2: <div class="formula">\[\mu_2 = \frac{0.016\cdot(-2) + 0.5\cdot 0 + 0.984\cdot 2}{1.5} = \frac{1.936}{1.5} = 1.291\]</div>So \(\pi \leftarrow (0.5, 0.5)\), \(\mu \leftarrow (-1.291, 1.291)\). Done.`,
          why: R`<p>Both means moved outward from ±1: component 1 fully owns −2 and only half-owns 0, so its average is pulled toward −2.</p>` },
      ],
      compare: R`Same as the official solution: \(\pi \leftarrow (0.5, 0.5)\) (move 2), \(\mu \leftarrow (-1.291, 1.291)\) (moves 3–4). It writes \(\frac{2}{3}(\dots)\), which is \(\frac{1}{1.5}(\dots)\), and commas where it means "+".`,
      slip: R`Read every comma inside those sums as "+": \(n_1 = 0.984 + 0.5 + 0.016 = 1.5\). The \(\tfrac23\) in front is just \(1/n_1 = 1/1.5\).`,
    },

    "2026B-q5.4": {
      point: R`<p>MAP = pick the class with the bigger prior × class density. A's density is just a GMM; every \(\phi\) is read from the table at the distance \(|x - \mu|\) (like part 1).</p>`,
      start: R`<p>With \(f(x\mid A) = \tfrac12\,\phi(x;-2,1) + \tfrac12\,\phi(x;2,1)\) and \(f(x\mid B) = \phi(x;0,1)\):</p>
<p><b>\(x = 0\):</b></p>
\[\begin{aligned}f(0, A) &= \pi_A\,f(0\mid A)\\ &= \tfrac12\big[\tfrac12\cdot\square + \tfrac12\cdot\square\big] = \square\\ f(0, B) &= \pi_B\,f(0\mid B) = \tfrac12\cdot\square = \square\end{aligned}\]
<p>\(\square \gt \square\), so predict \(\square\).</p>
<p><b>\(x = 2\):</b></p>
\[\begin{aligned}f(2, A) &= \pi_A\,f(2\mid A)\\ &= \tfrac12\big[\tfrac12\cdot\square + \tfrac12\cdot\square\big] = \square\\ f(2, B) &= \pi_B\,f(2\mid B) = \tfrac12\cdot\square = \square\end{aligned}\]
<p>\(\square \gt \square\), so predict \(\square\).</p>`,
      answer: R`<p>With \(f(x\mid A) = \tfrac12\,\phi(x;-2,1) + \tfrac12\,\phi(x;2,1)\) and \(f(x\mid B) = \phi(x;0,1)\):</p>
<p><b>\(x = 0\):</b></p>
\[\begin{aligned}f(0, A) &= \pi_A\,f(0\mid A)\\ &= \tfrac12\big[\tfrac12\cdot 0.054 + \tfrac12\cdot 0.054\big] = 0.027\\ f(0, B) &= \pi_B\,f(0\mid B) = \tfrac12\cdot 0.399 = 0.200\end{aligned}\]
<p>\(0.200 \gt 0.027\), so predict \(B\).</p>
<p><b>\(x = 2\):</b></p>
\[\begin{aligned}f(2, A) &= \pi_A\,f(2\mid A)\\ &= \tfrac12\big[\tfrac12\cdot 0.0001 + \tfrac12\cdot 0.399\big] = 0.100\\ f(2, B) &= \pi_B\,f(2\mid B) = \tfrac12\cdot 0.054 = 0.027\end{aligned}\]
<p>\(0.100 \gt 0.027\), so predict \(A\).</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> MAP = the class with the biggest posterior. Posterior = joint ÷ \(f(x)\), and \(f(x)\) is the same for both classes, so compare the joints \(f(x, y) = \pi_y\,f(x\mid y)\).`,
          remember: R`\[\hat y_{\text{MAP}} = \arg\max_y\ \pi_y\,f(x \mid y)\]<p>MAP = biggest posterior = biggest joint: the posterior is joint ÷ \(f(x)\) (Bayes' rule), and \(f(x)\) is the same for every class. Here \(f(x \mid y)\) is each class's density. Not on the sheet in this form: [sheet: Class posterior probability] only names \(P(Y \mid X)\). Bayes' rule is on the extension sheet, if you get it: [sheet: Bayes' rule].</p>`,
          why: R`<p>The posterior is \(P(X\mid Y)\,P(Y)/P(X)\) ([sheet: Class posterior probability], [sheet: Class prior]), and \(P(X)\) is the same for both classes, so compare only the tops.</p>` },
        { line: R`<b>\(x = 0\)</b> — distances to the means −2, 2, 0 are 2, 2, 0, so the table gives \(\phi\) = 0.054, 0.054, 0.399: <div class="formula">\[\begin{aligned}f(0, A) &= \tfrac12\big[\tfrac12\cdot 0.054 + \tfrac12\cdot 0.054\big] = 0.027\\ f(0, B) &= \tfrac12\cdot 0.399 = 0.200\end{aligned}\]</div>\(0.027 \lt 0.200\), so predict <b>B</b>.`,
          why: R`<p>Two layers of weights: the class prior \(\pi_A = \frac12\) outside the bracket, and the \(\frac12\)'s of A's GMM inside. Both multiply.</p>` },
        { line: R`<b>\(x = 2\)</b> — distances to −2, 2, 0 are 4, 0, 2, so \(\phi\) = 0.0001, 0.399, 0.054: <div class="formula">\[\begin{aligned}f(2, A) &= \tfrac12\big[\tfrac12\cdot 0.0001 + \tfrac12\cdot 0.399\big] = 0.100\\ f(2, B) &= \tfrac12\cdot 0.054 = 0.027\end{aligned}\]</div>\(0.100 \gt 0.027\), so predict <b>A</b>. Done.`,
          why: R`<p>\(x = 2\) sits on the centre of one of A's two bumps; \(x = 0\) sits between A's bumps but on B's centre.</p>`,
          extra: [{ label: "official slip: x = 0 in the last line", html: R`<p>Its last line says "Because \(f(x=0, Y=A) \gt f(x=0, Y=B)\)". It means \(x = 2\): \(0.100 \gt 0.027\).</p>` }] },
      ],
      compare: R`Same as the official solution: \(x = 0\) → B (0.027 vs 0.200, move 2), \(x = 2\) → A (0.100 vs 0.027, move 3). Its last line writes \(x = 0\) where it means \(x = 2\).`,
      slip: R`Typo in the last line: it's about \(x = 2\), not \(x = 0\). \(f(2, A) = 0.100 \gt f(2, B) = 0.027\), so \(x = 2\) → A.`,
    },

    "2026B-q5.5": {
      point: R`<p>Naive Bayes multiplies an \(x_1\)-GMM by an \(x_2\)-GMM, so each class becomes a grid of blobs: every \(x_1\) cluster with every \(x_2\) cluster. If a class's real blobs are that grid, it works; if not, it doesn't.</p>`,
      start: R`<p><b>Naive Bayes works when:</b> □</p>
<p><b>(a):</b> □, because □. The GMMs: □</p>
<p><b>(b):</b> □, because □</p>
<p><b>(c):</b> □, because □</p>`,
      answer: R`<p><b>Naive Bayes works when:</b> inside each class the features are independent, \(f(x\mid y) = f(x_1\mid y)\cdot f(x_2\mid y)\). A product of an \(x_1\)-GMM and an \(x_2\)-GMM puts a blob at every combination of an \(x_1\) cluster with an \(x_2\) cluster (a grid).</p>
<p><b>(a):</b> makes sense, because each class's four blobs form a full grid. The GMMs (2 components each): \(\mathrm{GMM}_{A,1}(x_1)\) means ≈ −3, 1; \(\mathrm{GMM}_{A,2}(x_2)\) means ≈ −2, 2; \(\mathrm{GMM}_{B,1}(x_1)\) means ≈ 1.2, 3.2; \(\mathrm{GMM}_{B,2}(x_2)\) means ≈ −3, 1.</p>
<p><b>(b):</b> doesn't make sense, because inside each class the features are dependent: class A is only at (2, 2) and (−2, −2), so \(f\big((2,-2)\mid A\big) \approx 0\), but \(f(x_1{=}2\mid A)\cdot f(x_2{=}{-2}\mid A)\) is not small.</p>
<p><b>(c):</b> doesn't make sense, because each class is a tilted band (\(x_2\) changes with \(x_1\): dependent features), and the classes overlap a lot in \(x_2\); a full Bayes model would do much better.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Makes sense?" → does naive Bayes' assumption hold: features independent inside each class. Then a class = \(x_1\)-GMM × \(x_2\)-GMM = a grid of blobs. So: is each class a grid?`,
          remember: R`\[f(x \mid y) = f(x_1 \mid y)\cdot f(x_2 \mid y)\]<p>Naive Bayes' assumption: inside each class the features are <b>independent</b>. That's the assumption you name when it fails. Not on the sheet (the question gives the product, not the name).</p>`,
          why: R`<p>The model is \(f(x\mid Y = y) = \mathrm{GMM}_{y,1}(x_1)\times\mathrm{GMM}_{y,2}(x_2)\) (as in HW6's <code>NaiveBayesGMM</code>). A product is big only where both factors are big, so it's big at every combination of an \(x_1\) cluster with an \(x_2\) cluster.</p>` },
        { line: R`<b>(a) makes sense</b> — each class's four blobs are a full grid. Four GMMs, 2 components each: <div class="formula">\[\begin{array}{c|c} \mathrm{GMM}_{A,1}(x_1) & \text{means} \approx -3,\ 1\\ \mathrm{GMM}_{A,2}(x_2) & \text{means} \approx -2,\ 2\\ \mathrm{GMM}_{B,1}(x_1) & \text{means} \approx 1.2,\ 3.2\\ \mathrm{GMM}_{B,2}(x_2) & \text{means} \approx -3,\ 1\end{array}\]</div>`,
          why: R`<p>Class A projects to \(x_1\) clusters at −3 and 1 and \(x_2\) clusters at −2 and 2. Its grid is (−3, 2), (−3, −2), (1, 2), (1, −2) — exactly A's four blobs. Class B's blobs, (1.2, 1), (3.2, 1), (1.2, −3), (3.2, −3), are also a full grid. Read the means off by projecting each class onto each axis.</p>` },
        { line: R`<b>(b) doesn't</b> — class A is only at (2, 2) and (−2, −2), but its grid adds (2, −2), where A has no points. Its features are dependent: <div class="formula">\[\begin{aligned}&f\big((2,-2)\mid A\big) \approx 0,\ \text{but}\\ &f(x_1{=}2\mid A)\cdot f(x_2{=}{-2}\mid A) \text{ is not small}\end{aligned}\]</div>`,
          why: R`<p>Class B (at (−2, 2) and (2, −2)) projects to the same clusters, −2 and 2 on both axes, so both classes get the same grid. Naive Bayes can't tell them apart.</p>` },
        { line: R`<b>(c) doesn't</b> — each class is a tilted band: \(x_2\) changes with \(x_1\), so the features are dependent. And the classes overlap a lot in \(x_2\). A full Bayes model would do much better. Done.` },
      ],
      compare: R`Same verdicts as the official solution: (a) yes, with those four 2-component GMMs (move 2); (b) no — its example is \(f\big((2,-2)\mid A\big)\) (move 3); (c) no — dependent features and heavy overlap in \(x_2\) (move 4).`,
      slip: R`"Figure A/B/C" means panels (a)/(b)/(c), not class A or B. So "Figure B" is panel (b) (the four clean blobs), and its example \(f\big((2,-2)\mid A\big)\) is about class A in that panel.`,
    },
  });
})();
