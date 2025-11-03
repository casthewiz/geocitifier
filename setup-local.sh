#!/bin/bash

# Setup script for GeoCitifier Chrome Extension
# This script helps you set up and run the extension locally

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌐 GeoCitifier - Local Setup${NC}"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}✓${NC} Checking extension files..."

# Check for required files
REQUIRED_FILES=(
    "manifest.json"
    "popup.html"
    "popup.js"
    "popup.css"
    "content.js"
    "geocities.css"
    "background.js"
    "icons/icon16.png"
    "icons/icon32.png"
    "icons/icon48.png"
    "icons/icon128.png"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    echo -e "${RED}✗${NC} Missing required files:"
    for file in "${MISSING_FILES[@]}"; do
        echo -e "  ${RED}-${NC} $file"
    done
    echo ""
    echo "Please ensure all required files are present."
    exit 1
fi

echo -e "${GREEN}✓${NC} All required files found"

# Validate manifest.json
echo -e "${GREEN}✓${NC} Validating manifest.json..."
if command -v python3 &> /dev/null; then
    if python3 -m json.tool manifest.json > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} manifest.json is valid JSON"
    else
        echo -e "${YELLOW}⚠${NC}  Warning: Could not validate manifest.json"
    fi
elif command -v node &> /dev/null; then
    # Try with node if python3 is not available
    if node -e "JSON.parse(require('fs').readFileSync('manifest.json'))" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} manifest.json is valid JSON"
    else
        echo -e "${YELLOW}⚠${NC}  Warning: Could not validate manifest.json"
    fi
else
    echo -e "${YELLOW}⚠${NC}  Warning: Could not validate manifest.json (python3 or node not found)"
fi

echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo ""
echo "1. Open Google Chrome"
echo "2. Navigate to: chrome://extensions/"
echo "3. Enable 'Developer mode' (toggle in top right)"
echo "4. Click 'Load unpacked'"
echo "5. Select this directory:"
echo -e "   ${GREEN}$SCRIPT_DIR${NC}"
echo ""
echo -e "${YELLOW}💡 Tip:${NC} After making changes to the extension, click the refresh icon"
echo "   on the GeoCitifier card in chrome://extensions/ to reload it."
echo ""

# Try to detect Chrome installation
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if [ -d "/Applications/Google Chrome.app" ]; then
        echo -e "${GREEN}✓${NC} Chrome detected on macOS"
        echo ""
        read -p "Would you like to open Chrome's extensions page? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            open -a "Google Chrome" "chrome://extensions/"
        fi
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v google-chrome &> /dev/null || command -v chromium-browser &> /dev/null; then
        echo -e "${GREEN}✓${NC} Chrome/Chromium detected on Linux"
        echo ""
        read -p "Would you like to open Chrome's extensions page? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if command -v google-chrome &> /dev/null; then
                google-chrome "chrome://extensions/" 2>/dev/null &
            elif command -v chromium-browser &> /dev/null; then
                chromium-browser "chrome://extensions/" 2>/dev/null &
            fi
        fi
    fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows (Git Bash/Cygwin)
    echo -e "${YELLOW}ℹ${NC}  On Windows, please manually open Chrome and navigate to chrome://extensions/"
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "For more information, see:"
echo "  - README.md (general information)"
echo "  - DEVELOPMENT.md (development guide)"

