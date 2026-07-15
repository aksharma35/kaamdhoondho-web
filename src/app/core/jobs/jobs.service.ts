import { Injectable, computed, signal } from '@angular/core';
import { SkillKey } from '../../shared/constants/categories';

export interface Job {
  id: string;
  category: SkillKey;
  employerName: string;
  locality: string;
  payPerMonth: number;
  distanceKm: number;
  postedDaysAgo: number;
  note: string; // i18n key under jobs.mock.*
}

const JOBS: Job[] = [
  {
    id: '1',
    category: 'electrician',
    employerName: 'Sharma Electricals',
    locality: 'Delhi',
    payPerMonth: 18000,
    distanceKm: 2.5,
    postedDaysAgo: 1,
    note: 'jobs.mock.note1',
  },
  {
    id: '2',
    category: 'cook',
    employerName: 'Gupta Restaurant',
    locality: 'Noida',
    payPerMonth: 15000,
    distanceKm: 4.1,
    postedDaysAgo: 2,
    note: 'jobs.mock.note2',
  },
  {
    id: '3',
    category: 'houseHelp',
    employerName: 'Verma Home Services',
    locality: 'Ghaziabad',
    payPerMonth: 12000,
    distanceKm: 1.8,
    postedDaysAgo: 3,
    note: 'jobs.mock.note3',
  },
  {
    id: '4',
    category: 'driver',
    employerName: 'Kapoor Logistics',
    locality: 'Gurugram',
    payPerMonth: 22000,
    distanceKm: 6.3,
    postedDaysAgo: 1,
    note: 'jobs.mock.note4',
  },
  {
    id: '5',
    category: 'carpenter',
    employerName: 'Singh Furniture Works',
    locality: 'Delhi',
    payPerMonth: 20000,
    distanceKm: 3.4,
    postedDaysAgo: 5,
    note: 'jobs.mock.note5',
  },
  {
    id: '6',
    category: 'painter',
    employerName: 'Mehta Interiors',
    locality: 'Noida',
    payPerMonth: 16000,
    distanceKm: 5.0,
    postedDaysAgo: 4,
    note: 'jobs.mock.note6',
  },
];

// ponytail: hardcoded job list + localStorage applied-ids until the backend/matching exists.
@Injectable({ providedIn: 'root' })
export class JobsService {
  private readonly appliedIds = signal<Set<string>>(load());

  jobs(): Job[] {
    return JOBS;
  }

  readonly appliedJobs = computed(() =>
    JOBS.filter((j) => this.appliedIds().has(j.id)),
  );

  apply(id: string): void {
    if (this.appliedIds().has(id)) return;
    const next = new Set(this.appliedIds());
    next.add(id);
    this.appliedIds.set(next);
    localStorage.setItem('applied_jobs', JSON.stringify([...next]));
  }

  isApplied(id: string): boolean {
    return this.appliedIds().has(id);
  }
}

function load(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem('applied_jobs') ?? '[]'));
  } catch {
    return new Set();
  }
}
