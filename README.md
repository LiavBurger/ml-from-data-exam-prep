# ML from Data — Exam C study site

Open `index.html` in a browser (works offline, no server). Progress is saved in the browser; use *Download progress backup* in the sidebar to keep a copy.

**Rule: real course material only.** Every practice item is a real exam item (cut from the official solution PDFs), a homework question, or your own Moed B answer. Nothing is invented. "First moves" are short notes distilled from the official solutions.

Topics follow the order in `../MISSION.md`. Pilot: topics 0 (Moed B free points) and 1 (gradient template + GD code); the rest are listed as *next*.

## Rebuilding the images
```
python3 tools/extract.py            # cut every exam item (question / solution / setup) from ../Exams/*solution.pdf
python3 tools/build_data.py         # build/manifest.json -> data/manifest.js
python3 tools/contact.py 2026B 3    # QA sheet of one question's cuts -> build/
```
Solutions are detected by their exact blue colour (0x2E74B5). Wrong cuts are fixed with `OVERRIDES` in `tools/extract.py`.

Content lives in `data/content.js` (topics, first moves, items, code-blank answers).
