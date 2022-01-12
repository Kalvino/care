import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Patient } from '../../../../../../core/models/patient';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../../../../reducers';

/**
 * patient list item for the patient overview page
 */
@Component({
  selector: 'care-patients-list-item',
  styleUrls: ['./patients-list-item.component.scss'],
  template: `
    <div class="patients-list-item">
      <div class="patient-image" slot="start">
        <div class="small-image-wrapper">
          <img [alt]="patient.firstName + ' ' + patient.lastName"
               [src]="patient.image"
               class="small-image"
               [title]="patient.firstName + ' ' + patient.lastName"/>
        </div>
      </div>

      <div class="patient-details">
        <span class="row">{{patient.firstName}} {{patient.lastName}}</span>
        <span class="row small">{{'DEVICES.SERIAL_NO' | translate}} {{patient.device.serial_no}}</span>
      </div>

      <div class="notify-badge" slot="end" *ngIf="noOfNotifications > 0">
        <ion-badge [color]="'primary'">{{noOfNotifications}}</ion-badge>
      </div>
    </div>`
})
export class PatientsListItemComponent implements OnInit, OnDestroy {

  /**
   * patient the patient injected from the list
   */
  @Input() patient: Patient;

  /**
   * notifications current notifications
   */
  notifications = null;

  /**
   * noOfNotifications num of notifications for a patient
   */
  noOfNotifications = 0;

  /**
   * notificationSubscription subscription
   */
  private notificationSubscription = null;

  /**
   * constructor
   * @param store
   * @param cdRef
   */
  constructor(
    private store: Store<fromHome.State>,
    private cdRef: ChangeDetectorRef
  ) {
  }

  /**
   * on init lifecycle hook
   */
  ngOnInit() {
    this.notificationSubscription = this.store.pipe(
      select(fromHome.getAllNotifications)
    ).subscribe(
      notifications => {
        this.notifications = notifications;

        const filtered = notifications.filter((notification) => notification.patient_id === this.patient._id);

        this.noOfNotifications = filtered.length;

        this.cdRef.detectChanges();
      }
    );
  }

  /**
   * destroy lifecycle hook
   */
  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

}
