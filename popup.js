document.getElementById('geocitify').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we can inject scripts on this page
    if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('chrome-extension://')) {
      alert('Cannot geocitify this page. Please try a regular website.');
      return;
    }
    
    // Use executeScript directly - it's more reliable than messaging
    // This ensures the script runs even if content script wasn't loaded
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.classList.add('geocitified');
        console.log('Page geocitified!');
      }
    });
  } catch (error) {
    console.error('Error geocitifying page:', error);
    alert('Error: Could not geocitify this page. Make sure you\'re on a regular website (not chrome:// pages).');
  }
});

document.getElementById('reset').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we can inject scripts on this page
    if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('chrome-extension://')) {
      alert('Cannot reset this page. Please try a regular website.');
      return;
    }
    
    // Use executeScript directly - it's more reliable than messaging
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.classList.remove('geocitified');
        console.log('Page reset!');
      }
    });
  } catch (error) {
    console.error('Error resetting page:', error);
    alert('Error: Could not reset this page. Make sure you\'re on a regular website (not chrome:// pages).');
  }
});
