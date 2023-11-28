import { Controller, Get, HttpStatus, Param, Query, Res, Body, Post, Put, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";;
import { Usuario } from "src/entidades/usuario.entidade";
import { AtualizarUsuarioRequest } from "src/requests/atualizar-usuario.request";
import { CriarUsuarioRequest } from "src/requests/criar-usuario.request";
import { LoginRequest } from "src/requests/login.request";
import { UsuarioServico } from "src/servicos/usuario.servico";

@Controller({
    path: "usuarios"
})
@ApiTags("Usuarios")
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
            res.status(HttpStatus.BAD_REQUEST).json("Usuario nao encontrado com o id informado.");
        }

        res.send();
    }

    @Post('login')
    public async login(@Body() request: LoginRequest, @Res() res: Response){
        try{
            var usuario = await this.usuarioServico.login(request);

            res.status(HttpStatus.OK).json(usuario).send();
        }
        catch(error){
            res.status(HttpStatus.UNAUTHORIZED).json(error).send();
        }
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