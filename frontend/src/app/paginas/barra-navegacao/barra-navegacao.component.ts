import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './barra-navegacao.component.html',
  styleUrl: './barra-navegacao.component.scss',
})
export class BarraNavegacaoComponent {
  public nomeUsuario = AppComponent.usuarioLogado?.nome;
  public saldo: number = AppComponent.usuarioLogado?.saldo;

  constructor(private router: Router){

  }

  public sair(){
    localStorage.removeItem("usuarioLogado");
    this.router.navigate(['']);
  }
}
