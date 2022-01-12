import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultErrorComponent } from './components/error/default-error.component';
import { NotFoundErrorComponent } from './components/error/not-found-error.component';
import { ErrorLayoutComponent } from './containers/error-layout.component';

/**
 * routes default routing in core module
 */
export const routes: Routes = [
  {
    path: '',
    component: ErrorLayoutComponent,
    children: [
      {
        path: '404',
        component: NotFoundErrorComponent
      }, {
        path: '**',
        component: DefaultErrorComponent
      }
    ]
  }
];

/**
 * CoreRoutingModule core routing module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
