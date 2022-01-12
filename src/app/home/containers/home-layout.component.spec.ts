import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeLayoutComponent } from './home-layout.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../reducers';
import { Platform } from '@ionic/angular';
import { SocketService } from '../../core/services/socket.service';
import { of } from 'rxjs';


describe('HomeLayoutComponent', () => {

  let platformReadySpy, platformSpy;

  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async(() => {

    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});

    const testBed = TestBed.configureTestingModule({
      declarations: [
        HomeLayoutComponent
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, {metaReducers})
      ],
      providers: [
        {
          provide: Platform, useValue: {
            ready: () => new Promise((resolve => {
              return resolve;
            })),
            pause: of({})
          }
        },
        {
          provide: SocketService, useValue: {
            onNotification: () => {
              return of({});
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    fixture.componentInstance.currentUser = {
      'id': 2,
      'firstname': 'Yazmin',
      'lastname': 'Kovacek',
      'username': 'adminapp',
      'email': 'adminapp@example.org',
      'nursing_home_id': 1,
      'user_group_id': 1
    };

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
