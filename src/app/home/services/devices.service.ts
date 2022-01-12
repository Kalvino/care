import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../core/models/device';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAdminCodeResponse } from '../../core/models/api-response';

/**
 * device service bundles api actions
 */
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  /**
   * device service constructor
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * get all devices
   */
  getDevices(): Observable<Device[]> {
    return this.http
      .get<Device[]>(`${environment.host}/api/devices`);
  }

  /**
   * add a new device
   * @param code
   */
  checkDevice(code): Observable<IAdminCodeResponse> {
    return this.http
      .get<IAdminCodeResponse>(`${environment.host}/api/devices/processcode/${code.code}`);
  }

}
