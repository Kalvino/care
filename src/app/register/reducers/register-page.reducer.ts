import { RegisterPageActions, RegisterApiActions } from '../actions';

/**
 * define the state for registration page
 */
export interface State {
  error: string | null;
  pending: boolean;
}

// initial state
export const initialState = {
  error: null,
  pending: false
};

/**
 * reducer for registration page actions
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: RegisterPageActions.RegistrationPageActionsUnion | RegisterApiActions.RegistrationApiActionsUnion
): State {
  switch (action.type) {

    case (RegisterPageActions.RegistrationPageActionTypes.Register):
      return {
        ...state,
        error: null,
        pending: true
      };

    case (RegisterApiActions.RegistrationApiActionTypes.RegistrationSuccess):
      return {
        ...state,
        error: null,
        pending: false
      };

    case (RegisterApiActions.RegistrationApiActionTypes.RegistrationFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}

// features selectors to access portions of the state
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
