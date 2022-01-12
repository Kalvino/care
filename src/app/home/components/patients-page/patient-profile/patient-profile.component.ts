import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import { Patient } from '../../../../core/models/patient';
import { Router } from '@angular/router';

/**
 * PatientProfileComponent
 */
@Component({
  selector: 'care-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

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
   * Constructor
   * @param {Store} store
   * @param {Router} router
   */
  public constructor(
    private store: Store<fromHome.State>,
    private router: Router
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

  /**
   *start editing the profile
   */
  onStartEdit() {
    this.router.navigate(['/patients/details/edit']);
  }
}
