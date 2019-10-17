'use strict';
(function () {
  var TypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var GuestsValues = {
    1: [2],
    2: [1, 2],
    3: [0, 1, 2],
    100: [3]
  };
  var adTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var guestNumber = document.querySelector('#capacity');
  var setGuests = function (roomsAmount) {
    var guests = guestNumber.options;
    for (var j = 0; j < guests.length; j++) {
      guests[j].setAttribute('disabled', 'disabled');
      guests[j].removeAttribute('selected');
    }
    GuestsValues[roomsAmount.value].forEach(function (it) {
      guests[it].removeAttribute('disabled');
    });
  };
  adTitle.addEventListener('invalid', function () {
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Минимальная длина заголовка 30 символов');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Это обязательное поле');
    } else {
      adTitle.setCustomValidity('');
    }
  });

  adType.addEventListener('change', function () {
    adPrice.min = TypeMinPrice[adType.value];
    adPrice.placeholder = TypeMinPrice[adType.value];
  });

  adPrice.addEventListener('invalid', function () {
    if (adPrice.validity.rangeOverflow) {
      adPrice.setCustomValidity('Стоимость не может быть выше 1000000');
    } else if (adPrice.validity.rangeUnderflow) {
      adPrice.setCustomValidity('Стоимость не может быть ниже ' + adPrice.min);
    } else {
      adPrice.setCustomValidity('');
    }
  });
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  roomNumber.addEventListener('change', function () {
    setGuests(roomNumber);
  });
})();
