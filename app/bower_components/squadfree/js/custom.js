(function ($) {

	new WOW().init();

	jQuery(window).load(function() { 
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	});


	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

	var vid = document.getElementById("bgvid");
	var pauseButton = document.getElementById("vidpause");
	
	function vidFade() {
		vid.classList.add("stopfade");
	}
	vid.addEventListener('ended', function() {
		// only functional if "loop" is removed
		vid.pause();
		// to capture IE10
		vidFade();
	});
	pauseButton.addEventListener("click", function() {
		vid.classList.toggle("stopfade");
		if (vid.paused) {
			vid.play();
			pauseButton.innerHTML = "Pause";
		} else {
			vid.pause();
			pauseButton.innerHTML = "Paused";
		}
	});

})(jQuery);
