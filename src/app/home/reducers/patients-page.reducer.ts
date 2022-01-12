import { PatientApiActions, PatientPageActions, PatientActions } from '../actions';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { CoreActions } from '../../core/actions';

/**
 * state interface
 */
export interface State {
  error: string | string[] | null;
  pending: boolean;
  showBackdrop: boolean;
}

/**
 * initialSate object the initial state
 */
export const initialState: State = {
  error: null,
  pending: false,
  showBackdrop: false
};

/**
 * reducer for patients page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: PatientPageActions.PatientsPageActionsUnion
    | PatientApiActions.PatientsApiActionsUnion
    | PatientActions.PatientsActionsUnion
    | RouterNavigationAction
    | CoreActions.CoreActionsUnion): State {
  switch (action.type) {

    case (PatientActions.PatientsActionTypes.LoadPatientEvents):
    case (PatientActions.PatientsActionTypes.EditPatient):
    case (PatientPageActions.PatientsPageActionTypes.LoadPatients):
    case (PatientPageActions.PatientsPageActionTypes.CreatePatient):
    case (PatientActions.PatientsActionTypes.SelectPatient):
    case (PatientActions.PatientsActionTypes.RemovePatientUser):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (ROUTER_NAVIGATION):
    case (PatientApiActions.PatientsApiActionTypes.LoadPatientEventsSuccess):
    case (PatientApiActions.PatientsApiActionTypes.LoadPatientsSuccess):
    case (PatientApiActions.PatientsApiActionTypes.CreatePatientSuccess):
    case (PatientApiActions.PatientsApiActionTypes.EditPatientSuccess):
    case (PatientApiActions.PatientsApiActionTypes.GetPatientSuccess):
    case (PatientApiActions.PatientsApiActionTypes.RemovePatientUserSuccess):
    case (CoreActions.CoreActionTypes.ResetFormsState):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (PatientApiActions.PatientsApiActionTypes.LoadPatientEventsFailure):
    case (PatientApiActions.PatientsApiActionTypes.LoadPatientsFailure):
    case (PatientApiActions.PatientsApiActionTypes.CreatePatientFailure):
    case (PatientApiActions.PatientsApiActionTypes.EditPatientFailure):
    case (PatientApiActions.PatientsApiActionTypes.GetPatientFailure):
    case (PatientApiActions.PatientsApiActionTypes.RemovePatientUserFailure):
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
 * get the current error state for patient pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the patient pages
 * @param state
 */
export const getPending = (state: State) => state.pending;
