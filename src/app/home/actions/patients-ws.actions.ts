/**
 * websocket action types
 */
import { Action } from '@ngrx/store';
import { IEvent } from '../../core/models/event';

export enum PatientsWsActionTypes {
  ConnectClient = '[Patients/WS] Connect Client',
  DisconnectClient = '[Patients/WS] Disonnect Client',
  SubscribeEvents = '[Patients/WS] Subscribe Events',
  UnsubscribeEvents = '[Patients/WS] Unsubscribe Events',
  IncomingPatientEvents = '[Patients/WS] Incoming Patient Events'
}

/**
 * action to connect to the patients WS client
 */
export class ConnectClient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsWsActionTypes.ConnectClient;
}

/**
 * action to disconnect from the patients WS client
 */
export class DisconnectClient implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsWsActionTypes.DisconnectClient;
}

/**
 * subscribe to event stream
 */
export class SubscribeEvents implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsWsActionTypes.SubscribeEvents;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { patientId: string }) {
  }
}

/**
 * action to unsubscribe from event stream
 */
export class UnsubscribeEvents implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsWsActionTypes.UnsubscribeEvents;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { patientId: string }) {
  }
}

/**
 * class for incomming events via websocket
 */
export class IncomingPatientEvents implements Action {
  /**
   * type assign string to the type class
   */
  readonly type = PatientsWsActionTypes.IncomingPatientEvents;

  /**
   * constructor
   * @param payload
   */
  constructor(public payload: { events: IEvent[] }) {
  }
}

/**
 * export action types
 */
export type PatientsWsActionsUnion =
  | ConnectClient
  | DisconnectClient
  | IncomingPatientEvents
  | SubscribeEvents
  | UnsubscribeEvents;
