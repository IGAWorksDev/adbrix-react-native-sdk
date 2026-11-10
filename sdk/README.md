# Adbrix React Native SDK

This repository contains the javascript interface and native React Native functionality for the React Native plugins derived from the Adbrix Android and iOS SDKs.

## Documentation

- [Adbrix User Guide](https://adbrix.gitbook.io/user-guide)
- [Adbrix Developer Guide](https://adbrix.gitbook.io/developer-guide/platform/reactnative)

## Installation

```bash
npm install @igaworks/adbrix-react-native-sdk
# or
yarn add @igaworks/adbrix-react-native-sdk
```

## iOS Build Systems

This SDK supports both **Swift Package Manager (SPM)** and **CocoaPods**:

| Build System | iOS SDK Version | Module Import |
|--------------|-----------------|---------------|
| SPM (RN 0.88+) | 3.2.5 | `import AdbrixReactNativeSdk` |
| CocoaPods | 3.2.3 | `import adbrix_react_native_sdk` |

## Dependencies

### Android
- [com.igaworks.adbrix:android-sdk](./CHANGELOG.md) 4.1.0
- com.android.installreferrer:installreferrer:2.2
- com.google.android.gms:play-services-ads-identifier:18.2.0
- com.google.android.gms:play-services-appset:16.0.2

### iOS
- [adbrix-ios-sdk](./CHANGELOG.md) 3.2.5 (SPM)
- [adbrix2.0](./CHANGELOG.md) 3.2.3 (CocoaPods)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.
