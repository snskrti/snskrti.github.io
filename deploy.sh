#!/bin/bash
set -e

echo "Starting custom deployment script..."

# Run the regular build
npm run build

# Verify the build output
echo "Checking build output..."
if [ ! -f "build/index.html" ]; then
  echo "ERROR: index.html is missing from build directory!"
  exit 1
else
  echo "✅ index.html exists"
fi

# Make sure _redirects file exists
echo "/* /index.html 200" > build/_redirects
echo "✅ Created _redirects file"

# Copy debug file
cp public/debug.html build/debug.html
echo "✅ Copied debug.html file"

# Make sure critical files are at the correct paths
touch build/index.html.tmp
cp build/index.html build/index.html.tmp
mv build/index.html.tmp build/index.html
echo "✅ Ensured index.html is correctly positioned"

# List build directory contents for verification
echo "Contents of the build directory:"
ls -la build/

echo "Deployment preparation completed successfully"
