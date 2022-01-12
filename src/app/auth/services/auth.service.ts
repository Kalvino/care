import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Credentials } from '../models/credentials';
import { LoginResponse } from '../../core/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SingleMessageResponse } from '../../core/models/api-response';
import { IPassworConfirmation } from '../models/password';

/**
 * Auth Service class to provide global authentication actions
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * @param http
   * @param jwtHelper
   */
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  /**
   * log user in
   *
   * @param username
   * @param password
   */
  login({userName, password}: Credentials): Observable<LoginResponse> {
    if (userName && password) {
      return this.http
        .post<LoginResponse>(`${environment.host}/api/auth/levelthreeauth`, {userName: userName, password: password});
    } else {
      return throwError({error: {message: 'ERRORS.EMPTY_CREDENTIALS'}});
    }
  }

  /**
   * log user out of the API
   */
  logout() {
    return this.http.get(`${environment.host}/api/auth/logout`);
  }

  /**
   * change the password after initial login
   *
   * @param passwordConfirmation IPasswordConfirmation
   */
  changePassword(passwordConfirmation: IPassworConfirmation) {
    return this.http
      .put<SingleMessageResponse>(`${environment.host}/api/appusers/${passwordConfirmation.user_id}`, {
        password: passwordConfirmation.password,
        password_confirmation: passwordConfirmation.password_confirmation
      });
  }

}
