# 📜 X Scroll Blocker

A Chrome extension that blocks scrolling on X (formerly Twitter) to help you stay focused, while still allowing you to post tweets, check notifications, and send DMs.

## Features

- 🚫 **Blocks scrolling** on X's main timeline and home feed
- ✅ **Allows posting tweets** - compose and share your thoughts
- 🔔 **Allows checking notifications** - stay updated with mentions and interactions
- 💬 **Allows sending DMs** - communicate privately with others
- 🎛️ **Toggle on/off** - easily enable or disable the extension via popup
- 🎨 **Beautiful UI** - modern gradient design with smooth animations

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
2. The extension will automatically block scrolling on the main timeline
3. You'll see a notification banner at the top of the page indicating that scrolling is blocked

### Allowed Pages

The extension **does NOT block scrolling** on these pages:

- `/messages` - Direct Messages
- `/notifications` - Notifications page
- `/compose/tweet` - Tweet composition
- `/settings` - Settings pages

### Toggle Extension

Click the extension icon in your toolbar to:
- Enable or disable scroll blocking
- View extension status
- See quick info about how it works

## How It Works

The extension uses a content script that:

1. Detects the current URL path on X/Twitter
2. Blocks scrolling on the main feed using CSS and event listeners
3. Monitors for page navigation (since X is a single-page application)
4. Automatically enables scrolling on allowed pages
5. Displays a friendly notification banner when scrolling is blocked

## Technical Details

### Files

- `manifest.json` - Extension configuration
- `content.js` - Main content script that blocks scrolling
- `popup.html` - Extension popup UI
- `popup.js` - Popup functionality
- `icons/` - Extension icons

### Permissions

The extension requires:
- `activeTab` - To interact with the current tab
- `storage` - To save extension settings (enabled/disabled state)
- `host_permissions` - Access to x.com and twitter.com

### Privacy

This extension:
- **Does NOT collect any data**
- **Does NOT track your browsing**
- **Does NOT send any information to external servers**
- Only stores a single boolean value (enabled/disabled) in Chrome's local storage

## Troubleshooting

### Scrolling is not blocked

1. Make sure the extension is enabled (check the popup)
2. Try refreshing the X/Twitter page
3. Check that you're on a page that should be blocked (not /messages, /notifications, etc.)

### Extension icon not showing

1. Make sure you generated all three icon sizes (16x16, 48x48, 128x128)
2. Verify the icon files are saved in the `icons/` folder with the correct names
3. Try reloading the extension from `chrome://extensions/`

### Page won't load properly

1. Try disabling the extension temporarily
2. Refresh the page
3. Re-enable the extension if the issue persists

## Development

### Making Changes

1. Edit the relevant files (`content.js`, `popup.html`, etc.)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the X Scroll Blocker extension
4. Refresh any open X/Twitter tabs to see your changes

### Testing

1. Navigate to X/Twitter
2. Try scrolling - it should be blocked on the main feed
3. Navigate to `/notifications` - scrolling should work
4. Navigate to `/messages` - scrolling should work
5. Try posting a tweet - should work normally
6. Toggle the extension off and on - verify the behavior changes

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use and modify as needed.

---

**Note:** This extension is designed to help reduce mindless scrolling while still allowing you to use X/Twitter intentionally for posting, notifications, and direct communication.
