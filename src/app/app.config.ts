import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainerService } from './shared/service/customoverlay/custom-overlay-container.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: OverlayContainer, useClass: CustomOverlayContainerService },
  ],
};
