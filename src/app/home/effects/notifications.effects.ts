import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  NotificationActions,
  NotificationApiActions,
  NotificationsWsActions,
  PatientPageActions
} from '../actions';
import * as fromAuth from '../../auth/reducers';
import { catchError, delay, exhaustMap, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ModalController, Platform } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import * as fromHome from '../reducers';
import { select, Store } from '@ngrx/store';
import { ModalNotificationsComponent } from '../components/notifications/modal-notifications.component';
import { NotificationService } from '../services/notification.service';
import { SocketService } from '../../core/services/socket.service';
import { CoreActions } from '../../core/actions';


/**
 * set the interval for polling the notifications endpoint
 */
export const NOTIFICATION_POLLING_INTERVAL = 15 * 1000;

/**
 * effects for notifications
 */
@Injectable()
export class NotificationsEffects {

  /**
   * effect to listen on StartPollingNotifications
   * it will also listen for Event StopPollingNotifications in takeUntil
   * this will stop the polling.
   * also we get all notifications in the store (withLatestFrom)
   * and compare them to the received ones. Compare and notify
   * the user if there is a difference
   *
   * @deprecated this method is not necessary as we are now getting data via WebSocket
   */
  @Effect()
  startPolling$ = this.actions$.pipe(
    ofType<NotificationActions.StartPollingNotifications>(NotificationActions.NotificationsActionTypes.StartPollingNotifications),
    map(action => action.payload.user_id),
    exhaustMap((user_id) =>
      timer(0, NOTIFICATION_POLLING_INTERVAL)
        .pipe(
          switchMap((res) => {
            return this.userService.getNotifications(user_id)
              .pipe(
                withLatestFrom(
                  this.store.pipe(select(fromHome.getAllNotifications)),
                  (newEvents, oldEvents) => ({newEvents: newEvents, oldEvents: oldEvents})
                ),
                map(events => {
                  this._checkNewNotifications(events.oldEvents, events.newEvents);
                  return events.newEvents;
                }),
                map((notifications) => {
                  return new NotificationApiActions.PollingNotificationsSuccess({notifications});
                }),
                catchError(httpResponse => {
                  const message = httpResponse.error.error ? httpResponse.error.error.toLowerCase() : '';
                  return of(new NotificationApiActions.PollingNotificationsFailure({message: [message]}));
                })
              );
          }),
          takeUntil(this.actions$.pipe(
            ofType(NotificationActions.NotificationsActionTypes.StopPollingNotifications))
          )
        )
    )
  );

  /**
   * load the notifications once on startup
   * get all notifications in the store (withLatestFrom)
   * and compare them to the received ones. Compare and notify
   * the user if there is a difference
   */
  @Effect()
  loadNotifications$ = this.actions$.pipe(
    ofType<NotificationActions.LoadNotifications>(NotificationActions.NotificationsActionTypes.LoadNotifications),
    map(action => action.payload.userId),
    exhaustMap(userId => {
      return this.userService.getNotifications(userId).pipe(
        withLatestFrom(
          this.store.pipe(select(fromHome.getAllNotifications)),
          (newNotifications, oldNotifications) => ({newNotifications: newNotifications, oldNotifications: oldNotifications})
        ),
        map(notifications => {
          this._checkNewNotifications(notifications.oldNotifications, notifications.newNotifications);
          return notifications.newNotifications;
        }),
        map(notifications => {
          return new NotificationApiActions.LoadNotificationsSuccess({notifications});
        }),
        catchError(httpResponse => {
          const message = httpResponse.error.error ? httpResponse.error.error.toLowerCase() : '';
          return of(new NotificationApiActions.LoadNotificationsFailure({message: [message]}));
        })
      );
    })
  );

  /**
   * listen for the newly received notifications via WS
   * and open the notification modal window
   */
  @Effect()
  incomingNotification$ = this.actions$.pipe(
    ofType<NotificationsWsActions.IncomingNotifications>(NotificationsWsActions.NotificationsWsActionTypes.IncomingNotifications),
    map(action => action.payload.notifications),
    withLatestFrom(
      this.store.pipe(select(fromHome.getAllNotifications)),
      (newNotifications, oldNotifications) => ({newNotifications: newNotifications, oldNotifications: oldNotifications})
    ),
    map(notifications => {
      this._checkNewNotifications(notifications.oldNotifications, notifications.newNotifications);
      return notifications.newNotifications;
    }),
    map(notifications => new NotificationsWsActions.NewNotifications({notifications}))
  );

  /**
   * effect to show the modal
   */
  @Effect()
  showNotifications$ = this.actions$.pipe(
    ofType(NotificationActions.NotificationsActionTypes.ShowNotifications),
    exhaustMap(() => {
      return fromPromise(
        this.modalController.create({
          component: ModalNotificationsComponent,
          animated: true
        })
      ).pipe(
        map(modal => {
          modal.present();
          return fromPromise(modal.onDidDismiss());
        }),
        exhaustMap(dismiss => dismiss)
      );
    }),
    map(() => new NotificationActions.DismissModalNotifications())
  );

  /**
   * check notifications for a 'delete patient'
   * notification and init the update
   * of the patient list
   */
  @Effect()
  dismissModalNotifications$ = this.actions$.pipe(
    ofType(NotificationActions.NotificationsActionTypes.DismissModalNotifications),
    withLatestFrom(
      this.store.pipe(select(fromAuth.getUser)),
      (action, user) => user
    ),
    withLatestFrom(this.store.pipe(select(fromHome.getAllNotifications))),
    map(([user, notifications]) => {
      let action = null;
      notifications.map(notification => {
        if (notification.headline_key
          && notification.headline_key.toLowerCase() === 'delete user from patient profile') {
          action = new PatientPageActions.LoadPatients({user_id: user._id});
        }
      });
      return (action) ? action : new CoreActions.DoNothing();
    })
  );

  /**
   * mark as read effect
   * is activated when MarkNotificationAsRead is dispatched
   * and makes the API call
   */
  @Effect()
  markAsRead$ = this.actions$.pipe(
    ofType<NotificationActions.MarkNotificationAsRead>(NotificationActions.NotificationsActionTypes.MarkNotificationAsRead),
    map(action => action.payload.notification),
    exhaustMap((notification) => {
      return this.notificationService.markAsRead(notification.id).pipe(
        map(() => {
            return new NotificationApiActions.MarkNotificationAsReadSuccess({notification});
          }
        ),
        catchError(httpResponse => {
          const message = httpResponse.error.error ? httpResponse.error.error.toLowerCase() : '';
          return of(new NotificationApiActions.MarkNotificationAsReadFailure(message));
        })
      );
    })
  );

  /**
   * if a notification is marked as read
   * check and update the list of patients
   */
  @Effect()
  markNotificationAsReadSuccess$ = this.actions$.pipe(
    ofType<NotificationApiActions.MarkNotificationAsReadSuccess>(
      NotificationApiActions.NotificationsApiActionTypes.MarkNotificationAsReadSuccess
    ),
    map(action => action.payload.notification),
    withLatestFrom(this.store.pipe(select(fromAuth.getUser))),
    map(([notification, user]) => {
      if (notification.headline_key.toLowerCase() === 'delete user from patient profile') {
        return new PatientPageActions.LoadPatients({user_id: user._id});
      } else {
        return new CoreActions.DoNothing();
      }
    })
  );

  /**
   * effect to listen on new notifications (NotifyNewNotifications)
   * and will play audio file and vibrate
   * TODO: needs more implementation when in phone mode
   */
  @Effect({
    dispatch: false
  })
  notifyNewNotifications$ = this.actions$.pipe(
    ofType(NotificationActions.NotificationsActionTypes.NotifyNewNotifications),
    map(() => {
      this.store.dispatch(new NotificationActions.ShowNotifications());
      /*if (this.platform.is('desktop')) {
        const audio = new Audio('/assets/audio/bleep2.mp3');
        audio.play();
      }*/
    })
  );

  /**
   * connect to WS client for notifications
   */
  @Effect({
    dispatch: false
  })
  connectClient$ = this.actions$.pipe(
    ofType(NotificationsWsActions.NotificationsWsActionTypes.ConnectClient),
    tap(() => {
      this.socketService.connectClient('notifications');
    })
  );

  /**
   * disconnect WS client for notifications
   */
  @Effect({
    dispatch: false
  })
  disconnectClient$ = this.actions$.pipe(
    ofType(NotificationsWsActions.NotificationsWsActionTypes.DisconnectClient),
    delay(500),
    tap(() => {
      this.socketService.disconnectClient('notifications');
    })
  );

  /**
   * subscribe to notifications stream for a user id
   */
  @Effect({
    dispatch: false
  })
  subscribeNotifications$ = this.actions$.pipe(
    ofType<NotificationsWsActions.Subscribe>(NotificationsWsActions.NotificationsWsActionTypes.Subscribe),
    delay(1000),
    map(action => action.payload.userId),
    tap(userId => {
      this.socketService.subscribe('notifications', userId);
    })
  );

  /**
   * unsubscribe to notifications stream for a user id
   */
  @Effect({
    dispatch: false
  })
  unsubscribeNotifications$ = this.actions$.pipe(
    ofType<NotificationsWsActions.Unsubscribe>(NotificationsWsActions.NotificationsWsActionTypes.Unsubscribe),
    map(action => action.payload.userId),
    tap(patientId => {
      this.socketService.unsubscribe('notifications', patientId);
    })
  );

  /**
   * constructor
   * @param actions$
   * @param userService
   * @param notificationService
   * @param modalController
   * @param store
   * @param platform
   * @param socketService
   */
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private notificationService: NotificationService,
    private modalController: ModalController,
    private store: Store<fromHome.State | fromAuth.State>,
    private platform: Platform,
    private socketService: SocketService
  ) {
  }

  /**
   * check if there are new notifications in the
   * pulled elements
   * @param oldItems
   * @param newItems
   * @private
   */
  private _checkNewNotifications(oldItems: any[], newItems: any[]) {
    let notify = false;

    if (newItems.length > 0 && oldItems.length === 0) {

      notify = true;

    } else if (newItems.length > 0 && oldItems.length > 0) {
      const eles = [];

      newItems.map(item => {

        let inside = false;

        for (let i = 0; i < oldItems.length; i++) {
          if (item.id === oldItems[i]['id']) {
            inside = true;
          }
        }

        if (!inside) {
          eles.push(item);
        }
      });

      if (eles.length > 0) {
        notify = true;
      }
    }

    if (notify) {
      this.store.dispatch(new NotificationActions.NotifyNewNotifications());
    }
  }

}
