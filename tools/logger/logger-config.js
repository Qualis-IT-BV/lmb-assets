
// LMB Debugger Config en asset-laadvolgorde
window.LMB_TEST_CONFIG = {
    logConfig: {
        default: 'INFO',
        Wishlist: 'DEBUG'
    },
    assetOrder: [
        '/lmb-assets/tools/logger/logger.js',
        '/lmb-assets/assets/css/blocksy-extra.css',
        '/lmb-assets/assets/js/components/Wishlist.js'
    ]
};

// Automatisch laden in de juiste volgorde (optioneel)
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
})(window.LMB_TEST_CONFIG.assetOrder);
    


