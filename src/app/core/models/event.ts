/**
 * IEventType description of event types
 */
export interface IEventType {
  id?: number;
  code?: string;
  name?: string;
  event_category_id?: number;
  event_category?: IEventCategory;
}

export interface IEventCategory {
  id?: number;
  category?: string;
}

/**
 * IEvent description of the event
 */
export interface IEvent {
  id?: number;
  device_id?: number;
  event_type_id?: number;
  eventtype?: IEventType | null;
  event_created_at?: Date;
  patient_id?: number;
  raw_event_from_sensor?: string;
  isCritical?: boolean;
}
