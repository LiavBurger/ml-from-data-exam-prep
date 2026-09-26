// Notes for topic "trees". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["trees"] = {
  intro: R`<p>Decision trees are Question 2 of almost every past exam (Question 3 in 2025-A). This is your strongest topic: you scored 21/25 in Moed B, and 4 of the 5 lost points were on one part (the feature mapping, note 12). The notes move a bit faster here, but every calculation is still written out in full.</p>
<p>The parts repeat from exam to exam, in roughly this order:</p>
<ol>
<li><b>Impurity of the whole dataset</b>: Gini or entropy (notes 1, 3).</li>
<li><b>Impurity reduction of a split</b>: binary, multi-valued or real-valued feature (notes 2–4).</li>
<li><b>The smallest tree with zero training error</b>, and why nothing smaller works (notes 6–7).</li>
<li><b>Using the tree</b>: classify a test point, invent a misclassified one, prune (note 8).</li>
<li><b>Leave-one-out error</b> (note 9).</li>
<li><b>The tree-building algorithm</b>: fix it, or run one iteration with a queue (note 5).</li>
<li><b>A short proof</b> (notes 10–11) or <b>a feature mapping</b> that makes a depth-1 tree work (note 12).</li>
</ol>
<p><b>How to use the notes:</b> read them in order, since each one builds on the one before. The worked examples use <b>2025-B Question 2</b> (your guided question) wherever that question has the part. When a kind of part never appears in 2025-B, the note uses the real exam question where it does appear and names it. Then do the other four questions on your own.</p>
<p><b>Formula sheet:</b> it gives Gini and entropy (entropy with \(\log_2\)). It does <b>not</b> give the impurity-reduction formula (note 2), so memorize that one.</p>`,
  moves: [
    { title: "0 · Start here: what a decision tree is",
      idea: R`<p>We are doing <b>classification</b>. As in regression, the data is a table: each <b>row</b> is one sample, the columns are its <b>features</b> (also called <b>attributes</b>), and the last column is its <b>label</b>. The difference from regression is that the label is not a number. It is one of a few classes: \(+/-\), like/dislike, blue/red.</p>
<h5>Step 1 — a tree is a flowchart of questions</h5>
<p>A decision tree predicts a label by asking questions about the features, one at a time:</p>
<ul>
<li>The <b>root</b> is the first question, e.g. "what is \(X_3\)?".</li>
<li>Each possible answer is a <b>branch</b> leading to the next node.</li>
<li>An <b>internal node</b> asks another question, about one feature.</li>
<li>A <b>leaf</b> asks nothing. It holds a class label, and that label is the prediction.</li>
</ul>
<h5>Step 2 — classifying a sample</h5>
<p>Start at the root. Look up the feature the root asks about, follow the branch that matches the sample's value, and repeat until you reach a leaf. The leaf's label is the prediction \(\hat y\).</p>
<h5>Step 3 — each node holds the training samples that reach it</h5>
<p>Push every training sample down the tree. The root holds all of them. Each child holds only the samples whose value matches its branch. We write \(S\) for the set of samples at a node. A node is <b>pure</b> when every sample in \(S\) has the same label. If every leaf is pure (and labelled with that label), the tree makes <b>zero training errors</b>.</p>
<h5>Step 4 — size: depth and number of splits</h5>
<p>The <b>depth</b> of a tree is the number of questions on its longest root-to-leaf path. A depth-1 tree asks a single question, and is also called a <b>stump</b>. The <b>number of splits</b> is the number of internal nodes (every question asked anywhere in the tree). The exams ask for trees with small depth or few splits, because a small tree is less likely to <b>overfit</b>, meaning memorize the training data instead of learning the pattern (note 8).</p>`,
      notation: [
        [R`\(X_1, X_2, \dots\)`, R`the features (attributes). "Attribute \(A\)" means one of them.`],
        [R`\(y\), \(Y\)`, R`the label. Here it is a class: \(+/-\), B/R, like/dislike.`],
        [R`\(\hat y\)`, R`the tree's predicted label`],
        [R`\(S\)`, R`the set of training samples at a node (the root holds all of them)`],
        [R`\(|S|\)`, R`the number of samples in \(S\)`],
        [R`\(S_v\)`, R`after splitting \(S\) by attribute \(A\): the samples of \(S\) with \(A = v\) (the child for value \(v\))`],
        ["pure node", R`every sample in \(S\) has the same label`],
        ["depth", "the number of questions on the longest root-to-leaf path"],
        ["split / internal node", "a node that asks a question. \"Number of splits\" = number of internal nodes."],
        ["stump", "a depth-1 tree: one question, then leaves"],
      ],
      example: R`<p>The lecture's "play tennis" tree (ML03 slides). The table has 14 days, the features Outlook, Temperature, Humidity and Wind, and the label PlayTennis (yes/no). The tree built from it is:</p>
<pre><code>                 [Outlook?]
        Sunny /     | Overcast   \ Rain
   [Humidity?]     "yes"      [Wind?]
  Normal/  \High             Weak/  \Strong
   "yes"   "no"             "yes"   "no"</code></pre>
<p><b>Classify day 1</b> (Outlook = Sunny, Temperature = Hot, Humidity = High, Wind = Weak):</p>
<ol>
<li>The root asks about Outlook. Day 1 has Sunny, so follow the Sunny branch.</li>
<li>That node asks about Humidity. Day 1 has High, so follow the High branch.</li>
<li>That's a leaf labelled "no". Prediction: \(\hat y = \) no. Day 1's true label is "no", so this is correct.</li>
</ol>
<p>Temperature was never asked. A sample only answers the questions on its own path.</p>
<p><b>What the nodes hold.</b> The root holds all 14 days (9 yes, 5 no). The Overcast child holds the 4 overcast days, all "yes", so it is pure and becomes a leaf straight away.</p>
<p><b>Size.</b> The longest path asks 2 questions (Outlook, then Humidity or Wind), so the depth is 2. There are 3 internal nodes (Outlook, Humidity, Wind), so the tree has 3 splits and 5 leaves.</p>` },

    { title: "1 · Impurity of one node: Gini",
      idea: R`<p>From note 0: a node holds a set \(S\) of samples, and we want every leaf to be pure. To build a good tree we need a <b>number</b> that says how mixed a node's labels are. It should be 0 for a pure node and largest when the classes are half and half. That number is called the <b>impurity</b> \(\varphi\) ("phi").</p>
<h5>Step 1 — describe the node by its class proportion</h5>
<p>With two classes, count the positive samples in \(S\) and divide by \(|S|\). That fraction is \(p\). The fraction of negatives is then \(1 - p\). Impurity only looks at these proportions. It does not care which samples they are or what their features are.</p>
<h5>Step 2 — the Gini impurity</h5>
\[\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2\]
<p>With \(k\) classes and proportions \(p_1, \dots, p_k\), this becomes \(\varphi_{Gini} = 1 - \sum_{j=1}^k p_j^2\) (this form is on the formula sheet). With two classes, \(p_1 = p\) and \(p_2 = 1-p\), which gives the formula above.</p>
<h5>Step 3 — check that it behaves the way we wanted</h5>
<ul>
<li>Pure node, \(p = 1\): \(1 - 1^2 - 0^2 = 0\). Pure node, \(p = 0\): \(1 - 0^2 - 1^2 = 0\).</li>
<li>Half and half, \(p = \tfrac12\): \(1 - \tfrac14 - \tfrac14 = \tfrac12\), the largest value possible with two classes (note 11 proves this).</li>
<li>It is symmetric: \(\varphi(0.4) = \varphi(0.6)\). So it doesn't matter whether you take \(p\) as the fraction of \(+\) or of \(-\).</li>
</ul>
<p><b>What Gini means</b> (your HW2 Q1.2): draw two samples from the node at random, with replacement. \(\sum_j p_j^2\) is the probability that they have the same label, so \(\varphi_{Gini}\) is the probability that their labels <b>differ</b>.</p>`,
      notation: [
        [R`\(p\)`, R`the fraction of positive samples in the node: \(p = \dfrac{\#\text{positives}}{|S|}\)`],
        [R`\(\varphi(p)\) or \(\varphi(S)\)`, R`the impurity of the node. Both notations mean the same thing, because impurity depends only on the proportions.`],
        [R`\(\varphi_{Gini}\)`, R`Gini impurity \(= 1 - \sum_j p_j^2\)`],
        [R`\(\varphi(a, b)\)`, R`some solutions write both proportions, e.g. \(\varphi(\tfrac25, \tfrac35)\), meaning \(\tfrac25\) of one class and \(\tfrac35\) of the other`],
      ],
      example: R`<p><b>2025-B Q2.1</b> (the guided question). The label column, top to bottom, is \(-, +, +, -, +, -, -, +\).</p>
<ul>
<li>Count: positives are rows 2, 3, 5, 8, so 4 of them. Negatives are rows 1, 4, 6, 7, so 4 of them. \(|S| = 8\).</li>
<li>Proportion: \(p = \dfrac{4}{8} = \dfrac12\).</li>
<li>Gini: \(\varphi_{Gini}(\tfrac12) = 1 - \left(\tfrac12\right)^2 - \left(1-\tfrac12\right)^2 = 1 - \tfrac14 - \tfrac14 = \tfrac12\).</li>
</ul>
<p><b>2025-C Q2.1</b> is the same calculation. The six reactions are \(-, +, -, -, +, +\): 3 likes and 3 dislikes, so \(p = \tfrac36 = \tfrac12\) and \(\varphi = \tfrac12\).</p>
<p><b>An unbalanced node, 2026-A</b> (used again in Q2.3). The labels of samples 1–5 are \(-, +, +, -, +\). Positives: samples 2, 3, 5, so 3 of them. \(p = \tfrac35 = 0.6\):</p>
\[\varphi_{Gini}(0.6) = 1 - 0.6^2 - 0.4^2 = 1 - 0.36 - 0.16 = 0.48\]`,
      cue: R`"Calculate / compute the Gini impurity for the entire dataset" (2025-B Q2.1, 2025-C Q2.1, 3 points each). The same number is the first line of every impurity-reduction part.`,
      first: R`Count the \(+\) and \(-\) in the label column, then write \(p = \#{+}/n\).`,
      trap: R`Plug in <b>fractions</b>, not counts: \(1 - (4/8)^2 - (4/8)^2\), never \(1 - 4^2 - 4^2\).` },

    { title: "2 · Impurity reduction: scoring a split",
      idea: R`<p>Note 1 measures one node. Now we choose a question to ask. Splitting \(S\) by attribute \(A\) sends every sample to the child that matches its value of \(A\). A good question gives children that are <b>purer</b> than the parent. We want one number that scores the whole split.</p>
<h5>Step 1 — split</h5>
<p>For each value \(v\) of \(A\), collect the samples with \(A = v\). That set is the child \(S_v\). For a binary feature there are two children, \(S_{A=0}\) and \(S_{A=1}\).</p>
<h5>Step 2 — the impurity of each child</h5>
<p>Count the labels in each child and apply note 1. The result is \(\varphi(S_v)\).</p>
<h5>Step 3 — average the children, weighted by size</h5>
<p>A child that holds 6 samples should count more than one that holds 2. So each child's impurity is multiplied by its share of the samples, \(\dfrac{|S_v|}{|S|}\), and the products are added. The result is the average impurity after the split, seen from a random sample.</p>
<h5>Step 4 — reduction = before − after</h5>
\[\Delta\varphi(S, A) = \varphi(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|}\,\varphi(S_v)\]
<p>This is the <b>impurity reduction</b>, also called the "goodness of split". A bigger value means a better question. If it is 0, the question taught us nothing. The tree-building algorithm (note 5) picks the attribute with the <b>largest</b> reduction.</p>`,
      notation: [
        [R`\(A\)`, R`the attribute being tested as a split (\(X_1\), Genre, …)`],
        [R`\(\text{Values}(A)\)`, R`the values \(A\) can take: \(\{0,1\}\) for a binary feature, \(\{\text{Action, Comedy, Drama}\}\) for Genre`],
        [R`\(\dfrac{|S_v|}{|S|}\)`, R`the weight of child \(v\): its share of the parent's samples`],
        [R`\(\Delta\varphi(S, A)\)`, R`the impurity reduction of splitting \(S\) by \(A\). It is <b>not</b> on the formula sheet.`],
      ],
      example: R`<p><b>2025-B Q2.2</b>: splitting by \(X_1\) and by \(X_4\), with Gini. From note 1, \(\varphi(S) = \tfrac12\).</p>
<h5>Split by \(X_1\)</h5>
<p>The \(X_1\) column is \(0,0,0,0,1,1,1,1\).</p>
<ul>
<li>\(X_1 = 0\): rows 1–4, labels \(-, +, +, -\). That's 2 positive out of 4, so \(p = \tfrac24 = \tfrac12\) and \(\varphi = 1 - \tfrac14 - \tfrac14 = \tfrac12\).</li>
<li>\(X_1 = 1\): rows 5–8, labels \(+, -, -, +\). That's 2 positive out of 4, so \(p = \tfrac12\) and \(\varphi = \tfrac12\).</li>
</ul>
\[\Delta\varphi(S, X_1) = \frac12 - \frac48\cdot\frac12 - \frac48\cdot\frac12 = \frac12 - \frac14 - \frac14 = 0\]
<p>Both children are exactly as mixed as the parent (half and half), so the split gained nothing. Note 11 proves that this always happens when the children have the same proportion.</p>
<h5>Split by \(X_4\)</h5>
<p>The \(X_4\) column is \(0,0,1,0,1,0,0,0\).</p>
<ul>
<li>\(X_4 = 1\): rows 3 and 5, labels \(+, +\). \(p = \tfrac22 = 1\), so \(\varphi = 1 - 1^2 - 0^2 = 0\) (pure).</li>
<li>\(X_4 = 0\): rows 1, 2, 4, 6, 7, 8, labels \(-, +, -, -, -, +\). That's 2 positive out of 6, so \(p = \tfrac26 = \tfrac13\) and
\[\varphi = 1 - \left(\tfrac13\right)^2 - \left(\tfrac23\right)^2 = 1 - \tfrac19 - \tfrac49 = \tfrac49\]</li>
</ul>
\[\Delta\varphi(S, X_4) = \frac12 - \frac28\cdot 0 - \frac68\cdot\frac49 = \frac12 - 0 - \frac{24}{72} = \frac12 - \frac13 = \frac16\]
<h5>The other two features (not asked, but useful for part 3)</h5>
<ul>
<li>\(X_2\) (column \(0,0,1,1,0,0,1,1\)): \(X_2 = 0\) holds rows 1, 2, 5, 6 with labels \(-, +, +, -\), and \(X_2 = 1\) holds rows 3, 4, 7, 8 with labels \(+, -, -, +\). Both children are 2 out of 4 positive, so both have \(\varphi = \tfrac12\), and \(\Delta\varphi = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = \tfrac12 - \tfrac14 - \tfrac14 = 0\).</li>
<li>\(X_3\) (column \(0,1,0,0,0,0,0,1\)): \(X_3 = 1\) holds rows 2, 8 with labels \(+, +\), pure, so \(\varphi = 0\). \(X_3 = 0\) holds rows 1, 3, 4, 5, 6, 7 with labels \(-, +, -, +, -, -\): 2 positive out of 6, so \(\varphi = \tfrac49\) (the same numbers as the \(X_4 = 0\) child above). \(\Delta\varphi = \tfrac12 - \tfrac28\cdot 0 - \tfrac68\cdot\tfrac49 = \tfrac12 - \tfrac13 = \tfrac16\).</li>
</ul>
<p>All four: \(X_1: 0\), \(X_2: 0\), \(X_3: \tfrac16\), \(X_4: \tfrac16\).</p>
<h5>Second example with decimals: 2026-A Q2.3</h5>
<p>From note 1, \(\varphi(S) = 0.48\). The \(X_1\) column is \(0,1,1,1,1\):</p>
<ul>
<li>\(X_1 = 0\): sample 1 only, label \(-\). Pure, so \(\varphi = 0\).</li>
<li>\(X_1 = 1\): samples 2–5, labels \(+, +, -, +\). \(p = \tfrac34\), so \(\varphi = 1 - 0.75^2 - 0.25^2 = 1 - 0.5625 - 0.0625 = 0.375\).</li>
</ul>
\[\Delta\varphi(S, X_1) = 0.48 - \tfrac15\cdot 0 - \tfrac45\cdot 0.375 = 0.48 - 0 - 0.3 = 0.18\]
<p>The \(X_4\) column is \(1,0,1,0,0\):</p>
<ul>
<li>\(X_4 = 0\): samples 2, 4, 5, labels \(+, -, +\). \(p = \tfrac23\), so \(\varphi = 1 - \tfrac49 - \tfrac19 = \tfrac49 \approx 0.444\).</li>
<li>\(X_4 = 1\): samples 1 and 3, labels \(-, +\). \(p = \tfrac12\), so \(\varphi = 0.5\).</li>
</ul>
\[\Delta\varphi(S, X_4) = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.48 - \tfrac{12}{45} - 0.2 = 0.48 - 0.2667 - 0.2 = 0.0133\]
<p>(The official solution writes \(\tfrac35\cdot 0.444\). Keep \(\tfrac49\) as a fraction until the end: \(0.6\cdot 0.444 = 0.2664\) would give 0.0136 instead of 0.0133.)</p>`,
      cue: R`"Calculate the goodness of fit (impurity reduction) when splitting the dataset with attributes \(X_1\) and \(X_4\) … write all intermediate calculations" (2025-B Q2.2, 2026-A Q2.3).`,
      first: R`Write the formula \(\Delta\varphi(S,A) = \varphi(S) - \sum_v \frac{|S_v|}{|S|}\varphi(S_v)\), then \(\varphi(S)\) from note 1.`,
      recipe: R`For each child, write one line: <i>which rows</i> → <i>their labels</i> → \(p\) → \(\varphi\). Then substitute everything into the formula. Listing the row numbers earns partial credit even if a later number slips.`,
      trap: R`Use the weight \(|S_v|/|S|\) (the child's size over the <b>parent's</b> size). A plain average of the children, or dividing by the number of children, is wrong.` },

    { title: "3 · The entropy variant (information gain), and attributes with many values",
      idea: R`<h5>Why a second impurity exists</h5>
<p>Gini is one way to measure how mixed a node is. <b>Entropy</b> comes from information theory and measures the same thing in a different way: how uncertain we are about the label of a random sample from the node. It too is 0 for a pure node and largest at half and half. The exams switch between the two: "repeat (2) using entropy" (2025-C Q2.3), or "information gain" (2025-A, 2026-B), which is just the entropy version of note 2.</p>
<h5>What exactly changes</h5>
<p>Only \(\varphi\) changes. Everything from note 2 (children, weights, before − after) stays the same.</p>
\[H(p) = -p\log_2 p - (1-p)\log_2(1-p), \qquad \text{with } k \text{ classes: } H = -\sum_{j=1}^k p_j \log_2 p_j\]
<ul>
<li>Base 2, as on the formula sheet and in every official solution.</li>
<li>Convention: \(0 \cdot \log_2 0 = 0\). So a pure node has \(H = -1\cdot\log_2 1 - 0 = 0\).</li>
<li>Half and half: \(H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = -\tfrac12(-1) - \tfrac12(-1) = 1\), the maximum for two classes.</li>
<li>Like Gini, it is symmetric: \(H(\tfrac14) = H(\tfrac34)\).</li>
</ul>
<p>The reduction with entropy is called the <b>information gain</b>:</p>
\[\mathrm{IG}(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|}\, H(S_v)\]
<h5>\(\log_2\) on a calculator</h5>
<p>Use \(\log_2 x = \dfrac{\ln x}{\ln 2}\). For example, \(\log_2 0.75 = \dfrac{\ln 0.75}{\ln 2} = \dfrac{-0.2877}{0.6931} = -0.4150\). Every \(\log_2\) of a number below 1 is negative, so each term \(-p\log_2 p\) comes out positive.</p>
<h5>Attributes with more than two values</h5>
<p>A binary feature makes two children. An attribute like Genre (Action / Comedy / Drama) makes <b>one child per value</b>, so here three. The sum in the formula then has three terms, and nothing else changes.</p>`,
      notation: [
        [R`\(H(p)\), \(H(S)\)`, R`entropy of a node with positive fraction \(p\)`],
        [R`\(\log_2\)`, R`logarithm base 2: \(\log_2 2 = 1\), \(\log_2 \tfrac12 = -1\), \(\log_2 \tfrac14 = -2\)`],
        [R`\(\mathrm{IG}(S, A)\)`, R`information gain = impurity reduction with \(\varphi = H\)`],
      ],
      example: R`<p><b>2025-C</b>, six movie ratings, splitting by <b>Genre</b>. First list each child's instances and their reactions:</p>
<ul>
<li>Action: instances 1 \((-)\) and 2 \((+)\). \(p = \tfrac12\).</li>
<li>Comedy: instances 3 \((-)\) and 4 \((-)\). \(p = 0\), pure.</li>
<li>Drama: instances 5 \((+)\) and 6 \((+)\). \(p = 1\), pure.</li>
</ul>
<p>Each child holds 2 of the 6 instances, so every weight is \(\tfrac26\).</p>
<p><b>Q2.2, Gini</b> (\(\varphi(S) = \tfrac12\) from note 1):</p>
<ul>
<li>Children: \(\varphi(\tfrac12) = \tfrac12\), \(\varphi(0) = 1 - 0 - 1 = 0\), \(\varphi(1) = 1 - 1 - 0 = 0\).</li>
</ul>
\[\Delta\varphi_{Gini}(\text{Genre}) = \frac12 - \left(\frac26\cdot\frac12 + \frac26\cdot 0 + \frac26\cdot 0\right) = \frac12 - \frac16 = \frac13\]
<p><b>Q2.3, entropy.</b> Parent: 3 likes and 3 dislikes, so</p>
\[H(S) = H(\tfrac12) = -\tfrac12\log_2\tfrac12 - \tfrac12\log_2\tfrac12 = -\tfrac12(-1) - \tfrac12(-1) = \tfrac12 + \tfrac12 = 1\]
<ul>
<li>Children: \(H(\tfrac12) = 1\), \(H(0) = 0\), \(H(1) = 0\).</li>
</ul>
\[\mathrm{IG}(\text{Genre}) = 1 - \left(\frac26\cdot 1 + \frac26\cdot 0 + \frac26\cdot 0\right) = 1 - \frac13 = \frac23\]
<p><b>A child that isn't half and half</b> (used in note 4). A node with 3 of one class and 1 of the other:</p>
\[H(\tfrac34) = -\tfrac34\log_2\tfrac34 - \tfrac14\log_2\tfrac14 = -0.75\cdot(-0.4150) - 0.25\cdot(-2) = 0.3113 + 0.5 = 0.8113\]
<p><b>Do Gini and entropy agree?</b> Usually, but not always. For 2025-C, let's also score the other two attributes.</p>
<ul>
<li><b>Time:</b> Weekend holds instances 1 \((-)\), 3 \((-)\), 5 \((+)\), so \(p = \tfrac13\). Weekday holds 2 \((+)\), 4 \((-)\), 6 \((+)\), so \(p = \tfrac23\). Each child holds 3 of the 6, weight \(\tfrac36 = \tfrac12\).
<ul>
<li>Gini of each child: \(1 - \left(\tfrac13\right)^2 - \left(\tfrac23\right)^2 = 1 - \tfrac19 - \tfrac49 = \tfrac49\). Reduction: \(\tfrac12 - \tfrac12\cdot\tfrac49 - \tfrac12\cdot\tfrac49 = \tfrac12 - \tfrac49 = \tfrac{9}{18} - \tfrac{8}{18} = \tfrac{1}{18}\).</li>
<li>Entropy of each child: \(H(\tfrac13) = -\tfrac13\log_2\tfrac13 - \tfrac23\log_2\tfrac23 = -0.3333\cdot(-1.5850) - 0.6667\cdot(-0.5850) = 0.5283 + 0.3900 = 0.9183\). Gain: \(1 - \tfrac12\cdot 0.9183 - \tfrac12\cdot 0.9183 = 1 - 0.9183 = 0.0817\).</li>
</ul></li>
<li><b>Age:</b> Young holds 1 \((-)\), 2 \((+)\), 3 \((-)\), so \(p = \tfrac13\). Adult holds 4 \((-)\), 5 \((+)\), 6 \((+)\), so \(p = \tfrac23\). These are exactly the same proportions and sizes as Time, so the numbers are the same: \(\tfrac1{18}\) and 0.0817.</li>
</ul>
<p>Side by side:</p>
<div class="tw"><table><thead><tr><th>attribute</th><th>Gini reduction</th><th>information gain</th></tr></thead><tbody>
<tr><td>Genre</td><td>1/3 ≈ 0.333</td><td>2/3 ≈ 0.667</td></tr>
<tr><td>Time</td><td>1/18 ≈ 0.056</td><td>0.082</td></tr>
<tr><td>Age</td><td>1/18 ≈ 0.056</td><td>0.082</td></tr></tbody></table></div>
<p>Both measures pick Genre. The numbers themselves differ (entropy's scale goes up to 1, Gini's only up to ½), so never compare a Gini number with an entropy number.</p>`,
      cue: R`"Repeat (2) using entropy instead of Gini impurity" (2025-C Q2.3). "Information gain (decrease in entropy impurity)" (2026-B Q2.1). "Gini impurity reduction obtained by splitting by the Genre attribute" (2025-C Q2.2).`,
      first: R`Write \(H(S)\) for the parent. With half and half it is exactly 1.`,
      recipe: R`Use the same child table as for Gini, just with an \(H\) column. A pure child has \(H = 0\) with no calculation. A half-and-half child has \(H = 1\).`,
      trap: R`Use \(\log_2\), not \(\ln\) or \(\log_{10}\). With \(\ln\), \(H(\tfrac12) = 0.693\) instead of 1, and every number after that is off.` },

    { title: "4 · Real-valued features: midpoint thresholds",
      idea: R`<p>So far every feature had a few values (0/1, three genres), and each value got its own child. In 2026-B the features are <b>real numbers</b>: \(X_1\) takes the values 2, 3, 4, 5, 6, 8. One child per value would make a leaf for every number, which is useless for a new sample with \(X_1 = 4.7\).</p>
<h5>The idea: one yes/no question with a threshold</h5>
<p>Instead ask "is \(X_1 \lt t\)?" for some threshold \(t\). The samples below \(t\) go left and the rest go right, so there are always 2 children.</p>
<h5>Which thresholds to try</h5>
<p>Only the <b>order</b> of the values matters. Every \(t\) between 4 and 5 sends exactly the same samples left (the ones with \(X_1 \le 4\)). So we need only one candidate per gap between consecutive distinct values, and the course uses the <b>midpoint</b> of the gap.</p>
<ol>
<li>Sort the <b>distinct</b> values of the feature.</li>
<li>Take the midpoint of each consecutive pair.</li>
<li>For each midpoint \(t\), split into \(X \lt t\) and \(X \gt t\), and compute the impurity reduction (note 2 or 3).</li>
<li>Pick the threshold with the largest reduction.</li>
</ol>
<p>A real-valued feature can be split <b>again</b> further down the tree, with a different threshold. At each node, the midpoints are recomputed from the samples that reach that node.</p>`,
      notation: [
        [R`\(t\)`, R`a threshold. The question is "\(X_j \lt t\)?"`],
        [R`\(S_{X_1 \lt t}\)`, R`the samples with \(X_1\) below \(t\) (left child), and \(S_{X_1 \gt t}\) the rest`],
        ["midpoint", R`\(\tfrac{a+b}{2}\) for consecutive distinct values \(a \lt b\). No sample ever sits exactly on it.`],
      ],
      example: R`<p><b>2026-B Q2.1</b>: find the \(X_1\) split with the largest information gain.</p>
<div class="tw"><table><thead><tr><th>sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr></thead><tbody>
<tr><td>\(X_1\)</td><td>2</td><td>3</td><td>3</td><td>4</td><td>5</td><td>6</td><td>6</td><td>8</td></tr>
<tr><td>\(X_2\)</td><td>2</td><td>3</td><td>8</td><td>2</td><td>3</td><td>1</td><td>6</td><td>6</td></tr>
<tr><td>\(y\)</td><td>B</td><td>R</td><td>B</td><td>B</td><td>R</td><td>B</td><td>R</td><td>R</td></tr></tbody></table></div>
<p><b>Parent:</b> 4 blue and 4 red, so \(H(S) = H(\tfrac12) = 1\).</p>
<p><b>Candidates:</b> the distinct \(X_1\) values are 2, 3, 4, 5, 6, 8 (3 and 6 each appear twice, but count once). The midpoints are 2.5, 3.5, 4.5, 5.5 and 7.</p>
<h5>\(t = 4.5\) in full</h5>
<ul>
<li>Left, \(X_1 \lt 4.5\): samples 1, 2, 3, 4, labels B, R, B, B. That's 3 blue and 1 red:
\[H = -\tfrac34\log_2\tfrac34 - \tfrac14\log_2\tfrac14 = -0.75\cdot(-0.4150) - 0.25\cdot(-2) = 0.3113 + 0.5 = 0.8113\]</li>
<li>Right, \(X_1 \gt 4.5\): samples 5, 6, 7, 8, labels R, B, R, R. That's 1 blue and 3 red, so by symmetry \(H = 0.8113\).</li>
</ul>
\[\mathrm{IG} = 1 - \tfrac48\cdot 0.8113 - \tfrac48\cdot 0.8113 = 1 - 0.4056 - 0.4056 = 0.1887 \approx 0.189\]
<h5>\(t = 2.5\)</h5>
<ul>
<li>Left: sample 1 only (B). Pure, \(H = 0\).</li>
<li>Right: samples 2–8, which are 3 blue (3, 4, 6) and 4 red (2, 5, 7, 8):
\[H = -\tfrac37\log_2\tfrac37 - \tfrac47\log_2\tfrac47 = -0.4286\cdot(-1.2224) - 0.5714\cdot(-0.8074) = 0.5239 + 0.4613 = 0.9852\]</li>
</ul>
\[\mathrm{IG} = 1 - \tfrac18\cdot 0 - \tfrac78\cdot 0.9852 = 1 - 0.8621 = 0.1379 \approx 0.138\]
<h5>\(t = 3.5\)</h5>
<ul>
<li>Left: samples 1, 2, 3 (B, R, B), so 2 blue and 1 red:
\[H = -\tfrac23\log_2\tfrac23 - \tfrac13\log_2\tfrac13 = -0.6667\cdot(-0.5850) - 0.3333\cdot(-1.5850) = 0.3900 + 0.5283 = 0.9183\]</li>
<li>Right: samples 4–8 (B, R, B, R, R), so 2 blue and 3 red:
\[H = -\tfrac25\log_2\tfrac25 - \tfrac35\log_2\tfrac35 = -0.4\cdot(-1.3219) - 0.6\cdot(-0.7370) = 0.5288 + 0.4422 = 0.9710\]</li>
</ul>
\[\mathrm{IG} = 1 - \tfrac38\cdot 0.9183 - \tfrac58\cdot 0.9710 = 1 - 0.3444 - 0.6069 = 0.0487 \approx 0.049\]
<h5>\(t = 5.5\) and \(t = 7\)</h5>
<p>These mirror 3.5 and 2.5. At 5.5 the left side is samples 1–5 (3 B, 2 R, \(H = 0.9710\)) and the right side is samples 6–8 (1 B, 2 R, \(H = 0.9183\)), so \(\mathrm{IG} = 1 - \tfrac58\cdot 0.9710 - \tfrac38\cdot 0.9183 \approx 0.049\). At 7 the left side is samples 1–7 (4 B, 3 R, \(H = 0.9852\)) and the right side is sample 8 (R, pure), so \(\mathrm{IG} = 1 - \tfrac78\cdot 0.9852 \approx 0.138\).</p>
<div class="tw"><table><thead><tr><th>\(t\)</th><th>2.5</th><th>3.5</th><th>4.5</th><th>5.5</th><th>7</th></tr></thead><tbody>
<tr><td>IG</td><td>0.138</td><td>0.049</td><td><b>0.189</b></td><td>0.049</td><td>0.138</td></tr></tbody></table></div>
<p><b>Answer:</b> split at \(X_1 = 4.5\), with IG = 0.189 (the official answer).</p>
<p><b>For comparison, \(X_2\)</b> (you'll want this in note 7). Its distinct values are 1, 2, 3, 6, 8, so the midpoints are 1.5, 2.5, 4.5 and 7. At \(t = 2.5\) the left side is samples 1, 4, 6, all blue (pure). The right side is 1 blue (sample 3) and 4 red, so \(H(\tfrac15) = -0.2\log_2 0.2 - 0.8\log_2 0.8 = -0.2\cdot(-2.3219) - 0.8\cdot(-0.3219) = 0.4644 + 0.2575 = 0.7219\). Then \(\mathrm{IG} = 1 - \tfrac38\cdot 0 - \tfrac58\cdot 0.7219 = 1 - 0.4512 = 0.549\), much better than any \(X_1\) split.</p>`,
      cue: R`"Find the split of the dataset by feature \(X_1\) that maximizes the information gain … use midpoints between consecutive distinct feature values as candidate split thresholds" (2026-B Q2.1, 8 points).`,
      first: R`Write the sorted distinct values and their midpoints on one line, e.g. "2, 3, 4, 5, 6, 8 → 2.5, 3.5, 4.5, 5.5, 7".`,
      recipe: R`For each \(t\), write one row: left samples (count B/R), right samples (count B/R), the two entropies, IG. Mirror-image splits give equal entropies, which saves time. Finish by naming the winner.`,
      trap: R`Take the midpoints of <b>distinct</b> values. The value 3 appears twice, but "3 to 3" is not a gap. Samples with equal values always go to the same side.` },

    { title: "5 · Building the tree: the algorithm with a queue",
      idea: R`<p>We can now score any split (notes 2–4). The algorithm from class (ID3, Quinlan) builds the whole tree <b>greedily</b>: at each node, take the best split available right now, then treat each child the same way. It needs a to-do list of nodes that still have to be processed, and that list is a <b>queue</b> \(Q\).</p>
<h5>The algorithm, as in the lecture</h5>
<ol type="a">
<li>Put the root \(v_{root}\) into \(Q\). It holds all the training samples.</li>
<li>While \(Q\) is not empty:
<ol>
<li>Pop a node \(v\) from \(Q\). Let \(S\) be its samples.</li>
<li>If all samples in \(S\) have the same label \(y\), make \(v\) a <b>leaf</b> with label \(y\) and go back to the start of the loop.</li>
<li>Otherwise:
<ol type="i">
<li>compute the impurity reduction of every attribute \(A\);</li>
<li>give \(v\) the attribute with the <b>largest</b> reduction;</li>
<li>split \(S\) by that attribute, make one child per subset, and <b>add each child to \(Q\)</b>.</li>
</ol></li>
</ol></li>
</ol>
<p>Why these two details matter:</p>
<ul>
<li><b>Largest</b>: we want the question that removes the most impurity.</li>
<li><b>Add the children to \(Q\)</b>: without this the loop ends after the root. The children would never be checked for purity or split further.</li>
</ul>
<h5>Greedy is not always optimal</h5>
<p>The algorithm never looks ahead. In 2025-A (note 6), the best-scoring first question is \(X_1\), but no depth-2 tree with \(X_1\) at the <b>root</b> has zero error, so the algorithm ends up deeper than necessary. So when an exam asks for a <b>minimum-depth</b> tree, you search by inspection (note 6). You don't just run this algorithm.</p>`,
      notation: [
        [R`\(Q\)`, R`the queue: nodes waiting to be processed, first in, first out`],
        [R`\(v\)`, R`a node of the tree, with its sample set \(S\)`],
        [R`\(v_1, v_2, \dots\)`, R`names for the new child nodes`],
      ],
      example: R`<p><b>2026-A Q2.4</b>: Donald's version of the algorithm has two mistakes.</p>
<ul>
<li>Step b.3.ii picks the attribute with the <b>smallest</b> impurity reduction. It should pick the <b>largest</b>.</li>
<li>Step b.3.iii splits \(S\) and makes the children, but never <b>adds each child of \(v\) to \(Q\)</b>. That is the missing operation.</li>
</ul>
<p><b>2026-A Q2.5</b>: run the first iteration of the loop on the 2026-A data.</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_1\)</th><th>\(x_2\)</th><th>\(x_3\)</th><th>\(x_4\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>−</td></tr><tr><td>2</td><td>1</td><td>0</td><td>1</td><td>0</td><td>+</td></tr>
<tr><td>3</td><td>1</td><td>1</td><td>0</td><td>1</td><td>+</td></tr><tr><td>4</td><td>1</td><td>1</td><td>1</td><td>0</td><td>−</td></tr>
<tr><td>5</td><td>1</td><td>1</td><td>0</td><td>0</td><td>+</td></tr></tbody></table></div>
<h5>Step 1 — pop the root</h5>
<p>\(Q = [v_{root}]\). Pop it, so \(S\) = samples 1–5, with labels \(-,+,+,-,+\). They are mixed, so this node is not a leaf.</p>
<h5>Step 2 — score every attribute</h5>
<p>Q2.3 already gave \(\Delta\varphi(X_1) = 0.18\) and \(\Delta\varphi(X_4) = 0.0133\) (note 2). The remaining two:</p>
<ul>
<li>\(X_2\): \(X_2 = 0\) holds samples 1, 2 (\(-, +\)), so \(p = \tfrac12\) and \(\varphi = 0.5\). \(X_2 = 1\) holds samples 3, 4, 5 (\(+, -, +\)), so \(p = \tfrac23\) and \(\varphi = 1 - \tfrac49 - \tfrac19 = \tfrac49 \approx 0.444\).
\[\Delta\varphi(X_2) = 0.48 - \tfrac25\cdot 0.5 - \tfrac35\cdot\tfrac49 = 0.48 - 0.2 - 0.2667 = 0.0133\]</li>
<li>\(X_3\): \(X_3 = 0\) holds samples 1, 3, 5 (\(-, +, +\)), so \(p = \tfrac23\) and \(\varphi = \tfrac49 \approx 0.444\). \(X_3 = 1\) holds samples 2, 4 (\(+, -\)), so \(p = \tfrac12\) and \(\varphi = 0.5\).
\[\Delta\varphi(X_3) = 0.48 - \tfrac35\cdot\tfrac49 - \tfrac25\cdot 0.5 = 0.48 - 0.2667 - 0.2 = 0.0133\]</li>
</ul>
<h5>Step 3 — pick the largest and split</h5>
<p>\(0.18\) beats \(0.0133\), so the root gets \(X_1\). Its children:</p>
<ul>
<li>\(v_1\) (branch \(X_1 = 0\)) holds \(\{x^{(1)}\}\).</li>
<li>\(v_2\) (branch \(X_1 = 1\)) holds \(\{x^{(2)}, x^{(3)}, x^{(4)}, x^{(5)}\}\).</li>
</ul>
<pre><code>          [X1 ?]
        0 /    \ 1
       v1        v2
     {1}      {2,3,4,5}</code></pre>
<p>Both children are added to the queue: \(Q = [v_1, v_2]\). \(v_1\) is pure, but it only becomes a leaf when it is <b>popped</b>, in iteration 2. After iteration 1 it is just a node waiting in \(Q\).</p>
<p class="muted">(Slips in the official 2026-A Q2.5 solution: it swaps the children of \(X_2\) and of \(X_3\). It writes \(\varphi(S|X_2=0) = 0.444\), but \(X_2 = 0\) holds samples 1, 2, whose Gini is 0.5. It also writes \(\varphi(S|X_3=1) = 0.444\), but \(X_3 = 1\) holds samples 2, 4, again 0.5. The final value 0.0133 is right anyway, because the sizes match. It also says "computed in (1)" instead of (3), and labels both children \(v_1\) in its drawing.)</p>`,
      cue: R`"Donald wrote the tree construction algorithm … an omitted operation and a faulty operation" (2026-A Q2.4). "Execute the first iteration of the loop … describe the tree and the contents of the queue" (2026-A Q2.5).`,
      first: R`Write the lecture algorithm from memory next to the given one and compare them line by line. To run it, write "Pop \(v_{root}\), \(S\) = all samples, labels mixed → not a leaf."`,
      recipe: R`One iteration = pop → purity check → score all attributes → pick the max → children with their sample sets → the new \(Q\). Always state \(Q\) at the end.`,
      trap: R`Don't forget to score <b>every</b> attribute. The question usually gave only some of them in an earlier part. And children don't become leaves inside the iteration that creates them.` },

    { title: "6 · Minimum depth: is depth 1 enough, and what is?",
      idea: R`<p>The most common tree part: "construct a decision tree of <b>minimum depth</b> that achieves zero training error", often with "explain why there is no tree of smaller depth". You don't need to run the algorithm. You reason about the table directly, in four steps.</p>
<h5>Step 1 — show that depth 1 is not enough</h5>
<p>A depth-1 tree asks one question, and its leaves are the children of that one split. It has zero error only if <b>every</b> child is pure. To rule out a feature, name <b>two samples</b> with the same value of that feature but different labels. They land in the same leaf, and a leaf has one label, so one of them is wrong. Do this for every feature.</p>
<h5>Step 2 — look for the rule</h5>
<p>Read the positive rows. Which feature values do they share, and which do the negatives lack? Often a one-line rule appears, like "+ exactly when \(X_3 = 1\) or \(X_4 = 1\)". The rule tells you which features the tree needs.</p>
<h5>Step 3 — build the depth-2 tree</h5>
<p>Put one of the rule's features at the root and the other in the child (or children) that are still mixed.</p>
<h5>Step 4 — map every sample to its leaf</h5>
<p>Write which samples reach which leaf and check that every leaf is pure. 2026-A asks for this explicitly, and it is your proof of zero error.</p>
<p><b>A useful fact:</b> if every sample has a <b>different combination</b> of values on two binary features, then a full depth-2 tree on those two features gives every sample its own leaf. Label each leaf with its sample's label and the training error is zero.</p>`,
      notation: [
        ["minimum depth", "no tree with fewer levels can reach zero training error"],
        ["conflicting pair", "two samples that share a feature value but have different labels. This is the proof that a split on that feature can't be pure."],
      ],
      example: R`<h5>2025-B Q2.3 (guided)</h5>
<div class="tw"><table><thead><tr><th>row</th><th>\(X_1\)</th><th>\(X_2\)</th><th>\(X_3\)</th><th>\(X_4\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>−</td></tr><tr><td>2</td><td>0</td><td>0</td><td>1</td><td>0</td><td>+</td></tr>
<tr><td>3</td><td>0</td><td>1</td><td>0</td><td>1</td><td>+</td></tr><tr><td>4</td><td>0</td><td>1</td><td>0</td><td>0</td><td>−</td></tr>
<tr><td>5</td><td>1</td><td>0</td><td>0</td><td>1</td><td>+</td></tr><tr><td>6</td><td>1</td><td>0</td><td>0</td><td>0</td><td>−</td></tr>
<tr><td>7</td><td>1</td><td>1</td><td>0</td><td>0</td><td>−</td></tr><tr><td>8</td><td>1</td><td>1</td><td>1</td><td>0</td><td>+</td></tr></tbody></table></div>
<p><b>Step 1.</b> One conflicting pair per feature:</p>
<ul>
<li>\(X_1 = 0\): rows 1 \((-)\) and 2 \((+)\).</li>
<li>\(X_2 = 0\): rows 1 \((-)\) and 2 \((+)\).</li>
<li>\(X_3 = 0\): rows 1 \((-)\) and 3 \((+)\).</li>
<li>\(X_4 = 0\): rows 1 \((-)\) and 2 \((+)\).</li>
</ul>
<p>No feature gives two pure children, so there is no depth-1 tree.</p>
<p><b>Step 2.</b> The positive rows are 2 (\(X_3 = 1\)), 3 (\(X_4 = 1\)), 5 (\(X_4 = 1\)) and 8 (\(X_3 = 1\)). Every negative row (1, 4, 6, 7) has \(X_3 = 0\) and \(X_4 = 0\). Rule: \(y = +\) exactly when \(X_3 = 1\) or \(X_4 = 1\).</p>
<p><b>Steps 3–4.</b></p>
<pre><code>            [X3 ?]
          0 /    \ 1
       [X4 ?]     +      &lt;- rows 2, 8
     0 /    \ 1
      -      +           &lt;- rows 3, 5
   rows 1,4,6,7</code></pre>
<p>Every leaf is pure, and the depth is 2, which is the minimum by step 1. Swapping \(X_3\) and \(X_4\) gives the official second tree. Here the greedy choice agrees: \(X_3\) and \(X_4\) are exactly the features with the largest reduction, \(\tfrac16\) (note 2).</p>
<h5>2025-A Q3.1–3.2: where greedy fails</h5>
<p>Data (\(X_1, X_2, X_3 \to y\)): sample 1 \((0,0,0) \to -\), sample 2 \((1,0,1) \to +\), sample 3 \((1,1,0) \to +\), sample 4 \((1,1,1) \to -\).</p>
<ul>
<li><b>Depth 1 fails.</b> \(X_1 = 1\) holds samples 2, 3 \((+)\) and 4 \((-)\). \(X_2 = 0\) holds samples 1 \((-)\) and 2 \((+)\). \(X_3 = 0\) holds samples 1 \((-)\) and 3 \((+)\).</li>
<li><b>Depth 2 with \(X_2, X_3\).</b> The \((X_2, X_3)\) pairs are \((0,0), (0,1), (1,0), (1,1)\), all different. So a full tree (\(X_2\) at the root, \(X_3\) in both children) puts each sample in its own leaf. The leaves are \((0,0) \to -\), \((0,1) \to +\), \((1,0) \to +\), \((1,1) \to -\).</li>
<li><b>Why greedy fails.</b> The parent is 2 positive out of 4, so \(\varphi(S) = \tfrac12\). Split by \(X_1\): \(X_1 = 0\) holds sample 1 only (pure, \(\varphi = 0\)), and \(X_1 = 1\) holds samples 2, 3, 4 (\(+, +, -\), so \(p = \tfrac23\) and \(\varphi = \tfrac49\)). The reduction is \(\tfrac12 - \tfrac14\cdot 0 - \tfrac34\cdot\tfrac49 = \tfrac12 - \tfrac13 = \tfrac16\) (with entropy, IG = 0.311, worked out in note 10). \(X_2\) and \(X_3\) each have gain <b>0</b>, because both of their children are half and half, the same as the parent (note 11). So the algorithm puts \(X_1\) at the root.</li>
<li><b>Then it gets stuck at depth 2.</b> The \(X_1 = 1\) child holds samples 2 \((1,0,1,+)\), 3 \((1,1,0,+)\), 4 \((1,1,1,-)\). Asking \(X_2\) there gives \(\{2+\}\) and \(\{3+, 4-\}\), still mixed. Asking \(X_3\) gives \(\{3+\}\) and \(\{2+, 4-\}\), still mixed. So no single further question makes both of its children pure, and depth 2 can't be reached with \(X_1\) at the root.</li>
</ul>
<p class="muted">(The official solution says "any depth-2 decision tree that uses \(X_1\) will have classification errors". That's too strong. Put \(X_2\) at the root, ask \(X_1\) in the \(X_2 = 0\) child (it separates sample 1, with \(X_1 = 0\), from sample 2, with \(X_1 = 1\)), and ask \(X_3\) in the \(X_2 = 1\) child. That is also a zero-error depth-2 tree. The correct statement is: no depth-2 tree with \(X_1\) at the <b>root</b> works.)</p>
<h5>2026-A Q2.1–2.2</h5>
<p>Using the table in note 5:</p>
<ul>
<li><b>Depth 1 fails</b> (official pairs). \(X_1\): samples 3, 4 (both \(X_1 = 1\)). \(X_2\): samples 1, 2 (\(X_2 = 0\)). \(X_3\): samples 1, 3 (\(X_3 = 0\)). \(X_4\): samples 1, 3 (\(X_4 = 1\)).</li>
<li><b>A depth-2 tree</b>: \(X_2\) at the root, \(X_3\) in both children. The leaves are:
<ul>
<li>\(X_2 = 0, X_3 = 0\): sample 1, predict \(-\)</li>
<li>\(X_2 = 0, X_3 = 1\): sample 2, predict \(+\)</li>
<li>\(X_2 = 1, X_3 = 0\): samples 3 and 5, predict \(+\)</li>
<li>\(X_2 = 1, X_3 = 1\): sample 4, predict \(-\)</li>
</ul></li>
<li><b>Q2.2: remove one sample so that depth 1 works.</b> Look at what blocks each feature. The \(X_1 = 1\) child holds samples 2, 3, 4, 5, and sample 4 is the only negative among them. Remove sample 4 and the stump \(X_1 = 0 \to -\) (sample 1), \(X_1 = 1 \to +\) (samples 2, 3, 5) is perfect. (Checking all 5 × 4 combinations shows this is the only one that works.)</li>
</ul>
<p class="muted">(The official Q2.2 solution prints "X1=0 → −" twice. The second one should read \(X_1 = 1 \to +\).)</p>`,
      cue: R`"Construct a decision tree of minimum depth that achieves zero training error" (2025-B Q2.3, 2025-A Q3.2, 2026-A Q2.1). "Is there a tree of depth 1 …? Otherwise explain why" (2025-A Q3.1). "Find one sample that once removed … a depth-1 tree" (2026-A Q2.2).`,
      first: R`Write "Depth 1 is impossible:", then one conflicting pair per feature.`,
      recipe: R`Conflicting pairs → spot the rule in the \(+\) rows → draw the depth-2 tree → list the samples in every leaf. For "remove one sample": find the feature whose children are pure except for a single sample.`,
      trap: R`Don't trust the largest impurity reduction to find a minimum-depth tree (2025-A). A feature with <b>zero</b> gain can be exactly the right question.` },

    { title: "7 · Fewest splits, and depth-2 trees on real-valued features",
      idea: R`<p>Two more versions of note 6.</p>
<h5>Fewest splits instead of least depth</h5>
<p>2025-C asks for the tree with the smallest <b>number of splits</b> (internal nodes). Depth counts the questions on the longest path. Splits count every question anywhere in the tree. A multi-valued attribute is still one split, however many children it has. The reasoning is the same as in note 6:</p>
<ol>
<li><b>One split?</b> Check every attribute for an impure child.</li>
<li><b>Two splits?</b> Pick a root that leaves <b>only one</b> impure child, then find an attribute that separates that child's samples.</li>
</ol>
<h5>Real-valued features</h5>
<p>With thresholds (note 4), the same feature may be asked twice on one path. Then "red" can be a <b>band</b>: \(a \lt X_2 \lt b\). The first question cuts at \(a\), the second at \(b\). To find the band, sort the samples by the feature and look at where the labels change.</p>`,
      notation: [
        ["number of splits", "the number of internal nodes, i.e. questions asked anywhere in the tree"],
        [R`band \(a \lt X \lt b\)`, "a range of values between two thresholds. It takes two questions on the same feature."],
      ],
      example: R`<h5>2025-C Q2.4: fewest splits</h5>
<p>The data: 1 Action/Weekend/Young −, 2 Action/Weekday/Young +, 3 Comedy/Weekend/Young −, 4 Comedy/Weekday/Adult −, 5 Drama/Weekend/Adult +, 6 Drama/Weekday/Adult +.</p>
<p><b>One split is not enough</b>, because every attribute leaves an impure child:</p>
<ul>
<li>Genre: Action holds 1 \((-)\) and 2 \((+)\).</li>
<li>Time: Weekend holds 1 \((-)\), 3 \((-)\), 5 \((+)\).</li>
<li>Age: Young holds 1 \((-)\), 2 \((+)\), 3 \((-)\).</li>
</ul>
<p><b>Two splits.</b> Genre leaves only one impure child (note 3: Comedy is all \(-\), Drama is all \(+\)). The Action child holds instances 1 (Weekend, Young, −) and 2 (Weekday, Young, +). They have different Time but the <b>same</b> Age, so split on Time:</p>
<pre><code>Genre?
├─ Action → Time?
│            ├─ Weekend → dislike (−)   instance 1
│            └─ Weekday → like (+)      instance 2
├─ Comedy → dislike (−)                 instances 3, 4
└─ Drama  → like (+)                    instances 5, 6</code></pre>
<p>2 splits, zero error. With Time or Age at the root, <b>both</b> children are impure, so each would need another split, and that's at least 3.</p>
<p class="muted">(The official text says "the two instances … can be split according to the <b>Age</b> attribute", but its drawing uses Time. The drawing is right: instances 1 and 2 are both Young, so Age can't separate them.)</p>
<h5>2026-B Q2.2: a depth-2 tree with thresholds</h5>
<p>Sort the samples by \(X_2\) and look at the labels:</p>
<div class="tw"><table><thead><tr><th>\(X_2\)</th><th>1</th><th>2</th><th>2</th><th>3</th><th>3</th><th>6</th><th>6</th><th>8</th></tr></thead><tbody>
<tr><td>sample</td><td>6</td><td>1</td><td>4</td><td>2</td><td>5</td><td>7</td><td>8</td><td>3</td></tr>
<tr><td>\(y\)</td><td>B</td><td>B</td><td>B</td><td>R</td><td>R</td><td>R</td><td>R</td><td>B</td></tr></tbody></table></div>
<p>The labels go B B B | R R R R | B. The reds are a band in the middle. The label changes between \(X_2 = 2\) and \(3\) (midpoint 2.5) and between \(6\) and \(8\) (midpoint 7). So red ⇔ \(2.5 \lt X_2 \lt 7\). Two questions on \(X_2\) do it:</p>
<pre><code>        [X2 &lt; 2.5 ?]
      yes /        \ no
        B         [X2 &lt; 7 ?]
   (1, 4, 6)    yes /      \ no
                  R          B
            (2, 5, 7, 8)    (3)</code></pre>
<p>Every leaf is pure, and the depth is 2. This root, \(X_2 \lt 2.5\), is also the split the greedy algorithm would choose (IG 0.549, note 4). The official tree asks \(X_2 \lt 7\) first and \(X_2 \lt 2.5\) second, which is the same band. The official text also describes the reds as \(x_2 \in (2.5, 6.5)\). As a description of the data that is equally true, because no sample has \(x_2\) between 6 and 8, so any upper cut in that gap separates the same samples. But the question says to use <b>midpoints</b> as thresholds, so in the tree itself write 7 (the official tree does too). Note 12 reuses \((2.5, 6.5)\) because its center is a round number.</p>`,
      cue: R`"Construct a decision tree with the smallest number of splits (internal nodes) … zero error" (2025-C Q2.4). "Construct a depth-2 decision tree that perfectly classifies the training set. Clearly specify the feature and threshold" (2026-B Q2.2).`,
      first: R`Fewest splits: for each attribute, list its children and circle the impure ones. Real-valued: sort the samples by one feature and write the label sequence.`,
      recipe: R`Choose the root that leaves the fewest impure children. For each impure child, find the attribute (or threshold) that separates exactly its samples, and check that they really differ in it.`,
      trap: R`Before naming the second attribute, check it on the actual samples. The official 2025-C text wrote "Age" even though both Action instances are Young.` },

    { title: "8 · Using a tree: test instances and pruning",
      idea: R`<p>After building a tree, the exam asks you to <b>use</b> it in three ways.</p>
<h5>1 — Classify a test instance</h5>
<p>Follow note 0: start at the root, follow the branch that matches the instance's value, and read the leaf's label. Write the path down, e.g. "\(X_3 = 0\) → go to \(X_4\); \(X_4 = 0\) → leaf \(-\)".</p>
<h5>2 — Construct an instance the tree gets wrong</h5>
<p>A tree only looks at the features on the instance's path, and every other feature is ignored. So take a feature vector the tree classifies, compute its prediction, and give it the <b>opposite</b> label. If the question also demands a vector that is "not present in the training data", first list all possible vectors and cross out the training ones.</p>
<h5>3 — Pruning</h5>
<p><b>Why:</b> a tree grown until every leaf is pure fits the training data perfectly (100% training accuracy). But its deep splits may just memorize noise, and it then does worse on new data. This is <b>overfitting</b>.</p>
<p><b>What it is:</b> <b>pruning</b> an internal node turns it back into a leaf, labelled with the <b>majority label</b> of the training samples that reach it. The lecture has two versions:</p>
<ul>
<li><b>Pre-pruning (early stopping):</b> stop growing early. Limits like max_depth or min_samples_leaf are set by cross-validation.</li>
<li><b>Post-pruning:</b> grow the full tree, then prune the internal node whose removal most increases accuracy on a separate validation set. Repeat until pruning no longer helps.</li>
</ul>`,
      notation: [
        ["majority label", "the most common label among the training samples in a node. A tie needs a rule, and the question will give one (e.g. \"ties → dislike\")."],
        ["overfitting", "a model that is very accurate on its training data but worse on unseen data"],
        ["pruning", "replacing an internal node (and everything below it) with a leaf labelled by its majority"],
      ],
      example: R`<h5>2025-B Q2.4: classify \(x = (0, 1, 0, 0)\)</h5>
<p>Here \(X_1 = 0\), \(X_2 = 1\), \(X_3 = 0\), \(X_4 = 0\). With the tree from note 6:</p>
<ol>
<li>The root asks \(X_3\). \(X_3 = 0\), so go to the \(X_4\) node.</li>
<li>\(X_4 = 0\), so go to the leaf \(-\).</li>
</ol>
<p>Prediction: \(-\). The official second tree (\(X_4\) first, then \(X_3\)) gives \(X_4 = 0 \to X_3 = 0 \to -\), the same answer.</p>
<h5>2025-A Q3.3: a misclassified test instance not in the training data</h5>
<p>The tree from note 6 (\(X_2\), then \(X_3\)) predicts from \((X_2, X_3)\) alone: \((0,0) \to -\), \((0,1) \to +\), \((1,0) \to +\), \((1,1) \to -\).</p>
<p>There are \(2^3 = 8\) possible vectors \((x_1, x_2, x_3)\). The training set uses \((0,0,0), (1,0,1), (1,1,0), (1,1,1)\). The four unused vectors, with the tree's prediction and the label that makes it wrong:</p>
<div class="tw"><table><thead><tr><th>vector</th><th>\((x_2, x_3)\)</th><th>tree predicts</th><th>test instance</th></tr></thead><tbody>
<tr><td>(1,0,0)</td><td>(0,0)</td><td>−</td><td>(1,0,0,+)</td></tr>
<tr><td>(0,0,1)</td><td>(0,1)</td><td>+</td><td>(0,0,1,−)</td></tr>
<tr><td>(0,1,0)</td><td>(1,0)</td><td>+</td><td>(0,1,0,−)</td></tr>
<tr><td>(0,1,1)</td><td>(1,1)</td><td>−</td><td>(0,1,1,+)</td></tr></tbody></table></div>
<p>Any one of these is a full answer. Put another way: take a training sample, flip \(x_1\) (which the tree never asks about), and flip the label.</p>
<p class="muted">(The official solution lists the fourth instance as \((0,0,0,+)\). But \((0,0,0)\) is training sample 1, so the question forbids it. The correct fourth instance is \((0,1,1,+)\). Also, if your part-2 tree differs, recompute the predictions for your own tree.)</p>
<h5>2025-C Q2.5: prune to the root split</h5>
<p>The tree from note 7 is pruned by keeping only its first split, Genre. Each child becomes a leaf labelled with its majority:</p>
<ul>
<li>Action: instances 1 \((-)\), 2 \((+)\). A 1–1 tie. Part 5 gives no tie rule, and it doesn't need one, because the test instance is a Comedy and never reaches this leaf. (Part 6 of the same question says ties go to dislike.)</li>
<li>Comedy: instances 3, 4, both \(-\). Leaf: dislike.</li>
<li>Drama: instances 5, 6, both \(+\). Leaf: like.</li>
</ul>
<p>The test instance (Comedy, Weekday, Young) goes Genre = Comedy → leaf <b>dislike (−)</b>. The unpruned tree also sends Comedy straight to the dislike leaf. Pruning removed only the Time question under Action, so this prediction <b>did not change</b>.</p>`,
      cue: R`"Use the tree you constructed in (3) to classify the test instance" (2025-B Q2.4). "Describe a test instance that the tree would classify incorrectly … must not be present in the training data" (2025-A Q3.3). "The tree is pruned by keeping only its first split … Did pruning affect the prediction?" (2025-C Q2.5).`,
      first: R`Redraw your tree, then write the path: "root asks \(X_\_\); value is \(\_\) → …".`,
      trap: R`A "new" test instance must really be new. Compare it with every training row, not just the one you started from.` },

    { title: "9 · Leave-one-out error: how well does it generalize?",
      idea: R`<p>A tree grown to zero training error always scores 0% on its own training data, so that number says nothing about new data. To estimate the error on <b>unseen</b> data, we must test on samples the tree didn't train on. With a tiny dataset, <b>leave-one-out</b> (LOO) is the way to do it.</p>
<h5>The procedure</h5>
<ol>
<li>For each sample \(i = 1, \dots, n\):
<ol type="a">
<li><b>remove</b> sample \(i\);</li>
<li><b>build</b> the tree on the remaining \(n - 1\) samples, following the rule the question gives (a fixed stump, a zero-error depth-2 tree, …);</li>
<li><b>predict</b> sample \(i\) with that tree, and record whether it is wrong.</li>
</ol></li>
<li>LOO error \(= \dfrac{\#\text{wrong predictions}}{n}\).</li>
</ol>
<p>This is cross-validation (the lecture tunes max_depth with it) where every fold holds exactly one sample. A lower LOO error means better expected generalization. When LOO is used to compare options (e.g. which attribute to split on), pick the option with the smallest LOO error.</p>
<p><b>The one subtle point:</b> a leaf's label comes from the samples in it <b>after</b> the removal. A leaf that held two samples may now hold one, or none.</p>`,
      notation: [
        ["LOO", "leave-one-out: n rounds, each round holds out one sample as the validation set"],
        ["CV error", "(number of validation mistakes) / n"],
      ],
      example: R`<h5>2025-C Q2.6: stumps, one per attribute (ties → dislike)</h5>
<p>Each stump always splits on its own attribute, and each leaf predicts the majority of the <b>remaining</b> instances in that branch.</p>
<p><b>Genre stump.</b> The branches are Action \(\{1-, 2+\}\), Comedy \(\{3-, 4-\}\), Drama \(\{5+, 6+\}\).</p>
<div class="tw"><table><thead><tr><th>left out</th><th>its branch without it</th><th>prediction</th><th>truth</th><th>error?</th></tr></thead><tbody>
<tr><td>1</td><td>Action: {2+}</td><td>+</td><td>−</td><td>yes</td></tr>
<tr><td>2</td><td>Action: {1−}</td><td>−</td><td>+</td><td>yes</td></tr>
<tr><td>3</td><td>Comedy: {4−}</td><td>−</td><td>−</td><td>no</td></tr>
<tr><td>4</td><td>Comedy: {3−}</td><td>−</td><td>−</td><td>no</td></tr>
<tr><td>5</td><td>Drama: {6+}</td><td>+</td><td>+</td><td>no</td></tr>
<tr><td>6</td><td>Drama: {5+}</td><td>+</td><td>+</td><td>no</td></tr></tbody></table></div>
<p>2 errors, so CV error = \(\tfrac26 = \tfrac13\).</p>
<p><b>Time stump.</b> The branches are Weekend \(\{1-, 3-, 5+\}\) and Weekday \(\{2+, 4-, 6+\}\).</p>
<div class="tw"><table><thead><tr><th>left out</th><th>its branch without it</th><th>prediction</th><th>truth</th><th>error?</th></tr></thead><tbody>
<tr><td>1</td><td>Weekend: {3−, 5+} tie</td><td>−</td><td>−</td><td>no</td></tr>
<tr><td>2</td><td>Weekday: {4−, 6+} tie</td><td>−</td><td>+</td><td>yes</td></tr>
<tr><td>3</td><td>Weekend: {1−, 5+} tie</td><td>−</td><td>−</td><td>no</td></tr>
<tr><td>4</td><td>Weekday: {2+, 6+}</td><td>+</td><td>−</td><td>yes</td></tr>
<tr><td>5</td><td>Weekend: {1−, 3−}</td><td>−</td><td>+</td><td>yes</td></tr>
<tr><td>6</td><td>Weekday: {2+, 4−} tie</td><td>−</td><td>+</td><td>yes</td></tr></tbody></table></div>
<p>4 errors, so CV error = \(\tfrac46 = \tfrac23\).</p>
<p><b>Age stump.</b> The branches are Young \(\{1-, 2+, 3-\}\) and Adult \(\{4-, 5+, 6+\}\).</p>
<div class="tw"><table><thead><tr><th>left out</th><th>its branch without it</th><th>prediction</th><th>truth</th><th>error?</th></tr></thead><tbody>
<tr><td>1</td><td>Young: {2+, 3−} tie</td><td>−</td><td>−</td><td>no</td></tr>
<tr><td>2</td><td>Young: {1−, 3−}</td><td>−</td><td>+</td><td>yes</td></tr>
<tr><td>3</td><td>Young: {1−, 2+} tie</td><td>−</td><td>−</td><td>no</td></tr>
<tr><td>4</td><td>Adult: {5+, 6+}</td><td>+</td><td>−</td><td>yes</td></tr>
<tr><td>5</td><td>Adult: {4−, 6+} tie</td><td>−</td><td>+</td><td>yes</td></tr>
<tr><td>6</td><td>Adult: {4−, 5+} tie</td><td>−</td><td>+</td><td>yes</td></tr></tbody></table></div>
<p>4 errors, so CV error = \(\tfrac46 = \tfrac23\).</p>
<p><b>Best attribute: Genre</b>, with CV error \(\tfrac13\).</p>
<p class="muted">(The official table prints "+ (Err)" for Time / instance 6. Without instance 6 the Weekday branch is {2+, 4−}, a tie, so the prediction is − (dislike). That is still an error, because instance 6 is a like, so the count of 4 is right.)</p>
<h5>2026-B Q2.3: zero-error depth-2 trees</h5>
<p>Each round: remove one sample, build a depth-2 (or depth-1) tree with zero error on the other seven, and predict the removed one. Following the official solution, the trees use \(X_2\) thresholds as in note 7.</p>
<div class="tw"><table><thead><tr><th>left out</th><th>tree built on the other 7</th><th>prediction</th><th>truth</th><th>error?</th></tr></thead><tbody>
<tr><td>1 (\(X_2 = 2\))</td><td>the part-2 tree (still zero error)</td><td>B</td><td>B</td><td>no</td></tr>
<tr><td>2 (\(X_2 = 3\))</td><td>the part-2 tree</td><td>R</td><td>R</td><td>no</td></tr>
<tr><td>3 (\(X_2 = 8\))</td><td>depth 1: \(X_2 \lt 2.5 \to\) B, else R</td><td>R</td><td>B</td><td><b>yes</b></td></tr>
<tr><td>4 (\(X_2 = 2\))</td><td>the part-2 tree</td><td>B</td><td>B</td><td>no</td></tr>
<tr><td>5 (\(X_2 = 3\))</td><td>the part-2 tree</td><td>R</td><td>R</td><td>no</td></tr>
<tr><td>6 (\(X_2 = 1\))</td><td>the part-2 tree</td><td>B</td><td>B</td><td>no</td></tr>
<tr><td>7 (\(X_2 = 6\))</td><td>the part-2 tree</td><td>R</td><td>R</td><td>no</td></tr>
<tr><td>8 (\(X_2 = 6\))</td><td>the part-2 tree</td><td>R</td><td>R</td><td>no</td></tr></tbody></table></div>
<p><b>Why sample 3 is the only one that changes the tree:</b> it is the only blue above the red band. Without it, the seven samples are blue at \(X_2 \in \{1, 2, 2\}\) and red at \(X_2 \in \{3, 3, 6, 6\}\). A single cut at 2.5 separates them, so the upper cut at 7 is never learned, and sample 3 (\(X_2 = 8\)) falls on the red side. In every other round the part-2 tree still has zero error on the seven, and since it is correct on all eight samples, it gets the left-out one right too.</p>
<p>LOO error \(= \tfrac18 = 0.125\).</p>`,
      cue: R`"Evaluate its cross-validation error using a leave-one-out approach … determine which attribute is best" (2025-C Q2.6, 7 points). "Remove each sample in turn … describe the decision tree … compute the average error" (2026-B Q2.3, 7 points).`,
      first: R`Draw a table with one row per left-out sample and the columns: the tree (or branch) built without it, prediction, truth, error?`,
      recipe: R`For stumps: write each branch's full contents once, then for each row delete the left-out sample from its branch and take the majority (apply the tie rule). For zero-error trees: ask "does removing this sample change which splits are needed?". Usually only a sample that is alone in some region does.`,
      trap: R`Recompute the leaf label <b>without</b> the left-out sample. That's the whole point of LOO, and forgetting it gives 0 errors.` },

    { title: "10 · Information gain written in counts",
      idea: R`<p>2025-A Q3.4 asks for \(\mathrm{IG}(S, X_7)\) with no numbers at all, only the four counts:</p>
<ul>
<li>\(p_0, n_0\) = the number of positive and negative samples with \(X_7 = 0\);</li>
<li>\(p_1, n_1\) = the same for \(X_7 = 1\).</li>
</ul>
<p>It is note 3's formula with letters instead of numbers. Build it in four small steps.</p>
<h5>Step 1 — sizes</h5>
\[|S_0| = p_0 + n_0, \qquad |S_1| = p_1 + n_1, \qquad |S| = N = p_0 + n_0 + p_1 + n_1\]
<h5>Step 2 — each child's entropy</h5>
<p>In \(S_0\) the fraction of positives is \(\tfrac{p_0}{p_0+n_0}\) and of negatives \(\tfrac{n_0}{p_0+n_0}\), so</p>
\[H(S_0) = -\frac{p_0}{p_0+n_0}\log_2\frac{p_0}{p_0+n_0} - \frac{n_0}{p_0+n_0}\log_2\frac{n_0}{p_0+n_0}\]
<p>\(H(S_1)\) is the same with \(p_1, n_1\).</p>
<h5>Step 3 — the parent's entropy</h5>
<p>The parent has \(p_0 + p_1\) positives and \(n_0 + n_1\) negatives:</p>
\[H(S) = -\frac{p_0+p_1}{N}\log_2\frac{p_0+p_1}{N} - \frac{n_0+n_1}{N}\log_2\frac{n_0+n_1}{N}\]
<h5>Step 4 — plug in, then simplify the weights</h5>
<p>\(\mathrm{IG} = H(S) - \frac{p_0+n_0}{N}H(S_0) - \frac{p_1+n_1}{N}H(S_1)\). Multiplying out, the weight cancels one denominator:</p>
\[\frac{p_0+n_0}{N}\cdot\frac{p_0}{p_0+n_0} = \frac{p_0}{N}\]
<p>So the final answer is:</p>
\[\begin{aligned}\mathrm{IG}(S, X_7) = &-\frac{p_0+p_1}{N}\log_2\frac{p_0+p_1}{N} - \frac{n_0+n_1}{N}\log_2\frac{n_0+n_1}{N}\\ &+\frac{p_0}{N}\log_2\frac{p_0}{p_0+n_0} + \frac{n_0}{N}\log_2\frac{n_0}{p_0+n_0} + \frac{p_1}{N}\log_2\frac{p_1}{p_1+n_1} + \frac{n_1}{N}\log_2\frac{n_1}{p_1+n_1}\end{aligned}\]
<p>(The question writes plain "log", and the official answer does too. Any base is accepted here. \(\log_2\) matches the formula sheet.)</p>`,
      notation: [
        [R`\(p_a, n_a\)`, R`the number of positive / negative samples in \(S\) with \(X_7 = a\). Careful: here \(p\) is a <b>count</b>, not a fraction as in notes 1–3.`],
        [R`\(N\)`, R`\(|S| = p_0 + n_0 + p_1 + n_1\)`],
      ],
      example: R`<p><b>Checking the formula on real numbers.</b> Take 2025-A's first dataset (Q3.1–3.3) and split it by \(X_1\). The \(X_1 = 0\) side is sample 1 \((-)\), so \(p_0 = 0\) and \(n_0 = 1\). The \(X_1 = 1\) side is samples 2, 3 \((+)\) and 4 \((-)\), so \(p_1 = 2\) and \(n_1 = 1\). \(N = 4\).</p>
<ul>
<li>Parent terms: \(-\tfrac24\log_2\tfrac24 - \tfrac24\log_2\tfrac24 = -0.5(-1) - 0.5(-1) = 1\).</li>
<li>\(\tfrac{p_0}{N}\log_2\tfrac{p_0}{p_0+n_0} = \tfrac04\log_2 0 = 0\) (by the \(0\log 0 = 0\) convention).</li>
<li>\(\tfrac{n_0}{N}\log_2\tfrac{n_0}{p_0+n_0} = \tfrac14\log_2 1 = \tfrac14\cdot 0 = 0\).</li>
<li>\(\tfrac{p_1}{N}\log_2\tfrac{p_1}{p_1+n_1} = \tfrac24\log_2\tfrac23 = 0.5\cdot(-0.5850) = -0.2925\).</li>
<li>\(\tfrac{n_1}{N}\log_2\tfrac{n_1}{p_1+n_1} = \tfrac14\log_2\tfrac13 = 0.25\cdot(-1.5850) = -0.3962\).</li>
</ul>
\[\mathrm{IG} = 1 + 0 + 0 - 0.2925 - 0.3962 = 0.3113\]
<p>The direct way (note 3) gives the same: \(1 - \tfrac14\cdot 0 - \tfrac34\cdot H(\tfrac23) = 1 - 0.75\cdot 0.9183 = 1 - 0.6887 = 0.3113\).</p>`,
      cue: R`"Express \(\mathrm{IG}(S, X_7)\) using \(n_0, p_0, p_1, n_1\)" (2025-A Q3.4, 5 points).`,
      first: R`Write the three sizes: \(|S_0| = p_0+n_0\), \(|S_1| = p_1+n_1\), \(|S| = p_0+p_1+n_0+n_1\).`,
      recipe: R`Sizes → \(H(S_0)\), \(H(S_1)\) with fractions of counts → \(H(S)\) with the combined counts → plug into IG. The simplification in step 4 is optional. The unsimplified version is also a full answer.`,
      trap: R`The parent's positives are \(p_0 + p_1\), not \(p_0\). The parent contains <b>both</b> children.` },

    { title: "11 · The short proofs",
      idea: R`<p>Two kinds of proof keep appearing, each around 5 points. Both are short once you know the key step.</p>
<h5>Proof A — Gini is at most ½ (2025-B Q2.5)</h5>
<p><b>Goal:</b> for every \(p \in [0,1]\), \(\varphi_{Gini}(p) = 1 - p^2 - (1-p)^2 \le \tfrac12\).</p>
<p><b>Route 1, calculus</b> (the official route):</p>
<ul>
<li>First derivative: \(\varphi'(p) = -2p + 2(1-p) = 2 - 4p\). The \(+2(1-p)\) comes from the chain rule: the derivative of \(-(1-p)^2\) is \(-2(1-p)\cdot(-1)\).</li>
<li>\(\varphi'(p) = 0 \iff p = \tfrac12\).</li>
<li>Second derivative: \(\varphi''(p) = -4 \lt 0\), so \(\varphi\) is concave, and the critical point is its <b>global maximum</b>.</li>
<li>\(\varphi(\tfrac12) = 1 - \tfrac14 - \tfrac14 = \tfrac12\), so \(\varphi(p) \le \tfrac12\) for every \(p\).</li>
</ul>
<p><b>Route 2, algebra</b> (no derivatives). Expand \((1-p)^2 = 1 - 2p + p^2\):</p>
\[\varphi(p) = 1 - p^2 - 1 + 2p - p^2 = 2p - 2p^2 = \frac12 - 2\left(p - \frac12\right)^2 \le \frac12\]
<p>To check the last equality: \(2(p - \tfrac12)^2 = 2p^2 - 2p + \tfrac12\), and \(\tfrac12 - (2p^2 - 2p + \tfrac12) = 2p - 2p^2\). A square is never negative, so subtracting it can only make the value smaller.</p>
<p>(Your HW2 Q1.1 proved the general version with Cauchy–Schwarz: \(\varphi_{Gini} \le 1 - \tfrac1k\) for \(k\) classes. With \(k = 2\) that is \(\tfrac12\).)</p>
<h5>Proof B — children with the same proportion give zero reduction (2025-B Q2.6, 2025-A Q3.5)</h5>
<p><b>Goal:</b> if both children have the same fraction of positives, then \(\Delta\varphi = 0\), for any impurity measure.</p>
<ol>
<li><b>Names.</b> The children are \(S_1, S_2\) with sizes \(n^{(1)}, n^{(2)}\) and positive counts \(n_+^{(1)}, n_+^{(2)}\). The parent has \(n = n^{(1)} + n^{(2)}\) samples and \(n_+ = n_+^{(1)} + n_+^{(2)}\) positives. The common proportion is \(p\):
\[\frac{n_+^{(1)}}{n^{(1)}} = \frac{n_+^{(2)}}{n^{(2)}} = p\]</li>
<li><b>Key step: the parent has proportion \(p\) too.</b> Multiply out: \(n_+^{(1)} = p\,n^{(1)}\) and \(n_+^{(2)} = p\,n^{(2)}\). Add the two equations:
\[n_+ = n_+^{(1)} + n_+^{(2)} = p\,n^{(1)} + p\,n^{(2)} = p\,(n^{(1)} + n^{(2)}) = p\,n \;\Longrightarrow\; \frac{n_+}{n} = p\]</li>
<li><b>Impurity depends only on the proportion</b> (note 1), so all three nodes have the same impurity: \(\varphi(S) = \varphi(S_1) = \varphi(S_2) = \varphi(p)\).</li>
<li><b>Substitute into the reduction:</b>
\[\Delta\varphi = \varphi(p) - \frac{n^{(1)}}{n}\varphi(p) - \frac{n^{(2)}}{n}\varphi(p) = \varphi(p)\left(1 - \frac{n^{(1)} + n^{(2)}}{n}\right) = \varphi(p)\,(1 - 1) = 0\]</li>
</ol>
<p><b>The 2025-A Q3.5 version</b> is the same proof. There the claim is \(\frac{n_0}{n_0+p_0} = \frac{n_1}{n_1+p_1} \Rightarrow \mathrm{IG}(S, X_7) = 0\), stated with the <b>negative</b> fraction and entropy. Call the common fraction \(q\). Then \(n_0 = q(n_0 + p_0)\) and \(n_1 = q(n_1 + p_1)\). Adding gives \(n_0 + n_1 = q(n_0 + p_0) + q(n_1 + p_1) = q(n_0 + p_0 + n_1 + p_1) = q\,N\), so the parent's negative fraction \(\tfrac{n_0+n_1}{N}\) is also \(q\). Every node has negative fraction \(q\) and so positive fraction \(1 - q\), and all three entropies equal \(H(q)\). Then \(\mathrm{IG} = H(q)\bigl(1 - \frac{|S_0| + |S_1|}{N}\bigr) = 0\). The official solution does it differently: it substitutes the ratio into the counts formula from note 10 and factors out \(\log r\) and \(\log(1-r)\), whose brackets are \(-1 + \frac{p_0}{p_0+p_1} + \frac{p_1}{p_0+p_1} = 0\). Either route earns full marks.</p>`,
      notation: [
        [R`\(\varphi'(p)\), \(\varphi''(p)\)`, R`first and second derivative with respect to \(p\)`],
        ["concave", "the second derivative is negative everywhere, so a point where the first derivative is 0 is the global maximum"],
        [R`\(n^{(v)}\), \(n_+^{(v)}\)`, R`size and positive count of child \(v\). The \((v)\) is a label, not a power.`],
      ],
      example: R`<p><b>You have already seen Proof B happen</b>, with real numbers:</p>
<ul>
<li>2025-B, split by \(X_1\) (note 2): both children are \(\tfrac24 = \tfrac12\) positive, and so is the parent. \(\Delta\varphi = \tfrac12 - \tfrac48\cdot\tfrac12 - \tfrac48\cdot\tfrac12 = 0\).</li>
<li>2025-A, split by \(X_2\): \(X_2 = 0\) holds samples 1 \((-)\) and 2 \((+)\), and \(X_2 = 1\) holds samples 3 \((+)\) and 4 \((-)\). Both are \(\tfrac12\) positive, so \(\mathrm{IG} = 1 - \tfrac24\cdot 1 - \tfrac24\cdot 1 = 0\). That is exactly why the greedy algorithm ignores \(X_2\) there (note 6).</li>
</ul>
<p><b>A related fact</b> (lecture, and your HW2 Q2): information gain is <b>never negative</b>. Entropy is concave, so the weighted average of the children's entropies is at most the parent's entropy. Proof B is the boundary case where it is exactly equal.</p>
<p class="muted">(A typo in the official 2025-B Q2.6 solution: one denominator is written with \(n^{(0)}\) superscripts. It should be \(n_+^{(1)} + n_-^{(1)} + n_+^{(2)} + n_-^{(2)}\).)</p>`,
      cue: R`"Prove that … we are guaranteed to have \(\varphi_{Gini}(p) \le \tfrac12\)" (2025-B Q2.5). "Prove that if the node is split into two child nodes that have identical proportions … the impurity reduction is zero" (2025-B Q2.6, 2025-A Q3.5).`,
      first: R`Proof A: write \(\varphi(p) = 1 - p^2 - (1-p)^2\) and differentiate (or expand). Proof B: name the common proportion \(p\) and write \(n_+^{(1)} = p\,n^{(1)}\), \(n_+^{(2)} = p\,n^{(2)}\).`,
      recipe: R`Proof B in one line: parent proportion = \(p\) (add the two equations) ⇒ all three impurities equal ⇒ the weights sum to 1 ⇒ reduction 0.`,
      trap: R`In Proof B, don't just <i>assume</i> that the parent has proportion \(p\). Showing it (step 2) is the point of the proof.` },

    { title: "12 · A feature mapping that makes a depth-1 tree work",
      idea: R`<p>This is your Moed B part (2026-B Q2.4). You scored 1/5 on it, and it is easy once you see the pattern.</p>
<h5>Where we are</h5>
<p>A depth-1 tree on a real feature asks <b>one</b> threshold question, "\(z \lt t\)?". It can only separate "small \(z\)" from "large \(z\)".</p>
<h5>The problem</h5>
<p>In 2026-B the reds are a <b>band</b> in the middle of \(X_2\) (note 7: \(2.5 \lt X_2 \lt 7\)), with blues on <b>both</b> sides. One cut on \(X_2\) can't do that, and \(X_1\) alone can't either (note 4).</p>
<h5>The idea: measure the distance from the band's center</h5>
<p>Being inside a band means being <b>close to its center</b>. The squared distance \((x_2 - c)^2\) is small for points near \(c\) and large for points far away on either side. So after mapping to \(z = (x_2 - c)^2\), "inside the band" becomes "\(z\) is small", and that takes a single threshold.</p>
<h5>The recipe</h5>
<ol>
<li><b>Find the pattern first</b>: sort by each feature and find an interval that holds all the reds and none of the blues. The reds have \(x_2 \in \{3, 6\}\) and the blues have \(x_2 \in \{1, 2, 8\}\). Note 7 wrote the band with midpoints, \(2.5 \lt x_2 \lt 7\). Any interval that contains 3 to 6 and excludes 2 and 8 works just as well, and the official solution picks \((2.5, 6.5)\), because it is centered exactly between the reds 3 and 6, which gives round numbers. So: red ⇔ \(x_2 \in (2.5, 6.5)\).</li>
<li><b>Center and radius</b>: \(c = \tfrac{2.5 + 6.5}{2} = \tfrac{9}{2} = 4.5\) and radius \(r = 6.5 - 4.5 = 2\).</li>
<li><b>Square it</b>: "inside the interval" means "less than 2 away from 4.5": \(x_2 \in (2.5, 6.5) \iff |x_2 - 4.5| \lt 2 \iff (x_2 - 4.5)^2 \lt 2^2 = 4\).</li>
<li><b>Match the required form</b>. The question allows only \(\varphi(x_1, x_2) = (a_2 x_1^2 + a_1 x_1,\; b_2 x_2^2 + b_1 x_2)\). Look at which feature each coordinate uses: the <b>first</b> coordinate is built only from \(x_1\) (with the \(a\)'s), and the <b>second</b> only from \(x_2\) (with the \(b\)'s). Our pattern is about \(x_2\), so the \(b\)'s do the work. There is also no constant term, so expand the square and move the constant to the threshold side:
\[(x_2 - 4.5)^2 = x_2^2 - 2\cdot 4.5\cdot x_2 + 4.5^2 = x_2^2 - 9x_2 + 20.25\]
\[x_2^2 - 9x_2 + 20.25 \lt 4 \iff x_2^2 - 9x_2 \lt 4 - 20.25 = -16.25\]
Compare \(x_2^2 - 9x_2\) with \(b_2 x_2^2 + b_1 x_2\): \(b_2 = 1\) and \(b_1 = -9\). \(x_1\) isn't needed, so \(a_1\) and \(a_2\) can be anything (e.g. 0).</li>
<li><b>Verify</b> on all the samples (example below).</li>
</ol>`,
      notation: [
        [R`\(\varphi(x_1, x_2)\)`, R`here: a <b>feature mapping</b>, i.e. new features computed from the old ones. It is not the impurity \(\varphi\) from notes 1–3; the exam reuses the letter.`],
        [R`\(z_2 = b_2 x_2^2 + b_1 x_2\)`, R`the second mapped feature, the one the stump will split on`],
        [R`\(c\), radius`, R`the center and half-width of the band: \(x \in (c - r, c + r) \iff (x - c)^2 \lt r^2\)`],
      ],
      example: R`<p><b>2026-B Q2.4 with \(b_2 = 1\), \(b_1 = -9\).</b> Compute \(z_2 = x_2^2 - 9x_2\) for all 8 samples:</p>
<div class="tw"><table><thead><tr><th>sample</th><th>\(x_2\)</th><th>\(x_2^2 - 9x_2\)</th><th>\(z_2\)</th><th>\(y\)</th></tr></thead><tbody>
<tr><td>1</td><td>2</td><td>\(4 - 18\)</td><td>−14</td><td>B</td></tr>
<tr><td>2</td><td>3</td><td>\(9 - 27\)</td><td>−18</td><td>R</td></tr>
<tr><td>3</td><td>8</td><td>\(64 - 72\)</td><td>−8</td><td>B</td></tr>
<tr><td>4</td><td>2</td><td>\(4 - 18\)</td><td>−14</td><td>B</td></tr>
<tr><td>5</td><td>3</td><td>\(9 - 27\)</td><td>−18</td><td>R</td></tr>
<tr><td>6</td><td>1</td><td>\(1 - 9\)</td><td>−8</td><td>B</td></tr>
<tr><td>7</td><td>6</td><td>\(36 - 54\)</td><td>−18</td><td>R</td></tr>
<tr><td>8</td><td>6</td><td>\(36 - 54\)</td><td>−18</td><td>R</td></tr></tbody></table></div>
<p>Every red has \(z_2 = -18\), and every blue has \(z_2 = -14\) or \(-8\). The depth-1 tree <b>"\(z_2 \lt -16\)? yes → R, no → B"</b> has zero training error. (\(-16\) is the midpoint between \(-18\) and \(-14\). The \(-16.25\) from the derivation works too.)</p>
<p><b>Why it works, in one sentence:</b> \(z_2 + 20.25 = (x_2 - 4.5)^2\) is the squared distance from 4.5. The reds (\(x_2 = 3\) or \(6\)) are at distance 1.5, giving 2.25. The blues (\(x_2 = 1, 2, 8\)) are at distance 3.5, 2.5 and 3.5, giving 12.25, 6.25 and 12.25.</p>
<p><b>What if you used note 7's band \((2.5, 7)\) instead?</b> Also fine, just less round. Center \(c = \tfrac{2.5 + 7}{2} = 4.75\), radius \(r = 7 - 4.75 = 2.25\). Then \((x_2 - 4.75)^2 = x_2^2 - 9.5x_2 + 22.5625 \lt 2.25^2 = 5.0625\) becomes \(x_2^2 - 9.5x_2 \lt 5.0625 - 22.5625 = -17.5\). So \(b_2 = 1\), \(b_1 = -9.5\). Check: the reds get \(3^2 - 9.5\cdot 3 = 9 - 28.5 = -19.5\) and \(6^2 - 9.5\cdot 6 = 36 - 57 = -21\), the blues get \(-8.5\) (\(x_2 = 1\)), \(-15\) (\(x_2 = 2\)) and \(-12\) (\(x_2 = 8\)). The split \(z_2 \lt -17.5\) is again perfect.</p>
<p class="muted">(<b>Slip in the official solution:</b> it writes \(\varphi(x_1, x_2) = (x_2^2 - 9x_2, *)\), putting an \(x_2\) expression in the first coordinate, which the given form does not allow. Then it sets \(a_1 = -9\), \(a_2 = 1\), and says switching \(a \leftrightarrow b\) "can also work". But the \(a\)'s multiply \(x_1\), the wrong feature. With \(z_1 = x_1^2 - 9x_1\), sample 2 (\(x_1 = 3\), red) and sample 3 (\(x_1 = 3\), blue) both get \(-18\), so no threshold can separate them. The working answer is the "switched" one: \(b_2 = 1\), \(b_1 = -9\), split on the second coordinate.)</p>`,
      cue: R`"Find a mapping \(\varphi: \mathbb{R}^2 \to \mathbb{R}^2\) of the form … such that the mapped dataset can be classified without error using a depth-1 decision tree. Specify the coefficients … and the single split" (2026-B Q2.4).`,
      first: R`Before touching the coefficients, write the pattern as an interval: "red ⇔ \(x_2 \in (2.5, 6.5)\)".`,
      recipe: R`Interval \((c - r, c + r)\) ⇒ \((x - c)^2 \lt r^2\) ⇒ expand, drop the constant into the threshold ⇒ read off the coefficients ⇒ tabulate the mapped values for every sample and state the split.`,
      trap: R`In Moed B you plugged single points into \(\varphi\) with the unknown \(a\)'s and \(b\)'s. That gives 8 expressions and no direction. Find the interval first. Then check <b>which coordinate</b> of \(\varphi\) uses the feature you need (the official solution itself got this wrong).` },
  ],
    hints: {
      "2025B-q2": {
        1: R`Count the \(+\) and \(-\) in the \(y\) column (4 and 4), so \(p = \tfrac12\). Plug it into \(1 - p^2 - (1-p)^2\) (note 1).`,
        2: R`For \(X_1\): list the rows with \(X_1 = 0\) and with \(X_1 = 1\), count the labels in each, and take the Gini of each child. Then compute \(\varphi(S) - \sum_v \frac{|S_v|}{|S|}\varphi(S_v)\). Repeat for \(X_4\) (note 2).`,
        3: R`First rule out depth 1: for each feature, name two rows with the same value and different labels. Then read the \(+\) rows: which one or two feature values cover every \(+\) row, while no \(-\) row has them (note 6)?`,
        4: R`Redraw your part-3 tree and follow the path: \(X_3 = 0\), then \(X_4 = 0\) (note 8).`,
        5: R`Write \(\varphi(p) = 1 - p^2 - (1-p)^2\). Either differentiate (\(2 - 4p = 0\), second derivative \(-4\)) or expand it to \(\tfrac12 - 2(p - \tfrac12)^2\) (note 11).`,
        6: R`Name the common child proportion \(p\), write \(n_+^{(1)} = p\,n^{(1)}\) and \(n_+^{(2)} = p\,n^{(2)}\), and add them to show the parent also has proportion \(p\) (note 11). (The official solution has a typo, \(n^{(0)}\), in one denominator.)`,
      },
      "2025C-q2": {
        1: R`Count the likes and dislikes (3 and 3), so \(p = \tfrac12\). Plug into the Gini formula (note 1).`,
        2: R`Three children, one per genre. List each child's instances and reactions (Action {1−, 2+}, Comedy {3−, 4−}, Drama {5+, 6+}). Each has weight \(\tfrac26\) (note 3).`,
        3: R`Use the same three children as in part 2, with \(H\) (base 2) instead of Gini: \(H(\tfrac12) = 1\), and a pure child has \(H = 0\) (note 3).`,
        4: R`Show that no single attribute gives all-pure children. Then put Genre at the root and split the only impure child, Action, by the attribute in which instances 1 and 2 differ: Time, not Age (note 7). (The official text says "Age", but its drawing correctly uses Time.)`,
        5: R`The pruned tree is Genre at the root, with each child a leaf labelled by its majority. Follow Genre = Comedy (note 8).`,
        6: R`For each stump, write each branch's contents once. Then, for each left-out instance, remove it from its branch and take the majority of what's left (ties → dislike) (note 9). (The official table prints "+ (Err)" for Time / instance 6. The prediction is really −, still an error.)`,
      },
      "2025A-q3": {
        1: R`For each of \(X_1, X_2, X_3\), find a child that holds both a \(+\) and a \(-\), and name the two samples (note 6).`,
        2: R`Write the \((X_2, X_3)\) pair of each sample. All four are different, so a full depth-2 tree on \(X_2, X_3\) gives each sample its own leaf (note 6). (The official claim that any depth-2 tree using \(X_1\) fails is too strong. Only \(X_1\) at the root fails.)`,
        3: R`List the 4 vectors \((x_1, x_2, x_3)\) that are not in the training set, find your tree's prediction for each, and give the opposite label (note 8). (The official answer \((0,0,0,+)\) is a slip, because \((0,0,0)\) is training sample 1. Use \((0,1,1,+)\).)`,
        4: R`Write \(|S_0| = p_0+n_0\), \(|S_1| = p_1+n_1\), \(|S| = p_0+p_1+n_0+n_1\). Write each \(H\) with those fractions, then plug into the IG formula (note 10).`,
        5: R`Call the common fraction \(q\). From \(n_0 = q(n_0+p_0)\) and \(n_1 = q(n_1+p_1)\), show that the parent's fraction is also \(q\), so all three entropies are equal (note 11).`,
      },
      "2026A-q2": {
        1: R`Rule out depth 1 with one conflicting pair per feature. Then try \(X_2\) at the root with \(X_3\) below it, and list which samples land in each leaf (note 6).`,
        2: R`For each feature, write its two children and look for a child that would be pure except for a <b>single</b> sample. Removing that sample makes the stump perfect (note 6). (The official solution writes "X1=0 → −" twice; the second should be \(X_1 = 1 \to +\).)`,
        3: R`The root has 3+ and 2−, so \(\varphi(S) = 1 - 0.6^2 - 0.4^2 = 0.48\). Then list the children for \(X_1\) and for \(X_4\) (note 2).`,
        4: R`Compare with the lecture algorithm: which attribute should be chosen (largest or smallest reduction?), and what must happen to the new children (note 5)?`,
        5: R`Pop the root, compute \(\Delta\varphi\) for \(X_2\) and \(X_3\) as well (you have \(X_1\) and \(X_4\) from part 3), pick the largest, and write out the children and the queue (note 5). (The official solution swaps the children of \(X_2\) and \(X_3\), but its numbers are still right.)`,
      },
      "2026B-q2": {
        1: R`Sort the distinct \(X_1\) values (2, 3, 4, 5, 6, 8) and take the midpoints 2.5, 3.5, 4.5, 5.5, 7. For each one, count B/R on each side and compute the entropies and the IG (note 4).`,
        2: R`Sort the samples by \(X_2\) and read the labels: B B B R R R R B. The reds are a band, so use two thresholds on \(X_2\) (note 7).`,
        3: R`Make a table with one row per left-out sample. For each, ask: on the other seven, are both \(X_2\) thresholds of the part-2 tree still needed? Look for a sample that is alone on its side of a threshold (note 9).`,
        4: R`Don't plug in points. Write the pattern "red ⇔ \(x_2 \in (2.5, 6.5)\)", then square the distance from the center: \((x_2 - 4.5)^2 \lt 4\) (note 12). (The official solution puts the coefficients on \(a\), which acts on \(x_1\). The working answer is \(b_2 = 1\), \(b_1 = -9\).)`,
      },
    },
  };
})();
