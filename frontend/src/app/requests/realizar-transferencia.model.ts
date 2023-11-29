export class RealizarTransferenciaRequest {
    
    public chavePixDestino: string;
    public valor: number;
    public idUsuarioOrigem: number;

    constructor(chavePixDestino: string, valor: number, idUsuarioOrigem: number){
        this.chavePixDestino = chavePixDestino;
        this.valor = valor;
        this.idUsuarioOrigem = idUsuarioOrigem;
    }

}