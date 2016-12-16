(function () {


	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	// A factory function we can use to create binding handlers for specific
	// keycodes.
	function keyhandlerBindingFactory(keyCode) {
		return {
			init: function (element, valueAccessor, allBindingsAccessor, data, bindingContext) {
				var wrappedHandler, newValueAccessor;

				// wrap the handler with a check for the enter key
				wrappedHandler = function (data, event) {
					if (event.keyCode === keyCode) {
						valueAccessor().call(this, data, event);
					}
				};

				// create a valueAccessor with the options that we would want to pass to the event binding
				newValueAccessor = function () {
					return {
						keyup: wrappedHandler
					};
				};

				// call the real event binding's init function
				ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
			}
		};
	}

 	// a custom binding to handle the enter key
	ko.bindingHandlers.enterKey = keyhandlerBindingFactory(ENTER_KEY);

	// another custom binding, this time to handle the escape key
	ko.bindingHandlers.escapeKey = keyhandlerBindingFactory(ESCAPE_KEY);

	// wrapper to hasFocus that also selects text and applies focus async
	ko.bindingHandlers.selectAndFocus = {
		init: function (element, valueAccessor, allBindingsAccessor, bindingContext) {
			ko.bindingHandlers.hasFocus.init(element, valueAccessor, allBindingsAccessor, bindingContext);
			ko.utils.registerEventHandler(element, 'focus', function () {
				element.focus();
			});
		},
		update: function (element, valueAccessor) {
			ko.utils.unwrapObservable(valueAccessor()); // for dependency
			// ensure that element is visible before trying to focus
			setTimeout(function () {
				ko.bindingHandlers.hasFocus.update(element, valueAccessor);
			}, 0);
		}
	};

    //map view model
    function MapViewModel() {
        var self = this;
        this.showMap = ko.observable(false);

        this.mapUrl = ko.observable("https://maps.googleapis.com/maps/api/staticmap?center=");
        this.location = ko.observable();
        this.params = ko.observable("&zoom=13&size=600x300&maptype=roadmap");
        this.APIKey = ko.observable("&key=AIzaSyBv6ZxK0eXeud-z6aZgAYu_H8XY9ESFvus");

        this.fullUrl = ko.pureComputed(function() {
            // Knockout tracks dependencies automatically.
            //It knows that fullUrl depends on all params, because these get called when evaluating fullRul.
            return self.mapUrl() + self.location() + self.params() + self.APIKey();
            }, self);


        this.toggleVisibility = function() {
            var location = this.location().trim();
            if (location) {
                self.showMap(!self.showMap());
            }
        }.bind(this);



    };


 
ko.applyBindings(new MapViewModel()); // This makes Knockout get to work

}());
