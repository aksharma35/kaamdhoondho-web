import { HttpClient } from '@angular/common/http';
import { inject, Provider } from '@angular/core';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from './translate-http-loader';

/** Hindi is the default at launch; English is the fallback. See RFQ §5.2. */
export function provideI18n(): Provider[] {
  return provideTranslateService({
    lang: 'hi',
    fallbackLang: 'en',
    loader: provideTranslateLoader(() => new TranslateHttpLoader(inject(HttpClient))),
  });
}
