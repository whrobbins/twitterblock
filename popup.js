// X Scroll Blocker - Popup Script

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('enableToggle');
  const status = document.getElementById('status');

  // Load current state
  chrome.storage.sync.get(['enabled'], function(result) {
    const enabled = result.enabled !== false; // Default to true
    toggle.checked = enabled;
    updateStatus(enabled);
  });

  // Handle toggle changes
  toggle.addEventListener('change', function() {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ enabled: enabled }, function() {
      updateStatus(enabled);

      // Reload the active tab to apply changes
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && (tabs[0].url.includes('x.com') || tabs[0].url.includes('twitter.com'))) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });

  function updateStatus(enabled) {
    if (enabled) {
      status.textContent = 'Scroll blocking is enabled';
      status.style.background = 'rgba(76, 175, 80, 0.3)';
    } else {
      status.textContent = 'Scroll blocking is disabled';
      status.style.background = 'rgba(244, 67, 54, 0.3)';
    }
  }
});
