export class Transacao {

    public data: Date;
    public valor: number;
    public idUsuarioOrigem: number;
    public idUsuarioDestino: number;
    public chavePixDestino: string;
    public sucesso: boolean;

    constructor(data: Date, valor: number, idUsuarioOrigem: number, idUsuarioDestino: number, chavePixDestino: string, sucesso: boolean){
        this.data = data;
        this.valor = valor;
        this.idUsuarioOrigem = idUsuarioOrigem ;
        this.idUsuarioDestino = idUsuarioDestino; 
        this.chavePixDestino = chavePixDestino; 
        this.sucesso = sucesso;
    }
}