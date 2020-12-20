
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
    // $('.currentWeather').empty()
    // $('.forecastWeather').empty()

    // Here we construct our URL using weatherAPI and the city the user inputs
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=26397b10a7f204a93b15533da92e9276"
    //call the url 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        // variable for differnent response calls and appending to html
        var location = $('<h4>').text(response.name + ': ' + (moment().format('LLL')))
        var temperature = $('<h5>').text('Temperature= ' + response.main.temp + ' *F')
        var humidity = $('<h5>').text('Humidity= ' + response.main.humidity + '%')
        var windSpeed = $('<h5>').text('Wind Speed= ' + response.wind.speed + 'mph')
        // Adds Weather Icon to a variable by changing the setting the attribute to a different source
        var setIcon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png').addClass('icon')
        $('.currentWeather').append(location, temperature, humidity, windSpeed, setIcon)
       
        //get longitude and latitude coordinates to plug in for the UVIndex
        var longitude = response.coord.lon
        var latitude = response.coord.lat

        // new url code for the uv index, it needs the longitude and latitude coordinates:
        var urlUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=26397b10a7f204a93b15533da92e9276"
        
        $.ajax({
            url: urlUV,
            method: "GET"
            }).then(function(response) {
                
            var UVI = response.value
            console.log(UVI)
            //each index number will create a different color in the box depending on how high the number   
            var color 
                    if (UVI < 3) {
                    color = "green"
                    } else if (UVI >= 3 || UVI < 6) {
                    color = "yellow"
                    } else if (UVI >= 6 || UVI < 8) {
                    color = "orange"
                    } else {
                    color = "red"
                    }
                    console.log(color)
                var UVBox = $('<h5>').text('UV Index: ' + UVI).attr('style', 'background-color:' + color)
                $('.currentWeather').append(UVBox)
            })        
    })
}
    
  
        
    
    // function getForecast() {
    //     var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=26397b10a7f204a93b15533da92e9276'
            
    //         $.ajax({
    //             url: forecastURL,
    //             method: "GET"
    //         }).then(function(response){
    //         console.log(moment(response.list[0].dt_txt).format('M/D'))
                
    //         var fiveDay = $('#fiveDay').attr('class', 'card')
    //         var subtitle = $('<h3>').text('5 Day Forecast:')
    //         fiveDay.append(subtitle)

    //         var forecast = $('<div>').attr('class', 'row')
    //         // for loop to display the forecasted weather
    //         for (var i=0; i < 5; i++)
    //             var dayCard = $('<div>').addClass('card col col-2 fiveday')
    //             var day = $('<h4>').text(moment(response.list[i].dt_txt).format('M/D'))
    //             dayCard.append(day)
    //             var dailyImage = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.list[i].weather[0].icon + '.png')
    //             dayCard.append(dailyImage)
    //             var dailyTemp = $('<p>').text('Temp= ' + response.list[i].main.temp + '%')
    //             dayCard.append(dailyTemp)
    //             var dailyHum = $('<p>').text('Humidity= ' + response.list[i].main.humidity)
    //             dayCard.append(dailyHum)
    //             forecast.append(dayCard)
    //             fiveDay.append(forecast)
    //         })
    // }
    //     getForecast(cityName)
