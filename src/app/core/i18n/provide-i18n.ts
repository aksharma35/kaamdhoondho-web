import { HttpClient } from '@angular/common/http';
import { inject, Provider } from '@angular/core';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from './translate-http-loader';

/** English is the default; Hindi via the EN|HI toggle. See RFQ §5.2. */
export function provideI18n(): Provider[] {
  return provideTranslateService({
    lang: 'en',
    fallbackLang: 'en',
    loader: provideTranslateLoader(() => new TranslateHttpLoader(inject(HttpClient))),
  });
}
