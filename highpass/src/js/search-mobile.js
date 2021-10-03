// SEARCH-MOBILE
let searchTL = gsap.timeline();
let open = document.querySelector(".search-mobile__btn");
let search = document.querySelector(".search-mobile__form");
let reverse = document.querySelector(".search-mobile__btn-close");
let call = document.querySelector(".header__call-top");
let logo = document.querySelector(".header__logo");
let animateSearchTL = searchTL
.from('.search-mobile__btn-close', {opacity: 0, duration: 0.3})
.from('.search-mobile__form', {opacity: 0, x: 250, duration: 0.5, ease: "back.out(1.7)"})
.from('.search-mobile__btn', {opacity: 1, duration: 0.5})
.from('.header__call-top', {opacity: 1, duration: 0.5})
.from('.header__logo', {opacity: 1, duration: 0.5})

open.addEventListener('click', (e) => {
  reverse.classList.add('search-open')
  search.classList.add('search-open')
  open.classList.add('search-open')
  call.classList.add('search-open')
  logo.classList.add('search-open')
  animateSearchTL.play(0.5)
});

reverse.addEventListener('click', (e) => {
  animateSearchTL.reverse()
  setTimeout(function(){search.classList.remove('search-open')},1500)
  setTimeout(function(){reverse.classList.remove('search-open')},1500)
  setTimeout(function(){open.classList.remove('search-open')},1500)
  setTimeout(function(){call.classList.remove('search-open')},1500)
  setTimeout(function(){logo.classList.remove('search-open')},1500)
});
