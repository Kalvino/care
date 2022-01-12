import { Action } from '@ngrx/store';
import { Device } from '../../core/models/device';
import { Patient } from '../../core/models/patient';
import { DevicesApiActionTypes } from './devices-api.actions';

/**
 * devices action types
 */
export enum DevicesActionTypes {
  ResetUnassignedDevice = '[Devices/Devices] Reset Unassigned Device',
  ResetDevicesState = '[Devices/Devices] Reset Devices State',
  DeviceInUse = '[Devices/Devices] Device In Use',
  DeviceNotInUse = '[Devices/Devices] Device Not In Use',
  DismissAddPatientAdminUser = '[Devices/Devices] Dismiss Add Patient Adminuser',
  DismissAddPatientReadonlyUser = '[Devices/Devices] Dismiss Add Patient Readonly User',
  ProceedAddPatientAdminUser = '[Devices/Devices] Proceed Add Patient Adminuser',
  CheckAdminCodeSuccess = '[Devices/Device] Check Admin Code Success',
  CheckAdminCodeFailure = '[Devices/Device] Check Admin Code Failure',
  CheckReadonlyCodeSuccess = '[Devices/Device] Check Readonly Code Success',
  CheckReadonlyCodeFailure = '[Devices/Device] Check Readonly Code Failure',
  ProcessCodeError = '[Devices/Api] Process Code Error'
}

/**
 * action to reset the unassigned device
 */
export class ResetUnassginedDevice implements Action {
  /**
   * type assigning string to the type class
   */
  readonly type = DevicesActionTypes.ResetUnassignedDevice;
}

/**
 * reset action
 */
export class ResetDevicesState implements Action {
  /**
   * type assigning string to the type class
   */
  readonly type = DevicesActionTypes.ResetDevicesState;
}

/**
 * action to dispatch when device is in use
 * will trigger an effect to redirect to a certain
 * page
 */
export class DeviceInUse implements Action {
  /**
   * type assinging string to the type class
   */
  readonly type = DevicesActionTypes.DeviceInUse;

  /**
   * constructor
   * @param payload patient: Patient and code: the string entered in by user
   */
  constructor(public payload: { patient: Patient, code: string }) {
  }
}

/**
 * action to dispatch when device is NOT in use
 * will trigger an effect to redirect to a certain
 * page
 */
export class DeviceNotInUse implements Action {
  /**
   * type assinging string to the type class
   */
  readonly type = DevicesActionTypes.DeviceNotInUse;

  /**
   * constructor
   * @param payload device: Device
   */
  constructor(public payload: { device: Device }) {
  }
}

/**
 * class to dismiss assigning a
 * patient to a new user as admin
 */
export class DismissAddPatientAdminUser implements Action {
  /**
   * type the string of the action type
   */
  readonly type = DevicesActionTypes.DismissAddPatientAdminUser;
}

/**
 * class to dismiss assigning a
 * patient to a new user as readonly
 */
export class DismissAddPatientReadonlyUser implements Action {
  /**
   * type the string of the action type
   */
  readonly type = DevicesActionTypes.DismissAddPatientReadonlyUser;
}

/**
 * class to proceed with assigning a
 * patient to a user as admin
 */
export class ProceedAddPatientAdminUser implements Action {
  /**
   * type assign the string from action types
   */
  readonly type = DevicesActionTypes.ProceedAddPatientAdminUser;

  /**
   * constructor
   * @param payload construct with Patient
   */
  constructor(public payload: {patient: Patient}) {
  }
}

/**
 * check admin code success action class
 */
export class CheckAdminCodeSuccess implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = DevicesActionTypes.CheckAdminCodeSuccess;

  /**
   * constructor
   * @param {IAdminCodeResponse} payload object containing a patient and in_use field
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * check admin code failure action class
 */
export class CheckAdminCodeFailure implements Action {
  /**
   * type assign string to the type class
   */
  public readonly type = DevicesActionTypes.CheckAdminCodeFailure;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * success action class for checking readonly code
 */
export class CheckReadonlyCodeSuccess implements Action {
  /**
   * {String} type the type string from enum
   */
  public readonly type = DevicesActionTypes.CheckReadonlyCodeSuccess;

  /**
   * constructor
   * @param {Patient} payload patient object
   */
  constructor(public payload: { patient: Patient }) {
  }
}

/**
 * failure action class for checking readonly code
 */
export class CheckReadonlyCodeFailure implements Action {
  /**
   * {String} type the type string from enum
   */
  public readonly type = DevicesActionTypes.CheckReadonlyCodeFailure;

  /**
   * constructor
   * @param {String[]} payload an array of strings
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * error class if processing readonly or admin code fails
 */
export class ProcessCodeError implements Action {
  /**
   * {String} type from enum
   */
  public readonly type = DevicesActionTypes.ProcessCodeError;

  /**
   * constructor
   * @param {Object<String>} payload
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * exports the actions as type
 */
export type DevicesActionsUnion =
  | ResetUnassginedDevice
  | ResetDevicesState
  | DeviceInUse
  | DeviceNotInUse
  | DismissAddPatientAdminUser
  | DismissAddPatientReadonlyUser
  | ProceedAddPatientAdminUser
  | CheckReadonlyCodeSuccess
  | CheckReadonlyCodeFailure
  | CheckAdminCodeSuccess
  | CheckAdminCodeFailure
  | ProcessCodeError;
