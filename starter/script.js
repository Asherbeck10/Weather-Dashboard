let cities=[]

//city search

$("#search-button").on("click", function(event) {
  event.preventDefault();
  let city=$("#search-input").val().trim();
  console.log(city);
  cities.push(city);
  console.log(cities)
  localStorage.setItem("cities",JSON.stringify(cities))
//   let movieBtn=document.createElement("button")
//   movieBtn.textContent=movie
//   buttonsViewEl.append(movieBtn)
   

 });