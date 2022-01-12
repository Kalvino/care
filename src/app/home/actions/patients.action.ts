import { Action } from '@ngrx/store';
import { Patient } from '../../core/models/patient';
import { Update } from '@ngrx/entity';
import { User } from '../../core/models/user';

/**
 * patient action types
 */
export enum PatientsActionTypes {
  LoadUserPatients = '[Patients/Patients] Load User Patients',
  ResetPatientsState = '[Patients/Patients] Reset Patients State',
  SelectPatient = '[Patients/Patients] Select Patient',
  LoadPatientEvents = '[Patients/Patients] Load Patient Events',
  EditPatient = '[Patients/Patients] Edit Patient',
  RemovePatientUser = '[Patients/Patient] Remove User',
  CancelRemovePatientUser = '[Patients/Patient] Cancel Remove User',
  AddReadonlyUser = '[Patients/Patient] Add Readonly User',
  ConfirmDeletePatientImage = '[Patients/Patient] Confirm Delete Patient Image'
}

/**
 * load user patients action
 * will trigger an effect to start loading patients for a user via api
 * in case of success a new Patients.Api.LoadUserPatientsSuccess action will be dispatched
 */
export class LoadUserPatients implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsActionTypes.LoadUserPatients;
}

/**
 * reset the patient state
 */
export class ResetPatientsState implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsActionTypes.ResetPatientsState;
}

/**
 * action class to select a patient
 */
export class SelectPatient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsActionTypes.SelectPatient;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { _id: string }) {
  }
}

/**
 * action to load events for a patient
 */
export class LoadPatientEvents implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsActionTypes.LoadPatientEvents;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * EditPatient action to submit and edit patient
 */
export class EditPatient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsActionTypes.EditPatient;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: Update<Patient>) {
  }
}

/**
 * Remove a user from a patient. Action called when
 * OK button on an alert is positive
 */
export class RemovePatientUser implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsActionTypes.RemovePatientUser;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { patient_id: string, user: User }) {
  }
}

/**
 * Cancel the alert to remove a user from
 * a patient profile
 */
export class CancelRemovePatientUser implements Action {
  /**
   * assign type to this class
   */
  readonly type = PatientsActionTypes.CancelRemovePatientUser;
}

/**
 * action to init adding a readonly user to
 * a patient profile
 */
export class AddReadonlyUser implements Action {
  /**
   * {String} type the string from the enum
   */
  readonly type = PatientsActionTypes.AddReadonlyUser;

  /**
   * constructor
   * @param {Patient} payload patient object
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * action class to trigger a popup to
 * ask to delete the patient image
 */
export class ConfirmDeletePatientImage implements Action {
  /**
   * type from action types
   */
  readonly type = PatientsActionTypes.ConfirmDeletePatientImage;

  /**
   * constructor
   * @param payload patient
   */
  constructor(public payload: {patient: Patient}) {
  }
}

/**
 * exports the actions as type
 */
export type PatientsActionsUnion =
  | LoadUserPatients
  | ResetPatientsState
  | SelectPatient
  | LoadPatientEvents
  | EditPatient
  | RemovePatientUser
  | CancelRemovePatientUser
  | ConfirmDeletePatientImage;
