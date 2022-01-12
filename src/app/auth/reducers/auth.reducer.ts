import { AuthActions, AuthApiActions } from '../actions';
import { User } from '../../core/models/user';

/**
 * auth state
 */
export interface State {
  user: User | null;
  access_token: string | null;
  facilityCodeActivated: boolean | null;
  facilityName: string | null;
  facilityCode: string | null;
}

/**
 * initialState auth initial state
 */
export const initialState: State = {
  user: null,
  access_token: null,
  facilityCodeActivated: null,
  facilityName:  null,
  facilityCode: null
};

/**
 * reducer function for auth actions
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: AuthApiActions.AuthApiActionsUnion | AuthActions.AuthActionsUnion
): State {

  switch (action.type) {

    // successfull login
    case (AuthApiActions.AuthApiActionTypes.LoginSuccess):
      return {
        ...state,
        user: action.payload.loginResponse.data,
        access_token: action.payload.loginResponse.token
      };

    // logout action
    case (AuthApiActions.AuthApiActionTypes.LogoutSuccess):
      return initialState;

    // rehydrate state for user
    case (AuthActions.AuthActionTypes.RehydrateUserState):
      if (!state.user && action.payload.user) {
        return {
          ...state,
          user: action.payload.user
        };
      }
      return state;

    // default state
    default:
      return state;
  }
}

/**
 * get user from state
 * @param state
 */
export const getUser = (state: State): User => state.user;

/**
 * get access token from state
 * @param state
 */
export const getAccessToken = (state: State) => state.access_token;
