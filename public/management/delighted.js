!(function (e, t, r, n) {
  if (!e[n]) {
    for (
      var a = (e[n] = []),
        i = [
          'survey',
          'reset',
          'config',
          'init',
          'set',
          'get',
          'event',
          'identify',
          'track',
          'page',
          'screen',
          'group',
          'alias',
        ],
        c = 0;
      c < i.length;
      c++
    ) {
      var s = i[c];
      a[s] =
        a[s] ||
        (function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments);
            a.push([e, t]);
          };
        })(s);
    }
    a.SNIPPET_VERSION = '1.0.1';
    var o = t.createElement('script');
    (o.type = 'text/javascript'),
      (o.async = !0),
      (o.src =
        'https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/' +
        r +
        '/' +
        n +
        '.js');
    var p = t.getElementsByTagName('script')[0];
    p.parentNode.insertBefore(o, p);
  }
})(window, document, 'AH51AcqtJNMecfMg', 'delighted');

delighted.survey();
