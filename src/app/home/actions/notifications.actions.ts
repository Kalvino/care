import { Action } from '@ngrx/store';
import { INotification } from '../../core/models/notification';

/**
 * enum to xdescribe the notification types
 */
export enum NotificationsActionTypes {
  LoadNotifications = '[Notifications/Load] Load',
  StartPollingNotifications = '[Notifications/Polling] Start',
  StopPollingNotifications = '[Notifications/Polling] Stop',
  MarkNotificationAsRead = '[Notifications/Action] Mark As Read',
  ShowNotifications = '[Notifications/Action] Show Notifications',
  ResetNotificationsState = '[Notifications/Actions] Reset Notifications State',
  NotifyNewNotifications = '[Notifications/Notify] Notify New Notifications',
  DismissModalNotifications = '[Notifications/Actions] Dismiss Modal',
  AcceptNotification = '[Notifications/Action] Accept Notification',
  RejectNotification = '[Notifications/Action] Reject Notification',
}

/**
 * start loading the notifications
 */
export class LoadNotifications implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = NotificationsActionTypes.LoadNotifications;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { userId: string }) {
  }
}

/**
 * action class for start polling notifications
 */
export class StartPollingNotifications implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.StartPollingNotifications;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { user_id: string }) {
  }

}

/**
 * action to stop polling for a certain user_id
 */
export class StopPollingNotifications implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.StopPollingNotifications;
}

/**
 * action to mark a notification as read
 */
export class MarkNotificationAsRead implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.MarkNotificationAsRead;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { notification: INotification }) {
  }
}

/**
 * action to show a modal with notifications
 */
export class ShowNotifications implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.ShowNotifications;
}

/**
 * action to clear users notifications
 */
export class ResetNotificationsState implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.ResetNotificationsState;
}

/**
 * action for notifying a user about new notifications
 */
export class NotifyNewNotifications implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.NotifyNewNotifications;
}

/**
 * action dismissing the modal with notifications
 */
export class DismissModalNotifications implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = NotificationsActionTypes.DismissModalNotifications;
}

/**
 * action class for accepting a notification
 */
export class AcceptNotification implements Action {
  public readonly type = NotificationsActionTypes.AcceptNotification;
}

/**
 * action class for rejecting a notification
 */
export class RejectNotification implements Action {
  public readonly type = NotificationsActionTypes.RejectNotification;
}

/**
 * exports the actions as type
 */
export type NotificationsActionsUnion =
  | LoadNotifications
  | StartPollingNotifications
  | StopPollingNotifications
  | MarkNotificationAsRead
  | ShowNotifications
  | ResetNotificationsState
  | NotifyNewNotifications
  | DismissModalNotifications
  | AcceptNotification
  | RejectNotification;
