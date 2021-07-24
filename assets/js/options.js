import { intervalMinutesOptions, initialIntervalMinutes } from './consts/index'

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

    if (optionElement.value === currentInterval) {
      select.value = optionElement.value;
    }

    select.appendChild(optionElement);
  }
}

export const getSettingThenExecuteFunc = func => {
  chrome.storage.sync.get(
    ['interval'],
    data => {
      if (!data) {
        // set initial value
        chrome.storage.sync.set({ interval: initialIntervalMinutes }, data => {
          func(data.interval);
        });
      } else {
        func(data.interval);
      }
    },
  );
};

const constructOptions = () => {
  getSettingThenExecuteFunc(setOptionDom);

  button.addEventListener('click', handleButtonClick);
}

// Initialize
constructOptions(intervalMinutesOptions);
