(function () {
  'use strict';
  var mobile = document.documentElement.classList.contains('m');

  /* menú móvil */
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mmenu');
  if (burger && menu) {
    menu.hidden = false;
    burger.addEventListener('click', function () {
      var open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  /* vídeos de las galerías: se reproducen en silencio y en bucle cuando están a la vista */
  var vids = Array.prototype.slice.call(document.querySelectorAll('.gi video'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.1 });
    vids.forEach(function (v) { v.muted = true; io.observe(v); });
  }

  /* visor a pantalla completa de las galerías de proyectos */
  var lb = document.querySelector('.lb');
  if (!lb) return;
  var layer = document.querySelector(mobile ? '.mo' : '.d');
  var items = Array.prototype.slice.call(layer.querySelectorAll('.gi[data-lb]'));
  if (!items.length) return;
  var stage = lb.querySelector('.lb-stage'), prev = lb.querySelector('.lb-prev'), next = lb.querySelector('.lb-next');
  var cur = 0, lastFocus = null;
  lb.hidden = false;

  function render() {
    var it = items[cur];
    var img = it.querySelector('img'), vid = it.querySelector('video');
    stage.innerHTML = '';
    if (vid) {
      var v = document.createElement('video');
      v.src = vid.getAttribute('src'); v.controls = true; v.autoplay = true; v.loop = true; v.playsInline = true; v.muted = true;
      stage.appendChild(v);
    } else if (img) {
      var i = document.createElement('img');
      i.src = img.getAttribute('data-full') || img.currentSrc || img.src; i.alt = img.alt || '';
      stage.appendChild(i);
    }
    prev.hidden = cur === 0;
    next.hidden = cur === items.length - 1;
  }
  function open(i) {
    cur = i; lastFocus = document.activeElement; render();
    lb.classList.add('open'); document.documentElement.style.overflow = 'hidden';
    lb.querySelector('.lb-x').focus();
  }
  function close() {
    lb.classList.remove('open'); stage.innerHTML = ''; document.documentElement.style.overflow = '';
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (el, i) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  prev.addEventListener('click', function () { if (cur > 0) { cur--; render(); } });
  next.addEventListener('click', function () { if (cur < items.length - 1) { cur++; render(); } });
  lb.querySelector('.lb-x').addEventListener('click', close);
  lb.querySelector('.lb-full').addEventListener('click', function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (lb.requestFullscreen) lb.requestFullscreen();
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev.click();
    else if (e.key === 'ArrowRight') next.click();
  });
  var sx = null;
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (dx > 50) prev.click(); else if (dx < -50) next.click();
  });
})();
