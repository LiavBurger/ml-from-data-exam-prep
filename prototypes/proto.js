// Shared helpers for the format prototypes: theme (same key as the site), KaTeX auto-render, reveal buttons.
(function () {
  var THEME_KEY = "ml_examc_v1_theme";
  try { var th = localStorage.getItem(THEME_KEY); if (th) document.documentElement.dataset.theme = th; } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    if (window.renderMathInElement) renderMathInElement(document.body, {
      delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }],
      throwOnError: false,
    });

    var tb = document.getElementById("theme");
    if (tb) {
      var label = function () { tb.textContent = document.documentElement.dataset.theme === "light" ? "Dark mode" : "Light mode"; };
      label();
      tb.addEventListener("click", function () {
        var cur = document.documentElement.dataset.theme || "dark";
        document.documentElement.dataset.theme = cur === "dark" ? "light" : "dark";
        try { localStorage.setItem(THEME_KEY, document.documentElement.dataset.theme); } catch (e) {}
        label();
      });
    }

    // <button data-reveal="id"> shows the element with that id and hides itself
    document.querySelectorAll("[data-reveal]").forEach(function (btn) {
      btn.addEventListener("click", function () { window.protoReveal(btn); });
    });
  });

  window.protoReveal = function (btn) {
    var t = document.getElementById(btn.dataset.reveal);
    if (!t) return false;
    t.hidden = false;
    btn.hidden = true;
    return true;
  };
})();
