'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var filterFields = document.querySelectorAll('.map__filter');
  var houseType = filters.querySelector('#housing-type');
  var removePins = function () {
    var activePins = document.querySelectorAll('.map__pin:not(:first-of-type)');
    activePins.forEach(function (it) {
      it.remove();
    });
  };

  var onHouseTypeChange = function (pins) {
    removePins();
    // var pins = advertisement.slice; // копирую массив с данными чтоб потом с ним работать
    var pinsFiltered = pins.filter(function (it) {
      return it.offer.type === houseType.value;
    });
    pinsFiltered.forEach(function (pin) {
      window.pin.pinSection.appendChild(window.pin.createPin(pin));
    });
  };

  houseType.addEventListener('change', onHouseTypeChange);
  window.filter = {
    filters: filters,
    filterFields: filterFields,
    onHouseTypeChange: onHouseTypeChange
  };
})();
