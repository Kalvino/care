import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../core/models/patient';
import { Observable } from 'rxjs';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { select, Store } from '@ngrx/store';
import { PatientActions, PatientPageActions } from '../../../actions';
import { User } from '../../../../core/models/user';
import { INotification } from '../../../../core/models/notification';

/**
 * parent component for most of the patient list views
 */
@Component({
  selector: 'care-patients-list-page',
  templateUrl: './patients-list-page.component.html'
})
export class PatientsListPageComponent implements OnInit {

  /**
   * patients$ subscription to all patients from state
   */
  patients$: Observable<Patient[]> = this.store.pipe(
    select(fromHome.getAllPatients)
  );

  /**
   * notifications$ subscr. with all notifications
   */
  notifications$: Observable<INotification[]> = this.store.pipe(
    select(fromHome.getAllNotifications)
  );

  /**
   * the current user
   */
  currentUser: User;

  /**
   * constructor
   * @param store
   */
  constructor(private store: Store<fromHome.State | fromAuth.State>) {
  }

  /**
   * init component
   */
  ngOnInit() {
    this.store.pipe(
      select(fromAuth.getUser)
    ).subscribe((user: User) => {
      this.currentUser = user;
      this.store.dispatch(new PatientPageActions.LoadPatients({user_id: user._id}));
    });
  }

  /**
   * start the refresher
   */
  onRefresh(event) {
    this.store.dispatch( new PatientPageActions.LoadPatients({user_id: this.currentUser._id}));
    event.target.complete();
  }

  /**
   * dispatch action for selected patient
   * @param patient
   */
  onPatientSelected(patient: Patient) {
    this.store.dispatch(new PatientActions.SelectPatient({_id: patient._id}));
  }

}
