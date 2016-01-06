/**
 * Collects and submits data from the page (feedback form?)
 */
(function($){
	var submitFeedbackForm = function( e ) {
		e.preventDefault();
		console.log("Submit Running");
		$.ajax({	//	http://indstudy1.org/qualtrics.php?form_id=SV_d5U4bk8YUwDOpFP&person=test_luke_portal&contact_info=anythingyoulike&request=addmeplease
			url:"//indstudy1.org/qualtrics.php?form_id=SV_d5U4bk8YUwDOpFP",
			success: function ( data, status, jqXHR ) {
				console.log(status, data, jqXHR);
			},
			beforeSend: function ( jqXHR, settings ) {
				var formData = $("#feedback-form").serialize();
				settings.url += "&"+formData;
				console.log(settings.url);
			}
		});
	}
	
	$(document).ready(function(){
		$("#feedback-form button").on("click",submitFeedbackForm);
	});
	
	$( "#feedback-form" ).submit(submitFeedbackForm());
})(jQuery);
