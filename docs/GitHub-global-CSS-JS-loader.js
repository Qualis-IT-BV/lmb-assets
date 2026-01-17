
/*
 * GitHub global CSS & JS loader
 * Version: 0.0.1
 * Build: feature-20260117.001
 *
 * Laadt automatisch de juiste global.css en global.js vanaf GitHub (jsDelivr CDN), afhankelijk van de omgeving (dev, test, staging, main).
 * Dit script vervangt het handmatig aanpassen en toevoegen van losse CSS- en JS-bestanden.
 *
 * Werkt voor:
 *   - dev.lamaisonbossche.nl (dev)
 *   - test.lamaisonbossche.nl (test)
 *   - staging.lamaisonbossche.nl (staging)
 *   - lamaisonbossche.nl (main)
 *
 * Plaats deze code "Custom CSS & JS Plugin" in de footer (<body> einde).
 * Je hoeft bij promotie naar een andere omgeving niets aan te passen.
 */

(function () {
	var host = window.location.hostname;
	var branch;
	if (host === 'test.lamaisonbossche.nl' || host.indexOf('dev.') === 0) {
		branch = 'dev';
	} else if (host === 'staging.lamaisonbossche.nl' || host.indexOf('staging.') === 0) {
		branch = 'staging';
	} else {
		branch = 'main';
	}

	// CSS laden
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + branch + '/css/global.css';
	css.crossOrigin = 'anonymous';
	document.head.appendChild(css);

	// JS laden
	var s = document.createElement('script');
	s.src = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@' + branch + '/js/global.js';
	s.defer = true;
	s.crossOrigin = 'anonymous';
	document.body.appendChild(s);
})();
