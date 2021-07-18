import { removeZoomTabs } from './remove';

const basisMinutesOptions = [...Array(60).keys()].map(i => ++i);
const intervalMinutesOptions = [15, 30, 60];

const basisMinutes = basisMinutesOptions[5];
const intervalMinutes = intervalMinutesOptions[0];

const currentMinutes = new Date().getMinutes();

let nextEventMinutes = basisMinutes;
while (currentMinutes > nextEventMinutes) {
  nextEventMinutes += intervalMinutes;
}
const untillNextEventMinutes = nextEventMinutes - currentMinutes;
const currentTime = Date.now();

chrome.alarms.create('removeTab', {
  periodInMinutes: intervalMinutes,
  when: (currentTime + untillNextEventMinutes * 60) * 1000,
});

chrome.alarms.onAlarm.addListener(alarm => {
  console.log(alarm);
  console.log(new Date().getTime());
  removeZoomTabs();
});
