import { WebPlugin } from '@capacitor/core';

import type {
  PaystackCapacitorPlugin,
  InitializeOptions,
  InitializeResult,
  CardDetails,
  CardValidationResult,
  Transaction,
  CardTypeResult,
  EmailOptions,
  AmountOptions,
  AccessCodeOptions,
} from './definitions';

export class PaystackCapacitorWeb
  extends WebPlugin
  implements PaystackCapacitorPlugin
{
  async initialize(options: InitializeOptions): Promise<InitializeResult> {
    console.log('PaystackCapacitor Web: initialize', options);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async addCard(cardDetails: CardDetails): Promise<void> {
    console.log('PaystackCapacitor Web: addCard', cardDetails);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async validateCard(): Promise<CardValidationResult> {
    console.log('PaystackCapacitor Web: validateCard');
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async chargeCard(): Promise<Transaction> {
    console.log('PaystackCapacitor Web: chargeCard');
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async addChargeParameters(parameters: {
    [key: string]: string;
  }): Promise<void> {
    console.log('PaystackCapacitor Web: addChargeParameters', parameters);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async getCardType(): Promise<CardTypeResult> {
    console.log('PaystackCapacitor Web: getCardType');
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async putChargeMetadata(metadata: { [key: string]: string }): Promise<void> {
    console.log('PaystackCapacitor Web: putChargeMetadata', metadata);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async putChargeCustomFields(customFields: {
    [key: string]: string;
  }): Promise<void> {
    console.log('PaystackCapacitor Web: putChargeCustomFields', customFields);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async setChargeEmail(options: EmailOptions): Promise<void> {
    console.log('PaystackCapacitor Web: setChargeEmail', options);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async setChargeAmount(options: AmountOptions): Promise<void> {
    console.log('PaystackCapacitor Web: setChargeAmount', options);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }

  async setAccessCode(options: AccessCodeOptions): Promise<void> {
    console.log('PaystackCapacitor Web: setAccessCode', options);
    throw this.unimplemented('Web implementation not available. Paystack requires native implementation.');
  }
}
