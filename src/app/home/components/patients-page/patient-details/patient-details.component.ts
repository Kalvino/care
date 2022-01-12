import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { Patient } from '../../../../core/models/patient';

/**
 * component shows the patient details
 */
@Component({
  selector: 'care-patient-details',
  styleUrls: ['./patient-details.component.scss'],
  templateUrl: './patient-details.component.html'
})
export class PatientDetailsComponent implements OnInit {

  /**
   * errors
   */
  errors$ = this.store.pipe(
    select(fromHome.getPatientPageError)
  );

  /**
   * patients$ patient details loaded from collection
   */
  patient: Patient = null;

  /**
   * constructor
   * @param {Store} store
   */
  constructor(
    private store: Store<fromHome.State | fromAuth.State>,
  ) {
  }

  /**
   * on init callback
   */
  ngOnInit(): void {
    this.store
      .pipe(
        select(fromHome.getSelectedPatient)
      ).subscribe(patient => this.patient = patient);
  }

}


