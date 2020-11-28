/*
 * Copyright (c) 2019. The content in this file is Protected by the copyright laws of kenya and owned by Re.Kast Limited.
 * Reproducing it in any way or using it without permission from Re.Kast Limited will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule).catch(error => console.error(error));
