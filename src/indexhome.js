// alert("helo");
$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();
  if (scrollTop > 0) {
    $('nav').addClass('navbar-scrolled');
  } else {
    $('nav').removeClass('navbar-scrolled');
  }
});
