# Adbrix React Native SDK 설치 가이드

React Native 프로젝트에 Adbrix SDK를 연동하는 단계별 가이드입니다.

---

## 개발 환경 설정

### 필수 도구 설치

```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 22.13.0+, Watchman
brew install node watchman
```

### iOS

- Xcode 27 이상 (App Store에서 설치)

### Android

- [Android Studio](https://developer.android.com/studio) 설치
- SDK Manager에서 Android SDK Platform 35 설치
- Kotlin 2.0+

환경 변수 (`~/.zshrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## 프로젝트 시작

### 방법 1: 예제 프로젝트 사용

| 디렉토리 | iOS 빌드 방식 | 설명 |
|---------|-------------|------|
| `example/` | SPM (experimental) | 신규 프로젝트 권장 |
| `example_pods/` | CocoaPods | 레거시 프로젝트용 |

```bash
# SPM 예제 (권장)
cd example && npm install && npm run ios

# CocoaPods 예제
cd example_pods && npm install && cd ios && pod install && cd .. && npm run ios
```

### 방법 2: 새 프로젝트 생성

```bash
npx @react-native-community/cli@latest init MyProject --version latest
cd MyProject
```

---

## SDK 설치

```bash
npm install @igaworks/adbrix-react-native-sdk
```

> 정식 버전 출시 후에는 버전 태그 없이 설치 가능합니다.

---

## 설정 파일 구성

`src/config.ts` 생성:

```typescript
let config = {
  applicationKey: 'YOUR_APPLICATION_KEY',
  secretKey: 'YOUR_SECRET_KEY',
};

try {
  // @ts-ignore
  const localConfig = require('./config.local');
  if (localConfig?.AdbrixConfig) {
    config = localConfig.AdbrixConfig;
  }
} catch (e) {
  console.warn('[Adbrix] config.local.ts not found.');
}

export const AdbrixConfig = config;
```

`src/config.local.ts` 생성 (git-ignored):

```typescript
export const AdbrixConfig = {
  applicationKey: 'your_actual_application_key',
  secretKey: 'your_actual_secret_key',
};
```

`.gitignore`에 추가:

```
src/config.local.ts
```

> **키 발급:** [Adbrix 콘솔](https://console.adbrix.io) → 앱 설정 → SDK 연동 정보

---

## SDK 초기화

```typescript
import { useEffect } from 'react';
import Adbrix from '@igaworks/adbrix-react-native-sdk';
import { AdbrixConfig } from './config';

function App() {
  useEffect(() => {
    Adbrix.init(AdbrixConfig);
  }, []);

  return /* ... */;
}
```

---

## 딥링크 설정

### iOS - SceneDelegate.swift

**SPM:**

```swift
import AdbrixReactNativeSdk

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    AdbrixReactNativeSdk.deeplinkOpen(with: url)
}
```

**CocoaPods:**

```swift
import adbrix_react_native_sdk

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    AdbrixReactNative.deepLinkOpen(url: url)
}
```

### Android - AndroidManifest.xml

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="your_scheme" android:host="your_host" />
</intent-filter>
```

---

## 빌드 및 실행

```bash
npm run ios      # iOS
npm run android  # Android
```

---

## 문제 해결

| 문제 | 해결 |
|-----|------|
| SPM 빌드 오류 | `cd ios && rm -rf build && npx react-native spm` |
| CocoaPods 빌드 오류 | `cd ios && rm -rf Pods Podfile.lock && pod install` |
| Android 빌드 오류 | `cd android && ./gradlew clean` |

---

## 참고 자료

- [SDK GitHub](https://github.com/IGAWorksDev/adbrix-react-native-sdk)
- [Developer Guide](https://adbrix.gitbook.io/developer-guide/platform/reactnative)
- [Adbrix Console](https://console.adbrix.io)
