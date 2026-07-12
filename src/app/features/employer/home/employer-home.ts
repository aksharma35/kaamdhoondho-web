import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-employer-home',
  imports: [TranslatePipe],
  template: `
    <div class="min-h-screen bg-[#fffbf2]">
      <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-[#d8e8e6]">
        <p class="font-bold text-[#0f5c56]">Kaamdhoondo · कामढूंढो</p>
        <button type="button" (click)="logout()" class="text-sm text-[#6b8280]">
          {{ 'home.logout' | translate }}
        </button>
      </header>
      <main class="flex flex-col items-center justify-center py-32 text-center px-4">
        <p class="text-5xl">🏗️</p>
        <h1 class="font-extrabold text-2xl text-[#1e2d2c] mt-4">
          {{ 'home.employerTitle' | translate }}
        </h1>
        <p class="text-[#6b8280] mt-2">{{ 'home.employerEmpty' | translate }}</p>
      </main>
    </div>
  `,
})
export class EmployerHome {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
