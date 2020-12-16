
var APIkey = "26397b10a7f204a93b15533da92e9276"


$("#search-city").on("click", function(event) {
    event.preventDefault();

    // Here we grab the text from the input box
    var cityName= $("#city-input").val();

    // Here we construct our URL using weatherAPI
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#city-view").text(JSON.stringify(response));
    });


    });