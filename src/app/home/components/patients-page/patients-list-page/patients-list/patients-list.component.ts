import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../../../core/models/patient';

/**
 * patient list component
 * parent for paitent list items
 * input is an array of patients
 * output is an emitter with a selected paitent
 */
@Component({
  selector: 'care-patients-list',
  template: `
    <ion-list [lines]="'full'" *ngIf="patients.length > 0">
      <ion-item *ngFor="let patient of patients" (click)="selected.emit(patient)">
        <care-patients-list-item [patient]="patient"></care-patients-list-item>
      </ion-item>
    </ion-list>
    <p *ngIf="patients.length == 0">{{'NO_DATA' | translate}}</p>
  `,
  styles: [':host ion-list {margin-top: .25rem}']
})
export class PatientsListComponent {

  /**
   * {Patient[]} patients
   */
  @Input() patients: Patient[];

  /**
   * selected event emitter with a selected patient
   */
  @Output() selected = new EventEmitter<Patient>();
}
