import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Job, JobsService } from '../../../core/jobs/jobs.service';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';
import { JobDetail } from '../job-detail/job-detail';

@Component({
  selector: 'app-find-work',
  imports: [TranslatePipe, DecimalPipe, JobDetail],
  templateUrl: './find-work.html',
})
export class FindWork {
  private jobsService = inject(JobsService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  // session-only: passed jobs return on reload, applied ones don't
  private passedIds = signal<Set<string>>(new Set());
  readonly selectedJob = signal<Job | null>(null);

  readonly queue = computed(() =>
    this.jobsService
      .jobs()
      .filter((j) => !this.jobsService.isApplied(j.id) && !this.passedIds().has(j.id)),
  );
  /** Mobile single-card stack shows the head of the queue. */
  readonly current = computed<Job | undefined>(() => this.queue()[0]);

  emoji(job: Job): string {
    return this.categoryEmoji.get(job.category) ?? '💼';
  }

  pass(job: Job): void {
    const next = new Set(this.passedIds());
    next.add(job.id);
    this.passedIds.set(next);
  }

  interested(job: Job): void {
    this.jobsService.apply(job.id);
  }

  openDetail(job: Job): void {
    this.selectedJob.set(job);
  }

  onPassed(job: Job): void {
    this.pass(job);
    this.selectedJob.set(null);
  }
}
