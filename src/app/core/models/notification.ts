import { IEvent } from './event';
import { Patient } from './patient';

/**
 * INotification interface definition for notifications
 */
export interface INotification {
  id?: number;
  event_id?: number;
  event_created_at?: Date;
  event?: IEvent;
  headline?: string;
  text?: string;
  status?: boolean;
  patient_id?: string;
  patient?: Patient;
  user_id?: string;
  headline_key?: string;
}
