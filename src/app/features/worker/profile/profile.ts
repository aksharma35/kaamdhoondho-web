import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../../core/profile/profile.service';

@Component({
  selector: 'app-worker-profile',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './profile.html',
})
export class WorkerProfile {
  readonly profile = inject(ProfileService);
}
