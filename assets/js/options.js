import { intervalMinutesOptions, initialIntervalMinutes } from './consts/index'

const button = document.getElementById('buttonSave');
const select = document.getElementById('selectInterval');

const handleButtonClick = async () => {
  await chrome.storage.sync.set({ interval: select.value });
}

const constructOptions = async () => {
  getSettingThenExecuteFunc(setOptionDom);

  button.addEventListener('click', handleButtonClick);
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

// Initialize
constructOptions(intervalMinutesOptions);

export const getSettingThenExecuteFunc = async func => {
  await chrome.storage.sync.get(
    ['interval'],
    async data => {
      if (!data) {
        // set initial value
        await chrome.storage.sync.set({ interval: initialIntervalMinutes }, data => {
          func(data.interval);
        });
      } else {
        func(data.interval);
      }
    },
  );
};
