# Adbrix React Native SDK Monorepo

This repository contains the Adbrix React Native SDK and example application.

## Structure

```
root/
├── packages/sdk/     # SDK source (npm publish from here)
├── example/          # Example application
└── Package.swift     # SPM manifest (references packages/sdk/ios)
```

## SDK Documentation

See [packages/sdk/README.md](./packages/sdk/README.md) for SDK usage documentation.

## Development

### Install dependencies

```bash
cd packages/sdk && npm install
cd example && npm install
```

### Run example app

```bash
cd example
npm run ios      # iOS with SPM
npm run android  # Android
```

## Publishing

SDK is published from `packages/sdk` directory:

```bash
cd packages/sdk
npm publish --access public
```
