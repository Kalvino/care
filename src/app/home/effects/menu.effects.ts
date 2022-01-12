import { Actions, Effect, ofType } from '@ngrx/effects';
import { LayoutActions } from '../actions/index';
import { MenuController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

/**
 * handle menu effects when
 * buttons to open/close the sidenav are triggered
 */
@Injectable()
export class MenuEffects {

  /**
   * effect to open the side menu when action is dispatched
   */
  @Effect({
    dispatch: false
  })
  openSidenav$ = this.actions$
    .pipe(
      ofType(LayoutActions.LayoutActionTypes.OpenSidenav),
      tap(() => {
        this.ionMenuCtrl.open();
      })
    );

  /**
   * effect to close the sidenav when close action is dispatched
   */
  @Effect({
    dispatch: false
  })
  closeSidenav$ = this.actions$
    .pipe(
      ofType(LayoutActions.LayoutActionTypes.CloseSidenav),
      tap(() => {
        this.ionMenuCtrl.close();
      })
    );

  /**
   * constructor
   * @param actions$
   * @param ionMenuCtrl ionic menu controller
   */
  constructor(
    private actions$: Actions,
    private ionMenuCtrl: MenuController
  ) {
  }
}
