// Mock the WP JSON endpoint to avoid network calls in static build
(function () {
  try {
    window.__MOCK_IAWP__ = true;

    // Match production hosts we use for the same endpoint
    var LIVE_RE =
      /^https?:\/\/(?:[^\/]+\.)?(?:kssoftware\.net|keith-smith-engineering\.com)\/wp-json\/iawp\/search/i;
    var LOCAL_RE = /^\/wp-json\/iawp\/search/i;
    var DISABLED_RE = /^\/___disabled_wpjson\/iawp\/search/i;

    function isTarget(u) {
      try {
        if (!u) return false;
        var s = typeof u === 'string' ? u : (u && u.url) || '';
        return LIVE_RE.test(s) || LOCAL_RE.test(s) || DISABLED_RE.test(s);
      } catch (e) {
        return false;
      }
    }

    var MOCK = { ok: true, results: [] };
    var BODY = JSON.stringify(MOCK);
    var HEADERS = { 'Content-Type': 'application/json' };

    // fetch()
    if (window.fetch) {
      var _fetch = window.fetch.bind(window);
      window.fetch = function (input, init) {
        if (isTarget(input)) {
          return Promise.resolve(new Response(BODY, { status: 200, headers: HEADERS }));
        }
        return _fetch(input, init);
      };
    }

    // XMLHttpRequest
    if (window.XMLHttpRequest) {
      var OrigXHR = window.XMLHttpRequest;
      window.XMLHttpRequest = function () {
        var xhr = new OrigXHR();
        var _open = xhr.open,
          _send = xhr.send;
        var mock = false;
        xhr.open = function (method, url) {
          mock = isTarget(url);
          return _open.apply(this, arguments);
        };
        xhr.send = function (body) {
          if (mock) {
            this.readyState = 4;
            this.status = 200;
            this.responseText = BODY;
            if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
            if (typeof this.onload === 'function') this.onload();
            return;
          }
          return _send.apply(this, arguments);
        };
        return xhr;
      };
    }

    // sendBeacon()
    if (navigator && typeof navigator.sendBeacon === 'function') {
      var _sb = navigator.sendBeacon.bind(navigator);
      navigator.sendBeacon = function (url, data) {
        if (isTarget(url)) return true;
        return _sb(url, data);
      };
    }

    // jQuery ajax
    if (window.jQuery) {
      try {
        jQuery.ajaxPrefilter(function (options) {
          if (isTarget(options && options.url)) {
            options.type = 'GET';
            var success = options.success,
              complete = options.complete;
            if (typeof success === 'function') success(MOCK);
            if (typeof complete === 'function') complete();
            options.url = 'about:blank';
          }
        });
      } catch (e) {}
    }
  } catch (e) {}
})();
