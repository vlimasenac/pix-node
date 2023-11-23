import { Column, Entity } from "typeorm";
import { BaseEntidade } from "./base.entidade";

@Entity()
export class Transacao extends BaseEntidade {

    @Column()
    public data: Date;

    @Column()
    public valor: number;

    @Column()
    public idUsuarioOrigem: number;

    @Column()
    public chavePixDestino: string;

    @Column()
    public sucesso: boolean;

    @Column()
    public mensagemErro: string;

    constructor(transacao?: Partial<Transacao>){
        super();
        
        this.data = transacao?.data || new Date();
        this.valor = transacao?.valor || 0;
        this.idUsuarioOrigem = transacao?.idUsuarioOrigem;
        this.chavePixDestino = transacao?.chavePixDestino; 
        this.sucesso = transacao?.sucesso || false;
    }

    public concluir(){
        this.sucesso = true;
    }

    public falhar(mensagemErro){
        this.sucesso = false;
        this.mensagemErro = mensagemErro;
    }
}