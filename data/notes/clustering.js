// Notes for topic "clustering". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["clustering"] = {
  intro: R`<p>Clustering was a full 25-point question in three of the five past exams (2025-A Q2, 2025-C Q5, 2026-A Q4). The parts repeat: <b>run one K-means iteration</b> (assign → update → WCSS before and after) → <b>what happens in another iteration?</b> → one "understanding" part (why two runs differ, how to compare solutions, choosing \(k\), a range of starting centroids, a modified objective, a possible \(k = 3\) solution) → <b>agglomerative clustering by hand</b> (single or complete linkage, Manhattan distance) → <b>fill in K-means code</b>.</p>
<p><b>How to use the notes:</b> read them in order — each one builds on the one before. Every note explains the idea in plain words, decodes the symbols, and works a full example with real exam numbers. The guided question is <b>2025-A Q2</b>: its ten-point dataset is used for comparing solutions, the elbow method and agglomerative clustering. 2025-A has no "run one iteration" part, so the K-means mechanics (notes 2–5) are worked on the six points of <b>2025-C Q5</b>, the real exam part that asks exactly that. <b>2026-A Q4</b> you then do on your own: every one of its parts repeats a kind of part worked here.</p>
<p>K-means is also the stepping stone to the next topic, GMM/EM. Note 14 shows that K-means is EM with "hard" 0-or-1 assignments, so read it before you start GMM.</p>`,
  moves: [
    { title: "0 · Start here: what clustering is, and the symbols",
      idea: R`<p>In every topic so far, the table had a <b>label</b> \(y\) for each sample, and the job was to learn to predict it. In clustering there is <b>no label at all</b>: the table has only the features (in the exams, two numbers \(x_1, x_2\) per sample, so every sample is a point on a 2-D plot).</p>
<p>The job is to split the samples into \(k\) groups, called <b>clusters</b>, so that</p>
<ul>
<li>samples in the <b>same</b> cluster are close to each other, and</li>
<li>samples in <b>different</b> clusters are far apart.</li>
</ul>
<p>Nobody tells the algorithm what the right groups are; it has to find them from the positions of the points alone. (That's why clustering is called <i>unsupervised</i> learning.)</p>
<p>Two algorithms appear on the exam:</p>
<ul>
<li><b>K-means</b> (notes 1–9). You choose the number of clusters \(k\) in advance. Each cluster is represented by one point, its <b>centroid</b> (its centre). The algorithm moves the \(k\) centroids around until each one sits in the middle of its own group of samples.</li>
<li><b>Agglomerative clustering</b> (notes 10–12). Start with every sample as its own cluster, then repeatedly glue together the two closest clusters until only one is left. The record of these merges gives a solution for every \(k\) at once.</li>
</ul>`,
      notation: [
        [R`\(n\)`, "number of samples (rows in the table)"],
        [R`\(k\)`, "number of clusters we want"],
        [R`\(x^{(i)}\)`, R`sample \(i\) as a point, e.g. \(x^{(3)} = (4, 4)\). The \((i)\) up top is the row number, not a power. (2025-A's formulas write it \(x_i\) — same thing.)`],
        [R`\(C_j\)`, R`cluster number \(j\): the <b>set of sample numbers</b> that belong to it, e.g. \(C_2 = \{3,4,5,6,7\}\)`],
        [R`\(i \in C_j\)`, R`"sample \(i\) is in cluster \(j\)". Under a \(\sum\), "\(\sum_{i \in C_j}\)" means "add over the samples of cluster \(j\) only".`],
        [R`\(|C_j|\)`, R`the <b>size</b> of cluster \(j\): how many samples it has, e.g. \(|\{3,4,5,6,7\}| = 5\)`],
        [R`\(\mu_j\) ("mu j")`, R`the <b>centroid</b> of cluster \(j\): a point, the centre that represents the cluster`],
      ],
      example: R`<p><b>The guided dataset</b> (2025-A Q2): ten samples in \(\mathbb{R}^2\) (the plane).</p>
<div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead><tbody>
<tr><td>\(x_1\)</td><td>1</td><td>1.5</td><td>4</td><td>4.5</td><td>4.5</td><td>6</td><td>7</td><td>9.5</td><td>10</td><td>11</td></tr>
<tr><td>\(x_2\)</td><td>1</td><td>2</td><td>4</td><td>4.5</td><td>5</td><td>5</td><td>6</td><td>7.5</td><td>8</td><td>9</td></tr></tbody></table></div>
<p>On the question's scatter plot you can see three groups by eye: samples 1–2 bottom left, samples 3–7 in the middle, samples 8–10 top right. Written as clusters (this is the official solution's description of the dataset):</p>
\[C_1 = \{1, 2\},\qquad C_2 = \{3, 4, 5, 6, 7\},\qquad C_3 = \{8, 9, 10\}\]
<p>Here \(k = 3\), \(|C_1| = 2\), \(|C_2| = 5\), \(|C_3| = 3\), and "\(4 \in C_2\)" says sample 4 is in the middle group. The algorithms in these notes are ways of finding such groups <b>without</b> looking at the plot.</p>` },

    { title: "1 · Distance between two points: the (squared) Euclidean distance",
      idea: R`<p>"Close" and "far" need a number. For K-means the course uses the ordinary straight-line distance, the <b>Euclidean distance</b> (it's on the formula sheet). It is Pythagoras: subtract the two points coordinate by coordinate, square each difference, add, take the square root.</p>
<h5>Step 1 — the formula</h5>
<p>For two points \(x = (x_1, x_2)\) and \(\mu = (\mu_1, \mu_2)\):</p>
\[\|x - \mu\| = \sqrt{(x_1 - \mu_1)^2 + (x_2 - \mu_2)^2}\]
<h5>Step 2 — drop the square root: the squared distance</h5>
<p>K-means almost always works with the <b>squared</b> distance \(\|x - \mu\|^2 = (x_1 - \mu_1)^2 + (x_2 - \mu_2)^2\) — the same thing without the root. Two reasons:</p>
<ul>
<li>The score K-means minimises (WCSS, note 4) is built from squared distances, so you need them anyway.</li>
<li>To find the <b>nearest</b> centroid, squared distances give the same answer: if \(a \lt  b\) then \(\sqrt a \lt  \sqrt b\). The winner doesn't change, and you avoid roots.</li>
</ul>`,
      notation: [
        [R`\(\|x - \mu\|\)`, R`Euclidean (\(L_2\)) distance between the points \(x\) and \(\mu\)`],
        [R`\(\|x - \mu\|^2\)`, R`squared distance \(= (x_1-\mu_1)^2 + (x_2-\mu_2)^2\): no square root`],
      ],
      example: R`<p>2025-C Q5: sample 5 is \(x^{(5)} = (6.5, 7)\) and the question's second starting centroid is \(\mu_2 = (6, 6)\).</p>
<ul>
<li>Differences: \(6.5 - 6 = 0.5\) and \(7 - 6 = 1\)</li>
<li>Squared distance: \(0.5^2 + 1^2 = 0.25 + 1 = 1.25\)</li>
<li>Distance: \(\sqrt{1.25} \approx 1.118\)</li>
</ul>
<p>The same sample against the first centroid \(\mu_1 = (1, 1)\):</p>
<ul>
<li>Differences: \(6.5 - 1 = 5.5\) and \(7 - 1 = 6\)</li>
<li>Squared distance: \(5.5^2 + 6^2 = 30.25 + 36 = 66.25\)</li>
</ul>
<p>\(1.25 \lt  66.25\), so sample 5 is nearer to \(\mu_2\). (2026-A's official solution writes plain distances with roots, like \(8\sqrt2\); comparing squared distances gives the same nearest centroid.)</p>`,
      trap: R`Adding the differences before squaring: \((0.5 + 1)^2 = 2.25\) is <b>not</b> the squared distance. Square each coordinate difference first, then add.` },

    { title: "2 · K-means step A: assign every sample to its nearest centroid",
      idea: R`<p><b>Where we are:</b> we want \(k\) groups and we have \(k\) centroids \(\mu_1, \dots, \mu_k\). At the very start the centroids are just guesses — in the exam they are given ("initial centroid locations"), in code they are usually random samples.</p>
<p><b>What step A does:</b> every sample joins the cluster of the centroid it is closest to. Nothing else.</p>
<h5>Step 1 — a distance table</h5>
<p>Make a table with one row per sample and one column per centroid. In each cell write the squared distance (note 1) from that sample to that centroid.</p>
<h5>Step 2 — the smallest entry in each row</h5>
<p>In each row, circle the smallest number. Its column is the sample's cluster.</p>
<h5>Step 3 — collect the clusters</h5>
<p>\(C_j\) = all samples whose circled entry is in column \(j\). In symbols, sample \(i\) goes to</p>
\[\arg\min_j \ \|x^{(i)} - \mu_j\|^2\]
<p>"\(\arg\min_j\)" means "the \(j\) that gives the smallest value" — not the smallest value itself, but <b>which</b> centroid achieves it.</p>`,
      notation: [
        [R`\(\arg\min_j f(j)\)`, R`the index \(j\) at which \(f(j)\) is smallest ("which one wins", not "how small")`],
        [R`\(\mu_j\)`, R`the current position of centroid \(j\)`],
      ],
      example: R`<p><b>2025-C Q5.1</b>: six samples, \(k = 2\), starting centroids \(\mu_1 = (1, 1)\) and \(\mu_2 = (6, 6)\).</p>
<div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody>
<tr><td>\(x^{(i)}\)</td><td>(1, 1)</td><td>(1, 2)</td><td>(2, 1)</td><td>(6, 6)</td><td>(6.5, 7)</td><td>(7, 6.5)</td></tr></tbody></table></div>
<p><b>Squared distance to each centroid, one line per sample:</b></p>
<ul>
<li>Sample 1 \((1,1)\): to \(\mu_1\): \((1-1)^2 + (1-1)^2 = 0 + 0 = 0\). To \(\mu_2\): \((1-6)^2 + (1-6)^2 = 25 + 25 = 50\). → \(\mu_1\)</li>
<li>Sample 2 \((1,2)\): to \(\mu_1\): \((1-1)^2 + (2-1)^2 = 0 + 1 = 1\). To \(\mu_2\): \((1-6)^2 + (2-6)^2 = 25 + 16 = 41\). → \(\mu_1\)</li>
<li>Sample 3 \((2,1)\): to \(\mu_1\): \((2-1)^2 + (1-1)^2 = 1 + 0 = 1\). To \(\mu_2\): \((2-6)^2 + (1-6)^2 = 16 + 25 = 41\). → \(\mu_1\)</li>
<li>Sample 4 \((6,6)\): to \(\mu_1\): \((6-1)^2 + (6-1)^2 = 25 + 25 = 50\). To \(\mu_2\): \((6-6)^2 + (6-6)^2 = 0\). → \(\mu_2\)</li>
<li>Sample 5 \((6.5,7)\): to \(\mu_1\): \(5.5^2 + 6^2 = 30.25 + 36 = 66.25\). To \(\mu_2\): \(0.5^2 + 1^2 = 0.25 + 1 = 1.25\). → \(\mu_2\)</li>
<li>Sample 6 \((7,6.5)\): to \(\mu_1\): \(6^2 + 5.5^2 = 36 + 30.25 = 66.25\). To \(\mu_2\): \(1^2 + 0.5^2 = 1 + 0.25 = 1.25\). → \(\mu_2\)</li>
</ul>
<p>The same numbers as a table (the winning entry of each row in bold):</p>
<div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody>
<tr><td>\(\|x^{(i)} - \mu_1\|^2\)</td><td><b>0</b></td><td><b>1</b></td><td><b>1</b></td><td>50</td><td>66.25</td><td>66.25</td></tr>
<tr><td>\(\|x^{(i)} - \mu_2\|^2\)</td><td>50</td><td>41</td><td>41</td><td><b>0</b></td><td><b>1.25</b></td><td><b>1.25</b></td></tr></tbody></table></div>
<p><b>Result:</b> \(C_1 = \{1, 2, 3\}\), \(C_2 = \{4, 5, 6\}\) — the official answer "samples 1–3 get assigned to \(\mu_1\) and samples 4–6 to \(\mu_2\)".</p>`,
      cue: R`"Run one iteration of K-means … Assign each sample to a centroid" (2025-C Q5.1, 2026-A Q4.1).`,
      first: R`Draw the distance table: samples as columns (or rows), one line per centroid. Fill it with squared distances.`,
      trap: R`Keep this table — the bold entries are reused in note 4 for "WCSS before the update". Don't recompute them.` },

    { title: "3 · K-means step B: move each centroid to the mean of its samples",
      idea: R`<p><b>Where we are:</b> after step A every sample belongs to a cluster, but the centroids are still at their old guessed positions. <b>What we want:</b> each centroid should sit in the middle of its own cluster.</p>
<h5>Step 1 — "middle" means the mean</h5>
<p>The new centroid of cluster \(j\) is the <b>average</b> of its samples (this formula is on the formula sheet):</p>
\[\mu_j = \frac{1}{|C_j|}\sum_{i \in C_j} x^{(i)}\]
<p>Averaging points means averaging <b>each coordinate separately</b>: the new \(x_1\)-coordinate is the average of the samples' \(x_1\)'s, and the same for \(x_2\).</p>
<h5>Step 2 — why the mean, and not some other centre?</h5>
<p>Because the mean is the point with the <b>smallest total squared distance</b> to the cluster's samples — exactly what K-means is trying to make small (note 4). You can check this with a derivative. Take one coordinate. If the cluster's values in that coordinate are \(v_1, \dots, v_m\) and we put the centre at \(c\), the total squared distance in that coordinate is</p>
\[f(c) = (v_1 - c)^2 + \dots + (v_m - c)^2\]
<p>Chain rule on each bracket: \(f'(c) = -2(v_1 - c) - \dots - 2(v_m - c) = -2\big((v_1 + \dots + v_m) - m\,c\big)\). Setting \(f'(c) = 0\) gives \(c = \dfrac{v_1 + \dots + v_m}{m}\) — the average.</p>
<h5>Step 3 — an empty cluster</h5>
<p>If no sample chose centroid \(j\) in step A, \(|C_j| = 0\) and the mean is undefined (division by zero). The question or the code then gives a rule: keep the old centroid (2025-C's code) or move it onto a randomly chosen sample (2026-A's code and your HW6).</p>`,
      notation: [
        [R`\(\dfrac{1}{|C_j|}\sum_{i \in C_j} x^{(i)}\)`, R`"add up the samples of cluster \(j\) and divide by how many there are" = their average`],
      ],
      example: R`<p><b>2025-C Q5.1, continued.</b> From note 2: \(C_1 = \{1,2,3\}\), \(C_2 = \{4,5,6\}\).</p>
<p><b>Why the mean, with this cluster's numbers:</b> the \(x_1\)-values of \(C_1\) are 1, 1, 2. So \(f(c) = (1-c)^2 + (1-c)^2 + (2-c)^2\) and</p>
\[f'(c) = -2(1-c) - 2(1-c) - 2(2-c) = -2(1 + 1 + 2 - 3c) = -2(4 - 3c)\]
<p>which is 0 at \(c = \tfrac43\): the average of 1, 1, 2.</p>
<p><b>New \(\mu_1\)</b> (average of samples 1, 2, 3):</p>
\[\mu_1 = \tfrac13\big((1,1) + (1,2) + (2,1)\big) = \left(\tfrac{1+1+2}{3},\ \tfrac{1+2+1}{3}\right) = \left(\tfrac43,\ \tfrac43\right)\]
<p><b>New \(\mu_2\)</b> (average of samples 4, 5, 6):</p>
\[\mu_2 = \tfrac13\big((6,6) + (6.5,7) + (7,6.5)\big) = \left(\tfrac{6+6.5+7}{3},\ \tfrac{6+7+6.5}{3}\right) = \left(\tfrac{19.5}{3},\ \tfrac{19.5}{3}\right) = (6.5,\ 6.5)\]
<p>These are the official centroids. One K-means <b>iteration</b> = step A + step B.</p>`,
      cue: R`"Update the centroid locations" (2025-C Q5.1, 2026-A Q4.1).`,
      first: R`For each cluster write \(\mu_j = \frac{1}{|C_j|}(\ldots + \ldots + \ldots)\) listing its samples, then average each coordinate.`,
      trap: "Dividing by the total number of samples n instead of the cluster size. Keep fractions (4/3, not 1.33) — the WCSS in note 4 then comes out exact." },

    { title: "4 · WCSS: one number that scores a clustering — before and after the update",
      idea: R`<p><b>Where we are:</b> we can run an iteration. <b>What we want:</b> a way to say how good a clustering is, so we can see that the iteration helped and compare different clusterings. <b>The idea:</b> a good clustering has every sample close to its own centroid. So add up, over all samples, the squared distance to their own centroid. Small total = tight clusters.</p>
<h5>Step 1 — the formula (on the formula sheet)</h5>
\[\text{WCSS} = \sum_{j=1}^{k}\ \sum_{i \in C_j} \|x^{(i)} - \mu_j\|^2\]
<p>WCSS = "within-cluster sum of squares". Read the double sum from the inside out: the inner sum goes over the samples of <b>one</b> cluster \(j\) and adds their squared distances to that cluster's centroid \(\mu_j\); the outer sum adds these per-cluster totals over all \(k\) clusters. Every sample appears exactly once.</p>
<h5>Step 2 — "before" and "after" the update</h5>
<p>The exams ask for WCSS twice in one iteration:</p>
<ul>
<li><b>Before the update</b>: with the clusters from step A but the <b>old</b> centroids. Each sample's term is the smallest entry of its row in the step-A table — you already computed it.</li>
<li><b>After the update</b>: same clusters, the <b>new</b> centroids (the means from step B). This needs new squared distances.</li>
</ul>
<p>"After" is always ≤ "before", because the mean is the best possible centre for each cluster (note 3).</p>`,
      notation: [
        [R`WCSS`, R`within-cluster sum of squares: \(\sum_j \sum_{i\in C_j}\|x^{(i)} - \mu_j\|^2\)`],
        [R`\(\sum_{j=1}^{k}\sum_{i \in C_j}\)`, R`"for each cluster \(j\), for each sample \(i\) in it" — i.e. every sample once, measured against its own centroid`],
      ],
      example: R`<p><b>2025-C Q5.1, WCSS before the update</b> (old centroids \((1,1)\), \((6,6)\)). The bold entries of note 2's table, in sample order:</p>
\[\text{WCSS}_{\text{before}} = \underbrace{0 + 1 + 1}_{C_1\text{ to }(1,1)} + \underbrace{0 + 1.25 + 1.25}_{C_2\text{ to }(6,6)} = 2 + 2.5 = 4.5\]
<p><b>WCSS after the update</b> (new centroids \(\mu_1 = (\tfrac43, \tfrac43)\), \(\mu_2 = (6.5, 6.5)\)), one line per sample:</p>
<ul>
<li>Sample 1 \((1,1)\): \((1 - \tfrac43)^2 + (1 - \tfrac43)^2 = (-\tfrac13)^2 + (-\tfrac13)^2 = \tfrac19 + \tfrac19 = \tfrac29\)</li>
<li>Sample 2 \((1,2)\): \((1 - \tfrac43)^2 + (2 - \tfrac43)^2 = (-\tfrac13)^2 + (\tfrac23)^2 = \tfrac19 + \tfrac49 = \tfrac59\)</li>
<li>Sample 3 \((2,1)\): \((2 - \tfrac43)^2 + (1 - \tfrac43)^2 = (\tfrac23)^2 + (-\tfrac13)^2 = \tfrac49 + \tfrac19 = \tfrac59\)</li>
<li>Sample 4 \((6,6)\): \((6 - 6.5)^2 + (6 - 6.5)^2 = 0.25 + 0.25 = 0.5\)</li>
<li>Sample 5 \((6.5,7)\): \((6.5 - 6.5)^2 + (7 - 6.5)^2 = 0 + 0.25 = 0.25\)</li>
<li>Sample 6 \((7,6.5)\): \((7 - 6.5)^2 + (6.5 - 6.5)^2 = 0.25 + 0 = 0.25\)</li>
</ul>
\[\text{WCSS}_{\text{after}} = \underbrace{\tfrac29 + \tfrac59 + \tfrac59}_{=\,\frac{12}{9}\,=\,\frac43} + \underbrace{0.5 + 0.25 + 0.25}_{=\,1} = \tfrac43 + 1 = \tfrac73 = 2\tfrac13 \approx 2.33\]
<p>Both match the official solution (4.5 and \(2\tfrac13\)). The update lowered WCSS from 4.5 to 2.33, as promised.</p>`,
      cue: R`"Compute WCSS before and after the update of the centroid locations" (2025-C Q5.1, 2026-A Q4.1).`,
      first: R`Before: add the smallest entry of each row of your step-A table. After: a new line per sample against its new centroid.`,
      recipe: R`Assign (table, row minimum) → WCSS before = sum of the row minimums → means → WCSS after = sum of squared distances to the new means. Write every intermediate line: each one is partial credit.`,
      trap: R`Mixing the two: "before" uses the <b>new clusters</b> with the <b>old</b> centroids; "after" uses the same clusters with the <b>new</b> centroids. And WCSS adds <b>squared</b> distances — if your table has roots (like \(8\sqrt2\)), square them first.` },

    { title: "5 · Convergence: WCSS never goes up, and \"what happens in another iteration?\"",
      idea: R`<p><b>Where we are:</b> one iteration = step A (assign) + step B (update). <b>The full algorithm</b> just repeats them: A, B, A, B, … until nothing changes any more. This note explains why that loop always stops, and how to tell that it has stopped.</p>
<h5>Step 1 — step A can only lower WCSS</h5>
<p>Hold the centroids fixed. In WCSS each sample contributes its squared distance to <b>its</b> centroid. Step A lets each sample switch to the nearest centroid, so each sample's term either stays the same or gets smaller.</p>
<h5>Step 2 — step B can only lower WCSS</h5>
<p>Now hold the clusters fixed. Step B moves each centroid to the mean, and the mean is the centre with the smallest total squared distance (note 3). So each cluster's part of WCSS stays the same or gets smaller.</p>
<h5>Step 3 — so the loop must stop</h5>
<p>WCSS never goes up. There are only finitely many ways to split \(n\) samples into \(k\) groups, and an assignment that lowered WCSS can never come back (that would need WCSS to go back up). So after finitely many iterations the assignment stops changing. That is <b>convergence</b>.</p>
<h5>Step 4 — how to recognise a converged solution</h5>
<p>Run step A with the current centroids. If <b>no sample switches cluster</b>, step B computes the same means, so the centroids don't move, and WCSS is unchanged. From then on every iteration is identical. A converged solution is a <b>fixed point</b>: every sample is already nearest to its own cluster's mean.</p>
<h5>Step 5 — converged does not mean best</h5>
<p>K-means only ever goes downhill, so it stops in the first "valley" it reaches — a <b>local</b> minimum of WCSS, not necessarily the lowest possible WCSS. Note 6 is about what this means in practice.</p>`,
      notation: [
        [R`iteration`, R`one step A followed by one step B`],
        [R`converged / fixed point`, R`running another iteration changes nothing: same clusters, same centroids, same WCSS`],
        [R`local minimum`, R`no single step can lower WCSS any more, although a completely different clustering might have a lower WCSS`],
      ],
      example: R`<p><b>2025-C Q5.2</b>: "What would happen to the WCSS if we ran a second iteration?" Redo step A with the new centroids \(\mu_1 = (\tfrac43, \tfrac43)\), \(\mu_2 = (6.5, 6.5)\). The distances to the own centroid are the ones from note 4; the distances to the <b>other</b> centroid:</p>
<ul>
<li>Sample 1 \((1,1)\) to \(\mu_2\): \((1-6.5)^2 + (1-6.5)^2 = 30.25 + 30.25 = 60.5\), versus \(\tfrac29\) to \(\mu_1\) → stays in \(C_1\)</li>
<li>Sample 2 \((1,2)\) to \(\mu_2\): \((1-6.5)^2 + (2-6.5)^2 = 30.25 + 20.25 = 50.5\), versus \(\tfrac59\) → stays</li>
<li>Sample 3 \((2,1)\) to \(\mu_2\): \((2-6.5)^2 + (1-6.5)^2 = 20.25 + 30.25 = 50.5\), versus \(\tfrac59\) → stays</li>
<li>Sample 4 \((6,6)\) to \(\mu_1\): \((6-\tfrac43)^2 + (6-\tfrac43)^2 = (\tfrac{14}{3})^2 + (\tfrac{14}{3})^2 = \tfrac{196}{9} + \tfrac{196}{9} = \tfrac{392}{9} \approx 43.56\), versus 0.5 → stays in \(C_2\)</li>
<li>Sample 5 \((6.5,7)\) to \(\mu_1\): \((6.5-\tfrac43)^2 + (7-\tfrac43)^2 = (\tfrac{31}{6})^2 + (\tfrac{17}{3})^2 = \tfrac{961}{36} + \tfrac{1156}{36} = \tfrac{2117}{36} \approx 58.81\), versus 0.25 → stays</li>
<li>Sample 6 \((7,6.5)\): the same numbers with the coordinates swapped: \(\approx 58.81\) versus 0.25 → stays</li>
</ul>
<p>No sample switches, so the means (and the centroids) stay \((\tfrac43, \tfrac43)\) and \((6.5, 6.5)\), and <b>the WCSS stays the same</b> at \(\tfrac73\) — the official answer. K-means converged after one iteration.</p>
<p><b>The same check, used the other way round</b> (the kind of part in 2026-A Q4.3: "suggest a possible solution after convergence"). Propose clusters, compute their means, and verify that every sample is nearest to its own mean. On the guided data (2025-A) with \(k = 3\), propose \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\). Means:</p>
<ul>
<li>\(\mu_1 = \left(\tfrac{1+1.5}{2},\ \tfrac{1+2}{2}\right) = (1.25,\ 1.5)\)</li>
<li>\(\mu_2 = \left(\tfrac{4+4.5+4.5+6+7}{5},\ \tfrac{4+4.5+5+5+6}{5}\right) = \left(\tfrac{26}{5},\ \tfrac{24.5}{5}\right) = (5.2,\ 4.9)\)</li>
<li>\(\mu_3 = \left(\tfrac{9.5+10+11}{3},\ \tfrac{7.5+8+9}{3}\right) = \left(\tfrac{30.5}{3},\ \tfrac{24.5}{3}\right) \approx (10.17,\ 8.17)\)</li>
</ul>
<p>Only the samples at the edges of the groups could possibly switch, so check those against the neighbouring centroid:</p>
<ul>
<li>Sample 2 \((1.5,2)\): to \(\mu_1\): \(0.25^2 + 0.5^2 = 0.0625 + 0.25 = 0.3125\); to \(\mu_2\): \((-3.7)^2 + (-2.9)^2 = 13.69 + 8.41 = 22.1\) → stays</li>
<li>Sample 3 \((4,4)\): to \(\mu_2\): \((-1.2)^2 + (-0.9)^2 = 1.44 + 0.81 = 2.25\); to \(\mu_1\): \(2.75^2 + 2.5^2 = 7.5625 + 6.25 = 13.8125\) → stays</li>
<li>Sample 7 \((7,6)\): to \(\mu_2\): \(1.8^2 + 1.1^2 = 3.24 + 1.21 = 4.45\); to \(\mu_3\): \((7 - \tfrac{30.5}{3})^2 + (6 - \tfrac{24.5}{3})^2 \approx 10.03 + 4.69 = 14.72\) → stays</li>
<li>Sample 8 \((9.5,7.5)\): to \(\mu_3\): \((-\tfrac23)^2 + (-\tfrac23)^2 = \tfrac49 + \tfrac49 \approx 0.89\); to \(\mu_2\): \(4.3^2 + 2.6^2 = 18.49 + 6.76 = 25.25\) → stays</li>
</ul>
<p>Nobody switches, so this is a converged K-means solution: if the algorithm ever reaches these clusters, it stays there.</p>`,
      cue: R`"What would happen to the WCSS if we ran another iteration? Increase, decrease, or stay the same?" (2025-C Q5.2, 2026-A Q4.2). "Suggest a possible solution that can be returned after convergence with \(k = 3\)" (2026-A Q4.3).`,
      first: R`Run step A again with the new centroids and check whether any sample switches.`,
      recipe: R`<p><b>Another iteration:</b> no sample switches → same means → WCSS unchanged. If some sample switched, WCSS would strictly decrease — it can never increase.</p><p><b>A possible converged solution:</b> choose groups (split a visible group, or give an isolated sample its own cluster) → compute each mean → show every sample is nearest to its own mean → write "assignments don't change, so centroids don't change: converged".</p>`,
      trap: R`Answering "decreases" by reflex. WCSS decreases only if some sample switches cluster. After the update, if every sample is still nearest to its own centroid, the answer is "stays the same".` },

    { title: "6 · Different starts, different answers — and comparing two solutions by WCSS",
      idea: R`<p><b>Where we are:</b> note 5 showed that K-means always converges, but only to a local minimum. <b>The consequence:</b> where it ends up depends on where the centroids started.</p>
<h5>Step 1 — why two runs can disagree</h5>
<p>After the starting centroids are chosen, K-means is completely deterministic: the same start always gives the same result. But the starting centroids are usually chosen at random. Two runs with different starts can walk downhill into different valleys and converge to <b>different clusterings</b>, even on the same data with the same \(k\). Neither run made a mistake.</p>
<h5>Step 2 — the judge: WCSS</h5>
<p>To decide which of two solutions (with the <b>same</b> \(k\)) is better, compute the WCSS of each:</p>
<ol>
<li>For each cluster of the solution, compute its centroid \(\mu_j = \frac{1}{|C_j|}\sum_{i \in C_j} x^{(i)}\) (note 3).</li>
<li>Compute \(\text{WCSS} = \sum_j \sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\) (note 4).</li>
<li>The solution with the <b>smaller</b> WCSS is better.</li>
</ol>
<p><b>Why this is a fair comparison:</b> WCSS measures how tightly each cluster is packed around its centre — exactly the quantity K-means is trying to minimise. With the same \(k\), both solutions have the same number of centres to work with, so the smaller WCSS is simply the better answer to K-means' own goal. (This is also why, in practice, K-means is run several times from different random starts and the run with the lowest WCSS is kept.)</p>`,
      notation: [
        [R`initialisation`, R`the choice of starting centroids`],
        [R`deterministic`, R`same input and same start → always the same output`],
      ],
      example: R`<p><b>2025-A Q2.1–2.2</b> in numbers. On the guided data with \(k = 2\), K-means has (at least) two different converged solutions. I checked both by running K-means: starting with the centroids on samples 7 and 8 gives solution S1; starting on samples 1 and 10 gives solution S2.</p>
<p><b>Solution S1: \(\{1,\dots,7\}\) and \(\{8, 9, 10\}\).</b> Centroids: \(\mu_1 = \left(\tfrac{1+1.5+4+4.5+4.5+6+7}{7},\ \tfrac{1+2+4+4.5+5+5+6}{7}\right) = \left(\tfrac{28.5}{7},\ \tfrac{27.5}{7}\right) \approx (4.0714,\ 3.9286)\) and \(\mu_2 = \left(\tfrac{30.5}{3},\ \tfrac{24.5}{3}\right) \approx (10.1667,\ 8.1667)\).</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x^{(i)} - \mu_j\)</th><th>squared distance</th></tr></thead><tbody>
<tr><td>1 (1, 1)</td><td>(−3.0714, −2.9286)</td><td>9.4337 + 8.5765 = 18.0102</td></tr>
<tr><td>2 (1.5, 2)</td><td>(−2.5714, −1.9286)</td><td>6.6122 + 3.7194 = 10.3316</td></tr>
<tr><td>3 (4, 4)</td><td>(−0.0714, 0.0714)</td><td>0.0051 + 0.0051 = 0.0102</td></tr>
<tr><td>4 (4.5, 4.5)</td><td>(0.4286, 0.5714)</td><td>0.1837 + 0.3265 = 0.5102</td></tr>
<tr><td>5 (4.5, 5)</td><td>(0.4286, 1.0714)</td><td>0.1837 + 1.1480 = 1.3316</td></tr>
<tr><td>6 (6, 5)</td><td>(1.9286, 1.0714)</td><td>3.7194 + 1.1480 = 4.8673</td></tr>
<tr><td>7 (7, 6)</td><td>(2.9286, 2.0714)</td><td>8.5765 + 4.2908 = 12.8673</td></tr>
<tr><td>8 (9.5, 7.5)</td><td>(−0.6667, −0.6667)</td><td>0.4444 + 0.4444 = 0.8889</td></tr>
<tr><td>9 (10, 8)</td><td>(−0.1667, −0.1667)</td><td>0.0278 + 0.0278 = 0.0556</td></tr>
<tr><td>10 (11, 9)</td><td>(0.8333, 0.8333)</td><td>0.6944 + 0.6944 = 1.3889</td></tr>
</tbody></table></div>
<p>WCSS(S1) = (18.0102 + 10.3316 + 0.0102 + 0.5102 + 1.3316 + 4.8673 + 12.8673) + (0.8889 + 0.0556 + 1.3889) = 47.9286 + 2.3333 ≈ <b>50.26</b></p>
<p><b>Solution S2: \(\{1,\dots,6\}\) and \(\{7,\dots,10\}\).</b> Centroids: \(\mu_1 = \left(\tfrac{1+1.5+4+4.5+4.5+6}{6},\ \tfrac{1+2+4+4.5+5+5}{6}\right) = \left(\tfrac{21.5}{6},\ \tfrac{21.5}{6}\right) \approx (3.5833,\ 3.5833)\) and \(\mu_2 = \left(\tfrac{7+9.5+10+11}{4},\ \tfrac{6+7.5+8+9}{4}\right) = \left(\tfrac{37.5}{4},\ \tfrac{30.5}{4}\right) = (9.375,\ 7.625)\).</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x^{(i)} - \mu_j\)</th><th>squared distance</th></tr></thead><tbody>
<tr><td>1 (1, 1)</td><td>(−2.5833, −2.5833)</td><td>6.6736 + 6.6736 = 13.3472</td></tr>
<tr><td>2 (1.5, 2)</td><td>(−2.0833, −1.5833)</td><td>4.3403 + 2.5069 = 6.8472</td></tr>
<tr><td>3 (4, 4)</td><td>(0.4167, 0.4167)</td><td>0.1736 + 0.1736 = 0.3472</td></tr>
<tr><td>4 (4.5, 4.5)</td><td>(0.9167, 0.9167)</td><td>0.8403 + 0.8403 = 1.6806</td></tr>
<tr><td>5 (4.5, 5)</td><td>(0.9167, 1.4167)</td><td>0.8403 + 2.0069 = 2.8472</td></tr>
<tr><td>6 (6, 5)</td><td>(2.4167, 1.4167)</td><td>5.8403 + 2.0069 = 7.8472</td></tr>
<tr><td>7 (7, 6)</td><td>(−2.375, −1.625)</td><td>5.6406 + 2.6406 = 8.2812</td></tr>
<tr><td>8 (9.5, 7.5)</td><td>(0.125, −0.125)</td><td>0.0156 + 0.0156 = 0.0312</td></tr>
<tr><td>9 (10, 8)</td><td>(0.625, 0.375)</td><td>0.3906 + 0.1406 = 0.5312</td></tr>
<tr><td>10 (11, 9)</td><td>(1.625, 1.375)</td><td>2.6406 + 1.8906 = 4.5312</td></tr>
</tbody></table></div>
<p>WCSS(S2) = (13.3472 + 6.8472 + 0.3472 + 1.6806 + 2.8472 + 7.8472) + (8.2812 + 0.0312 + 0.5312 + 4.5312) = 32.9167 + 13.375 ≈ <b>46.29</b></p>
<p><b>Verdict:</b> \(46.29 \lt  50.26\), so S2 is the better \(k = 2\) solution. Both runs converged (each is a fixed point in the sense of note 5), yet they differ — exactly Anna's point in Q2.1. The exam didn't ask for these numbers; they show the method of Q2.2 at work.</p>`,
      cue: R`"Zack claims Anna must have made a mistake … who is right?" (2025-A Q2.1). "How can they decide which clustering solution is better? Describe the calculations in detail and explain why" (2025-A Q2.2).`,
      first: R`Q2.1: "K-means converges to a local minimum that depends on the initial centroids." Q2.2: write the two formulas — centroid as the mean, then WCSS.`,
      trap: R`Q2.1 says "based on general properties of K-means, not on this dataset" — argue from the random initialisation and local minima, not from the plot. Q2.2 gives 4 points for describing <b>and</b> justifying: say why a smaller WCSS means a better solution.` },

    { title: "7 · Choosing k: the elbow method",
      idea: R`<p><b>Where we are:</b> WCSS compares solutions with the <b>same</b> \(k\). <b>The new question:</b> how many clusters should we ask for in the first place?</p>
<h5>Step 1 — the lowest WCSS can't choose k</h5>
<p>The best possible WCSS <b>never goes up</b> when \(k\) grows. Take the best solution with \(k\) clusters and add one more centroid placed exactly on some sample. That sample's term in WCSS becomes 0 and nobody else's gets worse, so there is already a \((k+1)\)-solution at least as good — and the best \((k+1)\)-solution is at least as good as that. In the extreme, \(k = n\) (one cluster per sample) gives WCSS = 0. So "pick the \(k\) with the smallest WCSS" would always pick the largest \(k\) — useless.</p>
<h5>Step 2 — look at how much each extra cluster helps</h5>
<p>While \(k\) is smaller than the number of real groups, adding a cluster lets K-means split two real groups apart — WCSS drops a lot. Once \(k\) equals the number of real groups, an extra cluster can only cut a tight group in two — WCSS drops only a little.</p>
<h5>Step 3 — the elbow</h5>
<p>Plot the best WCSS against \(k\). The curve falls steeply, then flattens. The bend — the <b>elbow</b> — is the \(k\) after which extra clusters stop paying off. Choose that \(k\).</p>`,
      notation: [
        [R`elbow`, R`the \(k\) where the WCSS-versus-\(k\) curve switches from steep drops to small drops`],
      ],
      example: R`<p><b>2025-A Q2.3.</b> Three plots of the best WCSS against \(k\) (the horizontal axis runs over \(k = 1, 2, 3, 4\)):</p>
<ul>
<li><b>(A)</b> big drop, big drop, then a small drop — a bend at \(k = 3\).</li>
<li><b>(B)</b> the drops from \(k = 2\) to 3 and from 3 to 4 look about the same — no clear bend.</li>
<li><b>(C)</b> goes <b>up</b> from \(k = 3\) to \(k = 4\).</li>
</ul>
<p><b>Rule out C:</b> the best WCSS can never increase with \(k\) (step 1). The question says they found the optimal solution for each \(k\), so C is impossible.</p>
<p><b>Choose between A and B:</b> the data has three visible groups \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\) (note 0), so going from 3 to 4 clusters should help much less than going from 2 to 3. That is A's shape: <b>A is the answer</b> (the official solution).</p>
<p><b>The real numbers behind it.</b> I computed the best WCSS for each \(k\) on this dataset (by trying every possible split of the ten samples):</p>
<ul>
<li>\(k = 1\): one cluster holding all ten samples. Centroid: \(x_1\)-values add to \(1 + 1.5 + 4 + 4.5 + 4.5 + 6 + 7 + 9.5 + 10 + 11 = 59\), \(x_2\)-values to \(1 + 2 + 4 + 4.5 + 5 + 5 + 6 + 7.5 + 8 + 9 = 52\), so \(\mu = (5.9,\ 5.2)\). Adding the ten squared distances to \(\mu\), the \(x_1\)-differences contribute 107.9 and the \(x_2\)-differences 58.1: WCSS \(= 107.9 + 58.1 = 166\)</li>
<li>\(k = 2\): solution S2 of note 6: WCSS ≈ 46.29</li>
<li>\(k = 3\): the three visible groups, centroids from note 5: \((1.25, 1.5)\), \((5.2, 4.9)\), \((\tfrac{30.5}{3}, \tfrac{24.5}{3})\). Per cluster:
<ul>
<li>\(\{1,2\}\): sample 1: \((1-1.25)^2 + (1-1.5)^2 = 0.0625 + 0.25 = 0.3125\); sample 2: \((1.5-1.25)^2 + (2-1.5)^2 = 0.0625 + 0.25 = 0.3125\). Sum \(0.625\)</li>
<li>\(\{3,\dots,7\}\): sample 3: \((-1.2)^2 + (-0.9)^2 = 2.25\); sample 4: \((4.5-5.2)^2 + (4.5-4.9)^2 = 0.49 + 0.16 = 0.65\); sample 5: \((-0.7)^2 + (5-4.9)^2 = 0.49 + 0.01 = 0.5\); sample 6: \((6-5.2)^2 + (5-4.9)^2 = 0.64 + 0.01 = 0.65\); sample 7: \(1.8^2 + 1.1^2 = 4.45\). Sum \(2.25 + 0.65 + 0.5 + 0.65 + 4.45 = 8.5\)</li>
<li>\(\{8,9,10\}\): the same cluster as in S1 (note 6's table): \(0.8889 + 0.0556 + 1.3889 = 2.3333\)</li>
</ul>
Total \(0.625 + 8.5 + 2.3333 \approx 11.46\)</li>
<li>\(k = 4\): \(\{1,2\}, \{3,4,5\}, \{6,7\}, \{8,9,10\}\). Two clusters are new:
<ul>
<li>\(\{3,4,5\}\): mean \(\left(\tfrac{4+4.5+4.5}{3},\ \tfrac{4+4.5+5}{3}\right) = (\tfrac{13}{3},\ 4.5)\). Sample 3: \((-\tfrac13)^2 + (-0.5)^2 = \tfrac19 + \tfrac14\); sample 4: \((\tfrac16)^2 + 0^2 = \tfrac1{36}\); sample 5: \((\tfrac16)^2 + 0.5^2 = \tfrac1{36} + \tfrac14\). Sum \(\tfrac{4}{36} + \tfrac{1}{36} + \tfrac{1}{36} + \tfrac12 = \tfrac16 + \tfrac12 = \tfrac23 \approx 0.6667\)</li>
<li>\(\{6,7\}\): mean \((6.5,\ 5.5)\). Each sample is \((\pm 0.5, \pm 0.5)\) away: \(0.25 + 0.25 = 0.5\) each. Sum \(1\)</li>
</ul>
Total \(0.625 + 0.6667 + 1 + 2.3333 = 4.625\)</li>
</ul>
<p>Drops: \(166 - 46.29 = 119.71\), then \(46.29 - 11.46 = 34.83\), then \(11.46 - 4.625 = 6.83\). The last drop is tiny compared with the ones before: the elbow is at \(k = 3\), as in plot A.</p>`,
      cue: R`"They execute K-means with \(k = 2, 3, 4\) … plot the value of this measure of the best solution for each \(k\). Which of the plots is the most plausible?" (2025-A Q2.3).`,
      first: R`Cross out any plot where WCSS goes up. Then count the visible groups on the scatter plot: the elbow should be at that \(k\).`,
      trap: R`"WCSS always decreases with \(k\)" is true for the <b>best</b> solution per \(k\). A single unlucky K-means run can give a worse WCSS at a larger \(k\) (note 6) — which is why the question says "making sure to find an optimal solution per \(k\)". Quote that phrase when you rule out plot C.` },

    { title: "8 · Which starting centroids give the same outcome? (a range of values)",
      idea: R`<p><b>Where we are:</b> note 6 said that different starts can give different results. This kind of part turns that around: <b>for which starting centroids</b> do we get exactly the result we already computed?</p>
<h5>Step 1 — the outcome is decided in step A</h5>
<p>The first iteration's result depends only on the <b>assignment</b>: if every sample goes to the same centroid as before, step B computes the same means, and everything after that is identical. So "same outcome" = "every sample still picks the same centroid".</p>
<h5>Step 2 — one inequality per sample</h5>
<p>For each sample write "squared distance to the centroid it should pick &lt; squared distance to the other centroid". When the moved centroid depends on an unknown \(a\), each of these is an inequality in \(a\) — usually a quadratic, which you solve by moving everything to one side and factoring.</p>
<h5>Step 3 — intersect</h5>
<p>Every sample's inequality must hold at the same time, so the answer is the <b>intersection</b> of all the ranges. Don't skip any sample: each one can cut the range from a different side.</p>`,
      notation: [
        [R`\(\mu_2 = (a, a)\)`, R`a centroid on the diagonal line \(x_1 = x_2\); \(a\) is the unknown`],
        [R`\((a - 1)(a - 2) > 0\)`, R`a product is positive when both factors have the same sign: \(a \lt  1\) or \(a > 2\)`],
      ],
      example: R`<p><b>2025-C Q5.3.</b> Keep \(\mu_1 = (1, 1)\); replace \(\mu_2\) by \((a, a)\). We need samples 1–3 to pick \(\mu_1\) and samples 4–6 to pick \(\mu_2\), as in note 2.</p>
<ul>
<li><b>Sample 1 \((1,1)\)</b> should pick \(\mu_1\): its squared distance to \(\mu_1\) is 0; to \(\mu_2\) it is \((1-a)^2 + (1-a)^2 = 2(1-a)^2\), which is \(> 0\) unless \(a = 1\). Condition: \(a \ne 1\).</li>
<li><b>Sample 2 \((1,2)\)</b> should pick \(\mu_1\): to \(\mu_1\): \(0^2 + 1^2 = 1\). To \(\mu_2\): \((1-a)^2 + (2-a)^2 = (1 - 2a + a^2) + (4 - 4a + a^2) = 2a^2 - 6a + 5\). Need \(2a^2 - 6a + 5 > 1\), i.e. \(2a^2 - 6a + 4 > 0\), i.e. \(a^2 - 3a + 2 > 0\), i.e. \((a-1)(a-2) > 0\). Condition: \(a \lt  1\) or \(a > 2\).</li>
<li><b>Sample 3 \((2,1)\)</b>: the same numbers with the coordinates swapped: to \(\mu_1\): 1; to \(\mu_2\): \((2-a)^2 + (1-a)^2 = 2a^2 - 6a + 5\). Same condition: \(a \lt  1\) or \(a > 2\).</li>
<li><b>Sample 4 \((6,6)\)</b> should pick \(\mu_2\): to \(\mu_1\): \(5^2 + 5^2 = 50\). To \(\mu_2\): \(2(6-a)^2\). Need \(2(6-a)^2 \lt  50\), i.e. \((6-a)^2 \lt  25\), i.e. \(-5 \lt  6 - a \lt  5\). Condition: \(1 \lt  a \lt  11\).</li>
<li><b>Sample 5 \((6.5,7)\)</b> should pick \(\mu_2\): to \(\mu_1\): \(5.5^2 + 6^2 = 30.25 + 36 = 66.25\). To \(\mu_2\): \((6.5-a)^2 + (7-a)^2 = (42.25 - 13a + a^2) + (49 - 14a + a^2) = 2a^2 - 27a + 91.25\). Need \(2a^2 - 27a + 91.25 \lt  66.25\), i.e. \(2a^2 - 27a + 25 \lt  0\), i.e. \((2a - 25)(a - 1) \lt  0\). Condition: \(1 \lt  a \lt  12.5\).</li>
<li><b>Sample 6 \((7,6.5)\)</b>: coordinates swapped, same numbers. Condition: \(1 \lt  a \lt  12.5\).</li>
</ul>
<p><b>Intersect:</b> samples 2–3 need \(a > 2\) (the other option, \(a \lt  1\), contradicts sample 4's \(a > 1\)); sample 4 needs \(a \lt  11\); samples 5–6 (\(a \lt  12.5\)) and sample 1 (\(a \ne 1\)) add nothing new. So</p>
\[2 \lt  a \lt  11\]
<p>(At exactly \(a = 2\) or \(a = 11\) some sample is equally far from both centroids — a tie, so the outcome depends on the tie-breaking rule.)</p>
<p class="muted"><b>Slip in the official solution:</b> it answers "iff \(a > 2\)". It claims "as long as \(a > 1\), samples 4–6 are assigned to \(\mu_2\)", but that ignores centroids placed far beyond the data: for example \(a = 12\) puts \(\mu_2 = (12, 12)\) at squared distance \(2 \cdot 6^2 = 72\) from sample 4, more than its 50 to \(\mu_1\), so sample 4 joins \(C_1\) and the outcome changes. The correct range is \(2 \lt  a \lt  11\). If this part comes up, answer \(2 \lt  a \lt  11\) and show sample 4's inequality, so the grader sees where the upper limit comes from. (The official solution also writes \(\|x^{(2)} - \mu_2\|^2 = \|x^{(1)} - \mu_2\|^2\) where it means \(x^{(3)}\).)</p>`,
      cue: R`"Specify the range of values for \(a\) for which the first iteration of K-means would result in the same outcome" (2025-C Q5.3).`,
      first: R`Write one inequality per sample: "squared distance to my centroid &lt; squared distance to the other one", with \(\mu_2 = (a, a)\) plugged in.`,
      recipe: R`Expand each squared bracket → move everything to one side → factor the quadratic → read off the range → intersect all six ranges.`,
      trap: R`Checking only the samples near the boundary between the groups. The far side matters too: a centroid pushed too far away loses its own samples.` },

    { title: "9 · A modified objective: the sum of pairwise distances",
      idea: R`<p><b>Why these parts exist:</b> to check that you understand <b>why</b> K-means works, not just how to run it. K-means works because each step can only lower WCSS (note 5): step A picks the best assignment for fixed centroids, step B picks the best centroids (the means) for a fixed assignment. For a new objective the question is: does that still hold, or do the steps need to change?</p>
<h5>Step 1 — the general recipe</h5>
<ol>
<li>Try to rewrite the new objective in terms of the old WCSS. If it is a positive constant times WCSS, then lowering WCSS lowers it too — no change needed.</li>
<li>Otherwise ask, step by step: for fixed centroids, which assignment makes the new objective smallest? For a fixed assignment, which centres make it smallest? Change step A and/or step B to those.</li>
</ol>
<h5>Step 2 — the pairwise objective of 2025-C Q5.4</h5>
<p>Instead of measuring each sample against a centre, measure every pair of samples in the same cluster against each other:</p>
\[\widetilde{\text{WCSS}} = \sum_{j=1}^{k}\ \sum_{i, i' \in C_j} \|x^{(i)} - x^{(i')}\|^2\]
<p>The inner sum runs over all pairs \((i, i')\) with both samples in cluster \(j\) — every ordered pair, so each unordered pair appears twice, plus \(i = i'\) terms that are 0. Note that no centroid appears in it.</p>
<h5>Step 3 — the identity that links it to WCSS</h5>
<p>Fix one cluster \(C_j\) with mean \(\mu_j\). Measure every sample from the mean: write \(a_i = x^{(i)} - \mu_j\) (an arrow from the mean to sample \(i\)). Two facts about these arrows:</p>
<ul>
<li>\(x^{(i)} - x^{(i')} = (x^{(i)} - \mu_j) - (x^{(i')} - \mu_j) = a_i - a_{i'}\) — the \(\mu_j\)'s cancel.</li>
<li>\(\sum_{i \in C_j} a_i = \sum_{i \in C_j} x^{(i)} - |C_j|\,\mu_j = 0\), because \(\sum_{i \in C_j} x^{(i)} = |C_j|\,\mu_j\) is the definition of the mean. The arrows from the mean cancel out.</li>
</ul>
<p>Expand one squared distance the way you expand \((u - v)^2 = u^2 + v^2 - 2uv\), with dot products:</p>
\[\|a_i - a_{i'}\|^2 = \|a_i\|^2 + \|a_{i'}\|^2 - 2\,a_i\cdot a_{i'}\]
<p>Now add this over every ordered pair \((i, i')\) of the cluster, one term at a time:</p>
<ul>
<li>\(\sum_{i}\sum_{i'} \|a_i\|^2 = |C_j|\sum_{i} \|a_i\|^2\): the term doesn't depend on \(i'\), so for each \(i\) it is added \(|C_j|\) times.</li>
<li>\(\sum_{i}\sum_{i'} \|a_{i'}\|^2 = |C_j|\sum_{i'} \|a_{i'}\|^2\): the same with the roles swapped.</li>
<li>\(\sum_{i}\sum_{i'} 2\,a_i\cdot a_{i'} = 2\,\big(\sum_i a_i\big)\cdot\big(\sum_{i'} a_{i'}\big) = 2 \cdot 0 \cdot 0 = 0\).</li>
</ul>
<p>Put together, and since \(\sum_i \|a_i\|^2 = \sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\) is cluster \(j\)'s part of WCSS:</p>
\[\sum_{i, i' \in C_j} \|x^{(i)} - x^{(i')}\|^2 = |C_j|\sum_i\|a_i\|^2 + |C_j|\sum_i\|a_i\|^2 - 0 = 2\,|C_j| \sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\]
<p>Each cluster's pairwise sum is its part of WCSS times \(2|C_j|\) — a factor that depends on the cluster's <b>size</b>. The example checks this with numbers.</p>`,
      notation: [
        [R`\(\widetilde{\text{WCSS}}\) ("WCSS tilde")`, R`the modified objective: squared distances between all pairs of samples in the same cluster`],
        [R`\(\sum_{i, i' \in C_j}\)`, R`add over every pair of samples \(i, i'\) that are both in cluster \(j\)`],
      ],
      example: R`<p><b>Check the identity on 2025-C's converged clusters</b> (notes 2–4). Cluster \(C_1 = \{1, 2, 3\}\):</p>
<ul>
<li>\(\|x^{(1)} - x^{(2)}\|^2 = (1-1)^2 + (1-2)^2 = 0 + 1 = 1\)</li>
<li>\(\|x^{(1)} - x^{(3)}\|^2 = (1-2)^2 + (1-1)^2 = 1 + 0 = 1\)</li>
<li>\(\|x^{(2)} - x^{(3)}\|^2 = (1-2)^2 + (2-1)^2 = 1 + 1 = 2\)</li>
</ul>
<p>Each pair counts twice (\((1,2)\) and \((2,1)\)), so the pairwise sum is \(2(1 + 1 + 2) = 8\). Its WCSS part (note 4) was \(\tfrac29 + \tfrac59 + \tfrac59 = \tfrac43\), and \(2\,|C_1| \cdot \tfrac43 = 2 \cdot 3 \cdot \tfrac43 = 8\). ✓</p>
<p>Cluster \(C_2 = \{4, 5, 6\}\): \(\|x^{(4)} - x^{(5)}\|^2 = 0.5^2 + 1^2 = 1.25\); \(\|x^{(4)} - x^{(6)}\|^2 = 1^2 + 0.5^2 = 1.25\); \(\|x^{(5)} - x^{(6)}\|^2 = 0.5^2 + 0.5^2 = 0.5\). Pairwise sum \(2(1.25 + 1.25 + 0.5) = 6\); WCSS part \(0.5 + 0.25 + 0.25 = 1\), and \(2 \cdot 3 \cdot 1 = 6\). ✓</p>
<p><b>The official answer to 2025-C Q5.4</b> (this is what the graders expect): "In HW5 you proved \(\sum_{i,i' \in C_j}\|x^{(i)} - x^{(i')}\|^2 = 2\sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\). So \(\widetilde{\text{WCSS}} = 2\,\text{WCSS}\), and standard K-means guarantees a reduction of \(\widetilde{\text{WCSS}}\) in every iteration because it reduces WCSS." — i.e. <b>no modification needed</b>.</p>
<p class="muted"><b>Slip in the official solution:</b> its identity is missing the factor \(|C_j|\) from step 3. The numbers above show it: cluster \(C_1\)'s pairwise sum is 8, not \(2 \cdot \tfrac43\). So in truth \(\widetilde{\text{WCSS}} = \sum_j 2|C_j| \cdot (\text{cluster } j\text{'s part of WCSS})\): big clusters count more, and that is not a fixed multiple of WCSS. Plain K-means is therefore not strictly guaranteed to lower it (a quick numerical search finds small datasets where one K-means iteration raises it). "\(= 2\,\text{WCSS}\)" is exactly right for the size-normalised version, where each cluster's pairwise sum is first divided by \(|C_j|\).</p>
<p><b>What to write if this part comes up:</b> the answer key's argument — relate \(\widetilde{\text{WCSS}}\) to WCSS through the cluster means, conclude "no modification needed". That earns the points. If you like, add one sentence: "strictly, the identity has a factor \(|C_j|\), so this holds exactly when each cluster's pairwise sum is divided by \(|C_j|\)."</p>`,
      cue: R`"Suppose instead of the standard WCSS we wish to minimise \(\widetilde{\text{WCSS}}\) … which modifications do we need to apply to K-means to guarantee reduction in every iteration? Brief explanation, no proof" (2025-C Q5.4).`,
      first: R`Try to write the new objective as (something) × WCSS by relating each pair distance to the cluster mean.`,
      recipe: R`Constant multiple of WCSS → no change. Otherwise: step A = assign each sample to minimise the new objective; step B = the centre that minimises it for fixed clusters (for squared distances that's the mean).`,
      trap: R`Don't prove anything — the question says "brief explanation". Two or three sentences: the relation to WCSS and the conclusion.` },

    { title: "10 · Agglomerative clustering with single linkage and Manhattan distance",
      idea: R`<p><b>A different algorithm.</b> K-means needs \(k\) in advance and a random start. Agglomerative ("gluing together") clustering needs neither: it builds a whole <b>hierarchy</b> of clusterings, from \(n\) clusters down to 1, and never uses centroids.</p>
<h5>Step 1 — the loop</h5>
<ol>
<li>Start: every sample is its own cluster (\(n\) clusters).</li>
<li>Find the two clusters that are <b>closest</b> to each other and merge them into one.</li>
<li>Repeat until one cluster is left (\(n - 1\) merges in total).</li>
</ol>
<h5>Step 2 — the distance between two samples: Manhattan (\(L_1\))</h5>
<p>The exam questions use the <b>Manhattan</b> distance (on the formula sheet): add the <b>absolute</b> differences of the coordinates, no squares, no root:</p>
\[d_1(x, y) = |x_1 - y_1| + |x_2 - y_2|\]
<p>The name comes from walking between two street corners in a grid city: you can't cut diagonally, so you walk the horizontal part plus the vertical part.</p>
<h5>Step 3 — the distance between two clusters: linkage</h5>
<p>After the first merge a cluster can contain several samples, so we need a rule for "the distance between two <b>clusters</b>". That rule is the <b>linkage</b>. <b>Single linkage</b> uses the closest pair, one sample from each cluster:</p>
\[d(C_1, C_2) = \min_{x_1 \in C_1,\ x_2 \in C_2} d(x_1, x_2)\]
<h5>Step 4 — the shortcut after a merge</h5>
<p>When \(A\) and \(B\) merge, you don't need to recompute from scratch. The closest pair between \(A \cup B\) and another cluster \(C\) is either the closest pair from \(A\) or the closest pair from \(B\):</p>
\[d(A \cup B,\ C) = \min\big(d(A, C),\ d(B, C)\big)\]
<p>So after each merge you write one new row: the new cluster's distance to every remaining cluster, each one a min of two numbers you already have.</p>`,
      notation: [
        [R`\(d_1(x, y)\) or \(\|x - y\|_1\)`, R`Manhattan (\(L_1\)) distance: \(|x_1 - y_1| + |x_2 - y_2|\)`],
        [R`linkage`, R`the rule that turns sample distances into a distance between clusters`],
        [R`single linkage`, R`cluster distance = the <b>smallest</b> distance between a member of one and a member of the other`],
        [R`\(A \cup B\)`, R`the merged cluster: all samples of \(A\) and of \(B\)`],
      ],
      example: R`<p><b>2025-A Q2.4</b>: single linkage, Manhattan distance, the first three iterations on the guided data. You don't need all 45 pairs: the smallest distance is always between neighbours on the plot, so list the nearby pairs:</p>
<ul>
<li>\(d(4,5) = |4.5 - 4.5| + |4.5 - 5| = 0 + 0.5 = 0.5\)</li>
<li>\(d(3,4) = |4 - 4.5| + |4 - 4.5| = 0.5 + 0.5 = 1\)</li>
<li>\(d(8,9) = |9.5 - 10| + |7.5 - 8| = 0.5 + 0.5 = 1\)</li>
<li>\(d(1,2) = |1 - 1.5| + |1 - 2| = 0.5 + 1 = 1.5\)</li>
<li>\(d(3,5) = |4 - 4.5| + |4 - 5| = 0.5 + 1 = 1.5\)</li>
<li>\(d(5,6) = |4.5 - 6| + |5 - 5| = 1.5 + 0 = 1.5\)</li>
<li>\(d(4,6) = |4.5 - 6| + |4.5 - 5| = 1.5 + 0.5 = 2\), \(d(6,7) = |6 - 7| + |5 - 6| = 1 + 1 = 2\), \(d(9,10) = |10 - 11| + |8 - 9| = 1 + 1 = 2\)</li>
</ul>
<p><b>Iteration 1:</b> the smallest is \(d(4,5) = 0.5\). Merge → \(\{4,5\}\). Its distance to each other sample is the min of sample 4's and sample 5's distance:</p>
<ul>
<li>to 1: \(\min(d(4,1), d(5,1)) = \min(3.5 + 3.5,\ 3.5 + 4) = \min(7, 7.5) = 7\)</li>
<li>to 2: \(\min(3 + 2.5,\ 3 + 3) = \min(5.5, 6) = 5.5\)</li>
<li>to 3: \(\min(1,\ 1.5) = 1\)</li>
<li>to 6: \(\min(2,\ 1.5) = 1.5\)</li>
<li>to 7: \(\min(2.5 + 1.5,\ 2.5 + 1) = \min(4, 3.5) = 3.5\)</li>
<li>to 8: \(\min(5 + 3,\ 5 + 2.5) = \min(8, 7.5) = 7.5\)</li>
<li>to 9: \(\min(5.5 + 3.5,\ 5.5 + 3) = \min(9, 8.5) = 8.5\)</li>
<li>to 10: \(\min(6.5 + 4.5,\ 6.5 + 4) = \min(11, 10.5) = 10.5\)</li>
</ul>
<p><b>Iteration 2:</b> the smallest distance is now 1, and there are two pairs at 1: \(\{4,5\}\)–3 and 8–9. A tie; either may go first (the official solution takes \(\{4,5\}\) and 3). Merge → \(\{3,4,5\}\). Its row = min of the \(\{4,5\}\) row and sample 3's distances (\(d(3,1) = 3 + 3 = 6\), \(d(3,2) = 2.5 + 2 = 4.5\), \(d(3,6) = 2 + 1 = 3\), \(d(3,7) = 3 + 2 = 5\), \(d(3,8) = 5.5 + 3.5 = 9\), \(d(3,9) = 6 + 4 = 10\), \(d(3,10) = 7 + 5 = 12\)):</p>
<div class="tw"><table><thead><tr><th>to</th><th>1</th><th>2</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead><tbody>
<tr><td>\(\min(\{4,5\},\ 3)\)</td><td>min(7, 6) = 6</td><td>min(5.5, 4.5) = 4.5</td><td>min(1.5, 3) = 1.5</td><td>min(3.5, 5) = 3.5</td><td>min(7.5, 9) = 7.5</td><td>min(8.5, 10) = 8.5</td><td>min(10.5, 12) = 10.5</td></tr></tbody></table></div>
<p><b>Iteration 3:</b> the smallest is now \(d(8,9) = 1\) (everything else is at least 1.5: \(d(1,2)\), and \(\{3,4,5\}\)–6 from the row above). Merge → \(\{8,9\}\). Its row:</p>
<ul>
<li>to 1: \(\min(d(8,1), d(9,1)) = \min(8.5 + 6.5,\ 9 + 7) = \min(15, 16) = 15\)</li>
<li>to 2: \(\min(8 + 5.5,\ 8.5 + 6) = \min(13.5, 14.5) = 13.5\)</li>
<li>to \(\{3,4,5\}\): \(\min(7.5,\ 8.5) = 7.5\) (from the iteration-2 row)</li>
<li>to 6: \(\min(3.5 + 2.5,\ 4 + 3) = \min(6, 7) = 6\)</li>
<li>to 7: \(\min(2.5 + 1.5,\ 3 + 2) = \min(4, 5) = 4\)</li>
<li>to 10: \(\min(1.5 + 1.5,\ 1 + 1) = \min(3, 2) = 2\)</li>
</ul>
<p class="muted"><b>Slips in the official solution's iteration-3 table:</b> its header says \(D(\{4,5\}, i)\) but it is the row of \(\{8,9\}\), and it gives 3.5 for sample 6 and 2 for sample 7. The correct values are \(d(\{8,9\}, 6) = 6\) and \(d(\{8,9\}, 7) = 4\), as computed above. The merges themselves are right.</p>`,
      cue: R`"Describe the computations done in the first three iterations. For each iteration specify the two clusters being merged and the distances between the newly merged cluster and all other clusters" (2025-A Q2.4).`,
      first: R`List the nearby pairs from the plot with their \(L_1\) distances; the smallest is the first merge.`,
      recipe: R`Each iteration: (1) name the smallest cluster distance and the two clusters, (2) write the merged cluster's row using \(\min\) of the two old rows, (3) mention ties if there are any.`,
      trap: R`Using Euclidean distance out of habit. Read the question: "Manhattan distance (\(L_1\))" means absolute differences added, no squares.` },

    { title: "11 · The complete-linkage variant, and the dendrogram",
      idea: R`<p><b>Why a second linkage exists.</b> Single linkage joins two clusters as soon as <b>one</b> pair of their samples is close. That can glue two clearly different groups together through a single bridge of nearby points ("chaining"), producing long, stretched clusters. <b>Complete linkage</b> is stricter: two clusters count as close only if <b>every</b> pair between them is close. It prefers compact, round clusters.</p>
<h5>Step 1 — what exactly changes: min becomes max</h5>
<p>The cluster distance is the <b>farthest</b> pair instead of the closest:</p>
\[d(C_1, C_2) = \max_{x_1 \in C_1,\ x_2 \in C_2} d(x_1, x_2)\]
<p>and the shortcut after merging \(A\) and \(B\) becomes</p>
\[d(A \cup B,\ C) = \max\big(d(A, C),\ d(B, C)\big)\]
<p>Everything else is identical: at each iteration merge the two clusters with the <b>smallest</b> cluster distance. (Only the cluster distance uses max; choosing which pair to merge is still "the smallest".)</p>
<h5>Step 2 — the dendrogram</h5>
<p>The output of agglomerative clustering is drawn as a tree, the <b>dendrogram</b>. The samples are the leaves along the bottom. Each merge is drawn as a horizontal bar joining the two merged clusters, at a <b>height equal to the merge distance</b>. The root, at the top, is the final merge of everything. Reading upwards replays the algorithm.</p>`,
      notation: [
        [R`complete linkage`, R`cluster distance = the <b>largest</b> distance between a member of one and a member of the other`],
        [R`dendrogram`, R`the merge tree: leaves = samples, each joint = one merge, drawn at the height of its merge distance`],
      ],
      example: R`<p><b>The guided data (2025-A) with complete linkage instead of single</b>, Manhattan distance, first three iterations — the same sample distances as note 10, only min becomes max.</p>
<p><b>Iteration 1:</b> the closest pair is still \(d(4,5) = 0.5\) (with one-sample clusters, min and max of one number are the same). Merge → \(\{4,5\}\). Its row now takes the <b>max</b>:</p>
<ul>
<li>to 1: \(\max(7, 7.5) = 7.5\); to 2: \(\max(5.5, 6) = 6\); to 3: \(\max(1, 1.5) = 1.5\); to 6: \(\max(2, 1.5) = 2\)</li>
<li>to 7: \(\max(4, 3.5) = 4\); to 8: \(\max(8, 7.5) = 8\); to 9: \(\max(9, 8.5) = 9\); to 10: \(\max(11, 10.5) = 11\)</li>
</ul>
<p><b>Iteration 2 — here the two linkages part ways.</b> With single linkage \(\{4,5\}\)–3 was 1; with complete linkage it is 1.5 (sample 5 is 1.5 from sample 3). So the only pair at distance 1 is 8–9. Merge → \(\{8,9\}\). Its row (max of samples 8 and 9):</p>
<ul>
<li>to 1: \(\max(15, 16) = 16\); to 2: \(\max(13.5, 14.5) = 14.5\); to 3: \(\max(9, 10) = 10\)</li>
<li>to \(\{4,5\}\): \(\max(8, 9) = 9\) (from the iteration-1 row); to 6: \(\max(6, 7) = 7\); to 7: \(\max(4, 5) = 5\); to 10: \(\max(3, 2) = 3\)</li>
</ul>
<p><b>Iteration 3:</b> the smallest is now 1.5, a tie between 1–2 and 3–\(\{4,5\}\). Take 1–2 → \(\{1,2\}\) (the other merges in iteration 4). Its row: to 3: \(\max(6, 4.5) = 6\); to \(\{4,5\}\): \(\max(7.5, 6) = 7.5\); to 6: \(\max(9, 7.5) = 9\); to 7: \(\max(11, 9.5) = 11\); to \(\{8,9\}\): \(\max(16, 14.5) = 16\); to 10: \(\max(18, 16.5) = 18\).</p>
<p><b>The whole run</b> (I ran both linkages to the end on this data):</p>
<div class="tw"><table><thead><tr><th>merge</th><th>single linkage</th><th>height</th><th>complete linkage</th><th>height</th></tr></thead><tbody>
<tr><td>1</td><td>4 + 5</td><td>0.5</td><td>4 + 5</td><td>0.5</td></tr>
<tr><td>2</td><td>3 + {4,5}</td><td>1</td><td>8 + 9</td><td>1</td></tr>
<tr><td>3</td><td>8 + 9</td><td>1</td><td>1 + 2</td><td>1.5</td></tr>
<tr><td>4</td><td>1 + 2</td><td>1.5</td><td>3 + {4,5}</td><td>1.5</td></tr>
<tr><td>5</td><td>6 + {3,4,5}</td><td>1.5</td><td>6 + 7</td><td>2</td></tr>
<tr><td>6</td><td>7 + {3,4,5,6}</td><td>2</td><td>10 + {8,9}</td><td>3</td></tr>
<tr><td>7</td><td>10 + {8,9}</td><td>2</td><td>{3,4,5} + {6,7}</td><td>5</td></tr>
<tr><td>8</td><td>{3,…,7} + {8,9,10}</td><td>4</td><td>{1,2} + {3,…,7}</td><td>11</td></tr>
<tr><td>9</td><td>{1,2} + {3,…,10}</td><td>4.5</td><td>{1,…,7} + {8,9,10}</td><td>18</td></tr>
</tbody></table></div>
<p>Both reach the same three visible groups after merge 7. But the next merge differs: single linkage joins the middle group to the top-right group (their closest pair, 7–8, is only 4 apart), while complete linkage joins it to the bottom-left group (farthest pair 11, versus 12 to the top-right group). <b>The linkage can change the answer.</b></p>
<p><b>The dendrogram of the single-linkage run</b>, written as an indented tree (each line = a merge and its height; the children are listed underneath). On paper you draw the same tree upside down: leaves at the bottom, each joint at its height.</p>
<pre><code>{1..10}             merged at 4.5
├── {1,2}           merged at 1.5
│   ├── 1
│   └── 2
└── {3..10}         merged at 4
    ├── {3..7}      merged at 2
    │   ├── {3,4,5,6}   merged at 1.5
    │   │   ├── {3,4,5}     merged at 1
    │   │   │   ├── 3
    │   │   │   └── {4,5}       merged at 0.5
    │   │   │       ├── 4
    │   │   │       └── 5
    │   │   └── 6
    │   └── 7
    └── {8,9,10}    merged at 2
        ├── {8,9}       merged at 1
        │   ├── 8
        │   └── 9
        └── 10</code></pre>`,
      cue: R`"Cluster with agglomerative clustering using the Manhattan distance and complete linkage … for each iteration specify the two clusters merged, the distance between them, and the distance between the new cluster and all others. Draw the dendrogram" (2026-A Q4.4).`,
      first: R`With only 6 samples, write the full \(6 \times 6\) Manhattan distance matrix first (15 pairs). Every later max is then a lookup.`,
      recipe: R`Each iteration: smallest entry → merge → new row = entry-wise <b>max</b> of the two merged rows → cross out the two old rows. At the end draw the tree with each joint at its merge distance.`,
      trap: R`Taking the max when choosing <b>which</b> clusters to merge. Max is only for the distance <b>between</b> two clusters; you always merge the pair with the <b>smallest</b> such distance.` },

    { title: "12 · Reading the k = 3 and k = 2 solutions off the hierarchy",
      idea: R`<p><b>Where we are:</b> agglomerative clustering produced a whole sequence of clusterings: \(n\) clusters, then \(n - 1\), …, then 1. <b>The solution for a given \(k\)</b> is simply the state of the algorithm when \(k\) clusters are left. On the dendrogram: cut it with a horizontal line that crosses exactly \(k\) vertical branches.</p>
<h5>Step 1 — a shortcut for single linkage</h5>
<p>You don't have to run all the iterations. Single linkage always merges the two clusters whose <b>closest pair</b> is smallest. So if you can see groups where</p>
<ul>
<li>inside each group, every sample is connected to the rest of its group by a chain of small steps, and</li>
<li>the smallest gap <b>between</b> two groups is bigger than every step needed inside the groups,</li>
</ul>
<p>then all the within-group merges happen before any between-group merge, and those groups appear as a complete state of the algorithm.</p>
<h5>Step 2 — one level up</h5>
<p>From the \(k\)-cluster state, the next merge joins the two clusters with the smallest single-linkage distance — the smallest <b>gap</b> between groups. That gives the \((k - 1)\)-solution.</p>`,
      notation: [
        [R`cutting the dendrogram`, R`stopping the merges when \(k\) clusters are left; the clusters at that moment are the \(k\)-solution`],
        [R`gap between two groups`, R`their single-linkage distance: the closest pair, one sample from each`],
      ],
      example: R`<p><b>2025-A Q2.5</b> (single linkage, Manhattan). <b>Candidate \(k = 3\):</b> \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\).</p>
<p><b>Steps inside the groups</b> (from note 10): \(\{1,2\}\): \(d(1,2) = 1.5\). \(\{3,\dots,7\}\): 4–5 at 0.5, 3–4 at 1, 5–6 at 1.5, 6–7 at 2 — a chain through all five. \(\{8,9,10\}\): 8–9 at 1, 9–10 at 2. Largest step needed: 2.</p>
<p><b>Gaps between the groups:</b></p>
<ul>
<li>\(\{3,\dots,7\}\) to \(\{8,9,10\}\): closest pair 7–8: \(|7 - 9.5| + |6 - 7.5| = 2.5 + 1.5 = 4\)</li>
<li>\(\{1,2\}\) to \(\{3,\dots,7\}\): closest pair 2–3: \(|1.5 - 4| + |2 - 4| = 2.5 + 2 = 4.5\)</li>
<li>\(\{1,2\}\) to \(\{8,9,10\}\): closest pair 2–8: \(|1.5 - 9.5| + |2 - 7.5| = 8 + 5.5 = 13.5\)</li>
</ul>
<p>Every within-group step (≤ 2) is smaller than the smallest gap (4), so the three groups form completely before any gap is crossed: <b>\(k = 3\): \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,\dots,10\}\)</b>.</p>
<p><b>\(k = 2\):</b> the next merge crosses the smallest gap, 4, between \(\{3,\dots,7\}\) and \(\{8,9,10\}\): <b>\(\{1,2\}\) and \(\{3,\dots,10\}\)</b>. Both match the official answer and the full run in note 11 (merges 7 and 8). In the dendrogram of note 11: a cut between heights 2 and 4 crosses three branches; a cut between 4 and 4.5 crosses two.</p>
<p>Compare with K-means (note 6): K-means' best \(k = 2\) split was \(\{1,\dots,6\}\) / \(\{7,\dots,10\}\) — a different answer, because K-means minimises WCSS while single linkage follows the smallest gaps.</p>`,
      cue: R`"Specify the solutions with \(k = 2\) and \(k = 3\) implied by the hierarchical clustering … no need to execute the entire algorithm" (2025-A Q2.5).`,
      first: R`Name the visible groups, then compute the smallest \(L_1\) gap between each pair of groups.`,
      recipe: R`\(k\)-solution: groups whose inner steps are all smaller than the smallest gap. \((k-1)\)-solution: merge the two groups with the smallest gap. Justify both with the numbers.`,
      trap: R`Merging the groups that "look" closer on the plot. Compute the gaps: here 4 (middle–top) beats 4.5 (bottom–middle), so \(\{1,2\}\) stays alone at \(k = 2\).` },

    { title: "13 · The K-means code",
      idea: R`<p>Two of the three clustering questions (2025-C Q5.5 and 2026-A Q4.5) end with K-means code with blanks. The code only ever does the things from notes 2–5, so read each line and ask "which note is this?". Your own HW6 <code>kmeans</code> has the same structure.</p>
<p><b>2025-C Q5.5, with the six blanks filled in</b> (official answers) and the note each line comes from:</p>
<pre><code>def kmeans_step(X, centroids):
    n, d = X.shape                                   # (1) rows = n samples, columns = d features
    k = len(centroids)

    # assignment step (note 2)
    distances = np.zeros((n, k))                     # row i = sample i, column j = centroid j
    for i in range(n):
        for j in range(k):
            distances[i, j] = np.sum((X[i] - centroids[j]) ** 2)    # (2) squared distance
    cluster_assignments = np.argmin(distances, axis=1)  # in each ROW: which column is smallest

    # update step (note 3)
    new_centroids = np.zeros_like(centroids)
    for j in range(k):
        idx = (cluster_assignments == j)             # True/False per sample: in cluster j?
        if idx.any() > 0:                            # (3) at least one True = not empty
            new_centroids[j] = X[idx].mean(axis=0)   # mean of the rows in cluster j
        else:
            new_centroids[j] = centroids[j]          # empty cluster: keep the old centroid

    # compute WCSS (note 4, "after the update")
    wcss = np.sum(np.sum((X - new_centroids[cluster_assignments]) ** 2))   # (4)
    return new_centroids, cluster_assignments, wcss

def run_kmeans(X, initial_centroids, max_iter=100):
    centroids = initial_centroids
    prev_wcss = np.inf
    for i in range(max_iter):
        centroids, clusters, wcss = kmeans_step(X, centroids)
        if wcss == prev_wcss:                        # (5) no change = converged (note 5)
            break
        prev_wcss = wcss                             # (6) remember it for the next round
    return centroids, clusters, wcss</code></pre>
<p><b>Blank (4) decoded.</b> (The exam's printed line has one bracket too many; the line above is what it means: subtract, square, add everything up.) <code>new_centroids[cluster_assignments]</code> uses the list of cluster numbers as row indices: it builds an \(n\)-row array whose row \(i\) is the centroid of sample \(i\)'s cluster. With 2025-C's result, <code>cluster_assignments = [0,0,0,1,1,1]</code>, so it is three copies of \((\tfrac43, \tfrac43)\) followed by three copies of \((6.5, 6.5)\). <code>X</code> minus that, squared, summed = \(\tfrac73\), the WCSS after the update from note 4.</p>
<p><b>Blanks (5)–(6)</b> are note 5 as code: WCSS never goes up, and when it stops changing the assignments have stopped changing. <code>prev_wcss</code> starts at infinity so the first round never stops.</p>`,
      notation: [
        [R`<code>X.shape</code>`, R`<code>(n, d)</code>: number of rows (samples) and columns (features)`],
        [R`<code>np.argmin(D, axis=1)</code>`, R`for each <b>row</b> of <code>D</code>, the column index of its smallest entry. <code>axis=0</code>: for each <b>column</b>, the row index.`],
        [R`<code>idx = (a == j)</code>`, R`a boolean mask: an array of True/False, one per sample. <code>X[idx]</code> keeps only the rows where it's True.`],
        [R`<code>X[idx].mean(axis=0)</code>`, R`average down the rows = the mean point (one value per column)`],
      ],
      example: R`<p><b>2026-A Q4.5: the same algorithm, organised differently.</b> What changes, and the official blanks:</p>
<pre><code>def l2_dist_from_centroids(X, centroids):
    distances = []
    for j in range(len(centroids)):
        d_j = np.sum(np.abs(X - centroids[j]) ** 2, axis=1) ** 0.5   # (1) 0.5 = square root
        distances.append(d_j)                        # d_j: distances of ALL samples to centroid j
    return np.array(distances)                       # shape (k, n): one ROW per centroid

    ...
        distances = l2_dist_from_centroids(X, centroids)
        cluster_assignments = np.argmin(distances, axis=0)   # down each COLUMN (= each sample)
        new_centroids = np.zeros_like(centroids)
        for j in range(k):
            members = X[cluster_assignments == j]    # the actual rows of cluster j
            if len(members) == 0:                    # (2) empty cluster
                new_centroids[j] = X[np.random.randint(n)]   # rule: a random sample
            else:
                new_centroids[j] = np.mean(members, axis=0)  # (3) note 3
        WCSS = np.sum(distances[cluster_assignments, np.arange(n)] ** 2)
        if abs(prev_WCSS - WCSS) &lt; epsilon:          # (4) stopped changing (note 5)
            break
        prev_WCSS = WCSS
        centroids = new_centroids</code></pre>
<ul>
<li><b>(1)</b> Euclidean distance = square root of the sum of squares (note 1). The line already squares and sums, so the blank is the root: <code>0.5</code>.</li>
<li><b>Shape \(k \times n\)</b> instead of \(n \times k\): one row per centroid. So <code>argmin(..., axis=0)</code> looks down each column (each sample) — the opposite axis from 2025-C. Your HW6 <code>l_p_dist_from_centroids</code> returns the same \((k, n)\) shape.</li>
<li><b>(2)–(3)</b> The empty-cluster rule from the question text ("randomly selects one sample"): test for emptiness first, otherwise the mean. Your HW6 <code>kmeans</code> handles empty clusters the same way.</li>
<li><b>The WCSS line</b> picks, for each sample \(i\), the entry <code>[its cluster, i]</code> — its distance to its own <b>old</b> centroid — and squares it (undoing the root). So this is the "before the update" WCSS of note 4.</li>
<li><b>(4)</b> a tolerance version of 2025-C's <code>wcss == prev_wcss</code>: stop when the change is smaller than <code>epsilon</code>.</li>
</ul>`,
      cue: R`"Complete the missing parts of the code by filling the blocks labeled 1–6" (2025-C Q5.5); "… a centroid with no assigned samples gets a random sample … complete 1–4" (2026-A Q4.5).`,
      first: R`Before touching a blank, write the shape of every array next to it (<code>distances</code>: \(n \times k\) or \(k \times n\)?). Most blanks follow from the shapes and the comments.`,
      trap: R`<code>len(idx)</code> for a boolean mask is always \(n\) (it has one True/False per sample) — it can't detect an empty cluster; use <code>idx.any()</code> or <code>idx.sum()</code>. <code>len(members)</code> works in 2026-A only because <code>members</code> holds the selected rows. And a stop test of <code>wcss &lt; prev_wcss</code> would stop after the very first round (anything is smaller than infinity).` },

    { title: "14 · Looking ahead: K-means is \"hard-assignment EM\"",
      idea: R`<p>The next topic, GMM/EM, clusters data with the same two-step loop as K-means, only "softer". Seeing the match now makes EM much easier to follow.</p>
<h5>Step 1 — hard versus soft assignments</h5>
<p>In K-means step A, each sample belongs to exactly <b>one</b> cluster: fully in, or not at all. In a Gaussian mixture model (GMM) each cluster is a bell-shaped cloud, and each sample gets a <b>responsibility</b> \(r(i, j)\) for every cluster: a number between 0 and 1 saying how much sample \(i\) belongs to cluster \(j\), with each sample's responsibilities adding up to 1. A sample halfway between two clouds might get 0.5 and 0.5.</p>
<h5>Step 2 — the two EM steps are steps A and B</h5>
<ul>
<li><b>E-step</b> (expectation) = step A: compute every sample's responsibilities from the current clusters.</li>
<li><b>M-step</b> (maximisation) = step B: recompute each cluster's centre as a <b>weighted</b> average, each sample weighted by its responsibility. On the formula sheet: \(n_j = \sum_{i=1}^n r(i,j)\) and \(\mu_j = \frac{1}{n_j}\sum_{i=1}^n r(i,j)\,x^{(i)}\).</li>
</ul>
<h5>Step 3 — K-means is the special case with 0-or-1 responsibilities</h5>
<p>If every responsibility is 1 for the nearest centroid and 0 for the others, then \(n_j\) counts the samples of cluster \(j\) (it is \(|C_j|\)), and the weighted average keeps only cluster \(j\)'s samples — exactly the K-means mean. That's why K-means is called <b>hard-assignment EM</b>. Like K-means, EM repeats E and M until the change is below a tolerance, and it can also get stuck in a local optimum that depends on the start.</p>`,
      notation: [
        [R`\(r(i, j)\)`, R`responsibility: how much sample \(i\) belongs to cluster \(j\), between 0 and 1. In K-means it is always 0 or 1.`],
        [R`\(n_j = \sum_i r(i,j)\)`, R`the "effective size" of cluster \(j\); with 0/1 responsibilities it is \(|C_j|\)`],
      ],
      example: R`<p><b>2025-C's first iteration written as EM.</b> After step A (note 2) the responsibilities are 0/1:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody>
<tr><td>\(r(i, 1)\)</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>\(r(i, 2)\)</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td></tr></tbody></table></div>
<p>M-step for cluster 1: \(n_1 = 1 + 1 + 1 + 0 + 0 + 0 = 3\), and</p>
\[\mu_1 = \tfrac13\big(1\cdot(1,1) + 1\cdot(1,2) + 1\cdot(2,1) + 0\cdot(6,6) + 0\cdot(6.5,7) + 0\cdot(7,6.5)\big) = \tfrac13(4, 4) = \left(\tfrac43, \tfrac43\right)\]
<p>— the same centroid as K-means' step B in note 3. In a GMM the zeros and ones would be replaced by probabilities such as 0.97 and 0.03, and the far samples would pull on \(\mu_1\) a little.</p>` },
  ],
    hints: {
      "2025A-q2": {
        1: R`Ask what differs between two K-means runs on the same data with the same \(k\): only the starting centroids. Then recall that K-means converges to a <b>local</b> minimum that depends on that start (notes 5–6).`,
        2: R`Name the score K-means minimises — WCSS, on the formula sheet. Describe the two calculations (each cluster's mean, then the sum of squared distances to the own mean), say "smaller is better" and why (note 6).`,
        3: R`First cross out any plot where the value goes <b>up</b> with \(k\): the best WCSS can't increase. Then count the visible groups on the scatter plot; the elbow belongs at that \(k\) (note 7).`,
        4: R`List the nearby pairs from the plot with their \(L_1\) distances — the smallest is samples 4 and 5 at 0.5. After each merge the new cluster's distance to any other cluster is the <b>min</b> of its two parts' distances (note 10). The official iteration-3 table has slips: \(\{8,9\}\) is at 6 from sample 6 and 4 from sample 7.`,
        5: R`Name the three visible groups, then compute the smallest \(L_1\) gap between each pair of groups (closest pair, one sample from each) and compare it with the largest step needed inside a group. Single linkage finishes the groups before crossing any gap (note 12).`,
      },
      "2025C-q5": {
        1: R`Draw a table of squared distances from each of the 6 samples to \(\mu_1 = (1,1)\) and \(\mu_2 = (6,6)\) (note 2). The row minimums give the assignment, and their sum is the WCSS before the update (note 4).`,
        2: R`Redo only the assignment step with the new centroids \((\tfrac43, \tfrac43)\) and \((6.5, 6.5)\) and check whether any sample switches (note 5).`,
        3: R`For each sample write "squared distance to the centroid it should pick &lt; squared distance to the other", with \(\mu_2 = (a,a)\), and solve for \(a\); then intersect (note 8). The official "\(a > 2\)" misses the upper limit — the correct range is \(2 \lt  a \lt  11\).`,
        4: R`Try to write each cluster's pairwise sum in terms of the distances to the cluster mean \(\mu_j\), i.e. relate \(\widetilde{\text{WCSS}}\) to WCSS (note 9). The graders expect "no modification needed, since \(\widetilde{\text{WCSS}} = 2\,\text{WCSS}\)"; the official identity drops a factor \(|C_j|\) — note 9 says how to handle that in one sentence.`,
        5: R`Map each blank to a note: (1) the shape of <code>X</code>, (2) a squared distance, (3) "is the cluster non-empty?", (4) each sample's own new centroid, (5)–(6) stop when WCSS stops changing (note 13).`,
      },
      "2026A-q4": {
        1: R`Exactly the 2025-C Q5.1 routine (notes 2–4): a table of squared distances from every sample to \((0,0)\) and \((8,8)\), assign by the row minimum, WCSS before = sum of those minimums, then the means, then the WCSS after.`,
        2: R`Run the assignment step once more with your new centroids and check whether any sample switches (note 5).`,
        3: R`Choose three groups (for example, split one of the two visible groups), compute each group's mean, and show every sample is nearest to its own mean (note 5).`,
        4: R`With 6 samples, write the full Manhattan distance matrix first. Merge the smallest entry; for complete linkage the merged cluster's distance to another is the <b>max</b> of its parts' distances (note 11). Record each merge height for the dendrogram.`,
        5: R`Write the shape next to <code>distances</code> first: one row per centroid (\(k \times n\)). Blank (1) turns the sum of squares into a distance; (2)–(4) are the empty-cluster test, the mean, and the epsilon stop rule (note 13).`,
      },
    },
  };
})();
