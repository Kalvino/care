import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientImageComponent } from './patient-image.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PatientImageComponent', () => {
  let component: PatientImageComponent;
  let fixture: ComponentFixture<PatientImageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientImageComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientImageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
