import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Conta } from '../../models/conta.model';
import { Usuario } from '../../models/usuario.model';
import { RealizarTransferenciaRequest } from '../../requests/realizar-transferencia.model';
import { AppComponent } from '../../app.component';
import { Transacao } from '../../models/transacao.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, BarraNavegacaoComponent, FormsModule],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.scss'
})
export class TransferenciaComponent {

  public chavePix: string = '';
  public valor: number = 0;
  public destinatario: string = '';

  constructor(private httpClient: HttpClient, private router: Router){

  }

  public consultarChavePix(){
    this.destinatario = '';

    if(this.chavePix == '') return;
    
    var obsContas = this.httpClient.get<Conta[]>("http://localhost:3000/contas/listarContas");

    var inscricao = obsContas.subscribe(async contas => {
      var contaEncontrada = contas.find(x => x.chavePix == this.chavePix);

      if(contaEncontrada != undefined){
        var usuario = await this.buscarUsuario(contaEncontrada.id);
        this.destinatario = usuario.nome;
      }

      inscricao.unsubscribe();

    });
  }

  public enviarDesativado(): boolean{
    return this.destinatario == '' || this.valor <= 0;
  }

  public realizarTransferencia(){
    var body = new RealizarTransferenciaRequest(this.chavePix, this.valor, AppComponent.usuarioLogado.id);

    this.httpClient.post<Transacao>("http://localhost:3000/transacao/realizarTransferencia", body)
    .toPromise()
    .then(transacao => {
      this.atualizarSaldo();
      this.router.navigate(['/sucesso']);
    })
    .catch((response: HttpErrorResponse) => {
      alert(response.error);
    });
  }

  private buscarUsuario(id: number): Promise<Usuario>{
    return new Promise<Usuario>((resolve, reject) => {
      
      var obsUsuario = this.httpClient.get<Usuario>("http://localhost:3000/usuarios/" + id);

      var inscricao = obsUsuario.subscribe(usuario => {

        resolve(usuario);
        inscricao.unsubscribe();

      });

    });
  }

  private atualizarSaldo(){
    var obsContas = this.httpClient.get<Conta[]>("http://localhost:3000/contas/listarContas");

      var inscricao = obsContas.subscribe(async contas => {
        var contaEncontrada = contas.find(x => x.idUsuario == AppComponent.usuarioLogado.id);
  
        if(contaEncontrada != undefined){
          AppComponent.usuarioLogado.saldo = contaEncontrada.saldo;
        }
  
        inscricao.unsubscribe();
  
      });
  }
}
