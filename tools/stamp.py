#!/usr/bin/env python3
"""Cache-bust: append ?v=<content hash> to every local css/js reference in index.html.
Run before each deploy so browsers (and GitHub Pages' CDN) fetch the new files."""
import hashlib, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "index.html"); html = open(p).read()
def stamp(m):
    attr, path = m.group(1), m.group(2)
    f = os.path.join(ROOT, path)
    if not os.path.exists(f):
        return m.group(0)
    h = hashlib.sha1(open(f, "rb").read()).hexdigest()[:8]
    return f'{attr}="{path}?v={h}"'
html = re.sub(r'(src|href)="((?:css|js|data|vendor)/[^"?]+)(?:\?v=[^"]*)?"', stamp, html)
open(p, "w").write(html); print(html.count("?v="), "references stamped")
