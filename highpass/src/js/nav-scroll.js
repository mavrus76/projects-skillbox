// NAV-SCROLL
// $(document).ready(function () {
//   $(".header__nav,.header__nav-bottom").on("click", "a", function (event) {
//     event.preventDefault();
//     var id = $(this).attr("href"),
//       top = $(id).offset().top;
//     $("body,html").animate(
//       {
//         scrollTop: top,
//       },
//       1000
//     );
//   });
// });

const anchors = document.querySelectorAll('.header__nav-link')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href')

    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
