'use strict';

(function () {
  var getRandomNumber = function (arrayName) {
    return Math.floor(Math.random() * arrayName.length);
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (arrayName) {
    var randomArray = [];
    for (var i = 0; i <= window.utils.getRandomNumber(arrayName); i++) {
      randomArray.push(arrayName[i]);
    }
    return randomArray;
  };

  window.utils = {
    MAP_BORDER_START_X: 5,
    MAP_BORDER_END_X: 1130,
    MAP_BORDER_START_Y: 130,
    MAP_BORDER_END_Y: 630,
    MAIN_PIN_CENTER_X: 570,
    MAIN_PIN_CENTER_Y: 375,
    MAIN_PIN_X: 22.5,
    MAIN_PIN_Y: 65,
    ESC_KEYCODE: 27,
    getRandomNumber: getRandomNumber,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArray: getRandomArray
  };
})();
