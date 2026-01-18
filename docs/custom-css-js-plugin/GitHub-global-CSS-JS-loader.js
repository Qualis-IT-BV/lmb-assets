/*
 * La Maison Bossché - Global CSS & JS Loader
 * Build: 2026.01.18-02
 * Purpose: Load CSS & JS from GitHub CDN per environment
 */

(function () {

    // =============================
    // 🎛️ CONFIGURATIE PER OMGEVING
    // =============================
    
    var ENV = 'dev'; // 'dev', 'staging', of 'prod'
    
    var CONFIG = {
        dev: {
            // Gebruik COMMIT HASH voor betrouwbare cache-busting
            ref: 'e17808e933dc5a66d249f9da4e2a7509a27dac57',
            // Of gebruik branch (trager, cache issues):
            // ref: 'dev',
            
            assets: {
                css: ['css/global.css', 'css/blocksy-extra.css'],
                js: ['js/global.js', 'js/components/Wishlist.js']
            }
        },
        
        staging: {
            ref: 'staging', // of commit hash
            assets: {
                css: ['css/global.css', 'css/blocksy-extra.css'],
                js: ['js/global.js', 'js/components/Wishlist.js']
            }
        },
        
        prod: {
            ref: 'main', // of commit hash van laatste release
            assets: {
                css: ['css/global.css', 'css/blocksy-extra.css'],
                js: ['js/global.js', 'js/components/Wishlist.js']
            }
        }
    };

    // =============================
    // 🔧 LOADER LOGIC (niet aanpassen)
    // =============================
    
    var config = CONFIG[ENV];
    if (!config) {
        console.error('[LMB Loader] Invalid ENV:', ENV);
        return;
    }
    
    var BASE_URL = 'https://cdn.jsdelivr.net/gh/Qualis-IT-BV/lmb-assets@';
    var url = BASE_URL + encodeURIComponent(config.ref) + '/assets/';
    
    console.log('[LMB Loader] Environment:', ENV, '| Ref:', config.ref);
    
    // Load CSS
    if (config.assets.css) {
        config.assets.css.forEach(function(file) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url + file;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
            console.log('[LMB Loader] CSS loaded:', file);
        });
    }
    
    // Load JS
    if (config.assets.js) {
        config.assets.js.forEach(function(file) {
            var script = document.createElement('script');
            script.src = url + file;
            script.defer = true;
            script.crossOrigin = 'anonymous';
            (document.head || document.documentElement).appendChild(script);
            console.log('[LMB Loader] JS loaded:', file);
        });
    }

})();
