import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroseventodeportivoListComponent } from './miembroseventodeportivo-list.component';

describe('MiembroseventodeportivoListComponent', () => {
  let component: MiembroseventodeportivoListComponent;
  let fixture: ComponentFixture<MiembroseventodeportivoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiembroseventodeportivoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiembroseventodeportivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
