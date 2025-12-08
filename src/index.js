
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

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempControl');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTempControl');
  decreaseTempButton.addEventListener('click', decreaseTemp);

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

const CityInputInRealTime = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  const headerCityName = document.getElementById('headerCityName');

  headerCityName.textContent = `Which City?! ${cityNameInput.value} it is!!! `;
};

const cityNameInput = document.getElementById('cityNameInput');

CityInputInRealTime();
cityNameInput.addEventListener('input', CityInputInRealTime);


//________________________________________________________________________________
// wave 4

const findLatitudeAndLongitude = (city) => {
let latitude, longitude;

  // Return the promise chain created by the axios call
return axios.get('http://127.0.0.1:5000/location',
    {
    params: {
        q: city,
        format: 'json'
    }
    })
    .then((response) => {
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;

      return {latitude, longitude}; // Return the data we want to pass on
    })
    .catch((error) => {
    console.log('error in findLatitudeAndLongitude!', error);
    });
};



const findWeatherByLatAndLon = (lat,lon) => {

  // Return the promise chain created by the axios call
return axios.get('http://127.0.0.1:5000/weather',
    {
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

        })
        .catch((error) => {
            console.log('error in getting weather!', error);
        });

};

const tempButton = document.getElementById('currentTempButton');
tempButton.addEventListener('click', getRealTimeTemp);



//________________________________________________________________________________
// wave 5

const skySelect = document.getElementById('skySelect');
const skyDisplay = document.getElementById('skyDisplay');

const skiesEach = {
  Sunny:	"☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
  Cloudy:	"☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
  Rainy:	"🌧🌈🌧🌧💧🌧🌦🌧💧🌧🌧",
  Snowy:	"❄️☃️❄️⛄❄️❄️☃️❄️⛄❄️☃️❄️"
}

skySelect.addEventListener('change', ()=>{
  const oneSky = skySelect.value;
  skyDisplay.textContent = skiesEach[oneSky];
});


//________________________________________________________________________________
// wave 6

  const cityNameResetButton = document.getElementById('cityNameReset');

  cityNameResetButton.addEventListener('click', () => {
    // cityNameINput is declared on wave 3 
    cityNameInput.value = cityNameInput.defaultValue;

    CityInputInRealTime();

  });
