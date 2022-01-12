import { Action } from '@ngrx/store';

/**
 * layout action types
 */
export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav'
}

/**
 * action open sidenav
 */
export class OpenSidenav implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = LayoutActionTypes.OpenSidenav;
}

/**
 * action closing sidenav
 */
export class CloseSidenav implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = LayoutActionTypes.CloseSidenav;
}

/**
 * exports the actions as type
 */
export type LayoutActionsUnion = OpenSidenav | CloseSidenav;
