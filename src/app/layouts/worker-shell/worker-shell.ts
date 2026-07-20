import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/auth.service';

const TABS = [
  { path: '/worker', icon: '💼', label: 'tabs.findWork' },
  { path: '/worker/applications', icon: '📋', label: 'tabs.applications' },
  { path: '/worker/profile', icon: '👤', label: 'tabs.profile' },
  { path: '/worker/settings', icon: '⚙️', label: 'tabs.settings' },
] as const;

@Component({
  selector: 'app-worker-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './worker-shell.html',
})
export class WorkerShell {
  readonly tabs = TABS;
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
