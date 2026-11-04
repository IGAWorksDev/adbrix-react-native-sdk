This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

## iOS Dependency Manager Testing

이 Example App은 Swift Package Manager(SPM)와 CocoaPods 두 가지 iOS 의존성 관리자를 모두 테스트할 수 있도록 구성되어 있다.

### Prerequisites

- Node.js >= 22.13.0
- Xcode 14.0+
- CocoaPods (CocoaPods 모드 테스트용)

### SPM Mode Testing

SPM 모드로 전환하여 빌드 테스트:

```bash
cd example/ios

# SPM 모드로 전환 (CocoaPods 제거 후 SPM 설정)
npx react-native spm --deintegrate
npx react-native spm

# 빌드 테스트
xcodebuild -workspace AdbrixReactNativeSdkExample.xcworkspace \
  -scheme AdbrixReactNativeSdkExample \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  build
```

### CocoaPods Mode Testing

CocoaPods 모드로 전환하여 빌드 테스트:

```bash
cd example/ios

# CocoaPods 모드로 복원 (SPM 제거 후 CocoaPods 설정)
npx react-native spm deinit
pod install

# 빌드 테스트
xcodebuild -workspace AdbrixReactNativeSdkExample.xcworkspace \
  -scheme AdbrixReactNativeSdkExample \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  build
```

### Dynamic Framework Linking (Alternative)

Podfile의 USE_FRAMEWORKS 환경변수를 사용하여 동적 프레임워크 링킹 모드로 CocoaPods를 사용할 수도 있다:

```bash
cd example/ios
USE_FRAMEWORKS=dynamic pod install
```

### Verification

빌드 성공 후 다음 항목을 확인:
- SPM 모드: AdbrixSDK.xcframework가 정상적으로 링크되었는지 확인
- CocoaPods 모드: adbrix2.0 pod가 정상적으로 설치되었는지 확인
- Example App 실행 시 Adbrix SDK 초기화 로그 출력 여부

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Publish

### Android

```
cd example
npx react-native build-android --mode=release
```