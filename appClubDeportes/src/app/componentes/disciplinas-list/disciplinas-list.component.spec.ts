import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinasListComponent } from './disciplinas-list.component';

describe('DisciplinasListComponent', () => {
  let component: DisciplinasListComponent;
  let fixture: ComponentFixture<DisciplinasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplinasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisciplinasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
