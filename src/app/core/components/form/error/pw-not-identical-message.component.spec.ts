import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwNotIdenticalMessageComponent } from './pw-not-identical-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('PwNotIdenticalMessage', () => {
  let component: PwNotIdenticalMessageComponent;
  let fixture: ComponentFixture<PwNotIdenticalMessageComponent>;

  const fb = new FormBuilder();
  const form = fb.group({
    passwordField: ['hello'],
    confirmField: ['hello']
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PwNotIdenticalMessageComponent],
      imports: [
        TranslateModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwNotIdenticalMessageComponent);
    component = fixture.componentInstance;
    component.form = form;
    component.passwordField = 'passwordField';
    component.confirmField = 'confirmField';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
