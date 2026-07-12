import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';

@Component({
  selector: 'app-public-shell',
  imports: [RouterOutlet, PublicHeader, PublicFooter],
  template: `
    <app-public-header />
    <main><router-outlet /></main>
    <app-public-footer />
  `,
})
export class PublicShell {}
