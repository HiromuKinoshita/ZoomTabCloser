import { removeZoomTabs } from './utils/remove';
import { firstEventUnixTime } from './utils/schedule';
import { getIntervalThenExecute } from './utils/storage';

const set = async interval => {
  await chrome.alarms.clearAll();

  const intervalInt = parseInt(interval);
  const time = firstEventUnixTime(intervalInt);
  chrome.alarms.create('removeTab', {
    periodInMinutes: intervalInt,
    when: time,
  });
};

getIntervalThenExecute(set);

// TODO: dom関連の処理を外さないとエラー吐くので削る
chrome.alarms.onAlarm.addListener(alarm => {
  removeZoomTabs();
});

chrome.storage.onChanged.addListener(async (changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    set(newValue);
  }
});
