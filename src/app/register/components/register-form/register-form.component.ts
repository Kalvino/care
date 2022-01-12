import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationCredentials } from '../../models/registration';

/**
 * renders the registration form
 * @output submitted event in case use hits submit button
 * @input error message from the state
 * @input pending from state
 */
@Component({
  selector: 'care-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  // error message from the state
  @Input() errorMessage: string | null;

  // pending state
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
  }

  // outputs event to parent component
  @Output() submitted = new EventEmitter<RegistrationCredentials>();

  // form (builder) to generate the form
  public registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    password_repeat: ['', Validators.required]
  });

  /**
   * constructor
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * "submit" the form
   */
  onSubmit() {
    if (this.registerForm.valid) {
      this.submitted.emit(this.registerForm.value);
      this.registerForm.reset();
    }
  }
}
