import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientUsersComponent } from './patient-users.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('PatientUsersComponent', () => {
  let component: PatientUsersComponent;
  let fixture: ComponentFixture<PatientUsersComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientUsersComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers),
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUsersComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
