/* Project: La Maison Bossché
 * Component: GitHub Global CSS & JS Loader
 * Build: dev-20260120.001
 * First Release: lmb-assets 0.0.2 (2026-01-18)
 * Last Change: -
 * Source: Renamed and moved from docs/custom-css-js-plugin/GitHub-global-CSS-JS-loader.js
 * 
 * Purpose: Load global.js from GitHub CDN (which loads all CSS/JS components)
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
    var RELEASE_VERSION = '3a540cf';
    // =============================

	
	
	
	
	
	
    // =============================
    // 🔧 LOADER LOGIC (niet aanpassen)
    // =============================

    
    var BASE_URL = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@';
    var url = BASE_URL + encodeURIComponent(RELEASE_VERSION) + '/assets/';
    
    // Stel versie beschikbaar voor global.js
    window.LMB_LOADER_VERSION = RELEASE_VERSION;
    
    console.log('[LMB Loader] Loading version:', RELEASE_VERSION);
    
    // Load global.js (which loads all CSS and JS components)
    var script = document.createElement('script');
    script.src = url + 'js/global.js';
    script.defer = true;
    script.crossOrigin = 'anonymous';
    (document.head || document.documentElement).appendChild(script);

})();
