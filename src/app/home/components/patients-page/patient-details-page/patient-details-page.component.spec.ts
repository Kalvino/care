import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientDetailsPageComponent } from './patient-details-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientDetailsPageComponent', () => {
  let component: PatientDetailsPageComponent;
  let fixture: ComponentFixture<PatientDetailsPageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientDetailsPageComponent,
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsPageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
