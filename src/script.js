//displays current day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = now.getDay();
let currentDay = days[day];
let currentTime = now.toLocaleTimeString("en-US");
document.querySelector(
  "#current-day"
).innerHTML = `Last updated on: ${currentDay} ${currentTime}`;

//displays searched city name and temperature details
function search(event) {
  event.preventDefault();
  let cityNameInput = document.querySelector("#city-name-input");
  searchCity(cityNameInput.value);
}

function searchCity(city) {
  let apiKey = "2d5c28f46f35496c26b3294dfcae8329";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  temp = Math.round(response.data.main.temp);
  let name = `${response.data.name}, ${response.data.sys.country}`;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windspeed = response.data.wind.speed;
  let pressure = response.data.main.pressure;
  let currentCityName = document.querySelector("#current-city-name");
  let temperature = document.querySelector("#current-temp-value");
  let weatherHumidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#description");
  let currentPressure = document.querySelector("#pressure");
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  currentCityName.innerHTML = name;
  temperature.innerHTML = temp;
  weatherHumidity.innerHTML = humidity;
  wind.innerHTML = windspeed;
  weatherDescription.innerHTML = description;
  currentPressure.innerHTML = pressure;
}

let searchButton = document.querySelector("button");
searchButton.addEventListener("click", search);

function showPosition(position) {
  let userLatitude = position.coords.latitude;
  let userLongitude = position.coords.longitude;
  let apiKey = "2d5c28f46f35496c26b3294dfcae8329";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let userLocation = document.querySelector("#current-location-button");
userLocation.addEventListener("click", getCurrentPosition);

function showNewYorkTemp(event) {
  event.preventDefault();
  let city = "New York";
  let apiKey = "2d5c28f46f35496c26b3294dfcae8329";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let newYork = document.querySelector("#new-york");
newYork.addEventListener("click", showNewYorkTemp);

function showParisTemp(event) {
  event.preventDefault();
  let city = "Paris";
  let apiKey = "2d5c28f46f35496c26b3294dfcae8329";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let paris = document.querySelector("#paris");
paris.addEventListener("click", showParisTemp);

function showShanghaiTemp(event) {
  event.preventDefault();
  let city = "Shanghai";
  let apiKey = "2d5c28f46f35496c26b3294dfcae8329";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let shanghai = document.querySelector("#shanghai");
shanghai.addEventListener("click", showShanghaiTemp);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  //remove active class from celsius link and add to fahrenheit link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#current-temp-value");
  let fahrenheitTemperature = (temp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  //remove active class from fahrenheit link and add to celsius link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = document.querySelector("#current-temp-value");
  temperature.innerHTML = temp;
}

let temp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="following-days">${day}</div>
      <img src="https://thumbs.dreamstime.com/z/weather-forecast-icon-vector-sunny-weather-weather-forecast-icon-vector-sunny-weather-vector-illustration-168324418.jpg" alt="" width="42" />
      <div>19°C</div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
//Nairobi city displayed upon loading/reloading the webpage
searchCity("Nairobi");
