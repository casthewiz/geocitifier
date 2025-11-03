# GeoCitifier 🌐

A Chrome extension that transforms any webpage into a glorious GeoCities-style masterpiece!

## Features

- Transform any webpage with classic GeoCities styling
- Rainbow backgrounds and Comic Sans fonts
- Blinking headers and spinning images
- Easy toggle on/off

## Installation

### Load as Unpacked Extension (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/casthewiz/geocitifier.git
   cd geocitifier
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" using the toggle in the top right corner

4. Click "Load unpacked" and select the `geocitifier` directory

5. The GeoCitifier extension should now appear in your extensions list

## Usage

1. Navigate to any webpage
2. Click the GeoCitifier extension icon in your browser toolbar
3. Click "GeoCitify This Page" to transform the page
4. Click "Reset Page" to restore the original styling

## Development

### File Structure

```
geocitifier/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.css           # Popup styling
├── popup.js            # Popup functionality
├── content.js          # Content script
├── geocities.css       # GeoCities styling
├── background.js       # Background service worker
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

### Manifest Version

This extension uses Manifest V3, the latest Chrome extension manifest version.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

MIT
