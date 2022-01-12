import { Action } from '@ngrx/store';
import { IPassworConfirmation } from '../models/password';

/**
 * change password page action types
 */
export enum ChangePasswordActionTypes {
  ChangePassword = '[Auth/Change PW Page] Change Password'
}

/**
 * action to trigger API to change the password
 */
export class ChangePassword implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = ChangePasswordActionTypes.ChangePassword;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { passwordConfirmation: IPassworConfirmation }) {
  }
}

/**
 * exports the actions as type
 */
export type ChangePwPageActionsUnion = ChangePassword;
