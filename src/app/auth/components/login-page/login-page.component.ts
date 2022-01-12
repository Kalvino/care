import { Component } from '@angular/core';
import { Credentials } from '../../models/credentials';
import { LoginPageActions } from '../../actions/index';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers/index';

/**
 * Login page component creates
 * a container for everything that is
 * login related
 */
@Component({
  selector: 'care-login-page',
  styleUrls: ['./login-page.component.scss'],
  template: `
    <ion-app>
      <ion-content padding>
        <div class="login-logo">
          <img src="/assets/img/login-logo.png" />
        </div>
        <care-login-form
          (submitted)="onSubmit($event)"
          [pending]="pending$ | async"
          [errorMessage]="error$ | async"
        ></care-login-form>
      </ion-content>
    </ion-app>
  `
})
export class LoginPageComponent {

  /**
   * subscription for pending state in auth store
   */
  pending$ = this.store.pipe(
    select(fromAuth.getLoginPagePending)
  );

  /**
   * subscrption fot errors in the auth state
   */
  error$ = this.store.pipe(
    select(fromAuth.getLoginPageError)
  );

  /**
   * constructor
   * @param store
   */
  constructor(private store: Store<fromAuth.State>) {
  }

  /**
   * dispatch new login event to the store
   * @param credentials
   */
  onSubmit(credentials: Credentials) {
    this.store.dispatch(new LoginPageActions.Login({credentials}));
  }
}
