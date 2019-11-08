'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  var disableMap = function () {
    map.classList.add('map--faded');
    window.filters.filters.classList.add('map__filters--disabled');
    window.filters.filterFields.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
    mainPin.style.left = window.utils.MAIN_PIN_CENTER_X + 'px';
    mainPin.style.top = window.utils.MAIN_PIN_CENTER_Y + 'px';
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    window.filters.filters.classList.remove('map__filters--disabled');
    window.filters.filterFields.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };

  var setPage = function () {
    disablePage();
    window.form.adForm.reset();
    window.pin.removePins();
  };

  var enablePage = function () {
    enableMap();
    window.form.enableForm();
  };

  var disablePage = function () {
    disableMap();
    window.form.disableForm();
    mainPin.addEventListener('click', activatePage);
    mainPin.addEventListener('mousedown', activatePage);
  };

  var onDownload = function (data) {
    window.allData = data;
    window.pin.renderPins(window.filters.allFilter(data));
  };

  var onError = function () {
    mainSection.appendChild(errorTemplate);
    var errorButton = document.querySelector('.error__button');
    var error = document.querySelector('.error');
    var closeError = function () {
      error.remove();
      setPage();
      errorButton.removeEventListener('click', closeError);
      document.removeEventListener('click', closeError);
    };
    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.preventDefault();
        if (error) {
          error.remove();
          setPage();
        }
      }
      document.removeEventListener('keydown', onErrorEscPress);
    };
    errorButton.addEventListener('click', closeError);
    document.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var activatePage = function () {
    window.form.setAddress(mainPin.style.left, mainPin.style.top);
    enablePage();
    window.backend.load(onDownload, onError);
    mainPin.removeEventListener('mousedown', activatePage);
    mainPin.removeEventListener('click', activatePage);
  };

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
      window.form.setAddress(mainPin.style.left, mainPin.style.top);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  disablePage();
  mainPin.addEventListener('click', activatePage);
  mainPin.addEventListener('mousedown', activatePage);

  window.map = {
    map: map,
    mainSection: mainSection,
    disablePage: disablePage,
    onDownload: onDownload,
    onError: onError
  };
})();
