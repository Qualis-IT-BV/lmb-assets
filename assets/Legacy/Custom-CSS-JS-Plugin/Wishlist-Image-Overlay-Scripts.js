/*
 * La Maison Bossché – Wishlist Image Overlay Scripts
 * Build: 023r
 * Datum: 2026-01-10
 * Wijziging:
 * - Werkende set (terug naar laatste stabiele variant).
 * - Verplaatst TI Wishlist knop naar container rond img.wp-post-image en voegt class lmb-wishlist-image toe.
 * - Leest TI Wishlist icoon uit de header (met retries) en zet variabelen:
 *   --lmb-ti-heart-content + --lmb-ti-heart-font
 * - Bepaalt wishlist-status per product door /wishlist/ te fetchen en product IDs te herkennen.
 * - Zet eigen class .lmb-in-wishlist per product (zodat niet alles ‘solid’ wordt na 1 toevoeging).
 *
 */

(function () {
  var WISHLIST_URL = '/wishlist/';

  /* ---------- Helpers ---------- */
  function normalizeContent(val) {
    if (!val || val === 'none' || val === '""' || val === '\'\'') {
      return '';
    }
    return val;
  }

  function uniqAdd(setObj, key) {
    if (!key && key !== 0) {
      return;
    }
    setObj[String(key)] = true;
  }

  function parseWishlistIdsFromHtml(html) {
    var ids = {};

    // Breed zoeken: TI attributen + veel voorkomende varianten
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

  /* ---------- 1) Verplaats knop naar afbeelding ---------- */
  function moveWishlistButtons() {
    var products = document.querySelectorAll('li.product');
    var i;

    for (i = 0; i < products.length; i++) {
      var product = products[i];

      var btn =
        product.querySelector('a.tinvwl_add_to_wishlist_button') ||
        product.querySelector('.tinvwl_add_to_wishlist_button');

      var img = product.querySelector('img.wp-post-image');

      if (!btn || !img) {
        continue;
      }

      var container = img.closest('a');
      if (!container) {
        container = img.parentElement;
      }
      if (!container) {
        continue;
      }

      if (container.className.indexOf('lmb-wishlist-image') === -1) {
        container.className += ' lmb-wishlist-image';
      }

      if (!container.contains(btn)) {
        container.appendChild(btn);
      }
    }
  }

  /* ---------- 2) Lees TI header-icoon uit (met retries) ---------- */
  function tryReadHeaderIcon() {
    var headerLink = document.querySelector('a.wishlist_products_counter');
    if (!headerLink) {
      return false;
    }

    var beforeStyle = window.getComputedStyle(headerLink, '::before');
    var afterStyle = window.getComputedStyle(headerLink, '::after');

    var beforeContent = normalizeContent(beforeStyle && beforeStyle.content);
    var afterContent = normalizeContent(afterStyle && afterStyle.content);

    var beforeFont = (beforeStyle && beforeStyle.fontFamily) ? beforeStyle.fontFamily : '';
    var afterFont = (afterStyle && afterStyle.fontFamily) ? afterStyle.fontFamily : '';

    // Neem de eerste die gevuld is (bij jou vaak ::after)
    var content = afterContent || beforeContent;
    var font = afterContent ? afterFont : beforeFont;

    if (!content || !font) {
      return false;
    }

    document.documentElement.style.setProperty('--lmb-ti-heart-content', content);
    document.documentElement.style.setProperty('--lmb-ti-heart-font', font);

    return true;
  }

  function startIconRetries() {
    var attempts = 0;
    var maxAttempts = 20;

    function tick() {
      attempts++;
      if (tryReadHeaderIcon() || attempts >= maxAttempts) {
        return;
      }
      setTimeout(tick, 500);
    }

    tick();
  }

  /* ---------- 3) Sync wishlist state per product ---------- */
  function applyWishlistState(ids) {
    var buttons = document.querySelectorAll(
      'li.product a.tinvwl_add_to_wishlist_button[data-tinv-wl-product]'
    );
    var i;

    for (i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var pid = btn.getAttribute('data-tinv-wl-product');

      if (!pid) {
        continue;
      }

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
        if (!res.ok) {
          return '';
        }
        return res.text();
      })
      .then(function (html) {
        if (!html) {
          return;
        }
        var ids = parseWishlistIdsFromHtml(html);
        applyWishlistState(ids);
      })
      .catch(function () {});
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    moveWishlistButtons();

    // Extra calls helpen bij grids die later renderen
    setTimeout(moveWishlistButtons, 300);
    setTimeout(moveWishlistButtons, 900);
    setTimeout(moveWishlistButtons, 2000);

    setTimeout(syncWishlistState, 800);
    setTimeout(startIconRetries, 300);
  });

  window.addEventListener('load', function () {
    startIconRetries();
    setTimeout(syncWishlistState, 1200);
  });

  // Observer voor lazy loads / filters / paginatie
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

  // Na klik: TI doet AJAX → daarna opnieuw syncen
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest)
      ? e.target.closest('a.tinvwl_add_to_wishlist_button')
      : null;

    if (!btn) {
      return;
    }

    setTimeout(syncWishlistState, 900);
    setTimeout(syncWishlistState, 2000);
  });
})();

/* === Einde La Maison Bossché – Wishlist Image Overlay Scripts === */
