import { Component } from '@angular/core';
import { Patient } from '../../../../core/models/patient';
import * as fromHome from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

/**
 * component to display the status for a selected patient
 */
@Component({
  selector: 'care-patient-status',
  templateUrl: './patient-status.component.html',
  styleUrls: ['./patient-status.component.scss']
})
export class PatientStatusComponent {

  /**
   * the patient object
   */
  patient$: Observable<Patient> = this.store.pipe(
    select(fromHome.getSelectedPatient)
  );

  /**
   * constructor
   * @param store
   */
  constructor(private store: Store<fromHome.State>) {
  }

  /**
   * @ignore
   */
  defaults = {
    active: 'active',
    wearing: 'connected',
    today: new Date(),
    battery: '6h 13m',
    fm_version: '2.3.122',
    app_version: '1.0.0',
  };

}
