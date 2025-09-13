// Minimal jQuery stub to queue calls until real jQuery loads
(function () {
  var jqueryParams = [];

  function push(arg) {
    jqueryParams = [].concat(jqueryParams, arg);
    return jQuery;
  }

  // Define stubbed jQuery/$ functions
  var jQuery = function (r) {
    return push(r);
  };
  var $ = function (r) {
    return push(r);
  };

  // Expose globally
  window.jQuery = jQuery;
  window.$ = jQuery;

  // Basic shape of jQuery API used before load
  jQuery.fn = jQuery.prototype = {};
  $.fn = jQuery.prototype;

  // noConflict hook — if real jQuery exists, restore and mark
  var customHeadScripts = false;
  jQuery.noConflict = function () {
    if (window.jQuery) {
      jQuery = window.jQuery;
      $ = window.jQuery;
      customHeadScripts = true;
      return jQuery.noConflict;
    }
  };

  // Queue lifecycle hooks
  jQuery.ready = function (r) {
    jqueryParams = [].concat(jqueryParams, r);
  };
  $.ready = jQuery.ready;
  jQuery.load = function (r) {
    jqueryParams = [].concat(jqueryParams, r);
  };
  $.load = jQuery.load;
  jQuery.fn.ready = jQuery.ready;
  $.fn.ready = jQuery.ready;
})();
