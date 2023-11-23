import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioComponent } from './ver-usuario.component';

describe('VerUsuarioComponent', () => {
  let component: VerUsuarioComponent;
  let fixture: ComponentFixture<VerUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
