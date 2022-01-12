import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import { NotificationActions } from '../../home/actions';

/**
 * Socket service provides an interface
 * for socket.io client connections
 *
 * it will create two clients for notifications and patient_events
 */
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  /**
   * instance of socket client for notifications
   */
  private _notificationsClient = null;
  /**
   * instance of socket client for history events
   */
  private _patientHistoryClient = null;

  /**
   * current user
   */
  private _currentUser = null;

  /**
   * current access token
   */
  private _token = null;

  /**
   * class constructor
   */
  constructor(private store: Store<any>) {

    // subscribe to the get the current user from store
    this.store.pipe(
      select(fromAuth.getUser)
    ).subscribe(user => {
      this._currentUser = user;
    });

    // subscribe to get the current access_token from the store
    this.store.pipe(
      select(fromAuth.getAccessToken)
    ).subscribe(token => {
      this._token = token;
    });
  }

  /**
   * create client or open / re-open connection of the client
   * @param client name of the client: 'notifications | patient_history
   */
  connectClient(client: string): void {
    if (client === 'notifications') {
      // disable polling if it is enabled
      this.store.dispatch(new NotificationActions.StopPollingNotifications());

      if (!this._notificationsClient) {

        this._notificationsClient =
          io(`${environment.socketHost}/notifications?token=${this._token}&user_id=${this._currentUser.id}`);

      } else if (this._notificationsClient && this._notificationsClient.disconnected) {

        this._notificationsClient.open();

      }
    }

    if (client === 'patient_history') {
      if (!this._patientHistoryClient) {

        this._patientHistoryClient =
          io(`${environment.socketHost}/patient_history?token=${this._token}&user_id=${this._currentUser.id}`);

      } else if (this._patientHistoryClient && this._patientHistoryClient.disconnected) {

        this._patientHistoryClient.open();

      }
    }

    this._onError();
  }

  /**
   * close socket connection
   * @param client name of the client to close: notifications | patient_history
   */
  disconnectClient(client): void {
    if (client === 'notifications') {
      if (this._notificationsClient) {
        this._notificationsClient.close();
        this._notificationsClient = null;
      }
    }

    if (client === 'patient_history') {
      if (this._patientHistoryClient) {
        this._patientHistoryClient.close();
      }
    }
  }

  /**
   * emit a message to the server
   * @param client
   * @param topic
   * @param id
   */
  emit(client: string, topic: string, id: string) {
    switch (client) {
      case 'patient_history':
        if (this._patientHistoryClient) {
          if (this._patientHistoryClient.disconnected) {
            this._patientHistoryClient.open();
          }
          this._patientHistoryClient.emit(topic, id);
        }
        break;

      case 'notifications':
        if (this._notificationsClient) {
          if (this._notificationsClient.disconnected) {
            this._notificationsClient.open();
          }
          this._notificationsClient.emit(topic, id);
        }
        break;
    }
  }

  /**
   * subscribe to a room on the server
   * @param client: string patient_history | notifications
   * @param id: string patient_id | user_id
   */
  subscribe(client, id: string) {
    this.emit(client, 'subscribe', id);
  }

  /**
   * unsubscribe from a room
   * @param client: string patient_history | notifications
   * @param id: string patient_id | user_id
   */
  unsubscribe(client, id: string) {
    this.emit(client, 'unsubscribe', id);
  }

  /**
   *
   * receive a history event
   */
  onHistoryEvent(): Observable<any> {
    return new Observable(observer => {
      this._patientHistoryClient.on('event', (data) => observer.next(data));
    });
  }

  /**
   * receive a notification
   */
  onNotification(): Observable<any> {
    return new Observable(observer => {
      this._notificationsClient.on('notification', (data) => observer.next(data));
    });
  }

  /**
   * listen to global error events from socket.io
   * @private
   */
  private _onError() {
    if (this._notificationsClient) {
      this._notificationsClient
        .on('connect_error', () => {
          console.error('error while connecting to notfications');
          this.store.dispatch(new NotificationActions.StartPollingNotifications({user_id: this._currentUser.id}));
          this.disconnectClient('notifications');
        })
        .on('reconnect_error', () => {
          console.error('error while re-connecting to notifications');
          this.store.dispatch(new NotificationActions.StartPollingNotifications(this._currentUser.id));
          this.disconnectClient('notifications');
        });
    }

    if (this._patientHistoryClient) {
      this._patientHistoryClient
        .on('connect_error', () => {
          console.error('error while connecting to history');
          this.disconnectClient('patient_history');
        })
        .on('reconnect_error', () => {
          console.error('error while re-connecting history');
          this.disconnectClient('patient_history');
        });
    }
  }
}
