import { Component, HostListener, input, output } from '@angular/core';

/**
 * Reusable overlay: bottom sheet below `lg`, centered modal on `lg+`.
 * Closes on overlay click or Escape. Project content via <ng-content>.
 */
@Component({
  selector: 'app-sheet',
  imports: [],
  templateUrl: './sheet.html',
})
export class Sheet {
  readonly open = input(false);
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
