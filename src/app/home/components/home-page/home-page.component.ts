import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromPatient from '../../reducers';
import { User } from '../../../core/models/user';
import { PatientPageActions, PatientActions } from '../../actions';
import { Observable } from 'rxjs';
import { Patient } from '../../../core/models/patient';

import { FcmService } from '../../../core/services/fcm.service';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { NavigationService } from "../../services/navigation.service";
import { IMenuItem } from "../../../core/models/menu.model";

/**
 * home page component
 */
@Component({
  selector: 'care-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  /**
   * patients$ patients observable
   */
  patients$: Observable<Patient[]> = this.store.pipe(
    select(fromPatient.getAllPatients)
  );

  public menuItems: IMenuItem[];

  /**
   * the current user
   */
  currentUser: User;

  /**
   * constructor
   * @param {Router} router
   * @param {Store} store
   * @param {ActivatedRoute} activatedRoute
   */
  constructor(
    private router: Router,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private fcm: FcmService,
    public toastController: ToastController,
    private navigationService: NavigationService
  ) {

  }

  /**
   * init the component
   */
  ngOnInit() {

    this.activatedRoute.data.subscribe(user => {
      console.log(user);
      this.currentUser = user;
    })

    this.navigationService.menuItems$.subscribe(menu => {
      console.log(menu);
      this.menuItems = menu;
    })
    
    this.notificationSetup();
  }

  /**
   * click on add device button
   */
  onCheckDevice() {
    this.router.navigate(['/', 'devices', 'add']);
  }

  /**
   * 
   * @param message Firebase message
   */
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  /**
   * Get device Token from Firebase
   */
  private notificationSetup() {
    // Get FCM Token
    /**
     * supply currentUser's Id for saving into Firebase Collection
     * to link the device Token with the loggedIn user 
     */
    this.fcm.getToken(this.currentUser._id);

    // Show a toast on notification
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }
}

