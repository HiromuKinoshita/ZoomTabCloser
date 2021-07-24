import { removeZoomTabs } from './utils/remove';
import { updateViewCurrentInterval } from './utils/view';
import { getSettingThenExecuteFunc } from './utils/storage';

document.getElementById('buttonRemove').addEventListener('click', removeZoomTabs);

// set link to option page
chrome.management.getSelf(info => {
  const link = document.getElementById('linkSetting');
  link.href = `chrome-extension://${info.id}/options.html`;
});

getSettingThenExecuteFunc(updateViewCurrentInterval);

// update view on setting is changed
chrome.storage.onChanged.addListener(changes => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    updateViewCurrentInterval(newValue);
  }
});
