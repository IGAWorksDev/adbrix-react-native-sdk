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

## SDK Documentation

See [sdk/README.md](./sdk/README.md) for SDK usage documentation.

## Development

### SPM Example (recommended)

```bash
cd example
npm install
npm run ios
```

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
