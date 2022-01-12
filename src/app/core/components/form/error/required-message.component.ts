import { Component, Input } from '@angular/core';

/**
 * required message component
 * for all required input fields
 * example see login-form.component.html
 */
@Component({
  selector: 'care-required-message',
  template: `
    <div class="validation-error"
         *ngIf="form.get(field).hasError('required') && form.get(field).touched">
      {{'FIELD_REQUIRED' | translate}}
    </div>`,
  styles: [`
    .validation-error {
      color: var(--ion-color-danger);
      font-size: .75em;
      padding: 0.25rem .95rem;
    }
  `]
})
export class RequiredMessageComponent {
  /**
   * form object the form object
   */
  @Input() form;

  /**
   * field string the field name as string
   */
  @Input() field;
}
