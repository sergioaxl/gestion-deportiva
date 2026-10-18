import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDeportivoListComponent } from './evento-deportivo-list.component';

describe('EventoDeportivoListComponent', () => {
  let component: EventoDeportivoListComponent;
  let fixture: ComponentFixture<EventoDeportivoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoDeportivoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventoDeportivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
