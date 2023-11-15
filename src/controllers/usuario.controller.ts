import { Controller, Get, HttpStatus, Param, Query, Res, Body, Post, Put } from "@nestjs/common";
import { Response } from "express";
import { Usuario } from "src/entidades/usuario.entidade";
import { AtualizarUsuarioRequest } from "src/requests/atualizar-usuario.request";
import { CriarUsuarioRequest } from "src/requests/criar-usuario.requet";
import { UsuarioServico } from "src/servicos/usuario.servico";

@Controller({
    path: "usuarios"
})
export class UsuarioController {

    constructor(private usuarioServico: UsuarioServico){

    }

    @Get("listarUsuarios")
    public listarUsuarios(): Usuario[] {

        return this.usuarioServico.getUsuarios();
    }

    @Get('getPorNome')
    public getPorNome(@Query('nome') nome, @Res() res: Response){       
        var usuarioEncontrado = this.usuarioServico.getUsuarioPorNome(nome);

        if(usuarioEncontrado != undefined){
            res.status(HttpStatus.OK).json(usuarioEncontrado);
        }
        else{
            res.status(HttpStatus.BAD_REQUEST);
        }

        res.send();
    }

    @Get(':id')
    public getUsuarioPorId(@Param('id') id: number, @Res() res: Response) {

        var usuarioEncontrado = this.usuarioServico.getUsuarioPorId(id);

        if(usuarioEncontrado != undefined){
            res.status(HttpStatus.OK).json(usuarioEncontrado);
        }
        else{
            res.status(HttpStatus.BAD_REQUEST);
        }

        res.send();
    }

    @Post('incluirUsuario')
    public incluirUsuario(@Body() user: CriarUsuarioRequest, @Res() res: Response) {
        try{
            var usuarioCriado = this.usuarioServico.incluirUsuario(user);

            if(usuarioCriado != undefined){
                res.status(HttpStatus.CREATED).json(usuarioCriado);
            }
            else{
                res.status(HttpStatus.BAD_REQUEST);
            }
        }
        catch (exception) {
            res.status(HttpStatus.CONFLICT).json(exception);
        }

        res.send();
    }

    @Put('atualizarUsuario/:id')
    public atualizarUsuario(@Param('id') id: number, @Body() request: AtualizarUsuarioRequest, @Res() res: Response) {
        var sucesso = this.usuarioServico.atualizarUsuario(id, request);

        var status = sucesso == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).send();
    }
}