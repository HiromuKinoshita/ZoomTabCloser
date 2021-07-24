const getUntillNextEventMinutes = (interval) => {
  const currentMinutes = new Date().getMinutes();
  let nextEventMinutes = 0;

  while (currentMinutes > nextEventMinutes) {
    nextEventMinutes += interval;
  }

  return nextEventMinutes - currentMinutes;
};

export const firstEventUnixTime = (interval) => {
  const currentTime = Date.now();
  const untillNextEventMinutes = getUntillNextEventMinutes(interval);
  // add minutes as milli seconds
  return currentTime + untillNextEventMinutes * 60 * 1000;
};
