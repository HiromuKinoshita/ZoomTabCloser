import { removeZoomTabs } from './remove';
import { getIntervalMinutes, firstEventUnixTime } from './schedule'

chrome.alarms.create('removeTab', {
  periodInMinutes: getIntervalMinutes(),
  when: firstEventUnixTime(),
});

chrome.alarms.onAlarm.addListener(alarm => {
  removeZoomTabs();
});
