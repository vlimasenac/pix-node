import { Controller, Get, HttpStatus, Param, Query, Res, Body, Post, Put, Delete } from "@nestjs/common";
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
    public async listarUsuarios() {

        return await this.usuarioServico.getUsuarios();
    }

    @Get(':id')
    public async getUsuarioPorId(@Param('id') id: number, @Res() res: Response) {

        var usuarioEncontrado = await this.usuarioServico.getUsuarioPorId(id);

        if(usuarioEncontrado != undefined){
            res.status(HttpStatus.OK).json(usuarioEncontrado);
        }
        else{
            res.status(HttpStatus.BAD_REQUEST);
        }

        res.send();
    }

    @Post('incluirUsuario')
    public async incluirUsuario(@Body() user: CriarUsuarioRequest, @Res() res: Response) {
        try{
            var usuarioCriado = await this.usuarioServico.incluirUsuario(user);

            if(usuarioCriado.id > 0){
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
    public async atualizarUsuario(@Param('id') id: number, @Body() request: AtualizarUsuarioRequest, @Res() res: Response) {
        var sucesso = await this.usuarioServico.atualizarUsuario(id, request);

        var status = sucesso ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).send();
    }
    
    @Delete('removerUsuario/:id')
    public async removerUsuario(@Param('id') id: number, @Res() res: Response){
        var sucesso = await this.usuarioServico.removerUsuario(id);

        var status = sucesso ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).send();
    }
}