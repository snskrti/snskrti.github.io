#!/bin/bash
# Exit on error
set -e

echo "Starting monorepo deployment script..."

# Install dependencies at the root level
echo "Installing dependencies..."
npm ci || npm install

# Build all packages and apps using workspace scripts
echo "Building the monorepo..."
npm run build

echo "Monorepo deployment completed successfully"