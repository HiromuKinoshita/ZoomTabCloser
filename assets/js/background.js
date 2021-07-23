import { removeZoomTabs } from './remove';
import { firstEventUnixTime } from './schedule'

const set = interval => {
  const intervalInt =parseInt(interval);
  const time = firstEventUnixTime(intervalInt);
  chrome.alarms.create('removeTab', {
    periodInMinutes: intervalInt,
    when: time,
  })
};

// getSettingThenExecuteFuncと同じ内容
chrome.storage.sync.get(
  ['interval'],
  async data => {
    if (!data) {
      // set initial value
      await chrome.storage.sync.set({ interval: initialIntervalMinutes }, data => {
        set(parseInt(data.interval));
      });
    } else {
      set(parseInt(data.interval));
    }
  },
);

chrome.alarms.onAlarm.addListener(alarm => {
  removeZoomTabs();
});

chrome.storage.onChanged.addListener(async (changes) => {
  await chrome.alarms.clearAll();
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    set(newValue);
  }
});
