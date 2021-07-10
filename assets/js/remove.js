export const removeZoomTabs = async () => {
  const tabs = await chrome.tabs.query({
    /**
     * Target should be inactive tabs.
     * A user may want to reopen zoom app via browser if tab is active.
     */
    active: false,
    url: [
      'https://zoom.us/*#success',
      'https://*.zoom.us/*#success',
      'https://zoom.us/postattendee*',
      'https://*.zoom.us/postattendee*',
    ],
  });
  tabs.forEach(async tab => {
    chrome.tabs.remove(tab.id);
  });
}
