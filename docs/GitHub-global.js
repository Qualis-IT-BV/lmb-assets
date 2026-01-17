<script>
(function () {
  var host = window.location.hostname;
  var src;

  if (host.indexOf('dev.') === 0) {
    src = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@dev/js/global.js';
  } else if (host.indexOf('staging.') === 0) {
    src = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@staging/js/global.js';
  } else if (host.indexOf('test.') === 0) {
    src = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@test/js/global.js';
  } else {
    src = 'https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@main/js/global.js';
  }

  var s = document.createElement('script');
  s.src = src;
  s.defer = true;
  s.crossOrigin = 'anonymous';
  document.body.appendChild(s);
})();
</script>
