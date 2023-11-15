import { Usuario } from "src/entidades/usuario.entidade";
import { AtualizarUsuarioRequest } from "src/requests/atualizar-usuario.request";
import { CriarUsuarioRequest } from "src/requests/criar-usuario.requet";

export class UsuarioServico {

    private usuariosEmMemoria: Usuario[] = [];

    getUsuarios(): Usuario[] {
        return this.usuariosEmMemoria;
    }

    getUsuarioPorId(id: number): Usuario | undefined {

        var usuario = this.getUsuarios().find(user => user.id == id);

        return usuario;
    }

    getUsuarioPorNome(nome: string): Usuario | undefined {

        var usuario = this.getUsuarios().find(user => this.checarNomeUsuarioContemTexto(user, nome));

        return usuario;
    }

    getUsuarioPorEmail(email: string): Usuario | undefined {
        return this.getUsuarios().find(user => this.checarEmailUsuarioEIgual(user, email));
    }

    public incluirUsuario(request: CriarUsuarioRequest): Usuario {
        var usuarioEncontradoComEmail = this.getUsuarioPorEmail(request.email);

        if(usuarioEncontradoComEmail != undefined){
            throw "Usuario já registrado com esse email.";
        }
        
        var usuario = new Usuario({
            chavePix: request.chavePix,
            email: request.email,
            nome: request.nome,
            senha: request.senha
        });

        this.getUsuarios().push(usuario);

        return usuario;
    }

    public atualizarUsuario(id: number, request: AtualizarUsuarioRequest): boolean {
        var usuario = this.getUsuarioPorId(id);

        if(usuario == undefined) return false;

        usuario.atualizar(request.nome, request.chavePix);

        this.salvarUsuario(usuario);

        return true;
    }

    private checarNomeUsuarioContemTexto(user: Usuario, nome: string): boolean {
        var userNomeNormalizado = user.nome.toLowerCase();
        var nomeBuscaNormalizado = nome.toLowerCase();

        var contemTextoNoNome = userNomeNormalizado.includes(nomeBuscaNormalizado);

        return contemTextoNoNome;
    }

    private checarEmailUsuarioEIgual(user: Usuario, email: string): boolean {
        var userEmailNormalizado = user.email.toLowerCase();
        var emailBuscaNormalizado = email.toLowerCase();

        return userEmailNormalizado == emailBuscaNormalizado;
    }

    private salvarUsuario(user: Usuario){
        var usuarioIndex = this.usuariosEmMemoria.indexOf(user);

        this.usuariosEmMemoria[usuarioIndex] = user;
    }
}