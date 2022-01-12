import { Action } from '@ngrx/store';
import { INotification } from '../../core/models/notification';

/**
 * enum to xdescribe the notification types
 */
export enum NotificationsApiActionTypes {
  LoadNotificationsSuccess = '[Notifications/Api] Load Success',
  LoadNotificationsFailure = '[Notifications/Api] Load Failure',
  PollingNotificationsSuccess = '[Notifications/Polling/Api] Success',
  PollingNotificationsFailure = '[Notifications/Polling/Api] Failure',
  MarkNotificationAsReadSuccess = '[Notifications/Api] Mark As Read Success',
  MarkNotificationAsReadFailure = '[Notifications/Api] Mark As Read Failure'
}

/**
 * Load notifications from the api success
 */
export class LoadNotificationsSuccess implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsApiActionTypes.LoadNotificationsSuccess;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { notifications: INotification[] }) {
  }
}

/**
 * load notifications from the api failure
 */
export class LoadNotificationsFailure implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsApiActionTypes.LoadNotificationsFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * action class for a successful polling of notifications from the API
 */
export class PollingNotificationsSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsApiActionTypes.PollingNotificationsSuccess;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { notifications: INotification[] }) {
  }

}

/**
 * action to for a failure when polling notifications from the API
 */
export class PollingNotificationsFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsApiActionTypes.PollingNotificationsFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * action class for a successful api call to mark a notification as read
 */
export class MarkNotificationAsReadSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsApiActionTypes.MarkNotificationAsReadSuccess;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { notification: INotification }) {
  }
}

/**
 * action class to handle a failure from the API when trying to mark
 * a notification as read
 */
export class MarkNotificationAsReadFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsApiActionTypes.MarkNotificationAsReadFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * export classes as types
 */
export type NotificationsActionsUnion =
  | LoadNotificationsSuccess
  | LoadNotificationsFailure
  | PollingNotificationsSuccess
  | PollingNotificationsFailure
  | MarkNotificationAsReadSuccess
  | MarkNotificationAsReadFailure;
