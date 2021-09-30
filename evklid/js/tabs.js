document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tabs__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content,.tabs__btn').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
      document.querySelector(`[data-path="${path}"]`).classList.add('tab-content-active');
    });
  });
});
