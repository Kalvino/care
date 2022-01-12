import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  DevicePageActions,
  DeviceActions,
  PatientActions
} from '../actions';
import { LoaderActions, CoreActions } from '../../core/actions';
import { catchError, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { DevicesService } from '../services/devices.service';
import { DeviceApiActions } from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AlertController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { TranslateService } from '@ngx-translate/core';
import * as fromAuth from '../../auth/reducers';

/**
 * devices effects contains all effects for
 * handling the devices states and actions
 */
@Injectable()
export class DevicesEffects {

  /**
   * check device effect: API call to check availablilty of device
   */
  @Effect()
  checkDevice$ = this.actions$
    .pipe(
      ofType<DevicePageActions.CheckDevice>(DevicePageActions.DevicesPageActionTypes.CheckDevice),
      map(action => action.payload.code),
      exhaustMap(code => {

        this.store.dispatch(new LoaderActions.ShowLoader());
        this.store.dispatch(new CoreActions.ResetFormsState());

        return this.devicesService.checkDevice(code)
          .pipe(
            map(response =>
              new DeviceApiActions.CheckDeviceSuccess({response: response, code: code})
            ),
            catchError(httpResponse => {
              const message = 'DEVICES.' + httpResponse.error.error.toLowerCase();
              return of(new DeviceApiActions.CheckDeviceFailure({message}));
            }),
            tap(() => {
              this.store.dispatch(new LoaderActions.HideLoader());
            })
          );
      })
    );

  /**
   * listen to the check device success
   */
  @Effect()
  checkDeviceSuccess$ = this.actions$
    .pipe(
      ofType<DeviceApiActions.CheckDeviceSuccess>(DeviceApiActions.DevicesApiActionTypes.CheckDeviceSuccess),
      map(action => action.payload),
      map(payload => {
        if (payload.response.in_use) {
          return new DeviceActions.DeviceInUse({patient: payload.response.patient, code: payload.code});
        } else {
          return new DeviceActions.DeviceNotInUse({device: payload.response.device});
        }
      })
    );

  /**
   * effect to redirect to the patients add page
   * it the device is not in use
   */
  @Effect({
    dispatch: false
  })
  deviceNotInUse$ = this.actions$
    .pipe(
      ofType(DeviceActions.DevicesActionTypes.DeviceNotInUse),
      tap(() => this.router.navigate(['/', 'patients', 'add']))
    );

  /**
   * effect to handle device is in use
   * show alert and ask to add as admin or cancel
   * dispatches AddPatientAdminUser or CancelAddPatientAdminUser
   */
  @Effect()
  deviceInUse$ = this.actions$
    .pipe(
      ofType<DeviceActions.DeviceInUse>(DeviceActions.DevicesActionTypes.DeviceInUse),
      map(action => action.payload),
      map(payload => {
        if (payload.patient && payload.patient.device.admin_code === payload.code['code']) {

          return new DeviceActions.CheckAdminCodeSuccess({patient: payload.patient});

        } else if (payload.patient && payload.patient.device.readonly_code === payload.code['code']) {

          return new DeviceActions.CheckReadonlyCodeSuccess({patient: payload.patient});

        } else {

          const message = 'DEVICES.An error occurred while processing device codes';
          return new DeviceActions.ProcessCodeError({message});

        }
      })
    );

  /**
   * effect listening to admin code success
   * checks if user is already assigned
   */
  @Effect()
  checkAdminCodeSuccess = this.actions$.pipe(
    ofType<DeviceActions.CheckAdminCodeSuccess>(DeviceActions.DevicesActionTypes.CheckAdminCodeSuccess),
    map(action => action.payload.patient),
    withLatestFrom(this.store.select(fromAuth.getUser)),
    map(([patient, user]) => {
      const filtered = patient.users.find(u => u._id === user._id);
      if (filtered) {
        return new DeviceActions.DismissAddPatientAdminUser();
      } else {
        return new DeviceActions.ProceedAddPatientAdminUser({patient});
      }
    })
  );

  /**
   * in case the user is already assigned
   * show an alert message and return to main page
   */
  @Effect()
  dismissAddAdminuser$ = this.actions$.pipe(
    ofType(DeviceActions.DevicesActionTypes.DismissAddPatientAdminUser),
    exhaustMap(() => {
      return fromPromise(this.alertController.create({
        header: this.translate.instant('DEVICES.ADD_ADMIN_USER'),
        message: this.translate.instant('DEVICES.You are already assigned as administrator for this user.'),
        buttons: ['OK']
      }))
        .pipe(
          map(alert => {
            alert.present();
            return fromPromise(alert.onDidDismiss());
          }),
          exhaustMap(dismiss => dismiss),
          map(() => {
            return new CoreActions.RedirectHome();
          })
        );
    })
  );

  /**
   * in case the current user is no
   * assigned to the patient allow
   * assigning: show alert and proceed
   * with workflow
   */
  @Effect()
  proceedAddAdminuser$ = this.actions$.pipe(
    ofType<DeviceActions.ProceedAddPatientAdminUser>(DeviceActions.DevicesActionTypes.ProceedAddPatientAdminUser),
    map(action => action.payload.patient),
    exhaustMap(patient => {
        return fromPromise(this.alertController.create({
          header: this.translate.instant('DEVICES.ADD_ADMIN_USER'),
          message: this.translate.instant(
            'DEVICES.The device is already assigned to an administrator.'
          ) + ' ' + this.translate.instant(
            'DEVICES.Do you want to assign yourself to patient "{{firstname}} {{lastname}}"?',
            {firstname: patient.firstName, lastname: patient.lastName}
          ),
          buttons: [
            {
              text: this.translate.instant('OK'),
              handler: () => of('yes')
            },
            {
              text: this.translate.instant('CANCEL'),
              handler: () => of('no')
            }
          ]
        }))
          .pipe(
            map(alert => {
              alert.present();
              return fromPromise(alert.onDidDismiss());
            }),
            exhaustMap(dismiss => dismiss),
            map(result => {
              if (result.data.value === 'yes') {
                return new DevicePageActions.AddPatientAdminuser({patient: patient});
              } else {
                return new CoreActions.RedirectHome();
              }
            })
          );
      }
    )
  );

  /**
   * effect catching readonly code success
   * tests if user already assigned
   */
  @Effect()
  checkReadonlyCodeSuccess$ = this.actions$.pipe(
    ofType<DeviceActions.CheckReadonlyCodeSuccess>(DeviceActions.DevicesActionTypes.CheckReadonlyCodeSuccess),
    map(action => action.payload.patient),
    withLatestFrom(this.store.pipe(select(fromAuth.getUser))),
    map(([patient, user]) => {
      const filteredUser = patient.users.find((u) => u._id === user._id);
      if (filteredUser) {
        return new DeviceActions.DismissAddPatientReadonlyUser();
      } else {
        return new PatientActions.AddReadonlyUser({patient});
      }
    })
  );

  /**
   * effect to show a popup to inform
   * user is assigned to patient
   */
  @Effect({
    dispatch: false
  })
  dismissAddReadonlyUser$ = this.actions$.pipe(
    ofType(DeviceActions.DevicesActionTypes.DismissAddPatientReadonlyUser),
    exhaustMap(() => {
      return fromPromise(this.alertController.create({
        header: this.translate.instant('DEVICES.ADD_READONLY_USER'),
        message: this.translate.instant('DEVICES.You are already assigned to this user.'),
        buttons: ['OK']
      }))
        .pipe(
          map(alert => {
            alert.present();
            return fromPromise(alert.onDidDismiss());
          }),
          exhaustMap(dismiss => dismiss),
          map(() => {
            return new CoreActions.RedirectHome();
          })
        );
    })
  );

  /**
   * constructor
   * @param {Actions} actions$
   * @param {DevicesService} devicesService
   * @param {Router} router
   * @param {Store} store
   * @param {AlertController} alertController
   * @param {TranslateService} translate
   */
  constructor(
    private actions$: Actions,
    private devicesService: DevicesService,
    private router: Router,
    private store: Store<any>,
    private alertController: AlertController,
    private translate: TranslateService
  ) {
  }
}
