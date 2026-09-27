// Walkthroughs for the Decision-tree questions — CASUAL style (spec/WALKS.md):
// the point first, then few moves, plain words, only the lines that earn the points.
// Numbers checked with python3/numpy (log base 2).
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ═════════════════════════════════════════════ 2025-B Q2
    "2025B-q2.1": {
      point: R`<p>Gini only needs the fraction of \(+\) in the data: 4 of 8, so \(p = \tfrac12\). Plug it in.</p>`,
      start: R`<p><b>Count:</b> \(\square\) positive, \(\square\) negative, so \(p = \square\)</p>\[\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2 = \;\square\]`,
      moves: [
        { line: R`<b>Count the labels</b> — the \(y\) column has 4 \(+\) (rows 2, 3, 5, 8) and 4 \(-\), out of 8: \(\;p = \tfrac48 = \tfrac12\).` },
        { line: R`<b>Plug in</b> — the formula from the question: <div class="formula">\[\varphi_{Gini}(\tfrac12) = 1 - \left(\tfrac12\right)^2 - \left(\tfrac12\right)^2 = 1 - \tfrac14 - \tfrac14 = \tfrac12\]</div>Done.`,
          why: R`<p>It's also on the sheet: [sheet: Gini impurity] (with 2 classes, \(p_1 = p\) and \(p_2 = 1-p\)). Plug in the fraction, never the count 4.</p>` },
      ],
      compare: R`Same as the official solution: 4 positive, 4 negative, \(p = \tfrac12\), \(\varphi = \tfrac12\).`,
    },

    "2025B-q2.2": {
      point: R`<p>Reduction = the parent's Gini minus each child's Gini, weighted by its share of the rows. \(X_1\)'s children are as mixed as the parent, so 0; \(X_4\) makes a pure child, so \(\tfrac16\).</p>`,
      start: R`<p><b>The formula:</b></p>\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]
<p><b>For \(X_1\):</b> the children's rows and labels \(\square\), their \(\varphi\) \(\square\), so \(\Delta\varphi(S, X_1) = \square\)</p>
<p><b>For \(X_4\):</b> the same, \(\Delta\varphi(S, X_4) = \square\)</p>`,
      moves: [
        { line: R`<b>The formula</b> — before, minus each child weighted by its share of the rows. \(\varphi(S) = \tfrac12\) from part 1: <div class="formula">\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]</div>`,
          why: R`<p>🧠 Know this one by heart: the sheet only has [sheet: Gini impurity], not the reduction. \(S_{A=0}\) = the rows with \(A = 0\).</p>` },
        { line: R`<b>\(X_1\)</b> — both children are 2 \(+\) out of 4, like the parent: <div class="tw"><table><thead><tr><th>child</th><th>rows</th><th>labels</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_1 = 0\)</td><td>1–4</td><td>\(-\,+\,+\,-\)</td><td>\(\tfrac12\)</td></tr>
<tr><td>\(X_1 = 1\)</td><td>5–8</td><td>\(+\,-\,-\,+\)</td><td>\(\tfrac12\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(S, X_1) = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = 0\]</div>`,
          why: R`<p>The children are exactly as mixed as the parent, so the split gained nothing. Part 6 proves this always happens.</p>` },
        { line: R`<b>\(X_4\)</b> — \(X_4 = 1\) is pure, the other child is 2 \(+\) out of 6: <div class="tw"><table><thead><tr><th>child</th><th>rows</th><th>labels</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_4 = 1\)</td><td>3, 5</td><td>\(+\,+\)</td><td>\(0\)</td></tr>
<tr><td>\(X_4 = 0\)</td><td>1, 2, 4, 6, 7, 8</td><td>\(-\,+\,-\,-\,-\,+\)</td><td>\(1 - \tfrac19 - \tfrac49 = \tfrac49\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(S, X_4) = \tfrac12 - \tfrac28\cdot 0 - \tfrac68\cdot\tfrac49 = \tfrac12 - \tfrac13 = \tfrac16\]</div>Done.`,
          why: R`<p>\(X_4 = 0\): \(p = \tfrac26 = \tfrac13\), so \(\varphi = 1 - \left(\tfrac13\right)^2 - \left(\tfrac23\right)^2 = 1 - \tfrac19 - \tfrac49 = \tfrac49\). And \(\tfrac68\cdot\tfrac49 = \tfrac{24}{72} = \tfrac13\).</p>` },
      ],
      compare: R`Same steps as the official solution; the last lines of moves 2 and 3 are its bold \(\mathbf 0\) and \(\tfrac16\).`,
    },

    "2025B-q2.3": {
      point: R`<p>Depth 1 fails: every feature puts a \(+\) and a \(-\) in the same leaf. The \(+\) rows are exactly the rows with \(X_3 = 1\) or \(X_4 = 1\), so asking those two questions is enough: depth 2.</p>`,
      moves: [
        { line: R`<b>Depth 1 fails</b> — every feature's 0-child holds row 1 \((-)\) and a \(+\) row: \(X_1, X_2, X_4\): rows 1 and 2. \(X_3\): rows 1 and 3.`,
          why: R`<p>A depth-1 tree has one question. Two rows with the same answer land in the same leaf, and a leaf has one label, so one of them is wrong.</p>` },
        { line: R`<b>The rule</b> — the \(+\) rows (2, 3, 5, 8) each have \(X_3 = 1\) or \(X_4 = 1\); every \(-\) row has both 0. So \(+ \iff X_3 = 1\) or \(X_4 = 1\).`,
          why: R`<p>Read only the \(+\) rows and look for a 1 they share. Row 2: \(X_3\). Row 3: \(X_4\). Row 5: \(X_4\). Row 8: \(X_3\). Then check the \(-\) rows 1, 4, 6, 7: all have \(X_3 = X_4 = 0\).</p>` },
        { line: R`<b>The tree</b> — ask \(X_3\); if 0, ask \(X_4\). Depth 2: <pre><code>        [X3 ?]
      0 /    \ 1
   [X4 ?]     +     rows 2, 8
  0 /   \ 1
   -     +          rows 3, 5
rows 1,4,6,7</code></pre>Done.`,
          why: R`<p>Every leaf is pure, so zero training error. Depth 1 can't work: every feature's 0-child mixes row 1 \((-)\) with a \(+\) row (move 1). \(X_4\) first, then \(X_3\), works too (the official second tree).</p>` },
      ],
      compare: R`Move 3 is the official first tree (its second tree asks \(X_4\) first), and move 1 is its last sentence.`,
    },

    "2025B-q2.4": {
      point: R`<p>Just follow the tree: ask \(X_3\) (1 → \(+\)); if 0, ask \(X_4\) (1 → \(+\), 0 → \(-\)) (the part-3 tree). Only the features the tree asks about matter.</p>`,
      moves: [
        { line: R`<b>Read the values</b> — \(x = (0, 1, 0, 0)\) means \(X_1 = 0\), \(X_2 = 1\), \(X_3 = 0\), \(X_4 = 0\).` },
        { line: R`<b>Follow the tree</b> — the root asks \(X_3\): it's 0, so go to \(X_4\). \(X_4 = 0\), so leaf \(-\). Prediction: \(-\). Done.`,
          why: R`<p>\(X_1\) and \(X_2\) are never asked. The other tree (\(X_4\) first) also gives \(-\).</p>` },
      ],
      compare: R`Same as the official solution: \(-\) in both trees.`,
    },

    "2025B-q2.5": {
      point: R`<p>Gini is an upside-down parabola in \(p\). Its top is at \(p = \tfrac12\), where it equals \(\tfrac12\), so it can never be bigger than \(\tfrac12\).</p>`,
      start: R`<p><b>The function:</b> \(\;\varphi_{Gini}(p) = \square\)</p>
<p><b>Its derivative:</b> \(\;\varphi'(p) = \square = 0 \;\Rightarrow\; p = \square\)</p>
<p><b>Second derivative:</b> \(\;\varphi''(p) = \square\), so that point is a \(\square\)</p>
<p><b>The value there:</b> \(\;\varphi(\square) = \square\), so \(\varphi_{Gini}(p) \le \tfrac12\)</p>`,
      moves: [
        { line: R`<b>Derivative</b> — of \(\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\). Like \((x^2+3)^2 \to 2\cdot(x^2+3)\cdot 2x\), \((1-p)^2 \to 2(1-p)\cdot(-1)\): <div class="formula">\[\varphi'(p) = -2p + 2(1-p) = 2 - 4p\]</div>It's 0 at \(p = \tfrac12\).`,
          why: R`<p>The minus in front of \((1-p)^2\) and the \(-1\) from inside the bracket cancel: \(-\big[2(1-p)\cdot(-1)\big] = +2(1-p)\).</p>` },
        { line: R`<b>It's a maximum</b> — \(\varphi''(p) = -4 \lt 0\), so the function is concave and \(p = \tfrac12\) is its global maximum.`,
          why: R`<p>Negative second derivative = the curve bends down everywhere, so the one flat point is the top. The grader's note: forgetting this step costs at most ½ point.</p>` },
        { line: R`<b>The value there</b>: <div class="formula">\[\varphi_{Gini}(p) \le \varphi_{Gini}(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\]</div>Done.` },
      ],
      compare: R`Same steps as the official solution: derivative \(2 - 4p\), second derivative \(-4\), value \(\tfrac12\).`,
    },

    "2025B-q2.6": {
      point: R`<p>If both children have proportion \(p\), the parent (both children together) has \(p\) too. Impurity only looks at the proportion, so all three have the same impurity, and before − after = 0.</p>`,
      start: R`<p><b>Names:</b> child sizes \(n^{(1)}, n^{(2)}\), their positives \(n_+^{(1)}, n_+^{(2)}\), the common proportion \(p = \square\)</p>
<p><b>The parent's proportion:</b> \(\dfrac{n_+}{n} = \square = p\)</p>
<p><b>The reduction:</b> \(\Delta\varphi = \square = 0\)</p>`,
      moves: [
        { line: R`<b>Names</b> — child \(v\) has \(n^{(v)}\) samples, \(n_+^{(v)}\) of them positive. The common proportion is \(p\), so positives = \(p\) × size: <div class="formula">\[n_+^{(1)} = p\,n^{(1)} \qquad n_+^{(2)} = p\,n^{(2)}\]</div>`,
          why: R`<p>From \(\frac{n_+^{(1)}}{n^{(1)}} = \frac{n_+^{(2)}}{n^{(2)}} = p\), multiplied out. The \((1)\) is a label (which child), not a power. The official solution uses these names, writing \(n^{(1)}\) as \(n_+^{(1)} + n_-^{(1)}\).</p>` },
        { line: R`<b>The parent has proportion \(p\) too</b> — its positives are both children's positives added: <div class="formula">\[\begin{aligned}\frac{n_+}{n} &= \frac{p\,n^{(1)} + p\,n^{(2)}}{n^{(1)} + n^{(2)}}\\ &= \frac{p\,(n^{(1)} + n^{(2)})}{n^{(1)} + n^{(2)}} = p\end{aligned}\]</div>`,
          why: R`<p>The parent holds both children, so \(n = n^{(1)} + n^{(2)}\) and \(n_+ = n_+^{(1)} + n_+^{(2)}\). This step is the proof: the grader takes off 2 points if you just assume the parent has \(p\).</p>` },
        { line: R`<b>Plug in</b> — impurity depends only on the proportion, so \(\varphi(S) = \varphi(S_1) = \varphi(S_2) = \varphi(p)\): <div class="formula">\[\begin{aligned}\Delta\varphi &= \varphi(p) - \frac{n^{(1)}}{n}\varphi(p) - \frac{n^{(2)}}{n}\varphi(p)\\ &= \varphi(p)\Big(1 - \underbrace{\color{#e8912d}\frac{n^{(1)} + n^{(2)}}{n}}_{\textstyle\color{#e8912d}\text{this part = 1}}\Big) = 0\end{aligned}\]</div>Done.`,
          why: R`<p>Gini, entropy, any impurity is a function of the proportion only. That's why it holds "regardless of the impurity measure". Doing it only for Gini costs ½–1 point.</p>` },
      ],
      compare: R`Same steps as the official solution. Its second denominator has a typo: it numbers the children (0), (1) instead of (1), (2); it should read \(n_+^{(1)} + n_-^{(1)} + n_+^{(2)} + n_-^{(2)}\).`,
    },

    // ═════════════════════════════════════════════ 2025-C Q2
    "2025C-q2.1": {
      point: R`<p>Gini only needs the fraction of likes: 3 of 6, so \(p = \tfrac12\). Plug it in.</p>`,
      start: R`<p><b>Count:</b> \(\square\) likes, \(\square\) dislikes, so \(p = \square\)</p>\[\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2 = \;\square\]`,
      moves: [
        { line: R`<b>Count the reactions</b> — likes: instances 2, 5, 6. Dislikes: 1, 3, 4. So \(p = \tfrac36 = \tfrac12\).` },
        { line: R`<b>Plug in</b> — [sheet: Gini impurity]: <div class="formula">\[\varphi_{Gini}(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\]</div>Done.` },
      ],
      compare: R`Same as the official solution.`,
    },

    "2025C-q2.2": {
      point: R`<p>Genre makes 3 children, one per genre. Comedy and Drama are pure (Gini 0), only Action is mixed. So the reduction is the parent's \(\tfrac12\) minus Action's weighted Gini.</p>`,
      start: R`\[\Delta\varphi(\text{Genre}) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v) = \;\square\]`,
      moves: [
        { line: R`<b>Children</b> — each holds 2 of the 6 instances: <div class="tw"><table><thead><tr><th>child</th><th>instances</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>Action</td><td>\(1-,\ 2+\)</td><td>\(\tfrac12\)</td></tr>
<tr><td>Comedy</td><td>\(3-,\ 4-\)</td><td>\(0\)</td></tr>
<tr><td>Drama</td><td>\(5+,\ 6+\)</td><td>\(0\)</td></tr></tbody></table></div>`,
          why: R`<p>A pure child: \(1 - 1^2 - 0^2 = 0\). Half and half: \(1 - \tfrac14 - \tfrac14 = \tfrac12\) (as in part 1).</p>` },
        { line: R`<b>Plug in</b> — one term per genre, \(\varphi(S) = \tfrac12\) from part 1: <div class="formula">\[\begin{aligned}\Delta\varphi(\text{Genre}) &= \tfrac12 - \left(\tfrac26\cdot\tfrac12 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= \tfrac12 - \tfrac16 = \tfrac13\end{aligned}\]</div>Done.`,
          why: R`<p>🧠 The reduction formula isn't on the sheet (only [sheet: Gini impurity]): \(\varphi(S) - \sum_v \frac{|S_v|}{|S|}\varphi(S_v)\), with \(v\) = Action, Comedy, Drama.</p>` },
      ],
      compare: R`Same as the official solution.`,
    },

    "2025C-q2.3": {
      point: R`<p>Same children and weights as part 2: Action \(\{1-, 2+\}\), Comedy \(\{3-, 4-\}\), Drama \(\{5+, 6+\}\), 2 of the 6 each. Only the impurity changes: entropy instead of Gini.</p>`,
      start: R`\[\mathrm{IG}(\text{Genre}) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v) = \;\square\]`,
      moves: [
        { line: R`<b>Entropies</b> — [sheet: Entropy]. The parent (3 likes, 3 dislikes) and Action \(\{1-, 2+\}\) are half and half; Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure: <div class="formula">\[\begin{aligned}H(\tfrac12) &= -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\\ H(0) &= H(1) = 0\end{aligned}\]</div>`,
          why: R`<p>\(\log_2\tfrac12 = -1\), because \(2^{-1} = \tfrac12\). A pure node: \(-1\cdot\log_2 1 - 0 = 0\) (\(0\cdot\log 0\) counts as 0).</p>` },
        { line: R`<b>Plug in</b>: <div class="formula">\[\begin{aligned}\mathrm{IG}(\text{Genre}) &= 1 - \left(\tfrac26\cdot 1 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= 1 - \tfrac13 = \tfrac23\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution.`,
    },

    "2025C-q2.4": {
      point: R`<p>No single attribute works. Genre already makes Comedy and Drama pure, and only Action is mixed. One more question (Time) splits Action's two instances, so 2 splits.</p>`,
      moves: [
        { line: R`<b>One split fails</b> — every attribute leaves a mixed child: Genre: Action \(\{1-, 2+\}\). Time: Weekend \(\{1-, 3-, 5+\}\). Age: Young \(\{1-, 2+, 3-\}\).` },
        { line: R`<b>Root = Genre, then Action by Time</b> — Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure. Action's instances differ in Time (Weekend / Weekday), but both are Young.`,
          why: R`<p>Time or Age at the root leaves <b>both</b> children mixed, so each needs another split: at least 3.</p>` },
        { line: R`<b>The tree</b> — 2 splits, zero error: <pre><code>Genre?
├─ Action → Time?
│     ├─ Weekend → dislike   1
│     └─ Weekday → like      2
├─ Comedy → dislike          3, 4
└─ Drama  → like             5, 6</code></pre>Done.`,
          extra: [{ label: "official slip: \"Age\"", html: R`<p>The official text says the Action instances "can be split according to the Age attribute", but its drawing uses Time. The drawing is right: instances 1 and 2 are both Young.</p>` }] },
      ],
      compare: R`Move 3 is the official tree. Its text says "Age" for the second split, but its drawing (and move 2) use Time, which is the correct one.`,
    },

    "2025C-q2.5": {
      point: R`<p>Pruning to the root keeps only the Genre question. The removed question (Time) was under Action, and a Comedy instance never goes there, so the prediction can't change.</p>`,
      moves: [
        { line: R`<b>The pruned tree</b> — Genre only; each child is a leaf with its majority label. Comedy \(\{3-, 4-\}\) → dislike. So the instance goes Genre = Comedy → <b>dislike (−)</b>.`,
          why: R`<p>Pruning a node = replace it by a leaf labelled with the majority of the training rows that reach it. Action \(\{1-, 2+\}\) is a 1–1 tie, but this instance never goes there.</p>` },
        { line: R`<b>Did pruning change it?</b> No. The unpruned tree (part 4) asks Genre, then Time only under Action; Comedy was already a leaf (−). Pruning only removed the Time question under Action. Done.` },
      ],
      compare: R`Same as the official solution: dislike (−) in both the pruned and the unpruned tree.`,
    },

    "2025C-q2.6": {
      point: R`<p>Hide one instance; predict it with the majority of the <b>other</b> instances in its branch (tie → dislike). Do it for all 6, count the misses. The attribute with the fewest misses wins.</p>`,
      start: R`<p>For each attribute, one row per left-out instance:</p>
<div class="tw"><table><thead><tr><th>left out</th><th>rest of its branch → prediction</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\square\)</td><td>\(\square\)</td></tr><tr><td>…</td><td>…</td><td>…</td></tr></tbody></table></div>
<p>CV error \(= \dfrac{\#\text{errors}}{6} = \square\)</p>`,
      moves: [
        { line: R`<b>Genre</b>: <div class="tw"><table><thead><tr><th>out</th><th>rest → predicts</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\{2+\} \to +\)</td><td>\(-\) ✗</td></tr><tr><td>2</td><td>\(\{1-\} \to -\)</td><td>\(+\) ✗</td></tr>
<tr><td>3</td><td>\(\{4-\} \to -\)</td><td>\(-\)</td></tr><tr><td>4</td><td>\(\{3-\} \to -\)</td><td>\(-\)</td></tr>
<tr><td>5</td><td>\(\{6+\} \to +\)</td><td>\(+\)</td></tr><tr><td>6</td><td>\(\{5+\} \to +\)</td><td>\(+\)</td></tr></tbody></table></div>2 errors: \(\tfrac26 = \tfrac13\).`,
          why: R`<p>The branch is recounted <b>without</b> the left-out instance. That's the whole point of leave-one-out: otherwise every prediction looks right.</p>` },
        { line: R`<b>Time</b> (ties → −): <div class="tw"><table><thead><tr><th>out</th><th>rest → predicts</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\{3-,5+\} \to -\)</td><td>\(-\)</td></tr><tr><td>2</td><td>\(\{4-,6+\} \to -\)</td><td>\(+\) ✗</td></tr>
<tr><td>3</td><td>\(\{1-,5+\} \to -\)</td><td>\(-\)</td></tr><tr><td>4</td><td>\(\{2+,6+\} \to +\)</td><td>\(-\) ✗</td></tr>
<tr><td>5</td><td>\(\{1-,3-\} \to -\)</td><td>\(+\) ✗</td></tr><tr><td>6</td><td>\(\{2+,4-\} \to -\)</td><td>\(+\) ✗</td></tr></tbody></table></div>4 errors: \(\tfrac46 = \tfrac23\).` },
        { line: R`<b>Age</b> (ties → −): <div class="tw"><table><thead><tr><th>out</th><th>rest → predicts</th><th>truth</th></tr></thead><tbody>
<tr><td>1</td><td>\(\{2+,3-\} \to -\)</td><td>\(-\)</td></tr><tr><td>2</td><td>\(\{1-,3-\} \to -\)</td><td>\(+\) ✗</td></tr>
<tr><td>3</td><td>\(\{1-,2+\} \to -\)</td><td>\(-\)</td></tr><tr><td>4</td><td>\(\{5+,6+\} \to +\)</td><td>\(-\) ✗</td></tr>
<tr><td>5</td><td>\(\{4-,6+\} \to -\)</td><td>\(+\) ✗</td></tr><tr><td>6</td><td>\(\{4-,5+\} \to -\)</td><td>\(+\) ✗</td></tr></tbody></table></div>4 errors: \(\tfrac46 = \tfrac23\).` },
        { line: R`<b>Pick the best</b> — Genre has the smallest CV error, \(\tfrac13\). Done.` },
      ],
      compare: R`Same counts as the official table (2, 4, 4, so Genre). Its Time / instance 6 cell says "+ (Err)", but without 6 the Weekday branch is \(\{2+, 4-\}\), a tie, so the prediction is − (move 2). Still an error, so the count of 4 stands.`,
    },

    // ═════════════════════════════════════════════ 2025-A Q3
    "2025A-q3.1": {
      point: R`<p>Depth 1 = one question. Every feature has a branch with both a \(+\) and a \(-\), so no single question gets everything right.</p>`,
      moves: [
        { line: R`<b>No</b> — one mixed branch per feature: \(X_1 = 1\): samples 2, 3 \((+)\) and 4 \((-)\). \(X_2 = 1\): 3 \((+)\), 4 \((-)\). \(X_3 = 1\): 2 \((+)\), 4 \((-)\).`,
          why: R`<p>Samples in the same branch land in the same leaf and get the same label, so one of them is wrong.</p>` },
        { line: R`<b>So</b> any depth-1 tree misclassifies at least one sample. Done.` },
      ],
      compare: R`Same pairs as the official solution.`,
    },

    "2025A-q3.2": {
      point: R`<p>The four samples have four different \((X_2, X_3)\) combinations. So asking \(X_2\), then \(X_3\), gives every sample its own leaf: zero error at depth 2. Depth 1 can't: every feature has a branch with both a \(+\) and a \(-\) (part 1).</p>`,
      moves: [
        { line: R`<b>Look at \((X_2, X_3)\)</b> — samples 1–4 have \((0,0)\), \((0,1)\), \((1,0)\), \((1,1)\). All four are different.`,
          why: R`<p>Two yes/no questions make 4 leaves. If every sample has its own combination, each lands in its own leaf, and each leaf just takes its sample's label.</p>` },
        { line: R`<b>The tree</b> — depth 2, zero error: <pre><code>          [X2?]
       0 /      \ 1
    [X3?]       [X3?]
   0 /  \ 1    0 /  \ 1
    -    +      +    -
   s1   s2     s3   s4</code></pre>Done.`,
          extra: [{ label: "official slip: \"any depth-2 tree that uses X1 has errors\"", html: R`<p>Too strong. \(X_2\) at the root, then \(X_1\) under \(X_2 = 0\) (splits samples 1−, 2+) and \(X_3\) under \(X_2 = 1\) (splits 3+, 4−) has zero error. What's true: \(X_1\) at the <b>root</b> fails, because its child \(\{2+, 3+, 4-\}\) can't be made pure by one more question. And the greedy algorithm does pick \(X_1\) for the root (largest reduction), so it doesn't find a depth-2 tree.</p>` }] },
      ],
      compare: R`Same tree as the official solution (it also allows \(X_3\) at the root). Its remark "any depth-2 tree that uses \(X_1\) has errors" is too strong: only \(X_1\) at the root fails.`,
    },

    "2025A-q3.3": {
      point: R`<p>The tree only asks \(X_2\), then \(X_3\): \(+\) when they differ, \(-\) when they're equal (the part-2 tree). It never asks \(X_1\). So take a training vector, flip \(x_1\) (now it's new, but the tree's answer is the same), and give it the opposite label.</p>`,
      moves: [
        { line: R`<b>A new vector</b> — sample 1 is \((0,0,0)\); flip \(x_1\): \((1,0,0)\). It's not in the training data, and the tree still says \(-\) (\(X_2 = 0\), \(X_3 = 0\)).` },
        { line: R`<b>Give it the opposite label</b>: \((1, 0, 0, +)\). Done.`,
          extra: [{ label: "all four answers, and the official slip", html: R`<div class="tw"><table><thead><tr><th>vector</th><th>tree predicts</th><th>test instance</th></tr></thead><tbody>
<tr><td>(1,0,0)</td><td>−</td><td>(1,0,0,+)</td></tr><tr><td>(0,0,1)</td><td>+</td><td>(0,0,1,−)</td></tr>
<tr><td>(0,1,0)</td><td>+</td><td>(0,1,0,−)</td></tr><tr><td>(0,1,1)</td><td>−</td><td>(0,1,1,+)</td></tr></tbody></table></div>
<p>The official list ends with \((0,0,0,+)\), but \((0,0,0)\) is training sample 1, which the question forbids. The fourth one is \((0,1,1,+)\).</p>` }] },
      ],
      compare: R`\((1,0,0,+)\) is the first instance in the official list. Its fourth, \((0,0,0,+)\), is a slip (that's sample 1); the correct fourth is \((0,1,1,+)\).`,
    },

    "2025A-q3.4": {
      point: R`<p>Just write the IG formula with the counts: every fraction = a count ÷ its node's size, and the parent's counts = the two children's counts added.</p>`,
      start: R`<p><b>Sizes:</b> \(|S_0| = \square\), \(|S_1| = \square\), \(|S| = \square\)</p>
<p><b>Child entropies:</b> \(H(S_0) = \square\), \(H(S_1) = \square\)</p>
<p><b>Parent entropy:</b> \(H(S) = \square\)</p>
<p><b>Plug in:</b></p>\[\begin{aligned}\mathrm{IG}(S, X_7) = H(S) &- \frac{|S_0|}{|S|}H(S_0)\\ &- \frac{|S_1|}{|S|}H(S_1) = \;\square\end{aligned}\]`,
      moves: [
        { line: R`<b>Child entropies</b> — \(|S_0| = p_0 + n_0\), so the fractions are \(\frac{p_0}{p_0+n_0}\) and \(\frac{n_0}{p_0+n_0}\). Into [sheet: Entropy]: <div class="formula">\[\begin{aligned}H(S_0) = &-\frac{p_0}{p_0+n_0}\log\frac{p_0}{p_0+n_0}\\ &-\frac{n_0}{p_0+n_0}\log\frac{n_0}{p_0+n_0}\end{aligned}\]</div>\(H(S_1)\): the same with \(p_1, n_1\).`,
          why: R`<p>Entropy of a node \(= -(\text{fraction }+)\log(\text{fraction }+) - (\text{fraction }-)\log(\text{fraction }-)\), and a fraction = count / node size.</p>` },
        { line: R`<b>Parent entropy</b> — \(p_0 + p_1\) positives and \(n_0 + n_1\) negatives, out of \(|S| = p_0 + p_1 + n_0 + n_1\): <div class="formula">\[\begin{aligned}H(S) = &-\frac{p_0+p_1}{|S|}\log\frac{p_0+p_1}{|S|}\\ &-\frac{n_0+n_1}{|S|}\log\frac{n_0+n_1}{|S|}\end{aligned}\]</div>`,
          why: R`<p>The parent holds <b>both</b> children, so its positives are \(p_0 + p_1\), not \(p_0\).</p>` },
        { line: R`<b>Plug in</b> — moves 1 and 2 into the formula (\(|S_1| = p_1 + n_1\)): <div class="formula">\[\begin{aligned}\mathrm{IG}(S, X_7) = H(S) &- \frac{p_0+n_0}{|S|}H(S_0)\\ &- \frac{p_1+n_1}{|S|}H(S_1)\end{aligned}\]</div>That's a full answer.` },
        { line: R`<b>Select the pieces</b> (optional, the official last line) — the weight times a fraction cancels: <div class="formula">\[\underbrace{\color{#e8912d}\frac{p_0+n_0}{|S|}\cdot\frac{p_0}{p_0+n_0}}_{\textstyle\color{#e8912d}\text{this part = }\frac{p_0}{|S|}}\]</div>so: <div class="formula">\[\begin{aligned}\mathrm{IG}(S, X_7) = H(S) &+ \frac{p_0}{|S|}\log\frac{p_0}{p_0+n_0}\\ &+ \frac{n_0}{|S|}\log\frac{n_0}{p_0+n_0}\\ &+ \frac{p_1}{|S|}\log\frac{p_1}{p_1+n_1}\\ &+ \frac{n_1}{|S|}\log\frac{n_1}{p_1+n_1}\end{aligned}\]</div>Done.`,
          why: R`<p>The minus of \(-\frac{p_0+n_0}{|S|}H(S_0)\) and the minus inside \(H(S_0)\) make a plus. The same happens for all four terms.</p>`,
          extra: [{ label: "check it with numbers", html: R`<p>2025-A's first dataset split by \(X_1\): \(p_0 = 0,\ n_0 = 1,\ p_1 = 2,\ n_1 = 1\), \(|S| = 4\). \(H(S) = 1\) (2 and 2).</p>
<div class="tw"><table><thead><tr><th>term</th><th>value</th></tr></thead><tbody>
<tr><td>\(\frac04\log_2 0\)</td><td>0 (\(0\log 0 = 0\))</td></tr>
<tr><td>\(\frac14\log_2 1\)</td><td>0</td></tr>
<tr><td>\(\frac24\log_2\frac23\)</td><td>\(0.5\cdot(-0.585) = -0.2925\)</td></tr>
<tr><td>\(\frac14\log_2\frac13\)</td><td>\(0.25\cdot(-1.585) = -0.3962\)</td></tr></tbody></table></div>
<p>\(\mathrm{IG} = 1 - 0.2925 - 0.3962 = 0.311\). Directly: \(1 - \tfrac34 H(\tfrac23) = 1 - 0.75\cdot 0.9183 = 0.311\). Same.</p>` }] },
      ],
      compare: R`The official solution is moves 1–3, then the six-term line of move 4 (with \(H(S)\) written out and \(|S|\) as the full sum). The question writes plain "log"; any base is accepted.`,
    },

    "2025A-q3.5": {
      point: R`<p>Same fraction in both children, so the parent (both children together) has that fraction too. Entropy only looks at the fraction, so all three entropies are equal, and before − after = 0.</p>`,
      start: R`<p><b>The children's positive fraction:</b> \(\frac{p_0}{p_0+n_0} = \frac{p_1}{p_1+n_1} = r\)</p>
<p><b>The parent's positive fraction:</b> \(\frac{p_0+p_1}{|S|} = \square = r\)</p>
<p><b>Plug in:</b> \(\mathrm{IG}(S, X_7) = \square = 0\)</p>`,
      moves: [
        { line: R`<b>Positive fractions are equal too</b> — each is 1 minus the negative fraction. Call it \(r\) (the official name); multiplied out: <div class="formula">\[p_0 = r\,(p_0+n_0) \qquad p_1 = r\,(p_1+n_1)\]</div>` },
        { line: R`<b>The parent has fraction \(r\) too</b> — add the two (the parent holds both children, so \(|S| = p_0+n_0+p_1+n_1\)):<div class="formula">\[\frac{p_0+p_1}{|S|} = \frac{r\,(p_0+n_0+p_1+n_1)}{p_0+n_0+p_1+n_1} = r\]</div>`,
          why: R`<p>This is the step that proves something: the parent's fraction is not given, it follows from the children.</p>` },
        { line: R`<b>Plug in</b> — entropy depends only on the fraction, so all three are \(H(r)\): <div class="formula">\[\begin{aligned}\mathrm{IG} &= H(r) - \frac{|S_0|}{|S|}H(r) - \frac{|S_1|}{|S|}H(r)\\ &= H(r)\Big(1 - \underbrace{\color{#e8912d}\frac{|S_0| + |S_1|}{|S|}}_{\textstyle\color{#e8912d}\text{this part = 1}}\Big) = 0\end{aligned}\]</div>Done.`,
          why: R`<p>[sheet: Entropy] with 2 classes: \(H(r) = -r\log r - (1-r)\log(1-r)\). It only sees \(r\). Same proof as 2025-B Q2.6.</p>` },
      ],
      compare: R`The official solution states move 2 without the adding step, then plugs \(r\) into the part-4 formula and shows each bracket is 0. Different route, same result; both prove the claim.`,
    },

    // ═════════════════════════════════════════════ 2026-A Q2
    "2026A-q2.1": {
      point: R`<p>\(y = +\) exactly when \(x_2 \ne x_3\). So ask \(X_2\), then \(X_3\): every leaf is pure. Depth 1 fails because every feature puts a \(+\) and a \(-\) on the same branch.</p>`,
      moves: [
        { line: R`<b>The rule</b> — \((x_2, x_3)\): \(+\) samples 2, 3, 5 have \((0,1), (1,0), (1,0)\); \(-\) samples 1, 4 have \((0,0), (1,1)\). So \(+ \iff x_2 \ne x_3\).`,
          why: R`<p>Found by trying pairs of features. A pair works when samples with the same combination have the same label. Here only 3 and 5 share \((1,0)\), and both are \(+\).</p>` },
        { line: R`<b>The tree</b> — every leaf is pure: <pre><code>          [X2?]
       0 /      \ 1
    [X3?]       [X3?]
   0 /  \ 1    0 /  \ 1
    -    +      +     -
   s1   s2    s3,s5   s4</code></pre>` },
        { line: R`<b>No depth-1 tree</b> — one pair per feature: \(X_1 = 1\): samples 3, 4. \(X_2 = 0\): 1, 2. \(X_3 = 0\): 1, 3. \(X_4 = 1\): 1, 3. Same branch, different labels. Done.` },
      ],
      compare: R`Same tree and same pairs as the official solution.`,
    },

    "2026A-q2.2": {
      point: R`<p>Look for a feature whose split is perfect except for one sample. \(X_1 = 1\) holds three \(+\) and a single \(-\) (sample 4), so remove sample 4.</p>`,
      moves: [
        { line: R`<b>\(X_1\) is off by one</b> — \(X_1 = 0\) is \(\{1-\}\), pure. \(X_1 = 1\) is \(\{2+, 3+, 4-, 5+\}\): only sample 4 is \(-\).`,
          why: R`<p>Go through the features and look for a child that would be pure without a single sample. \(X_1\) is the only one that works.</p>` },
        { line: R`<b>Remove sample 4</b> — the stump: \(X_1 = 0 \to -\) (sample 1), \(\;X_1 = 1 \to +\) (samples 2, 3, 5). Done.` },
      ],
      compare: R`Same answer as the official solution. It prints "X1=0 → −" twice; the second should be \(X_1 = 1 \to +\) (samples 2, 3, 5).`,
    },

    "2026A-q2.3": {
      point: R`<p>Reduction = the parent's Gini minus each child's Gini, weighted by its share of the samples. The parent is 3 \(+\) and 2 \(-\), so it starts at 0.48, not \(\tfrac12\).</p>`,
      start: R`<p><b>Root:</b> \(\varphi(S) = \square\)</p>
<p><b>\(X_1\):</b> children \(\square\), \(\;\Delta\varphi(X_1) = \square\)</p>
<p><b>\(X_4\):</b> children \(\square\), \(\;\Delta\varphi(X_4) = \square\)</p>`,
      moves: [
        { line: R`<b>The root</b> — 3 \(+\) (samples 2, 3, 5) and 2 \(-\) out of 5, [sheet: Gini impurity]: <div class="formula">\[\varphi(S) = 1 - 0.6^2 - 0.4^2 = 1 - 0.36 - 0.16 = 0.48\]</div>`,
          why: R`<p>The reduction = before − each child weighted by its share of samples (🧠 know by heart, not on the sheet).</p>` },
        { line: R`<b>\(X_1\)</b> — children: <div class="tw"><table><thead><tr><th>child</th><th>samples</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_1 = 0\)</td><td>\(1-\)</td><td>\(0\)</td></tr>
<tr><td>\(X_1 = 1\)</td><td>\(2+,3+,4-,5+\)</td><td>\(1 - 0.75^2 - 0.25^2 = 0.375\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(X_1) = 0.48 - \tfrac15\cdot 0 - \tfrac45\cdot 0.375 = 0.18\]</div>` },
        { line: R`<b>\(X_4\)</b> — children: <div class="tw"><table><thead><tr><th>child</th><th>samples</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_4 = 0\)</td><td>\(2+,4-,5+\)</td><td>\(1 - \tfrac49 - \tfrac19 = \tfrac49 \approx 0.444\)</td></tr>
<tr><td>\(X_4 = 1\)</td><td>\(1-,3+\)</td><td>\(1 - 0.5^2 - 0.5^2 = 0.5\)</td></tr></tbody></table></div><div class="formula">\[\Delta\varphi(X_4) = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.0133\]</div>Done.`,
          why: R`<p>\(\tfrac35\cdot\tfrac49 = \tfrac{12}{45} = 0.2667\) and \(\tfrac25\cdot 0.5 = 0.2\), so \(0.48 - 0.2667 - 0.2 = 0.0133\). Keep \(\tfrac49\) as a fraction: \(0.6\cdot 0.444\) would give 0.0136.</p>` },
      ],
      compare: R`Same numbers as the official solution (0.18 and 0.0133). It writes \(\tfrac35\cdot 0.444\), which strictly gives 0.0136; with \(\tfrac49\) it's 0.0133.`,
    },

    "2026A-q2.4": {
      point: R`<p>The algorithm must pick the attribute with the <b>largest</b> reduction, and must put the new children <b>into the queue</b> so they get processed too.</p>`,
      moves: [
        { line: R`<b>Faulty: step b.3.ii</b> — "smallest impurity reduction" → <b>largest</b>. We want the question that removes the most impurity.` },
        { line: R`<b>Omitted: step b.3.iii</b> — after making the children, <b>add each child of \(v\) to the queue \(Q\)</b>. Otherwise the loop ends after the root, and nothing below it is ever checked or split. Done.` },
      ],
      compare: R`Same two corrections as the official solution.`,
    },

    "2026A-q2.5": {
      point: R`<p>One iteration = pop the root, score <b>every</b> attribute, split by the best one, and push its children into the queue. \(X_1\) wins (0.18).</p>`,
      moves: [
        { line: R`<b>Pop the root</b> — \(S\) = samples 1–5, mixed, so not a leaf. Part 3 gave \(\Delta\varphi(X_1) = 0.18\), \(\Delta\varphi(X_4) = 0.0133\); now \(X_2\), \(X_3\): <div class="tw"><table><thead><tr><th>child</th><th>samples</th><th>\(\varphi\)</th></tr></thead><tbody>
<tr><td>\(X_2 = 0\)</td><td>\(1-,2+\)</td><td>\(0.5\)</td></tr><tr><td>\(X_2 = 1\)</td><td>\(3+,4-,5+\)</td><td>\(\tfrac49\)</td></tr>
<tr><td>\(X_3 = 0\)</td><td>\(1-,3+,5+\)</td><td>\(\tfrac49\)</td></tr><tr><td>\(X_3 = 1\)</td><td>\(2+,4-\)</td><td>\(0.5\)</td></tr></tbody></table></div>`,
          why: R`<p>The algorithm scores <b>every</b> attribute, not just the two from part 3. A 1–1 child: \(1 - 0.5^2 - 0.5^2 = 0.5\). A 2–1 child: \(1 - \left(\tfrac23\right)^2 - \left(\tfrac13\right)^2 = 1 - \tfrac49 - \tfrac19 = \tfrac49\).</p>` },
        { line: R`<b>Both reductions</b> — root Gini \(1 - 0.6^2 - 0.4^2 = 0.48\) (3 \(+\), 2 \(-\)); one child of 2 at 0.5, one of 3 at \(\tfrac49\): <div class="formula">\[\begin{aligned}\Delta\varphi(X_2) = \Delta\varphi(X_3) &= 0.48 - \tfrac25\cdot 0.5 - \tfrac35\cdot\tfrac49\\ &= 0.0133\end{aligned}\]</div>` },
        { line: R`<b>Pick \(X_1\), push the children</b> — 0.18 beats 0.0133. \(v_1 = \{x^{(1)}\}\), \(v_2 = \{x^{(2)}, x^{(3)}, x^{(4)}, x^{(5)}\}\): <pre><code>      v_root [X1 ?]
        0 /     \ 1
        v1       v2
       {1}    {2,3,4,5}</code></pre>\(Q = [v_1, v_2]\). Done.`,
          why: R`<p>\(v_1\) is pure, but it becomes a leaf only when it's popped, in the next iteration. After iteration 1 it's just waiting in \(Q\).</p>` },
      ],
      compare: R`Same result as the official solution: \(X_1\), \(v_1 = \{x^{(1)}\}\), \(v_2 = \{x^{(2)},\dots,x^{(5)}\}\), \(Q = \{v_1, v_2\}\). Its slips: it swaps the children of \(X_2\) and \(X_3\) (\(X_2 = 0\) is 0.5, not 0.444; same final 0.0133), says "computed in (1)" instead of (3), and labels both branches \(v_1\) in the drawing.`,
    },

    // ═════════════════════════════════════════════ 2026-B Q2 (your Moed B question)
    "2026B-q2.1": {
      point: R`<p>A real-valued feature is split by a threshold. Try every midpoint between consecutive distinct values, compute the IG of each, and keep the largest.</p>`,
      start: R`<p><b>Parent:</b> \(H(S) = \square\). <b>Candidates:</b> \(\square\)</p>
<div class="tw"><table><thead><tr><th>\(t\)</th><th>left \(X_1 \lt t\)</th><th>\(H\)</th><th>right</th><th>\(H\)</th><th>IG</th></tr></thead><tbody>
<tr><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr></tbody></table></div>
<p><b>Best:</b> \(X_1 = \square\) with IG \(= \square\)</p>`,
      moves: [
        { line: R`<b>Parent and candidates</b> — 4 B, 4 R, so \(H(S) = 1\) ([sheet: Entropy]). Distinct \(X_1\) values 2, 3, 4, 5, 6, 8 → midpoints 2.5, 3.5, 4.5, 5.5, 7.`,
          why: R`<p>\(H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\). Any \(t\) between 4 and 5 sends the same samples left, so one candidate per gap is enough. 3 and 6 appear twice but count once.</p>` },
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
<tr><td>7</td><td>\(1 - \tfrac78\cdot 0.985 - \tfrac18\cdot 0 = 0.138\)</td></tr></tbody></table></div>Best: \(X_1 = 4.5\), IG \(= 0.189\). Done.` },
      ],
      compare: R`Same numbers as the official solution; its last line is move 3's answer.`,
    },

    "2026B-q2.2": {
      point: R`<p>Sorted by \(X_2\), the reds are a band in the middle (between 2.5 and 7). A band needs two cuts on \(X_2\): one below it, one above it.</p>`,
      moves: [
        { line: R`<b>Sort by \(X_2\)</b>: <div class="tw"><table><tbody>
<tr><td>\(X_2\)</td><td>1</td><td>2</td><td>2</td><td>3</td><td>3</td><td>6</td><td>6</td><td>8</td></tr>
<tr><td>sample</td><td>6</td><td>1</td><td>4</td><td>2</td><td>5</td><td>7</td><td>8</td><td>3</td></tr>
<tr><td>\(y\)</td><td>B</td><td>B</td><td>B</td><td>R</td><td>R</td><td>R</td><td>R</td><td>B</td></tr></tbody></table></div>`,
          why: R`<p>In the chart the reds sit in a horizontal band, with blues below and above. The label changes between 2 and 3 (midpoint 2.5) and between 6 and 8 (midpoint 7), so red \(\iff 2.5 \lt X_2 \lt 7\).</p>` },
        { line: R`<b>The tree</b> — cut at 2.5, then at 7. Depth 2, every leaf pure: <pre><code>        [X2 &lt; 2.5 ?]
      yes /        \ no
        B        [X2 &lt; 7 ?]
    (1,4,6)    yes /     \ no
                 R         B
            (2,5,7,8)     (3)</code></pre>Done.` },
      ],
      compare: R`The official tree asks \(X_2 \lt 7\) first and \(2.5\) second: the same band. Its text says red iff \(x_2 \in (2.5, 6.5)\), also true of the data, but the question wants midpoints, so the tree uses 7.`,
    },

    "2026B-q2.3": {
      point: R`<p>Removing a sample only changes the tree if a threshold depends on it. Only sample 3 is alone above the red band: without it the tree has no upper cut, so it calls sample 3 red. 1 error out of 8.</p>`,
      moves: [
        { line: R`<b>Most rounds keep the part-2 tree</b> — \(X_2 \lt 2.5 \to\) B; else \(X_2 \lt 7 \to\) R, else B. It's right on all 8, so it still has zero error on any 7, and it gets the left-out one right.`,
          why: R`<p>Its thresholds stay available: without any one sample except 3, \(X_2\) still has values on both sides of 2.5 and of 7, so both midpoints are still candidates.</p>` },
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
      point: R`<p>One split only separates small from large, but the reds are a middle band of \(x_2\). The squared distance from the band's center, \((x_2 - 4.5)^2\), is small for reds and large for blues. It's built from \(x_2\), so it goes in the \(b\)'s.</p>`,
      start: R`<p><b>The pattern:</b> \(y = \text{R} \iff x_2 \in (\square, \square)\)</p>
<p><b>Close to the center:</b> \((x_2 - \square)^2 \lt \square \iff x_2^2 - \square\,x_2 \lt \square\)</p>
<p><b>Coefficients:</b> \(a_1 = \square,\ a_2 = \square,\ b_1 = \square,\ b_2 = \square\). <b>Split:</b> \(\square\)</p>`,
      moves: [
        { line: R`<b>The pattern first</b> — reds have \(x_2 \in \{3, 6\}\), blues \(x_2 \in \{1, 2, 8\}\). So red \(\iff x_2 \in (2.5,\ 6.5)\).`,
          why: R`<p>Any upper end between 6 and 8 works (part 2 used the midpoint 7); 6.5 puts the center at a round 4.5.</p>`,
          extra: [{ label: "your Moed B answer (1/5)", html: R`<p>You plugged single points into \(\varphi\) with the unknown \(a\)'s and \(b\)'s: 8 expressions and no direction. Write the interval first; the coefficients fall out of it.</p>` }] },
        { line: R`<b>Close to the center, then expand</b> — center 4.5, half-width 2; the form has no constant, so 20.25 moves right: <div class="formula">\[\begin{aligned}x_2 \in (2.5,\ 6.5) &\iff (x_2 - 4.5)^2 \lt 4\\ &\iff x_2^2 - 9x_2 + 20.25 \lt 4\\ &\iff x_2^2 - 9x_2 \lt -16.25\end{aligned}\]</div>`,
          why: R`<p>Inside the interval = less than 2 away from 4.5: \(|x_2 - 4.5| \lt 2\), and squaring both sides gives \((x_2 - 4.5)^2 \lt 4\). Expand: \((x_2 - 4.5)^2 = x_2^2 - 2\cdot 4.5\cdot x_2 + 4.5^2 = x_2^2 - 9x_2 + 20.25\).</p>` },
        { line: R`<b>Select the pieces</b> — which coordinate is built from \(x_2\)? <div class="formula">\[\varphi(x_1, x_2) = \big(\underbrace{\color{#4c8dff}a_2x_1^2 + a_1x_1}_{\textstyle\color{#4c8dff}\text{only }x_1}\,,\ \underbrace{\color{#e8912d}b_2x_2^2 + b_1x_2}_{\textstyle\color{#e8912d}\text{this part = }x_2^2 - 9x_2}\big)\]</div>So \(b_2 = 1\), \(b_1 = -9\); \(a_1, a_2\) anything, e.g. 0.` },
        { line: R`<b>The split</b> — on the second coordinate: \(x_2^2 - 9x_2 \lt -16\) → R, else B. Check: <div class="tw"><table><tbody>
<tr><td>\(x_2\)</td><td>1</td><td>2</td><td>3</td><td>6</td><td>8</td></tr>
<tr><td>\(x_2^2 - 9x_2\)</td><td>−8</td><td>−14</td><td>−18</td><td>−18</td><td>−8</td></tr>
<tr><td>\(y\)</td><td>B</td><td>B</td><td>R</td><td>R</td><td>B</td></tr></tbody></table></div>Done.`,
          why: R`<p>Every red gives −18, every blue −14 or −8. \(-16\) is the midpoint between −18 and −14, as the question asks.</p>`,
          extra: [{ label: "the official answer puts the coefficients on the wrong feature", html: R`<p>It writes \(\varphi = (x_2^2 - 9x_2, *)\) and sets \(a_1 = -9,\ a_2 = 1\). But the \(a\)'s multiply \(x_1\): that gives \(x_1^2 - 9x_1\). Samples 2 (\(x_1 = 3\), R) and 3 (\(x_1 = 3\), B) both get \(-18\), so no threshold separates them. Its remark "switching \(a_i \leftrightarrow b_i\) can also work" is the correct answer: \(b_2 = 1,\ b_1 = -9\).</p>` }] },
      ],
      compare: R`Moves 1–2 are the official chain. Move 3 differs: the official answer sets \(a_1 = -9,\ a_2 = 1\), which acts on \(x_1\), the wrong feature. The correct coefficients are \(b_2 = 1,\ b_1 = -9\) (its "switch \(a \leftrightarrow b\)" remark).`,
    },
  });
})();
