import { AuthApiActions, LoginPageActions } from '../actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

/**
 * definition of login page state
 */
export interface State {
  error: string | null;
  pending: boolean;
}

/**
 * initialState the initial state
 */
export const initialState: State = {
  error: null,
  pending: false
};

/**
 * reducer function for the login page actions
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: AuthApiActions.AuthApiActionsUnion
    | LoginPageActions.LoginPageActionsUnion
    | RouterNavigationAction
): State {
  switch (action.type) {

    case (LoginPageActions.LoginPageActionTypes.Login):
      return {
        ...state,
        error: null,
        pending: true,
      };

    case (ROUTER_NAVIGATION):
    case (AuthApiActions.AuthApiActionTypes.LoginSuccess):
      return {
        ...state,
        error: null,
        pending: false
      };

    case (AuthApiActions.AuthApiActionTypes.LoginFailure):
      return {
        ...state,
        error: action.payload.message,
        pending: false
      };

    default:
      return state;
  }
}

/**
 * feature functions to access current state
 * @param state the state
 */
export const getError = (state: State) => state.error;

/**
 * get pending from state
 * @param state
 */
export const getPending = (state: State) => state.pending;
