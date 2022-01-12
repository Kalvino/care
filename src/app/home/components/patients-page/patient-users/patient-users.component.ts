import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { Patient } from '../../../../core/models/patient';
import { User, USER_PATIENT_PERMISSIONS } from '../../../../core/models/user';
import { PatientPageActions } from '../../../actions';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * patient users component
 * shows a list of users assigned to the
 * patient
 */
@Component({
  selector: 'care-patient-users',
  templateUrl: './patient-users.component.html',
  styleUrls: ['./patient-user.component.scss']
})
export class PatientUsersComponent implements OnInit {

  errors$ = this.store.pipe(
    select(fromHome.getPatientPageError)
  );

  /**
   * the users of a patient
   */
  patientUsers$ = this.store.pipe(
    select(fromHome.getSelectedPatient),
    map(patient => this.selectedPatient = patient),
    withLatestFrom(
      this.store.pipe(
        select(fromAuth.getUser),
        map((currentUser) => {
          return this.currentUser = currentUser;
        })
      )),
    map(([patient, user]) => {
      return patient.users.filter(u => u._id !== this.currentUser._id);
    })
  );

  /**
   * current user
   */
  currentUser: User = null;

  /**
   * the current patient
   */
  selectedPatient: Patient = null;

  /**
   * admin code
   */
  adminPermission = USER_PATIENT_PERMISSIONS.ADMINISTRATOR;

  /**
   * read only code
   */
  readonlyPermission = USER_PATIENT_PERMISSIONS.READ_ONLY;

  /**
   * constructor
   * @param {Store} store
   */
  constructor(
    private store: Store<fromHome.State | fromAuth.State>
  ) {
  }

  /**
   * on init lifecycle callback
   */
  ngOnInit(): void {
  }

  /**
   * on delete a user
   */
  onDeleteUser(user: User): void {
    this.store.dispatch(new PatientPageActions.AlertRemoveUser({
        patient_id: this.selectedPatient._id,
        user: user
      }
    ));
  }

  /**
   * check, if the current user
   * is admin for the selected user
   */
  isAdmin() {
    let isAdmin = false;
    this.selectedPatient.users.map((user) => {
      if (user._id === this.currentUser._id
        && user.user_patient_permission === this.adminPermission) {
        return isAdmin = true;
      }
    });

    return isAdmin;
  }
}
