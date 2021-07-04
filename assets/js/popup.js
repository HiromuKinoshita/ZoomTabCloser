// TODO: delete them
// Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

const removeZoomTabs = async () => {
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

buttonRemove.addEventListener("click", removeZoomTabs());

// TODO: delete them
// The body of this function will be executed as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }
