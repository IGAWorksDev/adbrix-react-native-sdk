#import <Foundation/Foundation.h>

@interface AdbrixReactNative : NSObject

+ (void)initWithAppKey:(NSString *)appKey secretKey:(NSString *)secretKey;
+ (void)initWithAppKey:(NSString *)appKey secretKey:(NSString *)secretKey config:(NSDictionary *)config;
+ (void)enableSDK;
+ (void)disableSDK;
+ (void)attAuthorized:(BOOL)authorized;
+ (void)logEvent:(NSString *)eventName properties:(NSDictionary * _Nullable)properties;
+ (void)deepLinkOpenWithURL:(NSURL *)url;
+ (void)deepLinkOpenWithUserActivity:(NSUserActivity *)userActivity;
+ (void)blockDeferredDeepLinkLaunch:(void (^)(id _Nullable result))resolver;

@end
