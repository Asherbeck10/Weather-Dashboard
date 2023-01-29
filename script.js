
let listGroupEl = document.querySelector("#history");
let queryCity = "London";
let queryURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=21fb092a8c84c334822d90684ec401e3&q=";
let todayEl = document.querySelector("#today");
let forecastEl = document.querySelector("#forecast");

let cities = []
console.log(cities)

weatherInfo(queryCity);
forecastQuery(queryCity);


//retrieving info

if (!JSON.parse(localStorage.getItem("cities"))) {
  console.log("empty");

} else 
  cities = JSON.parse(localStorage.getItem("cities"))


  
for (let i = 0; i < cities.length; i++) {
  const btnText = cities[i];
  let oldBtn = document.createElement("button")
  oldBtn.classList.add("city-btn")
  oldBtn.textContent = btnText
  listGroupEl.appendChild(oldBtn);
}



//city search form 

$("#search-button").on("click", function (event) {
  event.preventDefault();
  let city = $("#search-input").val().trim();
  if (city === "") {
    city = "London";

  };

  //and new button and appending city list
  cities.push(city);
  queryCity = city;
  localStorage.setItem("cities", JSON.stringify(cities));
  let newBtn = document.createElement("button");
  newBtn.classList.add("city-btn");
  newBtn.textContent = city;
  listGroupEl.appendChild(newBtn);
  weatherInfo(queryCity);
  forecastQuery(queryCity);
});




  




//reading info for cities btn

$(document).on("click", ".city-btn", function (event) {
  event.preventDefault();
  queryCity = event.target.innerHTML;
  weatherInfo(queryCity)
  forecastQuery(queryCity);

})
//function :retrieving info from OpenWeather for current weather

function weatherInfo(queryCity) {
  let NewQueryURL = queryURL + queryCity;
  fetch(NewQueryURL)
    .then(response => response.json())
    .then(function (weather) {
      //  console.log(weather)

      let cityDate = moment((weather.dt) * 1000).format('DD/MM/YYYY');
      
      todayEl.innerHTML = ` <div id="city-time"><h3>${weather.name}</h3>
   <h3>(${cityDate})</h3>
   <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="weather-icon">
   </div>

   
   <div>
   <div>Temp:${weather.main.temp} C</div>
   <div>Wind:${weather.wind.speed}KPH</div>
   <div>Humidity:${weather.main.humidity}%</div>
   </div>`;
 

     
   
     


    })
}

// 5 days forecast function
function forecastQuery(queryCity) {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${queryCity}&limit=1&appid=21fb092a8c84c334822d90684ec401e3`)
    .then(response => response.json())
    .then(city => {
      //console.log(city)

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${city[0].lat}&lon=${city[0].lon}&appid=21fb092a8c84c334822d90684ec401e3`)
    })

    .then(response => response.json())
    .then(weatherForecast => {
      
      let forecastDates=[];
      let icons=[];
      let temps=[];
      let winds=[];
      let humidities=[]
      //creating forecast cards
      for (let i = 7; i < (weatherForecast.list).length; i = i + 8) {
        let forecastDate = moment((weatherForecast.list[i].dt) * 1000).format('DD/MM/YYYY');
        forecastDates.push(forecastDate)
        icons.push(weatherForecast.list[i].weather[0].icon);
        temps.push(weatherForecast.list[i].main.temp);
        winds.push(weatherForecast.list[i].wind.speed);
        humidities.push(weatherForecast.list[i].main.humidity);
      };

       
        
        

      
       

      
      
   
    forecastEl.innerHTML = ` <div class="card" style="width: 10rem;">
      <div class="card-body">
      <h5 class="card-title">${forecastDates[0]}</h5>
      <img src="http://openweathermap.org/img/wn/${icons[0]}@2x.png" alt="weather-icon">
      <div class="card-text">Temp: ${temps[0]} C</div>
      <div class="card-text">Wind: ${winds[0]} KPH</div>
      <div class="card-text">Humidity: ${humidities[0]}%</div>
      
       </div>
      </div>
      <div class="card" style="width: 10rem;">
     <div class="card-body">
     <h5 class="card-title">${forecastDates[1]}</h5>
     <img src="http://openweathermap.org/img/wn/${icons[0]}@2x.png" alt="weather-icon">
     <div class="card-text">Temp: ${temps[1]} C</div>
     <div class="card-text">Wind: ${winds[1]} KPH</div>
     <div class="card-text">Humidity: ${humidities[0]}%</div>
     
      </div>
     </div>
      <div class="card" style="width: 10rem;">
     <div class="card-body">
     <h5 class="card-title">${forecastDates[2]}</h5>
     <img src="http://openweathermap.org/img/wn/${icons[0]}@2x.png" alt="weather-icon">
     <div class="card-text">Temp: ${temps[2]} C</div>
     <div class="card-text">Wind: ${winds[2]} KPH</div>
     <div class="card-text">Humidity: ${humidities[0]}%</div>
     
      </div>
     </div>
      <div class="card" style="width: 10rem;">
     <div class="card-body">
     <h5 class="card-title">${forecastDates[3]}</h5>
     <img src="http://openweathermap.org/img/wn/${icons[0]}@2x.png" alt="weather-icon">
     <div class="card-text">Temp: ${temps[3]} C</div>
     <div class="card-text">Wind: ${winds[3]} KPH</div>
     <div class="card-text">Humidity: ${humidities[0]}%</div>
     
      </div>
     </div>
      <div class="card" style="width: 10rem;">
     <div class="card-body">
     <h5 class="card-title">${forecastDates[4]}</h5>
     <img src="http://openweathermap.org/img/wn/${icons[0]}@2x.png" alt="weather-icon">
     <div class="card-text">Temp: ${temps[4]} C</div>
     <div class="card-text">Wind: ${winds[4]} KPH</div>
     <div class="card-text">Humidity: ${humidities[0]}%</div>
     
      </div>
     </div>`
      
      
      


    })

}

$("#clear-all").on("click", function (event) {
 localStorage.clear();
 location.reload()
})
