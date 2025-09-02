import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  Platform,
  Linking,
  SafeAreaView
} from 'react-native';
import Adbrix, { 
  ABEvent, 
  ABCurrency, 
  ABPaymentMethod,
  ABConfig,
  ABAndroidLogLevel,
  ABInviteChannel,
  ABSharingChannel,
  ABSignUpChannel,
  ABProperty,
  ABItem
} from '@igaworks/adbrix-react-native-sdk';

export default function App() {
  const [deepLink, setDeepLink] = useState<string | null>(null);

  useEffect(() => {
    init();
    
    // 딥링크 리스너 설정
    const handleDeepLink = (url: string) => {
      console.log("🔗 [React Native] 딥링크 수신:", url);
      if (url.startsWith('abx2jimmy://')) {
        setDeepLink(url);
        showDeepLinkAlert(url + " (React Native)");
      }
    };

    // 앱이 실행 중일 때 딥링크 처리
    const linkingListener = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url + ' this is linkingListener');
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url + ' this is iniitial');
      }
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  const init = async () => {
    sdkInit();
    blockDeferredDeepLinkLaunch();
  };

  const sdkInit = () => {
    const config = {
      [ABConfig.IOS_LOG_ENABLE]: true,
      [ABConfig.ANDROID_LOG_ENABLE]: true,
      [ABConfig.ANDROID_LOG_LEVEL]: ABAndroidLogLevel.VERBOSE,
      [ABConfig.ANDROID_COLLECT_GOOGLE_ADVERTISING_ID]: true,
      // [ABConfig.IOS_TRACKING_TIMEOUT]: ABiOSTrackingTimeout.TIMEOUT_60
    };

    Adbrix.initWithConfig({
      applicationKey: "{YOUR_APPLICATION_KEY}",
      secretKey: "{YOUR_SECRET_KEY}",
      config: config,
    });
  };

  const blockDeferredDeepLinkLaunch = async () => {
    try {
      const callback = await Adbrix.blockDeferredDeepLinkLaunch();
      if (callback) {
        const deepLinkUrl = callback.deepLink;
        const deepLinkResult = callback.result;
        setDeepLink(deepLinkUrl);
        showDeepLinkAlert(deepLinkUrl + " deferred! "+ deepLinkResult);
      }
    } catch (error) {
      console.error("error in blockDeferredDeepLinkLaunch:", error);
    }
  };

  const showDeepLinkAlert = (deepLinkUrl: string) => {
    Alert.alert(
      '딥링크 수신',
      `수신된 딥링크: ${deepLinkUrl}`,
      [{ text: '확인', style: 'default' }]
    );
  };

  const requestTrackingAuthorization = async () => {
    if (Platform.OS === 'ios') {
      // React Native에서는 react-native-permissions를 사용하거나
      // 직접 ATT 권한을 요청하는 네이티브 모듈을 구현해야 합니다.
      // 여기서는 간단히 허용되었다고 가정하고 호출합니다.
      Alert.alert(
        'ATT 권한 요청',
        'iOS에서 앱 추적 투명성 권한을 요청합니다.',
        [
          {
            text: '허용',
            onPress: () => Adbrix.attAuthorized(true)
          },
          {
            text: '거부',
            onPress: () => Adbrix.attAuthorized(false)
          }
        ]
      );
    }
  };

  // Event Handler Functions
  const handleLogin = () => {
    Adbrix.logEvent({ eventName: ABEvent.LOGIN });
  };

  const handleLogout = () => {
    Adbrix.logEvent({ eventName: ABEvent.LOGOUT });
  };

  const handleSignUp = () => {
    const properties = ABProperty
      .signChannel(ABSignUpChannel.KAKAO)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.SIGN_UP, 
      properties: properties
    });
  };

  const handleAppUpdate = () => {
    const properties = ABProperty
      .prevVer('1.0.0')
      .currVer('1.0.1')
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.APP_UPDATE, 
      properties: properties
    });
  };

  const handleInvite = () => {
    const properties = ABProperty
      .inviteChannel(ABInviteChannel.KAKAO)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.INVITE, 
      properties: properties
    });
  };

  const handleUseCredit = () => {
    Adbrix.logEvent({ eventName: ABEvent.USE_CREDIT });
  };

  const handlePurchase = () => {
    // 기존 방식 대신 빌더 패턴 사용
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .currency(ABCurrency.KRW)
      .customString('custom_string', '단건테스트')
      .customLong('custom_long', 100)
      .customDouble('custom_double', 100.0)
      .customBool('custom_bool', true)
      .build();


    const item2 = ABItem()
      .productId('상품번호3')
      .productName('상품이름3')
      .category1('식품')
      .category2('간식')
      .price(2000.0)
      .discount(0.0)
      .quantity(3)
      .currency(ABCurrency.KRW)
      .customString('custom_string', '단건테스트')
      .customLong('custom_long', 100)
      .customDouble('custom_double', 100.0)
      .customBool('custom_bool', true)
      .build();
      
    const item3 = ABItem()
      .productId('상품번호3')
      .productName('상품이름3')
      .category1('식품')
      .category2('간식')
      .price(2000.0)
      .discount(0.0)
      .quantity(3)
      .currency(ABCurrency.KRW)
      .build();

    const properties = ABProperty
      .items([item, item2, item3])
      .orderId('상품번호')
      .paymentMethod(ABPaymentMethod.BANK_TRANSFER)
      .orderSales(20000.0)
      .deliveryCharge(3000.0)
      .build();

    Adbrix.logEvent({ eventName: ABEvent.PURCHASE, properties: properties });
  };


  const handleViewHome = () => {
    Adbrix.logEvent({ eventName: ABEvent.VIEW_HOME });
  };


  const handleCategoryView = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .currency(ABCurrency.KRW)
      .build();

    const properties = ABProperty
      .items([item])
      .category1('식품')
      .category2('과자')
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.CATEGORY_VIEW, 
      properties: properties
    });
  };

  const handleProductView = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .currency(ABCurrency.KRW)
      .build();

    const properties = ABProperty
      .items([item])
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.PRODUCT_VIEW, 
      properties: properties
    });
  };

  const handleAddToCart = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .build();

    const properties = ABProperty
      .items([item])
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.ADD_TO_CART, 
      properties: properties
    });
  };

  const handleAddToWishlist = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .build();

    const properties = ABProperty
      .items([item])
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.ADD_TO_WISHLIST, 
      properties: properties
    });
  };

  const handleReviewOrder = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .currency(ABCurrency.KRW)
      .build();

    const properties = ABProperty
      .items([item])
      .orderId('상품번호')
      .deliveryCharge(3000.0)
      .discount(0.0)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.REVIEW_ORDER, 
      properties: properties
    });
  };

  const handleRefund = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .build();

    const properties = ABProperty
      .items([item])
      .orderId('주문번호')
      .penaltyCharge(0.0)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.REFUND, 
      properties: properties
    });
  };

  const handleSearch = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .build();

    const properties = ABProperty
      .items([item])
      .keyword('삼겹살')
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.SEARCH, 
      properties: properties
    });
  };

  const handleShare = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .currency(ABCurrency.KRW)
      .build();

    const properties = ABProperty
      .items([item])
      .sharingChannel(ABSharingChannel.FACEBOOK)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.SHARE, 
      properties: properties
    });
  };

  const handleListView = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .build();

    const properties = ABProperty
      .items([item])
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.LIST_VIEW, 
      properties: properties
    });
  };

  const handleCartView = () => {
    const item = ABItem()
      .productId('상품번호')
      .productName('상품이름')
      .category1('식품')
      .category2('과자')
      .price(5000.0)
      .discount(0.0)
      .quantity(1)
      .build();

    const properties = ABProperty
      .items([item])
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.CART_VIEW, 
      properties: properties
    });
  };

 
  const handlePaymentInfoAdded = () => {
    Adbrix.logEvent({ eventName: ABEvent.PAYMENT_INFO_ADDED });
  };

  const handleTutorialCompleted = () => {
    const properties = ABProperty
      .isSkip(true)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.TUTORIAL_COMPLETED, 
      properties: properties
    });
  };

  const handleCharacterCreated = () => {
    Adbrix.logEvent({ eventName: ABEvent.CHARACTER_CREATED });
  };

  const handleStageCleared = () => {
    const properties = ABProperty
      .stage('STAGE_NAME')
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.STAGE_CLEARED, 
      properties: properties
    });
  };

  const handleLevelAchieved = () => {
    const properties = ABProperty
      .level(100)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.LEVEL_ACHIEVED, 
      properties: properties
    });
  };

  const handleCustomEvent = () => {
    const properties = ABProperty
      .customBool('is_logined', true)
      .customString('username', 'hello')
      .customLong('visit_count', 1000)
      .build();

    Adbrix.logEvent({ 
      eventName: 'custom_event_1', 
      properties: properties
    });
  };

  const handleEnableSDK = () => {
    Adbrix.enableSDK();
  };

  const handleDisableSDK = () => {
    Adbrix.disableSDK();
  };


  // 단건 아이템 테스트 함수
  const handleSingleItemTest = () => {
    // 단일 아이템 생성
    const singleItem = ABItem()
      .productId('single_product')
      .productName('단일상품')
      .price(50000)
      .quantity(1)
      .category1('테스트')
      .customString('test_field', '단건테스트')
      .build();

    // 단건 아이템을 Properties에 전달 (배열이 아님!)
    const singleItemProperties = ABProperty
      .items(singleItem)  // 배열이 아닌 단건 객체 전달
      .orderId('SINGLE_ORDER_001')
      .orderSales(50000)
      .build();

    Adbrix.logEvent({ 
      eventName: ABEvent.PRODUCT_VIEW, 
      properties: singleItemProperties 
    });
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Adbrix Demo</Text>
          {deepLink && (
            <Text style={styles.deepLinkText}>
              마지막 딥링크: {deepLink}
            </Text>
          )}
        </View>

        {/* ATT 섹션 */}
        <Text style={styles.sectionTitle}>ATT</Text>
        <TouchableOpacity style={styles.button} onPress={requestTrackingAuthorization}>
          <Text style={styles.buttonText}>requestTrackingAuthorization</Text>
        </TouchableOpacity>

        {/* LogEvent 섹션 */}
        <Text style={styles.sectionTitle}>LogEvent</Text>
        
        {/* UserAnalytics */}
        <Text style={styles.subSectionTitle}>UserAnalytics</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        {/* Common */}
        <Text style={styles.subSectionTitle}>Common</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSingleItemTest}>
          <Text style={styles.buttonText}>Single Item Test</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleInvite}>
          <Text style={styles.buttonText}>Invite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUseCredit}>
          <Text style={styles.buttonText}>UseCredit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAppUpdate}>
          <Text style={styles.buttonText}>AppUpdate</Text>
        </TouchableOpacity>

        {/* Commerce */}
        <Text style={styles.subSectionTitle}>Commerce</Text>
        <TouchableOpacity style={styles.button} onPress={handleViewHome}>
          <Text style={styles.buttonText}>View Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleProductView}>
          <Text style={styles.buttonText}>Product View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAddToWishlist}>
          <Text style={styles.buttonText}>Add To Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRefund}>
          <Text style={styles.buttonText}>Refund</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleListView}>
          <Text style={styles.buttonText}>List View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCartView}>
          <Text style={styles.buttonText}>Cart View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReviewOrder}>
          <Text style={styles.buttonText}>ReviewOrder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePaymentInfoAdded}>
          <Text style={styles.buttonText}>Payment Info Added</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCategoryView}>
          <Text style={styles.buttonText}>CategoryView</Text>
        </TouchableOpacity>

        {/* Game */}
        <Text style={styles.subSectionTitle}>Game</Text>
        <TouchableOpacity style={styles.button} onPress={handleLevelAchieved}>
          <Text style={styles.buttonText}>LevelArchived</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTutorialCompleted}>
          <Text style={styles.buttonText}>TutorialCompleted</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCharacterCreated}>
          <Text style={styles.buttonText}>CharacterCreated</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleStageCleared}>
          <Text style={styles.buttonText}>StageCleared</Text>
        </TouchableOpacity>

        {/* CustomEvent */}
        <Text style={styles.subSectionTitle}>CustomEvent</Text>
        <TouchableOpacity style={styles.button} onPress={handleCustomEvent}>
          <Text style={styles.buttonText}>Custom Event</Text>
        </TouchableOpacity>

        {/* Dfinery */}
        <Text style={styles.subSectionTitle}>Dfinery</Text>
        <TouchableOpacity style={styles.button} onPress={handleEnableSDK}>
          <Text style={styles.buttonText}>enableSDK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDisableSDK}>
          <Text style={styles.buttonText}>disableSDK</Text>
        </TouchableOpacity>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  deepLinkText: {
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
    marginHorizontal: 12,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 8,
    marginBottom: 4,
    marginHorizontal: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    margin: 4,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    height: 12,
  },
});
