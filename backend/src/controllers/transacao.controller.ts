import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { Transacao } from "src/entidades/transacao.entidade";
import { RealizarTransferenciaRequest } from "src/requests/realizar-transferencia.request";
import { TransacaoServico } from "src/servicos/transacao.servico"; 
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@Controller({
    path: "transacao"
})
@ApiTags("Transacoes")
export class TransacaoController {

    constructor(private transacaoServico: TransacaoServico){

    }

    @Get("listarTransacoes")
    public async listarTransacoes() {

        return await this.transacaoServico.getTransacoes();
    }

    @Post('realizarTransferencia')
    public async realizarTransferencia(@Body() request: RealizarTransferenciaRequest, @Res() res: Response){
        try{
            var transacao = await this.transacaoServico.realizarTransferencia(request);

            if(transacao.sucesso){
                res.status(HttpStatus.OK).json(transacao).send();
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).json(transacao).send();
            }
        }
        catch(error){
            res.status(HttpStatus.BAD_REQUEST).json(error).send();
        }
    }
}