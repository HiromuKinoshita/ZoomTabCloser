import { closeZoomTabs } from './utils/close';
import { firstEventUnixTime } from './utils/schedule';
import { getIntervalThenExecute } from './utils/storage';

const set = async interval => {
  await chrome.alarms.clearAll();

  const intervalInt = parseInt(interval);
  const time = firstEventUnixTime(intervalInt);
  chrome.alarms.create('closeTab', {
    periodInMinutes: intervalInt,
    when: time,
  });
};

getIntervalThenExecute(set);

chrome.alarms.onAlarm.addListener(alarm => {
  closeZoomTabs();
});

chrome.storage.onChanged.addListener(async (changes) => {
  if (!changes.interval) {
    return;
  }

  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    set(newValue);
  }
});
