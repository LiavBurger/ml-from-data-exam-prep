// Recipe cards for topic "linclass". Standard: spec/CARDS.md. Built from data/notes/linclass.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["linclass"] = {
    intro: R`<p>The linear classification question (2025-A Q4, 2025-B Q3, 2026-B Q3 — your Moed B). Open a question and go part by part: each part shows the recipe card(s) it needs, right above it. Read the card (1–3 min), do the part on paper, then check. Order: 2025-A Q4 first (guided), then 2025-B Q3, then 2026-B Q3.</p>`,
    cards: {
      // ───────────────────────────────────────────── 2025-A Q4.1
      "perceptron-pass": {
        title: "One Perceptron pass by hand",
        minutes: 3,
        cue: R`"Execute one iteration of the Perceptron algorithm … Describe the updates to \(w\)." The update rule is printed.`,
        lines: [
          R`Put a 1 in front of every sample: \(x^{(i)} = (1, x_1, x_2, x_3)\).`,
          R`Score with the <b>current</b> \(w\): \(w^\top x^{(i)}\). Then \(\hat y = \mathrm{sign}(w^\top x^{(i)})\).`,
          R`If \(\hat y = y\): write "no update".`,
          R`If \(\hat y \ne y\): \(\Delta w = -\eta(\hat y - y)\,x^{(i)} = \pm 2\eta\,x^{(i)}\) (plus if the truth is \(+1\), minus if \(-1\)). New \(w = w + \Delta w\).`,
          R`Carry the newest \(w\) to the next sample.`,
        ],
        numbers: R`<p>2025-A Q4.1: start \(w = (-1, 0, 0, 0)\), \(\eta = 0.1\).</p>
<ul>
<li>\(x^{(1)} = (1,1,1,0)\), \(y = 1\): score \(-1\) → \(\hat y = -1\), wrong. \(\Delta w = -0.1\cdot(-2)\cdot x^{(1)} = (0.2, 0.2, 0.2, 0)\) → \(w = (-0.8, 0.2, 0.2, 0)\).</li>
<li>\(x^{(2)} = (1,-1,0,2)\), \(y = -1\): score \(-0.8 - 0.2 = -1\) → right.</li>
<li>\(x^{(3)} = (1,2,1,1)\), \(y = 1\): score \(-0.8 + 0.4 + 0.2 = -0.2\) → wrong. \(\Delta w = 0.2\cdot(1,2,1,1)\) → \(w = (-0.6, 0.6, 0.4, 0.2)\).</li>
<li>\(x^{(4)} = (1,0,-1,1)\), \(y = -1\): score \(-0.6 - 0.4 + 0.2 = -0.8\) → right.</li>
</ul>`,
        trap: R`Scoring all four samples with the <b>starting</b> \(w\). \(w\) changes during the pass.`,
        why: [
          [R`Why line 4? Where \(\pm 2\eta\,x\) comes from`, R`<p>\(\hat y - y\) has only three possible values. Right answer: \(0\), so \(\Delta w = 0\). Said "−", truth "+": \(-1 - 1 = -2\), so \(\Delta w = -\eta\cdot(-2)\cdot x = +2\eta\,x\) (add a bit of the sample). Said "+", truth "−": \(1 - (-1) = +2\), so \(\Delta w = -2\eta\,x\) (subtract a bit of the sample).</p>`],
          [R`Why does the nudge help?`, R`<p>Take "truth +, said −". The new score of the same sample is \((w + 2\eta x)^\top x = w^\top x + 2\eta\,x^\top x\). \(x^\top x\) is the sum of the sample's squared entries, which is positive (the bias entry alone gives \(1^2 = 1\)). So the score went <b>up</b>, toward the "+" it should have. The other case pushes it down. One nudge may not be enough to fix the sample; it only moves the right way.</p>`],
          [R`Why line 5? One iteration = one pass`, R`<p>"One iteration" means one trip through the samples in the given order. \(w\) is updated on the spot, so each sample is judged with the \(w\) that exists at that moment, including every update before it. The algorithm repeats passes until a whole pass makes no mistake.</p>`],
        ],
        side: R`<ul>
<li><b>Official solution slips.</b> The numbers and updates are right, but three labels in its text are wrong: at sample 2 it writes \(\mathrm{sign}(w^\top x^{(3)})\) for \(x^{(2)}\); at sample 3 it writes "\(-1 = 1 = y^{(4)}\)" for "\(-1 \ne 1 = y^{(3)}\)"; at sample 4 it writes "\(-1 \ne 1 = y^{(1)}\)" for "\(-1 = -1 = y^{(4)}\)".</li>
<li><b>Lecture notation.</b> \(z_i = \mathrm{sign}(w^\top x^{(i)}) - y_i \in \{-2, 0, 2\}\) and \(w \leftarrow w - \eta\,z_i\,x^{(i)}\). Same rule. It looks like a gradient step but it is not gradient descent: \(z_i\) is a mistake indicator, not a derivative.</li>
<li><b>When it stops.</b> If some line separates the classes perfectly, the Perceptron stops after finitely many passes. If not, it never stops on its own.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-A Q4.2
      "predict-all": {
        title: "Predictions with the final \\(w\\)",
        minutes: 1,
        cue: R`"What is the predicted label of each training sample <i>after</i> the Perceptron iteration you computed?" (2025-A Q4.2)`,
        lines: [
          R`Write the <b>final</b> \(w\) from the previous part.`,
          R`One score per sample, with the 1 in front: \(w^\top x^{(i)}\) (all of them together are \(Xw\)).`,
          R`Signs → predictions. Compare with the true labels.`,
        ],
        numbers: R`<p>2025-A, final \(w = (-0.6, 0.6, 0.4, 0.2)\):</p>
<ul>
<li>\(x^{(1)} = (1,1,1,0)\): \(-0.6 + 0.6 + 0.4 + 0 = 0.4\) → \(+1\)</li>
<li>\(x^{(2)} = (1,-1,0,2)\): \(-0.6 - 0.6 + 0 + 0.4 = -0.8\) → \(-1\)</li>
<li>\(x^{(3)} = (1,2,1,1)\): \(-0.6 + 1.2 + 0.4 + 0.2 = 1.2\) → \(+1\)</li>
<li>\(x^{(4)} = (1,0,-1,1)\): \(-0.6 + 0 - 0.4 + 0.2 = -0.8\) → \(-1\)</li>
</ul>
<p>Predictions \((1,-1,1,-1)\) = labels \((1,-1,1,-1)\): all four right.</p>`,
        trap: R`Copying the signs from during the pass. They used older weights: sample 1 had score \(-1\) then, \(+0.4\) now.`,
        why: [
          [R`Why can the answer differ from the pass?`, R`<p>During the pass, each sample was judged by whatever \(w\) existed at that moment. The final \(w\) has absorbed later updates (here the one at sample 3), so it can judge an earlier sample differently. Sample 1 was wrong during the pass and is right now.</p>`],
          [R`What "all four right" tells you`, R`<p>If the final \(w\) gets every training sample right, its line separates the two classes perfectly: the set is linearly separable, and a second pass would make no updates.</p>`],
        ],
      },

      // ───────────────────────────────────────────── 2025-A Q4.3
      "labels-01": {
        title: "Labels for logistic regression: 0 and 1",
        minutes: 1,
        cue: R`"Before training the logistic regression classifier on the dataset above, which transformation should be applied to the target variable \(y\)?" (2025-A Q4.3)`,
        lines: [
          R`LoR outputs \(\hat y = \sigma(w^\top x)\) = the probability that \(y = 1\).`,
          R`Its loss (BCE) uses \(y\) and \(1 - y\) as on/off switches → the labels must be \(0/1\).`,
          R`Which class is 1 is your choice: the model then gives the probability of that class.`,
        ],
        numbers: R`<p>2025-A Q4.3: (b) blue/red → 1/0 and (c) blue/red → 0/1 are both fine → answer <b>(d)</b>. (a) \(-1/1\) is the Perceptron's coding.</p>`,
        why: [
          [R`Why line 2? The switches in the BCE`, R`<p>One sample's loss is \(-[\,y\log\hat y + (1 - y)\log(1 - \hat y)\,]\). With \(y = 1\): the second term is multiplied by \(1 - 1 = 0\), leaving \(-\log\hat y\). With \(y = 0\): the first term is multiplied by 0, leaving \(-\log(1 - \hat y)\). So only one term is "on" at a time. With \(y = -1\), \(1 - y = 2\) and the first term gets weight \(-1\): the loss no longer means anything.</p>`],
        ],
        side: R`<p>The Perceptron uses \(\pm1\) because it compares \(y\) directly with \(\mathrm{sign}(w^\top x)\), which is \(\pm1\).</p>`,
      },

      // ───────────────────────────────────────────── 2025-B Q3.1, 2026-B Q3.1
      "prob-sign": {
        title: "Classify with LoR or probit: the sign of the score",
        minutes: 2,
        cue: R`"Use this classifier to classify each of the two samples as positive or negative. Briefly explain" (2026-B Q3.1, probit); "Determine the predicted label for each of the six test samples" from a column of \(w^\top x^{(i)}\) (2025-B Q3.1, LoR).`,
        lines: [
          R`Score with the 1 in front: \(t = w^\top x = w_0 + w_1x_1 + w_2x_2\) (skip if the table gives it).`,
          R`Write: "\(\Phi\) (or \(\sigma\)) is increasing and \(\Phi(0) = \tfrac12\), so \(\Phi(t) \ge \tfrac12 \iff t \ge 0\)."`,
          R`Score \(\ge 0\) → positive (1). Score \(< 0\) → negative (0).`,
        ],
        numbers: R`<p>2026-B Q3.1, \(w = (1, -1, 2)\):</p>
<ul>
<li>sample \((2, 0)\): \(t = 1\cdot1 + (-1)\cdot2 + 2\cdot0 = 1 - 2 + 0 = -1 < 0\) → <b>negative</b></li>
<li>sample \((0, 1)\): \(t = 1\cdot1 + (-1)\cdot0 + 2\cdot1 = 1 + 0 + 2 = 3 > 0\) → <b>positive</b></li>
</ul>
<p>2025-B Q3.1: scores 1.4, 0.8, 0.4 → 1 (samples 1, 3, 5); −0.8, −1.6, −0.4 → 0 (samples 2, 4, 6).</p>`,
        trap: R`Moed B: you had \(-1\) and \(3\), then tried to integrate \(\Phi(-1)\) and crossed it out: 0/4. Never compute \(\Phi\). And never compare the <b>scores</b> with ½ (0 points in 2025-B).`,
        why: [
          [R`Why line 2? \(\sigma(0) = \tfrac12\) and increasing`, R`<p>\(\sigma(t) = \dfrac{1}{1 + e^{-t}}\) squashes any score into \((0, 1)\). At \(t = 0\): \(e^0 = 1\), so \(\sigma(0) = \frac{1}{1+1} = \frac12\). As \(t\) grows, \(e^{-t}\) shrinks, so \(\sigma\) grows. The rule "positive iff \(\sigma(t) \ge \tfrac12\)" is then \(\sigma(t) \ge \sigma(0)\), which for an increasing function is \(t \ge 0\).</p>`],
          [R`Why line 2 for probit? What \(\Phi\) is`, R`<p>\(\varphi(t) = \frac{1}{\sqrt{2\pi}}e^{-t^2/2}\) is the bell curve. \(\Phi(t)\) is the <b>area under the bell to the left of \(t\)</b>. Moving \(t\) right adds area, so \(\Phi\) is increasing. The bell is symmetric around 0, so half the area is left of 0: \(\Phi(0) = \tfrac12\). Probit is LoR with \(\Phi\) in place of \(\sigma\); the sign argument is word for word the same.</p>`],
        ],
        side: R`<ul>
<li><b>The values, only to see them:</b> \(\Phi(-1) \approx 0.159\), \(\Phi(3) \approx 0.9987\) (from a normal table). With \(\sigma\): \(\sigma(-1) \approx 0.269\), \(\sigma(3) \approx 0.953\). Different numbers, same decisions.</li>
<li><b>The sign rule needs \(g(0) = \tfrac12\).</b> Your HW3's CLL, \(\gamma(t) = 1 - e^{-e^t}\), has \(\gamma(0) = 1 - e^{-1} \approx 0.632\); its cut-off is \(t = \ln\ln 2 \approx -0.367\).</li>
<li><b>2025-B official slip:</b> it writes "samples 2,4,6-8 are 0". Samples 7–8 only arrive in part 3; here it is 2, 4, 6.</li>
<li><b>Picture:</b> the points with score 0 form a line (the decision boundary); \((w_1, w_2)\) points to the "+" side.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-A Q4.4
      "roc": {
        title: "The ROC curve: TPR and FPR at each threshold",
        minutes: 3,
        cue: R`"Draw the ROC curve … plotting 10 points … associated with the thresholds 0.1, 0.2, …, 1. Describe all the required computations" (2025-A Q4.4).`,
        lines: [
          R`Positive class = red. Rule: predicted positive iff \(p \ge \tau\).`,
          R`List the reds' \(p\) and the blues' \(p\) separately, sorted.`,
          R`Per \(\tau\): TP = # reds with \(p \ge \tau\), FP = # blues with \(p \ge \tau\).`,
          R`\(\text{TPR} = \text{TP}/\#\text{reds}\), \(\text{FPR} = \text{FP}/\#\text{blues}\). One table row per \(\tau\).`,
          R`Plot (FPR, TPR), FPR on the x-axis; join the points.`,
        ],
        numbers: R`<p>2025-A: reds 0.4, 0.45, 0.55, 0.75, 0.9; blues 0.15, 0.25, 0.35, 0.65, 0.85. At \(\tau = 0.5\):</p>
<ul>
<li>reds \(\ge 0.5\): 0.55, 0.75, 0.9 → TP = 3 → TPR = 3/5 = 0.6</li>
<li>blues \(\ge 0.5\): 0.65, 0.85 → FP = 2 → FPR = 2/5 = 0.4</li>
</ul>
<p>Point (0.4, 0.6).</p>`,
        trap: R`TPR divides by the # of <b>reds</b> (5), FPR by the # of <b>blues</b> (5), never by all 10.`,
        why: [
          [R`Why these denominators?`, R`<p>Every real positive is either caught (TP) or missed (FN), so \(\text{TP}+\text{FN}\) = number of real positives: TPR = fraction of positives caught. Every real negative is either flagged (FP) or left out (TN), so \(\text{FP}+\text{TN}\) = number of real negatives: FPR = fraction of negatives wrongly flagged. Both totals are fixed by the data; only TP and FP change with \(\tau\).</p>`],
          [R`All ten rows and the curve (check your table)`, R`<div class="tw"><table><thead><tr><th>\(\tau\)</th><th>TP</th><th>FP</th><th>TN</th><th>FN</th><th>TPR</th><th>FPR</th></tr></thead><tbody>
<tr><td>0.1</td><td>5</td><td>5</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>0.2</td><td>5</td><td>4</td><td>1</td><td>0</td><td>1</td><td>0.8</td></tr>
<tr><td>0.3</td><td>5</td><td>3</td><td>2</td><td>0</td><td>1</td><td>0.6</td></tr>
<tr><td>0.4</td><td>5</td><td>2</td><td>3</td><td>0</td><td>1</td><td>0.4</td></tr>
<tr><td>0.5</td><td>3</td><td>2</td><td>3</td><td>2</td><td>0.6</td><td>0.4</td></tr>
<tr><td>0.6</td><td>2</td><td>2</td><td>3</td><td>3</td><td>0.4</td><td>0.4</td></tr>
<tr><td>0.7</td><td>2</td><td>1</td><td>4</td><td>3</td><td>0.4</td><td>0.2</td></tr>
<tr><td>0.8</td><td>1</td><td>1</td><td>4</td><td>4</td><td>0.2</td><td>0.2</td></tr>
<tr><td>0.9</td><td>1</td><td>0</td><td>5</td><td>4</td><td>0.2</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>5</td><td>5</td><td>0</td><td>0</td></tr></tbody></table></div>
<div><svg viewBox="0 0 240 230" width="260" style="max-width:100%;height:auto" role="img" aria-label="ROC curve of 2025-A Q4.4">
<g fill="none" style="stroke:var(--line)" stroke-width="1"><line x1="76" y1="190" x2="76" y2="10"/><line x1="112" y1="190" x2="112" y2="10"/><line x1="148" y1="190" x2="148" y2="10"/><line x1="184" y1="190" x2="184" y2="10"/><line x1="220" y1="190" x2="220" y2="10"/><line x1="40" y1="154" x2="220" y2="154"/><line x1="40" y1="118" x2="220" y2="118"/><line x1="40" y1="82" x2="220" y2="82"/><line x1="40" y1="46" x2="220" y2="46"/><line x1="40" y1="10" x2="220" y2="10"/></g>
<g fill="none" style="stroke:var(--muted)" stroke-width="1"><line x1="40" y1="190" x2="220" y2="190"/><line x1="40" y1="190" x2="40" y2="10"/><line x1="40" y1="190" x2="220" y2="10" stroke-dasharray="4 4"/></g>
<polyline fill="none" style="stroke:var(--accent)" stroke-width="2.5" points="220,10 184,10 148,10 112,10 112,82 112,118 76,118 76,154 40,154 40,190"/>
<g style="fill:var(--accent)"><circle cx="220" cy="10" r="3.5"/><circle cx="184" cy="10" r="3.5"/><circle cx="148" cy="10" r="3.5"/><circle cx="112" cy="10" r="3.5"/><circle cx="112" cy="82" r="3.5"/><circle cx="112" cy="118" r="3.5"/><circle cx="76" cy="118" r="3.5"/><circle cx="76" cy="154" r="3.5"/><circle cx="40" cy="154" r="3.5"/><circle cx="40" cy="190" r="3.5"/></g>
<g fill="currentColor" font-size="11"><text x="130" y="222" text-anchor="middle">FPR</text><text x="12" y="100" text-anchor="middle" transform="rotate(-90 12 100)">TPR</text><text x="36" y="203" text-anchor="end">0</text><text x="112" y="203" text-anchor="middle">0.4</text><text x="220" y="203" text-anchor="middle">1</text><text x="34" y="122" text-anchor="end">0.4</text><text x="34" y="14" text-anchor="end">1</text><text x="116" y="78">τ=0.5</text></g>
</svg></div>
<p>Grid lines every 0.2. The dashed diagonal is random guessing; this curve stays above it.</p>`],
        ],
        side: R`<ul>
<li><b>Official table slips</b> (counts and rates are right): its "predicted positive" column leaves out \(x^{(2)}\) at 0.2, \(x^{(3)}\) at 0.3, \(x^{(6)}\) at 0.4, and at 0.8 lists \(x^{(8)}, x^{(10)}\) instead of \(x^{(5)}, x^{(10)}\).</li>
<li><b>"&gt;" instead of "≥"</b> is also accepted. Then \(x^{(9)}\) (exactly 0.4) drops out at \(\tau = 0.4\) (TPR 0.8), and \(x^{(10)}\) (exactly 0.9) at \(\tau = 0.9\) (TPR 0).</li>
<li><b>Why thresholds at all:</b> missing a sick patient can be worse than a false alarm. Lower \(\tau\) catches more positives but raises more false alarms. A tiny \(\tau\) gives (1, 1); a huge one gives (0, 0). A good curve bulges toward (0, 1).</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-B Q3.2, Q3.4
      "separable-verdict": {
        title: "Separable, inseparable, or insufficient information?",
        minutes: 2,
        cue: R`"Is this test set linearly separable? Necessarily separable | Necessarily inseparable | Insufficient information" (2025-B Q3.2, Q3.4).`,
        lines: [
          R`Split the scores: positives (label 1) and negatives (label 0).`,
          R`All positives \(> 0 >\) all negatives → <b>necessarily separable</b> (the given \(w\) separates).`,
          R`Else, lowest positive \(>\) highest negative → still <b>necessarily separable</b>: shift \(w_0\) by a \(c\) in the gap.`,
          R`Else no shift works; you only know this \(w\)'s scores, not the features → <b>insufficient information</b>.`,
          R`"Necessarily inseparable" only if you can see that <b>no</b> line works (e.g. a figure).`,
        ],
        numbers: R`<p>2025-B. <b>Part 2</b> (samples 1–6): positives 1.4, 0.8, 0.4, all \(> 0\); negatives −0.8, −1.6, −0.4, all \(< 0\) → necessarily separable.</p>
<p><b>Part 4</b> (adds sample 9, label 0, score 0.5): \(0.5 >\) lowest positive 0.4 (sample 5) → no shift works → insufficient information.</p>`,
        trap: R`"Inseparable" is a claim about <b>every</b> line; one failing classifier never proves it (partial credit only).`,
        why: [
          [R`What "linearly separable" means`, R`<p>There exists <b>some</b> \(w\) with \(\mathrm{sign}(w^\top x^{(i)})\) equal to every sample's label. Not necessarily the \(w\) in the question: any \(w\) at all. So to say "separable" you point to one \(w\); to say "inseparable" you must rule out every \(w\).</p>`],
          [R`Why line 4 is "insufficient", not "inseparable"`, R`<p>Shifting \(w_0\) only moves the line parallel to itself. In part 4, any \(c\) that keeps sample 5 positive (\(c < 0.4\)) also keeps sample 9 positive (\(0.5 > c\)), so no parallel line works. But a line pointing in a <b>different direction</b> might, and we can't test that: we only know this one classifier's scores, not the samples' features.</p>`],
        ],
        side: R`<ul>
<li>The Perceptron is guaranteed to stop on separable data. LoR behaves oddly there: scaling a separating \(w\) up keeps the same line but keeps lowering the loss, so plain gradient descent never settles.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-B Q3.3
      "bias-shift": {
        title: "TPR = 1 and FPR = 0: shift the bias",
        minutes: 2,
        cue: R`"Is there a linear classifier that achieves TPR = 1 and FPR = 0 on the extended test set? Explain" (2025-B Q3.3).`,
        lines: [
          R`TPR = 1 and FPR = 0 means zero mistakes.`,
          R`Find the lowest positive score and the highest negative score.`,
          R`If lowest positive \(>\) highest negative: pick \(c\) between them. New bias \(w_0' = w_0 - c\), so every score becomes \(t_i - c\).`,
          R`Name the new classifier; show TPR = 1, FPR = 0.`,
        ],
        numbers: R`<p>2025-B Q3.3 (samples 1–8). Positives 1.4, 0.8, 0.4, 1.1 → lowest <b>0.4</b>. Negatives −0.8, −1.6, −0.4, 0.2 → highest <b>0.2</b>. Gap, so take \(c = 0.3\):</p>
<ul>
<li>positives: 1.1, 0.5, 0.1, 0.8, all \(> 0\) → TP = 4, FN = 0 → TPR = 1</li>
<li>negatives: −1.1, −1.9, −0.7, −0.1, all \(< 0\) → FP = 0, TN = 4 → FPR = 0</li>
</ul>
<p>So yes: \(w' = (w_0 - 0.3, w_1, \dots, w_p)\).</p>`,
        trap: R`A bare "yes" is incomplete: name the new classifier.`,
        why: [
          [R`Why line 3? Changing \(w_0\) shifts every score equally`, R`<p>\(w_0\) is multiplied by the bias feature 1 in every sample: \(t_i = w_0\cdot1 + w_1x^{(i)}_1 + \dots\). Replace \(w_0\) by \(w_0 - c\) and each score becomes \(t_i - c\). All scores move down by the same \(c\), and the line moves parallel to itself. We need a \(c\) with every positive above it and every negative below it, which exists exactly when lowest positive \(>\) highest negative.</p>`],
          [R`Why not just the given \(w\)?`, R`<p>With the given \(w\), sample 8 (a negative) has score \(0.2 > 0\): a false positive, so FPR = 1/4. The shift fixes that without breaking any positive.</p>`],
        ],
        side: R`<ul>
<li>A shift of the bias is the same as a threshold: "predict 1 iff \(w^\top x \ge 0.3\)" with the original \(w\) is the same classifier.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-B Q3.5
      "mapping-phi": {
        title: "A mapping \\(\\varphi\\) for round data",
        minutes: 2,
        cue: R`"Propose a mapping function \(\varphi(x_1, x_2)\) that would make this dataset linearly separable in the transformed feature space. Write an explicit expression" (2025-B Q3.5).`,
        lines: [
          R`Name the shape: negatives in a disc around the origin, positives on a ring around it.`,
          R`Rule: positive \(\iff x_1^2 + x_2^2 > r^2 \iff -r^2\cdot1 + 1\cdot(x_1^2 + x_2^2) > 0\).`,
          R`Read off: \(\varphi(x_1, x_2) = (1,\ x_1^2 + x_2^2)\) and \(w = (-r^2,\ 1)\).`,
          R`Pick \(r\) from the figure: between the blob and the nearest positive.`,
          R`Say: \(w^\top\varphi(x) > 0\) exactly for the positives → linearly separable in \(\varphi\)-space.`,
        ],
        numbers: R`<p>2025-B figure: negatives within about 0.5 of the origin, nearest positive about 0.8 (near \((0, 0.8)\)). Take \(r^2 = 0.4\) (\(r \approx 0.63\)), \(w = (-0.4, 1)\):</p>
<ul>
<li>farthest negative: \(-0.4 + 0.5^2 = -0.4 + 0.25 = -0.15 < 0\) ✓</li>
<li>nearest positive: \(-0.4 + 0.8^2 = -0.4 + 0.64 = 0.24 > 0\) ✓</li>
</ul>`,
        trap: R`Words only ("use a quadratic mapping") lose points: the grader wants an <b>explicit</b> formula for \(\varphi\).`,
        why: [
          [R`Why no line works in \((x_1, x_2)\)`, R`<p>A line cuts the plane into two half-planes. Whatever line you draw, the ring has points on both sides of it. So the data is not linearly separable in the original features.</p>`],
          [R`Why lines 2–3? Make the squares a feature`, R`<p>"\(-r^2 + (x_1^2 + x_2^2) > 0\)" is not linear in \(x_1, x_2\), but it <b>is</b> linear in the single number \(x_1^2 + x_2^2\): "weight × 1 + weight × something". So compute that number as a new feature and hand the classifier \(\varphi(x)\) instead of \(x\). A straight line in the new space is a circle in the original plane. General recipe: rule as an inequality → expand into "number × expression" → the expressions are \(\varphi\), the numbers are \(w\).</p>`],
          [R`Shape unclear? The full quadratic mapping`, R`<p>\(\varphi(x_1, x_2) = (1,\ x_1,\ x_2,\ x_1^2,\ x_2^2,\ x_1x_2)\) (the lecture's "full quadratic variety"). It contains the circle, \(w = (-r^2, 0, 0, 1, 1, 0)\), and also shifted circles, ellipses and hyperbolas. The official answer accepts it too.</p>`],
        ],
        side: R`<ul>
<li><b>Official answer:</b> it says \(r \approx \tfrac12\), which is right at the edge of the blob; a slightly bigger \(r\) (up to about 0.8) is safer. It also writes \(\varphi(x_1, x_1)\) for \(\varphi(x_1, x_2)\).</li>
<li>\(r = 1\) looks "safely in the middle" but is not: the lone positive at radius 0.8 would fall inside.</li>
<li><b>Lecture example (one feature):</b> negatives exactly on \([4, 8]\): \(y = - \iff (x - 6)^2 < 4 \iff 32 - 12x + x^2 < 0\), so \(\varphi(x) = (1, x, x^2)\), \(w = (32, -12, 1)\).</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-B Q3.6
      "kernel": {
        title: "A kernel that makes the dual Perceptron converge",
        minutes: 2,
        cue: R`"Propose a kernel function \(K(u,v)\) that will guarantee convergence of the dual perceptron … Clearly define the kernel and explain why it guarantees convergence" (2025-B Q3.6).`,
        lines: [
          R`\(K(u, v) = (1 + u^\top v)^2\).`,
          R`Expand: \((1 + u_1v_1 + u_2v_2)^2 = 1 + 2u_1v_1 + 2u_2v_2 + u_1^2v_1^2 + u_2^2v_2^2 + 2u_1u_2v_1v_2 = \varphi(u)^\top\varphi(v)\) with \(\varphi(x) = (1, \sqrt2x_1, \sqrt2x_2, x_1^2, x_2^2, \sqrt2x_1x_2)\).`,
          R`This \(\varphi\) contains \(1, x_1^2, x_2^2\), so the circle rule is linear in it (\(w = (-r^2, 0, 0, 1, 1, 0)\)) → the mapped data is linearly separable.`,
          R`Dual Perceptron with \(K\) = Perceptron on \(\varphi(x)\), and the Perceptron converges on separable data → it converges.`,
        ],
        numbers: R`<p>Check line 2 with \(u = (2, 0)\) (only test numbers: sample 1 of 2026-B Q3.1). Kernel: \(u^\top u = 4\), \(K(u, u) = (1 + 4)^2 = 25\). Long way: \(\varphi(u) = (1, 2\sqrt2, 0, 4, 0, 0)\), \(\varphi(u)^\top\varphi(u) = 1 + 8 + 0 + 16 + 0 + 0 = 25\) ✓</p>`,
        why: [
          [R`Why the Perceptron only needs dot products`, R`<p>Start from \(w = 0\). A mistake on sample \(j\) adds \(2\eta\,y_j\,x^{(j)}\) (\(y_j = \pm1\) gives the sign). So \(w = \sum_j \lambda_j y_j x^{(j)}\), where \(\lambda_j\) counts the mistakes on \(j\) (times \(2\eta\)). A score is then \(w^\top x^{(i)} = \sum_j \lambda_j y_j\,(x^{(j)})^\top x^{(i)}\): only dot products between samples. The dual Perceptron keeps the \(\lambda_j\). Running it on \(\varphi(x)\) means replacing each dot product by \(\varphi(x^{(j)})^\top\varphi(x^{(i)}) = K(x^{(j)}, x^{(i)})\), without ever building \(\varphi\).</p>`],
          [R`Why the \(\sqrt2\)'s?`, R`<p>Dot two \(\varphi\)'s entry by entry: \(\sqrt2u_1\cdot\sqrt2v_1 = 2u_1v_1\), and so on. The \(\sqrt2\)'s only produce the 2's of the expanded square. They don't change which boundaries are possible, because a weight can absorb any constant factor.</p>`],
        ],
        side: R`<ul>
<li><b>Grader's note:</b> a full proof isn't required; the kernel plus "it is the dot product of the quadratic features" is enough.</li>
<li><b>Another valid answer</b> from the small mapping \(\varphi(x) = (1, x_1^2 + x_2^2)\): \(K(u, v) = 1 + \|u\|^2\|v\|^2\).</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2026-B Q3.2
      "bce-loss": {
        title: "The BCE loss written with \\(t_i\\)",
        minutes: 1,
        cue: R`"Write an expression for the BCE loss, \(L(w)\) … Simplify your expression by using the notation \(t_i := w^\top x^{(i)}\)" (2026-B Q3.2).`,
        lines: [
          R`Copy the BCE printed in the question: \(L(w) = -\frac1n\sum_i\big[y_i\log\hat y_w(x^{(i)}) + (1 - y_i)\log(1 - \hat y_w(x^{(i)}))\big]\).`,
          R`Write the model underneath: \(\hat y_w(x^{(i)}) = \Phi(w^\top x^{(i)}) = \Phi(t_i)\).`,
          R`Replace every \(\hat y_w(x^{(i)})\) by \(\Phi(t_i)\). Done: nothing simplifies further for \(\Phi\).`,
        ],
        numbers: R`<p>2026-B Q3.2, the answer:</p>
\[L(w) = -\frac1n\sum_{i=1}^n\Big[y_i\log\Phi(t_i) + (1 - y_i)\log\big(1 - \Phi(t_i)\big)\Big]\]
<p>(For LoR: the same with \(\sigma\).)</p>`,
        trap: R`Moed B: left blank. 5 points for one substitution into a formula printed on the page.`,
        why: [
          [R`What the loss measures`, R`<p>Per sample: \(-\log\)(probability the model gave to the <b>true</b> label). \(y_i = 1\) switches on \(-\log\hat y_i\); \(y_i = 0\) switches on \(-\log(1 - \hat y_i)\). Probability 1 on the truth → loss \(-\log 1 = 0\); probability near 0 → huge loss. \(L\) is the average.</p>
<p>With numbers (2025-B's scores, only as test numbers): sample 5, \(y = 1\), \(t = 0.4\): \(-\log\sigma(0.4) = -\log 0.5987 = 0.513\). Sample 4, \(y = 0\), \(t = -1.6\): \(-\log(1 - 0.1680) = -\log 0.8320 = 0.184\). The unsure sample (near the line) costs more.</p>`],
        ],
        side: R`<ul>
<li><b>CLL (your HW3 Q5):</b> \(1 - \gamma(t) = e^{-e^t}\), so \(\log(1 - \gamma(t_i)) = -e^{t_i}\) and the loss becomes \(-\frac1n\sum_i\big[y_i\log(1 - e^{-e^{t_i}}) - (1 - y_i)e^{t_i}\big]\). Simplify only when a log simplifies.</li>
<li>On 2025-B's six scores the average BCE is about 0.362 with \(\sigma\) and 0.244 with \(\Phi\).</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2026-B Q3.3
      "bce-gradient": {
        title: "The BCE gradient: \\(z_i\\) for probit",
        minutes: 3,
        cue: R`"Derive an expression for the gradient \(\nabla L(w)\) … Use the chain rule and group common terms, as we did for LoR … the appropriate expression for \(z_i\)" (2026-B Q3.3).`,
        lines: [
          R`Facts: \(\dfrac{\partial t_i}{\partial w_j} = x^{(i)}_j\) and \(\Phi'(t) = \varphi(t)\) (observation 1).`,
          R`\(\dfrac{\partial}{\partial w_j}\log\Phi(t_i) = \dfrac{\varphi(t_i)}{\Phi(t_i)}x^{(i)}_j\), and \(\dfrac{\partial}{\partial w_j}\log(1 - \Phi(t_i)) = -\dfrac{\varphi(t_i)}{1 - \Phi(t_i)}x^{(i)}_j\).`,
          R`Into the loss: \(\dfrac{\partial L}{\partial w_j} = -\dfrac1n\sum_i\Big[\dfrac{y_i}{\Phi(t_i)} - \dfrac{1 - y_i}{1 - \Phi(t_i)}\Big]\varphi(t_i)\,x^{(i)}_j\).`,
          R`Common denominator: \(\dfrac{y}{\Phi} - \dfrac{1 - y}{1 - \Phi} = \dfrac{y - \Phi}{\Phi(1 - \Phi)}\).`,
          R`Answer: \(\nabla L = \sum_i z_i x^{(i)}\) with \(z_i = \dfrac{(\Phi(t_i) - y_i)\,\varphi(t_i)}{n\,\Phi(t_i)(1 - \Phi(t_i))}\).`,
        ],
        numbers: R`<p>Test numbers (2025-B's sample 2: \(t = -0.8\), \(y = 0\), \(n = 6\)): \(\Phi(-0.8) = 0.2119\), \(\varphi(-0.8) = 0.2897\).</p>
<p>\(z_2 = \dfrac{(0.2119 - 0)\cdot0.2897}{6\cdot0.2119\cdot0.7881} = \dfrac{0.0614}{1.0020} \approx 0.061 > 0\): a negative whose probability is a bit too high.</p>`,
        check: R`Put \(\sigma\) in place of \(\Phi\): \(\sigma' = \sigma(1 - \sigma)\) cancels the denominator, leaving \(z_i = (\sigma(t_i) - y_i)/n\), the formula-sheet LoR gradient.`,
        trap: R`Moed B: left blank (8 points). Line 2 alone earns partial credit. It is your HW3 Q6 with \(\gamma \to \Phi\), \(\gamma' \to \varphi\).`,
        why: [
          [R`Why line 2? The chain rule, outside to inside`, R`<p>\(\log\) (derivative \(1/\text{input}\)), then \(\Phi\) (derivative \(\varphi\)), then \(t_i\) (derivative \(x^{(i)}_j\)): \(\dfrac{1}{\Phi(t_i)}\cdot\varphi(t_i)\cdot x^{(i)}_j\). For the second log the inside is \(1 - \Phi(t_i)\), whose derivative is \(-\varphi(t_i)\,x^{(i)}_j\), hence the minus. \(\partial t_i/\partial w_j = x^{(i)}_j\) because only the term \(w_jx^{(i)}_j\) of \(t_i\) contains \(w_j\).</p>`],
          [R`Why lines 4–5? The algebra`, R`<p>\(\dfrac{y}{\Phi} - \dfrac{1-y}{1-\Phi} = \dfrac{y(1-\Phi) - (1-y)\Phi}{\Phi(1-\Phi)} = \dfrac{y - y\Phi - \Phi + y\Phi}{\Phi(1-\Phi)} = \dfrac{y - \Phi}{\Phi(1-\Phi)}\) (the \(\pm y\Phi\) cancel). The minus in front of \(\frac1n\) flips \(y - \Phi\) into \(\Phi - y\). Everything multiplying \(x^{(i)}_j\) is \(z_i\); stacking \(j = 0, 1, \dots\) gives \(\nabla L = \sum_i z_i x^{(i)}\).</p>`],
          [R`Why \(\sigma' = \sigma(1 - \sigma)\)? (for the check)`, R`<p>\(\sigma = (1 + e^{-t})^{-1}\). Chain rule: \(-(1 + e^{-t})^{-2}\cdot(-e^{-t}) = \dfrac{1}{1 + e^{-t}}\cdot\dfrac{e^{-t}}{1 + e^{-t}}\). The first factor is \(\sigma\); the second is \(1 - \dfrac{1}{1 + e^{-t}} = 1 - \sigma\).</p>`],
        ],
        side: R`<ul>
<li>Both forms are official: the line-3 form (\(z_i = -\frac1n[\dots]\varphi(t_i)\)) and the grouped line-5 form.</li>
<li>Observation 2 (\(\varphi' = -t\varphi\)) is not needed, as the question says.</li>
<li><b>CLL (your HW3 Q6):</b> \(\gamma' = e^t(1 - \gamma)\), so \(z_i = \dfrac{e^{t_i}(\gamma(t_i) - y_i)}{n\,\gamma(t_i)}\).</li>
<li>In every version \(z_i\) has the sign of \(g(t_i) - y_i\): positive when the probability is too high, negative when too low.</li>
</ul>`,
      },

      // ───────────────────────────────────────────── 2025-A Q4.5
      "code-gd": {
        title: "Code: LoR gradient descent (4 blanks)",
        minutes: 1,
        cue: R`"Complete the missing parts of code by filling in the four blank expressions (labeled 1-4)" (2025-A Q4.5).`,
        lines: [
          R`(1) The library imported as <code>np</code>: <code>numpy</code>.`,
          R`(2) \(\sigma(z) = 1/(1 + e^{-z})\) from the formula sheet: <code>1 / (1 + np.exp(-z))</code>.`,
          R`(3) All scores at once, \(Xw\): <code>X_with_bias @ w</code>.`,
          R`(4) Step against the gradient: <code>w - eta * grad</code>.`,
        ],
        check: R`Sizes: <code>X_with_bias</code> is \(n\times(p+1)\), <code>w</code> has \(p+1\) entries → <code>z</code> has \(n\) (one score per sample), <code>grad</code> has \(p+1\) (one per weight).`,
        trap: R`<code>w + eta * grad</code> walks uphill: the gradient points to where the loss grows.`,
        why: [
          [R`Why (3) and the given <code>grad</code> line`, R`<p>Row \(i\) of <code>X_with_bias</code> is sample \(i\) with its 1 in front, so <code>X_with_bias @ w</code> is every score \(t_i = w^\top x^{(i)}\). Then <code>y_hat</code> \(= \sigma(t_i)\), and <code>X_with_bias.T @ (y_hat - y)</code> \(= \sum_i(\sigma(t_i) - y_i)\,x^{(i)}\), the formula-sheet LoR gradient without the \(\frac1n\) (that only rescales the step, like a different \(\eta\)).</p>`],
        ],
        side: R`<p>Here <code>z</code> means the <b>scores</b>. In 2026-B's probit code <code>z</code> means the gradient coefficients \(z_i\). Same letter, different meaning.</p>`,
      },

      // ───────────────────────────────────────────── 2026-B Q3.4
      "code-minibatch": {
        title: "Code: the probit mini-batch loop (4 blanks)",
        minutes: 2,
        cue: R`"Complete the four missing parts of the code labeled 1–4" (2026-B Q3.4, 8 points). Every blank is spelled out on the page: in the hint, the comments, and the list of functions and class variables.`,
        lines: [
          R`(1) The hint \(\nabla L = \sum_i z_i x^{(i)}\) is \(X^\top z\); on this batch: <code>X_b.T @ z</code>.`,
          R`(2) Current weights minus learning rate × gradient: <code>self.w - self.learning_rate * grad</code>.`,
          R`(3) <code>self.BCE_loss(X, y)</code> "evaluates \(L(w)\) on a dataset", so give it this batch: <code>self.BCE_loss(X_b, y_b)</code>.`,
          R`(4) The comment says loss <b>change</b>: <code>abs(previous_loss - current_loss) &lt; self.eps</code>.`,
        ],
        trap: R`Moed B: blank 4 was <code>current_loss &lt; self.eps</code>, which tests the loss, not its change (1/8 overall).`,
        why: [
          [R`Why (1)? Summing "coefficient × row" is \(X^\top z\)`, R`<p>\(X^\top z\) takes each column of <code>X_b</code> and dots it with \(z\); entry \(j\) is \(\sum_i z_i x^{(i)}_j\). Stacked over \(j\), that is \(\sum_i z_i x^{(i)}\). You can write this without having solved part 3: <code>probit_grad_coeffs</code> hands you \(z\).</p>`],
          [R`Epoch and mini-batch`, R`<p>Full-batch GD uses all \(n\) rows for every step. Mini-batch GD shuffles the rows, cuts them into chunks of <code>batch_size</code>, and takes one step per chunk with that chunk's gradient. One trip through all chunks is an <b>epoch</b>. The Perceptron is the extreme case: one sample per step.</p>`],
          [R`Why (3) takes <code>y_b</code>, not <code>y01_b</code>`, R`<p><code>BCE_loss</code> takes the <b>original</b> labels and converts them to 0/1 itself. Your HW3's mini-batch <code>fit</code> called <code>self.BCE_loss(X_batch, y_shuffled[start:end])</code>, which is this exact answer.</p>`],
        ],
        side: R`<ul>
<li><b>Naming slip in the question:</b> <code>fit</code> creates <code>self.w_</code> (underscore), while the blank line and the class variables say <code>self.w</code>; the official answer mixes them. Not graded: use one name on both sides, e.g. <code>self.w_ - self.learning_rate * grad</code> with "assuming <code>self.w</code> means <code>self.w_</code>".</li>
<li>Your HW3 loop did the same per batch: <code>p = 1/(1+np.exp(-X_batch @ self.w_))</code>, <code>gradient = X_batch.T @ (p - y_01_batch) / X_batch.shape[0]</code>, <code>self.w_ = self.w_ - self.learning_rate * gradient</code>. The exam swaps \(\sigma\) for \(\Phi\) and hands you \(z\).</li>
</ul>`,
      },
    },
    parts: {
      "2025A-q4.1": ["perceptron-pass"],
      "2025A-q4.2": ["predict-all"],
      "2025A-q4.3": ["labels-01"],
      "2025A-q4.4": ["roc"],
      "2025A-q4.5": ["code-gd"],
      "2025B-q3.1": ["prob-sign"],
      "2025B-q3.2": ["separable-verdict"],
      "2025B-q3.3": ["bias-shift"],
      "2025B-q3.4": ["separable-verdict"],
      "2025B-q3.5": ["mapping-phi"],
      "2025B-q3.6": ["kernel"],
      "2026B-q3.1": ["prob-sign"],
      "2026B-q3.2": ["bce-loss"],
      "2026B-q3.3": ["bce-gradient"],
      "2026B-q3.4": ["code-minibatch"],
    },
  };
})();
