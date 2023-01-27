
let listGroupEl=document.querySelector("#history");
let queryCity ="London";
let queryURL = "https://api.openweathermap.org/data/2.5/weather?&appid=21fb092a8c84c334822d90684ec401e3&q=";
let sectionEl=document.querySelector("section")
weatherInfo(queryCity)



//retrieving info
let cities=[]
if (!JSON.parse(localStorage.getItem("cities")) ) {
  console.log("empty")
  
}else{cities=JSON.parse(localStorage.getItem("cities")) 

for (let i = 0; i < cities.length; i++) {
  const btnText = cities[i];
  let oldBtn=document.createElement("button")
  oldBtn.textContent=btnText
  listGroupEl.appendChild(oldBtn)

  
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
  



//retrieving info from OpenWeather for current weather

function weatherInfo(queryCity) {
 let NewQueryURL=queryURL+queryCity;
  fetch(NewQueryURL)
.then(response => response.json())
.then(function(weather) {
  console.log(weather.name);
  console.log(weather.dt);
  console.log(weather.weather[0].icon);
  console.log((weather.main.temp)-273.15);
  console.log(weather.main.humidity);
  console.log(weather.wind.speed);
  
  }) 
  
}
 