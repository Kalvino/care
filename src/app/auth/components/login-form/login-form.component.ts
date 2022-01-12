import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials';

/**
 * component creates the login form
 * for the login page
 */
@Component({
  selector: 'care-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  /**
   * errorMessage the error message to show in case of an error
   */
  @Input() errorMessage: string | null;

  /**
   * pending flag to indicate the state of the form
   */
  @Input()
  set pending(isPending: boolean) {
    isPending ? this.form.disable() : this.form.enable();
  }

  /**
   * submitted submit event to parent component
   */
  @Output() submitted = new EventEmitter<Credentials>();

  // form builder to dynamically create form
  public form: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  /**
   * constructor
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * "submit the form"
   */
  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
      this.form.markAsUntouched();
      this.form.reset();
    }
  }
}
