import { Injectable } from '@angular/core';
import { RegistrationCredentials } from '../models/registration';
import { User } from '../../core/models/user';
import { Observable, of } from 'rxjs';

/**
 * registration service
 * bundles the api calls
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /**
   * register a new admin @ the API
   * @param username
   * @param email
   * @param password
   */
  register({username, email, password}: RegistrationCredentials): Observable<User> {
    // TODO: implement API request / response
    return of({
      id: 1,
      lastname: 'Wrust',
      firstname: 'Hans',
      username: 'hw',
      email: 'hans@wurst.de'
    });
  }
}
