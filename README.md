# Adbrix React Native SDK

React Native SDK for Adbrix analytics and attribution.

## Installation

```bash
npm install @igaworks/adbrix-react-native-sdk
# or
yarn add @igaworks/adbrix-react-native-sdk
```

## iOS Setup

This SDK supports both **Swift Package Manager (SPM)** and **CocoaPods** for iOS.

### Swift Package Manager (Recommended for RN 0.88+)

SPM is the default for React Native 0.88+. No additional configuration required.

```bash
cd ios
# SPM setup runs automatically via postinstall
```

### CocoaPods

For CocoaPods projects, add to your `Podfile`:

```ruby
pod 'adbrix-react-native-sdk', :path => '../node_modules/@igaworks/adbrix-react-native-sdk'
```

Then run:

```bash
cd ios && pod install
```

## Native Integration (iOS)

### Deep Link Handling

Add deep link handling in `SceneDelegate.swift`:

**SPM:**
```swift
import AdbrixReactNativeSdk

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    AdbrixReactNativeSdk.deeplinkOpen(with: url)
}
```

**CocoaPods:**
```swift
import adbrix_react_native_sdk

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    AdbrixReactNative.deepLinkOpen(url: url)
}
```

> **Note:** Module name and API differ between SPM and CocoaPods.

## Android Setup

Android auto-linking is supported. No additional configuration required.

## Usage

```typescript
import Adbrix, {
  ABEvent,
  ABProperty,
  ABItem,
  ABConfig,
  ABiOSLogLevel,
  ABSignUpChannel,
  ABPaymentMethod,
} from '@igaworks/adbrix-react-native-sdk';

// Initialize SDK
Adbrix.init({
  applicationKey: 'YOUR_APP_KEY',
  secretKey: 'YOUR_SECRET_KEY',
});

// Initialize with config
Adbrix.initWithConfig({
  applicationKey: 'YOUR_APP_KEY',
  secretKey: 'YOUR_SECRET_KEY',
  config: {
    [ABConfig.IOS_LOG_LEVEL]: ABiOSLogLevel.DEBUG,
  },
});

// Log event (simple)
Adbrix.logEvent({ eventName: 'custom_event' });

// Log event with properties
Adbrix.logEvent({
  eventName: ABEvent.LOGIN,
  properties: ABProperty
    .signChannel(ABSignUpChannel.GOOGLE)
    .build(),
});

// Log purchase event with items
const item = ABItem()
  .productId('product_123')
  .productName('Premium Plan')
  .price(9900)
  .quantity(1)
  .currency('KRW')
  .build();

Adbrix.logEvent({
  eventName: ABEvent.PURCHASE,
  properties: ABProperty
    .orderId('order_456')
    .orderSales(9900)
    .paymentMethod(ABPaymentMethod.CREDIT_CARD)
    .items([item])
    .build(),
});

// Enable/Disable SDK
Adbrix.enableSDK();
Adbrix.disableSDK();

// ATT Authorization (iOS only)
Adbrix.attAuthorized(true);

// Deferred Deep Link
const result = await Adbrix.blockDeferredDeepLinkLaunch();
if (result) {
  console.log('DeepLink:', result.deepLink, 'Result:', result.result);
}
```

## Repository Structure

```
├── sdk/              # SDK source (npm package)
├── example/          # SPM example app
└── example_pods/     # CocoaPods example app
```

### Example Apps

| Directory | Build System | iOS SDK Version | Theme |
|-----------|--------------|-----------------|-------|
| `example/` | SPM | 3.2.4 | Blue |
| `example_pods/` | CocoaPods | 3.2.3 | Green |

Both examples demonstrate proper SDK integration for their respective build systems.

### Running Examples

**SPM Example:**
```bash
cd example
npm install  # Runs SPM setup automatically
npm run ios
```

**CocoaPods Example:**
```bash
cd example_pods
npm install
cd ios && pod install && cd ..
npm run ios
```

## API Differences (iOS Native)

| Feature | SPM | CocoaPods |
|---------|-----|-----------|
| Module Import | `import AdbrixReactNativeSdk` | `import adbrix_react_native_sdk` |
| Deep Link API | `AdbrixReactNativeSdk.deeplinkOpen(with: url)` | `AdbrixReactNative.deepLinkOpen(url: url)` |

## Publishing

```bash
cd sdk
npm publish --access public
```

## License

MIT
