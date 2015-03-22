$(document).ready(function() {
  // New menu Transparency
  var floatingMenu = $(".floating-menu");
  floatingMenu.bind("mouseenter", function(){
    $(this).fadeTo("fast", 1);
  });
  floatingMenu.bind("mouseleave", function(){
    $(this).fadeTo("fast", 0.2);
  });
});
