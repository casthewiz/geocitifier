// Background service worker for Chrome extension
console.log('GeoCitifier background service worker loaded!');

chrome.runtime.onInstalled.addListener(() => {
  console.log('GeoCitifier extension installed!');
});

// Optional: Handle extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked for tab:', tab.id);
});
