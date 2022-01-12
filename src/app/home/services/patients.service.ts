import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Patient } from '../../core/models/patient';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { IEvent } from '../../core/models/event';
import { Update } from '@ngrx/entity';
import { User } from '../../core/models/user';

/**
 * service to bundle api actions for patients
 */
@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * get all patients from api
   */
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.host}/api/patients`);
  }

  /**
   * get details for a patient
   * @param patient_id
   */
  getPatient(patient_id: string): Observable<Patient> {
    return this.http
      .get<Patient>(`${environment.host}/api/patients/${patient_id}`)
      .pipe(
        catchError(err => {
          console.error(err);
          return of(undefined);
        })
      );
  }

  /**
   * edit a patient
   * @param changed
   */
  editPatient(changed: Update<Patient>): Observable<Patient> {
    return this.http
      .put<Patient>(`${environment.host}/api/patients/${changed.id}`, {...changed.changes});
  }

  /**
   * create a new patient
   * @param patient
   */
  createPatient(patient: Patient): Observable<Patient> {
    return this.http
      .post(`${environment.host}/api/patients`, {...patient});
  }

  /**
   * load eventlogs for a patient
   * @param patient
   */
  loadPatientEvents(patient: Patient): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`${environment.host}/api/patients/${patient._id}/events`);
  }

  /**
   * add the current user as admin
   * to the given patient
   * @param patient
   */
  addAdminuser(patient: Patient): Observable<Patient> {
    return this.http
      .post<Patient>(`${environment.host}/api/patients/${patient._id}/adminuser`, {});
  }

  /**
   * add current user as readonly
   * to the given patient
   * @param patient
   */
  addReadonlyuser(patient: Patient): Observable<Patient> {
    return this.http
      .post<Patient>(`${environment.host}/api/patients/${patient._id}/readonlyuser`, {});
  }

  /**
   * remove a user from a patient profile
   * @param {string} patient_id
   * @param {User} user
   */
  removeUser(patient_id: string, user: User): Observable<Patient> {
    return this.http.delete<Patient>(`${environment.host}/api/patients/${patient_id}/user/${user._id}`);
  }
}
