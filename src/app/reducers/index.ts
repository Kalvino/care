import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from '../home/reducers/layout.reducer';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { storageSync } from 'ngrx-6-store-ionic-storage';

/**
 * define global state
 */
export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState;
}

/**
 * create action reducers
 */
export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer
};

/**
 * meta reducer to log state and action
 * console.log all actions
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    // console.log('action', action);
    // console.log('state', state);
    return reducer(state, action);
  };
}


/**
 * meta reducer to sync with ionic storage
 * @param reducer
 */
export function ionicStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any, any> {
  return storageSync({
    keys: ['auth', 'home'],
    ignoreActions: [
      'ROUTER_NAVIGATION',
      '[Auth] Rehydrate User State'
    ],
    onSyncError: (err) => {
      console.error(err);
    }
  })(reducer);
}

/**
 * export all metareducers depending of build target
 * e.g. logger will not be part of production
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, ionicStorageSyncReducer]
  : [ionicStorageSyncReducer];

/**
 * feature selector to obtain layout state
 */
export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
  'layout'
);

/**
 * selector to obtain sidenav state
 */
export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
