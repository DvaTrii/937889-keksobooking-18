'use strict';
(function () {
  var pinSection = document.querySelector('.map__pins');
  var pinButtonTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
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
  var getAllPins = function (amount) {
    var data = window.data.getAdvertisements(amount);
    data.forEach(function (obj) {
      pinSection.appendChild(createPin(obj));
    });
  };
  window.pin = {
    getAllPins: getAllPins,
    pinSection: pinSection
  };
})();
