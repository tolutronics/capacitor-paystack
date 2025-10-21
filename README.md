# Paystack Capacitor Plugin

[![npm version](https://badge.fury.io/js/%40tolutronics%2Fcapacitor-paystack.svg)](https://www.npmjs.com/package/@tolutronics/capacitor-paystack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive Paystack payment integration plugin for Capacitor, supporting both Android and iOS platforms.

> **Note**: This is a fork of [capacitor-paystack](https://github.com/Fidele-Software-Solutions/capacitor-paystack) by Fidele Software Solutions, updated to support Capacitor 7 and the latest Paystack SDKs.

## Version 2.0 - Now with Capacitor 7 Support!

This plugin has been fully upgraded to support Capacitor 7, with updated Paystack SDKs and modern build tooling.

**Key Updates:**
- ✅ Capacitor 7.4.3 support
- ✅ iOS Paystack SDK 3.0.15
- ✅ Android Paystack SDK 3.1.3
- ✅ Modern TypeScript & build pipeline
- ✅ Improved type definitions and documentation

## Requirements

- **Capacitor**: 7.0.0 or higher
- **iOS**: 14.0 or higher
- **Android**: API 23 (Android 6.0) or higher
- **Node.js**: 20.0 or higher
- **Xcode**: 16.0 or higher (for iOS development)

## Installation

Install the plugin in your Capacitor project:

```bash
npm install @tolutronics/capacitor-paystack
npx cap sync
```

## Migration from v1.x

If you're upgrading from version 1.x, please read the [Migration Guide](./MIGRATION.md) for detailed instructions on updating your code.

## Configuration

### No Additional Setup Required

With Capacitor 7, the plugin automatically registers itself. You don't need to manually add the plugin to your native projects.

### iOS Setup

The plugin requires iOS 14.0+. Ensure your `ios/App/Podfile` has the correct platform version:

```ruby
platform :ios, '14.0'
```

Then install pods:

```bash
cd ios/App
pod install
```

### Android Setup

The plugin requires Android API 23+. Ensure your `android/app/build.gradle` has the correct minSdkVersion:

```gradle
android {
    defaultConfig {
        minSdkVersion 23
    }
}
```

## Usage

### Basic Card Charge

```typescript
import { PaystackCapacitor } from '@tolutronics/capacitor-paystack';

// Initialize the SDK with your Paystack public key
await PaystackCapacitor.initialize({
  publicKey: "pk_test_xxxxxxxxxxxx" // Get this from your Paystack dashboard
});

// Add card details
await PaystackCapacitor.addCard({
  cardNumber: "4084084084084081",
  expiryMonth: "12",
  expiryYear: "25",
  cvv: "123"
});

// Set customer email
await PaystackCapacitor.setChargeEmail({
  email: "customer@example.com"
});

// Set amount in kobo (smallest currency unit)
// For NGN: 10000 kobo = 100 NGN
await PaystackCapacitor.setChargeAmount({
  amount: "10000"
});

// Optional: Add custom fields
await PaystackCapacitor.putChargeCustomFields({
  customer_id: "12345",
  order_id: "ORD-98765"
});

// Optional: Add metadata
await PaystackCapacitor.putChargeMetadata({
  platform: "mobile",
  app_version: "2.0.0"
});

// Charge the card
try {
  const result = await PaystackCapacitor.chargeCard();
  console.log('Payment successful!', result.reference);
  // Verify the transaction on your backend using the reference
} catch (error) {
  console.error('Payment failed:', error);
}
```

### Charging with Access Code

If you're generating the transaction on your backend and obtaining an access code:

```typescript
import { PaystackCapacitor } from '@tolutronics/capacitor-paystack';

// Initialize
await PaystackCapacitor.initialize({
  publicKey: "pk_test_xxxxxxxxxxxx"
});

// Add card details
await PaystackCapacitor.addCard({
  cardNumber: "4084084084084081",
  expiryMonth: "12",
  expiryYear: "25",
  cvv: "123"
});

// Set the access code from your backend
await PaystackCapacitor.setAccessCode({
  accessCode: "access_code_from_backend"
});

// Charge the card
const result = await PaystackCapacitor.chargeCard();
console.log('Payment reference:', result.reference);
```

### Card Validation

Validate card details before charging:

```typescript
await PaystackCapacitor.addCard({
  cardNumber: "4084084084084081",
  expiryMonth: "12",
  expiryYear: "25",
  cvv: "123"
});

const validation = await PaystackCapacitor.validateCard();
if (validation.is_valid) {
  console.log('Card is valid');
} else {
  console.log('Card is invalid');
}
```

### Get Card Type

Identify the card type (Visa, Mastercard, etc.):

```typescript
await PaystackCapacitor.addCard({
  cardNumber: "4084084084084081",
  expiryMonth: "12",
  expiryYear: "25",
  cvv: "123"
});

const cardInfo = await PaystackCapacitor.getCardType();
console.log('Card type:', cardInfo.card_type); // e.g., "Visa"
```

### Adding Charge Parameters

Add additional parameters to your charge:

```typescript
await PaystackCapacitor.addChargeParameters({
  custom_param1: "value1",
  custom_param2: "value2"
});
```

## API Reference

### initialize(options)

Initialize the Paystack SDK with your public key.

**Parameters:**
- `options.publicKey` (string): Your Paystack public key

**Returns:** Promise<{initialized: boolean}>

---

### addCard(cardDetails)

Add card details for the transaction.

**Parameters:**
- `cardDetails.cardNumber` (string): Card number without spaces
- `cardDetails.expiryMonth` (string): Expiry month (MM)
- `cardDetails.expiryYear` (string): Expiry year (YY or YYYY)
- `cardDetails.cvv` (string): Card CVV/CVC

**Returns:** Promise<void>

---

### validateCard()

Validate the previously added card details.

**Returns:** Promise<{is_valid: boolean}>

---

### chargeCard()

Charge the card with configured details.

**Returns:** Promise<{reference: string}>

---

### setChargeEmail(options)

Set the customer's email for the transaction.

**Parameters:**
- `options.email` (string): Customer email

**Returns:** Promise<void>

---

### setChargeAmount(options)

Set the amount to charge in kobo (smallest currency unit).

**Parameters:**
- `options.amount` (string): Amount in kobo

**Returns:** Promise<void>

---

### setAccessCode(options)

Set an access code from your backend.

**Parameters:**
- `options.accessCode` (string): Transaction access code

**Returns:** Promise<void>

---

### getCardType()

Get the type of the added card.

**Returns:** Promise<{card_type: string}>

---

### putChargeMetadata(metadata)

Add metadata to the charge.

**Parameters:**
- `metadata` (object): Key-value pairs of metadata

**Returns:** Promise<void>

---

### putChargeCustomFields(customFields)

Add custom fields to the charge.

**Parameters:**
- `customFields` (object): Key-value pairs of custom fields

**Returns:** Promise<void>

---

### addChargeParameters(parameters)

Add additional parameters to the charge.

**Parameters:**
- `parameters` (object): Key-value pairs of parameters

**Returns:** Promise<void>

## Best Practices

### 1. Always Verify Transactions

Always verify transactions on your backend before fulfilling orders:

```typescript
const result = await PaystackCapacitor.chargeCard();
// Send result.reference to your backend
// Backend should call Paystack's verification endpoint
// https://api.paystack.co/transaction/verify/:reference
```

### 2. Handle Errors Gracefully

```typescript
try {
  await PaystackCapacitor.chargeCard();
} catch (error) {
  // Show user-friendly error message
  console.error('Payment failed:', error);
}
```

### 3. Store Public Key Securely

Don't hardcode your public key. Use environment variables:

```typescript
const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
await PaystackCapacitor.initialize({ publicKey });
```

### 4. Test with Test Keys

Use Paystack's test keys during development:
- Test public key: `pk_test_xxxxxxxxxxxx`
- Test card: 4084084084084081 (CVV: any 3 digits)

## Security Notes

- This plugin handles sensitive card data. Always use HTTPS in production.
- Never store card details on your device or backend.
- Always verify transactions server-side before fulfilling orders.
- Use Paystack's test environment during development.
- Keep your secret keys secure and never expose them in client-side code.

## Troubleshooting

### iOS Build Issues

If you encounter build issues on iOS:

```bash
cd ios/App
rm -rf Pods
pod deintegrate
pod install
```

### Android Build Issues

If you encounter build issues on Android:

```bash
cd android
./gradlew clean
./gradlew build
```

### Type Errors

Ensure you're using TypeScript 5.6 or higher and that your IDE has reloaded the type definitions.

## SDK Versions

This plugin uses:
- **Capacitor**: 7.4.3
- **Paystack iOS SDK**: 3.0.15
- **Paystack Android SDK**: 3.3.2

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/tolutronics/capacitor-paystack).

## Changelog

### Version 2.0.0 (2025)
- Upgraded to Capacitor 7.4.3
- Updated iOS Paystack SDK to 3.0.15
- Updated Android Paystack SDK to 3.3.2
- Modernized build pipeline and tooling
- Improved TypeScript definitions
- Added comprehensive documentation
- Breaking changes - see [Migration Guide](./MIGRATION.md)

### Version 1.0.0-beta
- Initial release with Capacitor 2.1.0 support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Tolulope Adeniyi** - [GitHub](https://github.com/tolutronics)

## Support

- [GitHub Issues](https://github.com/tolutronics/capacitor-paystack/issues)
- [Paystack Documentation](https://paystack.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## Credits

This plugin is a fork of the original [capacitor-paystack](https://github.com/Fidele-Software-Solutions/capacitor-paystack) plugin by [Fidele Software Solutions](https://github.com/Fidele-Software-Solutions). The original plugin was created by Okafor Ikenna and supported Capacitor 2.

**What's New in This Fork:**
- Upgraded to Capacitor 7.4.3
- Updated Paystack iOS SDK to 3.0.15
- Updated Paystack Android SDK to 3.1.3
- Modernized build tooling and TypeScript
- Comprehensive documentation and migration guides
- Full rebranding and maintenance by Tolulope Adeniyi

We're grateful to the original authors for creating this foundation. This fork continues their work with modern updates and ongoing maintenance.
