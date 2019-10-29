'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterFields = document.querySelectorAll('.map__filter');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var disableMap = function () {
    map.classList.add('map--faded');
    mapFilters.classList.add('map__filters--disabled');
    mapFilterFields.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };
  var enableMap = function () {
    map.classList.remove('map--faded');
    mapFilters.classList.remove('map__filters--disabled');
    mapFilterFields.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };
  var enablePage = function () {
    enableMap();
    window.form.enableForm();
  };
  var disablePage = function () {
    disableMap();
    mainPinHandler();
    window.form.disableForm();
  };
  var setAddress = function (x, y) {
    inputAddress.value = (parseFloat(x) + window.utils.MAIN_PIN_X) + ',' + (parseFloat(y) + window.utils.MAIN_PIN_Y);
    return inputAddress.value;
  };
  var activatePage = function () {
    setAddress(mainPin.style.left, mainPin.style.top);
    enablePage();
    window.backend.load(window.pin.downloadHandler, window.pin.errorHandler);
    mainPin.removeEventListener('mousedown', activatePage);
    mainPin.removeEventListener('click', activatePage);
  };
  var mainPinHandler = function () {
    mainPin.addEventListener('click', activatePage);
    mainPin.addEventListener('mousedown', activatePage);
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
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
        if (mouseCoordsY <= window.utils.MAP_BORDER_START_Y) {
          mouseCoordsY = window.utils.MAP_BORDER_START_Y;
        } else if (mouseCoordsY >= window.utils.MAP_BORDER_END_Y) {
          mouseCoordsY = window.utils.MAP_BORDER_END_Y;
        }
        if (mouseCoordsX <= window.utils.MAP_BORDER_START_X) {
          mouseCoordsX = window.utils.MAP_BORDER_START_X;
        } else if (mouseCoordsX >= window.utils.MAP_BORDER_END_X) {
          mouseCoordsX = window.utils.MAP_BORDER_END_X;
        }
        mainPin.style.top = mouseCoordsY + 'px';
        mainPin.style.left = mouseCoordsX + 'px';
        setAddress(mainPin.style.left, mainPin.style.top);
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  disablePage();
  mainPinHandler();
  window.map = {
    map: map,
    disablePage: disablePage,
    mainPinHandler: mainPinHandler
  };
})();
