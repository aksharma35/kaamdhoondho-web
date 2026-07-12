import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
    path: 'worker',
    canActivate: [authGuard],
    title: 'Find Work — Kaamdhoondo',
    loadComponent: () => import('./features/worker/home/worker-home').then((m) => m.WorkerHome),
  },
  {
    path: 'employer',
    canActivate: [authGuard],
    title: 'Marketplace — Kaamdhoondo',
    loadComponent: () =>
      import('./features/employer/home/employer-home').then((m) => m.EmployerHome),
  },
  { path: '**', redirectTo: '' },
];
