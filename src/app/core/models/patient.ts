import { Device } from './device';
import { User } from './user';
import { INursingHome } from './nursing-home';

export interface Contact {
  id?: number;
  label?: string;
  name?: string;
  address?: string;
  phone?: string;
  isPrimary?: boolean;
}

/**
 * Patient patient defintion
 */
export interface Patient {
  device?: Device;
  device_id?: number | null;
  firstName?: string | null;
  gender?: string | null;
  _id?: string | null; // auto generated from DB
  image?: string; // url or base64 encoded image?
  lastName?: string;
  nursing_home?: INursingHome;
  nursing_home_id?: number | null;
  phone?: string; // optional
  users?: User[];
  contacts?: Contact[];

  ward?: string | null;
  roomNo?: string | null;
  patientNumber?: string | null;
}
