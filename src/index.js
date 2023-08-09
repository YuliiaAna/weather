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
  let temperature = Math.round(response.data.main.temp);
  //console.log(temperature);
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
}

function changeCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#CityInput");
  console.log(cityInput.value);

  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
  document.getElementById("CityInput").value = "";
}

let FormCityInput = document.querySelector("#CityForm");
FormCityInput.addEventListener("submit", changeCity);
