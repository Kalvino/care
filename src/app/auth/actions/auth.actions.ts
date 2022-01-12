import { Action } from '@ngrx/store';

/**
 * auth action types
 */
export enum AuthActionTypes {
  Logout = '[Auth] Logout',
  LogoutConfirmation = '[Auth] Logout Confirmation',
  LogoutConfirmationDismiss = '[Auth] Logout Confirmation Dismiss',
  RehydrateUserState = '[Auth] Rehydrate User State'
}

/**
 * action to logout
 */
export class Logout implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthActionTypes.Logout;
}

/**
 * action to confirm logout (user interaction)
 */
export class LogoutConfirmation implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthActionTypes.LogoutConfirmation;
}

/**
 * action if user dismisses the modal
 */
export class LogoutConfirmationDismiss implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthActionTypes.LogoutConfirmationDismiss;
}

/**
 * action to rehydrate the user state from the storage
 */
export class RehydrateUserState implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthActionTypes.RehydrateUserState;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload) {
  }
}

/**
 * exports the actions as type
 */
export type AuthActionsUnion =
  | Logout
  | LogoutConfirmation
  | LogoutConfirmationDismiss
  | RehydrateUserState;
