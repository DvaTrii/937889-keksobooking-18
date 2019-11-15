'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var isTimeout;

  var createXHR = function (onLoad, onError, method, link, data) {
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

    if (isTimeout) {
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 5000;
    }

    xhr.open(method, link);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    isTimeout = true;
    createXHR(onLoad, onError, 'GET', URL + '/data');
  };

  var save = function (data, onLoad, onError) {
    isTimeout = false;
    createXHR(onLoad, onError, 'POST', URL, data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
