import { AuthApiActions, ChangePwActions } from '../actions';
import { ChangePasswordActionTypes } from '../actions/change-pw-page.actions';
import { AuthApiActionTypes } from '../actions/auth-api.actions';

/**
 * confirm password page state interface definition
 */
export interface State {
  error: string[] | null;
  pending: boolean;
}

/**
 * initialState the init. State
 */
export const initialState: State = {
  error: null,
  pending: false
};

/**
 * reducer function for the confirm password page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: ChangePwActions.ChangePwPageActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {
  switch (action.type) {
    case ChangePasswordActionTypes.ChangePassword:
      return {
        ...state,
        pending: true,
        error: null
      };

    case AuthApiActionTypes.ChangePasswordSuccess:
    case AuthApiActionTypes.ChangePasswordRedirect:
      return {
        ...state,
        pending: false,
        error: null
      };

    case AuthApiActionTypes.ChangePasswordFailure:
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
 * getPending get pending state
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * getError get error state
 * @param state
 */
export const getError = (state: State) => state.error;
