$(document).ready(function () {
  //Navigation menu scrollTo
  "header nav ul li a".addEventListener("click", function (event) {
    event.preventDefault();
    let section = this.getAttribute("href");
    let section_pos = getPosition(section);

    if (section_pos) {
      window.scrollTo({ top: section_pos.top, left: "0px" }, 1000);
    }
  });

  ".app_link".addEventListener("click", function (e) {
    event.preventDefault();
    const heroPosition = getPosition("#hero");
    window.scrollTo({ top: heroPosition.top, left: "0px" }, 1000);
  });

  //Show & Hide menu on mobile
  ".burger_icon".addEventListener("click", function () {
    "header nav".classList.toggle("show");
    "header .burger_icon".classList.toggle("active");
  });

  //wow.js on scroll animations initialization
  wow = new WOW({
    animateClass: "animated",
    mobile: false,
    offset: 50,
  });
  wow.init();

  //parallax effect initialization
  ".hero".parallax("50%", 0.3);

  //Nice scroll initialization
  "html".niceScroll({
    scrollspeed: 50,
    autohidemode: false,
    cursorwidth: 8,
    cursorborderradius: 8,
    cursorborder: "0",
    background: "rgba(48, 48, 48, .4)",
    cursorcolor: "#1f1f1f",
    zindex: 999,
  });

  //Testimonials slider initialization
  "#tslider".owlCarousel({
    items: 1,
    navigation: true,
    pagination: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    responsive: true,
    autoPlay: true,
    transitionStyle: "fade",
  });

  //Mailchimp subscription form initialization
  "#submit_form".addEventListener("submit", function () {
    "#mc_submit".getAttribute("disabled");
    processing("icon", "loading");
  });

  if ("#submit_form".length) {
    //Mailchim Subscription form
    "#submit_form".ajaxChimp({
      callback: chimpResponce,
    });
  }

  //Mail chimp callback function
  function chimpResponce(resp) {
    if (resp.result === "success") {
      processing("loading", "icon");
      "#mc_submit".removeAttribute("disabled", "disabled");
      $("#submit_form #mc-email").val("");
      $("#error_msg").hide();
      $("#success_msg").show();
    } else {
      processing("loading", "icon");
      $("#success_msg").hide();
      $("#error_msg").show();
      $("#mc_submit").removeAttribute("disabled", "disabled");
    }
  }

  function processing(hide, show) {
    $("#mc_submit i").removeClass(hide).addClass(show);
  }

  function getPosition(el) {
    const { top, left } = el.getBoundingClientRect();
    const { marginTop, marginLeft } = getComputedStyle(el);
    return {
      top: top - parseInt(marginTop, 10),
      left: left - parseInt(marginLeft, 10),
    };
  }

  //Popup video
  $("#play_video").click(function (e) {
    e.preventDefault();

    var video_link = $(this).data("video");
    video_link =
      '<iframe src="' +
      video_link +
      '" width="500" height="208" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

    $(".about_video").append(video_link).fadeIn(200);
  });

  $(".close_video").click(function (e) {
    e.preventDefault();

    $(".about_video").fadeOut(200, function () {
      $("iframe", this).remove();
    });
  });
});
