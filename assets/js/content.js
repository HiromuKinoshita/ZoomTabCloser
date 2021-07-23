import { removeZoomTabs } from './remove';

buttonRemove.addEventListener("click", removeZoomTabs);

chrome.management.getSelf(info => {
  const link = document.getElementById('linkSetting');
  console.log(link);
  console.log(document);
  link.href = `chrome-extension://${info.id}/options.html`;
});
