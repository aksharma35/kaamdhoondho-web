import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(translate: TranslateService) {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      translate.use(savedLang);
    }
  }
}
