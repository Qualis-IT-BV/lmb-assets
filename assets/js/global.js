/* Project: q-githooks
 * Component: global.js
 * Build: dev-20260125.005
 * First Release: 2026-01-19
 * Last Change: -
 * Source: New
 * 
 * Project: q-githooks
 * 
 * Purpose: testing
 * 
 */


// Wishlist functionaliteit laden


//Regel toegeovoegd om wijzigng te forceren.
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
	
	var script = document.createElement('script');
	script.src = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + branch + '/assets/js/components/Wishlist.js';
	script.async = false;
	document.head.appendChild(script);
})();

