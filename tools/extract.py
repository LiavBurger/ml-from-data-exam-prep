#!/usr/bin/env python3
"""Cut every exam item out of the official solution PDFs.

For each solution PDF we find:
  * question headers  ("Question N: ...")
  * item anchors      ("N. (X pts)")
  * solution text     (the official solutions are printed in blue)

and write, per item, three PNGs:  stem (the question's shared setup),
q (the item text, including any context lines printed right before it) and
sol (the official solution).  A manifest (build/manifest.json) records what was cut.

Usage:  python3 tools/extract.py [EXAM_TAG ...]      e.g. 2026B 2025C
"""
import glob, json, os, re, subprocess, sys
import fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXAMS = os.path.join(os.path.dirname(ROOT), "Exams")
PAGES = os.path.join(ROOT, "build", "pages")
IMAGES = os.path.join(ROOT, "images")
DPI = 170
S = DPI / 72.0
FOOTER_Y = 752      # "Page x of y / Version I" footer starts below this (pt)
TOP_Y = 40
X0, X1 = 60, 548    # content column (pt)
RIGHT_EDGE = {"2025B": 412}
# Hand-set bands (page, y0, y1 in pt) where the automatic cut is wrong.
OVERRIDES = {
    # the official solution is printed ABOVE the code listing it answers
    ("2025A", 4, 5): {"q": [(16, 64, 148), (16, 246, 590)], "sol": [(16, 160, 240)]},
}   # 2025B has grader comment balloons in the right margin

SOURCES = {
    "2025A": "ML-2025-ExamA-solution.pdf",
    "2025B": "ML-2025-ExamB-solution.pdf",
    "2025C": "ML-2025-ExamC-solution.pdf",
    "2026A": "ML-2026-ExamA-solution.pdf",
    "2026B": "ML-2026-ExamB-solution.pdf",
}


def render(pdf, tag, page):
    os.makedirs(PAGES, exist_ok=True)
    out = os.path.join(PAGES, f"{tag}-p{page:02d}.png")
    if not os.path.exists(out):
        prefix = os.path.join(PAGES, f"tmp-{tag}")
        subprocess.run(["pdftoppm", "-png", "-r", str(DPI), "-f", str(page), "-l", str(page),
                        pdf, prefix], check=True)
        hit = sorted(glob.glob(prefix + "*.png"))[-1]
        os.replace(hit, out)
    return Image.open(out).convert("RGB")


PAGE_FOOT = {}        # page -> y of the "Page x of y" footer (per PDF, reset per run)
SOL_COLOR = 0x2E74B5   # the official solutions are typeset in this blue (code keywords use 0x0000FF)


def lines_of(pdf, tag):
    """Flatten the PDF into text lines: {page, y0, y1, x0, text, blue}."""
    doc = fitz.open(pdf)
    lines = []
    for pi, page in enumerate(doc, start=1):
        foot = [sp["bbox"][1] for blk in page.get_text("dict")["blocks"] for ln in blk.get("lines", [])
                for sp in ln["spans"] if re.match(r"\s*Page \d+ of \d+", sp["text"])]
        PAGE_FOOT[pi] = (min(foot) - 2) if foot else FOOTER_Y
        spans = []
        for blk in page.get_text("dict")["blocks"]:
            for ln in blk.get("lines", []):
                for sp in ln["spans"]:
                    t = sp["text"].strip()
                    x0, y0, x1, y1 = sp["bbox"]
                    if not t or y0 < TOP_Y or y0 >= PAGE_FOOT[pi] or x0 > RIGHT_EDGE.get(tag, X1):
                        continue
                    spans.append({"t": t, "x0": x0, "y0": y0, "y1": y1, "blue": sp["color"] == SOL_COLOR})
        spans.sort(key=lambda w: w["y0"])
        groups, cur, band = [], [], None
        for w in spans:
            mid = (w["y0"] + w["y1"]) / 2
            if cur and not (band[0] - 1 <= mid <= band[1] + 1):
                groups.append(cur); cur = []
            if not cur:
                band = [w["y0"], w["y1"]]
            cur.append(w)
        if cur:
            groups.append(cur)
        for g in groups:
            g.sort(key=lambda v: v["x0"])
            nb = sum(len(w["t"]) for w in g if w["blue"]); nt = sum(len(w["t"]) for w in g)
            lines.append({"page": pi, "y0": min(w["y0"] for w in g), "y1": max(w["y1"] for w in g),
                          "x0": g[0]["x0"], "text": " ".join(w["t"] for w in g), "blue": nb * 2 > nt})
    return lines


HEADER = re.compile(r"^Question\s+(\d+)\s*:")
ANCHOR = re.compile(r"^(\d+)\.\s*\(?\s*(\d+)\s*(pts|points|pt)", re.I)


def classify(lines):
    for ln in lines:
        ln["kind"] = "text"
        t = ln["text"].strip()
        if HEADER.match(t) and ln["x0"] < 140 and not ln["blue"]:
            ln["kind"] = "header"; ln["q"] = int(HEADER.match(t).group(1))
        elif ANCHOR.match(t) and ln["x0"] < 140 and not ln["blue"]:
            m = ANCHOR.match(t)
            ln["kind"] = "anchor"; ln["item"] = int(m.group(1)); ln["pts"] = int(m.group(2))
            ln["bonus"] = "bonus" in t.lower()[:40]


def segment(lines):
    """Return [{q, stem:[line idx], items:[{item, pts, q:[idx], sol:[idx]}]}]."""
    qs = []
    i = 0
    n = len(lines)
    while i < n:
        if lines[i]["kind"] != "header":
            i += 1; continue
        q = {"q": lines[i]["q"], "title": lines[i]["text"], "stem": [], "items": []}
        j = i
        while j < n and lines[j]["kind"] not in ("anchor",) and (j == i or lines[j]["kind"] != "header"):
            q["stem"].append(j); j += 1
        pending_ctx = []
        while j < n and lines[j]["kind"] == "anchor":
            a = lines[j]
            it = {"item": a["item"], "pts": a["pts"], "bonus": a.get("bonus", False),
                  "q": list(pending_ctx), "sol": []}
            k = j
            while k < n and not lines[k]["blue"] and (k == j or lines[k]["kind"] not in ("anchor", "header")):
                it["q"].append(k); k += 1
            # solution: from first blue line to the last blue line before next anchor/header
            body = []
            while k < n and lines[k]["kind"] not in ("anchor", "header"):
                body.append(k); k += 1
            last_blue = max([b for b in body if lines[b]["blue"]], default=None)
            if last_blue is None:
                it["sol"] = body; pending_ctx = []
            elif k < n and lines[k]["kind"] == "anchor":
                it["sol"] = [b for b in body if b <= last_blue]
                pending_ctx = [b for b in body if b > last_blue]
            else:
                it["sol"] = body; pending_ctx = []
            q["items"].append(it)
            j = k
        qs.append(q)
        i = j if j > i else i + 1
    return qs


def spans(lines, idxs):
    """Line indices -> per-page (page, y0, y1) bands that also cover figures between lines."""
    if not idxs:
        return []
    idxs = sorted(idxs)
    bands = {}
    for a in idxs:
        ln = lines[a]
        nxt = lines[a + 1] if a + 1 < len(lines) else None
        # extend each line down to the next line on the same page (covers figures/tables)
        if nxt is not None and nxt["page"] == ln["page"] and (a + 1) in idxs:
            bottom = nxt["y0"] - 1
        elif nxt is not None and nxt["page"] == ln["page"]:
            bottom = min(nxt["y0"] - 2, ln["y1"] + 200)
        else:
            bottom = max(PAGE_FOOT.get(ln["page"], FOOTER_Y) - 2, ln["y1"] + 3)
        b = bands.setdefault(ln["page"], [ln["y0"] - 4, bottom])
        b[0] = min(b[0], ln["y0"] - 4); b[1] = max(b[1], bottom)
    return [(p, y0, y1) for p, (y0, y1) in sorted(bands.items())]


def trim(img, pad=10):
    g = img.convert("L").point(lambda v: 0 if v > 235 else 255)
    box = g.getbbox()
    if not box:
        return None
    x0, y0, x1, y1 = box
    return img.crop((max(0, x0 - pad), max(0, y0 - pad), min(img.width, x1 + pad), min(img.height, y1 + pad)))


def vtrim(img, pad=8):
    g = img.convert("L").point(lambda v: 0 if v > 235 else 255)
    box = g.getbbox()
    if not box:
        return None
    return img.crop((0, max(0, box[1] - pad), img.width, min(img.height, box[3] + pad)))


def cut(pdf, tag, bands, out):
    parts = []
    for p, y0, y1 in bands:
        img = render(pdf, tag, p)
        c = vtrim(img.crop((int(X0 * S), int(max(TOP_Y - 6, y0) * S), int(RIGHT_EDGE.get(tag, X1) * S), int(y1 * S))))
        if c is not None:
            parts.append(c)
    if not parts:
        return None
    W = max(c.width for c in parts)
    H = sum(c.height for c in parts) + 14 * (len(parts) - 1)
    canvas = Image.new("RGB", (W, H), "white")
    y = 0
    for c in parts:
        canvas.paste(c, (0, y)); y += c.height + 14
    canvas = trim(canvas)   # one horizontal trim for all slices keeps code indentation aligned
    os.makedirs(os.path.dirname(out), exist_ok=True)
    canvas.save(out, optimize=True)
    return os.path.relpath(out, ROOT)


def main(tags):
    manifest_path = os.path.join(ROOT, "build", "manifest.json")
    manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
    for tag in tags:
        pdf = os.path.join(EXAMS, SOURCES[tag])
        lines = lines_of(pdf, tag)
        classify(lines)
        qs = segment(lines)
        entry = []
        for q in qs:
            base = os.path.join(IMAGES, tag, f"q{q['q']}")
            rec = {"q": q["q"], "title": q["title"],
                   "stem": cut(pdf, tag, spans(lines, q["stem"]), base + "-stem.png"), "items": []}
            for it in q["items"]:
                ib = f"{base}.{it['item']}"
                rec["items"].append({
                    "item": it["item"], "pts": it["pts"], "bonus": it["bonus"],
                    "first": lines[[i for i in it["q"] if lines[i]["kind"] == "anchor"][0]]["text"][:140],
                    "q": cut(pdf, tag, OVERRIDES.get((tag, q["q"], it["item"]), {}).get("q") or spans(lines, it["q"]), ib + "-q.png"),
                    "sol": cut(pdf, tag, OVERRIDES.get((tag, q["q"], it["item"]), {}).get("sol") or spans(lines, it["sol"]), ib + "-sol.png"),
                })
            entry.append(rec)
        manifest[tag] = entry
        print(tag, [(q["q"], [(i["item"], i["pts"]) for i in q["items"]]) for q in entry])
    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    json.dump(manifest, open(manifest_path, "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main(sys.argv[1:] or list(SOURCES))
