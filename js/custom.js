(function($){
	$(document).ready(function(){
		$("a.info-link").on("click",function( e ) {
			var $this = $(this),
				$parent = $this.parent().parent(),
				$info = $parent.find(".course-descriptive, .answer")
			;
			console.log("info link clicked");
			if($info.hasClass("selected")) {
				$info.removeAttr("style");
				$info.removeClass("selected");
			} else {
				var heightDetector = $info.clone().addClass("selected");
				heightDetector.insertAfter($info);
				var height = heightDetector.height();
				heightDetector.remove();
				$info.css('height',height+"px");
				$info.addClass("selected");
			}
		});
		$('.bxslider').bxSlider({
			  mode: 'fade',
			  captions: true
		});
		$(".course-title").each(function(){
			console.log($(this).text().replace(/Info/i,"").trim());
		});
	});
})(jQuery);
