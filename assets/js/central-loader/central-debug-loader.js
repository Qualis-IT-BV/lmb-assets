


(function () {

    // 🧪 Globale kill switch (alles uit)
    var ENABLE_SCRIPT = true;
    
    // 🎯 Override: Voer hier een commit-hash, branch of version in om logger-config.js te overschrijven
    // Voorbeelden: '8a3f2c1', 'feature/my-branch', 'main', 'v1.2.0'
    // Laat leeg (null) om logger-config.js waarde te gebruiken
    var OVERRIDE_COMMIT = '80b92ff';
    
    // 🔀 USE GLOBAL MODE
    // true: Laad alleen global.js (inclusief alle componenten) met algemeen loglevel
    // false: Gebruik specifieke assets en loglevels uit logger-config.js
    var USE_GLOBAL = false;
    
    // 📊 Loglevel voor USE_GLOBAL mode
    // Levels: DEBUG, INFO, WARN, ERROR, SILENT
    var GLOBAL_LOGLEVEL = 'INFO';
    
    if (!ENABLE_SCRIPT) return;
    
    var BRANCH = OVERRIDE_COMMIT || 'dev';
    
    // USE_GLOBAL mode: skip config loading, use hardcoded values
    if (USE_GLOBAL) {
        console.info('[LMB Debugger] USE_GLOBAL mode - Loading global.js with loglevel:', GLOBAL_LOGLEVEL);
        
        var LOG_CONFIG = {
            default: GLOBAL_LOGLEVEL
        };
        
        var ASSETS = {
            'js/global.js': true
        };
        
        executeDebugger(BRANCH, LOG_CONFIG, ASSETS);
        return;
    }
    
    // Config mode: laad logger-config.js vanaf GitHub
    function loadConfig(callback, errorCallback) {
        var CONFIG_URL = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + 
                         encodeURIComponent(OVERRIDE_COMMIT || 'dev') + 
                         '/tools/logger/logger-config.js';
        
        console.log('[LMB Debugger] Loading config from:', CONFIG_URL);
        
        var script = document.createElement('script');
        script.src = CONFIG_URL;
        script.crossOrigin = 'anonymous';
        
        var timeout = setTimeout(function() {
            errorCallback('Timeout: logger-config.js could not be loaded after 10 seconds');
        }, 10000);
        
        script.onload = function() {
            clearTimeout(timeout);
            if (window.LMB_TEST_CONFIG) {
                console.log('[LMB Debugger] Config loaded successfully');
                callback();
            } else {
                errorCallback('logger-config.js loaded, but window.LMB_TEST_CONFIG is not defined');
            }
        };
        
        script.onerror = function() {
            clearTimeout(timeout);
            errorCallback('Error loading logger-config.js from ' + CONFIG_URL);
        };
        
        document.head.appendChild(script);
    }
    
    loadConfig(function() {
        var config = window.LMB_TEST_CONFIG;
        console.info('[LMB Debugger] Config mode - Using logger-config.js settings');
        executeDebugger(BRANCH, config.logConfig, config.assets);
    }, function(errorMessage) {
        console.error('[LMB Debugger] ERROR:', errorMessage);
        console.error('[LMB Debugger] Script not executed. Check if logger-config.js exists on GitHub.');
    });
    
    // Main execution function
    function executeDebugger(branch, logConfig, assets) {
        // Niet meenemen: assets/cdn.jsdelivr.net/...
        var EXCLUDE_PREFIX = 'cdn.jsdelivr.net/';

        // INFO melding dat script actief is
        console.info('[LMB Debugger] ACTIVE - Loading from commit:', branch);

        // Stel versie en log configuratie in VOOR het laden van scripts
        window.LMB_LOADER_VERSION = branch;
        window.LMB_LOG_CONFIG = logConfig;

        var BASE_URL = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@';
        var ENCODED_BRANCH = encodeURIComponent(branch);
        
        // Count assets for group label
        var assetCount = 0;
        for (var relPath in assets) {
            if (assets[relPath] && relPath.indexOf(EXCLUDE_PREFIX) !== 0) {
                assetCount++;
            }
        }

        function injectAsset(relPath) {
            var url = BASE_URL + ENCODED_BRANCH + '/assets/' + relPath;
            var startTime = performance.now();
            var type = relPath.endsWith('.css') ? 'CSS' : 'JS';
            
            console.log('[LMB Debugger] → ' + type + ': ' + relPath);
            
            if (relPath.endsWith('.css')) {
                var css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = url;
                css.crossOrigin = 'anonymous';
                
                css.onload = function() {
                    var loadTime = Math.round(performance.now() - startTime);
                    console.log('[LMB Debugger] ✓ CSS loaded: ' + relPath + ' (' + loadTime + 'ms)');
                };
                
                css.onerror = function() {
                    console.error('[LMB Debugger] ✗ CSS failed: ' + relPath + ' - Check if file exists on GitHub');
                };
                
                document.head.appendChild(css);
            } else if (relPath.endsWith('.js')) {
                var s = document.createElement('script');
                s.src = url;
                s.defer = true;
                s.crossOrigin = 'anonymous';
                
                s.onload = function() {
                    var loadTime = Math.round(performance.now() - startTime);
                    console.log('[LMB Debugger] ✓ JS loaded: ' + relPath + ' (' + loadTime + 'ms)');
                };
                
                s.onerror = function() {
                    console.error('[LMB Debugger] ✗ JS failed: ' + relPath + ' - Check if file exists on GitHub');
                };
                
                (document.head || document.documentElement).appendChild(s);
            }
        }

        function inject() {
            console.groupCollapsed('[LMB Debugger] Loading ' + assetCount + ' assets from: ' + branch);
            
            for (var relPath in assets) {
                if (
                    assets[relPath] &&
                    relPath.indexOf(EXCLUDE_PREFIX) !== 0 // skip cdn.jsdelivr.net
                ) {
                    injectAsset(relPath);
                }
            }
            
            console.groupEnd();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', inject);
        } else {
            inject();
        }
    }

})();