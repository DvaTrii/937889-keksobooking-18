'use strict';

(function () {
  window.utils = {
    getAllPins: function (amount) {
      var data = getAdvertisements(amount);
      data.forEach(function (obj) {
        pinSection.appendChild(createPin(obj));
      });
    }
  };
})();
