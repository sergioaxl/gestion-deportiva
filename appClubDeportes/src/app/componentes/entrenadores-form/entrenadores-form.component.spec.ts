import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadoresFormComponent } from './entrenadores-form.component';

describe('EntrenadoresFormComponent', () => {
  let component: EntrenadoresFormComponent;
  let fixture: ComponentFixture<EntrenadoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrenadoresFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrenadoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
