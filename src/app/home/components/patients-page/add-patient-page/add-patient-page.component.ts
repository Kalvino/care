import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../core/models/patient';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { PatientPageActions } from '../../../actions';
import { select, Store } from '@ngrx/store';

/**
 * add patient page
 */
@Component({
  selector: 'care-add-patient-page',
  templateUrl: 'add-patient-page.component.html'
})
export class AddPatientPageComponent implements OnInit {

  /**
   * errors$ subscription of page errors
   */
  errors$ = this.store.pipe(
    select(fromHome.getPatientPageError)
  );

  /**
   * pending$ subscription for page pending
   */
  pending$ = this.store.pipe(
    select(fromHome.getPatientPagePending)
  );

  /**
   * unassignedDevice unassigned device
   */
  unassignedDevice = null;

  /**
   * currentUser the current user
   */
  currentUser = null;

  /**
   * constructor
   * @param store
   */
  constructor(
    private store: Store<any>
  ) {
  }

  /**
   * on init callback
   */
  ngOnInit() {
    // get unassigned device from store
    this.store.pipe(
      select(fromHome.getUnassignedDevice),
    ).subscribe(device => {
      this.unassignedDevice = device;
    });

    this.store.pipe(
      select(fromAuth.getUser),
    ).subscribe(user => {
      this.currentUser = user;
    });
  }

  /**
   * dispatch new action when form is submitted
   * @param patient
   */
  onFormSubmitted(patient: Patient) {
    patient = {
      ...patient,
      device_id: this.unassignedDevice.id
    };

    this.store.dispatch(new PatientPageActions.CreatePatient({patient}));
  }
}
