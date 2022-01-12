import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './containers/auth-layout.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

/**
 * routes for auth module
 */
const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent
  }, {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

/**
 * routing module for auth
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
