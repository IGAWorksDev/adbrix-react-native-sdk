# Adbrix React Native SDK Monorepo

This repository contains the Adbrix React Native SDK and example application.

## Structure

```
root/
├── sdk/              # SDK source (npm publish from here)
├── example/          # Example application
└── Package.swift     # SPM manifest (references sdk/ios)
```

## SDK Documentation

See [sdk/README.md](./sdk/README.md) for SDK usage documentation.

## Development

### Install dependencies

```bash
cd sdk && npm install
cd example && npm install
```

### Run example app

```bash
cd example
npm run ios      # iOS with SPM
npm run android  # Android
```

## Publishing

SDK is published from `sdk` directory:

```bash
cd sdk
npm publish --access public
```
