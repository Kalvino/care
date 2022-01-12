import { Action } from '@ngrx/store';
import { Patient } from '../../core/models/patient';

/**
 * devices page action types
 */
export enum DevicesPageActionTypes {
  CheckDevice = '[Devices/Page] Check Device',
  AddPatientAdminuser = '[Patients/Page] Add Patient Adminuser',
  CancelAddPatientAdminuser = '[Patients/Page] Cancel Add Patient Adminuser'
}

/**
 * add a new device
 */
export class CheckDevice implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = DevicesPageActionTypes.CheckDevice;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { code: string }) {
  }

}

/**
 * action class issued when user wants to
 * add ones self as admin to a patient
 */
export class AddPatientAdminuser implements Action {
  /**
   * type action string
   */
  readonly type = DevicesPageActionTypes.AddPatientAdminuser;

  /**
   * construct
   * @param payload takes a patient object
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * action class issued when user wants to
 * add ones self as admin to a patient
 */
export class CancelAddPatientAdminuser implements Action {
  /**
   * type action string
   */
  readonly type = DevicesPageActionTypes.CancelAddPatientAdminuser;
}

/**
 * exports the actions as type
 */
export type DevicesPageActionsUnion =
  | CheckDevice
  | AddPatientAdminuser
  | CancelAddPatientAdminuser;
