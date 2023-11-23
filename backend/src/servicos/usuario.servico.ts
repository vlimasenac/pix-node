import { Injectable } from "@nestjs/common";
import { Usuario } from "src/entidades/usuario.entidade";
import { UsuarioRepositorio } from "src/repositorios/usuario.repositorio";
import { AtualizarUsuarioRequest } from "src/requests/atualizar-usuario.request";
import { CriarUsuarioRequest } from "src/requests/criar-usuario.request";

@Injectable()
export class UsuarioServico {

    constructor(private usuarioRepositorio: UsuarioRepositorio){

    }

    public getUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepositorio.getUsuarios();
    }

    public getUsuarioPorId(id: number): Promise<Usuario | undefined> {
        return this.usuarioRepositorio.getUsuarioPorId(id);
    }

    public getUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
        return this.usuarioRepositorio.getUsuarioPorEmail(email);
    }

    public async incluirUsuario(request: CriarUsuarioRequest): Promise<Usuario> {
        var usuarioEncontradoComEmail = await this.getUsuarioPorEmail(request.email);

        if(usuarioEncontradoComEmail != undefined){
            throw "Usuario já registrado com esse email.";
        }
        
        var usuario = new Usuario({
            email: request.email,
            nome: request.nome,
            senha: request.senha
        });

        return this.usuarioRepositorio.salvarUsuario(usuario);
    }

    public removerUsuario(id: number): Promise<boolean> {
        return this.usuarioRepositorio.removerUsuario(id);
    }

    public async atualizarUsuario(id: number, request: AtualizarUsuarioRequest): Promise<boolean> {
        var usuario = await this.getUsuarioPorId(id);

        if(usuario == undefined) return false;

        usuario.atualizar(request.nome);

        await this.usuarioRepositorio.salvarUsuario(usuario);

        return true;
    }
}