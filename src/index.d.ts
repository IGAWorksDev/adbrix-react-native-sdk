export declare class AdbrixDeepLinkCallback {
  constructor(result: number, deepLink: string);
  readonly result: number;
  readonly deepLink: string;
}

export declare class Adbrix {
  static init(params: {
    applicationKey: string;
    secretKey: string;
  }): void;

  static initWithConfig(params: {
    applicationKey: string;
    secretKey: string;
    config?: Record<string, any> | null;
  }): void;

  static logEvent(params: {
    eventName: string;
    properties?: Record<string, any> | null;
  }): void;

  static enableSDK(): void;
  static disableSDK(): void;

  static blockDeferredDeepLinkLaunch(): Promise<AdbrixDeepLinkCallback | null>;

  static attAuthorized(authorized: boolean): void;

}

export interface ABEventType {
  LOGIN: string;
  LOGOUT: string;
  SIGN_UP: string;
  USE_CREDIT: string;
  APP_UPDATE: string;
  INVITE: string;
  PURCHASE: string;
  LEVEL_ACHIEVED: string;
  TUTORIAL_COMPLETED: string;
  CHARACTER_CREATED: string;
  STAGE_CLEARED: string;
  REFUND: string;
  ADD_TO_CART: string;
  ADD_TO_WISHLIST: string;
  PRODUCT_VIEW: string;
  CATEGORY_VIEW: string;
  REVIEW_ORDER: string;
  SEARCH: string;
  SHARE: string;
  VIEW_HOME: string;
  LIST_VIEW: string;
  CART_VIEW: string;
  PAYMENT_INFO_ADDED: string;
}

export interface ABEventPropertyType {
  IS_SKIP: string;
  LEVEL: string;
  STAGE: string;
  PREV_VER: string;
  CURR_VER: string;
  KEYWORD: string;
  SHARING_CHANNEL: string;
  SIGN_CHANNEL: string;
  INVITE_CHANNEL: string;
  ORDER_ID: string;
  DELIVERY_CHARGE: string;
  PENALTY_CHARGE: string;
  PAYMENT_METHOD: string;
  ORDER_SALES: string;
  DISCOUNT: string;
  CATEGORY1: string;
  CATEGORY2: string;
  CATEGORY3: string;
  CATEGORY4: string;
  CATEGORY5: string;
  ITEMS: string;
  ITEM_PRODUCT_ID: string;
  ITEM_PRODUCT_NAME: string;
  ITEM_PRICE: string;
  ITEM_QUANTITY: string;
  ITEM_DISCOUNT: string;
  ITEM_CURRENCY: string;
  ITEM_CATEGORY1: string;
  ITEM_CATEGORY2: string;
  ITEM_CATEGORY3: string;
  ITEM_CATEGORY4: string;
  ITEM_CATEGORY5: string;
}

export interface ABCurrencyType {
  KRW: string;
  USD: string;
  JPY: string;
  EUR: string;
  GBP: string;
  CNY: string;
  TWD: string;
  HKD: string;
  IDR: string;
  INR: string;
  RUB: string;
  THB: string;
  VND: string;
  MYR: string;
}

export interface ABConfigType {
  IOS_LOG_ENABLE: string;
  ANDROID_LOG_ENABLE: string;
  ANDROID_LOG_LEVEL: string;
  ANDROID_COLLECT_GOOGLE_ADVERTISING_ID: string;
  IOS_TRACKING_TIMEOUT: string;
}

export interface ABDeepLinkResultType {
  PROCESSED: number;
  ORGANIC: number;
  TRACKING_LINK_SETTINGS_INCORRECTLY: number;
  ORGANIC_NCPI_IN_PROCESS: number;
  NO_CONVERSION: number;
}

export interface ABAndroidLogLevelType {
  VERBOSE: number;
  DEBUG: number;
  INFO: number;
  WARN: number;
  ERROR: number;
  ASSERT_LEVEL: number;
}

export interface ABiOSTrackingTimeoutType {
  TIMEOUT_60: number;
  TIMEOUT_120: number;
  TIMEOUT_180: number;
}

export interface ABInviteChannelType {
  KAKAO: string;
  NAVER: string;
  LINE: string;
  GOOGLE: string;
  FACEBOOK: string;
  TWITTER: string;
  WHATS_APP: string;
  QQ: string;
  WE_CHAT: string;
  ETC: string;
}

export interface ABPaymentMethodType {
  CREDIT_CARD: string;
  BANK_TRANSFER: string;
  MOBILE_PAYMENT: string;
  GIFT_CARD: string;
  PAYPAL: string;
  POINTS: string;
  ETC: string;
}

export interface ABSharingChannelType {
  FACEBOOK: string;
  KAKAO_TALK: string;
  KAKAO_STORY: string;
  LINE: string;
  WHATS_APP: string;
  QQ: string;
  WE_CHAT: string;
  SMS: string;
  EMAIL: string;
  COPY_URL: string;
  ETC: string;
}

export interface ABSignUpChannelType {
  KAKAO: string;
  NAVER: string;
  LINE: string;
  GOOGLE: string;
  FACEBOOK: string;
  TWITTER: string;
  WHATS_APP: string;
  QQ: string;
  WE_CHAT: string;
  ETC: string;
  SKT_ID: string;
  APPLE_ID: string;
  USER_ID: string;
}

export declare const ABEvent: ABEventType;
export declare const ABEventProperty: ABEventPropertyType;
export declare const ABCurrency: ABCurrencyType;
export declare const ABInviteChannel: ABInviteChannelType;
export declare const ABPaymentMethod: ABPaymentMethodType;
export declare const ABSharingChannel: ABSharingChannelType;
export declare const ABSignUpChannel: ABSignUpChannelType;
export declare const ABConfig: ABConfigType;
export declare const ABDeepLinkResult: ABDeepLinkResultType;
export declare const ABAndroidLogLevel: ABAndroidLogLevelType;
export declare const ABiOSTrackingTimeout: ABiOSTrackingTimeoutType;

export type ABCurrencyValue = ABCurrencyType[keyof ABCurrencyType];
export type ABInviteChannelValue = ABInviteChannelType[keyof ABInviteChannelType];
export type ABPaymentMethodValue = ABPaymentMethodType[keyof ABPaymentMethodType];
export type ABSharingChannelValue = ABSharingChannelType[keyof ABSharingChannelType];
export type ABSignUpChannelValue = ABSignUpChannelType[keyof ABSignUpChannelType];

export interface TypedValue {
  value: any;
  type: 'string' | 'long' | 'double' | 'boolean';
}

export declare class ItemBuilder {
  productId(value: string): ItemBuilder;
  productName(value: string): ItemBuilder;
  price(value: number): ItemBuilder;
  discount(value: number): ItemBuilder;
  quantity(value: number): ItemBuilder;
  category1(value: string): ItemBuilder;
  category2(value: string): ItemBuilder;
  category3(value: string): ItemBuilder;
  category4(value: string): ItemBuilder;
  category5(value: string): ItemBuilder;
  currency(value: ABCurrencyValue): ItemBuilder;
  
  customString(key: string, value: string): ItemBuilder;
  customLong(key: string, value: number): ItemBuilder;
  customDouble(key: string, value: number): ItemBuilder;
  customBool(key: string, value: boolean): ItemBuilder;
  
  build(): Record<string, TypedValue>;
}

export declare class PropertiesBuilder {
  items(itemsInput: Array<Record<string, TypedValue> | Record<string, any>> | Record<string, TypedValue> | Record<string, any>): PropertiesBuilder;
  
  // Order 관련
  orderId(value: string): PropertiesBuilder;
  orderSales(value: number): PropertiesBuilder;
  deliveryCharge(value: number): PropertiesBuilder;
  penaltyCharge(value: number): PropertiesBuilder;
  paymentMethod(value: ABPaymentMethodValue): PropertiesBuilder;
  discount(value: number): PropertiesBuilder;
  
  // User 관련
  signChannel(value: ABSignUpChannelValue): PropertiesBuilder;
  inviteChannel(value: ABInviteChannelValue): PropertiesBuilder;
  sharingChannel(value: ABSharingChannelValue): PropertiesBuilder;
  
  // Common
  category1(value: string): PropertiesBuilder;
  category2(value: string): PropertiesBuilder;
  category3(value: string): PropertiesBuilder;
  category4(value: string): PropertiesBuilder;
  category5(value: string): PropertiesBuilder;
  keyword(value: string): PropertiesBuilder;
  
  // Version
  prevVer(value: string): PropertiesBuilder;
  currVer(value: string): PropertiesBuilder;
  
  // Game
  level(value: number): PropertiesBuilder;
  stage(value: string): PropertiesBuilder;
  isSkip(value: boolean): PropertiesBuilder;
  
  // Custom
  customDouble(key: string, value: number): PropertiesBuilder;
  customLong(key: string, value: number): PropertiesBuilder;
  customString(key: string, value: string): PropertiesBuilder;
  customBool(key: string, value: boolean): PropertiesBuilder;
  
  build(): Record<string, TypedValue>;
}

export interface PropertiesType {
  items: (itemsInput: Array<Record<string, TypedValue> | Record<string, any>> | Record<string, TypedValue> | Record<string, any>) => PropertiesBuilder;
  orderId: (value: string) => PropertiesBuilder;
  orderSales: (value: number) => PropertiesBuilder;
  deliveryCharge: (value: number) => PropertiesBuilder;
  penaltyCharge: (value: number) => PropertiesBuilder;
  paymentMethod: (value: ABPaymentMethodValue) => PropertiesBuilder;
  discount: (value: number) => PropertiesBuilder;
  signChannel: (value: ABSignUpChannelValue) => PropertiesBuilder;
  inviteChannel: (value: ABInviteChannelValue) => PropertiesBuilder;
  sharingChannel: (value: ABSharingChannelValue) => PropertiesBuilder;
  category1: (value: string) => PropertiesBuilder;
  category2: (value: string) => PropertiesBuilder;
  category3: (value: string) => PropertiesBuilder;
  category4: (value: string) => PropertiesBuilder;
  category5: (value: string) => PropertiesBuilder;
  keyword: (value: string) => PropertiesBuilder;
  prevVer: (value: string) => PropertiesBuilder;
  currVer: (value: string) => PropertiesBuilder;
  level: (value: number) => PropertiesBuilder;
  stage: (value: string) => PropertiesBuilder;
  isSkip: (value: boolean) => PropertiesBuilder;
  customDouble: (key: string, value: number) => PropertiesBuilder;
  customLong: (key: string, value: number) => PropertiesBuilder;
  customString: (key: string, value: string) => PropertiesBuilder;
  customBool: (key: string, value: boolean) => PropertiesBuilder;
}

export declare const ABProperty: PropertiesType;
export declare const ABItem: () => ItemBuilder;

export default Adbrix;