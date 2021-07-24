/* global chrome */
import { closeZoomTabs } from './utils/close';
import { firstEventUnixTime } from './utils/schedule';
import { getIntervalThenExecute } from './utils/storage';

const set = async (interval) => {
  await chrome.alarms.clearAll();

  const intervalInt = parseInt(interval, 10);
  const time = firstEventUnixTime(intervalInt);
  chrome.alarms.create('closeTab', {
    periodInMinutes: intervalInt,
    when: time,
  });
};

getIntervalThenExecute(set);

chrome.alarms.onAlarm.addListener(() => {
  closeZoomTabs();
});

chrome.storage.onChanged.addListener(async (changes) => {
  if (!changes.interval) {
    return;
  }

  Object.entries(changes).forEach(change => {
    set(change.newValue);
  });
});
