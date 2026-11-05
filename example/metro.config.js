const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const sdkRoot = path.resolve(__dirname, '../sdk');
const sharedAppRoot = path.resolve(__dirname, '../shared-app');

/**
 * Metro configuration for SPM example app
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [sdkRoot, sharedAppRoot],
  
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(sdkRoot, 'node_modules'),
    ],
    
    extraNodeModules: {
      '@igaworks/adbrix-react-native-sdk': sdkRoot,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
