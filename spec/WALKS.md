# How the walkthroughs must be — the learner's guidelines

These rules come from working through 2025-C Q1.2 together with the learner (severe ADHD, failed Moed B by getting
stuck, knows single-variable calculus and numpy, does NOT own formal ML/math notation). Every rule below exists
because something else failed. The reference implementation is `data/walks/regression.js` (2025-C Q1, parts 1–5).

## 0. How this learner thinks — the gold standard (read this first)
When asked to explain part 4 of 2025-C Q1 in their own words, the learner wrote the complete, correct answer:

> θ* and θ̃ are the weights. J_λ(θ*) is the loss function value of J_λ with the optimal weights that were found USING
> this same loss function. θ̃ was found using a different loss function, the least squares solution. Then we're using
> the loss function J_λ, with the weights θ̃ (that were found with the other loss function). Obviously θ* would be
> better (smaller) than θ̃ with this loss function (assuming they're different), otherwise we'd find θ̃ rather than θ*.

That is how every walkthrough must read: **short plain sentences that each say what a thing IS, chained by "so" /
"otherwise"** — no framing, no analogies, no side tables. The learner then said: *"now that you understand EXACTLY
how my brain breaks this stuff down, this is what I need! Not all the fluffing around."*

**No fluff.** Every sentence must move toward the answer. Cut: analogies ("the winner of a race…"), scoreboards and
illustrations nobody asked for, repeated explanations, "careful: …" notes, restating the question. Allowed extras:
an official-solution slip (short), a formula-sheet pointer, a Moed B trap (one sentence). A why? is normally
1–3 sentences; only derivation steps (§3) get a longer why? with the per-bracket chain rule.

**Before writing a part, find its idea in one sentence in the learner's style** ("θ* was found using J_λ, θ̃ with a
different loss, both are scored on J_λ, so θ* wins"). The moves are that sentence, split up.

**Argument / compare parts** use exactly the learner's chain: "A = … found using …" → "B = … found using …" →
"both are plugged into …, so …". (Model: 2025-C Q1.4.)

## 0.4 THE PAGE STRUCTURE (learner, 2026-09-30 — binding)
*"I need it structured like this: 'The point' / 'Begin your answer like this' (press here for 'Full exam answer') /
'The steps, explained'. Then, the steps really do have to explain the full exam answer, especially when things aren't
trivial — how I'd reverse engineer the solution and figure it out myself! If there's something I should remember, it
should clearly be 'remember this for the exam!'"*
1. 💡 **The point** (`point`).
2. ✍ **Begin your answer like this** (`start`), with the collapsed **📝 Full exam answer** (`answer`) under it: the
   same template line for line, filled in.
3. **The steps, explained** (`moves`): they build exactly the full exam answer, line by line, and for every
   non-trivial line they show how you'd **figure it out yourself** — start from what the question really asks
   ("'converges' → Perceptron converges only on separable data → I need features where it's separable"), work
   backwards from the goal, never pull a result out of nowhere. The last step usually states the final line(s).
4. Anything to memorise → a `remember` box, shown as **"🧠 Remember this for the exam!"**.
Model: 2025-B Q3.6.

## 0.5 THE POINT — every part starts with it
The learner, after understanding 2025-C Q1.4: *"The point is to simplify. Basically now that I understand it, it
literally doesn't matter what θ̃ was obtained with. [θ* is the best for J_λ, so anything else scores worse.] That's the
point of the question. That's what I need to understand, in every question!"*

- Every part has a **`point`**: the ONE realization the part tests, in 1–2 plain sentences, in the learner's style.
  It is revealed first ("💡 The point"), before anything else. Everything after it just executes the point.
- Find it by asking: "what does the grader want me to notice?" Strip everything that doesn't matter (e.g. how θ̃
  was obtained). Examples (2025-C Q1):
  - 1.4: "It doesn't matter how θ̃ was found: θ* is the best θ for J_λ, so every other θ gives a larger J_λ."
  - 1.3: "One gradient-descent step = plug the numbers into part 2's gradient, then θ − 0.1 · gradient."
  - 1.5: "Cross-validation = train on the other folds, score plain squared error on the held-out fold, average,
    keep the smallest. Each bug breaks one of these."
- After the point, keep the moves to what's needed to write the answer (often 2–3).
- **`start` ("Begin your answer like this") is REQUIRED for every part** (§0.4): calculations get their lines with □,
  argument / compare parts get the sentence openers of the learner's chain, code parts one line per blank.

## 1. The format (chosen by the learner)
- **Question first.** The real exam part is on screen; under it, the solution is revealed one **move** at a time
  ("Show next move" / key N). Moves double as a hint ladder: the learner tries on paper and reveals only when stuck.
- **`start` — "Begin your answer like this".** Revealed before move 1. The **shape of the written answer** in exam
  notation with □ blanks, e.g. "The function: J(θ) = □ / Its derivative by θⱼ: dJ/dθⱼ = □ / The gradient: ∇J(θ) = □".
  It shows form, not content. ("I don't even know how to actually write the notations.")
- **`answer` — "📝 Show the full answer".** A collapsed box right under the "Begin your answer like this" template
  (under "The point" when a part has no `start`); it opens only when pressed. It is the `start` template **line for line,
  same labels, same order, same layout** (display formula where the start has one), with every □ filled in: the complete
  written answer in exam form, short, nothing the grader doesn't need, in the learner's chosen method. Learner: *"I'm
  really missing the actual 'full answer', that's fitting with the 'begin your answer like this' template … structured
  identically to the begin."* Every part has one. Model: 2025-B Q3.6.
- **`compare`** — 1–2 sentences under the last move: which move matches which line of the official solution, plus
  any official slip with the corrected value.

## 2. Casual, short, 80–90% of the points
- Aim for what a grader gives points for — the key formula, the right numbers, a one-phrase reason — not full rigor.
  ("Too formal, too strict … I can earn 80 or 90% of the points at the cost of formality.")
- **Few moves:** 2–5 per part. A move = **a bold label + one plain sentence + at most one or two formulas**.
- Labels name the action: **The function**, **Derivative by θⱼ**, **All knobs as a list**, **Select the pieces**,
  **Put it together**, **Errors Xθ − y**, **Line 16** … Last move ends with "Done." or "that's the answer".
- No formal set-up moves ("translate the question", "name the bracket", index bookkeeping).

## 3. Gradients: one weight → matrix pieces → stack (THE structure — learner-approved 2026-A Q1.2)
Learner, after writing dJ/dwⱼ = Σ 2γᵢ(…)xⱼ⁽ⁱ⁾ = 2Xⱼ Γ(Xw−y) themselves: *"This is how I want these sort of explanations
done … It's simple and works for my ADHD brain. At most, highlight 'constant' for whatever it is that can be taken out
of the sum, which is the basic trick that needs to be done."* Model: **2026-A Q1.2**. Every gradient part:
1. **The function** — copied from the question. Its why? writes it out with the real table (one bracket per sample).
2. **Derivative by one weight wⱼ** — as a sum, chain-rule pattern: 2 · (…) · (the number in front of wⱼ) = xⱼ⁽ⁱ⁾,
   exactly like (x²+3)² → 2·(x²+3)·2x. Absolute values: |a| → sign(a). Penalty terms: their own derivative, added.
3. **Write it with matrices** — take the constant out of the sum (highlight ONLY it: orange underbrace "constant"),
   then the rest "entry × entry, added up" = a dot product: Σᵢ xⱼ⁽ⁱ⁾·(…) = Xⱼᵀ(list), with **Xⱼ = column j of X**.
   Size check (1×n)(n×1) = one number; without ᵀ it fails.
   Its why? always answers the learner's question "but xⱼ and γᵢ can also be taken out of the sum?": only things
   without an i (same for every sample) come out; things with an i get packed into lists (Xⱼ, Γ(Xw−y), …) and the
   sum becomes the dot product of those lists.
4. **From one weight to ∇J** — ∇J = the list of all partials: stack move 3 for w₀, w₁, w₂ as a column; everything
   except Xⱼ is the same in each row → constant, out (orange); the stacked Xⱼᵀ rows = Xᵀ. → final formula. Size check.
   Penalty rows stack into a vector (λ·sign(wⱼ) → λ·sign(w); 2λwⱼ with w₀ excluded → 2λ(0, w₁, w₂)).
Never name the bracket (no rᵢ, eᵢ — learner: "I rather not use rᵢ"): write it out in the function and derivative,
then say "the bracket = entry i of Xw − y" and write the list with it, e.g. (Xw − y)² sign(Xw − y), entry by entry
(learner: "I prefer it shorter. I can 'see' already the regular structure of Xw − y"). Model for a non-squared loss:
2026-B Q1.3.
No colored "select the pieces" underbraces beyond the constant highlight here; no "all knobs as a list" move.
The `start`: "The function: □ / Derivative by one weight wⱼ: dJ/dwⱼ = □ = □ / All weights (the gradient): ∇J = □".

## 3b. Argument / comparison parts
Use the learner's own chain from §0 (model: 2025-C Q1.4): "A = the weights found using …" → "B = the weights
found using …" → "both are plugged into the same …, so …". The `start` gives these sentence openers with □.

## 3c. "Find the matrices so that <sum> = <matrix form>" parts — work backwards, never guess
Learner (2026-A Q1.1): *"I understand the solution. I don't understand how I would've come up with it myself …
There's 0 intuition as to why I'd try with I."* So no lucky guesses (never "try I and adjust"). Every step must follow
from the previous one:
1. **Write the sum out** for the real samples (numbers from the table) — what I have.
2. **Write what the target looks like** (e.g. ‖X′θ − y′‖² = one (row · θ − label)² per row; (Xw − y)ᵀΓ(Xw − y) = the
   brackets dotted with something).
3. **Fill in the pieces you already know** (X, y are always the same) and say what's left.
4. **Match the leftover term by term / row by row** with matrix × vector ("row i · the list must give entry i").
5. Put it together + size check.
The `start` shows "What I have: □ / What it must equal/look like: □ / Answer: □". Model: 2026-A Q1.1, 2025-B Q1.2.

## 4. Notation: nothing new unless the exam forces it
- **No new names or variables** (eᵢ, rᵢ, u, bracketᵢ …) unless the official answer itself uses them. ("Why e_i now…
  do we really need more variables and notations.")
- **Refer back with (…)** — "2 · (…) · x" = the same bracket as before, copied as-is. When samples must be told
  apart, say it in words: "sample 1's (…) × sample 1's x₁".
- **Sums:** always show what is inside Σ — everything with an i in it is inside — and write it out for the real
  samples. (Learner read 2Σᵢ xⱼ⁽ⁱ⁾(θᵀx⁽ⁱ⁾ − y⁽ⁱ⁾) as "(Σ xⱼ) × (error)".)
- **A squared norm is a sum of per-sample squares:** apply the chain rule per sample, never to ‖v‖ as a whole
  (learner wrote 2·‖Xθ−y‖·xⱼ).
- **Shorthands are definitions, not steps** — say so, then show it with the real numbers and the numpy equivalent:
  sign(θ) = (sign θ₀, sign θ₁, sign θ₂) = `np.sign(theta)` → (1, −1, 1); θᵀx⁽ⁱ⁾ = the prediction θ₀ + θ₁x₁ + θ₂x₂;
  Xθ − y = `X @ theta - y`.

## 4b. Size check on EVERY matrix step
The learner: *"I'm having troubles with the matrix expressions. After getting the partial derivatives, we then somehow
change the transpose and X location, this sort of stuff mixes me up. I only realised much later when the
multiplication didn't work."* So every move that forms, rewrites or evaluates a matrix/vector product (Xθ, Xθ − y,
Xᵀ(…), XᵀΓ(…), (XᵀX)⁻¹Xᵀy, X′, Γ, w − η·grad, `X.T @ z`, `X_val @ w` …) gets a **`size`** field on the move:
- The product with each piece's size under it, using THIS question's real numbers (e.g. n = 4 samples, 3 knobs):
  `\[\underbrace{X^\top}_{3\times 4}\,\underbrace{(X\theta - y)}_{4\times 1} = \underbrace{\nabla J}_{3\times 1}\]`
- One short line: "inner 4 = 4 ✓ · result 3×1 = one entry per knob ✓", and where it helps, the order that does NOT fit:
  "X(Xθ − y) = (4×3)(4×1) ✗".
- **Dot products:** when a solution flips aᵀb ↔ bᵀa (e.g. (Xθ − y)ᵀXⱼ vs Xⱼᵀ(Xθ − y)), the size check says
  "(1×4)(4×1) = one number either way — a dot product doesn't care about order".
- Rule to repeat: "write the size under each piece; the inner numbers must match; the outer numbers give the result".
- Code: numpy shapes, e.g. `X.shape = (n, 3)`, `X_b.T @ z` = (3×b)(b×1).
Rendered as a dashed "Size check" box under the move line (always visible once the move is shown).

## 5. "Select the pieces" — the method that works best
("I think it would make more sense to me if we rather 'select' pieces and say 'this part = X', 'this part = Xᵀ'.")
- Colour a piece of the formula, put a brace under it, and say what it equals:
  `\underbrace{\color{#e8912d}(\dots)}_{\textstyle\color{#e8912d}\text{this part = }X\theta - y}`.
- Colours (readable in both themes): orange `#e8912d`, blue `#4c8dff`. Labels at normal size (`\textstyle`) and in the
  piece's colour. Keep labels short so the formula fits.
- Use it for every change of form: sum → matrix, one knob → all knobs, pieces of an answer ("this part = step 4's sums").
- Later moves can refer to the colours: "the orange part 2Xᵀ(Xθ − y)".

## 6. Explanations (why?)
- **Concrete first, formula last.** Start from the real exam table and numbers, in the learner's single-variable
  pattern; only then "the official formula is just this, written short".
- 1–3 short sentences. A small real-numbers table or a numpy line only where it replaces words (derivations). No analogies.
- **Known facts → the formula sheet.** The learner gets the official formula sheet in the exam and won't derive
  facts there ("I wouldn't figure this out during the exam … I don't know it"). Whenever a move uses a known result,
  point to the exact sheet entry with `[sheet: Entry name]` (renders as a clickable "📄 Formula sheet → Entry name"
  that opens the sheet on the right page; names must match `data/sheet.js` — the checker enforces it), e.g.
  `[sheet: Least squares solution]`, `[sheet: Square error loss gradient]`, `[sheet: Responsibilities update]`.
  Say "you don't need to know this by heart" ONLY when the sheet has it in the form the move uses (same shape,
  matrix vs. one sample, with/without ½, same symbols up to renaming). Otherwise → §6b.
  Any derivation of such a fact is optional, inside the why?.
- **Never state a known formula as a given.** If a move uses a result like θ̃ = (XᵀX)⁻¹Xᵀy, its why? shows where it comes
  from in the learner's structure (the function → derivative → set = 0 → solve), reusing earlier parts. (Learner:
  "How did we get from (XᵀX)⁻¹Xᵀy to ‖Xθ−y‖²?")
- The why? is for understanding; the next move must be followable without opening it.
- Optional `extra` blocks (collapsed, labelled): "check it with numbers", an official-solution slip, a Moed B trap.

## 6b. 🧠 Remember from class — LOUD, never hidden
Learner: *"When there's a thing I should just 'remember from class', I want it loud and clear where relevant. In part 4
I basically have to remember that the gradient of ‖Xw−y‖² is 2Xᵀ(Xw−y). It's unclear to me from the cheat sheet."*
- A fact the move needs that the learner must bring from memory gets a `remember` field on that move. It renders as a
  visible purple box "🧠 Remember from class", right under the line — **never inside why?**.
- Counts as "from memory": not on the sheet at all, OR on the sheet only in a different form the learner would have to
  translate (the sheet's square-error gradient is one sample with a ½, (wᵀx − y)x — the matrix form 2Xᵀ(Xw−y) is
  memory), OR only on the extension sheet (eligibility unknown — say "extension sheet, if you get it").
- Content: the fact itself as one formula/sentence, in the general form you'd write from memory (letters from class:
  X, w/θ, y), then one short line: what the sheet has instead (with `[sheet: …]`) or "not on the sheet", and how it maps
  to this question if the letters differ (e.g. "here X is X′").
- Put it on the FIRST move of each part that needs the fact (every part is self-contained — repeat it in each part).
- Not for: arithmetic, the question's own definitions, things derived in that same part, basic calculus/algebra the
  learner confirmed they know (derivative of x², chain rule, dot product, matrix × vector).
- The checker rejects "by heart"/🧠 left inside a why? of a move that has `remember`.

## 7. Layout
- **No sideways scrolling.** Break long formulas with `\begin{aligned}` (≈ 50 characters of math per line); stack
  two formulas vertically, never side by side with ⟹.
- **Multi-row calculations (row · θ for each sample, column · errors, …) go in a small table**, not in a wide aligned formula.
- Explanations for the learner go on the site, where math renders — not in the terminal chat.

## 8. Content rules
- **Real material only — never invented questions.** Exam parts, official solutions (images are authoritative),
  homework, lectures. Worked numbers come from the real exam tables.
- Verify every number with python3/numpy. Flag official slips (in `compare` and an `extra`) with the corrected value.
- **Every location is self-contained.** A reference ("we've seen this in 2025-C Q1, part 2") may be ADDED, but it never
  REPLACES the explanation. The learner: *"It's good to say 'we've seen similar in x', but it doesn't mean we should
  have no clear explanation in this exact location."* So wherever a move, start or point relies on something from
  another question, part or note, it states the actual step here — short, in the learner's structure, with this
  question's own numbers — and the pointer comes after, in brackets. Within the same question, "part 2's answer" is
  fine only if the formula/value is written out right here.

## 9. File format and validation — `data/walks/<topic>.js`
```js
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {
    "2025C-q1.2": {
      start: R`<p><b>The function:</b></p>\[J(\theta) = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question: <div class="formula">\[…\]</div>`,
          why: R`<p>…</p>`,
          remember: R`\[\nabla\,\|Xw - y\|^2 = 2X^\top(Xw - y)\]<p>Not on the sheet in this form: …</p>`,   // §6b, only when needed
          size: R`\[\underbrace{X^\top}_{3\times 4}\,\underbrace{(X\theta - y)}_{4\times 1}\]<p>inner 4 = 4 ✓</p>`,   // matrix steps only
          extra: [{ label: "check it with numbers", html: R`…` }] },   // extra is optional
      ],
      compare: R`The official solution's last line is move 5.`,
    },
  });
})();
```
HTML inside `R\`…\``; math `\( \)` inline, `\[ \]` display (KaTeX). Never `${`. `&lt;` for `<` inside `<pre><code>`.
Every part needs `point`, `moves`, `compare`; `start` is optional. Validate: `node tools/check_walks.js data/walks/<topic>.js` must print ✓.
Then look at it in a browser at ~950 px width: no sideways scrolling anywhere.
