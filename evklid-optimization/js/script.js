// BURGER
$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger,.header-nav").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

// SEARCH
$(document).ready(function () {
  $(".header-search__btn").click(function (event) {
    $(".header-search__btn,.header-search").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

// SWIPER
const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    // dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
});

// TABS
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tabs__btn").forEach(function (tabsBtn) {
    tabsBtn.addEventListener("click", function (event) {
      const path = event.currentTarget.dataset.path;

      document
        .querySelectorAll(".tab-content,.tabs__btn")
        .forEach(function (tabContent) {
          tabContent.classList.remove("tab-content-active");
        });

      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("tab-content-active");
      document
        .querySelector(`[data-path="${path}"]`)
        .classList.add("tab-content-active");
    });
  });
});

// ACCORDION
$(function () {
  $("#accordion").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content",
  });

  $("#accordion").accordion("refresh");
});
