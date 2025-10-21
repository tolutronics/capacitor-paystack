# Paystack Capacitor Plugin - Demo App

This is a demo React + Capacitor application that demonstrates the usage of the `@tolutronics/capacitor-paystack` plugin.

## Features Demonstrated

- ✅ Initialize Paystack SDK
- ✅ Card validation
- ✅ Card type detection
- ✅ Direct card charging
- ✅ Charging with access code
- ✅ Adding metadata and custom fields
- ✅ Error handling
- ✅ Responsive UI design

## Prerequisites

- Node.js 20 or higher
- For iOS development:
  - macOS
  - Xcode 16.0 or higher
  - CocoaPods
- For Android development:
  - Android Studio
  - JDK 17
  - Android SDK

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your Paystack Public Key

Open `src/App.jsx` and update the `publicKey` state with your Paystack test public key:

```javascript
const [publicKey, setPublicKey] = useState('pk_test_YOUR_KEY_HERE')
```

You can also enter it directly in the app UI.

### 3. Run in Browser (Development)

```bash
npm run dev
```

**Note**: Payment processing won't work in the browser as it requires native Paystack SDKs. Use iOS/Android for full functionality testing.

### 4. Build for Production

```bash
npm run build
```

### 5. Sync with Native Platforms

```bash
npx cap sync
```

## Running on iOS

### Option 1: Using Xcode

```bash
npx cap open ios
```

Then build and run from Xcode on a simulator or device.

### Option 2: Using CLI

```bash
npx cap run ios
```

### iOS Configuration

The iOS platform requires:
- iOS 14.0 or higher
- Paystack iOS SDK 3.0.15 (automatically installed via CocoaPods)

## Running on Android

### Option 1: Using Android Studio

```bash
npx cap open android
```

Then build and run from Android Studio on an emulator or device.

### Option 2: Using CLI

```bash
npx cap run android
```

### Android Configuration

The Android platform requires:
- Android 6.0 (API 23) or higher
- Paystack Android SDK 3.3.2 (automatically installed via Gradle)

## Testing the Plugin

### Test Card Details

Use these test card details (provided by Paystack):

- **Card Number**: 4084084084084081
- **Expiry Month**: 12
- **Expiry Year**: 25 (or any future year)
- **CVV**: 123 (or any 3 digits)
- **OTP**: 123456 (when prompted in test mode)

### Test Flow

1. **Initialize SDK**
   - Enter your Paystack test public key
   - Click "Initialize SDK"
   - Verify initialization success

2. **Validate Card**
   - Card details are pre-filled with test card
   - Click "Validate Card"
   - See card type and validation result

3. **Process Payment**
   - Enter customer email
   - Enter amount in kobo (10000 = ₦100)
   - Click "Charge Card"
   - Follow OTP prompt if shown
   - Verify transaction reference

4. **Charge with Access Code** (Optional)
   - Generate access code from your backend
   - Click "Charge with Access Code"
   - Enter the access code
   - Complete payment flow

## Project Structure

```
demo-app/
├── src/
│   ├── App.jsx          # Main component with payment logic
│   ├── App.css          # Styling
│   └── main.jsx         # React entry point
├── ios/                 # iOS native project
├── android/             # Android native project
├── dist/                # Build output
└── package.json         # Dependencies
```

## Important Notes

### Security

- This is a demo app for testing purposes
- Never commit your production Paystack keys
- Always use test keys (pk_test_...) for development
- In production, verify all transactions on your backend

### Transaction Verification

After a successful charge, you should verify the transaction on your backend:

```javascript
// On your backend
const reference = req.body.reference;
const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
  headers: {
    Authorization: `Bearer YOUR_SECRET_KEY`
  }
});

const data = await response.json();
if (data.data.status === 'success') {
  // Transaction is verified, fulfill order
}
```

### Web Platform Limitation

The Paystack plugin requires native SDKs and won't work in a web browser. You must test on iOS or Android devices/emulators.

## Troubleshooting

### iOS Issues

**Pod Install Errors**:
```bash
cd ios/App
pod deintegrate
pod install
cd ../..
```

**Build Errors**:
- Ensure Xcode 16.0+ is installed
- Clean build folder in Xcode (Cmd+Shift+K)

### Android Issues

**Gradle Build Errors**:
```bash
cd android
./gradlew clean
./gradlew build
cd ..
```

**Java Version Issues**:
- Ensure Java 17 is installed and set as JAVA_HOME

### Plugin Not Found

```bash
npm install ../
npx cap sync
```

## Development Workflow

1. Make changes to `src/App.jsx`
2. Build the web assets: `npm run build`
3. Sync to native platforms: `npx cap sync`
4. Run on device/emulator

Or use live reload:

```bash
npm run dev
npx cap run ios --livereload --external
npx cap run android --livereload --external
```

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Paystack Documentation](https://paystack.com/docs)
- [Plugin Repository](https://github.com/tolutronics/capacitor-paystack)
- [Paystack Test Cards](https://paystack.com/docs/payments/test-payments)

## Support

For issues related to:
- **The Plugin**: [GitHub Issues](https://github.com/tolutronics/capacitor-paystack/issues)
- **Paystack API**: [Paystack Support](https://paystack.com/contact)
- **Capacitor**: [Capacitor Discussions](https://github.com/ionic-team/capacitor/discussions)

## License

MIT

---

Built with ❤️ using @tolutronics/capacitor-paystack
