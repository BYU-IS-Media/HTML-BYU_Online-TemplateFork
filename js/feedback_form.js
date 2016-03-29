/**
 * Collects and submits data from the page (feedback form?)
 */
/*
(function($){
	var submitFeedbackForm = function( e ) {
		e.preventDefault();
		console.log("Submit Running");
		$.ajax({	//	http://indstudy1.org/qualtrics.php?form_id=SV_d5U4bk8YUwDOpFP&person=test_luke_portal&contact_info=anythingyoulike&request=addmeplease
			url:"//indstudy1.org/qualtrics.php?form_id=SV_d5U4bk8YUwDOpFP",
			success: function ( data, status, jqXHR ) {
				console.log(status, data, jqXHR);
				//$("#feedback-form").empty();
				$("#feedback-form input").each(function( i,el) { $(el).val("");});
				$("#feedback-form #submit-message").html('<div>Thank you for your feedback!</div>');
			},
			beforeSend: function ( jqXHR, settings ) {
				var formData = $("#feedback-form").serialize();
				settings.url += "&"+formData;
				console.log(settings.url);
			}
		});
		
		var tid = 6676;
		var tpid = 667;
		var pid = "TytyForm1 "+(new Date().getTime() / 1000);
		
		var pdata = {},
			formSerial = $("#feedback-form").serializeArray(),
			timeStamp = (new Date().getTime() / 1000);
			allFilledOut = true
		;
		e.preventDefault();
		$("#feedback-form input").each(function( i, el ){
			var $el = $(el);
			if($el.val() == "") {
				allFilledOut = false;
				$el.css("border","1px solid red");
				$el.attr("placeholder","Invalid input! "+$el.attr("placeholder"));
			}
		});
		if(allFilledOut) {
			//	The form is filled out and the submission will process...
		} else {
			//	The form is not filled out and this will stop submission.
			return false;
		}
		for(var i=0;i<formSerial.length; i++) {
			if(formSerial[i].name == "person") formSerial[i].name = 'identity';
			pdata[i] = JSON.stringify({
				name:			formSerial[i].name,
				value:		formSerial[i].value,
				"t-id":		tid,
				"tp-id":	tpid,
				"p-id":		pid
			});
		}
		$.ajax({
			type: "POST",
			url: "//is.byu.edu/site/page/landing_page_submit.json.cfm",
			data: pdata,
			success: function() {}
		});
		console.log("Data being sent to landing page data viewer");
		
		
	}
	
	$(document).ready(function(){
		$("#feedback-form #submit").on("click",submitFeedbackForm);
	});
})(jQuery);
*/


$(document).ready(function(){
    var submitButtonEventHandler = function( e ) {
        var request = $('#request').val();
        var person = $('#person').val();
        var contact_info = $('#contact_info').val();
        $.ajax({
            url: "https://docs.google.com/forms/d/15dgQ5_8Gm4L-YS_yOMkNAauKzxM-8V-hdNZetq5MSZU/formResponse",
            type: "POST",
            dataType: "xml",
            data: {
                "entry.878103102": request,
                "entry.2024783072": person,
                "entry.1193629600": contact_info
            },
            complete: function( jqXHR, textStatus ) {
                //console.log("submitButtonHandler",data);
                $("#submit-message").html("<h3>Thank you!</h3><p>Your information has been saved. Thank you for your time.</p>");
            }
        });
    };
    $("#submit").on("click",submitButtonEventHandler);
});
