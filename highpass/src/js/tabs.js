// TABS

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.projects__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.projects__box,.projects__btn').forEach(function (tabContent) {
        tabContent.classList.remove('tab-active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-active');
      document.querySelector(`[data-path="${path}"]`).classList.add('tab-active');

      let tabsTL = gsap.timeline();
      tabsTL.from('.projects__box', {opacity: 0, duration: 0.5})
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.services__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.services__box,.services__btn').forEach(function (tabContent) {
        tabContent.classList.remove('tab-active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-active');
      document.querySelector(`[data-path="${path}"]`).classList.add('tab-active');

      let tabsTL = gsap.timeline();
      tabsTL.from('.services__box', {opacity: 0, duration: 0.5})
    });
  });
});
