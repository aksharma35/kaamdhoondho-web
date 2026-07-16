import { Injectable } from '@angular/core';

interface HireOutcome {
  workerId: string;
  hired: boolean;
  at: string;
}

// ponytail: localStorage log of hire outcomes until the backend/RFQ pipeline exists to
// consume them and close the loop with the employer's job posting.
@Injectable({ providedIn: 'root' })
export class HireOutcomeService {
  recordOutcome(workerId: string, hired: boolean): void {
    const log: HireOutcome[] = JSON.parse(localStorage.getItem('hire_outcomes') ?? '[]');
    log.push({ workerId, hired, at: new Date().toISOString() });
    localStorage.setItem('hire_outcomes', JSON.stringify(log));
  }
}
