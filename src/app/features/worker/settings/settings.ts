import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/auth/auth.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-worker-settings',
  imports: [TranslatePipe],
  templateUrl: './settings.html',
})
export class WorkerSettings {
  readonly lang = inject(LanguageService);
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
