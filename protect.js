/* ============================================================
   PINNACLE RENOVATIONS — Copy Protection
   Disables: right-click, view-source, DevTools shortcuts,
             text selection, copy/cut, image drag
   Form fields (input / textarea / select) remain usable.
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. Disable right-click context menu ── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  /* ── 2. Block keyboard shortcuts ── */
  document.addEventListener('keydown', function (e) {
    var ctrl  = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    var key   = e.key;

    // F12 → DevTools
    if (key === 'F12') { e.preventDefault(); return; }

    if (ctrl) {
      // Ctrl+U  view source
      if (key === 'u' || key === 'U') { e.preventDefault(); return; }
      // Ctrl+S  save page
      if (key === 's' || key === 'S') { e.preventDefault(); return; }
      // Ctrl+P  print
      if (key === 'p' || key === 'P') { e.preventDefault(); return; }
      // Ctrl+Shift+I  DevTools
      if (shift && (key === 'i' || key === 'I')) { e.preventDefault(); return; }
      // Ctrl+Shift+J  DevTools console
      if (shift && (key === 'j' || key === 'J')) { e.preventDefault(); return; }
      // Ctrl+Shift+C  inspect element
      if (shift && (key === 'c' || key === 'C')) { e.preventDefault(); return; }
    }
  });

  /* ── 3. Disable copy / cut events (allow in form fields) ── */
  function isFormField(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  }

  document.addEventListener('copy', function (e) {
    if (isFormField(document.activeElement)) return;
    e.preventDefault();
  });

  document.addEventListener('cut', function (e) {
    if (isFormField(document.activeElement)) return;
    e.preventDefault();
  });

  /* ── 4. Disable text selection via CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '* {',
    '  -webkit-user-select: none !important;',
    '  -moz-user-select: none !important;',
    '  -ms-user-select: none !important;',
    '  user-select: none !important;',
    '}',
    'input, textarea, select {',
    '  -webkit-user-select: text !important;',
    '  -moz-user-select: text !important;',
    '  -ms-user-select: text !important;',
    '  user-select: text !important;',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── 5. Disable image / element drag ── */
  document.addEventListener('dragstart', function (e) {
    if (!isFormField(e.target)) {
      e.preventDefault();
    }
  });

  /* ── 6. Clear console to reduce curiosity ── */
  setInterval(function () {
    console.clear();
  }, 1000);

})();
