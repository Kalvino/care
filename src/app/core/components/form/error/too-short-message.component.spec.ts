import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooShortMessageComponent } from './too-short-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';

describe('TooShortMessageComponent', () => {
  let component: TooShortMessageComponent;
  let fixture: ComponentFixture<TooShortMessageComponent>;

  const fb = new FormBuilder();
  const form = fb.group({
    name: ['name']
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooShortMessageComponent ],
      imports: [TranslateModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooShortMessageComponent);
    component = fixture.componentInstance;
    component.form = form;
    component.field = 'name';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
