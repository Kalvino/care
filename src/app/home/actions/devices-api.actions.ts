import { Action } from '@ngrx/store';
import { IAdminCodeResponse } from '../../core/models/api-response';
import { Patient } from '../../core/models/patient';

/**
 * devices api action types
 */
export enum DevicesApiActionTypes {
  CheckDeviceSuccess = '[Devices/Api] Check Device Success',
  CheckDeviceFailure = '[Devices/Api] Check Device Failure'
}

/**
 * success action for checking a device
 */
export class CheckDeviceSuccess implements Action {
  /**
   * {String} type the action type from enumg
   */
  public readonly type = DevicesApiActionTypes.CheckDeviceSuccess;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { response: IAdminCodeResponse, code: string }) {
  }
}

/**
 * error class for an error checking a device
 */
export class CheckDeviceFailure implements Action {
  /**
   * {String} type string from action types
   */
  public readonly type = DevicesApiActionTypes.CheckDeviceFailure;

  /**
   * constructor
   * @param {any} payload string or array of strings with error messages
   */
  constructor(public payload: { message: any }) {
  }
}

/**
 * exports the actions as type
 */
export type DevicesApiActionsUnion =
  | CheckDeviceSuccess
  | CheckDeviceFailure;
