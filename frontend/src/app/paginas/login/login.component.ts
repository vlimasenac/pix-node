import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Conta } from '../../models/conta.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public senha: string = '';

  constructor(private httpClient: HttpClient,
    private router: Router){

  }

  ngOnInit(): void {
    var usuarioLogadoJson = localStorage.getItem("usuarioLogado");
    if(usuarioLogadoJson != undefined){
      AppComponent.usuarioLogado = JSON.parse(usuarioLogadoJson);

      this.router.navigate(['/usuarios']);
    }
  }

  public login(){
    const body = {
      email: this.email,
      senha: this.senha
    };

    this.httpClient.post<Usuario>("http://localhost:3000/usuarios/login", body)
    .toPromise()
    .then(async usuario => {
      AppComponent.usuarioLogado = usuario!;

      var saldo = await this.getSaldo(usuario!.id);
      AppComponent.usuarioLogado.saldo = saldo;

      localStorage.setItem("usuarioLogado", JSON.stringify(AppComponent.usuarioLogado));

      this.router.navigate(['/usuarios']);
    })
    .catch((response: HttpErrorResponse) => {
      alert(response.error);
    });    
  }

  public getSaldo(idUsuario: number): Promise<number>{
    return new Promise<number>((resolve, reject) => {

      var obsContas = this.httpClient.get<Conta[]>("http://localhost:3000/contas/listarContas");

      var inscricao = obsContas.subscribe(async contas => {
        var contaEncontrada = contas.find(x => x.idUsuario == idUsuario);
  
        if(contaEncontrada != undefined){
          resolve(contaEncontrada.saldo);
        }
  
        inscricao.unsubscribe();
  
      });

    });

    
  }
}
