/* Project: La Maison Bossché
 * Version: 0.1.0
 * Build: dev-20260116.001
 * Source: Custom CSS & JS (wishlist popup)
 * Purpose: Keep wishlist popup visible for X seconds after click
 */

(function () {
  var LMB_POPUP_MS = 4000; // <-- pas dit aan (bijv. 6000 = 6 seconden)
  var LMB_CLOSE_TIMER = null;

  function getModal() {
    return document.querySelector('.tinvwl_added_to_wishlist.tinv-modal');
  }

  function keepOpen(modal) {
    if (!modal) {
      return;
    }

    // Forceer open state
    if (modal.className.indexOf('tinv-modal-open') === -1) {
      modal.className += ' tinv-modal-open';
    }

    // Sommige versies gebruiken overlay binnenin
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
      if (!m) {
        return;
      }

      // Laat TI weer sluiten door de open-class weg te halen
      m.classList.remove('tinv-modal-open');
    }, LMB_POPUP_MS);
  }

  function onPopupLikelyOpened() {
    // TI voegt modal toe + opent snel, dus kleine delays om zeker te zijn
    setTimeout(function () {
      var modal = getModal();
      if (!modal) {
        return;
      }
      keepOpen(modal);
      scheduleClose(modal);
    }, 50);

    setTimeout(function () {
      var modal = getModal();
      if (!modal) {
        return;
      }
      keepOpen(modal);
    }, 200);
  }

  // Trigger: klik op wishlist knop
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest) ? e.target.closest('a.tinvwl_add_to_wishlist_button') : null;
    if (!btn) {
      return;
    }
    onPopupLikelyOpened();
  });

  // Extra: als TI via andere acties opent, observer op open-class
  if (window.MutationObserver) {
    var obs = new MutationObserver(function () {
      var modal = getModal();
      if (!modal) {
        return;
      }
      if (modal.classList && modal.classList.contains('tinv-modal-open')) {
        keepOpen(modal);
        scheduleClose(modal);
      }
    });

    document.addEventListener('DOMContentLoaded', function () {
      obs.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
    });
  }
})();
