#!/bin/bash

# Pre-commit validation script
# Run this before committing to catch build errors early

echo "🔍 Running pre-commit validation checks..."

# TypeScript type checking
echo "📝 Checking TypeScript types..."
npm run test:type
if [ $? -ne 0 ]; then
  echo "❌ TypeScript type checking failed!"
  exit 1
fi

# ESLint
echo "🧹 Running ESLint..."
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -eq 2 ]; then
  echo "❌ ESLint found errors (exit code 2)!"
  exit 1
elif [ $LINT_EXIT_CODE -eq 1 ]; then
  echo "⚠️ ESLint found warnings (exit code 1) - continuing..."
else
  echo "✅ ESLint passed!"
fi

# Build verification
echo "🏗️ Verifying build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ All pre-commit checks passed! Safe to commit."