import { Action } from '@ngrx/store';
import { Credentials } from '../models/credentials';

/**
 * login action types
 */
export enum LoginPageActionTypes {
  Login = '[Login Page] Login'
}

/**
 * login action
 */
export class Login implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = LoginPageActionTypes.Login;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: {credentials: Credentials}) {}
}

/**
 * exports the actions as type
 */
export type LoginPageActionsUnion = Login;
