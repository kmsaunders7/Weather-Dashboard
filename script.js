
//once the user clicks the search button this function will be called
$("#search-city").on("click", function(event) {
    event.preventDefault();

    // Here we grab the text from the input box
    var cityName= $("#city-input").val().trim;
    getWeather(cityName)
    if (!localStorage.getItem(cityName)) {
        storeButton(cityName)
    }
    $("#city-input").val("")

})  
    //my individual api key for openweathermap

// var APIkey = "26397b10a7f204a93b15533da92e9276"

// create function called on the click button that then calls the weather URL,

function getWeather(cityName) {
    // start with an empty field in both the current weather and five day forecast spots
    $('.currentWeather').empty()
    $('.forecastWeather').empty()

// Here we construct our URL using weatherAPI and the city the user inputs
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=26397b10a7f204a93b15533da92e9276"
    //call the url 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var city = response.city.name
        console.log(city)
        var temperature = response.list[0].main.temp
        var date = moment().format('LLL')
        var humidity = response.list[0].main.humidity
        var windSpeed = response.list[0].wind.speed
        var icon = response.list[0].weather.icon
        var longitude = response.city.coord.lon
        var latitude = response.city.coord.lat
        // $("#city-view").text(JSON.stringify(response));
    });

