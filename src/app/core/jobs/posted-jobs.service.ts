import { Injectable, inject, signal } from '@angular/core';
import { SkillKey } from '../../shared/constants/categories';
import { Worker, WorkersService } from '../workers/workers.service';

export interface PostedJob {
  id: string;
  category: SkillKey;
  headcount: number;
  payPerMonth: number;
  locality: string;
  note: string;
  createdDaysAgo: number;
}

// ponytail: localStorage posted-jobs list until the backend exists — applicants() is a static
// category match against WorkersService, replace with real matching once that's a real query.
@Injectable({ providedIn: 'root' })
export class PostedJobsService {
  private workersService = inject(WorkersService);
  private readonly jobs = signal<PostedJob[]>(load());

  postedJobs(): PostedJob[] {
    return this.jobs();
  }

  post(job: Omit<PostedJob, 'id' | 'createdDaysAgo'>): void {
    const next = [{ ...job, id: crypto.randomUUID(), createdDaysAgo: 0 }, ...this.jobs()];
    this.jobs.set(next);
    localStorage.setItem('posted_jobs', JSON.stringify(next));
  }

  applicants(job: PostedJob): Worker[] {
    const all = this.workersService.workers();
    const matches = all.filter((w) => w.category === job.category);
    const others = all.filter((w) => w.category !== job.category);
    // pad with other workers so a rare category still shows 2-3 applicants
    return [...matches, ...others].slice(0, 3);
  }
}

function load(): PostedJob[] {
  try {
    return JSON.parse(localStorage.getItem('posted_jobs') ?? '[]');
  } catch {
    return [];
  }
}
