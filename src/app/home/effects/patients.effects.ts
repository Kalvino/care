import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  PatientPageActions,
  PatientApiActions,
  PatientActions,
  PatientWsActions,
  DevicePageActions,
} from '../actions';
import { LoaderActions, CoreActions } from '../../core/actions';
import { DeviceActions } from '../actions';
import { catchError, delay, exhaustMap, map, tap } from 'rxjs/operators';
import { Patient } from '../../core/models/patient';
import { PatientsService } from '../services/patients.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersService } from '../services/users.service';
import { Update } from '@ngrx/entity';
import { AlertController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { TranslateService } from '@ngx-translate/core';
import { SocketService } from '../../core/services/socket.service';

/**
 * patients effects
 */
@Injectable()
export class PatientsEffects {

  /**
   * effect fired, when the creato new patient form is submitted
   * send data to api and handle result
   */
  @Effect()
  createPatient$ = this.actions$.pipe(
    ofType<PatientPageActions.CreatePatient>(PatientPageActions.PatientsPageActionTypes.CreatePatient),
    map(action => action.payload.patient),
    exhaustMap((patientData: Patient) => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.patientService.createPatient(patientData)
        .pipe(
          map(patient => {
            this.store.dispatch(new DeviceActions.ResetUnassginedDevice());
            return new PatientApiActions.CreatePatientSuccess({patient});
          }),
          catchError(httpResponse => {
            const message = [];

            if (httpResponse.error.code === 422) {
              if (httpResponse.error.error.device_id) {
                httpResponse.error.error.device_id.forEach((error) => {
                  message.push(error.toLowerCase());
                });
              }
              if (httpResponse.error.error.phone) {
                httpResponse.error.error.phone.forEach(error => {
                  message.push(error.toLowerCase());
                });
              }
            } else {
              message.push(httpResponse.error.message.toLowerCase());
            }

            return of(new PatientApiActions.CreatePatientFailure({message}));
          }),
          tap(() => {
            this.store.dispatch(new LoaderActions.HideLoader());
          })
        );
    })
  );

  /**
   * send patient data to api and handle result
   */
  @Effect()
  editPatient = this.actions$.pipe(
    ofType<PatientActions.EditPatient>(PatientActions.PatientsActionTypes.EditPatient),
    map(action => action.payload),
    exhaustMap((patient: Update<Patient>) => {
      this.store.dispatch(new LoaderActions.ShowLoader());
      return this.patientService.editPatient(patient)
        .pipe(
          map((savedPatient: Patient) => {
            this.store.dispatch(new PatientPageActions.RedirectToPatient());
            return new PatientApiActions.EditPatientSuccess({patient: savedPatient});
          }),
          catchError(response => {
            const message = [];
            if (response.error.code === 422) {
              if (response.error.error.lastname) {
                message.push('PATIENTS.' + response.error.error.lastname[0].toLowerCase());
              } else {
                message.push('ERRORS.An Error occurred');
              }
            } else {
              message.push(response.error.message.toLowerCase());
            }
            return of(new PatientApiActions.EditPatientFailure({message}));
          }),
          tap(() => {
            this.store.dispatch(new LoaderActions.HideLoader());
          })
        );
    })
  );

  /**
   * effect in case creating a new patient was successfull
   * redirect to the patients (overview) page
   */
  @Effect({
    dispatch: false
  })
  createPatientSuccess$ = this.actions$.pipe(
    ofType(PatientApiActions.PatientsApiActionTypes.CreatePatientSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  /**
   * get the data for the selected patient
   * from the API and update the store
   */
  @Effect()
  loadSelectedPatient$ = this.actions$.pipe(
    ofType<PatientActions.SelectPatient>(PatientActions.PatientsActionTypes.SelectPatient),
    map(action => action.payload._id),
    exhaustMap(patient_id => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.patientService.getPatient(patient_id).pipe(
        map((patient: Patient) => {
          return new PatientApiActions.GetPatientSuccess({patient});
        }),
        catchError(httpErr => {
          const message = httpErr.error.error.message;
          return of(new PatientApiActions.GetPatientFailure({message: [message]}));
        }),
        tap(() => {
          this.store.dispatch(new LoaderActions.HideLoader());
        })
      );
    })
  );

  /**
   * route to details when a patient had been selected
   */
  @Effect({
    dispatch: false
  })
  getPatientSuccess$ = this.actions$.pipe(
    ofType(PatientApiActions.PatientsApiActionTypes.GetPatientSuccess),
    tap(() => {
      this.router.navigate(['/', 'patients', 'details', 'patient']
      );
    })
  );

  /**
   * effect for loading patients for the current user
   */
  @Effect()
  loadPatients = this.actions$.pipe(
    ofType<PatientPageActions.LoadPatients>(PatientPageActions.PatientsPageActionTypes.LoadPatients),
    map(action => action.payload.user_id),
    exhaustMap(user_id => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.usersService
        .getUserPatients(user_id)
        .pipe(
          map((patients: Patient[]) => {
            return new PatientApiActions.LoadPatientsSuccess({patients});
          }),
          catchError(httpError => {
            const message = httpError.error.message.toLowerCase();
            return of(new PatientApiActions.LoadPatientsFailure({message}));
          }),
          tap(() => {
            this.store.dispatch(new LoaderActions.HideLoader());
          })
        );
    })
  );

  /**
   * effect to load the events for a patient
   * when a LoadPatientEvents is fired
   */
  @Effect()
  loadPatientEvents = this.actions$.pipe(
    ofType<PatientActions.LoadPatientEvents>(PatientActions.PatientsActionTypes.LoadPatientEvents),
    map(action => action.payload.patient),
    exhaustMap(patient => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.patientService
        .loadPatientEvents(patient)
        .pipe(
          map(events => {
            return new PatientApiActions.LoadPatientEventsSuccess({events});
          }),
          catchError(httpError => {
            const message = httpError.error.error.toLowerCase();
            return of(new PatientApiActions.LoadPatientEventsFailure({message: [message]}));
          }),
          tap(() => {
            this.store.dispatch(new LoaderActions.HideLoader());
          })
        );
    })
  );

  /**
   * cancel edit effect
   */
  @Effect()
  cancelEdit$ = this.actions$.pipe(
    ofType<PatientPageActions.CancelEditPatient>(PatientPageActions.PatientsPageActionTypes.CancelEditPatient),
    map(action => action.payload.changed),
    exhaustMap(changed => {
      if (changed) {

        return fromPromise(this.alertController.create({
          header: this.translate.instant('PATIENTS.EDIT.CONFIRM_HEADER'),
          message: this.translate.instant('PATIENTS.EDIT.CONFIRM_CANCEL'),
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
        })).pipe(
          map(alert => {
            alert.present();
            return fromPromise(alert.onDidDismiss());
          }),
          exhaustMap(dismiss => dismiss),
          map(modalResult => {
            if (modalResult.data.value === 'yes') {
              return new PatientPageActions.RedirectToPatient();
            } else {
              return new PatientPageActions.CancelEditConfirmDismiss();
            }
          })
        );

      } else {

        return of(new PatientPageActions.RedirectToPatient());

      }
    })
  );

  /**
   * effect to redirect to the paitients details page
   */
  @Effect({
    dispatch: false
  })
  redirectToPatient$ = this.actions$.pipe(
    ofType(PatientPageActions.PatientsPageActionTypes.RedirectToPatient),
    tap(() => {
      this.router.navigate(['patients', 'details', 'profile']);
    })
  );

  /**
   * listen to the connection event and
   * connect to the WS patient history stream
   */
  @Effect({
    dispatch: false
  })
  connectClient$ = this.actions$.pipe(
    ofType(PatientWsActions.PatientsWsActionTypes.ConnectClient),
    tap(() => {
      this.socketService.connectClient('patient_history');
    })
  );

  /**
   * disconnect from the WS client stream for
   * patient events
   */
  @Effect({
    dispatch: false
  })
  disconnectClient$ = this.actions$.pipe(
    ofType(PatientWsActions.PatientsWsActionTypes.DisconnectClient),
    tap(() => {
      this.socketService.disconnectClient('patient_history');
    })
  );

  /**
   * subscribe to events stream
   * for patient with patientId
   */
  @Effect({
    dispatch: false
  })
  subscribeEvents$ = this.actions$.pipe(
    ofType<PatientWsActions.SubscribeEvents>(PatientWsActions.PatientsWsActionTypes.SubscribeEvents),
    delay(1500),
    map(action => action.payload.patientId),
    tap(patientId => {
      this.socketService.subscribe('patient_history', patientId);
    })
  );

  /**
   * unsubscribe from events stream
   * for patient with patientId
   */
  @Effect({
    dispatch: false
  })
  unsubscribeEvents$ = this.actions$.pipe(
    ofType<PatientWsActions.UnsubscribeEvents>(PatientWsActions.PatientsWsActionTypes.UnsubscribeEvents),
    map(action => action.payload.patientId),
    tap(patientId => {
      this.socketService.unsubscribe('patient_history', patientId);
    })
  );

  /**
   * effect to add the current user
   * as admin to the give patient
   */
  @Effect()
  addPatientAdminuser$ = this.actions$.pipe(
    ofType<DevicePageActions.AddPatientAdminuser>(DevicePageActions.DevicesPageActionTypes.AddPatientAdminuser),
    map(action => action.payload.patient),
    exhaustMap(patient => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.patientService.addAdminuser(patient).pipe(
        map(result => {
          this.store.dispatch(new PatientApiActions.AddPatientAdminuserSuccess({patient: result}));
          return new CoreActions.RedirectHome();
        }),
        catchError((httpErr) => {
          const message = httpErr.error.error.message;
          return of(new PatientApiActions.AddPatientAdminuserFailure({message: [message]}));
        }),
        tap(() => {
          this.store.dispatch(new LoaderActions.HideLoader());
        })
      );
    })
  );

  /**
   * effect to add a user as readonly to a patient
   */
  @Effect()
  addReadonlyUser$ = this.actions$.pipe(
    ofType<PatientActions.AddReadonlyUser>(PatientActions.PatientsActionTypes.AddReadonlyUser),
    map(action => action.payload.patient),
    exhaustMap(patient => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.patientService.addReadonlyuser(patient).pipe(
        map((result) => {
            this.store.dispatch(new PatientApiActions.AddPatientReadonlyUserSuccess({patient: result}));
            return new CoreActions.RedirectHome();
          }
        ),
        catchError((httpError) => {
          const message = httpError.error.error;
          return of(new PatientApiActions.AddPatientReadonlyUserFailure({message: [message]}));
        }),
        tap(() => {
          this.store.dispatch(new LoaderActions.HideLoader());
        })
      );
    })
  );

  /**
   * effect to listen on AlertRemoveUser
   * to show an alert when a user
   * hits the button to delete a user in
   * the patient profile
   */
  @Effect()
  alertRemoveUser$ = this.actions$.pipe(
    ofType<PatientPageActions.AlertRemoveUser>(PatientPageActions.PatientsPageActionTypes.AlertRemoveUser),
    map(action => action.payload),
    exhaustMap((payload) => {
      return fromPromise(this.alertController.create({
        header: this.translate.instant('PATIENTS.Remove User'),
        message: this.translate.instant(
          'PATIENTS.Do you really want to remove the selected user from this patient?',
          {firstname: payload.user.firstName, lastname: payload.user.lastName}
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
      })).pipe(
        map(alert => {
          alert.present();
          return fromPromise(alert.onDidDismiss());
        }),
        exhaustMap(dismiss => dismiss),
        map(modalResult => {
          if (modalResult.data.value === 'yes') {
            return new PatientActions.RemovePatientUser(
              {patient_id: payload.patient_id, user: payload.user}
            );
          } else {
            return new PatientActions.CancelRemovePatientUser();
          }
        })
      );
    })
  );

  /**
   * effect to trigger an API call
   * and remove the user from the patient profile
   */
  @Effect()
  removePatientUser$ = this.actions$.pipe(
    ofType<PatientActions.RemovePatientUser>(PatientActions.PatientsActionTypes.RemovePatientUser),
    map(action => action.payload),
    exhaustMap(payload => {

      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.patientService
        .removeUser(payload.patient_id, payload.user)
        .pipe(
          map(patient => {
            return new PatientApiActions.RemovePatientUserSuccess({patient});
          }),
          catchError(httpError => {
            const message = 'PATIENTS.' + httpError.error.error.toLowerCase();
            return of(new PatientApiActions.RemovePatientUserFailure({message: [message]}));
          }),
          tap(() => {
            this.store.dispatch(new LoaderActions.HideLoader());
          })
        );
    })
  );

  /**
   * confirm deleting an image of
   * a user. Dispatches DeletePatientImage (-> next effect)
   * or CoreActions.DoNothing (dismiss the alert)
   */
  @Effect()
  confirmDeletePatientImage$ = this.actions$.pipe(
    ofType<PatientActions.ConfirmDeletePatientImage>(PatientActions.PatientsActionTypes.ConfirmDeletePatientImage),
    map(action => action.payload.patient),
    exhaustMap((patient) => {
      return fromPromise(this.alertController.create({
        header: this.translate.instant('PATIENTS.Confirm Delete Patient Image'),
        message: this.translate.instant('PATIENTS.Do you really want to delete the image of the patient?'),
        buttons: [
          {
            text: this.translate.instant('OK'),
            handler: () => of('yes')
          }, {
            text: this.translate.instant('CANCEL'),
            handler: () => of('no')
          }
        ]
      })).pipe(
        map(alert => {
          alert.present();
          return alert.onDidDismiss();
        }),
        exhaustMap(dismiss => dismiss),
        map(modalResult => {
          if (modalResult.data.value === 'yes') {
            return new PatientActions.EditPatient({
              id: patient._id,
              changes: {
                firstName: patient.firstName,
                lastName: patient.lastName,
                image: ''}
            });
          } else {
            return new CoreActions.DoNothing();
          }
        })
      );
    })
  );

  /**
   * constructor
   *
   * @param actions$
   * @param {PatientsService} patientService
   * @param {UsersService} usersService
   * @param {Router} router
   * @param {Store} store
   * @param {AlertController} alertController
   * @param {TranslateService} translate
   * @param {SocketService} socketService
   */
  constructor(
    private actions$: Actions,
    private patientService: PatientsService,
    private usersService: UsersService,
    private router: Router,
    private store: Store<any>,
    private alertController: AlertController,
    private translate: TranslateService,
    private socketService: SocketService
  ) {
  }
}
