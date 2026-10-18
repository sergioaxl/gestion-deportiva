import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroseventodeportivoFormComponent } from './miembroseventodeportivo-form.component';

describe('MiembroseventodeportivoFormComponent', () => {
  let component: MiembroseventodeportivoFormComponent;
  let fixture: ComponentFixture<MiembroseventodeportivoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiembroseventodeportivoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiembroseventodeportivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
