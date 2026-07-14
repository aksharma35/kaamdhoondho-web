import {
  Component,
  DestroyRef,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService, Role } from '../../../core/auth/auth.service';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

@Component({
  selector: 'app-login',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './login.html',
})
export class Login {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  @ViewChildren('otpBox') private otpBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  readonly role: Role =
    this.route.snapshot.queryParamMap.get('role') === 'employer' ? 'employer' : 'worker';

  readonly step = signal<'phone' | 'otp'>('phone');
  readonly error = signal(false);
  readonly phone = signal('');
  readonly digits = signal<string[]>(Array(OTP_LENGTH).fill(''));
  readonly otpError = signal(false);
  readonly verifying = signal(false);
  readonly resendSeconds = signal(RESEND_SECONDS);

  private resendTimer?: ReturnType<typeof setInterval>;

  constructor() {
    this.destroyRef.onDestroy(() => clearInterval(this.resendTimer));
  }

  get formattedPhone(): string {
    const p = this.phone();
    return `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
  }

  continue(phoneValue: string): void {
    const trimmed = phoneValue.trim();
    if (!/^[6-9]\d{9}$/.test(trimmed)) {
      this.error.set(true);
      return;
    }
    this.error.set(false);
    this.phone.set(trimmed);
    this.digits.set(Array(OTP_LENGTH).fill(''));
    this.otpError.set(false);
    this.step.set('otp');
    this.startResendTimer();
    setTimeout(() => this.otpBoxes?.first?.nativeElement.focus());
  }

  changeNumber(): void {
    clearInterval(this.resendTimer);
    this.step.set('phone');
  }

  onDigitInput(index: number, value: string): void {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...this.digits()];
    next[index] = digit;
    this.digits.set(next);
    this.otpError.set(false);
    if (digit && index < OTP_LENGTH - 1) {
      this.otpBoxes.get(index + 1)?.nativeElement.focus();
    }
  }

  onDigitKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digits()[index] && index > 0) {
      this.otpBoxes.get(index - 1)?.nativeElement.focus();
    } else if (event.key === 'Enter') {
      this.verify();
    }
  }

  onDigitPaste(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    event.preventDefault();
    const next = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    this.digits.set(next);
    this.otpBoxes.get(Math.min(pasted.length, OTP_LENGTH) - 1)?.nativeElement.focus();
  }

  resend(): void {
    // ponytail: mock resend — just restarts the countdown, becomes a real "request OTP" API call
    this.startResendTimer();
  }

  verify(): void {
    if (this.verifying()) return;
    const code = this.digits().join('');
    if (code.length !== OTP_LENGTH) {
      this.otpError.set(true);
      return;
    }
    this.otpError.set(false);
    this.verifying.set(true);
    // ponytail: mock verify — accepts any 6-digit code after a fake delay, becomes a real "verify OTP" API call
    setTimeout(() => {
      this.verifying.set(false);
      this.auth.login(this.role);
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigateByUrl(returnUrl ?? `/${this.role}`);
    }, 600);
  }

  private startResendTimer(): void {
    clearInterval(this.resendTimer);
    this.resendSeconds.set(RESEND_SECONDS);
    this.resendTimer = setInterval(() => {
      this.resendSeconds.update((s) => {
        if (s <= 1) {
          clearInterval(this.resendTimer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }
}
