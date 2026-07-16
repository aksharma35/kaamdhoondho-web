import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PostedJob, PostedJobsService } from '../../../core/jobs/posted-jobs.service';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';
import { Worker } from '../../../core/workers/workers.service';
import { WorkerDetail } from '../worker-detail/worker-detail';

@Component({
  selector: 'app-my-jobs',
  imports: [TranslatePipe, RouterLink, WorkerDetail],
  templateUrl: './my-jobs.html',
})
export class MyJobs {
  private postedJobsService = inject(PostedJobsService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  readonly jobs = computed(() => this.postedJobsService.postedJobs());
  readonly expandedId = signal<string | null>(null);
  readonly selectedWorker = signal<Worker | null>(null);

  emoji(job: PostedJob): string {
    return this.categoryEmoji.get(job.category) ?? '💼';
  }

  toggle(id: string): void {
    this.expandedId.update((cur) => (cur === id ? null : id));
  }

  applicants(job: PostedJob): Worker[] {
    return this.postedJobsService.applicants(job);
  }

  openProfile(worker: Worker): void {
    this.selectedWorker.set(worker);
  }
}
