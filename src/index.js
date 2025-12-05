
//________________________________________________________________________________
// wave 2

const state = {
  tempValue: 50,
};

const increaseTemp = (event) => {
  console.log('in increaseTemp:', event);
  state.tempValue += 1;
  const tempValueContainer = document.querySelector('#tempValue');
  tempValueContainer.textContent = state.tempValue;
};

const decreaseTemp = (event) => {
  console.log('in decreaseTemp:', event);
  state.tempValue -= 1;
  const tempValueContainer = document.querySelector('#tempValue');
  tempValueContainer.textContent = state.tempValue;
};

const registerEventHandlers = (event) => {
  console.log('in registerEventHandlers:', event);

  const increaseTempButton = document.querySelector('#increaseTempControl');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTempControl');
  decreaseTempButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);





































//________________________________________________________________________________
// wave 3
const cityNameInput = document.getElementById('cityNameInput');
const cityNameResetButton = document.getElementById('cityNameReset');

cityNameInput.addEventListener('input', )










//________________________________________________________________________________
// wave 4






















//________________________________________________________________________________
// wave 5





























//________________________________________________________________________________
// wave 6

