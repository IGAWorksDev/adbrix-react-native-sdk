const path = require('path');
const pkg = require('./package.json');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    '@igaworks/adbrix-react-native-sdk': {
      root: path.join(__dirname, '../packages/sdk'),
      platforms: {
        ios: {},
        android: {},
      },
    },
    // Disable SPM autolinking for react-native-tracking-transparency
    // This library doesn't have proper SPM support (missing React header paths)
    'react-native-tracking-transparency': {
      platforms: {
        ios: null, // Disable iOS autolinking for SPM
      },
    },
  },
};
