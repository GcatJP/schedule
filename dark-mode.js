(function () {
  var STORAGE_KEY = "ai-dark-mode";
  var BACKGROUND_TAGS = ["BODY", "HTML", "MAIN", "HEADER", "NAV"];

  function setDarkMode(on) {
    document.documentElement.classList.toggle("dark-mode", on);
  }

  // Apply saved preference immediately (before paint) to avoid a flash.
  setDarkMode(localStorage.getItem(STORAGE_KEY) === "1");

  // Inject the dark mode styling once. Uses a filter so it works without
  // touching every hardcoded color across the app's files.
  var style = document.createElement("style");
  style.textContent =
    "html.dark-mode {" +
    "  filter: invert(1) hue-rotate(180deg);" +
    "  transition: filter 0.2s ease;" +
    "}" +
    "html.dark-mode img," +
    "html.dark-mode video {" +
    "  filter: invert(1) hue-rotate(180deg);" +
    "}";
  document.head.appendChild(style);

  // Keep pages in sync if dark mode is toggled on another open tab.
  window.addEventListener("storage", function (e) {
    if (e.key === STORAGE_KEY) setDarkMode(e.newValue === "1");
  });

  document.addEventListener("dblclick", function (e) {
    // Only toggle when double-clicking open background —
    // not a button, card, chip, or other piece of content.
    if (BACKGROUND_TAGS.indexOf(e.target.tagName) === -1) return;
    var isDark = !document.documentElement.classList.contains("dark-mode");
    setDarkMode(isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "1" : "0");
  });
})();