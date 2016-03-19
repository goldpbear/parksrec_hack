
var PARKSREC = (function( $, H ) {
	var searchResultsTemplate,
		suggestedEventsTemplate,
		exports = {},
		dummyEventsData = [
			{ "title": "Seniors yoga", "begins_datetime": "04/05/2016 07:15:00 AM", "duration": "2:30", "available_spots": 12, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet." },
			{ "title": "Cooking with gas", "begins_datetime": "04/30/2016 09:0:00 AM", "duration": "1:00", "available_spots": 3, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet." },
			{ "title": "Is that a video game console in the park?", "begins_datetime": "05/07/2016 08:15:00 AM", "duration": "0:30", "available_spots": 1, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet." }
		],
		dummySearchData = [
			{ "title": "Beginning yoga", "begins_datetime": "04/15/2016 09:0:00 AM", "duration": "1:30", "available_spots": 20 },
			{ "title": "Beginning yoga", "begins_datetime": "05/07/2016 08:15:00 AM", "duration": "1:30", "available_spots": 3 },
			{ "title": "Seniors yoga", "begins_datetime": "04/05/2016 07:15:00 AM", "duration": "2:30", "available_spots": 12 },
		],
		retrievedData = [];

	exports.init = function() {
		// compile templates
		searchResultsTemplate = H.compile($("#search-results-template").html());
		suggestedEventsTemplate = H.compile($("#suggested-events-template").html());
		eventDetailTemplate = H.compile($("#event-detail-template").html());

		H.registerHelper('parse_datetime', function(datetime) {
			return datetime.match(/([0-9\-]+)/)[0];
		});

		H.registerHelper('parse_fee', function(fee) {
			return fee.match(/([0-9\.\$]+)/)[0];
		});

		// set up listeners
		$("form").on("submit", function(evt) {
			evt.preventDefault();
			var searchQurey = $("#search-box").val();
			search(searchQurey);
		});

		render(suggestedEventsTemplate, []);
	};

	function render(template, itemIndex) {
		// load full data or selected index
		var content = template({ data: (itemIndex ? retrievedData[itemIndex] : retrievedData) });
		$("#main").html(content);

		// set up click listener
		listeners(retrievedData);

	};

	function listeners(context, itemIndex) {
		$(".search-result").on("click", function() {
			var itemIndex = $(this).attr("id");
			render(eventDetailTemplate, itemIndex);
		});
		$("#back_button").on("click", function() {
			render(searchResultsTemplate);
		});
	};

	function search(query) {
		$("#loading-icon").css("display", "block");
		$(".template").css("opacity", "0.5");
		// query the api
		$.ajax({
			method: "GET",
			url: "https://parksrec.herokuapp.com/?q=" + query
		}).done(function(data, err) {
			retrievedData = data;
			console.log(data);
			render(searchResultsTemplate);
			$("#loading-icon").css("display", "none");
			$(".template").css("opacity", "1.0");
		});
	};

	function showEventsData() {
		// call render
	};

	return exports;

}( jQuery, Handlebars ));

window.onload = PARKSREC.init;