/*
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};
let city = prompt("Enter city").toLowerCase();
if (weather[city]) {
  alert(
    "It is currently  " +
      Math.floor(weather[city].temp) +
      " in " +
      city +
      " with a humidity of " +
      weather[city].humidity
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      city
  );
}


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

function changeCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#CityInput");
  console.log(cityInput.value);
  document.getElementById("City").innerHTML = cityInput.value;
  document.getElementById("Temperature").innerHTML = "12";
}

let FormCityInput = document.querySelector("#CityForm");
FormCityInput.addEventListener("submit", changeCity);
*/
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
  //console.log(response);
  document.getElementById("Temperature").innerHTML = temperature;
  //  document.getElementById("Precipitation").innerHTML = response.data.???????;
  document.getElementById("Humidity").innerHTML = response.data.main.humidity;
  document.getElementById("Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function changeCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#CityInput");
  console.log(cityInput.value);
  document.getElementById("City").innerHTML = cityInput.value;

  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
  document.getElementById("CityInput").value = "";
}

let FormCityInput = document.querySelector("#CityForm");
FormCityInput.addEventListener("submit", changeCity);
