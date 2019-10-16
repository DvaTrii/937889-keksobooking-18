'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (arrayName) {
      return Math.floor(Math.random() * arrayName.length);
    },
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
    },
    getRandomArray: function (arrayName) {
      var randomArray = [];
      for (var i = 0; i <= window.utils.getRandomNumber(arrayName); i++) {
        randomArray.push(arrayName[i]);
      }
      return randomArray;
    }
  };
})();
