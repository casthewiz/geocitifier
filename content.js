// Content script that runs on all web pages
console.log('GeoCitifier content script loaded!');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'geocitify') {
    geocitifyPage();
    sendResponse({ status: 'geocitified' });
  } else if (request.action === 'reset') {
    resetPage();
    sendResponse({ status: 'reset' });
  }
});

function geocitifyPage() {
  console.log('GeoCitifying page...');
  document.body.classList.add('geocitified');
}

function resetPage() {
  console.log('Resetting page...');
  document.body.classList.remove('geocitified');
}
