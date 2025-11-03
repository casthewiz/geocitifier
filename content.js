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
  
  // Select approximately 5% (1/20th) of elements to wiggle
  applyWiggleAnimation();
  
  // Add visitor counter
  addVisitorCounter();
}

function applyWiggleAnimation() {
  // Get all visible elements (excluding script, style, meta, etc.)
  const allElements = document.querySelectorAll('*:not(script):not(style):not(meta):not(link):not(head):not(html)');
  const visibleElements = Array.from(allElements).filter(el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0' &&
           el.offsetWidth > 0 && 
           el.offsetHeight > 0;
  });
  
  // Calculate 5% (1/20th) of visible elements
  const count = Math.max(1, Math.floor(visibleElements.length / 20));
  
  // Randomly select elements
  const shuffled = [...visibleElements].sort(() => 0.5 - Math.random());
  const selectedElements = shuffled.slice(0, count);
  
  // Apply wiggle class to selected elements
  selectedElements.forEach(el => {
    el.classList.add('wiggle');
  });
  
  console.log(`Applied wiggle animation to ${selectedElements.length} elements`);
}

function resetPage() {
  console.log('Resetting page...');
  document.body.classList.remove('geocitified');
  
  // Remove wiggle animation from all elements
  document.querySelectorAll('.wiggle').forEach(el => {
    el.classList.remove('wiggle');
  });
  
  // Remove visitor counter
  const counter = document.querySelector('.geocitifier-visitor-counter');
  if (counter) {
    counter.remove();
  }
}

function addVisitorCounter() {
  // Remove existing counter if present
  const existingCounter = document.querySelector('.geocitifier-visitor-counter');
  if (existingCounter) {
    existingCounter.remove();
  }
  
  // Generate random number between 734 and 184623
  const targetCount = Math.floor(Math.random() * (184623 - 734 + 1)) + 734;
  
  // Create counter element
  const counter = document.createElement('div');
  counter.className = 'geocitifier-visitor-counter';
  const numberDiv = document.createElement('div');
  numberDiv.className = 'counter-number';
  counter.innerHTML = '<div class="counter-label">You are visitor #</div>';
  counter.appendChild(numberDiv);
  
  // Add to page
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
  
  console.log(`Visitor counter added: ${targetCount} visitors`);
}
