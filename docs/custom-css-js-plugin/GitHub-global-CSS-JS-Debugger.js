/*
 * La Maison Bossché - Global CSS & JS Debugger
 * Version: 1.2
 * Last Change: 2026-01-19
 * 
 * Purpose: 
 * Test specific feature branch assets directly from GitHub CDN without deploying.
 * Loads configuration from logger-config.js for easy updates.
 * 
 * Usage:
 * 1. Update logger-config.js with commit hash and assets to test
 * 2. Keep ENABLE_SCRIPT = true while testing
 * 3. DISABLE this script when merging to dev/staging/main branches
 * 
 * Note: Excludes cdn.jsdelivr.net/ overrides (managed via Chrome DevTools)
 */

(function () {

    // 🧪 Globale kill switch (alles uit)
    var ENABLE_SCRIPT = true;
    
    // 🎯 Override: Voer hier een commit-hash, branch of version in om logger-config.js te overschrijven
    // Voorbeelden: '8a3f2c1', 'feature/my-branch', 'main', 'v1.2.0'
    // Laat leeg (null) om logger-config.js waarde te gebruiken
    var OVERRIDE_COMMIT = 'dev';
    
    if (!ENABLE_SCRIPT) return;
    
    // Wacht tot logger-config.js is geladen
    function waitForConfig(callback) {
        if (window.LMB_TEST_CONFIG) {
            callback();
        } else {
            setTimeout(function() { waitForConfig(callback); }, 50);
        }
    }
    
    waitForConfig(function() {
        var config = window.LMB_TEST_CONFIG;
        var BRANCH = OVERRIDE_COMMIT || config.commit;
        var LOG_CONFIG = config.logConfig;
        var ASSETS = config.assets;

        // Niet meenemen: assets/cdn.jsdelivr.net/...
        var EXCLUDE_PREFIX = 'cdn.jsdelivr.net/';

        // INFO melding dat script actief is
        console.info('[LMB Test] ACTIVE - Loading from commit:', BRANCH);

        // Stel versie en log configuratie in VOOR het laden van scripts
        window.LMB_LOADER_VERSION = BRANCH;
        window.LMB_LOG_CONFIG = LOG_CONFIG;

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
    });

})();