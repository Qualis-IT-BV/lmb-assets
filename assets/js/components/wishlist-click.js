/* Project: La Maison Bossché
 * Version: 0.1.0
 * Build: dev-20260116.001
 * Source: Custom CSS & JS (wishlist click handler)
 * Purpose: Prevent default click behavior on wishlist button (using event capture)
 */

(function () {
  document.addEventListener(
    'click',
    function (e) {
      var btn = (e.target && e.target.closest)
        ? e.target.closest('a.tinvwl_add_to_wishlist_button')
        : null;

      if (!btn) {
        return;
      }

      // Belangrijk: voorkomt dat de klik de product-link (ouder <a>) triggert.
      e.preventDefault();
    },
    true // capture = vroeg onderscheppen
  );
})();
