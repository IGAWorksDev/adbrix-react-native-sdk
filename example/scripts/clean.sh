#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IOS_DIR="$SCRIPT_DIR/../ios"
PROJECT_NAME="AdbrixReactNativeSdkExample"

echo "🧹 Cleaning build caches..."

# 1. DerivedData 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-* 2>/dev/null || true

# 2. iOS 빌드 디렉토리 삭제
echo "🗑️  Clearing iOS build directory..."
rm -rf "$IOS_DIR/build" 2>/dev/null || true

# 3. Metro 번들러 캐시 삭제
echo "🗑️  Clearing Metro bundler cache..."
rm -rf "$SCRIPT_DIR/../node_modules/.cache" 2>/dev/null || true

# 4. React Native 캐시 삭제
echo "🗑️  Clearing React Native cache..."
watchman watch-del-all 2>/dev/null || true

echo ""
echo "✅ Build caches cleared successfully!"
echo ""
echo "Next steps:"
echo "  npm run ios          # Rebuild iOS app"
