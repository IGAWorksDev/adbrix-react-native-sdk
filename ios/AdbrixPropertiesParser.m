#import "AdbrixPropertiesParser.h"

@implementation AdbrixPropertiesParser

+ (NSMutableDictionary *)parseProperties:(NSDictionary *)propertiesDict {
    if (!propertiesDict) {
        return [[NSMutableDictionary alloc] init];
    }
    
    NSMutableDictionary *parsedProperties = [[NSMutableDictionary alloc] init];
    
    for (NSString *key in propertiesDict.allKeys) {
        id value = [self parsePropertyValue:propertiesDict forKey:key];
        if (value) {
            parsedProperties[key] = value;
        }
    }
    

    return parsedProperties;
}

+ (id)parsePropertyValue:(NSDictionary *)dict forKey:(NSString *)key {
    @try {
        if ([key isEqualToString:@"abx:items"] && dict[key]) {
            NSArray *itemsArray = dict[key];
            if ([itemsArray isKindOfClass:[NSArray class]]) {
                return [self parseItemsArray:itemsArray];
            }
            return nil;
        }
        
        if (dict[key]) {
            NSDictionary *typedValue = dict[key];
            if ([typedValue isKindOfClass:[NSDictionary class]] && 
                typedValue[@"value"] && typedValue[@"type"]) {
                return [self parseTypedValue:typedValue];
            }
        }
        
        return nil;
    }
    @catch (NSException *exception) {
        return nil;
    }
}

+ (id)parseTypedValue:(NSDictionary *)typedValue {
    NSString *type = typedValue[@"type"];
    id value = typedValue[@"value"];
    
    if ([type isEqualToString:@"string"]) {
        return value;
    } else if ([type isEqualToString:@"long"]) {
        return @([value longLongValue]);
    } else if ([type isEqualToString:@"double"]) {
        return @([value doubleValue]);
    } else if ([type isEqualToString:@"boolean"]) {
        return @([value boolValue]);
    } else {
        return [value description];
    }
}

+ (NSArray *)parseItemsArray:(NSArray *)itemsArray {
    NSMutableArray *items = [[NSMutableArray alloc] init];
    
    for (NSDictionary *itemDict in itemsArray) {
        if ([itemDict isKindOfClass:[NSDictionary class]]) {
            NSDictionary *parsedItem = [self parseItem:itemDict];
            [items addObject:parsedItem];
        }
    }
    

    return items;
}

+ (NSMutableDictionary *)parseItem:(NSDictionary *)itemDict {
    NSMutableDictionary *parsedItem = [[NSMutableDictionary alloc] init];
    
    for (NSString *key in itemDict.allKeys) {
        NSDictionary *typedValue = itemDict[key];
        if ([typedValue isKindOfClass:[NSDictionary class]] && 
            typedValue[@"value"] && typedValue[@"type"]) {
            id value = [self parseTypedValue:typedValue];
            if (value) {
                parsedItem[key] = value;
            }
        }
    }
    
    return parsedItem;
}


@end 