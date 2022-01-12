import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromConfirmPwPage from './confirm-pw-page.reducer';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';


/**
 * state definition for gloabal state
 */
export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  confirmPwPage: fromConfirmPwPage.State;
}

/**
 * extend root state with AuthState
 */
export interface State extends fromRoot.State {
  auth: AuthState;
}

/**
 * action reducer map
 */
export const reducers: ActionReducerMap<AuthState, any> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  confirmPwPage: fromConfirmPwPage.reducer
};

/**
 * feature selector to access auth state
 */
export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

/**
 * select the auth state
 */
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

/**
 * jwtHelperService JwtHelperService
 */
const jwtHelperService = new JwtHelperService();

/**
 * selector to get the user from state
 */
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

/**
 * selector to get access token from state
 */
export const getAccessToken = createSelector(selectAuthStatusState, fromAuth.getAccessToken);

/**
 * selector to test if user is logged in
 */
export const isLoggedIn = createSelector(selectAuthStatusState, state => {
  //TODO check tocken expiry
  // return state.user && state.access_token && !jwtHelperService.isTokenExpired(state.access_token);
  return state.user && state.access_token;
});

export const userRole = createSelector(selectAuthStatusState, state => {
  const token = state.access_token;
  const decodeToken = jwtHelperService.decodeToken(token);
  const userRole = decodeToken.role;

  console.log(userRole);

  return userRole;
});

/**
 * selector to get login page pending state
 */
export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

/**
 * feature selector to get error from state
 */
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

/**
 * feature selector to get pending from state
 */
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

/**
 * feature selector for change password page state
 */
export const selectConfirmPwPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.confirmPwPage
);

/**
 * feature selector to get pending from state
 */
export const getConfirmPwPagePending = createSelector(
  selectConfirmPwPageState,
  fromConfirmPwPage.getPending
);

/**
 * feature selector to get error from state
 */
export const getConfirmPwPageError = createSelector(
  selectConfirmPwPageState,
  fromConfirmPwPage.getError
);
