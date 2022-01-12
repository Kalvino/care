import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientConfigurationComponent } from './patient-configuration.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { metaReducers, reducers } from '../../../../reducers';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpandableComponent } from '../../../../core/components/expandable/expandable.component';
import { IonicStorageModule } from '@ionic/storage';
import { LoadPatientsSuccess } from '../../../actions/patients-api.actions';
import { SelectPatient } from '../../../actions/patients.action';

describe('PatientConfigurationComponent', () => {
  let component: PatientConfigurationComponent;
  let fixture: ComponentFixture<PatientConfigurationComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        PatientConfigurationComponent,
        ExpandableComponent
      ],
      imports: [
        IonicModule,
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('auth', fromAuth.reducers),
        StoreModule.forFeature('home', fromHome.reducers)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.get(Store);

    store.dispatch(new LoadPatientsSuccess({
      patients: [
        {
          '_id': "1",
          'firstName': 'Thora White MD',
          'lastName': 'Susanna Gerhold',
          'gender': 'm',
          'device_id': 3,
          'nursing_home_id': 9,
          'device': {
            'id': 3,
            'serial_no': '1833c7a6-f422-391c-929b-7d474497bcd0',
            'readonly_code': '002f58b3-42c7-3261-9ee8-4a73ddbac819',
            'admin_code': '615ee192-3039-3d4a-9141-9f33dfc57918',
            'model_no': '2081b110-0814-3d5d-8792-33835480566f',
            'nursing_home_id': 10
          }
        }
      ]
    }));
    store.dispatch(new SelectPatient({_id: "1"}));

    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
