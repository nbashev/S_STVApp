$(function () {
  "use strict";
  var $body = $(document.body),
    keys = window.$$legend.keys;

    $body.on('nav_focus', '.menu-item', function () {
      keys.enter('Показать каталог');
    });

    $body.on('nav_blur', '.menu-item', function () {
      keys.enter('');
    });


  $body.on('nav_focus', '.video-item', function () {
    keys.move('Перемещение по каталогу');
    keys.enter('Воспроизвести видео');
  });

  $body.on('nav_blur', '.video-item', function () {
    keys.move('');
    keys.enter('');

  });

});
