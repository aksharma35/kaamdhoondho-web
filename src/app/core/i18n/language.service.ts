import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'hi' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);

  readonly current = signal<Lang>((localStorage.getItem('lang') as Lang) ?? 'en');

  constructor() {
    this.apply(this.current());
  }

  toggle(): void {
    this.apply(this.current() === 'hi' ? 'en' : 'hi');
  }

  private apply(lang: Lang): void {
    this.current.set(lang);
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }
}
