import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SingleMessageResponse } from '../../core/models/api-response';

/**
 * API service for handling the notification
 * interface. Polling and marking a message as read
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * mark a notification as read in the API
   * @param notification_id
   */
  markAsRead(notification_id: number): Observable<SingleMessageResponse> {
    return this.http
      .put<SingleMessageResponse>(`${environment.host}/api/notifications/${notification_id}`, {});
  }
}
