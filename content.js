// X Feed Blocker - Content Script
// Removes the timeline feed and sidebar to prevent mindless scrolling

(function() {
  'use strict';

  // Wait for DOM to be ready, then initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  function init() {
    // Check if we're on an allowed page
    if (isAllowedPage()) {
      return; // Don't remove content on allowed pages
    }

    // Remove feed content
    removeFeedContent();

    // Watch for new feed content being added (SPA behavior)
    observeFeedChanges();

    // Monitor for URL changes (SPA navigation)
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        handleNavigation();
      }
    }).observe(document, { subtree: true, childList: true });

    // Show notification banner
    showBanner();
  }

  function isAllowedPage() {
    const pathname = window.location.pathname;
    const allowedPaths = [
      '/messages',           // DMs
      '/notifications',      // Notifications
      '/compose/tweet',      // Compose tweet modal
      '/settings',           // Settings
    ];

    // Check if current path matches any allowed paths
    return allowedPaths.some(path => pathname.startsWith(path));
  }

  function handleNavigation() {
    if (isAllowedPage()) {
      removeBanner();
    } else {
      removeFeedContent();
      showBanner();
    }
  }

  function removeFeedContent() {
    // X.com timeline feed selectors
    const feedSelectors = [
      '[data-testid="primaryColumn"]',  // Main timeline column
      '[aria-label="Timeline: Your Home Timeline"]',
      '[aria-label="Timeline: Trending now"]',
      'main [role="region"]',  // Main content regions
    ];

    // Sidebar selectors
    const sidebarSelectors = [
      '[data-testid="sidebarColumn"]',  // Right sidebar
      '[data-testid="RightSidebar"]',
      'aside',  // Generic aside element
    ];

    // Remove feed elements
    feedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Only remove if it's actually the timeline, not notifications/messages
        if (!isAllowedPage()) {
          el.style.display = 'none';
        }
      });
    });

    // Remove sidebar elements
    sidebarSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
      });
    });

    // Add a message where the feed was
    addBlockedMessage();
  }

  function addBlockedMessage() {
    // Find the main element or primary column
    const main = document.querySelector('main') || document.querySelector('[data-testid="primaryColumn"]');

    if (main && !document.getElementById('x-feed-blocked-message')) {
      const message = document.createElement('div');
      message.id = 'x-feed-blocked-message';
      message.style.cssText = `
        padding: 60px 20px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      `;

      message.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
        <h2 style="font-size: 24px; margin-bottom: 12px; font-weight: 600;">Feed Blocked</h2>
        <p style="font-size: 16px; opacity: 0.9; max-width: 400px; margin: 0 auto 24px; line-height: 1.6;">
          The timeline feed has been removed to help you stay focused.
        </p>
        <div style="font-size: 14px; opacity: 0.8; line-height: 1.8;">
          <p><strong>You can still:</strong></p>
          <p>✓ Post tweets (click compose button)</p>
          <p>✓ Check notifications</p>
          <p>✓ Send and receive DMs</p>
        </div>
      `;

      main.appendChild(message);
    }
  }

  function observeFeedChanges() {
    // Observe the document for changes and re-remove feed content
    const observer = new MutationObserver(() => {
      if (!isAllowedPage()) {
        removeFeedContent();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function showBanner() {
    // Check if banner already exists
    if (document.getElementById('x-scroll-blocker-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'x-scroll-blocker-banner';
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 10px 20px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: 500;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;

    banner.innerHTML = `
      🔒 Feed blocked - You can still post, check notifications, and send DMs
    `;

    document.body.appendChild(banner);
  }

  function removeBanner() {
    const banner = document.getElementById('x-scroll-blocker-banner');
    if (banner) {
      banner.remove();
    }
  }

})();
