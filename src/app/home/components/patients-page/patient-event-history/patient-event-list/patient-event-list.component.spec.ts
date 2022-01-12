import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientEventListComponent } from './patient-event-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UtcTimezonePipe } from '../../../../../core/pipes/utc-timezone.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromHome from '../../../../reducers';
import { metaReducers, reducers } from '../../../../../reducers';

describe('PatientEventListComponent', () => {
  let component: PatientEventListComponent;
  let fixture: ComponentFixture<PatientEventListComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientEventListComponent,
        UtcTimezonePipe
      ],
      imports: [
        IonicModule,
        TranslateModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEventListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
