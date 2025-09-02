#import <Foundation/Foundation.h>

@interface AdbrixPropertiesParser : NSObject

+ (NSMutableDictionary *)parseProperties:(NSDictionary *)propertiesDict;

+ (id)parsePropertyValue:(NSDictionary *)dict forKey:(NSString *)key;

+ (id)parseTypedValue:(NSDictionary *)typedValue;

+ (NSArray *)parseItemsArray:(NSArray *)itemsArray;

+ (NSMutableDictionary *)parseItem:(NSDictionary *)itemDict;


@end 