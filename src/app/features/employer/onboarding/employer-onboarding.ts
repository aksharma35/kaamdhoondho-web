import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/i18n/language.service';
import { ProfileService } from '../../../core/profile/profile.service';

@Component({
  selector: 'app-employer-onboarding',
  imports: [TranslatePipe],
  templateUrl: './employer-onboarding.html',
})
export class EmployerOnboarding {
  private router = inject(Router);
  readonly profile = inject(ProfileService);
  readonly lang = inject(LanguageService);

  readonly step = signal(1); // 1 details, 2 preview, 3 success
  readonly error = signal('');

  back(): void {
    if (this.step() === 2) this.step.set(1);
    else this.router.navigateByUrl('/');
    this.error.set('');
  }

  setKind(kind: 'individual' | 'business'): void {
    this.profile.saveEmployer({ kind });
  }

  submitDetails(name: string, locality: string): void {
    if (!name.trim() || !locality.trim()) {
      this.error.set('onb.errRequired');
      return;
    }
    this.profile.saveEmployer({ name: name.trim(), locality: locality.trim() });
    this.error.set('');
    this.step.set(2);
  }

  confirm(): void {
    this.profile.complete('employer');
    this.step.set(3);
  }

  finish(): void {
    this.router.navigateByUrl('/employer');
  }
}
