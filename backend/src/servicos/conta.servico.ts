import { Injectable } from "@nestjs/common";
import { Conta } from "src/entidades/conta.entidade";
import { ContaRepositorio } from "src/repositorios/conta.repositorio";
import { UsuarioRepositorio } from "src/repositorios/usuario.repositorio";
import { CriarContaRequest } from "src/requests/criar-conta.request";

@Injectable()
export class ContaServico {  

    constructor(private usuarioRepositorio: UsuarioRepositorio,
        private contaRepositorio: ContaRepositorio) {

    }

    public getContas(): Promise<Conta[]> {
        return this.contaRepositorio.getContas();
    }

    public async abrirConta(request: CriarContaRequest): Promise<Conta> {

        var usuarioEncontrado = await this.usuarioRepositorio.getUsuarioPorId(request.idUsuario);

        if(usuarioEncontrado == undefined){
            throw "Não existe um usuario com id " + request.idUsuario;
        }

        var contaEncontrada = await this.getContaUsuario(request.idUsuario);

        if(contaEncontrada != undefined){
            throw "Conta já existente para o usuario com id " + request.idUsuario;
        }

        var novaConta = new Conta(request.idUsuario, request.chavePix);
        novaConta.depositar(request.saldoInicial);

        return this.contaRepositorio.salvarConta(novaConta);
    }

    public getContaUsuario(idUsuario: number): Promise<Conta | undefined> {
        return this.contaRepositorio.getContaPorUsuario(idUsuario);
    }
}