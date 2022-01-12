/**
 * ApiResponse definition for default api response
 */
import { Patient } from './patient';
import { Device } from './device';

export interface ApiResponse {
  code?: number;
  error?: object;
  data?: object[];
}

/**
 * SingleMessageResponse definition for single message response
 * refer to swagger definition for care
 */
export interface SingleMessageResponse {
  message?: string;
}

/**
 * definition of response
 * when checking the AdminCode for
 * a device
 */
export interface IAdminCodeResponse {
  patient?: Patient;
  device?: Device;
  in_use?: number;
}
