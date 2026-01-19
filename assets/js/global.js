/* Project: La Maison Bossché
 * Component: Global Scripts
 * Build: dev-20260119.001
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: Custom development
 */

// Component loader
(function(){
	// Gebruik versie van parent loader (Global Loader of Testing Script)
	var version = window.LMB_LOADER_VERSION;
	
	if (!version) {
		console.warn(
			'[LMB Components] WARNING: window.LMB_LOADER_VERSION is not set!\n\n' +
			'global.js wordt bij voorkeur geladen via:\n' +
			'1. GitHub-global-CSS-JS-loader.js (productie), OF\n' +
			'2. GitHub-CSS-JS-Testing|Verification.js (testing)\n\n' +
			'Terugvallen op hostname detection...'
		);
		
		// Fallback: detecteer branch op basis van hostname
		var host = window.location.hostname;
		if (host === 'test.lamaisonbossche.nl') {
			version = 'test';
		} else if (host.indexOf('dev.') === 0) {
			version = 'dev';
		} else if (host === 'staging.lamaisonbossche.nl' || host.indexOf('staging.') === 0) {
			version = 'staging';
		} else {
			version = 'main';  // Default voor onbekende hostnames
		}
		
		console.warn('[LMB Components] Fallback actief - hostname detection gebruikt:', version);
	}
	
	var baseUrl = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + version + '/assets/';
	console.log('[LMB Components] Loading components from:', version);
	
	// CSS Components laden
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
	var jsComponents = [
		'js/components/Wishlist.js'
	];
	
	jsComponents.forEach(function(file) {
		var script = document.createElement('script');
		script.src = baseUrl + file;
		script.async = false;
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);
	});
})();

