
/*
 * GitHub Global CSS & JS Loader
 * Version: 1.0
 * Last Change: 2026-01-18
 *
 * Purpose:
 * Automatically loads global.css and global.js from GitHub CDN (jsDelivr) based on environment.
 * Eliminates manual CSS/JS file management when deploying between environments.
 *
 * Environment Detection:
 *   - dev.lamaisonbossche.nl / test.lamaisonbossche.nl → dev branch
 *   - staging.lamaisonbossche.nl → staging branch
 *   - lamaisonbossche.nl → main branch
 *
 * Usage:
 * 1. Add this script to Custom CSS & JS Plugin (Footer, <body> end)
 * 2. Enable when deploying to dev/staging/production environments
 * 3. No configuration needed - automatically detects environment
 * 4. Disable GitHub-CSS-JS-Testing|Verification.js when using this loader
 *
 * Note: This is the primary loader for normal operations (dev/staging/production)
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
