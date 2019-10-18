'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var formFieldSets = adForm.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var startTrail = true;
  var disableMap = function () {
    for (var i = 0; i < formFieldSets.length; i++) {
      formFieldSets[i].setAttribute('disabled', 'disabled');
    }
    startTrail = false;
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
  var setAddress = function (x, y) {
    inputAddress.value = (parseFloat(x) + window.utils.MAIN_PIN_X) + ',' + (parseFloat(y) + window.utils.MAIN_PIN_Y);
    return inputAddress.value;
  };
  var activatePage = function () {
    startTrail = true;
    setAddress(mainPin.style.left, mainPin.style.top);
    enableMap();
    window.pin.getAllPins(8);
    mainPin.removeEventListener('click', activatePage);
  };
  disableMap();
  mainPin.addEventListener('click', activatePage);
  if (startTrail) {
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var stopTrail = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var mouseCoordsY = mainPin.offsetTop - shift.y;
        var mouseCoordsX = mainPin.offsetLeft - shift.x;
        if (mouseCoordsY <= 160) {
          mouseCoordsY = 160;
          stopTrail();
        } else if (mouseCoordsY >= 625) {
          mouseCoordsY = 625;
          stopTrail();
        }
        if (mouseCoordsX <= 0) {
          mouseCoordsX = 0;
          stopTrail();
        } else if (mouseCoordsX >= 1140) {
          mouseCoordsX = 1140;
          stopTrail();
        }
        mainPin.style.top = mouseCoordsY + 'px';
        mainPin.style.left = mouseCoordsX + 'px';
        setAddress(mainPin.style.left, mainPin.style.top);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        stopTrail();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  window.map = {
    map: map
  };
})();

