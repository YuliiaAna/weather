let now = new Date();

function formatDate() {
  return now.toLocaleString("eng", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
document.getElementById("ItIsToday").innerHTML = formatDate(new Date());

function formatTime() {
  return now.toLocaleTimeString();
}
document.getElementById("ItIsTime").innerHTML = formatTime(new Date());

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="day">${formatDay(forecastDay.dt)}</h6>     
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="emoji"/>
            <br/ >
            <h5>
            <span class="blue">${Math.round(
              forecastDay.temp.min
            )}</span><span class="temperature-units-forecast">°C</span>
            <span class="red">${Math.round(
              forecastDay.temp.max
            )}</span><span class="temperature-units-forecast">°C</span>
            </h5>
          </div>
        </div>
      </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl);
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

/*
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
*/
let cityInput = "";

function showTemperature(response) {
  CelsiusTemperature = response.data.main.temp;

  let temperature = Math.round(CelsiusTemperature);

  console.log(response);
  document.getElementById("Temperature").innerHTML = temperature;
  document.getElementById("Description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("Humidity").innerHTML = response.data.main.humidity;
  document.getElementById("Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.getElementById("City").innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  LinkCelsius.classList.add("active");
  LinkFahrenheit.classList.remove("active");

  getForecast(response.data.coord);
}

function enterCity(city) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#CityInput");
  enterCity(cityInput.value);
  document.getElementById("CityInput").value = "";
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#Temperature");
  LinkCelsius.classList.remove("active");
  LinkFahrenheit.classList.add("active");
  let FahrenheitTemperature = CelsiusTemperature * 1.8 + 32;
  temperature.innerHTML = Math.round(FahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#Temperature");
  LinkCelsius.classList.add("active");
  LinkFahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(CelsiusTemperature);
}

let CelsiusTemperature = 0;

let FormCityInput = document.querySelector("#CityForm");
FormCityInput.addEventListener("submit", changeCity);

let LinkFahrenheit = document.querySelector("#linkFahrenheit");
LinkFahrenheit.addEventListener("click", showFahrenheitTemperature);

let LinkCelsius = document.querySelector("#linkCelsius");
LinkCelsius.addEventListener("click", showCelsiusTemperature);

enterCity("London");

showForecast();
