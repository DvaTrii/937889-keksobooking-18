'use strict';
(function () {
  var adTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var guestNumber = document.querySelector('#capacity');
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
})();
