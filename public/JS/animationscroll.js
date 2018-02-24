// Adjusted version of https://codepen.io/bramus/pen/yikfd
// This version also reverses the animation when elements that got slide into view
// succesively slide out of view again.

// In case you're wondering about that `.css('top', $animatable.css('top'))` part:
// -> it's the magic part in this code as it triggers layout, so the browser will 
// render after having deleted the animate-in class and having added the animate-out
// class. That way the animation-play-state will actually change from running to 
// paused to running again, thus triggering the start of the animation

jQuery(function($) {
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');
    // Check all animatables and animate them if necessary
		$animatables.each(function(i) {
       var $animatable = $(this);
      // Items that are "above the fold"
			if (($animatable.offset().top + $animatable.height() - 200) < offset) {
        // Item previously wasn't marked as "above the fold": mark it now
        if (!$animatable.hasClass('animate-in')) {
          $animatable.removeClass('animate-out').css('top', $animatable.css('top')).addClass('animate-in');
        }
			}
      // Items that are "below the fold"
      else if (($animatable.offset().top + $animatable.height() - 10) > offset) { 
        // Item previously wasn't marked as "below the fold": mark it now
        if ($animatable.hasClass('animate-in')) {
          $animatable.removeClass('animate-in').css('top', $animatable.css('top')).addClass('animate-out');
        }
      }
    });
	};
  
  // Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);
  $(window).trigger('scroll');

});