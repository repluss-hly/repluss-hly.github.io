(function () {
  'use strict';

  var audio = document.getElementById('bgm');
  if (!audio) return;

  var hint = document.getElementById('bgm-hint');
  var toggle = document.getElementById('bgm-toggle');
  var started = false;

  function start() {
    if (started) return;
    started = true;

    audio.muted = false;
    audio.play().catch(function () {
      // 极少数锁定场景：只能依靠手动按钮
      if (toggle) toggle.hidden = false;
    });

    if (hint) hint.classList.add('faded');
  }

  function tryMutedPlay() {
    // 静音自动播放所有浏览器都允许，用于触发预加载
    audio.muted = true;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  // 首次用户交互时解除静音并播放
  document.addEventListener('pointerdown', start, { once: true });
  document.addEventListener('keydown', start, { once: true });
  document.addEventListener('touchstart', start, { once: true });

  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      start();
    });
  }

  // 点击图片也触发播放
  var img = document.querySelector('.music-image');
  if (img) {
    img.addEventListener('click', start);
  }

  tryMutedPlay();
})();
