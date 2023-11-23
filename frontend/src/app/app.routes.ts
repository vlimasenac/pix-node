import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './paginas/lista-usuarios/lista-usuarios.component';
import { MenuComponent } from './paginas/menu/menu.component';

export const routes: Routes = [
    { path: "", component: MenuComponent },
    { path: "usuarios", component: ListaUsuariosComponent }
];
