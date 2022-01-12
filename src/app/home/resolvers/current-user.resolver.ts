import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import { map, take, tap } from 'rxjs/operators';

/**
 * resolve the current logged in user
 * could be taken from the store in each component
 * but sometimes it is a good idea to have
 * it available while constructing /initializing the component
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<any> {

  /**
   * constructor
   * @param store
   */
  constructor(private store: Store<fromAuth.State>) {
  }

  /**
   * resolve function
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.store
      .pipe(
        select(fromAuth.getUser),
        map(user => user),
        take(1)
      );
  }

}
