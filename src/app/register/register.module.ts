import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterLayoutComponent } from './containers/register-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

// bucket for all components in this module
export const COMPONENTS = [
  RegisterLayoutComponent,
  RegisterPageComponent
];

/**
 * Register Module
 * register a new user
 * TODO: the complete registration module needs more attention
 * It is not fully programmed as it is not necessary in the first sprint
 */
@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [COMPONENTS, RegisterFormComponent]
})
export class RegisterModule {}
