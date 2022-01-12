import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsListItemComponent } from './patients-list-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../../../../reducers';
import * as fromHome from '../../../../../reducers';
import { LoadPatientsSuccess } from '../../../../../actions/patients-api.actions';
import { SelectPatient } from '../../../../../actions/patients.action';
import { first } from 'rxjs/operators';

describe('PatientsListItemComponent', () => {
  let component: PatientsListItemComponent;
  let fixture: ComponentFixture<PatientsListItemComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        PatientsListItemComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.get(Store);
    store.dispatch(new LoadPatientsSuccess({
      patients: [
        {
          'id': 1,
          'firstname': 'Thora White MD',
          'lastname': 'Susanna Gerhold',
          'gender': 'm',
          'device_id': 3,
          'image': '',
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

    store.dispatch(new SelectPatient({id: 1}));

    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsListItemComponent);
    fixture.componentInstance.patient = {
      'id': 1,
      'firstname': 'Thora White MD',
      'lastname': 'Susanna Gerhold',
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
    };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
