const path = require('path');

module.exports = {
  project: {
    ios: {
      sourceDir: 'ios',
    },
    android: {},
  },
  dependencies: {
    '@igaworks/adbrix-react-native-sdk': {
      root: path.join(__dirname, '../sdk'),
    },
  },
};
