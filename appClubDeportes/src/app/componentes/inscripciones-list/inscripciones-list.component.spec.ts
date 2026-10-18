import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesListComponent } from './inscripciones-list.component';

describe('InscripcionesListComponent', () => {
  let component: InscripcionesListComponent;
  let fixture: ComponentFixture<InscripcionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscripcionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
