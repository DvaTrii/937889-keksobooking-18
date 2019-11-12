'use strict';
(function () {
  var pinSection = document.querySelector('.map__pins');
  var pinButtonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var filtersSection = document.querySelector('.map__filters-container');

  var onClickPin = function (advertisement) {
    window.card.removeCard();
    window.map.map.insertBefore(window.card.createCard(advertisement), filtersSection);
  };

  var createPin = function (advertisement) {
    var pinElement = pinButtonTemplate.cloneNode(true);
    pinElement.querySelector('img').src = advertisement.author.avatar;
    pinElement.style.left = advertisement.location.x + 'px';
    pinElement.style.top = advertisement.location.y + 'px';
    pinElement.querySelector('img').alt = advertisement.offer.title;
    pinElement.addEventListener('click', function (evt) {
      onClickPin(advertisement);
      evt.currentTarget.classList.add('map__pin--active');
    });

    return pinElement;
  };

  var removePins = function () {
    var activePins = document.querySelectorAll('.map__pin:not(:first-of-type)');
    activePins.forEach(function (it) {
      it.remove();
    });
    window.card.removeCard();
  };

  var renderPins = function (pins) {
    pins.forEach(function (pin) {
      if (pin.offer) {
        pinSection.appendChild(createPin(pin));
      }
    });
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
  };

  window.pin = {
    pinSection: pinSection,
    createPin: createPin,
    deactivatePin: deactivatePin,
    removePins: removePins,
    renderPins: renderPins
  };
})();
