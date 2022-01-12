import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPatientPageComponent } from './add-patient-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import { TranslateModule } from '@ngx-translate/core';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromAuth from '../../../../auth/reducers';

describe('AddPatientPageComponent', () => {
  let component: AddPatientPageComponent;
  let fixture: ComponentFixture<AddPatientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddPatientPageComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers),
        TranslateModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
