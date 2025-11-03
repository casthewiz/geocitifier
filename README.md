# GeoCitifier 🌐

A Chrome extension that transforms any webpage into a glorious GeoCities-style masterpiece!

## Features

- Transform any webpage with classic GeoCities styling
- Rainbow backgrounds and Comic Sans fonts
- Blinking headers and spinning images
- Easy toggle on/off

## Installation

### Quick Start (Local Development)

1. **Clone this repository:**
   ```bash
   git clone https://github.com/casthewiz/geocitifier.git
   cd geocitifier
   ```

2. **Run the setup script** (recommended):
   ```bash
   chmod +x setup-local.sh
   ./setup-local.sh
   ```
   
   This script will:
   - ✅ Verify all required files are present
   - ✅ Validate the manifest.json
   - ✅ Provide step-by-step instructions
   - ✅ Optionally open Chrome's extensions page

3. **Or manually load the extension:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `geocitifier` directory
   - The GeoCitifier extension should now appear in your extensions list

### Installing from Chrome Web Store

*(Coming soon - extension will be available on the Chrome Web Store)*

## Usage

1. Navigate to any webpage
2. Click the GeoCitifier extension icon in your browser toolbar
3. Click "GeoCitify This Page" to transform the page
4. Click "Reset Page" to restore the original styling

## Development

### Running Locally

This extension requires no build step - it's ready to run immediately!

1. **After cloning, run the setup script:**
   ```bash
   ./setup-local.sh
   ```

2. **Make changes:**
   - Edit any files directly (no compilation needed)
   - Reload the extension in `chrome://extensions/` (click refresh icon)
   - Reload the webpage you're testing on

3. **Debugging:**
   - **Popup**: Right-click extension icon → "Inspect popup"
   - **Content Script**: Open DevTools on the webpage (F12)
   - **Background**: Go to `chrome://extensions/` → Click "service worker" link

For detailed development information, see [DEVELOPMENT.md](DEVELOPMENT.md).

### File Structure

```
geocitifier/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.js            # Popup functionality
├── popup.css           # Popup styling
├── content.js          # Content script
├── geocities.css       # GeoCities styling
├── background.js       # Background service worker
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── setup-local.sh      # Setup script for local development
└── README.md
```

### Manifest Version

This extension uses Manifest V3, the latest Chrome extension manifest version.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

MIT
