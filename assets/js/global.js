/* Project: La Maison Bossché
 * Component: Global Scripts
 * Build: dev-20260120.002
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: Custom development
 */

// Component loader
// Loads all CSS and JS components
(function(){
	// === Versie/commit info ophalen ===
	var loaderVersion = (window.LMB_LOADER_VERSION || (window.LMB_TEST_CONFIG && window.LMB_TEST_CONFIG.version) || 'dev');
	var logger = window.LMB ? window.LMB.createLogger('Components') : null;
	if (logger) {
		logger.info('Component initialized (Build/Version): ' + loaderVersion);
	}
	// Gebruik versie van parent loader (Global Loader of Testing Script)
	var version = window.LMB_LOADER_VERSION;
	
	if (!version) {
		if (logger) {
			logger.warn('WARNING: window.LMB_LOADER_VERSION is not set! global.js should preferably be loaded via loader.js (production) of debugger.js (testing). Falling back to hostname detection...');
		}
		// Fallback: detecteer branch op basis van hostname
		var host = window.location.hostname;
		if (host === 'test.lamaisonbossche.nl') {
			version = 'test';
		} else if (host.indexOf('dev.') === 0) {
			version = 'dev';
		} else if (host === 'staging.lamaisonbossche.nl' || host.indexOf('staging.') === 0) {
			version = 'staging';
		} else {
			version = 'main';  // Default for unknown hostnames
		}
		if (logger) {
			logger.warn('Fallback active - using hostname detection: ' + version);
		}
	}
	
	var baseUrl = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + version + '/assets/';
	if (logger) {
		logger.info('Loading components from: ' + version);
	}
	
	// CSS Components laden
	// Keep this list in sync with assets/css/components/**/*.css
	var cssComponents = [
		'css/components/blocksy-extra.css'
	];
	
	cssComponents.forEach(function(file) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = baseUrl + file;
		link.crossOrigin = 'anonymous';
		document.head.appendChild(link);
	});
	
	// JS Components laden
	// Keep this list in sync with assets/js/components/**/*.js
	var jsComponents = [
		'js/components/wishlist.js'
	];
	
	jsComponents.forEach(function(file) {
		var script = document.createElement('script');
		script.src = baseUrl + file;
		script.async = false;
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);
	});
})();

