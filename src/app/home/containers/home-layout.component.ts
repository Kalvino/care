import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { LayoutActions } from '../actions';
import { NotificationActions, NotificationsWsActions } from '../actions';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/user';
import { SocketService } from '../../core/services/socket.service';

/**
 * main layout in logged in state
 */
@Component({
  selector: 'care-home-layout',
  template: `
    <ion-split-pane>
      <ion-menu (ionDidClose)="onMenuClose()">
        <care-menu-header [user]="currentUser"></care-menu-header>
        <ion-content>
          <care-menu></care-menu>
        </ion-content>
      </ion-menu>
      <ion-router-outlet main></ion-router-outlet>
    </ion-split-pane>`
})
export class HomeLayoutComponent implements OnInit, OnDestroy {

  /**
   * showSidenav
   */
  showSidenav;

  /**
   * currentUser current logged in user
   */
  currentUser: User = null;

  /**
   * subscription on new notifications
   */
  private _notificationSubscription;

  /**
   * constructor
   * @param {Store} store
   * @param {Platform} platform
   * @param {ActivatedRoute} route
   * @param {SocketService} socketService
   */
  constructor(
    private store: Store<fromRoot.State>,
    private platform: Platform,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {

    console.log(this.route.snapshot.data);
    this.currentUser = this.route.snapshot.data.currentUser;

    this.store
      .pipe(select(fromRoot.getShowSidenav))
      .subscribe((show) => {
        this.showSidenav = show;
      });

    /**
     * ensure we are stopping websocket when
     * the app goes into background.
     */
    platform.ready().then(() => {
      this.platform.pause.subscribe(() => {
        this._disconnect();
      });

      this.platform.resume.subscribe(() => {
        this._connect();
      });
    });
  }

  /**
   * on close menu
   */
  onMenuClose() {
    if (this.showSidenav) {
      this.store.dispatch(new LayoutActions.CloseSidenav());
    }
  }

  /**
   * on init lifecycle hook
   */
  ngOnInit(): void {
    // next connect to the WS and listen to incoming notifications
    this._connect();

    // subscribe to the incoming notifications stream
    this._notificationSubscription = this.socketService.onNotification()
      .subscribe(notifications => {
        if (notifications) {
          this.store.dispatch(new NotificationsWsActions.IncomingNotifications({notifications}));
        }
      });
  }

  /**
   * on destroy life cycle callback
   */
  ngOnDestroy(): void {
    // disconnect from WS
    this._disconnect();
  }

  /**
   * private function to connect & subscribe to the WS
   * @private
   */
  private _connect() {
    this.store.dispatch(new NotificationsWsActions.ConnectClient());
    this.store.dispatch(new NotificationsWsActions.Subscribe({userId: this.currentUser._id}));
    this.store.dispatch(new NotificationActions.LoadNotifications({userId: this.currentUser._id}));
  }

  /**
   * private function to unsubscribe & disconnect from WS
   * @private
   */
  private _disconnect() {
    this._notificationSubscription.unsubscribe();
    this.store.dispatch(new NotificationActions.StopPollingNotifications());
    this.store.dispatch(new NotificationsWsActions.Unsubscribe({userId: this.currentUser._id}));
    this.store.dispatch(new NotificationsWsActions.DisconnectClient());
  }
}
