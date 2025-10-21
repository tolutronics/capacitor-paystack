import { useState } from 'react'
import { PaystackCapacitor } from '@tolutronics/capacitor-paystack'
import './App.css'

function App() {
  const [publicKey, setPublicKey] = useState('')
  const [email, setEmail] = useState('customer@example.com')
  const [amount, setAmount] = useState('10000')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [cardValid, setCardValid] = useState(null)
  const [cardType, setCardType] = useState('')

  const showMessage = (msg, isError = false) => {
    setMessage(msg)
    console.log(isError ? 'Error:' : 'Success:', msg)
  }

  const handleInitialize = async () => {
    try {
      setLoading(true)
      setMessage('')

      const result = await PaystackCapacitor.initialize({
        publicKey: publicKey
      })

      setIsInitialized(true)
      showMessage('✅ Paystack initialized successfully!')
    } catch (error) {
      showMessage(`❌ Initialization failed: ${error.message}`, true)
    } finally {
      setLoading(false)
    }
  }

  const handleValidateCard = async () => {
    try {
      setLoading(true)
      setMessage('')

      // Add card first
      await PaystackCapacitor.addCard({
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv
      })

      // Validate card
      const validation = await PaystackCapacitor.validateCard()
      setCardValid(validation.is_valid)

      if (validation.is_valid) {
        // Get card type
        const cardTypeResult = await PaystackCapacitor.getCardType()
        setCardType(cardTypeResult.card_type)
        showMessage(`✅ Card is valid! Type: ${cardTypeResult.card_type}`)
      } else {
        setCardType('')
        showMessage('❌ Card is invalid', true)
      }
    } catch (error) {
      showMessage(`❌ Card validation failed: ${error.message}`, true)
      setCardValid(false)
    } finally {
      setLoading(false)
    }
  }

  const handleChargeCard = async () => {
    try {
      setLoading(true)
      setMessage('')

      if (!isInitialized) {
        showMessage('❌ Please initialize Paystack first!', true)
        setLoading(false)
        return
      }

      // Add card details
      await PaystackCapacitor.addCard({
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv
      })

      // Set customer email
      await PaystackCapacitor.setChargeEmail({
        email
      })

      // Set amount (in kobo - smallest currency unit)
      await PaystackCapacitor.setChargeAmount({
        amount
      })

      // Optional: Add metadata
      await PaystackCapacitor.putChargeMetadata({
        custom_id: '12345',
        platform: 'demo-app',
        timestamp: new Date().toISOString()
      })

      // Optional: Add custom fields
      await PaystackCapacitor.putChargeCustomFields({
        demo_field: 'Demo Value',
        app_version: '1.0.0'
      })

      // Charge the card
      const result = await PaystackCapacitor.chargeCard()

      showMessage(`✅ Payment successful! Reference: ${result.reference}`)

      // In production, you would send this reference to your backend
      // to verify the transaction with Paystack
      console.log('Transaction Reference:', result.reference)
      console.log('Next: Verify this transaction on your backend')

    } catch (error) {
      showMessage(`❌ Payment failed: ${error.message}`, true)
    } finally {
      setLoading(false)
    }
  }

  const handleChargeWithAccessCode = async () => {
    try {
      setLoading(true)
      setMessage('')

      if (!isInitialized) {
        showMessage('❌ Please initialize Paystack first!', true)
        setLoading(false)
        return
      }

      const accessCode = prompt('Enter access code from your backend:')
      if (!accessCode) {
        setLoading(false)
        return
      }

      // Add card details
      await PaystackCapacitor.addCard({
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv
      })

      // Set access code
      await PaystackCapacitor.setAccessCode({
        accessCode
      })

      // Charge the card
      const result = await PaystackCapacitor.chargeCard()

      showMessage(`✅ Payment successful! Reference: ${result.reference}`)
      console.log('Transaction Reference:', result.reference)

    } catch (error) {
      showMessage(`❌ Payment failed: ${error.message}`, true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Paystack Demo App</h1>
          <p>Test the Capacitor Paystack Plugin</p>
        </header>

        {/* Initialization Section */}
        <section className="card">
          <h2>1. Initialize Paystack</h2>
          <div className="form-group">
            <label>Public Key</label>
            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="pk_test_xxxxxxxxxxxx"
              disabled={isInitialized}
            />
          </div>
          <button
            onClick={handleInitialize}
            disabled={loading || isInitialized}
            className={isInitialized ? 'btn-success' : 'btn-primary'}
          >
            {isInitialized ? '✅ Initialized' : 'Initialize SDK'}
          </button>
        </section>

  {/* Test Card Info */}
        <section className="info-card">
          <h3>📝 Test Card Information</h3>
         <p>Use any of paystack test card details to test the plugin</p>
        </section>
        {/* Card Details Section */}
        <section className="card">
          <h2>2. Card Details</h2>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4084084084084081"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Month</label>
              <input
                type="text"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                placeholder="12"
                maxLength="2"
              />
            </div>
            <div className="form-group">
              <label>Expiry Year</label>
              <input
                type="text"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                placeholder="25"
                maxLength="2"
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                maxLength="3"
              />
            </div>
          </div>
          <button
            onClick={handleValidateCard}
            disabled={loading || !isInitialized}
            className="btn-secondary"
          >
            Validate Card
          </button>
          {cardValid !== null && (
            <div className={`validation-result ${cardValid ? 'valid' : 'invalid'}`}>
              {cardValid ? `✅ Valid ${cardType} Card` : '❌ Invalid Card'}
            </div>
          )}
        </section>

        {/* Payment Details Section */}
        <section className="card">
          <h2>3. Payment Details</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
            />
          </div>
          <div className="form-group">
            <label>Amount (in kobo)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
            />
            <small>10,000 kobo = ₦100.00</small>
          </div>
        </section>

        {/* Charge Actions Section */}
        <section className="card">
          <h2>4. Process Payment</h2>
          <div className="button-group">
            <button
              onClick={handleChargeCard}
              disabled={loading || !isInitialized}
              className="btn-primary btn-large"
            >
              {loading ? 'Processing...' : 'Charge Card'}
            </button>
            <button
              onClick={handleChargeWithAccessCode}
              disabled={loading || !isInitialized}
              className="btn-secondary"
            >
              Charge with Access Code
            </button>
          </div>
        </section>

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

      

        <footer>
          <p>Built with ❤️ using @tolutronics/capacitor-paystack</p>
        </footer>
      </div>
    </div>
  )
}

export default App
