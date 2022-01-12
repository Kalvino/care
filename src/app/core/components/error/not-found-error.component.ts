import { Component } from '@angular/core';

/**
 * render a 404 not found page
 */
@Component({
  selector: 'care-not-found-error',
  template: `
    <h1>Sorry, the page is not available</h1>
    <a [routerLink]="['/']">{{'BACK' | translate}}</a>
  `
})
export class NotFoundErrorComponent {}
