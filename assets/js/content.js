/* global chrome */
import { closeZoomTabs } from './utils/close';
import { getIntervalThenExecute, getResultThenExecute } from './utils/storage';

const getResultText = (tabCount) => {
  if (tabCount) {
    const tab = tabCount > 1 ? `${tabCount} tabs are` : '1 tab is';
    return `${tab} closed.`;
  }
  return `No tabs are closed.`;
};

const updateResultText = (result) => {
  const { executedAt, tabCount } = result;
  const executedTime = document.getElementById('executedTime');
  const el = document.getElementById('result');

  executedTime.innerText = `Executed at  ${new Date(executedAt)
    .toTimeString()
    .slice(0, 5)}.`;
  el.innerText = getResultText(tabCount);
};

const updateCurrentIntervalText = (interval) => {
  const el = document.getElementById('currentInterval');
  el.innerText = `Close zoom tab every ${interval} minutes now.`;
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
