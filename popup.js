document.getElementById('geocitify').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: geocitifyPage
  });
});

document.getElementById('reset').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: resetPage
  });
});

function geocitifyPage() {
  document.body.classList.add('geocitified');
}

function resetPage() {
  document.body.classList.remove('geocitified');
}
