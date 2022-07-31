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
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp-left");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let maxTemp = document.querySelector("#high-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector("#low-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let rain = document.querySelector("#rain");
  rain.innerHTML = response.data.clouds.all;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
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
