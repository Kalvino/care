import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

/**
 * The main wrapping component for the app.
 */
@Component({
  selector: 'care-root',
  template: `
    <ion-app>
      <router-outlet></router-outlet>
    </ion-app>`
})
export class AppComponent {

  /**
   * constructor bootstrap ionic / cordova app
   * @param platform
   * @param splashScreen
   * @param statusBar
   * @param translate translation service
   * @param localId
   */
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    @Inject(LOCALE_ID) private localId: string
  ) {

    translate.setDefaultLang(localId);
    translate.use(localId);

    this.initializeApp();
  }

  

  /**
   * init the app
   * some default code from IONIC
   * Bootstrap additional stuff for the app here if necessary
   */
  initializeApp() {
    this.platform.ready()
      .then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        /**
         * remove the spinner
         */
        document.getElementById('loader').outerHTML = '';
      });
  }
}
