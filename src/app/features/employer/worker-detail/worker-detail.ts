import { DecimalPipe } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HireOutcomeService } from '../../../core/hire/hire-outcome.service';
import { Worker, WorkersService } from '../../../core/workers/workers.service';
import { Sheet } from '../../../shared/components/sheet/sheet';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';

type View = 'profile' | 'contact' | 'hired';

@Component({
  selector: 'app-worker-detail',
  imports: [Sheet, TranslatePipe, DecimalPipe],
  templateUrl: './worker-detail.html',
})
export class WorkerDetail {
  private workersService = inject(WorkersService);
  private hireOutcomeService = inject(HireOutcomeService);
  private categoryEmoji = new Map(SKILL_CATEGORIES.map((c) => [c.key, c.emoji]));

  readonly worker = input<Worker | null>(null);
  readonly closed = output<void>();

  readonly view = signal<View>('profile');
  readonly askedHired = signal(false);

  // ponytail: mock masked number until a telephony/masking service exists behind the API
  readonly maskedNumber = '+91 98XXX XX210';
  readonly mockPhone = '+919800000210';

  constructor() {
    effect(() => {
      if (this.worker()) {
        this.view.set('profile');
        this.askedHired.set(false);
      }
    });
  }

  emoji(worker: Worker): string {
    return this.categoryEmoji.get(worker.category) ?? '👷';
  }

  shortlistWorker(worker: Worker): void {
    this.workersService.shortlist(worker.id);
    this.close();
  }

  openContact(): void {
    this.view.set('contact');
  }

  callNow(): void {
    this.askedHired.set(true);
  }

  markHired(worker: Worker): void {
    this.hireOutcomeService.recordOutcome(worker.id, true);
    this.view.set('hired');
  }

  dismissHirePrompt(): void {
    this.askedHired.set(false);
  }

  close(): void {
    this.closed.emit();
  }
}
