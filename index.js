let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp-left");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let maxTemp = document.querySelector("#high-temp");
  maxTemp.innerHTML =
    "High: " + Math.round(response.data.main.temp_max) + "&degC";

  let minTemp = document.querySelector("#low-temp");
  minTemp.innerHTML =
    "Low: " + Math.round(response.data.main.temp_min) + "&degC";

  let rain = document.querySelector("#rain");
  rain.innerHTML = "Rain: " + response.data.clouds.all + "%";

  let wind = document.querySelector("#wind");
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "km/h";
}

function searchCity(city) {
  let apiKey = "e5329350d8d59ba6afe48bd7271155da";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function clickSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  city = `${city.value}`;
  searchCity(city);
}
let searching = document.querySelector("#form-search-city");
searching.addEventListener("submit", clickSearch);

function showGeo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let city = document.querySelector("#current-city");

  let apiKey = "e5329350d8d59ba6afe48bd7271155da";
  let units = "metric";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showWeather);
}

function getGeo() {
  navigator.geolocation.getCurrentPosition(showGeo);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getGeo);

searchCity("Vancouver");
