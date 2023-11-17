import { Usuario } from "src/entidades/usuario.entidade";
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepositorio {

    private usuariosEmMemoria: Usuario[] = [];

    public getUsuarios(): Usuario[] {
        return this.usuariosEmMemoria;
    }

    public salvarUsuario(user: Usuario){
        var usuarioIndex = this.usuariosEmMemoria.indexOf(user);

        if(usuarioIndex >= 0){
            this.usuariosEmMemoria[usuarioIndex] = user;
        }
        else {
            user.id = this.getNovoId();
            this.usuariosEmMemoria.push(user);
        }

    }

    getUsuarioPorId(id: number): Usuario | undefined {

        var usuario = this.getUsuarios().find(user => user.id == id);

        return usuario;
    }

    public removerUsuario(id: number): boolean {
        var user = this.getUsuarioPorId(id);

        if(user == undefined){
            return false;
        }

        var usuarioIndex = this.usuariosEmMemoria.indexOf(user);
        var lengthAntesDaRemocao = this.usuariosEmMemoria.length;

        this.usuariosEmMemoria.splice(usuarioIndex, 1);

        return !this.usuariosEmMemoria.includes(user) 
        && (lengthAntesDaRemocao - 1) == this.usuariosEmMemoria.length;
    }

    private getNovoId(): number {
        var users = this.usuariosEmMemoria.sort((a,b) => b.id - a.id );
        var maiorId = users[0];
       return (maiorId?.id ?? 0) + 1;
    }
}