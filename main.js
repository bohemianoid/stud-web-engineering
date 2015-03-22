$(document).ready(function() {
  // New menu transparency
  var floatingMenu = $(".floating-menu");
  floatingMenu.mouseenter(function(){
    $(this).fadeTo("fast", 1);
  });
  floatingMenu.mouseleave(function(){
    $(this).fadeTo("fast", 0.2);
  });

  // minimize
  $(".minimize").dblclick(function() {
    $(".floating-menu").toggleClass("floating-menu-not-minimized").toggleClass("floating-menu-minimized");
  });

  // pin
  $(".pin").click(function() {
    $(this).toggleClass("pin-on").toggleClass("pin-off");
  });

  // Draggable
  // can jQuery UI be used?
});
