import { Component } from '@angular/core';

/**
 * render a default error page
 */
@Component({
  selector: 'care-default-error',
  template: `
    <h1>{{'DEFAULT_ERROR' | translate}}</h1>
    <a [routerLink]="['/']">{{'BACK' | translate}}</a>
  `
})
export class DefaultErrorComponent {
}
