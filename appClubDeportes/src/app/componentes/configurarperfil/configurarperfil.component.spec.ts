import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarperfilComponent } from './configurarperfil.component';

describe('ConfigurarperfilComponent', () => {
  let component: ConfigurarperfilComponent;
  let fixture: ComponentFixture<ConfigurarperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarperfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurarperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
