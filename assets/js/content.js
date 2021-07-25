/* global chrome */
import { closeZoomTabs } from './utils/close';
import { getIntervalThenExecute, getResultThenExecute } from './utils/storage';

const updateResultText = (result) => {
  const { executedAt, tabCount } = result;
  const executedTime = document.getElementById('executedTime');
  const el = document.getElementById('result');

  executedTime.innerText = new Date(executedAt).toTimeString().slice(0, 5);
  el.innerText = tabCount;
};

const updateCurrentIntervalText = (interval) => {
  const el = document.getElementById('currentInterval');
  el.innerText = `Every ${interval} minutes.`;
};

document.getElementById('buttonClose').addEventListener('click', closeZoomTabs);

// set link to option page
chrome.management.getSelf((info) => {
  const link = document.getElementById('linkSetting');
  link.href = `chrome-extension://${info.id}/options.html`;
});

// set text
Promise.all([
  getIntervalThenExecute(updateCurrentIntervalText),
  getResultThenExecute(updateResultText),
]);
