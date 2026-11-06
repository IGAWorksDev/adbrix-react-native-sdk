# Adbrix React Native SDK Monorepo

This repository contains the Adbrix React Native SDK and example applications.

## Structure

```
root/
├── sdk/              # SDK source (npm publish from here)
│   └── Package.swift # SPM manifest
├── example/          # SPM example app (iOS)
├── example_pods/     # CocoaPods example app (iOS)
└── shared-app/       # Shared App code (symlinked)
    └── src/
        └── App.tsx
```

### Why Separate Example Directories?

This SDK provides two example apps for different iOS dependency management systems:

| Directory | System | Use Case |
|-----------|--------|----------|
| `example/` | Swift Package Manager (SPM) | SPM-based projects |
| `example_pods/` | CocoaPods | CocoaPods-based projects |

Both directories share the same app code via symlinks to `shared-app/src/`, ensuring consistent behavior testing across both build systems.

### Why Not Use `react-native run-ios`? (SPM Example)

The SPM example (`example/`) uses `xcodebuild` directly instead of `react-native run-ios`.

Based on testing with React Native 0.88.1, the following issues were observed when using `react-native run-ios` with SPM projects:

- CLI may check for `Podfile` existence and attempt `pod install`, which conflicts with SPM
- Workspace detection may prioritize `.xcworkspace` (CocoaPods) over `.xcodeproj` (SPM)

Using `xcodebuild` directly provides more reliable builds for SPM-based projects.

> **Note:** This behavior may vary depending on React Native version. The CocoaPods example (`example_pods/`) can use `react-native run-ios` normally.

## SDK Documentation

See [sdk/README.md](./sdk/README.md) for SDK usage documentation.

## Development

### SPM Example (recommended)

```bash
cd example
npm install
npm run ios
```

> **Note:** Uses `xcodebuild` directly. Do not run `react-native run-ios` or `pod install`.

### CocoaPods Example

```bash
cd example_pods
npm install
npm run ios
```

## Publishing

SDK is published from `sdk` directory:

```bash
cd sdk
npm publish --access public
```
