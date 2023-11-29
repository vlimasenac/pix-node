import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './paginas/lista-usuarios/lista-usuarios.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { DetalheUsuarioComponent } from './paginas/detalhe-usuario/detalhe-usuario.component';
import { LoginComponent } from './paginas/login/login.component';
import { GuardaRota } from './paginas/login/guarda.routeguard';
import { inject } from '@angular/core';
import { TransferenciaComponent } from './paginas/transferencia/transferencia.component';
import { TransacaoEnviadaComponent } from './paginas/transacao-enviada/transacao-enviada.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "usuarios", component: ListaUsuariosComponent, canActivate: [() => inject(GuardaRota).canActivate()] },
    { path: "usuarios/:id", component: DetalheUsuarioComponent, canActivate: [() => inject(GuardaRota).canActivate()] },
    { path: "transferencia", component: TransferenciaComponent, canActivate: [() => inject(GuardaRota).canActivate()] },
    { path: "sucesso", component: TransacaoEnviadaComponent, canActivate: [() => inject(GuardaRota).canActivate()] }
];
