import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromHome from '../../../reducers';
import { PatientActions, PatientWsActions } from '../../../actions';
import { select, Store } from '@ngrx/store';
import { Patient } from '../../../../core/models/patient';
import { SocketService } from '../../../../core/services/socket.service';

/**
 * shows the event history of a patient
 */
@Component({
  selector: 'care-patient-event-history',
  templateUrl: './patient-event-history.component.html'
})
export class PatientEventHistoryComponent implements OnInit, OnDestroy {

  /**
   * events$ subscr. to events to display in the history
   */
  events$ = this.store
    .pipe(
      select(fromHome.getPatientEvents)
    );

  /**
   * patient selected patient
   */
  patient = null;

  /**
   * pending$ subsr. to pending state
   */
  pending$ = this.store
    .pipe(
      select(fromHome.getPatientPagePending)
    );

  /**
   * patientSubscription subscription for the patients, needs unsubscription onDestroy
   */
  private patientSubscription;

  /**
   * historySubscription subscription to the history, needs unsubs. onDestroy
   */
  private historySubscription;

  /**
   * constructor
   */
  constructor(
    private store: Store<fromHome.State>,
    private socketService: SocketService) {

    this.store.dispatch(new PatientWsActions.ConnectClient());
  }

  /**
   * init component
   */
  ngOnInit() {
    this.patientSubscription = this.store
      .pipe(
        select(fromHome.getSelectedPatient)
      )
      .subscribe((patient: Patient) => {

        this.patient = patient;
        this.store.dispatch(
          new PatientActions.LoadPatientEvents({patient: patient})
        );

        this.store.dispatch(
          new PatientWsActions.SubscribeEvents({patientId: patient._id})
        );
      });

    // listen to incoming new events
    this.historySubscription = this.socketService.onHistoryEvent()
      .subscribe(events => {
        if (events) {
          this.store.dispatch(new PatientWsActions.IncomingPatientEvents({events}));
        }
      });
  }

  /**
   * callback for life cycle hook destroy
   */
  ngOnDestroy() {
    this.patientSubscription.unsubscribe();
    this.historySubscription.unsubscribe();

    // unsubscribe and disconnect from WS
    // to save battery
    this.store.dispatch(
      new PatientWsActions.UnsubscribeEvents({patientId: this.patient._id})
    );
    this.store.dispatch(new PatientWsActions.DisconnectClient());
  }

  /**
   * button to update the history cklicked
   */
  onUpdateHistory(event) {
    this.store.dispatch(
      new PatientActions.LoadPatientEvents({patient: this.patient})
    );
    event.target.complete();
  }

}
