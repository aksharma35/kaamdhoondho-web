import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { profileGuard } from './core/guards/profile.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public-shell/public-shell').then((m) => m.PublicShell),
    children: [
      {
        path: '',
        title: 'Kaamdhoondo · कामढूंढो — Find Work. Find Workers.',
        loadComponent: () => import('./features/public/landing/landing').then((m) => m.Landing),
      },
    ],
  },
  {
    path: 'auth/login',
    title: 'Login — Kaamdhoondo',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'onboarding/worker',
    canActivate: [authGuard],
    title: 'Create your profile — Kaamdhoondo',
    loadComponent: () =>
      import('./features/worker/onboarding/worker-onboarding').then((m) => m.WorkerOnboarding),
  },
  {
    path: 'onboarding/employer',
    canActivate: [authGuard],
    title: 'Create your account — Kaamdhoondo',
    loadComponent: () =>
      import('./features/employer/onboarding/employer-onboarding').then(
        (m) => m.EmployerOnboarding,
      ),
  },
  {
    path: 'worker',
    canActivate: [authGuard, profileGuard],
    data: { role: 'worker' },
    title: 'Find Work — Kaamdhoondo',
    loadComponent: () => import('./features/worker/home/worker-home').then((m) => m.WorkerHome),
  },
  {
    path: 'employer',
    canActivate: [authGuard, profileGuard],
    data: { role: 'employer' },
    title: 'Marketplace — Kaamdhoondo',
    loadComponent: () =>
      import('./features/employer/home/employer-home').then((m) => m.EmployerHome),
  },
  { path: '**', redirectTo: '' },
];
