(function($){
	$(document).ready(function(){
		$("a.info-link").on("click",function( e ) {
			var $this = $(this),
				$parent = $this.parent().parent(),
				$info = $parent.find(".course-descriptive, .answer")
			;
			if($info.hasClass("selected")) {
				$info.removeClass("selected");
			} else {
				$info.addClass("selected");
			}
			console.log($info.hasClass("selected"));
			console.log($info);
			console.log($parent);
		});
		$('.bxslider').bxSlider({
			  mode: 'fade',
			  captions: true
		});
	});
})(jQuery);
