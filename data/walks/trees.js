// Walkthroughs for the Decision-tree questions — CASUAL style (spec/WALKS.md):
// the point first, then "Begin your answer like this" + the full exam answer, then the steps that build it.
// Numbers checked with python3/numpy (log base 2).
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {

    // ═════════════════════════════════════════════ 2025-B Q2
    "2025B-q2.1": {
      point: R`<p>Gini only needs the fraction of \(+\) in the data: 4 of 8, so \(p = \tfrac12\). Plug it in.</p>`,
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
      point: R`<p>Reduction = the parent's Gini minus each child's Gini, weighted by its share of the rows. \(X_1\)'s children are as mixed as the parent, so 0; \(X_4\) makes a pure child, so \(\tfrac16\).</p>`,
      start: R`<p><b>The formula:</b></p>\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]
<p><b>\(X_1\):</b> \(X_1 = 0\): □ → \(\varphi = \square\); \(\;X_1 = 1\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(S, X_1) = \;\square\]
<p><b>\(X_4\):</b> \(X_4 = 1\): □ → \(\varphi = \square\); \(\;X_4 = 0\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(S, X_4) = \;\square\]`,
      answer: R`<p><b>The formula:</b></p>\[\begin{aligned}\Delta\varphi(S, A) = \varphi(S) &- \frac{|S_{A=0}|}{|S|}\,\varphi(S_{A=0})\\ &- \frac{|S_{A=1}|}{|S|}\,\varphi(S_{A=1})\end{aligned}\]
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
      point: R`<p>Depth 1 fails: every feature puts a \(+\) and a \(-\) in the same leaf. The \(+\) rows are exactly the rows with \(X_3 = 1\) or \(X_4 = 1\), so asking those two questions is enough: depth 2.</p>`,
      start: R`<p><b>Depth 1 fails:</b> □</p>
<p><b>The rule:</b> \(+ \iff\) □</p>
<p><b>The tree (depth 2):</b></p><pre><code>        [□ ?]
      0 /    \ 1
   [□ ?]      □
  0 /   \ 1
   □     □</code></pre>
<p><b>Zero error:</b> □</p>`,
      answer: R`<p><b>Depth 1 fails:</b> every feature's 0-child holds row 1 \((-)\) and a \(+\) row (\(X_1, X_2, X_4\): rows 1, 2; \(X_3\): rows 1, 3), and a leaf has one label.</p>
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
      point: R`<p>Just follow the tree: ask \(X_3\) (1 → \(+\)); if 0, ask \(X_4\) (1 → \(+\), 0 → \(-\)) (the part-3 tree). Only the features the tree asks about matter.</p>`,
      start: R`<p><b>Values:</b> \(X_1 = \square,\ X_2 = \square,\ X_3 = \square,\ X_4 = \square\)</p>
<p><b>Path:</b> \(X_3 = \square\) → □; \(\;X_4 = \square\) → leaf □</p>
<p><b>Prediction:</b> □</p>`,
      answer: R`<p><b>Values:</b> \(X_1 = 0,\ X_2 = 1,\ X_3 = 0,\ X_4 = 0\)</p>
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
      point: R`<p>Gini is an upside-down parabola in \(p\). Its top is at \(p = \tfrac12\), where it equals \(\tfrac12\), so it can never be bigger than \(\tfrac12\).</p>`,
      start: R`<p><b>The function:</b> \(\;\varphi_{Gini}(p) = \square\)</p>
<p><b>Its derivative:</b> \(\;\varphi'(p) = \square = 0 \;\Rightarrow\; p = \square\)</p>
<p><b>Second derivative:</b> \(\;\varphi''(p) = \square\), so that point is a \(\square\)</p>
<p><b>The value there:</b> \(\;\varphi(\square) = \square\), so \(\varphi_{Gini}(p) \le \tfrac12\)</p>`,
      answer: R`<p><b>The function:</b> \(\;\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\)</p>
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
      point: R`<p>If both children have proportion \(p\), the parent (both children together) has \(p\) too. Impurity only looks at the proportion, so all three have the same impurity, and before − after = 0.</p>`,
      start: R`<p><b>Names:</b> children \(S_1, S_2\) with \(n^{(1)}, n^{(2)}\) samples, \(n_+^{(1)}, n_+^{(2)}\) of them positive, common proportion \(p\), so \(n_+^{(1)} = \square\), \(\;n_+^{(2)} = \square\)</p>
<p><b>The parent's proportion:</b></p>\[\frac{n_+}{n} = \;\square\; = p\]
<p><b>The reduction:</b> impurity only sees the proportion, so \(\varphi(S) = \varphi(S_1) = \varphi(S_2) = \square\):</p>\[\Delta\varphi = \;\square\; = 0\]`,
      answer: R`<p><b>Names:</b> children \(S_1, S_2\) with \(n^{(1)}, n^{(2)}\) samples, \(n_+^{(1)}, n_+^{(2)}\) of them positive, common proportion \(p\), so \(n_+^{(1)} = p\,n^{(1)}\), \(\;n_+^{(2)} = p\,n^{(2)}\)</p>
<p><b>The parent's proportion:</b></p>\[\begin{aligned}\frac{n_+}{n} &= \frac{p\,n^{(1)} + p\,n^{(2)}}{n^{(1)} + n^{(2)}}\\ &= \frac{p\,(n^{(1)} + n^{(2)})}{n^{(1)} + n^{(2)}} = p\end{aligned}\]
<p><b>The reduction:</b> impurity only sees the proportion, so \(\varphi(S) = \varphi(S_1) = \varphi(S_2) = \varphi(p)\):</p>\[\begin{aligned}\Delta\varphi &= \varphi(p) - \frac{n^{(1)}}{n}\varphi(p) - \frac{n^{(2)}}{n}\varphi(p)\\ &= \varphi(p)\Big(1 - \frac{n^{(1)} + n^{(2)}}{n}\Big) = 0\end{aligned}\]`,
      moves: [
        { line: R`<b>What does the question really want?</b> \(\Delta\varphi = 0\) for <b>any</b> impurity. What all impurities share: they only see the proportion. So show the parent has proportion \(p\) too → same \(\varphi\) everywhere → it cancels.`,
          why: R`<p>Gini \(1 - p^2 - (1-p)^2\), entropy \(-p\log p - (1-p)\log(1-p)\): both are a function of \(p\) alone ([sheet: Gini impurity], [sheet: Entropy]). That's why it holds "regardless of the impurity measure". Doing it only for Gini costs ½–1 point.</p>` },
        { line: R`<b>Names</b> — child \(v\) has \(n^{(v)}\) samples, \(n_+^{(v)}\) of them positive. The common proportion is \(p\), so positives = \(p\) × size: <div class="formula">\[n_+^{(1)} = p\,n^{(1)} \qquad n_+^{(2)} = p\,n^{(2)}\]</div>`,
          why: R`<p>From \(\frac{n_+^{(1)}}{n^{(1)}} = \frac{n_+^{(2)}}{n^{(2)}} = p\), multiplied out. The \((1)\) is a label (which child), not a power. The official solution uses these names, writing \(n^{(1)}\) as \(n_+^{(1)} + n_-^{(1)}\).</p>` },
        { line: R`<b>The parent has proportion \(p\) too</b> — its positives are both children's positives added: <div class="formula">\[\begin{aligned}\frac{n_+}{n} &= \frac{p\,n^{(1)} + p\,n^{(2)}}{n^{(1)} + n^{(2)}}\\ &= \frac{p\,(n^{(1)} + n^{(2)})}{n^{(1)} + n^{(2)}} = p\end{aligned}\]</div>`,
          why: R`<p>The parent holds both children, so \(n = n^{(1)} + n^{(2)}\) and \(n_+ = n_+^{(1)} + n_+^{(2)}\). This step is the proof: the grader takes off 2 points if you just assume the parent has \(p\).</p>` },
        { line: R`<b>Plug in</b> — so \(\varphi(S) = \varphi(S_1) = \varphi(S_2) = \varphi(p)\): <div class="formula">\[\begin{aligned}\Delta\varphi &= \varphi(p) - \frac{n^{(1)}}{n}\varphi(p) - \frac{n^{(2)}}{n}\varphi(p)\\ &= \varphi(p)\Big(1 - \underbrace{\color{#e8912d}\frac{n^{(1)} + n^{(2)}}{n}}_{\textstyle\color{#e8912d}\text{this part = 1}}\Big) = 0\end{aligned}\]</div>Done.`,
          remember: R`\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v)\]<p>Not on the sheet: it only has the impurities themselves, [sheet: Gini impurity] and [sheet: Entropy]. Here the two children are \(S_1, S_2\) with sizes \(n^{(1)}, n^{(2)}\), and \(|S| = n\).</p>` },
      ],
      compare: R`Same steps as the official solution. Its second denominator has a typo: it numbers the children (0), (1) instead of (1), (2); it should read \(n_+^{(1)} + n_-^{(1)} + n_+^{(2)} + n_-^{(2)}\).`,
      slip: R`Typo in the second denominator: it numbers the children (0), (1) instead of (1), (2). It should be \(n_+^{(1)} + n_-^{(1)} + n_+^{(2)} + n_-^{(2)}\). Further down, \(n^{(v)}\) just means the size of child \(v\).`,
    },

    // ═════════════════════════════════════════════ 2025-C Q2
    "2025C-q2.1": {
      point: R`<p>Gini only needs the fraction of likes: 3 of 6, so \(p = \tfrac12\). Plug it in.</p>`,
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
      point: R`<p>Genre makes 3 children, one per genre. Comedy and Drama are pure (Gini 0), only Action is mixed. So the reduction is the parent's \(\tfrac12\) minus Action's weighted Gini.</p>`,
      start: R`<p><b>Children:</b> Action □ → \(\varphi = \square\); Comedy □ → \(\varphi = \square\); Drama □ → \(\varphi = \square\)</p>
\[\Delta\varphi(\text{Genre}) = \varphi(S) - \sum_{v} \frac{|S_v|}{|S|}\,\varphi(S_v) = \;\square\]`,
      answer: R`<p><b>Children:</b> Action \(\{1-, 2+\}\) → \(\varphi = \tfrac12\); Comedy \(\{3-, 4-\}\) → \(\varphi = 0\); Drama \(\{5+, 6+\}\) → \(\varphi = 0\)</p>
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
      point: R`<p>Same children and weights as part 2: Action \(\{1-, 2+\}\), Comedy \(\{3-, 4-\}\), Drama \(\{5+, 6+\}\), 2 of the 6 each. Only the impurity changes: entropy instead of Gini.</p>`,
      start: R`<p><b>Entropies:</b> parent \(H(S) = \square\); Action \(\square\); Comedy \(\square\); Drama \(\square\)</p>
\[\mathrm{IG}(\text{Genre}) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v) = \;\square\]`,
      answer: R`<p><b>Entropies:</b> parent \(H(S) = H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\); Action \(H(\tfrac12) = 1\); Comedy \(H(0) = 0\); Drama \(H(1) = 0\)</p>
\[\begin{aligned}\mathrm{IG}(\text{Genre}) &= H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v)\\ &= 1 - \left(\tfrac26\cdot 1 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= 1 - \tfrac13 = \tfrac23\end{aligned}\]`,
      moves: [
        { line: R`<b>Entropies</b> — [sheet: Entropy]. The parent (3 likes, 3 dislikes) and Action \(\{1-, 2+\}\) are half and half; Comedy \(\{3-, 4-\}\) and Drama \(\{5+, 6+\}\) are pure: <div class="formula">\[\begin{aligned}H(\tfrac12) &= -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\\ H(0) &= H(1) = 0\end{aligned}\]</div>`,
          why: R`<p>\(\log_2\tfrac12 = -1\), because \(2^{-1} = \tfrac12\). A pure node: \(-1\cdot\log_2 1 - 0 = 0\) (\(0\cdot\log 0\) counts as 0).</p>`,
          remember: R`\[\mathrm{IG}(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\,H(S_v)\]<p>Not on the sheet: it only has [sheet: Entropy]. Same shape as part 2's Gini reduction, with \(H\) instead of \(\varphi\). Here \(v\) = Action, Comedy, Drama.</p>` },
        { line: R`<b>Plug in</b>: <div class="formula">\[\begin{aligned}\mathrm{IG}(\text{Genre}) &= 1 - \left(\tfrac26\cdot 1 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right)\\ &= 1 - \tfrac13 = \tfrac23\end{aligned}\]</div>Done.` },
      ],
      compare: R`Same as the official solution.`,
    },

    "2025C-q2.4": {
      point: R`<p>No single attribute works. Genre already makes Comedy and Drama pure, and only Action is mixed. One more question (Time) splits Action's two instances, so 2 splits.</p>`,
      start: R`<p><b>One split fails:</b> □</p>
<p><b>Root:</b> □, because □</p>
<p><b>Second split:</b> □ on the □ child, because □</p>
<p><b>The tree:</b></p><pre><code>□?
├─ □ → □?
│     ├─ □ → □
│     └─ □ → □
├─ □ → □
└─ □ → □</code></pre>`,
      answer: R`<p><b>One split fails:</b> every attribute leaves a mixed child: Genre: Action \(\{1-, 2+\}\); Time: Weekend \(\{1-, 3-, 5+\}\); Age: Young \(\{1-, 2+, 3-\}\). So at least 2 splits.</p>
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
      point: R`<p>Pruning to the root keeps only the Genre question. The removed question (Time) was under Action, and a Comedy instance never goes there, so the prediction can't change.</p>`,
      start: R`<p><b>The pruned tree:</b> □</p>
<p><b>The instance:</b> Genre = Comedy → leaf □ → predicts □</p>
<p><b>Did pruning change it?</b> □, because □</p>`,
      answer: R`<p><b>The pruned tree:</b> only the Genre split; each child is a leaf with the majority label of its training instances: Comedy \(\{3-, 4-\}\) → dislike, Drama \(\{5+, 6+\}\) → like (Action \(\{1-, 2+\}\) is a tie, not needed here).</p>
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
      point: R`<p>Hide one instance; predict it with the majority of the <b>other</b> instances in its branch (tie → dislike). Do it for all 6, count the misses. The attribute with the fewest misses wins.</p>`,
      start: R`<p><b>Each round:</b> leave out one instance; the rest of its branch votes (tie → −); ✗ = wrong.</p>
<div class="tw"><table><thead><tr><th>out</th><th>truth</th><th>Genre</th><th>Time</th><th>Age</th></tr></thead><tbody>
<tr><td>1</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr><tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>6</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr></tbody></table></div>
<p><b>CV error</b> \(= \frac{\#\text{errors}}{6}\): Genre \(\square\), Time \(\square\), Age \(\square\). <b>Best:</b> □</p>`,
      answer: R`<p><b>Each round:</b> leave out one instance; the rest of its branch votes (tie → −); ✗ = wrong.</p>
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
          why: R`<p>The branch is recounted <b>without</b> the left-out instance. That's the whole point of leave-one-out: otherwise every prediction looks right.</p>`,
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
      point: R`<p>Depth 1 = one question. Every feature has a branch with both a \(+\) and a \(-\), so no single question gets everything right.</p>`,
      start: R`<p><b>Answer:</b> □</p>
<p><b>Because:</b> \(X_1\): □; \(\;X_2\): □; \(\;X_3\): □</p>
<p><b>So:</b> □</p>`,
      answer: R`<p><b>Answer:</b> No, there is no such tree.</p>
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
      point: R`<p>The four samples have four different \((X_2, X_3)\) combinations. So asking \(X_2\), then \(X_3\), gives every sample its own leaf: zero error at depth 2. Depth 1 can't: every feature has a branch with both a \(+\) and a \(-\) (part 1).</p>`,
      start: R`<p><b>Depth 1 fails:</b> □</p>
<p><b>Two questions that work:</b> □</p>
<p><b>The tree (depth 2):</b></p><pre><code>          [□ ?]
       0 /      \ 1
    [□ ?]       [□ ?]
   0 /  \ 1    0 /  \ 1
    □    □      □    □</code></pre>
<p><b>Zero error because:</b> □</p>`,
      answer: R`<p><b>Depth 1 fails:</b> every feature has a child with a \(+\) and a \(-\) (part 1), so the minimum depth is at least 2.</p>
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
      point: R`<p>The tree only asks \(X_2\), then \(X_3\): \(+\) when they differ, \(-\) when they're equal (the part-2 tree). It never asks \(X_1\). So take a training vector, flip \(x_1\) (now it's new, but the tree's answer is the same), and give it the opposite label.</p>`,
      start: R`<p><b>The tree's rule:</b> □</p>
<p><b>A new vector:</b> □ → not in the training data; the tree predicts □</p>
<p><b>Test instance:</b> \((x_1, x_2, x_3, y) = \square\)</p>`,
      answer: R`<p><b>The tree's rule:</b> \(+\) if \(x_2 \ne x_3\), \(-\) if \(x_2 = x_3\); it never asks \(x_1\).</p>
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
      point: R`<p>Just write the IG formula with the counts: every fraction = a count ÷ its node's size, and the parent's counts = the two children's counts added.</p>`,
      start: R`<p><b>Sizes:</b> \(|S_0| = \square\), \(|S_1| = \square\), \(|S| = \square\)</p>
<p><b>Child entropies:</b></p>\[\begin{aligned}H(S_0) &= \;\square\\ H(S_1) &= \;\square\end{aligned}\]
<p><b>Parent entropy:</b></p>\[H(S) = \;\square\]
<p><b>Plug in:</b></p>\[\mathrm{IG}(S, X_7) = \;\square\]`,
      answer: R`<p><b>Sizes:</b> \(|S_0| = p_0 + n_0\), \(|S_1| = p_1 + n_1\), \(|S| = p_0 + p_1 + n_0 + n_1\)</p>
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
      point: R`<p>Same fraction in both children, so the parent (both children together) has that fraction too. Entropy only looks at the fraction, so all three entropies are equal, and before − after = 0.</p>`,
      start: R`<p><b>The children's positive fraction:</b> \(\frac{p_0}{p_0+n_0} = \frac{p_1}{p_1+n_1} = r\), so \(p_0 = \square\), \(\;p_1 = \square\)</p>
<p><b>The parent's positive fraction:</b></p>\[\frac{p_0+p_1}{|S|} = \;\square\; = r\]
<p><b>Plug in:</b> all three entropies are \(\square\):</p>\[\mathrm{IG}(S, X_7) = \;\square\; = 0\]`,
      answer: R`<p><b>The children's positive fraction:</b> \(\frac{p_0}{p_0+n_0} = 1 - \frac{n_0}{n_0+p_0} = 1 - \frac{n_1}{n_1+p_1} = \frac{p_1}{p_1+n_1} = r\), so \(p_0 = r\,(p_0+n_0)\), \(\;p_1 = r\,(p_1+n_1)\)</p>
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
      point: R`<p>\(y = +\) exactly when \(x_2 \ne x_3\). So ask \(X_2\), then \(X_3\): every leaf is pure. Depth 1 fails because every feature puts a \(+\) and a \(-\) on the same branch.</p>`,
      start: R`<p><b>No depth 1:</b> □</p>
<p><b>The rule:</b> \(+ \iff\) □</p>
<p><b>The tree (depth 2) with each sample's leaf:</b></p><pre><code>          [□?]
       0 /      \ 1
    [□?]        [□?]
   0 /  \ 1    0 /  \ 1
    □    □      □     □
   s□   s□     s□     s□</code></pre>
<p><b>Zero error:</b> □</p>`,
      answer: R`<p><b>No depth 1:</b> every feature has a branch with two labels: \(X_1 = 1\): samples 3+, 4−; \(\;X_2 = 0\): 1−, 2+; \(\;X_3 = 0\): 1−, 3+; \(\;X_4 = 1\): 1−, 3+.</p>
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
      point: R`<p>Look for a feature whose split is perfect except for one sample. \(X_1 = 1\) holds three \(+\) and a single \(-\) (sample 4), so remove sample 4.</p>`,
      start: R`<p><b>Remove:</b> sample □</p>
<p><b>Depth-1 tree:</b> \(X_\square = 0 \to\) □ (samples □); \(\;X_\square = 1 \to\) □ (samples □)</p>`,
      answer: R`<p><b>Remove:</b> sample 4</p>
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
      point: R`<p>Reduction = the parent's Gini minus each child's Gini, weighted by its share of the samples. The parent is 3 \(+\) and 2 \(-\), so it starts at 0.48, not \(\tfrac12\).</p>`,
      start: R`<p><b>Root:</b> □ positive, □ negative: \(\;\varphi(S) = \square\)</p>
<p><b>\(X_1\):</b> \(X_1 = 0\): □ → \(\varphi = \square\); \(\;X_1 = 1\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(X_1) = \;\square\]
<p><b>\(X_4\):</b> \(X_4 = 0\): □ → \(\varphi = \square\); \(\;X_4 = 1\): □ → \(\varphi = \square\)</p>
\[\Delta\varphi(X_4) = \;\square\]`,
      answer: R`<p><b>Root:</b> 3 positive, 2 negative: \(\;\varphi(S) = 1 - 0.6^2 - 0.4^2 = 0.48\)</p>
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
      point: R`<p>The algorithm must pick the attribute with the <b>largest</b> reduction, and must put the new children <b>into the queue</b> so they get processed too.</p>`,
      start: R`<p><b>Faulty:</b> step □: "□" → should be □, because □</p>
<p><b>Omitted:</b> in step □, add: □, because □</p>`,
      answer: R`<p><b>Faulty:</b> step b.3.ii: "the <b>smallest</b> impurity reduction" → should be the <b>largest</b> impurity reduction, because we want the split that removes the most impurity.</p>
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
      point: R`<p>One iteration = pop the root, score <b>every</b> attribute, split by the best one, and push its children into the queue. \(X_1\) wins (0.18).</p>`,
      start: R`<p><b>Pop:</b> \(v_{root}\), \(S\) = □, not pure, so split.</p>
<p><b>Reductions:</b> \(\Delta\varphi(X_1) = \square\), \(\Delta\varphi(X_2) = \square\), \(\Delta\varphi(X_3) = \square\), \(\Delta\varphi(X_4) = \square\)</p>
<p><b>Split on:</b> □ → \(v_1 = \square\), \(\;v_2 = \square\)</p>
<p><b>The tree:</b></p><pre><code>      v_root [□ ?]
        0 /     \ 1
        v1       v2</code></pre>
<p><b>The queue:</b> \(Q = \square\)</p>`,
      answer: R`<p><b>Pop:</b> \(v_{root}\), \(S\) = samples 1–5 (3 \(+\), 2 \(-\)), not pure, so split.</p>
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
      point: R`<p>A real-valued feature is split by a threshold. Try every midpoint between consecutive distinct values, compute the IG of each, and keep the largest.</p>`,
      start: R`<p><b>Parent:</b> \(H(S) = \square\). <b>Candidates:</b> \(\square\)</p>
<div class="tw"><table><thead><tr><th>\(t\)</th><th>left \(X_1 \lt t\)</th><th>\(H\)</th><th>right</th><th>\(H\)</th><th>IG</th></tr></thead><tbody>
<tr><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td><td>\(\square\)</td></tr></tbody></table></div>
<p><b>Best:</b> \(X_1 = \square\) with IG \(= \square\)</p>`,
      answer: R`<p><b>Parent:</b> 4 B, 4 R, so \(H(S) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = 1\). <b>Candidates:</b> distinct values 2, 3, 4, 5, 6, 8 → \(t\) = 2.5, 3.5, 4.5, 5.5, 7</p>
<div class="tw"><table><thead><tr><th>\(t\)</th><th>left \(X_1 \lt t\)</th><th>\(H\)</th><th>right</th><th>\(H\)</th><th>IG</th></tr></thead><tbody>
<tr><td>2.5</td><td>1B 0R</td><td>0</td><td>3B 4R</td><td>0.985</td><td>\(1 - \tfrac18\cdot 0 - \tfrac78\cdot 0.985 = 0.138\)</td></tr>
<tr><td>3.5</td><td>2B 1R</td><td>0.9183</td><td>2B 3R</td><td>0.971</td><td>\(1 - \tfrac38\cdot 0.9183 - \tfrac58\cdot 0.971 = 0.049\)</td></tr>
<tr><td>4.5</td><td>3B 1R</td><td>0.8113</td><td>1B 3R</td><td>0.8113</td><td>\(1 - \tfrac48\cdot 0.8113 - \tfrac48\cdot 0.8113 = 0.189\)</td></tr>
<tr><td>5.5</td><td>3B 2R</td><td>0.971</td><td>1B 2R</td><td>0.9183</td><td>\(1 - \tfrac58\cdot 0.971 - \tfrac38\cdot 0.9183 = 0.049\)</td></tr>
<tr><td>7</td><td>4B 3R</td><td>0.985</td><td>0B 1R</td><td>0</td><td>\(1 - \tfrac78\cdot 0.985 - \tfrac18\cdot 0 = 0.138\)</td></tr></tbody></table></div>
<p><b>Best:</b> \(X_1 = 4.5\) with IG \(= 0.189\)</p>`,
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
<tr><td>7</td><td>\(1 - \tfrac78\cdot 0.985 - \tfrac18\cdot 0 = 0.138\)</td></tr></tbody></table></div>Best: \(X_1 = 4.5\), IG \(= 0.189\). Done.` },
      ],
      compare: R`Same numbers as the official solution; its last line is step 3's answer.`,
    },

    "2026B-q2.2": {
      point: R`<p>Sorted by \(X_2\), the reds are a band in the middle (between 2.5 and 7). A band needs two cuts on \(X_2\): one below it, one above it.</p>`,
      start: R`<p><b>Sorted by \(X_2\):</b> □</p>
<p><b>The pattern:</b> R \(\iff\) □</p>
<p><b>The tree (depth 2):</b></p><pre><code>        [X□ &lt; □ ?]
      yes /        \ no
        □        [X□ &lt; □ ?]
               yes /     \ no
                 □         □</code></pre>
<p><b>Zero error:</b> □</p>`,
      answer: R`<p><b>Sorted by \(X_2\):</b> labels B B B R R R R B (\(X_2\) = 1, 2, 2, 3, 3, 6, 6, 8)</p>
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
      point: R`<p>Removing a sample only changes the tree if a threshold depends on it. Only sample 3 is alone above the red band: without it the tree has no upper cut, so it calls sample 3 red. 1 error out of 8.</p>`,
      start: R`<p><b>Left out □:</b> tree □ → predicts the left-out sample □</p>
<p><b>Left out □:</b> tree □ → predicts □, truth □</p>
<p><b>Average error:</b> □</p>`,
      answer: R`<p><b>Left out 1, 2, 4, 5, 6, 7 or 8:</b> tree = part 2's (\(X_2 \lt 2.5 \to\) B; else \(X_2 \lt 7 \to\) R; else B), zero error on the other 7 → predicts the left-out sample correctly.</p>
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
      point: R`<p>One split only separates small from large, but the reds are a middle band of \(x_2\). The squared distance from the band's center, \((x_2 - 4.5)^2\), is small for reds and large for blues. It's built from \(x_2\), so it goes in the \(b\)'s.</p>`,
      start: R`<p><b>The pattern:</b> \(y = \text{R} \iff x_2 \in (\square, \square)\)</p>
<p><b>Close to the center:</b></p>\[\begin{aligned}(x_2 - \square)^2 \lt \square &\iff x_2^2 - \square\,x_2 + \square \lt \square\\ &\iff x_2^2 - \square\,x_2 \lt \square\end{aligned}\]
<p><b>Coefficients:</b> \(a_1 = \square,\ a_2 = \square,\ b_1 = \square,\ b_2 = \square\)</p>
<p><b>Split:</b> □</p>
<p><b>Why zero error:</b> □</p>`,
      answer: R`<p><b>The pattern:</b> \(y = \text{R} \iff x_2 \in (2.5, 6.5)\)</p>
<p><b>Close to the center:</b></p>\[\begin{aligned}(x_2 - 4.5)^2 \lt 4 &\iff x_2^2 - 9x_2 + 20.25 \lt 4\\ &\iff x_2^2 - 9x_2 \lt -16.25\end{aligned}\]
<p><b>Coefficients:</b> \(a_1 = 0,\ a_2 = 0\) (any values work), \(b_1 = -9,\ b_2 = 1\), so \(\varphi(x_1, x_2) = (0,\ x_2^2 - 9x_2)\)</p>
<p><b>Split:</b> second mapped feature \(\lt -16\) → R, else B</p>
<p><b>Why zero error:</b> \(x_2^2 - 9x_2\) is \(-18\) for every red (\(x_2 = 3, 6\)) and \(-8, -14, -8\) for the blues (\(x_2 = 1, 2, 8\)), so \(-16\) separates them.</p>`,
      moves: [
        { line: R`<b>What does the question really want?</b> One split = one threshold. Reds are a middle band of \(x_2\), so I need a feature small inside it, large outside. The form's \(b_2x_2^2 + b_1x_2\) is a U: bottom at the band's center.`,
          extra: [{ label: "your Moed B answer (1/5)", html: R`<p>You plugged single points into \(\varphi\) with the unknown \(a\)'s and \(b\)'s: 8 expressions and no direction. Write the interval first; the coefficients fall out of it.</p>` }] },
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
