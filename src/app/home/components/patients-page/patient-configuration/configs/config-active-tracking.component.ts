import { Component } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'care-config-active-tracking',
  templateUrl: './config-active-tracking.component.html'
})
export class ConfigActiveTrackingComponent {
  configuration = {
    active_tracking: {
      active: false
    }
  };


  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService) {

    // open modal

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.translate.instant('ATTENTION!'),
      message: this.translate.instant('PATIENTS.CONFIGURATION.PositionTrackingActivePopup'),
      buttons: [
        {
          text: this.translate.instant('CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant('OK'),
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
