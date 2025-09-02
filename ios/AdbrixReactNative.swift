import Foundation
import AdbrixSDK

@objc(AdbrixReactNative)
public class AdbrixReactNative: NSObject, AdbrixDeferredDeepLinkDelegate {
    
    private static let shared = AdbrixReactNative()
    
    private let queue = DispatchQueue(label: "com.adbrix.reactnative.queue")
    
    private var isInitialized: Bool = false
    
    private var pendingDeepLinkURL: URL?
    private var deferredDeepLink: [String: Any]?
    private var deferredDeepLinkResolver: ((Any?) -> Void)?
    
    
    private override init() {
        super.init()
    }
    
    @objc(initWithAppKey:secretKey:)
    public static func initialize(appKey: String, secretKey: String) {
        shared.performInit(applicationKey: appKey, secretKey: secretKey, config: nil)
    }
    
    @objc(initWithAppKey:secretKey:config:)
    public static func initialize(appKey: String, secretKey: String, config: [String: Any]) {
        shared.performInit(applicationKey: appKey, secretKey: secretKey, config: config)
    }
    
    @objc(enableSDK)
    public static func enable() {
        shared.performEnable()
    }
    
    @objc(disableSDK)
    public static func disable() {
        shared.performDisable()
    }
    
    @objc(attAuthorized:)
    public static func setTrackingAuthorization(_ authorized: Bool) {
        shared.performSetTrackingAuthorization(authorized)
    }
    
    @objc(logEvent:properties:)
    public static func logEvent(_ eventName: String, properties: [String: Any]?) {
        shared.performLogEvent(eventName, properties: properties)
    }
    
    @objc(deepLinkOpenWithURL:)
    public static func deepLinkOpen(url: URL) {
        shared.performDeepLinkOpen(url: url)
    }
    
    @objc(deepLinkOpenWithUserActivity:)
    public static func deepLinkOpen(userActivity: NSUserActivity) {
        shared.performDeepLinkOpen(userActivity: userActivity)
    }
    
    @objc(blockDeferredDeepLinkLaunch:)
    public static func blockDeferredDeepLinkLaunch(resolver: @escaping (Any?) -> Void) {
        shared.performBlockDeferredDeepLinkLaunch(resolver: resolver)
    }
    
    private func performInit(applicationKey: String, secretKey: String, config: [String: Any]?) {
        Adbrix.shared().setDeferredDeepLinkDelegate(self)
        Adbrix.shared().sdkInit(appkey: applicationKey, secretKey: secretKey, extraConfig: config ?? [:])
        
        queue.async { [weak self] in
            guard let self = self else { return }
            
            self.isInitialized = true
            if let url = self.pendingDeepLinkURL {
                self.pendingDeepLinkURL = nil
                DispatchQueue.main.async {
                    Adbrix.shared().deepLinkOpen(url: url)
                }
            }
        }
    }
    
    private func performEnable() {
        Adbrix.shared().enableSDK()
    }
    
    private func performDisable() {
        Adbrix.shared().disableSDK()
    }
    
    private func performSetTrackingAuthorization(_ authorized: Bool) {
        Adbrix.shared().attAuthorized(authorized)
    }
    
    private func performLogEvent(_ eventName: String, properties: [String: Any]?) {
        Adbrix.shared().logEvent(name: eventName, properties: properties ?? [:])
    }
    
    private func performDeepLinkOpen(url: URL) {
        queue.async { [weak self] in
            guard let self = self else { return }
            
            if self.isInitialized {
                Adbrix.shared().deepLinkOpen(url: url)
            } else {
                self.pendingDeepLinkURL = url
            }
        }
    }
    
    private func performDeepLinkOpen(userActivity: NSUserActivity) {
        if userActivity.activityType == NSUserActivityTypeBrowsingWeb,
            let deepLinkUrl = userActivity.webpageURL {
            queue.async { [weak self] in
                guard let self = self else { return }
                
                if self.isInitialized {
                    Adbrix.shared().deepLinkOpen(url: deepLinkUrl)
                } else {
                    self.pendingDeepLinkURL = deepLinkUrl
                }
            }
        }
    }
    
    private func performBlockDeferredDeepLinkLaunch(resolver: @escaping (Any?) -> Void) {
        queue.async { [weak self] in
            guard let self = self else { return }
            
            if let callback = self.deferredDeepLink {
                DispatchQueue.main.async {
                    resolver(callback)
                }
                self.deferredDeepLink = nil
            } else {
                self.deferredDeepLinkResolver = resolver
            }
        }
    }
    
    public func didReceive(deferredDeepLink: AdbrixDeepLink) {
        
        guard let deepLink = deferredDeepLink.deepLink, !deepLink.isEmpty else {
            return
        }
        
        let callback: [String: Any] = [
            "result": deferredDeepLink.result.rawValue,
            "deepLink": deepLink
        ]
        
        queue.async { [weak self] in
            guard let self = self else { return }
            
            if let resolver = self.deferredDeepLinkResolver {
                DispatchQueue.main.async {
                    resolver(callback)
                }
                self.deferredDeepLinkResolver = nil
            } else {
                if let url = URL(string: deepLink) {
                    DispatchQueue.main.async {
                        UIApplication.shared.open(url)
                    }
                }
            }
        }
    }
}
