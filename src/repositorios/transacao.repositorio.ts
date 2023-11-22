import { Injectable } from "@nestjs/common";
import { Transacao } from "src/entidades/transacao.entidade";

@Injectable()
export class TransacaoRepositorio {

    private transacoesEmMemoria: Transacao[] = [];

    public getTransacoes(): Transacao[] {
        return this.transacoesEmMemoria;
    }

    public salvarTransacao(transacao: Transacao){

        var indexTransacaoExistente = this.transacoesEmMemoria.indexOf(transacao);

        if(indexTransacaoExistente >= 0){
            this.transacoesEmMemoria[indexTransacaoExistente] = transacao;
        }
        else{
            this.transacoesEmMemoria.push(transacao);
        }
    }
}