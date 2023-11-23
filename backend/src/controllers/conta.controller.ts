import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { CriarContaRequest } from "src/requests/criar-conta.request";
import { ContaServico } from "src/servicos/conta.servico";
import { Response } from 'express';
import { ApiTags } from "@nestjs/swagger";

@Controller({
    path: 'contas'
})
@ApiTags("Contas")
export class ContaController {

    constructor(private contaServico: ContaServico){

    }

    @Get('listarContas')
    public async listarContas() {
        var contas = await this.contaServico.getContas();

        return contas;
    }

    @Post('adicionarConta')
    public async adicionarConta(@Body() request: CriarContaRequest, @Res() res: Response) {
        try{
            var novaConta = await this.contaServico.abrirConta(request);

            res.status(HttpStatus.CREATED).json(novaConta).send();
        }
        catch(error) {
            res.status(HttpStatus.BAD_REQUEST).json(error).send();
        }
    }
}