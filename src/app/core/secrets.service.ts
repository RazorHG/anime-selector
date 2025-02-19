import { InjectionToken } from '@angular/core';

export interface Secrets {
  clientID: string;
}
export const SECRETS = new InjectionToken<Secrets>('secrets');