/*
 * Logger Configuration
 * Last Updated: 2026-01-19T00:30:00
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
        Logger: 'INFO',        // Logger utility zelf
        Wishlist: 'DEBUG',     // Wishlist extra debug info

    },
    
    // 🎛️ Assets om te laden (relatief vanaf /assets/)
    // ⚠️ Logger moet ALTIJD als eerste!
    assets: {
        // JavaScript files
        'js/tools/logger/logger.js': true,              // Logger utility (altijd eerst!)
        'js/global.js': false,
        'js/components/Wishlist.js': true,
        
        // CSS files
        'css/global.css': false,
        'css/blocksy-extra.css': true,
    }
};
