// Notes for topic "gmm". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["gmm"] = {
  intro: R`<p>Question 5 of 2025-B, 2026-A and 2026-B is about <b>mixture models</b> and the <b>EM algorithm</b>. The data changes between exams (Gaussian bells, quarters and nickels, gold and silver coins), but the parts repeat:</p>
<ol>
<li><b>The GMM density</b>: match GMM parameters to plots (2025-B, 2026-A), or compute the density of a few points from a given \(\phi\) table (2026-B).</li>
<li><b>MLE when you know which component</b> produced each experiment: just count (2025-B, 2026-A).</li>
<li><b>E-step</b>: compute the responsibilities (all three exams).</li>
<li><b>M-step</b>: update the parameters with "expected counts" (all three exams).</li>
<li><b>A special starting point</b> that EM doesn't move (2025-B Q5.5, 2026-A bonus), or — in 2026-B — a <b>MAP classifier</b> whose class density is a GMM, and <b>naive Bayes</b> with GMMs on three scatter plots.</li>
</ol>
<p><b>Good news:</b> the formula sheet has the GMM density and every EM formula (section "Expectation Maximization for Gaussian Mixture Models"), and 2026-B even gives you a table of \(\phi\) values. These questions are about <b>plugging in carefully</b>, not deriving. In Moed B you scored 0 on this question because you computed \(\phi\) from scratch instead of reading the table — notes 1–2 fix exactly that.</p>
<p><b>How to use the notes:</b> read them in order; each builds on the one before. They use two ideas from earlier topics: from <b>Bayes</b> — prior, likelihood, posterior, MLE and MAP — and from <b>Clustering</b> — K-means. The worked examples use <b>2025-B Question 5</b> (your guided question). Two exceptions: the \(\phi\) table, the Gaussian version of EM, MAP and naive Bayes appear only in 2026-B, so notes 1, 2, 9, 10, 12 and 13 use its numbers; and note 3 (plots) starts with 2026-A because its plots have readable y-axes, then does 2025-B. Then do 2026-A on your own, and redo 2026-B without looking.</p>`,
  moves: [
    { title: "0 · Start here: what a mixture model is",
      idea: R`<p>In the Bayes topic every dataset came from <b>one</b> distribution: one coin with one heads-probability \(p\), or one Gaussian bell with one mean \(\mu\). Real data is often a <b>mix</b> of several sources. A jar holds two kinds of coins with different biases; a list of heights mixes children and adults. A single distribution describes such data badly.</p>
<p>A <b>mixture model</b> describes it with a two-stage story. Every sample is produced like this:</p>
<h5>Step 1 — pick a component (hidden)</h5>
<p>Choose one of \(k\) <b>components</b> ("types", "sources") at random. Component \(j\) is chosen with probability \(\pi_j\), called its <b>weight</b>. The weights are probabilities, so they are \(\ge 0\) and add up to 1. With two components, \(\pi_1 + \pi_2 = 1\), so writing \(\pi\) and \(1-\pi\) is enough.</p>
<h5>Step 2 — generate the data from that component</h5>
<p>The chosen component produces the data with its <b>own</b> distribution. In the exams this is either</p>
<ul>
<li>a <b>biased coin</b> tossed 5 times (the coin mixtures of 2025-B and 2026-A), or</li>
<li>a <b>Gaussian bell</b> producing one number \(x\) (the Gaussian mixture model, <b>GMM</b>, of all three exams).</li>
</ul>
<h5>Step 3 — we only see the result</h5>
<p>We see the data from step 2 but <b>not</b> which component was chosen in step 1. That choice is a <b>hidden</b> (also called "latent") variable. This is what makes mixtures hard, and it's the reason the EM algorithm exists.</p>
<p>The notes cover three jobs, in this order: compute how probable some data is under a mixture (notes 1–4); estimate the parameters when the hidden choice is known (note 5); estimate them when it isn't — EM (notes 6–11). Notes 12–13 then use a GMM inside a classifier.</p>`,
      notation: [
        [R`\(k\)`, R`number of components (2 or 3 in the exams)`],
        [R`\(j\)`, R`index of a component: \(j = 1, \dots, k\). In the coin questions the components have names instead: Q/N (quarter/nickel), G/S (gold/silver).`],
        [R`\(\pi_j\)`, R`the <b>weight</b> of component \(j\): the probability that step 1 picks it. <b>Not</b> the number 3.14! (That \(\pi\) only appears inside \(\sqrt{2\pi}\) in the bell formula.)`],
        [R`\(\pi_Q\), \(1-\pi_Q\)`, R`2025-B: probability of picking a quarter / a nickel ("prevalence")`],
        [R`\(p_{QH}\), \(p_{NH}\)`, R`2025-B: probability that a quarter / a nickel lands heads. 2026-A calls them \(p_G\), \(p_S\).`],
        [R`\(\mu_j, \sigma_j\)`, R`GMM: the mean (centre) and standard deviation (width) of bell \(j\)`],
        [R`hidden / latent`, R`not observed. Here: which component produced a sample.`],
      ],
      example: R`<p><b>2025-B Q5's story.</b> A jar has quarters (Q) and nickels (N).</p>
<ol>
<li>Step 1: pick a coin — a quarter with probability \(\pi_Q\), a nickel with probability \(1 - \pi_Q\).</li>
<li>Step 2: toss that coin 5 times. A quarter lands heads with probability \(p_{QH}\); a nickel with probability \(p_{NH}\).</li>
<li>Step 3: we write down the 5 results, but (from part 3 on) not which coin it was.</li>
</ol>
<p>One pass through the story is one <b>experiment</b>. The exam gives four. Since the tosses are independent, only the <b>number</b> of heads and tails matters, not their order (note 4 shows why), so the first thing to do is count:</p>
<div class="tw"><table><thead><tr><th>experiment</th><th>tosses</th><th>heads \(h_i\)</th><th>tails \(t_i\)</th></tr></thead><tbody>
<tr><td>1</td><td>H T T H H</td><td>3</td><td>2</td></tr>
<tr><td>2</td><td>T T T T T</td><td>0</td><td>5</td></tr>
<tr><td>3</td><td>H T T H T</td><td>2</td><td>3</td></tr>
<tr><td>4</td><td>H H T T H</td><td>3</td><td>2</td></tr></tbody></table></div>
<p>The model has three parameters: \(\pi_Q, p_{QH}, p_{NH}\). The whole question is about estimating them from this table.</p>`,
      cue: R`Every Q5 opens with the story: "a coin is selected according to the prevalence … then tossed five times", or "a GMM with \(k\) components is defined by the weights \(\pi\), means \(\mu\) and standard deviations \(\sigma\)".`,
      first: R`Write the two-stage story in one line each, then make the heads/tails count table. Every later part uses it.` },

    { title: "1 · One Gaussian bell \\(\\phi\\), and reading it from a table",
      idea: R`<p>Each component of a GMM is a <b>normal (Gaussian) distribution</b>: a bell-shaped curve. Its density — how likely values near \(x\) are — is written \(\phi(x;\mu,\sigma)\):</p>
\[\phi(x;\mu,\sigma) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)\]
<p>It's on the formula sheet ("Normal (Gaussian) probability density function"). You will almost never need to compute it by hand. Here is why.</p>
<h5>Step 1 — what \(\mu\) and \(\sigma\) do</h5>
<ul>
<li>\(\mu\) is the <b>centre</b>: the bell's highest point is at \(x = \mu\).</li>
<li>\(\sigma\) is the <b>width</b>: a bigger \(\sigma\) gives a wider, flatter bell. About 95% of the bell lies between \(\mu - 2\sigma\) and \(\mu + 2\sigma\) (the "2σ rule").</li>
</ul>
<h5>Step 2 — \(\phi\) only depends on the distance from the centre</h5>
<p>Look at the formula: \(x\) and \(\mu\) only appear together, as \((x-\mu)^2\). So for a fixed \(\sigma\), the value of \(\phi\) depends only on the <b>distance</b> \(|x - \mu|\). A point 1 to the left of the centre and a point 1 to the right get the same value. That's why an exam can give you <b>one small table</b>, indexed by \(x - \mu\), instead of asking you to evaluate exponentials.</p>
<h5>Step 3 — how to read the table</h5>
<ol>
<li>Compute the difference \(x - \mu\).</li>
<li>Drop the sign (distance \(|x-\mu|\)).</li>
<li>Read \(\phi\) in that column.</li>
</ol>
<h5>Step 4 — the height of the peak</h5>
<p>At the centre, \(x = \mu\), so \(x - \mu = 0\) and the exponential is \(e^0 = 1\). What's left is the fraction in front. Since \(\sqrt{2\pi\sigma^2} = \sigma\sqrt{2\pi}\) and \(\sqrt{2\pi} = \sqrt{6.283} = 2.507\):</p>
\[\text{peak height} = \frac{1}{\sigma\sqrt{2\pi}} = \frac{1}{2.507}\cdot\frac{1}{\sigma} = \frac{0.399}{\sigma}\]
<p>For \(\sigma = 1\): \(0.399/1 = 0.399\). For \(\sigma = 2\): \(0.399/2 = 0.1995\). For \(\sigma = 3\): \(0.399/3 = 0.133\). For \(\sigma = 4\): \(0.399/4 = 0.0997\). Wider bells are lower, because the area under every bell is exactly 1. Note 3 uses these heights to read plots.</p>`,
      notation: [
        [R`\(\phi(x;\mu,\sigma)\)`, R`density of the normal distribution with mean \(\mu\) and standard deviation \(\sigma\), at the point \(x\). Read "phi of \(x\), with centre \(\mu\) and width \(\sigma\)".`],
        [R`\(\mathcal N(\mu, \sigma^2)\)`, R`"the normal distribution with mean \(\mu\) and variance \(\sigma^2\)". Some exams write \(\mathcal N(\mu, \sigma = 1)\) to give the standard deviation directly.`],
        [R`\(\sigma\) vs \(\sigma^2\)`, R`\(\sigma\) = standard deviation (width); \(\sigma^2\) = variance. The GMM exams give \(\sigma\).`],
        [R`\(|x - \mu|\)`, R`the distance between the point and the centre of the bell`],
      ],
      example: R`<p><b>2026-B's table</b> (all bells there have \(\sigma = 1\)):</p>
<div class="tw"><table><thead><tr><th>\(x - \mu\)</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><td>\(\phi(x;\mu,\sigma=1)\)</td><td>0.399</td><td>0.242</td><td>0.054</td><td>0.004</td><td>0.0001</td></tr></tbody></table></div>
<p><b>Reading it</b>, for the values 2026-B needs (\(\mu = -1\) or \(\mu = 1\), \(x \in \{-2, 0, 2\}\)):</p>
<ul>
<li>\(\phi(-2; -1, 1)\): \(x - \mu = -2 - (-1) = -2 + 1 = -1\) → distance 1 → <b>0.242</b></li>
<li>\(\phi(-2; 1, 1)\): \(x - \mu = -2 - 1 = -3\) → distance 3 → <b>0.004</b></li>
<li>\(\phi(0; -1, 1)\): \(x - \mu = 0 - (-1) = 1\) → distance 1 → <b>0.242</b></li>
<li>\(\phi(0; 1, 1)\): \(x - \mu = 0 - 1 = -1\) → distance 1 → <b>0.242</b></li>
<li>\(\phi(2; -1, 1)\): \(x - \mu = 2 - (-1) = 3\) → distance 3 → <b>0.004</b></li>
<li>\(\phi(2; 1, 1)\): \(x - \mu = 2 - 1 = 1\) → distance 1 → <b>0.242</b></li>
</ul>
<p><b>The table really is the formula.</b> Check the column "1" once: with \(\sigma = 1\) and \(x - \mu = 1\),</p>
\[\phi = \frac{1}{\sqrt{2\pi}}\,e^{-1^2/2} = 0.399 \cdot e^{-0.5} = 0.399 \cdot 0.607 = 0.242\]
<p>That's the number in the table. On the exam you skip this line and just read 0.242.</p>`,
      cue: R`"To simplify your computations, we provide below probability densities of the normal distribution \(\mathcal N(\mu, \sigma = 1)\) as a function of the difference between the value \(x\) and the mean \(\mu\)" (2026-B).`,
      first: R`For every \(\phi(x;\mu,1)\) you need, write the difference \(x - \mu\) next to it, then the table value.`,
      trap: R`<b>Moed B Q5.1:</b> you wrote the full \(\frac{1}{\sqrt{2\pi\sigma^2}}\exp(\dots)\) formula, tried to evaluate it by hand, got wrong numbers, and crossed everything out. The table was on the page. If a question gives a \(\phi\) table, <b>every</b> \(\phi\) you need is in it.` },

    { title: "2 · The GMM density: a weighted sum of bells",
      idea: R`<p>Note 1 gave us one bell per component: \(\phi(x;\mu_j,\sigma_j)\). Now we want the density of \(x\) under the <b>whole mixture</b>, where we don't know which bell produced \(x\). Follow the two-stage story of note 0.</p>
<h5>Step 1 — one component: "picked \(j\) AND produced \(x\)"</h5>
<p>Component \(j\) is picked with probability \(\pi_j\); once picked, it produces values near \(x\) with density \(\phi(x;\mu_j,\sigma_j)\). Both have to happen, so we multiply:</p>
\[\text{(density of "component } j \text{ and } x\text{")} = \pi_j\,\phi(x;\mu_j,\sigma_j)\]
<p>In Bayes words: <b>prior × likelihood</b>. \(\pi_j\) is the prior of component \(j\) and \(\phi\) is the likelihood of \(x\) under it.</p>
<h5>Step 2 — add over the components</h5>
<p>\(x\) came from exactly one of the \(k\) components; we just don't know which. So we add the \(k\) possibilities:</p>
\[f(x;\pi,\mu,\sigma) = \sum_{j=1}^{k}\pi_j\,\phi(x;\mu_j,\sigma_j) = \pi_1\phi(x;\mu_1,\sigma_1) + \dots + \pi_k\phi(x;\mu_k,\sigma_k)\]
<p>This is the "Gaussian mixture model density function" on the formula sheet, and every GMM question prints it too.</p>
<h5>Step 3 — keep the individual terms</h5>
<p>Write each term \(\pi_j\phi(x;\mu_j,\sigma_j)\) down <b>separately</b> before adding them. The E-step (note 9) divides exactly these terms by their sum, so in 2026-B part 1 already does half of part 2.</p>`,
      notation: [
        [R`\(f(x;\pi,\mu,\sigma)\)`, R`the GMM density at \(x\). The letters after ";" are the parameters: the lists \(\pi = (\pi_1,\dots,\pi_k)\), \(\mu = (\mu_1,\dots,\mu_k)\), \(\sigma = (\sigma_1,\dots,\sigma_k)\).`],
        [R`\(\pi_j\,\phi(x;\mu_j,\sigma_j)\)`, R`the \(j\)-th term: density of "component \(j\) was picked and it produced \(x\)"`],
        [R`\(x_i\) or \(x^{(i)}\)`, R`sample number \(i\) of the dataset`],
      ],
      example: R`<p><b>2026-B Q5.1.</b> Dataset \(D = \{-2, 0, 2\}\), two components with \(\pi = (0.5, 0.5)\), \(\mu = (-1, 1)\), \(\sigma = (1, 1)\). The \(\phi\) values come from note 1's lookups.</p>
<p><b>\(x = -2\):</b></p>
\[\begin{aligned} f(-2) &= \pi_1\,\phi(-2;-1,1) + \pi_2\,\phi(-2;1,1)\\ &= 0.5 \cdot 0.242 + 0.5 \cdot 0.004\\ &= 0.121 + 0.002\\ &= 0.123\end{aligned}\]
<p><b>\(x = 0\):</b></p>
\[\begin{aligned} f(0) &= \pi_1\,\phi(0;-1,1) + \pi_2\,\phi(0;1,1)\\ &= 0.5 \cdot 0.242 + 0.5 \cdot 0.242\\ &= 0.121 + 0.121\\ &= 0.242\end{aligned}\]
<p><b>\(x = 2\):</b></p>
\[\begin{aligned} f(2) &= \pi_1\,\phi(2;-1,1) + \pi_2\,\phi(2;1,1)\\ &= 0.5 \cdot 0.004 + 0.5 \cdot 0.242\\ &= 0.002 + 0.121\\ &= 0.123\end{aligned}\]
<p>These are the official answers (0.123, 0.242, 0.123). Notice the symmetry: the data \(\{-2,0,2\}\) and the means \(\{-1,1\}\) are both symmetric around 0, so \(f(-2) = f(2)\).</p>`,
      cue: R`"Using the initial parameters, compute the GMM density \(f(x_i)\) for each of the three samples in the dataset. Show your calculations." (2026-B Q5.1)`,
      first: R`Write \(f(x) = \pi_1\phi(x;\mu_1,\sigma_1) + \pi_2\phi(x;\mu_2,\sigma_2)\), then substitute one sample at a time.`,
      recipe: R`For each sample: (1) for each component, compute \(x - \mu_j\) and read \(\phi\); (2) multiply by \(\pi_j\) — <b>write these terms down</b>; (3) add them. One line per sample, as above.` },

    { title: "3 · Matching GMM parameters to plots",
      idea: R`<p>2025-B Q5.1 and 2026-A Q5.1 give two GMMs' parameters and three plots; you match each GMM to its plot (one plot matches neither) and explain. You don't compute whole curves: you check a few features that each parameter controls.</p>
<h5>Step 1 — what each parameter does to the picture</h5>
<ul>
<li>\(\mu_j\) → <b>where</b> bump \(j\) is.</li>
<li>\(\sigma_j\) → how <b>wide</b> bump \(j\) is (and so, how low: note 1, step 4).</li>
<li>\(\pi_j\) → how much <b>area</b> bump \(j\) has. Each bell has area 1, and the mixture multiplies it by \(\pi_j\).</li>
</ul>
<h5>Step 2 — predict each peak's height</h5>
<p>When the bumps are far apart, the density at \(x = \mu_j\) is almost only term \(j\), whose height is \(\pi_j\) times the bell's peak (note 1):</p>
\[\text{height of bump } j \approx \pi_j \cdot \frac{0.399}{\sigma_j}\]
<p>Compute this for every bump of each GMM and compare with the plots' y-axes. When two bumps are close, their tails add a little on top.</p>
<h5>Step 3 — check the valleys between close bumps</h5>
<p>If two means are close compared with the widths, the bells overlap and the valley between them stays high. If they are far apart — the distance between the means is more than about \(2\sigma_a + 2\sigma_b\), so each bell's "95% range" (the 2σ rule) ends before the other's begins — the density drops to almost 0 between them. To check a valley, evaluate the density at the <b>midpoint</b> between the two means.</p>
<h5>Step 4 — eliminate</h5>
<p>The means are usually the same in all three plots, so the heights (step 2) and the valleys (step 3) decide. Name the feature that rules each wrong plot out; that's the explanation the exam wants.</p>`,
      notation: [
        [R`\(\pi_j \cdot 0.399/\sigma_j\)`, R`approximate height of bump \(j\) (good when it's far from the other bumps)`],
        [R`2σ rule`, R`about 95% of a bell lies within \(\mu \pm 2\sigma\)`],
        [R`midpoint`, R`\((\mu_a + \mu_b)/2\) — the lowest point of the valley between two equal bumps`],
      ],
      example: R`<p><b>2026-A Q5.1</b> (its plots have readable y-axes). Both GMMs have \(\mu = (5, 15, 20)\).</p>
<p><b>GMM1:</b> \(\pi = (0.4, 0.3, 0.3)\), \(\sigma = (3, 2, 2)\). Predicted heights:</p>
<ul>
<li>bump at 5: \(0.4 \cdot 0.399/3 = 0.4 \cdot 0.133 = 0.053\)</li>
<li>bump at 15: \(0.3 \cdot 0.399/2 = 0.3 \cdot 0.1995 = 0.060\)</li>
<li>bump at 20: \(0.3 \cdot 0.399/2 = 0.3 \cdot 0.1995 = 0.060\)</li>
</ul>
<p><b>GMM2:</b> \(\pi = (0.3, 0.3, 0.4)\), \(\sigma = (2, 2, 1)\):</p>
<ul>
<li>bump at 5: \(0.3 \cdot 0.399/2 = 0.3 \cdot 0.1995 = 0.060\)</li>
<li>bump at 15: \(0.3 \cdot 0.399/2 = 0.3 \cdot 0.1995 = 0.060\)</li>
<li>bump at 20: \(0.4 \cdot 0.399/1 = 0.4 \cdot 0.399 = 0.160\)</li>
</ul>
<p><b>Match.</b> Plot A has peaks ≈ 0.06, 0.06, 0.16 → <b>GMM2</b>. Plot C has peaks ≈ 0.053, 0.063, 0.063 → <b>GMM1</b> (the extra 0.003 is the neighbouring bell's tail). Plot B's peaks (≈ 0.105, 0.12, 0.12) fit neither.</p>
<p><b>The valleys confirm it.</b> GMM1's bumps at 15 and 20 have midpoint \((15 + 20)/2 = 17.5\), which is \(17.5 - 15 = 2.5\) from bell 2's centre and \(20 - 17.5 = 2.5\) from bell 3's. With \(\sigma = 2\), the value of one such bell there is</p>
\[\phi(17.5;15,2) = \frac{0.399}{2}\,e^{-2.5^2/(2\cdot 2^2)} = 0.1995\cdot e^{-6.25/8} = 0.1995\cdot e^{-0.781} = 0.1995\cdot 0.458 = 0.0913\]
<p>(and the same for bell 3). Each term gets its weight 0.3: \(0.3 \cdot 0.0913 = 0.0274\). Bell 1 (at 5) is far away and adds ≈ 0. So</p>
\[f(17.5) \approx 0.0274 + 0.0274 = 0.055\]
<p>— a shallow valley, as in plot C. Plot B instead drops to about 0.01 between its peaks. On the exam you don't need this exact number: the official solution makes the same argument with the 2σ rule — bell 2 reaches right to \(15 + 2\cdot 2 = 19\) and bell 3 reaches left to \(20 - 2\cdot 2 = 16\), so they overlap heavily between 16 and 19 and the valley must stay high. It uses the same rule for bells 1 and 2 of GMM1: bell 1 reaches right to \(5 + 2\cdot 3 = 11\), bell 2 reaches left to \(15 - 2\cdot 2 = 11\), so they meet around 11 and the density shouldn't drop to 0 between them. Plot C has a "bridge" there (≈ 0.015 at \(x = 10\)); plot B drops to 0.</p>
<p class="muted">(Slip in the official solution: it writes \(\sigma_1 = \sigma_2 = 0.2\) for GMM2. The table says \(\sigma_1 = \sigma_2 = 2\).)</p>
<h5>2025-B Q5.1 (your guided question)</h5>
<p>Both GMMs have \(\mu = (10, 20, 25)\).</p>
<ul>
<li><b>GMM1</b>, \(\pi = (0.4, 0.3, 0.3)\), \(\sigma = (4, 2, 2)\): heights \(0.4 \cdot 0.399/4 = 0.4 \cdot 0.0997 = 0.040\), \(0.3 \cdot 0.399/2 = 0.3 \cdot 0.1995 = 0.060\), \(0.3 \cdot 0.399/2 = 0.060\).</li>
<li><b>GMM2</b>, \(\pi = (0.3, 0.3, 0.4)\), \(\sigma = (3, 2, 1)\): heights \(0.3 \cdot 0.399/3 = 0.3 \cdot 0.133 = 0.040\), \(0.3 \cdot 0.399/2 = 0.3 \cdot 0.1995 = 0.060\), \(0.4 \cdot 0.399/1 = 0.4 \cdot 0.399 = 0.160\).</li>
</ul>
<p>Plot C: bump at 10 ≈ 0.040, bump at 20 ≈ 0.064 (the bump at 25 is cut off at the image's right edge) → <b>GMM1</b>. Plot A (its y-axis numbers are cut off in the image, so compare shapes): one tall narrow peak at 25, about 4 times as high as the bump at 10 (GMM2 predicts \(0.160/0.040 = 4\)), and a bump at 20 about 1.5 times the one at 10 (\(0.060/0.040 = 1.5\)) → <b>GMM2</b>. That's the official answer. The official explanation uses widths instead of heights: plot A is the only plot whose bump at 20 is clearly wider than the one at 25 (\(\sigma_2 = 2 \gt \sigma_3 = 1\)); in B and C the bumps at 20 and 25 have equal widths, as in GMM1 (\(\sigma_2 = \sigma_3 = 2\)).</p>
<p>Why not plot B for GMM1? B's bump at 10 (0.088) is <b>higher</b> than its other two (0.068). But GMM1 predicts 0.040 there, lower than the 0.060 of the others. And B drops to about 0 between 20 and 25, while GMM1's midpoint is \((20 + 25)/2 = 22.5\), which is \(2.5\) from both centres with \(\sigma = 2\) — exactly the 2026-A situation above, so again \(f(22.5) \approx 0.0274 + 0.0274 = 0.055\): a high valley, like C.</p>
<p class="muted">(Slip in the official solution: it says "the midpoint at \(x = 27.5\)". The midpoint of 20 and 25 is 22.5. It also notes that GMM1's first bump should have a third more area than each of the others, since \(0.4/0.3 = 1.33\) — in plot B the first bump looks bigger than the other two together.)</p>`,
      cue: R`"Two of the three plots below describe the PDFs of these two GMMs … Specify which plot matches each GMM and explain" (2025-B Q5.1, 5 pts; 2026-A Q5.1, 7 pts).`,
      first: R`Under each GMM, write the predicted height of each bump: \(\pi_j \cdot 0.399/\sigma_j\).`,
      recipe: R`(1) Means: same in all plots? (2) Heights \(\pi_j\cdot 0.399/\sigma_j\) → compare with the y-axes. (3) Close bumps: midpoint density high (overlapping bells) or ≈ 0 (separated)? (4) Name one feature that rules out each wrong plot.`,
      trap: R`Don't match by bump <b>height</b> alone and forget \(\sigma\): a big \(\pi_j\) with a big \(\sigma_j\) can still give a low bump (2025-B GMM1's first bump: \(\pi = 0.4\) but \(\sigma = 4\) → only 0.040). Height tracks \(\pi_j/\sigma_j\); area tracks \(\pi_j\).` },

    { title: "4 · Coin mixtures: the probability of one experiment",
      idea: R`<p>A coin mixture is the same two-stage story as a GMM, but each component is a <b>biased coin</b> instead of a bell, and the data of one experiment is a <b>sequence of 5 tosses</b> instead of one number.</p>
<h5>Step 1 — the probability of a sequence, given the coin</h5>
<p>Say we know the coin is a quarter. Each toss lands H with probability \(p_{QH}\) and T with probability \(1 - p_{QH}\), and the tosses are independent, so the probability of the whole sequence is the product of the five toss probabilities. For H T T H H:</p>
\[p_{QH}\cdot(1-p_{QH})\cdot(1-p_{QH})\cdot p_{QH}\cdot p_{QH} = p_{QH}^{3}\,(1-p_{QH})^{2}\]
<p>Multiplication doesn't care about order, so only the counts matter: \(h\) heads and \(t\) tails give \(p^h(1-p)^t\).</p>
<h5>Step 2 — "picked this coin AND got this sequence"</h5>
<p>As in note 2, step 1: multiply by the probability of picking that coin (prior × likelihood):</p>
\[P(\text{quarter and sequence}) = \pi_Q\,p_{QH}^{h}(1-p_{QH})^{t},\qquad P(\text{nickel and sequence}) = (1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t}\]
<p>The exam solutions call these the <b>joint probabilities</b>.</p>
<h5>Step 3 — the total probability of the sequence</h5>
<p>The coin was one of the two, so add the two joint probabilities:</p>
\[P(\text{sequence}) = \pi_Q\,p_{QH}^{h}(1-p_{QH})^{t} + (1-\pi_Q)\,p_{NH}^{h}(1-p_{NH})^{t}\]
<p>Same shape as the GMM density \(\sum_j \pi_j\phi(x;\mu_j,\sigma_j)\): weight × "how likely this component makes the data", added over the components.</p>`,
      notation: [
        [R`\(h_i, t_i\)`, R`number of heads / tails in experiment \(i\) (\(h_i + t_i = 5\))`],
        [R`\(p^h(1-p)^t\)`, R`probability of one <b>specific</b> sequence with \(h\) heads and \(t\) tails, for a coin with heads-probability \(p\)`],
        [R`joint probability`, R`\(P(\text{coin } a \text{ and the sequence}) = \pi_a\,p_a^h(1-p_a)^t\)`],
      ],
      example: R`<p><b>2025-B, experiment 1</b> (H T T H H: \(h = 3\), \(t = 2\)), with the starting values of Q5.3: \(\pi_Q = 0.5\), \(p_{QH} = 0.5\), \(p_{NH} = 0.8\).</p>
<p>Quarter:</p>
\[\pi_Q\,p_{QH}^3(1-p_{QH})^2 = 0.5\cdot 0.5^3\cdot 0.5^2 = 0.5 \cdot 0.125 \cdot 0.25 = 0.015625\]
<p>Nickel (\(1 - \pi_Q = 0.5\), \(1 - p_{NH} = 0.2\)):</p>
\[(1-\pi_Q)\,p_{NH}^3(1-p_{NH})^2 = 0.5\cdot 0.8^3\cdot 0.2^2 = 0.5 \cdot 0.512 \cdot 0.04 = 0.01024\]
<p>Total probability of this sequence:</p>
\[0.015625 + 0.01024 = 0.025865\]
<p>Note 7 does this for all four experiments and turns the numbers into responsibilities.</p>`,
      trap: R`No binomial coefficient \(\binom{5}{h}\): the exam gives one <b>specific</b> sequence. (If you add it anyway, it's the same factor for both coins and cancels in the responsibilities — but leave it out.)` },

    { title: "5 · MLE when we know which coin: just count",
      idea: R`<p>Recall MLE from the Bayes topic: pick the parameter values that make the observed data <b>most probable</b>. For a single coin with \(h\) heads and \(t\) tails, the answer was \(\hat p = \dfrac{h}{h+t}\), the fraction of heads. Here we do the same for the mixture, in the easy case: we are <b>told</b> which coin was used in each experiment (2025-B Q5.2, 2026-A Q5.2).</p>
<h5>Step 1 — the likelihood</h5>
<p>The experiments are independent, so the probability of all the data is the <b>product</b> of the experiments' joint probabilities (note 4, step 2), each with the coin we were told. Products are awkward to maximize, so we take the log: the log of a product is the sum of the logs, \(\log(ab) = \log a + \log b\), and powers come down in front, \(\log(p^h) = h\log p\).</p>
<p>For one quarter experiment with \(h_i\) heads and \(t_i\) tails, that gives</p>
\[\log\big(\pi_Q\,p_{QH}^{h_i}(1-p_{QH})^{t_i}\big) = \log\pi_Q + h_i\log p_{QH} + t_i\log(1-p_{QH})\]
<p>and for one nickel experiment</p>
\[\log\big((1-\pi_Q)\,p_{NH}^{h_i}(1-p_{NH})^{t_i}\big) = \log(1-\pi_Q) + h_i\log p_{NH} + t_i\log(1-p_{NH})\]
<h5>Step 2 — group the terms by parameter</h5>
<p>The log-likelihood \(\ell\) is the sum of these lines over all experiments. Collect equal logs:</p>
<ul>
<li>\(\log\pi_Q\) appears once per quarter experiment → \(n_Q\) times (\(n_Q\) = number of quarter experiments); \(\log(1-\pi_Q)\) appears \(n_N\) times.</li>
<li>\(\log p_{QH}\) is multiplied by the heads of every quarter experiment → by \(n_{QH}\) = total quarter heads. \(\log(1-p_{QH})\) → by \(n_{QT}\) = total quarter tails.</li>
<li>The same for the nickel: \(n_{NH}\) and \(n_{NT}\).</li>
</ul>
<p>So only <b>totals</b> remain:</p>
\[\ell = n_Q\log\pi_Q + n_N\log(1-\pi_Q) + n_{QH}\log p_{QH} + n_{QT}\log(1-p_{QH}) + n_{NH}\log p_{NH} + n_{NT}\log(1-p_{NH})\]
<p>Each parameter sits in its own pair of terms, so we can maximize each pair separately.</p>
<h5>Step 3 — maximize one pair</h5>
<p>Every pair has the form \(a\log q + b\log(1-q)\). Differentiate with respect to \(q\) (the derivative of \(\log(1-q)\) is \(-\frac{1}{1-q}\) by the chain rule) and set it to 0:</p>
\[\frac{a}{q} - \frac{b}{1-q} = 0 \;\Longrightarrow\; a(1-q) = bq \;\Longrightarrow\; a = (a+b)\,q \;\Longrightarrow\; q = \frac{a}{a+b}\]
<p>So <b>every MLE is a count divided by a total</b>:</p>
\[\pi_Q^* = \frac{n_Q}{n_Q + n_N},\qquad p_{QH}^* = \frac{n_{QH}}{n_{QH} + n_{QT}},\qquad p_{NH}^* = \frac{n_{NH}}{n_{NH} + n_{NT}}\]`,
      notation: [
        [R`\(\ell\)`, R`the log-likelihood: log of the probability of all the data, as a function of the parameters`],
        [R`\(n_Q, n_N\)`, R`number of experiments that used a quarter / a nickel`],
        [R`\(n_{QH}, n_{QT}\)`, R`total number of quarter tosses that landed heads / tails (over all quarter experiments)`],
        [R`\(n_{NH}, n_{NT}\)`, R`the same for nickels`],
        [R`\(\pi_Q^*\)`, R`the star marks the maximizer — here the MLE`],
      ],
      example: R`<p><b>2025-B Q5.2:</b> experiment 1 used a quarter, experiments 2–4 used nickels. From the count table of note 0:</p>
<ul>
<li>\(n_Q = 1\) (experiment 1), \(n_N = 3\) (experiments 2, 3, 4)</li>
<li>quarter heads/tails (experiment 1 only): \(n_{QH} = 3\), \(n_{QT} = 2\)</li>
<li>nickel heads: \(n_{NH} = 0 + 2 + 3 = 5\); nickel tails: \(n_{NT} = 5 + 3 + 2 = 10\)</li>
</ul>
<p><b>The log-likelihood</b> (the part asks you to write it):</p>
\[\ell = 1\log\pi_Q + 3\log(1-\pi_Q) + 3\log p_{QH} + 2\log(1-p_{QH}) + 5\log p_{NH} + 10\log(1-p_{NH})\]
<p><b>The MLEs:</b></p>
<ul>
<li>\(\pi_Q^* = \dfrac{n_Q}{n_Q + n_N} = \dfrac{1}{1 + 3} = \dfrac{1}{4} = 0.25\)</li>
<li>\(p_{QH}^* = \dfrac{n_{QH}}{n_{QH} + n_{QT}} = \dfrac{3}{3 + 2} = \dfrac{3}{5} = 0.6\)</li>
<li>\(p_{NH}^* = \dfrac{n_{NH}}{n_{NH} + n_{NT}} = \dfrac{5}{5 + 10} = \dfrac{5}{15} = 0.333\)</li>
</ul>
<p>These are the official answers. 2026-A Q5.2 is the same with gold coins in experiments 1 and 3 and silver in 2 and 4.</p>`,
      cue: R`"Assume that we know that a quarter was selected in experiment 1 … Write the expression for the log-likelihood … and specify the MLEs" (2025-B Q5.2); "… gold coins were selected in experiments 1 and 3 … What are the MLEs?" (2026-A Q5.2).`,
      first: R`List the six counts: \(n_Q, n_N, n_{QH}, n_{QT}, n_{NH}, n_{NT}\) (or with G/S).`,
      recipe: R`Counts → log-likelihood "count × log(probability)" for the six pairs → each MLE = count / total of its pair.`,
      trap: R`\(p_{QH}\) is divided by the number of <b>quarter tosses</b> (\(5 n_Q\)), not by the number of experiments and not by all 20 tosses.` },

    { title: "6 · When the coin is hidden: the idea of EM",
      idea: R`<p>Note 5 worked because we could <b>count</b>: we knew which coin each experiment used. From 2025-B Q5.3 on, we don't.</p>
<h5>Step 1 — the problem</h5>
<p>Without the coin labels, each experiment's probability is the total of note 4, step 3 — a <b>sum</b> over the two coins. The log-likelihood becomes</p>
\[\ell = \sum_{i=1}^{4}\log\Big(\pi_Q\,p_{QH}^{h_i}(1-p_{QH})^{t_i} + (1-\pi_Q)\,p_{NH}^{h_i}(1-p_{NH})^{t_i}\Big)\]
<p>A log of a sum doesn't split into separate pairs, and setting the derivatives to 0 has no closed-form solution.</p>
<h5>Step 2 — a chicken-and-egg observation</h5>
<ul>
<li>If we <b>knew the coins</b>, we could find the parameters by counting (note 5).</li>
<li>If we <b>knew the parameters</b>, we could compute, with Bayes' rule, how likely each coin is for each experiment (note 7).</li>
</ul>
<h5>Step 3 — the EM algorithm: alternate between the two</h5>
<ol>
<li><b>Start</b> with a guess for the parameters (the exam gives it).</li>
<li><b>E-step</b> ("Expectation"): with the current parameters, compute for every experiment \(i\) and coin \(a\) the probability \(r(i,a)\) that experiment \(i\) used coin \(a\). These are the <b>responsibilities</b> — "soft labels", e.g. "60% quarter, 40% nickel".</li>
<li><b>M-step</b> ("Maximization"): redo note 5's counting, but let each experiment count as a <b>fraction</b> \(r(i,a)\) toward each coin. These fractional counts are the <b>expected counts</b>. Divide them as in note 5 to get new parameters.</li>
<li>Repeat 2–3 until the parameters stop changing. Each round never lowers the likelihood.</li>
</ol>
<p>The exams ask for <b>one</b> round: one E-step and one M-step.</p>
<h5>Step 4 — you have seen this before: EM is "soft K-means"</h5>
<p>K-means alternates too: <b>assign</b> each point to its closest centroid, then <b>recompute</b> each centroid as the average of its points. EM does the same, except each point is split between the components according to its responsibilities instead of going 100% to one. The M-step's mean update (note 10) is literally a weighted average.</p>`,
      notation: [
        [R`E-step`, R`compute responsibilities from the current parameters (note 7 for coins, note 9 for Gaussians)`],
        [R`M-step`, R`compute new parameters from the responsibilities (note 8 for coins, note 10 for Gaussians)`],
        [R`\(r(i,a)\)`, R`responsibility: probability that experiment/sample \(i\) came from component \(a\), given its data and the current parameters`],
        [R`\(\mathbb E[n_Q]\)`, R`expected count: "how many quarter experiments we expect" = \(\sum_i r(i,Q)\). \(\mathbb E\) reads "expected value".`],
        [R`iteration`, R`one E-step followed by one M-step`],
      ],
      example: R`<p><b>2025-B Q5.3–5.4 in one picture</b> (numbers computed in notes 7–8):</p>
<ol>
<li>Start: \(\pi_Q = 0.5\), \(p_{QH} = 0.5\), \(p_{NH} = 0.8\). A fair quarter and a nickel that likes heads.</li>
<li>E-step: experiment 2 (TTTTT) is very unlikely for a coin that lands heads 80% of the time, so it's almost surely a quarter: \(r(2,Q) = 0.990\). Experiments 1 and 4 (3 heads) are less clear: \(r = 0.604\).</li>
<li>M-step: the quarter now "owns" about 3.06 of the 4 experiments, including the tail-heavy one, so \(\pi_Q\) rises to 0.764 and \(p_{QH}\) falls to 0.349.</li>
</ol>
<p><b>Where the formulas are:</b> the formula sheet section "Expectation Maximization for Gaussian Mixture Models" gives \(r(i,j)\), \(n_j = \sum_i r(i,j)\), \(\pi_j = n_j/n\), \(\mu_j\) and \(\Sigma_j\). The coin questions don't print the coin version, but they tell you which expected counts to use.</p>`,
      cue: R`"Now assume that we do not know which coin type was tossed in each experiment and we would like to apply the EM algorithm … execute one iteration" (2025-B, 2026-A); "We perform a single iteration of the EM algorithm starting with …" (2026-B).`,
      first: R`Write the two words and what they produce: "E-step → responsibilities \(r(i,a)\); M-step → new parameters from expected counts."` },

    { title: "7 · E-step for coins: responsibilities",
      idea: R`<p>Where we are: we have the current parameters (the exam's starting values) and each experiment's sequence. We want \(r(i, a)\): the probability that experiment \(i\) used coin \(a\), <b>given</b> what we saw.</p>
<h5>Step 1 — it's a Bayes posterior</h5>
<p>"Probability of the hidden type given the data" is exactly the <b>posterior</b> from the Bayes topic. Bayes' rule: posterior = prior × likelihood / evidence. Here</p>
<ul>
<li>prior of the quarter = \(\pi_Q\),</li>
<li>likelihood of the sequence under the quarter = \(p_{QH}^{h_i}(1-p_{QH})^{t_i}\),</li>
<li>evidence = the total probability of the sequence (note 4, step 3).</li>
</ul>
\[r(i,Q) = \frac{\pi_Q\,p_{QH}^{h_i}(1-p_{QH})^{t_i}}{\pi_Q\,p_{QH}^{h_i}(1-p_{QH})^{t_i} + (1-\pi_Q)\,p_{NH}^{h_i}(1-p_{NH})^{t_i}}\]
<p>In words: <b>the quarter's joint probability divided by the sum of both joint probabilities</b>. \(r(i,N)\) has the nickel's joint probability on top and the same denominator, so \(r(i,Q) + r(i,N) = 1\).</p>
<h5>Step 2 — the recipe for one experiment</h5>
<ol>
<li>Count \(h_i\) and \(t_i\).</li>
<li>Joint for the quarter: \(\pi_Q\,p_{QH}^{h_i}(1-p_{QH})^{t_i}\).</li>
<li>Joint for the nickel: \((1-\pi_Q)\,p_{NH}^{h_i}(1-p_{NH})^{t_i}\).</li>
<li>Total = joint Q + joint N.</li>
<li>\(r(i,Q)\) = joint Q / total; \(r(i,N)\) = joint N / total.</li>
</ol>`,
      notation: [
        [R`\(r(i,a)\)`, R`responsibility of coin \(a\) for experiment \(i\): \(P(\text{coin} = a \mid \text{sequence } i)\) under the current parameters`],
        [R`\(r(i,Q) + r(i,N) = 1\)`, R`the coin was one of the two`],
      ],
      example: R`<p><b>2025-B Q5.3.</b> Starting values \(\pi_Q = 0.5\), \(p_{QH} = 0.5\), \(p_{NH} = 0.8\) (so \(1-\pi_Q = 0.5\), \(1-p_{QH} = 0.5\), \(1-p_{NH} = 0.2\)).</p>
<p><b>Experiment 1</b> (H T T H H: \(h = 3\), \(t = 2\)) — the joints are from note 4:</p>
<ul>
<li>Q: \(0.5\cdot 0.5^3\cdot 0.5^2 = 0.5\cdot 0.125\cdot 0.25 = 0.015625\)</li>
<li>N: \(0.5\cdot 0.8^3\cdot 0.2^2 = 0.5\cdot 0.512\cdot 0.04 = 0.01024\)</li>
<li>total: \(0.015625 + 0.01024 = 0.025865\)</li>
<li>\(r(1,Q) = 0.015625 / 0.025865 = 0.604\), \(r(1,N) = 0.01024 / 0.025865 = 0.396\)</li>
</ul>
<p><b>Experiment 2</b> (T T T T T: \(h = 0\), \(t = 5\)):</p>
<ul>
<li>Q: \(0.5\cdot 0.5^0\cdot 0.5^5 = 0.5\cdot 1\cdot 0.03125 = 0.015625\)</li>
<li>N: \(0.5\cdot 0.8^0\cdot 0.2^5 = 0.5\cdot 1\cdot 0.00032 = 0.00016\)</li>
<li>total: \(0.015625 + 0.00016 = 0.015785\)</li>
<li>\(r(2,Q) = 0.015625 / 0.015785 = 0.990\), \(r(2,N) = 0.00016 / 0.015785 = 0.010\)</li>
</ul>
<p><b>Experiment 3</b> (H T T H T: \(h = 2\), \(t = 3\)):</p>
<ul>
<li>Q: \(0.5\cdot 0.5^2\cdot 0.5^3 = 0.5\cdot 0.25\cdot 0.125 = 0.015625\)</li>
<li>N: \(0.5\cdot 0.8^2\cdot 0.2^3 = 0.5\cdot 0.64\cdot 0.008 = 0.00256\)</li>
<li>total: \(0.015625 + 0.00256 = 0.018185\)</li>
<li>\(r(3,Q) = 0.015625 / 0.018185 = 0.859\), \(r(3,N) = 0.00256 / 0.018185 = 0.141\)</li>
</ul>
<p><b>Experiment 4</b> (H H T T H: \(h = 3\), \(t = 2\)): the same counts as experiment 1, so the same responsibilities: \(r(4,Q) = 0.604\), \(r(4,N) = 0.396\).</p>
<div class="tw"><table><thead><tr><th>exp.</th><th>\(h, t\)</th><th>joint Q</th><th>joint N</th><th>total</th><th>\(r(i,Q)\)</th><th>\(r(i,N)\)</th></tr></thead><tbody>
<tr><td>1</td><td>3, 2</td><td>0.015625</td><td>0.01024</td><td>0.025865</td><td>0.604</td><td>0.396</td></tr>
<tr><td>2</td><td>0, 5</td><td>0.015625</td><td>0.00016</td><td>0.015785</td><td>0.990</td><td>0.010</td></tr>
<tr><td>3</td><td>2, 3</td><td>0.015625</td><td>0.00256</td><td>0.018185</td><td>0.859</td><td>0.141</td></tr>
<tr><td>4</td><td>3, 2</td><td>0.015625</td><td>0.01024</td><td>0.025865</td><td>0.604</td><td>0.396</td></tr></tbody></table></div>
<p><b>Two time savers.</b> (1) Because \(p_{QH} = 0.5\), every quarter joint is \(0.5\cdot 0.5^5 = 0.5^6 = 0.015625\), whatever the sequence. (2) Experiments with the same \(h\) get the same responsibilities. Both tricks come back in note 11.</p>`,
      cue: R`"Compute the responsibility values in this case. Recall that responsibility \(r(i,a)\) is the posterior probability that a coin of type \(a\) was selected in experiment \(i\)" (2025-B Q5.3, 2026-A Q5.3).`,
      first: R`For experiment 1, write "joint Q = \(\pi_Q\,p_{QH}^{h}(1-p_{QH})^{t}\) = …" with the numbers substituted.`,
      recipe: R`Per experiment: joint Q, joint N, total, two divisions. Put the eight numbers in a table like the one above — the M-step reads from it.`,
      trap: R`Forgetting the prior \(\pi_Q\) / \(1-\pi_Q\) in the joints. It only cancels when the two priors are equal (as here, 0.5/0.5); in 2026-A they are 0.8/0.2 and it matters.` },

    { title: "8 · M-step for coins: expected counts",
      idea: R`<p>Where we are: note 7 gave every experiment a soft label, e.g. experiment 1 is "0.604 quarter, 0.396 nickel". Now we want new parameters. Idea: redo note 5's counting, with soft labels instead of known ones.</p>
<h5>Step 1 — counting with known labels, written differently</h5>
<p>In note 5, \(n_Q\) = number of quarter experiments = add 1 for each quarter experiment and 0 for each nickel experiment. Likewise \(n_{QH}\) = add \(h_i\) for each quarter experiment.</p>
<h5>Step 2 — replace the 1s and 0s by the responsibilities</h5>
<p>Now experiment \(i\) is "\(r(i,Q)\) of a quarter", so it adds \(r(i,Q)\) to the quarter count, and its \(h_i\) heads count as \(r(i,Q)\cdot h_i\) quarter heads:</p>
\[\mathbb E[n_Q] = \sum_i r(i,Q),\qquad \mathbb E[n_{QH}] = \sum_i r(i,Q)\,h_i,\qquad \mathbb E[n_{QT}] = \sum_i r(i,Q)\,t_i\]
<p>and the same with \(r(i,N)\) for the nickel. These are the <b>expected counts</b>.</p>
<h5>Step 3 — the same fractions as the MLE</h5>
\[\pi_Q \leftarrow \frac{\mathbb E[n_Q]}{\mathbb E[n_Q] + \mathbb E[n_N]},\qquad p_{QH} \leftarrow \frac{\mathbb E[n_{QH}]}{\mathbb E[n_{QH}] + \mathbb E[n_{QT}]}\]
<p>Two checks that catch arithmetic slips: \(\mathbb E[n_Q] + \mathbb E[n_N]\) = number of experiments (4), and \(\mathbb E[n_{QH}] + \mathbb E[n_{QT}] = 5\cdot\mathbb E[n_Q]\), because every experiment has 5 tosses.</p>`,
      notation: [
        [R`\(\mathbb E[n_Q]\)`, R`expected number of quarter experiments \(= \sum_i r(i,Q)\)`],
        [R`\(\mathbb E[n_{QH}]\), \(\mathbb E[n_{QT}]\)`, R`expected number of quarter tosses that landed heads / tails \(= \sum_i r(i,Q)\,h_i\) / \(\sum_i r(i,Q)\,t_i\)`],
        [R`\(\leftarrow\)`, R`"is updated to"`],
      ],
      example: R`<p><b>2025-B Q5.4</b>, with the responsibilities of note 7 and the counts \(h = (3, 0, 2, 3)\), \(t = (2, 5, 3, 2)\):</p>
<ul>
<li>\(\mathbb E[n_Q] = 0.604 + 0.990 + 0.859 + 0.604 = 3.057\)</li>
<li>\(\mathbb E[n_N] = 0.396 + 0.010 + 0.141 + 0.396 = 0.943\) &nbsp;(check: \(3.057 + 0.943 = 4\) ✓)</li>
<li>\(\mathbb E[n_{QH}] = 0.604\cdot 3 + 0.990\cdot 0 + 0.859\cdot 2 + 0.604\cdot 3 = 1.812 + 0 + 1.718 + 1.812 = 5.342\)</li>
<li>\(\mathbb E[n_{QT}] = 0.604\cdot 2 + 0.990\cdot 5 + 0.859\cdot 3 + 0.604\cdot 2 = 1.208 + 4.950 + 2.577 + 1.208 = 9.943\) &nbsp;(check: \(5.342 + 9.943 = 15.285 = 5\cdot 3.057\) ✓)</li>
</ul>
<p><b>The updates:</b></p>
\[\pi_Q \leftarrow \frac{3.057}{3.057 + 0.943} = \frac{3.057}{4} = 0.764\]
\[p_{QH} \leftarrow \frac{5.342}{5.342 + 9.943} = \frac{5.342}{15.285} = 0.349\]
<p>These are the official answers. The part says there's no need to update \(p_{NH}\). For completeness, it works the same way with the nickel responsibilities:</p>
<ul>
<li>\(\mathbb E[n_{NH}] = 0.396\cdot 3 + 0.010\cdot 0 + 0.141\cdot 2 + 0.396\cdot 3 = 1.188 + 0 + 0.282 + 1.188 = 2.658\)</li>
<li>nickel tosses in total: \(5\cdot\mathbb E[n_N] = 5\cdot 0.943 = 4.715\) (heads + tails)</li>
<li>\(p_{NH} \leftarrow 2.658 / 4.715 = 0.564\)</li>
</ul>
<p class="muted">(The official solution writes \(\mathbb E[n_N] = \sum_{i=1}^{5} r(i,Q)\); it means \(\sum_{i=1}^{4} r(i,N)\) — the numbers it adds are the right ones.)</p>`,
      cue: R`"Use the responsibility values you computed in (3) to update the parameters \(\pi_Q\) and \(p_{QH}\) … Base your computations on the following four expected values" (2025-B Q5.4, 2026-A Q5.4 — there for \(\pi_G\) and \(p_S\)).`,
      first: R`Write \(\mathbb E[n_Q] = \sum_i r(i,Q) = \dots\), substituting the responsibilities from the previous part.`,
      recipe: R`Four expected counts (the exam lists which) → two fractions. Run both checks (sum = number of experiments; heads + tails = 5 × expected experiments).`,
      trap: R`Read which coin the part asks about. 2026-A Q5.4 asks for \(p_S\) (the <b>silver</b> coin), so its expected counts use \(r(i,S)\), not \(r(i,G)\).` },

    { title: "9 · E-step for a Gaussian mixture",
      idea: R`<p>Everything from notes 7–8 carries over to a GMM. Only one thing changes: the likelihood of the data under component \(j\) is no longer a coin's \(p^h(1-p)^t\) but the bell \(\phi(x_i;\mu_j,\sigma_j)\).</p>
<h5>Step 1 — the formula (on the formula sheet)</h5>
\[r(i,j) = \frac{\pi_j\,\phi(x_i;\mu_j,\sigma_j)}{\sum_{j'=1}^{k}\pi_{j'}\,\phi(x_i;\mu_{j'},\sigma_{j'})}\]
<p>The \(j'\) in the denominator is just a second letter for "every component", so the denominator adds all \(k\) terms. Same reading as note 7: <b>component \(j\)'s term, divided by the sum of all the terms</b>. Again a Bayes posterior: prior \(\pi_j\), likelihood \(\phi\), evidence \(f(x_i)\).</p>
<h5>Step 2 — you already have both pieces</h5>
<p>The numerator \(\pi_j\phi(x_i;\mu_j,\sigma_j)\) is one of the terms you wrote down in the GMM density (note 2, step 3), and the denominator is the density \(f(x_i)\) itself. So in 2026-B part 2 is part 1 plus six divisions.</p>`,
      notation: [
        [R`\(r(i,j)\)`, R`the probability that sample \(x_i\) was generated by component \(j\) (a posterior)`],
        [R`\(j'\)`, R`"j-prime": a second index running over all components, so the sum doesn't clash with the \(j\) on top`],
        [R`\(f(x_i)\)`, R`the GMM density at \(x_i\) — the denominator`],
      ],
      example: R`<p><b>2026-B Q5.2.</b> The terms \(\pi_j\phi\) and the densities \(f(x_i)\) come straight from note 2:</p>
<div class="tw"><table><thead><tr><th>\(x_i\)</th><th>\(j\)</th><th>\(\pi_j\phi(x_i;\mu_j,1)\)</th><th>\(f(x_i)\)</th><th>\(r(i,j)\)</th></tr></thead><tbody>
<tr><td>−2</td><td>1</td><td>\(0.5\cdot 0.242 = 0.121\)</td><td>0.123</td><td>\(0.121/0.123 = 0.984\)</td></tr>
<tr><td>−2</td><td>2</td><td>\(0.5\cdot 0.004 = 0.002\)</td><td>0.123</td><td>\(0.002/0.123 = 0.016\)</td></tr>
<tr><td>0</td><td>1</td><td>\(0.5\cdot 0.242 = 0.121\)</td><td>0.242</td><td>\(0.121/0.242 = 0.5\)</td></tr>
<tr><td>0</td><td>2</td><td>\(0.5\cdot 0.242 = 0.121\)</td><td>0.242</td><td>\(0.121/0.242 = 0.5\)</td></tr>
<tr><td>2</td><td>1</td><td>\(0.5\cdot 0.004 = 0.002\)</td><td>0.123</td><td>\(0.002/0.123 = 0.016\)</td></tr>
<tr><td>2</td><td>2</td><td>\(0.5\cdot 0.242 = 0.121\)</td><td>0.123</td><td>\(0.121/0.123 = 0.984\)</td></tr></tbody></table></div>
<p>This is the official table. <b>Does it make sense?</b> \(x = -2\) is 1 away from \(\mu_1 = -1\) but 3 away from \(\mu_2 = 1\), so component 1 almost surely produced it (0.984). \(x = 0\) is exactly between the two means, so it's 50/50. \(x = 2\) mirrors \(x = -2\). Each row pair adds to 1 (\(0.984 + 0.016 = 1\)).</p>`,
      cue: R`"Compute the responsibilities associated with the E step of the EM update … Specify the six responsibility values and show your intermediate calculations" (2026-B Q5.2).`,
      first: R`Copy the six terms \(\pi_j\phi(x_i;\mu_j,\sigma_j)\) and the three densities \(f(x_i)\) from part 1 into a table.`,
      recipe: R`Table with columns \(x_i\), \(j\), \(\pi_j\phi\), \(f(x_i)\), \(r = \pi_j\phi/f\). One row per (sample, component). Check each sample's responsibilities add to 1.` },

    { title: "10 · M-step for a Gaussian mixture: \\(\\pi\\), \\(\\mu\\) (and \\(\\sigma\\))",
      idea: R`<p>Where we are: note 9 split every sample between the components. Now we update the parameters, exactly like note 8, with the formula sheet's "Maximization updates".</p>
<h5>Step 1 — the expected count of each component</h5>
\[n_j = \sum_{i=1}^{n} r(i,j)\]
<p>"How many samples component \(j\) owns", counting fractions. The \(n_j\) add up to \(n\), the number of samples. This is note 8's \(\mathbb E[n_Q]\) under a new name.</p>
<h5>Step 2 — the new weights</h5>
\[\pi_j = \frac{n_j}{n}\]
<p>The share of the samples that component \(j\) owns — like \(\pi_Q = \mathbb E[n_Q]/4\) in note 8.</p>
<h5>Step 3 — the new means: a weighted average</h5>
<p>An ordinary average of three numbers is \(\frac{1\cdot x_1 + 1\cdot x_2 + 1\cdot x_3}{1 + 1 + 1}\): each sample has weight 1. For component \(j\), each sample counts only as much as component \(j\) owns it, so the weights become the responsibilities:</p>
\[\mu_j = \frac{1}{n_j}\sum_{i=1}^{n} r(i,j)\,x_i = \frac{r(1,j)\,x_1 + r(2,j)\,x_2 + \dots}{r(1,j) + r(2,j) + \dots}\]
<p>This is the K-means centroid update ("average of the points in the cluster") with soft membership.</p>
<h5>Step 4 — the new standard deviations (not asked in 2026-B, but on the formula sheet and in HW6)</h5>
<p>Same idea, one level up: the variance is the weighted average of the squared distances to the <b>new</b> mean. The formula sheet writes it for vectors as \(\Sigma_j = \frac{1}{n_j}\sum_i r(i,j)(x^{(i)}-\mu_j)(x^{(i)}-\mu_j)^\top\); in 1-D that's</p>
\[\sigma_j^2 = \frac{1}{n_j}\sum_{i=1}^{n} r(i,j)\,(x_i - \mu_j)^2\]`,
      notation: [
        [R`\(n\)`, R`number of samples (3 in 2026-B)`],
        [R`\(n_j\)`, R`expected number of samples owned by component \(j\): \(\sum_i r(i,j)\)`],
        [R`\(\frac{1}{n_j}\sum_i r(i,j)\,x_i\)`, R`weighted average of the samples, with weights \(r(i,j)\)`],
        [R`\(\Sigma_j\)`, R`covariance matrix (the multi-dimensional \(\sigma_j^2\)). In 1-D, just the variance \(\sigma_j^2\).`],
      ],
      example: R`<p><b>2026-B Q5.3</b>, with \(D = \{-2, 0, 2\}\) and the responsibilities of note 9.</p>
<p><b>Expected counts:</b></p>
<ul>
<li>\(n_1 = r(1,1) + r(2,1) + r(3,1) = 0.984 + 0.5 + 0.016 = 1.5\)</li>
<li>\(n_2 = r(1,2) + r(2,2) + r(3,2) = 0.016 + 0.5 + 0.984 = 1.5\) &nbsp;(check: \(1.5 + 1.5 = 3 = n\) ✓)</li>
</ul>
<p><b>Weights:</b> \(\pi_1 = 1.5/3 = 0.5\), \(\pi_2 = 1.5/3 = 0.5\).</p>
<p><b>Means:</b></p>
\[\begin{aligned}\mu_1 &= \frac{1}{1.5}\big(0.984\cdot(-2) + 0.5\cdot 0 + 0.016\cdot 2\big) = \frac{1}{1.5}\big(-1.968 + 0 + 0.032\big) = \frac{-1.936}{1.5} = -1.291\\[4pt] \mu_2 &= \frac{1}{1.5}\big(0.016\cdot(-2) + 0.5\cdot 0 + 0.984\cdot 2\big) = \frac{1}{1.5}\big(-0.032 + 0 + 1.968\big) = \frac{1.936}{1.5} = 1.291\end{aligned}\]
<p>Official answer: \(\pi \leftarrow (0.5, 0.5)\), \(\mu \leftarrow (-1.291, 1.291)\). (With unrounded responsibilities, 0.9837 instead of 0.984, you get ±1.290 — either is fine.) The means moved <b>outward</b>: component 1 mostly owns \(-2\) and only half-owns 0, so its average is pulled toward \(-2\).</p>
<p><b>Step 4 on the same numbers</b> (not asked here), with the new \(\mu_1 = -1.291\):</p>
<ul>
<li>\(x = -2\): \((-2 - (-1.291))^2 = (-0.709)^2 = 0.503\), times \(0.984\) → \(0.495\)</li>
<li>\(x = 0\): \((0 - (-1.291))^2 = 1.291^2 = 1.667\), times \(0.5\) → \(0.833\)</li>
<li>\(x = 2\): \((2 - (-1.291))^2 = 3.291^2 = 10.831\), times \(0.016\) → \(0.173\)</li>
</ul>
\[\sigma_1^2 = \frac{0.495 + 0.833 + 0.173}{1.5} = \frac{1.501}{1.5} = 1.001 \;\Rightarrow\; \sigma_1 \approx 1.000\]
<p>So \(\sigma\) stays ≈ 1 after this step (and \(\sigma_2\) is the same by symmetry).</p>`,
      cue: R`"Using the responsibilities you computed in (2), compute the updated values for parameters \(\pi\) and \(\mu\) after applying the M-step update. You do not need to update \(\sigma\)." (2026-B Q5.3)`,
      first: R`\(n_1 = r(1,1) + r(2,1) + r(3,1) = \dots\) — add a column of your responsibility table.`,
      recipe: R`\(n_j\) (column sums) → \(\pi_j = n_j/n\) → \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)x_i\) (one product per sample, written out) → if asked, \(\sigma_j^2\) with the <b>new</b> \(\mu_j\).`,
      table: {
        head: ["", "Coin mixture (2025-B, 2026-A)", "Gaussian mixture (2026-B)"],
        rows: [
          ["component likelihood", R`\(p_a^{h_i}(1-p_a)^{t_i}\)`, R`\(\phi(x_i;\mu_j,\sigma_j)\) — read from the table`],
          ["E-step", R`\(r(i,a) = \dfrac{\pi_a p_a^{h_i}(1-p_a)^{t_i}}{\text{sum over both coins}}\)`, R`\(r(i,j) = \dfrac{\pi_j\phi(x_i;\mu_j,\sigma_j)}{f(x_i)}\)`],
          ["expected count", R`\(\mathbb E[n_a] = \sum_i r(i,a)\)`, R`\(n_j = \sum_i r(i,j)\)`],
          ["weight update", R`\(\pi_a = \mathbb E[n_a]/n\)`, R`\(\pi_j = n_j/n\)`],
          ["parameter update", R`\(p_a = \dfrac{\sum_i r(i,a)h_i}{\sum_i r(i,a)(h_i + t_i)}\)`, R`\(\mu_j = \dfrac{\sum_i r(i,j)x_i}{n_j}\), \(\sigma_j^2 = \dfrac{\sum_i r(i,j)(x_i-\mu_j)^2}{n_j}\)`],
        ]},
      trap: R`Dividing by \(n\) (3) instead of \(n_j\) (1.5) in the mean: \(\frac{-1.936}{3} = -0.645\) is wrong. A weighted average divides by the sum of its weights.` },

    { title: "11 · Special starting points: when EM doesn't move",
      idea: R`<p>2025-B Q5.5 and the 2026-A bonus use starting values for which EM gets <b>stuck</b>. They say "this can be computed with relatively few calculations" — if you see why, the answer takes three lines.</p>
<h5>Step 1 — two identical coins give identical responsibilities</h5>
<p>Suppose both coins get the same heads-probability, \(p_{QH} = p_{NH} = p\). Then for every experiment the two joints (note 4) are</p>
\[\pi_Q\cdot p^{h_i}(1-p)^{t_i}\quad\text{and}\quad(1-\pi_Q)\cdot p^{h_i}(1-p)^{t_i}\]
<p>The same factor \(p^{h_i}(1-p)^{t_i}\) is in both, so it cancels in the responsibility: \(r(i,Q) = \pi_Q\) for <b>every</b> experiment, whatever it shows. With \(\pi_Q = 0.5\): every responsibility is 0.5. The data can't tell two identical coins apart.</p>
<h5>Step 2 — the M-step then gives both coins the overall head fraction</h5>
<p>With every \(r(i,Q) = 0.5\) and 4 experiments: \(\mathbb E[n_Q] = 0.5 + 0.5 + 0.5 + 0.5 = 2\), so \(\pi_Q \leftarrow 2/4 = 0.5\) — unchanged. (The same happens for any starting \(\pi_Q\): every responsibility equals \(\pi_Q\), so \(\mathbb E[n_Q] = 4\pi_Q\) and \(\pi_Q \leftarrow 4\pi_Q/4 = \pi_Q\).) For the heads-probability, every experiment's heads count half toward the quarter: \(\mathbb E[n_{QH}] = 0.5\cdot h_1 + \dots + 0.5\cdot h_4 = 0.5\cdot(\text{all heads})\), and likewise \(\mathbb E[n_{QT}] = 0.5\cdot(\text{all tails})\). The 0.5 cancels:</p>
\[p_{QH} \leftarrow \frac{0.5\cdot\text{all heads}}{0.5\cdot\text{all heads} + 0.5\cdot\text{all tails}} = \frac{\text{all heads}}{\text{all tosses}}\]
<p>and the same for \(p_{NH}\).</p>
<h5>Step 3 — a fixed point: EM is stuck forever</h5>
<p>After this step the two coins are still identical, so the next E-step again gives 0.5 everywhere, and so on. A <b>fixed point</b> is a parameter setting that an EM iteration returns unchanged. If you <b>start</b> with \(\pi_Q = 0.5\) and \(p_{QH} = p_{NH} = \) (all heads / all tosses), not even the first step changes anything. That's the 2026-A bonus. Lesson: EM can't break a symmetry it starts with, so never initialize components identically.</p>`,
      notation: [
        [R`fixed point`, R`parameters that one EM iteration (E-step + M-step) leaves unchanged`],
        [R`all heads / all tosses`, R`the fraction of heads over the whole dataset, ignoring coins`],
      ],
      example: R`<p><b>2025-B Q5.5:</b> start at \(\pi_Q = 0.5\), \(p_{QH} = 0.8\), \(p_{NH} = 0.8\).</p>
<p><b>E-step, experiment 1</b> (\(h = 3\), \(t = 2\)), to see step 1 happen:</p>
<ul>
<li>Q: \(0.5\cdot 0.8^3\cdot 0.2^2 = 0.5\cdot 0.512\cdot 0.04 = 0.01024\)</li>
<li>N: \(0.5\cdot 0.8^3\cdot 0.2^2 = 0.01024\) (identical)</li>
<li>\(r(1,Q) = \dfrac{0.01024}{0.01024 + 0.01024} = \dfrac{0.01024}{0.02048} = 0.5\), and the same for every experiment.</li>
</ul>
<p><b>M-step:</b></p>
<ul>
<li>\(\mathbb E[n_Q] = 0.5 + 0.5 + 0.5 + 0.5 = 2\), \(\mathbb E[n_N] = 2\) → \(\pi_Q \leftarrow \dfrac{2}{2 + 2} = 0.5\)</li>
<li>\(\mathbb E[n_{QH}] = 0.5\cdot 3 + 0.5\cdot 0 + 0.5\cdot 2 + 0.5\cdot 3 = 1.5 + 0 + 1 + 1.5 = 4\)</li>
<li>\(\mathbb E[n_{QT}] = 0.5\cdot 2 + 0.5\cdot 5 + 0.5\cdot 3 + 0.5\cdot 2 = 1 + 2.5 + 1.5 + 1 = 6\)</li>
<li>\(p_{QH} \leftarrow \dfrac{4}{4 + 6} = \dfrac{4}{10} = \mathbf{0.4}\)</li>
</ul>
<p>Check with step 2: all heads \(= 3 + 0 + 2 + 3 = 8\), all tosses \(= 20\), and \(8/20 = 0.4\) ✓. \(p_{NH}\) also becomes 0.4, so the coins stay identical and EM stays at \((0.5, 0.4, 0.4)\) forever.</p>
<p class="muted"><b>Slips in the official solution:</b> it computes \(\mathbb E[n_{QH}] = 4\) and \(\mathbb E[n_{QT}] = 6\) correctly, then writes \(4/(4+6) = 4/10 = 0.2\). But \(4/10 = 0.4\): the correct answer is <b>\(p_{QH} \leftarrow 0.4\)</b>. Its last paragraph says "similarly, we also get \(p_{QH} \leftarrow 0.2\)"; it means the <b>nickel</b>, and the correct value is \(p_{NH} \leftarrow 0.4\).</p>
<h5>2026-A Q5.5 (bonus): the same idea, backwards</h5>
<p>Here you <b>choose</b> starting values that EM won't change. From steps 1–3, the recipe is: make the coins identical, and give them the heads-fraction the M-step will produce anyway. The 2026-A data (H H T H T, T H T T T, H H H H T, T H T T H) has \(h = (3, 1, 4, 2)\), so all heads \(= 3 + 1 + 4 + 2 = 10\) out of \(4\cdot 5 = 20\) tosses: \(10/20 = 0.5\).</p>
<p>So start at \(\pi_G = 0.5\), \(p_G = p_S = 0.5\) (the official answer). Check one iteration:</p>
<ul>
<li>E-step: the coins are identical, so every \(r(i,G) = \pi_G = 0.5\) (step 1). (The official solution shows it: each joint is \(0.5\cdot 0.5^{h}\cdot 0.5^{5-h} = 0.5^6\), so \(r = 0.5^6/(0.5^6 + 0.5^6) = 0.5\).)</li>
<li>\(\mathbb E[n_G] = 0.5 + 0.5 + 0.5 + 0.5 = 2\) → \(\pi_G \leftarrow 2/4 = 0.5\) ✓</li>
<li>\(\mathbb E[n_{GH}] = 0.5\cdot 3 + 0.5\cdot 1 + 0.5\cdot 4 + 0.5\cdot 2 = 1.5 + 0.5 + 2 + 1 = 5\); gold tosses in total \(= 5\cdot\mathbb E[n_G] = 5\cdot 2 = 10\) → \(p_G \leftarrow 5/10 = 0.5\) ✓, and the same for \(p_S\).</li>
</ul>
<p>Nothing changed, so it's a fixed point. (By step 2's remark, any \(\pi_G\) with \(p_G = p_S = 0.5\) also works.) The official solution also lists degenerate options — \(\pi_G = 1\), \(p_G = 0.5\), \(p_S\) = anything (silver never owns any experiment, so its update is \(0/0\) and \(p_S\) is left as it was), or the mirror image \(\pi_G = 0\), \(p_S = 0.5\) — and says to avoid them. (Slip: its line "\(\pi_G \leftarrow 2/4 = 2\)" should read \(2/4 = 0.5\).)</p>`,
      cue: R`"Now assume that we execute one iteration after initializing with \(\pi_Q = 0.5\), \(p_{QH} = 0.8\), \(p_{NH} = 0.8\) … Note that the updated values can be computed with relatively few calculations" (2025-B Q5.5); "Suggest initial values … that would remain unchanged after an iteration" (2026-A Q5.5).`,
      first: R`Spot that the two coins are identical (\(p_{QH} = p_{NH}\)), and write "then every \(r(i,Q) = \pi_Q\)".`,
      recipe: R`Identical coins → all \(r = \pi_Q\) (0.5) → \(\pi_Q\) unchanged → both \(p\)'s = all heads / all tosses. For a fixed point, start there.` },

    { title: "12 · A GMM inside a Bayes classifier: MAP",
      idea: R`<p>Now we switch from fitting a GMM to <b>using</b> one. Recall MAP classification from the Bayes topic: to classify \(x\), compute for each class \(y\)</p>
\[\pi_y\cdot f(x \mid Y = y)\qquad\text{(class prior} \times \text{ class-conditional density)}\]
<p>and predict the class with the <b>largest</b> value. (The full posterior would divide both by the same \(f(x)\), which doesn't change which is larger.)</p>
<h5>Step 1 — what's new: the class density can be a GMM</h5>
<p>In the Bayes topic, \(f(x\mid Y=y)\) was a single simple distribution, such as one Gaussian bell. But a class's data may form several clusters, e.g. class A with values around \(-2\) <b>and</b> around \(+2\). One bell fits that badly; a GMM fits it well. The MAP rule doesn't change at all: you just evaluate \(f(x\mid Y=A)\) as a GMM density, exactly as in note 2.</p>
<h5>Step 2 — two kinds of \(\pi\), don't mix them up</h5>
<ul>
<li>\(\pi_A, \pi_B\): the <b>class priors</b> (how common each class is).</li>
<li>The weights inside class A's GMM (here \(\frac12, \frac12\)): how class A's samples split between its two clusters.</li>
</ul>
<p>Both appear in the product: \(\pi_A\cdot\big[\tfrac12\phi(x;-2,1) + \tfrac12\phi(x;2,1)\big]\).</p>`,
      notation: [
        [R`\(f(x\mid Y=y)\)`, R`class-conditional density: how likely \(x\) is among samples of class \(y\)`],
        [R`\(\pi_y\)`, R`prior of class \(y\) (here \(\pi_A = \pi_B = 0.5\))`],
        [R`\(f(x, Y=y) = \pi_y f(x\mid Y=y)\)`, R`the joint density — the number MAP compares`],
      ],
      example: R`<p><b>2026-B Q5.4:</b> \(f(x\mid A) = \frac12\phi(x;-2,1) + \frac12\phi(x;2,1)\) (a GMM), \(f(x\mid B) = \phi(x;0,1)\) (one bell), \(\pi_A = \pi_B = 0.5\). \(\phi\) values from the table of note 1.</p>
<p><b>\(x = 0\).</b> Distances: \(0 - (-2) = 2\), \(0 - 2 = -2\) (distance 2), \(0 - 0 = 0\).</p>
\[\begin{aligned} f(0, A) &= \pi_A\big[\tfrac12\phi(0;-2,1) + \tfrac12\phi(0;2,1)\big] = 0.5\,\big[0.5\cdot 0.054 + 0.5\cdot 0.054\big] = 0.5\,\big[0.027 + 0.027\big] = 0.5\cdot 0.054 = 0.027\\ f(0, B) &= \pi_B\,\phi(0;0,1) = 0.5\cdot 0.399 = 0.200\end{aligned}\]
<p>\(0.027 \lt 0.200\) → predict <b>B</b>.</p>
<p><b>\(x = 2\).</b> Distances: \(2 - (-2) = 4\), \(2 - 2 = 0\), \(2 - 0 = 2\).</p>
\[\begin{aligned} f(2, A) &= 0.5\,\big[0.5\cdot 0.0001 + 0.5\cdot 0.399\big] = 0.5\,\big[0.00005 + 0.1995\big] = 0.5\cdot 0.19955 = 0.100\\ f(2, B) &= 0.5\cdot\phi(2;0,1) = 0.5\cdot 0.054 = 0.027\end{aligned}\]
<p>\(0.100 \gt 0.027\) → predict <b>A</b>.</p>
<p>These are the official answers. Intuition: \(x = 0\) is right between class A's two clusters (2 from each) but at the centre of B's bell; \(x = 2\) is at the centre of one of A's clusters.</p>
<p class="muted">(Slip in the official solution: for the second point its last line says "Because \(f(x=0, Y=A) \gt f(x=0, Y=B)\)"; it means \(f(x=2, Y=A) \gt f(x=2, Y=B)\), i.e. \(0.100 \gt 0.027\).)</p>`,
      cue: R`"Assume the following univariate conditional densities … the conditional for class A is a GMM … Assume uniform class priors and use the MAP rule to predict a class label for each of the two samples" (2026-B Q5.4).`,
      first: R`Write "\(f(x, A) = \pi_A f(x\mid A)\)" and "\(f(x, B) = \pi_B f(x\mid B)\)" for the first \(x\), then fill in \(\phi\) from the table.`,
      recipe: R`For each \(x\): distances to every mean → \(\phi\) from the table → class A's GMM (weights × \(\phi\), added) → times the prior → same for B → pick the larger.`,
      trap: R`Forgetting one of the two layers of weights: the class prior \(\pi_A = 0.5\) <b>and</b> the GMM weights \(\frac12\) both multiply. (With equal priors, forgetting \(\pi_A\) on both sides doesn't change the winner, but it loses the intermediate-calculation points.)` },

    { title: "13 · Naive Bayes with univariate GMMs: when does it make sense?",
      idea: R`<p>Note 12 had one feature. With two features \(x = (x_1, x_2)\), MAP needs a <b>2-D</b> class density \(f(x_1, x_2\mid Y=y)\). Fitting a 2-D density is harder than fitting 1-D ones. Naive Bayes makes it easy with one assumption.</p>
<h5>Step 1 — the naive assumption</h5>
<p>Within each class, the features are <b>independent</b> ("conditionally independent given the class"). Then the 2-D density is the product of two 1-D densities:</p>
\[f(x_1, x_2 \mid Y=y) = f(x_1\mid Y=y)\times f(x_2\mid Y=y)\]
<h5>Step 2 — each 1-D density is a GMM</h5>
<p>In HW6 (<code>NaiveBayesGMM</code>) you fitted one univariate GMM per (class, feature) pair — four GMMs for 2 classes × 2 features, \(\mathrm{GMM}_{y,1}\) and \(\mathrm{GMM}_{y,2}\) — and predicted \(\arg\max_y \pi_y\,\mathrm{GMM}_{y,1}(x_1)\,\mathrm{GMM}_{y,2}(x_2)\) (in logs).</p>
<h5>Step 3 — what a product of two GMMs looks like</h5>
<p>Say class A's \(x_1\) values have clusters around \(a\) and \(b\), and its \(x_2\) values around \(c\) and \(d\). The product is large wherever <b>both</b> factors are large: at <b>all four combinations</b> \((a,c), (a,d), (b,c), (b,d)\). So a naive Bayes class density always looks like an axis-aligned <b>grid of blobs</b>. It can't make a diagonal (tilted) cloud, and it can't pick "only \((a,c)\) and \((b,d)\)". The lecture calls this "what naive Bayes sees".</p>
<h5>Step 4 — the test for a scatter plot</h5>
<ol>
<li>For each class, <b>project</b> its points onto the \(x_1\) axis: how many clusters, and where are their centres? That's \(\mathrm{GMM}_{y,1}\) (number of components and means).</li>
<li>Same on the \(x_2\) axis → \(\mathrm{GMM}_{y,2}\).</li>
<li>Draw the grid of all combinations (step 3).</li>
<li>Does the grid match where the class's points really are? <b>Yes</b> → naive Bayes makes sense; describe the four GMMs. <b>No</b> — the grid puts density where the class has no points (worst: where the other class is), or the cloud is tilted/curved → the independence assumption fails; name a point where the product is large but the true density is ≈ 0.</li>
</ol>`,
      notation: [
        [R`conditional independence`, R`given the class, knowing \(x_1\) tells you nothing about \(x_2\): \(f(x_1,x_2\mid y) = f(x_1\mid y)f(x_2\mid y)\)`],
        [R`marginal \(f(x_1\mid Y=y)\)`, R`the 1-D density of feature 1 within class \(y\) — the projection of the class's points onto the \(x_1\) axis`],
        [R`\(\mathrm{GMM}_{y,t}\)`, R`the univariate GMM fitted to feature \(t\) of class \(y\)`],
      ],
      example: R`<p><b>2026-B Q5.5</b>: three scatter plots, two classes (A = circles, B = crosses).</p>
<p><b>(a) Makes sense.</b> Class A has four blobs, at about \((-3, 2), (-3, -2), (1, 2), (1, -2)\). Projected: \(x_1\) clusters at −3 and 1, \(x_2\) clusters at −2 and 2. The grid of combinations is exactly the four blobs. Class B's blobs are at about \((1.2, 1), (3.2, 1), (1.2, -3), (3.2, -3)\) — again a full grid. So four GMMs with <b>2 components</b> each (official answer):</p>
<ul>
<li>\(\mathrm{GMM}_{A,1}(x_1)\): means ≈ −3 and 1</li>
<li>\(\mathrm{GMM}_{A,2}(x_2)\): means ≈ −2 and 2</li>
<li>\(\mathrm{GMM}_{B,1}(x_1)\): means ≈ 1.2 and 3.2</li>
<li>\(\mathrm{GMM}_{B,2}(x_2)\): means ≈ −3 and 1</li>
</ul>
<p><b>(b) Doesn't make sense.</b> Class A sits at \((2, 2)\) and \((-2, -2)\); class B at \((-2, 2)\) and \((2, -2)\) — an "XOR" pattern. Project class A: \(x_1\) has clusters at −2 and 2, \(x_2\) too. The grid of combinations is all four corners, including \((2,-2)\) and \((-2,2)\), where A has <b>no</b> points (they're B's). Class B's projections are the same, so its grid is the same four corners. Naive Bayes gives the two classes (almost) the same density everywhere and can't separate them — the lecture's "Limitations of naive Bayes" example. The official argument: \(f(x=(2,-2)\mid A)\) should be ≈ 0, but \(f(x_1 = 2\mid A)\) and \(f(x_2 = -2\mid A)\) are both clearly positive, so their product isn't small. Within each class the features are strongly <b>dependent</b>.</p>
<p><b>(c) Doesn't make sense.</b> Both classes are tilted, curved bands: within a class, \(x_2\) changes with \(x_1\) (dependent features). A product of marginals can only make an axis-aligned shape, so it spreads density into empty corners. Also the two classes overlap heavily on the \(x_2\) axis, so \(x_2\)'s GMMs barely help; only \(x_1\) separates them somewhat. The official answer: the features aren't independent, and a full (2-D) Bayes model would do much better.</p>`,
      cue: R`"For each dataset (a–c), determine whether it makes sense to use a naive Bayes classifier that uses univariate GMMs. If not, state the main modeling assumptions that are not met; if yes, describe the univariate GMMs (number of components and approximate means)" (2026-B Q5.5).`,
      first: R`Write the assumption: "naive Bayes assumes \(f(x_1,x_2\mid y) = f(x_1\mid y)\,f(x_2\mid y)\) — features independent within each class." Then project each class onto each axis.`,
      recipe: R`Per plot: project each class on \(x_1\) and \(x_2\) → build the grid → grid = the real blobs? Yes: list 4 GMMs (components + means). No: name a point where the product is big but the class has no data, or say "tilted/correlated cloud".`,
      trap: R`"Makes sense" needs <b>numbers</b>: the number of components of each of the four GMMs and their approximate means. "Doesn't make sense" needs the <b>assumption</b> by name (conditional independence of the features given the class), not just "the classes overlap".` },
  ],
    hints: {
      "2025B-q5": {
        1: R`For each GMM, predict each bump's height \(\pi_j\cdot 0.399/\sigma_j\) and compare with the plots; then check the valley between the close bumps at 20 and 25 (note 3). The official solution's "midpoint at \(x = 27.5\)" is a slip for 22.5.`,
        2: R`Count: \(n_Q = 1\), \(n_N = 3\), then heads and tails for each coin type. The log-likelihood is "count × log(probability)" for six pairs, and each MLE is count / total (note 5).`,
        3: R`For experiment 1 (\(h=3, t=2\)) write joint Q \(= \pi_Q p_{QH}^3(1-p_{QH})^2\) and joint N \(= (1-\pi_Q)p_{NH}^3(1-p_{NH})^2\); \(r(1,Q)\) = joint Q / (joint Q + joint N) (note 7).`,
        4: R`\(\mathbb E[n_Q] = \sum_i r(i,Q)\) and \(\mathbb E[n_{QH}] = \sum_i r(i,Q)\,h_i\); then \(\pi_Q = \mathbb E[n_Q]/4\), \(p_{QH} = \mathbb E[n_{QH}]/(\mathbb E[n_{QH}] + \mathbb E[n_{QT}])\) (note 8). The official solution labels \(\mathbb E[n_N]\) as "\(\sum_{i=1}^{5} r(i,Q)\)" — it means \(\sum_{i=1}^{4} r(i,N)\).`,
        5: R`Notice \(p_{QH} = p_{NH}\): the two coins are identical, so write "every \(r(i,Q) = \pi_Q = 0.5\)" and go straight to the M-step (note 11). Careful: the official solution ends with \(4/10 = 0.2\); that's a slip — \(4/10 = 0.4\), for both \(p_{QH}\) and \(p_{NH}\).`,
      },
      "2026A-q5": {
        1: R`Predict each bump's height \(\pi_j\cdot 0.399/\sigma_j\) for both GMMs (GMM2 has one bump of 0.16), then check the valley between 15 and 20 (note 3). The official solution's "\(\sigma_1 = \sigma_2 = 0.2\)" for GMM2 is a slip for 2.`,
        2: R`Gold = experiments 1 and 3, silver = 2 and 4. \(\pi_G = 2/4\); \(p_G\) = gold heads / 10 gold tosses; \(p_S\) = silver heads / 10 silver tosses (note 5).`,
        3: R`Count heads: 3, 1, 4, 2. For each experiment, joint G \(= 0.8\cdot 0.2^{h}0.8^{t}\) and joint S \(= 0.2\cdot 0.8^{h}0.2^{t}\), then divide by their sum (note 7).`,
        4: R`Start with \(\mathbb E[n_G] = \sum_i r(i,G)\) and \(\mathbb E[n_S] = \sum_i r(i,S)\) for \(\pi_G\). This part asks for \(p_S\), so the head/tail counts use the <b>silver</b> responsibilities: \(\mathbb E[n_{SH}] = \sum_i r(i,S)\,h_i\), \(\mathbb E[n_{ST}] = \sum_i r(i,S)\,t_i\) (note 8).`,
        5: R`Ask: which starting values make the E-step unable to tell gold from silver? (Note 11, steps 1–3.) Then count all heads in the four experiments to see what the M-step would set both \(p\)'s to. The official solution's "\(2/4 = 2\)" is a slip for 0.5.`,
      },
      "2026B-q5": {
        1: R`Don't compute \(\phi\) — read it: for each sample and each mean, write \(x - \mu\) and take the table value. \(f(x) = 0.5\,\phi(x;-1,1) + 0.5\,\phi(x;1,1)\) (notes 1–2).`,
        2: R`\(r(i,j) = \pi_j\phi(x_i;\mu_j,\sigma_j)/f(x_i)\): the numerators are the terms you wrote in part 1 and the denominators are part 1's answers (note 9).`,
        3: R`\(n_j = \sum_i r(i,j)\), \(\pi_j = n_j/3\), \(\mu_j = \frac{1}{n_j}\sum_i r(i,j)\,x_i\) — formula sheet, "Maximization updates" (note 10).`,
        4: R`Compare \(\pi_A f(x\mid A)\) with \(\pi_B f(x\mid B)\); \(f(x\mid A)\) is a GMM: \(\frac12\phi(x;-2,1) + \frac12\phi(x;2,1)\), with \(\phi\) from the table (note 12). The official solution's last line writes \(x = 0\) where it means \(x = 2\).`,
        5: R`Naive Bayes assumes \(f(x_1,x_2\mid y) = f(x_1\mid y)f(x_2\mid y)\). Project each class onto each axis, build the grid of combinations, and compare it with the real blobs (note 13).`,
      },
    },
  };
})();
