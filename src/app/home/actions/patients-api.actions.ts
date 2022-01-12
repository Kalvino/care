import { Action } from '@ngrx/store';
import { Patient } from '../../core/models/patient';
import { IEvent } from '../../core/models/event';

/**
 * definitions for action types
 */
export enum PatientsApiActionTypes {
  CreatePatientSuccess = '[Patient/Api] Create Patient Success',
  CreatePatientFailure = '[Patient/Api] Create Patient Failure',
  LoadPatientsSuccess = '[Patient/Api] Load Patients Success',
  LoadPatientsFailure = '[Patient/Api] Load Patients Failure',
  LoadUserPatientsSuccess = '[Patient/Api] Load User Patients Success',
  LoadUserPatientsFailure = '[Patient/Api] Load User Patients Failure',
  LoadPatientEventsSuccess = '[Patient/Api] Load Patient Events Success',
  LoadPatientEventsFailure = '[Patient/Api] Load Patient Events Failure',
  EditPatientSuccess = '[Patient/Api] Edit Patient Success',
  EditPatientFailure = '[Patient/Api] Edit Patient Failure',
  AddPatientAdminuserSuccess = '[Patient/Api] Add Adminuser Success',
  AddPatientAdminuserFailure = '[Patient/Api] Add Adminuser Failure',
  AddPatientReadonlyUserSuccess = '[Patient/Api] Add Readonly User Success',
  AddPatientReadonlyUserFailure = '[Patient/Api] Add Readonly User Failure',
  GetPatientSuccess = '[Patient/Api] Get Patient Success',
  GetPatientFailure = '[Patient/Api] Get Patient Failure',
  RemovePatientUserSuccess = '[Patient/Api] Remove Patient User Success',
  RemovePatientUserFailure = '[Patient/Api] Remove Patient User Failure',
  DeletePatientImageSuccess = '[Patient/Api] Delete Patient Image Success',
  DeletePatientImageFailure = '[Patient/Api] Delete Patient Image Failure'
}

/**
 * add patient success action
 */
export class CreatePatientSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.CreatePatientSuccess;

  /**
   * constructor
   * @param payload {patient: Patient}
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * add patient failure action
 */
export class CreatePatientFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.CreatePatientFailure;

  /**
   * constructor
   * @param payload {message: string[]}
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * load all patients success action
 */
export class LoadPatientsSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.LoadPatientsSuccess;

  /**
   * constructor
   * @param payload {patients: Patient[]}
   */
  constructor(public payload: { patients: Patient[] }) {
  }
}

/**
 * load all patients action
 */
export class LoadPatientsFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.LoadPatientsFailure;

  /**
   * constructor
   * @param payload {message: any}
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * load user patients success action
 */
export class LoadUserPatientsSuccess implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsApiActionTypes.LoadUserPatientsSuccess;

  /**
   * constructor
   * @param payload {patients: Patient[]}
   */
  constructor(public payload: { patients: Patient[] }) {
  }
}

/**
 * load user patients failure action
 */
export class LoadUserPatientsFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.LoadUserPatientsFailure;

  /**
   * constructor
   * @param payload {message: any}
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * load patient events success action
 */
export class LoadPatientEventsSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.LoadPatientEventsSuccess;

  /**
   * constructor
   * @param payload {events: IEvent[]}
   */
  constructor(public payload: { events: IEvent[] }) {
  }
}

/**
 * load patient events failure action
 */
export class LoadPatientEventsFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.LoadPatientEventsFailure;

  /**
   * constructor
   * @param payload {message: any}
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * edit patient success action
 */
export class EditPatientSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.EditPatientSuccess;

  /**
   * constructor
   * @param payload {patient: Patient}
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * edit patient failure action
 */
export class EditPatientFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = PatientsApiActionTypes.EditPatientFailure;

  /**
   * constructor
   * @param payload {message: string}
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * action class to add a admin user to a patient
 */
export class AddPatientAdminuserSuccess implements Action {
  /**
   * type assign action string type
   */
  public readonly type = PatientsApiActionTypes.AddPatientAdminuserSuccess;

  /**
   * constructor
   * @param payload put patient object
   */
  constructor(public payload: { patient: Patient }) {
  }

}

/**
 * action class for api failure adding a user as admin to patient
 */
export class AddPatientAdminuserFailure implements Action {
  /**
   * type assing action string to type
   */
  public readonly type = PatientsApiActionTypes.AddPatientAdminuserFailure;

  /**
   * constructor
   * @param payload an array of error messages
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * action class to add a readonly user to a patient
 */
export class AddPatientReadonlyUserSuccess implements Action {
  /**
   * type assign action string type
   */
  public readonly type = PatientsApiActionTypes.AddPatientReadonlyUserSuccess;

  /**
   * constructor
   * @param payload put patient object
   */
  constructor(public payload: { patient: Patient }) {
  }

}

/**
 * action class for api failure adding a user as readonly to patient
 */
export class AddPatientReadonlyUserFailure implements Action {
  /**
   * type assing action string to type
   */
  public readonly type = PatientsApiActionTypes.AddPatientReadonlyUserFailure;

  /**
   * constructor
   * @param payload an array of error messages
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * get a single patient from the api
 * success. Constructor / payload takes a Patient
 */
export class GetPatientSuccess implements Action {
  /**
   * type action type string
   */
  public readonly type = PatientsApiActionTypes.GetPatientSuccess;

  /**
   * constructor
   * @param payload put in a Patient
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * failure for getting a single patient from the api
 * Constructor / payload contains array of error strings
 */
export class GetPatientFailure implements Action {
  /**
   * type action type string
   */
  public readonly type = PatientsApiActionTypes.GetPatientFailure;

  /**
   * constructor
   * @param payload errors as an array of strings
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * get a single patient from the api
 * success. Constructor / payload takes a Patient
 */
export class RemovePatientUserSuccess implements Action {
  /**
   * type action type string
   */
  public readonly type = PatientsApiActionTypes.RemovePatientUserSuccess;

  /**
   * constructor
   * @param payload put in a Patient
   */
  constructor(public payload: { patient: Patient } | null) {
  }
}

/**
 * failure class for removing a user
 * from a patient profile.
 * Constructor / payload contains error message
 */
export class RemovePatientUserFailure implements Action {
  /**
   * type action type string
   */
  public readonly type = PatientsApiActionTypes.RemovePatientUserFailure;

  /**
   * constructor
   * @param payload errors as an array of strings
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * delete the image from a patient
 * success. Constructor / payload patient
 */
export class DeletePatientImageSuccess implements Action {
  /**
   * type action type string
   */
  public readonly type = PatientsApiActionTypes.DeletePatientImageSuccess;

  /**
   * constructor
   * @param payload put in a Patient
   */
  constructor(public payload: { patient: Patient } | null) {
  }
}

/**
 * failure class for removing a user
 * from a patient profile.
 * Constructor / payload contains error message
 */
export class DeletePatientImageFailure implements Action {
  /**
   * type action type string
   */
  public readonly type = PatientsApiActionTypes.DeletePatientImageFailure;

  /**
   * constructor
   * @param payload errors as an array of strings
   */
  constructor(public payload: { message: string[] }) {
  }
}

/**
 * exports the actions as type
 */
export type PatientsApiActionsUnion =
  | CreatePatientSuccess
  | CreatePatientFailure
  | EditPatientSuccess
  | EditPatientFailure
  | LoadPatientsSuccess
  | LoadPatientsFailure
  | LoadUserPatientsSuccess
  | LoadUserPatientsFailure
  | LoadPatientEventsSuccess
  | LoadPatientEventsFailure
  | AddPatientAdminuserSuccess
  | AddPatientAdminuserFailure
  | AddPatientReadonlyUserSuccess
  | AddPatientReadonlyUserFailure
  | GetPatientSuccess
  | GetPatientFailure
  | RemovePatientUserSuccess
  | RemovePatientUserFailure
  | DeletePatientImageSuccess
  | DeletePatientImageFailure;
