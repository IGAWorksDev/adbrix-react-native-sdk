package com.igaworks.adbrixreactnativesdk;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;

/**
 * Adbrix Properties Builder 파싱 유틸리티 클래스
 * React Native에서 전달받은 Properties Builder 객체를 네이티브에서 사용할 수 있는 형태로 변환
 */
public final class AdbrixReactNativeParser {
    private static final String TAG = "AdbrixReactNativeParser";
    /**
     * Properties Builder로 생성된 객체를 파싱하여 실제 값들의 Map을 반환
     * @param propertiesMap React Native에서 전달받은 ReadableMap
     * @return 파싱된 프로퍼티들의 Map<String, Object>
     */
    public static Map<String, Object> parsePropertiesReadableMap(ReadableMap propertiesMap) {
        if (propertiesMap == null) {
            return new HashMap<>();
        }
        Map<String, Object> parsedProperties = new HashMap<>();
        ReadableMapKeySetIterator iterator = propertiesMap.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            Object value = parsePropertyValue(propertiesMap, key);
            if (value != null) {
                parsedProperties.put(key, value);
            }
        }
        return parsedProperties;
    }

    /**
     * 개별 프로퍼티 값을 파싱
     * @param map 프로퍼티를 포함한 ReadableMap
     * @param key 파싱할 프로퍼티의 키
     * @return 파싱된 값 (타입에 따라 적절히 변환됨)
     */
    private static Object parsePropertyValue(ReadableMap map, String key) {
        try {
            // items 배열 처리
            if ("abx:items".equals(key) && map.hasKey(key)) {
                ReadableArray itemsArray = map.getArray(key);
                if (itemsArray != null) {
                    return parseItemsArray(itemsArray);
                }
                return null;
            }

            // 일반 프로퍼티 처리 (TypedValue 구조)
            if (map.hasKey(key)) {
                ReadableMap typedValue = map.getMap(key);
                if (typedValue != null && typedValue.hasKey("value") && typedValue.hasKey("type")) {
                    return parseTypedValue(typedValue);
                }
            }

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * TypedValue 구조를 파싱하여 실제 값을 반환
     * @param typedValue { value: any, type: string } 구조의 ReadableMap
     * @return 타입에 맞게 변환된 실제 값
     */
    private static Object parseTypedValue(ReadableMap typedValue) {
        String type = typedValue.getString("type");
        
        switch (type) {
            case "string":
                return typedValue.getString("value");
            case "long":
                return typedValue.hasKey("value") ? (long) typedValue.getDouble("value") : 0L;
            case "double":
                return typedValue.getDouble("value");
            case "boolean":
                return typedValue.getBoolean("value");
            default:
                return typedValue.getString("value");
        }
    }

    /**
     * Items 배열을 파싱
     * @param itemsArray items 배열
     * @return 파싱된 아이템들의 리스트
     */
    private static List<Map<String, Object>> parseItemsArray(ReadableArray itemsArray) {
        List<Map<String, Object>> items = new ArrayList<>();
        
        for (int i = 0; i < itemsArray.size(); i++) {
            ReadableMap itemMap = itemsArray.getMap(i);
            if (itemMap != null) {
                Map<String, Object> parsedItem = parseItem(itemMap);
                items.add(parsedItem);
            }
        }
        

        return items;
    }

    /**
     * 개별 아이템을 파싱
     * @param itemMap 아이템 ReadableMap
     * @return 파싱된 아이템 Map
     */
    private static Map<String, Object> parseItem(ReadableMap itemMap) {
        Map<String, Object> parsedItem = new HashMap<>();
        ReadableMapKeySetIterator iterator = itemMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableMap typedValue = itemMap.getMap(key);
            if (typedValue != null && typedValue.hasKey("value") && typedValue.hasKey("type")) {
                Object value = parseTypedValue(typedValue);
                if (value != null) {
                    parsedItem.put(key, value);
                }
            }
        }

        return parsedItem;
    }

    public static ReadableMap convertToReadableMap(HashMap<Object, Object> hashMap) {
        WritableMap writableMap = Arguments.createMap();
        for (Map.Entry<Object, Object> entry : hashMap.entrySet()) {
            Object key = entry.getKey();
            Object value = entry.getValue();

            if (value instanceof String) {
                writableMap.putString(key.toString(), (String) value);
            } else if (value instanceof Integer || value instanceof Long) {
                writableMap.putInt(key.toString(), (int) value);
            } else if (value instanceof Boolean) {
                writableMap.putBoolean(key.toString(), (Boolean) value);
            } else if (value instanceof Double || value instanceof Float) {
                writableMap.putDouble(key.toString(), (double) value);
            } else {
                writableMap.putString(key.toString(), value.toString());
            }
        }
        return writableMap;
    }

    public static JSONObject convertReadableMapToJson(ReadableMap readableMap) {
        JSONObject jsonObject = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            try {
                switch (readableMap.getType(key)) {
                    case Null:
                        jsonObject.put(key, JSONObject.NULL);
                        break;
                    case Boolean:
                        jsonObject.put(key, readableMap.getBoolean(key));
                        break;
                    case Number:
                        jsonObject.put(key, readableMap.getDouble(key));
                        break;
                    case String:
                        jsonObject.put(key, readableMap.getString(key));
                        break;
                    case Array:
                        jsonObject.put(key, convertReadableArrayToJson(readableMap.getArray(key)));
                        break;
                    default:
                        Log.d(TAG, "Could not convert object with key: " + key + ".");
                }
            } catch (Exception e) {
                Log.w(TAG, e);
            }
        }
        return jsonObject;
    }
    public static JSONArray convertReadableArrayToJson(ReadableArray readableArray) {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            try {
                switch (type) {
                    case Null:
                        jsonArray.put(JSONObject.NULL);
                        break;
                    case Number:
                        jsonArray.put(readableArray.getDouble(i));
                        break;
                    case String:
                        jsonArray.put(readableArray.getString(i));
                        break;
                    case Map:
                        jsonArray.put(convertReadableMapToJson(readableArray.getMap(i)));
                        break;
                }
            } catch (Exception e) {
                Log.w(TAG, e);
            }
        }
        return jsonArray;
    }
} 