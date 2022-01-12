import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { MenuButtonComponent } from '../menu/menu-button/menu-button.component';
import { NotificationButtonComponent } from '../menu/notification-button/notification-button.component';
import * as fromHome from '../../reducers';
import { metaReducers, reducers } from '../../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { ActivatedRoute } from '@angular/router';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        HeaderComponent,
        MenuButtonComponent,
        NotificationButtonComponent
      ],
      imports: [
        IonicModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('home', fromHome.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers),
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            parent: {
              snapshot: {
                data: {
                  currentUser: {
                    email: 'adminapp@exmple.com',
                    firstname: 'Some',
                    id: 2,
                    lastname: 'User',
                    nursing_home_id: null,
                    user_group_id: 2,
                    username: 'adminapp'
                  }
                }
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
