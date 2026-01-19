/* Project: La Maison Bossché
 * Component: Global Scripts
 * Build: dev-20260119.001
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: Custom development
 */

// Omgeving detectie
(function(){
	var host = window.location.hostname;
	var branch;
	if (host === 'test.lamaisonbossche.nl' || host.indexOf('dev.') === 0) {
		branch = 'dev';
	} else if (host === 'staging.lamaisonbossche.nl' || host.indexOf('staging.') === 0) {
		branch = 'staging';
	} else {
		branch = 'main';
	}
	
	var baseUrl = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + branch + '/assets/';
	
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

