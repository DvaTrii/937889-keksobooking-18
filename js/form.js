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

  var inputAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var formFieldSets = adForm.querySelectorAll('fieldset');
  var adTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var guestNumber = document.querySelector('#capacity');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var resetButton = document.querySelector('.ad-form__reset');

  var setAddress = function (x, y) {
    inputAddress.value = (parseFloat(x) + window.utils.MAIN_PIN_X) + ',' + (parseFloat(y) + window.utils.MAIN_PIN_Y);
    return inputAddress.value;
  };

  var setGuests = function (roomsAmount) {
    var guests = guestNumber.options;

    for (var j = 0; j < guests.length; j++) {
      guests[j].setAttribute('disabled', 'disabled');
      guests[j].removeAttribute('selected');
    }

    GuestsValues[roomsAmount.value].forEach(function (it) {
      guests[it].removeAttribute('disabled');
    });

    var i = GuestsValues[roomsAmount.value][window.utils.getRandomNumber(GuestsValues[roomsAmount.value])];

    guests[i].setAttribute('selected', 'selected');
  };

  var enableForm = function () {
    formFieldSets.forEach(function (it) {
      it.removeAttribute('disabled');
    });
    adForm.classList.remove('ad-form--disabled');
  };

  var disableForm = function () {
    formFieldSets.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
    adForm.classList.add('ad-form--disabled');
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

  var onUpload = function () {
    var onSuccessEscPress = function (evt) {

      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.preventDefault();
        if (document.querySelector('.success')) {
          document.querySelector('.success').remove();
          window.map.setPage();
        }
      }
      document.removeEventListener('keydown', onSuccessEscPress);
      document.removeEventListener('click', closeSuccess);
    };

    var closeSuccess = function () {
      document.querySelector('.success').remove();
      window.map.setPage();
      document.removeEventListener('click', closeSuccess);
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    window.map.mainSection.appendChild(successTemplate);
    window.map.disablePage();
    window.map.setPage();

    document.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onUpload, window.map.onError);
    evt.preventDefault();
  });

  resetButton.addEventListener('click', function () {
    window.map.setPage();
  });

  window.form = {
    adForm: adForm,
    enableForm: enableForm,
    disableForm: disableForm,
    setAddress: setAddress
  };
})();
