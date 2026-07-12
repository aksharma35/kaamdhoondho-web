import { Injectable, signal } from '@angular/core';

export type Role = 'worker' | 'employer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ponytail: localStorage fake session until the phone+OTP backend exists — replace with real token handling
  readonly role = signal<Role | null>((localStorage.getItem('role') as Role) ?? null);

  isLoggedIn(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }

  login(role: Role): void {
    localStorage.setItem('auth_token', 'dev');
    localStorage.setItem('role', role);
    this.role.set(role);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    this.role.set(null);
  }
}
