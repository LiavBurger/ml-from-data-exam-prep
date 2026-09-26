// Recipe cards for topic "trees". Standard: spec/CARDS.md. Built from data/notes/trees.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["trees"] = {
    intro: R`<p>Decision trees are Question 2 of almost every exam (Question 3 in 2025-A), and your strongest topic (21/25 in Moed B). Open the question below and go part by part: each part shows the recipe card(s) it needs, right above it. Read the card (1–2 min), do the part on paper, then check. Start with 2025-B, the guided question.</p>`,
    cards: {
      "gini-node": {
        title: "Gini impurity of a node",
        minutes: 1,
        cue: R`"Calculate the Gini impurity for the entire dataset" (2025-B Q2.1). "Compute the Gini impurity of the full dataset" (2025-C Q2.1).`,
        lines: [
          R`Count the labels: \(\#{+}\), \(\#{-}\), and \(n = |S|\).`,
          R`\(p = \#{+}/n\), a fraction.`,
          R`\(\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\).`,
        ],
        numbers: R`<p>2025-B Q2.1, labels \(-,+,+,-,+,-,-,+\):</p>
<ul>
<li>positives: rows 2, 3, 5, 8, so 4 of \(n = 8\), and \(p = \tfrac48 = \tfrac12\)</li>
<li>\(\varphi = 1 - \left(\tfrac12\right)^2 - \left(\tfrac12\right)^2 = 1 - \tfrac14 - \tfrac14 = \tfrac12\)</li>
</ul>
<p>Unbalanced (2026-A, 3 \(+\) and 2 \(-\)): \(p = \tfrac35 = 0.6\), \(\varphi = 1 - 0.36 - 0.16 = 0.48\).</p>`,
        check: R`Always \(0 \le \varphi \le \tfrac12\): a pure node gives 0, half and half gives \(\tfrac12\).`,
        trap: R`Plug in fractions, not counts: \(1 - (4/8)^2 - (4/8)^2\), never \(1 - 4^2 - 4^2\).`,
        why: [
          [R`Why a number for "how mixed"?`, R`<p>A node holds a set \(S\) of training samples, and we want every leaf to be pure (all one label). To compare splits we need a number that is 0 for a pure node and largest when the classes are half and half. That number is the <b>impurity</b> \(\varphi\). It only looks at the proportion \(p\), not at which samples are in the node.</p>`],
          [R`Why line 3 behaves well`, R`<ul>
<li>\(p = 1\): \(1 - 1 - 0 = 0\). \(p = 0\): \(1 - 0 - 1 = 0\). Pure nodes score 0.</li>
<li>\(p = \tfrac12\): \(1 - \tfrac14 - \tfrac14 = \tfrac12\), the largest possible (card "Gini is at most ½").</li>
<li>Symmetric: \(\varphi(0.4) = \varphi(0.6)\), so it doesn't matter whether \(p\) counts the \(+\) or the \(-\).</li>
</ul>
<p><b>Meaning:</b> draw two samples from the node at random (with replacement). \(p^2 + (1-p)^2\) is the chance they have the same label, so \(\varphi_{Gini}\) is the chance their labels differ.</p>`],
        ],
        side: R`<ul>
<li><b>Formula sheet</b> gives the \(k\)-class form \(\varphi_{Gini} = 1 - \sum_{j=1}^k p_j^2\). With two classes, \(p_1 = p\) and \(p_2 = 1 - p\).</li>
<li>2025-C Q2.1 is the same calculation: 3 likes, 3 dislikes, \(p = \tfrac12\), \(\varphi = \tfrac12\).</li>
<li>Some solutions write both proportions, e.g. \(\varphi(\tfrac25, \tfrac35)\).</li>
</ul>`,
      },

      "split-reduction": {
        title: "Impurity reduction of a split",
        minutes: 2,
        cue: R`"Calculate the goodness of fit (impurity reduction) when splitting the dataset with attributes \(X_1\) and \(X_4\) … write all intermediate calculations" (2025-B Q2.2, 2026-A Q2.3). "… splitting the dataset by the Genre attribute" (2025-C Q2.2).`,
        lines: [
          R`Formula (not on the formula sheet): \(\Delta\varphi(S,A) = \varphi(S) - \sum_v \frac{|S_v|}{|S|}\,\varphi(S_v)\).`,
          R`\(\varphi(S)\) of the parent (same as card "Gini impurity of a node").`,
          R`One line per child \(A = v\): which rows → their labels → \(p\) → \(\varphi(S_v)\).`,
          R`Substitute; weight = child size / parent size.`,
        ],
        numbers: R`<p>2025-B Q2.2, split by \(X_4\) (column \(0,0,1,0,1,0,0,0\)), \(\varphi(S) = \tfrac12\):</p>
<ul>
<li>\(X_4 = 1\): rows 3, 5 → \(+,+\) → \(p = 1\) → \(\varphi = 0\)</li>
<li>\(X_4 = 0\): rows 1, 2, 4, 6, 7, 8 → \(-,+,-,-,-,+\) → \(p = \tfrac26 = \tfrac13\) → \(\varphi = 1 - \tfrac19 - \tfrac49 = \tfrac49\)</li>
<li>\(\Delta\varphi = \tfrac12 - \tfrac28\cdot 0 - \tfrac68\cdot\tfrac49 = \tfrac12 - \tfrac13 = \tfrac16\)</li>
</ul>
<p>\(X_1\): both children 2 of 4 positive, so \(\Delta\varphi = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = 0\).</p>`,
        check: R`Weights add up to 1, and \(0 \le \Delta\varphi \le \varphi(S)\).`,
        trap: R`Weight by \(|S_v|/|S|\) (over the <b>parent's</b> size), not a plain average of the children.`,
        why: [
          [R`Why weight by size, and why before − after?`, R`<p>A child with 6 samples should count more than a child with 2, so each child's impurity is multiplied by its share \(\tfrac{|S_v|}{|S|}\). The sum is the average impurity <b>after</b> the split. Subtract it from the impurity <b>before</b>: the result is how much impurity the question removed. Bigger is better; 0 means the question taught nothing. The algorithm picks the attribute with the <b>largest</b> reduction.</p>`],
          [R`More than two values (2025-C Q2.2, Genre)`, R`<p>One child per value, so three terms. Action \(\{1-, 2+\}\): \(p = \tfrac12\), \(\varphi = \tfrac12\). Comedy \(\{3-, 4-\}\): pure, \(\varphi = 0\). Drama \(\{5+, 6+\}\): pure, \(\varphi = 0\). Each weight is \(\tfrac26\), and \(\varphi(S) = \tfrac12\):</p>
\[\Delta\varphi = \tfrac12 - \left(\tfrac26\cdot\tfrac12 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right) = \tfrac12 - \tfrac16 = \tfrac13\]`],
          [R`With decimals (2026-A Q2.3)`, R`<p>\(\varphi(S) = 0.48\).</p>
<ul>
<li>\(X_1 = 0\): sample 1 \((-)\), pure, 0. \(X_1 = 1\): samples 2–5 \((+,+,-,+)\), \(p = \tfrac34\), \(\varphi = 1 - 0.5625 - 0.0625 = 0.375\).<br>\(\Delta\varphi(X_1) = 0.48 - \tfrac15\cdot 0 - \tfrac45\cdot 0.375 = 0.48 - 0.3 = 0.18\).</li>
<li>\(X_4 = 0\): samples 2, 4, 5 \((+,-,+)\), \(\varphi = \tfrac49\). \(X_4 = 1\): samples 1, 3 \((-,+)\), \(\varphi = 0.5\).<br>\(\Delta\varphi(X_4) = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.48 - 0.2667 - 0.2 = 0.0133\).</li>
</ul>`],
        ],
        side: R`<ul>
<li>All four 2025-B features: \(X_1: 0\), \(X_2: 0\), \(X_3: \tfrac16\), \(X_4: \tfrac16\). The zeros are the "same proportion" proof happening (2025-B Q2.6).</li>
<li>The official 2026-A solution writes \(\tfrac35\cdot 0.444\). Keep \(\tfrac49\) as a fraction: \(0.6\cdot 0.444\) gives 0.0136 instead of 0.0133.</li>
<li>Listing the row numbers of each child earns partial credit even if a later number slips.</li>
</ul>`,
      },

      "entropy": {
        title: "Entropy and information gain",
        minutes: 2,
        cue: R`"Repeat (2) using entropy instead of Gini impurity" (2025-C Q2.3). "Information gain (decrease in entropy impurity)" (2026-B Q2.1).`,
        lines: [
          R`Same children and weights as for Gini; only \(\varphi\) changes to \(H(p) = -p\log_2 p - (1-p)\log_2(1-p)\).`,
          R`Shortcuts: pure child → \(H = 0\); half and half → \(H = 1\).`,
          R`Other \(p\): \(\log_2 x = \ln x / \ln 2\), e.g. \(\log_2 0.75 = -0.2877/0.6931 = -0.4150\).`,
          R`\(\mathrm{IG} = H(S) - \sum_v \frac{|S_v|}{|S|}\,H(S_v)\).`,
        ],
        numbers: R`<p>2025-C Q2.3, Genre. Parent 3 likes, 3 dislikes → \(H(S) = 1\).</p>
<ul>
<li>Action \(\{1-, 2+\}\): \(H = 1\). Comedy \(\{3-, 4-\}\): \(H = 0\). Drama \(\{5+, 6+\}\): \(H = 0\).</li>
<li>\(\mathrm{IG} = 1 - \left(\tfrac26\cdot 1 + \tfrac26\cdot 0 + \tfrac26\cdot 0\right) = 1 - \tfrac13 = \tfrac23\)</li>
</ul>
<p>Not half and half (3 vs 1): \(H(\tfrac34) = -0.75\cdot(-0.4150) - 0.25\cdot(-2) = 0.3113 + 0.5 = 0.8113\).</p>`,
        check: R`Each \(-p\log_2 p\) term is positive, and two-class entropy is between 0 and 1.`,
        trap: R`Use \(\log_2\), not \(\ln\): with \(\ln\), \(H(\tfrac12) = 0.693\) instead of 1, and everything after is off.`,
        why: [
          [R`Why a second impurity?`, R`<p>Entropy comes from information theory: how uncertain we are about the label of a random sample from the node. Like Gini it is 0 for a pure node and largest at half and half, and it is symmetric (\(H(\tfrac14) = H(\tfrac34)\)). "Information gain" is just the impurity reduction with \(\varphi = H\).</p>`],
          [R`Why line 2? The two shortcuts`, R`<p>Convention: \(0\cdot\log_2 0 = 0\). Pure: \(H = -1\cdot\log_2 1 - 0 = -1\cdot 0 = 0\). Half and half: \(H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = -\tfrac12(-1) - \tfrac12(-1) = \tfrac12 + \tfrac12 = 1\).</p>`],
        ],
        side: R`<ul>
<li><b>Formula sheet</b> gives entropy with \(\log_2\): \(H = -\sum_j p_j\log_2 p_j\).</li>
<li><b>Gini vs entropy, 2025-C:</b> Genre \(\tfrac13\) vs \(\tfrac23\); Time \(\tfrac1{18} \approx 0.056\) vs 0.082; Age the same as Time. Both pick Genre. Never compare a Gini number with an entropy number: entropy goes up to 1, Gini only to \(\tfrac12\).</li>
<li>Useful values: \(H(\tfrac13) = H(\tfrac23) = 0.9183\), \(H(\tfrac25) = 0.9710\), \(H(\tfrac37) = 0.9852\), \(H(\tfrac15) = 0.7219\).</li>
</ul>`,
      },

      "midpoint-thresholds": {
        title: "Real-valued feature: try every midpoint",
        minutes: 2,
        cue: R`"Find the split … by feature \(X_1\) that maximizes the information gain" + "use midpoints between consecutive distinct feature values" (2026-B Q2.1, 8 points).`,
        lines: [
          R`Sorted <b>distinct</b> values → midpoints: "2, 3, 4, 5, 6, 8 → 2.5, 3.5, 4.5, 5.5, 7".`,
          R`For each \(t\): count B/R left (\(X_1 \lt t\)) and right.`,
          R`Entropy of each side, then IG (same as card "Entropy and information gain").`,
          R`Name the \(t\) with the largest IG.`,
        ],
        numbers: R`<p>2026-B: 4 B, 4 R, so \(H(S) = 1\). At \(t = 4.5\):</p>
<ul>
<li>left 1–4: 3 B, 1 R → \(H = 0.8113\); right 5–8: 1 B, 3 R → \(H = 0.8113\)</li>
<li>\(\mathrm{IG} = 1 - \tfrac48\cdot 0.8113 - \tfrac48\cdot 0.8113 = 0.189\)</li>
</ul>
<p>2.5 → 0.138, 3.5 → 0.049, <b>4.5 → 0.189</b>, 5.5 → 0.049, 7 → 0.138. Answer: \(X_1 \lt 4.5\).</p>`,
        check: R`Mirror-image counts (3.5 and 5.5) give the same IG: reuse.`,
        trap: R`Midpoints of <b>distinct</b> values: 3 appears twice, but "3 to 3" is not a gap.`,
        why: [
          [R`Why only midpoints?`, R`<p>With real values, one child per value would make a leaf for every number, useless for a new \(X_1 = 4.7\). So we ask one yes/no question, "\(X_1 \lt t\)?". Only the <b>order</b> matters: every \(t\) between 4 and 5 sends exactly the same samples left. So one candidate per gap is enough, and the course uses the gap's midpoint.</p>`],
          [R`The other thresholds in full`, R`<ul>
<li>\(t = 2.5\): left sample 1 (B), pure, 0. Right samples 2–8: 3 B, 4 R, \(H = -\tfrac37\log_2\tfrac37 - \tfrac47\log_2\tfrac47 = 0.5239 + 0.4613 = 0.9852\). \(\mathrm{IG} = 1 - \tfrac78\cdot 0.9852 = 1 - 0.8621 = 0.138\).</li>
<li>\(t = 3.5\): left 1, 2, 3 (2 B, 1 R), \(H = 0.3900 + 0.5283 = 0.9183\). Right 4–8 (2 B, 3 R), \(H = 0.5288 + 0.4422 = 0.9710\). \(\mathrm{IG} = 1 - \tfrac38\cdot 0.9183 - \tfrac58\cdot 0.9710 = 1 - 0.3444 - 0.6069 = 0.049\).</li>
<li>\(t = 5.5\) mirrors 3.5, and \(t = 7\) mirrors 2.5 (same counts, sides swapped).</li>
</ul>`],
        ],
        side: R`<ul>
<li>For comparison, \(X_2 \lt 2.5\) gives IG 0.549 (left 1, 4, 6 all B; right 1 B and 4 R, \(H = 0.7219\)), much better than any \(X_1\) split.</li>
<li>A real-valued feature can be split again lower in the tree, with a new threshold computed from the samples that reach that node.</li>
</ul>`,
      },

      "no-depth-1": {
        title: "Why depth 1 fails: one conflicting pair per feature",
        minutes: 1,
        cue: R`"Is there a decision tree of depth 1 … that classifies the training data with zero training error? … Otherwise, explain why" (2025-A Q3.1). "Briefly explain why there are no trees with smaller depths" (2026-A Q2.1).`,
        lines: [
          R`Write "Depth 1 is impossible:".`,
          R`For <b>every</b> feature: two samples with the same value of it but different labels.`,
          R`"They reach the same leaf, and a leaf has one label, so one of them is misclassified."`,
        ],
        numbers: R`<p>2025-A Q3.1:</p>
<ul>
<li>\(X_1 = 1\): samples 2 \((+)\) and 4 \((-)\)</li>
<li>\(X_2 = 0\): samples 1 \((-)\) and 2 \((+)\)</li>
<li>\(X_3 = 0\): samples 1 \((-)\) and 3 \((+)\)</li>
</ul>
<p>Every feature has a conflicting pair, so no depth-1 tree has zero error.</p>`,
        trap: R`One pair for <b>each</b> feature. Showing it for the feature you tried first proves nothing.`,
        why: [
          [R`Why does one pair rule a feature out?`, R`<p>A depth-1 tree (a stump) asks one question, and its leaves are the children of that split. Zero error needs <b>every</b> child pure. Two samples with the same value go to the same child, and a leaf predicts one label, so if their labels differ one of them is wrong.</p>`],
        ],
        side: R`<ul>
<li>2025-B (Q2.3 doesn't require it; the official solution notes it): \(X_1 = 0\): rows 1, 2. \(X_2 = 0\): rows 1, 2. \(X_3 = 0\): rows 1, 3. \(X_4 = 0\): rows 1, 2.</li>
<li>2026-A official pairs: \(X_1\): samples 3, 4. \(X_2\): 1, 2. \(X_3\): 1, 3. \(X_4\): 1, 3.</li>
</ul>`,
      },

      "min-depth-tree": {
        title: "Build the minimum-depth tree with zero error",
        minutes: 2,
        cue: R`"Construct a decision tree of minimum depth that achieves zero training error" (2025-B Q2.3, 2025-A Q3.2, 2026-A Q2.1).`,
        lines: [
          R`Depth 1? Every feature has a mixed child → aim for depth 2.`,
          R`Read the \(+\) rows: which values do they share that no \(-\) row has? Write the rule.`,
          R`No rule? Pick two features where samples sharing a value pair also share the label.`,
          R`Draw: one feature at the root, the other in each mixed child.`,
          R`List each leaf's samples; all pure → zero error.`,
        ],
        numbers: R`<p>2025-B Q2.3. \(+\) rows: 2, 8 have \(X_3 = 1\); 3, 5 have \(X_4 = 1\). \(-\) rows 1, 4, 6, 7: \(X_3 = X_4 = 0\). Rule: \(+\) ⇔ \(X_3 = 1\) or \(X_4 = 1\).</p>
<pre><code>        [X3 ?]
      0 /    \ 1
   [X4 ?]     +    rows 2, 8
  0 /   \ 1
   -     +         rows 3, 5
rows 1,4,6,7</code></pre>`,
        trap: R`Don't pick the root by largest reduction: in 2025-A \(X_1\) scores best, yet \(X_1\) at the root can't reach depth 2.`,
        why: [
          [R`Why line 3? (2025-A Q3.2)`, R`<p>A full depth-2 tree on two binary features has one leaf per pair of values. If samples that share a pair also share a label, every leaf is pure; label it with that label. (In 2026-A, samples 3 and 5 share \((X_2, X_3) = (1,0)\), both \(+\), so that is fine.) 2025-A: the \((X_2, X_3)\) pairs are \((0,0), (0,1), (1,0), (1,1)\), all different. Tree: \(X_2\) at the root, \(X_3\) in both children. Leaves: \((0,0) \to -\), \((0,1) \to +\), \((1,0) \to +\), \((1,1) \to -\).</p>`],
          [R`Mapping samples to leaves (2026-A Q2.1)`, R`<p>\(X_2\) at the root, \(X_3\) in both children:</p>
<ul>
<li>\(X_2 = 0, X_3 = 0\): sample 1 → \(-\)</li>
<li>\(X_2 = 0, X_3 = 1\): sample 2 → \(+\)</li>
<li>\(X_2 = 1, X_3 = 0\): samples 3, 5 → \(+\)</li>
<li>\(X_2 = 1, X_3 = 1\): sample 4 → \(-\)</li>
</ul>`],
          [R`Why the greedy choice fails in 2025-A`, R`<p>Parent 2 of 4 positive, \(\varphi = \tfrac12\). \(X_1\): \(\{1-\}\) pure, \(\{2+, 3+, 4-\}\) has \(\varphi = \tfrac49\), so \(\Delta\varphi = \tfrac12 - \tfrac34\cdot\tfrac49 = \tfrac16\). \(X_2\) and \(X_3\) both have children that are half and half, so their gain is <b>0</b>. Greedy puts \(X_1\) at the root, and then the child \(\{2+, 3+, 4-\}\) can't be made pure by one more question (\(X_2\) leaves \(\{3+, 4-\}\), \(X_3\) leaves \(\{2+, 4-\}\)).</p>`],
        ],
        side: R`<ul>
<li>2025-B: swapping \(X_3\) and \(X_4\) gives the official second tree. Here greedy agrees: \(X_3\) and \(X_4\) have the largest reduction, \(\tfrac16\).</li>
<li>The official 2025-A text says "any depth-2 tree that uses \(X_1\)" fails. Too strong: \(X_2\) at the root, \(X_1\) in the \(X_2 = 0\) child and \(X_3\) in the \(X_2 = 1\) child also works. Only \(X_1\) at the <b>root</b> fails.</li>
</ul>`,
      },

      "remove-one-sample": {
        title: "Remove one sample so that a stump works",
        minutes: 1,
        cue: R`"Find one sample that once removed from the training set, there exists a decision tree of depth 1 that classifies the data without any errors. Specify the sample and the appropriate depth 1 tree" (2026-A Q2.2).`,
        lines: [
          R`For each feature, write its two children with their samples and labels.`,
          R`Look for a feature whose children are pure except for <b>one</b> sample.`,
          R`Remove that sample and write the stump: each value → its label, with its samples.`,
        ],
        numbers: R`<p>2026-A: \(X_1 = 0\): \(\{1-\}\); \(X_1 = 1\): \(\{2+, 3+, 4-, 5+\}\). Only sample 4 spoils it.</p>
<p>Remove sample 4: \(X_1 = 0 \to -\) (sample 1), \(X_1 = 1 \to +\) (samples 2, 3, 5).</p>`,
        check: R`After the removal, every branch holds only one label.`,
        why: [
          [R`Why this works`, R`<p>A stump has zero error exactly when both children are pure (card "Why depth 1 fails"). A child that is pure except for one sample becomes pure when that sample is gone. Checking all 5 samples × 4 features shows sample 4 with \(X_1\) is the only combination that works.</p>`],
        ],
        side: R`<ul><li>The official solution prints "X1=0 → −" twice; the second should read \(X_1 = 1 \to +\).</li></ul>`,
      },

      "fewest-splits": {
        title: "Tree with the fewest splits",
        minutes: 2,
        cue: R`"Construct a decision tree with the smallest number of splits (internal nodes) that classifies the training data … with zero error" (2025-C Q2.4).`,
        lines: [
          R`One split? For each attribute, list its children; circle an impure one.`,
          R`Root = the attribute leaving only <b>one</b> impure child.`,
          R`Split that child by an attribute its samples differ in (check the rows).`,
          R`Draw: a question per internal node, a label per leaf; count the splits.`,
        ],
        numbers: R`<p>2025-C. Time: Weekend \(\{1-, 3-, 5+\}\) and Weekday \(\{2+, 4-, 6+\}\) both impure. Age: Young \(\{1-, 2+, 3-\}\) and Adult \(\{4-, 5+, 6+\}\) both impure. Genre: only Action \(\{1-, 2+\}\) impure.</p>
<p>Action: 1 = Weekend/Young, 2 = Weekday/Young → Time.</p>
<pre><code>Genre?
├─ Action → Time?  Weekend → −  (1)
│                  Weekday → +  (2)
├─ Comedy → −  (3, 4)
└─ Drama  → +  (5, 6)</code></pre>
<p>2 splits.</p>`,
        check: R`Every leaf holds one label; every internal node is counted.`,
        trap: R`Time or Age at the root leaves <b>both</b> children impure → 3 splits, not minimal.`,
        why: [
          [R`Splits vs depth`, R`<p>Depth counts the questions on the longest root-to-leaf path. The number of splits counts <b>every</b> question anywhere in the tree (the internal nodes). A multi-valued attribute like Genre is still one split, however many children it has.</p>`],
        ],
        side: R`<ul><li>The official text says Action is split by "Age", but samples 1 and 2 are both Young. Its drawing correctly uses Time.</li></ul>`,
      },

      "threshold-band": {
        title: "Depth-2 tree on a real feature: the band",
        minutes: 2,
        cue: R`"Construct a depth-2 decision tree that perfectly classifies the training set … specify the feature and threshold … and the class label associated with every leaf" (2026-B Q2.2).`,
        lines: [
          R`Sort the samples by one feature; write the label sequence.`,
          R`Each label change → threshold = midpoint of the two values.`,
          R`Two changes → a band \(a \lt X \lt b\): ask that feature twice.`,
          R`Draw: threshold per node, label and samples per leaf.`,
        ],
        numbers: R`<p>2026-B by \(X_2\): 1, 2, 2, 3, 3, 6, 6, 8 → B B B | R R R R | B. Changes at 2→3 (2.5) and 6→8 (7).</p>
<pre><code>      [X2 &lt; 2.5 ?]
    yes /       \ no
     B        [X2 &lt; 7 ?]
  (1,4,6)   yes /     \ no
              R         B
          (2,5,7,8)    (3)</code></pre>`,
        check: R`All 8 samples under a leaf, each leaf one colour.`,
        trap: R`The question demands midpoints: write 7, not 6.5.`,
        why: [
          [R`Why the same feature twice?`, R`<p>One threshold question only separates "small" from "large". Here the reds sit in the <b>middle</b> of \(X_2\) with blues on both sides, so red ⇔ \(2.5 \lt X_2 \lt 7\): the first question cuts at 2.5, the second at 7.</p>`],
        ],
        side: R`<ul>
<li>The official tree asks \(X_2 \lt 7\) first and \(X_2 \lt 2.5\) second: the same band.</li>
<li>The official text describes the reds as \(x_2 \in (2.5, 6.5)\). True as a description (no sample lies between 6 and 8), but the tree itself should use the midpoint 7.</li>
<li>The root \(X_2 \lt 2.5\) is also the greedy choice (IG 0.549).</li>
</ul>`,
      },

      "classify": {
        title: "Classify a test instance",
        minutes: 1,
        cue: R`"Use the tree you constructed in (3) above, to classify the test instance \(x = (0,1,0,0)\)" (2025-B Q2.4).`,
        lines: [
          R`Redraw your tree.`,
          R`Write the path: "root asks \(X_\_\); value is \(\_\) → branch …", until a leaf.`,
          R`The leaf's label is the prediction.`,
        ],
        numbers: R`<p>2025-B, \(x = (0,1,0,0)\), tree \(X_3\) then \(X_4\):</p>
<ul>
<li>root asks \(X_3\): \(X_3 = 0\) → go to the \(X_4\) node</li>
<li>\(X_4 = 0\) → leaf \(-\)</li>
</ul>
<p>Prediction: \(-\).</p>`,
        side: R`<ul>
<li>\(X_1\) and \(X_2\) are never asked: a sample only answers the questions on its own path.</li>
<li>The official second tree (\(X_4\) first, then \(X_3\)) gives \(X_4 = 0 \to X_3 = 0 \to -\), the same answer.</li>
</ul>`,
      },

      "prune": {
        title: "Prune to the root split, then predict",
        minutes: 1,
        cue: R`"The tree you got in (4) is pruned by keeping only its first split … What does the pruned tree predict for this instance? Did pruning affect the prediction?" (2025-C Q2.5).`,
        lines: [
          R`Keep the root question; each of its children becomes a leaf.`,
          R`Label each leaf with the <b>majority</b> of the training samples that reach it.`,
          R`Follow the test instance through the pruned tree.`,
          R`Follow it through the unpruned tree; same label → pruning didn't affect it.`,
        ],
        numbers: R`<p>2025-C, root Genre: Action \(\{1-, 2+\}\) (tie), Comedy \(\{3-, 4-\}\) → dislike, Drama \(\{5+, 6+\}\) → like.</p>
<p>Test (Comedy, Weekday, Young) → Comedy → <b>dislike</b>. The unpruned tree also sends Comedy straight to dislike; pruning only removed the Time question under Action. Not affected.</p>`,
        trap: R`The Action tie needs no rule here: the test instance never reaches that leaf.`,
        why: [
          [R`Why prune at all?`, R`<p>A tree grown until every leaf is pure fits the training data perfectly, but its deep splits may just memorize noise and do worse on new data (<b>overfitting</b>). Pruning a node turns it back into a leaf labelled with its majority. <b>Pre-pruning</b> stops growth early (max_depth, min_samples_leaf, set by cross-validation). <b>Post-pruning</b> grows the full tree, then removes the node whose removal most improves validation accuracy, and repeats.</p>`],
        ],
      },

      "wrong-instance": {
        title: "A new instance your tree gets wrong",
        minutes: 1,
        cue: R`"Describe a test instance \((x_1,x_2,x_3,y)\) that the tree you specified in (2) would classify <b>incorrectly</b>. The feature vector … must not be present in the training data" (2025-A Q3.3).`,
        lines: [
          R`List all \(2^3 = 8\) vectors; cross out the training ones.`,
          R`Take a remaining vector; follow it down your tree → prediction.`,
          R`Give it the opposite label.`,
        ],
        numbers: R`<p>2025-A, tree \(X_2\) then \(X_3\). Training: \((0,0,0), (1,0,1), (1,1,0), (1,1,1)\).</p>
<p>Take \((1,0,0)\): \((x_2, x_3) = (0,0)\) → tree predicts \(-\). Answer: \((1,0,0,+)\).</p>`,
        check: R`Shortcut: take a training row, flip \(x_1\) (the tree never asks it) and flip its label.`,
        trap: R`Compare your vector with <b>every</b> training row: the official answer \((0,0,0,+)\) is training sample 1, so it is forbidden.`,
        side: R`<ul>
<li>All four valid answers: \((1,0,0,+)\), \((0,0,1,-)\), \((0,1,0,-)\), \((0,1,1,+)\).</li>
<li>If your part-2 tree is different, recompute the predictions for your own tree.</li>
</ul>`,
      },

      "loo": {
        title: "Leave-one-out error for stumps",
        minutes: 2,
        cue: R`"For each of the three attributes … evaluate its cross-validation error using … a 'leave-one-out' approach … determine which attribute is the best" (2025-C Q2.6, 7 points).`,
        lines: [
          R`Write each branch's full contents once, e.g. Action \(\{1-, 2+\}\).`,
          R`Table, one row per left-out sample: its branch <b>without it</b> → majority (tie rule) → prediction vs truth → error?`,
          R`LOO error \(= \#\text{errors}/n\).`,
          R`Repeat per attribute; best = smallest LOO error.`,
        ],
        numbers: R`<p>2025-C, Genre stump:</p>
<ul>
<li>out 1: Action \(\{2+\}\) → \(+\), truth \(-\): error. Out 2: \(\{1-\}\) → \(-\), truth \(+\): error.</li>
<li>out 3, 4: Comedy → \(-\), correct. Out 5, 6: Drama → \(+\), correct.</li>
</ul>
<p>2 errors → \(\tfrac26 = \tfrac13\). Time: \(\tfrac46\), Age: \(\tfrac46\). Best: <b>Genre</b>.</p>`,
        check: R`Each attribute's table has exactly \(n\) rows.`,
        trap: R`Recompute the leaf label <b>without</b> the left-out sample; forgetting this gives 0 errors.`,
        why: [
          [R`Why leave one out?`, R`<p>A tree always scores well on its own training data, so that says nothing about new data. LOO tests every sample on a tree that never saw it: remove sample \(i\), build the tree on the other \(n-1\) by the question's rule, predict sample \(i\). It is cross-validation where each fold holds one sample.</p>`],
          [R`The Time stump in full (ties → dislike)`, R`<p>Weekend \(\{1-, 3-, 5+\}\), Weekday \(\{2+, 4-, 6+\}\).</p>
<ul>
<li>out 1: \(\{3-, 5+\}\) tie → \(-\), correct. Out 3: \(\{1-, 5+\}\) tie → \(-\), correct.</li>
<li>out 5: \(\{1-, 3-\}\) → \(-\), truth \(+\): error.</li>
<li>out 2: \(\{4-, 6+\}\) tie → \(-\), truth \(+\): error. Out 6: \(\{2+, 4-\}\) tie → \(-\), truth \(+\): error.</li>
<li>out 4: \(\{2+, 6+\}\) → \(+\), truth \(-\): error.</li>
</ul>
<p>4 errors → \(\tfrac46 = \tfrac23\). Age (Young \(\{1-, 2+, 3-\}\), Adult \(\{4-, 5+, 6+\}\)) also gives errors on 2, 4, 5, 6 → \(\tfrac23\).</p>`],
        ],
        side: R`<ul><li>The official table prints "+ (Err)" for Time / instance 6. Without instance 6 the Weekday branch is \(\{2+, 4-\}\), a tie → \(-\). Still an error, so the count of 4 is right.</li></ul>`,
      },

      "loo-trees": {
        title: "Leave-one-out with zero-error trees",
        minutes: 2,
        cue: R`"Remove each sample in turn … construct a depth-2 (or depth-1) tree that has zero error on the remaining seven … describe the decision tree … compute the average error" (2026-B Q2.3).`,
        lines: [
          R`Start from your part-2 tree.`,
          R`Per left-out sample: without it, is every threshold still needed?`,
          R`Yes → same tree, which is right on all 8: correct.`,
          R`No (it alone forced a threshold) → smaller tree; predict it.`,
          R`Average error \(= \#\text{errors}/n\).`,
        ],
        numbers: R`<p>2026-B. Sample 3 (\(X_2 = 8\)) is the only blue above the red band. Without it: depth 1, \(X_2 \lt 2.5 \to\) B, else R. Sample 3 → R, truth B: <b>error</b>.</p>
<p>Other 7 rounds: part-2 tree, correct. LOO error \(= \tfrac18 = 0.125\).</p>`,
        trap: R`"Describe the decision tree" in each round: write all 8 rows, not just the one that changes.`,
        why: [
          [R`What leave-one-out measures`, R`<p>A zero-error tree always scores perfectly on its own training data, so that says nothing about new data. Leave-one-out tests each sample on a tree that never saw it: remove sample \(i\), build the tree on the other \(n-1\), predict sample \(i\). The average error over all \(n\) rounds estimates the error on new data.</p>`],
          [R`Why only sample 3 changes the tree`, R`<p>The upper cut at 7 exists only to separate sample 3 from the reds. Remove it and one cut at 2.5 separates the rest, so the cut at 7 is never learned and sample 3 lands on the red side. Removing any other sample leaves both cuts needed (the lower cut still has blues below it and reds above), and the part-2 tree has zero error on all eight, so it also gets the left-out one right.</p>`],
        ],
      },

      "id3-algorithm": {
        title: "The tree-building algorithm with a queue",
        minutes: 2,
        cue: R`"Donald wrote below the tree construction algorithm we saw in class. However, he made two mistakes …: an omitted operation and a faulty operation" (2026-A Q2.4).`,
        lines: [
          R`a. Put \(v_{root}\) (all samples) into queue \(Q\).`,
          R`b. While \(Q\) isn't empty: pop \(v\); \(S\) = its samples.`,
          R`If all of \(S\) has label \(y\): \(v\) is a leaf with label \(y\).`,
          R`Otherwise: score every attribute, pick the <b>largest</b> reduction, split \(S\), one child per subset.`,
          R`<b>Add each child to \(Q\).</b>`,
        ],
        numbers: R`<p>2026-A Q2.4, Donald's version:</p>
<ul>
<li><b>Faulty:</b> step b.3.ii picks the <b>smallest</b> impurity reduction → should be the <b>largest</b>.</li>
<li><b>Omitted:</b> after b.3.iii nothing adds the children to \(Q\) → "add each child of \(v\) to \(Q\)".</li>
</ul>`,
        check: R`Compare your lines with his, line by line.`,
        why: [
          [R`Why these two details matter`, R`<ul>
<li><b>Largest:</b> we want the question that removes the most impurity.</li>
<li><b>Add the children to \(Q\):</b> without it the loop ends after the root; the children are never checked for purity or split further.</li>
</ul>`],
          [R`Greedy is not always optimal`, R`<p>The algorithm never looks ahead. In 2025-A the best-scoring first question is \(X_1\), but no depth-2 tree with \(X_1\) at the root has zero error. So for a <b>minimum-depth</b> tree, reason from the table (card "Build the minimum-depth tree"); don't just run this algorithm.</p>`],
        ],
        side: R`<ul><li>This is ID3 (Quinlan), as in the lecture. \(Q\) is first in, first out.</li></ul>`,
      },

      "first-iteration": {
        title: "Run one iteration of the algorithm",
        minutes: 2,
        cue: R`"Execute the first iteration of the loop in step b of the correct tree construction algorithm … Describe the tree and the contents of the queue \(Q\) after this iteration" (2026-A Q2.5).`,
        lines: [
          R`"Pop \(v_{root}\); \(S\) = all samples; labels mixed → not a leaf."`,
          R`Score <b>every</b> attribute (reuse the ones from earlier parts).`,
          R`Pick the largest; the root asks that attribute.`,
          R`Name the children with their sample sets: \(v_1, v_2\).`,
          R`State \(Q\). The children wait in \(Q\), even pure ones.`,
        ],
        numbers: R`<p>2026-A: \(\Delta\varphi\): \(X_1 = 0.18\), \(X_4 = 0.0133\) (from Q2.3), \(X_2 = 0.0133\), \(X_3 = 0.0133\). Largest: \(X_1\).</p>
<ul>
<li>\(v_1\) (\(X_1 = 0\)): \(\{x^{(1)}\}\)</li>
<li>\(v_2\) (\(X_1 = 1\)): \(\{x^{(2)}, x^{(3)}, x^{(4)}, x^{(5)}\}\)</li>
</ul>
<p>\(Q = [v_1, v_2]\).</p>`,
        trap: R`\(v_1\) is pure, but it becomes a leaf only when it is <b>popped</b> (iteration 2), not in this iteration.`,
        why: [
          [R`\(X_2\) and \(X_3\) in full`, R`<p>\(\varphi(S) = 0.48\).</p>
<ul>
<li>\(X_2 = 0\): samples 1, 2 \((-,+)\), \(\varphi = 0.5\). \(X_2 = 1\): samples 3, 4, 5 \((+,-,+)\), \(\varphi = \tfrac49\).<br>\(\Delta\varphi = 0.48 - \tfrac25\cdot 0.5 - \tfrac35\cdot\tfrac49 = 0.48 - 0.2 - 0.2667 = 0.0133\).</li>
<li>\(X_3 = 0\): samples 1, 3, 5 \((-,+,+)\), \(\varphi = \tfrac49\). \(X_3 = 1\): samples 2, 4 \((+,-)\), \(\varphi = 0.5\).<br>\(\Delta\varphi = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.0133\).</li>
</ul>`],
        ],
        side: R`<ul><li>Slips in the official solution: it swaps the children of \(X_2\) and of \(X_3\) (e.g. \(\varphi(S|X_2=0) = 0.444\), but samples 1, 2 give 0.5); the final 0.0133 is still right because the sizes match. It also says "computed in (1)" instead of (3), and labels both children \(v_1\).</li></ul>`,
      },

      "ig-counts": {
        title: "Information gain written in counts",
        minutes: 2,
        cue: R`"Express \(\mathrm{IG}(S, X_7)\) using \(n_0, p_0, p_1, n_1\)" (2025-A Q3.4, 5 points).`,
        lines: [
          R`Sizes: \(|S_0| = p_0+n_0\), \(|S_1| = p_1+n_1\), \(N = p_0+n_0+p_1+n_1\).`,
          R`\(H(S_0) = -\tfrac{p_0}{p_0+n_0}\log_2\tfrac{p_0}{p_0+n_0} - \tfrac{n_0}{p_0+n_0}\log_2\tfrac{n_0}{p_0+n_0}\); \(H(S_1)\) the same with \(p_1, n_1\).`,
          R`Parent: \(H(S) = -\tfrac{p_0+p_1}{N}\log_2\tfrac{p_0+p_1}{N} - \tfrac{n_0+n_1}{N}\log_2\tfrac{n_0+n_1}{N}\).`,
          R`\(\mathrm{IG} = H(S) - \tfrac{p_0+n_0}{N}H(S_0) - \tfrac{p_1+n_1}{N}H(S_1)\). Done.`,
        ],
        numbers: R`<p>Check on 2025-A's first data, split by \(X_1\): \(p_0 = 0, n_0 = 1, p_1 = 2, n_1 = 1, N = 4\).</p>
<ul>
<li>\(H(S) = H(\tfrac24) = 1\), \(H(S_0) = 0\) (pure), \(H(S_1) = H(\tfrac23) = 0.9183\)</li>
<li>\(\mathrm{IG} = 1 - \tfrac14\cdot 0 - \tfrac34\cdot 0.9183 = 1 - 0.6887 = 0.3113\)</li>
</ul>`,
        trap: R`The parent's positives are \(p_0 + p_1\), not \(p_0\): the parent contains both children.`,
        why: [
          [R`Optional simplification`, R`<p>Multiplying out, each weight cancels one denominator: \(\tfrac{p_0+n_0}{N}\cdot\tfrac{p_0}{p_0+n_0} = \tfrac{p_0}{N}\). So</p>
\[\mathrm{IG} = H(S) + \tfrac{p_0}{N}\log_2\tfrac{p_0}{p_0+n_0} + \tfrac{n_0}{N}\log_2\tfrac{n_0}{p_0+n_0} + \tfrac{p_1}{N}\log_2\tfrac{p_1}{p_1+n_1} + \tfrac{n_1}{N}\log_2\tfrac{n_1}{p_1+n_1}\]
<p>The unsimplified line 4 is also a full answer.</p>`],
        ],
        side: R`<ul>
<li>Careful: here \(p_a\) is a <b>count</b>, not a fraction.</li>
<li>The question writes plain "log"; any base is accepted. \(\log_2\) matches the formula sheet.</li>
</ul>`,
      },

      "gini-max-proof": {
        title: "Proof: Gini is at most ½",
        minutes: 1,
        cue: R`"Prove that in this scenario we are guaranteed to have \(\varphi_{Gini}(p) \le \tfrac12\)" (2025-B Q2.5).`,
        lines: [
          R`\(\varphi(p) = 1 - p^2 - (1-p)^2\).`,
          R`\(\varphi'(p) = -2p + 2(1-p) = 2 - 4p = 0 \iff p = \tfrac12\).`,
          R`\(\varphi''(p) = -4 \lt 0\): concave, so \(p = \tfrac12\) is the global maximum.`,
          R`\(\varphi(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\), so \(\varphi(p) \le \tfrac12\) for all \(p \in [0,1]\).`,
        ],
        numbers: R`<p>Exam roots: 2026-A, \(p = 0.6\): \(\varphi = 0.48 \le 0.5\). 2025-B, \(p = \tfrac12\): \(\varphi = \tfrac12\), the maximum itself.</p>`,
        why: [
          [R`Why line 2? The chain rule`, R`<p>The derivative of \(-p^2\) is \(-2p\). For \(-(1-p)^2\): outer derivative \(-2(1-p)\), times the inner derivative of \((1-p)\), which is \(-1\): \(-2(1-p)\cdot(-1) = +2(1-p)\).</p>`],
          [R`No derivatives: the algebra route`, R`<p>Expand \((1-p)^2 = 1 - 2p + p^2\):</p>
\[\varphi(p) = 1 - p^2 - 1 + 2p - p^2 = 2p - 2p^2 = \tfrac12 - 2\left(p - \tfrac12\right)^2 \le \tfrac12\]
<p>Check the last step: \(2(p - \tfrac12)^2 = 2p^2 - 2p + \tfrac12\), and \(\tfrac12 - (2p^2 - 2p + \tfrac12) = 2p - 2p^2\). A square is never negative, so subtracting it can only lower the value.</p>`],
        ],
        side: R`<ul><li>HW2 Q1.1 proved the \(k\)-class version with Cauchy–Schwarz: \(\varphi_{Gini} \le 1 - \tfrac1k\). With \(k = 2\) that is \(\tfrac12\).</li></ul>`,
      },

      "same-proportion-proof": {
        title: "Proof: equal child proportions give zero reduction",
        minutes: 2,
        cue: R`"Prove that if the node is split into two child nodes that have identical proportions of positive samples … the impurity reduction of this split is zero" (2025-B Q2.6). "\(\frac{n_0}{n_0+p_0} = \frac{n_1}{n_1+p_1} \Rightarrow \mathrm{IG}(S,X_7) = 0\)" (2025-A Q3.5).`,
        lines: [
          R`Name it: common proportion \(p\), so \(n_+^{(1)} = p\,n^{(1)}\) and \(n_+^{(2)} = p\,n^{(2)}\).`,
          R`Add: \(n_+ = p\,n^{(1)} + p\,n^{(2)} = p\,(n^{(1)} + n^{(2)}) = p\,n\), so the parent has proportion \(p\) too.`,
          R`Impurity depends only on the proportion: \(\varphi(S) = \varphi(S_1) = \varphi(S_2) = \varphi(p)\).`,
          R`\(\Delta\varphi = \varphi(p) - \tfrac{n^{(1)}}{n}\varphi(p) - \tfrac{n^{(2)}}{n}\varphi(p) = \varphi(p)(1 - 1) = 0\).`,
        ],
        numbers: R`<p>2025-B, split by \(X_1\): children 2 of 4 and 2 of 4 positive, parent 4 of 8 = \(\tfrac12\). \(\Delta\varphi = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = 0\).</p>`,
        trap: R`Don't assume the parent has proportion \(p\); showing it (line 2) is the point of the proof.`,
        why: [
          [R`The 2025-A version (negative fraction, entropy)`, R`<p>Call the common negative fraction \(q\): \(n_0 = q(n_0 + p_0)\), \(n_1 = q(n_1 + p_1)\). Add: \(n_0 + n_1 = q(n_0 + p_0 + n_1 + p_1) = qN\), so the parent's negative fraction is \(q\) too. Every node has negative fraction \(q\) (and positive fraction \(1 - q\)), so all three entropies equal \(H(q)\), and \(\mathrm{IG} = H(q)\left(1 - \tfrac{|S_0| + |S_1|}{N}\right) = H(q)(1 - 1) = 0\).</p>`],
          [R`Why line 4 is zero`, R`<p>The weights are the children's shares of the parent, \(\tfrac{n^{(1)}}{n} + \tfrac{n^{(2)}}{n} = \tfrac{n^{(1)} + n^{(2)}}{n} = \tfrac{n}{n} = 1\). So after the split the weighted average is still \(\varphi(p)\): nothing was removed.</p>`],
        ],
        side: R`<ul>
<li>Typo in the official 2025-B Q2.6 solution: one denominator has \(n^{(0)}\) superscripts; it should be \(n_+^{(1)} + n_-^{(1)} + n_+^{(2)} + n_-^{(2)}\).</li>
<li>The official 2025-A route substitutes the ratio into the counts formula and factors out the logs; the brackets sum to 0. Either route earns full marks.</li>
<li>Information gain is never negative (entropy is concave); this proof is the boundary case where it is exactly 0.</li>
</ul>`,
      },

      "feature-mapping": {
        title: "A feature mapping that makes a stump work",
        minutes: 2,
        cue: R`"Find a mapping \(\varphi: \mathbb{R}^2 \to \mathbb{R}^2\) of the form \((a_2x_1^2 + a_1x_1,\ b_2x_2^2 + b_1x_2)\) such that the mapped dataset can be classified without error using a depth-1 decision tree" (2026-B Q2.4).`,
        lines: [
          R`Pattern first, as an interval: red ⇔ \(x_2 \in (2.5, 6.5)\).`,
          R`Center 4.5, radius 2: \((x_2 - 4.5)^2 \lt 2^2 = 4\).`,
          R`Expand, move the constant right: \(x_2^2 - 9x_2 + 20.25 \lt 4 \iff x_2^2 - 9x_2 \lt -16.25\).`,
          R`The <b>second</b> coordinate uses \(x_2\): \(b_2 = 1\), \(b_1 = -9\); \(a_1 = a_2 = 0\).`,
          R`Tabulate \(z_2\) for every sample; state the split.`,
        ],
        numbers: R`<p>2026-B, \(z_2 = x_2^2 - 9x_2\):</p>
<ul>
<li>reds: \(x_2 = 3\): \(9 - 27 = -18\); \(x_2 = 6\): \(36 - 54 = -18\)</li>
<li>blues: \(x_2 = 1\): \(1 - 9 = -8\); \(x_2 = 2\): \(4 - 18 = -14\); \(x_2 = 8\): \(64 - 72 = -8\)</li>
</ul>
<p>Split: \(z_2 \lt -16\) → R, else B. Zero training error.</p>`,
        trap: R`Moed B: plugging points into \(\varphi\) with unknown \(a\)'s and \(b\)'s goes nowhere. Find the interval first, then the coordinate that uses \(x_2\).`,
        why: [
          [R`Why square the distance?`, R`<p>A stump on one feature asks one "\(z \lt t\)?", so it only separates small from large. The reds are a band in the middle of \(x_2\), with blues on both sides. Inside the band = close to its center, and \((x_2 - c)^2\) is small near \(c\) and large far away on <b>either</b> side. After mapping, "inside" becomes "\(z\) is small": one threshold. Here \(z_2 + 20.25 = (x_2 - 4.5)^2\): reds 2.25, blues 12.25, 6.25, 12.25.</p>`],
          [R`Why \((2.5, 6.5)\) and not \((2.5, 7)\)?`, R`<p>Any interval containing 3 to 6 and excluding 2 and 8 works. \((2.5, 6.5)\) is centered between the reds 3 and 6, so the numbers are round. With \((2.5, 7)\): \(c = 4.75\), \(r = 2.25\), \(x_2^2 - 9.5x_2 \lt 5.0625 - 22.5625 = -17.5\), so \(b_2 = 1\), \(b_1 = -9.5\). Reds give \(-19.5, -21\); blues \(-8.5, -15, -12\). Also perfect.</p>`],
        ],
        side: R`<ul>
<li><b>Slip in the official solution:</b> it puts \(x_2^2 - 9x_2\) in the first coordinate and sets \(a_1 = -9\), \(a_2 = 1\). But the \(a\)'s act on \(x_1\): \(z_1 = x_1^2 - 9x_1\) gives \(-18\) to both sample 2 (red) and sample 3 (blue), since both have \(x_1 = 3\). The working answer is its "switched" one: \(b_2 = 1\), \(b_1 = -9\).</li>
<li>\(-16\) is the midpoint between \(-18\) and \(-14\); the \(-16.25\) from line 3 works too.</li>
<li>The letter \(\varphi\) here is a feature mapping, not the impurity.</li>
</ul>`,
      },
    },
    parts: {
      "2025B-q2.1": ["gini-node"],
      "2025B-q2.2": ["split-reduction"],
      "2025B-q2.3": ["min-depth-tree"],
      "2025B-q2.4": ["classify"],
      "2025B-q2.5": ["gini-max-proof"],
      "2025B-q2.6": ["same-proportion-proof"],
      "2025C-q2.1": ["gini-node"],
      "2025C-q2.2": ["split-reduction"],
      "2025C-q2.3": ["entropy"],
      "2025C-q2.4": ["fewest-splits"],
      "2025C-q2.5": ["prune"],
      "2025C-q2.6": ["loo"],
      "2025A-q3.1": ["no-depth-1"],
      "2025A-q3.2": ["min-depth-tree"],
      "2025A-q3.3": ["wrong-instance"],
      "2025A-q3.4": ["ig-counts"],
      "2025A-q3.5": ["same-proportion-proof"],
      "2026A-q2.1": ["no-depth-1", "min-depth-tree"],
      "2026A-q2.2": ["remove-one-sample"],
      "2026A-q2.3": ["gini-node", "split-reduction"],
      "2026A-q2.4": ["id3-algorithm"],
      "2026A-q2.5": ["first-iteration", "split-reduction"],
      "2026B-q2.1": ["entropy", "midpoint-thresholds"],
      "2026B-q2.2": ["threshold-band"],
      "2026B-q2.3": ["loo-trees"],
      "2026B-q2.4": ["feature-mapping"],
    },
  };
})();
