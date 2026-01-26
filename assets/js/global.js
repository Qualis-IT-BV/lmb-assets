/* Project: La Maison Bossché
 * Version: 0.0.1
 * Build: dev-20260116.003
 */

// Wishlist functionaliteit laden
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

