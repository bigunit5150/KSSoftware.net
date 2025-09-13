// Lock `$` to jQuery very early without erroring if absent
try {
  var desc = Object.getOwnPropertyDescriptor(window, '$');
  if (!desc || desc.configurable) {
    Object.defineProperty(window, '$', {
      configurable: true,
      get: function () {
        return window.jQuery;
      },
      set: function (_) {},
    });
  }
} catch (e) {}
