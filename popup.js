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
        
        // Apply wiggle animation to 5% of elements
        const allElements = document.querySelectorAll('*:not(script):not(style):not(meta):not(link):not(head):not(html)');
        const visibleElements = Array.from(allElements).filter(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && 
                 style.visibility !== 'hidden' && 
                 style.opacity !== '0' &&
                 el.offsetWidth > 0 && 
                 el.offsetHeight > 0;
        });
        
        const count = Math.max(1, Math.floor(visibleElements.length / 20));
        const shuffled = [...visibleElements].sort(() => 0.5 - Math.random());
        const selectedElements = shuffled.slice(0, count);
        
        selectedElements.forEach(el => {
          el.classList.add('wiggle');
        });
        
        // Add visitor counter
        const existingCounter = document.querySelector('.geocitifier-visitor-counter');
        if (existingCounter) {
          existingCounter.remove();
        }
        
        // Generate random number between 734 and 184623
        const targetCount = Math.floor(Math.random() * (184623 - 734 + 1)) + 734;
        
        const counter = document.createElement('div');
        counter.className = 'geocitifier-visitor-counter';
        const numberDiv = document.createElement('div');
        numberDiv.className = 'counter-number';
        counter.innerHTML = '<div class="counter-label">You are visitor #</div>';
        counter.appendChild(numberDiv);
        
        document.body.appendChild(counter);
        
        // Animate counting up from a lower number
        const startCount = Math.max(734, Math.floor(targetCount * 0.3));
        const duration = 2000; // 2 seconds
        const steps = 100;
        const increment = (targetCount - startCount) / steps;
        let currentStep = 0;
        
        const animateCount = () => {
          if (currentStep <= steps) {
            const currentCount = Math.floor(startCount + (increment * currentStep));
            numberDiv.textContent = currentCount.toLocaleString();
            currentStep++;
            setTimeout(animateCount, duration / steps);
          } else {
            // Ensure we end at the exact target
            numberDiv.textContent = targetCount.toLocaleString();
          }
        };
        
        // Start animation
        animateCount();
        
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
        
        // Remove wiggle animation
        document.querySelectorAll('.wiggle').forEach(el => {
          el.classList.remove('wiggle');
        });
        
        // Remove visitor counter
        const counter = document.querySelector('.geocitifier-visitor-counter');
        if (counter) {
          counter.remove();
        }
        
        console.log('Page reset!');
      }
    });
  } catch (error) {
    console.error('Error resetting page:', error);
    alert('Error: Could not reset this page. Make sure you\'re on a regular website (not chrome:// pages).');
  }
});
