import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RequiredMessageComponent } from '../core/components/form/error/required-message.component';
import { PwNotIdenticalMessageComponent } from '../core/components/form/error/pw-not-identical-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtcTimezonePipe } from '../core/pipes/utc-timezone.pipe';
import { TooShortMessageComponent } from '../core/components/form/error/too-short-message.component';
import { DateOrTimePipe } from '../core/pipes/date-or-time.pipe';
import { IconComponent } from '../core/components/icon/icon.component';

/**
 * bucket for the components in this module
 */
export const COMPONENTS = [
  RequiredMessageComponent,
  PwNotIdenticalMessageComponent,
  TooShortMessageComponent,
  UtcTimezonePipe,
  DateOrTimePipe,
  IconComponent
];

/**
 * shared module bundles im / exports
 * for packages required by all modules
 * in the project
 */
@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    COMPONENTS
  ]
})
export class SharedModule {
}
