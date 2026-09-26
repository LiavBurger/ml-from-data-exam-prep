# Recipe cards — the standard

## Why cards exist
The learner (severe ADHD, failed Moed B by getting stuck) was given very thorough notes (~16k words per topic,
everything shown in full) and said: *"It's good that it's detailed, but I have severe ADHD and I'm just not managing
to follow and be effective with this."* An audit found: the point-earning part sat at the bottom of each note, the
answer formula of the gradient note appeared after ~450 words, side remarks/slips/alternative derivations sat
mid-flow, many cross-references, nothing to *do* until the end, ~2.5 hours of reading before touching an exam part.
Research (working-memory load in adult ADHD; segmenting; worked examples → retrieval with real exam items): goal
first, one idea per chunk, detail on demand, then immediately try the real exam part.

The learner chose: **short recipe cards shown directly above each exam part they serve.** They read ~150 words,
try the real part on paper, then check the official solution. The existing long notes stay on the site as collapsed
reference — the cards are built FROM them (their math has already been verified twice).

## A card
- **One skill per card** (e.g. "gradient of the squared error", "one GD step by hand", "entropy of a node", "E-step
  responsibilities"). A part may need 1–3 cards; a card usually serves several parts across exams.
- **Core ≤ ~150 words** (excluding drawers), in this order:
  1. `cue` — **You'll see:** how the exam phrases it (quote real wording).
  2. `lines` — **Write these lines:** 3–6 numbered lines, each ONE action the learner writes on the exam paper, in
     the order they write them. Short. Symbols allowed, but each line should be readable on its own.
  3. `numbers` — **With numbers:** ONE compact worked example on real exam data, full chain but tight (≤ ~6 short
     lines). Prefer the topic's guided (first) question. Say where the numbers come from.
  4. `check` (optional) — one-line sanity check (e.g. size check "3×4 times 4×1 = 3×1").
  5. `trap` (optional) — ONE line, the most costly mistake (Moed B mistakes where relevant).
- **Drawers** (collapsed, shown as buttons under the core):
  - `why`: list of `[label, html]` — "Why line 2?" etc. Plain words, short (≤ ~120 words each), full chain where it
    explains a step. This is where the understanding lives; take it from the existing notes, trimmed.
  - `side`: grey "Side notes (not needed for points)": official-solution slips, alternatives, illustrations, context.
- **No cross-references in the core** except "same as card …". No recaps ("where we are"). No landscape metaphors in
  the core (they can go in a why-drawer).
- `minutes`: honest estimate to read the core (usually 1–3).
- Real material only; never invent practice questions. Keep every number exactly as verified in the notes; if you
  compute anything new, verify it with python3.

## File format — `data/cards/<topic>.js`
```js
// Recipe cards for topic "<topic>". Standard: spec/CARDS.md. Built from data/notes/<topic>.js.
(function () {
  const R = String.raw;
  window.CARDS = window.CARDS || {};
  window.CARDS["<topic>"] = {
    intro: R`<p>≤ 80 words: what this question family is and how to work it (open question 1, go part by part).</p>`,
    cards: {
      "gradient": {                       // short kebab-case id
        title: "The gradient of the squared error",   // plain string; math needs "\\(X\\)"
        minutes: 2,
        cue: R`…`, lines: [R`…`, R`…`, R`…`], numbers: R`…`, check: R`…`, trap: R`…`,
        why: [[R`Why line 1? …`, R`…html…`], …],
        side: R`<ul><li>…</li></ul>`,
      },
    },
    // EVERY part of EVERY question in the topic → the card ids it needs, in reading order ([] only if truly none).
    parts: { "2025C-q1.1": ["x-and-y"], "2025C-q1.2": ["gradient", "penalty-gradients"], … },
  };
})();
```
HTML/KaTeX rules as in STYLE.md (`\( \)`, `\[ \]`, no `${`, `&lt;` in `<pre><code>`). Validate with
`node tools/check_cards.js data/cards/<topic>.js` — must print ✓.

## Model card (the learner reviewed this one and chose the format)
See `data/cards/regression.js` → card `"gradient"`.
