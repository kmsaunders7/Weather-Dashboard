
//once the user clicks the search button this function will be called
$('#search-city').on('click', function(event) {
    event.preventDefault();
    var cityName= $('#city-input').val().trim();
    getWeather(cityName)
    
    var addButton = $('<button>').addClass('btn btn-primary btn-lg')
    var addCity = addButton.text(cityName)
    $('#searchHistory').append(addCity)

    // Here we grab the text from the input box
    
    if (!localStorage.getItem("cities")) {
        var savedCities =  []; 
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
    $('.currentWeather').empty
    $('.fiveday').empty
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
    var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=26397b10a7f204a93b15533da92e9276'
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
    console.log(response)

        var dayOne = $('<div>').addClass('card col col-2 dayOne')
        var dateOne = $('<h4>').text(moment(response.list[6].dt_txt).format('M/D'))
        var iconOne = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.list[6].weather[0].icon + '.png')
        var tempOne = $('<p>').text('Temp= ' + response.list[6].main.temp)
        var humOne = $('<p>').text('Humidity= ' + response.list[6].main.humidity + '%')
        dayOne.append(dateOne, iconOne, tempOne, humOne)
        $('.fiveday').append(dayOne)

        var dayTwo = $('<div>').addClass('card col col-2 dayTwo')
        var dateTwo = $('<h4>').text(moment(response.list[14].dt_txt).format('M/D'))
        var iconTwo = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.list[14].weather[0].icon + '.png')
        var tempTwo = $('<p>').text('Temp= ' + response.list[14].main.temp)
        var humTwo = $('<p>').text('Humidity= ' + response.list[14].main.humidity + '%')
        dayTwo.append(dateTwo, iconTwo, tempTwo, humTwo)
        $('.fiveday').append(dayTwo)

        var dayThree = $('<div>').addClass('card col col-2 dayThree')
        var dateThree = $('<h4>').text(moment(response.list[22].dt_txt).format('M/D'))
        var iconThree = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.list[22].weather[0].icon + '.png')
        var tempThree = $('<p>').text('Temp= ' + response.list[22].main.temp)
        var humThree = $('<p>').text('Humidity= ' + response.list[22].main.humidity + '%')
        dayThree.append(dateThree, iconThree, tempThree, humThree)
        $('.fiveday').append(dayThree)

        var dayFour = $('<div>').addClass('card col col-2 dayFour')
        var dateFour = $('<h4>').text(moment(response.list[30].dt_txt).format('M/D'))
        var iconFour = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.list[30].weather[0].icon + '.png')
        var tempFour = $('<p>').text('Temp= ' + response.list[30].main.temp)
        var humFour = $('<p>').text('Humidity= ' + response.list[30].main.humidity + '%')
        dayFour.append(dateFour, iconFour, tempFour, humFour)
        $('.fiveday').append(dayFour)

        var dayFive = $('<div>').addClass('card col col-2 dayFive')
        var dateFive = $('<h4>').text(moment(response.list[38].dt_txt).format('M/D'))
        var iconFive = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.list[38].weather[0].icon + '.png')
        var tempFive = $('<p>').text('Temp= ' + response.list[38].main.temp)
        var humFive = $('<p>').text('Humidity= ' + response.list[38].main.humidity + '%')
        dayFive.append(dateFive, iconFive, tempFive, humFive)
        $('.fiveday').append(dayFive)

    })

}


  
