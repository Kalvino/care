import * as fromRegister from './register.reducer';
import * as fromRegisterPage from './register-page.reducer';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterApiActions } from '../actions';

/**
 * define the registration page state
 */
export interface RegisterState {
  status: fromRegister.State;
  registerPage: fromRegisterPage.State;
}

// extend the root state with the RegisterState
export interface State extends fromRoot.State {
  register: RegisterState;
}

/**
 * define the Action reducers for the module
 */
export const reducers: ActionReducerMap<RegisterState, RegisterApiActions.RegistrationApiActionsUnion> = {
  status: fromRegister.reducer,
  registerPage: fromRegisterPage.reducer
};

// create feature selectors to access protion of the state
export const selectRegisterState = createFeatureSelector<State, RegisterState>('register');

// create feature selectors to access protion of the state
export const selectRegisterPageState = createSelector(
  selectRegisterState,
  (state: RegisterState) => state.registerPage
);

// create feature selectors to access protion of the state
export const getRegisterPageError = createSelector(
  selectRegisterPageState,
  fromRegisterPage.getError
);

// create feature selectors to access protion of the state
export const getRegisterPagePending = createSelector(
  selectRegisterPageState,
  fromRegisterPage.getPending
);
