'use strict';
(function () {
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
  var getAdvertisements = function (amount) {
    var advertisements = [];
    for (var j = 0; j < amount; j++) {
      advertisements.push({
        author: {
          avatar: MOCK.author.avatar[j]
        },
        offer: {
          title: MOCK.offer.title[j],
          address: MOCK.offer.address,
          price: window.utils.getRandomIntInclusive(MOCK.offer.price.min, MOCK.offer.price.max),
          type: MOCK.offer.type[window.utils.getRandomNumber(MOCK.offer.type)],
          rooms: window.utils.getRandomIntInclusive(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
          guests: window.utils.getRandomIntInclusive(MOCK.offer.guests.min, MOCK.offer.guests.max),
          checkin: MOCK.offer.checkin[window.utils.getRandomNumber(MOCK.offer.checkin)],
          checkout: MOCK.offer.checkout[window.utils.getRandomNumber(MOCK.offer.checkout)],
          features: window.utils.getRandomArray(MOCK.offer.features),
          description: MOCK.offer.description,
          photos: window.utils.getRandomArray(MOCK.offer.photos)
        },
        location: {
          x: window.utils.getRandomIntInclusive(MOCK.location.x.min, MOCK.location.x.max),
          y: window.utils.getRandomIntInclusive(MOCK.location.y.min, MOCK.location.y.max)
        }
      });
    }
    return advertisements;
  };
  window.data = {
    getAdvertisements: getAdvertisements
  };
})();
