import { Component } from '@angular/core';

/**
 * parent component for error pages to
 * allow separate layout
 */
@Component({
  selector: 'care-error-layout',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>`
})
export class ErrorLayoutComponent {
}
