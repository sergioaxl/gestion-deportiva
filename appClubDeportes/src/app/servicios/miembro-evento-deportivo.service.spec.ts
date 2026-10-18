import { TestBed } from '@angular/core/testing';

import { MiembroEventoDeportivoService } from './miembro-evento-deportivo.service';

describe('MiembroEventoDeportivoService', () => {
  let service: MiembroEventoDeportivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiembroEventoDeportivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
