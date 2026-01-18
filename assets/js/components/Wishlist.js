/* Project: La Maison Bossché
 * Component: Wishlist
 * Build: dev-20260118.001
 * Source: Debugged & tested via Chrome DevTools Overrides
 * Changes: 
 * - Fixed DOMContentLoaded timing issue (check document.readyState)
 * - Added parent link navigation blocking (temp href removal)
 * - Added redirect blocking attempts (partial - see known-issues.md)
 * - Added comprehensive debug logging with timestamps
 * - All functionality working except redirect on add (TI plugin issue)
 */

function logDebug(msg) {
  var now = new Date();
  var timestamp = now.getHours() + ':' + 
    ('0' + now.getMinutes()).slice(-2) + ':' + 
    ('0' + now.getSeconds()).slice(-2) + '.' + 
    ('00' + now.getMilliseconds()).slice(-3);
  console.log('[' + timestamp + '] [LMB DEBUG] ' + msg);
}

logDebug('Wishlist.js - Script loaded');

// =============================
// La Maison Bossché – Wishlist Click Behavior
// =============================
(function () {
  logDebug('Click Behavior - IIFE started');
  
  // Blokkeer redirects naar /wishlist/ pagina na toevoegen
  var blockWishlistRedirect = false;
  var wishlistClickTime = 0;
  
  // Methode 1: Blokkeer beforeunload
  window.addEventListener('beforeunload', function(e) {
    if (blockWishlistRedirect) {
      var timeSinceClick = Date.now() - wishlistClickTime;
      if (timeSinceClick < 3000) {
        logDebug('Click Behavior: BLOCKING page unload (beforeunload) - ' + timeSinceClick + 'ms since click');
        e.preventDefault();
        e.returnValue = '';
        blockWishlistRedirect = false;
        return '';
      }
    }
  });
  
  // Methode 2: Override location methods
  var originalAssign = window.location.assign;
  var originalReplace = window.location.replace;
  
  window.location.assign = function(url) {
    if (blockWishlistRedirect && url && url.indexOf('/wishlist/') !== -1) {
      logDebug('Click Behavior: BLOCKED location.assign to: ' + url);
      blockWishlistRedirect = false;
      return;
    }
    return originalAssign.call(window.location, url);
  };
  
  window.location.replace = function(url) {
    if (blockWishlistRedirect && url && url.indexOf('/wishlist/') !== -1) {
      logDebug('Click Behavior: BLOCKED location.replace to: ' + url);
      blockWishlistRedirect = false;
      return;
    }
    return originalReplace.call(window.location, url);
  };
  
  // Methode 3: Try to intercept TI Wishlist AJAX success callback
  (function() {
    if (window.jQuery) {
      var originalAjax = jQuery.ajax;
      jQuery.ajax = function(options) {
        if (options && options.url && options.url.indexOf('tinvwl') !== -1) {
          logDebug('Click Behavior: Intercepted TI Wishlist AJAX call');
          var originalSuccess = options.success;
          options.success = function(response) {
            logDebug('Click Behavior: TI Wishlist AJAX success, checking for redirect');
            if (blockWishlistRedirect && response && typeof response === 'object' && response.redirect) {
              logDebug('Click Behavior: BLOCKED TI redirect in AJAX response: ' + response.redirect);
              delete response.redirect;
            }
            if (originalSuccess) {
              return originalSuccess.apply(this, arguments);
            }
          };
        }
        return originalAjax.call(jQuery, options);
      };
    }
  })();
  
  // Strategie: Verwijder tijdelijk href van parent link bij wishlist click
  document.addEventListener('mousedown', function (e) {
    var target = e.target;
    var wishlistBtn = target.closest ? target.closest('a.tinvwl_add_to_wishlist_button') : null;
    
    if (wishlistBtn) {
      logDebug('Click Behavior: Mousedown on wishlist button detected');
      blockWishlistRedirect = true;
      wishlistClickTime = Date.now();
      
      setTimeout(function() {
        blockWishlistRedirect = false;
        logDebug('Click Behavior: Re-enabled redirects after timeout');
      }, 3000);
      
      // Zoek de parent product link
      var parentLink = wishlistBtn.parentElement;
      while (parentLink && parentLink.tagName !== 'A') {
        parentLink = parentLink.parentElement;
      }
      
      if (parentLink && parentLink.tagName === 'A' && parentLink !== wishlistBtn) {
        var originalHref = parentLink.getAttribute('href');
        if (originalHref) {
          logDebug('Click Behavior: Temporarily removing href from parent link');
          parentLink.setAttribute('data-original-href', originalHref);
          parentLink.removeAttribute('href');
          
          // Restore na een korte delay
          setTimeout(function() {
            parentLink.setAttribute('href', originalHref);
            parentLink.removeAttribute('data-original-href');
            logDebug('Click Behavior: Restored href to parent link');
          }, 500);
        }
      }
    }
  }, true);
})();

// =============================
// La Maison Bossché – Wishlist Popup Timing
// =============================
(function () {
  logDebug('Popup Timing - IIFE started');
  var LMB_POPUP_MS = 4000;
  var LMB_CLOSE_TIMER = null;
  function getModal() {
    return document.querySelector('.tinvwl_added_to_wishlist.tinv-modal');
  }
  function keepOpen(modal) {
    if (!modal) {
      logDebug('keepOpen: Modal not found - might not be visible yet');
      return;
    }
    logDebug('keepOpen: Found modal, forcing it open');
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
    logDebug('Popup Timing: Wishlist button clicked, triggering popup timing');
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
  logDebug('Image Overlay - IIFE started');
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
    var count = 0;
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
        count++;
      }
    }
    logDebug('moveWishlistButtons: Moved ' + count + ' buttons out of ' + products.length + ' products');
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
    logDebug('applyWishlistState: Found ' + Object.keys(ids).length + ' items in wishlist, ' + buttons.length + ' buttons to update');
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
  
  function initWishlist() {
    logDebug('initWishlist triggered');
    moveWishlistButtons();
    setTimeout(moveWishlistButtons, 300);
    setTimeout(moveWishlistButtons, 900);
    setTimeout(moveWishlistButtons, 2000);
    setTimeout(syncWishlistState, 800);
    setTimeout(startIconRetries, 300);
  }
  
  // Check if DOMContentLoaded already fired
  if (document.readyState === 'loading') {
    logDebug('DOMContentLoaded not yet fired, waiting...');
    document.addEventListener('DOMContentLoaded', function () {
      logDebug('DOMContentLoaded event fired (via listener)');
      initWishlist();
    });
  } else {
    logDebug('DOMContentLoaded already fired, executing directly');
    initWishlist();
  }
  window.addEventListener('load', function () {
    logDebug('Window load event fired');
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
