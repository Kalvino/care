import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../reducers';
import { NotificationActions } from '../../actions';

/**
 * Header Component for most of the views in Home-Module
 */
@Component({
  selector: 'care-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <ion-header>
      <ion-toolbar [color]="'primary'">
        <div class="flex">

          <care-menu-button [showBack]="showBack"></care-menu-button>

          <ion-title>
            {{title | translate}}
          </ion-title>

          <care-notification-button
            (showNotifications)="onShowNotifications()"
            *ngIf="(notifications$ | async)?.length > 0"></care-notification-button>

          <ion-buttons slot="end">
            <ng-content></ng-content>
          </ion-buttons>
        </div>
      </ion-toolbar>
    </ion-header>
  `
})
export class HeaderComponent {

  /**
   * title string the page title
   */
  @Input() title;

  /**
   * showBack pass showBack to the care-menu-button to show a 'back'-button
   */
  @Input() showBack = false;

  /**
   * notifications$ subscription to notifications in state
   */
  notifications$ = this.store
    .pipe(
      select(fromHome.getAllNotifications)
    );

  /**
   * constructor
   * @param store
   */
  constructor(private store: Store<fromHome.State>) {
  }

  /**
   * handle click on button Notifications
   */
  onShowNotifications() {
    this.store.dispatch(new NotificationActions.ShowNotifications());
  }
}
