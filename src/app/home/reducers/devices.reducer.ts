import { Device } from '../../core/models/device';
import { DeviceApiActions } from '../actions';
import { DeviceActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';

/**
 * extend entity state with additional fields
 */
export interface State extends EntityState<Device> {
  unassignedDevice: Device | null;
}

/**
 * enriches the state with collections and functions to access the collection
 */
export const adapter: EntityAdapter<Device> = createEntityAdapter<Device>({
  selectId: (device: Device) => device.id,
  sortComparer: false
});

/**
 * compose the initial state
 */
export const initialState: State = adapter.getInitialState({
  unassignedDevice: null
});

/**
 * reducer function devices action
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | DeviceApiActions.DevicesApiActionsUnion
    | DeviceActions.DevicesActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {
  switch (action.type) {

    // set unassigned device to the payload of the api success
    case DeviceActions.DevicesActionTypes.DeviceNotInUse:
      return {
        ...state,
        unassignedDevice: action.payload.device
      };

    // catch error if device fails and reset unassigned device to null
    case DeviceApiActions.DevicesApiActionTypes.CheckDeviceFailure:
      return {
        ...state,
        unassignedDevice: null
      };

    // reset unassigned device
    case DeviceActions.DevicesActionTypes.ResetUnassignedDevice:
      return {
        ...state,
        unassignedDevice: null
      };

    // reset complete state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case DeviceActions.DevicesActionTypes.ResetDevicesState:
      return initialState;

    // return default state
    default:
      return state;
  }
}

/**
 * export unassigned device from state to access via state selector
 */
export const getUnassignedDevice = (state: State) => state.unassignedDevice;
