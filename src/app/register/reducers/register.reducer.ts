import { User } from '../../core/models/user';
import { RegisterApiActions } from '../actions';

/**
 * registration api state
 */
export interface State {
  user: User | null;
}

// initial state
export const initialState: State = {
  user: null
};

/**
 * reducer for registration api actions
 * @param state
 * @param action
 *
 * TODO: after successfull registration the api should return a valid access_token as well. Submit a LoginSuccess action and
 * TODO: redirect to the main page!
 */
export function reducer(
  state: State = initialState,
  action: RegisterApiActions.RegistrationApiActionsUnion
): State {
  switch (action.type) {

    case (RegisterApiActions.RegistrationApiActionTypes.RegistrationSuccess):
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;

  }
}
