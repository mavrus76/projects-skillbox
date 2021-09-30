const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    // dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Автовысота
  autoHeight: true,

  // Effects
  // effect: 'cube',

  // cubeEffect: {
  //   slideShadows: true,
  //   shadow: true,
  //   shadowOffset: 20,
  //   shadowScale: 0.94
  // }

  // Автопрокрутка
  autoplay: {
    // Пауза между прокруткой
    delay: 6000,
    // Закончитьна на последнем слайде
    stopOnLastSlide: false,
    // Отключить после ручного переключения
    disableOnInteraction: false
  }

});
