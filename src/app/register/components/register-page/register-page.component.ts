import { Component } from '@angular/core';
import { RegistrationCredentials } from '../../models/registration';
import { Store } from '@ngrx/store';
import * as fromRegistration from '../../reducers';

/**
 * Registration page component
 * child for registration page layout
 * TODO: needs some more attention to inject the state into the child form component
 */
@Component({
  selector: 'care-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  pending$ = '';
  error$ = '';

  /**
   * construct component
   */
  constructor(private store: Store<fromRegistration.RegisterState>) {
  }

  /**
   * dispatch registration action to the store
   * to trigger registration process
   * @param credentials
   */
  onSubmit(credentials: RegistrationCredentials) {
  }
}
