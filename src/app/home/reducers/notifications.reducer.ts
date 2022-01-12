import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { INotification } from '../../core/models/notification';
import { NotificationActions, NotificationApiActions, NotificationsWsActions } from '../actions';
import { AuthApiActions } from '../../auth/actions';

/**
 * state definition for notifications
 */
export interface State extends EntityState<INotification> {
  error: string | string[] | null;
  pending: boolean;
}

/**
 * create adapter for notifications
 */
export const adapter: EntityAdapter<INotification> =
  createEntityAdapter<INotification>({
    selectId: (notification: INotification) => notification.id,
    sortComparer: false
  });

/**
 * create the initial state
 */
export const initialSate: State = adapter.getInitialState({
  error: null,
  pending: false
});

/**
 * reducer for notification state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialSate,
  action:
    | NotificationActions.NotificationsActionsUnion
    | NotificationApiActions.NotificationsActionsUnion
    | NotificationsWsActions.NotificationsWsActionsUnion
    | AuthApiActions.AuthApiActionsUnion): State {
  switch (action.type) {

    // loading via API success
    case NotificationApiActions.NotificationsApiActionTypes.LoadNotificationsSuccess:
    case NotificationApiActions.NotificationsApiActionTypes.PollingNotificationsSuccess:
      return adapter.upsertMany(action.payload.notifications, {...state, error: null});

    // loading via API failure
    case NotificationApiActions.NotificationsApiActionTypes.LoadNotificationsFailure:
    case NotificationApiActions.NotificationsApiActionTypes.PollingNotificationsFailure:
      return {
        ...state,
        error: action.payload.message
      };

    // WS incoming notifications
    case NotificationsWsActions.NotificationsWsActionTypes.NewNotifications:
      return adapter.upsertMany(action.payload.notifications, state);

    // starting marking the notification as read
    case NotificationActions.NotificationsActionTypes.MarkNotificationAsRead:
      return {
        ...state,
        error: null,
        pending: true
      };

    // mark as read success
    case NotificationApiActions.NotificationsApiActionTypes.MarkNotificationAsReadSuccess:
      return adapter.removeOne(
        action.payload.notification.id,
        {
          ...state,
          error: null,
          pending: false
        });

    // mark as read failure
    case NotificationApiActions.NotificationsApiActionTypes.MarkNotificationAsReadFailure:
      return {
        ...state,
        error: action.payload.message,
        pending: false
      };

    // logout and reset
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case NotificationActions.NotificationsActionTypes.ResetNotificationsState:
      return initialSate;

    // default
    default:
      return state;
  }
}

/**
 * return error of the state
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * return pending state
 * @param state
 */
export const getPending = (state: State) => state.pending;
