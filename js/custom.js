(function(window, $){
	var Plugin = function(elem){
		this.elem = elem;
		this.$elem = $(elem);
	};
	Plugin.prototype = {
		setTestLocation:function(elem) {
			if(elem!=undefined)
				this.testLocation = elem;
			else
				this.testLocation = $("body > *").last();
			return this;
		},
		setAnimationHeight: function() {
			var $this = this.$elem,
				heightDetector = $this.clone().addClass("selected");
			heightDetector.insertAfter(this.testLocation);
			heightDetector.removeAttr("style");
			var height = heightDetector.height();
			heightDetector.remove();
			$this.attr("data-animation-height",height);
			return this;
		}
	};
	$.fn.setAnimationHeight = function(elem) {
		return this.each(function() {
			new Plugin(this).setTestLocation(elem).setAnimationHeight();
		});
	};
	window.Plugin = Plugin;
})(window, jQuery);

(function($, undefined){
	$(document).ready(function(){
		$("a.info-link").on("click",function( e ) {
			var $this = $(this),
				$parent = $this.parent().parent(),
				$info = $parent.find(".course-descriptive, .answer")
			;
			//console.log("info link clicked");
			if($info.hasClass("selected")) {
				$info.removeAttr("style");
				$info.removeClass("selected");
			} else {
				$info.setAnimationHeight($info);
				var height = $info.attr("data-animation-height");
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
			while(liElement != undefined && liElement.length > 0 && typeof liElement.prop("tagName") == "string" && liElement.prop("tagName").toLowerCase() != "li") { liElement = liElement.parent(); }
			liElement = liElement.parent();
			while(liElement != undefined && liElement.length > 0 && typeof liElement.prop("tagName") == "string" && liElement.prop("tagName").toLowerCase() != "li") { liElement = liElement.parent(); }
			if(liElement) {
				if(window.location.hash.indexOf(liElement.attr("id")) > -1) {
					$this.click();
					liElement.addClass("highlight");
					liElement.find(".question").addClass("text-success");
					liElement.find(".answer").addClass("text-warning");
				}
			}
		});
		if(window.location.hash.length > 0) {
			console.log("scrolling to hash "+window.location.hash);
			$('html,body').animate({ scrollTop: $(window.location.hash).offset().top});
		}
	});
})(jQuery, undefined);
