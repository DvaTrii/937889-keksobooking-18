'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoContainer = document.querySelector('.ad-form__photo');
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
    previewPhotoContainer.setAttribute('style', 'display: flex; align-items: center; justify-content: space-around;');
    previewPhotoContainer.appendChild(photoElement);
  };

  var uploadPreview = function () {
    createPhotoPreview();
    var photoPreview = document.querySelector('.ad-form__photo img:last-of-type');
    showPreview(photoFileChooser, photoPreview);
  };

  var removeAvatar = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
  };

  var removePhotos = function () {
    var allPhotoContainers = document.querySelectorAll('.ad-form__photo');

    allPhotoContainers.forEach(function (it) {
      it.remove();
    });
    var container = document.createElement('div');
    container.classList.add('ad-form__photo');
    photosContainer.appendChild(container);
    previewPhotoContainer = document.querySelector('.ad-form__photo');
  };

  avatarFileChooser.addEventListener('change', function () {
    showPreview(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    if (Array.from(previewPhotoContainer.querySelectorAll('img')).length === 0) {
      uploadPreview();
    } else {
      var previewTemplate = previewPhotoContainer.cloneNode(true);
      photosContainer.appendChild(previewTemplate);
      var photoPreview = document.querySelector('.ad-form__photo img:last-of-type');
      showPreview(photoFileChooser, photoPreview);
    }
  });

  window.pictures = {
    removeAvatar: removeAvatar,
    removePhotos: removePhotos
  };
})();
