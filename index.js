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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `   <div class="col" id="five-days">
                <div class="forecast" id="forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="50"
                />
                <div class="forecast=temp"></div>
                <span class="forecast-temp-max"> ${Math.round(
                  forecastDay.temp.max
                )}&deg</span>/
                <span class="forecast-temp-min"> ${Math.round(
                  forecastDay.temp.min
                )}&deg</span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e5329350d8d59ba6afe48bd7271155da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  let temperature = document.querySelector("#temp-left");
  temperature.innerHTML = Math.round(celsiusTemp);

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

  getForecast(response.data.coord);
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
showForecast();
