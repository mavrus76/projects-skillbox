// BURGER
let navTL = gsap.timeline();
let burger = document.querySelector(".burger__open");
let nav = document.querySelector(".header__nav-bottom");
let back = document.querySelector(".burger__close");
let borderTop = document.querySelector(".header__bottom");
let callTo = document.querySelector(".header__call");
let animateNavTL = navTL
  .from('.header__nav-bottom', {opacity: 0, y: 30, duration: 0.5, ease: "back.out(1.7)"})
  .from('.burger__close', {opacity: 0, duration: 0.3}, "-=0.5")
  .from('.burger__open', {opacity: 1, duration: 0.5})

  burger.addEventListener('click', (e) => {
    burger.classList.add('nav-open')
    nav.classList.add('nav-open')
    callTo.classList.add('nav-open')
    back.classList.add('nav-open')
    borderTop.classList.add('nav-open')
    animateNavTL.play()
    document.querySelector('body').classList.toggle("lock");
  });

  back.addEventListener('click', (e) => {
    animateNavTL.reverse()
    setTimeout(function(){nav.classList.remove('nav-open')},2000)
    setTimeout(function(){callTo.classList.remove('nav-open')},2000)
    setTimeout(function(){back.classList.remove('nav-open')},2000)
    setTimeout(function(){burger.classList.remove('nav-open')},2000)
    setTimeout(function(){borderTop.classList.remove('nav-open')},2000)
  });
