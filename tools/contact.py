#!/usr/bin/env python3
"""QA helper: stack the cut images of one exam question into a single labelled sheet.
Usage: python3 tools/contact.py 2026B 3  ->  build/qa-2026B-q3.png"""
import glob, os, sys
from PIL import Image, ImageDraw
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tag, q = sys.argv[1], sys.argv[2]
files = [f"{ROOT}/images/{tag}/q{q}-stem.png"] + sorted(
    glob.glob(f"{ROOT}/images/{tag}/q{q}.*-*.png"),
    key=lambda f: (int(os.path.basename(f).split(".")[1].split("-")[0]), "-sol" in f))
ims = [(os.path.basename(f), Image.open(f)) for f in files if os.path.exists(f)]
W = max(i.width for _, i in ims); H = sum(i.height + 40 for _, i in ims)
c = Image.new("RGB", (W, H), "#ddd"); d = ImageDraw.Draw(c); y = 0
for name, i in ims:
    d.rectangle([0, y, W, y + 30], fill="#c00"); d.text((6, y + 8), name, fill="white"); y += 32
    c.paste(i, (0, y)); y += i.height + 8
scale = min(1.0, 1000 / W)
c = c.resize((int(W * scale), int(H * scale)))
out = f"{ROOT}/build/qa-{tag}-q{q}.png"; c.save(out); print(out, c.size)
