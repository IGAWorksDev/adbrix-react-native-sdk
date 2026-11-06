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

// TODO: Replace with your actual credentials
const AdbrixConfig = {
  applicationKey: 'YOUR_APPLICATION_KEY',
  secretKey: 'YOUR_SECRET_KEY',
};

export default function App() {
  const [sdkVersion, setSdkVersion] = useState<string>('unknown');

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

    Adbrix.initWithConfig({
      applicationKey: AdbrixConfig.applicationKey,
      secretKey: AdbrixConfig.secretKey,
      config: config,
    });

    // Get SDK version for verification
    Adbrix.getSDKVersion().then((version) => {
      setSdkVersion(version);
    }).catch(() => {
      setSdkVersion('error');
    });
  };

  // Event Handler Functions
  const handleLogin = () => {
    Adbrix.logEvent({ eventName: ABEvent.LOGIN });
    Alert.alert('Event', 'Login event sent');
  };

  const handlePurchase = () => {
    const item = ABItem()
      .productId("product_001")
      .productName("Test Product")
      .category1("Category1")
      .category2("Category2")
      .price(5000.0)
      .discount(500.0)
      .quantity(1)
      .currency(ABCurrency.KRW)
      .build();

    const properties = ABProperty
      .items([item])
      .orderId("order_001")
      .paymentMethod(ABPaymentMethod.CREDIT_CARD)
      .orderSales(4500.0)
      .deliveryCharge(0.0)
      .discount(500.0)
      .build();

    Adbrix.logEvent({ eventName: ABEvent.PURCHASE, properties: properties });
    Alert.alert('Event', 'Purchase event sent');
  };

  const handleCustomEvent = () => {
    const properties = ABProperty
      .customLong('custom_long', 12345)
      .customDouble('custom_double', 3.14159)
      .customString('custom_string', "test_value")
      .customBool('custom_bool', true)
      .build();

    Adbrix.logEvent({ 
      eventName: 'custom_event', 
      properties: properties
    });
    Alert.alert('Event', 'Custom event sent');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Adbrix SDK Example</Text>
          <Text style={styles.versionText}>SDK Version: {sdkVersion}</Text>
          <Text style={styles.platformText}>Platform: {Platform.OS}</Text>
        </View>

        {/* SDK Info */}
        <Text style={styles.sectionTitle}>SDK Information</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Build Type: SPM{'\n'}
            Expected Version: {Platform.OS === 'ios' ? '3.2.4' : 'N/A'}
          </Text>
        </View>

        {/* LogEvent Section */}
        <Text style={styles.sectionTitle}>LogEvent Tests</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login Event</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Purchase Event</Text>
        </TouchableOpacity>

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
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  versionText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  platformText: {
    fontSize: 12,
    color: '#ffffffcc',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1565c0',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    marginVertical: 6,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    height: 24,
  },
});
