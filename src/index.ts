import { registerPlugin } from '@capacitor/core';

import type { PaystackCapacitorPlugin } from './definitions';

const PaystackCapacitor = registerPlugin<PaystackCapacitorPlugin>('PaystackCapacitor', {
  web: () => import('./web').then((m) => new m.PaystackCapacitorWeb()),
});

export * from './definitions';
export { PaystackCapacitor };
