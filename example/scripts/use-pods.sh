#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
IOS_DIR="$PROJECT_DIR/ios"
PROJECT_NAME="AdbrixReactNativeSdkExample"

echo "🔄 Switching to CocoaPods mode..."

# 1. DerivedData 캐시 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-* 2>/dev/null || true

# 2. SPM 설정 제거
echo "🗑️  Removing SPM configuration..."
cd "$PROJECT_DIR"
npx react-native spm deinit 2>/dev/null || true

# 3. iOS build 디렉토리 정리
echo "🗑️  Clearing iOS build directory..."
rm -rf "$IOS_DIR/build"
rm -rf "$IOS_DIR/.build"

# 4. CocoaPods 설치
echo "📦 Installing CocoaPods dependencies..."
cd "$IOS_DIR"
pod install

echo ""
echo "✅ CocoaPods mode activated successfully!"
echo ""
echo "Next steps:"
echo "  npm run ios          # Run on iOS simulator"
echo "  npm run ios:clean    # Clean build cache if needed"
