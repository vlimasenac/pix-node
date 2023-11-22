import { Injectable } from "@nestjs/common";
import { Transacao } from "src/entidades/transacao.entidade";
import { ContaRepositorio } from "src/repositorios/conta.repositorio";
import { TransacaoRepositorio } from "src/repositorios/transacao.repositorio";
import { UsuarioRepositorio } from "src/repositorios/usuario.repositorio";
import { RealizarTransferenciaRequest } from "src/requests/realizar-transferencia.request";

@Injectable()
export class TransacaoServico {

    constructor(private transacaoRepositorio: TransacaoRepositorio,
        private usuarioRepositorio: UsuarioRepositorio,
        private contaRepositorio: ContaRepositorio){

    }

    getTransacoes(): Transacao[] {
        return this.transacaoRepositorio.getTransacoes();
    }

    public async realizarTransferencia(request: RealizarTransferenciaRequest): Promise<Transacao> {
        var contaDestino = this.contaRepositorio.getContaPorChavePix(request.chavePixDestino);

        if(contaDestino == undefined){
            throw "Nenhuma conta encontrada com a chave pix informada.";
        }

        var usuarioOrigem = await this.usuarioRepositorio.getUsuarioPorId(request.idUsuarioOrigem);

        if(usuarioOrigem == undefined){
            throw "Nenhum usuario encontrado com o id informado.";
        }

        var contaOrigem = this.contaRepositorio.getContaPorUsuario(request.idUsuarioOrigem);

        if(contaOrigem == undefined){
            throw "Nenhuma conta encontrada com o id de usuario informado.";
        }

        if(contaDestino.idUsuario == contaOrigem.idUsuario){
            throw "Conta de destino nao pode ser igual a conta de origem."
        }

        var transacao = new Transacao({
            valor: request.valor,
            idUsuarioOrigem: usuarioOrigem.id,
            chavePixDestino: request.chavePixDestino
        });

        contaOrigem.sacar(request.valor);
        contaDestino.depositar(request.valor);

        transacao.concluir();

        this.transacaoRepositorio.salvarTransacao(transacao);

        return transacao;
    }
}