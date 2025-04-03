import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

// Import de algum tema do @primeng/themes, ex. Aura, Lara, Nora, Material...
// Se quiser trocar de tema, basta mudar aqui (ex: import Lara from '@primeng/themes/lara';)
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      inputVariant: 'outlined', // ou 'filled'
      theme: {
        preset: Aura,            // define o tema principal
        options: {
          prefix: 'p',             // prefixo para classes CSS do PrimeNG
          darkModeSelector: 'system', // se preferir forçar 'light' ou 'dark', pode trocar
          cssLayer: false
        }
      }
    })
  ]
};
