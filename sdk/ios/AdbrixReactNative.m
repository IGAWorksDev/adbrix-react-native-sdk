#import "AdbrixReactNative.h"
@import AdbrixSDK;
#import <UIKit/UIKit.h>

@interface AdbrixReactNative () <AdbrixDeferredDeepLinkDelegate>

@property (nonatomic, strong) dispatch_queue_t queue;
@property (nonatomic, assign) BOOL isInitialized;
@property (nonatomic, strong) NSURL *pendingDeepLinkURL;
@property (nonatomic, strong) NSDictionary *deferredDeepLink;
@property (nonatomic, copy) void (^deferredDeepLinkResolver)(id _Nullable);

@end

@implementation AdbrixReactNative

+ (instancetype)shared {
    static AdbrixReactNative *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[AdbrixReactNative alloc] initPrivate];
    });
    return instance;
}

- (instancetype)initPrivate {
    self = [super init];
    if (self) {
        _queue = dispatch_queue_create("com.adbrix.reactnative.queue", DISPATCH_QUEUE_SERIAL);
        _isInitialized = NO;
    }
    return self;
}

+ (void)initWithAppKey:(NSString *)appKey secretKey:(NSString *)secretKey {
    [[self shared] performInitWithAppKey:appKey secretKey:secretKey config:nil];
}

+ (void)initWithAppKey:(NSString *)appKey secretKey:(NSString *)secretKey config:(NSDictionary *)config {
    [[self shared] performInitWithAppKey:appKey secretKey:secretKey config:config];
}

+ (void)enableSDK {
    [[self shared] performEnable];
}

+ (void)disableSDK {
    [[self shared] performDisable];
}

+ (void)attAuthorized:(BOOL)authorized {
    [[self shared] performSetTrackingAuthorization:authorized];
}

+ (void)logEvent:(NSString *)eventName properties:(NSDictionary *)properties {
    [[self shared] performLogEvent:eventName properties:properties];
}

+ (void)deepLinkOpenWithURL:(NSURL *)url {
    [[self shared] performDeepLinkOpenWithURL:url];
}

+ (void)deepLinkOpenWithUserActivity:(NSUserActivity *)userActivity {
    [[self shared] performDeepLinkOpenWithUserActivity:userActivity];
}

+ (void)blockDeferredDeepLinkLaunch:(void (^)(id _Nullable))resolver {
    [[self shared] performBlockDeferredDeepLinkLaunch:resolver];
}

#pragma mark - Private Methods

- (void)performInitWithAppKey:(NSString *)appKey secretKey:(NSString *)secretKey config:(NSDictionary *)config {
    // Note: setDeferredDeepLinkDelegate must be called on main thread to avoid
    // Swift unowned reference crash with ObjC objects
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Adbrix shared] setDeferredDeepLinkDelegate:[AdbrixReactNative shared]];
    });
    [[Adbrix shared] sdkInitWithAppkey:appKey secretKey:secretKey extraConfig:config ?: @{}];
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.queue, ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) return;
        
        strongSelf.isInitialized = YES;
        if (strongSelf.pendingDeepLinkURL) {
            NSURL *url = strongSelf.pendingDeepLinkURL;
            strongSelf.pendingDeepLinkURL = nil;
            dispatch_async(dispatch_get_main_queue(), ^{
                [[Adbrix shared] deepLinkOpenWithUrl:url];
            });
        }
    });
}

- (void)performEnable {
    [[Adbrix shared] enableSDK];
}

- (void)performDisable {
    [[Adbrix shared] disableSDK];
}

- (void)performSetTrackingAuthorization:(BOOL)authorized {
    [[Adbrix shared] attAuthorized:authorized];
}

- (void)performLogEvent:(NSString *)eventName properties:(NSDictionary *)properties {
    [[Adbrix shared] logEvent:eventName withProperties:properties ?: @{}];
}

- (void)performDeepLinkOpenWithURL:(NSURL *)url {
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.queue, ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) return;
        
        if (strongSelf.isInitialized) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [[Adbrix shared] deepLinkOpenWithUrl:url];
            });
        } else {
            strongSelf.pendingDeepLinkURL = url;
        }
    });
}

- (void)performDeepLinkOpenWithUserActivity:(NSUserActivity *)userActivity {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSURL *deepLinkUrl = userActivity.webpageURL;
        if (deepLinkUrl) {
            __weak typeof(self) weakSelf = self;
            dispatch_async(self.queue, ^{
                __strong typeof(weakSelf) strongSelf = weakSelf;
                if (!strongSelf) return;
                
                if (strongSelf.isInitialized) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [[Adbrix shared] deepLinkOpenWithUrl:deepLinkUrl];
                    });
                } else {
                    strongSelf.pendingDeepLinkURL = deepLinkUrl;
                }
            });
        }
    }
}

- (void)performBlockDeferredDeepLinkLaunch:(void (^)(id _Nullable))resolver {
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.queue, ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) return;
        
        if (strongSelf.deferredDeepLink) {
            NSDictionary *callback = strongSelf.deferredDeepLink;
            strongSelf.deferredDeepLink = nil;
            dispatch_async(dispatch_get_main_queue(), ^{
                resolver(callback);
            });
        } else {
            strongSelf.deferredDeepLinkResolver = resolver;
        }
    });
}

#pragma mark - AdbrixDeferredDeepLinkDelegate

- (void)didReceiveWithDeferredDeepLink:(AdbrixDeepLink *)deferredDeepLink {
    NSString *deepLink = deferredDeepLink.deepLink;
    if (!deepLink || deepLink.length == 0) {
        return;
    }
    
    NSDictionary *callback = @{
        @"result": @(deferredDeepLink.result),
        @"deepLink": deepLink
    };
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.queue, ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) return;
        
        if (strongSelf.deferredDeepLinkResolver) {
            void (^resolver)(id _Nullable) = strongSelf.deferredDeepLinkResolver;
            strongSelf.deferredDeepLinkResolver = nil;
            dispatch_async(dispatch_get_main_queue(), ^{
                resolver(callback);
            });
        } else {
            NSURL *url = [NSURL URLWithString:deepLink];
            if (url) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];
                });
            }
        }
    });
}

@end
