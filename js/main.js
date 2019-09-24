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

// получаем массив с любыми числами по порядку
var getSerialArray = function (quantity) {
  var arrayName = [];
  for (var j = 1; j <= quantity; j++) {
    arrayName.push(j);
  }
  return arrayName;
};

// получаем массив с любыми числами из диапазона
var getArrayOfRandom = function (quantity, min, max) {
  var arrayName = [];
  for (var j = 1; j <= quantity; j++) {
    arrayName.push(getRandomIntInclusive(min, max));
  }
  return arrayName;
};

// получаем массив с случайным количеством строк из элементов готового массива
var getRandomArrayOfArray = function (arrayName) {
  var RandomArrayOfArray = [];
  for (var i = 1; i <= getRandomNumber(arrayName); i++) {
    RandomArrayOfArray.push(arrayName[getRandomNumber(arrayName)]);
  }
  return RandomArrayOfArray;
};

// получаем массив адресов фото для аватаров
var getAvatars = function (i) {
  var AVATARS = [];
  for (var j = 1; j <= i; ++j) {
    AVATARS.push('img/avatars/user0' + j + '.png');
  }
  return AVATARS;
};

// получаем массив адресов для пина
var getAddress = function (i, min, max) {
  var ADDRESS = [];
  for (var j = 1; j <= i; ++j) {
    ADDRESS.push(getRandomIntInclusive(min, max) + ', ' + getRandomIntInclusive(min, max));
  }
  return ADDRESS;
};

// объявляем массивы mock
var AVATARS = getAvatars(8);

var TITLE = [
  'the lovely place',
  'the best location',
  'the comfortable accommodation',
  'the pretty house',
  'the beautiful place',
  'the fancy location',
  'the lovely street',
  'the pretty room',
];

var ADDRESS = getAddress(8, 100, 600);

var PRICE = getArrayOfRandom(8, 100, 800);

var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

// получаем массив с комнатами
var ROOMS = getSerialArray(4);

// получаем массив с гостями
var GUESTS = getSerialArray(4);

var HOURS = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_GIVEN = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var FEATURES = getRandomArrayOfArray(FEATURES_GIVEN);

var DESCRIPTION = [
  'lovely place',
  'best location',
  'comfortable accommodation',
  'pretty house',
  'beautiful place',
  'fancy location',
  'lovely street',
  'pretty rooms',
];

var PHOTOS_GIVEN = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PHOTOS = getRandomArrayOfArray(PHOTOS_GIVEN);

// получает объект с данными из mock
var getAdvertisements = function (amount) {
  var advertisements = [];
  for (var j = 0; j < amount; j++) {
    advertisements.push(
        {
          author: {
            avatar: AVATARS[j]
          },
          offer: {
            title: TITLE[getRandomNumber(TITLE)],
            address: ADDRESS[getRandomNumber(ADDRESS)],
            price: PRICE[getRandomNumber(PRICE)],
            type: TYPE[getRandomNumber(TYPE)],
            rooms: ROOMS[getRandomNumber(ROOMS)],
            guests: GUESTS[getRandomNumber(GUESTS)],
            checkin: HOURS[getRandomNumber(HOURS)],
            checkout: HOURS[getRandomNumber(HOURS)],
            features: FEATURES,
            description: DESCRIPTION[getRandomNumber(DESCRIPTION)],
            photos: PHOTOS
          },
          location: {
            x: getRandomIntInclusive(130, 630),
            y: getRandomIntInclusive(130, 630)
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
