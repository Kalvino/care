import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredMessageComponent } from './required-message.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('RequiredMessageComponent', () => {
  let component: RequiredMessageComponent;
  let fixture: ComponentFixture<RequiredMessageComponent>;

  const fb = new FormBuilder();
  const form = fb.group({
    name: ['name']
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredMessageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredMessageComponent);
    component = fixture.componentInstance;
    component.form = form;
    component.field = 'name';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
