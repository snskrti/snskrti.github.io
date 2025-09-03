#!/bin/bash
# This script will remove the old source code files that have been moved to the packages/webapp directory

# Files and directories to remove
echo "Removing old source code files that have been moved to packages/webapp..."

# Remove src directory
if [ -d "src" ] && [ -d "packages/webapp/src" ]; then
  echo "Removing src directory..."
  rm -rf src
fi

# Remove public directory
if [ -d "public" ] && [ -d "packages/webapp/public" ]; then
  echo "Removing public directory..."
  rm -rf public
fi

# Remove build directory (if it exists)
if [ -d "build" ]; then
  echo "Removing build directory..."
  rm -rf build
fi

# List of config files that have been copied to packages
config_files=(
  ".eslintrc.js"
  ".eslintrc.json"
  "postcss.config.js"
  "tailwind.config.js"
  "tsconfig.json"
)

# Check each config file - only remove if it exists in packages/webapp
for file in "${config_files[@]}"; do
  if [ -f "$file" ] && [ -f "packages/webapp/$file" ]; then
    echo "Removing $file..."
    rm "$file"
  fi
done

echo "Cleanup completed."
