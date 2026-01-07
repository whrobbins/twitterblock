# 🔒 X Scroll Blocker

A Chrome extension that **permanently** blocks scrolling on X (formerly Twitter) to help you stay focused, while still allowing you to post tweets, check notifications, and send DMs.

## Features

- 🔒 **Permanently blocks scrolling** on X's main timeline and home feed - no toggle, no escape!
- ✅ **Allows posting tweets** - compose and share your thoughts
- 🔔 **Allows checking notifications** - stay updated with mentions and interactions
- 💬 **Allows sending DMs** - communicate privately with others
- 🎨 **Beautiful UI** - modern gradient design with smooth animations
- 🛡️ **Commitment device** - only way to disable is to uninstall the extension

## Installation

### Step 1: Generate Icons

Before installing the extension, you need to generate the icon files. Choose one of these methods:

#### Option A: Using the HTML Generator (Easiest)

1. Open `icons/generate-icons.html` in your web browser
2. Click the "Download" button for each icon size (16x16, 48x48, 128x128)
3. Save the downloaded files as:
   - `icons/icon16.png`
   - `icons/icon48.png`
   - `icons/icon128.png`

#### Option B: Using the Python Script

1. Install Pillow: `pip install pillow`
2. Run the script: `python3 generate_icons.py`
3. Icons will be automatically created in the `icons/` folder

### Step 2: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the folder containing this extension
5. The X Scroll Blocker extension should now appear in your extensions list

### Step 3: Pin the Extension (Optional)

1. Click the extensions icon (puzzle piece) in Chrome's toolbar
2. Find "X Scroll Blocker" and click the pin icon
3. The extension icon will now appear in your toolbar for easy access

## Usage

### Basic Usage

1. Navigate to [x.com](https://x.com) or [twitter.com](https://twitter.com)
2. The extension will **automatically and permanently** block scrolling on the main timeline
3. You'll see a notification banner at the top of the page: "🔒 Scrolling permanently blocked to help you stay focused!"

### Allowed Pages

The extension **does NOT block scrolling** on these pages:

- `/messages` - Direct Messages
- `/notifications` - Notifications page
- `/compose/tweet` - Tweet composition
- `/settings` - Settings pages

### Extension Status

Click the extension icon in your toolbar to view:
- Confirmation that the extension is "Always Active"
- What's blocked and what still works
- Reminder that there is no toggle - to disable, you must uninstall

### Disabling the Extension

⚠️ **Important:** There is no toggle to turn this extension off temporarily. This is by design - it's a commitment device to help you stay focused.

To disable scroll blocking, you must:
1. Go to `chrome://extensions/`
2. Find "X Scroll Blocker"
3. Toggle it off or click "Remove" to uninstall

## How It Works

The extension uses a content script that:

1. **Immediately activates** on page load - no checks, no toggles
2. Detects the current URL path on X/Twitter
3. **Permanently blocks scrolling** on the main feed using CSS and event listeners
4. Monitors for page navigation (since X is a single-page application)
5. Automatically enables scrolling on allowed pages (notifications, DMs, compose)
6. Displays a notification banner: "🔒 Scrolling permanently blocked to help you stay focused!"

## Technical Details

### Files

- `manifest.json` - Extension configuration (Manifest V3)
- `content.js` - Main content script that permanently blocks scrolling
- `popup.html` - Extension popup UI (information only, no controls)
- `icons/` - Extension icons
- `generate_icons.py` - Python script to generate icons
- `icons/generate-icons.html` - HTML-based icon generator

### Permissions

The extension requires:
- `activeTab` - To interact with the current tab
- `host_permissions` - Access to x.com and twitter.com

**No storage permission needed** - the extension is always active and doesn't store any settings.

### Privacy

This extension:
- **Does NOT collect any data**
- **Does NOT track your browsing**
- **Does NOT send any information to external servers**
- **Does NOT store any settings or preferences**
- Operates entirely locally on your device

## Troubleshooting

### Scrolling is not blocked

1. Verify the extension is installed and enabled at `chrome://extensions/`
2. Try refreshing the X/Twitter page
3. Check that you're on a page that should be blocked (not /messages, /notifications, etc.)
4. Check the browser console for any errors

### Extension icon not showing

1. Make sure you generated all three icon sizes (16x16, 48x48, 128x128)
2. Verify the icon files are saved in the `icons/` folder with the correct names
3. Try reloading the extension from `chrome://extensions/`

### I want to temporarily disable the extension

⚠️ **By design, there is no temporary toggle.** This extension is a commitment device.

To disable scroll blocking:
1. Go to `chrome://extensions/`
2. Toggle off "X Scroll Blocker" or uninstall it completely

### Page won't load properly

1. Uninstall the extension from `chrome://extensions/`
2. Refresh the page to verify it works without the extension
3. If the issue persists, it's not related to this extension

## Development

### Making Changes

1. Edit the relevant files (`content.js`, `popup.html`, etc.)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the X Scroll Blocker extension
4. Refresh any open X/Twitter tabs to see your changes

### Testing

1. Navigate to X/Twitter
2. Try scrolling - it should be **permanently blocked** on the main feed
3. Navigate to `/notifications` - scrolling should work
4. Navigate to `/messages` - scrolling should work
5. Try posting a tweet - should work normally
6. Click the extension icon - verify it shows "Always Active" with no toggle

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use and modify as needed.

---

**Note:** This extension is designed as a **commitment device** to help you eliminate mindless scrolling. It's permanently active by design - there is no toggle. You can still use X/Twitter intentionally for posting, notifications, and direct communication, but you won't be able to scroll through the timeline. To disable it, you must uninstall the extension entirely.
