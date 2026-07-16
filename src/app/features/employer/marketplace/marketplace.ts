import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';
import { Worker, WorkersService } from '../../../core/workers/workers.service';

@Component({
  selector: 'app-marketplace',
  imports: [TranslatePipe, DecimalPipe],
  templateUrl: './marketplace.html',
})
export class Marketplace {
  private workersService = inject(WorkersService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  private index = signal(0);

  readonly queue = computed(() =>
    this.workersService.workers().filter((w) => !this.workersService.isShortlisted(w.id)),
  );
  readonly current = computed<Worker | undefined>(() => this.queue()[this.index()]);

  emoji(worker: Worker): string {
    return this.categoryEmoji.get(worker.category) ?? '👷';
  }

  pass(): void {
    this.index.update((i) => i + 1);
  }

  shortlist(worker: Worker): void {
    this.workersService.shortlist(worker.id);
    // queue shrinks by one now that this worker is shortlisted — stay at the same index
  }
}
