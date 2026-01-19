/*
 * Logger Configuration
 * Last Updated: 2026-01-19T00:30:00
 * 
 * Dit bestand definieert welke commit/branch en assets worden geladen
 * door het GitHub CSS & JS Testing/Verification Script.
 * 
 * Update alleen dit bestand bij nieuwe commits - het Testing Script
 * hoeft niet aangepast te worden.
 */

window.LMB_TEST_CONFIG = {
    // 🔀 Commit hash of branch naam
    // TIP: Gebruik commit hash voor betrouwbare cache-busting
    commit: 'c3a986d',
    
    // 📊 Logging configuratie (per component + globaal)
    // Levels: DEBUG, INFO, WARN, ERROR, SILENT
    logConfig: {
        default: 'SILENT',       // Default voor alle componenten
        Logger: 'INFO',        // Logger utility zelf
        Wishlist: 'DEBUG',     // Wishlist extra debug info

    },
    
    // 🎛️ Assets om te laden (relatief vanaf /assets/)
    // ⚠️ Logger moet ALTIJD als eerste!
    assets: {
        // JavaScript files
        'js/logger.js': true,              // Logger utility (altijd eerst!)
        'js/global.js': false,
        'js/components/Wishlist.js': true,
        
        // CSS files
        'css/global.css': false,
        'css/blocksy-extra.css': true,
    }
};
