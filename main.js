$(document).ready(function() {
  // Minimize floating menu
  $(".fancy-menu__minimize").dblclick(function() {
    $(".fancy-menu").css({ width: "", height: "" }).toggleClass("fancy-menu--minimized");
  });

  // Pin
  $(".fancy-menu__pin").click(function() {
    $(".fancy-menu").toggleClass("fancy-menu--pinned");
  });

  // Draggable
  $(".fancy-menu").draggable({ containment: "html" });

  // Move to nearest side
  $(".fancy-menu").mouseleave(function() {
    if (!$(".fancy-menu").hasClass("fancy-menu--pinned")) {
      var viewportWidth = $(window).width();
      var viewportHeight = $(window).height();
      var menuWidth = $(this).outerWidth();
      var menuHeight = $(this).outerHeight();
      var menuOffset = $(this).offset();
      var menuOffsetRight = viewportWidth - menuOffset.left - menuWidth;
      var menuOffsetBottom = viewportHeight - menuOffset.top - menuHeight;

      var distances = [
        menuOffset.left,
        menuOffset.top,
        menuOffsetRight,
        menuOffsetBottom
      ]

      var side = distances.indexOf(Math.min.apply(Math, distances));

      switch (side) {
        case 0:
          $(this).css({ right: "", bottom: "" }).animate({ left: 0 }, 750);
          break;
        case 1:
          $(this).css({ right: "", bottom: "" }).animate({ top: 0 }, 750);
          break;
        case 2:
          $(this).css({ left: "", bottom: "", right: menuOffsetRight }).animate({ right: 0 }, 750);
          break;
        case 3:
          $(this).css({ top: "", right: "", bottom: menuOffsetBottom }).animate({ bottom: 0 }, 750);
          break;
      }
    }
  });

  // Stop on hover
  $(".fancy-menu").mouseenter(function() {
    $(this).stop();
  });

  // Responsive
  $(window).resize(function(){
    if ($(window).width() <= 768){
      $(".fancy-menu").addClass("fancy-menu--minimized");
    }
  });
});
