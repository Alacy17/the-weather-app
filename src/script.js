let now = new Date();

let time = now.getTime();

let day = now.getDay();

let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = days[now.getDay()];

let showDate = `${weekDay},${hours}:${minutes}`;

let date = document.querySelector("#current-date");
date.innerHTML = `${weekDay}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  console.log(response);
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       
         <div class="col-2">
           <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          
             <div class="weather-forecast-temperatures">
               <div class="weather-forecast-temperature-max"> ${Math.round(
                 forecastDay.temp.max
               )}° </div>

               ${forecastDay.weather[0].main}

               </br>
               
               <img
                 src="https://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png"
                 alt=""
                 width="38"
               />
             </div>
           </div>
          
        
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "95b866cc0e09746fb0e30ef3ac0e20d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "95b866cc0e09746fb0e30ef3ac0e20d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95b866cc0e09746fb0e30ef3ac0e20d0&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "95b866cc0e09746fb0e30ef3ac0e20d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=95b866cc0e09746fb0e30ef3ac0e20d0&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Los Angeles");
