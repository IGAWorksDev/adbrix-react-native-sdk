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
  ABPaymentMethod,
  ABiOSLogLevel,
  ABCurrency
} from '@igaworks/adbrix-react-native-sdk';
import { 
  requestTrackingPermission, 
  getTrackingStatus
} from 'react-native-tracking-transparency';

export default function App() {
  const [attStatus, setAttStatus] = useState<string>('unknown');

  useEffect(() => {
    sdkInit();
  }, []);

  const sdkInit = () => {
    const config = {
      [ABConfig.IOS_LOG_LEVEL]: ABiOSLogLevel.VERBOSE,
      [ABConfig.ANDROID_LOG_ENABLE]: true,
      [ABConfig.ANDROID_LOG_LEVEL]: ABAndroidLogLevel.VERBOSE,
      [ABConfig.ANDROID_COLLECT_GOOGLE_ADVERTISING_ID]: true,
    };

    // Replace with your Adbrix credentials
    // You can set these via environment variables or a local config file
    const applicationKey = process.env.ADBRIX_APP_KEY || 'YOUR_APPLICATION_KEY';
    const secretKey = process.env.ADBRIX_SECRET_KEY || 'YOUR_SECRET_KEY';

    Adbrix.initWithConfig({
      applicationKey,
      secretKey,
      config: config,
    });
  };

  const handleRequestATT = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('알림', 'ATT 권한 요청은 iOS에서만 사용 가능합니다.');
      return;
    }

    const currentStatus = await getTrackingStatus();
    
    if (currentStatus === 'not-determined') {
      const result = await requestTrackingPermission();
      setAttStatus(result);
      
      switch (result) {
        case 'authorized':
          Adbrix.attAuthorized(true);
          Alert.alert('ATT 권한', '추적 권한이 허용되었습니다.');
          break;
        case 'denied':
          Adbrix.attAuthorized(false);
          Alert.alert('ATT 권한', '추적 권한이 거부되었습니다.');
          break;
        case 'restricted':
          Adbrix.attAuthorized(false);
          Alert.alert('ATT 권한', '추적 권한이 제한되었습니다.');
          break;
        case 'unavailable':
          Alert.alert('ATT 권한', 'ATT가 지원되지 않는 환경입니다.');
          break;
      }
    } else if (currentStatus === 'authorized') {
      setAttStatus('authorized');
      Adbrix.attAuthorized(true);
      Alert.alert('ATT 권한', '이미 추적 권한이 허용되어 있습니다.');
    } else if (currentStatus === 'denied' || currentStatus === 'restricted') {
      setAttStatus(currentStatus);
      Adbrix.attAuthorized(false);
      Alert.alert('ATT 권한', '추적 권한이 거부/제한되었습니다. 설정에서 변경 가능합니다.');
    } else {
      setAttStatus(currentStatus);
      Alert.alert('ATT 권한', `현재 상태: ${currentStatus}`);
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
      .currency(ABCurrency.KRW)
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

        {/* ATT 권한 요청 섹션 */}
        {Platform.OS === 'ios' && (
          <>
            <Text style={styles.sectionTitle}>ATT 권한</Text>
            <TouchableOpacity style={styles.attButton} onPress={handleRequestATT}>
              <Text style={styles.buttonText}>ATT 권한 요청</Text>
            </TouchableOpacity>
            <Text style={styles.statusText}>상태: {attStatus}</Text>
          </>
        )}

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
  attButton: {
    backgroundColor: '#FF9800',
    margin: 4,
    marginHorizontal: 12,
    padding: 12,
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
  statusText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 12,
    marginBottom: 8,
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
