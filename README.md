# ML from Data — Exam C study site

Open `index.html` in a browser (works offline, no server). Progress is saved in the browser; use *Download progress backup* in the sidebar to keep a copy.

**Rule: real course material only.** Every practice item is a real exam item (cut from the official solution PDFs), a homework question, or your own Moed B answer. Nothing is invented. "First moves" are short notes distilled from the official solutions.

Organised by exam question family: every one of the 25 real questions appears once, whole, in one topic (Moed B question last, as the checkpoint). Notes are written for Regression; other topics have their questions ready and notes coming next.

## Rebuilding the images
```
python3 tools/extract.py            # cut every exam item (question / solution / setup) from ../Exams/*solution.pdf
python3 tools/build_data.py         # build/manifest.json -> data/manifest.js
python3 tools/contact.py 2026B 3    # QA sheet of one question's cuts -> build/
```
Solutions are detected by their exact blue colour (0x2E74B5). Wrong cuts are fixed with `OVERRIDES` in `tools/extract.py`.

**Recipe cards** (`data/cards/<topic>.js`, standard `spec/CARDS.md`, check with `node tools/check_cards.js`) are shown directly above each exam part that needs them — ~150-word "you'll see / write these lines / with numbers" cores with collapsed "why?" drawers. A card starts collapsed once you've marked any part that uses it. The long notes remain as collapsed reference at the bottom of each topic page. A 25/5 focus timer sits in the corner.

Topics, questions, Moed B answers and code-blank answers live in `data/content.js`. Each topic's notes and per-part hints live in `data/notes/<topic>.js`, written to the standard in `spec/STYLE.md` and validated with `node tools/check_notes.js data/notes/<topic>.js`.

Before deploying: `python3 tools/stamp.py` (cache-busting version stamps in index.html).
