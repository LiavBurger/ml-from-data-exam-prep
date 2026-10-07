// Walkthroughs for the Decision-tree questions — CASUAL style (spec/WALKS.md):
// the point first, then "Begin your answer like this" + the full exam answer, then the steps that build it.
// Numbers checked with python3/numpy (log base 2).
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ═════════════════════════════════════════════ 2025-B Q2
    "2025B-q2.1": {
      point: R`<p>Pure plug-in: the question hands you the formula. The only thing to find is \(p\).</p>
<p><b>1. What \(p\) is.</b> "A binary distribution with parameter \(p\)" = \(p\) is the <b>fraction</b> of \(+\) rows in the node, not the count. Here the node is the whole dataset: count the \(+\) in the \(y\) column, divide by 8.</p>
<p><b>2. Why this formula measures "mixed".</b> Pick two rows at random: \(p\cdot p\) = both \(+\), \((1-p)(1-p)\) = both \(-\). So \(1 - p^2 - (1-p)^2\) = the chance they <b>differ</b>. All \(+\): \(1 - 1 - 0 = 0\), nothing mixed. Half and half: as mixed as it gets.</p>
<p><b>So:</b> count, divide, plug in.</p>`,
      start: R`<p><b>Count:</b> \(\square\) positive, \(\square\) negative, so \(p = \square\)</p>\[\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2 = \;\square\]`,
      answer: R`<p><b>Count:</b> 4 positive, 4 negative, so \(p = \tfrac48 = \tfrac12\)</p>\[\varphi_{Gini}(\tfrac12) = 1 - \left(\tfrac12\right)^2 - \left(\tfrac12\right)^2 = \tfrac12\]`,
      moves: [
        { line: R`<b>Count the labels</b> — the \(y\) column has 4 \(+\) (rows 2, 3, 5, 8) and 4 \(-\), out of 8: \(\;p = \tfrac48 = \tfrac12\).` },
        { line: R`<b>Plug in</b> — the formula from the question: <div class="formula">\[\varphi_{Gini}(\tfrac12) = 1 - \left(\tfrac12\right)^2 - \left(\tfrac12\right)^2 = 1 - \tfrac14 - \tfrac14 = \tfrac12\]</div>Done.`,
          why: R`<p>It's also on the sheet: [sheet: Gini impurity] (with 2 classes, \(p_1 = p\) and \(p_2 = 1-p\)). Plug in the fraction, never the count 4.</p>` },
      ],
      compare: R`Same as the official solution: 4 positive, 4 negative, \(p = \tfrac12\), \(\varphi = \tfrac12\).`,
    },

    "2025B-q2.2": {
      point: R`<p>A split is good when the boxes it makes are less mixed than the pile you started with. The reduction measures exactly that.</p>
<p><b>1. What the question asks.</b> "Impurity reduction" = Gini before the split − Gini after it. Before = the whole dataset, \(\tfrac12\) (part 1). After = the children's Gini, each weighted by its share of the rows.</p>
<p><b>2. The picture.</b> Sort the 8 rows into two boxes by the feature's value:</p><div class="fig"><svg viewBox="0 0 520 170" width="520" role="img" aria-label="Split by X1: two boxes each 2 plus 2 minus. Split by X4: a pure box of 2 plus, and a box of 2 plus 4 minus"><text x="12.0" y="40.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">split by X₁:</text><rect x="110.0" y="18.0" width="122.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="132.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="132.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="158.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="158.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="184.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="184.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="210.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="210.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="171.0" y="68.0" text-anchor="middle" font-size="12" fill="currentColor">X₁ = 0</text><rect x="250.0" y="18.0" width="122.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="272.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="272.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="298.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="298.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="324.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="324.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="350.0" cy="35.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="350.0" y="40.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="311.0" y="68.0" text-anchor="middle" font-size="12" fill="currentColor">X₁ = 1</text><text x="512.0" y="40.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">as mixed as before</text><text x="12.0" y="120.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">split by X₄:</text><rect x="110.0" y="98.0" width="70.0" height="34" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="132.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="132.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="158.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="158.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="145.0" y="148.0" text-anchor="middle" font-size="12" fill="currentColor">X₄ = 1</text><rect x="198.0" y="98.0" width="174.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="220.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="220.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="246.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="246.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="272.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="272.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="298.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="298.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="324.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="324.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="350.0" cy="115.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="350.0" y="120.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="285.0" y="148.0" text-anchor="middle" font-size="12" fill="currentColor">X₄ = 0</text><text x="512.0" y="120.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">one box pure</text></svg></div>
<p><b>3. Why weighted by share.</b> Every row carries the Gini of the box it lands in. "After" = the average over the 8 rows, so a box with 2 rows counts \(\tfrac28\), a box with 6 rows counts \(\tfrac68\).</p>
<p><b>4. Read it off the picture.</b> \(X_1\)'s boxes hold two \(+\) and two \(-\) each, exactly the parent's mix: nothing changed. \(X_4\) makes a pure box (Gini 0) and a 2-of-6 box that is less mixed than half and half.</p>
<p><b>So:</b> \(X_1\) gives 0, \(X_4\) gives something positive. The formula gives the exact numbers.</p>`,
      start: R`<p><b>Key idea:</b> Reduction = Gini of the parent − each child's Gini weighted by its share of the rows. \(X_1\)'s children are half and half like the parent (no gain); \(X_4\) makes a pure child (a gain).</p>
<p><b>The formula:</b></p>\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]
<p><b>\(X_1\):</b> \(X_1 = 0\): □ → \(\varphi = \square\); \(\;X_1 = 1\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(S, X_1) = \;\square\]
<p><b>\(X_4\):</b> \(X_4 = 1\): □ → \(\varphi = \square\); \(\;X_4 = 0\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(S, X_4) = \;\square\]`,
      answer: R`<p><b>Key idea:</b> Reduction = Gini of the parent − each child's Gini weighted by its share of the rows. \(X_1\)'s children are half and half like the parent (no gain); \(X_4\) makes a pure child (a gain).</p>
<p><b>The formula:</b></p>\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]
<p><b>\(X_1\):</b> \(X_1 = 0\): rows 1–4, 2 \(+\) 2 \(-\) → \(\varphi = \tfrac12\); \(\;X_1 = 1\): rows 5–8, 2 \(+\) 2 \(-\) → \(\varphi = \tfrac12\)</p>
\[\Delta\varphi(S, X_1) = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = 0\]
<p><b>\(X_4\):</b> \(X_4 = 1\): rows 3, 5, 2 \(+\) → \(\varphi = 1 - 1^2 - 0^2 = 0\); \(\;X_4 = 0\): rows 1, 2, 4, 6, 7, 8, 2 \(+\) 4 \(-\) → \(\varphi = 1 - \left(\tfrac13\right)^2 - \left(\tfrac23\right)^2 = \tfrac49\)</p>
\[\Delta\varphi(S, X_4) = \tfrac12 - \tfrac28\cdot 0 - \tfrac68\cdot\tfrac49 = \tfrac12 - \tfrac13 = \tfrac16\]`,
      moves: [
        { line: R`<b>The formula</b> — before, minus each child weighted by its share of the rows. \(\varphi(S) = \tfrac12\) from part 1: <div class="formula">\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]</div>`,
          why: R`<p>\(S_{A=0}\) = the rows with \(A = 0\).</p>`,
          remember: R`\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\]<p>Not on the sheet: it only has the impurity itself, [sheet: Gini impurity]. Here \(v\) = 0, 1, so \(S_v\) is \(S_{A=0}\), \(S_{A=1}\).</p>` },
        { line: R`<b>\(X_1\)</b> — both children are 2 \(+\) out of 4, like the parent: <div class="tw"><table><thead><tr><th>child</th><th>rows</th><th>labels</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_1 = 0\)</td><td>1–4</td><td>\(-\,+\,+\,-\)</td><td>\(\tfrac12\)</td></tr>
<tr><td>\(X_1 = 1\)</td><td>5–8</td><td>\(+\,-\,-\,+\)</td><td>\(\tfrac12\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(S, X_1) = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = 0\]</div>`,
          why: R`<p>The children are exactly as mixed as the parent, so the split gained nothing. Part 6 proves this always happens.</p>` },
        { line: R`<b>\(X_4\)</b> — \(X_4 = 1\) is pure, the other child is 2 \(+\) out of 6: <div class="tw"><table><thead><tr><th>child</th><th>rows</th><th>labels</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_4 = 1\)</td><td>3, 5</td><td>\(+\,+\)</td><td>\(0\)</td></tr>
<tr><td>\(X_4 = 0\)</td><td>1, 2, 4, 6, 7, 8</td><td>\(-\,+\,-\,-\,-\,+\)</td><td>\(1 - \tfrac19 - \tfrac49 = \tfrac49\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(S, X_4) = \tfrac12 - \tfrac28\cdot 0 - \tfrac68\cdot\tfrac49 = \tfrac12 - \tfrac13 = \tfrac16\]</div>Done.`,
          why: R`<p>\(X_4 = 0\): \(p = \tfrac26 = \tfrac13\), so \(\varphi = 1 - \left(\tfrac13\right)^2 - \left(\tfrac23\right)^2 = 1 - \tfrac19 - \tfrac49 = \tfrac49\). And \(\tfrac68\cdot\tfrac49 = \tfrac{24}{72} = \tfrac13\).</p>` },
      ],
      compare: R`Same steps as the official solution; the last lines of steps 2 and 3 are its bold \(\mathbf 0\) and \(\tfrac16\).`,
      slip: R`The official pairs are (fraction −, fraction +). That's why \(X_4 = 1\), where both samples are +, is \((0, 1)\). Gini gives the same number in either order, so don't worry if you wrote them the other way.`,
    },

    "2025B-q2.3": {
      point: R`<p>"Minimum depth" = as few questions in a row as possible. Try 1; when it fails, look at what the \(+\) rows have in common.</p>
<p><b>1. What zero error needs.</b> Rows that give the same answers to the tree's questions land in the same leaf, and a leaf says one label. So every leaf must hold one label only.</p>
<p><b>2. Why one question fails.</b> Row 1 is all zeros and \(-\), so it's in the 0-branch of <b>every</b> feature. And every 0-branch also holds a \(+\) row (row 2 for \(X_1, X_2, X_4\); row 3 for \(X_3\)). Row 1 and a \(+\) row share a leaf, so one of them is wrong.</p>
<p><b>3. Read the \(+\) rows.</b> Look only at rows 2, 3, 5, 8: each has \(X_3 = 1\) or \(X_4 = 1\). The \(-\) rows 1, 4, 6, 7 have both 0. Part 2 already hinted it: \(X_4 = 1\) was a pure \(+\) box.</p>
<p><b>So:</b> \(+ \iff X_3 = 1\) or \(X_4 = 1\): two questions, depth 2.</p>`,
      start: R`<p><b>Key idea:</b> No single feature works (row 1, \(-\), shares its 0-branch with a \(+\) row for every feature), but \(+ \iff X_3 = 1\) or \(X_4 = 1\), so asking \(X_3\), then \(X_4\), gives pure leaves: depth 2.</p>
<p><b>Depth 1 fails:</b> □</p>
<p><b>The rule:</b> \(+ \iff\) □</p>
<p><b>The tree (depth 2):</b></p><pre><code>        [□ ?]
      0 /    \ 1
   [□ ?]      □
  0 /   \ 1
   □     □</code></pre>
<p><b>Zero error:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> No single feature works (row 1, \(-\), shares its 0-branch with a \(+\) row for every feature), but \(+ \iff X_3 = 1\) or \(X_4 = 1\), so asking \(X_3\), then \(X_4\), gives pure leaves: depth 2.</p>
<p><b>Depth 1 fails:</b> every feature's 0-child holds row 1 \((-)\) and a \(+\) row (\(X_1, X_2, X_4\): rows 1, 2; \(X_3\): rows 1, 3), and a leaf has one label.</p>
<p><b>The rule:</b> \(+ \iff X_3 = 1\) or \(X_4 = 1\)</p>
<p><b>The tree (depth 2):</b></p><pre><code>        [X3 ?]
      0 /    \ 1
   [X4 ?]     +     rows 2, 8
  0 /   \ 1
   -     +          rows 3, 5
rows 1,4,6,7</code></pre>
<p><b>Zero error:</b> every leaf is pure, so every training row is classified correctly.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Minimum depth" → try the smallest first: depth 1 = one question. It works only if some feature puts all \(+\) on one side and all \(-\) on the other.`,
          why: R`<p>A depth-1 tree has one question. Two rows with the same answer land in the same leaf, and a leaf has one label, so if they have different labels one of them is wrong.</p>` },
        { line: R`<b>Depth 1 fails</b> — every feature's 0-child holds row 1 \((-)\) and a \(+\) row: \(X_1, X_2, X_4\): rows 1 and 2. \(X_3\): rows 1 and 3. So at least depth 2.` },
        { line: R`<b>The rule</b> — start from part 2: \(X_4 = 1\) is already pure \(+\) (rows 3, 5). Left over: \(+\) rows 2, 8, and only they have \(X_3 = 1\). So \(+ \iff X_3 = 1\) or \(X_4 = 1\).`,
          why: R`<p>Check it on all rows. \(+\) rows: 2 has \(X_3\), 3 has \(X_4\), 5 has \(X_4\), 8 has \(X_3\). \(-\) rows 1, 4, 6, 7: all have \(X_3 = X_4 = 0\).</p>` },
        { line: R`<b>The tree</b> — ask \(X_3\); if 0, ask \(X_4\). Every leaf pure: <pre><code>        [X3 ?]
      0 /    \ 1
   [X4 ?]     +     rows 2, 8
  0 /   \ 1
   -     +          rows 3, 5
rows 1,4,6,7</code></pre>Done.`,
          why: R`<p>\(X_4\) first, then \(X_3\), works too (the official second tree).</p>` },
      ],
      compare: R`Step 4 is the official first tree (its second tree asks \(X_4\) first), and step 2 is its last sentence.`,
    },

    "2025B-q2.4": {
      point: R`<p>Nothing to compute: a tree classifies by asking its questions, top to bottom.</p>
<p><b>1. What \(x = (0,1,0,0)\) means.</b> The values in the table's column order: \(X_1 = 0,\ X_2 = 1,\ X_3 = 0,\ X_4 = 0\).</p>
<p><b>2. The tree in words.</b> Part 3's tree: the root asks \(X_3\) (1 → \(+\)); if 0, it asks \(X_4\) (1 → \(+\), 0 → \(-\)). So: \(+\) only when \(X_3 = 1\) or \(X_4 = 1\).</p>
<p><b>3. Why \(X_2 = 1\) doesn't matter.</b> The tree never asks \(X_1\) or \(X_2\), so their values can't change the path.</p>
<p><b>So:</b> only \(X_3\) and \(X_4\) decide. The other tree (\(X_4\) first) asks the same two questions, so it agrees.</p>`,
      start: R`<p><b>Key idea:</b> The tree says \(+\) only when \(X_3 = 1\) or \(X_4 = 1\); \(x\) has \(X_3 = X_4 = 0\), so it's classified \(-\).</p>
<p><b>Values:</b> \(X_1 = \square,\ X_2 = \square,\ X_3 = \square,\ X_4 = \square\)</p>
<p><b>Path:</b> \(X_3 = \square\) → □; \(\;X_4 = \square\) → leaf □</p>
<p><b>Prediction:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> The tree says \(+\) only when \(X_3 = 1\) or \(X_4 = 1\); \(x\) has \(X_3 = X_4 = 0\), so it's classified \(-\).</p>
<p><b>Values:</b> \(X_1 = 0,\ X_2 = 1,\ X_3 = 0,\ X_4 = 0\)</p>
<p><b>Path:</b> \(X_3 = 0\) → go ask \(X_4\); \(\;X_4 = 0\) → leaf \(-\)</p>
<p><b>Prediction:</b> \(-\) (negative). The other tree (\(X_4\) first) also gives \(-\).</p>`,
      moves: [
        { line: R`<b>Read the values</b> — \(x = (0, 1, 0, 0)\) means \(X_1 = 0\), \(X_2 = 1\), \(X_3 = 0\), \(X_4 = 0\).` },
        { line: R`<b>Follow the tree</b> — the root asks \(X_3\): it's 0, so go to \(X_4\). \(X_4 = 0\), so leaf \(-\). Prediction: \(-\). Done.`,
          why: R`<p>\(X_1\) and \(X_2\) are never asked. The other tree (\(X_4\) first) also gives \(-\).</p>` },
      ],
      compare: R`Same as the official solution: \(-\) in both trees.`,
      slip: R`“Both trees above” = the two depth-2 trees in part 3's official solution (\(X_3\) first or \(X_4\) first). \(x = (0,1,0,0)\) has \(X_3 = X_4 = 0\), so both say −.`,
    },

    "2025B-q2.5": {
      point: R`<p>"Guaranteed \(\le \tfrac12\)" = "the biggest value Gini can ever take is \(\tfrac12\)". So find the top of the curve.</p>
<p><b>1. What the question asks.</b> For <b>every</b> \(p\) between 0 and 1, \(\varphi_{Gini}(p) \le \tfrac12\). Enough to show: its maximum is \(\tfrac12\).</p>
<p><b>2. The picture.</b> Multiply out: \(1 - p^2 - (1 - 2p + p^2) = 2p - 2p^2 = 2p(1-p)\). An upside-down parabola: 0 at \(p = 0\) and \(p = 1\) (pure nodes), a hill in between.</p><div class="fig"><svg viewBox="0 0 520 225" width="520" role="img" aria-label="Gini as a function of p: an upside-down parabola, 0 at p = 0 and 1, top ½ at p = ½"><line x1="60" y1="180" x2="480" y2="180" style="stroke:var(--muted)"/><line x1="60" y1="180" x2="60" y2="25" style="stroke:var(--muted)"/><line x1="60.0" y1="180" x2="60.0" y2="185" style="stroke:var(--muted)"/><text x="60.0" y="199.0" text-anchor="middle" font-size="12" fill="currentColor">0</text><line x1="260.0" y1="180" x2="260.0" y2="185" style="stroke:var(--muted)"/><text x="260.0" y="199.0" text-anchor="middle" font-size="12" fill="currentColor">½</text><line x1="460.0" y1="180" x2="460.0" y2="185" style="stroke:var(--muted)"/><text x="460.0" y="199.0" text-anchor="middle" font-size="12" fill="currentColor">1</text><text x="482.0" y="199.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">p</text><text x="52.0" y="44.0" text-anchor="end" font-size="12" fill="currentColor">½</text><text x="52.0" y="184.0" text-anchor="end" font-size="12" fill="currentColor">0</text><polyline points="60.0,180.0 64.0,174.5 68.0,169.0 72.0,163.7 76.0,158.5 80.0,153.4 84.0,148.4 88.0,143.5 92.0,138.8 96.0,134.1 100.0,129.6 104.0,125.2 108.0,120.9 112.0,116.7 116.0,112.6 120.0,108.6 124.0,104.7 128.0,101.0 132.0,97.3 136.0,93.8 140.0,90.4 144.0,87.1 148.0,83.9 152.0,80.8 156.0,77.9 160.0,75.0 164.0,72.3 168.0,69.6 172.0,67.1 176.0,64.7 180.0,62.4 184.0,60.2 188.0,58.1 192.0,56.2 196.0,54.3 200.0,52.6 204.0,51.0 208.0,49.5 212.0,48.1 216.0,46.8 220.0,45.6 224.0,44.5 228.0,43.6 232.0,42.7 236.0,42.0 240.0,41.4 244.0,40.9 248.0,40.5 252.0,40.2 256.0,40.1 260.0,40.0 264.0,40.1 268.0,40.2 272.0,40.5 276.0,40.9 280.0,41.4 284.0,42.0 288.0,42.7 292.0,43.6 296.0,44.5 300.0,45.6 304.0,46.8 308.0,48.1 312.0,49.5 316.0,51.0 320.0,52.6 324.0,54.3 328.0,56.2 332.0,58.1 336.0,60.2 340.0,62.4 344.0,64.7 348.0,67.1 352.0,69.6 356.0,72.3 360.0,75.0 364.0,77.9 368.0,80.8 372.0,83.9 376.0,87.1 380.0,90.4 384.0,93.8 388.0,97.3 392.0,101.0 396.0,104.7 400.0,108.6 404.0,112.6 408.0,116.7 412.0,120.9 416.0,125.2 420.0,129.6 424.0,134.1 428.0,138.8 432.0,143.5 436.0,148.4 440.0,153.4 444.0,158.5 448.0,163.7 452.0,169.0 456.0,174.5 460.0,180.0" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/><line x1="260.0" y1="40.0" x2="260.0" y2="180" style="stroke:var(--accent)" stroke-dasharray="5 4"/><line x1="60" y1="40.0" x2="260.0" y2="40.0" style="stroke:var(--muted)" stroke-dasharray="2 3"/><circle cx="260.0" cy="40.0" r="5" style="fill:var(--accent)"/><text x="260.0" y="28.0" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">top: φ(½) = ½ (50/50 node)</text><line x1="140.0" y1="90.4" x2="380.0" y2="90.4" style="stroke:var(--shaky)" stroke-width="2" stroke-dasharray="4 3"/><circle cx="140.0" cy="90.4" r="4.5" style="fill:var(--shaky)"/><circle cx="380.0" cy="90.4" r="4.5" style="fill:var(--shaky)"/><text x="260.0" y="108.4" text-anchor="middle" font-size="11" fill="currentColor">same height at p and 1 − p</text><text x="60.0" y="214.0" text-anchor="middle" font-size="11" style="fill:var(--muted)">(pure)</text><text x="460.0" y="214.0" text-anchor="middle" font-size="11" style="fill:var(--muted)">(pure)</text></svg></div>
<p><b>3. Why the top is at \(p = \tfrac12\).</b> Swap the names \(+\) and \(-\): \(p\) becomes \(1-p\), and \(1 - p^2 - (1-p)^2\) stays the same. So the height at \(p\) and at \(1-p\) is equal: the hill is a mirror image around \(\tfrac12\), and its top sits on the mirror line. Calculus confirms it: \(\varphi' = 2 - 4p = 0\) at \(\tfrac12\), and \(\varphi'' = -4 \lt 0\) says hill, not valley.</p>
<p><b>So:</b> the top is \(\varphi(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\), and every other \(p\) is lower.</p>`,
      start: R`<p><b>Key idea:</b> \(\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\) is concave (\(\varphi'' = -4 \lt 0\)), so its only flat point \(p = \tfrac12\) (\(\varphi' = 2 - 4p = 0\)) is the global maximum: \(\varphi_{Gini}(p) \le \varphi_{Gini}(\tfrac12) = \tfrac12\).</p>
<p><b>The function:</b> \(\;\varphi_{Gini}(p) = \square\)</p>
<p><b>Its derivative:</b> \(\;\varphi'(p) = \square = 0 \;\Rightarrow\; p = \square\)</p>
<p><b>Second derivative:</b> \(\;\varphi''(p) = \square\), so that point is a \(\square\)</p>
<p><b>The value there:</b> \(\;\varphi(\square) = \square\), so \(\varphi_{Gini}(p) \le \tfrac12\)</p>`,
      answer: R`<p><b>Key idea:</b> \(\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\) is concave (\(\varphi'' = -4 \lt 0\)), so its only flat point \(p = \tfrac12\) (\(\varphi' = 2 - 4p = 0\)) is the global maximum: \(\varphi_{Gini}(p) \le \varphi_{Gini}(\tfrac12) = \tfrac12\).</p>
<p><b>The function:</b> \(\;\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\)</p>
<p><b>Its derivative:</b> \(\;\varphi'(p) = -2p + 2(1-p) = 2 - 4p = 0 \;\Rightarrow\; p = \tfrac12\)</p>
<p><b>Second derivative:</b> \(\;\varphi''(p) = -4 \lt 0\), so the function is concave and that point is its global maximum</p>
<p><b>The value there:</b> \(\;\varphi(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\), so \(\varphi_{Gini}(p) \le \tfrac12\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "\(\varphi \le \tfrac12\) for every \(p\)" = "its largest value is \(\tfrac12\)". Largest value → derivative = 0, check it's a max, plug in. The function: \(\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\).` },
        { line: R`<b>Derivative</b> — like \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\), \((1-p)^2 \to 2(1-p)\cdot(-1)\): <div class="formula">\[\varphi'(p) = -2p + 2(1-p) = 2 - 4p\]</div>It's 0 at \(p = \tfrac12\).`,
          why: R`<p>The minus in front of \((1-p)^2\) and the \(-1\) from inside the bracket cancel: \(-\big[2(1-p)\cdot(-1)\big] = +2(1-p)\).</p>` },
        { line: R`<b>It's a maximum</b> — \(\varphi''(p) = -4 \lt 0\), so the function is concave and \(p = \tfrac12\) is its global maximum.`,
          why: R`<p>Negative second derivative = the curve bends down everywhere, so the one flat point is the top. The grader's note: forgetting this step costs at most ½ point.</p>` },
        { line: R`<b>The value there</b>: <div class="formula">\[\varphi_{Gini}(p) \le \varphi_{Gini}(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\]</div>Done.` },
      ],
      compare: R`Same steps as the official solution: derivative \(2 - 4p\), second derivative \(-4\), value \(\tfrac12\).`,
    },

    "2025B-q2.6": {
      point: R`<p>Mix two jars that are both one-third \(+\) and you get a jar that is one-third \(+\). Impurity only looks at that fraction, so nothing changes.</p><div class="fig"><svg viewBox="0 0 540 190" width="540" role="img" aria-label="Two children, 1 plus of 3 and 2 plus of 6, both a third plus; poured together 3 of 9, also a third"><rect x="144.0" y="12.0" width="252.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="166.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="166.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="192.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="192.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="218.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="218.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="244.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="244.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="270.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="270.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="296.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="296.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="322.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="322.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="348.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="348.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="374.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="374.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="270.0" y="62.0" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">together: 3 of 9 = ⅓ are +</text><line x1="230.0" y1="68" x2="145.8" y2="108" style="stroke:var(--muted)"/><line x1="310.0" y1="68" x2="394.2" y2="108" style="stroke:var(--muted)"/><rect x="97.8" y="110.0" width="96.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="119.8" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="119.8" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="145.8" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="145.8" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="171.8" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="171.8" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="145.8" y="160.0" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">1 of 3 = ⅓ are +</text><rect x="307.2" y="110.0" width="174.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="329.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="329.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="355.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="355.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="381.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="381.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="407.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="407.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="433.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="433.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="459.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="459.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="394.2" y="160.0" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">2 of 6 = ⅓ are +</text></svg></div>
<p><b>1.</b> Every impurity (Gini, entropy, any) is a function of the proportion \(p\) of \(+\) only.</p>
<p><b>2.</b> Both children have \(p\), so the parent, which is just the two poured together, has \(p\) too. <b>This is the step to prove.</b></p>
<p><b>3.</b> So parent and children all have impurity \(\varphi(p)\), and the children's weights add up to 1: before = after, reduction 0.</p>`,
      start: R`<p><b>Key idea:</b> impurity only depends on the proportion of \(+\); if both children have proportion \(p\), so does the parent, so all three impurities are \(\varphi(p)\) and the reduction is 0.</p>
<p><b>Words:</b> size 1, size 2 = the number of samples in each child; share 1 = size 1 ÷ samples in the parent (same for share 2).</p>
<p><b>1. Each child:</b> positives in the child = □ (both children have the same proportion \(p\))</p>
<p><b>2. The parent's proportion:</b></p>
\[\begin{aligned}\text{positives in parent} &= \square\\ \text{samples in parent} &= \square\\ \text{parent's proportion} &= \frac{\text{positives in parent}}{\text{samples in parent}}\\ &= \square\end{aligned}\]
<p><b>3. So</b> \(\varphi(\text{parent}) = \varphi(\text{child 1}) = \varphi(\text{child 2}) = \square\): impurity only sees the proportion.</p>
<p><b>4. The reduction</b> (each child's impurity weighted by its share):</p>
\[\begin{aligned}\text{reduction} &= \varphi(\text{parent}) - \text{share 1}\cdot\varphi(\text{child 1})\\ &\quad - \text{share 2}\cdot\varphi(\text{child 2})\\ &= \square\end{aligned}\]`,
      answer: R`<p><b>Key idea:</b> impurity only depends on the proportion of \(+\); if both children have proportion \(p\), so does the parent, so all three impurities are \(\varphi(p)\) and the reduction is 0.</p>
<p><b>Words:</b> size 1, size 2 = the number of samples in each child; share 1 = size 1 ÷ samples in the parent (same for share 2).</p>
<p><b>1. Each child:</b> positives in the child = \(p\) × its size (both children have the same proportion \(p\))</p>
<p><b>2. The parent's proportion:</b></p>
\[\begin{aligned}\text{positives in parent} &= p\cdot\text{size 1} + p\cdot\text{size 2}\\ &= p\cdot(\text{size 1} + \text{size 2})\\ \text{samples in parent} &= \text{size 1} + \text{size 2}\\ \text{parent's proportion} &= \frac{\text{positives in parent}}{\text{samples in parent}}\\ &= \frac{p\cdot(\text{size 1} + \text{size 2})}{\text{size 1} + \text{size 2}} = p\end{aligned}\]
<p><b>3. So</b> \(\varphi(\text{parent}) = \varphi(\text{child 1}) = \varphi(\text{child 2}) = \varphi(p)\): impurity only sees the proportion.</p>
<p><b>4. The reduction</b> (each child's impurity weighted by its share):</p>
\[\begin{aligned}\text{reduction} &= \varphi(\text{parent}) - \text{share 1}\cdot\varphi(\text{child 1})\\ &\quad - \text{share 2}\cdot\varphi(\text{child 2})\\ &= \varphi(p) - \text{share 1}\cdot\varphi(p) - \text{share 2}\cdot\varphi(p)\\ &= \varphi(p)\cdot\big(1 - \underbrace{(\text{share 1} + \text{share 2})}_{\textstyle = 1}\big) = 0\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(\Delta\varphi = 0\) for <b>any</b> impurity, so you can't use Gini's or entropy's formula. Use what they share: they only see the proportion \(p\) of \(+\).`,
          why: R`<p>Gini \(1 - p^2 - (1-p)^2\) and entropy \(-p\log p - (1-p)\log(1-p)\) are both functions of \(p\) alone ([sheet: Gini impurity], [sheet: Entropy]).</p>` },
        { line: R`<b>The parent has proportion \(p\)</b> — its positives are both children's positives, its size is both sizes: <div class="formula">\[\begin{aligned}\text{parent's proportion} &= \frac{p\cdot\text{size 1} + p\cdot\text{size 2}}{\text{size 1} + \text{size 2}}\\ &= \frac{p\cdot(\text{size 1} + \text{size 2})}{\text{size 1} + \text{size 2}} = p\end{aligned}\]</div>`,
          why: R`<p>Take \(p\) out of the top: what's left on top is exactly the bottom, so they cancel. This step is the proof: just assuming the parent has \(p\) costs 2 points. (The official solution writes the sizes as \(n^{(1)}, n^{(2)}\) and the positives as \(n_+^{(1)}, n_+^{(2)}\).)</p>` },
        { line: R`<b>Plug in</b> — all three impurities are \(\varphi(p)\), and the two shares add up to 1 (together the children are the whole parent): <div class="formula">\[\begin{aligned}\text{reduction} &= \varphi(p) - \text{share 1}\cdot\varphi(p) - \text{share 2}\cdot\varphi(p)\\ &= \varphi(p)\cdot(1 - 1) = 0\end{aligned}\]</div>Done.`,
          remember: R`\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\]<p>Not on the sheet: it only has the impurities themselves, [sheet: Gini impurity] and [sheet: Entropy]. Here the two children are \(S_1, S_2\) with sizes \(n^{(1)}, n^{(2)}\), and \(|S| = n\).</p>` },
      ],
      compare: R`Same steps as the official solution (it names the children's counts \(n_+^{(v)}, n_-^{(v)}\) and writes \(n^{(v)}\) as their sum). Its second denominator has a typo: children (0), (1) instead of (1), (2).`,
      slip: R`Typo in the second denominator: it numbers the children (0), (1) instead of (1), (2). It should be \(n_+^{(1)} + n_-^{(1)} + n_+^{(2)} + n_-^{(2)}\). Further down, \(n^{(v)}\) just means the size of child \(v\).`,
    },

    // ═════════════════════════════════════════════ 2025-C Q2
    "2025C-q2.1": {
      point: R`<p>Pure plug-in: the Gini of the whole dataset needs only \(p\).</p>
<p><b>1. What \(p\) is.</b> The fraction of one class in the node, here likes among all 6 instances. A fraction, not the count.</p>
<p><b>2. Why this formula measures "mixed".</b> [sheet: Gini impurity] with 2 classes is \(1 - p^2 - (1-p)^2\). Pick two instances at random: \(p^2\) = both like, \((1-p)^2\) = both dislike, so Gini = the chance they <b>differ</b>. All one reaction: 0. Half and half: as mixed as it gets.</p>
<p><b>So:</b> count the likes, divide by 6, plug in.</p>`,
      start: R`<p><b>Count:</b> \(\square\) likes, \(\square\) dislikes, so \(p = \square\)</p>\[\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2 = \;\square\]`,
      answer: R`<p><b>Count:</b> 3 likes (instances 2, 5, 6), 3 dislikes, so \(p = \tfrac36 = \tfrac12\)</p>\[\varphi_{Gini}(\tfrac12) = 1 - \left(\tfrac12\right)^2 - \left(\tfrac12\right)^2 = \tfrac12\]`,
      moves: [
        { line: R`<b>Count the reactions</b> — likes: instances 2, 5, 6. Dislikes: 1, 3, 4. So \(p = \tfrac36 = \tfrac12\).` },
        { line: R`<b>Plug in</b> — [sheet: Gini impurity]: <div class="formula">\[\varphi_{Gini}(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\]</div>Done.` },
      ],
      compare: R`Same as the official solution.`,
      slip: R`Read it as \(1 - (\tfrac12)^2 - (\tfrac12)^2 = 1 - \tfrac14 - \tfrac14 = \tfrac12\). The square goes on the whole ½; the brackets just got lost in typesetting.`,
    },

    "2025C-q2.2": {
      point: R`<p>Genre has 3 values, so the split makes 3 boxes. Pure boxes cost nothing; only the mixed one counts.</p>
<p><b>1. What the question asks.</b> Gini before (the whole dataset, \(\tfrac12\) from part 1) minus Gini after = each child's Gini weighted by its share of the 6 instances.</p>
<p><b>2. The picture.</b> Sort the 6 instances by genre:</p><div class="fig"><svg viewBox="0 0 420 98" width="420" role="img" aria-label="Genre splits the 6 instances into Action 1 minus 2 plus, Comedy 3 and 4 minus (pure), Drama 5 and 6 plus (pure)"><text x="10.0" y="36.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">split by Genre:</text><rect x="140.0" y="14.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="162.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="162.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="162.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><circle cx="188.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="188.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="188.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><text x="175.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">Action</text><rect x="226.0" y="14.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="248.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="248.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="248.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><circle cx="274.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="274.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="274.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><text x="261.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">Comedy</text><rect x="312.0" y="14.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="334.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="334.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="334.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><circle cx="360.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="360.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="360.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">6</text><text x="347.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">Drama</text></svg></div>
<p><b>3. Why a pure box is 0.</b> All one reaction: \(p = 1\) (or 0), so \(1 - 1^2 - 0^2 = 0\). Two instances that disagree: \(p = \tfrac12\), Gini \(\tfrac12\), the most mixed.</p>
<p><b>4. Why weighted by share.</b> Each instance carries the Gini of its box; "after" is the average over the 6. Action holds 2 of the 6.</p>
<p><b>So:</b> after = \(\tfrac26\cdot\tfrac12\) (Comedy and Drama add 0), and the reduction is \(\tfrac12\) minus that.</p>`,
      start: R`<p><b>Key idea:</b> Genre makes 3 children of 2; Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure (Gini 0), so only Action \(\{1-, 2+\}\) (Gini \(\tfrac12\), share \(\tfrac26\)) is left after the split.</p>
<p><b>Children:</b> Action □ → \(\varphi = \square\); Comedy □ → \(\varphi = \square\); Drama □ → \(\varphi = \square\)</p>
\[\Delta\varphi(\text{Genre}) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v) = \;\square\]`,
      answer: R`<p><b>Key idea:</b> Genre makes 3 children of 2; Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure (Gini 0), so only Action \(\{1-, 2+\}\) (Gini \(\tfrac12\), share \(\tfrac26\)) is left after the split.</p>
<p><b>Children:</b> Action \(\{1-, 2+\}\) → \(\varphi = \tfrac12\); Comedy \(\{3-, 4-\}\) → \(\varphi = 0\); Drama \(\{5+, 6+\}\) → \(\varphi = 0\)</p>
\[\begin{aligned}\Delta\varphi(\text{Genre}) &= \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\\ &= \tfrac12 - \left(\tfrac26\cdot\tfrac12 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= \tfrac12 - \tfrac16 = \tfrac13\end{aligned}\]`,
      moves: [
        { line: R`<b>Children</b> — each holds 2 of the 6 instances: <div class="tw"><table><thead><tr><th>child</th><th>instances</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>Action</td><td>\(1-,\ 2+\)</td><td>\(\tfrac12\)</td></tr>
<tr><td>Comedy</td><td>\(3-,\ 4-\)</td><td>\(0\)</td></tr>
<tr><td>Drama</td><td>\(5+,\ 6+\)</td><td>\(0\)</td></tr></tbody></table></div>`,
          why: R`<p>A pure child: \(1 - 1^2 - 0^2 = 0\). Half and half: \(1 - \tfrac14 - \tfrac14 = \tfrac12\) (as in part 1).</p>`,
          remember: R`\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\]<p>Not on the sheet: it only has the impurity itself, [sheet: Gini impurity]. Here \(v\) = Action, Comedy, Drama.</p>` },
        { line: R`<b>Plug in</b> — one term per genre, \(\varphi(S) = \tfrac12\) from part 1: <div class="formula">\[\begin{aligned}\Delta\varphi(\text{Genre}) &= \tfrac12 - \left(\tfrac26\cdot\tfrac12 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= \tfrac12 - \tfrac16 = \tfrac13\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution.`,
    },

    "2025C-q2.3": {
      point: R`<p>Same boxes, different ruler: only the impurity function changes.</p>
<p><b>1. What "repeat (2) with entropy" means.</b> The split by Genre, the 3 children and the weights \(\tfrac26\) stay exactly as in part 2. Swap Gini for entropy, [sheet: Entropy]; the reduction is then called information gain.</p>
<p><b>2. The picture.</b> Both measure "how mixed": 0 for a pure node, highest at half and half. Entropy just peaks higher:</p><div class="fig"><svg viewBox="0 0 520 235" width="520" role="img" aria-label="Entropy and Gini against p: both 0 for a pure node, both highest at p = ½, entropy 1 and Gini ½"><line x1="60" y1="190" x2="480" y2="190" style="stroke:var(--muted)"/><line x1="60" y1="190" x2="60" y2="18" style="stroke:var(--muted)"/><line x1="60.0" y1="190" x2="60.0" y2="195" style="stroke:var(--muted)"/><text x="60.0" y="209.0" text-anchor="middle" font-size="12" fill="currentColor">0</text><line x1="260.0" y1="190" x2="260.0" y2="195" style="stroke:var(--muted)"/><text x="260.0" y="209.0" text-anchor="middle" font-size="12" fill="currentColor">½</text><line x1="460.0" y1="190" x2="460.0" y2="195" style="stroke:var(--muted)"/><text x="460.0" y="209.0" text-anchor="middle" font-size="12" fill="currentColor">1</text><text x="482.0" y="209.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">p</text><text x="52.0" y="194.0" text-anchor="end" font-size="12" fill="currentColor">0</text><text x="52.0" y="114.0" text-anchor="end" font-size="12" fill="currentColor">½</text><text x="52.0" y="34.0" text-anchor="end" font-size="12" fill="currentColor">1</text><polyline points="60.0,190.0 62.0,182.7 64.0,177.1 66.0,172.0 68.0,167.4 70.0,163.0 72.0,158.9 74.0,155.0 76.0,151.2 78.0,147.6 80.0,144.2 82.0,140.8 84.0,137.6 86.0,134.5 88.0,131.5 90.0,128.5 92.0,125.7 94.0,122.9 96.0,120.2 98.0,117.5 100.0,115.0 102.0,112.5 104.0,110.0 106.0,107.6 108.0,105.3 110.0,103.0 112.0,100.8 114.0,98.6 116.0,96.5 118.0,94.5 120.0,92.4 122.0,90.4 124.0,88.5 126.0,86.6 128.0,84.8 130.0,83.0 132.0,81.2 134.0,79.5 136.0,77.8 138.0,76.1 140.0,74.5 142.0,72.9 144.0,71.4 146.0,69.9 148.0,68.4 150.0,66.9 152.0,65.5 154.0,64.1 156.0,62.8 158.0,61.5 160.0,60.2 162.0,58.9 164.0,57.7 166.0,56.5 168.0,55.4 170.0,54.2 172.0,53.1 174.0,52.1 176.0,51.0 178.0,50.0 180.0,49.0 182.0,48.0 184.0,47.1 186.0,46.2 188.0,45.3 190.0,44.4 192.0,43.6 194.0,42.8 196.0,42.0 198.0,41.3 200.0,40.5 202.0,39.8 204.0,39.2 206.0,38.5 208.0,37.9 210.0,37.3 212.0,36.7 214.0,36.2 216.0,35.6 218.0,35.1 220.0,34.6 222.0,34.2 224.0,33.8 226.0,33.4 228.0,33.0 230.0,32.6 232.0,32.3 234.0,32.0 236.0,31.7 238.0,31.4 240.0,31.2 242.0,30.9 244.0,30.7 246.0,30.6 248.0,30.4 250.0,30.3 252.0,30.2 254.0,30.1 256.0,30.0 258.0,30.0 260.0,30.0 262.0,30.0 264.0,30.0 266.0,30.1 268.0,30.2 270.0,30.3 272.0,30.4 274.0,30.6 276.0,30.7 278.0,30.9 280.0,31.2 282.0,31.4 284.0,31.7 286.0,32.0 288.0,32.3 290.0,32.6 292.0,33.0 294.0,33.4 296.0,33.8 298.0,34.2 300.0,34.6 302.0,35.1 304.0,35.6 306.0,36.2 308.0,36.7 310.0,37.3 312.0,37.9 314.0,38.5 316.0,39.2 318.0,39.8 320.0,40.5 322.0,41.3 324.0,42.0 326.0,42.8 328.0,43.6 330.0,44.4 332.0,45.3 334.0,46.2 336.0,47.1 338.0,48.0 340.0,49.0 342.0,50.0 344.0,51.0 346.0,52.1 348.0,53.1 350.0,54.2 352.0,55.4 354.0,56.5 356.0,57.7 358.0,58.9 360.0,60.2 362.0,61.5 364.0,62.8 366.0,64.1 368.0,65.5 370.0,66.9 372.0,68.4 374.0,69.9 376.0,71.4 378.0,72.9 380.0,74.5 382.0,76.1 384.0,77.8 386.0,79.5 388.0,81.2 390.0,83.0 392.0,84.8 394.0,86.6 396.0,88.5 398.0,90.4 400.0,92.4 402.0,94.5 404.0,96.5 406.0,98.6 408.0,100.8 410.0,103.0 412.0,105.3 414.0,107.6 416.0,110.0 418.0,112.5 420.0,115.0 422.0,117.5 424.0,120.2 426.0,122.9 428.0,125.7 430.0,128.5 432.0,131.5 434.0,134.5 436.0,137.6 438.0,140.8 440.0,144.2 442.0,147.6 444.0,151.2 446.0,155.0 448.0,158.9 450.0,163.0 452.0,167.4 454.0,172.0 456.0,177.1 458.0,182.7 460.0,190.0" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/><polyline points="60.0,190.0 62.0,188.4 64.0,186.8 66.0,185.3 68.0,183.7 70.0,182.2 72.0,180.7 74.0,179.2 76.0,177.7 78.0,176.2 80.0,174.8 82.0,173.4 84.0,172.0 86.0,170.6 88.0,169.2 90.0,167.8 92.0,166.4 94.0,165.1 96.0,163.8 98.0,162.5 100.0,161.2 102.0,159.9 104.0,158.7 106.0,157.4 108.0,156.2 110.0,155.0 112.0,153.8 114.0,152.6 116.0,151.5 118.0,150.3 120.0,149.2 122.0,148.1 124.0,147.0 126.0,145.9 128.0,144.8 130.0,143.8 132.0,142.8 134.0,141.8 136.0,140.8 138.0,139.8 140.0,138.8 142.0,137.8 144.0,136.9 146.0,136.0 148.0,135.1 150.0,134.2 152.0,133.3 154.0,132.5 156.0,131.6 158.0,130.8 160.0,130.0 162.0,129.2 164.0,128.4 166.0,127.7 168.0,126.9 170.0,126.2 172.0,125.5 174.0,124.8 176.0,124.1 178.0,123.4 180.0,122.8 182.0,122.2 184.0,121.6 186.0,121.0 188.0,120.4 190.0,119.8 192.0,119.2 194.0,118.7 196.0,118.2 198.0,117.7 200.0,117.2 202.0,116.7 204.0,116.3 206.0,115.8 208.0,115.4 210.0,115.0 212.0,114.6 214.0,114.2 216.0,113.9 218.0,113.5 220.0,113.2 222.0,112.9 224.0,112.6 226.0,112.3 228.0,112.0 230.0,111.8 232.0,111.6 234.0,111.4 236.0,111.2 238.0,111.0 240.0,110.8 242.0,110.6 244.0,110.5 246.0,110.4 248.0,110.3 250.0,110.2 252.0,110.1 254.0,110.1 256.0,110.0 258.0,110.0 260.0,110.0 262.0,110.0 264.0,110.0 266.0,110.1 268.0,110.1 270.0,110.2 272.0,110.3 274.0,110.4 276.0,110.5 278.0,110.6 280.0,110.8 282.0,111.0 284.0,111.2 286.0,111.4 288.0,111.6 290.0,111.8 292.0,112.0 294.0,112.3 296.0,112.6 298.0,112.9 300.0,113.2 302.0,113.5 304.0,113.9 306.0,114.2 308.0,114.6 310.0,115.0 312.0,115.4 314.0,115.8 316.0,116.3 318.0,116.7 320.0,117.2 322.0,117.7 324.0,118.2 326.0,118.7 328.0,119.2 330.0,119.8 332.0,120.4 334.0,121.0 336.0,121.6 338.0,122.2 340.0,122.8 342.0,123.4 344.0,124.1 346.0,124.8 348.0,125.5 350.0,126.2 352.0,126.9 354.0,127.7 356.0,128.4 358.0,129.2 360.0,130.0 362.0,130.8 364.0,131.6 366.0,132.5 368.0,133.3 370.0,134.2 372.0,135.1 374.0,136.0 376.0,136.9 378.0,137.8 380.0,138.8 382.0,139.8 384.0,140.8 386.0,141.8 388.0,142.8 390.0,143.8 392.0,144.8 394.0,145.9 396.0,147.0 398.0,148.1 400.0,149.2 402.0,150.3 404.0,151.5 406.0,152.6 408.0,153.8 410.0,155.0 412.0,156.2 414.0,157.4 416.0,158.7 418.0,159.9 420.0,161.2 422.0,162.5 424.0,163.8 426.0,165.1 428.0,166.4 430.0,167.8 432.0,169.2 434.0,170.6 436.0,172.0 438.0,173.4 440.0,174.8 442.0,176.2 444.0,177.7 446.0,179.2 448.0,180.7 450.0,182.2 452.0,183.7 454.0,185.3 456.0,186.8 458.0,188.4 460.0,190.0" fill="none" style="stroke:var(--shaky)" stroke-width="2.5"/><circle cx="260.0" cy="30.0" r="4.5" style="fill:var(--accent)"/><circle cx="260.0" cy="110.0" r="4.5" style="fill:var(--shaky)"/><text x="260.0" y="19.0" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">entropy: top 1</text><text x="260.0" y="130.0" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--shaky)">Gini: top ½</text><text x="60.0" y="224.0" text-anchor="middle" font-size="11" style="fill:var(--muted)">(pure)</text><text x="460.0" y="224.0" text-anchor="middle" font-size="11" style="fill:var(--muted)">(pure)</text></svg></div>
<p><b>3. Why half and half gives 1.</b> \(\log_2\tfrac12 = -1\), because \(2^{-1} = \tfrac12\). So \(H(\tfrac12) = -\tfrac12\cdot(-1) - \tfrac12\cdot(-1) = 1\). A pure node: \(\log_2 1 = 0\), and \(0\cdot\log 0\) counts as 0, so \(H = 0\).</p>
<p><b>So:</b> the parent and Action are half and half (1), Comedy and Drama are pure (0): only Action's \(\tfrac26\cdot 1\) is subtracted.</p>`,
      start: R`<p><b>Key idea:</b> Same children and weights as in (2), with entropy instead of Gini: the parent and Action are half and half (\(H = 1\)), Comedy and Drama are pure (\(H = 0\)), so \(\mathrm{IG} = H(S) - \tfrac26\,H(\text{Action})\).</p>
<p><b>Entropies:</b> parent \(H(S) = \square\); Action \(\square\); Comedy \(\square\); Drama \(\square\)</p>
\[\mathrm{IG}(\text{Genre}) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v) = \;\square\]`,
      answer: R`<p><b>Key idea:</b> Same children and weights as in (2), with entropy instead of Gini: the parent and Action are half and half (\(H = 1\)), Comedy and Drama are pure (\(H = 0\)), so \(\mathrm{IG} = H(S) - \tfrac26\,H(\text{Action})\).</p>
<p><b>Entropies:</b> parent \(H(S) = H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\); Action \(H(\tfrac12) = 1\); Comedy \(H(0) = 0\); Drama \(H(1) = 0\)</p>
\[\begin{aligned}\mathrm{IG}(\text{Genre}) &= H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v)\\ &= 1 - \left(\tfrac26\cdot 1 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= 1 - \tfrac13 = \tfrac23\end{aligned}\]`,
      moves: [
        { line: R`<b>Entropies</b> — [sheet: Entropy]. The parent (3 likes, 3 dislikes) and Action \(\{1-, 2+\}\) are half and half; Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure: <div class="formula">\[\begin{aligned}H(\tfrac12) &= -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\\ H(0) &= H(1) = 0\end{aligned}\]</div>`,
          why: R`<p>\(\log_2\tfrac12 = -1\), because \(2^{-1} = \tfrac12\).</p>
<p><b>A pure node, e.g. Comedy (0 likes, 2 dislikes):</b></p>
\[H = -\underbrace{0\cdot\log_2 0}_{\textstyle = 0} - 1\cdot\underbrace{\log_2 1}_{\textstyle = 0} = 0\]
<p><b>Why \(0\cdot\log_2 0\) counts as 0:</b> \(\log_2 0\) alone is undefined (minus infinity), but here it's multiplied by the proportion 0: a class that isn't in the node adds no uncertainty, so its term is dropped. (Mathematically: \(p\log_2 p \to 0\) as \(p \to 0\), e.g. \(0.01\cdot\log_2 0.01 \approx -0.07\), \(0.001\cdot\log_2 0.001 \approx -0.01\).)</p>`,
          remember: R`\[\mathrm{IG}(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v)\]<p>Not on the sheet: it only has [sheet: Entropy]. Same shape as part 2's Gini reduction, with \(H\) instead of \(\varphi\). Here \(v\) = Action, Comedy, Drama.</p><p><b>A pure node has entropy 0</b> (and Gini 0): use \(0\cdot\log_2 0 = 0\).</p>` },
        { line: R`<b>Plug in</b>: <div class="formula">\[\begin{aligned}\mathrm{IG}(\text{Genre}) &= 1 - \left(\tfrac26\cdot 1 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= 1 - \tfrac13 = \tfrac23\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution.`,
    },

    "2025C-q2.4": {
      point: R`<p>Fewest splits = pick the root that leaves the fewest mixed boxes, then fix each mixed box with one more question.</p>
<p><b>1. What the question counts.</b> A split = one question node. Zero error = every leaf pure. Every mixed box needs at least one more question under it.</p>
<p><b>2. The picture.</b> Each attribute at the root (small numbers = instance ids):</p><div class="fig"><svg viewBox="0 0 560 274" width="560" role="img" aria-label="Each attribute at the root: Genre leaves one mixed box (Action), Time and Age leave two mixed boxes each"><text x="10.0" y="36.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">Genre at root:</text><rect x="132.0" y="14.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="154.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="154.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="154.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><circle cx="180.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="180.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="180.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><text x="167.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">Action</text><rect x="218.0" y="14.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="240.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="240.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="240.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><circle cx="266.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="266.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="266.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><text x="253.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">Comedy</text><rect x="304.0" y="14.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="326.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="326.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="326.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><circle cx="352.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="352.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="352.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">6</text><text x="339.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">Drama</text><text x="554.0" y="40.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">1 mixed box</text><text x="10.0" y="124.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">Time at root:</text><rect x="132.0" y="102.0" width="96.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="154.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="154.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="154.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><circle cx="180.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="180.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="180.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><circle cx="206.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="206.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="206.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><text x="180.0" y="166.0" text-anchor="middle" font-size="12" fill="currentColor">Weekend</text><rect x="244.0" y="102.0" width="96.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="266.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="266.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="266.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><circle cx="292.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="292.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="292.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><circle cx="318.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="318.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="318.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">6</text><text x="292.0" y="166.0" text-anchor="middle" font-size="12" fill="currentColor">Weekday</text><text x="554.0" y="128.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">2 mixed boxes</text><text x="10.0" y="212.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">Age at root:</text><rect x="132.0" y="190.0" width="96.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="154.0" cy="207.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="154.0" y="212.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="154.0" y="231.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><circle cx="180.0" cy="207.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="180.0" y="212.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="180.0" y="231.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><circle cx="206.0" cy="207.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="206.0" y="212.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="206.0" y="231.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><text x="180.0" y="254.0" text-anchor="middle" font-size="12" fill="currentColor">Young</text><rect x="244.0" y="190.0" width="96.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="266.0" cy="207.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="266.0" y="212.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="266.0" y="231.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><circle cx="292.0" cy="207.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="292.0" y="212.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="292.0" y="231.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><circle cx="318.0" cy="207.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="318.0" y="212.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="318.0" y="231.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">6</text><text x="292.0" y="254.0" text-anchor="middle" font-size="12" fill="currentColor">Adult</text><text x="554.0" y="216.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">2 mixed boxes</text></svg></div>
<p><b>3. Why 1 split can't do it.</b> Every attribute leaves at least one mixed box, so at least 2 splits.</p>
<p><b>4. Why Genre + one more is enough.</b> Genre leaves only Action \(\{1-, 2+\}\) mixed. A question separates two instances only if they answer it differently: 1 and 2 are both Young (Age can't), but Weekend vs Weekday (Time can).</p>
<p><b>So:</b> Genre at the root, Time under Action: 2 splits.</p>`,
      start: R`<p><b>Key idea:</b> Every attribute alone leaves a mixed child, so at least 2 splits. Genre leaves only Action \(\{1-, 2+\}\) mixed, and Time separates 1 and 2 (Age can't: both Young), so Genre, then Time under Action: 2 splits.</p>
<p><b>One split fails:</b> □</p>
<p><b>Root:</b> □, because □</p>
<p><b>Second split:</b> □ on the □ child, because □</p>
<p><b>The tree:</b></p><pre><code>□?
├─ □ → □?
│     ├─ □ → □
│     └─ □ → □
├─ □ → □
└─ □ → □</code></pre>`,
      answer: R`<p><b>Key idea:</b> Every attribute alone leaves a mixed child, so at least 2 splits. Genre leaves only Action \(\{1-, 2+\}\) mixed, and Time separates 1 and 2 (Age can't: both Young), so Genre, then Time under Action: 2 splits.</p>
<p><b>One split fails:</b> every attribute leaves a mixed child: Genre: Action \(\{1-, 2+\}\); Time: Weekend \(\{1-, 3-, 5+\}\); Age: Young \(\{1-, 2+, 3-\}\). So at least 2 splits.</p>
<p><b>Root:</b> Genre, because it leaves only one mixed child (Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure); Time or Age leave both children mixed.</p>
<p><b>Second split:</b> Time on the Action child, because instances 1 and 2 differ in Time (both are Young).</p>
<p><b>The tree:</b></p><pre><code>Genre?
├─ Action → Time?
│     ├─ Weekend → dislike   1
│     └─ Weekday → like      2
├─ Comedy → dislike          3, 4
└─ Drama  → like             5, 6</code></pre>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Fewest splits" → try 1 split first: it works only if every child is pure.` },
        { line: R`<b>One split fails</b> — every attribute leaves a mixed child: Genre: Action \(\{1-, 2+\}\). Time: Weekend \(\{1-, 3-, 5+\}\). Age: Young \(\{1-, 2+, 3-\}\). So at least 2.` },
        { line: R`<b>Root = Genre</b> — it leaves just <b>one</b> mixed child (Action); Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure. One more split, under Action, can finish it.`,
          why: R`<p>Time at the root: Weekend \(\{1-, 3-, 5+\}\) and Weekday \(\{2+, 4-, 6+\}\), <b>both</b> mixed. Age: Young \(\{1-, 2+, 3-\}\) and Adult \(\{4-, 5+, 6+\}\), both mixed. Each mixed child needs another split: at least 3.</p>` },
        { line: R`<b>Second split = Time</b> — Action's instances 1 \((-)\) and 2 \((+)\): Weekend vs Weekday, but both Young. So Time separates them, Age can't.` },
        { line: R`<b>The tree</b> — 2 splits, zero error: <pre><code>Genre?
├─ Action → Time?
│     ├─ Weekend → dislike   1
│     └─ Weekday → like      2
├─ Comedy → dislike          3, 4
└─ Drama  → like             5, 6</code></pre>Done.`,
          extra: [{ label: "official slip: \"Age\"", html: R`<p>The official text says the Action instances "can be split according to the Age attribute", but its drawing uses Time. The drawing is right: instances 1 and 2 are both Young.</p>` }] },
      ],
      compare: R`Step 5 is the official tree. Its text says "Age" for the second split, but its drawing (and step 4) use Time, which is the correct one.`,
      slip: R`The text says the two Action instances are split by Age, but both are Young. The split is on Time (Weekend −, Weekday +), which is what the drawing shows.`,
    },

    "2025C-q2.5": {
      point: R`<p>Pruning only changes the answer for instances that used to reach the part that was cut off.</p>
<p><b>1. What "keeping only its first split" means.</b> The Genre question stays; everything below it is cut. Each Genre child becomes a leaf that predicts the <b>majority</b> of the training instances reaching it.</p>
<p><b>2. What gets cut.</b> The part-4 tree: Genre → Action → Time; Comedy and Drama were already leaves. Pruning cuts off only the Time question under Action.</p>
<p><b>3. Why this instance doesn't care.</b> It's a Comedy: it goes down the Comedy branch in both trees, and Comedy was a leaf already (\(\{3-, 4-\}\) → dislike). Weekday and Young are never asked on that path.</p>
<p><b>So:</b> same leaf, same answer in both trees: pruning didn't affect this prediction.</p>`,
      start: R`<p><b>Key idea:</b> Pruning removed only the Time split under Action. A Comedy instance never goes there: it lands in the Comedy leaf (dislike) in both trees, so pruning didn't change the prediction.</p>
<p><b>The pruned tree:</b> □</p>
<p><b>The instance:</b> Genre = Comedy → leaf □ → predicts □</p>
<p><b>Did pruning change it?</b> □, because □</p>`,
      answer: R`<p><b>Key idea:</b> Pruning removed only the Time split under Action. A Comedy instance never goes there: it lands in the Comedy leaf (dislike) in both trees, so pruning didn't change the prediction.</p>
<p><b>The pruned tree:</b> only the Genre split; each child is a leaf with the majority label of its training instances: Comedy \(\{3-, 4-\}\) → dislike, Drama \(\{5+, 6+\}\) → like (Action \(\{1-, 2+\}\) is a tie, not needed here).</p>
<p><b>The instance:</b> Genre = Comedy → leaf Comedy → predicts <b>dislike (−)</b></p>
<p><b>Did pruning change it?</b> No, because in the unpruned tree Comedy is already a leaf (dislike); pruning only removed the Time question under Action.</p>`,
      moves: [
        { line: R`<b>The pruned tree</b> — Genre only; each child becomes a leaf with its majority label. Comedy \(\{3-, 4-\}\) → dislike, Drama \(\{5+, 6+\}\) → like.`,
          why: R`<p>Action \(\{1-, 2+\}\) is a 1–1 tie, but this instance never goes there.</p>`,
          remember: R`<p>Pruning a node = cut off everything below it; it becomes a leaf that predicts the <b>majority label</b> of the training samples reaching it.</p><p>Not on the sheet.</p>` },
        { line: R`<b>The instance</b> — Genre = Comedy, so it goes to the Comedy leaf: <b>dislike (−)</b>. Time and Age are never asked.` },
        { line: R`<b>Did pruning change it?</b> No. The unpruned tree (part 4) asks Genre, then Time only under Action; Comedy was already a leaf (−). Done.` },
      ],
      compare: R`Same as the official solution: dislike (−) in both the pruned and the unpruned tree.`,
    },

    "2025C-q2.6": {
      point: R`<p>Leave-one-out = hide one instance, let the others in its branch vote, see if they guess it. 6 rounds per attribute.</p>
<p><b>1. What the question asks.</b> A stump's question is fixed (e.g. "Genre?"). The only thing it learns is each leaf's label: the majority of the training instances that reach it (tie → dislike, the question says so).</p>
<p><b>2. Why hide it.</b> If the instance stayed in, it would vote for its own label: a rigged test. Hidden, it checks the stump on an instance it never saw.</p>
<p><b>3. What the vote looks like.</b> Genre: every genre has exactly 2 instances, so the hidden one's leaf is decided by its single partner. Right when the partner agrees (Comedy 3−, 4−; Drama 5+, 6+), wrong in Action (1−, 2+). Time and Age have branches of 3: the other 2 vote, and a 1–1 tie means dislike.</p>
<p><b>So:</b> per attribute, count the misses out of 6; the fewest wins.</p>`,
      start: R`<p><b>Key idea:</b> For each attribute, predict each instance by the majority of the <b>other</b> instances in its branch (tie → \(-\)). CV error = misses / 6; the attribute with the smallest CV error is best.</p>
<p><b>Each round:</b> leave out one instance; the rest of its branch votes (tie → −); ✗ = wrong.</p>
<div class="tw"><table><thead><tr><th>out</th><th>truth</th><th>Genre</th><th>Time</th><th>Age</th></tr></thead><tbody>
<tr><td>1</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr><tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>6</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr></tbody></table></div>
<p><b>CV error</b> \(= \frac{\#\text{errors}}{6}\): Genre \(\square\), Time \(\square\), Age \(\square\). <b>Best:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> For each attribute, predict each instance by the majority of the <b>other</b> instances in its branch (tie → \(-\)). CV error = misses / 6; the attribute with the smallest CV error is best.</p>
<p><b>Each round:</b> leave out one instance; the rest of its branch votes (tie → −); ✗ = wrong.</p>
<div class="tw"><table><thead><tr><th>out</th><th>truth</th><th>Genre</th><th>Time</th><th>Age</th></tr></thead><tbody>
<tr><td>1</td><td>\(-\)</td><td>\(\{2+\} \to +\) ✗</td><td>\(\{3-,5+\} \to -\)</td><td>\(\{2+,3-\} \to -\)</td></tr>
<tr><td>2</td><td>\(+\)</td><td>\(\{1-\} \to -\) ✗</td><td>\(\{4-,6+\} \to -\) ✗</td><td>\(\{1-,3-\} \to -\) ✗</td></tr>
<tr><td>3</td><td>\(-\)</td><td>\(\{4-\} \to -\)</td><td>\(\{1-,5+\} \to -\)</td><td>\(\{1-,2+\} \to -\)</td></tr>
<tr><td>4</td><td>\(-\)</td><td>\(\{3-\} \to -\)</td><td>\(\{2+,6+\} \to +\) ✗</td><td>\(\{5+,6+\} \to +\) ✗</td></tr>
<tr><td>5</td><td>\(+\)</td><td>\(\{6+\} \to +\)</td><td>\(\{1-,3-\} \to -\) ✗</td><td>\(\{4-,6+\} \to -\) ✗</td></tr>
<tr><td>6</td><td>\(+\)</td><td>\(\{5+\} \to +\)</td><td>\(\{2+,4-\} \to -\) ✗</td><td>\(\{4-,5+\} \to -\) ✗</td></tr></tbody></table></div>
<p><b>CV error</b> \(= \frac{\#\text{errors}}{6}\): Genre \(\tfrac26 = \tfrac13\), Time \(\tfrac46 = \tfrac23\), Age \(\tfrac46 = \tfrac23\). <b>Best:</b> Genre (smallest CV error).</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> For each attribute the split is fixed; only the leaf labels are learned. Leave instance \(i\) out → its leaf = majority of the <b>other</b> instances in its branch → compare with the truth.`,
          why: R`<p>The branch is recounted <b>without</b> the left-out instance. That's the whole point of leave-one-out: otherwise the instance votes for its own label.</p>`,
          remember: R`<p>Leave-one-out CV: \(n\) rounds; in each, train on all samples but one and predict the left-out one. CV error = (number wrong) / \(n\). Pick the option with the smallest CV error.</p><p>Not on the sheet.</p>` },
        { line: R`<b>Genre column</b> — the other instance of the genre decides: <div class="tw"><table><thead><tr><th>out</th><th>rest → predicts</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\{2+\} \to +\)</td><td>\(-\) ✗</td></tr><tr><td>2</td><td>\(\{1-\} \to -\)</td><td>\(+\) ✗</td></tr>
<tr><td>3</td><td>\(\{4-\} \to -\)</td><td>\(-\)</td></tr><tr><td>4</td><td>\(\{3-\} \to -\)</td><td>\(-\)</td></tr>
<tr><td>5</td><td>\(\{6+\} \to +\)</td><td>\(+\)</td></tr><tr><td>6</td><td>\(\{5+\} \to +\)</td><td>\(+\)</td></tr></tbody></table></div>2 errors: \(\tfrac26 = \tfrac13\).` },
        { line: R`<b>Time column</b> (ties → −): <div class="tw"><table><thead><tr><th>out</th><th>rest → predicts</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\{3-,5+\} \to -\)</td><td>\(-\)</td></tr><tr><td>2</td><td>\(\{4-,6+\} \to -\)</td><td>\(+\) ✗</td></tr>
<tr><td>3</td><td>\(\{1-,5+\} \to -\)</td><td>\(-\)</td></tr><tr><td>4</td><td>\(\{2+,6+\} \to +\)</td><td>\(-\) ✗</td></tr>
<tr><td>5</td><td>\(\{1-,3-\} \to -\)</td><td>\(+\) ✗</td></tr><tr><td>6</td><td>\(\{2+,4-\} \to -\)</td><td>\(+\) ✗</td></tr></tbody></table></div>4 errors: \(\tfrac46 = \tfrac23\).` },
        { line: R`<b>Age column</b> (ties → −): <div class="tw"><table><thead><tr><th>out</th><th>rest → predicts</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\{2+,3-\} \to -\)</td><td>\(-\)</td></tr><tr><td>2</td><td>\(\{1-,3-\} \to -\)</td><td>\(+\) ✗</td></tr>
<tr><td>3</td><td>\(\{1-,2+\} \to -\)</td><td>\(-\)</td></tr><tr><td>4</td><td>\(\{5+,6+\} \to +\)</td><td>\(-\) ✗</td></tr>
<tr><td>5</td><td>\(\{4-,6+\} \to -\)</td><td>\(+\) ✗</td></tr><tr><td>6</td><td>\(\{4-,5+\} \to -\)</td><td>\(+\) ✗</td></tr></tbody></table></div>4 errors: \(\tfrac46 = \tfrac23\).` },
        { line: R`<b>Pick the best</b> — Genre has the smallest CV error, \(\tfrac13\). Done.` },
      ],
      compare: R`Same counts as the official table (2, 4, 4, so Genre). Its Time / instance 6 cell says "+ (Err)", but without 6 the Weekday branch is \(\{2+, 4-\}\), a tie, so the prediction is − (step 3). Still an error, so the count of 4 stands.`,
      slip: R`In the Time column, instance 6's cell should be “− (Err)”, not “+ (Err)”. Without 6, the Weekday leaf is {2+, 4−}, a tie, so it predicts −. Still an error, so Time's count of 4 stands.`,
    },

    // ═════════════════════════════════════════════ 2025-A Q3
    "2025A-q3.1": {
      point: R`<p>Depth 1 = one yes/no question. It works only if one answer is all \(+\) and the other all \(-\).</p>
<p><b>1. What the question asks.</b> Root and its children = one question, two leaves. Each leaf says one label, so zero error needs both branches pure.</p>
<p><b>2. Look at sample 4.</b> It is \((1,1,1)\) and \(-\): it answers "1" to every question. And every feature's 1-branch also holds a \(+\): sample 2 for \(X_1\) and \(X_3\), sample 3 for \(X_2\).</p>
<p><b>3. Why that's fatal.</b> Same branch → same leaf → same prediction. Sample 4 and a \(+\) get the same label, so one of them is wrong, whatever the leaf says.</p>
<p><b>So:</b> no depth-1 tree has zero error.</p>`,
      start: R`<p><b>Key idea:</b> No. Sample 4 \((-)\) has every feature = 1, and each feature's 1-branch also holds a \(+\) sample, so every depth-1 tree puts a \(+\) and a \(-\) in the same leaf.</p>
<p><b>Answer:</b> □</p>
<p><b>Because:</b> \(X_1\): □; \(\;X_2\): □; \(\;X_3\): □</p>
<p><b>So:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> No. Sample 4 \((-)\) has every feature = 1, and each feature's 1-branch also holds a \(+\) sample, so every depth-1 tree puts a \(+\) and a \(-\) in the same leaf.</p>
<p><b>Answer:</b> No, there is no such tree.</p>
<p><b>Because:</b> \(X_1 = 1\) holds samples 2, 3 \((+)\) and 4 \((-)\); \(\;X_2 = 1\) holds 3 \((+)\) and 4 \((-)\); \(\;X_3 = 1\) holds 2 \((+)\) and 4 \((-)\).</p>
<p><b>So:</b> every split has a child with both labels, and a leaf predicts one label, so any depth-1 tree misclassifies at least one sample.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Depth 1 = one question, two leaves. Zero error needs both children pure. So check each feature for a child with both labels.`,
          why: R`<p>Samples in the same branch land in the same leaf and get the same label, so if their labels differ, one of them is wrong.</p>` },
        { line: R`<b>Every feature has a mixed child</b> — \(X_1 = 1\): samples 2, 3 \((+)\) and 4 \((-)\). \(X_2 = 1\): 3 \((+)\), 4 \((-)\). \(X_3 = 1\): 2 \((+)\), 4 \((-)\).` },
        { line: R`<b>So no</b> — any depth-1 tree misclassifies at least one sample. Done.` },
      ],
      compare: R`Same pairs as the official solution.`,
      slip: R`“2nd / 3rd / 4th sample” just means the 2nd, 3rd, 4th row of the table, top to bottom. The table itself has no sample numbers.`,
    },

    "2025A-q3.2": {
      point: R`<p>The labels are a checkerboard in \(X_2, X_3\): \(+\) exactly when they differ.</p>
<p><b>1. What the question asks.</b> Zero error with as few levels as possible. Depth 1 fails (part 1), so: can two questions do it?</p>
<p><b>2. The picture.</b> Put the samples on a grid by \((X_2, X_3)\):</p><div class="fig"><svg viewBox="0 0 480 250" width="480" role="img" aria-label="The four samples on a 2 by 2 grid of X2 and X3: plus where X2 and X3 differ, minus where equal, a checkerboard"><rect x="80" y="110" width="90" height="90" style="fill:var(--panel);stroke:var(--muted)" stroke-width="1.2"/><circle cx="125.0" cy="147.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="125.0" y="152.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="125.0" y="181.0" text-anchor="middle" font-size="12" fill="currentColor">sample 1</text><rect x="80" y="20" width="90" height="90" style="fill:var(--accent-soft);stroke:var(--muted)" stroke-width="1.2"/><circle cx="125.0" cy="57.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="125.0" y="62.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="125.0" y="91.0" text-anchor="middle" font-size="12" fill="currentColor">sample 2</text><rect x="170" y="110" width="90" height="90" style="fill:var(--accent-soft);stroke:var(--muted)" stroke-width="1.2"/><circle cx="215.0" cy="147.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="215.0" y="152.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="215.0" y="181.0" text-anchor="middle" font-size="12" fill="currentColor">sample 3</text><rect x="170" y="20" width="90" height="90" style="fill:var(--panel);stroke:var(--muted)" stroke-width="1.2"/><circle cx="215.0" cy="57.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="215.0" y="62.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="215.0" y="91.0" text-anchor="middle" font-size="12" fill="currentColor">sample 4</text><text x="125.0" y="220.0" text-anchor="middle" font-size="12" fill="currentColor">0</text><text x="215.0" y="220.0" text-anchor="middle" font-size="12" fill="currentColor">1</text><text x="170.0" y="240.0" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">X₂</text><text x="70.0" y="159.0" text-anchor="end" font-size="12" fill="currentColor">0</text><text x="70.0" y="69.0" text-anchor="end" font-size="12" fill="currentColor">1</text><text x="46.0" y="115.0" text-anchor="end" font-size="14" font-weight="700" fill="currentColor">X₃</text><text x="276.0" y="61.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">shaded: X₂ ≠ X₃ → +</text><text x="276.0" y="81.0" text-anchor="start" font-size="12" font-weight="700" fill="currentColor">unshaded: X₂ = X₃ → −</text></svg></div>
<p><b>3. Why two questions work.</b> The four samples have four <b>different</b> \((X_2, X_3)\) pairs, one per square. Ask \(X_2\), then \(X_3\) on both sides: that cuts the grid into its 4 squares, each sample gets its own leaf, and the leaf takes its label. How to spot it: \(X_1\) is 1 for three samples, so it separates little; \(X_2, X_3\) take all four combinations.</p>
<p><b>4. Why one question can't.</b> A question on \(X_2\) or \(X_3\) keeps a whole column or row of the grid together, and every row and column has a \(+\) and a \(-\). \(X_1\) fails too (part 1).</p>
<p><b>So:</b> \(X_2\) at the root, \(X_3\) in both children: depth 2.</p>`,
      start: R`<p><b>Key idea:</b> Depth 1 fails (part 1). The four samples have four different \((X_2, X_3)\) pairs, so asking \(X_2\) and then \(X_3\) puts each sample in its own leaf: zero error at depth 2.</p>
<p><b>Depth 1 fails:</b> □</p>
<p><b>Two questions that work:</b> □</p>
<p><b>The tree (depth 2):</b></p><pre><code>          [□ ?]
       0 /      \ 1
    [□ ?]       [□ ?]
   0 /  \ 1    0 /  \ 1
    □    □      □    □</code></pre>
<p><b>Zero error because:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> Depth 1 fails (part 1). The four samples have four different \((X_2, X_3)\) pairs, so asking \(X_2\) and then \(X_3\) puts each sample in its own leaf: zero error at depth 2.</p>
<p><b>Depth 1 fails:</b> every feature has a child with a \(+\) and a \(-\) (part 1), so the minimum depth is at least 2.</p>
<p><b>Two questions that work:</b> \((X_2, X_3)\) is \((0,0), (0,1), (1,0), (1,1)\) for samples 1–4: all different.</p>
<p><b>The tree (depth 2):</b></p><pre><code>          [X2?]
       0 /      \ 1
    [X3?]       [X3?]
   0 /  \ 1    0 /  \ 1
    -    +      +    -
   s1   s2     s3   s4</code></pre>
<p><b>Zero error because:</b> each sample lands in its own leaf, and that leaf gets its label.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Minimum depth with zero error. Depth 1 fails (part 1: every feature has a mixed child), so try depth 2: two questions, 4 leaves.` },
        { line: R`<b>Which two questions?</b> — try each pair of features; a pair works if no two samples share its values with different labels. \((X_1, X_2)\): samples 3, 4 clash. \((X_1, X_3)\): 2, 4 clash. \((X_2, X_3)\): all four different ✓.`,
          why: R`<div class="tw"><table><thead><tr><th>sample</th><th>\((X_1,X_2)\)</th><th>\((X_1,X_3)\)</th><th>\((X_2,X_3)\)</th><th>\(Y\)</th></tr></thead><tbody>
<tr><td>1</td><td>(0,0)</td><td>(0,0)</td><td>(0,0)</td><td>\(-\)</td></tr>
<tr><td>2</td><td>(1,0)</td><td>(1,1)</td><td>(0,1)</td><td>\(+\)</td></tr>
<tr><td>3</td><td>(1,1)</td><td>(1,0)</td><td>(1,0)</td><td>\(+\)</td></tr>
<tr><td>4</td><td>(1,1)</td><td>(1,1)</td><td>(1,1)</td><td>\(-\)</td></tr></tbody></table></div><p>Two yes/no questions make 4 leaves. If every sample has its own combination, each lands in its own leaf, and each leaf just takes its sample's label.</p>` },
        { line: R`<b>The tree</b> — \(X_2\), then \(X_3\) on both sides; one sample per leaf: <pre><code>          [X2?]
       0 /      \ 1
    [X3?]       [X3?]
   0 /  \ 1    0 /  \ 1
    -    +      +    -
   s1   s2     s3   s4</code></pre>Done.`,
          extra: [{ label: "official slip: \"any depth-2 tree that uses X1 has errors\"", html: R`<p>Too strong. \(X_2\) at the root, then \(X_1\) under \(X_2 = 0\) (splits samples 1−, 2+) and \(X_3\) under \(X_2 = 1\) (splits 3+, 4−) has zero error. What's true: \(X_1\) at the <b>root</b> fails, because its child \(\{2+, 3+, 4-\}\) can't be made pure by one more question. And the greedy algorithm does pick \(X_1\) for the root (largest reduction), so it doesn't find a depth-2 tree.</p>` }] },
      ],
      compare: R`Same tree as the official solution (it also allows \(X_3\) at the root). Its remark "any depth-2 tree that uses \(X_1\) has errors" is too strong: only \(X_1\) at the root fails.`,
      slip: R`Two over-claims here:<ul><li>“Any tree that uses \(X_2\) and \(X_3\) has zero error” is too strong. It must ask \(X_2\) at the root and \(X_3\) in <b>both</b> children (or the other way round). E.g. \(X_2\) root with \(X_1\) under \(X_2 = 1\) fails: samples 3+ and 4− both have \(X_1 = 1\).</li><li>“Any depth-2 tree that uses \(X_1\) has errors” is also too strong: \(X_2\) root, \(X_1\) under \(X_2 = 0\), \(X_3\) under \(X_2 = 1\) is perfect. Only \(X_1\) at the <b>root</b> fails, and that's the split the greedy algorithm picks.</li></ul>`,
    },

    "2025A-q3.3": {
      point: R`<p>A tree is blind to every feature it doesn't ask about. Change one of those, and the tree can't tell.</p>
<p><b>1. What the question asks.</b> "Incorrectly" = the instance's label is the <b>opposite</b> of what the tree says. "Not in the training data" = a new \((x_1, x_2, x_3)\). You get to choose both the vector and its label.</p>
<p><b>2. The tree in words.</b> Part 2's tree asks only \(X_2\), then \(X_3\): \(+\) when they differ, \(-\) when equal. \(x_1\) never enters.</p>
<p><b>3. Why flipping \(x_1\) works.</b> Take a training sample and flip its \(x_1\): the vector is new (each \((x_2, x_3)\) pair appears only once in the table, with the other \(x_1\)), but \(x_2, x_3\) are unchanged, so the tree follows the same path and gives the same answer.</p>
<p><b>So:</b> flip \(x_1\) of a training sample, then give it the label the tree does <b>not</b> say.</p>`,
      start: R`<p><b>Key idea:</b> The tree only asks \(X_2\) and \(X_3\) (\(+\) iff they differ). Flipping \(x_1\) of sample 1 gives the new vector \((1,0,0)\), which the tree still calls \(-\), so the test instance \((1,0,0,+)\) is misclassified.</p>
<p><b>The tree's rule:</b> □</p>
<p><b>A new vector:</b> □ → not in the training data; the tree predicts □</p>
<p><b>Test instance:</b> \((x_1, x_2, x_3, y) = \square\)</p>`,
      answer: R`<p><b>Key idea:</b> The tree only asks \(X_2\) and \(X_3\) (\(+\) iff they differ). Flipping \(x_1\) of sample 1 gives the new vector \((1,0,0)\), which the tree still calls \(-\), so the test instance \((1,0,0,+)\) is misclassified.</p>
<p><b>The tree's rule:</b> \(+\) if \(x_2 \ne x_3\), \(-\) if \(x_2 = x_3\); it never asks \(x_1\).</p>
<p><b>A new vector:</b> sample 1 \((0,0,0)\) with \(x_1\) flipped: \((1,0,0)\) → not in the training data; the tree predicts \(-\) (\(x_2 = x_3 = 0\)).</p>
<p><b>Test instance:</b> \((x_1, x_2, x_3, y) = (1, 0, 0, +)\): the tree says \(-\), so it's classified incorrectly.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Incorrectly" → the true label is the opposite of the tree's prediction. "Not in the training data" → a new vector. So: a new vector, with the label the tree does <b>not</b> say.` },
        { line: R`<b>The tree's rule</b> — part 2's tree asks only \(X_2\) and \(X_3\): \(+\) when they differ, \(-\) when equal. It never looks at \(x_1\).` },
        { line: R`<b>A new vector</b> — flip \(x_1\) of a training sample: sample 1 \((0,0,0)\) → \((1,0,0)\). New, and the tree still says \(-\) (\(X_2 = 0\), \(X_3 = 0\)).`,
          why: R`<p>Flipping \(x_1\) makes a vector that's not in the table (every training vector with \(x_2 = x_3 = 0\) has \(x_1 = 0\)), but the tree can't see the change.</p>` },
        { line: R`<b>Give it the opposite label</b>: \((1, 0, 0, +)\). Done.`,
          extra: [{ label: "all four answers, and the official slip", html: R`<div class="tw"><table><thead><tr><th>vector</th><th>tree predicts</th><th>test instance</th></tr></thead><tbody>
<tr><td>(1,0,0)</td><td>−</td><td>(1,0,0,+)</td></tr><tr><td>(0,0,1)</td><td>+</td><td>(0,0,1,−)</td></tr>
<tr><td>(0,1,0)</td><td>+</td><td>(0,1,0,−)</td></tr><tr><td>(0,1,1)</td><td>−</td><td>(0,1,1,+)</td></tr></tbody></table></div>
<p>The official list ends with \((0,0,0,+)\), but \((0,0,0)\) is training sample 1, which the question forbids. The fourth one is \((0,1,1,+)\).</p>` }] },
      ],
      compare: R`\((1,0,0,+)\) is the first instance in the official list. Its fourth, \((0,0,0,+)\), is a slip (that's sample 1); the correct fourth is \((0,1,1,+)\).`,
      slip: R`The 4th instance \((0,0,0,+)\) isn't allowed: \((0,0,0)\) is training sample 1. Their own recipe (flip \(X_1\), flip the label) on sample 4 gives \((0,1,1,+)\).`,
    },

    "2025A-q3.4": {
      point: R`<p>Pure translation: every piece of the IG formula becomes counts.</p>
<p><b>1. What the question asks.</b> "Express using \(n_0, p_0, p_1, n_1\)" = every size and every probability in the formula written with these four counts.</p>
<p><b>2. The picture.</b> The split pours \(S\) into two boxes:</p><div class="fig"><svg viewBox="0 0 540 170" width="540" role="img" aria-label="Parent S holds p0 plus p1 positives and n0 plus n1 negatives; child S0 has p0 and n0, child S1 has p1 and n1"><rect x="145.0" y="8" width="250" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><text x="270.0" y="26.0" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">parent S (both boxes together)</text><text x="270.0" y="46.0" text-anchor="middle" font-size="13" fill="currentColor">p₀ + p₁ positive, n₀ + n₁ negative</text><line x1="220" y1="56" x2="130" y2="92" style="stroke:var(--muted)"/><line x1="320" y1="56" x2="410" y2="92" style="stroke:var(--muted)"/><rect x="30.0" y="94" width="200" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><text x="130.0" y="112.0" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">S₀: the rows with X₇ = 0</text><text x="130.0" y="132.0" text-anchor="middle" font-size="13" fill="currentColor">p₀ positive, n₀ negative</text><rect x="310.0" y="94" width="200" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><text x="410.0" y="112.0" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-ink)">S₁: the rows with X₇ = 1</text><text x="410.0" y="132.0" text-anchor="middle" font-size="13" fill="currentColor">p₁ positive, n₁ negative</text></svg></div>
<p><b>3. Why fractions.</b> Entropy takes <b>probabilities</b>, and a probability inside a node = a count ÷ that node's size. In \(S_0\): \(\frac{p_0}{p_0+n_0}\) and \(\frac{n_0}{p_0+n_0}\). The trap: the parent holds <b>both</b> boxes, so its positives are \(p_0 + p_1\), not \(p_0\).</p>
<p><b>So:</b> sizes, then the three entropies, then plug into the question's formula.</p>`,
      start: R`<p><b>Key idea:</b> Every fraction in IG is a count divided by its node's size: \(S_0\) has \(p_0 + n_0\) samples, \(S_1\) has \(p_1 + n_1\), and the parent \(S\) holds both, so it has \(p_0 + p_1\) positives out of \(|S| = p_0 + n_0 + p_1 + n_1\).</p>
<p><b>Sizes:</b> \(|S_0| = \square\), \(|S_1| = \square\), \(|S| = \square\)</p>
<p><b>Child entropies:</b></p>\[\begin{aligned}H(S_0) &= \;\square\\ H(S_1) &= \;\square\end{aligned}\]
<p><b>Parent entropy:</b></p>\[H(S) = \;\square\]
<p><b>Plug in:</b></p>\[\mathrm{IG}(S, X_7) = \;\square\]`,
      answer: R`<p><b>Key idea:</b> Every fraction in IG is a count divided by its node's size: \(S_0\) has \(p_0 + n_0\) samples, \(S_1\) has \(p_1 + n_1\), and the parent \(S\) holds both, so it has \(p_0 + p_1\) positives out of \(|S| = p_0 + n_0 + p_1 + n_1\).</p>
<p><b>Sizes:</b> \(|S_0| = p_0 + n_0\), \(|S_1| = p_1 + n_1\), \(|S| = p_0 + p_1 + n_0 + n_1\)</p>
<p><b>Child entropies:</b></p>\[\begin{aligned}H(S_0) = &-\frac{p_0}{p_0+n_0}\log\frac{p_0}{p_0+n_0}\\ &-\frac{n_0}{p_0+n_0}\log\frac{n_0}{p_0+n_0}\\ H(S_1) = &-\frac{p_1}{p_1+n_1}\log\frac{p_1}{p_1+n_1}\\ &-\frac{n_1}{p_1+n_1}\log\frac{n_1}{p_1+n_1}\end{aligned}\]
<p><b>Parent entropy:</b></p>\[\begin{aligned}H(S) = &-\frac{p_0+p_1}{|S|}\log\frac{p_0+p_1}{|S|}\\ &-\frac{n_0+n_1}{|S|}\log\frac{n_0+n_1}{|S|}\end{aligned}\]
<p><b>Plug in:</b></p>\[\begin{aligned}\mathrm{IG}(S, X_7) = H(S) &- \frac{p_0+n_0}{|S|}H(S_0)\\ &- \frac{p_1+n_1}{|S|}H(S_1)\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> The IG formula from the question, with every piece written in \(n_0, p_0, n_1, p_1\). First the sizes: \(|S_0| = p_0 + n_0\), \(|S_1| = p_1 + n_1\), \(|S| = p_0 + p_1 + n_0 + n_1\).`,
          why: R`<p>\(S_0\) = the samples with \(X_7 = 0\): \(p_0\) positive + \(n_0\) negative. The parent \(S\) holds both children.</p>` },
        { line: R`<b>Child entropies</b> — the fractions in \(S_0\) are \(\frac{p_0}{p_0+n_0}\) and \(\frac{n_0}{p_0+n_0}\). Into [sheet: Entropy]: <div class="formula">\[\begin{aligned}H(S_0) = &-\frac{p_0}{p_0+n_0}\log\frac{p_0}{p_0+n_0}\\ &-\frac{n_0}{p_0+n_0}\log\frac{n_0}{p_0+n_0}\end{aligned}\]</div>\(H(S_1)\): the same with \(p_1, n_1\).`,
          why: R`<p>Entropy of a node \(= -(\text{fraction }+)\log(\text{fraction }+) - (\text{fraction }-)\log(\text{fraction }-)\), and a fraction = count / node size.</p>` },
        { line: R`<b>Parent entropy</b> — \(p_0 + p_1\) positives and \(n_0 + n_1\) negatives, out of \(|S|\): <div class="formula">\[\begin{aligned}H(S) = &-\frac{p_0+p_1}{|S|}\log\frac{p_0+p_1}{|S|}\\ &-\frac{n_0+n_1}{|S|}\log\frac{n_0+n_1}{|S|}\end{aligned}\]</div>`,
          why: R`<p>The parent holds <b>both</b> children, so its positives are \(p_0 + p_1\), not \(p_0\).</p>` },
        { line: R`<b>Plug in</b> — the sizes into the question's formula (\(H\)'s from steps 2–3): <div class="formula">\[\begin{aligned}\mathrm{IG}(S, X_7) = H(S) &- \frac{p_0+n_0}{|S|}H(S_0)\\ &- \frac{p_1+n_1}{|S|}H(S_1)\end{aligned}\]</div>Done.`,
          extra: [{ label: "the official last line (optional): multiply out", html: R`<p>The weight times a fraction cancels:</p><div class="formula">\[\underbrace{\color{#e8912d}\frac{p_0+n_0}{|S|}\cdot\frac{p_0}{p_0+n_0}}_{\textstyle\color{#e8912d}\text{this part = }\frac{p_0}{|S|}}\]</div><p>and the two minuses make a plus, so:</p><div class="formula">\[\begin{aligned}\mathrm{IG}(S, X_7) = H(S) &+ \frac{p_0}{|S|}\log\frac{p_0}{p_0+n_0}\\ &+ \frac{n_0}{|S|}\log\frac{n_0}{p_0+n_0}\\ &+ \frac{p_1}{|S|}\log\frac{p_1}{p_1+n_1}\\ &+ \frac{n_1}{|S|}\log\frac{n_1}{p_1+n_1}\end{aligned}\]</div>` },
                  { label: "check it with numbers", html: R`<p>2025-A's first dataset split by \(X_1\): \(p_0 = 0,\ n_0 = 1,\ p_1 = 2,\ n_1 = 1\), \(|S| = 4\). \(H(S) = 1\) (2 and 2).</p>
<div class="tw"><table><thead><tr><th>term</th><th>value</th></tr></thead><tbody>
<tr><td>\(\frac04\log_2 0\)</td><td>0 (\(0\log 0 = 0\))</td></tr>
<tr><td>\(\frac14\log_2 1\)</td><td>0</td></tr>
<tr><td>\(\frac24\log_2\frac23\)</td><td>\(0.5\cdot(-0.585) = -0.2925\)</td></tr>
<tr><td>\(\frac14\log_2\frac13\)</td><td>\(0.25\cdot(-1.585) = -0.3962\)</td></tr></tbody></table></div>
<p>\(\mathrm{IG} = 1 - 0.2925 - 0.3962 = 0.311\). Directly: \(1 - \tfrac34 H(\tfrac23) = 1 - 0.75\cdot 0.9183 = 0.311\). Same.</p>` }] },
      ],
      compare: R`The official solution is steps 1–4, then the multiplied-out six-term line (step 4's first extra, with \(H(S)\) written out and \(|S|\) as the full sum). The question writes plain "log"; any base is accepted.`,
    },

    "2025A-q3.5": {
      point: R`<p>Mix two jars with the same mix and you get the same mix. Entropy only sees the mix, so nothing is gained.</p>
<p><b>1. What the claim says.</b> \(\frac{n_0}{n_0+p_0}\) = the fraction of \(-\) in branch 0, and the claim says it equals the fraction of \(-\) in branch 1. Then the \(+\) fractions are equal too (each is 1 minus it). Call it \(r\).</p>
<p><b>2. The picture.</b> Two branches with the same fraction, poured back into the parent:</p><div class="fig"><svg viewBox="0 0 540 190" width="540" role="img" aria-label="Two children, 1 plus of 3 and 2 plus of 6, both a third plus; poured together 3 of 9, also a third"><rect x="144.0" y="12.0" width="252.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="166.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="166.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="192.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="192.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="218.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="218.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="244.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="244.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="270.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="270.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="296.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="296.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="322.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="322.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="348.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="348.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="374.0" cy="29.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="374.0" y="34.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="270.0" y="62.0" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">together: 3 of 9 = ⅓ are +</text><line x1="230.0" y1="68" x2="145.8" y2="108" style="stroke:var(--muted)"/><line x1="310.0" y1="68" x2="394.2" y2="108" style="stroke:var(--muted)"/><rect x="97.8" y="110.0" width="96.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="119.8" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="119.8" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="145.8" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="145.8" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="171.8" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="171.8" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="145.8" y="160.0" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">1 of 3 = ⅓ are +</text><rect x="307.2" y="110.0" width="174.0" height="34" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="329.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="329.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="355.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="355.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><circle cx="381.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="381.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="407.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="407.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="433.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="433.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><circle cx="459.2" cy="127.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="459.2" y="132.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="394.2" y="160.0" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">2 of 6 = ⅓ are +</text></svg></div>
<p><b>3. Why the parent has \(r\) too.</b> In each branch, positives = \(r\) × size: \(p_0 = r(p_0+n_0)\), \(p_1 = r(p_1+n_1)\). Add them: the parent's positives are \(r\) × (both sizes) \(= r\,|S|\). Divide by \(|S|\): \(r\).</p>
<p><b>4. Then everything cancels.</b> Entropy only sees the fraction, so all three are \(H(r)\). The weights \(\frac{|S_0|}{|S|} + \frac{|S_1|}{|S|} = 1\), so "after" = \(H(r)\) = "before".</p>
<p><b>So:</b> \(\mathrm{IG} = H(r) - H(r) = 0\).</p>`,
      start: R`<p><b>Key idea:</b> Equal \(-\) fractions ⇒ equal \(+\) fractions \(r\). The parent (both branches together) then has fraction \(r\) too, so all three entropies are \(H(r)\), and since the weights \(\frac{|S_0|}{|S|} + \frac{|S_1|}{|S|} = 1\), \(\mathrm{IG} = H(r) - H(r) = 0\).</p>
<p><b>The children's positive fraction:</b> \(\frac{p_0}{p_0+n_0} = \frac{p_1}{p_1+n_1} = r\), so \(p_0 = \square\), \(\;p_1 = \square\)</p>
<p><b>The parent's positive fraction:</b></p>\[\frac{p_0+p_1}{|S|} = \;\square\; = r\]
<p><b>Plug in:</b> all three entropies are \(\square\):</p>\[\mathrm{IG}(S, X_7) = \;\square\; = 0\]`,
      answer: R`<p><b>Key idea:</b> Equal \(-\) fractions ⇒ equal \(+\) fractions \(r\). The parent (both branches together) then has fraction \(r\) too, so all three entropies are \(H(r)\), and since the weights \(\frac{|S_0|}{|S|} + \frac{|S_1|}{|S|} = 1\), \(\mathrm{IG} = H(r) - H(r) = 0\).</p>
<p><b>The children's positive fraction:</b> \(\frac{p_0}{p_0+n_0} = 1 - \frac{n_0}{n_0+p_0} = 1 - \frac{n_1}{n_1+p_1} = \frac{p_1}{p_1+n_1} = r\), so \(p_0 = r\,(p_0+n_0)\), \(\;p_1 = r\,(p_1+n_1)\)</p>
<p><b>The parent's positive fraction:</b></p>\[\frac{p_0+p_1}{|S|} = \frac{r\,(p_0+n_0+p_1+n_1)}{p_0+n_0+p_1+n_1} = r\]
<p><b>Plug in:</b> all three entropies are \(H(r)\):</p>\[\begin{aligned}\mathrm{IG}(S, X_7) &= H(r) - \frac{|S_0|}{|S|}H(r) - \frac{|S_1|}{|S|}H(r)\\ &= H(r)\Big(1 - \frac{|S_0| + |S_1|}{|S|}\Big) = 0\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> IG = 0 for any counts. Entropy only sees the fraction, so show the parent has the <b>same</b> fraction → all three \(H\)'s equal → \(H\)(parent) − weighted \(H\)(children) cancels.` },
        { line: R`<b>Positive fractions are equal too</b> — each is 1 minus the negative fraction. Call it \(r\) (the official name); multiplied out: <div class="formula">\[p_0 = r\,(p_0+n_0) \qquad p_1 = r\,(p_1+n_1)\]</div>` },
        { line: R`<b>The parent has fraction \(r\) too</b> — add the two (the parent holds both children, so \(|S| = p_0+n_0+p_1+n_1\)):<div class="formula">\[\frac{p_0+p_1}{|S|} = \frac{r\,(p_0+n_0+p_1+n_1)}{p_0+n_0+p_1+n_1} = r\]</div>`,
          why: R`<p>This is the step that proves something: the parent's fraction is not given, it follows from the children.</p>` },
        { line: R`<b>Plug in</b> — entropy depends only on the fraction, so all three are \(H(r)\): <div class="formula">\[\begin{aligned}\mathrm{IG} &= H(r) - \frac{|S_0|}{|S|}H(r) - \frac{|S_1|}{|S|}H(r)\\ &= H(r)\Big(1 - \underbrace{\color{#e8912d}\frac{|S_0| + |S_1|}{|S|}}_{\textstyle\color{#e8912d}\text{this part = 1}}\Big) = 0\end{aligned}\]</div>Done.`,
          why: R`<p>[sheet: Entropy] with 2 classes: \(H(r) = -r\log r - (1-r)\log(1-r)\). It only sees \(r\). Same proof as 2025-B Q2.6.</p>` },
      ],
      compare: R`The official solution states step 3 without the adding step, then plugs \(r\) into the part-4 formula and shows each bracket is 0. Different route, same result; both prove the claim.`,
    },

    // ═════════════════════════════════════════════ 2026-A Q2
    "2026A-q2.1": {
      point: R`<p>\(+\) exactly when \(x_2 \ne x_3\): the labels are a checkerboard, and a checkerboard needs two questions.</p>
<p><b>1. What the question asks.</b> Three things: a tree of the smallest depth, each sample's leaf (to show zero error), and why nothing shallower works.</p>
<p><b>2. The picture.</b> Put the samples on a grid by \((x_2, x_3)\):</p><div class="fig"><svg viewBox="0 0 480 250" width="480" role="img" aria-label="The five samples on a 2 by 2 grid of x2 and x3: plus where x2 and x3 differ, minus where equal, a checkerboard"><rect x="80" y="110" width="90" height="90" style="fill:var(--panel);stroke:var(--muted)" stroke-width="1.2"/><circle cx="125.0" cy="147.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="125.0" y="152.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="125.0" y="181.0" text-anchor="middle" font-size="12" fill="currentColor">sample 1</text><rect x="80" y="20" width="90" height="90" style="fill:var(--accent-soft);stroke:var(--muted)" stroke-width="1.2"/><circle cx="125.0" cy="57.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="125.0" y="62.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="125.0" y="91.0" text-anchor="middle" font-size="12" fill="currentColor">sample 2</text><rect x="170" y="110" width="90" height="90" style="fill:var(--accent-soft);stroke:var(--muted)" stroke-width="1.2"/><circle cx="215.0" cy="147.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="215.0" y="152.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="215.0" y="181.0" text-anchor="middle" font-size="12" fill="currentColor">samples 3, 5</text><rect x="170" y="20" width="90" height="90" style="fill:var(--panel);stroke:var(--muted)" stroke-width="1.2"/><circle cx="215.0" cy="57.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="215.0" y="62.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="215.0" y="91.0" text-anchor="middle" font-size="12" fill="currentColor">sample 4</text><text x="125.0" y="220.0" text-anchor="middle" font-size="12" fill="currentColor">0</text><text x="215.0" y="220.0" text-anchor="middle" font-size="12" fill="currentColor">1</text><text x="170.0" y="240.0" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">x₂</text><text x="70.0" y="159.0" text-anchor="end" font-size="12" fill="currentColor">0</text><text x="70.0" y="69.0" text-anchor="end" font-size="12" fill="currentColor">1</text><text x="46.0" y="115.0" text-anchor="end" font-size="14" font-weight="700" fill="currentColor">x₃</text><text x="276.0" y="61.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">shaded: x₂ ≠ x₃ → +</text><text x="276.0" y="81.0" text-anchor="start" font-size="12" font-weight="700" fill="currentColor">unshaded: x₂ = x₃ → −</text></svg></div>
<p><b>3. How to spot it.</b> Look at the two \(-\) samples, 1 and 4: \(x_2 = x_3\) in both (0, 0 and 1, 1). The \(+\) samples 2, 3, 5: \(x_2 \ne x_3\). Samples 3 and 5 share a square, but both are \(+\): no clash.</p>
<p><b>4. Why depth 1 fails.</b> One question = two boxes, and for every feature some box holds a \(+\) and a \(-\) (e.g. \(X_1 = 1\): samples 3+, 4−). Same box → same leaf → one is wrong.</p>
<p><b>So:</b> ask \(x_2\), then \(x_3\) on both sides: 4 pure leaves, depth 2.</p>`,
      start: R`<p><b>Key idea:</b> \(+ \iff x_2 \ne x_3\), so asking \(x_2\), then \(x_3\), gives pure leaves (depth 2). Depth 1 fails: every feature has a branch with a \(+\) and a \(-\) (e.g. \(X_1 = 1\) holds samples 3+ and 4−).</p>
<p><b>No depth 1:</b> □</p>
<p><b>The rule:</b> \(+ \iff\) □</p>
<p><b>The tree (depth 2) with each sample's leaf:</b></p><pre><code>          [□?]
       0 /      \ 1
    [□?]        [□?]
   0 /  \ 1    0 /  \ 1
    □    □      □     □
   s□   s□     s□     s□</code></pre>
<p><b>Zero error:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> \(+ \iff x_2 \ne x_3\), so asking \(x_2\), then \(x_3\), gives pure leaves (depth 2). Depth 1 fails: every feature has a branch with a \(+\) and a \(-\) (e.g. \(X_1 = 1\) holds samples 3+ and 4−).</p>
<p><b>No depth 1:</b> every feature has a branch with two labels: \(X_1 = 1\): samples 3+, 4−; \(\;X_2 = 0\): 1−, 2+; \(\;X_3 = 0\): 1−, 3+; \(\;X_4 = 1\): 1−, 3+.</p>
<p><b>The rule:</b> \(+ \iff x_2 \ne x_3\)</p>
<p><b>The tree (depth 2) with each sample's leaf:</b></p><pre><code>          [X2?]
       0 /      \ 1
    [X3?]       [X3?]
   0 /  \ 1    0 /  \ 1
    -    +      +     -
   s1   s2    s3,s5   s4</code></pre>
<p><b>Zero error:</b> every leaf is pure, and each sample's leaf has its own label.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> "Minimum depth" → try depth 1 first. It fails if every feature puts two different labels on the same branch.` },
        { line: R`<b>No depth-1 tree</b> — one clash per feature: \(X_1 = 1\): samples 3, 4. \(X_2 = 0\): 1, 2. \(X_3 = 0\): 1, 3. \(X_4 = 1\): 1, 3. Same branch, different labels. So depth 2.` },
        { line: R`<b>The rule</b> — try each pair of features: it works if no two samples with the same values differ in label. Only \((X_2, X_3)\) works, and there \(+ \iff x_2 \ne x_3\).`,
          why: R`<p>\(+\) samples 2, 3, 5 have \((x_2, x_3) = (0,1), (1,0), (1,0)\); \(-\) samples 1, 4 have \((0,0), (1,1)\): different exactly for the \(+\)'s.</p><div class="tw"><table><thead><tr><th>pair</th><th>clash</th></tr></thead><tbody>
<tr><td>\(X_1, X_2\)</td><td>samples 3, 4</td></tr><tr><td>\(X_1, X_3\)</td><td>2, 4</td></tr><tr><td>\(X_1, X_4\)</td><td>2, 4</td></tr>
<tr><td>\(X_2, X_3\)</td><td>none ✓</td></tr><tr><td>\(X_2, X_4\)</td><td>4, 5</td></tr><tr><td>\(X_3, X_4\)</td><td>1, 3 and 2, 4</td></tr></tbody></table></div><p>Only 3 and 5 share \((X_2, X_3) = (1,0)\), and both are \(+\).</p>` },
        { line: R`<b>The tree</b> — ask \(X_2\), then \(X_3\); every leaf is pure: <pre><code>          [X2?]
       0 /      \ 1
    [X3?]       [X3?]
   0 /  \ 1    0 /  \ 1
    -    +      +     -
   s1   s2    s3,s5   s4</code></pre>Done.` },
      ],
      compare: R`Same tree and same pairs as the official solution.`,
    },

    "2026A-q2.2": {
      point: R`<p>Look for a question that is right on every sample but one. That one is the sample to remove.</p>
<p><b>1. What the question asks.</b> After removing one sample, some one-question tree has two pure boxes. So before removing, that question's boxes are off by exactly one sample.</p>
<p><b>2. The picture.</b> \(X_1\)'s boxes:</p><div class="fig"><svg viewBox="0 0 540 98" width="540" role="img" aria-label="X1 splits the samples into sample 1 minus and samples 2, 3, 5 plus with sample 4 minus; sample 4 is the only one out of place"><text x="10.0" y="36.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">split by X₁:</text><rect x="110.0" y="14.0" width="44.0" height="48" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="132.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="132.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="132.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><text x="132.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">X₁ = 0</text><rect x="170.0" y="14.0" width="146.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="192.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="192.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="192.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><circle cx="226.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="226.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="226.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><circle cx="260.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="260.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="260.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><circle cx="260.0" cy="31.0" r="15" style="fill:none;stroke:var(--shaky)" stroke-width="2.5" stroke-dasharray="4 3"/><circle cx="294.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="294.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="294.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><text x="243.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">X₁ = 1</text><text x="534.0" y="40.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">only sample 4 is out of place</text></svg></div>
<p><b>3. Why the others fail.</b> \(X_2, X_3, X_4\) each make <b>two</b> mixed boxes (e.g. \(X_2\): \(\{1-, 2+\}\) and \(\{3+, 4-, 5+\}\)), and one removal fixes at most one box.</p>
<p><b>So:</b> remove the odd one out; \(X_1\) then splits the rest perfectly.</p>`,
      start: R`<p><b>Key idea:</b> \(X_1\) splits the samples into \(\{1-\}\) and \(\{2+, 3+, 4-, 5+\}\): only sample 4 is out of place. Remove it and both \(X_1\) branches are pure.</p>
<p><b>Remove:</b> sample □</p>
<p><b>Depth-1 tree:</b> \(X_\square = 0 \to\) □ (samples □); \(\;X_\square = 1 \to\) □ (samples □)</p>`,
      answer: R`<p><b>Key idea:</b> \(X_1\) splits the samples into \(\{1-\}\) and \(\{2+, 3+, 4-, 5+\}\): only sample 4 is out of place. Remove it and both \(X_1\) branches are pure.</p>
<p><b>Remove:</b> sample 4</p>
<p><b>Depth-1 tree:</b> \(X_1 = 0 \to -\) (sample 1); \(\;X_1 = 1 \to +\) (samples 2, 3, 5). Both leaves are pure, so zero error.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> After removing one sample, some feature must split into two pure children. So look for a feature whose split is wrong on exactly <b>one</b> sample.` },
        { line: R`<b>\(X_1\) is off by one</b> — \(X_1 = 0\) is \(\{1-\}\), pure. \(X_1 = 1\) is \(\{2+, 3+, 4-, 5+\}\): only sample 4 is \(-\).`,
          why: R`<p>The others need two removals: \(X_2\): \(\{1-, 2+\}\) and \(\{3+, 4-, 5+\}\). \(X_3\): \(\{1-, 3+, 5+\}\) and \(\{2+, 4-\}\). \(X_4\): \(\{1-, 3+\}\) and \(\{2+, 4-, 5+\}\). Each has two mixed children.</p>` },
        { line: R`<b>Remove sample 4</b> — the stump: \(X_1 = 0 \to -\) (sample 1), \(\;X_1 = 1 \to +\) (samples 2, 3, 5). Done.` },
      ],
      compare: R`Same answer as the official solution. It prints "X1=0 → −" twice; the second should be \(X_1 = 1 \to +\) (samples 2, 3, 5).`,
      slip: R`Typo: the second branch should read \(X_1 = 1 \to +\) (samples 2, 3, 5). Only sample 1 goes to \(X_1 = 0\).`,
    },

    "2026A-q2.3": {
      point: R`<p>Same recipe as always (before − weighted after), but this parent is 3 to 2, not half and half.</p>
<p><b>1. What the question asks.</b> For each of \(X_1\), \(X_4\): the Gini of all 5 samples minus each child's Gini weighted by its share of the 5.</p>
<p><b>2. The picture.</b> Both splits as boxes:</p><div class="fig"><svg viewBox="0 0 540 186" width="540" role="img" aria-label="X1 split: sample 1 alone (pure) and samples 2 to 5 with one minus. X4 split: samples 2, 4, 5 and samples 1, 3, both mixed"><text x="10.0" y="36.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">split by X₁:</text><rect x="110.0" y="14.0" width="44.0" height="48" rx="7" style="fill:none;stroke:var(--got)" stroke-width="2"/><circle cx="132.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="132.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="132.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><text x="132.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">X₁ = 0</text><rect x="170.0" y="14.0" width="122.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="192.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="192.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="192.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><circle cx="218.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="218.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="218.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><circle cx="244.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="244.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="244.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><circle cx="270.0" cy="31.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="270.0" y="36.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="270.0" y="55.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><text x="231.0" y="78.0" text-anchor="middle" font-size="12" fill="currentColor">X₁ = 1</text><text x="534.0" y="40.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">a pure box + a 3-to-1 box</text><text x="10.0" y="124.0" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">split by X₄:</text><rect x="110.0" y="102.0" width="96.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="132.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="132.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="132.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">2</text><circle cx="158.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="158.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="158.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">4</text><circle cx="184.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="184.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="184.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">5</text><text x="158.0" y="166.0" text-anchor="middle" font-size="12" fill="currentColor">X₄ = 0</text><rect x="222.0" y="102.0" width="70.0" height="48" rx="7" style="fill:none;stroke:var(--muted)" stroke-width="1.2"/><circle cx="244.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--fail)" stroke-width="2"/><text x="244.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--fail)">−</text><text x="244.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">1</text><circle cx="270.0" cy="119.0" r="10" style="fill:var(--panel);stroke:var(--got)" stroke-width="2"/><text x="270.0" y="124.0" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--got)">+</text><text x="270.0" y="143.0" text-anchor="middle" font-size="10" style="fill:var(--muted)">3</text><text x="257.0" y="166.0" text-anchor="middle" font-size="12" fill="currentColor">X₄ = 1</text><text x="534.0" y="128.0" text-anchor="end" font-size="12" style="fill:var(--accent-ink)">both still mixed</text></svg></div>
<p><b>3. Why the parent is 0.48, not ½.</b> \(p = \tfrac35 = 0.6\), so \(1 - 0.36 - 0.16 = 0.48\). Gini reaches ½ only at exactly half and half; 3 to 2 is a bit less mixed.</p>
<p><b>4. What to expect.</b> A pure box adds 0 to "after". \(X_1\) makes a pure box and a 3-to-1 box: a big drop. \(X_4\)'s boxes (2-to-1 and 1-to-1) are about as mixed as the parent: a tiny drop.</p>
<p><b>So:</b> \(X_1\)'s reduction should come out much bigger than \(X_4\)'s. Use that as a check.</p>`,
      start: R`<p><b>Key idea:</b> Reduction = Gini of the parent (3 \(+\), 2 \(-\): 0.48) − each child's Gini weighted by its share. \(X_1\) isolates a pure child, so it reduces far more than \(X_4\), whose children stay mixed.</p>
<p><b>Root:</b> □ positive, □ negative: \(\;\varphi(S) = \square\)</p>
<p><b>\(X_1\):</b> \(X_1 = 0\): □ → \(\varphi = \square\); \(\;X_1 = 1\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(X_1) = \;\square\]
<p><b>\(X_4\):</b> \(X_4 = 0\): □ → \(\varphi = \square\); \(\;X_4 = 1\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(X_4) = \;\square\]`,
      answer: R`<p><b>Key idea:</b> Reduction = Gini of the parent (3 \(+\), 2 \(-\): 0.48) − each child's Gini weighted by its share. \(X_1\) isolates a pure child, so it reduces far more than \(X_4\), whose children stay mixed.</p>
<p><b>Root:</b> 3 positive, 2 negative: \(\;\varphi(S) = 1 - 0.6^2 - 0.4^2 = 0.48\)</p>
<p><b>\(X_1\):</b> \(X_1 = 0\): \(\{1-\}\) → \(\varphi = 0\); \(\;X_1 = 1\): \(\{2+, 3+, 4-, 5+\}\) → \(\varphi = 1 - 0.75^2 - 0.25^2 = 0.375\)</p>
\[\Delta\varphi(X_1) = 0.48 - \tfrac15\cdot 0 - \tfrac45\cdot 0.375 = 0.18\]
<p><b>\(X_4\):</b> \(X_4 = 0\): \(\{2+, 4-, 5+\}\) → \(\varphi = 1 - \tfrac49 - \tfrac19 = \tfrac49\); \(\;X_4 = 1\): \(\{1-, 3+\}\) → \(\varphi = 1 - 0.5^2 - 0.5^2 = 0.5\)</p>
\[\Delta\varphi(X_4) = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.0133\]`,
      moves: [
        { line: R`<b>The root</b> — 3 \(+\) (samples 2, 3, 5) and 2 \(-\) out of 5, [sheet: Gini impurity]: <div class="formula">\[\varphi(S) = 1 - 0.6^2 - 0.4^2 = 1 - 0.36 - 0.16 = 0.48\]</div>`,
          remember: R`\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\]<p>Not on the sheet: it only has the impurity itself, [sheet: Gini impurity]. Here \(v\) = 0, 1 (the two values of \(X_1\), then of \(X_4\)).</p>` },
        { line: R`<b>\(X_1\)</b> — children: <div class="tw"><table><thead><tr><th>child</th><th>samples</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_1 = 0\)</td><td>\(1-\)</td><td>\(0\)</td></tr>
<tr><td>\(X_1 = 1\)</td><td>\(2+,3+,4-,5+\)</td><td>\(1 - 0.75^2 - 0.25^2 = 0.375\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(X_1) = 0.48 - \tfrac15\cdot 0 - \tfrac45\cdot 0.375 = 0.18\]</div>` },
        { line: R`<b>\(X_4\)</b> — children: <div class="tw"><table><thead><tr><th>child</th><th>samples</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_4 = 0\)</td><td>\(2+,4-,5+\)</td><td>\(1 - \tfrac49 - \tfrac19 = \tfrac49 \approx 0.444\)</td></tr>
<tr><td>\(X_4 = 1\)</td><td>\(1-,3+\)</td><td>\(1 - 0.5^2 - 0.5^2 = 0.5\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(X_4) = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.0133\]</div>Done.`,
          why: R`<p>\(\tfrac35\cdot\tfrac49 = \tfrac{12}{45} = 0.2667\) and \(\tfrac25\cdot 0.5 = 0.2\), so \(0.48 - 0.2667 - 0.2 = 0.0133\). Keep \(\tfrac49\) as a fraction: \(0.6\cdot 0.444\) would give 0.0136.</p>` },
      ],
      compare: R`Same numbers as the official solution (0.18 and 0.0133). It writes \(\tfrac35\cdot 0.444\), which strictly gives 0.0136; with \(\tfrac49\) it's 0.0133.`,
      slip: R`Got 0.0136? That's just rounding: \(\tfrac35 \cdot 0.444\) uses the rounded 0.444. With \(\tfrac49\) you get the official 0.0133.`,
    },

    "2026A-q2.4": {
      point: R`<p>Read each line and ask: "does the tree still grow, and does it pick good questions?"</p>
<p><b>1. What the question asks.</b> One line is faulty (says the wrong thing) and one operation is omitted (missing). Compare with what the class algorithm does.</p>
<p><b>2. \(Q\) is a to-do list of nodes.</b> Each loop takes one node off the list: pure → make it a leaf; mixed → split it, and its children go <b>onto the list</b>, to be handled in later loops.</p>
<p><b>3. Why "smallest" is wrong.</b> Impurity reduction = how much less mixed the children are. We want the question that cleans up the most, so the <b>largest</b> reduction.</p>
<p><b>4. What's missing.</b> Step iii makes the children but never puts them into \(Q\). After the root, \(Q\) is empty, so the loop stops: the children are never split or made leaves.</p>
<p><b>So:</b> one word to fix in ii, one action to add in iii.</p>`,
      start: R`<p><b>Key idea:</b> Faulty: b.3.ii must pick the <b>largest</b> impurity reduction (the split that removes the most impurity). Omitted: b.3.iii must push each new child into \(Q\), otherwise the loop stops after the root.</p>
<p><b>Faulty:</b> step □: "□" → should be □, because □</p>
<p><b>Omitted:</b> in step □, add: □, because □</p>`,
      answer: R`<p><b>Key idea:</b> Faulty: b.3.ii must pick the <b>largest</b> impurity reduction (the split that removes the most impurity). Omitted: b.3.iii must push each new child into \(Q\), otherwise the loop stops after the root.</p>
<p><b>Faulty:</b> step b.3.ii: "the <b>smallest</b> impurity reduction" → should be the <b>largest</b> impurity reduction, because we want the split that removes the most impurity.</p>
<p><b>Omitted:</b> in step b.3.iii, add: <b>push each child of \(v\) into the queue \(Q\)</b>, because otherwise the loop ends after the root and the children are never split or made leaves.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Compare Donald's lines with the class algorithm, one by one: one line says something wrong, and one thing the algorithm does is missing.`,
          remember: R`<p>The class tree algorithm, for each node popped from \(Q\): pure → leaf; otherwise split on the attribute with the <b>largest</b> impurity reduction, and <b>push each child into \(Q\)</b>.</p><p>Not on the sheet.</p>` },
        { line: R`<b>Faulty: step b.3.ii</b> — "smallest impurity reduction" → <b>largest</b>. We want the question that removes the most impurity.` },
        { line: R`<b>Omitted: step b.3.iii</b> — after making the children, <b>add each child of \(v\) to the queue \(Q\)</b>. Otherwise the loop ends after the root, and nothing below it is ever checked or split. Done.` },
      ],
      compare: R`Same two corrections as the official solution.`,
    },

    "2026A-q2.5": {
      point: R`<p>One iteration = one trip through step b, for the root only. Stop there.</p>
<p><b>1. What "first iteration" means.</b> \(Q\) holds only the root. Pop it; it's 3 \(+\) 2 \(-\), not pure, so: score every attribute, split on the largest, push the children into \(Q\). The children are <b>not</b> processed yet.</p>
<p><b>2. What you end with.</b> A root with one question and two children, and \(Q\) = those two children, waiting.</p>
<p><b>3. Why you need all four scores.</b> "The largest" is only true after comparing every attribute. Part 3 gave \(X_1\) and \(X_4\); \(X_2\) and \(X_3\) are missing. Each makes a 1–1 box and a 2–1 box, the same shapes as \(X_4\), so they tie with \(X_4\).</p>
<p><b>4. The trap.</b> \(v_1 = \{x^{(1)}\}\) is already pure, but it becomes a leaf only when it's popped, in a later iteration. After iteration 1 it's still waiting in \(Q\).</p>
<p><b>So:</b> compare four numbers, split on the winner, and both children end up in \(Q\).</p>`,
      start: R`<p><b>Key idea:</b> Iteration 1 pops the root (3 \(+\), 2 \(-\), not pure), computes the Gini reduction of every attribute, splits on the largest (\(X_1\), 0.18) and pushes both children into \(Q\); nothing else is processed yet.</p>
<p><b>Pop:</b> \(v_{root}\), \(S\) = □, not pure, so split.</p>
<p><b>Reductions:</b> \(\Delta\varphi(X_1) = \square\), \(\Delta\varphi(X_2) = \square\), \(\Delta\varphi(X_3) = \square\), \(\Delta\varphi(X_4) = \square\)</p>
<p><b>Split on:</b> □ → \(v_1 = \square\), \(\;v_2 = \square\)</p>
<p><b>The tree:</b></p><pre><code>      v_root [□ ?]
        0 /     \ 1
        v1       v2</code></pre>
<p><b>The queue:</b> \(Q = \square\)</p>`,
      answer: R`<p><b>Key idea:</b> Iteration 1 pops the root (3 \(+\), 2 \(-\), not pure), computes the Gini reduction of every attribute, splits on the largest (\(X_1\), 0.18) and pushes both children into \(Q\); nothing else is processed yet.</p>
<p><b>Pop:</b> \(v_{root}\), \(S\) = samples 1–5 (3 \(+\), 2 \(-\)), not pure, so split.</p>
<p><b>Reductions:</b> \(\Delta\varphi(X_1) = 0.18\), \(\Delta\varphi(X_4) = 0.0133\) (part 3); \(X_2\): children \(\{1-, 2+\}\) (0.5), \(\{3+, 4-, 5+\}\) (\(\tfrac49\)); \(X_3\): \(\{1-, 3+, 5+\}\) (\(\tfrac49\)), \(\{2+, 4-\}\) (0.5), so</p>
\[\Delta\varphi(X_2) = \Delta\varphi(X_3) = 0.48 - \tfrac25\cdot 0.5 - \tfrac35\cdot\tfrac49 = 0.0133\]
<p><b>Split on:</b> \(X_1\) (largest) → \(v_1 = \{x^{(1)}\}\), \(\;v_2 = \{x^{(2)}, x^{(3)}, x^{(4)}, x^{(5)}\}\)</p>
<p><b>The tree:</b></p><pre><code>      v_root [X1 ?]
        0 /     \ 1
        v1       v2
       {1}    {2,3,4,5}</code></pre>
<p><b>The queue:</b> \(Q = [v_1, v_2]\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> One pass of step b: pop the root (not pure), score <b>every</b> attribute, split on the largest, push the children. Part 3 has \(X_1\) (0.18) and \(X_4\) (0.0133); \(X_2\), \(X_3\) are missing.`,
          remember: R`<p>The class tree algorithm (part 4's corrected version): split on the attribute with the <b>largest</b> impurity reduction, and <b>push each child into \(Q\)</b>.</p><p>Not on the sheet.</p>` },
        { line: R`<b>Children of \(X_2\), \(X_3\)</b>: <div class="tw"><table><thead><tr><th>child</th><th>samples</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_2 = 0\)</td><td>\(1-,2+\)</td><td>\(0.5\)</td></tr><tr><td>\(X_2 = 1\)</td><td>\(3+,4-,5+\)</td><td>\(\tfrac49\)</td></tr>
<tr><td>\(X_3 = 0\)</td><td>\(1-,3+,5+\)</td><td>\(\tfrac49\)</td></tr><tr><td>\(X_3 = 1\)</td><td>\(2+,4-\)</td><td>\(0.5\)</td></tr></tbody></table></div>`,
          why: R`<p>A 1–1 child: \(1 - 0.5^2 - 0.5^2 = 0.5\). A 2–1 child: \(1 - \left(\tfrac23\right)^2 - \left(\tfrac13\right)^2 = 1 - \tfrac49 - \tfrac19 = \tfrac49\).</p>`,
          remember: R`\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\]<p>Not on the sheet: it only has the impurity itself, [sheet: Gini impurity]. Here \(v\) = 0, 1.</p>` },
        { line: R`<b>Both reductions</b> — root Gini \(1 - 0.6^2 - 0.4^2 = 0.48\) (3 \(+\), 2 \(-\)); one child of 2 at 0.5, one of 3 at \(\tfrac49\): <div class="formula">\[\begin{aligned}\Delta\varphi(X_2) = \Delta\varphi(X_3) &= 0.48 - \tfrac25\cdot 0.5 - \tfrac35\cdot\tfrac49\\ &= 0.0133\end{aligned}\]</div>` },
        { line: R`<b>Pick \(X_1\), push the children</b> — 0.18 beats 0.0133. \(v_1 = \{x^{(1)}\}\), \(v_2 = \{x^{(2)}, x^{(3)}, x^{(4)}, x^{(5)}\}\): <pre><code>      v_root [X1 ?]
        0 /     \ 1
        v1       v2
       {1}    {2,3,4,5}</code></pre>\(Q = [v_1, v_2]\). Done.`,
          why: R`<p>\(v_1\) is pure, but it becomes a leaf only when it's popped, in the next iteration. After iteration 1 it's just waiting in \(Q\).</p>` },
      ],
      compare: R`Same result as the official solution: \(X_1\), \(v_1 = \{x^{(1)}\}\), \(v_2 = \{x^{(2)},\dots,x^{(5)}\}\), \(Q = \{v_1, v_2\}\). Its slips: it swaps the children of \(X_2\) and \(X_3\) (\(X_2 = 0\) is 0.5, not 0.444; same final 0.0133), says "computed in (1)" instead of (3), and labels both branches \(v_1\) in the drawing.`,
      slip: R`<ul><li>Here \(x_1, x_2, \dots\) mean sample 1, sample 2, … (rows of the table), not the \(x_1, x_2\) feature columns. So \(\{x_2, x_3, x_4, x_5\}\) is just samples 2–5.</li><li>The \(X_2\) and \(X_3\) children are swapped: \(X_2 = 0\) and \(X_3 = 1\) are the 0.5 children. Both reductions are still 0.0133.</li><li>\(\Delta\varphi(X_1) = 0.18\) comes from part (3), not (1).</li><li>In the drawing, the \(X_1 = 1\) branch is \(v_2\), not \(v_1\).</li></ul>`,
    },

    // ═════════════════════════════════════════════ 2026-B Q2 (your Moed B question)
    "2026B-q2.1": {
      point: R`<p>A real number gives many possible questions "\(X_1 \lt t\)?". Try each one, keep the one with the biggest gain.</p>
<p><b>1. What "the split by \(X_1\)" means.</b> Here a split is a threshold \(t\): left = \(X_1 \lt t\), right = the rest. The stem says which \(t\)'s to try: midpoints between consecutive <b>distinct</b> \(X_1\) values.</p>
<p><b>2. The picture.</b> The samples on the \(X_1\) line, with the candidate cuts:</p><div class="fig"><svg viewBox="0 0 520 150" width="520" role="img" aria-label="The 8 samples on the X1 line: 2 B, 3 R and B, 4 B, 5 R, 6 B and R, 8 R; candidate cuts at 2.5, 3.5, 4.5, 5.5, 7"><line x1="60.0" y1="100" x2="440.0" y2="100" style="stroke:var(--muted)"/><line x1="90.0" y1="100" x2="90.0" y2="105" style="stroke:var(--muted)"/><text x="90.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">2</text><line x1="140.0" y1="100" x2="140.0" y2="105" style="stroke:var(--muted)"/><text x="140.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">3</text><line x1="190.0" y1="100" x2="190.0" y2="105" style="stroke:var(--muted)"/><text x="190.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">4</text><line x1="240.0" y1="100" x2="240.0" y2="105" style="stroke:var(--muted)"/><text x="240.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">5</text><line x1="290.0" y1="100" x2="290.0" y2="105" style="stroke:var(--muted)"/><text x="290.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">6</text><line x1="340.0" y1="100" x2="340.0" y2="105" style="stroke:var(--muted)"/><text x="340.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">7</text><line x1="390.0" y1="100" x2="390.0" y2="105" style="stroke:var(--muted)"/><text x="390.0" y="119.0" text-anchor="middle" font-size="12" fill="currentColor">8</text><text x="440.0" y="119.0" text-anchor="end" font-size="13" font-weight="700" fill="currentColor">X₁</text><line x1="115.0" y1="22" x2="115.0" y2="100" style="stroke:var(--shaky)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="115.0" y="16.0" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--shaky)">2.5</text><line x1="165.0" y1="22" x2="165.0" y2="100" style="stroke:var(--shaky)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="165.0" y="16.0" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--shaky)">3.5</text><line x1="215.0" y1="22" x2="215.0" y2="100" style="stroke:var(--shaky)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="215.0" y="16.0" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--shaky)">4.5</text><line x1="265.0" y1="22" x2="265.0" y2="100" style="stroke:var(--shaky)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="265.0" y="16.0" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--shaky)">5.5</text><line x1="340.0" y1="22" x2="340.0" y2="100" style="stroke:var(--shaky)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="340.0" y="16.0" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--shaky)">7</text><rect x="84.0" y="78.0" width="12" height="12" style="fill:var(--accent)"/><text x="99.0" y="80.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">1</text><path d="M140.0,76.0 L148.0,84.0 L140.0,92.0 L132.0,84.0 Z" style="fill:var(--fail)"/><text x="149.0" y="80.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">2</text><rect x="134.0" y="52.0" width="12" height="12" style="fill:var(--accent)"/><text x="149.0" y="54.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">3</text><rect x="184.0" y="78.0" width="12" height="12" style="fill:var(--accent)"/><text x="199.0" y="80.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">4</text><path d="M240.0,76.0 L248.0,84.0 L240.0,92.0 L232.0,84.0 Z" style="fill:var(--fail)"/><text x="249.0" y="80.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">5</text><rect x="284.0" y="78.0" width="12" height="12" style="fill:var(--accent)"/><text x="299.0" y="80.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">6</text><path d="M290.0,50.0 L298.0,58.0 L290.0,66.0 L282.0,58.0 Z" style="fill:var(--fail)"/><text x="299.0" y="54.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">7</text><path d="M390.0,76.0 L398.0,84.0 L390.0,92.0 L382.0,84.0 Z" style="fill:var(--fail)"/><text x="399.0" y="80.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">8</text></svg></div>
<p><b>3. Why only midpoints.</b> Any \(t\) between 4 and 5 sends exactly the same samples left, so it gives the same IG: one candidate per gap is enough. 3 and 6 appear twice but count once.</p>
<p><b>4. What wins.</b> The parent is 4 B, 4 R, so \(H = 1\), and IG = 1 − the weighted entropy of the two sides. The cut whose sides are most one-coloured wins.</p>
<p><b>So:</b> 5 candidates, 5 IGs, keep the largest.</p>`,
      start: R`<p><b>Key idea:</b> A split on \(X_1\) is a threshold at a midpoint between consecutive distinct values (2.5, 3.5, 4.5, 5.5, 7). Compute the IG of each and keep the largest.</p>
<p><b>Parent:</b> \(H(S) = \square\). <b>Candidates:</b> \(\square\)</p>
<div class="tw"><table><thead><tr><th>\(t\)</th><th>left \(X_1 \lt t\)</th><th>\(H\)</th><th>right</th><th>\(H\)</th><th>IG</th></tr></thead><tbody>
<tr><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr></tbody></table></div>
<p><b>Best:</b> threshold \(\square\), i.e. \(X_1 \lt \square\) vs \(X_1 \gt \square\), with IG \(= \square\)</p>`,
      answer: R`<p><b>Key idea:</b> A split on \(X_1\) is a threshold at a midpoint between consecutive distinct values (2.5, 3.5, 4.5, 5.5, 7). Compute the IG of each and keep the largest.</p>
<p><b>Parent:</b> 4 B, 4 R, so \(H(S) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\). <b>Candidates:</b> distinct values 2, 3, 4, 5, 6, 8 → \(t\) = 2.5, 3.5, 4.5, 5.5, 7</p>
<div class="tw"><table><thead><tr><th>\(t\)</th><th>left \(X_1 \lt t\)</th><th>\(H\)</th><th>right</th><th>\(H\)</th><th>IG</th></tr></thead><tbody>
<tr><td>2.5</td><td>1B 0R</td><td>0</td><td>3B 4R</td><td>0.985</td><td>\(1 - \tfrac18\cdot 0 - \tfrac78\cdot 0.985 = 0.138\)</td></tr>
<tr><td>3.5</td><td>2B 1R</td><td>0.9183</td><td>2B 3R</td><td>0.971</td><td>\(1 - \tfrac38\cdot 0.9183 - \tfrac58\cdot 0.971 = 0.049\)</td></tr>
<tr><td>4.5</td><td>3B 1R</td><td>0.8113</td><td>1B 3R</td><td>0.8113</td><td>\(1 - \tfrac48\cdot 0.8113 - \tfrac48\cdot 0.8113 = 0.189\)</td></tr>
<tr><td>5.5</td><td>3B 2R</td><td>0.971</td><td>1B 2R</td><td>0.9183</td><td>\(1 - \tfrac58\cdot 0.971 - \tfrac38\cdot 0.9183 = 0.049\)</td></tr>
<tr><td>7</td><td>4B 3R</td><td>0.985</td><td>0B 1R</td><td>0</td><td>\(1 - \tfrac78\cdot 0.985 - \tfrac18\cdot 0 = 0.138\)</td></tr></tbody></table></div>
<p><b>Best:</b> threshold 4.5, i.e. \(X_1 \lt 4.5\) vs \(X_1 \gt 4.5\), with IG \(= 0.189\)</p>`,
      moves: [
        { line: R`<b>Parent and candidates</b> — a split on \(X_1\) = a threshold \(t\) at a midpoint. 4 B, 4 R, so \(H(S) = 1\) ([sheet: Entropy]). Distinct \(X_1\) values 2, 3, 4, 5, 6, 8 → midpoints 2.5, 3.5, 4.5, 5.5, 7.`,
          why: R`<p>\(H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\). Any \(t\) between 4 and 5 sends the same samples left, so one candidate per gap is enough. 3 and 6 appear twice but count once.</p>`,
          remember: R`\[\mathrm{IG}(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v)\]<p>Not on the sheet: it only has [sheet: Entropy]. Here the two sides are left \((X_1 \lt t)\) and right, out of \(|S| = 8\).</p>` },
        { line: R`<b>Each side: count, then \(H\)</b>: <div class="tw"><table><thead><tr><th>\(t\)</th><th>left</th><th>\(H\)</th><th>right</th><th>\(H\)</th></tr></thead><tbody>
<tr><td>2.5</td><td>\(1\text{B}\,0\text{R}\)</td><td>0</td><td>\(3\text{B}\,4\text{R}\)</td><td>0.985</td></tr>
<tr><td>3.5</td><td>\(2\text{B}\,1\text{R}\)</td><td>0.9183</td><td>\(2\text{B}\,3\text{R}\)</td><td>0.971</td></tr>
<tr><td>4.5</td><td>\(3\text{B}\,1\text{R}\)</td><td>0.8113</td><td>\(1\text{B}\,3\text{R}\)</td><td>0.8113</td></tr>
<tr><td>5.5</td><td>\(3\text{B}\,2\text{R}\)</td><td>0.971</td><td>\(1\text{B}\,2\text{R}\)</td><td>0.9183</td></tr>
<tr><td>7</td><td>\(4\text{B}\,3\text{R}\)</td><td>0.985</td><td>\(0\text{B}\,1\text{R}\)</td><td>0</td></tr></tbody></table></div>`,
          why: R`<p>Left of 4.5 are samples 1–4 (B, R, B, B), right are 5–8 (R, B, R, R). One entropy in full:</p>
\[\begin{aligned}H(\tfrac34) &= -\tfrac34\log_2\tfrac34 - \tfrac14\log_2\tfrac14\\ &= 0.75\cdot 0.415 + 0.25\cdot 2 = 0.8113\end{aligned}\]
<p>\(\log_2\) on a calculator: press ln of the number, then divide by ln 2. E.g. \(\log_2 0.75 = \ln 0.75 \div \ln 2 = -0.2877 \div 0.6931 = -0.415\). (Optional, extension sheet only: [sheet: Change of log base].)</p>
<p>Mirror sides are equal: \(3\text{B}\,1\text{R}\) and \(1\text{B}\,3\text{R}\) both give 0.8113.</p>` },
        { line: R`<b>IG for each \(t\)</b> — each side weighted by its share of the 8: <div class="tw"><table><thead><tr><th>\(t\)</th><th>IG</th></tr></thead><tbody>
<tr><td>2.5</td><td>\(1 - \tfrac18\cdot 0 - \tfrac78\cdot 0.985 = 0.138\)</td></tr>
<tr><td>3.5</td><td>\(1 - \tfrac38\cdot 0.9183 - \tfrac58\cdot 0.971 = 0.049\)</td></tr>
<tr><td>4.5</td><td>\(1 - \tfrac48\cdot 0.8113 - \tfrac48\cdot 0.8113 = 0.189\)</td></tr>
<tr><td>5.5</td><td>\(1 - \tfrac58\cdot 0.971 - \tfrac38\cdot 0.9183 = 0.049\)</td></tr>
<tr><td>7</td><td>\(1 - \tfrac78\cdot 0.985 - \tfrac18\cdot 0 = 0.138\)</td></tr></tbody></table></div>Best: threshold 4.5, i.e. \(X_1 \lt 4.5\) vs \(X_1 \gt 4.5\), IG \(= 0.189\). Done.`, why: R`<p>The official solution writes "\(X_1 = 4.5\)": that is shorthand for "the threshold is 4.5", not the condition \(X_1 = 4.5\). Its own lines use \(S_{X_1 \lt 4.5}\) and \(S_{X_1 \gt 4.5}\). No sample has \(X_1 = 4.5\) (thresholds are midpoints), so \(\lt\) vs \(\le\) doesn't matter.</p>` },
      ],
      compare: R`Same numbers as the official solution; its last line is step 3's answer.`,
    },

    "2026B-q2.2": {
      point: R`<p>Look at the chart: the reds sit in a horizontal band. Two horizontal cuts carve it out.</p>
<p><b>1. What the question asks.</b> Depth 2 = at most two threshold questions on any path. In the chart, a question on \(X_2\) is a horizontal line, a question on \(X_1\) a vertical line.</p>
<p><b>2. The picture.</b> The chart, with the reds' band shaded:</p><div class="fig"><svg viewBox="0 0 470 300" width="470" role="img" aria-label="The 8 samples: the reds 2, 5, 7, 8 lie in a horizontal band between X2 = 2.5 and X2 = 7; blues 1, 4, 6 below and 3 above"><rect x="50.0" y="78.0" width="241.8" height="117.0" style="fill:var(--fail)" fill-opacity="0.10"/><line x1="50" y1="260" x2="291.8" y2="260" style="stroke:var(--muted)"/><line x1="50" y1="260" x2="50" y2="20.8" style="stroke:var(--muted)"/><text x="43.0" y="264.0" text-anchor="end" font-size="11" fill="currentColor">0</text><text x="102.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">2</text><text x="43.0" y="212.0" text-anchor="end" font-size="11" fill="currentColor">2</text><text x="154.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">4</text><text x="43.0" y="160.0" text-anchor="end" font-size="11" fill="currentColor">4</text><text x="206.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">6</text><text x="43.0" y="108.0" text-anchor="end" font-size="11" fill="currentColor">6</text><text x="258.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">8</text><text x="43.0" y="56.0" text-anchor="end" font-size="11" fill="currentColor">8</text><text x="43.0" y="238.0" text-anchor="end" font-size="11" fill="currentColor">1</text><text x="43.0" y="186.0" text-anchor="end" font-size="11" fill="currentColor">3</text><text x="43.0" y="134.0" text-anchor="end" font-size="11" fill="currentColor">5</text><text x="43.0" y="82.0" text-anchor="end" font-size="11" fill="currentColor">7</text><text x="43.0" y="30.0" text-anchor="end" font-size="11" fill="currentColor">9</text><text x="291.8" y="276.0" text-anchor="end" font-size="13" font-weight="700" fill="currentColor">X₁</text><text x="56.0" y="24.8" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">X₂</text><line x1="50" y1="195.0" x2="291.8" y2="195.0" style="stroke:var(--fail)" stroke-dasharray="6 4" stroke-width="1.5"/><line x1="50" y1="78.0" x2="291.8" y2="78.0" style="stroke:var(--fail)" stroke-dasharray="6 4" stroke-width="1.5"/><text x="291.8" y="190.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">X₂ = 2.5</text><text x="291.8" y="73.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">X₂ = 7</text><text x="286.6" y="135.2" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">red band</text><rect x="96.0" y="202.0" width="12" height="12" style="fill:var(--accent)"/><text x="111.0" y="202.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">1</text><path d="M128.0,174.0 L136.0,182.0 L128.0,190.0 L120.0,182.0 Z" style="fill:var(--fail)"/><text x="137.0" y="176.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">2</text><rect x="122.0" y="46.0" width="12" height="12" style="fill:var(--accent)"/><text x="138.0" y="56.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">3</text><rect x="148.0" y="202.0" width="12" height="12" style="fill:var(--accent)"/><text x="163.0" y="202.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">4</text><path d="M180.0,174.0 L188.0,182.0 L180.0,190.0 L172.0,182.0 Z" style="fill:var(--fail)"/><text x="189.0" y="176.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">5</text><rect x="200.0" y="228.0" width="12" height="12" style="fill:var(--accent)"/><text x="215.0" y="228.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">6</text><path d="M206.0,96.0 L214.0,104.0 L206.0,112.0 L198.0,104.0 Z" style="fill:var(--fail)"/><text x="196.0" y="98.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">7</text><path d="M258.0,96.0 L266.0,104.0 L258.0,112.0 L250.0,104.0 Z" style="fill:var(--fail)"/><text x="267.0" y="98.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">8</text></svg></div>
<p><b>3. Why \(X_2\), not \(X_1\).</b> Samples 2 (R) and 3 (B) both have \(X_1 = 3\): no vertical line can separate them. Sorted by \(X_2\), the labels read B B B R R R R B: the colour changes only twice, so two cuts are enough.</p>
<p><b>So:</b> cut \(X_2\) below the band, then above it.</p>`,
      start: R`<p><b>Key idea:</b> Sorted by \(X_2\) the labels are B B B | R R R R | B, so R \(\iff 2.5 \lt X_2 \lt 7\): a band that two cuts on \(X_2\) carve out (depth 2).</p>
<p><b>Sorted by \(X_2\):</b> □</p>
<p><b>The pattern:</b> R \(\iff\) □</p>
<p><b>The tree (depth 2):</b></p><pre><code>        [X□ &lt; □ ?]
      yes /        \ no
        □        [X□ &lt; □ ?]
               yes /     \ no
                 □         □</code></pre>
<p><b>Zero error:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> Sorted by \(X_2\) the labels are B B B | R R R R | B, so R \(\iff 2.5 \lt X_2 \lt 7\): a band that two cuts on \(X_2\) carve out (depth 2).</p>
<p><b>Sorted by \(X_2\):</b> labels B B B R R R R B (\(X_2\) = 1, 2, 2, 3, 3, 6, 6, 8)</p>
<p><b>The pattern:</b> R \(\iff 2.5 \lt X_2 \lt 7\) (midpoints of 2, 3 and of 6, 8)</p>
<p><b>The tree (depth 2):</b></p><pre><code>        [X2 &lt; 2.5 ?]
      yes /        \ no
        B        [X2 &lt; 7 ?]
    (1,4,6)    yes /     \ no
                 R         B
            (2,5,7,8)     (3)</code></pre>
<p><b>Zero error:</b> every leaf is pure (samples in brackets).</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> Depth 2 = two threshold questions. Sort the samples by a feature and see where the label changes; one feature with few changes is enough.`,
          why: R`<p>By \(X_1\) it doesn't work: samples 2 (R) and 3 (B) both have \(X_1 = 3\), and 6 (B) and 7 (R) both have \(X_1 = 6\), so no threshold on \(X_1\) can separate them. In the chart the reds sit in a horizontal band → \(X_2\).</p>` },
        { line: R`<b>Sort by \(X_2\)</b>: <div class="tw"><table><tbody>
<tr><td>\(X_2\)</td><td>1</td><td>2</td><td>2</td><td>3</td><td>3</td><td>6</td><td>6</td><td>8</td></tr>
<tr><td>\(y\)</td><td>B</td><td>B</td><td>B</td><td>R</td><td>R</td><td>R</td><td>R</td><td>B</td></tr></tbody></table></div>Two label changes: at 2.5 and at 7. So R \(\iff 2.5 \lt X_2 \lt 7\).`,
          why: R`<p>In that order the samples are 6, 1, 4 (B), 2, 5, 7, 8 (R), 3 (B). The label changes between 2 and 3 (midpoint 2.5) and between 6 and 8 (midpoint 7).</p>` },
        { line: R`<b>The tree</b> — cut at 2.5, then at 7. Depth 2, every leaf pure: <pre><code>        [X2 &lt; 2.5 ?]
      yes /        \ no
        B        [X2 &lt; 7 ?]
    (1,4,6)    yes /     \ no
                 R         B
            (2,5,7,8)     (3)</code></pre>Done.` },
      ],
      compare: R`The official tree asks \(X_2 \lt 7\) first and \(2.5\) second: the same band. Its text says red iff \(x_2 \in (2.5, 6.5)\), also true of the data, but the question wants midpoints, so the tree uses 7.`,
      slip: R`It says R iff \(X_2 \in (2.5, 6.5)\), but the tree splits at 7, the midpoint of 6 and 8. Same red band on this data. Use 7: the question wants midpoint thresholds, and 6.5 isn't one.`,
    },

    "2026B-q2.3": {
      point: R`<p>Leaving a sample out only changes the tree if a cut depended on that sample alone.</p>
<p><b>1. What the question asks.</b> 8 rounds: hide one sample, build a zero-error tree (depth ≤ 2) on the other 7, predict the hidden one. Average error = wrong rounds ÷ 8.</p>
<p><b>2. The picture.</b> Part 2's cuts are midpoints: 2.5 needs a sample at \(X_2 = 2\) and one at 3; 7 needs one at 6 and one at 8.</p><div class="fig"><svg viewBox="0 0 470 300" width="470" role="img" aria-label="Same chart; sample 3 is the only sample above the band, so the cut at X2 = 7 exists only because of it"><rect x="50.0" y="78.0" width="241.8" height="117.0" style="fill:var(--fail)" fill-opacity="0.10"/><line x1="50" y1="260" x2="291.8" y2="260" style="stroke:var(--muted)"/><line x1="50" y1="260" x2="50" y2="20.8" style="stroke:var(--muted)"/><text x="43.0" y="264.0" text-anchor="end" font-size="11" fill="currentColor">0</text><text x="102.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">2</text><text x="43.0" y="212.0" text-anchor="end" font-size="11" fill="currentColor">2</text><text x="154.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">4</text><text x="43.0" y="160.0" text-anchor="end" font-size="11" fill="currentColor">4</text><text x="206.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">6</text><text x="43.0" y="108.0" text-anchor="end" font-size="11" fill="currentColor">6</text><text x="258.0" y="276.0" text-anchor="middle" font-size="11" fill="currentColor">8</text><text x="43.0" y="56.0" text-anchor="end" font-size="11" fill="currentColor">8</text><text x="43.0" y="238.0" text-anchor="end" font-size="11" fill="currentColor">1</text><text x="43.0" y="186.0" text-anchor="end" font-size="11" fill="currentColor">3</text><text x="43.0" y="134.0" text-anchor="end" font-size="11" fill="currentColor">5</text><text x="43.0" y="82.0" text-anchor="end" font-size="11" fill="currentColor">7</text><text x="43.0" y="30.0" text-anchor="end" font-size="11" fill="currentColor">9</text><text x="291.8" y="276.0" text-anchor="end" font-size="13" font-weight="700" fill="currentColor">X₁</text><text x="56.0" y="24.8" text-anchor="start" font-size="13" font-weight="700" fill="currentColor">X₂</text><line x1="50" y1="195.0" x2="291.8" y2="195.0" style="stroke:var(--fail)" stroke-dasharray="6 4" stroke-width="1.5"/><line x1="50" y1="78.0" x2="291.8" y2="78.0" style="stroke:var(--fail)" stroke-dasharray="6 4" stroke-width="1.5"/><text x="291.8" y="190.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">X₂ = 2.5</text><text x="291.8" y="73.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">X₂ = 7</text><text x="154.0" y="56.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--shaky)">← the only sample above 6</text><text x="286.6" y="135.2" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">red band</text><rect x="96.0" y="202.0" width="12" height="12" style="fill:var(--accent)"/><text x="111.0" y="202.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">1</text><path d="M128.0,174.0 L136.0,182.0 L128.0,190.0 L120.0,182.0 Z" style="fill:var(--fail)"/><text x="137.0" y="176.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">2</text><rect x="122.0" y="46.0" width="12" height="12" style="fill:var(--accent)"/><text x="110.0" y="56.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--accent-ink)">3</text><circle cx="128.0" cy="52.0" r="14" style="fill:none;stroke:var(--shaky)" stroke-width="2.5" stroke-dasharray="4 3"/><rect x="148.0" y="202.0" width="12" height="12" style="fill:var(--accent)"/><text x="163.0" y="202.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">4</text><path d="M180.0,174.0 L188.0,182.0 L180.0,190.0 L172.0,182.0 Z" style="fill:var(--fail)"/><text x="189.0" y="176.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">5</text><rect x="200.0" y="228.0" width="12" height="12" style="fill:var(--accent)"/><text x="215.0" y="228.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">6</text><path d="M206.0,96.0 L214.0,104.0 L206.0,112.0 L198.0,104.0 Z" style="fill:var(--fail)"/><text x="196.0" y="98.0" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">7</text><path d="M258.0,96.0 L266.0,104.0 L258.0,112.0 L250.0,104.0 Z" style="fill:var(--fail)"/><text x="267.0" y="98.0" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">8</text></svg></div>
<p><b>3. Why most rounds are free.</b> \(X_2 = 2, 3, 6\) each belong to two samples, so hiding any sample except 3 keeps both cuts. Part 2's tree is then still zero-error on the 7, and it's right on all 8, so it's right on the hidden one too.</p>
<p><b>4. The one that breaks.</b> Only sample 3 has \(X_2 = 8\). Hide it and nothing is above 6: no cut at 7, one cut at 2.5 is enough, and everything above 2.5 is called red, including sample 3.</p>
<p><b>So:</b> exactly one wrong round out of 8.</p>`,
      start: R`<p><b>Key idea:</b> Only sample 3 holds up a cut alone (the cut at 7 needs \(X_2 = 8\)). Every other round rebuilds part 2's tree, which is right on all 8; without 3 the tree is \(X_2 \lt 2.5 \to\) B, else R, which calls sample 3 red. Average error \(\tfrac18\).</p>
<p><b>Left out □:</b> tree □ → predicts the left-out sample □</p>
<p><b>Left out □:</b> tree □ → predicts □, truth □</p>
<p><b>Average error:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> Only sample 3 holds up a cut alone (the cut at 7 needs \(X_2 = 8\)). Every other round rebuilds part 2's tree, which is right on all 8; without 3 the tree is \(X_2 \lt 2.5 \to\) B, else R, which calls sample 3 red. Average error \(\tfrac18\).</p>
<p><b>Left out 1, 2, 4, 5, 6, 7 or 8:</b> tree = part 2's (\(X_2 \lt 2.5 \to\) B; else \(X_2 \lt 7 \to\) R; else B), zero error on the other 7 → predicts the left-out sample correctly.</p>
<p><b>Left out 3:</b> tree \(X_2 \lt 2.5 \to\) B, else R (depth 1; no sample has \(X_2 = 8\), so no threshold 7) → predicts R, truth B: error.</p>
<p><b>Average error:</b> \(\tfrac18 = 0.125\)</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> 8 rounds: leave one out, build a zero-error tree on the other 7, predict the left-out one. If part 2's tree can still be built, it's right on the left-out one too.` },
        { line: R`<b>Most rounds keep the part-2 tree</b> — threshold 2.5 needs a 2 and a 3 (two samples each); 7 needs a 6 (two) and an 8 (only sample 3). So only leaving out 3 breaks it.`,
          why: R`<p>Without any one sample except 3, \(X_2\) still has values on both sides of 2.5 and of 7, so both midpoints are still candidates, and the part-2 tree (right on all 8) is still zero-error on the 7.</p>` },
        { line: R`<b>Except sample 3</b> — the only one with \(X_2 = 8\). Without it, \(X_2\)'s values are 1, 2, 3, 6: no midpoint 7. Tree: \(X_2 \lt 2.5 \to\) B, else R. Sample 3 → R, but it's B: error.`,
          why: R`<p>On the other seven, blue is \(X_2 \in \{1, 2, 2\}\) and red is \(X_2 \in \{3, 3, 6, 6\}\). One cut at 2.5 already separates them, so a depth-1 tree does it (the official choice).</p>` },
        { line: R`<b>Average</b> — 1 error in 8 rounds: \(\tfrac18 = 0.125\). Done.`,
          why: R`<div class="tw"><table><thead><tr><th>left out</th><th>tree</th><th>prediction</th><th>truth</th></tr></thead><tbody>
<tr><td>1, 4, 6</td><td>part 2</td><td>B</td><td>B</td></tr>
<tr><td>2, 5, 7, 8</td><td>part 2</td><td>R</td><td>R</td></tr>
<tr><td>3</td><td>\(X_2 \lt 2.5 \to\) B, else R</td><td>R</td><td>B ✗</td></tr></tbody></table></div>` },
      ],
      compare: R`Same as the official solution: only sample 3 changes the tree (to a depth-1 split at 2.5), LOO error \(\tfrac18 = 0.125\).`,
    },

    "2026B-q2.4": {
      point: R`<p>One cut can only say "small" or "large". The reds sit in the <b>middle</b> of \(x_2\), so build a feature that is small in the middle: the squared distance from the band's center.</p>
<p><b>1. What the question asks.</b> After \(\varphi\), a depth-1 tree = one threshold on one mapped coordinate. The first coordinate uses only \(x_1\) (the \(a\)'s), the second only \(x_2\) (the \(b\)'s).</p>
<p><b>2. The picture.</b> Reds have \(x_2 = 3\) or \(6\), blues \(1, 2\) or \(8\): the reds are the band \(2.5 \lt x_2 \lt 6.5\), center 4.5. Plot \((x_2 - 4.5)^2\) (small numbers = sample ids):</p><div class="fig"><svg viewBox="0 0 500 260" width="500" role="img" aria-label="The U-shaped curve (x2 minus 4.5) squared: reds at x2 = 3 and 6 sit low in the U below the cut, blues at 1, 2, 8 sit high"><line x1="50" y1="220" x2="468.0" y2="220" style="stroke:var(--muted)"/><line x1="50" y1="220" x2="50" y2="35.2" style="stroke:var(--muted)"/><line x1="50.0" y1="220" x2="50.0" y2="224" style="stroke:var(--muted)"/><text x="50.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">0</text><line x1="94.0" y1="220" x2="94.0" y2="224" style="stroke:var(--muted)"/><text x="94.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">1</text><line x1="138.0" y1="220" x2="138.0" y2="224" style="stroke:var(--muted)"/><text x="138.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">2</text><line x1="182.0" y1="220" x2="182.0" y2="224" style="stroke:var(--muted)"/><text x="182.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">3</text><line x1="226.0" y1="220" x2="226.0" y2="224" style="stroke:var(--muted)"/><text x="226.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">4</text><line x1="270.0" y1="220" x2="270.0" y2="224" style="stroke:var(--muted)"/><text x="270.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">5</text><line x1="314.0" y1="220" x2="314.0" y2="224" style="stroke:var(--muted)"/><text x="314.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">6</text><line x1="358.0" y1="220" x2="358.0" y2="224" style="stroke:var(--muted)"/><text x="358.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">7</text><line x1="402.0" y1="220" x2="402.0" y2="224" style="stroke:var(--muted)"/><text x="402.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">8</text><line x1="446.0" y1="220" x2="446.0" y2="224" style="stroke:var(--muted)"/><text x="446.0" y="237.0" text-anchor="middle" font-size="11" fill="currentColor">9</text><text x="468.0" y="237.0" text-anchor="end" font-size="13" font-weight="700" fill="currentColor">x₂</text><polyline points="50.0,49.9 52.2,53.7 54.4,57.4 56.6,61.1 58.8,64.7 61.0,68.3 63.2,71.8 65.4,75.3 67.6,78.8 69.8,82.2 72.0,85.6 74.2,88.9 76.4,92.2 78.6,95.5 80.8,98.7 83.0,101.9 85.2,105.0 87.4,108.1 89.6,111.1 91.8,114.1 94.0,117.1 96.2,120.0 98.4,122.9 100.6,125.7 102.8,128.5 105.0,131.3 107.2,134.0 109.4,136.7 111.6,139.3 113.8,141.9 116.0,144.4 118.2,146.9 120.4,149.4 122.6,151.8 124.8,154.1 127.0,156.5 129.2,158.8 131.4,161.0 133.6,163.2 135.8,165.4 138.0,167.5 140.2,169.6 142.4,171.6 144.6,173.6 146.8,175.6 149.0,177.5 151.2,179.3 153.4,181.2 155.6,183.0 157.8,184.7 160.0,186.4 162.2,188.1 164.4,189.7 166.6,191.3 168.8,192.8 171.0,194.3 173.2,195.7 175.4,197.1 177.6,198.5 179.8,199.8 182.0,201.1 184.2,202.3 186.4,203.5 188.6,204.7 190.8,205.8 193.0,206.9 195.2,207.9 197.4,208.9 199.6,209.8 201.8,210.7 204.0,211.6 206.2,212.4 208.4,213.2 210.6,213.9 212.8,214.6 215.0,215.3 217.2,215.9 219.4,216.5 221.6,217.0 223.8,217.5 226.0,217.9 228.2,218.3 230.4,218.7 232.6,219.0 234.8,219.2 237.0,219.5 239.2,219.7 241.4,219.8 243.6,219.9 245.8,220.0 248.0,220.0 250.2,220.0 252.4,219.9 254.6,219.8 256.8,219.7 259.0,219.5 261.2,219.2 263.4,219.0 265.6,218.7 267.8,218.3 270.0,217.9 272.2,217.5 274.4,217.0 276.6,216.5 278.8,215.9 281.0,215.3 283.2,214.6 285.4,213.9 287.6,213.2 289.8,212.4 292.0,211.6 294.2,210.7 296.4,209.8 298.6,208.9 300.8,207.9 303.0,206.9 305.2,205.8 307.4,204.7 309.6,203.5 311.8,202.3 314.0,201.1 316.2,199.8 318.4,198.5 320.6,197.1 322.8,195.7 325.0,194.3 327.2,192.8 329.4,191.3 331.6,189.7 333.8,188.1 336.0,186.4 338.2,184.7 340.4,183.0 342.6,181.2 344.8,179.3 347.0,177.5 349.2,175.6 351.4,173.6 353.6,171.6 355.8,169.6 358.0,167.5 360.2,165.4 362.4,163.2 364.6,161.0 366.8,158.8 369.0,156.5 371.2,154.1 373.4,151.8 375.6,149.4 377.8,146.9 380.0,144.4 382.2,141.9 384.4,139.3 386.6,136.7 388.8,134.0 391.0,131.3 393.2,128.5 395.4,125.7 397.6,122.9 399.8,120.0 402.0,117.1 404.2,114.1 406.4,111.1 408.6,108.1 410.8,105.0 413.0,101.9 415.2,98.7 417.4,95.5 419.6,92.2 421.8,88.9 424.0,85.6 426.2,82.2 428.4,78.8 430.6,75.3 432.8,71.8 435.0,68.3 437.2,64.7 439.4,61.1 441.6,57.4 443.8,53.7 446.0,49.9" fill="none" style="stroke:var(--accent)" stroke-width="2.2"/><rect x="160.0" y="35.2" width="176.0" height="184.8" style="fill:var(--fail)" fill-opacity="0.08"/><line x1="50" y1="186.4" x2="468.0" y2="186.4" style="stroke:var(--shaky)" stroke-dasharray="6 4" stroke-width="2"/><text x="468.0" y="180.4" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--shaky)">one cut</text><line x1="248.0" y1="220" x2="248.0" y2="207.4" style="stroke:var(--muted)" stroke-dasharray="2 3"/><text x="248.0" y="47.2" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">center 4.5</text><text x="58.0" y="43.6" text-anchor="start" font-size="13" font-weight="700" style="fill:var(--accent-ink)">(x₂ − 4.5)²</text><rect x="88.0" y="111.1" width="12" height="12" style="fill:var(--accent)"/><text x="82.0" y="121.1" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--accent-ink)">6</text><rect x="132.0" y="161.5" width="12" height="12" style="fill:var(--accent)"/><text x="126.0" y="171.5" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--accent-ink)">1, 4</text><path d="M182.0,193.1 L190.0,201.1 L182.0,209.1 L174.0,201.1 Z" style="fill:var(--fail)"/><text x="170.0" y="205.1" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--fail)">2, 5</text><path d="M314.0,193.1 L322.0,201.1 L314.0,209.1 L306.0,201.1 Z" style="fill:var(--fail)"/><text x="326.0" y="205.1" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--fail)">7, 8</text><rect x="396.0" y="111.1" width="12" height="12" style="fill:var(--accent)"/><text x="414.0" y="121.1" text-anchor="start" font-size="12" font-weight="700" style="fill:var(--accent-ink)">3</text></svg></div>
<p><b>3. Why squaring works.</b> \(x_2 - 4.5\) is \(-1.5\) at \(x_2 = 3\) and \(+1.5\) at \(x_2 = 6\). Squaring kills the sign: both give 2.25, small. The blues are far away on <b>either</b> side, so they come out big. One horizontal cut does it.</p>
<p><b>4. Why the \(b\)'s.</b> The band is in \(x_2\), so it goes in the second coordinate: \((x_2 - 4.5)^2 = x_2^2 - 9x_2 + 20.25\). The form has no constant, but dropping 20.25 lowers everyone by the same amount: the order stays, only the cut moves.</p>
<p><b>So:</b> the \(b\)'s make \(x_2^2 - 9x_2\), the \(a\)'s don't matter.</p>`,
      start: R`<p><b>Key idea:</b> R \(\iff x_2 \in (2.5, 6.5) \iff (x_2 - 4.5)^2 \lt 4 \iff x_2^2 - 9x_2 \lt -16.25\). So \(b_2 = 1\), \(b_1 = -9\) (\(a\)'s anything), and one cut at \(-16\) on the second mapped feature separates red from blue.</p>
<p><b>The pattern:</b> \(y = \text{R} \iff x_2 \in (\square, \square)\)</p>
<p><b>Close to the center:</b></p>\[\begin{aligned}(x_2 - \square)^2 \lt \square &\iff x_2^2 - \square\,x_2 + \square \lt \square\\ &\iff x_2^2 - \square\,x_2 \lt \square\end{aligned}\]
<p><b>Coefficients:</b> \(a_1 = \square,\ a_2 = \square,\ b_1 = \square,\ b_2 = \square\)</p>
<p><b>Split:</b> □</p>
<p><b>Why zero error:</b> □</p>`,
      answer: R`<p><b>Key idea:</b> R \(\iff x_2 \in (2.5, 6.5) \iff (x_2 - 4.5)^2 \lt 4 \iff x_2^2 - 9x_2 \lt -16.25\). So \(b_2 = 1\), \(b_1 = -9\) (\(a\)'s anything), and one cut at \(-16\) on the second mapped feature separates red from blue.</p>
<p><b>The pattern:</b> \(y = \text{R} \iff x_2 \in (2.5, 6.5)\)</p>
<p><b>Close to the center:</b></p>\[\begin{aligned}(x_2 - 4.5)^2 \lt 4 &\iff x_2^2 - 9x_2 + 20.25 \lt 4\\ &\iff x_2^2 - 9x_2 \lt -16.25\end{aligned}\]
<p><b>Coefficients:</b> \(a_1 = 0,\ a_2 = 0\) (any values work), \(b_1 = -9,\ b_2 = 1\), so \(\varphi(x_1, x_2) = (0,\ x_2^2 - 9x_2)\)</p>
<p><b>Split:</b> second mapped feature \(\lt -16\) → R, else B</p>
<p><b>Why zero error:</b> \(x_2^2 - 9x_2\) is \(-18\) for every red (\(x_2 = 3, 6\)) and \(-8, -14, -8\) for the blues (\(x_2 = 1, 2, 8\)), so \(-16\) separates them.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> One split = one threshold. Reds are a middle band of \(x_2\), so I need a feature small inside it, large outside. The form's \(b_2x_2^2 + b_1x_2\) is a U: bottom at the band's center.`,
          extra: [{ label: "how to find this direction yourself", html: R`<p>Ask yourself these, in order:</p>
<p><b>1. What can one cut do?</b> One cut = "is this number \(\lt t\)?": it splits a number line into left | right. So I need <b>one number</b> with all reds on one side, all blues on the other.</p>
<p><b>2. Can a feature I already have do it?</b> Write the colours along each line.<br>\(x_1\): samples 2 (R) and 3 (B) both sit at 3 → hopeless.<br>\(x_2\) (1, 2, 2, 3, 3, 6, 6, 8): B B B R R R R B → the reds are a <b>middle chunk</b>. A middle chunk needs two cuts.</p>
<p><b>3. What turns "middle vs ends" into "small vs big"?</b> Distance from the middle: middle points are close (small), both ends are far (big). The two ends become one group.</p>
<p><b>4. Does the given form hint at it?</b> \(b_2x_2^2 + b_1x_2\) is a parabola, a U: low in the middle, high at both ends. The \(x^2\) is the hint.</p>
<p><b>5. Mechanical from here:</b> center of the red chunk (4.5) → \((x_2 - 4.5)^2\) → expand → match \(b_2, b_1\) → table → cut.</p>
<p><b>Rule to keep:</b> reds in a middle band (or inside a circle) + a mapping with squares → squared distance from the center. Same idea as the circle in 2025C Q3.5, there in 2D.</p>` },
          { label: "your Moed B answer (1/5)", html: R`<p>You plugged single points into \(\varphi\) with the unknown \(a\)'s and \(b\)'s: 8 expressions and no direction. Write the interval first; the coefficients fall out of it.</p>` }] },
        { line: R`<b>The pattern</b> — reds have \(x_2 \in \{3, 6\}\), blues \(x_2 \in \{1, 2, 8\}\). So red \(\iff x_2 \in (2.5,\ 6.5)\).`,
          why: R`<p>Any upper end between 6 and 8 works (part 2 used the midpoint 7); 6.5 puts the center at a round 4.5.</p>` },
        { line: R`<b>Close to the center, then expand</b> — center 4.5, half-width 2; the form has no constant, so 20.25 moves right: <div class="formula">\[\begin{aligned}x_2 \in (2.5,\ 6.5) &\iff (x_2 - 4.5)^2 \lt 4\\ &\iff x_2^2 - 9x_2 + 20.25 \lt 4\\ &\iff x_2^2 - 9x_2 \lt -16.25\end{aligned}\]</div>`,
          why: R`<p>Inside the interval = less than 2 away from 4.5: \(|x_2 - 4.5| \lt 2\), and squaring both sides gives \((x_2 - 4.5)^2 \lt 4\). Expand: \((x_2 - 4.5)^2 = x_2^2 - 2\cdot 4.5\cdot x_2 + 4.5^2 = x_2^2 - 9x_2 + 20.25\).</p>` },
        { line: R`<b>Select the pieces</b> — which coordinate is built from \(x_2\)? <div class="formula">\[\varphi(x_1, x_2) = \big(\underbrace{\color{#4c8dff}a_2x_1^2 + a_1x_1}_{\textstyle\color{#4c8dff}\text{only }x_1}\,,\ \underbrace{\color{#e8912d}b_2x_2^2 + b_1x_2}_{\textstyle\color{#e8912d}\text{this part = }x_2^2 - 9x_2}\big)\]</div>So \(b_2 = 1\), \(b_1 = -9\); \(a_1, a_2\) anything, e.g. 0.` },
        { line: R`<b>The split</b> — second coordinate \(\lt -16\) → R, else B. Check: <div class="tw"><table><tbody>
<tr><td>\(x_2\)</td><td>1</td><td>2</td><td>3</td><td>6</td><td>8</td></tr>
<tr><td>\(x_2^2 - 9x_2\)</td><td>−8</td><td>−14</td><td>−18</td><td>−18</td><td>−8</td></tr>
<tr><td>\(y\)</td><td>B</td><td>B</td><td>R</td><td>R</td><td>B</td></tr></tbody></table></div>Reds −18, blues −14 or −8: zero error. Done.`,
          why: R`<p>\(-16\) is the midpoint between −18 and −14, as the question asks.</p>`,
          extra: [{ label: "the official answer puts the coefficients on the wrong feature", html: R`<p>It writes \(\varphi = (x_2^2 - 9x_2, *)\) and sets \(a_1 = -9,\ a_2 = 1\). But the \(a\)'s multiply \(x_1\): that gives \(x_1^2 - 9x_1\). Samples 2 (\(x_1 = 3\), R) and 3 (\(x_1 = 3\), B) both get \(-18\), so no threshold separates them. Its remark "switching \(a_i \leftrightarrow b_i\) can also work" is the correct answer: \(b_2 = 1,\ b_1 = -9\).</p>` }] },
      ],
      compare: R`Steps 2–3 are the official chain. Step 4 differs: the official answer sets \(a_1 = -9,\ a_2 = 1\), which acts on \(x_1\), the wrong feature. The correct coefficients are \(b_2 = 1,\ b_1 = -9\) (its "switch \(a \leftrightarrow b\)" remark).`,
      slip: R`Wrong feature: the \(a\)'s act on \(x_1\), so \(a_1 = -9,\ a_2 = 1\) sends samples 2 (R) and 3 (B), both \(x_1 = 3\), to the same −18. It has to be \(b_2 = 1,\ b_1 = -9\) (its own “switch \(a \leftrightarrow b\)” remark), \(a\)'s anything, and the split is R iff \(x_2^2 - 9x_2 \lt -16\) on the second mapped feature.`,
    },
  });
})();
