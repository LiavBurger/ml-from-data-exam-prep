// The last study day (2026-10-08): the plan, and the 8 answer templates the learner built this term.
// Templates use the same wording and notation as the walks (spec/WALKS.md §0.8). Rendered by app.js at #/day.
(function () {
  const R = String.raw;
  window.LASTDAY = {
    mock: "2025B",   // Block 1: the timed exam (2nd hardest; 2026B is the learner's own Moed B, half-remembered)
    check: "2026A",  // Block 4: first-move check
    templates: [
      { title: "MLE in 6 lines", practice: "2026B-q4.1", only: R`the whole part`,
        cue: R`"derive the maximum likelihood estimator", "find the \(\theta\) that maximizes the likelihood"`,
        html: R`
<p><b>1. One sample</b> (the given distribution, with \(x_i\)):</p>\[p(x_i \mid \theta) = \ldots\]
<p><b>2. All samples</b> (independent → multiply):</p>\[L(\theta) = \prod_{i=1}^{n} p(x_i \mid \theta)\]
<p><b>3. The data log-likelihood</b> (log turns × into +):</p>\[\ell(\theta; D) = \sum_{i=1}^{n} \log p(x_i \mid \theta)\]
<p><b>4. Simplify:</b> log rules inside the sum, split into separate sums, take out what has no \(i\).</p>
<p><b>5. Derivative by \(\theta\), set to 0, solve</b> → \(\hat\theta\).</p>
<p><b>6. It's a maximum:</b> \(\ell''(\theta; D) \lt 0\).</p>
<p class="muted">Results you've seen: Poisson → \(\hat\lambda\) = the average count. Coin → heads ÷ tosses. Two probabilities that must add to 1: write them as \(p\) and \(1 - p\), so there is one unknown.</p>` },

      { title: "Bayes: one block per sample", practice: "2026B-q4.3", only: R`only the user with \(x = 2\)`,
        cue: R`"classify with MAP", "compute the posterior", naive Bayes`,
        html: R`
<p><b>Sample \(x\):</b></p>
<p><b>Likelihoods:</b> \(P(x \mid A) = \ldots\), \(P(x \mid B) = \ldots\) <span class="muted">(naive Bayes: multiply one factor per feature)</span></p>
<p><b>Joints</b> (prior × likelihood): \(P(x, A) = \pi_A \cdot P(x \mid A)\), \(P(x, B) = \pi_B \cdot P(x \mid B)\)</p>
<p><b>Marginal</b> (sum of the joints): \(P(x) = P(x, A) + P(x, B)\)</p>
<p><b>Posteriors</b> (joint ÷ marginal): \(P(A \mid x) = \dfrac{P(x, A)}{P(x)}\), \(P(B \mid x) = \dfrac{P(x, B)}{P(x)}\)</p>
<p><b>MAP:</b> the class with the bigger posterior.</p>
<p class="muted">Formula first, then the numbers. Priors: \(\pi_A + \pi_B = 1\).</p>` },

      { title: "Costs as bets", practice: "2025A-q5.5", only: R`both samples; take the posteriors from part 2`,
        cue: R`a cost / loss matrix, \(\lambda_{AB}\), "minimum risk"`,
        html: R`
<p><b>Givens as sentences:</b> "Classifying as A when it's actually B costs \(\lambda_{AB}\)". "Classifying as B when it's actually A costs \(\lambda_{BA}\)".</p>
<p><b>Classifying as A:</b> if it's actually A (chance \(P(A \mid x)\)) it costs 0; if it's actually B (chance \(P(B \mid x)\)) it costs \(\lambda_{AB}\)</p>\[\text{risk} = P(A \mid x)\cdot 0 + P(B \mid x)\cdot \lambda_{AB}\]
<p><b>Classifying as B:</b> if it's actually A (chance \(P(A \mid x)\)) it costs \(\lambda_{BA}\); if it's actually B (chance \(P(B \mid x)\)) it costs 0</p>\[\text{risk} = P(A \mid x)\cdot \lambda_{BA} + P(B \mid x)\cdot 0\]
<p><b>Predict the cheaper one.</b> It can differ from MAP.</p>` },

      { title: "EM: E-step and M-step in words", practice: "2026B-q5.3", only: R`only \(\pi_1\) and \(\mu_1\); take the \(r(i,j)\) from part 2`,
        cue: R`GMM, mixture of coins, "one iteration of EM", responsibilities \(r(i,j)\)`,
        html: R`
<p><b>E-step:</b> \(r(i,j)\) = the posterior of component \(j\) for sample \(i\): the Bayes block (likelihood → joint → marginal → posterior), with \(\pi_j\) as the prior.</p>
<p><b>M-step:</b> every sample counts as \(r(i,j)\) of a component-\(j\) sample.</p>
\[\begin{aligned}\pi_j &= \frac{\text{expected component-}j\text{ samples}}{\text{all samples}} = \frac{\textstyle\sum_i r(i,j)}{n}\\[4pt] \mu_j &= \frac{\text{sum of component-}j\text{ samples}}{\text{number of component-}j\text{ samples}} = \frac{\textstyle\sum_i r(i,j)\,x_i}{\textstyle\sum_i r(i,j)}\\[4pt] p_j &= \frac{\text{expected heads}}{\text{expected tosses}} = \frac{\textstyle\sum_i r(i,j)\,h_i}{(\text{tosses per experiment})\cdot\textstyle\sum_i r(i,j)}\end{aligned}\]
<p>Then the <b>"with"</b> lines below: each sum written out with its numbers.</p>` },

      { title: "Information gain of a split", practice: "2026B-q2.1", only: R`only the threshold 4.5`,
        cue: R`"find the split that maximizes the information gain", impurity reduction`,
        html: R`
<p><b>Candidates:</b> midpoints between consecutive distinct values (one per gap).</p>
<p><b>Per candidate:</b> count each side (e.g. 3B 1R), then</p>
\[\text{IG} = H(\text{parent}) - \text{share}_1\cdot H(\text{child}_1) - \text{share}_2\cdot H(\text{child}_2)\]
<p>share = samples in the child ÷ samples in the parent.</p>
\[H = -p\log_2 p - (1-p)\log_2(1-p)\]
<p class="muted">Pure node → \(H = 0\) (\(0\cdot\log 0 = 0\)). \(\log_2 x = \ln x \div \ln 2\). Same with Gini instead of \(H\). The best split is written as two sides: "\(X_1 \lt 4.5\) vs \(X_1 \gt 4.5\)".</p>` },

      { title: "Distance to a line, margin", practice: "2025C-q3.2", only: R`the whole part`,
        cue: R`"margin", "max-margin line", "distance of the sample from the boundary"`,
        html: R`
<p><b>Line as "… = 0":</b> \(w_0 + w_1x_1 + w_2x_2 = 0\)</p>
<p><b>Weights:</b> \(w_0 = \ldots,\ w_1 = \ldots,\ w_2 = \ldots\)</p>
<p><b>Score</b> of a sample: \(w_0 + w_1x_1 + w_2x_2\)</p>
<p><b>Length of \(w\)</b> (no \(w_0\)): \(\sqrt{w_1^2 + w_2^2}\)</p>
\[\text{distance} = \frac{|\text{score}|}{\sqrt{w_1^2 + w_2^2}}\]
<p><b>Margin</b> = distance to the closest sample. When the closest samples have \(y\cdot\text{score} = 1\), the margin is \(1/\|w\|\).</p>
<p class="muted">\(y\cdot\text{score} \ge 1\): correct side and outside the margin. Adding such a sample changes nothing.</p>` },

      { title: "K-means: one iteration", practice: "2025C-q5.1", only: R`the whole part`,
        cue: R`"run one iteration of K-means", "WCSS before / after"`,
        html: R`
<p><b>1. Assign:</b> Euclidean distance of each sample to each centroid, the smaller wins:</p>\[d(x, \mu) = \sqrt{(x_1 - \mu_1)^2 + (x_2 - \mu_2)^2}\]
<p><b>2. WCSS before:</b> each sample's distance to its own <b>old</b> centroid, squared, added.</p>
<p><b>3. Update:</b> each centroid = the mean of its cluster, per coordinate: (mean of the \(x_1\)'s, mean of the \(x_2\)'s).</p>
<p><b>4. WCSS after:</b> each sample's distance to its own <b>new</b> centroid, squared, added.</p>
<p class="muted">Converged = the assignments don't change. WCSS never goes up.</p>` },

      { title: "Mapping so one cut / one line works", practice: "2026B-q2.4", only: R`the whole part`,
        cue: R`"find a mapping \(\varphi\)", "so that the data is linearly separable / a depth-1 tree has zero error"`,
        html: R`
<p><b>1. What can one cut (or one line) do?</b> Split into two sides. I need one number with all of one class on one side.</p>
<p><b>2. Where is each class?</b> Write the labels along each feature.</p>
<p><b>3. Middle band or inside a circle?</b> Use the squared distance from the center:</p>
\[\begin{aligned}&\text{band: } (x - \text{center})^2 \lt (\text{half the width})^2\\ &\text{circle: } (x_1 - c_1)^2 + (x_2 - c_2)^2 \lt r^2\end{aligned}\]
<p><b>4. Expand, then match</b> the form they gave. If their form has no constant, move it to the other side of the \(\lt\).</p>
<p><b>5. Table check</b> of the mapped values, cut at the midpoint.</p>
<p class="muted">The \(x^2\) in their form is the hint. A linear mapping never helps.</p>` },
    ],
  };
})();
