<details open>
<summary>EN</summary>




## 1.1.2 (2026-02-19)

##### Added
- Added support for SKAdNetwork (SKAN). [iOS]

##### Changed
- Logging system changed [iOS]

##### Fixed
- Fixed an issue in Unity where float values (e.g., 100.0) were incorrectly converted to integers, causing event attributes to be dropped. [Android]
- Resolved a NullPointerException that occurred in unit test environments when null values were passed as inputs. [Android]
- Fixed an intermittent issue where queued events were excluded from transmission during consecutive event calls. [Android]

##### Notes
- Event sampling now applies to all events. [Android]
- Standardized inconsistent log structures and messages across all platforms into a single format. [Android]

##### Versions

- **Android**
  - Adbrix Android SDK 3.0.10
- **iOS**
  - Adbrix iOS SDK 3.2.1
## 1.1.1 (2025-11-06)

##### Added
- Added support for SKAdNetwork (SKAN). [iOS]

##### Versions

- **Android**
  - Adbrix Android SDK 3.0.7
- **iOS**
  - Adbrix iOS SDK 3.1.0
## 1.0.4 (2025-09-02)

##### Fixed
- Fixed validation issue where invalid event property types were allowed. [iOS]

##### Enhancement
- Improving Event Collection Stability and Collection Rate [Android]

##### Versions

- **Android**
  - Adbrix Android SDK 3.0.7
- **iOS**
  - Adbrix iOS SDK 3.0.3
## 1.0.3 (2025-07-01)

##### Notes

- Updated the Adbrix Android SDK from 3.0.4 to 3.0.5.

##### Versions

- **Android**
  - Adbrix Android SDK 3.0.5
- **iOS**
  - Adbrix iOS SDK 3.0.2


## 1.0.2 (2025-06-19)

##### Notes

- Initial release.

##### Versions

- **Android**
  - Adbrix Android SDK 3.0.4
- **iOS**
  - Adbrix iOS SDK 3.0.2

</details>

<details open>
<summary>KO</summary>




## 1.1.2 (2026-02-19)

##### 추가됨
- SKAdNetwork(SKAN) 기능이 추가되었습니다. [iOS]

##### 변경됨
- 로깅 시스템 변경 [iOS]

##### 고쳐짐
- Unity에서 100.0과 같은 실수형 데이터가 정수형으로 변환되어 이벤트 속성에서 누락되던 타입을 수정하였습니다. [Android]
- 유닛 테스트 환경에서 null 값이 입력될 경우 NullPointerException이 발생하던 문제를 해결하였습니다. [Android]
- 연속적인 이벤트 발생 시, 메모리 큐에 대기 중인 이벤트가 발송 대상에서 간헐적으로 누락되던 문제를 해결하였습니다. [Android]

##### 주요 사항
- 이벤트 샘플링이 모든 이벤트에 적용되도록 변경되었습니다. [Android]
- 플랫폼별로 상이했던 로그 구조와 메시지가 통일된 규격으로 변경되었습니다. [Android]

##### 버전 정보

- **Android**
  - Adbrix Android SDK 3.0.10
- **iOS**
  - Adbrix iOS SDK 3.2.1
## 1.1.1 (2025-11-06)

##### 추가됨
- SKAdNetwork(SKAN) 기능이 추가되었습니다. [iOS]

##### 버전 정보

- **Android**
  - Adbrix Android SDK 3.0.7
- **iOS**
  - Adbrix iOS SDK 3.1.0
## 1.0.4 (2025-09-02)

##### 고쳐짐
- 검증에 통과되지 않아야 하는 이벤트 프로퍼티의 타입이 통과되던 문제 수정 [iOS]

##### 개선
- 이벤트 수집 안정성 및 수집률 향상 [Android]

##### 버전 정보

- **Android**
  - Adbrix Android SDK 3.0.7
- **iOS**
  - Adbrix iOS SDK 3.0.3
## 1.0.3 (2025-07-01)

##### 주요 사항

- Adbrix Android SDK가 3.0.4에서 3.0.5로 변경되었습니다.

##### 버전 정보

- **Android**
  - Adbrix Android SDK 3.0.5
- **iOS**
  - Adbrix iOS SDK 3.0.2


## 1.0.2 (2025-06-19)

##### 주요 사항

- 최초 배포.

##### 버전 정보

- **Android**
  - Adbrix Android SDK 3.0.4
- **iOS**
  - Adbrix iOS SDK 3.0.2

</details>