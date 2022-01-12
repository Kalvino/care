import { Action } from '@ngrx/store';
import { INotification } from '../../core/models/notification';

export enum NotificationsWsActionTypes {
  ConnectClient = '[Notifications/WS] Connect Client',
  DisconnectClient = '[Notifications/WS] Disconnect Client',
  Subscribe = '[Notifications/WS] Subscribe',
  Unsubscribe = '[Notifications/WS] Unubscribe',
  IncomingNotifications = '[Notifications] Incoming Notifications',
  NewNotifications = '[Notifications] New Notifications'
}

/**
 * action to connect the notifications WS client
 */
export class ConnectClient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsWsActionTypes.ConnectClient;
}

/**
 * action to disconnect the notifications WS client
 */
export class DisconnectClient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsWsActionTypes.DisconnectClient;
}

/**
 * action to subscribe a user to a stream
 */
export class Subscribe implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsWsActionTypes.Subscribe;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { userId: string }) {
  }
}

/**
 * action to unsubscribe from the notifications stream
 */
export class Unsubscribe implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsWsActionTypes.Unsubscribe;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { userId: string }) {
  }
}

/**
 * action class for new incoming notifications
 */
export class IncomingNotifications implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsWsActionTypes.IncomingNotifications;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { notifications: INotification[] }) {
  }
}

/**
 * action class for new incoming notifications
 */
export class NewNotifications implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsWsActionTypes.NewNotifications;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { notifications: INotification[] }) {
  }
}

/**
 * export action types
 */
export type NotificationsWsActionsUnion =
  | ConnectClient
  | DisconnectClient
  | Subscribe
  | Unsubscribe
  | IncomingNotifications
  | NewNotifications;

