import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SKILL_CATEGORIES } from '../../../shared/constants/categories';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './landing.html',
})
export class Landing {
  readonly categories = SKILL_CATEGORIES;

  readonly steps = [1, 2, 3, 4];

  readonly stories = [
    { emoji: '👩🏽', i: 1 },
    { emoji: '👨🏽', i: 2 },
    { emoji: '👩🏾', i: 3 },
  ];
}
