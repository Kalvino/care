import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAuth from '../reducers';
import { AuthApiActions } from '../actions';

/**
 * the auth guard checks for
 * login state and will grant
 * access to pages that will
 * integrate the auth guard
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {
  }

  /**
   * default interface to grant access
   * observes the auth state and triggers the
   * feature selector isLoggedIn
   */
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.isLoggedIn),
      map(authed => {
        console.log(authed);
        if (!authed) {
          this.store.dispatch(new AuthApiActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
