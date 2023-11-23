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

    public getTransacoes(): Promise<Transacao[]> {
        return this.transacaoRepositorio.getTransacoes();
    }

    public async realizarTransferencia(request: RealizarTransferenciaRequest): Promise<Transacao> {

        var tempTransacao = new Transacao({
            valor: request.valor,
            idUsuarioOrigem: request.idUsuarioOrigem,
            chavePixDestino: request.chavePixDestino
        });

        var transacao = await this.transacaoRepositorio.salvarTransacao(tempTransacao);

        var contaDestino = await this.contaRepositorio.getContaPorChavePix(request.chavePixDestino);

        var mensagemErro = '';

        if(contaDestino == undefined){
            mensagemErro += " Nenhuma conta encontrada com a chave pix informada.";
        }

        var usuarioOrigem = await this.usuarioRepositorio.getUsuarioPorId(request.idUsuarioOrigem);

        if(usuarioOrigem == undefined){
            mensagemErro += " Nenhum usuario encontrado com o id informado.";
        }

        var contaOrigem = await this.contaRepositorio.getContaPorUsuario(request.idUsuarioOrigem);

        if(contaOrigem == undefined){
            mensagemErro += " Nenhuma conta encontrada com o id de usuario informado.";
        }

        if(contaDestino?.idUsuario == contaOrigem?.idUsuario){
            mensagemErro += " Conta de destino nao pode ser igual a conta de origem."
        }
        
        if(mensagemErro == ''){
            try{
                contaOrigem.sacar(request.valor);
                contaDestino.depositar(request.valor);

                transacao.concluir();

                await this.transacaoRepositorio.salvarTransacao(transacao);
            }
            catch(erro){
                transacao.falhar(erro);

                await this.transacaoRepositorio.salvarTransacao(transacao);

                throw erro;
            }
        }
        else {
            transacao.falhar(mensagemErro);

            await this.transacaoRepositorio.salvarTransacao(transacao);

            throw mensagemErro;
        }
        
        return transacao
    }
}