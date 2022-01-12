import { Action } from '@ngrx/store';
import { LoginResponse } from '../../core/models/user';

/**
 * action types
 */
export enum AuthApiActionTypes {
  LoginSuccess = '[Auth/Api] Login Success',
  LoginFailure = '[Auth/Api] Login Failure',
  LoginRedirect = '[Auth/Api] Login Redirect',
  LogoutSuccess = '[Auth/Api] Logout Success',
  LogoutFailure = '[Auth/Api] Logout Failure',
  ChangePasswordSuccess = '[Auth/Api] Change Password Success',
  ChangePasswordFailure = '[Auth/Api] Change Password Failure',
  ChangePasswordRedirect = '[Auth/Api] Change Password Redirect'
}

/**
 * login action
 */
export class LoginSuccess implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.LoginSuccess;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { loginResponse: LoginResponse }) {
  }
}

/**
 * login failure
 */
export class LoginFailure implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.LoginFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * logout success
 */
export class LogoutSuccess implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.LogoutSuccess;
}

/**
 * lougout failure
 */
export class LogoutFailure implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.LogoutFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * redirect action
 */
export class LoginRedirect implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.LoginRedirect;
}

/**
 * change password success action
 * dispatched on successfully changed password
 */
export class ChangePasswordSuccess implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.ChangePasswordSuccess;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: string }) {
  }
}

/**
 * change password failure action
 * dispatched on password change failure
 */
export class ChangePasswordFailure implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.ChangePasswordFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * redirect action after successfully changed the password
 */
export class ChangePasswordRedirect implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = AuthApiActionTypes.ChangePasswordRedirect;
}

/**
 * exports the actions as type
 */
export type AuthApiActionsUnion =
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | LogoutSuccess
  | LogoutFailure
  | ChangePasswordSuccess
  | ChangePasswordFailure
  | ChangePasswordRedirect;
