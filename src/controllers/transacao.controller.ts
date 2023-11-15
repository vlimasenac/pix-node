import { Controller, Get } from "@nestjs/common";
import { Transacao } from "src/entidades/transacao.entidade";
import { TransacaoServico } from "src/servicos/transacao.servico"; 

@Controller({
    path: "transacao"
})
export class trasacaoController {

    constructor(private transacaoServico: TransacaoServico){

    }

    @Get("listarTransacoes")
    public listarTransacoes(): Transacao[] {

        return this.transacaoServico.getTransacao();
    }
}