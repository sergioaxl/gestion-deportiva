import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesFormComponent } from './inscripciones-form.component';

describe('InscripcionesFormComponent', () => {
  let component: InscripcionesFormComponent;
  let fixture: ComponentFixture<InscripcionesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscripcionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
