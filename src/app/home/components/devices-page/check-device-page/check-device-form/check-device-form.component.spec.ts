import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDeviceFormComponent } from './check-device-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequiredMessageComponent } from '../../../../../core/components/form/error/required-message.component';
import { IonicModule } from '@ionic/angular';

describe('CheckDeviceFormComponent', () => {
  let component: CheckDeviceFormComponent;
  let fixture: ComponentFixture<CheckDeviceFormComponent>;

  const fb = new FormBuilder();
  const form = fb.group({
    code: ['']
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckDeviceFormComponent,
        RequiredMessageComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDeviceFormComponent);
    component = fixture.componentInstance;
    component.newCodeForm = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
