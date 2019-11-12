'use strict';
(function () {
  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var filters = document.querySelector('.map__filters');
  var filterFields = document.querySelectorAll('.map__filter');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var filterOfFeatures = filters.querySelectorAll('.map__checkbox');

  var getHousingType = function (el) {
    return housingType.value === 'any' ? true : el.offer.type === housingType.value;
  };

  var getHousingPrice = function (el) {
    switch (housingPrice.value) {
      case PriceType.LOW: return el.offer.price <= PriceType.MIN;
      case PriceType.MIDDLE: return el.offer.price >= PriceType.MIN && el.offer.price <= PriceType.MAX;
      case PriceType.HIGH: return el.offer.price >= PriceType.MAX;
      default: return true;
    }
  };

  var getHousingRooms = function (el) {
    return housingRooms.value === 'any' ? true : el.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var getHousingGuests = function (el) {
    return housingGuests.value === 'any' ? true : el.offer.guests === parseInt(housingGuests.value, 10);
  };

  var getFeatures = function (obj) {
    return Array.from(filterOfFeatures).filter(function (el) {
      return el.checked;
    }).map(function (el) {
      return el.value;
    }).every(function (feature) {
      return obj.offer.features.includes(feature);
    });
  };

  var allFilter = function (data) {
    return data.filter(function (obj) {
      return getHousingType(obj) &&
        getHousingPrice(obj) &&
        getHousingRooms(obj) &&
        getHousingGuests(obj) &&
        getFeatures(obj);
    }).slice(0, 5);
  };

  var resetFilters = function () {
    filterFields.forEach(function (it) {
      it.value = 'any';
    });
    filterOfFeatures.forEach(function (it) {
      it.checked = false;
    });
  };

  filters.addEventListener('change', window.debounce(function () {
    window.card.removeCard();
    window.pin.removePins();
    window.pin.renderPins(allFilter(window.allData));
  }));

  window.filters = {
    filters: filters,
    filterFields: filterFields,
    filterOfFeatures: filterOfFeatures,
    resetFilters: resetFilters,
    allFilter: allFilter
  };
})();
