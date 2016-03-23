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
	var debug = {
		on:((/(local|byuonline)/i).test(location.hostname.toString())),
		log:function(){
			if(this.on && console){
				console.log.apply(console, arguments);
			}
		}
	};
	var classes = [
		{'short-title':"EXSC 221", 'title': "Exercise Science"},
        {'short-title':"ELED 203", 'title': "Foundations of Multicultural Education"},
		{'short-title':"COMMS 300", 'title': "Media Ethics, Law, and Responsibility"},
		{'short-title':"HLTH 335", 'title':"Health Behavior Change"},
		{'short-title':"HCOLL 399R", 'title':"Academic Internship"},
		{'short-title':"IHUM 202", 'title':"Western Humanities"},
		{'short-title':"M COM 320", 'title':"Communication in Organization Settings"},
		{'short-title':"MUSIC 201", 'title':"Civilization: Music 1"},
		{'short-title':"MUSIC 202", 'title':"Civilization: Music 2"},
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
						primary: "ui-icon-search magnify2"
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
		var coursePage = $("<div>");
		var classesURL = "Classes.html";
		if(location.hostname.toString().toLowerCase().indexOf("byuonline") == 0) classesURL = "/classes";
		$.ajax(classesURL).success(function(  textResult, status, jqXHR ){
			var justBody = (/\<body[^\>]*\>((.|[\r\n])+)\<\/body/gim).exec(textResult);
			if(justBody.length > 1) {
				justBody = justBody[1];
			} else justBody = "<div>Error: No data found.</div>";
			var classList = $(justBody).find(".class-list");
			if(classList.length > 0) {
				coursePage.append(classList);
				var classesFound = {};
				$(classList).find(".course-title").each( function( i,el ) {
					//debug.log($(el).text().trim());
					var foundTitle = $(el).text().trim().match(/^\S{3,}\s+\S{3,}/m);
					var objKey = $(el).text().trim().split(/[\r\n]+/mg)[0];
					if(foundTitle) {
						foundTitle = new RegExp(foundTitle[0].replace(/\W/g,"."),"i");
						//debug.log("Testing against: ",foundTitle);
						$("#combobox").find("option").each( function (j,op) {
							var matchTitle = $(op).text().trim().split(/[\r\n]+/mg)[0];
							if(matchTitle) {
								if(matchTitle instanceof Array)
									matchTitle = matchTitle[0];
								if(foundTitle.test(matchTitle)) {	//	found a match!
									//debug.log(matchTitle.trim());
									if(Object.keys(classesFound).indexOf(objKey) == -1)
											classesFound[objKey] = [];
									classesFound[objKey].push(matchTitle); 
								}
							}
						});
						if(Object.keys(classesFound).indexOf($(el).text().trim().split(/[\r\n]+/mg)[0]) == -1) {
							debug.log("Failed to find matching option for:",objKey);
							var newOption = $("<option>");
							var titleMatchRegEx = /^(\S{3,})\s+(\d{3,}r?)\s+?(Sec(?:tion)?\s+\d+)?\s*([^\(\r\n]+)(?:\(([^\)]+)\))?(?:[\s\r\n\t]+Info$)?/im;
							var newOptionText = $(el).text().trim().replace(titleMatchRegEx,"$1 $2: $4").trim();
							//debug.log($(el).text().trim().match());
							var newOptionSelector = "#"+newOptionText.trim().replace(/\W/ig,"-").replace(/-{2,}/g,"-");
							if(coursePage.find(newOptionSelector).length > 0) {
								newOption.html(newOptionText);
								newOption.val(newOptionText);
								debug.log("Appending new option for search:",{newOptionSelector},{newOptionText},"Please consider adding this option to the HTML.",{html:newOption[0].outerHTML});
								$("#combobox").append(newOption);
							} else {
								var patternMatched = titleMatchRegEx.exec($(el).text().trim());
								var probableMatches = [];
								var probableError = "Text in course title doens't match id in classes data.";
								patternMatched.shift();
								delete patternMatched.index;
								delete patternMatched.input;
								coursePage.find(".course-data").each(function(i,el){
									if(foundTitle.test($(el).attr("id"))) {
										probableMatches.push($(el).attr("id"));
									}
									if((/[^\w-]/).test($(el).attr("id"))) {
										probableError = "The id in classes data is malformed, it contains invalid characters!";
										//$.error($(el).attr("id")+"; "+probableError);
									}
								});
								debug.log("Course data found in \"Classes\", but not added to search.","Probably because it has a bad id tag:",{
									titleMatchData:patternMatched,
									soughtId: newOptionSelector,
									probableMatches,
									probableError
								});
							}
						}
					} else {
						debug.log("Failed to index title for:",$(el).text().trim());
					}
				});
				//debug.log("Classes found array:",classesFound);
				$("#combobox").find("option").each(function(i,el) {
					var selector = "#"+($(el).val().replace(/\W/g,"-").replace(/-{2,}/g,"-"));
					var probableMatches = [];
					var probableError = "This course doesn't exist in the classes page data.";
					if(selector.length > 1 && coursePage.find(selector).length == 0) {	//	This search option won't work!
						var idPattern = selector.match(/\w+[-\_](?:\w+[-\_])?\d{3,}r?/i);
						if(idPattern) {
							idPattern = new RegExp(idPattern[0].replace(/\W/ig,".+"),"i");
							coursePage.find(".course-data").each(function(i,cdel){
								if(idPattern.test($(cdel).attr("id"))) {
									probableMatches.push($(cdel).attr("id"));
									probableError = "The id in classes data doesn't match the id provided in the search select options.";
									if((/[^\w-]/).test($(cdel).attr("id")))
										probableError = "The id in classes data is malformed, it contains invalid characters!";
								}
							});
						}
						$(el).remove;
						debug.log("Removing search option because it isn't found in the classes data. (It wouldn't do anything on click if we left it.)",{selector,probableMatches,probableError,idPattern});
					}
				});
			} else {
				debug.log("Error! No classes found.");
				$.error("Classes.html failed to resolve.");
			}
		}).fail(function( jqXHR, textStatus, errorThrown ){
			debug.log("Classes.html failed with this message: ",errorThrown);
		});
		
		$( "#combobox" ).combobox({
			select: function() {
				try {
					var courseSelector = "#" + $(this).val().replace(/[\s\W]/ig,"-").replace(/\-{2,}/g,"-"),
						courseSelected = $('<div>' + coursePage.find(courseSelector)[0].innerHTML + '</div>').addClass("course-data");
				;
				} catch(err) {
					debug.log($(this).val() + " produced an error!");
					debug.log(err);
					debug.log(courseSelector);
				}
				courseSelected.find(".info-link").remove();
				$("#course-data-display").empty().append(courseSelected);
				courseSelected.find(".course-descriptive").css("height",$(".course-descriptive").height());
				courseSelected.find(".course-descriptive").setAnimationHeight(courseSelected.parent());
				$(".course-descriptive").removeAttr("style").css("height",$(".course-descriptive").attr("data-animation-height")).addClass("selected");
			},
			focus:function(){
				$(".selected").removeClass("selected");
			}
		});
		$("#combobox-label").remove();
	});
})( jQuery );


//Production steps of ECMA-262, Edition 5, 15.4.4.14
//Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
Array.prototype.indexOf = function(searchElement, fromIndex) {

 var k;

 // 1. Let o be the result of calling ToObject passing
 //    the this value as the argument.
 if (this == null) {
   throw new TypeError('"this" is null or not defined');
 }

 var o = Object(this);

 // 2. Let lenValue be the result of calling the Get
 //    internal method of o with the argument "length".
 // 3. Let len be ToUint32(lenValue).
 var len = o.length >>> 0;

 // 4. If len is 0, return -1.
 if (len === 0) {
   return -1;
 }

 // 5. If argument fromIndex was passed let n be
 //    ToInteger(fromIndex); else let n be 0.
 var n = +fromIndex || 0;

 if (Math.abs(n) === Infinity) {
   n = 0;
 }

 // 6. If n >= len, return -1.
 if (n >= len) {
   return -1;
 }

 // 7. If n >= 0, then Let k be n.
 // 8. Else, n<0, Let k be len - abs(n).
 //    If k is less than 0, then let k be 0.
 k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

 // 9. Repeat, while k < len
 while (k < len) {
   // a. Let Pk be ToString(k).
   //   This is implicit for LHS operands of the in operator
   // b. Let kPresent be the result of calling the
   //    HasProperty internal method of o with argument Pk.
   //   This step can be combined with c
   // c. If kPresent is true, then
   //    i.  Let elementK be the result of calling the Get
   //        internal method of o with the argument ToString(k).
   //   ii.  Let same be the result of applying the
   //        Strict Equality Comparison Algorithm to
   //        searchElement and elementK.
   //  iii.  If same is true, return k.
   if (k in o && o[k] === searchElement) {
     return k;
   }
   k++;
 }
 return -1;
};
}
