'use strict';

(function () {
  var getRandomNumber = function (arrayName) {
    return Math.floor(Math.random() * arrayName.length);
  };

  window.utils = {
    MAP_BORDER_START_X: -31,
    MAP_BORDER_END_X: 1169,
    MAP_BORDER_START_Y: 65,
    MAP_BORDER_END_Y: 565,
    MAIN_PIN_CENTER_X: 570,
    MAIN_PIN_CENTER_Y: 375,
    MAIN_PIN_X: 31,
    MAIN_PIN_Y: 65,
    ESC_KEYCODE: 27,
    getRandomNumber: getRandomNumber
  };
})();
