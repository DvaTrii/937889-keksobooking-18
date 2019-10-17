'use strict';
(function () {
  var OfferType = {
    palace: 'дворец',
    flat: 'квартира',
    house: 'дом',
    bungalo: 'бунгало'
  };
  var cardTemplate = document.querySelector('#card')
    .content.querySelector('.popup');

  var onCardEscPress = function (evt) {
    var card = document.querySelector('.popup');
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      evt.preventDefault();
      if (card) {
        card.remove();
      }
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var createCard = function (advertisement) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferType[advertisement.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + advertisement.offer.checkin + ' выезд после ' + advertisement.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    advertisement.offer.features.forEach(function (it) {
      var featuresElement = document.createElement('li');
      featuresElement.className = 'popup__feature popup__feature--' + it;
      cardElement.querySelector('.popup__features').appendChild(featuresElement);
    });
    cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    advertisement.offer.photos.forEach(function (it) {
      var photosElement = document.createElement('img');
      photosElement.className = 'popup__photo';
      photosElement.height = 40;
      photosElement.width = 45;
      photosElement.alt = 'Фотография жилья';
      photosElement.src = it;
      cardElement.querySelector('.popup__photos').appendChild(photosElement);
    });
    cardElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.remove();
    });
    document.addEventListener('keydown', onCardEscPress);
    return cardElement;
  };

  window.card = {
    createCard: createCard
  };

})();
