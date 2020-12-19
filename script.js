
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
        // console.log(city)
        // variable for differnent response calls 
        var temperature = response.list[0].main.temp
        var date = moment().format('LLL')
        var humidity = response.list[0].main.humidity
        var windSpeed = response.list[0].wind.speed
        var icon = response.list[0].weather.icon
        var longitude = response.city.coord.lon
        var latitude = response.city.coord.lat
       
        //create a new div to display the current weather
        var weatherContainer = $('<div>').addClass('current-body')
        var cityTitle = $('<h1>').text(location + ' (' + date + ') ')
        var setIcon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png')
        cityTitle.append(setIcon)
        weatherContainer.append(cityTitle)

        // this headers will hold the text to describe the current weather, will go in the current-body div created
        var tempText = $('<h2>').attr('class', 'row').text('Temperature= ' + temperature + 'degrees F')
        weatherContainer.append(tempText)
        var humidityText = $('<h2>').attr('class', 'row').text('Humidity= ' + humidity + '%')
        weatherContainer.append(humText)
        windText = $('<h2>').attr('class', 'row').text('Wind Speed= ' + windSpeed + 'mph')

    });

