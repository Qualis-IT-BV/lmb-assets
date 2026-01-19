/*
 * Logger Configuration
 * Last Updated: 2026-01-20T00:00:00
 * 
 * Dit bestand definieert welke assets en loglevels worden gebruikt
 * door het GitHub CSS & JS Debugger Script.
 * 
 * Note: Commit/branch wordt ingesteld in het Debugger script zelf (OVERRIDE_COMMIT)
 */

window.LMB_TEST_CONFIG = {
    // 📊 Logging configuratie (per component + globaal)
    // Levels: DEBUG, INFO, WARN, ERROR, SILENT
    logConfig: {
        default: 'SILENT',       // Default voor alle componenten
        Logger: 'INFO',          // Logger utility zelf
        Wishlist: 'DEBUG',       // Wishlist extra debug info
    },
    
    // 🎛️ Assets om te laden (relatief vanaf /assets/)
    // 
    // ⚠️ BELANGRIJKE WAARSCHUWINGEN:
    // 1. Logger moet ALTIJD als eerste geladen worden!
    // 2. LET OP: global.js laadt automatisch Wishlist.js en blocksy-extra.css
    //    → Als je global.js aanzet, zet dan Wishlist.js en blocksy-extra.css UIT
    //    → Anders worden componenten dubbel geladen (conflict!)
    // 3. Externe scripts (cdn.jsdelivr.net/) worden NIET geladen door debugger
    //    → Deze moeten via Chrome DevTools Local Overrides worden getest
    //
    assets: {
        // === Core (altijd eerst) ===
        'js/tools/logger/logger.js': true,              // Logger utility (VERPLICHT, altijd eerst!)
        
        // === Global loaders (LET OP: laadt componenten automatisch!) ===
        'js/global.js': false,                          // ⚠️ Laadt automatisch: Wishlist.js, blocksy-extra.css
        'css/global.css': false,                        // Global CSS styling
        
        // === Individual Components (UIT als global.js AAN is!) ===
        'js/components/Wishlist.js': true,              // Wishlist functionaliteit
        'css/components/blocksy-extra.css': true,       // Blocksy CSS migratie
        
        // === External/CDN scripts (niet via debugger) ===
        // 'cdn.jsdelivr.net/...' → Gebruik Chrome DevTools Local Overrides
        // 'css/cdn.jsdelivr.net/longurls/Wishlist-copy.js': false  // Externe wishlist variant
    }
};
