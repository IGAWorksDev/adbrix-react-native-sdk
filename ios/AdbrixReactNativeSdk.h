#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface AdbrixReactNativeSdk : NSObject <RCTBridgeModule>
+ (void)deeplinkOpenWith:(NSURL *)url;
+ (void)deeplinkOpenWithUserActivity:(NSUserActivity *)userActivity;

@end
