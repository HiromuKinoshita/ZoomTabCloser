import { removeZoomTabs } from './remove';
import { updateViewCurrentInterval } from './view';

document.getElementById('buttonRemove').addEventListener('click', removeZoomTabs);

// set link to option page
chrome.management.getSelf(info => {
  const link = document.getElementById('linkSetting');
  link.href = `chrome-extension://${info.id}/options.html`;
});

// init setting view TODO: 作りを見直す。なぜかimportした時に色々おかしくなっている
chrome.storage.sync.get(
  ['interval'],
  async data => {
    if (!data) {
      // set initial value
      await chrome.storage.sync.set({ interval: initialIntervalMinutes }, data => {
        updateViewCurrentInterval(data.interval);
      });
    } else {
      updateViewCurrentInterval(data.interval);
    }
  },
);

// update view on setting is changed
chrome.storage.onChanged.addListener(changes => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    updateViewCurrentInterval(newValue);
  }
});
