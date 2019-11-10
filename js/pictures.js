'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');

  var showPreview = function (fileChooser, preview) {
    var files = fileChooser.files;
    Array.from(files).forEach(function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var createPhotoPreview = function () {
    var photoContainer = document.querySelector('.ad-form__photo');
    var photoElement = document.createElement('img');
    photoElement.width = '40';
    photoElement.height = '44';
    photoContainer.setAttribute('style', 'display: flex; align-items: center; justify-content: space-around;');
    photoContainer.appendChild(photoElement);
  };

  avatarFileChooser.addEventListener('change', function () {
    showPreview(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    createPhotoPreview();
    var photoPreview = document.querySelector('.ad-form__photo img');
    showPreview(photoFileChooser, photoPreview);
  });
})();
