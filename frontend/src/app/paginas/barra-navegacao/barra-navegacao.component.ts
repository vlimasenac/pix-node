import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './barra-navegacao.component.html',
  styleUrl: './barra-navegacao.component.scss',
})
export class BarraNavegacaoComponent {

}
