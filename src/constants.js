
export const ABEvent = {
  LOGIN: 'abx:login',
  LOGOUT: 'abx:logout',
  SIGN_UP: 'abx:sign_up',
  USE_CREDIT: 'abx:use_credit',
  APP_UPDATE: 'abx:app_update',
  INVITE: 'abx:invite',
  PURCHASE: 'abx:purchase',
  LEVEL_ACHIEVED: 'abx:level_achieved',
  TUTORIAL_COMPLETED: 'abx:tutorial_completed',
  CHARACTER_CREATED: 'abx:character_created',
  STAGE_CLEARED: 'abx:stage_cleared',
  REFUND: 'abx:refund',
  ADD_TO_CART: 'abx:add_to_cart',
  ADD_TO_WISHLIST: 'abx:add_to_wishlist',
  PRODUCT_VIEW: 'abx:product_view',
  CATEGORY_VIEW: 'abx:category_view',
  REVIEW_ORDER: 'abx:review_order',
  SEARCH: 'abx:search',
  SHARE: 'abx:share',
  VIEW_HOME: 'abx:view_home',
  LIST_VIEW: 'abx:list_view',
  CART_VIEW: 'abx:cart_view',
  PAYMENT_INFO_ADDED: 'abx:paymentinfo_added',
};

export const ABEventProperty = {
  IS_SKIP: 'abx:is_skip',
  LEVEL: 'abx:level',
  STAGE: 'abx:stage',
  PREV_VER: 'abx:prev_ver',
  CURR_VER: 'abx:curr_ver',
  KEYWORD: 'abx:keyword',
  SHARING_CHANNEL: 'abx:sharing_channel',
  SIGN_CHANNEL: 'abx:sign_channel',
  INVITE_CHANNEL: 'abx:invite_channel',
  ORDER_ID: 'abx:order_id',
  DELIVERY_CHARGE: 'abx:delivery_charge',
  PENALTY_CHARGE: 'abx:penalty_charge',
  PAYMENT_METHOD: 'abx:payment_method',
  ORDER_SALES: 'abx:order_sales',
  DISCOUNT: 'abx:discount',
  CATEGORY1: 'abx:category1',
  CATEGORY2: 'abx:category2',
  CATEGORY3: 'abx:category3',
  CATEGORY4: 'abx:category4',
  CATEGORY5: 'abx:category5',
  ITEMS: 'abx:items',
  
  // Item specific properties
  ITEM_PRODUCT_ID: 'abx:product_id',
  ITEM_PRODUCT_NAME: 'abx:product_name',
  ITEM_PRICE: 'abx:price',
  ITEM_QUANTITY: 'abx:quantity',
  ITEM_DISCOUNT: 'abx:discount',
  ITEM_CURRENCY: 'abx:currency',
  ITEM_CATEGORY1: 'abx:category1',
  ITEM_CATEGORY2: 'abx:category2',
  ITEM_CATEGORY3: 'abx:category3',
  ITEM_CATEGORY4: 'abx:category4',
  ITEM_CATEGORY5: 'abx:category5',
};

export const ABCurrency = {
  KRW: 'KRW',
  USD: 'USD',
  JPY: 'JPY',
  EUR: 'EUR',
  GBP: 'GBP',
  CNY: 'CNY',
  TWD: 'TWD',
  HKD: 'HKD',
  IDR: 'IDR', // Indonesia
  INR: 'INR', // India
  RUB: 'RUB', // Russia
  THB: 'THB', // Thailand
  VND: 'VND', // Vietnam
  MYR: 'MYR', // Malaysia
};

export const ABInviteChannel = {
  KAKAO: 'Kakao',
  NAVER: 'Naver',
  LINE: 'Line',
  GOOGLE: 'Google',
  FACEBOOK: 'Facebook',
  TWITTER: 'Twitter',
  WHATS_APP: 'whatsApp',
  QQ: 'QQ',
  WE_CHAT: 'WeChat',
  ETC: 'ETC',
};

export const ABPaymentMethod = {
  CREDIT_CARD: 'CreditCard',
  BANK_TRANSFER: 'BankTransfer',
  MOBILE_PAYMENT: 'MobilePayment',
  ETC: 'ETC',
};

export const ABSharingChannel = {
  FACEBOOK: 'Facebook',
  KAKAO_TALK: 'KakaoTalk',
  KAKAO_STORY: 'KakaoStory',
  LINE: 'Line',
  WHATS_APP: 'whatsApp',
  QQ: 'QQ',
  WE_CHAT: 'WeChat',
  SMS: 'SMS',
  EMAIL: 'Email',
  COPY_URL: 'copyUrl',
  ETC: 'ETC',
};

export const ABSignUpChannel = {
  KAKAO: 'Kakao',
  NAVER: 'Naver',
  LINE: 'Line',
  GOOGLE: 'Google',
  FACEBOOK: 'Facebook',
  TWITTER: 'Twitter',
  WHATS_APP: 'whatsApp',
  QQ: 'QQ',
  WE_CHAT: 'WeChat',
  ETC: 'ETC',
  SKT_ID: 'SkTid',
  APPLE_ID: 'AppleId',
  USER_ID: 'UserId',
};

export const ABConfig = {
  IOS_LOG_ENABLE: 'setLog',
  ANDROID_LOG_ENABLE: 'android_log_enable',
  ANDROID_LOG_LEVEL: 'android_log_level',
  ANDROID_COLLECT_GOOGLE_ADVERTISING_ID: 'android_collect_google_advertising_id',
  IOS_TRACKING_TIMEOUT: 'trackingAuthorizeTimeOut',
};

export const ABDeepLinkResult = {
  PROCESSED: 0,
  ORGANIC: 1,
  TRACKING_LINK_SETTINGS_INCORRECTLY: 2,
  ORGANIC_NCPI_IN_PROCESS: 3,
  NO_CONVERSION: -1,
};

export const ABAndroidLogLevel = {
  VERBOSE: 2,
  DEBUG: 3,
  INFO: 4,
  WARN: 5,
  ERROR: 6,
  ASSERT_LEVEL: 7,
};

export const ABiOSTrackingTimeout = {
  TIMEOUT_60: 60,
  TIMEOUT_120: 120,
  TIMEOUT_180: 180,
};

export default {
  ABEvent,
  ABEventProperty,
  ABCurrency,
  ABInviteChannel,
  ABPaymentMethod,
  ABSharingChannel,
  ABSignUpChannel,
  ABConfig,
  ABDeepLinkResult,
  ABAndroidLogLevel,
  ABiOSTrackingTimeout,
}; 