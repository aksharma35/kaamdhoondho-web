import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

const TABS = [
  { path: '', icon: '💼', label: 'tabs.findWork' },
  { path: 'applications', icon: '📋', label: 'tabs.applications' },
  { path: 'profile', icon: '👤', label: 'tabs.profile' },
  { path: 'settings', icon: '⚙️', label: 'tabs.settings' },
] as const;

@Component({
  selector: 'app-worker-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './worker-shell.html',
})
export class WorkerShell {
  readonly tabs = TABS;
}
