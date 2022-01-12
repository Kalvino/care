import { Component, Input } from '@angular/core';

/**
 * validation error component
 *
 * Usage:
 * <care-pw-not-identical-message [form]="passwordForm" [passwordField]="'password'"
 * [confirmField]="'password_confirmation'"></care-pw-not-identical-message>
 *
 * Please note the usage of the form as object but the fields as string!
 */
@Component({
  selector: 'care-pw-not-identical-message',
  template: `
    <div class="validation-error"
         *ngIf="!isIdentical() && (form.get(confirmField).touched || form.get(confirmField).dirty)">
      {{'ERRORS.Passwords not identical' | translate}}
    </div>`
})
export class PwNotIdenticalMessageComponent {

  /**
   * form object a ref. to the form
   */
  @Input() form;

  /**
   * passwordField string the name of the password field
   */
  @Input() passwordField;

  /**
   * confirmField string the name of the confirm field to compare the value to
   */
  @Input() confirmField;

  /**
   * helper function to test current value
   * against another from the form
   */
  isIdentical = () => this.form.get(this.passwordField).value === this.form.get(this.confirmField).value;

}
