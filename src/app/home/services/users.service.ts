import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { INotification } from '../../core/models/notification';
import { Patient } from '../../core/models/patient';

/**
 * service for the API endpoint handling
 * everything about users
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * get all users
   */
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.host}/api/users`)
      .pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
  }

  /**
   * get patients for a user
   * @param user_id
   */
  getUserPatients(user_id: string): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(`${environment.host}/api/users/${user_id}/patients`);
  }

  /**
   * get notifications of a user
   * @param users_id
   */
  getNotifications(users_id: string): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${environment.host}/api/users/${users_id}/notifications`);
  }

}
