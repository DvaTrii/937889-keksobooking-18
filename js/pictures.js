'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewContainer = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

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
    var photoElement = document.createElement('img');
    photoElement.width = '40';
    photoElement.height = '44';
    previewContainer.setAttribute('style', 'display: flex; align-items: center; justify-content: space-around;');
    previewContainer.appendChild(photoElement);
  };

  var uploadPreview = function () {
    createPhotoPreview();
    var photoPreview = document.querySelector('.ad-form__photo img:last-of-type');
    showPreview(photoFileChooser, photoPreview);
  };

  avatarFileChooser.addEventListener('change', function () {
    showPreview(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    if (Array.from(previewContainer.querySelectorAll('img')).length === 0) {
      uploadPreview();
    } else {
      var previewTemplate = previewContainer.cloneNode(true);
      photosContainer.appendChild(previewTemplate);
      var photoPreview = document.querySelector('.ad-form__photo img:last-of-type');
      showPreview(photoFileChooser, photoPreview);
    }
  });
})();
