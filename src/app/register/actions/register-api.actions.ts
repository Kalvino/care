import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';

/**
 * registration action types
 */
export enum RegistrationApiActionTypes {
  RegistrationSuccess = '[Registration/Api] Registration Success',
  RegistrationFailure = '[Registration/Api] Registration Failure'
}

/**
 * Registration failure action
 */
export class RegistrationSuccess implements Action {
  readonly type = RegistrationApiActionTypes.RegistrationSuccess;

  constructor(public payload: { user: User }) {
  }
}

/**
 * Registration failure action
 */
export class RegistrationFailure implements Action {
  readonly type = RegistrationApiActionTypes.RegistrationFailure;

  constructor(public payload: { error: any }) {
  }
}

export type RegistrationApiActionsUnion = RegistrationSuccess | RegistrationFailure;
