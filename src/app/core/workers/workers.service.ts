import { Injectable, signal } from '@angular/core';
import { SkillKey } from '../../shared/constants/categories';

export interface Worker {
  id: string;
  name: string;
  age: number;
  category: SkillKey;
  locality: string;
  distanceKm: number;
  expYears: number;
  payPerMonth: number;
  hasVideo: boolean;
  noteKey: string; // i18n key under workers.mock.*
}

const WORKERS: Worker[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    age: 28,
    category: 'electrician',
    locality: 'Delhi',
    distanceKm: 2.1,
    expYears: 5,
    payPerMonth: 18000,
    hasVideo: true,
    noteKey: 'workers.mock.note1',
  },
  {
    id: '2',
    name: 'Sunita Devi',
    age: 34,
    category: 'houseHelp',
    locality: 'Noida',
    distanceKm: 3.4,
    expYears: 8,
    payPerMonth: 12000,
    hasVideo: false,
    noteKey: 'workers.mock.note2',
  },
  {
    id: '3',
    name: 'Manoj Yadav',
    age: 31,
    category: 'driver',
    locality: 'Gurugram',
    distanceKm: 5.6,
    expYears: 6,
    payPerMonth: 20000,
    hasVideo: true,
    noteKey: 'workers.mock.note3',
  },
  {
    id: '4',
    name: 'Anita Sharma',
    age: 26,
    category: 'cook',
    locality: 'Ghaziabad',
    distanceKm: 1.5,
    expYears: 4,
    payPerMonth: 14000,
    hasVideo: false,
    noteKey: 'workers.mock.note4',
  },
  {
    id: '5',
    name: 'Deepak Singh',
    age: 40,
    category: 'carpenter',
    locality: 'Delhi',
    distanceKm: 4.2,
    expYears: 12,
    payPerMonth: 22000,
    hasVideo: true,
    noteKey: 'workers.mock.note5',
  },
  {
    id: '6',
    name: 'Kavita Rani',
    age: 29,
    category: 'painter',
    locality: 'Noida',
    distanceKm: 6.0,
    expYears: 3,
    payPerMonth: 16000,
    hasVideo: false,
    noteKey: 'workers.mock.note6',
  },
];

// ponytail: hardcoded worker list + localStorage shortlist-ids until the backend/matching exists.
@Injectable({ providedIn: 'root' })
export class WorkersService {
  private readonly shortlistedIds = signal<Set<string>>(load());

  workers(): Worker[] {
    return WORKERS;
  }

  shortlist(id: string): void {
    if (this.shortlistedIds().has(id)) return;
    const next = new Set(this.shortlistedIds());
    next.add(id);
    this.shortlistedIds.set(next);
    localStorage.setItem('shortlisted_workers', JSON.stringify([...next]));
  }

  isShortlisted(id: string): boolean {
    return this.shortlistedIds().has(id);
  }
}

function load(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem('shortlisted_workers') ?? '[]'));
  } catch {
    return new Set();
  }
}
