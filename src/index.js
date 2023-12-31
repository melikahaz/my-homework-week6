function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}
let now = new Date();
let realDate = document.querySelector("#date");
realDate.innerHTML = formatDate(now);

function searchForm(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-form");
  let city = document.querySelector("#city-name");
  city.innerHTML = cityInput.value;
  let newCity = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=6ao2b5e8b332b5tfbfa88bf024f90c65&units=metric`;
  let apiKey = "6ao2b5e8b332b5tfbfa88bf024f90c65";

  function displayTemperature(response) {
    let degree = document.querySelector("#degree-change");
    let temperature = Math.round(response.data.temperature.current);
    degree.innerHTML = temperature;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
    let humidityForm = document.querySelector("#humidity");
    humidityForm.innerHTML = `${response.data.temperature.humidity}%`;
    let feelLike = document.querySelector("#feel-like");

    feelLike.innerHTML = `${response.data.temperature.feels_like}°C`;
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  }
  axios.get(apiUrl).then(displayTemperature);
}
let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchForm);
