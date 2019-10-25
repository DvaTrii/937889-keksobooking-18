'use strict';
(function () {
  var pinSection = document.querySelector('.map__pins');
  var pinButtonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var filtersSection = document.querySelector('.map__filters-container');
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
  var loadHandler = function (pins) {
    // console.log(pins);
    pins.forEach(function (it) {
      pinSection.appendChild(createPin(it));
    });
  };

  var errorHandler = function () {
    filtersSection.appendChild(errorTemplate);
    var errorButton = document.querySelector('.error__button');
    var closeError = function () {
      document.querySelector('.error').remove();
      document.location.reload(true);
      errorButton.removeEventListener('click', closeError);
    };
    errorButton.addEventListener('click', closeError);
  };

  // var getAllPins = function (amount) {
  //   var data = window.data.getAdvertisements(amount);
  //   data.forEach(function (obj) {
  //     pinSection.appendChild(createPin(obj));
  //   });
  // };
  window.pin = {
    // getAllPins: getAllPins,
    pinSection: pinSection,
    loadHandler: loadHandler,
    errorHandler: errorHandler
  };
})();
