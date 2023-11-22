import { Column, Entity } from "typeorm";
import { BaseEntidade } from "./base.entidade";

@Entity()
export class Usuario extends BaseEntidade {

    @Column()
    public nome: string;

    @Column()
    public email: string;

    @Column()
    public senha: string;
    
    constructor(user: Partial<Usuario>){
        super();

        this.nome = user?.nome ?? '';
        this.email = user?.email ?? '';
        this.senha = user?.senha ?? '';
    }

    atualizar(nome: string){
        this.nome = nome;
    }
}