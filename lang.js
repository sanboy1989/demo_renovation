/* ============================================================
   Pinnacle Renovations — Language Switch
   Toggles html.lang-zh class; CSS handles visibility.
   Preference saved to localStorage.
   ============================================================ */
(function () {
  var KEY = 'pinnacle-lang';

  function applyLang(lang) {
    var html = document.documentElement;
    html.classList.toggle('lang-zh', lang === 'zh');
    html.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');

    /* Sync all toggle buttons on the page */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* Swap <option> text (can't nest spans inside option) */
    document.querySelectorAll('option[data-en]').forEach(function (opt) {
      opt.textContent = lang === 'zh' ? opt.dataset.zh : opt.dataset.en;
    });

    try { localStorage.setItem(KEY, lang); } catch (e) { }
  }

  function init() {
    var saved;
    try { saved = localStorage.getItem(KEY); } catch (e) { }
    applyLang(saved || 'en');

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.dataset.lang); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
