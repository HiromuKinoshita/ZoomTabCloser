export const getIntervalThenExecute = func => {
  chrome.storage.sync.get(
    ['interval'],
    data => {
      if (!data) {
        // set initial value
        chrome.storage.sync.set({ interval: initialIntervalMinutes }, data => {
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
  console.log('set interval!!');
  console.log(val);

  chrome.storage.sync.set({ interval: val });
};
