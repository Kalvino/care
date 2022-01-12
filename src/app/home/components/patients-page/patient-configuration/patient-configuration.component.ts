import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPatient from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../../../../core/models/patient';
import { Router } from '@angular/router';

/**
 * initialConfig the initial config for the form
 */
export const initialConfig = {
  wound_prevention: {
    active: false,
    interval: 60
  },
  fall_prevention: {
    active: false,
    interval: 5,
    start: null,
    end: null
  },
  fall_detection: {
    active: false,
    always: false,
    laying: false,
    inactive: false
  },
  activity_profile: {
    active: false
  },
  geofencing: {
    active: false
  },
  active_tracking: {
    active: false
  }
};

/**
 * patient configuration component
 */
@Component({
  selector: 'care-patient-configuration',
  templateUrl: './patient-configuration.component.html',
  styleUrls: ['./patient-configuration.component.scss']
})
export class PatientConfigurationComponent implements OnInit, OnDestroy {

  /**
   * config$ subsc. for the config from the local storage
   */
  config$ = new BehaviorSubject<any>(initialConfig);

  /**
   * checked indicates if a section is en-/disabled
   */
  checked = this.config$.asObservable();

  /**
   * configuration the configuration object
   */
  configuration = initialConfig;

  /**
   * patient selected patient
   */
  patient: Patient = null;

  /**
   * construct
   * @param {Store} store
   * @param {Storage} storage
   * @param {Router} router
   */
  constructor(
    private store: Store<fromPatient.State | fromAuth.State>,
    private storage: Storage,
    private router: Router
  ) {
  }

  /**
   * on init
   */
  ngOnInit() {

    this.store.pipe(
      select(fromPatient.getSelectedPatient),
    ).subscribe(patient => {
      this.patient = patient;

      if (this.patient) {
        this.storage.get(`PATIENT_CONFIG_${this.patient._id}`)
          .then(config => {
            if (config) {
              this.configuration = config;
              this.config$.next(config);
            } else {
              this.configuration = initialConfig;
              this.config$.next(initialConfig);
            }
          });
      }

    });
  }

  /**
   * on destroy callback
   */
  ngOnDestroy(): void {
  }

  /**
   * navigate to sub-views for the
   * configuration
   * @param link
   */
  navigateTo(link) {
    this.router.navigate(['/', 'patients', 'details', link]);
  }
}
