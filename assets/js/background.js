import { removeZoomTabs } from './utils/remove';
import { firstEventUnixTime } from './utils/schedule';
import { getSettingThenExecuteFunc } from './utils/storage';

const set = interval => {
  const intervalInt =parseInt(interval);
  const time = firstEventUnixTime(intervalInt);
  chrome.alarms.create('removeTab', {
    periodInMinutes: intervalInt,
    when: time,
  });
};

getSettingThenExecuteFunc(set);

chrome.alarms.onAlarm.addListener(alarm => {
  removeZoomTabs();
});

chrome.storage.onChanged.addListener(async (changes) => {
  await chrome.alarms.clearAll();
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    set(newValue);
  }
});
