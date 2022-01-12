import { Action } from '@ngrx/store';

/**
 * enum for loader action types
 */
export enum LoaderActionTypes {
  ShowLoader = '[Loader] Show',
  HideLoader = '[Loader] Hide'
}

/**
 * export action to show the loader
 */
export class ShowLoader implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = LoaderActionTypes.ShowLoader;
}

/**
 * action to hide a loader
 */
export class HideLoader implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = LoaderActionTypes.HideLoader;
}

/**
 * exports the actions as type
 */
export type LoaderActionsUnion = ShowLoader | HideLoader;
