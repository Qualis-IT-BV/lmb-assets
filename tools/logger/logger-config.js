/* Project: LMB Assets
 * Component: Logger Config
 * Build: dev-20260201.002
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: Custom development
 *
 * Purpose:
 * Simple asset + logging configuration for 5066.js and logger.js.
 * - Keep a human-readable list of assets at the top.
 * - Parse into window.LMB_TEST_CONFIG + window.LMB_LOG_CONFIG.
 */

(function () {
  'use strict';

  // ============================================================================
  // 1) SIMPLE CONFIG LIST (edit only this section)
  // Format per line (CSV-like):
  //   '<repo-relative-path>', <enabled TRUE/FALSE>, <loglevel DEBUG/INFO/WARN/ERROR/SILENT>
  //
  // Notes:
  // - Paths MUST be repo-relative (start with /assets/...)
  // - For CSS: loglevel is mainly for reporting (CSS has no "component logger")
  // - For JS: loglevel maps to the component name inferred from filename by default
  // ============================================================================

  var ASSETS = [
    // CSS to load
    "/assets/css/blocksy-extra.css", true, "INFO",
    //"/assets/css/wishlist.css",      true, "INFO",

    // JS scripts to load
    "/assets/js/components/wishlist.js", true, "DEBUG"
    //"/assets/js/components/HEARTS.js",   true, "DEBUG"
  ];

  // ============================================================================
  // 2) INTERPRETER (no need to edit below unless you want extra behavior)
  // ============================================================================

  function normalizeBool(v) { return v === true || v === 'TRUE' || v === 'true' || v === 1; }

  function inferType(path) {
    if (/\.css(\?|$)/i.test(path)) return 'css';
    if (/\.js(\?|$)/i.test(path)) return 'js';
    return 'unknown';
  }

  function inferComponentName(path) {
    // /assets/js/components/Wishlist.js => Wishlist
    var m = (path || '').match(/\/([^\/]+)\.js(\?|$)/i);
    return m ? m[1] : 'unknown';
  }

  function normalizeLevel(level) {
    var s = String(level || '').toUpperCase();
    if (s === 'DEBUG' || s === 'INFO' || s === 'WARN' || s === 'ERROR' || s === 'SILENT') return s;
    return 'INFO';
  }

  // Build LMB_TEST_CONFIG.assets and LMB_LOG_CONFIG
  var assetsOut = [];
  var logConfig = window.LMB_LOG_CONFIG || {};
  if (!logConfig.default) logConfig.default = 'INFO';

  for (var i = 0; i < ASSETS.length; i += 3) {
    var path = ASSETS[i];
    var enabled = normalizeBool(ASSETS[i + 1]);
    var level = normalizeLevel(ASSETS[i + 2]);

    var type = inferType(path);
    if (type === 'unknown') continue;

    var component = (type === 'js') ? inferComponentName(path) : null;

    assetsOut.push({
      path: path,
      enabled: enabled,
      type: type,
      // hints for loader (5066.js may respect these)
      defer: (type === 'js'),
      level: level,
      component: component
    });

    // For JS assets: apply per-component log level automatically
    if (type === 'js' && component) {
      logConfig[component] = level;
    }
  }

  // Expose configs
  window.LMB_LOG_CONFIG = logConfig;

  // This is the only thing 5066.js needs to read for assets:
  window.LMB_TEST_CONFIG = window.LMB_TEST_CONFIG || {};
  window.LMB_TEST_CONFIG.assets = assetsOut;

  // Optional: quick console confirmation (won't break if logger not loaded yet)
  try {
    if (window.LMB && typeof window.LMB.createLogger === 'function') {
      var l = window.LMB.createLogger('Logger');
      l.info('logger-config.js parsed', {
        assetsEnabled: assetsOut.filter(function (a) { return a.enabled; }).map(function (a) { return a.path; }),
        logConfig: window.LMB_LOG_CONFIG
      });
    } else {
      // Minimal fallback trace
      console.log('[LMB] logger-config.js parsed', assetsOut);
    }
  } catch (e) {}
})();
