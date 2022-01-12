import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromAuth from '../../reducers';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ChangePwActions } from '../../actions';

/**
 * component for to create and
 * verify a new password after
 * initial login
 */
@Component({
  selector: 'care-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  /**
   * errors$ errors from the state
   */
  errors$ = this.store.pipe(
    select(fromAuth.getConfirmPwPageError)
  );

  /**
   * isPending$ page is in pending state
   */
  isPending$ = this.store.pipe(
    select(fromAuth.getConfirmPwPagePending),
    map(isPending => {
      (isPending) ? this.passwordForm.disable() : this.passwordForm.enable();
      return isPending;
    })
  );

  /**
   * user contains the current user
   */
  public user;

  /**
   * password form group
   */
  passwordForm: FormGroup = this.formBuilder.group({
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    password_confirmation: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  });

  /**
   * constructor
   * @param formBuilder
   * @param store
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromAuth.State>
  ) {
  }

  /**
   * on init lifecycle hook
   */
  ngOnInit(): void {
    this.store.pipe(
      select(fromAuth.getUser)
    ).subscribe(user => {
      this.user = user;
    });
  }

  /**
   * submit the form
   */
  onSubmit() {
    if (this.passwordForm.valid && this.user) {
      const passwordConfirmation = {
        password: this.passwordForm.get('password').value,
        password_confirmation: this.passwordForm.get('password_confirmation').value,
        user_id: this.user.id
      };

      this.store.dispatch(new ChangePwActions.ChangePassword({passwordConfirmation}));
    }
  }

}
