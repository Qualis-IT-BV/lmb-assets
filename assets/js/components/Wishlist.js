/* Project: La Maison Bossché
 * Component: Wishlist
 * Build: dev-20260118.004
 * Source: Custom CSS & JS plugin migratie (alfa release v.0.0.1)
 */

// =============================
// La Maison Bossché – Wishlist Click Behavior
// =============================
(function () {
  var VERSION = null; // Set to 'X.Y.Z' for releases
  var BUILD = 'dev-20260118.004';
  var logger = window.LMB ? window.LMB.createLogger('Wishlist') : null;
  
  // Alleen loggen als logger beschikbaar is
  function log(level, message, data) {
    if (logger) {
      logger[level](message, data || '');
    }
  }
  
  var versionInfo = VERSION ? 'Version: ' + VERSION + ', Build: ' + BUILD : 'Build: ' + BUILD;
  log('info', 'Wishlist Click Behavior initialized (' + versionInfo + ')');
  
  // Monitor AJAX calls
  var originalFetch = window.fetch;
  window.fetch = function() {
    log('debug', 'AJAX fetch:', arguments[0]);
    return originalFetch.apply(this, arguments);
  };
  
  // Monitor new DOM elements
  if (window.MutationObserver) {
    var bodyObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && node.className && typeof node.className === 'string') {
            if (node.className.indexOf('tinv') !== -1 || node.className.indexOf('wishlist') !== -1) {
              log('debug', 'New element added with classes:', node.className);
              
              // If popup is added, make it visible immediately!
              if (node.className.indexOf('tinvwl_added_to_wishlist') !== -1 && node.className.indexOf('tinv-modal') !== -1) {
                log('info', 'POPUP DETECTED - forcing visibility NOW');
                
                // Force popup to be visible (from Popup Timing section)
                if (node.className.indexOf('tinv-modal-open') === -1) {
                  node.className += ' tinv-modal-open';
                }
                var overlay = node.querySelector('.tinv-overlay');
                if (overlay) {
                  overlay.style.setProperty('display', 'block', 'important');
                  overlay.style.setProperty('opacity', '1', 'important');
                  overlay.style.setProperty('visibility', 'visible', 'important');
                }
                node.style.setProperty('display', 'block', 'important');
                node.style.setProperty('opacity', '1', 'important');
                node.style.setProperty('visibility', 'visible', 'important');
                node.style.setProperty('pointer-events', 'auto', 'important');
                node.style.setProperty('z-index', '999999', 'important');
                
                log('debug', 'Popup styles applied');
                
                // Restore hrefs after popup appears (redirect now allowed)
                setTimeout(function() {
                  var buttons = document.querySelectorAll('a.tinvwl_add_to_wishlist_button[data-original-href]');
                  for (var i = 0; i < buttons.length; i++) {
                    var btn = buttons[i];
                    btn.setAttribute('href', btn.getAttribute('data-original-href'));
                    btn.removeAttribute('data-original-href');
                  }
                  log('debug', 'Restored all hrefs after popup');
                }, 5000);
              }
            }
          }
        });
      });
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }
  
  // Remove href from all wishlist buttons on page load to prevent redirects
  function removeWishlistHrefs() {
    var buttons = document.querySelectorAll('a.tinvwl_add_to_wishlist_button[href]');
    log('debug', 'Removing href from ' + buttons.length + ' buttons');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var href = btn.getAttribute('href');
      if (href) {
        btn.setAttribute('data-original-href', href);
        btn.removeAttribute('href');
      }
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    removeWishlistHrefs();
  }
  document.addEventListener('DOMContentLoaded', removeWishlistHrefs);
  
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest)
      ? e.target.closest('a.tinvwl_add_to_wishlist_button')
      : null;
    if (!btn) {
      return;
    }
    log('debug', 'Click detected on wishlist button');
    e.preventDefault();
  }, true);
})();

// =============================
// La Maison Bossché – Wishlist Popup Timing
// =============================
(function () {
  var VERSION = null; // Set to 'X.Y.Z' for releases
  var BUILD = 'dev-20260118.004';
  var logger = window.LMB ? window.LMB.createLogger('Wishlist') : null;
  function log(level, message, data) {
    if (logger) {
      logger[level](message, data || '');
    }
  }
  
  var versionInfo = VERSION ? 'Version: ' + VERSION + ', Build: ' + BUILD : 'Build: ' + BUILD;
  log('info', 'Wishlist Popup Timing initialized (' + versionInfo + ')');
  var LMB_POPUP_MS = 4000;
  var LMB_CLOSE_TIMER = null;
  function getModal() {
    var modal = document.querySelector('.tinvwl_added_to_wishlist.tinv-modal');
    log('debug', 'getModal result:', !!modal);
    
    // Debug: check alternatieven
    if (!modal) {
      var alt1 = document.querySelector('.tinvwl_added_to_wishlist');
      var alt2 = document.querySelector('.tinv-modal');
      var alt3 = document.querySelector('div[class*="tinvwl"]:not(body)');
      var alt4 = document.querySelector('.dialog-body');
      var alt5 = document.querySelector('[role="dialog"]');
      log('debug', 'Alt modals - alt1: ' + !!alt1 + ' alt2: ' + !!alt2 + ' alt3: ' + !!alt3 + ' alt4: ' + !!alt4 + ' alt5: ' + !!alt5);
      if (alt3) log('debug', 'Found alt3 classes:', alt3.className);
      if (alt4) log('debug', 'Found alt4 classes:', alt4.className);
      if (alt5) log('debug', 'Found alt5 classes:', alt5.className);
    }
    
    return modal;
  }
  function keepOpen(modal) {
    if (!modal) return;
    if (modal.className.indexOf('tinv-modal-open') === -1) {
      modal.className += ' tinv-modal-open';
    }
    var overlay = modal.querySelector('.tinv-overlay');
    if (overlay) {
      overlay.style.setProperty('display', 'block', 'important');
      overlay.style.setProperty('opacity', '1', 'important');
      overlay.style.setProperty('visibility', 'visible', 'important');
    }
    modal.style.setProperty('display', 'block', 'important');
    modal.style.setProperty('opacity', '1', 'important');
    modal.style.setProperty('visibility', 'visible', 'important');
    modal.style.setProperty('pointer-events', 'auto', 'important');
    modal.style.setProperty('z-index', '999999', 'important');
  }
  function scheduleClose(modal) {
    if (LMB_CLOSE_TIMER) {
      clearTimeout(LMB_CLOSE_TIMER);
      LMB_CLOSE_TIMER = null;
    }
    LMB_CLOSE_TIMER = setTimeout(function () {
      var m = modal || getModal();
      if (!m) return;
      m.classList.remove('tinv-modal-open');
    }, LMB_POPUP_MS);
  }
  function onPopupLikelyOpened() {
    log('debug', 'onPopupLikelyOpened called');
    setTimeout(function () {
      var modal = getModal();
      if (!modal) return;
      keepOpen(modal);
      scheduleClose(modal);
    }, 50);
    setTimeout(function () {
      var modal = getModal();
      if (!modal) return;
      keepOpen(modal);
    }, 200);
  }
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest) ? e.target.closest('a.tinvwl_add_to_wishlist_button') : null;
    if (!btn) return;
    log('debug', 'Popup timing - click detected, calling onPopupLikelyOpened');
    onPopupLikelyOpened();
  });
  if (window.MutationObserver) {
    var obs = new MutationObserver(function () {
      var modal = getModal();
      if (!modal) return;
      if (modal.classList && modal.classList.contains('tinv-modal-open')) {
        keepOpen(modal);
        scheduleClose(modal);
      }
    });
    document.addEventListener('DOMContentLoaded', function () {
      obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    });
  }
})();

// =============================
// La Maison Bossché – Wishlist Image Overlay Scripts
// =============================
(function () {
  var VERSION = null; // Set to 'X.Y.Z' for releases
  var BUILD = 'dev-20260118.004';
  var logger = window.LMB ? window.LMB.createLogger('Wishlist') : null;
  function log(level, message, data) {
    if (logger) {
      logger[level](message, data || '');
    }
  }
  
  var versionInfo = VERSION ? 'Version: ' + VERSION + ', Build: ' + BUILD : 'Build: ' + BUILD;
  log('info', 'Wishlist Image Overlay Scripts initialized (' + versionInfo + ')');
  var WISHLIST_URL = '/wishlist/';
  function normalizeContent(val) {
    if (!val || val === 'none' || val === '""' || val === '\'\'') return '';
    return val;
  }
  function uniqAdd(setObj, key) {
    if (!key && key !== 0) return;
    setObj[String(key)] = true;
  }
  function parseWishlistIdsFromHtml(html) {
    var ids = {};
    var patterns = [
      /data-tinv-wl-product="(\d+)"/g,
      /data-product_id="(\d+)"/g,
      /data-product-id="(\d+)"/g,
      /data-product="(\d+)"/g,
      /product_id=(\d+)/g,
      /"product_id":\s*(\d+)/g
    ];
    var p, re, match;
    for (p = 0; p < patterns.length; p++) {
      re = patterns[p];
      while ((match = re.exec(html)) !== null) {
        uniqAdd(ids, match[1]);
      }
    }
    return ids;
  }
  function moveWishlistButtons() {
    var products = document.querySelectorAll('li.product');
    log('debug', 'moveWishlistButtons - found ' + products.length + ' products');
    var i;
    for (i = 0; i < products.length; i++) {
      var product = products[i];
      var btn = product.querySelector('a.tinvwl_add_to_wishlist_button') || product.querySelector('.tinvwl_add_to_wishlist_button');
      var img = product.querySelector('img.wp-post-image');
      if (!btn || !img) continue;
      var container = img.closest('a');
      if (!container) container = img.parentElement;
      if (!container) continue;
      if (container.className.indexOf('lmb-wishlist-image') === -1) {
        container.className += ' lmb-wishlist-image';
      }
      if (!container.contains(btn)) {
        container.appendChild(btn);
      }
    }
  }
  function tryReadHeaderIcon() {
    var headerLink = document.querySelector('a.wishlist_products_counter');
    if (!headerLink) return false;
    var beforeStyle = window.getComputedStyle(headerLink, '::before');
    var afterStyle = window.getComputedStyle(headerLink, '::after');
    var beforeContent = normalizeContent(beforeStyle && beforeStyle.content);
    var afterContent = normalizeContent(afterStyle && afterStyle.content);
    var beforeFont = (beforeStyle && beforeStyle.fontFamily) ? beforeStyle.fontFamily : '';
    var afterFont = (afterStyle && afterStyle.fontFamily) ? afterStyle.fontFamily : '';
    var content = afterContent || beforeContent;
    var font = afterContent ? afterFont : beforeFont;
    if (!content || !font) return false;
    document.documentElement.style.setProperty('--lmb-ti-heart-content', content);
    document.documentElement.style.setProperty('--lmb-ti-heart-font', font);
    return true;
  }
  function startIconRetries() {
    var attempts = 0;
    var maxAttempts = 20;
    function tick() {
      attempts++;
      if (tryReadHeaderIcon() || attempts >= maxAttempts) return;
      setTimeout(tick, 500);
    }
    tick();
  }
  function applyWishlistState(ids) {
    var buttons = document.querySelectorAll('li.product a.tinvwl_add_to_wishlist_button[data-tinv-wl-product]');
    var i;
    for (i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var pid = btn.getAttribute('data-tinv-wl-product');
      if (!pid) continue;
      if (ids[String(pid)]) {
        btn.classList.add('lmb-in-wishlist');
      } else {
        btn.classList.remove('lmb-in-wishlist');
      }
    }
  }
  function syncWishlistState() {
    return fetch(WISHLIST_URL, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) return '';
        return res.text();
      })
      .then(function (html) {
        if (!html) return;
        var ids = parseWishlistIdsFromHtml(html);
        applyWishlistState(ids);
      })
      .catch(function () {});
  }
  document.addEventListener('DOMContentLoaded', function () {
    log('debug', 'DOMContentLoaded triggered');
    moveWishlistButtons();
    setTimeout(moveWishlistButtons, 300);
    setTimeout(moveWishlistButtons, 900);
    setTimeout(moveWishlistButtons, 2000);
    setTimeout(syncWishlistState, 800);
    setTimeout(startIconRetries, 300);
  });
  
  // Check if DOM is already loaded (script loaded late)
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    log('debug', 'DOM already loaded, running immediately');
    moveWishlistButtons();
    setTimeout(moveWishlistButtons, 300);
    setTimeout(moveWishlistButtons, 900);
    setTimeout(moveWishlistButtons, 2000);
    setTimeout(syncWishlistState, 800);
    setTimeout(startIconRetries, 300);
  }
  
  window.addEventListener('load', function () {
    log('debug', 'Window load event triggered');
    startIconRetries();
    setTimeout(syncWishlistState, 1200);
  });
  if (window.MutationObserver) {
    var observer = new MutationObserver(function () {
      moveWishlistButtons();
      clearTimeout(observer._lmbTimer);
      observer._lmbTimer = setTimeout(syncWishlistState, 600);
    });
    document.addEventListener('DOMContentLoaded', function () {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest)
      ? e.target.closest('a.tinvwl_add_to_wishlist_button')
      : null;
    if (!btn) return;
    setTimeout(syncWishlistState, 900);
    setTimeout(syncWishlistState, 2000);
  });
})();
