<details open>
<summary>EN</summary>

## 2.0.0 (2026-11-09)

##### Breaking Changes
- Minimum React Native version upgraded from 0.76.0 to 0.88.0.
- iOS deployment target upgraded from 12.0 to 15.0. (Xcode 27 requirement)
- SPM uses `AdbrixReactNativeSdk` module name, CocoaPods uses `adbrix_react_native_sdk` module name.

##### Added
- Swift Package Manager (SPM) support for iOS dependency management. [iOS]
- Package.swift file added for SPM-based iOS projects.
- `play-services-appset` dependency added for App Set ID support. [Android]
  ```groovy
  implementation("com.google.android.gms:play-services-appset:16.0.2")
  ```

##### Changed
- Android SDK updated to version 4.1.0.
- iOS SDK updated to version 3.2.4 (SPM) / 3.2.3 (CocoaPods).
- iOS native module restructured for SPM/CocoaPods dual support.

##### Notes
- [CocoaPods Specs repository will become read-only in December 2026](https://blog.cocoapods.org/CocoaPods-Specs-Repo/), so SPM is recommended for React Native iOS builds. Existing CocoaPods configuration remains available with version 3.2.3.
- For SceneDelegate lifecycle handling with Xcode 27+, refer to [example app's SceneDelegate.swift](https://github.com/IGAWorksDev/adbrix-react-native-sdk/blob/main/example/ios/example/SceneDelegate.swift).

##### Versions

- Android
  - Adbrix Android SDK 4.1.0
- iOS
  - Adbrix iOS SDK 3.2.4 (Swift Package Manager)
  - Adbrix iOS SDK 3.2.3 (CocoaPods)

## 1.1.2 (2026-02-19)

##### Added
- SKAdNetwork (SKAN) support added. [iOS]

##### Changed
- Logging system changed. [iOS]

##### Fixed
- Fixed an issue in Unity where float values (e.g., 100.0) were incorrectly converted to integers, causing event attributes to be dropped. [Android]
- Resolved a NullPointerException that occurred in unit test environments when null values were passed as inputs. [Android]
- Fixed an intermittent issue where queued events were excluded from transmission during consecutive event calls. [Android]

##### Notes
- Event sampling now applies to all events. [Android]
- Standardized inconsistent log structures and messages across all platforms into a single format. [Android]

##### Versions

- Android
  - Adbrix Android SDK 3.0.10
- iOS
  - Adbrix iOS SDK 3.2.1

## 1.1.1 (2025-11-06)

##### Added
- SKAdNetwork (SKAN) support added. [iOS]

##### Versions

- Android
  - Adbrix Android SDK 3.0.7
- iOS
  - Adbrix iOS SDK 3.1.0

## 1.0.4 (2025-09-02)

##### Fixed
- Fixed validation issue where invalid event property types were allowed. [iOS]

##### Changed
- Improved event collection stability and collection rate. [Android]

##### Versions

- Android
  - Adbrix Android SDK 3.0.7
- iOS
  - Adbrix iOS SDK 3.0.3

## 1.0.3 (2025-07-01)

##### Changed
- Adbrix Android SDK updated from 3.0.4 to 3.0.5.

##### Versions

- Android
  - Adbrix Android SDK 3.0.5
- iOS
  - Adbrix iOS SDK 3.0.2

## 1.0.2 (2025-06-19)

##### Notes
- Initial release.

##### Versions

- Android
  - Adbrix Android SDK 3.0.4
- iOS
  - Adbrix iOS SDK 3.0.2

</details>

<details open>
<summary>KO</summary>

## 2.0.0 (2026-11-09)

##### 주요 변경사항 (Breaking Changes)
- React Native 최소 버전이 0.76.0에서 0.88.0으로 업그레이드되었습니다.
- iOS deployment target이 12.0에서 15.0으로 상향되었습니다. (Xcode 27 요구사항)
- SPM은 `AdbrixReactNativeSdk` 모듈명을, CocoaPods는 `adbrix_react_native_sdk` 모듈명을 사용합니다.

##### 추가됨
- iOS 의존성 관리를 위한 Swift Package Manager(SPM) 지원이 추가되었습니다. [iOS]
- SPM 기반 iOS 프로젝트를 위한 Package.swift 파일 추가
- App Set ID 지원을 위한 `play-services-appset` 의존성 추가 [Android]
  ```groovy
  implementation("com.google.android.gms:play-services-appset:16.0.2")
  ```

##### 변경됨
- Android SDK가 버전 4.1.0으로 업데이트되었습니다.
- iOS SDK가 버전 3.2.4 (SPM) / 3.2.3 (CocoaPods)으로 업데이트되었습니다.
- iOS 네이티브 모듈이 SPM/CocoaPods 듀얼 지원 구조로 재구성되었습니다.

##### 참고 사항
- [CocoaPods Specs 저장소가 2026년 12월 부로 읽기 전용으로 전환](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)되므로 React Native iOS 빌드 시 SPM 사용을 권장합니다. 기존 CocoaPods 설정은 버전 3.2.3으로 계속 사용 가능합니다.
- Xcode 27 이상에서 SceneDelegate 생명주기 대응이 필요한 경우 [example 앱의 SceneDelegate.swift](https://github.com/IGAWorksDev/adbrix-react-native-sdk/blob/main/example/ios/example/SceneDelegate.swift)를 참고하세요.

##### 버전 정보

- Android
  - Adbrix Android SDK 4.1.0
- iOS
  - Adbrix iOS SDK 3.2.4 (Swift Package Manager)
  - Adbrix iOS SDK 3.2.3 (CocoaPods)

## 1.1.2 (2026-02-19)

##### 추가됨
- SKAdNetwork(SKAN) 기능이 추가되었습니다. [iOS]

##### 변경됨
- 로깅 시스템이 변경되었습니다. [iOS]

##### 고쳐짐
- Unity에서 100.0과 같은 실수형 데이터가 정수형으로 변환되어 이벤트 속성에서 누락되던 문제를 수정하였습니다. [Android]
- 유닛 테스트 환경에서 null 값이 입력될 경우 NullPointerException이 발생하던 문제를 해결하였습니다. [Android]
- 연속적인 이벤트 발생 시, 메모리 큐에 대기 중인 이벤트가 발송 대상에서 간헐적으로 누락되던 문제를 해결하였습니다. [Android]

##### 참고 사항
- 이벤트 샘플링이 모든 이벤트에 적용되도록 변경되었습니다. [Android]
- 플랫폼별로 상이했던 로그 구조와 메시지가 통일된 규격으로 변경되었습니다. [Android]

##### 버전 정보

- Android
  - Adbrix Android SDK 3.0.10
- iOS
  - Adbrix iOS SDK 3.2.1

## 1.1.1 (2025-11-06)

##### 추가됨
- SKAdNetwork(SKAN) 기능이 추가되었습니다. [iOS]

##### 버전 정보

- Android
  - Adbrix Android SDK 3.0.7
- iOS
  - Adbrix iOS SDK 3.1.0

## 1.0.4 (2025-09-02)

##### 고쳐짐
- 검증에 통과되지 않아야 하는 이벤트 프로퍼티의 타입이 통과되던 문제를 수정하였습니다. [iOS]

##### 변경됨
- 이벤트 수집 안정성 및 수집률이 향상되었습니다. [Android]

##### 버전 정보

- Android
  - Adbrix Android SDK 3.0.7
- iOS
  - Adbrix iOS SDK 3.0.3

## 1.0.3 (2025-07-01)

##### 변경됨
- Adbrix Android SDK가 3.0.4에서 3.0.5로 업데이트되었습니다.

##### 버전 정보

- Android
  - Adbrix Android SDK 3.0.5
- iOS
  - Adbrix iOS SDK 3.0.2

## 1.0.2 (2025-06-19)

##### 참고 사항
- 최초 배포.

##### 버전 정보

- Android
  - Adbrix Android SDK 3.0.4
- iOS
  - Adbrix iOS SDK 3.0.2

</details>
