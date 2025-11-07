import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  Platform,
  SafeAreaView
} from 'react-native';
import Adbrix, { 
  ABEvent, 
  ABConfig,
  ABAndroidLogLevel,
  ABProperty,
  ABItem,
  ABPaymentMethod
} from '@igaworks/adbrix-react-native-sdk';

export default function App() {

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    sdkInit();
    requestTrackingAuthorization();
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
      applicationKey: "APPLICATION_KEY",
      secretKey: "SECRET_KEY",
      config: config,
    });
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

  const handlePurchase = () => {
    // 기존 방식 대신 빌더 패턴 사용
    const item = ABItem()
      .productId("상품번호")
      .productName("상품이름")
      .category1("식품")
      .category2("과자")
      .price(5000.0)
      .discount(500.0)
      .quantity(5)
      .build();
    const items = [item];
    const properties = ABProperty
      .items(items)
      .orderId("주문번호")
      .paymentMethod(ABPaymentMethod.BANK_TRANSFER)
      .orderSales(25500.0)
      .deliveryCharge(3000.0)
      .discount(0.0)
      .build();

    Adbrix.logEvent({ eventName: ABEvent.PURCHASE, properties: properties });
  };

  const handleCustomEvent = () => {
    const properties = ABProperty
      .customLong('custom_property_1', 34000)
      .customDouble('custom_property_2', 42.195)
      .customString('custom_property_3', "Seoul")
      .customBool('custom_property_4', true)
      .build();

    Adbrix.logEvent({ 
      eventName: 'custom_event', 
      properties: properties
    });
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Adbrix Demo</Text>
        </View>

        {/* LogEvent 섹션 */}
        <Text style={styles.sectionTitle}>LogEvent</Text>
        
        {/* UserAnalytics */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
        
        {/* CustomEvent */}
        <Text style={styles.subSectionTitle}>CustomEvent</Text>
        <TouchableOpacity style={styles.button} onPress={handleCustomEvent}>
          <Text style={styles.buttonText}>Custom Event</Text>
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
