import { TestBed, inject } from '@angular/core/testing';

import { DevicesService } from './devices.service';
import { HttpClientModule } from '@angular/common/http';

describe('DevicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [DevicesService]
    });
  });

  it('should be created', inject([DevicesService], (service: DevicesService) => {
    expect(service).toBeTruthy();
  }));
});
