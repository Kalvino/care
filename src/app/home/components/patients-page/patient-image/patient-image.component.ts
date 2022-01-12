import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../../core/models/patient';

/**
 * patient image component
 * shows the image in the details view
 * input is a link to the image
 */
@Component({
  selector: 'care-patient-image',
  template: `
    <div>
      <div>
        <img [alt]="patient.firstName + ' ' + patient.lastName"
          [title]="patient.firstName + ' ' + patient.lastName"
          [src]="imageSrc" class="patient-image"/>
      </div>
    </div>
  `,
  styleUrls: ['./patient-image.component.scss']
})
export class PatientImageComponent {

  /**
   * imageSrc string the src attr of the image
   */
  @Input() imageSrc;

  /**
   * the patient data
   */
  @Input() patient: Patient;

  /**
   * emit a click on the image
   * @deprecated using an extra button in the header to emit the event
   * remove once the design is final
   */
  @Output() clicked: EventEmitter<any> = new EventEmitter();
}
