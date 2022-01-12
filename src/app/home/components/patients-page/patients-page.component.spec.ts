import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsPageComponent } from './patients-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PatientsListPageComponent } from './patients-list-page/patients-list-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { PatientsListItemComponent } from './patients-list-page/patients-list/patients-list-item/patients-list-item.component';

describe('PatientsPageComponent', () => {
  let component: PatientsPageComponent;
  let fixture: ComponentFixture<PatientsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientsPageComponent,
        PatientsListPageComponent,
        PatientsListItemComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
