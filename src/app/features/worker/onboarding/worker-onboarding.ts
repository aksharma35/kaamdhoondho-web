import { Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/i18n/language.service';
import { ProfileService } from '../../../core/profile/profile.service';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';

type SkillMode = 'type' | 'video';
type VideoState = 'choose' | 'recording' | 'preview' | 'processing';

@Component({
  selector: 'app-worker-onboarding',
  imports: [TranslatePipe],
  templateUrl: './worker-onboarding.html',
})
export class WorkerOnboarding implements OnDestroy {
  private router = inject(Router);
  readonly profile = inject(ProfileService);
  readonly lang = inject(LanguageService);
  readonly categories = SKILL_CATEGORIES;

  readonly step = signal(1); // 1 basic, 2 skills, 3 preview, 4 success
  readonly mode = signal<SkillMode>('type');
  readonly error = signal('');
  readonly aiFilled = signal(false);

  // video state
  readonly videoState = signal<VideoState>('choose');
  readonly videoUrl = signal<string | null>(null);
  private liveVideo = viewChild<ElementRef<HTMLVideoElement>>('live');
  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  // --- navigation ---

  back(): void {
    if (this.step() > 1 && this.step() < 4) {
      this.step.update((s) => s - 1);
    } else {
      this.router.navigateByUrl('/');
    }
    this.error.set('');
  }

  submitBasics(name: string, age: string, locality: string): void {
    if (!name.trim() || !locality.trim()) {
      this.error.set('onb.errRequired');
      return;
    }
    this.profile.saveWorker({ name: name.trim(), age: age.trim(), locality: locality.trim() });
    this.error.set('');
    this.step.set(2);
  }

  captureLocation(): void {
    navigator.geolocation?.getCurrentPosition(
      () => this.profile.saveWorker({ gps: true }),
      () => this.profile.saveWorker({ gps: false }),
    );
  }

  toggleSkill(key: string): void {
    const skills = this.profile.worker().skills;
    this.profile.saveWorker({
      skills: skills.includes(key) ? skills.filter((s) => s !== key) : [...skills, key],
    });
    this.error.set('');
  }

  submitSkills(expYears: string, pay: string, note: string): void {
    if (this.profile.worker().skills.length === 0) {
      this.error.set('onb.errSkill');
      return;
    }
    this.profile.saveWorker({ expYears: expYears.trim(), pay: pay.trim(), note: note.trim() });
    this.error.set('');
    this.step.set(3);
  }

  confirm(): void {
    this.profile.complete('worker');
    this.step.set(4);
  }

  finish(): void {
    this.router.navigateByUrl('/worker');
  }

  // --- video mode ---

  setMode(mode: SkillMode): void {
    this.mode.set(mode);
    this.error.set('');
  }

  onFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.setVideoUrl(URL.createObjectURL(file));
  }

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      this.videoState.set('recording');
      // let the template render the <video #live> first
      setTimeout(() => {
        const el = this.liveVideo()?.nativeElement;
        if (el) el.srcObject = this.stream;
      });
      this.chunks = [];
      this.recorder = new MediaRecorder(this.stream);
      this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
      this.recorder.onstop = () => {
        this.setVideoUrl(URL.createObjectURL(new Blob(this.chunks, { type: 'video/webm' })));
        this.stopStream();
      };
      this.recorder.start();
    } catch {
      this.error.set('onb.errCamera');
      this.videoState.set('choose');
    }
  }

  stopRecording(): void {
    this.recorder?.stop();
  }

  retake(): void {
    this.clearVideo();
    this.videoState.set('choose');
  }

  async useVideo(): Promise<void> {
    this.videoState.set('processing');
    const extracted = await this.profile.extractFromVideo();
    // extraction only fills blanks — never overwrites what the user typed
    const d = this.profile.worker();
    this.profile.saveWorker({
      name: d.name || extracted.name || '',
      age: d.age || extracted.age || '',
      expYears: d.expYears || extracted.expYears || '',
      skills: [...new Set([...d.skills, ...(extracted.skills ?? [])])],
      hasVideo: true,
    });
    this.aiFilled.set(true);
    this.mode.set('type'); // review the AI-filled fields in the typed form
    this.videoState.set('choose');
  }

  private setVideoUrl(url: string): void {
    this.clearVideo();
    this.videoUrl.set(url);
    this.videoState.set('preview');
  }

  private clearVideo(): void {
    const url = this.videoUrl();
    if (url) URL.revokeObjectURL(url);
    this.videoUrl.set(null);
  }

  private stopStream(): void {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }

  ngOnDestroy(): void {
    this.stopStream();
    this.clearVideo();
  }
}
