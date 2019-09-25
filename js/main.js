'use strict';

// сделали карту активной - убрали класс .map--faded
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

// выберем div (ins) куда будем вставлять список похожих персонажей
var pinButtonElement = document.querySelector('.map__pins');

// выберем шаблон тег template и запишем div (tem) с разметкой с переменную
var pinButtonTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');


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
var getRandomArrayOfArray = function (arrayName) {
  var RandomArrayOfArray = [];
  for (var i = 1; i <= getRandomNumber(arrayName); i++) {
    RandomArrayOfArray.push(arrayName[getRandomNumber(arrayName)]);
  }
  return RandomArrayOfArray;
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
    description: '',
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
            checkin: getRandomNumber(MOCK.offer.checkin),
            checkout: getRandomNumber(MOCK.offer.checkout),
            features: getRandomArrayOfArray(MOCK.offer.features),
            description: MOCK.offer.description,
            photos: getRandomArrayOfArray(MOCK.offer.photos)
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

// генерируем объекты
var fragment = document.createDocumentFragment();
var pinsData = getAdvertisements(8);
for (var i = 0; i < pinsData.length; i++) {
  fragment.appendChild(renderPin(pinsData[i]));
}

// вставляем в разметку
pinButtonElement.appendChild(fragment);
