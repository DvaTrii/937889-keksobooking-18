'use strict';
(function () {
  // выберем div (ins) куда будем вставлять список
  var pinSection = document.querySelector('.map__pins');

  // выберем шаблон тег template и запишем div (tem) с разметкой с переменную
  var pinButtonTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  // parentElement куда вставим  card
  var mapSection = document.querySelector('.map');
  // выберем div (nextSibling) перед чем будем вставлять cards
  var filtersSection = document.querySelector('.map__filters-container');
  window.pin = {
    getAllPins: function (amount) {
      var data = window.data.getAdvertisements(amount);
      data.forEach(function (obj) {
        pinSection.appendChild(createPin(obj));
      });
    }
  };
  var onClickPin = function (advertisement) {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    mapSection.insertBefore(window.card.createCard(advertisement), filtersSection);
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
})();
