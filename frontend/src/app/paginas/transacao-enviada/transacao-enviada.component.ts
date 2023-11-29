import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';

@Component({
  selector: 'app-transacao-enviada',
  standalone: true,
  imports: [CommonModule, BarraNavegacaoComponent],
  templateUrl: './transacao-enviada.component.html',
  styleUrl: './transacao-enviada.component.scss'
})
export class TransacaoEnviadaComponent {

}
