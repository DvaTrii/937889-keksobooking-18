'use strict';
(function () {
  var pinSection = document.querySelector('.map__pins');
  var pinButtonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var filtersSection = document.querySelector('.map__filters-container');
  var mainSection = document.querySelector('main');
  var onClickPin = function (advertisement) {
    var pinCard = document.querySelector('.map__card');
    if (document.querySelector('.map__card')) {
      pinCard.remove();
    }
    window.map.map.insertBefore(window.card.createCard(advertisement), filtersSection);
  };
  var createPin = function (advertisement) {
    var pinElement = pinButtonTemplate.cloneNode(true);
    pinElement.querySelector('img').src = advertisement.author.avatar;
    pinElement.style.left = advertisement.location.x + 'px';
    pinElement.style.top = advertisement.location.y + 'px';
    pinElement.querySelector('img').alt = advertisement.offer.title;
    pinElement.addEventListener('click', function () {
      onClickPin(advertisement);
    });
    return pinElement;
  };
  var downloadHandler = function (pins) {
    pins.forEach(function (it) {
      pinSection.appendChild(createPin(it));
    });
  };
  var setPage = function () {
    var pins = document.querySelectorAll('.map__pin:not(:first-of-type)');
    window.map.disableMap();
    window.map.adForm.reset();
    pins.forEach(function (it) {
      it.remove();
    });
  };
  var errorHandler = function () {
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

  window.pin = {
    pinSection: pinSection,
    downloadHandler: downloadHandler,
    errorHandler: errorHandler,
    errorTemplate: errorTemplate,
    mainSection: mainSection,
    setPage: setPage
  };
})();
