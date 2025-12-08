
//________________________________________________________________________________
// wave 2

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
  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', getLocationFromQuery);

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



//________________________________________________________________________________
// wave 3

// const CityInputInRealTime = () => {
//   let cityNameInput = document.getElementById('cityNameInput').value;
//   document.getElementById('headerCityName').innerHTML = 'which City?! ' + cityNameInput + ' it is!!!';
// }
//____________________________________________________
// const CityInputInRealTime = () => {
//   const cityNameInput = document.getElementById('cityNameInput');
//   const headerCityName = document.getElementById('headerCityName');

//   headerCityName.textContent = `Which City?! ${cityNameInput.value} it is!!! `;
// };

// const cityNameInput = document.getElementById('cityNameInput');

// CityInputInRealTime();
// cityNameInput.addEventListener('input', CityInputInRealTime);


//________________________________________________________________________________
// wave 3 - Madi's Version

const CityInputInRealTime = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  const headerCityName = document.getElementById('headerCityName');

  headerCityName.textContent = cityNameInput.value;
};
// event listener moved to registerEventHandlers()

//________________________________________________________________________________
// wave 4 - Madi's Version

const getLocationFromQuery = async () => {
  try {
    const query = document.getElementById('cityNameInput').value;
    const { latitude, longitude } = await findLatitudeAndLongitude(query);
    const temperature = await getTemp(latitude, longitude);

    state.tempValue = temperature;
    document.querySelector('#tempValue').textContent = temperature;

    changeTempColor();
    weatherGarden();

    return temperature;

  } catch (error) {
    console.log('Error getting real-time temp:', error);
  }
};

const findLatitudeAndLongitude = async (query) => {
  const response = await axios.get('/location', {
    params: { q: query },
  });

  return {
    latitude: response.data[0].lat,
    longitude: response.data[0].lon,
  };
};

const getTemp = async (latitude, longitude) => {
  const response = await axios.get('/weather', {
    params: { lat: latitude, lon: longitude },
  });

  const kelvin = response.data.main.temp;
  const fahrenheit = Math.round((kelvin - 273.15) * 1.8 + 32);
  return fahrenheit;
};

//________________________________________________________________________________
// wave 5 - Madi's Version

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









































//________________________________________________________________________________
// wave 5

// const skySelect = document.getElementById('skySelect');
// const skyDisplay = document.getElementById('skyDisplay');

// const skiesEach = {
//   Sunny:	"☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
//   Cloudy:	"☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
//   Rainy:	"🌧🌈🌧🌧💧🌧🌦🌧💧🌧🌧",
//   Snowy:	"❄️☃️❄️⛄❄️❄️☃️❄️⛄❄️☃️❄️"
// }

// skySelect.addEventListener('change', ()=>{
//   const oneSky = skySelect.value;
//   skyDisplay.textContent = skiesEach[oneSky];
// });


//________________________________________________________________________________
// wave 6

  // const cityNameResetButton = document.getElementById('cityNameReset');

  // cityNameResetButton.addEventListener('click', () => {
  //   // cityNameINput is declared on wave 3 
  //   cityNameInput.value = cityNameInput.defaultValue;

  //   CityInputInRealTime();

  // });
