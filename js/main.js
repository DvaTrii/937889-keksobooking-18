'use strict';

// сделали карту активной - убрали класс .map--faded
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

// выберем div (ins) куда будем вставлять список
var pinButtonElement = document.querySelector('.map__pins');
// parentElement куда вставим  card
var mapSection = document.querySelector('.map');
// выберем div (nextSbling) перед чем будем вставлять cards
var filtersElements = document.querySelector('.map__filters-container');

// выберем шаблон тег template и запишем div (tem) с разметкой с переменную
var pinButtonTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
// выберем шаблон тег template и запишем div (tem) с разметкой с переменную
var cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');


// генерируем случайные номер элемента в массиве
var getRandomNumber = function (arrayName) {
  return Math.floor(Math.random() * arrayName.length);
};

// Получение случайного целого числа в заданном интервале, включительно
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

// получаем массив с случайным количеством строк из элементов готового массива
var getRandomArray = function (arrayName) {
  var randomArray = [];
  for (var i = 1; i <= getRandomNumber(arrayName); i++) {
    randomArray.push(arrayName[getRandomNumber(arrayName)]);
  }
  return randomArray;
};

var MOCK = {
  author: {
    avatar: [
      'img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png'
    ]
  },
  offer: {
    title: [
      'the lovely place',
      'the best location',
      'the comfortable accommodation',
      'the pretty house',
      'the beautiful place',
      'the fancy location',
      'the lovely street',
      'the pretty room'
    ],
    address: '600, 350',
    price: {
      min: 100,
      max: 8000
    },
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: {
      min: 1,
      max: 5
    },
    guests: {
      min: 1,
      max: 10
    },
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: 'decsription',
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  },
  location: {
    x: {
      min: 130,
      max: 630
    },
    y: {
      min: 130,
      max: 630
    }
  }
};

// получает объект с данными из mock
var getAdvertisements = function (amount) {
  var advertisements = [];
  for (var j = 0; j < amount; j++) {
    advertisements.push(
        {
          author: {
            avatar: MOCK.author.avatar[j]
          },
          offer: {
            title: MOCK.offer.title[j],
            address: MOCK.offer.address,
            price: getRandomIntInclusive(MOCK.offer.price.min, MOCK.offer.price.max),
            type: getRandomNumber(MOCK.offer.type),
            rooms: getRandomIntInclusive(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
            guests: getRandomIntInclusive(MOCK.offer.guests.min, MOCK.offer.guests.max),
            checkin: MOCK.offer.checkin[getRandomNumber(MOCK.offer.checkin)],
            checkout: MOCK.offer.checkout[getRandomNumber(MOCK.offer.checkout)],
            features: getRandomArray(MOCK.offer.features),
            description: MOCK.offer.description,
            photos: getRandomArray(MOCK.offer.photos)
          },
          location: {
            x: getRandomIntInclusive(MOCK.location.x.min, MOCK.location.x.max),
            y: getRandomIntInclusive(MOCK.location.y.min, MOCK.location.y.max)
          }
        });
  }
  return advertisements;
};

// меняет значения атрибутов на данные из mock
var renderPin = function (advertisement) {
  var pinElement = pinButtonTemplate.cloneNode(true);
  pinElement.querySelector('img').src = advertisement.author.avatar;
  pinElement.style.left = advertisement.location.x + 'px';
  pinElement.style.top = advertisement.location.y + 'px';
  pinElement.querySelector('img').alt = advertisement.offer.title;
  return pinElement;
};

var renderCard = function (advertisement) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  if (advertisement.offer.type === '0') {
    cardElement.querySelector('.popup__type').textContent = 'дворец';
  } else if (advertisement.offer.type === '1') {
    cardElement.querySelector('.popup__type').textContent = 'квартира';
  } else if (advertisement.offer.type === '2') {
    cardElement.querySelector('.popup__type').textContent = 'бунгало';
  } else if (advertisement.offer.type === '3') {
    cardElement.querySelector('.popup__type').textContent = 'дом';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + advertisement.offer.checkin + ' выезд после ' + advertisement.offer.checkout;
  // cardElement.querySelector('.popup__features') = advertisement.offer.features;
  cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  cardElement.querySelector('.popup__photos').src = advertisement.offer.photos;
  cardElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
  return cardElement;
};

// генерируем объекты
var data = getAdvertisements(8);

var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < data.length; i++) {
  fragmentPin.appendChild(renderPin(data[i]));
}

var fragmentCard = document.createDocumentFragment();
for (i = 0; i < data.length; i++) {
  fragmentCard.appendChild(renderCard(data[i]));
}

// вставляем в разметку
pinButtonElement.appendChild(fragmentPin);
mapSection.insertBefore(fragmentCard, filtersElements);
