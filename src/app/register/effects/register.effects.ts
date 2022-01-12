import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { RegisterService } from '../services/register.service';
import { RegisterApiActions, RegisterPageActions } from '../actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { RegistrationCredentials } from '../models/registration';
import { of } from 'rxjs';
import { Router } from '@angular/router';

/**
 * registration effects
 * trigger for dispatched reigstration actions
 */
@Injectable()
export class RegisterEffects {

  /**
   * listen to the register action and issue API calls
   */
  @Effect()
  register$ = this.actions$
    .pipe(
      ofType<RegisterPageActions.Register>(RegisterPageActions.RegistrationPageActionTypes.Register),
      map(action => action.payload.registrationCredentials),
      exhaustMap((register: RegistrationCredentials) =>
        this.registerService
          .register(register)
          .pipe(
            map(user => new RegisterApiActions.RegistrationSuccess({user})),
            catchError(error => of(new RegisterApiActions.RegistrationFailure({error})))
          )
      )
    );

  /**
   * observes the registration success action
   * if positive we redirect to 'home' and AuthGuard will
   * check for the user credentials
   * TODO: needs a hook to save the User in the local storage
   */
  @Effect({
    dispatch: false
  })
  registerSuccess$ = this.actions$
    .pipe(
      ofType(RegisterApiActions.RegistrationApiActionTypes.RegistrationSuccess),
      tap(() => {
        this.router.navigate(['/']);
      })
    );

  /**
   * construct effect class
   * @param {Actions} actions$
   * @param {TranslateService} translate
   * @param {RegisterService} registerService
   * @param {Router} router
   */
  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    private registerService: RegisterService,
    private router: Router
  ) {
  }
}
