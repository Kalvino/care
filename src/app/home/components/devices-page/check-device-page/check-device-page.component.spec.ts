import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDevicePageComponent } from './check-device-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckDeviceFormComponent } from './check-device-form/check-device-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import {metaReducers, reducers} from '../../../../reducers';
import * as fromAuth from '../../../../auth/reducers';

describe('CheckDevicePageComponent', () => {
  let component: CheckDevicePageComponent;
  let fixture: ComponentFixture<CheckDevicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDevicePageComponent, CheckDeviceFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot(),
        IonicModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDevicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
