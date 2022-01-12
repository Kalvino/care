import { Action } from '@ngrx/store';
import { RegistrationCredentials } from '../models/registration';

/**
 * registration page action types
 */
export enum RegistrationPageActionTypes {
  Register = '[Registration Page] Register'
}

/**
 * register action dispatched when user clicks register button
 */
export class Register implements Action {
  readonly type = RegistrationPageActionTypes.Register;

  constructor(public payload: { registrationCredentials: RegistrationCredentials }) {
  }

}

export type RegistrationPageActionsUnion = Register;
