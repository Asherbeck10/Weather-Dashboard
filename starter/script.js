
let listGroupEl=document.querySelector("#history");
let queryCity ="London";
let queryURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=21fb092a8c84c334822d90684ec401e3&q=";
let todayEl=document.querySelector("#today");

weatherInfo(queryCity);
forecastQuery(queryCity);



//retrieving info
let cities=[]
if (!JSON.parse(localStorage.getItem("cities")) ) {
  console.log("empty")
  
}else{cities=JSON.parse(localStorage.getItem("cities")) 

for (let i = 0; i < cities.length; i++) {
  const btnText = cities[i];
  let oldBtn=document.createElement("button")
  oldBtn.classList.add("city-btn")
  oldBtn.textContent=btnText
  listGroupEl.appendChild(oldBtn);

  
}}

//city search form 

$("#search-button").on("click", function(event) {
  event.preventDefault();
  let city=$("#search-input").val().trim();
  if (city==="") {
    city="London";
    
  };
  
  //and new button and appending city list
  cities.push(city);
  queryCity=city
  localStorage.setItem("cities",JSON.stringify(cities));
  let newBtn=document.createElement("button");
  newBtn.textContent=city;
  listGroupEl.appendChild(newBtn);
  weatherInfo(queryCity);
  
  
  
});
  



//reading info for cities btn
  
$(document).on("click",".city-btn",function(event) {
  event.preventDefault();
  queryCity=event.target.innerHTML;
  weatherInfo(queryCity)
  forecastQuery(queryCity);
  
})
//function :retrieving info from OpenWeather for current weather

function weatherInfo(queryCity) {
  let NewQueryURL=queryURL+queryCity;
   fetch(NewQueryURL)
 .then(response => response.json())
 .then(function(weather) {
  //  console.log(weather)
  
   let cityDate=moment((weather.dt)*1000).format('DD/MM/YYYY'); 
  //  console.log(cityDate)
   todayEl.innerHTML=` <h3>${weather.name}</h3>
   <h3>(${cityDate})</h3>
   <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="weather-icon">
   <div>
     <div>Temp:</div>
     <div>${weather.main.temp} C</div>
   </div>
   <div>
     <div>Wind:</div>
     <div>${weather.wind.speed}KPH</div>
   </div>
   <div>
     <div>Humidity:</div>
     <div>${weather.main.humidity}%</div>
   </div>`;
   
   
   }) 
 }

 // 5 days forecast
 function forecastQuery(queryCity) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${queryCity}&limit=1&appid=21fb092a8c84c334822d90684ec401e3`)
      .then(response => response.json())
      .then(city=>{
        console.log(city)
       
       return   fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${city[0].lat}&lon=${city[0].lon}&appid=21fb092a8c84c334822d90684ec401e3`)
      } )

     .then(response =>response.json())
      .then(weatherForecast =>{
        console.log(weatherForecast)
        console.log(weatherForecast.city.name)
        for (let i = 7; i <(weatherForecast.list).length; i=i+8) {
          let forecastDate=moment((weatherForecast.list[i].dt)*1000).format('DD/MM/YYYY');
          console.log("Temp:"+ weatherForecast.list[i].main.temp)
          console.log("Humidity:"+ weatherForecast.list[i].main.humidity)
          console.log("icon:"+ weatherForecast.list[i].weather[0].icon)

          console.log("Wind:" + weatherForecast.list[i].wind.speed)
          console.log(forecastDate);
           
         
        }
       
        
       
      })
  
 }
 


