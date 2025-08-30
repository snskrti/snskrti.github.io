#!/bin/bash
# Exit on error
set -e

echo "Starting custom deployment script..."

# Install dependencies explicitly to ensure clean build
echo "Installing dependencies..."
npm ci || npm install

# Clean up any previous build artifacts
echo "Cleaning up previous build..."
rm -rf build

# Run the build with explicit environment variables
echo "Building the application..."
DISABLE_ESLINT_PLUGIN=true CI=false TSC_COMPILE_ON_ERROR=true PUBLIC_URL=/ NODE_ENV=production npm run build

# Verify the build output
echo "Checking build output..."
if [ ! -f "build/index.html" ]; then
  echo "ERROR: index.html is missing from build directory!"
  ls -la build/
  exit 1
else
  echo "✅ index.html exists"
fi

# Make sure _redirects file exists for Netlify
echo "/* /index.html 200" > build/_redirects
echo "✅ Created _redirects file"

# List build directory contents for verification
echo "Contents of the build directory:"
ls -la build/

echo "Deployment preparation completed successfully"
