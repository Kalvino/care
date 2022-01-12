import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListPageComponent } from './device-list-page.component';

xdescribe('DeviceListPageComponent', () => {
  let component: DeviceListPageComponent;
  let fixture: ComponentFixture<DeviceListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
