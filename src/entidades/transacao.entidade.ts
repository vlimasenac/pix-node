import { BaseEntidade } from "./base.entidade";

export class Transacao extends BaseEntidade {

    public data: Date;
    public valor: number;
    public idUsuarioOrigem: number;
    public chavePixDestino: string;
    public sucesso: boolean;

    constructor(transacao: Partial<Transacao>){
        super();
        
        this.data = transacao.data || new Date();
        this.valor = transacao.valor || 0;
        this.idUsuarioOrigem = transacao.idUsuarioOrigem;
        this.chavePixDestino = transacao.chavePixDestino; 
        this.sucesso = transacao.sucesso || false;
    }

    public concluir(){
        this.data = new Date();
        this.sucesso = true;
    }
}