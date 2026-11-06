// swift-tools-version: 5.7
import PackageDescription

let package = Package(
    name: "adbrix-react-native-sdk",
    platforms: [.iOS(.v12)],
    products: [
        .library(
            name: "AdbrixReactNativeSdk",
            targets: ["adbrix_react_native_sdk"]
        )
    ],
    dependencies: [
        .package(
            url: "https://github.com/IGAWorksDev/adbrix-ios-sdk",
            exact: "3.2.4"
        )
    ],
    targets: [
        // Swift-only target for SPM compatibility
        // Objective-C bridge files are handled by React Native's build system
        .target(
            name: "adbrix_react_native_sdk",
            dependencies: [
                .product(name: "AdbrixSDK", package: "adbrix-ios-sdk")
            ],
            path: "ios",
            exclude: [
                // Exclude Objective-C files (handled by RN build system)
                "AdbrixPropertiesParser.h",
                "AdbrixPropertiesParser.m",
                "AdbrixReactNativeSdk.h",
                "AdbrixReactNativeSdk.m",
                // Exclude Xcode project
                "AdbrixReactNativeSdk.xcodeproj"
            ],
            sources: ["AdbrixReactNative.swift"],
            swiftSettings: [
                .define("SPM_BUILD")
            ]
        )
    ]
)
