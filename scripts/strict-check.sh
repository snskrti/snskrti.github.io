#!/bin/bash

echo "🔍 Running strict TypeScript checks..."
echo "=================================="

# Run TypeScript compiler with strict mode
echo "1. Running TypeScript compiler with strict mode..."
npx tsc --noEmit --strict

if [ $? -ne 0 ]; then
    echo "❌ TypeScript strict mode failed!"
    exit 1
fi

echo "✅ TypeScript strict mode passed!"

# Run build command
echo ""
echo "2. Running production build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Production build failed!"
    exit 1
fi

echo "✅ Production build passed!"

# Run linter
echo ""
echo "3. Running ESLint..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ ESLint failed!"
    exit 1
fi

echo "✅ ESLint passed!"

echo ""
echo "🎉 All checks passed! Your code should work on Netlify."
