# Migration Guide: v1.x to v2.0

This guide will help you migrate from version 1.x (Capacitor 2) to version 2.0 (Capacitor 7) of the capacitor-paystack plugin.

## Overview of Changes

Version 2.0 is a major update that includes:

- **Capacitor upgrade**: From v2.1.0 to v7.4.3
- **iOS Paystack SDK**: Updated from v3.0.13 to v3.0.15
- **Android Paystack SDK**: Updated from v3.0.17 to v3.1.3
- **Modern build system**: Updated TypeScript, Gradle, and iOS build tools
- **API changes**: Updated to use Capacitor 7's new plugin registration API

## Breaking Changes

### 1. Import Changes

**Before (v1.x):**
```typescript
import { PaystackPlugin } from '@tolutronics/capacitor-paystack';

const paystack = new PaystackPlugin();
await paystack.initialize({publicKey: "pk_..."});
```

**After (v2.0):**
```typescript
import { PaystackCapacitor } from '@tolutronics/capacitor-paystack';

// No need to instantiate - use directly
await PaystackCapacitor.initialize({publicKey: "pk_..."});
```

### 2. Minimum Platform Requirements

- **iOS**: Now requires iOS 14.0+ (previously iOS 11.0+)
- **Android**: Now requires Android 6.0 (API 23)+ (previously API 21+)
- **Node.js**: Now requires Node.js 20+ (previously Node.js 10+)
- **Xcode**: Now requires Xcode 16.0+
- **Android Gradle Plugin**: Now uses 8.2.1 (previously 3.6.1)
- **Java**: Now requires Java 17 (previously Java 8)

### 3. TypeScript Types

All plugin methods now have improved TypeScript definitions with proper JSDoc comments. Return types have been made more specific:

**Before:**
```typescript
addCard(payload: {...}): Promise<any>;
```

**After:**
```typescript
addCard(cardDetails: CardDetails): Promise<void>;
```

### 4. Android Configuration

**Before:** Plugin registration was required in `MainActivity.java`:
```java
import com.fideleapps.capacitor.plugin.PaystackCapacitor;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      add(PaystackCapacitor.class);
    }});
  }
}
```

**After:** No manual registration needed in Capacitor 7. The plugin auto-registers using the `@CapacitorPlugin` annotation.

## Step-by-Step Migration

### Step 1: Update Your App's Capacitor Version

First, update your app to Capacitor 7:

```bash
npm install @capacitor/core@latest @capacitor/cli@latest
npm install @capacitor/android@latest @capacitor/ios@latest
```

Follow the [official Capacitor 7 migration guide](https://capacitorjs.com/docs/updating/7-0) for your app.

### Step 2: Update the Plugin

```bash
npm uninstall @tolutronics/capacitor-paystack
npm install @tolutronics/capacitor-paystack@^2.0.0
```

### Step 3: Update Your Code

Update all imports and remove the plugin instantiation:

**Old code:**
```typescript
import { PaystackPlugin } from '@tolutronics/capacitor-paystack';

export class PaymentService {
  private paystack: PaystackPlugin;

  constructor() {
    this.paystack = new PaystackPlugin();
  }

  async chargeCard(cardDetails: any, email: string, amount: number) {
    await this.paystack.initialize({publicKey: "pk_test_..."});
    await this.paystack.addCard({
      cardNumber: cardDetails.number,
      expiryMonth: cardDetails.expMonth,
      expiryYear: cardDetails.expYear,
      cvv: cardDetails.cvv
    });
    await this.paystack.setChargeEmail({email});
    await this.paystack.setChargeAmount({amount: amount.toString()});
    const result = await this.paystack.chargeCard();
    return result.reference;
  }
}
```

**New code:**
```typescript
import { PaystackCapacitor } from '@tolutronics/capacitor-paystack';

export class PaymentService {
  async chargeCard(cardDetails: any, email: string, amount: number) {
    await PaystackCapacitor.initialize({publicKey: "pk_test_..."});
    await PaystackCapacitor.addCard({
      cardNumber: cardDetails.number,
      expiryMonth: cardDetails.expMonth,
      expiryYear: cardDetails.expYear,
      cvv: cardDetails.cvv
    });
    await PaystackCapacitor.setChargeEmail({email});
    await PaystackCapacitor.setChargeAmount({amount: amount.toString()});
    const result = await PaystackCapacitor.chargeCard();
    return result.reference;
  }
}
```

### Step 4: Update Android Configuration

1. Remove any manual plugin registration from `MainActivity.java`
2. Update your `android/build.gradle` to use the new Android Gradle Plugin version:

```gradle
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.1'
    }
}
```

3. Update `android/gradle.properties`:

```properties
android.useAndroidX=true
android.nonTransitiveRClass=true
```

4. Update your app's `compileSdkVersion` to 34 or higher

### Step 5: Update iOS Configuration

1. Update your `Podfile` to require iOS 14.0+:

```ruby
platform :ios, '14.0'
```

2. Run `pod install` in your iOS directory:

```bash
cd ios/App
pod install
cd ../..
```

### Step 6: Sync and Test

```bash
npx cap sync
```

Test your payment flows thoroughly on both iOS and Android.

## API Compatibility

Good news! All plugin methods remain the same and backward compatible:

- ✅ `initialize()`
- ✅ `addCard()`
- ✅ `validateCard()`
- ✅ `chargeCard()`
- ✅ `addChargeParameters()`
- ✅ `getCardType()`
- ✅ `putChargeMetadata()`
- ✅ `putChargeCustomFields()`
- ✅ `setChargeEmail()`
- ✅ `setChargeAmount()`
- ✅ `setAccessCode()`

The only change is HOW you access them (direct import vs. instantiation).

## Troubleshooting

### Build Errors on Android

If you encounter build errors related to Gradle:

1. Update Android Studio to the latest version
2. Ensure you're using Java 17:
   ```bash
   java -version
   ```
3. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew build
   ```

### Build Errors on iOS

If you encounter build errors:

1. Ensure Xcode 16.0+ is installed
2. Clean derived data and rebuild:
   ```bash
   cd ios/App
   rm -rf Pods
   pod deintegrate
   pod install
   cd ../..
   ```
3. Open in Xcode and clean build folder (Cmd+Shift+K)

### TypeScript Errors

If you get TypeScript errors after migration:

1. Update your TypeScript version to 5.6+
2. Clear your IDE's TypeScript cache
3. Restart your TypeScript language server

## New Features in v2.0

### Improved Error Handling

The plugin now provides better error messages with proper error handling using Capacitor 7's error handling patterns.

### Better TypeScript Support

All methods now have comprehensive JSDoc documentation and proper type definitions for better IDE autocomplete and type safety.

### Modern Build Pipeline

- Uses latest TypeScript (5.6.x)
- Updated Rollup configuration
- ESLint and Prettier integration
- Swift linting support

## Need Help?

If you encounter any issues during migration:

1. Check the [GitHub Issues](https://github.com/tolutronics/capacitor-paystack/issues)
2. Review the [Capacitor 7 migration guide](https://capacitorjs.com/docs/updating/7-0)
3. Open a new issue with details about your problem

## Rollback

If you need to rollback to v1.x:

```bash
npm install @tolutronics/capacitor-paystack@1.0.0-beta
npx cap sync
```

Note: You'll need to revert your Capacitor app to v2.x as well.
