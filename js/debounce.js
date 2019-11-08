'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 1000; // ms

  window.ddebounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // window.debounce = {
  //   debounce: debounce
  // };
})();
