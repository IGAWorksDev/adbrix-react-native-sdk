#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IOS_DIR="$SCRIPT_DIR/../ios"
PROJECT_NAME="AdbrixReactNativeSdkExample"

echo "🔄 Switching to CocoaPods mode..."

# 1. DerivedData 캐시 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-* 2>/dev/null || true

# 2. SPM 설정 제거
echo "🗑️  Removing SPM configuration..."
cd "$SCRIPT_DIR/.."
npx react-native spm deinit 2>/dev/null || true

# 3. CocoaPods 설치
echo "📦 Installing CocoaPods dependencies..."
cd "$IOS_DIR"
pod install

echo ""
echo "✅ CocoaPods mode activated successfully!"
echo ""
echo "Next steps:"
echo "  npm run ios          # Run on iOS simulator"
echo "  npm run ios:clean    # Clean build cache if needed"
