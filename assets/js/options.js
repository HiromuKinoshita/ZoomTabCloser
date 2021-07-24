import { intervalMinutesOptions, initialIntervalMinutes } from './consts/index'
import { getSettingThenExecuteFunc } from './utils/storage';

const button = document.getElementById('buttonSave');
const select = document.getElementById('selectInterval');

const handleButtonClick = () => {
  chrome.storage.sync.set({ interval: select.value });
}

const setOptionDom = currentInterval => {
  for (const option of intervalMinutesOptions) {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.innerText = option;

    select.appendChild(optionElement);

    if (optionElement.value == currentInterval) {
      select.value = optionElement.value;
    }
  }
}

const constructOptions = () => {
  getSettingThenExecuteFunc(setOptionDom);

  button.addEventListener('click', handleButtonClick);
}

// Initialize
constructOptions(intervalMinutesOptions);
