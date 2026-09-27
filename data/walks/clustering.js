// Walkthroughs for the Clustering questions — CASUAL style (spec/WALKS.md):
// the point first, then few moves, plain words, only the lines that earn the points.
// Every number verified with python3 (fractions / numpy).
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ─────────────────────────── 2025-A Q2 ───────────────────────────
    "2025A-q2.1": {
      point: R`<p>K-means stops at a local minimum, and which one depends on the random starting centroids. Two runs = two random starts, so they can end in two different solutions. Anna is right.</p>`,
      moves: [
        { line: R`<b>The only difference between the two runs is the start</b> — same data, same \(k\); the starting centroids are picked at random.` },
        { line: R`<b>K-means stops at a local minimum that depends on the start</b> (not necessarily the best solution). So different starts can end in different solutions. Anna is right. Done.`,
          why: R`<p>Each iteration can only lower WCSS: assigning moves each sample to its nearest centroid, and the mean is the best centre for its cluster. It stops when nobody switches. So it stops at the first point where no step helps — that depends on where it started.</p>` },
      ],
      compare: R`The official answer is one sentence: "K-means can converge to different solutions from different initializations of the centroids" — moves 1 + 2.`,
    },

    "2025A-q2.2": {
      point: R`<p>Compute each solution's WCSS — the score K-means itself minimises — and the smaller one is better.</p>`,
      start: R`<p><b>1. For each cluster, its centroid:</b></p>\[\mu_j = \;\square\]<p><b>2. The WCSS:</b></p>\[\text{WCSS} = \;\square\]<p>The solution with the \(\square\) WCSS is better, because \(\square\)</p>`,
      moves: [
        { line: R`<b>Centroids</b> — each cluster's mean (add its samples, divide by how many): <div class="formula">\[\mu_j = \frac{1}{|C_j|}\sum_{i \in C_j} x_i\]</div>[sheet: Within-cluster sum of squares (WCSS)]`,
          why: R`<p>Averaging points = averaging each coordinate. Cluster \(\{8, 9, 10\}\):</p>
\[\mu = \left(\tfrac{9.5 + 10 + 11}{3},\ \tfrac{7.5 + 8 + 9}{3}\right) \approx (10.17,\ 8.17)\]
<p>You don't need to know it by heart: \(\mu_j\) is on the formula sheet, right next to WCSS.</p>` },
        { line: R`<b>WCSS</b> — every sample's squared distance to its own centroid, all added: <div class="formula">\[\text{WCSS} = \sum_{j=1}^{k}\ \sum_{i \in C_j} \underbrace{\color{#e8912d}\|x_i - \mu_j\|^2}_{\textstyle\color{#e8912d}\begin{array}{c}\text{this part = sample } i\\ \text{to its centroid, squared}\end{array}}\]</div>`,
          why: R`<p>The two sums just mean: for each cluster, for each sample in it. With \(k = 2\) it is literally</p>
\[\text{WCSS} = \sum_{i \in C_1}\|x_i - \mu_1\|^2 + \sum_{i \in C_2}\|x_i - \mu_2\|^2\]
<p>Every sample appears once, measured against its own cluster's centroid.</p>` },
        { line: R`<b>Smaller wins</b> — smaller WCSS = samples closer to their centroids = tighter clusters. It's exactly what K-means minimises, and both solutions have \(k = 2\), so it's a fair comparison. Done.` ,
          extra: [{ label: "check it with numbers (two real k = 2 solutions)", html: R`<p>Running K-means on this data from two different starts gives two different converged solutions (start on samples 7 and 8, or on samples 1 and 10):</p>
<div class="tw"><table><thead><tr><th>solution</th><th>clusters</th><th>WCSS</th></tr></thead><tbody>
<tr><td>S1</td><td>{1,…,7} and {8, 9, 10}</td><td>50.26</td></tr>
<tr><td>S2</td><td>{1,…,6} and {7,…,10}</td><td>46.29</td></tr></tbody></table></div>
<p>46.29 &lt; 50.26, so S2 is the better one. (The exam didn't ask for these numbers.)</p>` }] },
      ],
      compare: R`The official steps 1 and 2 are moves 1 and 2; its "the solution with smaller WCSS is the better one" is move 3. The question also asks <i>why</i> — move 3's reason covers it.`,
    },

    "2025A-q2.3": {
      point: R`<p>The best WCSS never goes up as \(k\) grows, so C is out. The data has 3 visible groups, so WCSS drops a lot up to \(k = 3\) and only a little after: an elbow at 3 = plot A.</p>`,
      moves: [
        { line: R`<b>C is impossible</b> — it goes <b>up</b> from \(k = 3\) to \(k = 4\), but the best WCSS can never go up when \(k\) grows.`,
          why: R`<p>Take the best 3-cluster solution and put a 4th centroid exactly on one sample. That sample's term becomes 0, nobody else changes. So some 4-cluster solution is already at least as good, and the best one is at least that good. This holds because the question says "an optimal solution per \(k\)" — quote it.</p>` },
        { line: R`<b>The data has 3 visible groups</b>: \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\). So \(2 \to 3\) splits two real groups apart (big drop), and \(3 \to 4\) only cuts a tight group in two (small drop).` },
        { line: R`<b>So the elbow is at \(k = 3\): plot A.</b> B drops about the same from 2 to 3 and from 3 to 4 — no elbow. Done.`,
          extra: [{ label: "the real numbers behind it", html: R`<p>The best WCSS for each \(k\) on this data (found by trying every split):</p>
<div class="tw"><table><thead><tr><th>\(k\)</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><td>best WCSS</td><td>166</td><td>46.29</td><td>11.46</td><td>4.63</td></tr>
<tr><td>drop</td><td></td><td>119.71</td><td>34.83</td><td>6.83</td></tr></tbody></table></div>
<p>The last drop is tiny next to the ones before it: the elbow is at \(k = 3\), like plot A.</p>` }] },
      ],
      compare: R`Same as the official solution: C is out because WCSS goes up; three visible groups, so the drop from 3 to 4 is smaller than from 2 to 3 — A's elbow, not B.`,
    },

    "2025A-q2.4": {
      point: R`<p>Merge the two closest clusters. The merged cluster's distance to anyone = the <b>smaller</b> of its two parts' distances (single linkage = closest pair). Distances are Manhattan: \(|\Delta x_1| + |\Delta x_2|\).</p>`,
      start: R`<p><b>Iteration 1:</b> merge \(\square\) and \(\square\) (distance \(\square\)). The new cluster's distances:</p>
\[\begin{array}{c|ccc}\text{to} & \square & \square & \cdots\\ \hline d(\text{new}, \cdot) & \square & \square & \cdots\end{array}\]
<p><b>Iteration 2:</b> … <b>Iteration 3:</b> … (the same two lines each)</p>`,
      moves: [
        { line: R`<b>Iteration 1: merge 4 and 5</b> — the closest pair: \(|4.5 - 4.5| + |4.5 - 5| = 0.5\). \(\{4,5\}\)'s distance to each sample = the smaller of sample 4's and sample 5's: <div class="formula">\[\begin{array}{c|cccccccc}\text{to} & 1 & 2 & 3 & 6 & 7 & 8 & 9 & 10\\ \hline d(\{4,5\}, \cdot) & 7 & 5.5 & 1 & 1.5 & 3.5 & 7.5 & 8.5 & 10.5\end{array}\]</div>`,
          why: R`<p>Manhattan distance = the [sheet: L1 norm] of the difference: absolute differences added, no squares. Example: \(d(4, 1) = |4.5 - 1| + |4.5 - 1| = 3.5 + 3.5 = 7\).</p>
<p>Nothing else is at 0.5 or less: the next-closest pairs are 3–4 and 8–9, at 1.</p>
<div class="tw"><table><thead><tr><th>to</th><th>1</th><th>2</th><th>3</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead><tbody>
<tr><td>\(d(4, \cdot)\)</td><td>7</td><td>5.5</td><td>1</td><td>2</td><td>4</td><td>8</td><td>9</td><td>11</td></tr>
<tr><td>\(d(5, \cdot)\)</td><td>7.5</td><td>6</td><td>1.5</td><td>1.5</td><td>3.5</td><td>7.5</td><td>8.5</td><td>10.5</td></tr>
<tr><td><b>min</b></td><td>7</td><td>5.5</td><td>1</td><td>1.5</td><td>3.5</td><td>7.5</td><td>8.5</td><td>10.5</td></tr></tbody></table></div>
<p>Why the smaller: single linkage = the closest pair between the two clusters, and the closest pair from \(\{4,5\}\) uses whichever of 4 or 5 is closer.</p>` },
        { line: R`<b>Iteration 2: merge \(\{4,5\}\) and 3</b> — distance 1 (row above; 8–9 ties at 1, see why?). New row = the smaller of \(\{4,5\}\)'s row and sample 3's: <div class="formula">\[\begin{array}{c|ccccccc}\text{to} & 1 & 2 & 6 & 7 & 8 & 9 & 10\\ \hline d(\{3,4,5\}, \cdot) & 6 & 4.5 & 1.5 & 3.5 & 7.5 & 8.5 & 10.5\end{array}\]</div>`,
          why: R`<p>8–9 is also at 1: a tie, either may go first. The official takes \(\{4,5\}\) + 3; 8–9 then goes in iteration 3.</p><div class="tw"><table><thead><tr><th>to</th><th>1</th><th>2</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead><tbody>
<tr><td>\(d(\{4,5\}, \cdot)\)</td><td>7</td><td>5.5</td><td>1.5</td><td>3.5</td><td>7.5</td><td>8.5</td><td>10.5</td></tr>
<tr><td>\(d(3, \cdot)\)</td><td>6</td><td>4.5</td><td>3</td><td>5</td><td>9</td><td>10</td><td>12</td></tr>
<tr><td><b>min</b></td><td>6</td><td>4.5</td><td>1.5</td><td>3.5</td><td>7.5</td><td>8.5</td><td>10.5</td></tr></tbody></table></div>` },
        { line: R`<b>Iteration 3: merge 8 and 9</b> — \(|9.5 - 10| + |7.5 - 8| = 1\); everything else is now at least 1.5. New row = the smaller of 8's and 9's: <div class="formula">\[\begin{array}{c|cccccc}\text{to} & 1 & 2 & \{3,4,5\} & 6 & 7 & 10\\ \hline d(\{8,9\}, \cdot) & 15 & 13.5 & 7.5 & 6 & 4 & 2\end{array}\]</div>Done.`,
          why: R`<div class="tw"><table><thead><tr><th>to</th><th>1</th><th>2</th><th>{3,4,5}</th><th>6</th><th>7</th><th>10</th></tr></thead><tbody>
<tr><td>\(d(8, \cdot)\)</td><td>15</td><td>13.5</td><td>7.5</td><td>6</td><td>4</td><td>3</td></tr>
<tr><td>\(d(9, \cdot)\)</td><td>16</td><td>14.5</td><td>8.5</td><td>7</td><td>5</td><td>2</td></tr>
<tr><td><b>min</b></td><td>15</td><td>13.5</td><td>7.5</td><td>6</td><td>4</td><td>2</td></tr></tbody></table></div>
<p>The \(\{3,4,5\}\) column comes from iteration 2's row (7.5 to sample 8, 8.5 to sample 9).</p>`,
          extra: [{ label: "the official iteration-3 table has slips", html: R`<p>Its header says \(D(\{4,5\}, i)\), but it is \(\{8,9\}\)'s row. And it gives 3.5 for sample 6 and 2 for sample 7. Correct: \(d(\{8,9\}, 6) = \min(6, 7) = 6\) and \(d(\{8,9\}, 7) = \min(4, 5) = 4\). The merges themselves are right.</p>` }] },
      ],
      compare: R`Same three merges as the official solution. Its iteration-3 table is \(\{8,9\}\)'s row (not \(\{4,5\}\)'s), and the entries for samples 6 and 7 should be 6 and 4 (it prints 3.5 and 2).`,
    },

    "2025A-q2.5": {
      point: R`<p>Single linkage merges the smallest gaps first. Inside each visible group the steps are \(\le 2\); between groups every gap is \(\ge 4\). So the 3 groups form first (\(k = 3\)), then the two closest groups join (\(k = 2\)).</p>`,
      moves: [
        { line: R`<b>\(k = 3\): the three visible groups</b> \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\) — inside each, every sample has a neighbour in its group at distance \(\le 2\); between groups the closest pair is 4 (samples 7, 8).`,
          why: R`<p>The chains inside the groups: 1–2 (1.5); 4–5 (0.5), 3–4 (1), 5–6 (1.5), 6–7 (2); 8–9 (1), 9–10 (2). All \(\le 2\).</p>
<p>Single linkage always merges the smallest distance, so every merge at \(\le 2\) happens before any merge at 4. The groups are complete before any two of them touch.</p>` },
        { line: R`<b>The gaps between the groups</b> (closest pair, Manhattan): <div class="formula">\[\begin{array}{c|c|c}\text{groups} & \text{closest pair} & \text{gap}\\ \hline \{1,2\},\ \{3..7\} & 2,\ 3 & 2.5 + 2 = 4.5\\ \{3..7\},\ \{8,9,10\} & 7,\ 8 & 2.5 + 1.5 = 4\\ \{1,2\},\ \{8,9,10\} & 2,\ 8 & 8 + 5.5 = 13.5\end{array}\]</div>` },
        { line: R`<b>\(k = 2\): the smallest gap merges</b> — \(4 \lt 4.5\), so \(\{3,\dots,7\}\) and \(\{8,9,10\}\) join: \(\{1,2\}\) and \(\{3,\dots,10\}\). Done.` },
      ],
      compare: R`Same answer and reasons as the official solution: \(k = 3\) is \(\{1,2\}, \{3\text{–}7\}, \{8\text{–}10\}\) (closest cross-group pair 4, every sample has a closer partner in its group); \(k = 2\) merges at \(D(7, 8) = 4 \lt D(2, 3) = 4.5\).`,
    },

    // ─────────────────────────── 2025-C Q5 ───────────────────────────
    "2025C-q5.1": {
      point: R`<p>One iteration = assign each sample to its nearest centroid, then move each centroid to its cluster's mean. WCSS before = squared distances to the old centroids; after = to the new ones.</p>`,
      start: R`<p><b>Squared distances</b> (table: each sample to \(\mu_1\) and to \(\mu_2\)) → \(C_1 = \square\), \(C_2 = \square\)</p>
\[\text{WCSS}_{\text{before}} = \square\]
\[\mu_1 = \square,\qquad \mu_2 = \square\]
\[\text{WCSS}_{\text{after}} = \square\]`,
      moves: [
        { line: R`<b>Assign</b> — squared distance of each sample to \((1,1)\) and to \((6,6)\); the smaller wins: <div class="formula">\[\begin{array}{c|cccccc}\text{sample} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline \text{to }(1,1) & \mathbf{0} & \mathbf{1} & \mathbf{1} & 50 & 66.25 & 66.25\\ \text{to }(6,6) & 50 & 41 & 41 & \mathbf{0} & \mathbf{1.25} & \mathbf{1.25}\end{array}\]</div>So \(C_1 = \{1,2,3\}\), \(C_2 = \{4,5,6\}\).`,
          why: R`<p>Squared distance = \((\Delta x_1)^2 + (\Delta x_2)^2\) — the [sheet: L2 norm] without the root. The nearest centroid is the same with or without the root.</p>
<div class="tw"><table><thead><tr><th>sample</th><th>to (1, 1)</th><th>to (6, 6)</th></tr></thead><tbody>
<tr><td>1 (1, 1)</td><td>0² + 0² = 0</td><td>5² + 5² = 50</td></tr>
<tr><td>2 (1, 2)</td><td>0² + 1² = 1</td><td>5² + 4² = 41</td></tr>
<tr><td>3 (2, 1)</td><td>1² + 0² = 1</td><td>4² + 5² = 41</td></tr>
<tr><td>4 (6, 6)</td><td>5² + 5² = 50</td><td>0² + 0² = 0</td></tr>
<tr><td>5 (6.5, 7)</td><td>5.5² + 6² = 66.25</td><td>0.5² + 1² = 1.25</td></tr>
<tr><td>6 (7, 6.5)</td><td>6² + 5.5² = 66.25</td><td>1² + 0.5² = 1.25</td></tr></tbody></table></div>` },
        { line: R`<b>WCSS before</b> — the new clusters with the old centroids = just the winning numbers of move 1, added: <div class="formula">\[\text{WCSS} = \underbrace{\color{#e8912d}0 + 1 + 1}_{\textstyle\color{#e8912d}C_1\text{ to }(1,1)} + \underbrace{\color{#4c8dff}0 + 1.25 + 1.25}_{\textstyle\color{#4c8dff}C_2\text{ to }(6,6)} = 4.5\]</div>`,
          why: R`<p>WCSS = each sample's squared distance to its own cluster's centroid, all added ([sheet: Within-cluster sum of squares (WCSS)]). "Before the update" = the centroids are still \((1,1)\) and \((6,6)\), so those distances are exactly move 1's winners.</p>` },
        { line: R`<b>Update</b> — each centroid = the mean of its cluster: <div class="formula">\[\begin{aligned}\mu_1 &= \left(\tfrac{1+1+2}{3},\ \tfrac{1+2+1}{3}\right) = \left(\tfrac43,\ \tfrac43\right)\\ \mu_2 &= \left(\tfrac{6+6.5+7}{3},\ \tfrac{6+7+6.5}{3}\right) = (6.5,\ 6.5)\end{aligned}\]</div>`,
          why: R`<p>\(\mu_j = \frac{1}{|C_j|}\sum_{i \in C_j} x^{(i)}\): add the cluster's samples, divide by how many — one coordinate at a time. [sheet: Within-cluster sum of squares (WCSS)]</p>` },
        { line: R`<b>WCSS after</b> — same clusters, new centroids: <div class="formula">\[\begin{array}{c|cccccc}\text{sample} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline \text{to own new }\mu & \tfrac29 & \tfrac59 & \tfrac59 & \tfrac12 & \tfrac14 & \tfrac14\end{array}\]</div><div class="formula">\[\text{WCSS} = \tfrac{12}{9} + 1 = \tfrac73 = 2\tfrac13\]</div>Done.`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>minus its new \(\mu\)</th><th>squared, added</th></tr></thead><tbody>
<tr><td>1 (1, 1)</td><td>\((-\tfrac13, -\tfrac13)\)</td><td>\(\tfrac19 + \tfrac19 = \tfrac29\)</td></tr>
<tr><td>2 (1, 2)</td><td>\((-\tfrac13, \tfrac23)\)</td><td>\(\tfrac19 + \tfrac49 = \tfrac59\)</td></tr>
<tr><td>3 (2, 1)</td><td>\((\tfrac23, -\tfrac13)\)</td><td>\(\tfrac49 + \tfrac19 = \tfrac59\)</td></tr>
<tr><td>4 (6, 6)</td><td>\((-0.5, -0.5)\)</td><td>\(0.25 + 0.25 = 0.5\)</td></tr>
<tr><td>5 (6.5, 7)</td><td>\((0, 0.5)\)</td><td>\(0 + 0.25 = 0.25\)</td></tr>
<tr><td>6 (7, 6.5)</td><td>\((0.5, 0)\)</td><td>\(0.25 + 0 = 0.25\)</td></tr></tbody></table></div>
<p>\(C_1\): \(\tfrac{2+5+5}{9} = \tfrac{12}{9}\). \(C_2\): \(0.5 + 0.25 + 0.25 = 1\). It went down from 4.5, as it must: the mean is the best centre.</p>` },
      ],
      compare: R`Same numbers as the official solution (it writes 1.25 as \(\tfrac54\)): assignment 1–3 / 4–6, WCSS 4.5, centroids \((\tfrac43, \tfrac43)\) and \((6.5, 6.5)\), WCSS \(2\tfrac13\).`,
    },

    "2025C-q5.2": {
      point: R`<p>WCSS only changes if some sample switches cluster. With the new centroids nobody switches, so the means stay the same, so the WCSS stays the same.</p>`,
      moves: [
        { line: R`<b>Assign again with the new centroids</b> \((\tfrac43, \tfrac43)\), \((6.5, 6.5)\) — every sample is still much closer to its own: <div class="formula">\[\begin{array}{c|cccccc}\text{sample} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline \text{to own} & 0.22 & 0.56 & 0.56 & 0.5 & 0.25 & 0.25\\ \text{to other} & 60.5 & 50.5 & 50.5 & 43.6 & 58.8 & 58.8\end{array}\]</div>`,
          why: R`<p>"To own" is part 1, move 4. "To other", e.g. sample 1 to \((6.5, 6.5)\): \(5.5^2 + 5.5^2 = 60.5\); sample 4 to \((\tfrac43, \tfrac43)\): \((\tfrac{14}{3})^2 \cdot 2 = \tfrac{392}{9} \approx 43.6\).</p>` },
        { line: R`<b>Nobody switches, so the means don't change, so the WCSS stays the same</b> (\(2\tfrac13\)). Done.`,
          why: R`<p>WCSS can never go up in an iteration; it only goes down if some sample switches. K-means has converged.</p>` },
      ],
      compare: R`Same as the official solution: no change in the assignments, so the centroids and the WCSS stay the same.`,
    },

    "2025C-q5.3": {
      point: R`<p>Same outcome = every sample picks the same centroid as in part 1. So write one inequality per sample with \(\mu_2 = (a, a)\), and keep the \(a\)'s that satisfy all six.</p>`,
      start: R`<p>For each sample: squared distance to the centroid it must pick \(\lt\) squared distance to the other.</p>
\[\begin{aligned}\text{Sample 1:}\;& \square \lt \square\\ &\text{so } \square\\ &\vdots\end{aligned}\]
<p>All together: \(\;\square \lt a \lt \square\)</p>`,
      moves: [
        { line: R`<b>Samples 1–3 must pick \((1,1)\)</b>, so distance to \((1,1)\) \(\lt\) distance to \((a,a)\): <div class="formula">\[\begin{aligned}\text{Sample 1:}\;& 0 \lt 2(1-a)^2\\ &\text{so } a \ne 1\\[4pt] \text{Samples 2, 3:}\;& 1 \lt 2a^2 - 6a + 5\\ &\text{so } a \lt 1 \text{ or } a \gt 2\end{aligned}\]</div>`,
          why: R`<p>Sample 2 \((1,2)\): \((1-a)^2 + (2-a)^2 = 2a^2 - 6a + 5\). Need it \(\gt 1\):</p>
\[\begin{aligned}2a^2 - 6a + 4 &\gt 0\\ a^2 - 3a + 2 = (a-1)(a-2) &\gt 0\end{aligned}\]
<p>A product is positive when both brackets have the same sign: \(a \lt 1\) or \(a \gt 2\). Sample 3 \((2,1)\) is sample 2 with the coordinates swapped — same numbers.</p>` },
        { line: R`<b>Samples 4–6 must pick \((a,a)\)</b>, so distance to \((a,a)\) \(\lt\) distance to \((1,1)\): <div class="formula">\[\begin{aligned}\text{Sample 4:}\;& 2(6-a)^2 \lt 50\\ &\text{so } 1 \lt a \lt 11\\[4pt] \text{Samples 5, 6:}\;& 2a^2 - 27a + 91.25 \lt 66.25\\ &\text{so } 1 \lt a \lt 12.5\end{aligned}\]</div>`,
          why: R`<p>Sample 4: \(2(6-a)^2 \lt 50\), so \((6-a)^2 \lt 25\), so \(-5 \lt 6 - a \lt 5\), so \(1 \lt a \lt 11\).</p>
<p>Sample 5 \((6.5, 7)\): \((6.5-a)^2 + (7-a)^2 = 2a^2 - 27a + 91.25 \lt 66.25\), so \(2a^2 - 27a + 25 \lt 0\). Roots ([sheet: Quadratic roots]) \(a = \frac{27 \pm \sqrt{729 - 200}}{4} = \frac{27 \pm 23}{4}\): 1 and 12.5. Negative between the roots: \(1 \lt a \lt 12.5\). Sample 6 is sample 5 swapped.</p>` },
        { line: R`<b>All six at once</b> — \(a \lt 1\) is killed by sample 4 (\(a \gt 1\)), so \(a \gt 2\); and sample 4 caps it at 11: <div class="formula">\[2 \lt a \lt 11\]</div>Done.`,
          why: R`<p>At exactly \(a = 2\) or \(a = 11\) some sample is equally far from both centroids — a tie, so leave them out.</p>`,
          extra: [{ label: "the official answer says a > 2 — it misses the upper limit", html: R`<p>It claims "as long as \(a \gt 1\), samples 4–6 go to \(\mu_2\)", which ignores a \(\mu_2\) placed far beyond the data. Example \(a = 12\): sample 4 to \((12,12)\) is \(2 \cdot 6^2 = 72\), more than its 50 to \((1,1)\), so sample 4 switches and the outcome changes. Correct range: \(2 \lt a \lt 11\). Show sample 4's inequality so the grader sees where 11 comes from. (It also writes \(x^{(1)}\) where it means \(x^{(3)}\).)</p>` }] },
      ],
      compare: R`Move 1 matches the official solution (\(a \ne 1\), \((a-1)(a-2) \gt 0\)). Its "\(a \gt 1\)" for samples 4–6 and its conclusion "iff \(a \gt 2\)" miss sample 4's upper limit: the answer is \(2 \lt a \lt 11\).`,
    },

    "2025C-q5.4": {
      point: R`<p>\(\widetilde{\text{WCSS}}\) is just \(2\,\text{WCSS}\) (a homework identity). K-means already lowers WCSS every iteration, so it lowers \(\widetilde{\text{WCSS}}\) too: no modification needed.</p>`,
      moves: [
        { line: R`<b>Link it to WCSS</b> — the answer key uses an identity from homework (🧠 not on the sheet): each cluster's pairwise sum = 2 × its part of WCSS: <div class="formula">\[\begin{aligned}\sum_{i,i' \in C_j}\|x^{(i)} - x^{(i')}\|^2 &= 2\sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\\ \text{so}\quad \widetilde{\text{WCSS}} &= 2\,\text{WCSS}\end{aligned}\]</div>` },
        { line: R`<b>K-means lowers WCSS every iteration, so it lowers \(2\,\text{WCSS}\) too.</b> No modification needed. Done.`,
          why: R`<p>Assigning to the nearest centroid can only lower each sample's term; moving each centroid to the mean can only lower each cluster's part. So WCSS never goes up — and neither does 2 × WCSS.</p>`,
          extra: [{ label: "the key's identity is missing a factor |Cⱼ|", html: R`<p>Check on part 1's cluster \(C_1 = \{1,2,3\}\): the pairs 1–2, 1–3, 2–3 are at 1, 1, 2, each counted twice: pairwise sum \(= 8\). Its WCSS part is \(\tfrac43\), and \(2 \cdot \tfrac43 \ne 8\), but \(2 \cdot |C_1| \cdot \tfrac43 = 2 \cdot 3 \cdot \tfrac43 = 8\).</p>
<p>So truly \(\widetilde{\text{WCSS}} = \sum_j 2|C_j| \cdot (\text{cluster } j\text{'s part})\): not a fixed multiple of WCSS, and plain K-means can raise it.</p>
<p><b>What to write:</b> the key's argument — that's what the graders expect.</p>` }] },
      ],
      compare: R`Moves 1–2 are the official answer. The official identity drops a factor \(|C_j|\) (cluster \(\{1,2,3\}\): pairwise sum 8 = \(2 \cdot 3 \cdot \tfrac43\)), so strictly it's true only for the size-normalised version.`,
    },

    "2025C-q5.5": {
      point: R`<p>The code is part 1 in numpy: squared distances → nearest centroid → mean of each cluster → WCSS → stop when WCSS stops changing. Each blank is one piece of that.</p>`,
      moves: [
        { line: R`<b>(1), (2): the distances</b> — <b>(1)</b> <code>X.shape</code> = (rows, columns) = (n samples, d features). <b>(2)</b> <code>(X[i] - centroids[j]) ** 2</code>; the <code>np.sum</code> around it adds the coordinates = squared distance.`,
          why: R`<p>Sample 5 to \((6,6)\): <code>(np.array([6.5, 7]) - [6, 6]) ** 2</code> → <code>[0.25, 1]</code>, summed 1.25 — part 1's table. Then <code>argmin(distances, axis=1)</code> picks, in each row (sample), the column (centroid) with the smallest.</p>` },
        { line: R`<b>(3): does the cluster have any samples?</b> <code>idx.any()</code> — <code>idx</code> is True/False per sample; <code>any()</code> = at least one True (True counts as 1, so <code>&gt; 0</code> holds).`,
          why: R`<p><code>len(idx)</code> won't work: a True/False list always has length \(n\). (Your HW6 wrote <code>len(cluster_pixels) == 0</code> — that works because <code>cluster_pixels</code> holds the selected rows, not the True/False list.)</p>` },
        { line: R`<b>(4): each sample's own centroid</b> — <div class="formula">\[\text{X} - \underbrace{\color{#e8912d}\texttt{new\_centroids[cluster\_assignments]}}_{\textstyle\color{#e8912d}\text{this part = row } i \text{ is sample } i\text{'s centroid}}\]</div>`,
          why: R`<p>Using the cluster numbers as row indices. With part 1: <code>cluster_assignments = [0,0,0,1,1,1]</code>, so it's three copies of \((\tfrac43, \tfrac43)\), then three copies of \((6.5, 6.5)\). <code>X</code> minus that, squared, all added = \(\tfrac73\) — part 1's WCSS after.</p>
<p>(The printed line has one bracket too many; it means <code>np.sum((X - …) ** 2)</code>.)</p>` },
        { line: R`<b>(5), (6): stop when WCSS stops changing</b> — <b>(5)</b> <code>wcss == prev_wcss</code>, <b>(6)</b> <code>prev_wcss = wcss</code>. Done.`,
          why: R`<p>Same WCSS = nobody switched = converged (part 2). <code>prev_wcss</code> starts at infinity, so the first round never stops.</p>` },
      ],
      compare: R`Same six answers as the official solution.`,
    },

    // ─────────────────────────── 2026-A Q4 ───────────────────────────
    "2026A-q4.1": {
      point: R`<p>The same routine as 2025-C Q5.1: assign each sample to its nearest centroid, WCSS with the old centroids, move each centroid to its cluster's mean, WCSS with the new ones.</p>`,
      start: R`<p><b>Squared distances</b> (table: each sample to \(\mu_1\) and to \(\mu_2\)) → \(C_1 = \square\), \(C_2 = \square\)</p>
\[\text{WCSS}_{\text{before}} = \square\]
\[\mu_1 = \square,\qquad \mu_2 = \square\]
\[\text{WCSS}_{\text{after}} = \square\]`,
      moves: [
        { line: R`<b>Assign</b> — squared distance of each sample to \((0,0)\) and to \((8,8)\); the smaller wins: <div class="formula">\[\begin{array}{c|cccccc}\text{sample} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline \text{to }(0,0) & \mathbf{0} & \mathbf{1} & \mathbf{4} & 128 & 164 & 208\\ \text{to }(8,8) & 128 & 113 & 100 & \mathbf{0} & \mathbf{4} & \mathbf{16}\end{array}\]</div>So \(C_1 = \{1,2,3\}\), \(C_2 = \{4,5,6\}\).`,
          why: R`<p>Squared distance = \((\Delta x_1)^2 + (\Delta x_2)^2\) — the [sheet: L2 norm] without the root; the nearest centroid is the same.</p>
<div class="tw"><table><thead><tr><th>sample</th><th>to (0, 0)</th><th>to (8, 8)</th></tr></thead><tbody>
<tr><td>1 (0, 0)</td><td>0² + 0² = 0</td><td>8² + 8² = 128</td></tr>
<tr><td>2 (0, 1)</td><td>0² + 1² = 1</td><td>8² + 7² = 113</td></tr>
<tr><td>3 (2, 0)</td><td>2² + 0² = 4</td><td>6² + 8² = 100</td></tr>
<tr><td>4 (8, 8)</td><td>8² + 8² = 128</td><td>0² + 0² = 0</td></tr>
<tr><td>5 (10, 8)</td><td>10² + 8² = 164</td><td>2² + 0² = 4</td></tr>
<tr><td>6 (8, 12)</td><td>8² + 12² = 208</td><td>0² + 4² = 16</td></tr></tbody></table></div>` },
        { line: R`<b>WCSS before</b> — the winning numbers of move 1, added: <div class="formula">\[\text{WCSS} = \underbrace{\color{#e8912d}0 + 1 + 4}_{\textstyle\color{#e8912d}C_1\text{ to }(0,0)} + \underbrace{\color{#4c8dff}0 + 4 + 16}_{\textstyle\color{#4c8dff}C_2\text{ to }(8,8)} = 25\]</div>`,
          why: R`<p>"Before the update" = the new clusters, the old centroids \((0,0)\), \((8,8)\) — exactly move 1's winners. [sheet: Within-cluster sum of squares (WCSS)]</p>` },
        { line: R`<b>Update</b> — each centroid = the mean of its cluster: <div class="formula">\[\begin{aligned}\mu_1 &= \left(\tfrac{0+0+2}{3},\ \tfrac{0+1+0}{3}\right) = \left(\tfrac23,\ \tfrac13\right)\\ \mu_2 &= \left(\tfrac{8+10+8}{3},\ \tfrac{8+8+12}{3}\right) = \left(8\tfrac23,\ 9\tfrac13\right)\end{aligned}\]</div>` },
        { line: R`<b>WCSS after</b> — same clusters, new centroids: <div class="formula">\[\begin{array}{c|cccccc}\text{sample} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline \text{to own new }\mu & \tfrac59 & \tfrac89 & \tfrac{17}9 & \tfrac{20}9 & \tfrac{32}9 & \tfrac{68}9\end{array}\]</div><div class="formula">\[\text{WCSS} = \tfrac{30}{9} + \tfrac{120}{9} = \tfrac{150}{9} = 16\tfrac23\]</div>Done.`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>minus its new \(\mu\)</th><th>squared, added</th></tr></thead><tbody>
<tr><td>1 (0, 0)</td><td>\((-\tfrac23, -\tfrac13)\)</td><td>\(\tfrac49 + \tfrac19 = \tfrac59\)</td></tr>
<tr><td>2 (0, 1)</td><td>\((-\tfrac23, \tfrac23)\)</td><td>\(\tfrac49 + \tfrac49 = \tfrac89\)</td></tr>
<tr><td>3 (2, 0)</td><td>\((\tfrac43, -\tfrac13)\)</td><td>\(\tfrac{16}9 + \tfrac19 = \tfrac{17}9\)</td></tr>
<tr><td>4 (8, 8)</td><td>\((-\tfrac23, -\tfrac43)\)</td><td>\(\tfrac49 + \tfrac{16}9 = \tfrac{20}9\)</td></tr>
<tr><td>5 (10, 8)</td><td>\((\tfrac43, -\tfrac43)\)</td><td>\(\tfrac{16}9 + \tfrac{16}9 = \tfrac{32}9\)</td></tr>
<tr><td>6 (8, 12)</td><td>\((-\tfrac23, \tfrac83)\)</td><td>\(\tfrac49 + \tfrac{64}9 = \tfrac{68}9\)</td></tr></tbody></table></div>
<p>\(C_1\): \(\tfrac{5+8+17}{9} = \tfrac{30}{9}\). \(C_2\): \(\tfrac{20+32+68}{9} = \tfrac{120}{9}\).</p>` },
      ],
      compare: R`Same numbers as the official solution. It writes the distances with roots (\(8\sqrt2 = \sqrt{128}\), \(\sqrt{113}\), \(2\sqrt{41} = \sqrt{164}\), \(4\sqrt{13} = \sqrt{208}\)) and squares them for WCSS: \((0^2+1^2+2^2) + (0^2+2^2+4^2) = 25\) — move 2.`,
    },

    "2026A-q4.2": {
      point: R`<p>WCSS only changes if some sample switches cluster. With the new centroids nobody switches, so the means stay the same, so the WCSS stays the same.</p>`,
      moves: [
        { line: R`<b>Assign again with the new centroids</b> \((\tfrac23, \tfrac13)\), \((8\tfrac23, 9\tfrac13)\) — every sample is still much closer to its own: <div class="formula">\[\begin{array}{c|cccccc}\text{sample} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline \text{own} & 0.56 & 0.89 & 1.89 & 2.22 & 3.56 & 7.56\\ \text{other} & 162 & 145 & 132 & 113 & 146 & 190\end{array}\]</div>(rounded)`,
          why: R`<p>"To own" is part 1, move 4. "To other", e.g. sample 4 \((8,8)\) to \((\tfrac23, \tfrac13)\): \((\tfrac{22}{3})^2 + (\tfrac{23}{3})^2 = \tfrac{1013}{9} \approx 113\).</p>` },
        { line: R`<b>Nobody switches, so the means don't change, so the WCSS stays the same</b> (\(16\tfrac23\)). Done.`,
          why: R`<p>WCSS can never go up in an iteration; it only goes down if some sample switches. K-means has converged.</p>` },
      ],
      compare: R`Same as the official solution: samples 1–3 stay with \(\mu_1\), 4–6 with \(\mu_2\), so the centroids and the WCSS don't change.`,
    },

    "2026A-q4.3": {
      point: R`<p>A converged solution = every sample is already nearest to its own cluster's mean, so nothing changes. Pick 3 groups, compute their means, check that nobody switches.</p>`,
      moves: [
        { line: R`<b>Pick 3 groups</b> — split the bottom-left group: \(\{1,2\}\), \(\{3\}\), \(\{4,5,6\}\). Their means: <div class="formula">\[\mu_1 = (0,\ 0.5),\qquad \mu_2 = (2,\ 0),\qquad \mu_3 = \left(8\tfrac23,\ 9\tfrac13\right)\]</div>`,
          why: R`<p>\(\mu_1 = \tfrac12\big((0,0) + (0,1)\big) = (0, 0.5)\). \(\mu_2\) is sample 3 itself. \(\mu_3\) is part 1's \(\mu_2\).</p>` },
        { line: R`<b>Check nobody switches</b> — squared distances; each sample's own centroid (bold) is the smallest: <div class="formula">\[\begin{array}{c|ccc}\text{sample} & \text{to }\mu_1 & \text{to }\mu_2 & \text{to }\mu_3\\ \hline 1 & \mathbf{0.25} & 4 & 162.2\\ 2 & \mathbf{0.25} & 5 & 144.6\\ 3 & 4.25 & \mathbf{0} & 131.6\\ 4 & 120.25 & 100 & \mathbf{2.22}\\ 5 & 156.25 & 128 & \mathbf{3.56}\\ 6 & 196.25 & 180 & \mathbf{7.56}\end{array}\]</div>` },
        { line: R`<b>So it's converged</b> — nobody switches, so the means don't move, so K-means stays here. Done.`,
          why: R`<p>K-means can actually get here: if the random start picks samples 1, 3 and 4 as centroids (like <code>get_random_centroids</code> in HW6), the first iteration gives exactly these clusters.</p>` },
      ],
      compare: R`Same solution as the official one (\(\{1,2\}, \{3\}, \{4,5,6\}\) with centroids \((0, 0.5)\), \((2, 0)\), \((8\tfrac23, 9\tfrac13)\)). It checks only the samples near the split; move 2's table checks all six.`,
    },

    "2026A-q4.4": {
      point: R`<p>Complete linkage: always merge the two closest clusters, but a cluster's distance = its <b>farthest</b> pair. So after a merge, the new row = the <b>larger</b> of the two old rows. Manhattan distance = \(|\Delta x_1| + |\Delta x_2|\).</p>`,
      start: R`<p><b>Iteration 1:</b> merge \(\square\) and \(\square\) at distance \(\square\). The new cluster's distances:</p>
\[\begin{array}{c|ccc}\text{to} & \square & \square & \cdots\\ \hline d(\text{new}, \cdot) & \square & \square & \cdots\end{array}\]
<p><b>Iterations 2–5:</b> the same two lines each. Then the dendrogram.</p>`,
      moves: [
        { line: R`<b>Iteration 1: merge 1 and 2 at 1</b> — the closest pair: \(|0 - 0| + |0 - 1| = 1\). \(\{1,2\}\)'s distance to each = the larger of 1's and 2's: <div class="formula">\[\begin{array}{c|cccc}\text{to} & 3 & 4 & 5 & 6\\ \hline d(\{1,2\}, \cdot) & 3 & 16 & 18 & 20\end{array}\]</div>`,
          why: R`<p>Manhattan distance = the [sheet: L1 norm] of the difference. All 15 pairs (you don't have to write this, but every later "larger of" is a lookup here):</p>
\[\begin{array}{c|cccccc} & 1 & 2 & 3 & 4 & 5 & 6\\ \hline 1 & 0 & 1 & 2 & 16 & 18 & 20\\ 2 & 1 & 0 & 3 & 15 & 17 & 19\\ 3 & 2 & 3 & 0 & 14 & 16 & 18\\ 4 & 16 & 15 & 14 & 0 & 2 & 4\\ 5 & 18 & 17 & 16 & 2 & 0 & 6\\ 6 & 20 & 19 & 18 & 4 & 6 & 0\end{array}\]
<p>Example: \(\{1,2\}\) to 3 = the larger of \(d(1,3) = 2\) and \(d(2,3) = 3\) = 3.</p>` },
        { line: R`<b>Iteration 2: merge 4 and 5 at 2</b> — now the smallest (next is \(\{1,2\}\)–3 at 3). \(\{4,5\}\)'s row: <div class="formula">\[\begin{array}{c|ccc}\text{to} & \{1,2\} & 3 & 6\\ \hline d(\{4,5\}, \cdot) & 18 & 16 & 6\end{array}\]</div>`,
          why: R`<p>To \(\{1,2\}\): larger of \(d(\{1,2\}, 4) = 16\) and \(d(\{1,2\}, 5) = 18\) → 18. To 3: larger of 14 and 16 → 16. To 6: larger of 4 and 6 → 6.</p>` },
        { line: R`<b>Iteration 3: merge \(\{1,2\}\) and 3 at 3</b> (next is \(\{4,5\}\)–6 at 6). \(\{1,2,3\}\)'s row: <div class="formula">\[\begin{array}{c|cc}\text{to} & \{4,5\} & 6\\ \hline d(\{1,2,3\}, \cdot) & 18 & 20\end{array}\]</div>`,
          why: R`<p>To \(\{4,5\}\): larger of 18 (iteration 2) and 16 → 18. To 6: larger of 20 (iteration 1) and 18 → 20.</p>` },
        { line: R`<b>Iteration 4: merge \(\{4,5\}\) and 6 at 6</b> — \(\{4,5,6\}\) to \(\{1,2,3\}\) = larger of 18 and 20 = 20. <b>Iteration 5:</b> merge \(\{1,2,3\}\) and \(\{4,5,6\}\) at 20.` },
        { line: R`<b>Dendrogram</b> — bars at the merge distances: <pre><code>dist
 20             ┌─────────┴─────────┐
  6             │               ┌───┴────┐
  3         ┌───┴────┐          │        │
  2         │        │       ┌──┴──┐     │
  1      ┌──┴──┐     │       │     │     │
         1     2     3       4     5     6</code></pre>Done.` },
      ],
      compare: R`Same five merges and distances as the official solution (1, 2, 3, 6, 20), and the same tree: \(\{1,2\}\) + 3 on one side, \(\{4,5\}\) + 6 on the other, joined at 20.`,
    },

    "2026A-q4.5": {
      point: R`<p>It's K-means with one twist: an empty cluster gets a random sample. Each blank is one piece — the distance (the root), the empty test, the mean, the stop rule.</p>`,
      moves: [
        { line: R`<b>(1): the root</b> — the line already squares and adds; Euclidean distance is the square root of that: <code>0.5</code>.`,
          why: R`<p>[sheet: L2 norm]: \(\|x\|_2 = \sqrt{\sum x_i^2}\), and <code>** 0.5</code> = square root. Your HW6 wrote <code>** (1 / p)</code> with <code>p = 2</code> — the same thing.</p>` },
        { line: R`<b>(2), (3): the update</b> — <b>(2)</b> <code>len(members) == 0</code> (no rows → random sample); <b>(3)</b> <code>np.mean(members, axis=0)</code> (the cluster's mean).`,
          why: R`<p><code>members</code> = the actual rows of cluster \(j\), so its length is the cluster size. <code>axis=0</code> averages down the rows = the mean point, \(\mu_j\) from [sheet: Within-cluster sum of squares (WCSS)]. Your HW6 <code>kmeans</code> has exactly these two lines.</p>` },
        { line: R`<b>(4): stop when WCSS stops changing</b> — <code>abs(prev_WCSS - WCSS) &lt; epsilon</code>. Done.`,
          why: R`<p>WCSS never goes up; once it stops changing, nobody switches any more = converged. <code>prev_WCSS</code> starts at infinity, so the first round never stops.</p>` },
      ],
      compare: R`Same four answers as the official solution.`,
    },
  });
})();
