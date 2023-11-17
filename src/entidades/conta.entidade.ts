export class Conta {

    public idUsuario: number;
    public saldo: number;

    constructor(idUsuario: number){
        this.idUsuario = idUsuario;
    }

    public adicionarSaldo(valor: number){
        this.saldo += valor;
    }

    public removeSaldo(valor: number){
        this.saldo -= valor;
    }
}