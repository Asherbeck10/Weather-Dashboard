let cities=[]

//city search

$("#search-button").on("click", function(event) {
  event.preventDefault();
  let city=$("#search-input").val().trim();
  if (city==="") {
    city="London"
    
  }
  console.log(city);
  cities.push(city);
  console.log(cities)
  localStorage.setItem("cities",JSON.stringify(cities))
});
if (!JSON.parse(localStorage.getItem("cities")) ) {
  console.log("empty")
  
}else{cities=JSON.parse(localStorage.getItem("cities")) 
console.log(cities)}



 //   let movieBtn=document.createElement("button")
//   movieBtn.textContent=movie
//   buttonsViewEl.append(movieBtn)