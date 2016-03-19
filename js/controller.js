
var PARKSREC = (function( $, H ) {
	var searchResultsTemplate,
		suggestedEventsTemplate,
		exports = {},
		dummyEventsData = [
			{ "title": "Seniors yoga", "begins_datetime": "04/05/2016 07:15:00 AM", "duration": "2:30", "available_spots": 12, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet." },
			{ "title": "Cooking with gas", "begins_datetime": "04/30/2016 09:0:00 AM", "duration": "1:00", "available_spots": 3, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet." },
			{ "title": "Is that a video game console in the park?", "begins_datetime": "05/07/2016 08:15:00 AM", "duration": "0:30", "available_spots": 1, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet." }
		];
		dummySearchData = [
			{ "title": "Beginning yoga", "begins_datetime": "04/15/2016 09:0:00 AM", "duration": "1:30", "available_spots": 20 },
			{ "title": "Beginning yoga", "begins_datetime": "05/07/2016 08:15:00 AM", "duration": "1:30", "available_spots": 3 },
			{ "title": "Seniors yoga", "begins_datetime": "04/05/2016 07:15:00 AM", "duration": "2:30", "available_spots": 12 },
		];

	exports.init = function() {
		// compile templates
		searchResultsTemplate = H.compile($("#search-results-template").html());
		suggestedEventsTemplate = H.compile($("#suggested-events-template").html());

		// set up listeners
		$("#search-box").on("submit", function(evt) {
			console.log("!!!!!");
			evt.preventDefault();
			//var searchQurey = $("#search-box-input").val();
			//search(searchQurey);
			//render(searchResultsTemplate, dummySearchData);
		});

		render(suggestedEventsTemplate, dummyEventsData);
	};

	function render(template, context) {
		var content = template({ data: context });
		$("#main").html(content);

	};

	function search(query) {
		console.log("search");
		// query the api
		$.ajax({
			method: "GET",
			url: "https://e9f450a8.ngrok.io/?query=" + query + "&limit=5"
		}).done(function(data, err) {
			console.log(data);
			// render

		});
	};

	function showEventsData() {
		// call render
	};

	return exports;

}( jQuery, Handlebars ));

window.onload = PARKSREC.init;