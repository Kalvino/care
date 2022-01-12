import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterLayoutComponent } from './containers/register-layout.component';

/**
 * routing for register module
 */
const routes: Routes = [
  {
    path: 'register',
    component: RegisterLayoutComponent
  }
];

/**
 * routing module for register module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
