/**
 * return true only on wednesday
**/
var SetActiveDay = function($config) {
    if(!config){
        return;
    }
    this.$config = config || $('');
    this.setDay = this.$config.attr('data-activeDay') || this.defaults.activeDay;
	this.getElements();
	this.setEvents();
	this.$window = $(window);
};

SetActiveDay.prototype = {
    defaults: {
        activeDay: 0
    },
	getElements: function(){
		this.$elOuter = $('#js-SPDayWrapper').find('.c-IconSPDayOuter') || $('.c-IconSPDayOuter');
        this.$elInner = $('#js-SPDayWrapper').find('.c-IconSPDayInner') || $('.c-IconSPDayInner');
	},
	setEvents: function(){
		$(window).on('load', this.toggle.bind(this));
	},
	toggle: function(){
		if(this.setSpDay()){
			this.$elInner.addClass('active-inner');
            this.$elOuter.addClass('active-outer');
		}
	},
	setSpDay: function(){
		var d = this.convertToServerTimeZone();
		var day = d.getDay();
		var hours = d.getHours();
        //Set Day
		return day == this.setDay && hours >= 0 || day == this.setDay && hours < 1;
	},
    convertToServerTimeZone: function(){
        var offset = +9.0; // JST +09:00
        var clientDate = new Date();
        var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000); // 1000 * 60: min in sec
        var serverDate = new Date(utc + (3600000 * offset)); // 1000 * 60 * 60: hour in sec
        return serverDate;
    }
};