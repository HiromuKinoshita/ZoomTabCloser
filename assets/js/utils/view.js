const getResultText = (tabCount) => {
  if (tabCount) {
    const tab = tabCount > 1 ? `${tabCount} tabs are` : '1 tab is';
    return `${tab} closed.`;
  }

  return `No tabs are closed.`;
};

export const updateResultText = (tabCount) => {
  const executedTime = document.getElementById('executedTime');
  const result = document.getElementById('result');

  executedTime.innerText = `Executed at  ${(new Date().toTimeString().slice(0, 5))}.`;
  result.innerText = getResultText(tabCount);
};

export const updateViewCurrentInterval = interval => {
  const el = document.getElementById('currentInterval');
  el.innerText = `Close zoom tab every ${interval} minutes now.`
};