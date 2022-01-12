import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginPageActions, AuthApiActions, AuthActions, ChangePwActions } from '../actions';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Credentials } from '../models/credentials';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { LoaderActions } from '../../core/actions';

/**
 * effects to trigger actions / api requests
 * when auth actions are dispatched
 */
@Injectable()
export class AuthEffects {

  /**
   * handles the login
   * subscribe to the action and do the login api
   * call in the AuthService
   * In case of success create a new LoginSuccess action
   */
  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login),
      map(action => action.payload.credentials),
      exhaustMap((auth: Credentials) => {
        this.store.dispatch(new LoaderActions.ShowLoader());

        return this.authService
          .login(auth)
          .pipe(
            map(loginResponse =>
              new AuthApiActions.LoginSuccess({loginResponse})
            ),
            catchError(httpResponse => {

              console.log(httpResponse);

              let message: string;
              if (httpResponse.error){
                message = httpResponse.error.error.toLowerCase();
              } else{
                message = httpResponse.statusText.toLowerCase();
              }
              return of(new AuthApiActions.LoginFailure({message}));
            }),
            tap(() => {
              this.store.dispatch(new LoaderActions.HideLoader());
            })
          );
      })
    );

  /**
   * logout effect
   */
  @Effect()
  logout$ = this.actions$
    .pipe(
      ofType(AuthActions.AuthActionTypes.Logout),
      exhaustMap(() => {

        this.store.dispatch(new LoaderActions.ShowLoader());

        return this.authService
          .logout()
          .pipe(
            map(() => new AuthApiActions.LogoutSuccess()),
            catchError(httpResponse => {
              const message = httpResponse.error.error.toLowerCase();
              return of(new AuthApiActions.LogoutFailure({message}));
            }),
            tap(() => {
              this.store.dispatch(new LoaderActions.HideLoader());
            })
          );
      })
    );

  /**
   * observes the login success action
   * in case if success the user is redirected to
   * the main page
   */
  @Effect({
    dispatch: false
  })
  loginSuccess$ = this.actions$
    .pipe(
      ofType<AuthApiActions.LoginSuccess>(AuthApiActions.AuthApiActionTypes.LoginSuccess),
      map(action => action.payload.loginResponse),
      tap((loginData) => {

        this.router.navigate(['/']);

        // if (loginData.verified === 0) {
        //   this.router.navigate(['/', 'change-password']);
        // } else {
        //   this.router.navigate(['/']);
        // }

      })
    );

  /**
   * redirect users in case of logout
   * or in case the user is not logged in
   */
  @Effect({
    dispatch: false
  })
  loginRedirect$ = this.actions$
    .pipe(
      ofType(
        AuthApiActions.AuthApiActionTypes.LoginRedirect,
        AuthApiActions.AuthApiActionTypes.LogoutSuccess
      ),
      tap(authed => {
        this.router.navigate(['/login']);
      })
    );

  /**
   * show logout confirmation and
   * react on button action
   */
  @Effect()
  logoutConfirmation$ = this.actions$
    .pipe(
      ofType(AuthActions.AuthActionTypes.LogoutConfirmation),
      exhaustMap(() => {
        return fromPromise(this.alertController.create({
          header: this.translate.instant('AUTH.LOGOUT'),
          message: this.translate.instant('AUTH.CONFIRM_LOGOUT_MESSAGE'),
          buttons: [
            {
              text: this.translate.instant('OK'),
              cssClass: 'logout-ok',
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
          map(result => {
            if (result.data && result.data.value === 'yes') {
              return new AuthActions.Logout();
            } else {
              return new AuthActions.LogoutConfirmationDismiss();
            }
          })
        );
      })
    );

  /**
   * effect to trigger the API
   * to change the password
   * after initial login
   */
  @Effect()
  changePassword$ = this.actions$.pipe(
    ofType<ChangePwActions.ChangePassword>(ChangePwActions.ChangePasswordActionTypes.ChangePassword),
    map(action => action.payload.passwordConfirmation),
    exhaustMap(pwData => {
      this.store.dispatch(new LoaderActions.ShowLoader());

      return this.authService
        .changePassword(pwData)
        .pipe(
          map(result => {
            return new AuthApiActions.ChangePasswordSuccess({message: result.message});
          }),
          catchError(response => {
            const message = [];
            if (response.error.code === 422) {
              message.push(response.error.error.password[0].toLowerCase());
            } else {
              message.push(response.error.error.message.toLowerCase());
            }
            return of(new AuthApiActions.ChangePasswordFailure({message: message}));
          }),
          tap(() => {
            this.store.dispatch(new LoaderActions.HideLoader());
          })
        );
    })
  );

  /**
   * on change password success navigate
   * user to home page
   */
  @Effect({
    dispatch: false
  })
  changePwSuccess$ = this.actions$.pipe(
    ofType<AuthApiActions.ChangePasswordSuccess>(AuthApiActions.AuthApiActionTypes.ChangePasswordSuccess),
    map(action => action.payload.message),
    tap((message) => {
      // show a success toast
      this.toastController.create({
        message: message,
        duration: 3000,
        showCloseButton: false
      })
        .then((toast) => {
          toast.present();
        });

      this.router.navigate(['/']);
    })
  );

  /**
   * constructor
   * @param actions$
   * @param authService
   * @param router
   * @param alertController ionic alert controller
   * @param translate translation service
   * @param storage Ionic storage interface
   * @param store Store
   * @param toastController ToastController
   */
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private translate: TranslateService,
    private storage: Storage,
    private store: Store<any>,
    private toastController: ToastController
  ) {
  }
}
