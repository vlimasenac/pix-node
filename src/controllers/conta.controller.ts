import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { CriarContaRequest } from "src/requests/criar-conta.request";
import { ContaServico } from "src/servicos/conta.servico";
import { Response } from 'express';
import { Conta } from "src/entidades/conta.entidade";

@Controller({
    path: 'contas'
})
export class ContaController {

    constructor(private contaServico: ContaServico){

    }

    @Get('listarContas')
    public listarContas(): Conta[] {
        var contas = this.contaServico.getContas();

        return contas;
    }

    @Post('adicionarConta')
    public adicionarConta(@Body() request: CriarContaRequest, @Res() res: Response) {
        try{
            var novaConta = this.contaServico.abrirConta(request);

            res.status(HttpStatus.CREATED).json(novaConta).send();
        }
        catch(error) {
            res.status(HttpStatus.BAD_REQUEST).json(error).send();
        }
    }
}