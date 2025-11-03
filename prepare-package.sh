#!/bin/bash

# Script to prepare GeoCitifier extension for Chrome Web Store publication
# This creates a clean ZIP file excluding development files

set -e

# Get version from manifest.json
VERSION=$(grep -o '"version": "[^"]*"' manifest.json | cut -d'"' -f4)

if [ -z "$VERSION" ]; then
    echo "Error: Could not find version in manifest.json"
    exit 1
fi

# Create filename
ZIP_NAME="geocitifier-v${VERSION}.zip"

echo "Preparing GeoCitifier v${VERSION} for publication..."
echo "Creating: ${ZIP_NAME}"

# Remove existing ZIP if it exists
if [ -f "$ZIP_NAME" ]; then
    echo "Removing existing ${ZIP_NAME}..."
    rm "$ZIP_NAME"
fi

# Create ZIP file excluding development files
zip -r "$ZIP_NAME" . \
    -x "*.git*" \
    -x "*node_modules*" \
    -x "*.DS_Store" \
    -x "*DEVELOPMENT.md" \
    -x "*ARCHITECTURE.md" \
    -x "*PUBLISHING.md" \
    -x "*.sh" \
    -x "*.zip" \
    -x ".vscode/*" \
    -x ".idea/*" \
    -x "*.log" \
    -x "*.swp" \
    -x "*.swo" \
    -x "*~"

# Check if ZIP was created successfully
if [ -f "$ZIP_NAME" ]; then
    ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    echo ""
    echo "✅ Successfully created: ${ZIP_NAME}"
    echo "   Size: ${ZIP_SIZE}"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://chrome.google.com/webstore/devconsole"
    echo "2. Click 'New Item'"
    echo "3. Upload ${ZIP_NAME}"
    echo "4. Complete the store listing"
    echo "5. Submit for review"
else
    echo "❌ Error: Failed to create ZIP file"
    exit 1
fi

