#!/bin/bash
# Exit on error
set -e

echo "Starting custom deployment script..."

# Install dependencies explicitly to ensure clean build
echo "Installing dependencies..."
npm ci || npm install

# Clean up any previous build artifacts
echo "Cleaning up previous build..."
rm -rf packages/webapp/build
rm -rf packages/adminapp/build

# Build the webapp
echo "Building the webapp application..."
npm run build:webapp

# Verify the webapp build output
echo "Checking webapp build output..."
if [ ! -f "packages/webapp/build/index.html" ]; then
  echo "ERROR: index.html is missing from webapp build directory!"
  ls -la packages/webapp/build/
  exit 1
else
  echo "✅ webapp index.html exists"
fi

# Make sure _redirects file exists for Netlify
echo "/* /index.html 200" > packages/webapp/build/_redirects
echo "✅ Created _redirects file for webapp"

# List webapp build directory contents for verification
echo "Contents of the webapp build directory:"
ls -la packages/webapp/build/

# Build the adminapp
echo "Building the adminapp application..."
npm run build:adminapp

# Create admin directory in webapp build and copy adminapp build there
echo "Copying adminapp build to webapp build/admin directory..."
mkdir -p packages/webapp/build/admin
cp -r packages/adminapp/build/* packages/webapp/build/admin/

echo "Deployment preparation completed successfully"
