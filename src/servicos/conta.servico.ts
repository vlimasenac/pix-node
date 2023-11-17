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

    public getContas(): Conta[] {
        return this.contaRepositorio.getContas();
    }

    public abrirConta(request: CriarContaRequest): Conta {

        var usuarioEncontrado = this.usuarioRepositorio.getUsuarioPorId(request.idUsuario);

        if(usuarioEncontrado == undefined){
            throw "Não existe um usuario com id " + request.idUsuario;
        }

        var contaEncontrada = this.getContaUsuario(request.idUsuario);

        if(contaEncontrada != undefined){
            throw "Conta já existente para o usuario com id " + request.idUsuario;
        }

        var novaConta = new Conta(request.idUsuario);
        novaConta.adicionarSaldo(request.saldoInicial);

        this.contaRepositorio.salvarConta(novaConta);

        return novaConta;
    }

    public getContaUsuario(idUsuario: number): Conta | undefined {
        return this.getContas().find(x => x.idUsuario == idUsuario);
    }
}