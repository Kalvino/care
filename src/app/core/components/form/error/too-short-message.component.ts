import { Component, Input } from '@angular/core';

/**
 * input too short message component
 * for all required input fields
 * example see login-form.component.html
 */
@Component({
  selector: 'care-too-short-message',
  template: `
    <div class="validation-error"
         *ngIf="form.get(field).hasError('minlength') && form.get(field).touched">
      {{'ERRORS.Input too short' | translate:{value: this.form.get(field).errors?.minlength.requiredLength} }}
    </div>`
})
export class TooShortMessageComponent {
  /**
   * form object the form
   */
  @Input() form;

  /**
   * field string the field name as string
   */
  @Input() field;
}
