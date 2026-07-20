import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/auth.service';

const TABS = [
  { path: '/employer', icon: '🔍', label: 'tabs.marketplace' },
  { path: '/employer/post-job', icon: '➕', label: 'tabs.postJob' },
  { path: '/employer/my-jobs', icon: '🗂️', label: 'tabs.myJobs' },
  { path: '/employer/settings', icon: '⚙️', label: 'tabs.settings' },
] as const;

@Component({
  selector: 'app-employer-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './employer-shell.html',
})
export class EmployerShell {
  readonly tabs = TABS;
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
