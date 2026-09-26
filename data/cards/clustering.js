// Recipe cards for topic "clustering". Standard: spec/CARDS.md. Built from data/notes/clustering.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["clustering"] = {
    intro: R`<p>A 25-point question in three past exams. Open question 1 below and go part by part: each part shows the recipe card(s) it needs, right above it. Read the card (1–3 min), do the part on paper, then check. The K-means cards use 2025-C's six points, the others 2025-A's ten; when that is the very part below, the card works one step and keeps the rest in a drawer for after you try. 2026-A repeats the same kinds of parts.</p>`,
    cards: {
      "assign": {
        title: "K-means step A: assign each sample to its nearest centroid",
        minutes: 2,
        cue: R`"Run one iteration of the K-means algorithm … Assign each sample to a centroid" (2025-C Q5.1, 2026-A Q4.1).`,
        lines: [
          R`Draw a table: one column per sample, one row per centroid \(\mu_1, \mu_2\).`,
          R`Each cell: squared distance \(\|x^{(i)} - \mu_j\|^2\) = (\(x_1\)-difference)\(^2\) + (\(x_2\)-difference)\(^2\). No root.`,
          R`In each column circle the smaller number: that centroid is the sample's cluster.`,
          R`Write the clusters: \(C_1 = \{\dots\}\), \(C_2 = \{\dots\}\).`,
        ],
        numbers: R`<p>2025-C Q5.1, \(\mu_1 = (1,1)\), \(\mu_2 = (6,6)\). Sample 5 is \((6.5, 7)\):</p>
<ul>
<li>to \(\mu_1\): \(5.5^2 + 6^2 = 30.25 + 36 = 66.25\)</li>
<li>to \(\mu_2\): \(0.5^2 + 1^2 = 0.25 + 1 = 1.25\) → circle it: \(\mu_2\)</li>
</ul>
<p>Now fill the other five columns the same way.</p>`,
        check: R`The cluster sizes add up to 6: every sample in exactly one cluster. Keep the table: WCSS "before" adds its circled numbers.`,
        trap: R`Adding before squaring: \((0.5 + 1)^2 = 2.25\) is <b>not</b> the squared distance. Square each difference, then add.`,
        why: [
          [R`Why line 2? Squared distance, and why no root`, R`<p>The Euclidean distance (formula sheet) is Pythagoras: \(\|x - \mu\| = \sqrt{(x_1 - \mu_1)^2 + (x_2 - \mu_2)^2}\). Dropping the root doesn't change which centroid is nearer: if \(a \lt b\) then \(\sqrt a \lt \sqrt b\). So you compare squared distances and skip the roots — and WCSS is built from squared distances anyway, so you need them later.</p>`],
          [R`Why line 3? What "nearest centroid" means in symbols`, R`<p>Sample \(i\) goes to \(\arg\min_j \|x^{(i)} - \mu_j\|^2\): "the \(j\) that gives the smallest value". Not the smallest value itself — <b>which</b> centroid wins. Circling the smaller entry of the column is exactly that.</p>`],
          [R`2025-C Q5.1: the full table (open after you try)`, R`<div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody>
<tr><td>to \(\mu_1\)</td><td><b>0</b></td><td><b>1</b></td><td><b>1</b></td><td>50</td><td>66.25</td><td>66.25</td></tr>
<tr><td>to \(\mu_2\)</td><td>50</td><td>41</td><td>41</td><td><b>0</b></td><td><b>1.25</b></td><td><b>1.25</b></td></tr></tbody></table></div>
<p>\(C_1 = \{1,2,3\}\), \(C_2 = \{4,5,6\}\).</p>`],
        ],
        side: R`<ul>
<li><b>2026-A's official solution</b> writes plain distances with square roots. Comparing squared distances picks the same winner.</li>
<li><b>Where the starting centroids come from:</b> the exam gives them ("initial centroid locations"); in code they are usually random samples (HW6).</li>
<li>One K-means <b>iteration</b> = step A (this card) + step B (card "means").</li>
</ul>`,
      },

      "means": {
        title: "K-means step B: move each centroid to the mean of its cluster",
        minutes: 1,
        cue: R`"Update the centroid locations" (2025-C Q5.1, 2026-A Q4.1). "Specify the three clusters and their centroids" (2026-A Q4.3).`,
        lines: [
          R`For each cluster write \(\mu_j = \frac{1}{|C_j|}\big(\text{its samples added up}\big)\), listing the samples. \(|C_j|\) = how many samples the cluster has.`,
          R`New \(x_1\)-coordinate: add the samples' \(x_1\)'s, divide by \(|C_j|\).`,
          R`New \(x_2\)-coordinate: the same with the \(x_2\)'s.`,
          R`Keep fractions (\(\tfrac43\), not 1.33).`,
        ],
        numbers: R`<p>2025-C Q5.1, the cluster of samples 1, 2, 3:</p>
<p>\(\mu_1 = \tfrac13\big((1,1) + (1,2) + (2,1)\big) = \left(\tfrac{1+1+2}{3},\ \tfrac{1+2+1}{3}\right) = \left(\tfrac43,\ \tfrac43\right)\)</p>
<p>Now do \(\mu_2\) the same way.</p>`,
        check: R`Each new centroid sits in the middle of its own samples on the plot.`,
        trap: R`Dividing by all \(n = 6\) samples instead of the cluster size \(|C_j| = 3\).`,
        why: [
          [R`Why the mean, and not some other centre?`, R`<p>The mean is the point with the smallest total squared distance to the cluster's samples — exactly what K-means makes small. One coordinate at a time: if the values are \(v_1, \dots, v_m\) and the centre is \(c\), the total is \(f(c) = (v_1 - c)^2 + \dots + (v_m - c)^2\). Chain rule: \(f'(c) = -2\big((v_1 + \dots + v_m) - m\,c\big)\), which is 0 at \(c = \frac{v_1 + \dots + v_m}{m}\) — the average.</p>
<p>With \(C_1\)'s \(x_1\)-values 1, 1, 2: \(f'(c) = -2(1-c) - 2(1-c) - 2(2-c) = -2(4 - 3c)\), zero at \(c = \tfrac43\).</p>`],
          [R`Why keep fractions?`, R`<p>The WCSS after the update is computed from these centroids. With \(\tfrac43\) the squared differences are clean ninths (\(\tfrac19, \tfrac49\)) and the total comes out exactly \(\tfrac73\); with 1.33 you get rounding noise.</p>`],
          [R`2025-C Q5.1: \(\mu_2\) (open after you try)`, R`<p>\(\mu_2 = \tfrac13\big((6,6) + (6.5,7) + (7,6.5)\big) = \left(\tfrac{6+6.5+7}{3},\ \tfrac{6+7+6.5}{3}\right) = \left(\tfrac{19.5}{3},\ \tfrac{19.5}{3}\right) = (6.5,\ 6.5)\)</p>`],
        ],
        side: R`<ul>
<li><b>Formula sheet:</b> \(\mu_j = \frac{1}{|C_j|}\sum_{i \in C_j} x^{(i)}\).</li>
<li><b>Empty cluster:</b> if no sample picked centroid \(j\), \(|C_j| = 0\) and the mean is undefined. The question or code gives a rule: keep the old centroid (2025-C's code) or move it onto a random sample (2026-A's code, HW6).</li>
</ul>`,
      },

      "wcss": {
        title: "WCSS before and after the update",
        minutes: 2,
        cue: R`"Compute WCSS before and after the update of the centroid locations" (2025-C Q5.1, 2026-A Q4.1).`,
        lines: [
          R`Copy the formula: \(\text{WCSS} = \sum_{j=1}^{k}\sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\) — every sample once, measured to its own centroid.`,
          R`<b>Before:</b> add the circled numbers of your step-A table (old centroids). Nothing new to compute.`,
          R`<b>After:</b> one line per sample: its squared distance to its <b>new</b> centroid.`,
          R`Add the "after" lines, cluster by cluster.`,
        ],
        numbers: R`<p>2025-C Q5.1, sample 2 \((1,2)\), which is in \(C_1\):</p>
<ul>
<li>Before: its circled number, \(1\) (to the old \(\mu_1 = (1,1)\)).</li>
<li>After: to the new \(\mu_1 = \left(\tfrac43, \tfrac43\right)\): \(\left(1 - \tfrac43\right)^2 + \left(2 - \tfrac43\right)^2 = \left(-\tfrac13\right)^2 + \left(\tfrac23\right)^2 = \tfrac19 + \tfrac49 = \tfrac59\).</li>
</ul>
<p>Now write the other five samples' terms and add each list.</p>`,
        check: R`After \(\le\) before.`,
        trap: R`If your distance table has roots (like \(\sqrt{50}\)), square them before adding — WCSS adds <b>squared</b> distances.`,
        why: [
          [R`Why line 1? Reading the double sum`, R`<p>Inside out: the inner sum \(\sum_{i \in C_j}\) goes over the samples of <b>one</b> cluster \(j\) and adds their squared distances to that cluster's centroid \(\mu_j\). The outer sum \(\sum_{j=1}^k\) adds these per-cluster totals. Small total = tight clusters.</p>`],
          [R`Why line 2? "Before" is already in the table`, R`<p>"Before the update" = the clusters from step A with the <b>old</b> centroids. Each circled number is exactly the sample's squared distance to the old centroid it was assigned to — its WCSS term.</p>`],
          [R`Why is "after" never bigger than "before"?`, R`<p>Same clusters, but each centroid moved to the mean, and the mean is the centre with the smallest total squared distance (card "means", why-drawer). So every cluster's part can only shrink.</p>`],
          [R`2025-C Q5.1: both totals (open after you try)`, R`<p>Before (circled numbers): \(\underbrace{0 + 1 + 1}_{C_1} + \underbrace{0 + 1.25 + 1.25}_{C_2} = 4.5\).</p>
<p>After, per sample: sample 1 \(\tfrac19 + \tfrac19 = \tfrac29\); sample 2 \(\tfrac59\); sample 3 \(\tfrac49 + \tfrac19 = \tfrac59\); sample 4 \(0.25 + 0.25 = 0.5\); samples 5 and 6 \(0.25 + 0 = 0.25\).</p>
<p>\(\underbrace{\tfrac29 + \tfrac59 + \tfrac59}_{C_1\,=\,\frac43} + \underbrace{0.5 + 0.25 + 0.25}_{C_2\,=\,1} = \tfrac73 \approx 2.33 \le 4.5\) ✓. Both match the official solution (4.5 and \(2\tfrac13\)).</p>`],
        ],
        side: R`<ul>
<li>Write every intermediate line on the exam: each one is partial credit.</li>
</ul>`,
      },

      "another-iteration": {
        title: "What happens to WCSS in another iteration?",
        minutes: 2,
        cue: R`"What would happen to the WCSS if we ran a second iteration of K-means? Would it increase, decrease, or stay the same? Explain" (2025-C Q5.2, 2026-A Q4.2).`,
        lines: [
          R`Redo step A with the <b>new</b> centroids: is each sample still nearest to its own centroid?`,
          R`You already have each sample's distance to its own centroid (the "after" lines). Compute only the distance to the other centroid.`,
          R`No sample switches → same clusters → same means → centroids don't move → <b>WCSS stays the same</b>.`,
          R`(If a sample did switch, WCSS would decrease. It can never increase.)`,
        ],
        numbers: R`<p>2025-C Q5.2, centroids \(\left(\tfrac43, \tfrac43\right)\) and \((6.5, 6.5)\):</p>
<ul>
<li>Sample 3 \((2,1)\) to \(\mu_2\): \((2-6.5)^2 + (1-6.5)^2 = 20.25 + 30.25 = 50.5\), versus \(\tfrac59\) to \(\mu_1\) → stays</li>
</ul>
<p>Check the other five the same way, then write line 3 or line 4.</p>`,
        trap: R`Answering "decreases" by reflex. It decreases only if some sample switches cluster.`,
        why: [
          [R`Why can WCSS never go up?`, R`<p><b>Step A</b> (centroids fixed): each sample moves to its nearest centroid, so its term in WCSS stays the same or shrinks. <b>Step B</b> (clusters fixed): each centroid moves to the mean, the best possible centre, so each cluster's part stays the same or shrinks. Both steps only go downhill.</p>`],
          [R`Why does "no switch" mean nothing ever changes again?`, R`<p>Same clusters → step B computes the same means → the centroids are where they were → the next step A gives the same clusters again. Every later iteration is identical. That is <b>convergence</b> (a "fixed point").</p>`],
          [R`2025-C Q5.2: the other five samples (open after you try)`, R`<ul>
<li>Sample 1 to \(\mu_2\): \(30.25 + 30.25 = 60.5\) vs \(\tfrac29\) → stays</li>
<li>Sample 2 to \(\mu_2\): \(30.25 + 20.25 = 50.5\) vs \(\tfrac59\) → stays</li>
<li>Sample 4 \((6,6)\) to \(\mu_1\): \(\left(\tfrac{14}{3}\right)^2 + \left(\tfrac{14}{3}\right)^2 = \tfrac{392}{9} \approx 43.56\) vs 0.5 → stays</li>
<li>Samples 5 and 6 to \(\mu_1\): \(\tfrac{961}{36} + \tfrac{1156}{36} = \tfrac{2117}{36} \approx 58.81\) vs 0.25 → stay</li>
</ul>
<p>All six stay, so the WCSS <b>stays the same</b> at \(\tfrac73\) (the official answer).</p>`],
        ],
        side: R`<ul>
<li><b>Converged is not "best":</b> K-means stops in the first valley it reaches — a local minimum of WCSS (card "different starts").</li>
<li>The code's stop rule (<code>wcss == prev_wcss</code>) is this card as code.</li>
</ul>`,
      },

      "converged-solution": {
        title: "Propose a solution K-means can converge to",
        minutes: 2,
        cue: R`"With \(k = 3\). Suggest a possible solution that can be returned by the algorithm after convergence. Specify the three clusters and their centroids" (2026-A Q4.3).`,
        lines: [
          R`Choose \(k\) groups: split a visible group, or give an isolated sample its own cluster.`,
          R`Compute each group's mean (same as card "means"). These are the centroids.`,
          R`Edge samples: squared distance to own centroid \(\lt\) to the neighbouring one.`,
          R`Conclude: "every sample is nearest to its own centroid → assignments don't change → centroids don't change: converged."`,
        ],
        numbers: R`<p>2025-A's ten points, \(k = 3\): \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\). Means \((1.25,\ 1.5)\), \((5.2,\ 4.9)\), \(\left(\tfrac{30.5}{3},\ \tfrac{24.5}{3}\right) \approx (10.17,\ 8.17)\). Edge samples:</p>
<ul>
<li>Sample 3 \((4,4)\): own \((-1.2)^2 + (-0.9)^2 = 2.25\); to \((1.25, 1.5)\): \(2.75^2 + 2.5^2 = 13.8125\) → stays</li>
<li>Sample 7 \((7,6)\): own \(1.8^2 + 1.1^2 = 4.45\); to \((10.17, 8.17)\): \(\approx 14.72\) → stays</li>
</ul>
<p>Samples 2 and 8 likewise. Nobody switches.</p>`,
        trap: R`Only listing clusters. The question asks for the centroids <b>and</b> why: show the nearest-centroid check.`,
        why: [
          [R`Why does this prove "a possible output"?`, R`<p>A converged solution is a fixed point: step A reproduces the same clusters, step B the same means. So if K-means ever reaches these clusters — for example when it starts with the centroids at these means — it stays there and returns them.</p>`],
          [R`Why only the edge samples?`, R`<p>A sample deep inside a group is far from every other centroid; only the samples nearest a neighbouring group could possibly switch. Check those against the neighbouring centroid.</p>`],
        ],
        side: R`<ul>
<li>Several answers are correct; 2026-A's official solution itself says there are other solutions K-means can converge to. Any choice that passes the check earns the points.</li>
<li>Edge checks not shown above: sample 2 \((1.5,2)\): own 0.3125, to \((5.2, 4.9)\): \(13.69 + 8.41 = 22.1\). Sample 8 \((9.5,7.5)\): own \(\tfrac49 + \tfrac49 \approx 0.89\), to \((5.2, 4.9)\): \(18.49 + 6.76 = 25.25\).</li>
</ul>`,
      },

      "different-starts": {
        title: "Why two K-means runs can give different answers",
        minutes: 1,
        cue: R`"Zack claims that Anna must have made a mistake, while Anna says it's possible to get two different solutions … with the same \(k\). Who is right? … based on general properties of the K-means algorithm" (2025-A Q2.1).`,
        lines: [
          R`"Anna is right."`,
          R`"K-means starts from initial centroids, usually chosen at random."`,
          R`"Each iteration can only lower WCSS, so K-means stops at a <b>local</b> minimum — the first one it reaches from its start."`,
          R`"Different starts can reach different local minima, so two correct runs can return different clusterings."`,
        ],
        numbers: R`<p>2025-A's ten points, \(k = 2\) (not asked — it just shows it happens):</p>
<ul>
<li>Start on samples 7 and 8 → converges to \(\{1,\dots,7\}\) and \(\{8,9,10\}\).</li>
<li>Start on samples 1 and 10 → converges to \(\{1,\dots,6\}\) and \(\{7,\dots,10\}\).</li>
</ul>
<p>Both runs converged; neither made a mistake.</p>`,
        trap: R`Arguing from this dataset's plot. The question wants the general property: random start + local minimum.`,
        why: [
          [R`Why a local minimum and not the best one?`, R`<p>K-means only ever goes downhill: each step keeps WCSS the same or lowers it. So it stops in the first "valley" it walks into and can't climb out to look for a lower one. Which valley that is depends on where it started.</p>`],
          [R`Isn't K-means random all the way?`, R`<p>No. Once the starting centroids are fixed, K-means is deterministic: the same start always gives the same result. The only randomness is the start.</p>`],
        ],
        side: R`<ul>
<li>In practice K-means is run several times from different random starts and the run with the lowest WCSS is kept — which is where the next part (compare by WCSS) goes.</li>
</ul>`,
      },

      "compare-by-wcss": {
        title: "Deciding which of two K-means solutions is better",
        minutes: 2,
        cue: R`"How can Zack and Anna decide which clustering solution is better? Describe the calculations they should make in detail and explain why this produces a useful way to compare" (2025-A Q2.2).`,
        lines: [
          R`For each cluster of each solution: the centroid \(\mu_j = \frac{1}{|C_j|}\sum_{i \in C_j} x^{(i)}\).`,
          R`For each solution: \(\text{WCSS} = \sum_j \sum_{i \in C_j}\|x^{(i)} - \mu_j\|^2\).`,
          R`"The solution with the <b>smaller</b> WCSS is better."`,
          R`Why: "WCSS measures how tightly each cluster is packed around its centre — exactly what K-means minimises. Both solutions have the same \(k\), so it is a fair comparison."`,
        ],
        numbers: R`<p>2025-A, the two \(k = 2\) solutions from card "different starts" (not asked — the method at work):</p>
<ul>
<li>S1 \(\{1,\dots,7\}\), \(\{8,9,10\}\): centroids \(\left(\tfrac{28.5}{7}, \tfrac{27.5}{7}\right) \approx (4.07, 3.93)\) and \(\left(\tfrac{30.5}{3}, \tfrac{24.5}{3}\right)\); WCSS \(\approx 47.93 + 2.33 = 50.26\)</li>
<li>S2 \(\{1,\dots,6\}\), \(\{7,\dots,10\}\): centroids \(\approx (3.58, 3.58)\) and \((9.375, 7.625)\); WCSS \(\approx 32.92 + 13.375 = 46.29\)</li>
</ul>
<p>\(46.29 \lt 50.26\): S2 is better.</p>`,
        trap: R`Stopping at "use WCSS". The 4 points are for describing both calculations <b>and</b> saying why smaller is better.`,
        why: [
          [R`Why is WCSS a fair judge?`, R`<p>WCSS is K-means' own goal: it adds, over all samples, the squared distance to their own centre. With the same \(k\) both solutions have the same number of centres to work with, so the one with the smaller WCSS simply does K-means' job better.</p>`],
          [R`Why only for the same \(k\)?`, R`<p>More clusters can always lower WCSS (in the extreme, one cluster per sample gives 0). Comparing a \(k = 2\) with a \(k = 3\) solution by WCSS would always favour the larger \(k\) — that question needs the elbow (card "elbow").</p>`],
        ],
        side: R`<ul>
<li>The per-sample tables behind 50.26 and 46.29 are in the notes (note 6).</li>
<li>Same idea in practice: run K-means many times from random starts, keep the run with the lowest WCSS.</li>
</ul>`,
      },

      "elbow": {
        title: "Choosing \\(k\\): the elbow plot",
        minutes: 2,
        cue: R`"K-means with \(k = 2,3,4\), while making sure to find an optimal solution per \(k\) … Of the three plots (A–C), determine the most plausible" (2025-A Q2.3).`,
        lines: [
          R`Cross out any plot where the value goes <b>up</b> with \(k\): the best WCSS can never increase when \(k\) grows.`,
          R`Count the groups you see on the scatter plot.`,
          R`Pick the plot that bends ("elbow") at that \(k\): big drops before it, a small drop after.`,
          R`Justify each step in one sentence.`,
        ],
        numbers: R`<p>Illustration on 2025-A's points (the exam gives only plots): the real best WCSS per \(k\):</p>
<p>\(k = 1: 166\), \(k = 2: 46.29\), \(k = 3: 11.46\), \(k = 4: 4.625\).</p>
<p>Drops: \(166 - 46.29 = 119.71\), \(46.29 - 11.46 = 34.83\), then only \(11.46 - 4.625 = 6.83\). Big, big, small: the bend is at \(k = 3\). Now match that shape to plots A–C.</p>`,
        trap: R`"WCSS decreases with \(k\)" holds only for the <b>best</b> solution per \(k\). Quote "optimal solution per \(k\)" when ruling out a plot that goes up.`,
        why: [
          [R`Why line 1? The best WCSS can't go up`, R`<p>Take the best solution with \(k\) clusters and add one more centroid exactly on some sample. That sample's term becomes 0 and nobody else gets worse. So some \((k+1)\)-solution is at least as good, and the best one is at least as good as that. (At \(k = n\), one cluster per sample, WCSS = 0.)</p>`],
          [R`Why line 3? Why the bend sits at the true number of groups`, R`<p>While \(k\) is below the number of real groups, one more cluster lets K-means pull two real groups apart: a big drop. Once \(k\) equals the number of groups, one more cluster can only cut a tight group in two: a small drop. So the curve falls steeply, then flattens.</p>`],
        ],
        side: R`<ul>
<li><b>The answer (after you try):</b> plot C goes up from \(k = 3\) to 4 → impossible. Plot B drops about equally from 2 to 3 and from 3 to 4: no clear bend, which doesn't fit three visible groups. A is the answer.</li>
<li>Where the four numbers come from: \(k = 2\) is solution S2 (card "compare by WCSS"); \(k = 3\) is \(0.625 + 8.5 + 2.3333\) for the three visible groups; \(k = 4\) splits the middle group into \(\{3,4,5\}\) and \(\{6,7\}\).</li>
</ul>`,
      },

      "range-of-a": {
        title: "A range of starting centroids with the same outcome",
        minutes: 3,
        cue: R`"Replace the initial location for the second centroid with \(\mu_2 = (a, a)\) … Specify the range of values for \(a\) for which the first iteration … would result in the same outcome" (2025-C Q5.3).`,
        lines: [
          R`Same outcome = every sample picks the same centroid as in part 1.`,
          R`One inequality per sample: squared distance to its centroid \(\lt\) squared distance to the other, with \(\mu_2 = (a,a)\).`,
          R`Expand, move everything to one side, factor, read off the range of \(a\).`,
          R`Intersect all six ranges.`,
        ],
        numbers: R`<p>2025-C, \(\mu_1 = (1,1)\):</p>
<ul>
<li>Sample 2 \((1,2)\) must pick \(\mu_1\): \(1 \lt (1-a)^2 + (2-a)^2 = 2a^2 - 6a + 5\) ⟺ \((a-1)(a-2) > 0\) ⟺ \(a \lt 1\) or \(a > 2\)</li>
</ul>
<p>Now the other five samples (samples 4–6 must pick \(\mu_2\)), then intersect.</p>`,
        trap: R`Checking only the boundary between the groups. A centroid pushed too far away loses its own samples — that gives an upper limit.`,
        why: [
          [R`Why line 1? The assignment decides everything`, R`<p>If every sample goes to the same centroid as before, step B computes the same means, and everything after that is identical. So "same outcome" = "same assignment".</p>`],
          [R`Why line 3? Solving \((a-1)(a-2) > 0\)`, R`<p>Sample 2: \((1-a)^2 + (2-a)^2 = (1 - 2a + a^2) + (4 - 4a + a^2) = 2a^2 - 6a + 5\). Need \(> 1\): \(2a^2 - 6a + 4 > 0\), divide by 2: \(a^2 - 3a + 2 = (a-1)(a-2) > 0\). A product is positive when both factors have the same sign: both positive (\(a > 2\)) or both negative (\(a \lt 1\)).</p>`],
          [R`2025-C Q5.3: the other samples and the range (open after you try)`, R`<ul>
<li>Sample 1 \((1,1)\): 0 to \(\mu_1\), \(2(1-a)^2\) to \(\mu_2\): fine unless \(a = 1\).</li>
<li>Sample 3 \((2,1)\): sample 2 with the coordinates swapped — same condition.</li>
<li>Sample 4 \((6,6)\) must pick \(\mu_2\): \(2(6-a)^2 \lt 50\) ⟺ \((6-a)^2 \lt 25\) ⟺ \(1 \lt a \lt 11\).</li>
<li>Sample 5 \((6.5,7)\): \((6.5-a)^2 + (7-a)^2 = 2a^2 - 27a + 91.25 \lt 66.25\) ⟺ \(2a^2 - 27a + 25 \lt 0\) ⟺ \((2a-25)(a-1) \lt 0\) ⟺ \(1 \lt a \lt 12.5\). Sample 6: the same.</li>
<li>Intersect: \(a > 2\) (the option \(a \lt 1\) contradicts sample 4's \(a > 1\)) and \(a \lt 11\): <b>\(2 \lt a \lt 11\)</b>.</li>
</ul>`],
        ],
        side: R`<ul>
<li><b>Slip in the official solution:</b> it answers "iff \(a > 2\)", claiming samples 4–6 go to \(\mu_2\) whenever \(a > 1\). That ignores far-away centroids: at \(a = 12\), sample 4 is \(2 \cdot 6^2 = 72\) from \(\mu_2\), more than its 50 to \(\mu_1\), so it joins \(C_1\). Answer \(2 \lt a \lt 11\) and show sample 4's inequality so the grader sees the upper limit. (It also writes \(x^{(1)}\) where it means \(x^{(3)}\).)</li>
<li>At exactly \(a = 2\) or \(a = 11\) some sample is equally far from both centroids — a tie, decided by the tie-breaking rule.</li>
</ul>`,
      },

      "modified-objective": {
        title: "A modified WCSS: does K-means need to change?",
        minutes: 2,
        cue: R`"Suppose instead of minimizing the standard WCSS, we wish to minimize \(\widetilde{\text{WCSS}} = \sum_{j=1}^k\sum_{i,i' \in C_j}\|x^{(i)} - x^{(i')}\|^2\). Which modifications, if any … to guarantee reduction … in every update iteration? Brief explanation" (2025-C Q5.4).`,
        lines: [
          R`Link the new objective to WCSS through the cluster mean \(\mu_j\): each pairwise distance can be measured via \(\mu_j\) (the HW5 identity).`,
          R`Write the answer key's conclusion: \(\widetilde{\text{WCSS}} = 2\,\text{WCSS}\) — a constant times WCSS.`,
          R`"K-means lowers WCSS in every iteration, so it lowers \(\widetilde{\text{WCSS}}\) too: <b>no modification needed</b>."`,
        ],
        numbers: R`<p>2025-C's cluster \(C_1 = \{1,2,3\}\). Pair distances: \(\|x^{(1)} - x^{(2)}\|^2 = 1\), \(\|x^{(1)} - x^{(3)}\|^2 = 1\), \(\|x^{(2)} - x^{(3)}\|^2 = 1 + 1 = 2\). Each pair counts twice (\((1,2)\) and \((2,1)\)): \(2(1 + 1 + 2) = 8\).</p>
<p>Its WCSS part was \(\tfrac43\), and \(2\,|C_1| \cdot \tfrac43 = 2 \cdot 3 \cdot \tfrac43 = 8\). ✓ So the exact factor also contains the cluster size \(|C_j|\). The answer key leaves it out; for the points, write lines 1–3 as they are.</p>`,
        trap: R`Writing a proof. "Brief explanation" = the link to WCSS plus the conclusion, 2–3 sentences.`,
        why: [
          [R`Why line 1? The identity, in short`, R`<p>Fix one cluster with mean \(\mu_j\) and write \(a_i = x^{(i)} - \mu_j\). Then \(x^{(i)} - x^{(i')} = a_i - a_{i'}\), and \(\sum_i a_i = 0\) (that's what "mean" means). Expand: \(\|a_i - a_{i'}\|^2 = \|a_i\|^2 + \|a_{i'}\|^2 - 2\,a_i\cdot a_{i'}\). Summed over all ordered pairs: the first two terms give \(|C_j|\sum_i\|a_i\|^2\) each; the last gives \(2\,(\sum_i a_i)\cdot(\sum_{i'} a_{i'}) = 0\). So each cluster's pairwise sum is \(2|C_j|\) times its part of WCSS.</p>`],
          [R`The general recipe for any modified objective`, R`<p>If the new objective is a positive constant times WCSS, lowering WCSS lowers it: no change. Otherwise ask step by step: for fixed centroids, which assignment makes it smallest (new step A)? For fixed clusters, which centres make it smallest (new step B)?</p>`],
        ],
        side: R`<ul>
<li><b>Slip in the official solution:</b> its identity \(\sum_{i,i'}\|x^{(i)} - x^{(i')}\|^2 = 2\sum_i\|x^{(i)} - \mu_j\|^2\) drops the factor \(|C_j|\) — the numbers show it (8, not \(2 \cdot \tfrac43\)). So truly \(\widetilde{\text{WCSS}} = \sum_j 2|C_j|\cdot(\text{cluster } j\text{'s WCSS})\): big clusters count more, not a fixed multiple, and plain K-means isn't strictly guaranteed to lower it. "\(= 2\,\text{WCSS}\)" is exact for the size-normalised version (each pairwise sum divided by \(|C_j|\)).</li>
<li>What earns the points is still the answer key's argument (lines 1–3).</li>
<li>Cluster \(C_2\) checks the same way: \(2(1.25 + 1.25 + 0.5) = 6 = 2 \cdot 3 \cdot 1\).</li>
</ul>`,
      },

      "single-linkage": {
        title: "Agglomerative clustering: single linkage, Manhattan distance",
        minutes: 2,
        cue: R`"Agglomerative clustering using the Manhattan distance (\(L_1\)) and single linkage … first three iterations: the two clusters being merged, the distances between the newly merged cluster and all other clusters" (2025-A Q2.4).`,
        lines: [
          R`Manhattan distance: \(d(x, y) = |x_1 - y_1| + |x_2 - y_2|\). No squares.`,
          R`List the nearby pairs on the plot with their distances. The smallest is the first merge.`,
          R`Merge them. The new cluster's distance to each other cluster = the <b>min</b> of its two parts' distances: \(d(A \cup B, C) = \min\big(d(A,C),\ d(B,C)\big)\).`,
          R`Repeat: smallest distance → merge → new row. Mention ties.`,
        ],
        numbers: R`<p>2025-A. Smallest: \(d(4,5) = |4.5 - 4.5| + |4.5 - 5| = 0 + 0.5 = 0.5\) → merge \(\{4,5\}\). Its row, e.g.:</p>
<ul>
<li>to 3: \(\min(d(4,3), d(5,3)) = \min(1,\ 1.5) = 1\)</li>
<li>to 6: \(\min(2,\ 1.5) = 1.5\); to 7: \(\min(4,\ 3.5) = 3.5\); to 1: \(\min(7,\ 7.5) = 7\)</li>
</ul>
<p>Iteration 2: the smallest is now 1 — a tie between \(\{4,5\}\)–3 and 8–9.</p>`,
        check: R`Each iteration removes one cluster: 10 → 9 → 8 → 7.`,
        trap: R`Squaring out of habit. "Manhattan (\(L_1\))" = absolute differences, added.`,
        why: [
          [R`Why only nearby pairs?`, R`<p>The smallest distance is always between neighbours on the plot, so you don't need all 45 pairs — the question even says there's no need for the full matrix. The nearby ones: \(d(4,5) = 0.5\); \(d(3,4) = d(8,9) = 1\); \(d(1,2) = d(3,5) = d(5,6) = 1.5\); \(d(4,6) = d(6,7) = d(9,10) = 2\).</p>`],
          [R`Why line 3? The min shortcut`, R`<p>Single linkage = the distance between the <b>closest pair</b>, one sample from each cluster. The closest pair between \(A \cup B\) and \(C\) is either the closest pair from \(A\) to \(C\) or from \(B\) to \(C\) — whichever is smaller. So each new row is a min of two numbers you already have.</p>`],
          [R`Iterations 2–3 (to check yourself)`, R`<p>Iteration 2 (tie; the official solution merges 3 first): \(\{3,4,5\}\) at 1. Row: to 1: 6, to 2: 4.5, to 6: 1.5, to 7: 3.5, to 8: 7.5, to 9: 8.5, to 10: 10.5.</p>
<p>Iteration 3: \(\{8,9\}\) at 1. Row: to 1: 15, to 2: 13.5, to \(\{3,4,5\}\): 7.5, to 6: 6, to 7: 4, to 10: 2.</p>`],
        ],
        side: R`<ul>
<li><b>Slips in the official iteration-3 table:</b> its header says \(D(\{4,5\}, i)\) but it is the row of \(\{8,9\}\), and it gives 3.5 for sample 6 and 2 for sample 7. Correct: \(d(\{8,9\}, 6) = \min(6, 7) = 6\) and \(d(\{8,9\}, 7) = \min(4, 5) = 4\). The merges themselves are right.</li>
<li>The name "Manhattan": walking between street corners in a grid city — the horizontal part plus the vertical part, no diagonal.</li>
</ul>`,
      },

      "cut-hierarchy": {
        title: "Reading the \\(k = 3\\) and \\(k = 2\\) solutions off single linkage",
        minutes: 2,
        cue: R`"Specify the solutions with \(k = 2\) and \(k = 3\) implied by the hierarchical clustering … no need to execute the entire algorithm … based on direct observations of the dataset and properties of the algorithm" (2025-A Q2.5).`,
        lines: [
          R`Name the visible groups.`,
          R`Inside each group: the largest \(L_1\) step needed to chain its samples together.`,
          R`Between groups: the gap = the closest pair, one sample from each group (\(L_1\)).`,
          R`Every inside step \(\lt\) the smallest gap → single linkage completes the groups first: that is the \(k\)-solution.`,
          R`One level up: merge the two groups with the smallest gap.`,
        ],
        numbers: R`<p>2025-A, groups \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\). One of each kind:</p>
<ul>
<li>Inside step 6–7: \(|6 - 7| + |5 - 6| = 1 + 1 = 2\) (the largest inside step)</li>
<li>Gap 7–8: \(|7 - 9.5| + |6 - 7.5| = 2.5 + 1.5 = 4\)</li>
</ul>
<p>Now the other gaps the same way, then lines 4 and 5.</p>`,
        trap: R`Merging the groups that <b>look</b> closer. Compute every gap: two of them differ by only 0.5.`,
        why: [
          [R`Why line 4? Groups finish before any gap is crossed`, R`<p>Single linkage always merges the two clusters whose closest pair is smallest. Inside each group every merge happens at a distance \(\le 2\); crossing any gap costs at least 4. So all the inside merges come first, and the three groups appear as one complete state of the algorithm.</p>`],
          [R`The same thing as a cut through the dendrogram`, R`<p>The \(k\)-solution is the state of the algorithm when \(k\) clusters are left. On the dendrogram: a horizontal cut crossing exactly \(k\) branches. Here a cut between heights 2 and 4 crosses three; between 4 and 4.5, two.</p>`],
          [R`2025-A Q2.5: the gaps and the answer (open after you try)`, R`<ul>
<li>7–8: \(4\); 2–3: \(|1.5 - 4| + |2 - 4| = 2.5 + 2 = 4.5\); 2–8: \(8 + 5.5 = 13.5\)</li>
<li>\(2 \lt 4\) → \(k = 3\): \(\{1,2\}\), \(\{3,\dots,7\}\), \(\{8,9,10\}\).</li>
<li>\(k = 2\): cross the smallest gap, 4 → \(\{1,2\}\) and \(\{3,\dots,10\}\). Matches the official solution.</li>
</ul>`],
        ],
        side: R`<ul>
<li>Inside steps in full: \(\{1,2\}\): 1.5. \(\{3,\dots,7\}\): 4–5 at 0.5, 3–4 at 1, 5–6 at 1.5, 6–7 at 2. \(\{8,9,10\}\): 8–9 at 1, 9–10 at 2.</li>
<li>K-means' best \(k = 2\) split was \(\{1,\dots,6\}\) / \(\{7,\dots,10\}\) — different, because K-means minimises WCSS while single linkage follows the smallest gaps.</li>
</ul>`,
      },

      "complete-linkage": {
        title: "Agglomerative clustering: complete linkage (max instead of min)",
        minutes: 2,
        cue: R`"Manhattan distance (\(L_1\)) and complete linkage … specify the two clusters being merged, the distance between these two clusters, and the distance between the newly merged cluster and all other clusters" (2026-A Q4.4).`,
        lines: [
          R`First write all pairwise Manhattan distances \(|x_1 - y_1| + |x_2 - y_2|\) (6 samples: 15 pairs).`,
          R`Merge the two clusters with the <b>smallest</b> distance; write it down.`,
          R`New cluster's row: \(d(A \cup B, C) = \max\big(d(A,C),\ d(B,C)\big)\) — the farthest pair.`,
          R`Cross out the two old rows; repeat until one cluster is left.`,
        ],
        numbers: R`<p>2025-A's points with complete linkage (not asked there; distances as in card "single linkage"):</p>
<ul>
<li>Iteration 1: \(d(4,5) = 0.5\) → \(\{4,5\}\). Row: to 3: \(\max(1,\ 1.5) = 1.5\) (single gave 1); to 6: \(\max(2,\ 1.5) = 2\)</li>
<li>Iteration 2: only 8–9 is at 1 → \(\{8,9\}\). (Single linkage merged 3 here.)</li>
</ul>`,
        check: R`\(n - 1\) merges; merge distances never go down.`,
        trap: R`Using max to choose <b>which</b> clusters merge. Max is only for the distance between clusters; merge the smallest.`,
        why: [
          [R`Why a second linkage exists`, R`<p>Single linkage joins two clusters as soon as <b>one</b> pair is close, so a chain of nearby points can glue different groups into long stretched clusters. Complete linkage calls two clusters close only if <b>every</b> pair between them is close — it prefers compact, round clusters.</p>`],
          [R`Why line 3? The max shortcut`, R`<p>Complete linkage = the distance between the <b>farthest</b> pair. The farthest pair between \(A \cup B\) and \(C\) is either \(A\)'s farthest pair to \(C\) or \(B\)'s — whichever is larger. So each new row is the entry-wise max of the two old rows.</p>`],
        ],
        side: R`<ul>
<li>The full run on 2025-A's data (merge heights): single 0.5, 1, 1, 1.5, 1.5, 2, 2, 4, 4.5; complete 0.5, 1, 1.5, 1.5, 2, 3, 5, 11, 18. Both reach the three visible groups after merge 7, but the 8th merge differs: single joins the middle group to the top-right one (closest pair 4), complete joins it to the bottom-left one (farthest pair 11 vs 12). The linkage can change the answer.</li>
<li>2026-A's question says no need for the full matrix, but with 6 points writing it is the safest way to make every max a lookup.</li>
</ul>`,
      },

      "dendrogram": {
        title: "Drawing the dendrogram",
        minutes: 1,
        cue: R`"Draw the dendrogram tree that the algorithm would output" (2026-A Q4.4).`,
        lines: [
          R`Bottom row: one leaf per sample, ordered so that samples merged together sit next to each other.`,
          R`Vertical axis: merge distance.`,
          R`For each merge, in order: join the two clusters' branches with a horizontal bar at the height of that merge distance.`,
          R`The last merge (everything) is the root, at the top.`,
        ],
        numbers: R`<p>2025-A, single linkage (card "single linkage"), merges with heights:</p>
<p>\(\{4,5\}\) 0.5 → +3 at 1 → \(\{8,9\}\) 1 → \(\{1,2\}\) 1.5 → +6 at 1.5 → +7 at 2 → +10 at 2 → \(\{3..7\}+\{8,9,10\}\) at 4 → all at 4.5.</p>
<p>Leaf order: 1 2 | 3 4 5 6 7 | 8 9 10.</p>`,
        check: R`\(n\) leaves → \(n - 1\) bars, and each bar is higher than the bars below it.`,
        trap: R`Drawing the bars at equal steps. Each bar's height is its merge distance.`,
        why: [
          [R`Why the heights matter`, R`<p>A horizontal cut at some height crosses one branch per cluster that exists at that moment. So the heights let you read off the clustering for any \(k\) (card "cut hierarchy").</p>`],
          [R`The same tree written as text`, R`<pre><code>{1..10}            4.5
├── {1,2}          1.5
│   ├── 1
│   └── 2
└── {3..10}        4
    ├── {3..7}     2
    │   ├── {3,4,5,6}   1.5
    │   │   ├── {3,4,5}     1
    │   │   │   ├── 3
    │   │   │   └── {4,5}       0.5
    │   │   │       ├── 4
    │   │   │       └── 5
    │   │   └── 6
    │   └── 7
    └── {8,9,10}   2
        ├── {8,9}      1
        │   ├── 8
        │   └── 9
        └── 10</code></pre>
<p>On paper draw it upside down: leaves at the bottom, each joint at its height.</p>`],
        ],
        side: R`<ul>
<li>2026-A's official solution draws the tree as text ("Node A parent of …") with the distance at each node. Any clear tree with the merge heights marked is fine.</li>
</ul>`,
      },

      "kmeans-code": {
        title: "Filling in K-means code",
        minutes: 2,
        cue: R`"Complete the missing parts of code by filling the blocks labeled 1–6" (2025-C Q5.5; 2026-A Q4.5: 1–4).`,
        lines: [
          R`Write each array's shape next to it: <code>X</code> is \(n \times d\); <code>distances</code> is \(n \times k\) or \(k \times n\)?`,
          R`Label each block: <code>argmin</code> = step A, mean = step B, sum of squares = WCSS, <code>if … break</code> = stop rule.`,
          R`Fill each blank with what its step needs: a squared distance, a mean, an "is it empty?" test.`,
          R`Stop rule: compare WCSS with the previous round's, then remember it.`,
        ],
        numbers: R`<p>2025-C blank (4), shapes first: <code>X</code> is \(6 \times 2\), so what is subtracted must be \(6 \times 2\) too — row \(i\) = sample \(i\)'s own centroid. Assignments <code>[0,0,0,1,1,1]</code> → three rows \(\left(\tfrac43, \tfrac43\right)\), then three rows \((6.5, 6.5)\). Which numpy expression builds that array?</p>`,
        trap: R`Stopping on the value (<code>WCSS &lt; epsilon</code>) instead of the <b>change</b> — your Moed B Q3.4 mistake.`,
        why: [
          [R`Why line 1? The axis of <code>argmin</code>`, R`<p><code>np.argmin(D, axis=1)</code> gives, for each <b>row</b>, the column of its smallest entry; <code>axis=0</code> gives, for each <b>column</b>, the row. 2025-C's <code>distances</code> is \(n \times k\) (row = sample), so <code>axis=1</code>. 2026-A's is built by appending one row per centroid: \(k \times n\), so <code>axis=0</code>. Both pick each sample's nearest centroid.</p>`],
          [R`Detecting an empty cluster`, R`<p><code>idx = (cluster_assignments == j)</code> is a True/False mask with one entry per sample, so <code>len(idx)</code> is always \(n\) — useless. <code>idx.any()</code> or <code>idx.sum()</code> works. A selection like <code>X[mask]</code> is different: it holds only the chosen rows, so its <code>len</code> does count the cluster's samples.</p>`],
          [R`2025-C blank (4): the expression (open after you try)`, R`<p><code>new_centroids[cluster_assignments]</code>. Indexing an array with an array of row numbers picks those rows in that order: <code>[0,0,0,1,1,1]</code> → row 0 three times, then row 1 three times — exactly the \(6 \times 2\) array above. <code>X</code> minus it, squared, summed \(= \tfrac73\): the WCSS after.</p>`],
          [R`Why line 4? Why <code>prev_wcss</code> starts at <code>np.inf</code>`, R`<p>WCSS never goes up, and when it stops changing, the assignments have stopped changing (card "another iteration"). Starting at infinity makes sure the very first round never triggers the stop.</p>`],
        ],
        side: R`<ul>
<li>2025-C's printed line (4) has one bracket too many; it means: subtract, square, add everything up.</li>
<li>2026-A's WCSS line picks each sample's distance to its own <b>old</b> centroid and squares it: the "before" WCSS.</li>
<li>Your HW6 <code>kmeans</code> has the same structure (random empty-cluster rule, \(k \times n\) distances).</li>
</ul>`,
      },
    },
    parts: {
      "2025A-q2.1": ["different-starts"],
      "2025A-q2.2": ["compare-by-wcss"],
      "2025A-q2.3": ["elbow"],
      "2025A-q2.4": ["single-linkage"],
      "2025A-q2.5": ["cut-hierarchy"],
      "2025C-q5.1": ["assign", "means", "wcss"],
      "2025C-q5.2": ["another-iteration"],
      "2025C-q5.3": ["range-of-a"],
      "2025C-q5.4": ["modified-objective"],
      "2025C-q5.5": ["kmeans-code"],
      "2026A-q4.1": ["assign", "means", "wcss"],
      "2026A-q4.2": ["another-iteration"],
      "2026A-q4.3": ["converged-solution"],
      "2026A-q4.4": ["complete-linkage", "dendrogram"],
      "2026A-q4.5": ["kmeans-code"],
    },
  };
})();
