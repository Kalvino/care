import {
  PatientActions,
  PatientApiActions,
  PatientPageActions,
  PatientWsActions
} from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Patient } from '../../core/models/patient';
import { AuthApiActions } from '../../auth/actions';
import { IEvent } from '../../core/models/event';

/**
 * state interface definition
 */
export interface State extends EntityState<Patient> {
  patientEvents: IEvent[] | null;
  selectedPatientId: string | null;
}

/**
 * extend & export entity adapater
 */
export const adapater: EntityAdapter<Patient> = createEntityAdapter<Patient>({
  selectId: (patient: Patient) => patient._id,
  sortComparer: false
});

/**
 * compose the initial state
 */
export const initialState: State = adapater.getInitialState({
  patientEvents: [],
  selectedPatientId: null
});

/**
 * reducer for the patients state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | PatientApiActions.PatientsApiActionsUnion
    | PatientPageActions.PatientsPageActionsUnion
    | PatientActions.PatientsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
    | PatientWsActions.PatientsWsActionsUnion
): State {

  switch (action.type) {

    // load patients success state
    case PatientApiActions.PatientsApiActionTypes.LoadPatientsSuccess:
      return adapater.addAll(action.payload.patients, state);

    // add a new entity to the state in case creation is successful
    case PatientApiActions.PatientsApiActionTypes.CreatePatientSuccess:
      return adapater.addOne(action.payload.patient, state);

    // update or insert the returned patient in the adapter
    case PatientApiActions.PatientsApiActionTypes.AddPatientAdminuserSuccess:
    case PatientApiActions.PatientsApiActionTypes.EditPatientSuccess:
    case PatientApiActions.PatientsApiActionTypes.RemovePatientUserSuccess:
    case PatientApiActions.PatientsApiActionTypes.AddPatientReadonlyUserSuccess:
      return adapater.upsertOne(action.payload.patient, state);

    // case select patient
    case PatientApiActions.PatientsApiActionTypes.GetPatientSuccess:
      return adapater.upsertOne(action.payload.patient, {
        ...state,
        patientEvents: [],
        selectedPatientId: action.payload.patient._id
      });

    // reduce patient events
    case PatientApiActions.PatientsApiActionTypes.LoadPatientEventsSuccess:
      return {
        ...state,
        patientEvents: action.payload.events
      };

    // update patient events with incoming events
    case PatientWsActions.PatientsWsActionTypes.IncomingPatientEvents:
      return {
        ...state,
        patientEvents: state.patientEvents.concat(action.payload.events)
      };

    case PatientApiActions.PatientsApiActionTypes.LoadPatientEventsFailure:
      return {
        ...state,
        patientEvents: []
      };

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case PatientActions.PatientsActionTypes.ResetPatientsState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected patient id from the state
 * @param state
 */
export const getSelectedPatientId = (state: State) => state.selectedPatientId;

/**
 * get the patient events from the state
 * @param state
 */
export const getPatientEvents = (state: State) => {
  return state.patientEvents.sort((a: IEvent, b: IEvent) => {
    if (a.event_created_at === b.event_created_at) {
      return 0;
    }
    return (a.event_created_at < b.event_created_at) ? 1 : -1;
  });
};
