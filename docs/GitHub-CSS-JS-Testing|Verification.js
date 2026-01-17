/*
 * Build: 2026.01.17-06
 * Purpose: Toggle loading of any asset in /assets (excl. cdn.jsdelivr.net) from GitHub CDN
 */

(function () {

    // 🔀 Branch waarmee je wilt testen (exacte GitHub branchnaam)
    var BRANCH = 'feature/migrate-blocksy-assets-20260116';

    // 🧪 Globale kill switch (alles uit)
    var ENABLE_SCRIPT = true;

    // 🎛️ Per-bestand toggles (relatief vanaf /assets/)
    var ASSETS = {
        'css/blocksy-extra.css': true,
        'css/global.css': false,
        'js/global.js': false,
        'js/components/Wishlist.js': true,
        'Legacy/Custom-CSS-JS-Plugin/Wishlist Image-Overlay-Scripts.js': false,
        'Legacy/Custom-CSS-JS-Plugin/Wishlist-Click-Behavior.js': false,
        'Legacy/Custom-CSS-JS-Plugin/Wishlist-Popup-Timing.js': false,
        // Voeg hier meer assets toe, bijv.:
        // 'js/components/Anders.js': false,
        
        
    };

    // Niet meenemen: assets/cdn.jsdelivr.net/...
    var EXCLUDE_PREFIX = 'cdn.jsdelivr.net/';

    /* =========================
       INTERNALS (niet aanpassen)
       ========================= */

    if (!ENABLE_SCRIPT) return;

    var BASE_URL = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@';
    var ENCODED_BRANCH = encodeURIComponent(BRANCH);

    function injectAsset(relPath) {
        var url = BASE_URL + ENCODED_BRANCH + '/assets/' + relPath;
        if (relPath.endsWith('.css')) {
            var css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = url;
            css.crossOrigin = 'anonymous';
            document.head.appendChild(css);
        } else if (relPath.endsWith('.js')) {
            var s = document.createElement('script');
            s.src = url;
            s.defer = true;
            s.crossOrigin = 'anonymous';
            (document.head || document.documentElement).appendChild(s);
        }
    }

    function inject() {
        for (var relPath in ASSETS) {
            if (
                ASSETS[relPath] &&
                relPath.indexOf(EXCLUDE_PREFIX) !== 0 // skip cdn.jsdelivr.net
            ) {
                injectAsset(relPath);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }

})();