/*
 * Borrowed from http://jqueryui.com/autocomplete/#combobox
 * 
 * 2015-03-10 9:57AM
 * 
 */

(function( $ ) {
	/*
	 * Custom data for class list
	 */
	var classes = [
		{'short-title':"EXSC 221", 'title': "Exercise Science"},
		{'short-title':"HLTH 335", 'title':"Health Behavior Change"},
		{'short-title':"IHUM 202", 'title':"Western Humanities"},
		{'short-title':"M COM 320", 'title':"Communication in Organization Settings"},
		{'short-title':"NDFS 100", 'title':"Essentials of Nutrition"},
		{'short-title':"PDBIO 210", 'title':"Human Anantomy"},
		{'short-title':"PHSCS 127", 'title':"Descriptive Astronomy"},
		{'short-title':"PSYCH 111", 'title':"General Psychology"},
		{'short-title':"REL A 212", 'title':"The New Testament"},
		{'short-title':"REL C 324", 'title':"The Doctrine and Covenants"},
		{'short-title':"REL C 333", 'title':"The Living Prophets"},
		{'short-title':"SFL 160", 'title':"Introduction to Family Processes"},
		{'short-title':"SFL 260", 'title':"Family Finance"},
		{'short-title':"SOC 111", 'title':"Introductory Sociology"}
		/*,
		{'short-title':"STDEV 150", 'title':"Public Speaking"}
		*/
	];
	for(var i=0;i<classes.length;i++) {
		//var title = classes[i]['short-title']+": "+classes[i]['title'];
		//$("#combobox").append($('<option value="'+title+'">'+title+'</option>'));
	}
	
	
	
	$.widget( "custom.combobox", {
		_create: function() {
			this.wrapper = $( "<span>" )
				.addClass( "custom-combobox" )
				.insertAfter( this.element );
	 
			this.element.hide();
			this._createAutocomplete();
			this.input.attr("placeholder", this.element.attr('placeholder'));
			
			this._createShowAllButton();
		},
 
		_createAutocomplete: function() {
			var selected = this.element.children( ":selected" ),
				value = selected.val() ? selected.text() : "";
 
			this.input = $( "<input>" )
				.appendTo( this.wrapper )
				.val( value )
				.attr( "title", "" )
				.addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left ui-corner-right" )
				.autocomplete({
					delay: 0,
					minLength: 0,
					source: $.proxy( this, "_source" )
				})
				.tooltip({
					tooltipClass: "ui-state-highlight"
				});
 
			this._on( this.input, {
				autocompleteselect: function( event, ui ) {
					ui.item.option.selected = true;
					this._trigger( "select", event, {
						item: ui.item.option
					});
				},
 
				autocompletechange: "_removeIfInvalid"
			});
		},
 
		_createShowAllButton: function() {
			var input = this.input,
				wasOpen = false;
 
			$( "<a>" )
				.attr( "tabIndex", -1 )
				.attr( "title", "Show All Items" )
				.tooltip()
				.appendTo( this.wrapper )
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass( "ui-corner-all" )
				.addClass( "custom-combobox-toggle ui-corner-right" )
				.mousedown(function() {
					wasOpen = input.autocomplete( "widget" ).is( ":visible" );
				})
				.click(function() {
					input.focus();
 
					// Close if already visible
					if ( wasOpen ) {
						return;
					}
 
					// Pass empty string as value to search for, displaying all results
					input.autocomplete( "search", "" );
				});
		},
 
		_source: function( request, response ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			response( this.element.children( "option" ).map(function() {
				var text = $( this ).text();
				if ( this.value && ( !request.term || matcher.test(text) ) )
					return {
						label: text,
						value: text,
						option: this
					};
			}) );
		},
 
		_removeIfInvalid: function( event, ui ) {

			// Selected an item, nothing to do
			if ( ui.item ) {
				return;
			}
 
			// Search for a match (case-insensitive)
			var value = this.input.val(),
				valueLowerCase = value.toLowerCase(),
				valid = false;
			this.element.children( "option" ).each(function() {
				if ( $( this ).text().toLowerCase() === valueLowerCase ) {
					this.selected = valid = true;
					return false;
				}
			});
 
			// Found a match, nothing to do
			if ( valid ) {
				return;
			}
 
			// Remove invalid value
			this.input
				.val( "" )
				.attr( "title", value + " didn't match any item" )
				.tooltip( "open" );
			this.element.val( "" );
			this._delay(function() {
				this.input.tooltip( "close" ).attr( "title", "" );
			}, 2500 );
			this.input.autocomplete( "instance" ).term = "";
			$(".course-data").empty();
		},
 
		_destroy: function() {
			this.wrapper.remove();
			this.element.show();
		}
	});
	
	$(function() {
		var coursePage = $("<div></div>");
		$.ajax("Classes.html").success(function(  textResult, status, jqXHR ){
			var justBody = (/\<body[^\>]*\>((.|[\r\n])+)\<\/body/gim).exec(textResult);
			if(justBody.length > 1) {
				justBody = justBody[1];
			}else justBody = "<div>Error: No data found.</div>";
			coursePage.append($(justBody).find("#class-list"));
		});
		
		$( "#combobox" ).combobox({select: function() {
			try {
				var courseSelector = "#" + $(this).val().replace(/[\s\W]/ig,"-").replace(/\-{2,}/g,"-"),
					courseSelected = $('<div>' + coursePage.find(courseSelector)[0].innerHTML + '</div>').addClass("course-data");
			;
			} catch(err) {
				console.log($(this).val() + " produced an error!");
				console.log(err);
				console.log(courseSelector);
			}
			courseSelected.find(".info-link").remove();
			courseSelected.find(".course-descriptive").addClass("selected");
			
			$("#course-data-display").empty().append(courseSelected);
			//console.log(coursePage);
			//console.log(courseSelector);
			//console.log(courseSelected);
			/*
			var heightDetector = courseSelected.clone();
			$("#topic-search").append(heightDetector); //.insertAfter($(".course-descriptive"));
			var height = heightDetector.height();
			heightDetector.remove();
			window.setTimeout("$('course-data').css('height',"+height+"+'px');$('course-data').addClass('selected');");
			*/
		}});
		/*$( "#toggle" ).click(function() {
			$( "#combobox" ).toggle();
		});*/
		$("#combobox-label").remove();
	});
})( jQuery );
 