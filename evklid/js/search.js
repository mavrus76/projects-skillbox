$(document).ready(function () {
  $('.header-search__btn').click(function (event) {
    $('.header-search__btn,.header-search').toggleClass('active');
    $('body').toggleClass('lock');
  });
});
