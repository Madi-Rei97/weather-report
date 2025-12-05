
//________________________________________________________________________________
// wave 2

// Increase/decrease temp with arrows:
const state = {
  tempValue: 50,
};

const increaseTemp = (event) => {
  console.log('in increaseTemp:', event);

  state.tempValue += 1;
  const tempValueContainer = document.querySelector('#tempValue');
  tempValueContainer.textContent = state.tempValue;
  changeTempColor();
};

const decreaseTemp = (event) => {
  console.log('in decreaseTemp:', event);

  state.tempValue -= 1;
  const tempValueContainer = document.querySelector('#tempValue');
  tempValueContainer.textContent = state.tempValue;
  changeTempColor();
};

const registerEventHandlers = (event) => {
  console.log('in registerEventHandlers:', event);

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





























































































//________________________________________________________________________________
// wave 3

// const CityInputInRealTime = () => {
//   let cityNameInput = document.getElementById('cityNameInput').value;
//   document.getElementById('headerCityName').innerHTML = 'which City?! ' + cityNameInput + ' it is!!!';
// }


// document.addEventListener('DOMContentLoaded', () => {

//   const CityInputInRealTime = () => {
//     const cityNameInput = document.getElementById('cityNameInput');
//     const headerCityName = document.getElementById('headerCityName');

//     headerCityName.textContent = `Which City?! ${cityNameInput.value} it is!!! `;
//   };

//     const cityNameInput = document.getElementById('cityNameInput');
//     cityNameInput.addEventListener('input', CityInputInRealTime);

//     CityInputInRealTime();
// });


const CityInputInRealTime = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  const headerCityName = document.getElementById('headerCityName');

  headerCityName.textContent = `Which City?! ${cityNameInput.value} it is!!! `;
};

const cityNameInput = document.getElementById('cityNameInput');
cityNameInput.addEventListener('input', CityInputInRealTime);


//________________________________________________________________________________
// wave 4






















//________________________________________________________________________________
// wave 5





























//________________________________________________________________________________
// wave 6






// const cityNameReturnToDefault = () => {
//   const cityNameResetButton = document.getElementById('cityNameReset').value;
//   document.


// }


