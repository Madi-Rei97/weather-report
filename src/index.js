// Increase/decrease temp with arrows:
const state = {
  tempValue: 50,
};

const increaseTemp = () => {
  state.tempValue += 1;
  const tempValueContainer = document.querySelector('#tempValue');
  tempValueContainer.textContent = state.tempValue;
  changeTempColor();
  weatherGarden();
};

const decreaseTemp = () => {
  state.tempValue -= 1;
  const tempValueContainer = document.querySelector('#tempValue');
  tempValueContainer.textContent = state.tempValue;
  changeTempColor();
  weatherGarden();
};

// Register Event Handlers:
const registerEventHandlers = () => {
  // Temp up or down buttons (Wave 2)
  const increaseTempButton = document.querySelector('#increaseTempControl');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTempControl');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  // Update city name (Wave 3)
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', CityInputInRealTime);

  // Reset button (Wave 6)
  const cityNameResetButton = document.getElementById('cityNameReset');
  cityNameResetButton.addEventListener('click', () => {
    cityNameInput.value = cityNameInput.defaultValue;
    CityInputInRealTime();
  });

  CityInputInRealTime();

  // Get current location temp (Wave 4)
  const tempButton = document.getElementById('currentTempButton');
  tempButton.addEventListener('click', getRealTimeTemp);

  // Change sky (Wave 5)
  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Change temp color as the temp changes:
const changeTempColor = () => {
  const tempValueContainer = document.querySelector('#tempValue');
  const temp = state.tempValue;

  tempValueContainer.classList.remove(
    'red', 'orange', 'yellow', 'yellow-green', 'green', 'teal'
  );

  if (temp >= 90) {
    tempValueContainer.classList.add('red');
  } else if (temp >= 80) {
    tempValueContainer.classList.add('orange');
  } else if (temp >= 70) {
    tempValueContainer.classList.add('yellow');
  } else if (temp >= 60) {
    tempValueContainer.classList.add('yellow-green');
  } else if (temp >= 50) {
    tempValueContainer.classList.add('green');
  } else {
    tempValueContainer.classList.add('teal');
  }
};

// Change Weather Garden as the temp changes:
const weatherGarden = () => {
  const landscapeValueContainer = document.querySelector('#landscape');
  const temp = state.tempValue;

  if (temp >= 80) {
    landscapeValueContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    landscapeValueContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    landscapeValueContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    landscapeValueContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const updateSky = () => {
  const skySelect = document.getElementById('skySelect');
  const skyDisplay = document.getElementById('sky');
  const gardenContent = document.getElementById('gardenContent');

  const skiesEach = {
    Sunny:	'☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
    Cloudy:	'☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
    Rainy:	'🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
    Snowy:	'🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
  };

  const selected = skySelect.value;

  skyDisplay.textContent = skiesEach[selected];

  gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

  gardenContent.classList.add(selected.toLowerCase());
};

// Change city input in real time
const CityInputInRealTime = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  const headerCityName = document.getElementById('headerCityName');

  headerCityName.textContent = cityNameInput.value;
};

// Wave 4
const findLatitudeAndLongitude = (city) => {
  let latitude, longitude;

  return axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: city,
      format: 'json'
    }
  })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      return {latitude, longitude};
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!', error);
    });
};

const findWeatherByLatAndLon = (lat,lon) => {
  return axios.get('http://127.0.0.1:5000/weather', {
    params: {
      lat: lat,
      lon: lon,
      format: 'json'
    }
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in getting weather!', error);
    });
};

const getRealTimeTemp = () => {
  const city = document.getElementById('cityNameInput').value;

  findLatitudeAndLongitude(city)
    .then((coords) => {
      return findWeatherByLatAndLon(coords.latitude, coords.longitude);
    })
    .then((weatherData) => {
      const kevin = weatherData.main.temp;
      const fahrenheit = Math.round((kevin- 273.15) * (9 / 5) + 32);

      state.tempValue = fahrenheit;
      document.getElementById('tempValue').textContent = fahrenheit;

      changeTempColor();
      weatherGarden();

      return weatherData;
    })
    .catch((error) => {
      console.log('error in getting weather!', error);
    });
};
