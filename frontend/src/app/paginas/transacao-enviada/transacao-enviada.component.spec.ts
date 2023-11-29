import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoEnviadaComponent } from './transacao-enviada.component';

describe('TransacaoEnviadaComponent', () => {
  let component: TransacaoEnviadaComponent;
  let fixture: ComponentFixture<TransacaoEnviadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoEnviadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransacaoEnviadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
