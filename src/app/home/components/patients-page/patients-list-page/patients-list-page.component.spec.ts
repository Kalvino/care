import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsListPageComponent } from './patients-list-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { LoadPatientsSuccess } from '../../../actions/patients-api.actions';
import { SelectPatient } from '../../../actions/patients.action';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromHome from '../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsListItemComponent } from './patients-list/patients-list-item/patients-list-item.component';
import { LoginSuccess } from '../../../../auth/actions/auth-api.actions';

describe('PatientsListPageComponent', () => {
  let component: PatientsListPageComponent;
  let fixture: ComponentFixture<PatientsListPageComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        PatientsListPageComponent,
        PatientsListComponent,
        PatientsListItemComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.get(Store);

    store.dispatch(new LoginSuccess({
      loginResponse: {
        'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYxNzU1MjY5YzdlMGQxZDNjZjY0OGNhNzE4ZTlmMDE0NmY5ZmQxNTAyMmE1YzFlZTkxYTQ4YjRiMWVlMzVkZmYyN2MwY2Q2YmUwY2MwN2Q3In0.eyJhdWQiOiIxIiwianRpIjoiZjE3NTUyNjljN2UwZDFkM2NmNjQ4Y2E3MThlOWYwMTQ2ZjlmZDE1MDIyYTVjMWVlOTFhNDhiNGIxZWUzNWRmZjI3YzBjZDZiZTBjYzA3ZDciLCJpYXQiOjE1NDY0NTIxNDYsIm5iZiI6MTU0NjQ1MjE0NiwiZXhwIjoxNTc3OTg4MTQ2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.mCby8l5dhUN03tIVFM29qGB0XSKUEYQh-_ZNGXkZVGe93DkxUlxoXeUJ9QPNp0TPxqYH19a5yVDFEmM3_MhQqVW9-k4jUJEDjPR8LGYiUMeWgPIV9V8HmgfJokvSnAnUK7x-5s7QeCcg5FesVKf-PuASEYBvTXQFvybhmPoTLYuamliVbShHZE-MUm7991VYxvpCRv8vUVwzLK7hl_U1sV6irP9R3VL0qIvGPwOJb1DbcGJhW4qRR2eaH0SFYN4E-idoGyruqtPjKQQa7kEAvK11PlLjwEjJx1H9th0EHB5fpfj9P_WfLJL4XkYXhJSzbifDZ99Vy4H3Cb-fOcqUnD_QY_TX4G6Np_fy8e1rKuW1UKHb_IVL6yQAfIfSPi9UZgkzsDBP--qh-Ii-uSb6vxGn19-chm7eIDkk3JHVZH1-j-BEZbx03ekCvd-SjbeP9EdNtajFYZp5xizwKdu68eNLiYLqna3LfmipbBARbJeo3M3hH51f56_pzt1QbPqYHmln_WmNDuzVNBbIMoPB0cdtb9ujK3V_R9rj2n9eSFdGkWRGQbWg8NHX53TkyXZ-4tpNIeS_-qZA2CzyqML2wLUfC-wQJKuHlxEnlbeZikQd5oxybh2T36CGxXyMfv2_GDyRxh78J3OVMHaIaENIR63wQ4yP9pQnOhQKn36WX5k',
        'user': {
          'id': 2,
          'firstname': 'Yazmin',
          'lastname': 'Kovacek',
          'username': 'adminapp',
          'email': 'adminapp@example.org',
          'nursing_home_id': 1,
          'user_group_id': 1
        }
      }
    }));

    store.dispatch(new LoadPatientsSuccess({
      patients: [
        {
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
        }
      ]
    }));

    store.dispatch(new SelectPatient({id: 1}));

    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsListPageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
