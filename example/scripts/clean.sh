#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
IOS_DIR="$PROJECT_DIR/ios"
ANDROID_DIR="$PROJECT_DIR/android"
PROJECT_NAME="AdbrixReactNativeSdkExample"

echo "🧹 Cleaning build caches..."

# 1. DerivedData 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-* 2>/dev/null || true

# 2. iOS 빌드 디렉토리 삭제
echo "🗑️  Clearing iOS build directory..."
rm -rf "$IOS_DIR/build" 2>/dev/null || true

# 3. SPM 빌드 캐시 삭제
echo "🗑️  Clearing SPM build cache..."
rm -rf "$IOS_DIR/.build" 2>/dev/null || true

# 4. Android 빌드 캐시 삭제
echo "🗑️  Clearing Android build cache..."
rm -rf "$ANDROID_DIR/app/build" 2>/dev/null || true
rm -rf "$ANDROID_DIR/build" 2>/dev/null || true
rm -rf "$ANDROID_DIR/.gradle" 2>/dev/null || true

# 5. Metro 번들러 캐시 삭제
echo "🗑️  Clearing Metro bundler cache..."
rm -rf "$PROJECT_DIR/node_modules/.cache" 2>/dev/null || true
rm -rf /tmp/metro-* 2>/dev/null || true
rm -rf /tmp/haste-map-* 2>/dev/null || true

# 6. React Native 캐시 삭제
echo "🗑️  Clearing React Native cache..."
watchman watch-del-all 2>/dev/null || true

echo ""
echo "✅ Build caches cleared successfully!"
echo ""
echo "Next steps:"
echo "  npm run ios          # Rebuild iOS app"
echo "  npm run android      # Rebuild Android app"
