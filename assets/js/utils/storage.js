import { initialIntervalMinutes } from '../consts/index'

export const getIntervalThenExecute = async func => {
  await chrome.storage.sync.get(
    ['interval'],
    async data => {
      if (!data.interval) {
        // set initial value
        await chrome.storage.sync.set({ interval: initialIntervalMinutes }, data => {
          if (!data.interval) {
            throw new Error('interval is not set');
          }
          func(data.interval);
        });
      } else {
        func(data.interval);
      }
    },
  );
};

// interval: int
export const setInterval = val => {
  chrome.storage.sync.set({ interval: val });
};

export const getResultThenExecute = async func => {
  await chrome.storage.sync.get(
    ['result'],
    data => {
      if (!data.result) {
        throw new Error('result is not set');
      }
      func(data.result);
    },
  );
};

// resulut: { executedAt: unixtime, tabCount: int }
export const setResult = (executedAt, tabCount) => {
  chrome.storage.sync.set({
    result: {
      executedAt,
      tabCount,
    },
  });
};
