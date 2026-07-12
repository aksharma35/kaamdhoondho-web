import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './landing.html',
})
export class Landing {
  readonly categories = [
    { emoji: '🔨', key: 'carpenter' },
    { emoji: '🧹', key: 'houseHelp' },
    { emoji: '🚗', key: 'driver' },
    { emoji: '🍳', key: 'cook' },
    { emoji: '💡', key: 'electrician' },
    { emoji: '🛡️', key: 'securityGuard' },
    { emoji: '🌱', key: 'gardener' },
    { emoji: '🏋️', key: 'coach' },
    { emoji: '🔧', key: 'plumber' },
    { emoji: '🎨', key: 'painter' },
  ];

  readonly steps = [1, 2, 3, 4];

  readonly stories = [
    { emoji: '👩🏽', i: 1 },
    { emoji: '👨🏽', i: 2 },
    { emoji: '👩🏾', i: 3 },
  ];
}
