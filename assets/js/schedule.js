import { intervalMinutesOptions } from './consts'

const intervalMinutes = intervalMinutesOptions[0];

const getUntillNextEventMinutes = () => {
  const currentMinutes = new Date().getMinutes();
  let nextEventMinutes = 0;

  while (currentMinutes > nextEventMinutes) {
    nextEventMinutes += intervalMinutes;
  }

  return nextEventMinutes - currentMinutes;
};

export const getIntervalMinutes = () => intervalMinutes;
export const firstEventUnixTime = () => {
  const currentTime = Date.now();
  const untillNextEventMinutes = getUntillNextEventMinutes();
  // add minutes as milli seconds
  return currentTime + untillNextEventMinutes * 60 * 1000;
};
