
import { NativeModules, Platform } from 'react-native';
import { ABProperty, ABItem } from './properties';

const { Adbrix: AdbrixNativeModule } = NativeModules;

export class AdbrixDeepLinkCallback {
  constructor(result, deepLink) {
    this._result = result;
    this._deepLink = deepLink;
  }

  get result() {
    return this._result;
  }

  get deepLink() {
    return this._deepLink;
  }
}

export class Adbrix {
  
  static init({ applicationKey, secretKey }) {
    if (!applicationKey || !secretKey) {
      console.error('[Adbrix] init: applicationKey and secretKey are required');
      return;
    }
    
    if (AdbrixNativeModule && AdbrixNativeModule.init) {
      return AdbrixNativeModule.init({
        applicationKey,
        secretKey,
      });
    } else {
      console.warn('[Adbrix] Native module not available');
    }
  }

  static initWithConfig({ applicationKey, secretKey, config = null }) {
    if (!applicationKey || !secretKey) {
      console.error('[Adbrix] initWithConfig: applicationKey and secretKey are required');
      return;
    }
    
    if (AdbrixNativeModule && AdbrixNativeModule.initWithConfig) {
      return AdbrixNativeModule.initWithConfig({
        applicationKey,
        secretKey,
        config,
      });
    } else {
      console.warn('[Adbrix] Native module not available');
    }
  }

  static logEvent({ eventName, properties = null }) {
    if (!eventName) {
      console.warn('[Adbrix] logEvent: eventName is required');
      return;
    }
    
    const params = { eventName };
    if (properties) {
      params.properties = properties;
    }

    if (AdbrixNativeModule && AdbrixNativeModule.logEvent) {
      return AdbrixNativeModule.logEvent(params);
    } else {
      console.warn('[Adbrix] Native module not available');
    }
  }

  static enableSDK() {
    if (AdbrixNativeModule && AdbrixNativeModule.enableSDK) {
      return AdbrixNativeModule.enableSDK();
    } else {
      console.warn('[Adbrix] Native module not available');
    }
  }

  static disableSDK() {
    if (AdbrixNativeModule && AdbrixNativeModule.disableSDK) {
      return AdbrixNativeModule.disableSDK();
    } else {
      console.warn('[Adbrix] Native module not available');
    }
  }

  static async blockDeferredDeepLinkLaunch() {
    if (AdbrixNativeModule && AdbrixNativeModule.blockDeferredDeepLinkLaunch) {
      try {
        const callback = await AdbrixNativeModule.blockDeferredDeepLinkLaunch();
        if (callback == null) {
          return null;
        }
        return new AdbrixDeepLinkCallback(callback.result, callback.deepLink);
      } catch (error) {
        console.error('[Adbrix] blockDeferredDeepLinkLaunch error:', error);
        return null;
      }
    } else {
      console.warn('[Adbrix] Native module not available');
      return null;
    }
  }

  static attAuthorized(authorized) {
    if (Platform.OS === 'ios') {
      if (AdbrixNativeModule && AdbrixNativeModule.attAuthorized) {
        return AdbrixNativeModule.attAuthorized(authorized);
      } else {
        console.warn('[Adbrix] Native module not available');
      }
    }
  }

}

export * from './constants';
export { ABProperty, ABItem } from './properties';

export default Adbrix;