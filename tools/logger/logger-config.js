
// Logger Configuratie: Laadvolgorde scripts en styles
// 1. logger.js (altijd eerst)
// 2. blocksy-extra.css (voor wishlist styles)
// 3. Wishlist.js (afhankelijk van logger)

var LMB_ASSET_LOAD_ORDER = [
    '/lmb-assets/tools/logger/logger.js',               //Altijd eerst laden

//CSS Laden    
    '/lmb-assets/assets/css/blocksy-extra.css',



//JS Laden
    '/lmb-assets/assets/js/components/Wishlist.js'
];

// Automatisch laden in de juiste volgorde
(function loadLMBAssetsSequentially(assets, cb) {
    if (!assets || !assets.length) return cb && cb();
    var asset = assets[0];
    var rest = assets.slice(1);
    if (asset.match(/\.js$/)) {
        var s = document.createElement('script');
        s.src = asset;
        s.onload = function() { loadLMBAssetsSequentially(rest, cb); };
        document.head.appendChild(s);
    } else if (asset.match(/\.css$/)) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = asset;
        l.onload = function() { loadLMBAssetsSequentially(rest, cb); };
        document.head.appendChild(l);
    } else {
        loadLMBAssetsSequentially(rest, cb);
    }
})(LMB_ASSET_LOAD_ORDER);
    


