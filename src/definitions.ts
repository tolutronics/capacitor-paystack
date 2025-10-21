export enum BearerEnum {
  ACCOUNT = 'ACCOUNT',
  SUBACCOUNT = 'SUBACCOUNT',
}

export interface Transaction {
  /**
   * The transaction reference returned by Paystack
   */
  reference: string;
}

export interface PaystackCard {
  [key: string]: any;
}

export interface JSONObject {
  [key: string]: any;
}

export interface InitializeOptions {
  /**
   * Your Paystack public key from your Paystack dashboard
   */
  publicKey: string;
}

export interface InitializeResult {
  /**
   * Whether the SDK was successfully initialized
   */
  initialized: boolean;
}

export interface CardDetails {
  /**
   * The card number (without spaces or dashes)
   */
  cardNumber: string;
  /**
   * The expiry month (MM format, e.g., "12")
   */
  expiryMonth: string;
  /**
   * The expiry year (YY or YYYY format, e.g., "25" or "2025")
   */
  expiryYear: string;
  /**
   * The card CVV/CVC security code
   */
  cvv: string;
}

export interface CardValidationResult {
  /**
   * Whether the card details are valid
   */
  is_valid: boolean;
}

export interface CardTypeResult {
  /**
   * The card type (e.g., "Visa", "Mastercard")
   */
  card_type: string;
}

export interface EmailOptions {
  /**
   * The customer's email address
   */
  email: string;
}

export interface AmountOptions {
  /**
   * The amount to charge in the smallest currency unit (e.g., kobo for NGN)
   */
  amount: string;
}

export interface AccessCodeOptions {
  /**
   * The access code generated from your backend
   */
  accessCode: string;
}

export interface PaystackCapacitorPlugin {
  /**
   * Initialize the Paystack SDK with your public key
   *
   * @param options - Configuration options containing your public key
   * @returns Promise resolving to initialization result
   * @since 1.0.0
   */
  initialize(options: InitializeOptions): Promise<InitializeResult>;

  /**
   * Add card details for the transaction
   *
   * @param cardDetails - The customer's card information
   * @returns Promise resolving when card is added
   * @since 1.0.0
   */
  addCard(cardDetails: CardDetails): Promise<void>;

  /**
   * Validate the card details that were previously added
   *
   * @returns Promise resolving to validation result
   * @since 1.0.0
   */
  validateCard(): Promise<CardValidationResult>;

  /**
   * Charge the card with the configured transaction details
   *
   * @returns Promise resolving to transaction reference
   * @since 1.0.0
   */
  chargeCard(): Promise<Transaction>;

  /**
   * Add additional parameters to the charge
   *
   * @param parameters - Key-value pairs of additional parameters
   * @returns Promise resolving when parameters are added
   * @since 1.0.0
   */
  addChargeParameters(parameters: { [key: string]: string }): Promise<void>;

  /**
   * Get the type of the card that was added
   *
   * @returns Promise resolving to card type information
   * @since 1.0.0
   */
  getCardType(): Promise<CardTypeResult>;

  /**
   * Add metadata to the charge
   *
   * @param metadata - Key-value pairs of metadata
   * @returns Promise resolving when metadata is added
   * @since 1.0.0
   */
  putChargeMetadata(metadata: { [key: string]: string }): Promise<void>;

  /**
   * Add custom fields to the charge
   *
   * @param customFields - Key-value pairs of custom fields
   * @returns Promise resolving when custom fields are added
   * @since 1.0.0
   */
  putChargeCustomFields(customFields: { [key: string]: string }): Promise<void>;

  /**
   * Set the customer email for the transaction
   *
   * @param options - Email configuration
   * @returns Promise resolving when email is set
   * @since 1.0.0
   */
  setChargeEmail(options: EmailOptions): Promise<void>;

  /**
   * Set the amount to charge
   *
   * @param options - Amount configuration
   * @returns Promise resolving when amount is set
   * @since 1.0.0
   */
  setChargeAmount(options: AmountOptions): Promise<void>;

  /**
   * Set the access code for the transaction
   *
   * @param options - Access code configuration
   * @returns Promise resolving when access code is set
   * @since 1.0.0
   */
  setAccessCode(options: AccessCodeOptions): Promise<void>;
}
