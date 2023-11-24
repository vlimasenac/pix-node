import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './paginas/lista-usuarios/lista-usuarios.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { DetalheUsuarioComponent } from './paginas/detalhe-usuario/detalhe-usuario.component';
import { LoginComponent } from './paginas/login/login.component';
import { GuardaRota } from './paginas/login/guarda.routeguard';
import { inject } from '@angular/core';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "usuarios", component: ListaUsuariosComponent, canActivate: [() => inject(GuardaRota).canActivate()] },
    { path: "usuarios/:id", component: DetalheUsuarioComponent }
];
