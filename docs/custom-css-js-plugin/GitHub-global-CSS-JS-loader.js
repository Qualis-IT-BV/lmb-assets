/*
 * La Maison Bossché - Global CSS & JS Loader
 * Build: 2026.01.18-02
 * Purpose: Load global.css and global.js from GitHub CDN
 * 
 * Note: Update RELEASE_VERSION when creating a new release
 *       (version changes alone do not require build increment)
 */

(function () {

    // =============================
    // 🎯 RELEASE VERSION
    // =============================
    // Update this value when creating a release (commit hash, version tag, or branch)
    // Examples: 'c3a986d', 'v1.0.0', 'main'
    var RELEASE_VERSION = 'main';

    // =============================
    // 🔧 LOADER LOGIC (niet aanpassen)
    // =============================
    
    var BASE_URL = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@';
    var url = BASE_URL + encodeURIComponent(RELEASE_VERSION) + '/assets/';
    
    // Stel versie beschikbaar voor global.js
    window.LMB_LOADER_VERSION = RELEASE_VERSION;
    
    console.log('[LMB Loader] Loading from:', RELEASE_VERSION);
    
    // Load global.css
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url + 'css/global.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    console.log('[LMB Loader] CSS loaded: global.css');
    
    // Load global.js
    var script = document.createElement('script');
    script.src = url + 'js/global.js';
    script.defer = true;
    script.crossOrigin = 'anonymous';
    (document.head || document.documentElement).appendChild(script);
    console.log('[LMB Loader] JS loaded: global.js');

})();
