import { Injectable, signal } from '@angular/core';
import { Role } from '../auth/auth.service';

export interface WorkerDraft {
  name: string;
  age: string;
  locality: string;
  gps: boolean;
  skills: string[];
  expYears: string;
  pay: string;
  note: string;
  hasVideo: boolean;
}

export interface EmployerDraft {
  name: string;
  kind: 'individual' | 'business';
  locality: string;
}

const EMPTY_WORKER: WorkerDraft = {
  name: '',
  age: '',
  locality: '',
  gps: false,
  skills: [],
  expYears: '',
  pay: '',
  note: '',
  hasVideo: false,
};

const EMPTY_EMPLOYER: EmployerDraft = { name: '', kind: 'individual', locality: '' };

// ponytail: localStorage drafts + canned AI extraction until the backend exists —
// each save becomes an API call, extractFromVideo becomes the STT+LLM pipeline.
@Injectable({ providedIn: 'root' })
export class ProfileService {
  readonly worker = signal<WorkerDraft>(load('worker_draft', EMPTY_WORKER));
  readonly employer = signal<EmployerDraft>(load('employer_draft', EMPTY_EMPLOYER));

  saveWorker(patch: Partial<WorkerDraft>): void {
    this.worker.update((d) => ({ ...d, ...patch }));
    localStorage.setItem('worker_draft', JSON.stringify(this.worker()));
  }

  saveEmployer(patch: Partial<EmployerDraft>): void {
    this.employer.update((d) => ({ ...d, ...patch }));
    localStorage.setItem('employer_draft', JSON.stringify(this.employer()));
  }

  complete(role: Role): void {
    localStorage.setItem(`${role}_complete`, '1');
  }

  isComplete(role: Role): boolean {
    return localStorage.getItem(`${role}_complete`) === '1';
  }

  extractFromVideo(): Promise<Partial<WorkerDraft>> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            name: this.worker().name || 'Ravi Kumar',
            age: '28',
            skills: ['carpenter', 'electrician'],
            expYears: '5',
          }),
        2500,
      ),
    );
  }
}

function load<T>(key: string, empty: T): T {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(key) ?? '{}') };
  } catch {
    return empty;
  }
}
