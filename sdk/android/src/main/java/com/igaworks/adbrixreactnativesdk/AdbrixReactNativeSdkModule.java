package com.igaworks.adbrixreactnativesdk;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.igaworks.adbrix.Adbrix;
import com.igaworks.adbrix.AdbrixBridge;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Adbrix React Native SDK Bridge Module
 * 
 * SDK Version Compatibility: 4.1.0
 * 
 * This module bridges React Native JavaScript calls to the native Adbrix Android SDK.
 * 
 * SDK API Usage:
 * - AdbrixBridge: getInstance(), init(), startSession(), endSession(), 
 *                 registerAdbrixDeferredDeepLinkListener(), blockDeferredDeepLinkLaunch()
 * - Adbrix: getInstance(), logEvent(), enableSDK(), disableSDK()
 * 
 * Note: If the SDK API changes in future versions, adapter methods should be added
 * to this class to maintain JavaScript API compatibility (Requirement 5.3).
 */
public class AdbrixReactNativeSdkModule extends ReactContextBaseJavaModule implements LifecycleEventListener{

    public static final String NAME = "Adbrix";
    private static final String TAG = "abx_AdbrixReactNativeSdkModule";
    private final AdbrixBridge adbrixBridge;

    public AdbrixReactNativeSdkModule(ReactApplicationContext context) {
        super(context);
        this.adbrixBridge = AdbrixBridge.getInstance();
        this.adbrixBridge.registerAdbrixDeferredDeepLinkListener(0);
    }

    @Override
    public void initialize() {
        super.initialize();
        Log.i(TAG, "initialize");
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public void invalidate() {
        super.invalidate();
        Log.i(TAG, "invalidate");
        getReactApplicationContext().removeLifecycleEventListener(this);
    }

    @Override
    public void onHostResume() {
        Log.i(TAG, "onHostResume");
        if(getCurrentActivity() != null){
            adbrixBridge.startSession(getCurrentActivity());
        }
    }

    @Override
    public void onHostPause() {
        Log.i(TAG, "onHostPause");
        if(getCurrentActivity() != null){
            adbrixBridge.endSession(getCurrentActivity());
        }
    }

    @Override
    public void onHostDestroy() {
        Log.i(TAG, "onHostDestroy");
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // =============================================================================
    // Adbrix 메인 API 메서드들
    // =============================================================================


    // SDK 초기화
    @ReactMethod
    public void init(ReadableMap params) {
        String applicationKey = params.getString("applicationKey");
        String secretKey = params.getString("secretKey");

        Log.d(TAG, "🚀 init - applicationKey: " + applicationKey + ", secretKey: " + secretKey);

        adbrixBridge.init(getReactApplicationContext(), applicationKey, secretKey);
    }

    // 설정과 함께 SDK 초기화
    @ReactMethod
    public void initWithConfig(ReadableMap params) {
        String applicationKey = params.getString("applicationKey");
        String secretKey = params.getString("secretKey");
        ReadableMap config = params.getMap("config");
        if(config != null){
            JSONObject configJsonObject = AdbrixReactNativeParser.convertReadableMapToJson(config);
            Log.d(TAG, "🚀 initWithConfig - applicationKey: " + applicationKey + ", secretKey: " + secretKey + ", config: " + configJsonObject);
            adbrixBridge.init(getReactApplicationContext(), applicationKey, secretKey, configJsonObject.toString());
        } else{
            Log.d(TAG, "🚀 init - applicationKey: " + applicationKey + ", secretKey: " + secretKey);
            adbrixBridge.init(getReactApplicationContext(), applicationKey, secretKey);
        }
    }

    // 이벤트 로깅
    @ReactMethod
    public void logEvent(ReadableMap params) {
        String eventName = params.getString("eventName");
        ReadableMap properties = params.getMap("properties");

        if(eventName == null){
            Log.d(TAG, "eventName is null");
            return;
        }

        // Properties Builder 객체 파싱
        if (properties != null) {
            Map<String, Object> parsedProperties = AdbrixReactNativeParser.parsePropertiesReadableMap(properties);
            JSONObject propertiesJsonObject = new JSONObject(parsedProperties);
            Log.d(TAG, "📊 logEvent - eventName: " + eventName+" properties: "+propertiesJsonObject);
            Adbrix.getInstance().logEvent(eventName, propertiesJsonObject);
        } else{
            Log.d(TAG, "📊 logEvent - eventName: " + eventName+" properties: null");
            Adbrix.getInstance().logEvent(eventName);
        }
    }

    // SDK 활성화
    @ReactMethod
    public void enableSDK() {
        Log.d(TAG, "✅ enableSDK");
        Adbrix.getInstance().enableSDK();
    }

    // SDK 비활성화
    @ReactMethod
    public void disableSDK() {
        Log.d(TAG, "❌ disableSDK");
        Adbrix.getInstance().disableSDK();
    }

    // 지연된 딥링크 실행 차단
    @ReactMethod
    public void blockDeferredDeepLinkLaunch(Promise promise) {
        Log.d(TAG, "🔗 blockDeferredDeepLinkLaunch");

        adbrixBridge.blockDeferredDeepLinkLaunch(getReactApplicationContext(), new AdbrixBridge.AdbrixDeferredDeepLinkCallback() {
            @Override
            public void onCallback(int result, String deepLink) {
                HashMap<Object, Object> map = new HashMap<>();
                map.put("result", result);
                map.put("deepLink", deepLink);
                promise.resolve(AdbrixReactNativeParser.convertToReadableMap(map));
            }
        });
    }

    // ATT 권한 상태 설정 (Android에서는 no-op)
    @ReactMethod
    public void attAuthorized(ReadableMap params) {
        boolean authorized = params.getBoolean("authorized");

        Log.d(TAG, "🔐 attAuthorized - authorized: " + authorized + " (Android에서는 무시됨)");
    }
} 