
//________________________________________________________________________________
// wave 2



const increaseTemp = () => {
  let tempValue = document.getElementById('tempValue');
  const tempContainer = document.createElement('span');
  tempValue.textContent = tempValue;
  tempContainer.appendChild(tempValue);
  tempValue += 1;
};

const registerEventHandlers = () => {
  const increaseTempControlButton = document.getElementById('increaseTempControl');
  increaseTempControlButton.addEventListener('click', increaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);





























































































//________________________________________________________________________________
// wave 3

const CityInputInRealTime = () => {
  let cityNameInput = document.getElementById('cityNameInput').value;
  document.getElementById('headerCityName').innerHTML = 'which City?! ' + cityNameInput + ' it is!!!';
}









//________________________________________________________________________________
// wave 4






















//________________________________________________________________________________
// wave 5





























//________________________________________________________________________________
// wave 6

const cityNameResetButton = document.getElementById('cityNameReset');