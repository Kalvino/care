import { Component, EventEmitter, Output } from '@angular/core';

/**
 * the notification button
 * indicates that there are some new events / notifications
 * for a user. Shown in the app-header
 */
@Component({
  selector: 'care-notification-button',
  template: `
    <ion-buttons slot="end">
      <ion-button (click)="showNotifications.emit()" id="notificationButton">
        <ion-icon name="notifications-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class NotificationButtonComponent {

  /**
   * showNotifications event emitter, when the button is pressed
   */
  @Output() showNotifications = new EventEmitter();

}
