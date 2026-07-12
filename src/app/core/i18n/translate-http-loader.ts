import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslateHttpLoader extends TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix = '/i18n/',
    private suffix = '.json',
  ) {
    super();
  }

  override getTranslation(lang: string): Observable<TranslationObject> {
    return this.http.get<TranslationObject>(`${this.prefix}${lang}${this.suffix}`);
  }
}
