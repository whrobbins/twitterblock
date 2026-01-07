// X Scroll Blocker - Content Script
// Permanently blocks scrolling on X (Twitter) - no toggle, no escape!

(function() {
  'use strict';

  let scrollPosition = 0;

  // Initialize immediately - always on, no exceptions
  init();

  function init() {
    // Check if we're on an allowed page
    if (isAllowedPage()) {
      return; // Don't block scrolling on allowed pages
    }

    blockScrolling();

    // Monitor for URL changes (SPA navigation)
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        handleNavigation();
      }
    }).observe(document, { subtree: true, childList: true });
  }

  function isAllowedPage() {
    const pathname = window.location.pathname;
    const allowedPaths = [
      '/messages',           // DMs
      '/notifications',      // Notifications
      '/compose/tweet',      // Compose tweet modal
      '/settings',           // Settings (in case user needs to access)
    ];

    // Check if current path matches any allowed paths
    return allowedPaths.some(path => pathname.startsWith(path));
  }

  function handleNavigation() {
    if (isAllowedPage()) {
      cleanup();
    } else {
      blockScrolling();
    }
  }

  function blockScrolling() {
    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Prevent scrolling via various methods
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    // Add event listeners
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    // Show notification banner
    showBanner();
  }

  function cleanup() {
    // Restore scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    // Restore scroll position
    window.scrollTo(0, scrollPosition);

    // Remove event listeners
    window.removeEventListener('wheel', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
    window.removeEventListener('keydown', preventKeyScroll, { passive: false });

    // Remove banner
    removeBanner();
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function preventKeyScroll(e) {
    // Prevent scrolling with arrow keys, page up/down, space, home, end
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    if (keys.includes(e.keyCode)) {
      e.preventDefault();
      e.stopPropagation();
    }
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
      padding: 12px 20px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      animation: slideDown 0.3s ease-out;
    `;

    banner.innerHTML = `
      <style>
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      </style>
      🔒 Scrolling permanently blocked to help you stay focused!
      <span style="opacity: 0.9; font-size: 12px;">
        (You can still post tweets, check notifications, and send DMs)
      </span>
    `;

    document.body.appendChild(banner);

    // Adjust body padding to account for banner
    document.body.style.paddingTop = banner.offsetHeight + 'px';
  }

  function removeBanner() {
    const banner = document.getElementById('x-scroll-blocker-banner');
    if (banner) {
      banner.remove();
      document.body.style.paddingTop = '';
    }
  }

})();
