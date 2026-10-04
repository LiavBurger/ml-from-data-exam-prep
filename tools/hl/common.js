// shared: launch headless chromium against the local server (python3 -m http.server $PORT in StudySite, default 8767)
const { chromium } = require('playwright-core');
const PORT = process.env.PORT || 8767;
const BASE = `http://localhost:${PORT}/`;
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-linux64/chrome-headless-shell';
async function open(width = 950) {
  const b = await chromium.launch({ executablePath: EXE });
  const page = await b.newPage({ viewport: { width, height: 1000 } });
  return { b, page };
}
async function goto(page, hash) { await page.goto(BASE + '?x=' + Date.now() + hash); await page.waitForTimeout(1200); }
// reveal every step of a walk and open every collapsible box in it
async function revealAll(page, pid) {
  return page.evaluate((pid) => { const w = document.querySelector(`[data-pid="${pid}"]`); if (!w) return false;
    w.querySelectorAll('li[hidden]').forEach(l => l.hidden = false); w.querySelectorAll('details').forEach(d => d.open = true); return true; }, pid);
}
module.exports = { open, goto, revealAll, BASE };
