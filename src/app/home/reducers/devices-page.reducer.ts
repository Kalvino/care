import {
  DevicePageActions,
  DeviceActions,
  DeviceApiActions,
  PatientApiActions
} from '../actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

/**
 * state definition for devices page
 */
export interface State {
  error: string | null;
  pending: boolean;
}

/**
 * inital state for devices page
 */
export const initialState: State = {
  error: null,
  pending: false
};

/**
 * devices page reducer
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: RouterNavigationAction
    | DevicePageActions.DevicesPageActionsUnion
    | DeviceApiActions.DevicesApiActionsUnion
    | DeviceActions.DevicesActionsUnion
    | PatientApiActions.PatientsApiActionsUnion): State {
  switch (action.type) {

    case (DevicePageActions.DevicesPageActionTypes.AddPatientAdminuser):
    case (DevicePageActions.DevicesPageActionTypes.CheckDevice):
      return {
        ...state,
        error: null,
        pending: true
      };

    case (ROUTER_NAVIGATION):
    case (PatientApiActions.PatientsApiActionTypes.AddPatientAdminuserSuccess):
    case (PatientApiActions.PatientsApiActionTypes.AddPatientReadonlyUserSuccess):
    case (DeviceApiActions.DevicesApiActionTypes.CheckDeviceSuccess):
      return {
        ...state,
        error: null,
        pending: false
      };

    case (PatientApiActions.PatientsApiActionTypes.AddPatientAdminuserFailure):
    case (PatientApiActions.PatientsApiActionTypes.AddPatientReadonlyUserFailure):
    case (DeviceActions.DevicesActionTypes.ProcessCodeError):
    case (DeviceApiActions.DevicesApiActionTypes.CheckDeviceFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    default:
      return state;
  }
}

/**
 * feature functions to access current state
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * pending state
 * @param state
 */
export const getPending = (state: State) => state.pending;
