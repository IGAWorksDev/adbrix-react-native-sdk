// Adbrix SDK Configuration
// 
// Option 1: Create config.local.ts with your actual credentials (git-ignored)
// Option 2: Edit this file directly for testing (not recommended for commits)
//
// config.local.ts example:
// export const AdbrixConfig = {
//   applicationKey: 'your_actual_application_key',
//   secretKey: 'your_actual_secret_key',
// };

// Try to import local config, fallback to placeholder values
let config = {
  applicationKey: 'YOUR_APPLICATION_KEY',
  secretKey: 'YOUR_SECRET_KEY',
};

try {
  // @ts-ignore - config.local.ts may not exist
  const localConfig = require('./config.local');
  if (localConfig?.AdbrixConfig) {
    config = localConfig.AdbrixConfig;
  }
} catch (e) {
  // config.local.ts not found, using placeholder values
  console.warn('[Adbrix] config.local.ts not found. Using placeholder values.');
  console.warn('[Adbrix] Create src/config.local.ts with your actual credentials.');
}

export const AdbrixConfig = config;
