import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable } from 'rxjs';
import { StorageSyncActions } from 'ngrx-6-store-ionic-storage';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthActions } from '../../auth/actions';
import { delay, exhaustMap, map, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { LoaderActions, CoreActions } from '../actions';
import { Router } from '@angular/router';

/**
 * ionicStorage Storage a new ionic storage
 */
const ionicStorage = new Storage({});

/**
 * App effects
 */
@Injectable()
export class AppEffects {

  /**
   * loader contains the loader
   */
  private loader;

  /**
   * loader has been dismissed
   */
  private loaderDismissed = false;

  /**
   * re-hydrate the app state after reload
   */
  @Effect({dispatch: false})
  init$: Observable<any> = defer(() => {
    fromPromise(ionicStorage.get('APP_STATE'))
      .subscribe((auth) => {
        if (auth) {
          this.store.dispatch(new AuthActions.RehydrateUserState(auth.auth.status));
        }
      });
  });

  /**
   * effect to show a loader on action show loader
   */
  @Effect({
    dispatch: false
  })
  showLoader$ = this.actions$
    .pipe(
      ofType(LoaderActions.LoaderActionTypes.ShowLoader),
      map(() => {
        this.loaderDismissed = false;
      }),
      exhaustMap(() => {
        return fromPromise(
          this.loadingController.create()
        )
          .pipe(
            map(loader => this.loader = loader),
            delay(400),
            map((loader: any) => {
              if (this.loaderDismissed) {
                // we need to remove the loader manullay due to a bug:
                // loader will only be removed, when it was presented first
                // but it won't present because of the delay!
                document.querySelector('ion-loading').remove();
              } else {
                loader.present();
              }
            }),
          );
      })
    );

  /**
   * effect to hide the loader on action hide loader
   */
  @Effect({
    dispatch: false
  })
  hideLoader$ = this.actions$
    .pipe(
      ofType(LoaderActions.LoaderActionTypes.HideLoader),
      map(() => {
        if (this.loader) {
          this.loader.dismiss();
          this.loaderDismissed = true;
        }
      })
    );

  /**
   * listen to the redirect home action
   * and redirect to the start page
   */
  @Effect({
    dispatch: false
  })
  redirectHome$ = this.actions$
    .pipe(
      ofType(CoreActions.CoreActionTypes.RedirectHome),
      tap(() => {
        this.router.navigate(['/']);
      })
    );

  /**
   * constructor
   * @param {Actions} actions$
   * @param {Store} store
   * @param {LoadingController} loadingController
   * @param {Router} router
   */
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private loadingController: LoadingController,
    private router: Router
  ) {
  }

}
