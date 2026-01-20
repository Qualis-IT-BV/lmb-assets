/* Project: La Maison Bossché
 * Component: Wishlist Debug Commands
 * Build: dev-20260120.001
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: Extracted from Wishlist.js override (debug only)
 */

(function() {
  // Zorg dat logger beschikbaar is
  var logger = window.LMB ? window.LMB.createLogger('WishlistDebug') : { info:console.log, error:console.error, warn:console.warn };
  function log(level, message, data) {
    if (logger && typeof logger[level] === 'function') {
      logger[level](message, data || '');
    }
  }

  // Testfunctie: handmatig wishlist-fetch triggeren
  window.LMB_testWishlistFetch = function() {
    log('info', '[TEST] Handmatige fetch naar /wishlist/ gestart');
    return fetch('/wishlist/', { credentials: 'same-origin' })
      .then(function(res) {
        log('info', '[TEST] fetch response status: ' + res.status);
        return res.text();
      })
      .then(function(html) {
        log('info', '[TEST] fetch klaar, lengte HTML: ' + (html ? html.length : 0));
        return html;
      })
      .catch(function(e) {
        log('error', '[TEST] fetch error', e);
      });
  };

  // Testfunctie: handmatig fetch + UI-update
  window.LMB_testWishlistUIUpdate = function() {
    log('info', '[TEST] Handmatige fetch+UI-update gestart');
    return fetch('/wishlist/', { credentials: 'same-origin' })
      .then(function(res) {
        log('info', '[TEST] fetch response status: ' + res.status);
        return res.text();
      })
      .then(function(html) {
        log('info', '[TEST] fetch klaar, lengte HTML: ' + (html ? html.length : 0));
        if (typeof window.parseWishlistIdsFromHtml === 'function' && typeof window.applyWishlistState === 'function') {
          var ids = window.parseWishlistIdsFromHtml(html);
          log('info', '[TEST] UI-update met ' + Object.keys(ids).length + ' IDs');
          window.applyWishlistState(ids);
        } else {
          log('warn', '[TEST] parseWishlistIdsFromHtml/applyWishlistState niet gevonden');
        }
        return html;
      })
      .catch(function(e) {
        log('error', '[TEST] fetch+UI-update error', e);
      });
  };
})();
