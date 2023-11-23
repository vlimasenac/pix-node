import { Column, Entity } from "typeorm";
import { BaseEntidade } from "./base.entidade";

@Entity()
export class Conta extends BaseEntidade {

    @Column()
    public idUsuario: number;

    @Column()
    public saldo: number;

    @Column()
    public chavePix: string;

    constructor(idUsuario: number, chavePix: string){
        super();
        this.idUsuario = idUsuario;
        this.chavePix = chavePix;
        this.saldo = 0;
    }

    public depositar(valor: number){
        this.saldo += valor;
    }

    public sacar(valor: number){
        if(valor > this.saldo){
            throw "Saldo insuficiente."
        }

        this.saldo -= valor;
    }
}