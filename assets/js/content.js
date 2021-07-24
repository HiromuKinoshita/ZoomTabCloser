import { removeZoomTabs } from './utils/remove';
import { getIntervalThenExecute } from './utils/storage';

const getResultText = (tabCount) => {
  if (tabCount) {
    const tab = tabCount > 1 ? `${tabCount} tabs are` : '1 tab is';
    return `${tab} closed.`;
  }

  return `No tabs are closed.`;
};
const updateResultText = (tabCount) => {
  const executedTime = document.getElementById('executedTime');
  const result = document.getElementById('result');

  executedTime.innerText = `Executed at  ${(new Date().toTimeString().slice(0, 5))}.`;
  result.innerText = getResultText(tabCount);
};
const updateViewCurrentInterval = interval => {
  const el = document.getElementById('currentInterval');
  el.innerText = `Close zoom tab every ${interval} minutes now.`
};


document.getElementById('buttonRemove').addEventListener('click', removeZoomTabs);

// set link to option page
chrome.management.getSelf(info => {
  const link = document.getElementById('linkSetting');
  link.href = `chrome-extension://${info.id}/options.html`;
});

getIntervalThenExecute(updateViewCurrentInterval);

// update view on setting is changed
chrome.storage.onChanged.addListener(changes => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    updateViewCurrentInterval(newValue);
  }
});
