import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-public-footer',
  imports: [TranslatePipe],
  templateUrl: './public-footer.html',
})
export class PublicFooter {
  readonly lang = inject(LanguageService);
}
