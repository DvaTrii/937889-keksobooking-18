'use strict';
(function () {
  var MAIN_PIN_X = 22.5;
  var MAIN_PIN_Y = 65;
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var formFieldSets = adForm.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var adAddress = (parseFloat(mainPin.style.left) + MAIN_PIN_X) + ',' + (parseFloat(mainPin.style.top) + MAIN_PIN_Y);
  var inputAddress = document.querySelector('#address');
  // бокирует форму
  var disableForm = function () {
    for (var i = 0; i < formFieldSets.length; i++) {
      formFieldSets[i].setAttribute('disabled', 'disabled');
    }
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  };

  // активирует форму
  var enableForm = function () {
    for (var i = 0; i < formFieldSets.length; i++) {
      formFieldSets[i].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  };

  // вызовем функцию чтобы заблокировать форму
  disableForm();

  // функция активации страницы + происходит рендер пинов и снимает обработчик чтоб повторно не вызвать функцию
  var activatePage = function () {
    inputAddress.value = adAddress;
    enableForm();
    window.utils.getAllPins(8);
    mainPin.removeEventListener('click', activatePage);
  };
  mainPin.addEventListener('click', activatePage);
})();
