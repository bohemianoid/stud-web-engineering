$(document).ready(function() {
  // Minimize floating menu
  $(".minimize").dblclick(function() {
    $(".floating-menu").toggleClass("floating-menu-not-minimized").toggleClass("floating-menu-minimized");
    $(".floating-menu .pin").toggleClass("opacity0");

    if ($(".floating-menu").hasClass("floating-menu-not-minimized"))
      $(".floating-menu li a").css({
        "height":"8em",
        "width":"8em"
      });
    else
      $(".floating-menu li a").css({
        "height":0,
        "width":0
      });
  });

  // pin
  $(".pin").click(function() {
    $(this).toggleClass("pin-on").toggleClass("pin-off");
  });

  // Draggable
  $(".floating-menu").draggable();

  // Move to nearest side
  $(".floating-menu").mouseleave(function() {
    if ($(".pin").hasClass("pin-on")) {
      // TODO: write code here for nearest side
    }
  });
});
