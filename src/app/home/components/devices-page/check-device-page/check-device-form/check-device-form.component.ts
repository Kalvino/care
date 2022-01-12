import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * new device form
 * emits submitted event with form data
 */
@Component({
  selector: 'care-check-device-form',
  templateUrl: './check-device-form.component.html'
})
export class CheckDeviceFormComponent {

  /**
   * errorMessage error message in case adding device fails
   */
  @Input() errorMessage: string | null;

  /**
   * pending disables form while sending data to api
   */
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.newCodeForm.disable();
    } else {
      this.newCodeForm.enable();
    }
  }

  /**
   * submitted event emitted when form is submitted
   */
  @Output() submitted: EventEmitter<string> = new EventEmitter();

  /**
   * newCodeForm the reactive form definition
   */
  newCodeForm: FormGroup = this.formBuilder.group({
    code: ['', Validators.required]
  });

  /**
   * constructor
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * emit submitted event with form data
   */
  onSubmit() {
    this.submitted.emit(this.newCodeForm.value);
  }
}
