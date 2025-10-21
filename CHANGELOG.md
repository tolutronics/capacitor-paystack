# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-21

### Major Update - Capacitor 7 Migration

This is a major release with breaking changes. Please read the [Migration Guide](./MIGRATION.md) before upgrading.

**Note:** This version is a fork of the original [capacitor-paystack](https://github.com/Fidele-Software-Solutions/capacitor-paystack) plugin by Fidele Software Solutions, updated and maintained by Tolulope Adeniyi.

### Added

- Capacitor 7.4.3 support with new plugin registration API
- Comprehensive TypeScript definitions with JSDoc comments for all methods
- Modern build pipeline with Rollup, ESLint, and Prettier
- Detailed migration guide from v1.x to v2.0
- Improved error handling with better error messages
- Support for iOS 14.0+ and Android API 23+
- Automatic plugin registration (no manual setup needed)
- `.swiftlint.yml` configuration for Swift code quality
- `.eslintrc.json` and `.prettierrc.json` for code formatting
- Comprehensive README with usage examples and best practices
- CHANGELOG.md for version tracking

### Changed

- **BREAKING**: Upgraded from Capacitor 2.1.0 to 7.4.3
- **BREAKING**: Updated API from `Plugins` registry to `registerPlugin` pattern
- **BREAKING**: Changed import from `PaystackPlugin` class to `PaystackCapacitor` const
- **BREAKING**: Removed need to instantiate plugin - use directly as singleton
- **BREAKING**: Minimum iOS version raised from 11.0 to 14.0
- **BREAKING**: Minimum Android API level raised from 21 to 23
- **BREAKING**: Minimum Node.js version raised to 20+
- Updated iOS Paystack SDK from 3.0.13 to 3.0.15
- Updated Android Paystack SDK from 3.0.17 to 3.3.2
- Updated Android Gradle Plugin from 3.6.1 to 8.2.1
- Updated compileSdkVersion from 29 to 34 on Android
- Updated targetSdkVersion from 29 to 34 on Android
- Changed Java compatibility from 1.8 to Java 17
- Updated TypeScript from 3.2.4 to 5.6.3
- Modernized Android build.gradle with namespace support
- Improved gradle.properties with modern Android build settings
- Changed iOS deployment target from 11.0 to 14.0
- Updated podspec to use dynamic versioning from package.json
- Replaced `@NativePlugin` with `@CapacitorPlugin` annotation on Android
- Replaced `call.success()` with `call.resolve()` on iOS
- Replaced `call.error()` with `call.reject()` on iOS
- Replaced `call.errorCallback()` with `call.reject()` on Android
- Improved TypeScript interface definitions with specific types
- Updated rollup.config.js to support both IIFE and CommonJS outputs
- Enhanced .gitignore with modern build artifacts

### Removed

- **BREAKING**: Removed `PaystackPlugin` class wrapper
- **BREAKING**: Removed `Plugins` registry import pattern
- Removed unused `PaystackCharge.ts` file
- Removed deprecated jcenter repository references
- Removed pinpad dependency (now included in Paystack SDK)
- Removed explicit Retrofit dependencies (handled by Paystack SDK)
- Removed manual plugin registration requirement for Android
- Removed old `Plugin.ts` wrapper file

### Fixed

- Fixed iOS plugin to use new Capacitor 7 `CAPBridgedPlugin` protocol
- Fixed Android plugin to use new Capacitor 7 annotations
- Fixed error handling to use proper reject/resolve methods
- Fixed TypeScript compilation with modern ES2020 target
- Fixed rollup configuration for proper module bundling
- Added proper null checks in iOS chargeCard method
- Improved card validation logic with guard statements

### Security

- Updated all dependencies to latest secure versions
- Removed deprecated and insecure dependency packages
- Added namespace support for Android to improve R class isolation
- Updated to latest Paystack SDKs with security fixes

### Development

- Added comprehensive build scripts for verification
- Added docgen script for automatic API documentation
- Added linting and formatting scripts
- Added swiftlint for iOS code quality
- Improved build performance with updated tooling
- Added support for modern ES modules

### Documentation

- Completely rewritten README with comprehensive examples
- Added detailed API reference section
- Added best practices and security notes
- Added troubleshooting section
- Created comprehensive MIGRATION.md guide
- Added usage examples for all major features
- Documented all breaking changes
- Added SDK version information

## [1.0.0-beta] - 2020

### Initial Release

- Basic Paystack integration for Capacitor 2
- iOS support with Paystack iOS SDK 3.0.13
- Android support with Paystack Android SDK 3.0.17
- Card charging functionality
- Access code support
- Metadata and custom fields support
- Card validation
- Card type detection

[2.0.0]: https://github.com/tolutronics/capacitor-paystack/compare/v1.0.0-beta...v2.0.0
[1.0.0-beta]: https://github.com/tolutronics/capacitor-paystack/releases/tag/v1.0.0-beta
