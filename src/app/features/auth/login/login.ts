import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService, Role } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './login.html',
})
export class Login {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  readonly role: Role =
    this.route.snapshot.queryParamMap.get('role') === 'employer' ? 'employer' : 'worker';
  readonly error = signal(false);

  continue(phone: string): void {
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      this.error.set(true);
      return;
    }
    // ponytail: fake session until the phone+OTP backend exists — this becomes "request OTP" then verify
    this.auth.login(this.role);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigateByUrl(returnUrl ?? `/${this.role}`);
  }
}
