import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Job, JobsService } from '../../../core/jobs/jobs.service';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';

@Component({
  selector: 'app-find-work',
  imports: [TranslatePipe, DecimalPipe],
  templateUrl: './find-work.html',
})
export class FindWork {
  private jobsService = inject(JobsService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  private index = signal(0);

  readonly queue = computed(() =>
    this.jobsService.jobs().filter((j) => !this.jobsService.isApplied(j.id)),
  );
  readonly current = computed<Job | undefined>(() => this.queue()[this.index()]);

  emoji(job: Job): string {
    return this.categoryEmoji.get(job.category) ?? '💼';
  }

  pass(): void {
    this.index.update((i) => i + 1);
  }

  interested(job: Job): void {
    this.jobsService.apply(job.id);
    // queue shrinks by one now that this job is applied — stay at the same index
  }
}
