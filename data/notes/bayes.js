// Notes for topic "bayes". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["bayes"] = {
  intro: R`<p>This question family is about <b>classifying with probabilities</b>. You get a table of labelled samples. You <b>estimate probabilities</b> from it (that is the "training"), then use them to <b>predict the class</b> of a new sample. The parts repeat from exam to exam: <b>priors and class-conditional probabilities by counting</b> → <b>posteriors with Bayes' rule and the MAP prediction</b> → a twist: <b>full vs naive Bayes</b>, <b>uniform priors (the ML prediction)</b>, <b>a cost matrix</b>, or <b>"for which prior / cost does the prediction change?"</b>. 2026-B (your Moed B) adds a formula model, the Poisson: <b>derive its MLE</b> (log-likelihood → derivative → 0), plug in the data, then do the same MAP / prior / cost questions with a given \(e^t\) table.</p>
<p><b>How to use the notes:</b> read them in order. Each one builds on the one before, and none assumes you already know probability. Notes 0–6 cover the table questions. Their worked examples use the data of <b>2025-A Question 5</b> (the 20 flowers), your guided first question, plus <b>2025-C Question 4</b> (the fish) where it has a part that 2025-A doesn't. Notes 7–12 cover the Poisson model and follow <b>2026-B Question 4</b> part by part. Then do the three questions on your own, in the order 2025-A Q5 → 2025-C Q4 → 2026-B Q4.</p>`,
  moves: [
    { title: "0 · Start here: a probability is a fraction of the rows of a table",
      idea: R`<p>In decision trees you predicted a label by asking questions about the features. This question family predicts the label a different way: it asks <b>"how probable is each class, given these features?"</b> and picks the most probable one. So first we need to be completely comfortable with what "a probability" means in these questions.</p>
<h5>Step 1 — a probability is a fraction of rows</h5>
<p>Every exam question here gives you a table of samples. For our purposes, <b>the probability of something = the fraction of rows where it happens</b>. "The probability that a flower is Afloris" = (number of Afloris rows) ÷ (number of all rows). We write it \(p(y = \mathrm{A})\).</p>
<h5>Step 2 — a comma means "and" (the joint probability)</h5>
<p>\(p(y = \mathrm{A},\ X_1 = \mathrm{r})\) is the fraction of <b>all</b> rows where <b>both</b> things hold: the flower is Afloris <b>and</b> it is red. A probability of two things together is called a <b>joint probability</b>.</p>
<h5>Step 3 — the bar "|" means "among the rows where …" (conditional probability)</h5>
<p>\(p(X_1 = \mathrm{r} \mid y = \mathrm{A})\) is read "the probability that the colour is red <b>given</b> that the flower is Afloris". Whatever stands <b>after</b> the bar is something we already know. It shrinks the table: throw away every row that is not Afloris, and among the rows that are left, take the fraction that are red. So the divisor is no longer "all rows" but "the Afloris rows". This is a <b>conditional probability</b>.</p>
<p>The order around the bar matters. \(p(X_1 = \mathrm{r} \mid y = \mathrm{A})\) looks only at the Afloris rows and asks how many are red. \(p(y = \mathrm{A} \mid X_1 = \mathrm{r})\) looks only at the <b>red</b> rows and asks how many are Afloris. Different rows, different divisor, different number (the example shows it).</p>
<h5>Step 4 — joint = (fraction in the group) × (fraction of the group)</h5>
<p>The fraction of all flowers that are "Afloris and red" can be built in two stages: first the fraction that are Afloris, then, of those, the fraction that are red:</p>
\[p(y = \mathrm{A},\ X_1 = \mathrm{r}) = p(y = \mathrm{A}) \cdot p(X_1 = \mathrm{r} \mid y = \mathrm{A})\]
<p>This one line (the <b>product rule</b>) is the engine of every note that follows.</p>`,
      notation: [
        [R`\(y\)`, R`the class label (the thing we predict): A/B in 2025-A, A/B/C in 2025-C, R/M in 2026-B`],
        [R`\(X_1, X_2\)`, R`the features (columns). In 2025-A: \(X_1\) = colour (p/r), \(X_2\) = number of petals (3/4/5)`],
        [R`\(x = (x_1, x_2)\)`, R`the observed feature values of one particular sample, e.g. \(x = (\mathrm{p}, 5)\)`],
        [R`\(p(\cdot)\) or \(\Pr[\cdot]\)`, R`"the probability of …". Both notations mean the same.`],
        [R`\(p(a, b)\)`, R`joint probability: \(a\) <b>and</b> \(b\) both happen`],
        [R`\(p(a \mid b)\)`, R`conditional probability: the probability of \(a\) among the cases where \(b\) holds ("\(a\) given \(b\)")`],
        [R`\(n\), \(n_j\)`, R`number of all rows; number of rows of class \(j\)`],
      ],
      example: R`<p><b>The table.</b> 2025-A Q5: 20 flowers. Samples 1–8 are Afloris (A), samples 9–20 are Bifloris (B). Of the A flowers, samples 1–2 are purple and samples 3–8 are red. Of the B flowers, samples 9–16 are purple and samples 17–20 are red.</p>
<ul>
<li><b>A probability (step 1).</b> 8 of the 20 rows are A: \(p(y = \mathrm{A}) = \dfrac{8}{20} = 0.4\).</li>
<li><b>A conditional (step 3).</b> Keep only the 8 A rows. Of those, 6 are red (samples 3, 4, 5, 6, 7, 8): \(p(X_1 = \mathrm{r} \mid y = \mathrm{A}) = \dfrac{6}{8} = 0.75\).</li>
<li><b>A joint (step 2).</b> Rows that are A <b>and</b> red, out of all 20: the same six samples 3–8, so \(p(y = \mathrm{A}, X_1 = \mathrm{r}) = \dfrac{6}{20} = 0.3\).</li>
<li><b>The product rule (step 4) gives the same number:</b> \(p(y = \mathrm{A}) \cdot p(X_1 = \mathrm{r} \mid y = \mathrm{A}) = \dfrac{8}{20} \cdot \dfrac{6}{8} = \dfrac{6}{20} = 0.4 \cdot 0.75 = 0.3\). ✓</li>
<li><b>The order around the bar matters.</b> Now keep only the <b>red</b> rows: 6 are A (samples 3–8) and 4 are B (samples 17–20), 10 in total. So \(p(y = \mathrm{A} \mid X_1 = \mathrm{r}) = \dfrac{6}{10} = 0.6\), which is not the 0.75 above.</li>
</ul>
<p>That last number, "how likely is it A, given that it is red", is what a classifier wants. Notes 1–2 show how to get it from the numbers that are easy to count.</p>`,
      trap: R`Watch the divisor. A conditional \(p(\ldots \mid y = \mathrm{A})\) is divided by the number of <b>A rows</b> (8), never by all 20 rows.` },

    { title: "1 · Training = counting: priors \\(\\pi_j\\) and class-conditional probabilities",
      idea: R`<p>A Bayesian classifier is fully described by two kinds of probabilities. Training means estimating them from the table, and in the table questions that is just counting (note 0).</p>
<h5>Step 1 — the prior \(\pi_j\): how common is class \(j\)?</h5>
<p>Before we look at any feature of a new flower, what is our best guess for its class? Just how common each class is. That is the <b>prior probability</b> ("prior" = before looking at the features):</p>
\[\pi_j = p(y = j) \approx \frac{n_j}{n} = \frac{\text{number of rows of class } j}{\text{number of all rows}}\]
<h5>Step 2 — the class-conditional: what does class \(j\) look like?</h5>
<p>For each class separately, we describe how its features are distributed: "among the Afloris flowers, how often is the colour red? how often are there 4 petals?" That is a conditional probability with the class after the bar (note 0, step 3). It is called the <b>class-conditional probability</b>:</p>
\[p(X_t = a \mid y = j) \approx \frac{\text{number of rows of class } j \text{ with } X_t = a}{n_j}\]
<p>Here \(t\) is the feature number (1 = colour, 2 = petals) and \(a\) is one of that feature's values.</p>
<h5>Step 3 — what the question's extra words mean</h5>
<ul>
<li><b>"One feature at a time" (naive Bayes).</b> 2025-A Q5.1 asks for \(p(X_t = a \mid y = j)\) for each feature <b>separately</b>. That is what a naive Bayes classifier needs. Why that is allowed is explained in note 3; for now, count one column at a time.</li>
<li><b>"Unordered / multinomial".</b> Each value is its own category. We don't treat 3, 4, 5 petals as numbers on a line; we just count each value.</li>
<li><b>"No Laplace smoothing".</b> Use the plain fractions. (Laplace smoothing would add 1 to every count so that no probability is exactly 0. The question tells you to skip it.)</li>
<li><b>"No need to prove these are the MLEs".</b> These count fractions are the <i>maximum likelihood estimates</i>: the values that make the observed table most probable. Note 7 explains what that means. Here you just write them down.</li>
</ul>
<h5>Step 4 — a free check</h5>
<p>Within one class, the probabilities of all values of one feature must add up to 1 (every A flower has <i>some</i> colour). Likewise the priors add up to 1.</p>`,
      notation: [
        [R`\(\pi_j\) ("pi j")`, R`the prior of class \(j\): \(p(y = j)\). Here \(\pi\) is just a name, not 3.14.`],
        [R`\(p(X_t = a \mid y = j)\)`, R`class-conditional: the probability that feature \(t\) has value \(a\), among the samples of class \(j\)`],
        [R`\(t\)`, R`which feature (column): \(t \in \{1, 2\}\)`],
        [R`\(\hat\pi_j\)`, R`the hat marks an <b>estimate</b> computed from data (2026-B writes \(\hat\pi_R\), \(\hat\lambda_R\))`],
      ],
      example: R`<p><b>2025-A Q5.1, the priors.</b> Class A = samples 1–8, so \(n_\mathrm{A} = 8\). Class B = samples 9–20, so \(n_\mathrm{B} = 12\). Total \(n = 20\).</p>
\[\pi_\mathrm{A} = \frac{8}{20} = 0.4, \qquad \pi_\mathrm{B} = \frac{12}{20} = 0.6 \qquad (0.4 + 0.6 = 1\ ✓)\]
<p><b>Colour given the class.</b> Among the 8 A rows: purple = samples 1, 2 → 2 rows; red = samples 3–8 → 6 rows. Among the 12 B rows: purple = samples 9–16 → 8 rows; red = samples 17–20 → 4 rows.</p>
<p><b>Petals given the class.</b> Among the 8 A rows: 3 petals = samples 1, 3 → 2 rows; 4 petals = samples 4, 5, 6, 7 → 4 rows; 5 petals = samples 2, 8 → 2 rows. Among the 12 B rows: 3 petals = samples 9–13 and 17 → 6 rows; 4 petals = samples 14, 15, 16 → 3 rows; 5 petals = samples 18, 19, 20 → 3 rows.</p>
<p>Divide each count by its <b>own class size</b> (8 for A, 12 for B). This is the official answer:</p>
<div class="tw"><table><thead><tr><th></th><th>\(y = \mathrm{A}\) (divide by 8)</th><th>\(y = \mathrm{B}\) (divide by 12)</th></tr></thead><tbody>
<tr><td>\(p(X_1 = \mathrm{p} \mid y)\)</td><td>\(2/8 = 0.25\)</td><td>\(8/12 = 2/3 \approx 0.667\)</td></tr>
<tr><td>\(p(X_1 = \mathrm{r} \mid y)\)</td><td>\(6/8 = 0.75\)</td><td>\(4/12 = 1/3 \approx 0.333\)</td></tr>
<tr><td>\(p(X_2 = 3 \mid y)\)</td><td>\(2/8 = 0.25\)</td><td>\(6/12 = 0.5\)</td></tr>
<tr><td>\(p(X_2 = 4 \mid y)\)</td><td>\(4/8 = 0.5\)</td><td>\(3/12 = 0.25\)</td></tr>
<tr><td>\(p(X_2 = 5 \mid y)\)</td><td>\(2/8 = 0.25\)</td><td>\(3/12 = 0.25\)</td></tr>
</tbody></table></div>
<p>Check: colour column A: \(0.25 + 0.75 = 1\) ✓; petals column B: \(0.5 + 0.25 + 0.25 = 1\) ✓.</p>
<h5>When the table has a count column (2025-C Q4.1)</h5>
<p>The fish table has only 12 rows, but its last column, "Num. of collected samples", says how many fish each row stands for (100 fish in total). So you add up <b>counts</b>, not rows. Each species has 4 rows:</p>
\[\pi_\mathrm{A} = \frac{32 + 16 + 8 + 4}{100} = \frac{60}{100} = 0.6,\quad \pi_\mathrm{B} = \frac{5 + 15 + 1 + 3}{100} = \frac{24}{100} = 0.24,\quad \pi_\mathrm{C} = \frac{3 + 9 + 3 + 1}{100} = \frac{16}{100} = 0.16\]
<p>Check: \(0.6 + 0.24 + 0.16 = 1\) ✓.</p>`,
      cue: R`"Estimate these probabilities based on the data" (2025-A Q5.1); "What are the prior probabilities of the three species" (2025-C Q4.1); "obtain MLEs for the two class prior probabilities" (2026-B Q4.2).`,
      first: R`Count the rows of each class and write \(n_j\) next to it. Then \(\pi_j = n_j / n\).`,
      recipe: R`Class-conditional: for each class, for each feature, for each value: (rows of that class with that value) ÷ \(n_j\). Check that each column adds to 1.`,
      trap: R`Dividing a class-conditional by the total \(n = 20\) instead of by \(n_j\). That gives a <b>joint</b> probability, not a conditional one. In 2025-C, counting the <b>rows</b> of the table (4 per species) instead of adding the count column.` },

    { title: "2 · Bayes' rule and the MAP prediction: from \\(p(x \\mid y)\\) to \\(p(y \\mid x)\\)",
      idea: R`<p><b>Where we are.</b> After note 1 we know how common each class is (\(\pi_j\)) and what each class looks like (\(p(x \mid y = j)\)).</p>
<p><b>What we want.</b> A new flower arrives with features \(x\). We want \(p(y = j \mid x)\): the probability that it is class \(j\), <b>given</b> what we see. This is the <b>posterior probability</b> ("posterior" = after looking at the features).</p>
<p><b>The problem.</b> We have the conditional the wrong way round: \(p(x \mid y)\), not \(p(y \mid x)\). Note 0 showed that these are different numbers.</p>
<p><b>The idea that solves it: Bayes' rule.</b> Five small steps.</p>
<h5>Step 1 — the joint, written two ways</h5>
<p>By the product rule (note 0, step 4), "class \(j\) <b>and</b> features \(x\)" can be split in either order:</p>
\[p(y = j,\ x) = \pi_j \cdot p(x \mid y = j) \qquad\text{and also}\qquad p(y = j,\ x) = p(x) \cdot p(y = j \mid x)\]
<p>The first one says: fraction that is class \(j\), times the fraction of class \(j\) that looks like \(x\). The second: fraction that looks like \(x\), times the fraction of those that is class \(j\).</p>
<h5>Step 2 — solve for the posterior</h5>
<p>Both right-hand sides are equal, so divide by \(p(x)\):</p>
\[p(y = j \mid x) = \frac{\pi_j \cdot p(x \mid y = j)}{p(x)}\]
<p>This is <b>Bayes' rule</b>. In general form: \(P(A \mid B) = P(B \mid A)P(A)/P(B)\). Everything on the right we can compute except \(p(x)\), and that's step 3.</p>
<h5>Step 3 — the denominator \(p(x)\): add up the joints</h5>
<p>Every flower that looks like \(x\) is either A or B. So the probability of seeing \(x\) at all is the sum of the joints over all classes:</p>
\[p(x) = \sum_j \pi_j\, p(x \mid y = j) = \pi_\mathrm{A}\, p(x \mid \mathrm{A}) + \pi_\mathrm{B}\, p(x \mid \mathrm{B})\]
<p>The solutions call it the <b>marginal (data) probability</b>. In practice: compute one joint per class, add them, divide each joint by the sum. The posteriors then add to 1.</p>
<h5>Step 4 — with two features, multiply the per-feature numbers (naive Bayes)</h5>
<p>\(x\) has two features, and in 2025-A we only estimated one feature at a time. Naive Bayes <b>assumes</b> that within a class the features are independent, so</p>
\[p(x \mid y = j) = p(X_1 = x_1 \mid y = j) \cdot p(X_2 = x_2 \mid y = j)\]
<p>and the joint becomes \(\pi_j \cdot p(x_1 \mid j) \cdot p(x_2 \mid j)\). Note 3 explains this assumption and its alternative.</p>
<h5>Step 5 — the MAP prediction, and why the denominator can be ignored</h5>
<p><b>MAP</b> = "maximum a posteriori": predict the class with the <b>largest posterior</b>. Now look at step 2: every class's posterior is divided by the <b>same</b> number \(p(x)\) (it has no \(j\) in it). Dividing all candidates by the same positive number doesn't change which one is biggest. So:</p>
\[\hat y(x) = \arg\max_j\ p(y = j \mid x) = \arg\max_j\ \pi_j\, p(x \mid y = j)\]
<p>To <b>predict</b>, comparing the joints is enough. But when the question says "compute the posterior probability", you must still divide by \(p(x)\).</p>
<h5>Why the prior matters (lecture example)</h5>
<p>A test for a rare disease (prior \(\pi_\text{inf} = 0.001\)) is positive for 99% of infected people and for 2% of healthy ones. For a positive result the joints are \(0.001 \cdot 0.99 = 0.00099\) (infected) and \(0.999 \cdot 0.02 = 0.01998\) (healthy). So \(p(\text{inf} \mid \text{pos}) = 0.00099 / (0.00099 + 0.01998) \approx 0.047\). Even after a positive test, "healthy" is the MAP prediction, because the disease is so rare. A small prior can outweigh strong evidence. This comes back in 2026-B (malicious users are rare).</p>`,
      notation: [
        [R`\(p(y = j \mid x)\)`, R`<b>posterior</b>: probability of class \(j\) after seeing the features \(x\)`],
        [R`\(p(x \mid y = j)\)`, R`<b>class-conditional</b>, also called the <b>likelihood</b> of class \(j\): how probable these features are for a class-\(j\) sample`],
        [R`\(\pi_j\, p(x \mid y = j)\)`, R`<b>joint</b> probability \(p(y = j, x)\)`],
        [R`\(p(x)\)`, R`<b>marginal (data) probability</b> = sum of the joints over all classes`],
        [R`\(\arg\max_j\)`, R`"the \(j\) that gives the largest value" (the class itself, not the value)`],
        [R`\(\hat y(x)\)`, R`the predicted class for features \(x\)`],
        [R`MAP`, R`maximum a posteriori: predict the class with the largest posterior`],
      ],
      example: R`<p><b>2025-A Q5.2.</b> Two new flowers: sample 21 = (purple, 5 petals), sample 22 = (red, 3 petals). The numbers come from the table in note 1.</p>
<p><b>Sample 21, \(x = (\mathrm{p}, 5)\).</b></p>
<ul>
<li>Joint with A: \(\pi_\mathrm{A} \cdot p(X_1 = \mathrm{p} \mid \mathrm{A}) \cdot p(X_2 = 5 \mid \mathrm{A}) = 0.4 \times 0.25 \times 0.25 = 0.1 \times 0.25 = 0.025\)</li>
<li>Joint with B: \(\pi_\mathrm{B} \cdot p(X_1 = \mathrm{p} \mid \mathrm{B}) \cdot p(X_2 = 5 \mid \mathrm{B}) = 0.6 \times \tfrac{2}{3} \times 0.25 = 0.4 \times 0.25 = 0.1\)</li>
<li>Marginal: \(p(x) = 0.025 + 0.1 = 0.125\)</li>
<li>Posteriors: \(p(\mathrm{A} \mid x) = \dfrac{0.025}{0.125} = 0.2\), \(p(\mathrm{B} \mid x) = \dfrac{0.1}{0.125} = 0.8\) (and \(0.2 + 0.8 = 1\) ✓)</li>
<li>MAP: <b>B</b></li>
</ul>
<p><b>Sample 22, \(x = (\mathrm{r}, 3)\).</b></p>
<ul>
<li>Joint with A: \(0.4 \times 0.75 \times 0.25 = 0.3 \times 0.25 = 0.075\)</li>
<li>Joint with B: \(0.6 \times \tfrac{1}{3} \times 0.5 = 0.2 \times 0.5 = 0.1\)</li>
<li>Marginal: \(p(x) = 0.075 + 0.1 = 0.175\)</li>
<li>Posteriors: \(p(\mathrm{A} \mid x) = \dfrac{0.075}{0.175} = \dfrac{3}{7} \approx 0.429\), \(p(\mathrm{B} \mid x) = \dfrac{0.1}{0.175} = \dfrac{4}{7} \approx 0.571\)</li>
<li>MAP: <b>B</b></li>
</ul>
<p><b>2025-A Q5.3: find features that give the other class (A).</b> Look at the table in note 1 for the values where A is strong and B is weak: red (0.75 vs 0.333) and 4 petals (0.5 vs 0.25). Try \(x = (\mathrm{r}, 4)\):</p>
<ul>
<li>Joint with A: \(0.4 \times 0.75 \times 0.5 = 0.3 \times 0.5 = 0.15\)</li>
<li>Joint with B: \(0.6 \times \tfrac{1}{3} \times 0.25 = 0.2 \times 0.25 = 0.05\)</li>
<li>Marginal \(0.15 + 0.05 = 0.2\); posteriors \(\dfrac{0.15}{0.2} = 0.75\) (A) and \(\dfrac{0.05}{0.2} = 0.25\) (B) → MAP <b>A</b>. (Official answer.)</li>
</ul>
<p>(r, 5) also works: joints \(0.4 \times 0.75 \times 0.25 = 0.075\) and \(0.6 \times \tfrac13 \times 0.25 = 0.05\) → A with posterior 0.6. The question asks for one.</p>`,
      cue: R`"Compute the posterior probability for it to belong to each of the two species … predict its species based on MAP classification" (2025-A Q5.2); "specify a combination of features that would result in a MAP classification for the other species" (2025-A Q5.3).`,
      first: R`For each class write one line: \(\pi_j \times p(x_1 \mid j) \times p(x_2 \mid j) = \ldots\) (the joint). Then add the lines, then divide.`,
      recipe: R`joints → sum = \(p(x)\) → posterior = joint ÷ \(p(x)\) → MAP = the class with the largest posterior (equivalently, the largest joint).`,
      trap: R`Reporting the joints (0.025 and 0.1) as "posteriors". Joints don't add to 1; posteriors do. And don't forget the prior: \(p(x_1 \mid j)\, p(x_2 \mid j)\) alone is the ML prediction of note 4, not MAP.` },

    { title: "3 · Full Bayes vs naive Bayes: two ways to get \\(p(x_1, x_2 \\mid y)\\)",
      idea: R`<p><b>Where we are.</b> Bayes' rule (note 2) needs the class-conditional of the <b>whole</b> feature vector, \(p(X_1 = x_1, X_2 = x_2 \mid y = j)\): among class-\(j\) samples, how often do we see this exact <b>combination</b> of feature values? There are two ways to estimate it, and 2025-C asks for both.</p>
<h5>Way 1 — full Bayes: count the combination directly</h5>
<p>Among the rows of class \(j\), count those with exactly \(X_1 = x_1\) <b>and</b> \(X_2 = x_2\), and divide by \(n_j\):</p>
\[p(x_1, x_2 \mid y = j) = \frac{\text{rows of class } j \text{ with } X_1 = x_1 \text{ and } X_2 = x_2}{n_j}\]
<p>This is exact, but it needs a separate probability for <b>every combination</b>. With many features the number of combinations explodes, most combinations appear in few rows or none, and the estimates become unreliable.</p>
<h5>Way 2 — naive Bayes: one feature at a time, then multiply</h5>
<p>Naive Bayes makes an assumption: <b>inside one class, the features are independent</b>. Knowing a fish's upper fin tells you nothing extra about its lower fin, once you know its species. (This is called <i>conditional independence</i>; the lecture's example is two COVID tests whose results are related only through whether you are infected.) Under that assumption the combination probability splits into a product of one-feature probabilities:</p>
\[p(x_1, x_2 \mid y = j) = p(X_1 = x_1 \mid y = j) \cdot p(X_2 = x_2 \mid y = j)\]
<p>Each factor is a one-column count, as in note 1. To count \(p(X_1 = \text{yes} \mid j)\), add up <b>all</b> rows of class \(j\) with \(X_1 = \text{yes}\), whatever \(X_2\) is.</p>
<h5>What changes and what doesn't</h5>
<p>Only the class-conditional \(p(x \mid y = j)\) changes. The priors, the joints \(\pi_j\, p(x \mid j)\), the sum \(p(x)\), the division and the MAP rule are exactly as in note 2. If the features really are independent inside a class, the two ways give the same number for that class; if not, they differ.</p>`,
      notation: [
        [R`full Bayes`, R`estimates \(p(x_1, x_2 \mid y)\) by counting the exact combination`],
        [R`naive Bayes`, R`estimates it as \(p(x_1 \mid y) \cdot p(x_2 \mid y)\), assuming the features are independent within each class`],
        [R`\(\prod_{t=1}^{p}\)`, R`"multiply over all features \(t\)" (like \(\sum\), but multiplying). Naive Bayes: \(p(x \mid y) = \prod_t p(x_t \mid y)\).`],
      ],
      example: R`<p><b>2025-C Q4.</b> The fish to classify has an upper fin and no lower fin: \(x = (X_1 = \text{yes}, X_2 = \text{no})\). Priors from note 1: \(\pi_\mathrm{A} = 0.6\), \(\pi_\mathrm{B} = 0.24\), \(\pi_\mathrm{C} = 0.16\) (\(n_\mathrm{A} = 60\), \(n_\mathrm{B} = 24\), \(n_\mathrm{C} = 16\)).</p>
<h5>Q4.2 — full Bayes</h5>
<p>Read off the "yes / no" row of each species: A has 16 such fish, B has 15, C has 9.</p>
<ul>
<li>\(p(\text{yes}, \text{no} \mid \mathrm{A}) = \dfrac{16}{60}\), \(p(\text{yes}, \text{no} \mid \mathrm{B}) = \dfrac{15}{24}\), \(p(\text{yes}, \text{no} \mid \mathrm{C}) = \dfrac{9}{16}\)</li>
<li>Joints: A: \(\dfrac{60}{100} \cdot \dfrac{16}{60} = \dfrac{16}{100} = 0.16\); B: \(\dfrac{24}{100} \cdot \dfrac{15}{24} = \dfrac{15}{100} = 0.15\); C: \(\dfrac{16}{100} \cdot \dfrac{9}{16} = \dfrac{9}{100} = 0.09\)</li>
<li>Marginal: \(p(x) = 0.16 + 0.15 + 0.09 = 0.4\)</li>
<li>Posteriors: A: \(\dfrac{0.16}{0.4} = 0.4\); B: \(\dfrac{0.15}{0.4} = 0.375\); C: \(\dfrac{0.09}{0.4} = 0.225\)</li>
</ul>
<p>Notice that with full Bayes the joint is simply (fish of that species with these fins) ÷ 100: the \(n_j\) cancels.</p>
<p><b>Official-solution slip:</b> the last line is printed as \(\frac{0.9}{0.4} = 0.225\). It should be \(\frac{0.09}{0.4} = 0.225\). The result is right; only the numerator has a typo.</p>
<h5>Q4.3 — naive Bayes</h5>
<p>Six one-feature probabilities. For "\(X_1 = \text{yes}\)" add the (yes, yes) and (yes, no) rows; for "\(X_2 = \text{no}\)" add the (yes, no) and (no, no) rows:</p>
<ul>
<li>A: \(p(X_1 = \text{yes} \mid \mathrm{A}) = \dfrac{32 + 16}{60} = \dfrac{48}{60} = \dfrac45\); \(p(X_2 = \text{no} \mid \mathrm{A}) = \dfrac{16 + 4}{60} = \dfrac{20}{60} = \dfrac13\)</li>
<li>B: \(p(X_1 = \text{yes} \mid \mathrm{B}) = \dfrac{5 + 15}{24} = \dfrac{20}{24} = \dfrac56\); \(p(X_2 = \text{no} \mid \mathrm{B}) = \dfrac{15 + 3}{24} = \dfrac{18}{24} = \dfrac34\)</li>
<li>C: \(p(X_1 = \text{yes} \mid \mathrm{C}) = \dfrac{3 + 9}{16} = \dfrac{12}{16} = \dfrac34\); \(p(X_2 = \text{no} \mid \mathrm{C}) = \dfrac{9 + 1}{16} = \dfrac{10}{16} = \dfrac58\)</li>
</ul>
<p>Joints = prior × first factor × second factor. To multiply fractions, write the priors as fractions too: \(0.6 = \frac{60}{100} = \frac35\), \(0.24 = \frac{24}{100} = \frac{6}{25}\), \(0.16 = \frac{16}{100} = \frac{4}{25}\). Then multiply the tops together and the bottoms together:</p>
<ul>
<li>A: \(\dfrac35 \cdot \dfrac45 \cdot \dfrac13 = \dfrac{3 \cdot 4 \cdot 1}{5 \cdot 5 \cdot 3} = \dfrac{12}{75} = \dfrac{4}{25} = 0.16\)</li>
<li>B: \(\dfrac{6}{25} \cdot \dfrac56 \cdot \dfrac34 = \dfrac{6 \cdot 5 \cdot 3}{25 \cdot 6 \cdot 4} = \dfrac{90}{600} = \dfrac{3}{20} = 0.15\)</li>
<li>C: \(\dfrac{4}{25} \cdot \dfrac34 \cdot \dfrac58 = \dfrac{4 \cdot 3 \cdot 5}{25 \cdot 4 \cdot 8} = \dfrac{60}{800} = \dfrac{3}{40} = 0.075\)</li>
</ul>
<p>Marginal: \(p(x) = 0.16 + 0.15 + 0.075 = 0.385\). Posteriors: A: \(\dfrac{0.16}{0.385} \approx 0.416\); B: \(\dfrac{0.15}{0.385} \approx 0.390\); C: \(\dfrac{0.075}{0.385} \approx 0.195\).</p>
<p><b>Official-solution slip (rounding):</b> it gives 0.194 for C. \(0.075 / 0.385 = 0.19481\ldots\), which rounds to <b>0.195</b>.</p>
<p><b>Why A and B came out the same in both models, but C didn't.</b> A: full \(\frac{16}{60} = \frac{4}{15}\), naive \(\frac45 \cdot \frac13 = \frac{4}{15}\), equal. B: full \(\frac{15}{24} = \frac58\), naive \(\frac56 \cdot \frac34 = \frac{15}{24} = \frac58\), equal. C: full \(\frac{9}{16} = 0.5625\), naive \(\frac34 \cdot \frac58 = \frac{15}{32} \approx 0.469\), different. So in the A and B data the two fins happen to be exactly independent, and in C they are not.</p>
<h5>Q4.4 — the two predictions</h5>
<p>Full Bayes: largest posterior 0.4 → <b>Armfish (A)</b>. Naive Bayes: largest posterior 0.416 → <b>Armfish (A)</b>. The two models agree.</p>`,
      cue: R`"Compute the posterior probability for each species label under the <b>full Bayes</b> model" / "… under the <b>naive Bayes</b> model" / "do classifiers based on these models agree?" (2025-C Q4.2–4.4).`,
      first: R`Full Bayes: circle the one table row per class that matches \(x\) exactly. Naive Bayes: for each class, add the rows that match \(x_1\), then separately the rows that match \(x_2\).`,
      recipe: R`Class-conditional (full: one count; naive: product of per-feature counts) → × prior = joint → sum → divide → largest posterior.`,
      trap: R`In naive Bayes, \(p(X_2 = \text{no} \mid j)\) is not the single (yes, no) row. It includes <b>every</b> row with \(X_2 = \text{no}\) (here: (yes, no) and (no, no)).` },

    { title: "4 · Uniform priors: the maximum-likelihood (ML) prediction",
      idea: R`<p><b>Where we are.</b> MAP compares \(\pi_j\, p(x \mid y = j)\) across the classes: prior × class-conditional.</p>
<p><b>What changes.</b> Suppose all classes are given the <b>same</b> prior: \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C}\). Then \(\pi_j\) is the same factor on every candidate. Multiplying all candidates by the same positive number doesn't change which is largest, so it can be dropped:</p>
\[\hat y_\text{ML}(x) = \arg\max_j\ p(x \mid y = j)\]
<p>The class-conditional \(p(x \mid y = j)\) is also called the <b>likelihood</b> of class \(j\), so this is the <b>maximum-likelihood (ML) prediction</b>: pick the class under which the observed features are most probable, ignoring how common the classes are.</p>
<p><b>Why it exists.</b> The priors may not be trustworthy, for example when the test data comes from a different place than the training data (that is the story of 2025-A Q5.4). Then you can decide from the features alone.</p>
<p><b>The family of rules</b> (from the lecture). There is one more, more general rule, which you will meet in note 6: when some mistakes cost more than others, predict the class with the smallest <b>expected cost</b>. The three rules are nested: the cost rule with all mistakes costing the same is MAP, and MAP with all priors equal is ML.</p>`,
      notation: [
        [R`likelihood of class \(j\)`, R`\(p(x \mid y = j)\), the class-conditional of the observed features`],
        [R`ML prediction`, R`\(\arg\max_j p(x \mid y = j)\): MAP with all priors equal`],
        [R`uniform priors`, R`\(\pi_j = 1/k\) for all \(k\) classes`],
      ],
      example: R`<p><b>2025-C Q4.5.</b> Same fish, \(x = (\text{yes}, \text{no})\). Priors are uniform, so compare the class-conditionals from note 3 directly.</p>
<p><b>Full Bayes:</b></p>
<ul>
<li>A: \(\dfrac{16}{60} = \dfrac{4}{15} \approx 0.2667\)</li>
<li>B: \(\dfrac{15}{24} = \dfrac58 = 0.625\)</li>
<li>C: \(\dfrac{9}{16} = 0.5625\)</li>
</ul>
<p>Largest: 0.625 → <b>Blofish (B)</b>.</p>
<p><b>Naive Bayes:</b></p>
<ul>
<li>A: \(\dfrac45 \cdot \dfrac13 = \dfrac{4}{15} \approx 0.2667\)</li>
<li>B: \(\dfrac56 \cdot \dfrac34 = \dfrac58 = 0.625\)</li>
<li>C: \(\dfrac34 \cdot \dfrac58 = \dfrac{15}{32} \approx 0.469\)</li>
</ul>
<p>Largest: 0.625 → <b>Blofish (B)</b> again.</p>
<p><b>Compare with note 3:</b> MAP said Armfish. Armfish won there only because it is common (\(\pi_\mathrm{A} = 0.6\)). The features alone point to Blofish. Same data, different rule, different answer.</p>
<p><b>Official-solution slip:</b> the naive-Bayes B line prints "0625"; it means 0.625.</p>`,
      cue: R`"Specify the predicted species … assuming uniform prior probabilities \(\pi_\mathrm{A} = \pi_\mathrm{B} = \pi_\mathrm{C}\) (this is the maximum-likelihood prediction)" (2025-C Q4.5).`,
      first: R`Write "uniform priors cancel, so compare \(p(x \mid y = j)\)", then list the class-conditionals you already computed.`,
      trap: R`Doing the full posterior computation with \(\pi_j = 1/3\) is not wrong, just slow: it gives the same winner. What <b>is</b> wrong is reusing the real priors 0.6 / 0.24 / 0.16.` },

    { title: "5 · How far can the prior move before the prediction flips?",
      idea: R`<p><b>Where we are.</b> With two classes, MAP compares two joints: \(\pi_\mathrm{A}\, L_\mathrm{A}\) against \(\pi_\mathrm{B}\, L_\mathrm{B}\), where \(L_j = p(x \mid y = j)\) is the likelihood of class \(j\) (for naive Bayes, the product of the per-feature numbers).</p>
<p><b>What we want.</b> 2025-A Q5.4 asks: if we change the priors, for which values do the predictions stay the same?</p>
<h5>Step 1 — only one unknown</h5>
<p>With two classes the priors add up to 1, so \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\). The likelihoods \(L_\mathrm{A}, L_\mathrm{B}\) don't depend on the priors, so they stay fixed.</p>
<h5>Step 2 — write the condition for the current prediction as an inequality</h5>
<p>If the current prediction is B, it stays B as long as</p>
\[\pi_\mathrm{A}\, L_\mathrm{A} < (1 - \pi_\mathrm{A})\, L_\mathrm{B}\]
<h5>Step 3 — solve for \(\pi_\mathrm{A}\)</h5>
<p>Multiply out: \(\pi_\mathrm{A} L_\mathrm{A} < L_\mathrm{B} - \pi_\mathrm{A} L_\mathrm{B}\). Move the \(\pi_\mathrm{A}\) terms to the left: \(\pi_\mathrm{A}(L_\mathrm{A} + L_\mathrm{B}) < L_\mathrm{B}\). So</p>
\[\pi_\mathrm{A} < \frac{L_\mathrm{B}}{L_\mathrm{A} + L_\mathrm{B}}\]
<p>At exactly that value the two joints are equal (a tie). That is the flipping point.</p>
<h5>Step 4 — several test samples: every condition must hold</h5>
<p>Each sample gives its own threshold. All predictions stay unchanged only if <b>all</b> conditions hold, so take the strictest one: the sample whose posteriors were closest to 50/50.</p>`,
      notation: [
        [R`\(L_j = p(x \mid y = j)\)`, R`the likelihood of class \(j\) for this sample (for naive Bayes: \(p(x_1 \mid j)\, p(x_2 \mid j)\))`],
        [R`threshold`, R`the prior value where the two joints are equal; on one side you predict A, on the other B`],
      ],
      example: R`<p><b>2025-A Q5.4.</b> Both test samples were predicted B (note 2). Making \(\pi_\mathrm{A}\) <b>smaller</b> only helps B, so we need the <b>largest</b> \(\pi_\mathrm{A}\) that keeps both at B.</p>
<p>Both inequalities below have the fractions \(\tfrac{1}{16}\) or \(\tfrac{3}{16}\) on the left and \(\tfrac16\) on the right. To get rid of them, multiply both sides by 48, because 48 is divisible by both 16 and 6 (\(48 = 3 \cdot 16 = 8 \cdot 6\)). So \(48 \cdot \tfrac{1}{16} = 3\), \(48 \cdot \tfrac{3}{16} = 9\), \(48 \cdot \tfrac16 = 8\). Multiplying both sides by a positive number keeps the direction of \(<\).</p>
<p><b>Sample 21, \(x = (\mathrm{p}, 5)\).</b> \(L_\mathrm{A} = 0.25 \times 0.25 = \tfrac{1}{16}\); \(L_\mathrm{B} = \tfrac23 \times \tfrac14 = \tfrac{2}{12} = \tfrac16\).</p>
\[\pi_\mathrm{A} \cdot \tfrac{1}{16} < (1 - \pi_\mathrm{A}) \cdot \tfrac16\]
<p>× 48: \(3\pi_\mathrm{A} < 8(1 - \pi_\mathrm{A}) = 8 - 8\pi_\mathrm{A}\). Add \(8\pi_\mathrm{A}\) to both sides: \(3\pi_\mathrm{A} + 8\pi_\mathrm{A} = 11\pi_\mathrm{A} < 8\). Divide by 11:</p>
\[\pi_\mathrm{A} < \tfrac{8}{11} \approx 0.727\]
<p><b>Sample 22, \(x = (\mathrm{r}, 3)\).</b> \(L_\mathrm{A} = 0.75 \times 0.25 = \tfrac{3}{16}\); \(L_\mathrm{B} = \tfrac13 \times \tfrac12 = \tfrac16\).</p>
\[\pi_\mathrm{A} \cdot \tfrac{3}{16} < (1 - \pi_\mathrm{A}) \cdot \tfrac16\]
<p>× 48: \(9\pi_\mathrm{A} < 8(1 - \pi_\mathrm{A}) = 8 - 8\pi_\mathrm{A}\). Add \(8\pi_\mathrm{A}\) to both sides: \(9\pi_\mathrm{A} + 8\pi_\mathrm{A} = 17\pi_\mathrm{A} < 8\). Divide by 17:</p>
\[\pi_\mathrm{A} < \tfrac{8}{17} \approx 0.471\]
<p>(Same answers straight from the step-3 formula \(\frac{L_\mathrm{B}}{L_\mathrm{A} + L_\mathrm{B}}\): sample 21: \(\frac{1/6}{1/16 + 1/6} = \frac{8/48}{3/48 + 8/48} = \frac{8}{11}\); sample 22: \(\frac{1/6}{3/16 + 1/6} = \frac{8/48}{9/48 + 8/48} = \frac{8}{17}\).)</p>
<p><b>Both together:</b> \(\pi_\mathrm{A} < \tfrac{8}{17}\) (sample 22 is the stricter one, as expected: its posteriors 0.571 : 0.429 were the closest). Answer: \(\pi_\mathrm{A} \in [0, \tfrac{8}{17}) \approx [0, 0.471)\) and \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A} \in (\tfrac{9}{17}, 1]\).</p>
<p><b>Check at the boundary</b> \(\pi_\mathrm{A} = \tfrac{8}{17}\): joint A \(= \tfrac{8}{17} \cdot \tfrac{3}{16} = \tfrac{24}{272} = \tfrac{3}{34}\); joint B \(= \tfrac{9}{17} \cdot \tfrac16 = \tfrac{9}{102} = \tfrac{3}{34}\). Equal, a tie. Just below \(\tfrac{8}{17}\), B wins.</p>
<p><b>The official solution's shortcut</b> says the same thing with ratios: the tie happens when \(\pi_\mathrm{A} : \pi_\mathrm{B} = L_\mathrm{B} : L_\mathrm{A} = \tfrac16 : \tfrac{3}{16} = \tfrac{16}{18} = \tfrac89\), i.e. \(\pi_\mathrm{A} = \tfrac{8}{8+9} = \tfrac{8}{17}\).</p>
<p>2026-B Q4.4 asks the same kind of question for a Poisson model; that's note 10.</p>`,
      cue: R`"Specify the range of prior probabilities for which the two predictions you gave remain unchanged" (2025-A Q5.4); "find the smallest value for the prior \(\pi_\mathrm{M}\) for which … would be classified as M" (2026-B Q4.4).`,
      first: R`For each sample write "\(\pi_\mathrm{A}\, L_\mathrm{A} < (1 - \pi_\mathrm{A})\, L_\mathrm{B}\)" with its numbers plugged in.`,
      recipe: R`Threshold \(= \dfrac{L_\mathrm{B}}{L_\mathrm{A} + L_\mathrm{B}}\) per sample → keep the strictest → state the range for both \(\pi_\mathrm{A}\) and \(\pi_\mathrm{B}\).`,
      trap: R`Using the posteriors (0.2, 0.8, …) in place of \(L_j\). Those already contain the old priors. The inequality needs the likelihoods \(p(x_1 \mid j)\, p(x_2 \mid j)\) <b>without</b> \(\pi\).` },

    { title: "6 · Costs: when some mistakes are worse than others (minimum expected cost)",
      idea: R`<p><b>Why it exists.</b> MAP (note 2) makes as few mistakes as possible, but it counts every mistake the same. Often one kind of mistake is much worse. The lecture's example: sending an infected person home is far worse than treating a healthy one. We then want the prediction with the smallest <b>expected cost</b>, which is not always the most probable class.</p>
<h5>Step 1 — the cost table \(\lambda\)</h5>
<p>For every pair (what we predict, what the truth is) we are given a cost:</p>
\[\lambda_{y, y'} = \text{cost of predicting } y \text{ when the true class is } y'\]
<p>The <b>first</b> index is what we <b>say</b>; the <b>second</b> is the <b>truth</b>. Being right costs 0 (\(\lambda_{y,y} = 0\)). As a matrix: <b>row = prediction</b>, <b>column = truth</b>.</p>
<h5>Step 2 — the expected cost of one prediction</h5>
<p>We don't know the truth, but we know how probable each truth is: the posteriors \(p(y' \mid x)\). If we predict \(y\), each possible truth \(y'\) happens with probability \(p(y' \mid x)\) and then costs \(\lambda_{y, y'}\). The expected cost is the probability-weighted sum:</p>
\[R(y \mid x) = \sum_{y'} \lambda_{y, y'}\ p(y' \mid x)\]
<p>Compute this for every possible prediction \(y\) and <b>predict the one with the smallest expected cost</b>.</p>
<h5>Step 3 — with two classes it is one term each</h5>
<p>Write out the sum for predicting A: \(R(\mathrm{A} \mid x) = \lambda_{\mathrm{A},\mathrm{A}}\, p(\mathrm{A} \mid x) + \lambda_{\mathrm{A},\mathrm{B}}\, p(\mathrm{B} \mid x)\). Being right costs nothing (\(\lambda_{\mathrm{A},\mathrm{A}} = 0\)), so the first term vanishes and \(R(\mathrm{A} \mid x) = \lambda_{\mathrm{A},\mathrm{B}}\ p(\mathrm{B} \mid x)\): predicting A only costs something when the truth is B. Likewise \(R(\mathrm{B} \mid x) = \lambda_{\mathrm{B},\mathrm{A}}\ p(\mathrm{A} \mid x)\).</p>
<h5>Step 4 — with a matrix it is a matrix × vector</h5>
<p>Row \(y\) of \(\lambda\) dotted with the column of posteriors is exactly \(\sum_{y'} \lambda_{y,y'}\, p(y' \mid x)\). So \(\lambda \cdot (\text{posterior column})\) gives all expected costs at once, one entry per prediction.</p>
<h5>Step 5 — the formula-sheet version uses joints</h5>
<p>The formula sheet writes the expected risk as \(\sum_{y'} \pi_{y'}\, P(X = x \mid Y = y')\, \lambda_{y,y'}\), with the <b>joint</b> instead of the posterior. That is the same sum multiplied by \(p(x)\) for every \(y\), so the smallest one is the same prediction. Use whichever numbers you already have.</p>`,
      notation: [
        [R`\(\lambda_{y,y'}\) ("lambda")`, R`cost of predicting \(y\) when the truth is \(y'\). First index = prediction, second = truth. (2026-B calls it \(C_{y,y'}\), because there \(\lambda\) is the Poisson rate.)`],
        [R`\(R(y \mid x)\)`, R`expected cost ("risk") of predicting \(y\) for features \(x\)`],
        [R`\(\arg\min_y\)`, R`the \(y\) giving the smallest value`],
      ],
      example: R`<h5>Two classes: 2025-A Q5.5</h5>
<p>"Classifying an Afloris as Bifloris costs \(\lambda_\mathrm{BA} = 2\)": we say B, the truth is A. "Classifying a Bifloris as Afloris costs \(\lambda_\mathrm{AB} = 1\)". Posteriors from note 2.</p>
<p><b>Sample 21</b> (\(p(\mathrm{A} \mid x) = 0.2\), \(p(\mathrm{B} \mid x) = 0.8\)):</p>
<ul>
<li>Predict A: wrong only if the truth is B: \(\lambda_\mathrm{AB} \cdot p(\mathrm{B} \mid x) = 1 \times 0.8 = 0.8\)</li>
<li>Predict B: wrong only if the truth is A: \(\lambda_\mathrm{BA} \cdot p(\mathrm{A} \mid x) = 2 \times 0.2 = 0.4\)</li>
<li>Smaller: 0.4 → <b>B</b> (same as MAP)</li>
</ul>
<p><b>Sample 22</b> (\(p(\mathrm{A} \mid x) = \tfrac37\), \(p(\mathrm{B} \mid x) = \tfrac47\)):</p>
<ul>
<li>Predict A: \(1 \times \tfrac47 = \tfrac47 \approx 0.571\)</li>
<li>Predict B: \(2 \times \tfrac37 = \tfrac67 \approx 0.857\)</li>
<li>Smaller: 0.571 → <b>A</b>, although MAP said B. Calling an A flower "B" is twice as costly, and this flower is almost 50/50, so we play it safe.</li>
</ul>
<p><b>Official-solution slip:</b> it writes "\(\frac47 \times \lambda_\mathrm{AB} = \frac47 \approx 0.429\)". But \(\frac47 \approx 0.571\) (0.429 is \(\frac37\)). The comparison and the answer (A) are unaffected: \(0.571 < 0.857\).</p>
<h5>Three classes with a matrix: 2025-C Q4.6</h5>
<p>Species order A, B, C; rows = prediction, columns = truth:</p>
\[\lambda = \begin{bmatrix}0&1&2\\1&0&2\\1&1&0\end{bmatrix}\]
<p>Read one entry to be sure of the direction: \(\lambda_{\mathrm{B},\mathrm{C}}\) (row B, column C) \(= 2\) is "predict Blofish, truth Catfish", and the question says misclassifying a Catfish as a Blofish is twice as bad as the reverse (\(\lambda_{\mathrm{C},\mathrm{B}} = 1\)). ✓</p>
<p>Full-Bayes posteriors from note 3: \((0.4,\ 0.375,\ 0.225)\). Each row dotted with that column:</p>
<ul>
<li>Predict A: \(0 \cdot 0.4 + 1 \cdot 0.375 + 2 \cdot 0.225 = 0 + 0.375 + 0.45 = 0.825\)</li>
<li>Predict B: \(1 \cdot 0.4 + 0 \cdot 0.375 + 2 \cdot 0.225 = 0.4 + 0 + 0.45 = 0.85\)</li>
<li>Predict C: \(1 \cdot 0.4 + 1 \cdot 0.375 + 0 \cdot 0.225 = 0.4 + 0.375 + 0 = 0.775\)</li>
</ul>
\[\lambda \begin{bmatrix}0.4\\0.375\\0.225\end{bmatrix} = \begin{bmatrix}0.825\\0.85\\0.775\end{bmatrix}\]
<p>Smallest: 0.775 → <b>Catfish (C)</b>, the class with the <b>smallest</b> posterior. Any wrong answer on a Catfish costs 2, so saying "C" is the safe bet.</p>
<p><b>Same answer with the formula-sheet (joint) version:</b> joints \((0.16, 0.15, 0.09)\) give A: \(0.15 + 2 \cdot 0.09 = 0.33\); B: \(0.16 + 2 \cdot 0.09 = 0.34\); C: \(0.16 + 0.15 = 0.31\). Smallest is C. (These are the posteriors' costs × 0.4.)</p>`,
      cue: R`"Specify the prediction that minimizes the classification risk … and the provided cost values" (2025-A Q5.5); "What is the species that minimizes the expected misclassification risk … given this cost matrix?" (2025-C Q4.6).`,
      first: R`Write one line per possible prediction: "predict \(y\): \(\sum_{y'} \lambda_{y,y'}\, p(y' \mid x) = \ldots\)". For a matrix: row of \(\lambda\) · posterior column.`,
      recipe: R`posteriors (or joints) → expected cost of each prediction → pick the <b>smallest</b> (not the largest).`,
      trap: R`Mixing up the indices: \(\lambda_\mathrm{BA}\) = <b>say</b> B, <b>truth</b> A. With a matrix, rows are predictions; don't multiply by the columns. And the cost of predicting \(y\) is weighted by the probabilities of the <b>other</b> classes, not of \(y\) itself.` },

    { title: "7 · Likelihood and the MLE recipe: log → derivative → 0 (Poisson)",
      idea: R`<p><b>Where we are.</b> So far the class-conditionals were tables, and we filled them by counting. 2026-B instead describes each class with a <b>formula that has a parameter</b>, and training means choosing that parameter from the data.</p>
<h5>Step 1 — the Poisson model</h5>
<p>The Poisson distribution describes a <b>count</b>: how many packets a user sends in a fixed time window (0, 1, 2, …). It has one parameter \(\lambda\), the typical rate (its average count). The probability of seeing exactly \(k\) is (on the formula sheet):</p>
\[\Pr[X = k \mid \lambda] = \mathrm{Poiss}(k \mid \lambda) = \frac{\lambda^k e^{-\lambda}}{k!}\]
<p>For example, with \(\lambda = 2\): \(\Pr[X = 0] = \frac{2^0 e^{-2}}{0!} = e^{-2} = 0.1353\) (from the exam's \(e^t\) table), and \(\Pr[X = 4] = \frac{2^4 e^{-2}}{4!} = \frac{16 \times 0.1353}{24} = \frac{2.1648}{24} = 0.0902\).</p>
<h5>Step 2 — the likelihood: how probable is our data, if the rate were \(\lambda\)?</h5>
<p>We observe \(n\) counts \(D = \{x_1, \ldots, x_n\}\) and want the \(\lambda\) that "explains them best". For a candidate \(\lambda\), compute the probability of seeing exactly our data. The samples are independent, so the probability of all of them is the <b>product</b> of the individual probabilities:</p>
\[L(\lambda; D) = \prod_{i=1}^{n} \mathrm{Poiss}(x_i \mid \lambda) = \prod_{i=1}^{n} \frac{\lambda^{x_i} e^{-\lambda}}{x_i!}\]
<p>This is the <b>likelihood</b>: a function of \(\lambda\), with the data fixed. The <b>maximum likelihood estimate (MLE)</b> \(\hat\lambda\) is the \(\lambda\) that makes it largest.</p>
<h5>Step 3 — take the log: product → sum</h5>
<p>A product is awkward to differentiate. The log turns products into sums (\(\log(ab) = \log a + \log b\)), and because log is increasing, the \(\lambda\) that maximizes \(L\) also maximizes \(\log L\). So we work with the <b>log-likelihood</b>:</p>
\[\ell(\lambda; D) = \log L(\lambda; D) = \sum_{i=1}^{n} \log \frac{\lambda^{x_i} e^{-\lambda}}{x_i!}\]
<h5>Step 4 — simplify one term with the log rules</h5>
<p>Log of a quotient = difference; log of a product = sum; \(\log(\lambda^{x_i}) = x_i \log\lambda\); \(\log(e^{-\lambda}) = -\lambda\) (natural log). So each term is</p>
\[\log \frac{\lambda^{x_i} e^{-\lambda}}{x_i!} = x_i \log\lambda - \lambda - \log(x_i!)\]
<p>Adding over \(i = 1..n\): the first parts give \((\sum_i x_i)\log\lambda\), the \(-\lambda\) appears \(n\) times, the last parts stay a sum:</p>
\[\ell(\lambda; D) = \Big(\sum_{i=1}^{n} x_i\Big)\log\lambda \;-\; n\lambda \;-\; \sum_{i=1}^{n}\log(x_i!)\]
<h5>Step 5 — differentiate with respect to \(\lambda\)</h5>
<p>\(\sum_i x_i\) is just a number (the data is fixed), and \(\frac{d}{d\lambda}\log\lambda = \frac1\lambda\). The derivative of \(n\lambda\) is \(n\). The last sum contains no \(\lambda\), so its derivative is 0:</p>
\[\ell'(\lambda) = \Big(\sum_{i=1}^{n} x_i\Big)\frac{1}{\lambda} - n\]
<h5>Step 6 — set it to 0 and solve</h5>
\[\Big(\sum_i x_i\Big)\frac1\lambda - n = 0 \iff \Big(\sum_i x_i\Big)\frac1\lambda = n \iff \hat\lambda = \frac1n\sum_{i=1}^{n} x_i\]
<p>The MLE of the Poisson rate is the <b>average of the counts</b>.</p>
<h5>Step 7 — check it is a maximum</h5>
<p>Differentiate once more: \(\ell''(\lambda) = -\big(\sum_i x_i\big)\frac{1}{\lambda^2} < 0\) (counts are \(\ge 0\) and not all zero). The curve bends down everywhere, so the single point where \(\ell' = 0\) is the maximum.</p>
<p><b>Where you have seen this before.</b> The counting fractions in note 1 come from the same recipe: the lecture derives the binomial MLE \(\hat p = x/n\) by setting a derivative to 0. And your own HW5 Q1–2 is exactly this Poisson derivation.</p>`,
      notation: [
        [R`\(\lambda\) ("lambda")`, R`the Poisson rate: the typical (average) count. <b>Not</b> the cost \(\lambda\) of note 6; 2026-B renames costs to \(C\) because of this.`],
        [R`\(\mathrm{Poiss}(k \mid \lambda)\)`, R`\(\frac{\lambda^k e^{-\lambda}}{k!}\): probability of exactly \(k\) events when the rate is \(\lambda\)`],
        [R`\(k!\)`, R`factorial: \(k! = 1 \cdot 2 \cdots k\); \(0! = 1\), \(4! = 24\)`],
        [R`\(D = \{x_i\}_{i=1}^{n}\)`, R`the dataset: \(n\) observed counts`],
        [R`\(L(\lambda; D)\)`, R`likelihood: probability of the whole dataset if the rate is \(\lambda\)`],
        [R`\(\ell(\lambda; D)\)`, R`log-likelihood \(= \log L\) (natural log)`],
        [R`\(\hat\lambda\)`, R`the MLE: the \(\lambda\) maximizing \(\ell\)`],
      ],
      example: R`<p><b>2026-B Q4.1, written the way the exam wants it.</b> The question gives a <b>general</b> dataset \(D = \{x_i\}_{i=1}^n\) from one Poisson with rate \(\lambda\). Everything stays in letters; the ten users of the table play no role in this part.</p>
<ol>
<li>\(\ell(\lambda; D) = \sum_{i=1}^n \log \mathrm{Poiss}(x_i \mid \lambda) = \sum_{i=1}^n \big(x_i\log\lambda - \lambda - \log(x_i!)\big) = \big(\sum_i x_i\big)\log\lambda - n\lambda - \sum_i \log(x_i!)\)</li>
<li>\(\ell'(\lambda; D) = \big(\sum_i x_i\big)\frac1\lambda - n\)</li>
<li>\(\ell'(\lambda; D) = 0 \iff \lambda = \frac1n\sum_i x_i\)</li>
<li>\(\ell''(\lambda; D) = -\big(\sum_i x_i\big)\frac1{\lambda^2} < 0\) → maximum. So \(\hat\lambda = \frac1n\sum_{i=1}^n x_i\).</li>
</ol>
<p>That is the whole official answer (5 points).</p>`,
      cue: R`"Express the data log-likelihood \(\ell(\lambda; D)\) as a function of the Poisson rate \(\lambda\). Use the expression … to derive a formula for the MLE \(\hat\lambda\)" (2026-B Q4.1).`,
      first: R`\(\ell(\lambda; D) = \sum_{i=1}^n \log\dfrac{\lambda^{x_i} e^{-\lambda}}{x_i!}\), a general sum over \(i\), then split each log into three parts.`,
      recipe: R`likelihood = product → log → simplify to "\(\ldots\log\lambda - n\lambda - \ldots\)" → \(\frac{d}{d\lambda}\) → \(= 0\) → solve → (second derivative \(< 0\)).`,
      trap: R`Moed B: you wrote the log-likelihood of <b>this particular table</b> (with \(\lambda_R\), \(\lambda_M\) and the numbers 1, 2, 3, 4) and never differentiated. The part asks for a <b>general</b> \(x_1, \ldots, x_n\) and <b>one</b> \(\lambda\), and the points are for the derivative and solving \(\ell' = 0\).` },

    { title: "8 · Fitting the classifier: one Poisson rate per class, priors by counting",
      idea: R`<p><b>Where we are.</b> Note 7 gives a formula for the MLE of <b>one</b> Poisson from <b>one</b> set of counts: \(\hat\lambda = \) their average.</p>
<p><b>What we want.</b> In 2026-B each class has its own Poisson: regular users send packets at rate \(\lambda_\mathrm{R}\), malicious ones at rate \(\lambda_\mathrm{M}\). Together with the priors, that is the whole Bayesian classifier of notes 1–2, with the Poisson formula as the class-conditional:</p>
\[p(x \mid y) = \mathrm{Poiss}(x \mid \lambda_y)\]
<h5>Step 1 — split the data by class</h5>
<p>The class-conditional of R describes regular users only, so \(\lambda_\mathrm{R}\) is fitted to the R rows only (exactly like note 1, where A's probabilities were counted among A rows only). Same for M.</p>
<h5>Step 2 — apply the formula of note 7 to each group</h5>
<p>\(\hat\lambda_\mathrm{R}\) = average count of the R users; \(\hat\lambda_\mathrm{M}\) = average count of the M users.</p>
<h5>Step 3 — priors by counting, as in note 1</h5>
<p>\(\hat\pi_y = n_y / n\).</p>`,
      notation: [
        [R`\(\lambda_\mathrm{R}, \lambda_\mathrm{M}\)`, R`the Poisson rate of regular / malicious users`],
        [R`\(\hat\pi_\mathrm{R}, \hat\pi_\mathrm{M}\)`, R`estimated priors; \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\)`],
      ],
      example: R`<p><b>2026-B Q4.2.</b> The ten users: \(x = 1, 1, 2, 2, 2, 2, 3, 3\) are R (users 1–8), and \(x = 4, 4\) are M (users 9–10).</p>
\[\hat\lambda_\mathrm{R} = \frac{1 + 1 + 2 + 2 + 2 + 2 + 3 + 3}{8} = \frac{16}{8} = 2, \qquad \hat\lambda_\mathrm{M} = \frac{4 + 4}{2} = \frac{8}{2} = 4\]
\[\hat\pi_\mathrm{R} = \frac{8}{10} = 0.8, \qquad \hat\pi_\mathrm{M} = \frac{2}{10} = 0.2\]
<p><b>Official-solution slip:</b> the second prior is labelled \(\hat\pi_\mathrm{R} = \frac{2}{10} = 0.2\). It is \(\hat\pi_\mathrm{M}\).</p>`,
      cue: R`"Use the formula you obtained for the Poisson MLE in (1) to obtain MLEs for the Poisson rates \(\hat\lambda_\mathrm{R}\) and \(\hat\lambda_\mathrm{M}\) … also … the two class prior probabilities" (2026-B Q4.2).`,
      first: R`Two lists: the R counts and the M counts. Average each list; then count the lists' lengths for the priors.`,
      trap: R`Moed B: you got the priors (0.8 / 0.2) but left out the rates. That was 3 free points: the rate is just an average. Also don't average all ten users together (that gives 2.4, a single rate for everyone, which can't tell the classes apart).` },

    { title: "9 · MAP with a formula: the comparison becomes a threshold on \\(x\\)",
      idea: R`<p><b>Where we are.</b> Everything is fitted: \(\hat\pi_\mathrm{R} = 0.8\), \(\hat\pi_\mathrm{M} = 0.2\), \(\hat\lambda_\mathrm{R} = 2\), \(\hat\lambda_\mathrm{M} = 4\). The MAP rule (note 2) is unchanged: compare the joints, prior × class-conditional.</p>
<h5>Step 1 — write the rule as an inequality</h5>
<p>Predict M exactly when M's joint is larger:</p>
\[\hat\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{M}) > \hat\pi_\mathrm{R}\,\mathrm{Poiss}(x \mid \hat\lambda_\mathrm{R})\]
<p>(The official solution writes it as a ratio "\(\ldots / \ldots > 1\)", which is the same thing.)</p>
<h5>Step 2 — plug in and cancel</h5>
<p>Both sides have the same \(x\), so the same \(x!\) in the denominator. Multiply both sides by \(x!\) and it disappears. Then the rest is powers and exponentials, which the power rules simplify (\(\frac{a^x}{b^x} = (\frac ab)^x\), \(\frac{e^a}{e^b} = e^{a-b}\)).</p>
<h5>Step 3 — you get a condition on \(x\) alone</h5>
<p>The result has the form "\(x\) is large enough" (malicious users send more packets). Find the cut-off with the given \(e^t\) table, then classify each user by checking which side of it they fall on.</p>
<p><b>Why this is easier than computing each user separately:</b> one derivation classifies every \(x\) at once, and you reuse the cut-off in the bonus (note 12).</p>`,
      notation: [
        [R`\(e^t\) table`, R`the exam gives \(e^{-4} = 0.0183\), \(e^{-2} = 0.1353\), \(e^{2} = 7.389\), \(e^4 = 54.598\), … Use it; there is no need to compute exponentials by hand.`],
        [R`\(\iff\)`, R`"if and only if": the two statements are equivalent, so you may keep simplifying`],
      ],
      example: R`<p><b>2026-B Q4.3.</b> Users with \(x_{11} = 2\), \(x_{12} = 4\), \(x_{13} = 7\).</p>
<p><b>The inequality, one step per line:</b></p>
\[0.2\cdot\frac{4^x e^{-4}}{x!} > 0.8\cdot\frac{2^x e^{-2}}{x!}\]
<p>Multiply both sides by \(x!\) (positive, so \(>\) stays):</p>
\[0.2 \cdot 4^x e^{-4} > 0.8 \cdot 2^x e^{-2}\]
<p>Divide both sides by \(0.2 \cdot 2^x \cdot e^{-4}\) (positive). On the left the 0.2 and the \(e^{-4}\) cancel, leaving \(\frac{4^x}{2^x} = \left(\frac42\right)^x = 2^x\). On the right the \(2^x\) cancels, leaving \(\frac{0.8}{0.2} = 4\) times \(\frac{e^{-2}}{e^{-4}} = e^{-2-(-4)} = e^{2}\):</p>
\[2^x > 4e^2 = 4 \times 7.389 = 29.556\]
<p><b>The cut-off.</b> Powers of 2: \(2^4 = 16 < 29.556\) and \(2^5 = 32 > 29.556\). So <b>predict M exactly when \(x \ge 5\)</b>, and R when \(x \le 4\).</p>
<ul>
<li>\(x_{11} = 2\): \(2^2 = 4 < 29.556\) → <b>R</b></li>
<li>\(x_{12} = 4\): \(2^4 = 16 < 29.556\) → <b>R</b></li>
<li>\(x_{13} = 7\): \(2^7 = 128 > 29.556\) → <b>M</b></li>
</ul>
<p><b>Numeric check at \(x = 4\)</b>, straight from the table: M side \(0.2 \cdot \frac{4^4 e^{-4}}{4!} = 0.2 \cdot \frac{256 \times 0.0183}{24} = 0.2 \cdot \frac{4.6848}{24} = 0.2 \times 0.1952 = 0.0390\); R side \(0.8 \cdot \frac{2^4 e^{-2}}{4!} = 0.8 \cdot \frac{16 \times 0.1353}{24} = 0.8 \cdot \frac{2.1648}{24} = 0.8 \times 0.0902 = 0.0722\). R wins. ✓</p>
<p><b>The surprise:</b> 4 packets is exactly the <i>typical</i> malicious count (\(\hat\lambda_\mathrm{M} = 4\)), yet it is classified R. Malicious users are rare (\(\hat\pi_\mathrm{M} = 0.2\)), as in the disease example of note 2. Notes 10 and 11 ask how much the prior or the costs would have to change to call it M.</p>`,
      cue: R`"Use the fitted model from (2) and the MAP rule (standard Bayesian classification) to classify each of these three users as R or M" (2026-B Q4.3).`,
      first: R`"Predict M iff \(0.2\cdot\mathrm{Poiss}(x \mid 4) > 0.8\cdot\mathrm{Poiss}(x \mid 2)\)", with the Poisson formula written out on both sides.`,
      recipe: R`Cancel \(x!\) → collect the \(x\)-powers on one side, the numbers on the other → read the constant off the \(e^t\) table → find the smallest integer \(x\) that satisfies it → classify.`,
      trap: R`Left blank in Moed B. The \(e^t\) table under the question is a hint that the answer needs \(e^{\pm 2}\), \(e^{\pm 4}\). If the algebra stalls, computing both sides numerically for each \(x\) (as in the check above) also earns the points.` },

    { title: "10 · The smallest prior that flips the prediction (Poisson)",
      idea: R`<p><b>Where we are.</b> At \(x = 4\) MAP says R (note 9), because \(\pi_\mathrm{M} = 0.2\) is small. 2026-B Q4.4 asks: how large would \(\pi_\mathrm{M}\) have to be for \(x = 4\) to be called M?</p>
<p><b>The idea</b> is note 5 again: keep the prior as a letter, use \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\), write the MAP inequality with everything else plugged in, and solve for \(\pi_\mathrm{M}\).</p>
<h5>Step 1 — the inequality at \(x = 4\)</h5>
\[\pi_\mathrm{M}\,\mathrm{Poiss}(4 \mid 4) > (1 - \pi_\mathrm{M})\,\mathrm{Poiss}(4 \mid 2)\]
<h5>Step 2 — isolate the priors on one side</h5>
<p>Divide both sides by \((1 - \pi_\mathrm{M})\,\mathrm{Poiss}(4 \mid 4)\) (positive). Prior ratio on the left, likelihood ratio on the right.</p>
<h5>Step 3 — solve the resulting linear inequality for \(\pi_\mathrm{M}\)</h5>
<p>After step 2 the right side is just a number. Multiply both sides by \((1 - \pi_\mathrm{M})\) and by that number's denominator, collect the \(\pi_\mathrm{M}\) terms on one side (exactly like note 5, step 3), and divide. The value you get is the tie point; any \(\pi_\mathrm{M}\) above it gives M.</p>`,
      notation: [
        [R`\(\dfrac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}}\)`, R`the prior ratio ("odds") of M against R`],
      ],
      example: R`<p><b>2026-B Q4.4.</b></p>
<p>Write out both Poisson terms at \(x = 4\): \(\mathrm{Poiss}(4 \mid 4) = \dfrac{4^4 e^{-4}}{4!}\), \(\mathrm{Poiss}(4 \mid 2) = \dfrac{2^4 e^{-2}}{4!}\). Then:</p>
\[\pi_\mathrm{M}\cdot\frac{4^4 e^{-4}}{4!} > (1 - \pi_\mathrm{M})\cdot\frac{2^4 e^{-2}}{4!}\]
<p>Step 2: divide by \((1 - \pi_\mathrm{M})\cdot\frac{4^4 e^{-4}}{4!}\). The \(4!\) cancels:</p>
\[\frac{\pi_\mathrm{M}}{1 - \pi_\mathrm{M}} > \frac{2^4 e^{-2}}{4^4 e^{-4}} = \frac{16}{256}\cdot e^{-2 - (-4)} = \frac{1}{16}\,e^{2} = \frac{e^2}{16}\]
<p>Step 3: multiply both sides by \(16(1 - \pi_\mathrm{M})\) (positive):</p>
\[16\,\pi_\mathrm{M} > e^2 (1 - \pi_\mathrm{M}) = e^2 - e^2\pi_\mathrm{M}\]
\[16\,\pi_\mathrm{M} + e^2\pi_\mathrm{M} > e^2 \iff \pi_\mathrm{M}(16 + e^2) > e^2 \iff \pi_\mathrm{M} > \frac{e^2}{16 + e^2} = \frac{7.389}{16 + 7.389} = \frac{7.389}{23.389} \approx 0.316\]
<p><b>Answer:</b> the smallest prior is \(\pi_\mathrm{M} = \frac{e^2}{16 + e^2} \approx 0.316\) (above it, \(x = 4\) is called M; exactly at it, a tie).</p>
<p><b>Larger or smaller than \(\hat\pi_\mathrm{M} = 0.2\)?</b> Larger, and that fits note 9: with \(\hat\pi_\mathrm{M} = 0.2\) we got R for \(x = 4\), so the prior of M must go <b>up</b> to change that. Even though 4 packets is the typical malicious count, M has to be common enough before we call it.</p>`,
      cue: R`"Find the smallest value for the prior probability \(\pi_\mathrm{M}\) for which a user with \(x = 4\) packets would be classified as malicious (M) under the MAP rule … State whether this value is larger or smaller than \(\hat\pi_\mathrm{M}\)" (2026-B Q4.4).`,
      first: R`\(\pi_\mathrm{M}\cdot\dfrac{4^4 e^{-4}}{4!} > (1 - \pi_\mathrm{M})\cdot\dfrac{2^4 e^{-2}}{4!}\)`,
      recipe: R`Same inequality as note 9 at the given \(x\), priors as letters with \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\) → prior ratio > likelihood ratio → linear in \(\pi_\mathrm{M}\) → solve → compare with \(\hat\pi_\mathrm{M}\) and explain the direction.`,
      trap: R`Forgetting \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\) and keeping 0.8. Then there is nothing to solve. And the "explain why it makes sense" sentence is part of the 5 points.` },

    { title: "11 · The smallest cost ratio that flips the prediction",
      idea: R`<p><b>Why this variant exists.</b> Note 10 changed the prior to make \(x = 4\) "malicious". The other lever is <b>costs</b> (note 6): if missing a malicious user is much worse than a false alarm, we should call M sooner, even with the real prior 0.2.</p>
<h5>Step 1 — the notation</h5>
<p>2026-B writes costs as \(C_{y,y'}\) = cost of predicting \(y\) when the truth is \(y'\) (the same as \(\lambda_{y,y'}\) in note 6; renamed because \(\lambda\) is the Poisson rate here):</p>
<ul>
<li>\(C_{\mathrm{R},\mathrm{M}}\): say R, truth M, a <b>missed threat</b>.</li>
<li>\(C_{\mathrm{M},\mathrm{R}}\): say M, truth R, a <b>false alarm</b>.</li>
</ul>
<h5>Step 2 — the expected cost of each prediction (joint form, note 6 step 5)</h5>
<p>Predicting M is wrong only if the truth is R: cost \(C_{\mathrm{M},\mathrm{R}}\,\pi_\mathrm{R}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{R})\). Predicting R is wrong only if the truth is M: cost \(C_{\mathrm{R},\mathrm{M}}\,\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{M})\).</p>
<h5>Step 3 — predict M when that is the cheaper choice</h5>
\[C_{\mathrm{M},\mathrm{R}}\,\pi_\mathrm{R}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{R}) < C_{\mathrm{R},\mathrm{M}}\,\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{M})\]
<p>This is the MAP inequality of note 9 with each side multiplied by the cost of being wrong <b>against</b> that side. A cost acts exactly like an extra factor on the prior.</p>
<h5>Step 4 — solve for the ratio</h5>
<p>Divide both sides by \(C_{\mathrm{M},\mathrm{R}}\,\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{M})\):</p>
\[\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} > \frac{\pi_\mathrm{R}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{R})}{\pi_\mathrm{M}\,\mathrm{Poiss}(x \mid \lambda_\mathrm{M})}\]`,
      notation: [
        [R`\(C_{y,y'}\)`, R`cost of predicting \(y\) when the truth is \(y'\) (= \(\lambda_{y,y'}\) of the formula sheet)`],
        [R`\(C_{\mathrm{R},\mathrm{M}}\)`, R`missed threat: said "regular", was malicious`],
        [R`\(C_{\mathrm{M},\mathrm{R}}\)`, R`false alarm: said "malicious", was regular`],
      ],
      example: R`<p><b>2026-B Q4.5.</b> \(x = 4\), \(\hat\pi_\mathrm{R} = 0.8\), \(\hat\pi_\mathrm{M} = 0.2\), \(\hat\lambda_\mathrm{R} = 2\), \(\hat\lambda_\mathrm{M} = 4\).</p>
\[\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} > \frac{0.8 \cdot \frac{2^4 e^{-2}}{4!}}{0.2 \cdot \frac{4^4 e^{-4}}{4!}}\]
<p>Simplify piece by piece: \(\frac{0.8}{0.2} = 4\); the \(4!\) cancels; \(\frac{2^4}{4^4} = \frac{16}{256} = \frac{1}{16}\); \(\frac{e^{-2}}{e^{-4}} = e^{2}\). So</p>
\[\frac{C_{\mathrm{R},\mathrm{M}}}{C_{\mathrm{M},\mathrm{R}}} > 4 \cdot \frac{1}{16} \cdot e^2 = \frac{e^2}{4} = \frac{7.389}{4} \approx 1.847\]
<p><b>Answer:</b> the smallest ratio is \(\frac{e^2}{4} \approx 1.847\). A user with 4 packets is flagged as malicious only if a missed threat costs more than about 1.85 times a false alarm.</p>
<p><b>Link with note 10:</b> the right-hand side, \(\frac{\pi_\mathrm{R}}{\pi_\mathrm{M}}\cdot\frac{e^2}{16}\), is the prior ratio times the same likelihood ratio \(\frac{e^2}{16}\) that appeared there. Changing costs and changing priors move the same balance.</p>`,
      cue: R`"Find the smallest ratio \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) for which a user with \(x = 4\) packets would be classified as malicious (M) by a Bayesian classifier that minimizes the expected cost" (2026-B Q4.5).`,
      first: R`"Predict M iff \(C_{\mathrm{M},\mathrm{R}}\cdot 0.8\cdot\mathrm{Poiss}(4 \mid 2) < C_{\mathrm{R},\mathrm{M}}\cdot 0.2\cdot\mathrm{Poiss}(4 \mid 4)\)"`,
      recipe: R`Each prediction's cost = (cost of being wrong) × (joint of the <b>other</b> class) → "M is cheaper" inequality → divide to get the cost ratio alone on one side → simplify with the \(e^t\) table.`,
      trap: R`Putting each cost next to its <b>own</b> class. \(C_{\mathrm{R},\mathrm{M}}\) (the missed threat) multiplies M's joint, because it is paid when the truth is M.` },

    { title: "12 · Generalization risk (bonus): the probability of a wrong prediction",
      idea: R`<p><b>Where we are.</b> Note 9 gave the classifier: say M when \(x \ge 5\), say R when \(x \le 4\). Now: if new users come from the fitted model, how often will it be wrong? That probability is the <b>generalization risk</b> (with all costs equal to 1, the expected cost is just the probability of a mistake).</p>
<h5>Step 1 — list the ways to be wrong</h5>
<p>A new user is misclassified when either</p>
<ul>
<li>it is truly R (probability \(\pi_\mathrm{R}\)) but sends \(x \ge 5\) packets, so we say M; or</li>
<li>it is truly M (probability \(\pi_\mathrm{M}\)) but sends \(x \le 4\) packets, so we say R.</li>
</ul>
<h5>Step 2 — each way = prior × probability of that range of \(x\) under that class</h5>
<p>This is the product rule of note 0 again (fraction of the class × fraction of the class in that range):</p>
\[R = \pi_\mathrm{R}\,\Pr[X \ge 5 \mid \lambda_\mathrm{R}] + \pi_\mathrm{M}\,\Pr[X \le 4 \mid \lambda_\mathrm{M}]\]
<h5>Step 3 — "at most 4" is a finite sum; "at least 5" is 1 minus it</h5>
<p>\(\Pr[X \le 4]\) is the sum of the Poisson probabilities for \(k = 0, 1, 2, 3, 4\). Every term has \(e^{-\lambda}\), so factor it out:</p>
\[\Pr[X \le 4 \mid \lambda] = \sum_{k=0}^{4}\frac{\lambda^k e^{-\lambda}}{k!} = e^{-\lambda}\left(1 + \lambda + \frac{\lambda^2}{2} + \frac{\lambda^3}{6} + \frac{\lambda^4}{24}\right)\]
<p>(\(0! = 1\), \(1! = 1\), \(2! = 2\), \(3! = 6\), \(4! = 24\).) \(\Pr[X \ge 5]\) would be an infinite sum, so use the complement: \(\Pr[X \ge 5] = 1 - \Pr[X \le 4]\).</p>`,
      notation: [
        [R`generalization risk \(R\)`, R`probability that the classifier is wrong on a new sample drawn from the (fitted) model. Careful: this \(R\) (in italics, standing alone) is the risk; the upright \(\mathrm{R}\) in \(\pi_\mathrm{R}\), \(\lambda_\mathrm{R}\) is the class "regular".`],
        [R`\(\Pr[X \le 4 \mid \lambda]\)`, R`probability of at most 4 packets under a Poisson with rate \(\lambda\) (the CDF at 4)`],
        [R`complement`, R`\(\Pr[X \ge 5] = 1 - \Pr[X \le 4]\): the two events cover everything and don't overlap`],
      ],
      example: R`<p><b>2026-B Q4.6 (bonus).</b> \(\pi_\mathrm{R} = 0.8\), \(\lambda_\mathrm{R} = 2\); \(\pi_\mathrm{M} = 0.2\), \(\lambda_\mathrm{M} = 4\).</p>
<p><b>R users (\(\lambda = 2\)):</b></p>
\[\Pr[X \le 4 \mid 2] = e^{-2}\left(1 + 2 + \frac{2^2}{2} + \frac{2^3}{6} + \frac{2^4}{24}\right) = e^{-2}\left(1 + 2 + \frac{4}{2} + \frac{8}{6} + \frac{16}{24}\right) = e^{-2}\left(1 + 2 + 2 + \tfrac43 + \tfrac23\right)\]
<p>Add: \(1 + 2 + 2 = 5\) and \(\tfrac43 + \tfrac23 = \tfrac63 = 2\), so the bracket is \(5 + 2 = 7\):</p>
\[\Pr[X \le 4 \mid 2] = 7e^{-2} = 7 \times 0.1353 = 0.9471\]
\[\Pr[X \ge 5 \mid 2] = 1 - 7e^{-2} = 1 - 0.9471 = 0.0529\]
<p><b>M users (\(\lambda = 4\)):</b></p>
\[\Pr[X \le 4 \mid 4] = e^{-4}\left(1 + 4 + \frac{4^2}{2} + \frac{4^3}{6} + \frac{4^4}{24}\right) = e^{-4}\left(1 + 4 + \frac{16}{2} + \frac{64}{6} + \frac{256}{24}\right) = e^{-4}\left(1 + 4 + 8 + 10\tfrac23 + 10\tfrac23\right)\]
<p>Add: \(1 + 4 + 8 = 13\) and \(10\tfrac23 + 10\tfrac23 = 21\tfrac13\), so the bracket is \(13 + 21\tfrac13 = 34\tfrac13 = \tfrac{103}{3}\):</p>
\[\Pr[X \le 4 \mid 4] = \frac{103}{3}e^{-4} = 34.333 \times 0.0183 = 0.6283\]
<p><b>Combine:</b></p>
\[R = 0.8 \times 0.0529 + 0.2 \times 0.6283 = 0.0423 + 0.1257 = 0.168\]
<p>In exact form (the official answer): \(R = \frac45(1 - 7e^{-2}) + \frac15\cdot\frac{103}{3}e^{-4} = \frac45 - \frac{28}{5}e^{-2} + \frac{103}{15}e^{-4} \approx 0.168\).</p>
<p><b>What it tells you:</b> most of the error comes from malicious users with few packets (0.126 of the 0.168). The classifier misses about 63% of the malicious users, but they are only 20% of all users.</p>`,
      cue: R`"Assume that future data are drawn from the Poisson model you fitted … Compute the generalization risk of this classifier, i.e. the probability of a faulty classification under the fitted model" (2026-B Q4.6, bonus).`,
      first: R`"Wrong iff [\(y = \mathrm{R}\) and \(x \ge 5\)] or [\(y = \mathrm{M}\) and \(x \le 4\)]", then \(R = \pi_\mathrm{R}\Pr[X \ge 5 \mid 2] + \pi_\mathrm{M}\Pr[X \le 4 \mid 4]\).`,
      recipe: R`Decision rule from note 9 → the two error events → prior × Poisson probability of the wrong range → use \(1 - \Pr[X \le 4]\) for the upper tail → \(e^t\) table.`,
      trap: R`Adding the two range probabilities without the priors, or trying to sum \(\Pr[X \ge 5]\) term by term (it never ends).` },
  ],
    hints: {
      "2025A-q5": {
        1: R`Count first: \(n_\mathrm{A} = 8\) (samples 1–8), \(n_\mathrm{B} = 12\) (samples 9–20), so \(\pi_j = n_j/20\). Each class-conditional is a count among that class's rows only, divided by 8 or 12, not 20 (note 1).`,
        2: R`For each test sample and each class write the joint \(\pi_j \cdot p(X_1 = x_1 \mid j)\cdot p(X_2 = x_2 \mid j)\). Add the two joints to get \(p(x)\), divide each joint by it; the larger posterior is the MAP class (note 2).`,
        3: R`Both test samples came out B, so you need a flower that looks "very A". In your part-1 table, for each feature pick the value where A's probability is largest compared with B's; compute both joints for that combination and check that A's is bigger (note 2).`,
        4: R`Keep \(\pi_\mathrm{A}\) as a letter with \(\pi_\mathrm{B} = 1 - \pi_\mathrm{A}\), and for each sample write "\(\pi_\mathrm{A}\,p(x_1 \mid \mathrm{A})p(x_2 \mid \mathrm{A}) < (1 - \pi_\mathrm{A})\,p(x_1 \mid \mathrm{B})p(x_2 \mid \mathrm{B})\)". Solve each for \(\pi_\mathrm{A}\) and keep the stricter bound (note 5).`,
        5: R`\(\lambda_\mathrm{BA}\) = cost of <b>saying</b> B when the <b>truth</b> is A. For each sample: cost of predicting A \(= \lambda_\mathrm{AB}\,p(\mathrm{B} \mid x)\), cost of predicting B \(= \lambda_\mathrm{BA}\,p(\mathrm{A} \mid x)\), with the posteriors from part 2; pick the smaller (note 6). The official solution's "\(\frac47 \approx 0.429\)" is a slip: \(\frac47 \approx 0.571\); the answer (A for sample 22) is unchanged.`,
      },
      "2025C-q4": {
        1: R`The last column is a count of fish, not a row. Add the four counts of each species, divide by the total 100 (note 1).`,
        2: R`Full Bayes: \(p(X_1 = \text{yes}, X_2 = \text{no} \mid j)\) = (that exact row's count for species \(j\)) ÷ \(n_j\). Multiply by \(\pi_j\) for three joints, add them for \(p(x)\), divide (note 3). The official solution prints "\(0.9/0.4\)" for C; it means \(0.09/0.4 = 0.225\).`,
        3: R`Naive Bayes: \(p(X_1 = \text{yes} \mid j)\) adds the two "upper fin = yes" rows of species \(j\), and \(p(X_2 = \text{no} \mid j)\) adds the two "lower fin = no" rows. Multiply them, then continue exactly like part 2 (note 3). C's posterior \(0.075/0.385 = 0.1948\) rounds to 0.195 (the official 0.194 is truncated).`,
        4: R`No new computation: read off the largest posterior in part 2 and in part 3 and compare the two species (note 3).`,
        5: R`Equal priors are the same factor for every species, so drop them and compare only the class-conditionals \(p(x \mid y = j)\) you already have from parts 2 and 3 (note 4). ("0625" in the official solution means 0.625.)`,
        6: R`Rows of \(\lambda\) = what you predict, columns = the truth. Multiply \(\lambda\) by the full-Bayes posterior column \((0.4, 0.375, 0.225)\) and pick the <b>smallest</b> entry (note 6).`,
      },
      "2026B-q4": {
        1: R`Write a general dataset \(x_1, \ldots, x_n\) and <b>one</b> general \(\lambda\), not the table's numbers: \(\ell(\lambda; D) = \sum_i \log\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}\). Split each log into \(x_i\log\lambda - \lambda - \log(x_i!)\), then differentiate in \(\lambda\) and set to 0 (note 7).`,
        2: R`Split the ten users by class (8 R, 2 M) and plug each group into \(\hat\lambda\) = average of its counts; priors = group size ÷ 10 (note 8). The official solution labels the second prior \(\hat\pi_\mathrm{R}\); it is \(\hat\pi_\mathrm{M} = 0.2\).`,
        3: R`Write "predict M iff \(0.2\cdot\frac{4^x e^{-4}}{x!} > 0.8\cdot\frac{2^x e^{-2}}{x!}\)", cancel \(x!\), and gather everything with \(x\) in the exponent on one side and the plain numbers (via the \(e^t\) table) on the other. Then test \(x = 2, 4, 7\) (note 9).`,
        4: R`Same inequality as part 3 at \(x = 4\), but keep \(\pi_\mathrm{M}\) as a letter and use \(\pi_\mathrm{R} = 1 - \pi_\mathrm{M}\); solve for \(\pi_\mathrm{M}\) and compare with 0.2 (note 10).`,
        5: R`Predicting M costs \(C_{\mathrm{M},\mathrm{R}}\cdot 0.8\cdot\mathrm{Poiss}(4 \mid 2)\); predicting R costs \(C_{\mathrm{R},\mathrm{M}}\cdot 0.2\cdot\mathrm{Poiss}(4 \mid 4)\). Write "M is cheaper" and divide to get \(C_{\mathrm{R},\mathrm{M}}/C_{\mathrm{M},\mathrm{R}}\) alone (note 11).`,
        6: R`From part 3 the classifier says M iff \(x \ge 5\). Error \(= \pi_\mathrm{R}\Pr[X \ge 5 \mid \lambda = 2] + \pi_\mathrm{M}\Pr[X \le 4 \mid \lambda = 4]\); get \(\Pr[X \ge 5]\) as \(1 - \Pr[X \le 4]\) (note 12).`,
      },
    },
  };
})();
