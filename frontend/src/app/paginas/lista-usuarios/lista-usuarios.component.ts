import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, BarraNavegacaoComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  
  public usuarios: Usuario[] = [];

  constructor(private http: HttpClient){

  }

  async ngOnInit(): Promise<void> {
    var obsUsuarios = this.http.get<Usuario[]>("http://localhost:3000/usuarios/listarUsuarios");

    obsUsuarios.subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
