import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PostedJobsService } from '../../../core/jobs/posted-jobs.service';
import { ProfileService } from '../../../core/profile/profile.service';
import { SKILL_CATEGORIES, SkillKey } from '../../../shared/constants/categories';

@Component({
  selector: 'app-post-job',
  imports: [TranslatePipe],
  templateUrl: './post-job.html',
})
export class PostJob {
  private router = inject(Router);
  private postedJobsService = inject(PostedJobsService);
  readonly profile = inject(ProfileService);
  readonly categories = SKILL_CATEGORIES;

  readonly step = signal<'form' | 'success'>('form');
  readonly category = signal<SkillKey | null>(null);
  readonly error = signal('');

  selectCategory(key: SkillKey): void {
    this.category.set(key);
    this.error.set('');
  }

  submit(headcount: string, pay: string, locality: string, note: string): void {
    const cat = this.category();
    const hc = Number(headcount);
    const p = Number(pay);
    if (!cat || !hc || hc < 1 || !p || p < 1 || !locality.trim()) {
      this.error.set('postJob.errRequired');
      return;
    }
    this.postedJobsService.post({
      category: cat,
      headcount: hc,
      payPerMonth: p,
      locality: locality.trim(),
      note: note.trim(),
    });
    this.error.set('');
    this.step.set('success');
  }

  viewMyJobs(): void {
    this.router.navigateByUrl('/employer/my-jobs');
  }

  postAnother(): void {
    this.category.set(null);
    this.error.set('');
    this.step.set('form');
  }
}
