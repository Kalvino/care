import { LayoutActions } from '../actions/index';

/**
 * State definition of layout state
 */
export interface State {
  /**
   * showSidenav flag to indicate showing sidenav
   */
  showSidenav: boolean;
}

/**
 * initialState the initial state
 */
const initialState: State = {
  showSidenav: false
};

/**
 * reducer for the layout actions
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: LayoutActions.LayoutActionsUnion
): State {

  switch (action.type) {
    case LayoutActions.LayoutActionTypes.OpenSidenav: {
      return {
        ...state,
        showSidenav: true
      };
    }

    case LayoutActions.LayoutActionTypes.CloseSidenav: {
      return {
        ...state,
        showSidenav: false
      };
    }

    default:
      return state;
  }
}

/**
 * get the current state of the sidenav (true | false)
 * @param state
 * @return boolean
 */
export const getShowSidenav = (state: State) => state.showSidenav;
