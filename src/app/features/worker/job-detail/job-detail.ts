import { DecimalPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Job, JobsService } from '../../../core/jobs/jobs.service';
import { Sheet } from '../../../shared/components/sheet/sheet';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';

@Component({
  selector: 'app-job-detail',
  imports: [Sheet, TranslatePipe, DecimalPipe],
  templateUrl: './job-detail.html',
})
export class JobDetail {
  private jobsService = inject(JobsService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  readonly job = input<Job | null>(null);
  readonly closed = output<void>();
  readonly passed = output<Job>();

  emoji(job: Job): string {
    return this.categoryEmoji.get(job.category) ?? '💼';
  }

  apply(job: Job): void {
    this.jobsService.apply(job.id);
    this.close();
  }

  pass(job: Job): void {
    this.passed.emit(job);
  }

  close(): void {
    this.closed.emit();
  }
}
