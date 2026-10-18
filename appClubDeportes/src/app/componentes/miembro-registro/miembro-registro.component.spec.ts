import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroRegistroComponent } from './miembro-registro.component';

describe('MiembroRegistroComponent', () => {
  let component: MiembroRegistroComponent;
  let fixture: ComponentFixture<MiembroRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiembroRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiembroRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
