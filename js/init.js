/*! init.js 

	This script loader uses Modernizr.load syntax (an alias of yepnope).
	
	Documentation found at: 
		http://modernizr.com/docs/#load
		http://yepnopejs.com/
*/
(function() {
    "use strict";
    // Set defaults in case they don't get defined in the page
    if (typeof window.pageSettings == "undefined") {
        window.pageSettings = {};
    }
    if (typeof window.pageSettings.jQueryURL == "undefined") {
        window.pageSettings.jQueryURL = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
    }
    if (typeof window.pageSettings.jQueryUIURL == "undefined") {
        window.pageSettings.jQueryUIURL = "//code.jquery.com/ui/1.11.3/jquery-ui.min.js";
    }
    if (typeof window.pageSettings.jQueryVersion == "undefined") {
        window.pageSettings.jQueryVersion = "1.10.2";
    }
    if (typeof window.pageSettings.jQueryUIVersion == "undefined") {
        window.pageSettings.jQueryUIVersion = "1.11.3";
    }
    if (typeof window.pageSettings.additionalScripts == "undefined") {
        window.pageSettings.additionalScripts = ['js/feedback_form.js','js/classes.js']
    }
    // Load scripts
    Modernizr.load([ // Load jQuery first. If it doesn't make it from our location, get it from Google.
    {
        test: typeof jQuery !== "undefined",
        nope: pageSettings.jQueryURL,
        complete: function() {
            Modernizr.load("//code.jquery.com/ui/" + window.pageSettings.jQueryUIVersion + "/jquery-ui.min.js");
            if (!window.jQuery) {
                Modernizr.load("//ajax.googleapis.com/ajax/libs/jquery/" + window.pageSettings.jQueryVersion + "/jquery.min.js");
            }
        }
    }, // Next, load scripts that require jQuery. If touch is enabled, load alternate script file with touch support added.
    {
        test: Modernizr.touch,
        nope: "js/script.min.js",
        yep: "js/script-touch.min.js"
    }, // If settings.loadslider is truthy, load the slider script
    {
        test: window.pageSettings.loadslider,
        yep: "js/slider.min.js"
    }, // Add an array of url strings to the page settings object to load additional scripts
    {
        test: window.pageSettings.additionalScripts.length,
        load: window.pageSettings.additionalScripts
    } ]);
})();