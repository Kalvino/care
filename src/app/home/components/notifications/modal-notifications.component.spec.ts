import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotificationsComponent } from './modal-notifications.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
import * as fromHome from '../../reducers';
import { ModalController } from '@ionic/angular';
import { UtcTimezonePipe } from '../../../core/pipes/utc-timezone.pipe';
import * as fromAuth from '../../../auth/reducers';

describe('ModalNotificationsComponent', () => {
  let component: ModalNotificationsComponent;
  let fixture: ComponentFixture<ModalNotificationsComponent>;
  let store: Store<fromHome.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalNotificationsComponent,
        UtcTimezonePipe
      ],
      imports: [
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers),
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: ModalController, useValue: {}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    store = TestBed.get(Store);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
