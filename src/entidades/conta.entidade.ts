import { BaseEntidade } from "./base.entidade";

export class Conta extends BaseEntidade {

    public idUsuario: number;
    public saldo: number;
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