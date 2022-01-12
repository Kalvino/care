import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './core/containers/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { StorageSyncEffects, STORAGE_STATE_KEY } from 'ngrx-6-store-ionic-storage';
import { AppEffects } from './core/effects/app.effects';
import * as fromAuth from './auth/reducers';
import { map, take } from 'rxjs/operators';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import de from '@angular/common/locales/de';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './core/services/fcm.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const FirebaseConfig = {
  apiKey: "AIzaSyBvKkdbdKGclKoiO2e-zACQn-BoYdadNh4",
  authDomain: "care-d8b9a.firebaseapp.com",
  databaseURL: "https://care-d8b9a.firebaseio.com",
  projectId: "care-d8b9a",
  storageBucket: "care-d8b9a.appspot.com",
  messagingSenderId: "814707174899"
};

/**
 * register locales
 * add locales here, when the app
 * offers more languages
 */
registerLocaleData(de);

/**
 * factory function to instantiate and config
 * the tranlation service
 * @param http
 */
export function createTanslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * factory function to obtain the access_token
 * @param store
 */
export function jwtOptionsFactory(store) {
  return {
    whitelistedDomains: environment.whitelistedDomains,
    skipWhenExpired: true,
    tokenGetter: () => {
      return store.pipe(
        select(fromAuth.getAccessToken),
        map(token => token),
        take(1)
      ).toPromise();
    }
  };
}

/**
 * init callback when bootstrapping the app
 */
export function initApplication(): Function {

  const ionicStorage = new Storage({});

  return () => new Promise(resolve => {
    ionicStorage
      .get('APP_STATE')
      .then(() => {
        resolve(true);
      });
  });
}

/**
 * get current locale from the navigator object
 * besides this you must include locales from Angular
 * like in line 36 to work
 */
export function setLocale(): string {

  let locale = 'de'; // standard locale

  if (typeof window['Intl'] !== 'undefined' && window.navigator.language) {
    locale = window['Intl'].getCanonicalLocales(window.navigator.language)[0];

    if (locale.indexOf('-') !== -1) {
      locale = locale.substr(0, 2);
    }
  }

  return locale;
}

/**
 * App Module
 */
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTanslateLoader),
        deps: [HttpClient]
      }
    }),
    AuthModule,
    RegisterModule,
    HomeModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'care App',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects, StorageSyncEffects]),
    CoreModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Store] // provide the store for the factory function
      }
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: APP_INITIALIZER, useFactory: initApplication, deps: [], multi: true},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: LOCALE_ID, useValue: setLocale()},
    Camera,
    FilePath,
    Base64,
    Firebase,
    FcmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
