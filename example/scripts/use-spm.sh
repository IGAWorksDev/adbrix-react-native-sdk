#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
IOS_DIR="$PROJECT_DIR/ios"
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

# 3. CocoaPods deintegrate (프로젝트에서 Pod 참조 제거)
echo "🔧 Deintegrating CocoaPods from Xcode project..."
pod deintegrate 2>/dev/null || true

# 4. iOS build 디렉토리 정리 (순환 참조 방지)
echo "🗑️  Clearing iOS build directory..."
rm -rf "$IOS_DIR/build"

# 5. SPM 미지원 라이브러리용 Package.swift 스캐폴딩
echo "📝 Scaffolding Package.swift for unsupported libraries..."
cd "$PROJECT_DIR"
npx react-native spm scaffold || true

# 6. SPM 모드 활성화
echo "📦 Enabling Swift Package Manager..."
npx react-native spm add --yes

echo ""
echo "✅ SPM mode activated successfully!"
echo ""
echo "Next steps:"
echo "  npm run ios          # Run on iOS simulator"
echo "  npm run ios:clean    # Clean build cache if needed"
echo ""
echo "Note: If using react-native-tracking-transparency, persist the scaffold with:"
echo "  npx patch-package react-native-tracking-transparency"
