import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../../../../core/models/patient';

/**
 * add patient form
 * emits submitted
 */
@Component({
  selector: 'care-add-patient-form',
  templateUrl: 'add-patient-form.component.html'
})
export class AddPatientFormComponent {

  /**
   * errors error messages
   */
  @Input() errors: string[] | null;

  /**
   * pending indicates if API calls are pending
   */
  @Input()
  set pending(isPending: boolean) {
    isPending ? this.addPatientForm.disable() : this.addPatientForm.enable();
  }

  /**
   * selectGender gender array for select element
   */
  selectGender = [
    {value: 'M', text: 'MALE'},
    {value: 'F', text: 'FEMALE'}
  ];

  /**
   * submitted emitter for form submitted event
   */
  @Output() submitted = new EventEmitter<Patient>();

  /**
   * addPatientForm form builder for current form
   */
  public addPatientForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    gender: ['', Validators.required]
  });

  /**
   * constructor
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * submit form
   * emit submitted event
   */
  onSubmit() {
    if (this.addPatientForm.valid) {
      this.submitted.emit(this.addPatientForm.value);
    }
  }
}
