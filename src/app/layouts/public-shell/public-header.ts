import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-public-header',
  imports: [RouterLink],
  templateUrl: './public-header.html',
})
export class PublicHeader {
  readonly lang = inject(LanguageService);
}
