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
- **`start` ("Begin your answer like this") is OPTIONAL** — only where *writing the notation* is the hurdle
  (derivations, calculations, matrices). Never for argument / compare parts.

## 1. The format (chosen by the learner)
- **Question first.** The real exam part is on screen; under it, the solution is revealed one **move** at a time
  ("Show next move" / key N). Moves double as a hint ladder: the learner tries on paper and reveals only when stuck.
- **`start` — "Begin your answer like this".** Revealed before move 1. The **shape of the written answer** in exam
  notation with □ blanks, e.g. "The function: J(θ) = □ / Its derivative by θⱼ: dJ/dθⱼ = □ / The gradient: ∇J(θ) = □".
  It shows form, not content. ("I don't even know how to actually write the notations.")
- **`compare`** — 1–2 sentences under the last move: which move matches which line of the official solution, plus
  any official slip with the corrected value.

## 2. Casual, short, 80–90% of the points
- Aim for what a grader gives points for — the key formula, the right numbers, a one-phrase reason — not full rigor.
  ("Too formal, too strict … I can earn 80 or 90% of the points at the cost of formality.")
- **Few moves:** 2–5 per part. A move = **a bold label + one plain sentence + at most one or two formulas**.
- Labels name the action: **The function**, **Derivative by θⱼ**, **All knobs as a list**, **Select the pieces**,
  **Put it together**, **Errors Xθ − y**, **Line 16** … Last move ends with "Done." or "that's the answer".
- No formal set-up moves ("translate the question", "name the bracket", index bookkeeping).

## 3. Derivations follow the learner's own structure
Like they would write f(x) = (x²+3)², then f′(x) = {solve here}:
1. **The function** — copied from the question. Its why? writes it out with the real table (one bracket per sample).
2. **Rewrite** — only if a real manipulation is needed (splitting, simplifying). Never just to introduce a name.
3. **Derivative by θⱼ** — in their chain-rule pattern: 2 · (…) · (the number in front of θⱼ), i.e. exactly like
   (x²+3)² → 2·(x²+3)·2x, applied to each bracket. Absolute values: |a| → sign(a).
4. **All knobs as a list** — the gradient is that derivative written for θ₀, θ₁, θ₂, one row each.
5. **Select the pieces** — turn the list into matrix form by pointing at pieces (§5).
6. **Put it together** — the answer.
Never jump from the per-knob formula to the matrix form in one move ("'write it short' … feels like magic").

## 3b. Argument / comparison parts
Use the learner's own chain from §0 (model: 2025-C Q1.4): "A = the weights found using …" → "B = the weights
found using …" → "both are plugged into the same …, so …". The `start` gives these sentence openers with □.

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
  Say "you don't need to know this by heart". If the fact is NOT on the sheet, flag it as "🧠 know by heart" — rare.
  Any derivation of such a fact is optional, inside the why?.
- **Never state a known formula as a given.** If a move uses a result like θ̃ = (XᵀX)⁻¹Xᵀy, its why? shows where it comes
  from in the learner's structure (the function → derivative → set = 0 → solve), reusing earlier parts. (Learner:
  "How did we get from (XᵀX)⁻¹Xᵀy to ‖Xθ−y‖²?")
- The why? is for understanding; the next move must be followable without opening it.
- Optional `extra` blocks (collapsed, labelled): "check it with numbers", an official-solution slip, a Moed B trap.

## 7. Layout
- **No sideways scrolling.** Break long formulas with `\begin{aligned}` (≈ 50 characters of math per line); stack
  two formulas vertically, never side by side with ⟹.
- **Multi-row calculations (row · θ for each sample, column · errors, …) go in a small table**, not in a wide aligned formula.
- Explanations for the learner go on the site, where math renders — not in the terminal chat.

## 8. Content rules
- **Real material only — never invented questions.** Exam parts, official solutions (images are authoritative),
  homework, lectures. Worked numbers come from the real exam tables.
- Verify every number with python3/numpy. Flag official slips (in `compare` and an `extra`) with the corrected value.
- Don't re-walk what an earlier part of the same question already did — refer to it ("part 2, step 4").

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
