#import <React/RCTBridgeModule.h>

@interface AdbrixReactNativeSdk : NSObject <RCTBridgeModule>
+ (void)deeplinkOpenWith:(NSURL *)url;
+ (void)deeplinkOpenWithUserActivity:(NSUserActivity *)userActivity;

@end
