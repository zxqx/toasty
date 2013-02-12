(function($) {
  $.fn.Toasty = function() {
    $("<div id='toasty-guy' style='position: absolute; bottom: 0; right: -296px; width: 296px; height: 287px; background: url(images/toasty.png) no-repeat; display: none;'></div><audio id='toasty-sound' preload='auto'><source src='audio/toasty.mp3' type='audio/mp3' /><source src='audio/toasty.ogg' type='audio/ogg' /></audio>").appendTo("body");

    this.click(function(e) {
      e.preventDefault();
      $("#toasty-sound")[0].play();

      $("body").css("overflow-x", "hidden");

      $("#toasty-guy").show().animate({
        right: "0",
        queue: true,
      }, 300).delay(500).animate({
        right: "-296",
        queue: true
      }, 350, function() {
        $(this).hide();
        $("body").css("overflow-x", "auto");
      });
    });

  };
})(jQuery);