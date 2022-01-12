import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './reducers';
import { AuthEffects } from './effects/auth.effects';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './containers/auth-layout.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

/**
 * COMPONENTS bucket for the components of the module
 */
export const COMPONENTS = [
  AuthLayoutComponent,
  LoginPageComponent,
  LoginFormComponent,
  ChangePasswordComponent
];

/**
 * Authentication Module
 */
@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [COMPONENTS]
})
export class AuthModule {}
