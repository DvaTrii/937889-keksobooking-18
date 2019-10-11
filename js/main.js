'use strict';

// ============================================= 4 задание обработка событий =============================================
// сделали карту активной - убрали класс .map--faded
// в module4-task2 - скроем карту
// магические кнопки esc enter
// var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// начальные координаты указателя пина относительно метки
var MAIN_PIN_X = 22.5;
var MAIN_PIN_Y = 65;

// Форма с фильтрами .map__filters заблокирована
// Форма заполнения информации об объявлении неактивна
var userDialog = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adTitle = adForm.querySelector('#title');
var adPrice = adForm.querySelector('#price');
var adType = adForm.querySelector('#type');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var roomNumber = adForm.querySelector('#room_number');
var guestNumber = adForm.querySelector('#capacity');
var mapFilters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');
var formFieldSets = adForm.querySelectorAll('fieldset');
// var popupClose = document.querySelector('.popup__close');
// размеры mainPin 45x49 + 17 (острый конец курсора) pin(style left: 0 top: 0) address = left: 22.5px top: 50px+15px=65px
// записываем координаты указателя в поле адрес
var adAddress = (parseFloat(mainPin.style.left) + MAIN_PIN_X) + ',' + (parseFloat(mainPin.style.top) + MAIN_PIN_Y);
var inputAddress = document.querySelector('#address');

// бокирует форму
var disableForm = function () {
  for (var i = 0; i < formFieldSets.length; i++) {
    formFieldSets[i].setAttribute('disabled', 'disabled');
  }
};

// активирует форму
var enableForm = function () {
  for (var i = 0; i < formFieldSets.length; i++) {
    formFieldSets[i].removeAttribute('disabled');
  }
};

// вызовем функцию чтобы заблокировать форму
disableForm();

// функция активации страницы + происходит рендер пинов и снимает обработчик чтоб повторно не вызвать функцию
var activatePage = function () {
  userDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  inputAddress.value = adAddress;
  enableForm();
  getAllPins(8);
  mainPin.removeEventListener('mousedown', activatePage);
  mainPin.removeEventListener('keydown', onMainPinEnterPress);
};

var onMainPinEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
};

mainPin.addEventListener('mousedown', activatePage);
mainPin.addEventListener('keydown', onMainPinEnterPress);

// ============================================= 4 задание валидация формы =============================================
// Заголовок объявления должен бть от 30 д 100 символов
adTitle.addEventListener('invalid', function () {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Минимальная длина заголовка 30 символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Это обязательное поле');
  } else {
    adTitle.setCustomValidity(''); // сбросить значение поля, если это значение стало корректно
  }
});

// тип жилья влияет на минимальную цену
var typeMinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

adType.addEventListener('change', function () {
  adPrice.min = typeMinPrice[adType.value];
  adPrice.placeholder = typeMinPrice[adType.value];
});

// цена
adPrice.addEventListener('invalid', function () {
  if (adPrice.validity.rangeOverflow) {
    adPrice.setCustomValidity('Стоимость не может быть выше 1000000');
  } else if (adPrice.validity.rangeUnderflow) {
    adPrice.setCustomValidity('Стоимость не может быть ниже ' + adPrice.min);
  } else {
    adPrice.setCustomValidity(''); // сбросить значение поля, если это значение стало корректно
  }
});

// время заезда и выезда
timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});

// количество комнат синхрон с количесвом гостей
var guestsValues = {
  1: [2],
  2: [1, 2],
  3: [0, 1, 2],
  100: [3]
};

var setGuests = function (roomsAmount) {
  var guests = guestNumber.options;
  for (var j = 0; j < guests.length; j++) {
    guests[j].setAttribute('disabled', 'disabled');
    guests[j].removeAttribute('selected');
  }
  guestsValues[roomsAmount.value].forEach(function (it) {
    guests[it].removeAttribute('disabled');
  });
};

roomNumber.addEventListener('change', function () {
  setGuests(roomNumber);
});
// ============================================= 4 задание обработка событий на пине и карточке пина =============================================
// сначала надо выбрать этот пин
// повесить на него обработчик по клику или ентер
// и потом генрировать карту исходя из анных этого пина
// ============================================= 4 задание end =============================================

// выберем div (ins) куда будем вставлять список
var pinButtonElement = document.querySelector('.map__pins');
// parentElement куда вставим  card
var mapSection = document.querySelector('.map');
// выберем div (nextSibling) перед чем будем вставлять cards
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
  for (var i = 0; i <= getRandomNumber(arrayName); i++) {
    randomArray.push(arrayName[i]);
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
      max: 1200
    },
    y: {
      min: 130,
      max: 600
    }
  }
};

// объект для type с полями
var OfferType = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalo: 'бунгало'
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
            type: MOCK.offer.type[getRandomNumber(MOCK.offer.type)],
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
  return cardElement;
};

// генерируем объекты и уберем их чтобы не мешали выполнять 4 задание 0 обьектов чтобы не сыпались ошибки
// добавим генерацию в фуенкцию активации страницы
var getAllPins = function (amount) {
  var data = getAdvertisements(amount);

  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragmentPin.appendChild(renderPin(data[i]));
  }
  // var fragmentCard = document.createDocumentFragment();
  // for (i = 0; i < data.length; i++) {
  //   fragmentCard.appendChild(renderCard(data[i]));
  // }
  //  вставляем карточки объектов
  pinButtonElement.appendChild(fragmentPin);
  pinButtonElement.addEventListener('click', function (evt) {
    getCard(evt.target);
  });
  // mapSection.insertBefore(fragmentCard, filtersElements);
};

var getCard = function (data) {
  var fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(renderCard(data));
  mapSection.insertBefore(fragmentCard, filtersElements);
};
