import { Usuario } from "src/entidades/usuario.entidade";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class UsuarioRepositorio {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>){

    }

    public getUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    public salvarUsuario(user: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(user);
    }

    public getUsuarioPorId(idBusca: number): Promise<Usuario | undefined> {
        return this.usuarioRepository.findOneBy({ id: idBusca })
    }

    public getUsuarioPorEmail(emailBusca: string): Promise<Usuario | undefined> {
        return this.usuarioRepository.findOneBy({ email: emailBusca })
    }

    public async removerUsuario(id: number): Promise<boolean> {
        var result = await this.usuarioRepository.delete({ id });
        return result.affected == 1;
    }
}