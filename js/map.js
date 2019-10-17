'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var formFieldSets = adForm.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var adAddress = (parseFloat(mainPin.style.left) + window.utils.MAIN_PIN_X) + ',' + (parseFloat(mainPin.style.top) + window.utils.MAIN_PIN_Y);
  var inputAddress = document.querySelector('#address');
  var disableMap = function () {
    for (var i = 0; i < formFieldSets.length; i++) {
      formFieldSets[i].setAttribute('disabled', 'disabled');
    }
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  };
  var enableMap = function () {
    for (var i = 0; i < formFieldSets.length; i++) {
      formFieldSets[i].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  };
  var activatePage = function () {
    inputAddress.value = adAddress;
    enableMap();
    window.pin.getAllPins(8);
    mainPin.removeEventListener('click', activatePage);
  };
  disableMap();
  mainPin.addEventListener('click', activatePage);
  window.map = {
    map: map
  };
})();
