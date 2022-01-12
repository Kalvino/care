import * as fromDevices from './devices.reducer';
import * as fromDevicePage from './devices-page.reducer';
import * as fromPatientPage from './patients-page.reducer';
import * as fromRoot from '../../reducers';
import * as fromPatients from './patients.reducer';
import * as fromNotifications from './notifications.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * compose device state for global store
 */
export interface HomeState {
  devicePage: fromDevicePage.State;
  devices: fromDevices.State;
  patientPage: fromPatientPage.State;
  patients: fromPatients.State;
  notifications: fromNotifications.State;
}

/**
 * assign state to global store
 */
export interface State extends fromRoot.State {
  home: HomeState;
}

/**
 * compose action reducers
 */
export const reducers: ActionReducerMap<HomeState, any> = {
  devicePage: fromDevicePage.reducer,
  devices: fromDevices.reducer,
  patientPage: fromPatientPage.reducer,
  patients: fromPatients.reducer,
  notifications: fromNotifications.reducer
};

/**
 * create feature selectors
 */
export const getHomeState = createFeatureSelector<State, HomeState>('home');

// ****************** DEVICES PAGE *************

/**
 * selector to get the home state
 */
export const getDevicePageState = createSelector(
  getHomeState,
  (state: HomeState) => state.devicePage);

/**
 * get devices page error from state
 */
export const getDevicePageError = createSelector(
  getDevicePageState,
  fromDevicePage.getError
);

/**
 * get pending state for device page
 */
export const getDevicePagePending = createSelector(
  getDevicePageState, fromDevicePage.getPending
);

// ****************** DEVICES *************

/**
 * get state from the devices state
 */
export const getDevicesState = createSelector(
  getHomeState,
  (state: HomeState) => state.devices
);

/**
 * get unassigned device
 */
export const getUnassignedDevice = createSelector(
  getDevicesState, fromDevices.getUnassignedDevice
);

// ****************** PATIENTS PAGE *************

/**
 * selector to get state from patients page
 */
export const getPatientsPageState = createSelector(
  getHomeState,
  (state: HomeState) => state.patientPage
);

/**
 * get error for patients page
 */
export const getPatientPageError = createSelector(
  getPatientsPageState,
  fromPatientPage.getError
);

/**
 * get pending from patients page
 */
export const getPatientPagePending = createSelector(
  getPatientsPageState,
  fromPatientPage.getPending
);

// ****************** PATIENTS *************

/**
 * selector to get the state for patients
 */
export const getPatientsState = createSelector(
  getHomeState,
  (state: HomeState) => state.patients
);

/**
 * get the selected patient id from state
 */
export const getSelectedPatientId = createSelector(
  getPatientsState,
  fromPatients.getSelectedPatientId
);

/**
 * deconstruct several functions from ngrx/entity
 */
export const {
  selectIds: getPatientsIds,
  selectEntities: getPatientEntities,
  selectAll: getAllPatients,
  selectTotal: getTotalPatients
} = fromPatients.adapater.getSelectors(getPatientsState);

/**
 * get the selected patient from the state / patients collection
 */
export const getSelectedPatient = createSelector(
  getPatientEntities,
  getSelectedPatientId,
  (entities, id) => entities[id]
);

/**
 * get loaded patient events
 */
export const getPatientEvents = createSelector(
  getPatientsState,
  fromPatients.getPatientEvents
);

// ****************** NOTIFICATIONS *************

/**
 * get the notifications state from the home state
 */
export const getNotificationsState = createSelector(
  getHomeState,
  (state: HomeState) => state.notifications
);


/**
 * get the notifications error state
 */
export const getNotificationsError = createSelector(
  getNotificationsState,
  fromNotifications.getError
);

/**
 * get pending state
 */
export const getNotificationsPending = createSelector(
  getNotificationsState,
  fromNotifications.getPending
);

/**
 * deconstruct selectors from entity adapter (auto generated from NGRX)
 */
export const {
  selectIds: getNotificationIds,
  selectEntities: getNotificationEntities,
  selectAll: getAllNotifications,
  selectTotal: getTotalNotifications
} = fromNotifications.adapter.getSelectors(getNotificationsState);
