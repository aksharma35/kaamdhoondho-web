import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';
import { Worker, WorkersService } from '../../../core/workers/workers.service';
import { WorkerDetail } from '../worker-detail/worker-detail';

@Component({
  selector: 'app-marketplace',
  imports: [TranslatePipe, DecimalPipe, WorkerDetail],
  templateUrl: './marketplace.html',
})
export class Marketplace {
  private workersService = inject(WorkersService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  // session-only: passed workers return on reload, shortlisted ones don't
  private passedIds = signal<Set<string>>(new Set());
  readonly selectedWorker = signal<Worker | null>(null);

  readonly queue = computed(() =>
    this.workersService
      .workers()
      .filter((w) => !this.workersService.isShortlisted(w.id) && !this.passedIds().has(w.id)),
  );
  /** Mobile single-card stack shows the head of the queue. */
  readonly current = computed<Worker | undefined>(() => this.queue()[0]);

  emoji(worker: Worker): string {
    return this.categoryEmoji.get(worker.category) ?? '👷';
  }

  pass(worker: Worker): void {
    const next = new Set(this.passedIds());
    next.add(worker.id);
    this.passedIds.set(next);
  }

  shortlist(worker: Worker): void {
    this.workersService.shortlist(worker.id);
  }

  openDetail(worker: Worker): void {
    this.selectedWorker.set(worker);
  }
}
