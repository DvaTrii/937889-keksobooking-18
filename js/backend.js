'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 5000;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
