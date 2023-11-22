import { Injectable } from "@nestjs/common";
import { Conta } from "src/entidades/conta.entidade";

@Injectable()
export class ContaRepositorio {
    
    private contasEmMemoria: Conta[] = [];

    public getContas(): Conta[] {
        return this.contasEmMemoria;
    }

    public getContaPorChavePix(chavePix: string): Conta | undefined {

        var conta = this.getContas().find(x => x.chavePix == chavePix);

        return conta;
    }

    public getContaPorUsuario(idUsuario: number): Conta | undefined {

        var conta = this.getContas().find(x => x.idUsuario == idUsuario);

        return conta;
    }

    public salvarConta(conta: Conta) {
        var indexContaExistente = this.contasEmMemoria.indexOf(conta);

        if(indexContaExistente >= 0){
            this.contasEmMemoria[indexContaExistente] = conta;
        }
        else{
            this.contasEmMemoria.push(conta);
        }
    }
}