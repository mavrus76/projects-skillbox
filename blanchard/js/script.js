// NAV SCROLL
$(document).ready(function () {
  $("#nav,.hero__atop").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate(
      {
        scrollTop: top,
      },
      1000
    );
  });
});

// DROPDOWN
$(".bottom__btn").click(function () {
  if ($(".open").length > 0) {
    if (!$(this).hasClass("open")) {
      $(".open").removeClass("open");
    }
  }
  $(this).toggleClass("open");
});

jQuery(document).on("click", function (e) {
  var el = ".bottom__list";
  if (jQuery(e.target).closest(el).length) return;
  $(".open").removeClass("open");
});

$(".bottom__btn li").click(function () {
  var cur = $(this).text();
  $(this).parent().find("a").text(cur);
});

const btnMenu1 = document.querySelector(".dropdown__btn-1");
const menu1 = document.querySelector(".dd-1");
const toggleMenu1 = function () {
  menu1.classList.toggle("open");
};

btnMenu1.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu1();
});

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu1 || menu1.contains(target);
  const its_btnMenu = target == btnMenu1;
  const menu_is_active = menu1.classList.contains("open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu1();
  }
});

const btnMenu2 = document.querySelector(".dropdown__btn-2");
const menu2 = document.querySelector(".dd-2");
const toggleMenu2 = function () {
  menu2.classList.toggle("open");
};

btnMenu2.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu2();
});

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu2 || menu2.contains(target);
  const its_btnMenu = target == btnMenu2;
  const menu_is_active = menu2.classList.contains("open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu2();
  }
});

const btnMenu3 = document.querySelector(".dropdown__btn-3");
const menu3 = document.querySelector(".dd-3");
const toggleMenu3 = function () {
  menu3.classList.toggle("open");
};

btnMenu3.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu3();
});

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu3 || menu3.contains(target);
  const its_btnMenu = target == btnMenu3;
  const menu_is_active = menu3.classList.contains("open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu3();
  }
});

const btnMenu4 = document.querySelector(".dropdown__btn-4");
const menu4 = document.querySelector(".dd-4");
const toggleMenu4 = function () {
  menu4.classList.toggle("open");
};

btnMenu4.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu4();
});

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu4 || menu4.contains(target);
  const its_btnMenu = target == btnMenu4;
  const menu_is_active = menu4.classList.contains("open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu4();
  }
});

const btnMenu5 = document.querySelector(".dropdown__btn-5");
const menu5 = document.querySelector(".dd-5");
const toggleMenu5 = function () {
  menu5.classList.toggle("open");
};

btnMenu5.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu5();
});

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu5 || menu5.contains(target);
  const its_btnMenu = target == btnMenu5;
  const menu_is_active = menu5.classList.contains("open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu5();
  }
});

// SEARCH FOCUS BLUR
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".search__input")
    .addEventListener("focus", function () {
      document.querySelector(".search__btn").classList.toggle("active");
    });
  document
    .querySelector(".search__input")
    .addEventListener("blur", function () {
      document.querySelector(".search__btn").classList.remove("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".search-mobile__input")
    .addEventListener("focus", function () {
      document.querySelector(".search-mobile__btn").classList.toggle("active");
    });
  document
    .querySelector(".search-mobile__input")
    .addEventListener("blur", function () {
      document.querySelector(".search-mobile__btn").classList.remove("active");
    });
});

// SELECT
const element = document.querySelector("select");
const choices = new Choices(element, {
  searchEnabled: false,
  shouldSort: false,
  noChoicesText: "",
  itemSelectText: "",
  renderChoiceLimit: 2,
});

// BURGER
$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger,.header__nav").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

$(document).ready(function () {
  $(".nav__link").click(function (event) {
    $(".header__burger,.header__nav").removeClass("active");
    $("body").removeClass("lock");
  });
});

// SEARCH MOBILE
$(document).ready(function () {
  $(".search-mobile__btn-open").click(function () {
    $(".header__search-mobile").toggleClass("active");
    $(".search-mobile__btn-open").css("display", "none");
  });
});

$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__search-mobile").removeClass("active");
    $(".search-mobile__btn-open").css("display", "block");
  });
});

// ACCORDION
$(function () {
  $(".acc").accordion({
    collapsible: false,
    active: false,
    heightStyle: "content",
  });

  $(".acc").accordion("refresh");
});

// EVENTS
$(document).ready(function () {
  $(".events__btn").click(function (event) {
    $(".card-4,.card-5,.events__btn").toggleClass("active");
  });
});

$(document).ready(function () {
  $(".events__btn").click(function (event) {
    $(".card-3").toggleClass("active");
  });
});

// CHECKBOX LABEL
$("label").on("click", "input:checkbox", function () {
  $(this).parent().toggleClass("highlight", this.checked);
});

$(document).ready(function () {
  $(".form-categories__label-active").click(function (event) {
    $(".form-categories__label-active").removeClass("is-active");
  });
});

// ACCORDION TABS
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".catalog__btn-flag").forEach(function (tabsBtn) {
    tabsBtn.addEventListener("click", function (event) {
      const path = event.currentTarget.dataset.path;

      document
        .querySelectorAll(
          ".flag-content,.catalog__btn-flag,.acc__btn,.artist-info"
        )
        .forEach(function (tabContent) {
          tabContent.classList.remove("tab-active");
        });
      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("tab-active");
      document
        .querySelector(`[data-path="${path}"]`)
        .classList.add("tab-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-fr").addEventListener("click", function () {
    document.querySelector(".artist-info-fr").classList.add("tab-active");
  });

  document.querySelector(".btn-fr").addEventListener("click", function () {
    document.querySelector(".acc__btn-fr").classList.add("tab-active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-de").addEventListener("click", function () {
    document.querySelector(".artist-info-de").classList.add("tab-active");
  });

  document.querySelector(".btn-de").addEventListener("click", function () {
    document.querySelector(".acc__btn-de").classList.add("tab-active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-it").addEventListener("click", function () {
    document.querySelector(".artist-info-it").classList.add("tab-active");
  });

  document.querySelector(".btn-it").addEventListener("click", function () {
    document.querySelector(".acc__btn-it").classList.add("tab-active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-ru").addEventListener("click", function () {
    document.querySelector(".artist-info-ru").classList.add("tab-active");
  });

  document.querySelector(".btn-ru").addEventListener("click", function () {
    document.querySelector(".acc__btn-ru").classList.add("tab-active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-bel").addEventListener("click", function () {
    document.querySelector(".artist-info-bel").classList.add("tab-active");
  });

  document.querySelector(".btn-bel").addEventListener("click", function () {
    document.querySelector(".acc__btn-bel").classList.add("tab-active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".acc__btn").forEach(function (tabsBtn) {
    tabsBtn.addEventListener("click", function (event) {
      const path = event.currentTarget.dataset.path;

      document
        .querySelectorAll(".acc__btn,.artist-info")
        .forEach(function (tabContent) {
          tabContent.classList.remove("tab-active");
        });

      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("tab-active");
      document
        .querySelector(`[data-path="${path}"]`)
        .classList.add("tab-active");
    });
  });
});

// SWIPERS
const swiper = new Swiper(".slider", {
  loop: true,
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    686: {
      loop: false,
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
      slidesPerColumn: 2,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    1500: {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
      slidesPerColumn: 2,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});

const swiper1 = new Swiper(".slider-1", {
  loop: true,
  speed: 600,
  breakpoints: {
    686: {
      slidesPerView: 2,
      spaceBetween: 34,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    941: {
      slidesPerView: 2,
      spaceBetween: 49,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 50,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});

const swiper2 = new Swiper(".slider-2", {
  loop: true,
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 34,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    686: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    941: {
      slidesPerView: 2,
      spaceBetween: 50,
      slidesPerGroup: 2,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});

const swiper3 = new Swiper(".slider-3", {
  loop: true,
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 27,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// SPOILER
$(document).ready(function () {
  $(".spoiler-title").click(function () {
    $(this).parent().children(".spoiler-content").toggle("fast");
    return false;
  });
});

$(document).ready(function () {
  $(".spoiler-title").click(function () {
    $(".spoiler-title").toggleClass("active");
    return false;
  });
});

// MAP
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.75846306898368, 37.601079499999905],
    zoom: 16,
  });

  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [55.75846306898368, 37.601079499999905],
    },
  });

  var myPlacemark = new ymaps.Placemark(
    [55.75846306898368, 37.601079499999905],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "/img/location.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    }
  );
  myMap.geoObjects.add(myPlacemark);

  // myMap.geoObjects.add(myGeoObject);
  myMap.geoObjects.add(myPlacemark);

  // myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove("searchControl"); // удаляем поиск
  myMap.controls.remove("trafficControl"); // удаляем контроль трафика
  myMap.controls.remove("typeSelector"); // удаляем тип
  myMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove("rulerControl"); // удаляем контрол правил
}

// MASKVALIDATE FORM
var selector = document.querySelector("input[type ='tel']");
var im = new Inputmask("+7 (999) 999-99-99");

im.mask(selector);

new JustValidate(".contacts__form", {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },
  messages: {
    name: {
      minLength: "Минимальная длина 2 символа",
      maxLength: "Максимальная длина 30 символов",
      required: "Как вас зовут?",
    },
    tel: {
      required: "Укажите ваш телефон",
    },
  },

  submitHandler: function (form, values, ajax) {
    ajax({
      url: "https://just-validate-api.herokuapp.com/submit",
      method: "POST",
      data: values,
      async: true,
      callback: function (response) {
        console.log(response);
      },
    });
  },
});

