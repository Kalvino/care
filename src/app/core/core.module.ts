import { NgModule } from '@angular/core';
import { DefaultErrorComponent } from './components/error/default-error.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorLayoutComponent } from './containers/error-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { NotFoundErrorComponent } from './components/error/not-found-error.component';
import { ExpandableComponent } from './components/expandable/expandable.component';

/**
 * COMPONENTS bucket for the components defined in this module
 */
const COMPONENTS = [
  ErrorLayoutComponent,
  DefaultErrorComponent,
  NotFoundErrorComponent,
  ExpandableComponent
];

/**
 * CoreModule core module
 */
@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule,
  ],
  declarations: COMPONENTS,
  exports: [COMPONENTS]
})
export class CoreModule {}
