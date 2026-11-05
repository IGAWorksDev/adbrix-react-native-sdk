const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// SDK is in packages/sdk subdirectory
const sdkRoot = path.resolve(__dirname, '../packages/sdk');

/**
 * Metro configuration for separated example app
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Watch the SDK directory for changes during development
  watchFolders: [sdkRoot],
  
  resolver: {
    // Module resolution paths
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(sdkRoot, 'node_modules'),
    ],
    
    // Ensure the SDK package resolves correctly
    extraNodeModules: {
      '@igaworks/adbrix-react-native-sdk': sdkRoot,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
