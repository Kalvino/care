import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * global routes for the app
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  }, {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  }
];

/**
 * global routing moule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
