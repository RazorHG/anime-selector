import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Secrets, SECRETS } from './core/secrets.service';
import { CLIENT_ID } from '../../secrets';

const MY_SECRETS: Secrets = {
  clientID: CLIENT_ID,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: SECRETS, useValue: MY_SECRETS},
  ],
};
