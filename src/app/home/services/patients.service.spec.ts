import { TestBed, inject } from '@angular/core/testing';
import { PatientsService } from './patients.service';
import { HttpClientModule } from '@angular/common/http';

describe('PatientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [PatientsService]
    });
  });

  it('should be created', inject([PatientsService], (service: PatientsService) => {
    expect(service).toBeTruthy();
  }));
});
