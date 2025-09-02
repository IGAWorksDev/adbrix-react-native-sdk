#import "AdbrixReactNativeSdk.h"
#import "AdbrixPropertiesParser.h"
#import <AdbrixSDK/AdbrixSDK.h>

#import "adbrix_react_native_sdk-Swift.h"

@implementation AdbrixReactNativeSdk
RCT_EXPORT_MODULE(Adbrix)

RCT_EXPORT_METHOD(init:(NSDictionary *)params)
{
    NSString *applicationKey = params[@"applicationKey"];
    NSString *secretKey = params[@"secretKey"];
    
    [AdbrixReactNative initWithAppKey:applicationKey secretKey:secretKey];
}

RCT_EXPORT_METHOD(initWithConfig:(NSDictionary *)params)
{
    NSString *applicationKey = params[@"applicationKey"];
    NSString *secretKey = params[@"secretKey"];
    NSDictionary *config = params[@"config"];
    
    [AdbrixReactNative initWithAppKey:applicationKey secretKey:secretKey config:config];
}

RCT_EXPORT_METHOD(logEvent:(NSDictionary *)params)
{
    NSString *eventName = params[@"eventName"];
    NSDictionary *properties = params[@"properties"];
    
    if (properties) {
        NSDictionary *parsedProperties = [AdbrixPropertiesParser parseProperties:properties];
        
        [AdbrixReactNative logEvent:eventName properties:parsedProperties];
    } else {
        [AdbrixReactNative logEvent:eventName properties:nil];
    }
    
}

RCT_EXPORT_METHOD(enableSDK)
{
    [AdbrixReactNative enableSDK];
}

RCT_EXPORT_METHOD(disableSDK)
{
    [AdbrixReactNative disableSDK];
}

RCT_EXPORT_METHOD(blockDeferredDeepLinkLaunch:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [AdbrixReactNative blockDeferredDeepLinkLaunch:^(id _Nullable result) {
        if (result && result != [NSNull null]) {
            resolve(result);
        } else {
            resolve([NSNull null]);
        }
    }];
}

RCT_EXPORT_METHOD(attAuthorized:(BOOL)authorized)
{
    [AdbrixReactNative attAuthorized:authorized];
}

+ (void)deeplinkOpenWith:(NSURL *)url
{
    [AdbrixReactNative deepLinkOpenWithURL:url];
}

+ (void)deeplinkOpenWithUserActivity:(NSUserActivity *)userActivity
{
    [AdbrixReactNative deepLinkOpenWithUserActivity: userActivity];
}

@end
