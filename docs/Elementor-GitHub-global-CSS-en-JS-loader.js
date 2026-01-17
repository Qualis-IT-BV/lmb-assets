/*
 * Elementor GitHub global CSS & JS loader
 *
 * Laadt automatisch de juiste global.css en global.js vanaf GitHub (jsDelivr CDN), afhankelijk van de omgeving (dev, staging, main).
 * Dit script vervangt het handmatig toevoegen van losse CSS- en JS-bestanden in Elementor.
 *
 * Werkt voor:
 *   - test.lamaisonbossche.nl (dev)
 *   - staging.lamaisonbossche.nl (staging)
 *   - lamaisonbossche.nl (main)
 *   - en subdomeinen met dev./staging. prefix
 *
 * Plaats deze code altijd tussen <script>...</script> tags in een HTML-widget of "Aangepaste Code" in Elementor, bij voorkeur in de footer (<body> einde).
 * Je hoeft bij promotie naar een andere omgeving niets aan te passen.
 */

<script>
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
</script>
