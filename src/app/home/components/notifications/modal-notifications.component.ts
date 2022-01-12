import { Component } from '@angular/core';
import { INotification } from '../../../core/models/notification';
import { ModalController } from '@ionic/angular';
import * as fromHome from '../../reducers';
import { select, Store } from '@ngrx/store';
import { NotificationActions } from '../../actions';
import { TranslateService } from '@ngx-translate/core';
/**
 * Modal Notification Component
 * the content of the notification modal
 * handles actions to step through the array of notifications
 * and mark one as read
 */
@Component({
  selector: 'care-modal-notifications',
  templateUrl: 'modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.scss']
})
export class ModalNotificationsComponent {

  /**
   * errors$ get error in case
   */
  error$ = this.store.pipe(
    select(fromHome.getNotificationsError)
  );

  /**
   * pending$ get pending state for the page
   */
  pending$ = this.store.pipe(
    select(fromHome.getNotificationsPending)
  );

  /**
   * @private patients in state stored patients
   */
  private patients;

  /**
   * currentNotification the currently selected notification
   */
  currentNotification: INotification;

  /**
   * icon name of the currently selected notification
   */
  iconName: string;

  /**
   * notifications all notifications
   */
  notifications: INotification[];

  /**
   * currentIndex index for the current notification
   */
  private currentIndex = 0;

  /**
   * constructor
   * @param modalCtrl
   * @param store
   * @param translate
   */
  constructor(
    public modalCtrl: ModalController,
    private store: Store<fromHome.State>,
    private translate: TranslateService
  ) {

    store.pipe(
      select(fromHome.getAllNotifications)
    ).subscribe((notifications) => {
      this.notifications = notifications;
      this.currentNotification = this.notifications[this.currentIndex];
      console.log(this.iconName);
    });

    this.store.pipe(
      select(fromHome.getAllPatients)
    ).subscribe(patients => this.patients = patients);

    this.iconName = this.getIconName(this.currentNotification.event.eventtype.code);
  }

  /**
   * move to next notficiation
   */
  next() {
    if (this.hasNext()) {
      this.currentIndex += 1;
      this.currentNotification = this.notifications[this.currentIndex];
      this.iconName = this.getIconName(this.currentNotification.event.eventtype.code);
    }
  }

  /**
   * move to prev notification
   */
  prev() {
    if (this.hasPrev()) {
      this.currentIndex -= 1;
      this.currentNotification = this.notifications[this.currentIndex];
      this.iconName = this.getIconName(this.currentNotification.event.eventtype.code);
    }
  }

  /**
   * mark current notification as read
   */
  markAsRead() {
    this.store.dispatch(
      new NotificationActions.MarkNotificationAsRead({notification: this.currentNotification})
    );
  }

  /**
   * callback for clicking the accpet
   * button in notification
   */
  acceptNotification() {
    this.store.dispatch(
      new NotificationActions.AcceptNotification()
    );
  }

  /**
   * callback for clicking the reject
   * button in  notification
   */
  rejectNotification() {
    this.store.dispatch(
      new NotificationActions.RejectNotification()
    );
  }

  /**
   * return a dummy image (for the fair only)
   */
  getImageLink() {

    if (this.patients && this.patients.length > 0) {
      const found = this.patients.find(patient => patient.id === this.currentNotification.patient._id);
      if (found && found.image) {
        return found.image;
      }
    }

    return `/assets/img/tmp_patient_img/${this.currentNotification.patient.gender.toLowerCase()}/1.png`;
  }

  /**
   * translate and return text for the event
   */
  eventText() {
    if (!this.currentNotification.event) {
      return 'NOT DEFINED YET';
    }

    switch (this.currentNotification.event.eventtype.code) {
      case '057':
        return this.translate.instant(
          'NOTIFICATIONS.DESCRIPTION_FALL_DETECTION',
          {
            firstname: this.currentNotification.patient.firstName,
            lastname: this.currentNotification.patient.lastName
          }
        );
      case '021':
        return this.translate.instant(
          'NOTIFICATIONS.DESCRIPTION_WEARING_CONTROL',
          {
            firstname: this.currentNotification.patient.firstName,
            lastname: this.currentNotification.patient.lastName
          }
        );
      case '022':
        return this.translate.instant(
          'NOTIFICATIONS.DESCRIPTION_LOW_BATTERY',
          {
            firstname: this.currentNotification.patient.firstName,
            lastname: this.currentNotification.patient.lastName
          }
        );
    }
  }

  /**
   * is there a next message?
   */
  hasNext = () => this.notifications.length !== 0 && this.currentIndex + 1 < this.notifications.length;

  /**
   * has a prev item
   */
  hasPrev = () => this.notifications.length !== 0 && this.currentIndex !== 0;


  /**
   * maps a event code to an icon
   * @param event
   */
  
  getIconName(code) {
      switch (code) {
      case '022':
        return 'care-sensor-status';

      case '025':
      case '026':
        return 'care-geofencing';

      case '021':
        return 'care-fall';

      case '024':
      case '057':
        return 'care-ulcera';

      case '023':
      case 'S001':
        return 'care-alarm';

      default:
        return 'care-alarm';

    }
  }
}
