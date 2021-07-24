import { intervalMinutesOptions } from './consts/index';
import { getIntervalThenExecute, setInterval } from './utils/storage';

const button = document.getElementById('buttonSave');
const select = document.getElementById('selectInterval');

const handleButtonClick = () => {
  setInterval(select.value);
};

const setOptionDom = (currentInterval) => {
  intervalMinutesOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.innerText = option;

    select.appendChild(optionElement);

    // eslint-disable-next-line eqeqeq
    if (optionElement.value == currentInterval) {
      select.value = optionElement.value;
    }
  });
};

const constructOptions = () => {
  getIntervalThenExecute(setOptionDom);

  button.addEventListener('click', handleButtonClick);
};

// Initialize
constructOptions(intervalMinutesOptions);
