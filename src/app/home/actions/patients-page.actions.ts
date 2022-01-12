import { Action } from '@ngrx/store';
import { Patient } from '../../core/models/patient';
import { User } from '../../core/models/user';

/**
 * patients page action types
 */
export enum PatientsPageActionTypes {
  CreatePatient = '[Patients/Page] Create Patient',
  LoadPatients = '[Patients/Page] Load Patients',
  CancelEditPatient = '[Patients/Page] Cancel Edit',
  RedirectToPatient = '[Patients/Page] Redirect to Patient',
  CancelEditConfirmDismiss = '[Patients/Page] Cancel Edit Confirm Dismiss',
  AlertRemoveUser = '[Patients/Page] Alert Remove User'
}

/**
 * action for adding a new patient
 */
export class CreatePatient implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsPageActionTypes.CreatePatient;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * load patients action
 * will trigger an effect to load the patients via api
 * in case of success a new Patients.Api.LoadPatientsSuccess action will be dispatched
 */
export class LoadPatients implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsPageActionTypes.LoadPatients;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { user_id: string }) {
  }
}

/**
 * cancel edit action
 */
export class CancelEditPatient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsPageActionTypes.CancelEditPatient;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { changed: boolean }) {
  }
}

/**
 * redirect to the patient details page
 */
export class RedirectToPatient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsPageActionTypes.RedirectToPatient;
}

/**
 * action to dismiss the modal confirmation canceling the editing
 */
export class CancelEditConfirmDismiss implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsPageActionTypes.CancelEditConfirmDismiss;
}

/**
 * action class to show a alert to delete user
 */
export class AlertRemoveUser implements Action {
  /**
   * assign action type to action
   */
  readonly type = PatientsPageActionTypes.AlertRemoveUser;

  constructor(public payload: { patient_id: string, user: User }) {
  }
}

/**
 * exports the actions as type
 */
export type PatientsPageActionsUnion =
  | CreatePatient
  | LoadPatients
  | CancelEditPatient
  | RedirectToPatient
  | CancelEditConfirmDismiss
  | AlertRemoveUser;
