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
		//$(".course-title").each(function(){
		//	console.log($(this).text().replace(/Info/i,"").trim());
		//});
		$(".info-link").each(function(){
			var $this = $(this),
				liElement = $this.parent();
			while(liElement.prop("tagName").toLowerCase() != "li" && liElement != null) { liElement = liElement.parent(); }
			liElement = liElement.parent();
			while(liElement.prop("tagName").toLowerCase() != "li" && liElement != null) { liElement = liElement.parent(); }
			console.log(liElement);
			console.log($this);
			console.log(window.location.hash);
			if(window.location.hash.indexOf(liElement.attr("id")) > -1) {
				$this.click();
				liElement.addClass("highlight");
				liElement.find(".question").addClass("text-success");
				liElement.find(".answer").addClass("text-warning");
			}
		});
		
	});
})(jQuery);
