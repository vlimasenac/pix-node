import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { Transacao } from '../../models/transacao.model';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [CommonModule, BarraNavegacaoComponent],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.scss'
})
export class DetalheUsuarioComponent implements OnInit {
  
  private idUsuario: number | undefined = undefined;

  public usuario: Usuario | undefined = undefined;
  public transacoes: Transacao[] = [];

  constructor(private route: ActivatedRoute,
    private http: HttpClient){

  }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['id'];

    this.getDadosUsuario();
    this.getTransacoes();
  }

  private getDadosUsuario(){
    var obsUsuario = this.http.get<Usuario>(`http://localhost:3000/usuarios/${this.idUsuario}`);

    obsUsuario.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  private getTransacoes(){
    var obsTransacoes = this.http.get<Transacao[]>(`http://localhost:3000/transacao/listarTransacoes`);

    obsTransacoes.subscribe(transacoes => {
      this.transacoes = transacoes.filter(x => x.idUsuarioOrigem == this.idUsuario);
    });
  }

  public getSucesso(transacao: Transacao): string{
    return transacao.sucesso ? "Sim" : "Não";
  }
}
