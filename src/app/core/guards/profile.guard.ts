import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../auth/auth.service';
import { ProfileService } from '../profile/profile.service';

/** Redirects to role onboarding until the profile is confirmed. Pair with authGuard. */
export const profileGuard: CanActivateFn = (route) => {
  const profile = inject(ProfileService);
  const router = inject(Router);
  const role = route.data['role'] as Role;
  return profile.isComplete(role) ? true : router.createUrlTree(['/onboarding', role]);
};
