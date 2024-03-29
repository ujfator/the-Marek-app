import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { persistState } from '@datorama/akita';

if (environment.production) {
	enableProdMode();
}

persistState({ storage: sessionStorage });

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
