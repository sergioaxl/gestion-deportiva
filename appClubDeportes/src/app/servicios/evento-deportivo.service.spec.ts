import { TestBed } from '@angular/core/testing';

import { EventoDeportivoService } from './evento-deportivo.service';

describe('EventoDeportivoService', () => {
  let service: EventoDeportivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoDeportivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
