import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientNavigationComponent } from './patient-navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../../reducers';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('PatientNavigationComponent', () => {
  let component: PatientNavigationComponent;
  let fixture: ComponentFixture<PatientNavigationComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientNavigationComponent,
      ],
      imports: [
        RouterTestingModule,
        IonicModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        TranslateModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNavigationComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
