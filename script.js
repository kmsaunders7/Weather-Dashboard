
//once the user clicks the search button this function will be called
$('#search-city').on('click', function(event) {
    event.preventDefault();

    // Here we grab the text from the input box
    var cityName= $('#city-input').val().trim();
    getWeather(cityName)
    if (!localStorage.getItem("cities")) {
        var savedCities =  []; // []
        savedCities.push(cityName);
 
        localStorage.setItem('cities', JSON.stringify(savedCities))
    } else {
       var savedCities =  JSON.parse(localStorage.getItem("cities")); // []
       console.log(savedCities);
       savedCities.push(cityName);

       localStorage.setItem('cities', JSON.stringify(savedCities));

    }
    $('#city-input').val('')

})  

var cities =  JSON.parse(localStorage.getItem("cities"));

for (var i=0; i < cities.length; i++) {
    $('#searchHistory').append("<button>" + cities[i] + "</button>")
}

//my individual api key for openweathermap
// var APIkey = "26397b10a7f204a93b15533da92e9276"

function getWeather(cityName) {
    // start with an empty field in both the current weather and five day forecast spots
    $('.currentWeather').empty()
    $('.forecastWeather').empty()

// Here we construct our URL using weatherAPI and the city the user inputs
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=26397b10a7f204a93b15533da92e9276"
    //call the url 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var location = response.name
        
        // console.log(city)
        // variable for differnent response calls 
        var temperature = response.main.temp
        var date = moment().format('LLL')
        var humidity = response.main.humidity
        var windSpeed = response.wind.speed
        var icon = response.weather[0].icon
        var longitude = response.coord.lon
        var latitude = response.coord.lat
       
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
        weatherContainer.append(humidityText)
        windText = $('<h2>').attr('class', 'row').text('Wind Speed= ' + windSpeed + 'mph')

        //new url code for the uv index, it needs the longitude and latitude coordinates:
        var urlUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=26397b10a7f204a93b15533da92e9276"
        $.ajax({
            url: urlUV,
            method: "GET"
            }).then(function(response) {
                console.log(response)
            var uVI = response.value
            //each index number will create a different color in the box depending on how high the number   
            var color 
                    if (uVI < 3) {
                    color = "green"
                    } else if (uVI >= 3 || uVI < 6) {
                    color = "yellow"
                    } else if (uVI >= 6 || uVI < 8) {
                    color = "orange"
                    } else {
                    color = "red"
                    }
            //variable to create the htag with to put uv info...append to the weather container        
            var UVBox = $('<h2>').attr('class', 'row card-uv').text("Ultraviolet Index= ").append($('<span>').attr('class', 'UVI').attr('style', 'text-align: center; background-color:' + color)).text(uVI)
            weatherContainer.append(UVBox)
        })
        //append new uvbox into weather container
        $('#weatherContainer').append(weatherContainer)

        var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=26397b10a7f204a93b15533da92e9276'
        
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
        console.log(moment(response.list[0].dt_txt).format('M/D'))
        
        
        })
        var fiveDay = $('#fiveDay').attr('class', 'card')
        var subtitle = $('<h3>').text('5 Day Forecast:')
        fiveDay.append(subtitle)

        var forecast = $('<div>').attr('class', 'row')
        // for loop to display the forecasted weather
        for (var i=0; i < response.list.length; i++)
            var dayCard = $('<div>').addClass('card col col-2 fiveday')
            var day = $('<h4>').text(moment(response.list[i].dt_txt).format('M/D'))
            dayCard.append(day)
            var dailyImage = $('<img>').attr('src', response.list[i].weather[0].icon)
            dayCard.append(dailyImage)
            var dailyTemp = $('<p>').text('Temp= ' + response.list[i].main.temp + '%')
            dayCard.append(dailyTemp)
            var dailyHum = $('<p>').text('Humidity= ' + response.list[i].main.humidity)
            dayCard.append(dailyHum)
            forecast.append(dayCard)
            fiveDay.append(forecast)
        
    })

    }

