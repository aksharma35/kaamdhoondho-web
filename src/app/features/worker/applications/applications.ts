import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Job, JobsService } from '../../../core/jobs/jobs.service';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';

@Component({
  selector: 'app-applications',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './applications.html',
})
export class Applications {
  private jobsService = inject(JobsService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  readonly applied = this.jobsService.appliedJobs;

  emoji(job: Job): string {
    return this.categoryEmoji.get(job.category) ?? '💼';
  }
}
