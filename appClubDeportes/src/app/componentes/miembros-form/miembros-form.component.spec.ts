import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembrosFormComponent } from './miembros-form.component';

describe('MiembrosFormComponent', () => {
  let component: MiembrosFormComponent;
  let fixture: ComponentFixture<MiembrosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiembrosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiembrosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
