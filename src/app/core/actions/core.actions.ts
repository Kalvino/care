import { Action } from '@ngrx/store';

/**
 * core action types
 */
export enum CoreActionTypes {
  RedirectHome = '[Core] Redirect Home',
  ResetFormsState = '[Core] Reset Forms State',
  DoNothing = '[Core] Do Nothing'
}

/**
 * action class to redirect to start page
 */
export class RedirectHome implements Action {
  /**
   * type assign type string in class
   */
  readonly type = CoreActionTypes.RedirectHome;
}

/**
 * trigger this action to reset all froms
 * to the default state error: null, pending: false
 */
export class ResetFormsState implements Action {
  /**
   * type set the type from enum definitions
   */
  readonly type = CoreActionTypes.ResetFormsState;
}

/**
 * do nothing class is for some
 * effects to return a action class
 * but they should do nothing
 */
export class DoNothing implements Action {
  /**
   * type set the type from enum definitions
   */
  readonly type = CoreActionTypes.DoNothing;
}

/**
 * export actions as type
 */
export type CoreActionsUnion =
  | RedirectHome
  | ResetFormsState
  | DoNothing;
