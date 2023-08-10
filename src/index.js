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
}

function changeCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#CityInput");
  enterCity(cityInput);
  document.getElementById("CityInput").value = "";
}

function enterCity(City) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let units = "metric";
  let city = City.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
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
