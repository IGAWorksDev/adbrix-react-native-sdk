#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IOS_DIR="$SCRIPT_DIR/../ios"
PROJECT_NAME="AdbrixReactNativeSdkExample"

echo "🔄 Switching to SPM mode..."

# 1. DerivedData 캐시 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-* 2>/dev/null || true

# 2. CocoaPods 아티팩트 제거
echo "🗑️  Removing CocoaPods artifacts..."
cd "$IOS_DIR"
rm -rf Pods
rm -f Podfile.lock
rm -rf ${PROJECT_NAME}.xcworkspace

# 3. SPM 모드 활성화
echo "📦 Enabling Swift Package Manager..."
cd "$SCRIPT_DIR/.."
npx react-native spm

echo ""
echo "✅ SPM mode activated successfully!"
echo ""
echo "Next steps:"
echo "  npm run ios          # Run on iOS simulator"
echo "  npm run ios:clean    # Clean build cache if needed"
