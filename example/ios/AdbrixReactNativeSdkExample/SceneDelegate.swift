import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UIKit

import adbrix_react_native_sdk

class SceneDelegate: RCTDefaultReactNativeFactoryDelegate, UIWindowSceneDelegate {
  var window: UIWindow?
  var reactNativeFactory: RCTReactNativeFactory?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else {
      return
    }

    dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: self)
    window = UIWindow(windowScene: windowScene)
    
    #if DEBUG
    let devMenuConfiguration = RCTDevMenuConfiguration(
      devMenuEnabled: true,
      shakeGestureEnabled: true,
      keyboardShortcutsEnabled: true
    )
    reactNativeFactory?.devMenuConfiguration = devMenuConfiguration
    #endif
    
    reactNativeFactory?.startReactNative(
      withModuleName: "AdbrixReactNativeSdkExample",
      in: window,
      connectionOptions: connectionOptions
    )
    
    // MARK: - Cold Start Deep Link Handling
    // Handle deep link when app is launched from terminated state
    if let url = connectionOptions.urlContexts.first?.url {
      AdbrixReactNative.deepLinkOpen(url: url)
    }
    
    // Handle universal link when app is launched from terminated state
    if let userActivity = connectionOptions.userActivities.first(where: { $0.activityType == NSUserActivityTypeBrowsingWeb }) {
      AdbrixReactNative.deepLinkOpen(userActivity: userActivity)
    }
  }

  // MARK: - URL Handling (Deep Link)
  
  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    // Adbrix deep link handling
    if let url = URLContexts.first?.url {
      AdbrixReactNative.deepLinkOpen(url: url)
    }
    
    RCTLinkingManager.scene(scene, openURLContexts: URLContexts)
  }

  // MARK: - User Activity (Universal Link)
  
  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    // Adbrix universal link handling
    AdbrixReactNative.deepLinkOpen(userActivity: userActivity)
    
    RCTLinkingManager.scene(scene, continue: userActivity)
  }

  // MARK: - Bundle URL
  
  override func bundleURL() -> URL? {
    #if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
