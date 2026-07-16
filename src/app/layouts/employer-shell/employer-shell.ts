import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

const TABS = [
  { path: '', icon: '🔍', label: 'tabs.marketplace' },
  { path: 'post-job', icon: '➕', label: 'tabs.postJob' },
  { path: 'my-jobs', icon: '🗂️', label: 'tabs.myJobs' },
  { path: 'settings', icon: '⚙️', label: 'tabs.settings' },
] as const;

@Component({
  selector: 'app-employer-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './employer-shell.html',
})
export class EmployerShell {
  readonly tabs = TABS;
}
