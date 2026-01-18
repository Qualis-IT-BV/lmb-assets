/*
 * La Maison Bossché – Wishlist Click Behavior
 * Build: 001
 * Datum: 2026-01-11
 * Wijziging:
 * - Voorkomt navigatie naar productpagina wanneer er op het TI wishlist-hartje wordt geklikt.
 * - Laat TI wishlist functionaliteit intact (geen stopImmediatePropagation).
 *
 */

(function () {
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest)
      ? e.target.closest('a.tinvwl_add_to_wishlist_button')
      : null;

    if (!btn) {
      return;
    }

    // Belangrijk: voorkomt dat de klik de product-link (ouder <a>) triggert.
    e.preventDefault();
  }, true); // capture = vroeg onderscheppen
})();

/* === Einde La Maison Bossché – Wishlist Click Behavior === */
