import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDeportivoFormComponent } from './evento-deportivo-form.component';

describe('EventoDeportivoFormComponent', () => {
  let component: EventoDeportivoFormComponent;
  let fixture: ComponentFixture<EventoDeportivoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoDeportivoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventoDeportivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
